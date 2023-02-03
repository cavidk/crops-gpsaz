import React, {useEffect, useState} from 'react';
import ActionsBox from "../Sidebar/ActionsBox";
import SearchBox from "./SearchBox"
import SearchDates from "./SearchDates"
import BottomPanel from "./BottomPanel"
import BottomPanelTools from "./BottomPanelTools"
import L from "leaflet";
import "leaflet-draw";
import Menu from '../Sidebar/Menu'
import FieldList from '../Sidebar/FieldList'
import {useSelector, useDispatch} from 'react-redux';

import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import "../../assets/css/zone-preview.css";
import "../../assets/css/main.css"


const REACT_APP_OSRM_URL = process.env.REACT_APP_OSRM_URL;
const REACT_APP_GOOGLESAT_URL = process.env.REACT_APP_GOOGLESAT_URL;

const Main = (props) => {
    const [map, setMap] = useState(null);

    const [sidebarMobileClass, setSidebarMobileClass] = useState("");
    const [sidebarClass, setSidebarClass] = useState("opened");
    const [sidebarButtonText, setSidebarButtonText] = useState("Tap to hide fields");

    const selectedZone = useSelector((state) => state.selectedZone);
    const availableDates = useSelector((state) => state.availableDates);

    useEffect(() => {
        if (window.innerWidth <= 980) {
            setSidebarClass("")
            setSidebarButtonText("Open fields")
            setSidebarMobileClass("mobile")
        }
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 980) {
                setSidebarMobileClass("mobile")
            } else {
                setSidebarMobileClass("")
                setSidebarClass("opened")
            }
        }, false);
        let osm = L.tileLayer(REACT_APP_OSRM_URL, {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
        let gst = L.tileLayer(REACT_APP_GOOGLESAT_URL, {
            attribution: '&copy; <a href="http://osm.org/copyright">GoogleSatelliteMap</a> contributors'
        });
        const map = L.map("map", {
            renderer: L.canvas(),
            center: [40.175362, 48.815538],
            zoom: 8,
            attributionControl: false,
            zoomControl: true,
            layers: [osm, gst]
        });



        setMap(map)
        return () => {
            map.remove();
        }
    }, []);

    function handleToggleSidebar() {
        if (sidebarClass === "") {
            setSidebarClass("opened")
            setSidebarButtonText("Tap to hide fields")
        } else {
            setSidebarClass("")
            setSidebarButtonText("Open fields")
        }
    }

    return (
        <React.Fragment>
            <div className={"container"}>
                <div className={"layout"}>
                    <div className={"content"}>
                        <div className={"main-map"}>
                            <div className={"main-map-container " + sidebarMobileClass}>
                                <div className={"ui-map"}>
                                    <div id={"map"}></div>
                                    <SearchBox/>
                                    {selectedZone !== null && availableDates.length > 0 && 1 === 2 && (
                                        <SearchDates/>
                                    )}
                                </div>
                                <div className="bottom-panel-wrapper">
                                    <div className="bottom-panel">
                                        {selectedZone !== null && (
                                            <BottomPanelTools/>
                                        )}
                                        <div className="cm-bottom-menu-container">
                                            {selectedZone !== null && (
                                                <SearchDates/>
                                            )}
                                            {selectedZone !== null && (
                                                <BottomPanel/>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FieldList map={map}
                                       sidebarClass={sidebarClass}
                                       sidebarMobileClass={sidebarMobileClass}
                                       handleToggleSidebar={handleToggleSidebar}
                                       sidebarButtonText={sidebarButtonText}
                            />
                        </div>
                    </div>
                    <Menu />
                </div>
            </div>

        </React.Fragment>
    )
}

export default Main;
