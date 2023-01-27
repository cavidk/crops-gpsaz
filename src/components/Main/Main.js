import React, {useEffect, useState} from 'react';
import {FormControl, MenuItem, Select} from '@material-ui/core';
import {withRouter} from '../map/withRouter';
import DatePicker, {registerLocale} from "react-datepicker";
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import {useNavigate} from "react-router-dom";
import ActionsBox from "./ActionsBox";
import SearchBox from "./SearchBox"
import SidebarZones from "../zones/SidebarZones";
import ZoneObservation from "../zones/ZoneObservation";
import ZoneTimeseries from "../zones/ZoneTimeseries";
import * as L from "leaflet";

import "react-datepicker/dist/react-datepicker.css";
// import "../zones/css/zone-preview.css";
// import "leaflet/dist/leaflet.css";
import "./css/main.css"

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

const Main = (props) => {
    const [map, setMap] = useState(null);
    const [zones, setZones] = useState([]);
    const [searchValue, setSearchValue] = useState(null);
    const [logoutClick, setLogoutClick] = useState(false);
    const [sentinelType, setSentinelType] = useState("NDVI");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sliderCloudCoverage, setSliderCloudCoverage] = useState(15);
    const [cloudCoverage, setCloudCoverage] = useState(15);
    const [availableDates, setAvailableDates] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [zoneStatistics, setZoneStatistics] = useState([]);
    const [zoneTimeseries, setZoneTimeseries] = useState([]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
        }
        fetch(
            request.REACT_APP_API_BASE_URL + `zones?page=1`,
            {headers}
        ).then(
            response => response.json()
        ).then(response => {
            setZones(response.data.data);
        });

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
        // let baseMaps = {
        //     OpenStreetMap: osm,
        //     GoogleSat: gst
        // };
        // L.control.layers(baseMaps).addTo(map);
        setMap(map);
    }, []);

    const tileDisabled = (date) => {
        return date < new Date()
    }

    let oneYrAgo = new Date();
    oneYrAgo.setFullYear(oneYrAgo.getFullYear() - 1);

    const handleLogout = (e) => {
        request.auth.logout();
        setLogoutClick(true)
    }

    return (
        <React.Fragment>
            <div className={"container"}>
                <div className={"layout"}>
                    <div className={"content"}>
                        <div className={"main-map"}>
                            <div className={"main-map-container"}>
                                <div className={"ui-map"}>
                                    <div id={"map"}></div>
                                    <SearchBox />
                                </div>
                            </div>
                            <div className={"main-map-sidebar opened"}>
                                <div className={"sidebar-column"}>
                                    <div className={"fold-container"}>
                                        <div className={"field-list-container"}>
                                            <ActionsBox/>
                                            <div className={"field-list-content"}>
                                                    <SidebarZones
                                                        map={map}
                                                        zones={zones}
                                                        searchText={searchText}
                                                        sentinelType={sentinelType}
                                                        selectedDate={selectedDate}
                                                        cloudCoverage={cloudCoverage}
                                                        availableDatesHandler={availableDatesHandler}
                                                        selectedDateHandler={selectedDateHandler}
                                                        zoneTimeseriesHandler={zoneTimeseriesHandler}
                                                        zoneStatisticsHandler={zoneStatisticsHandler}
                                                    />
                                            </div>
                                            <div className={"field-list-buttons"}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"btn-wrap"}>
                                        <button className="fold-btn">
                                            <div>
                                                <div className={"fold-content"}>
                                                    <span className={"fold-text ng-star-inserted"}>
                                                        Tap to hide fields
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <div id="sidebar" className="leaflet-sidebar" style={{display: 'none'}}>
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
                                            <input className="searchbox" onChange={handleSearchChange} type="text"
                                                   placeholder="Zona adı,təsvir, sahə ..."/><br/>
                                            <div className="sidebar-tab">
                                                <SidebarZones
                                                    map={map}
                                                    zones={zones}
                                                    searchText={searchText}
                                                    sentinelType={sentinelType}
                                                    selectedDate={selectedDate}
                                                    cloudCoverage={cloudCoverage}
                                                    availableDatesHandler={availableDatesHandler}
                                                    selectedDateHandler={selectedDateHandler}
                                                    zoneTimeseriesHandler={zoneTimeseriesHandler}
                                                    zoneStatisticsHandler={zoneStatisticsHandler}
                                                />
                                            </div>
                                        </div>
                                        <div className="leaflet-sidebar-footer">
                                            <img src={require('../zones/logo140.png')}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"menu-box"}>
                        <div className={"menu-container collapsed"}>

                        </div>
                    </div>

                    <div className={"header"} style={{display: 'none'}}>
                        <label className={"observationLabel"}>Observation</label>
                        <FormControl className={"observationForm"}>
                            <Select onChange={handleSelectChange} value={sentinelType}>
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
                                        onChange={handleDateChange}
                                        value={selectedDate}
                                        selectRange returnValue="start"
                                        maxDate={new Date()}
                                        minDate={oneYrAgo}
                                        includeDates={availableDates}
                                        selected={selectedDate}
                            />
                        </FormControl>
                        <label className={"cloudCoverageClass"}>Cloud coverage:</label>
                        <FormControl className={"observationForm"}>
                            <Box style={{width: 150}} alignItems="center">
                                <Slider
                                    value={sliderCloudCoverage}
                                    valueLabelDisplay="auto"
                                    marks
                                    min={0}
                                    max={100}
                                    step={1}
                                    style={{
                                        color: "rgb(0 0 0 / 68%)"
                                    }}
                                    onChange={handleCloudCoverageChange}
                                    onChangeCommitted={handleDragStop}
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
                        {logoutClick && (
                            <Redirect to={APP_CONSTANTS.LOGIN_URL}/>
                        )}
                    </div>
                    <div id="mobNav" className="mobile-navigation" style={{display: 'none'}}>
                        <div className="mob-nav-tool">
                            <span id="toUp" className="toUp" onClick={openMobileBox}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path
                                    d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
                            </span>
                            <span id="toDown" className="toDown" onClick={closeMobileBox}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path
                                    d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                            </span>
                        </div>
                        <FormControl className={"observationForm-mobile"}>
                            <label>Observation: </label>

                            <Select onChange={handleSelectChange} value={sentinelType}>
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
                                onChange={handleDateChange}
                                value={selectedDate}
                                selectRange returnValue="start"
                                maxDate={new Date()}
                                minDate={oneYrAgo}
                                includeDates={availableDates}
                                selected={selectedDate}
                            />
                        </FormControl>
                        <FormControl className={"observationForm-mobile"}>
                            <label className={"cloudCoverageClass-mobile"}>Cloud coverage:</label>
                            <Box style={{width: 150}} alignItems="center">
                                <Slider
                                    value={cloudCoverage}
                                    valueLabelDisplay="auto"
                                    marks
                                    min={0}
                                    max={100}
                                    step={1}
                                    style={{
                                        color: "rgb(0 0 0 / 68%)"
                                    }}
                                    onChange={handleCloudCoverageChange}
                                    onChangeCommitted={handleDragStop}
                                />
                            </Box>
                        </FormControl>
                    </div>
                    <div className="bottom" style={{display: 'none'}}>
                        {Object.keys(zoneStatistics).length && (
                            <ZoneObservation statistics={zoneTimeseries}/>
                        )}
                        {Object.keys(zoneStatistics).length && (
                            <ZoneTimeseries timeseries={zoneTimeseries}
                                            statistics={zoneStatistics}/>
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

    function handleSelectChange(event) {
        this.setState({sentinelType: event.target.value});
    }

    function handleDateChange(val) {
        this.setState({selectedDate: val});
    }

    function handleSearchChange(event) {
        let searchValue = event.target.value;
        if (searchValue != searchText) {
            this.setState({searchText: searchValue})
        }
    }

    function handleCloudCoverageChange(event, value) {
        if (sliderCloudCoverage !== value) {
            this.setState({sliderCloudCoverage: value});
        }
    }

    function handleDragStop(e, value) {
        if (cloudCoverage !== value) {
            this.setState({cloudCoverage: value});
        }
    }

    function openMobileBox(event) {
        let el = document.getElementById('mobNav');
        let toUp = document.getElementById('toUp');
        let toDown = document.getElementById('toDown');
        el.setAttribute("style", "margin-bottom: 0;");
        toUp.setAttribute("style", "display: none;");
        toDown.setAttribute("style", "display: block;");
    }

    function closeMobileBox(event) {
        let el = document.getElementById('mobNav');
        let toUp = document.getElementById('toUp');
        let toDown = document.getElementById('toDown');
        el.setAttribute("style", "margin-bottom: -200px;");
        toUp.setAttribute("style", "display: block;");
        toDown.setAttribute("style", "display: none;");
    }

    //handlers
    function availableDatesHandler(timeSeries) {
        let dateArray = [];
        if (timeSeries.length > 0) {
            timeSeries.forEach(date => {
                dateArray.push(new Date(date));
            })
            this.setState({availableDates: dateArray})
        }
    }

    function selectedDateHandler(date) {
        if (date.toDateString() != selectedDate.toDateString()) {
            this.setState({selectedDate: date})
        }
    }

    function zoneStatisticsHandler(zoneStatistics) {
        this.setState({zoneStatistics: zoneStatistics})
    }

    function zoneTimeseriesHandler(zoneTimeseries) {
        this.setState({zoneTimeseries: zoneTimeseries})
    }
}

export default withRouter(Main);
