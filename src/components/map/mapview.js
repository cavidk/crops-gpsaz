import React, {useEffect} from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2";
import "leaflet-draw";
import "./css/leaflet-sidebar.css";
import "./css/leaflet-sidebar.min.css";
import {Navigate, useLocation, useNavigate, useParams} from 'react-router-dom'
import {withRouter} from './withRouter';
import GeometryUtil from "leaflet-geometryutil";

const APP_CONSTANTS = require('../../ApplicationConstants')
const wkt = require('wkt');
const REACT_APP_OSRM_URL = process.env.REACT_APP_OSRM_URL;
const REACT_APP_MAPBOX_URL = process.env.REACT_APP_MAPBOX_URL;
const REACT_APP_GOOGLESAT_URL = process.env.REACT_APP_GOOGLESAT_URL;
const request = require('../../resources/request');
const APP_CONSTONSTS = require('../../ApplicationConstants')
const REACT_APP_SENTINEL_NDVI_API_ENDPOINT = process.env.REACT_APP_SENTINEL_NDVI_API_ENDPOINT;

class Map extends React.Component {
    constructor() {
        super();
        // console.log('---constructor MAP  --');
        this.state = {
            zoneTableRows: []
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    componentDidMount() {
        const {router} = this.props;
        // console.log("Map Viewer mounted");
        // create map
        var map = L.map("map", {
            renderer: L.canvas(),
            center: [40.475362, 49.815538],
            zoom: 12,
            attributionControl: false,
            layers: [L.tileLayer(REACT_APP_OSRM_URL)]
        });
        var sidebar = L.control
            .sidebar({
                autopan: false, position: "right", container: "sidebar", closeButton: true
            })
            .addTo(map)
            .open("home");

        sidebar.on("content", function (ev) {
            switch (ev.id) {
                case "autopan":
                    sidebar.options.autopan = true;
                    break;
                default:
                    sidebar.options.autopan = false;
            }
        });
        let sentinelHubLayer;

        //
        var highlight;
        var style = {
            'default': {
                'color': 'blue'
            }, 'highlight': {
                'color': 'yellow'
            }
        };

        function setHighlight(layer) {
            if (highlight) {
                unsetHighlight(highlight);
            }
            layer.setStyle(style.highlight);
            highlight = layer;
        }

        function unsetHighlight(layer) {
            highlight = null;
            layer.setStyle(style.default);
        }

        this.editableLayers = new L.FeatureGroup();


        map.addLayer(this.editableLayers);
        // this.map.addLayer(this.props.valueFromParent);
        const rectangle = [[51.49, -0.08], [51.5, -0.06]];

        let mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        let mbUrl = REACT_APP_MAPBOX_URL;

        let grayscale = L.tileLayer(mbUrl, {
            id: "mapbox/light-v9", tileSize: 512, zoomOffset: -1
            // ,
            // attribution: mbAttr
        });
        let streets = L.tileLayer(mbUrl, {
            id: "mapbox/streets-v11", tileSize: 512, zoomOffset: -1
            // ,
            // attribution: mbAttr
        });

        let topographic = L.tileLayer(REACT_APP_OSRM_URL, {
            id: "Topographic", tileSize: 512, zoomOffset: -1
            // ,
            // attribution: mbAttr
        });

        let googleSatt = L.tileLayer(REACT_APP_GOOGLESAT_URL, {
            id: "Google Satallite", tileSize: 512, zoomOffset: -1
            // ,
            // attribution: mbAttr
        });


        let baseLayers = {
            OpenStreetMap: streets, Grayscale: grayscale, Topographic: topographic, GoogleSat: googleSatt
        };
        var options = {
            position: "topright", draw: {
                polygon: {
                    title: "Draw a beautiful polygon!", allowIntersection: false, drawError: {
                        drawError: {
                            color: "#b00b00", timeout: 1000
                        }, shapeOptions: {
                            color: "#bada55"
                        }, showArea: true
                    }, polyline: false, rectangle: false, circle: false, marker: false
                }, edit: {
                    featureGroup: this.editableLayers, //REQUIRED!!
                    remove: false
                }
            }
        }
        L.control.layers(baseLayers).addTo(map);

        this.drawControl = new L.Control.Draw(options);
        map.on("draw:created", function (e) {
            var layer = e.layer;


            // Do whatever else you need to. (save to db, add to map etc)
        });

        let zones = [];


        // var zoneLayer = L.geoJSON().addTo(this.map);
        const sidebarlist = document.getElementById("sidebarZones");

        if (sentinelHubLayer != null) {
            map.removeLayer(sentinelHubLayer);
        }

        function createSidebarElements(wktGeom, boundsZone, geometry, id, name, description, areaHa) {
            let htmlId = 'fieldmap' + id;
            const el = `<div class="zoneTableRow" name="${name}" desc="${description}" area="${areaHa}">
                             <div class="checkedStyle">
                                <input type="checkbox"/>
                              </div>
                            <div  class="fieldMiniMap" id=${htmlId}></div>
                            <div class="zoneDescriptionDiv">
                            <div class="zoneDescriptionTxt">
                                <b><label>${name}</label></b><br>
                                <b><label >${description}</label></b><br>
                                <b><label >Area : ${areaHa} hectare</label></b>
                             </div>
                             </div>
                           </div> <br/>`;
            const temp = document.createElement("div");
            temp.innerHTML = el.trim();
            const htmlEl = temp.firstChild;

            let added = sidebarlist.insertAdjacentElement("beforeend", htmlEl);
            if (added) {
                let zoneInMinimap = L.geoJSON(wktGeom);

                zoneInMinimap.on('mouseover', function (e) {
                    setHighlight(zoneInMinimap);
                });

                zoneInMinimap.on('mouseout', function (e) {
                    unsetHighlight(zoneInMinimap);
                });

                zoneInMinimap.on('click', function (e) {

                    request.auth.addZonePreview(id, () => {
                        router.navigate(APP_CONSTANTS.ZONE_URL + id);
                    })
                });

                var mini_map_init = L.map(htmlId, {
                    zoomControl: false,
                    scrollWheelZoom: false,
                    scrollpropogattion: false,
                    dragging: false,
                    attributionControl: false,
                    doubleClickZoom: false
                });
                var osm = L.tileLayer(REACT_APP_GOOGLESAT_URL, {}).addTo(mini_map_init);
                zoneInMinimap.addTo(mini_map_init);//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
                mini_map_init.fitBounds(zoneInMinimap.getBounds());
            }
        }

        zones = this.props.userZoneObject;
        console.log("Zones: ", zones);
        var i = 0;

        setTimeout(() => {

            zones.forEach((polygon) => {
                i++;
                let wktgeomZone = wkt.parse(polygon.geometry);

                var geojsonFeatures = {
                    "type": "Feature", "properties": {'name': polygon.name}, "geometry": wktgeomZone
                }
                var myStyle = {
                    "opacity": 1
                };
                var zoneGeofence = L.geoJSON(geojsonFeatures, {
                    style: myStyle
                }).addTo(map);


                let coords = [];
                let coordsLatLng = [];
                zoneGeofence.eachLayer(function (layer) {
                    //polygon.name
                    layer.bindTooltip("", {
                        permanent: true, direction: 'center', className: 'labelstylezonename'
                    }).openTooltip();
                    coords = layer.feature.geometry.coordinates[0];
                    layer.feature.geometry.coordinates[0].forEach((vertex) => {
                        coordsLatLng.push(new L.latLng(vertex[1], vertex[0]));
                    });

                });
                let areaHa = GeometryUtil.geodesicArea(coordsLatLng) / 10000;
                areaHa = Number(areaHa).toFixed(3);
                var temp = wktgeomZone;
                let boundsZone = zoneGeofence.getBounds();
                createSidebarElements(temp, boundsZone, polygon.geometry, polygon.id, polygon.name, polygon.description, areaHa);
                // this.map.fitBounds(zoneGeofences.getBounds());
                zoneGeofence.on('mouseover', function (e) {
                    setHighlight(zoneGeofence);
                });

                zoneGeofence.on('mouseout', function (e) {
                    unsetHighlight(zoneGeofence);
                });


                zoneGeofence.on('click', function (e) {
                    console.log("polygon: ", polygon)
                    request.auth.addZonePreview(polygon.id, () => {
                        router.navigate(APP_CONSTANTS.ZONE_URL + polygon.id);
                    })
                });

            });
            this.state.zoneTableRows = Array.from(sidebarlist.children);//for search
        }, 1000);
    };

    // handleChangeZone = () => {
    //     let searchValue = .target.value;
    //     let sidebarRows = document.getElementById('sidebarZones');
    //
    //     console.log("handleChangeZOne");
    //     if(searchValue.length == 1){
    //
    //         this.state.tableRows = sidebarRows.children;;
    //         console.log(1);
    //         // console.log(tableRows);
    //     }
    //     if(searchValue.length == 0){
    //         console.log(0);
    //     }
    // }

    handleSearchChange(event) {
        //this.setState({value: event.target.value});
        let searchValue = event.target.value;
        let sidebarRows = document.getElementById('sidebarZones');

        // console.log("handleChangeZOne");
        let allChilds = [];
        allChilds = this.state.zoneTableRows;
        // console.log('allChild');
        // console.log(allChilds);

        if (searchValue.length > 0) {
            sidebarRows.innerText = '';
            allChilds.forEach((child: HTMLDivElement) => {
                let zoneName = child.getAttribute("name").toLowerCase();
                let desc = child.getAttribute("desc").toLowerCase();
                let area = child.getAttribute("area").toLowerCase();
                if (zoneName.includes(searchValue.toLowerCase()) || desc.includes(searchValue.toLowerCase()) || area.includes(searchValue.toLowerCase())) {
                    sidebarRows.appendChild(child);
                }
            });
        }

        if (searchValue.length === 0) {
            allChilds.forEach((child) => {
                sidebarRows.appendChild(child);
            });
        }
    }

    render() {
        return (
            <div id="map">
                <div id="sidebar" class="leaflet-sidebar collapsed">
                    <div class="leaflet-sidebar-tabs">
                        <ul role="tablist">
                            <li role="tab">
                                <a href="#home">
                                    <i class="fa fa-bars"/>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div class="leaflet-sidebar-content">
                        <div class="leaflet-sidebar-pane" id="home">
                            <h1 class="leaflet-sidebar-header">
                                Zones
                                <div class="leaflet-sidebar-close">
                                    <i class="fa fa-caret-left"/>
                                </div>
                            </h1>
                        </div>
                        <div>
                            <input className="searchbox" onChange={this.handleSearchChange} type="text"
                                   placeholder="Zona adı,təsvir, sahə ..."/><br/><br/>
                            <div class="sidebar-tab">
                                <div id="sidebarZones" class="sideBarZones">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Map);


