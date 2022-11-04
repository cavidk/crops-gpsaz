import React, {Component, useEffect} from 'react';
import {FormControl, MenuItem, Select} from '@material-ui/core';
import {withRouter} from '../map/withRouter';
import DatePicker, {registerLocale} from "react-datepicker";
import wkt from "wkt";
import GeometryUtil from "leaflet-geometryutil";
import Moment from "moment/moment";
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import {useNavigate} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "./css/zone-preview.css";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2";
import "leaflet-draw";
import "../map/css/leaflet-sidebar.css";
import "../map/css/leaflet-sidebar.min.css";
import az from 'date-fns/locale/az';

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
    selTime = null;

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
            cloudCoverage: 25,
            logoutClick: false,
        };
        this.setTimeSeries = this.setTimeSeries.bind(this);
        this.callApiSelectedTimeSelected = this.callApiSelectedTimeSelected.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    callApiSelectedTimeSelected(layer, date) {
        let baseUrl = REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
        let _date = date;
        if (this.sentinelHubLayer != null) {
            this.state.map.removeLayer(this.sentinelHubLayer);
        }
        let dateFrom = Moment(_date).subtract(5, 'd').format('YYYY-MM-DD');
        let dateTo = Moment(_date).format('YYYY-MM-DD');
        let time = dateFrom + "/" + dateTo;
        // console.log("Date: ", time);
        // console.log("Layer: ", layer);
        this.zones.map((polygon) => {
            if (this.state.selectedZones.includes(polygon.id)) {
                let element = document.getElementById("sidebarElementChild" + polygon.id);
                element.setAttribute("style", "display:block");
                let wktgeomZone = wkt.parse(polygon.geometry);
                let geojsonFeatures = {
                    "type": "Feature",
                    "properties": {'name': polygon.name},
                    "geometry": wktgeomZone
                }
                let zoneGeofence = L.geoJSON(geojsonFeatures);
                this.sentinelHubLayer = L.tileLayer.wms(baseUrl, {
                    attribution: '&copy; <a href="https://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                    // urlProcessingApi:"https://services.sentinel-hub.com/ogc/wms/1d4de4a3-2f50-493c-abd8-861dec3ae6b2",
                    layers: layer,
                    tileSize: 512,
                    // preset: layerName,
                    maxcc: 20,
                    time: Moment(_date).format('YYYY-MM-DD'),
                    gain: '0.3',
                    gamma: '0.8',
                    transparent: true,
                    format: 'image/png',
                    crs: L.CRS.EPSG4326,
                    geometry: polygon.geometry
                }).addTo(this.state.map).bringToFront();

                this.state.map.fitBounds(zoneGeofence.getBounds(), {
                    maxZoom: 16,
                    padding: [0, 50]
                });
                this.sentinelHubLayer.on('load', function () {
                    element.setAttribute("style", "display:none");
                })
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

    callImageryFunction = (layerName) => {
        this.callApiSelectedTimeSelected(layerName, this.state.selectedTime);
    };

    componentDidMount(elementId) {
        this.fetchData();
        const {router} = this.props;
        // OpenStreetMap
        let osm = L.tileLayer(REACT_APP_OSRM_URL, {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        //GoogleSatellite
        let gst = L.tileLayer(REACT_APP_GOOGLESAT_URL, {
            attribution: '&copy; <a href="http://osm.org/copyright">GoogleSatelliteMap</a> contributors'
        });
        const map = L.map("map", {
            renderer: L.canvas(),
            center: [40.175362, 48.815538],
            zoom: 8,
            attributionControl: false,
            layers: [osm, gst]
        });
        //
        let baseMaps = {
            OpenStreetMap: osm,
            GoogleSat: gst
        };
        //
        L.control.layers(baseMaps).addTo(map);
        this.setState({map: map});


        map.on("zoomstart", function (e) {
            if (selectedZones.length > 0) {
                let element = document.getElementById("sidebarElementChild" + selectedZones[0]);
                element.setAttribute("style", "display:block");
            }
        });

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
            if (!selectedZones.includes(id)) {
                selectedZones = [];
                selectedZones.push(id);
                let element = document.getElementById("sidebarElementChild" + id);
                element.setAttribute("style", "display:block");
            }
            // if (selectedZones.includes(id)) {
            //     const index = selectedZones.indexOf(id);
            //     if (index > -1) {
            //         selectedZones.splice(index, 1); // 2nd parameter means remove one item only
            //     }
            // } else {
            //     selectedZones.push(id);
            // }
        }

        // let zoneLayer = L.geoJSON().addTo(this.map);
        const sidebarlist = document.getElementById("sidebarZones");


        function createSidebarElements(wktGeom, boundsZone, geometry, id, name, description, areaHa) {
            let htmlId = 'fieldmap' + id;
            const el = `<div class="zoneTableRow">
                            <div class="lds-dual-ring" id="sidebarElementChild${id}"></div>
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

            temp.setAttribute("class", "temp-class");
            temp.setAttribute("detail", name);
            temp.setAttribute("desc", description);
            temp.setAttribute("area", areaHa);
            temp.setAttribute("id", "sidebarElement" + id);

            temp.innerHTML = el.trim();
            temp.append(chc);
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
            if (this.selTime != null) {
                this.selTime = null;
            }
            if (bef[0] != selectedZones[0]) {
                // if (bef.length != selectedZones.length) {
                // map.removeLayer(zoneGeofence);
                zoneGeofence.map(_zone => {
                    map.removeLayer(_zone);
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
                        zoneGeofence[++i] = new L.geoJSON(geojsonFeatures, {
                            style: {
                                color: "red",
                                weight: 1,
                                opacity: 1,
                                dashArray: '20,10',
                                lineJoin: 'round',
                                fillOpacity: 0
                            }
                        });
                        zoneGeofence[i].addTo(map)
                        this.getTimeSeries(polygon, zoneGeofence[i]);
                        // this.setState({selectedPolygon: polygon});
                        // this.setState({selectedZoneGeofence: zoneGeofence});
                        bef = selectedZones.slice(0)
                        // bef[0] = selectedZones[0]
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
        this.callApiSelectedTimeSelected(event.target.value, this.state.selectedTime);
    };

    handleDateChange = val => {
        this.setState({selectedTime: val});
        this.callApiSelectedTimeSelected(this.state.selectVal, val);
    }

    handleSearchChange(event) {
        let searchValue = event.target.value;
        let sidebarRows = document.getElementById('sidebarZones');

        let allChilds = [];
        allChilds = this.state.zoneTableRows;
        if (searchValue.length > 0) {
            sidebarRows.innerText = '';
            allChilds.forEach((child: HTMLDivElement) => {
                let zoneName = child.getAttribute("detail").toLowerCase();
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
            this.selTime = timeSeries[0];
            if (timeSeries.length > 0) {
                this.callApiSelectedTimeSelected(this.state.selectVal, timeSeries[0]);
            }
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
                                <MenuItem value="NDVI">Green Vegetation</MenuItem>
                                <MenuItem value="MOISTURE_INDEX">Moisture Index</MenuItem>
                                <MenuItem value="TRUE_COLOR">Normal Image</MenuItem>
                                <MenuItem value="SAVI">Soil Abj. Vegetation Index</MenuItem>
                                <MenuItem value="SWIR">Water in Plants</MenuItem>
                                <MenuItem value="NDWI">Water Index</MenuItem>
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
                                <img src={require('./logo140.png')}/>
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