import React, {Component, useEffect} from 'react';
import {FormControl, Select, MenuItem} from '@material-ui/core';
import {withRouter} from '../map/withRouter';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./css/zone-preview.css";
import az from 'date-fns/locale/az';
import * as L from "leaflet";
import wkt from "wkt";
import GeometryUtil from "leaflet-geometryutil";
import Moment from "moment/moment";
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import {useNavigate} from "react-router-dom";

const REACT_APP_OSRM_URL = process.env.REACT_APP_OSRM_URL;
const REACT_APP_MAPBOX_URL = process.env.REACT_APP_MAPBOX_URL;
const REACT_APP_GOOGLESAT_URL = process.env.REACT_APP_GOOGLESAT_URL;
const REACT_APP_SENTINEL_NDVI_API_ENDPOINT = process.env.REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
const request = require('../../resources/request');
const APP_CONSTANTS = require('../../ApplicationConstants')

registerLocale('az', az)

function Redirect({to}) {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

class ZonePreview extends Component {

    zones = [];

    constructor(props) {
        super(props);
        this.child = React.createRef();

        this.state = {
            user: {},
            timeSeriesFromMap: null,
            selectVal: 'NDVI',
            zoneTableRows: [],
            invp: [],
            all: "",
            selectedid: [],
            timeSeriesList: [],
            selectedPolygon: "",
            selectedZoneGeofence: "",
            selectedTime: new Date(),
            map: "",
            selectedZones: [],
            cloudCoverage: 75,
            logoutClick: false,
        };
        this.setTimeSeries = this.setTimeSeries.bind(this);
        this.callApiSelectedTimeSelected = this.callApiSelectedTimeSelected.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    getSentinelService(layerName = "NDVI") {
        this.callApiSelectedTimeSelected(layerName);
    }

    callApiSelectedTimeSelected(layerName) {
        let baseUrl = REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
        let date = this.state.selectedTime;
        if (this.sentinelHubLayer != null) {
            this.state.map.removeLayer(this.sentinelHubLayer);
        }
        let dateFrom = Moment(date).subtract(5, 'd').format('YYYY-MM-DD');
        let dateTo = Moment(date).format('YYYY-MM-DD');
        let time = dateFrom + "/" + dateTo;
        this.zones.map((polygon) => {
            if (this.state.selectedZones.includes(polygon.id)) {
                let wktgeomZone = wkt.parse(polygon.geometry);
                let geojsonFeatures = {
                    "type": "Feature",
                    "properties": {'name': polygon.name},
                    "geometry": wktgeomZone
                }
                let zoneGeofence = L.geoJSON(geojsonFeatures);
                this.sentinelHubLayer = L.tileLayer.wms(baseUrl, {
                    attribution: '&copy; <a href="https://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    layers: layerName,
                    tileSize: 512,
                    maxcc: 50,
                    time: time,
                    gain: '0.3',
                    gamma: '0.8',
                    transparent: 'true',
                    format: 'image/png',
                    crs: L.CRS.EPSG4326,
                    geometry: polygon.geometry,
                    filter: "eo:cloud_cover > 10"
                }).addTo(this.state.map)
                this.state.map.fitBounds(zoneGeofence.getBounds(), {
                    maxZoom: 16,
                    padding: [0, 50]
                });
            }
        });
    }

    setTimeSeries = val => {
        const dateArray = [];
        setTimeout(() => {
            val.forEach((el) => {
                dateArray.push(new Date(el));
            })
        }, 1000);
        this.setState({timeSeriesList: dateArray});
        this.setState({timeSeriesFromMap: dateArray})
    }


    callImageryFunction = () => {
        this.getSentinelService(this.state.selectVal);
    };

    componentDidMount() {
        this.fetchData();
        const {router} = this.props;
        const map = L.map("map", {
            renderer: L.canvas(),
            center: [40.175362, 48.815538],
            zoom: 8,
            attributionControl: false,
            layers: [L.tileLayer(REACT_APP_OSRM_URL)]
        });
        this.setState({map: map});
        const sidebar = L.control
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

        //
        let highlight;
        const style = {
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

        let selectedZones = [];
        let bef = [];

        function handleSidebarChange(id) {
            selectedZones = [];
            selectedZones.push(id);
            // if (selectedZones.includes(id)) {
            //     const index = selectedZones.indexOf(id);
            //     if (index > -1) {
            //         selectedZones.splice(index, 1); // 2nd parameter means remove one item only
            //     }
            // } else {
            //     selectedZones.push(id);
            // }
        }

        // map.addLayer(this.editableLayers);
        // this.map.addLayer(this.props.valueFromParent);
        // const rectangle = [[51.49, -0.08], [51.5, -0.06]];

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
            OpenStreetMap: streets,
            Grayscale: grayscale,
            Topographic: topographic,
            GoogleSat: googleSatt
        };

        // var options = {
        //     position: "topright", draw: {
        //         polygon: {
        //             title: "Draw a beautiful polygon!", allowIntersection: false, drawError: {
        //                 drawError: {
        //                     color: "#b00b00", timeout: 1000
        //                 }, shapeOptions: {
        //                     color: "#bada55"
        //                 }, showArea: true
        //             }, polyline: false, rectangle: false, circle: false, marker: false
        //         }, edit: {
        //             featureGroup: this.editableLayers, //REQUIRED!!
        //             remove: false
        //         }
        //     }
        // }
        // L.control.layers(baseLayers).addTo(map);

        // this.drawControl = new L.Control.Draw(options);
        // map.on("draw:created", function (e) {
        //     var layer = e.layer;
        //     // Do whatever else you need to. (save to db, add to map etc)
        // });

        // let zoneLayer = L.geoJSON().addTo(this.map);
        const sidebarlist = document.getElementById("sidebarZones");


        function createSidebarElements(wktGeom, boundsZone, geometry, id, name, description, areaHa) {
            let htmlId = 'fieldmap' + id;
            const el = `<div class="zoneTableRow" name="${name}" desc="${description}" area="${areaHa}">
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
            const chc = document.createElement("input");
            // chc.setAttribute("checked", "checked");
            chc.addEventListener('change', function change(event) {
                handleSidebarChange(id);
            })
            chc.setAttribute("type", "radio");
            chc.setAttribute("name", "zone");
            chc.value = id;

            // console.log(el);
            temp.setAttribute("class", "temp-class");
            temp.innerHTML = el.trim();
            temp.append(chc);
            // console.log(temp.lastElementChild)
            let added = sidebarlist.insertAdjacentElement("beforeend", temp);
            if (added) {
                let zoneInMinimap = L.geoJSON(wktGeom);

                zoneInMinimap.on('mouseover', function (e) {
                    setHighlight(zoneInMinimap);
                });

                zoneInMinimap.on('mouseout', function (e) {
                    unsetHighlight(zoneInMinimap);
                });

                zoneInMinimap.on('click', function (e) {
                    chc.setAttribute("checked", "checked");
                    map.fitBounds(zoneInMinimap.getBounds(), {
                        maxZoom: 16,
                        padding: [0, 50]
                    });
                    handleSidebarChange(id);
                });

                const mini_map_init = L.map(htmlId, {
                    zoomControl: false,
                    scrollWheelZoom: false,
                    scrollpropogattion: false,
                    dragging: false,
                    attributionControl: false,
                    doubleClickZoom: false
                });
                L.tileLayer(REACT_APP_GOOGLESAT_URL, {}).addTo(mini_map_init);
                zoneInMinimap.addTo(mini_map_init);//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
                mini_map_init.fitBounds(zoneInMinimap.getBounds());
            }
        }

        const zones = this.zones;
        //adds layers to map
        setTimeout(() => {
            zones.forEach((polygon) => {
                let wktgeomZone = wkt.parse(polygon.geometry);
                var geojsonFeatures = {
                    "type": "Feature", "properties": {'name': polygon.name}, "geometry": wktgeomZone
                }
                var myStyle = {
                    "opacity": 1
                };
                var zoneGeofence = L.geoJSON(geojsonFeatures, {
                    style: myStyle
                });//.addTo(map);

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

                zoneGeofence.on('mouseover', function (e) {
                    setHighlight(zoneGeofence);
                });

                zoneGeofence.on('mouseout', function (e) {
                    unsetHighlight(zoneGeofence);
                });

                zoneGeofence.on('click', function (e) {
                    request.auth.addZonePreview(polygon.id)
                });

                let areaHa = GeometryUtil.geodesicArea(coordsLatLng) / 10000;
                areaHa = Number(areaHa).toFixed(3);
                createSidebarElements(wktgeomZone, zoneGeofence.getBounds(), polygon.geometry, polygon.id, polygon.name, polygon.description, areaHa);
            });
            this.state.zoneTableRows = Array.from(sidebarlist.children);//for search
        }, 1000);
        //adds layer to map

        let zoneGeofence = [];
        let i = 0;
        setInterval(() => {
            if (bef[0] != selectedZones[0]) {
                // if (bef.length != selectedZones.length) {
                // map.removeLayer(zoneGeofence);
                zoneGeofence.map(zonee => {
                    map.removeLayer(zonee);
                });
                this.zones.map((polygon) => {
                    if (selectedZones.includes(polygon.id)) {
                        this.setState({selectedZones: selectedZones})
                        let wktgeomZone = wkt.parse(polygon.geometry);
                        let geojsonFeatures = {
                            "type": "Feature",
                            "properties": {'name': polygon.name},
                            "geometry": wktgeomZone
                        }
                        zoneGeofence[++i] = new L.geoJSON(geojsonFeatures);
                        zoneGeofence[i].addTo(map)
                        this.getTimeSeries(polygon, zoneGeofence[i]);
                        // this.setState({selectedPolygon: polygon});
                        // this.setState({selectedZoneGeofence: zoneGeofence});
                        bef = selectedZones.slice(0)
                        // bef[0] = selectedZones[0]
                        // console.log("geo: ", zoneGeofence)

                    }
                })
            }
        }, 1000);
    };

    fetchData = () => {
        request.get('users/' + request.auth.getSubject(), (err, res) => {
            if (err) {
                console.log(err)
            } else {
                this.setState({user: res.body})
                request.get('users/privileges', (err, res) => {
                    if (err) {
                        console.log('error if :' + err)
                    } else {
                        this.setState({privilege: res.body})
                    }
                })

                request.get('users/zones', (err, res) => {
                    if (err) {
                        console.log('error if :' + err)
                    } else {
                        for (let i = 0; i < res.body.length; i++) {
                            this.zones.push(res.body[i]);
                        }
                    }
                })
            }
        })

    }

    handleSelectChange = (event) => {
        this.setState({selectVal: event.target.value});
        this.callImageryFunction();
    };

    handleDateChange = val => {
        this.setState({selectedTime: val});
        this.callImageryFunction();
    }

    handleSearchChange(event) {
        let searchValue = event.target.value;
        let sidebarRows = document.getElementById('sidebarZones');

        let allChilds = [];
        allChilds = this.state.zoneTableRows;

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

    getTimeSeries(polygon, zoneGeofence) {
        let timeSeries = []
        let bboxCoords = zoneGeofence.getBounds();
        let bboxText = bboxCoords._southWest.lng + "," + bboxCoords._southWest.lat + "," + bboxCoords._northEast.lng + "," + bboxCoords._northEast.lat;
        let today = new Date();
        let oneYrAgo = new Date();
        oneYrAgo.setFullYear(today.getFullYear() - 1);
        let dateStrToday = Moment(today).format('YYYY-MM-DDTHH:mm');
        let dateStrYearBefore = Moment(oneYrAgo).format('YYYY-MM-DDTHH:mm');
        let request_url = 'imagery/timeSeries?bbox=' + bboxText + '&datetime=' + dateStrYearBefore + 'Z/' + dateStrToday + 'Z&collections=sentinel-2-l2a&cloud_coverage=' + this.state.cloudCoverage;
        request.get(request_url, (err, res) => {
            if (err) {
                console.log('error if :' + err)
            } else {
                const timeSeriesJson = JSON.parse(res.text);
                Object.keys(timeSeriesJson.features).forEach(function (key) {
                    timeSeries.push(timeSeriesJson.features[key]);
                });
            }
            // if (timeSeries.length > 0) {
            //     callApiSelectedTime(polygon, zoneGeofence, "NDVI", timeSeries[0]);
            // }
        })
        this.setTimeSeries(timeSeries);
    }

    handleCloudCoverageChange = (event, value) => {
        if (this.state.cloudCoverage !== value) {
            this.setState({cloudCoverage: value});
        }
    }

    handleDragStop = (e) => {
        this.zones.map((polygon) => {
            if (this.state.selectedZones.includes(polygon.id)) {
                let wktgeomZone = wkt.parse(polygon.geometry);
                let geojsonFeatures = {
                    "type": "Feature",
                    "properties": {'name': polygon.name},
                    "geometry": wktgeomZone
                }
                let zoneGeofence = L.geoJSON(geojsonFeatures);
                this.getTimeSeries(polygon, zoneGeofence)
            }
        });
    }

    render() {
        const {timeSeriesFromMap} = this.state;

        const tileDisabled = (date) => {
            return date < new Date()
        }

        let oneYrAgo = new Date();
        oneYrAgo.setFullYear(oneYrAgo.getFullYear() - 1);

        const handleLogout = (e) => {
            request.auth.logout();
            this.setState({logoutClick: true})
        }

        return (
            <React.Fragment>
                <div className={"mapBody"}>
                    <div className={"observationClass"}>
                        <label className={"observationLabel"}>Observation</label>
                        <FormControl className={"observationForm"}>
                            {/*<InputLabel>Layers</InputLabel>*/}
                            <Select onChange={this.handleSelectChange} value={this.state.selectVal}>
                                <MenuItem value="AGRICULTURE">Agriculture</MenuItem>
                                <MenuItem value="BATHYMETRIC">Bathymetric</MenuItem>
                                <MenuItem value="FALSE-COLOR-URBAN">False color (urban)</MenuItem>
                                <MenuItem value="FALSE-COLOR">False color (vegetation)</MenuItem>
                                <MenuItem value="GEOLOGY">Geology</MenuItem>
                                <MenuItem value="MOISTURE-INDEX">Moisture Index</MenuItem>
                                <MenuItem value="NATURAL-COLOR">Natural color (true color)</MenuItem>
                                <MenuItem value="NDVI">NDVI</MenuItem>
                                <MenuItem value="SWIR">SWIR</MenuItem>
                                <MenuItem value="TRUE-COLOR-S2L2A">TRUE COLOR S2L2A</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={"observationForm"}>
                            <DatePicker tileDisabled={tileDisabled}
                                        locale="az"
                                        style={{position: "relative", zIndex: 9999999}}
                                        onChange={this.handleDateChange}
                                        value={this.state.selectedTime}
                                        selectRange returnValue="start"
                                        maxDate={new Date()}
                                        minDate={oneYrAgo}
                                        includeDates={timeSeriesFromMap}
                                        selected={this.state.selectedTime}
                            />
                        </FormControl>
                        <label className={"cloudCoverageClass"}>Cloud coverage:</label>
                        <FormControl className={"observationForm"}>
                            <Box style={{width: 150}} alignItems="center">
                                <Slider
                                    value={this.state.cloudCoverage}
                                    valueLabelDisplay="auto"
                                    marks
                                    min={0}
                                    max={100}
                                    step={1}
                                    style={{
                                        color: "rgb(0 0 0 / 68%)"
                                    }}
                                    onChange={this.handleCloudCoverageChange}
                                    onChangeCommitted={this.handleDragStop}
                                />
                            </Box>
                        </FormControl>
                        <div></div>
                        {request.auth.isAuthenticated() && (
                            <label aria-label="Logout"

                                   style={{
                                       cursor: 'pointer',
                                       marginLeft: "auto",
                                       marginRight: "10px",
                                       fontFamily: "Roboto",
                                       fontWeight: 500
                                   }}
                                   onClick={handleLogout}>
                                Logout
                            </label>

                        )}
                        {this.state.logoutClick && (
                            <Redirect to={APP_CONSTANTS.LOGIN_URL}/>
                        )}
                    </div>
                    <div id="sidebar" className="leaflet-sidebar collapsed">
                        <div className="leaflet-sidebar-tabs">
                            <ul role="tablist">
                                <li role="tab">
                                    <a href="#home">
                                        <i className="fa fa-caret-right"/>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="leaflet-sidebar-content">
                            <div className="leaflet-sidebar-pane" id="home">
                                <h1 className="leaflet-sidebar-header">
                                    Zones
                                    <div className="leaflet-sidebar-close">
                                        <i className="fa fa-caret-left"/>
                                    </div>
                                </h1>
                            </div>
                            <div className="sidebarContentBody">
                                <input className="searchbox" onChange={this.handleSearchChange} type="text"
                                       placeholder="Zona adı,təsvir, sahə ..."/><br/>
                                <div className="sidebar-tab">
                                    <div id="sidebarZones" className="sideBarZones">
                                    </div>
                                </div>
                            </div>
                            <div className="leaflet-sidebar-footer">
                                {/*<Button variant="outlined" onClick={() => {*/}
                                {/*    this.callImageryFunction(this.state.value);*/}
                                {/*}}> Apply </Button>*/}
                                <h1 style={{marginTop: 0}}>© GPS.AZ</h1>
                            </div>
                        </div>
                    </div>
                    <div id="map"></div>
                    {/*<Map userZoneObject={this.zones} style={{}} zonePreviewCallback={this.handleTimeSeriesCallback}*/}
                    {/*     ref={this.child}>*/}
                    {/*</Map>*/}
                </div>
                {}
            </React.Fragment>

        )
    }
}

export default withRouter(ZonePreview)