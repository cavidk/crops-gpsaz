import React, {Component, useEffect, useState} from 'react';
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
import SidebarZones from "./SidebarZones";
import ZoneObservation from "./ZoneObservation";
import ZoneTimeseries from "./ZoneTimeseries";

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

class Zone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            zones: [],
            searchValue: null,
            logoutClick: false,
            sentinelType: "NDVI",
            selectedDate: new Date(),
            sliderCloudCoverage: 15,
            cloudCoverage: 15,
            availableDates: null,
            searchText: null,
            zoneStatistics: [],
            zoneTimeseries: [],
        };

        this.availableDatesHandler = this.availableDatesHandler.bind(this)
        this.selectedDateHandler = this.selectedDateHandler.bind(this)
        this.zoneTimeseriesHandler = this.zoneTimeseriesHandler.bind(this)
        this.zoneStatisticsHandler = this.zoneStatisticsHandler.bind(this)
    }

    availableDatesHandler(timeSeries) {
        let dateArray = [];
        if (timeSeries.length > 0) {
            timeSeries.forEach(date => {
                dateArray.push(new Date(date));
            })
            this.setState({availableDates: dateArray})
        }
    }
    selectedDateHandler(date) {
        if (date.toDateString() != this.state.selectedDate.toDateString()) {
            this.setState({selectedDate: date})
        }
    }
    zoneStatisticsHandler(zoneStatistics) {
        this.setState({zoneStatistics: zoneStatistics})
    }
    zoneTimeseriesHandler(zoneTimeseries) {
        this.setState({zoneTimeseries: zoneTimeseries})
    }

    componentWillMount() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
        }
        const fetchZones = async (page = 1) => {
            const res = await fetch(
                request.REACT_APP_API_BASE_URL + `zones?page=${page}`,
                {headers}
            ).then(response => response.json());
            return res;
        };
        fetchZones().then(response => {
            this.setState({zones: response.data.data});
        });
    }
    componentDidMount() {
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
        let baseMaps = {
            OpenStreetMap: osm,
            GoogleSat: gst
        };

        L.control.layers(baseMaps).addTo(map);
        this.setState({map: map});

        map.on("zoomstart", function (e) {
            // if (selectedZones.length > 0) {
            //     let element = document.getElementById("sidebarElementChild" + selectedZones[0]);
            //     element.setAttribute("style", "display:block");
            // }
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
    };

    handleSelectChange = (event) => {
        this.setState({sentinelType: event.target.value});
    };
    handleDateChange = (val) => {
        this.setState({selectedDate: val});
    }
    handleSearchChange = (event) => {
        let searchValue = event.target.value;
        if (searchValue != this.state.searchText) {
            this.setState({searchText: searchValue})
        }
    }
    handleCloudCoverageChange = (event, value) => {
        if (this.state.sliderCloudCoverage !== value) {
            this.setState({sliderCloudCoverage: value});
        }
    }
    handleDragStop = (e, value) => {
        if (this.state.cloudCoverage !== value) {
            this.setState({cloudCoverage: value});
        }
    }
    openMobileBox(event) {
        let el = document.getElementById('mobNav');
        let toUp = document.getElementById('toUp');
        let toDown = document.getElementById('toDown');
        el.setAttribute("style", "margin-bottom: 0;");
        toUp.setAttribute("style", "display: none;");
        toDown.setAttribute("style", "display: block;");
    }
    closeMobileBox(event) {
        let el = document.getElementById('mobNav');
        let toUp = document.getElementById('toUp');
        let toDown = document.getElementById('toDown');
        el.setAttribute("style", "margin-bottom: -200px;");
        toUp.setAttribute("style", "display: block;");
        toDown.setAttribute("style", "display: none;");
    }

    render() {
        const {availableDates} = this.state;

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
                <div className={"container"}>
                    <div className={"header"}>
                        <label className={"observationLabel"}>Observation</label>
                        <FormControl className={"observationForm"}>
                            <Select onChange={this.handleSelectChange} value={this.state.sentinelType}>
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
                                        value={this.state.selectedDate}
                                        selectRange returnValue="start"
                                        maxDate={new Date()}
                                        minDate={oneYrAgo}
                                        includeDates={this.state.availableDates}
                                        selected={this.state.selectedDate}
                            />
                        </FormControl>
                        <label className={"cloudCoverageClass"}>Cloud coverage:</label>
                        <FormControl className={"observationForm"}>
                            <Box style={{width: 150}} alignItems="center">
                                <Slider
                                    value={this.state.sliderCloudCoverage}
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
                                    <SidebarZones
                                        map={this.state.map}
                                        zones={this.state.zones}
                                        searchText={this.state.searchText}
                                        sentinelType={this.state.sentinelType}
                                        selectedDate={this.state.selectedDate}
                                        cloudCoverage={this.state.cloudCoverage}
                                        availableDatesHandler={this.availableDatesHandler}
                                        selectedDateHandler={this.selectedDateHandler}
                                        zoneTimeseriesHandler={this.zoneTimeseriesHandler}
                                        zoneStatisticsHandler={this.zoneStatisticsHandler}
                                    />
                                </div>
                            </div>
                            <div className="leaflet-sidebar-footer">
                                <img src={require('./logo140.png')}/>
                            </div>
                        </div>
                    </div>
                    <div id="map"></div>
                    <div id="mobNav" className="mobile-navigation">
                        <div className="mob-nav-tool">
                            <span id="toUp" className="toUp" onClick={this.openMobileBox}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path
                                    d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
                            </span>
                            <span id="toDown" className="toDown" onClick={this.closeMobileBox}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path
                                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                            </span>
                        </div>
                        <FormControl className={"observationForm-mobile"}>
                            <label>Observation: </label>

                            <Select onChange={this.handleSelectChange} value={this.state.sentinelType}>
                                <MenuItem value="NDVI">Green Vegetation</MenuItem>
                                <MenuItem value="MOISTURE_INDEX">Moisture Index</MenuItem>
                                <MenuItem value="TRUE_COLOR">Normal Image</MenuItem>
                                <MenuItem value="SAVI">Soil Abj. Vegetation Index</MenuItem>
                                <MenuItem value="SWIR">Water in Plants</MenuItem>
                                <MenuItem value="NDWI">Water Index</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={"observationForm-mobile"}>
                            <label>Date: </label>
                            <DatePicker
                                locale="az"
                                style={{position: "relative", zIndex: 9999999}}
                                onChange={this.handleDateChange}
                                value={this.state.selectedDate}
                                selectRange returnValue="start"
                                maxDate={new Date()}
                                minDate={oneYrAgo}
                                includeDates={availableDates}
                                selected={this.state.selectedDate}
                            />
                        </FormControl>
                        <FormControl className={"observationForm-mobile"}>
                            <label className={"cloudCoverageClass-mobile"}>Cloud coverage:</label>
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
                    </div>
                    <div className="bottom">
                        {Object.keys(this.state.zoneStatistics).length && (
                            <ZoneObservation statistics={this.state.zoneTimeseries}/>
                        )}
                        {Object.keys(this.state.zoneStatistics).length && (
                            <ZoneTimeseries timeseries={this.state.zoneTimeseries}
                                            statistics={this.state.zoneStatistics}/>
                        )}
                    </div>
            </div>
            </React.Fragment>

        )
    }
}

export default withRouter(Zone)
