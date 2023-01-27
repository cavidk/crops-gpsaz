import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GeometryUtil from "leaflet-geometryutil";
import wkt from "wkt";
import L from "leaflet";
import Moment from "moment";
import Loading from "../Loader/Loading";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedZone } from "../../slices/selectedZoneSlice";
import { setSelectedDate } from "../../slices/selectedDateSlice";
import { setAvailableDates } from "../../slices/availableDatesSlice";

const request = require("../../utils/request");

const REACT_APP_SENTINEL_NDVI_API_ENDPOINT = process.env.REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
const REACT_APP_GOOGLESAT_URL = process.env.REACT_APP_GOOGLESAT_URL;
const REACT_APP_OSRM_URL = process.env.REACT_APP_OSRM_URL;

const Fields = (props) => {
    const [zones, setZones] = useState([]);
    const [page, setPage] = useState(1);
    const [sentinelType, setSentinelType] = useState("NDVI");
    const [polygon, setPolygon] = useState(null);
    const [cloudCoverage, setCloudCoverage] = useState(15);
    const [hasMore, setHasMore] = useState(true);
    const [searching, setSearching] = useState(false);
    const [firstLoading, setFirstLoading] = useState(false);

    const dispatch = useDispatch();
    const selectedDate = useSelector((state) => state.selectedDate);
    const searchText = useSelector((state) => state.searchText);

    let _sentinelHubLayer = null;
    let _maps = [];

    useEffect(() => {
        if (!firstLoading && zones.length) {
            zones.map((polygon, index) => {
                generateMiniMap(polygon);
            });
            setFirstLoading(true);
        }
    }, [zones]);

    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("jwt")),
        };
        fetch(request.REACT_APP_API_BASE_URL + `zones?page=1`, { headers })
            .then((response) => response.json())
            .then((response) => {
                setZones(response.data.data);
            });
    }, []);

    useEffect(() => {
        if (polygon) {
            callApiSelectedTimeSelected(sentinelType, selectedDate, polygon);
        }
    }, [selectedDate, sentinelType]);

    useEffect(() => {
        if (searchText !== null) {
            fetchMoreData(searchText, true).then((r) => {});
        }
    }, [searchText]);

    useEffect(() => {
        if (polygon) {
            getTimeSeries(polygon, cloudCoverage).then((r) => {});
        }
    }, [cloudCoverage]);

    async function fetchMoreData(searchQuery = searchText, search = false) {
        if (!searching) {
            setSearching(true);
            let _zones = [];
            let _page = page + 1;
            if (search === true) {
                _maps.map((zone, i) => {
                    if (_maps[zone.id]) {
                        _maps[zone.id].off();
                        _maps[zone.id].remove();
                    }
                });
                _page = 1;
                _maps = [];
                setZones([]);
                setPage(1);
            }
            if (searchQuery == null || searchQuery === "") {
                searchQuery = "";
            } else {
                searchQuery = searchText["searchText"];
            }
            const headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("jwt")),
            };
            const fetchZones = async () => {
                const res = await fetch(
                    request.REACT_APP_API_BASE_URL +
                    `zones?page=${_page}&query=${searchQuery}`,
                    { headers }
                ).then((response) => response.json());
                return res;
            };
            await fetchZones().then((response) => {
                _zones = response.data.data;
            });
            let stateZones = zones;
            if (search === true) {
                setZones(_zones);
            } else {
                setZones(stateZones.concat(_zones));
                setPage(_page);
            }
            if (_zones.length < 10) {
                setHasMore(false);
            } else {
                setHasMore(true);
            }

            setTimeout(() => {
                _zones.map((polygon, index) => {
                    generateMiniMap(polygon);
                });
            }, 500);

            setSearching(false);
        }
    }

    return (
        <div className="sideBarZones" id={"field-list"}>
            <InfiniteScroll
                dataLength={zones.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Loading />}
                scrollableTarget="field-list"
            >
                {zones.map((i, index) => (
                    <div
                        key={`uniqueKey${i.id}`}
                        className="temp-class"
                        id={`sidebarElement${i.id}`}
                    >
                        <div className={"_nghost-pfn-c255"}>
                            <div className="zoneTableRow">
                                <div
                                    className={`preview-box`}
                                    id={`fieldmap${i.id}`}
                                    onClick={() => handleMiniMapClick(props.map, i)}
                                >
                                    <div
                                        className="lds-dual-ring"
                                        id={`sidebarElementChild${i.id}`}
                                    ></div>
                                </div>
                                <div className="field-info">
                                    <ui-clipped-text>
                                        <div container="body" triggers="hover">
                      <span className="field-title">
                        <span data-id="field-name" className="field-name">
                          {i.name}
                        </span>
                        <div
                            data-id="field-pro-label d-none"
                            className={
                                "ui-pro-label ui-label field-label outlined"
                            }
                        >
                          <span className="value">Pro</span>
                        </div>
                      </span>
                                        </div>
                                    </ui-clipped-text>
                                    <span data-id="field-group" className="field-line">
                    &nbsp;
                  </span>
                                    <div className="field-line-double">
                                        <ui-clipped-text className="field-line-left">
                                            <div className="clipLine">
                        <span
                            data-id="field-crop"
                            className="field-line-left-in field-255"
                        >
                          {" "}
                            2023 - Unknown crop{" "}
                        </span>
                                            </div>
                                        </ui-clipped-text>
                                        <span
                                            data-id="field-area"
                                            className="field-area field-line-right field-255"
                                        >
                      {" "}
                                            {calculateArea(i)} ha{" "}
                    </span>
                                    </div>
                                </div>
                                <button
                                    className="mat-tooltip-trigger find-field-control"
                                    aria-describedby="cdk-describedby-message-gfv-1-42"
                                    onClick={() => handleShowCrop(props.map, i)}
                                >
                                    <mat-icon
                                        role="img"
                                        svgicon="target"
                                        class="mat-icon find-control mat-icon-no-color"
                                        aria-hidden="true"
                                        data-mat-icon-type="svg"
                                        data-mat-icon-name="target"
                                    >
                                        <svg
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 12 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fit=""
                                            preserveAspectRatio="xMidYMid meet"
                                            focusable="false"
                                        >
                                            <path
                                                d="M6 3.81817C4.79454 3.81817 3.81819 4.79454 3.81819 5.99997C3.81819 7.20541 4.79454 8.18181 6 8.18181C7.20546 8.18181 8.18181 7.20544 8.18181 6C8.18181 4.79456 7.20544 3.81817 6 3.81817ZM10.8764 5.45453C10.6254 3.17999 8.81999 1.37454 6.54544 1.12364V0H5.45453V1.12364C3.17999 1.37454 1.37454 3.17999 1.12364 5.45453H0V6.54544H1.12364C1.37454 8.81999 3.18001 10.6254 5.45455 10.8764V12H6.54544V10.8764C8.81999 10.6254 10.6254 8.81999 10.8764 6.54544H12V5.45453H10.8764ZM6 9.81817C3.89183 9.81817 2.18183 8.10817 2.18183 6C2.18183 3.89183 3.89183 2.18183 6 2.18183C8.10817 2.18183 9.81817 3.8918 9.81817 6C9.81817 8.1082 8.10817 9.81817 6 9.81817Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </mat-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );

    async function getTimeSeries(_polygon, _cloudCoverage = cloudCoverage) {
        showLoader(_polygon.id);
        let timeSeries = [];
        let wktgeomZone = wkt.parse(_polygon.geometry);
        let geojsonFeatures = {
            type: "Feature",
            properties: { name: _polygon.name },
            geometry: wktgeomZone,
        };
        let myStyle = { opacity: 1 };
        let zoneGeofence = L.geoJSON(geojsonFeatures, { style: myStyle });
        let bboxCoords = zoneGeofence.getBounds();
        let bboxText =
            bboxCoords._southWest.lng +
            "," +
            bboxCoords._southWest.lat +
            "," +
            bboxCoords._northEast.lng +
            "," +
            bboxCoords._northEast.lat;
        let today = new Date();
        let oneYrAgo = new Date();
        oneYrAgo.setFullYear(today.getFullYear() - 1);
        let dateStrToday = Moment(today).format("YYYY-MM-DDTHH:mm:ss");
        let dateStrYearBefore = Moment(oneYrAgo).format("YYYY-MM-DDTHH:mm:ss");
        let request_url =
            "timeseries?bbox=" +
            bboxText +
            "&datetime=" +
            dateStrYearBefore +
            "Z/" +
            dateStrToday +
            "Z&collections=sentinel-2-l2a&cloud_coverage=" +
            _cloudCoverage;

        const headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + JSON.parse(sessionStorage.getItem("jwt")),
        };
        const getTimezones = async () => {
            const res = await fetch(request.REACT_APP_API_BASE_URL + request_url, {
                headers,
            }).then((response) => response.json());
            return res;
        };
        await getTimezones().then((response) => {
            response.data.features.forEach((date) => {
                timeSeries.push(date);
            });
        });
        dispatch(setSelectedDate(new Date(timeSeries[0])));
        dispatch(setAvailableDates(timeSeries));
        callApiSelectedTimeSelected(sentinelType, timeSeries[0], _polygon);
    }

    function calculateArea(_polygon) {
        if (_polygon) {
            let wktgeomZone = wkt.parse(_polygon.geometry);
            let geojsonFeatures = {
                type: "Feature",
                properties: { name: _polygon.name },
                geometry: wktgeomZone,
            };
            let myStyle = {
                opacity: 1,
            };
            let zoneGeofence = L.geoJSON(geojsonFeatures, {
                style: myStyle,
            });
            let coords = [];
            let coordsLatLng = [];
            zoneGeofence.eachLayer(function (layer) {
                //polygon.name
                layer
                    .bindTooltip("", {
                        permanent: true,
                        direction: "center",
                        className: "labelstylezonename",
                    })
                    .openTooltip();
                coords = layer.feature.geometry.coordinates[0];
                layer.feature.geometry.coordinates[0].forEach((vertex) => {
                    coordsLatLng.push(new L.latLng(vertex[1], vertex[0]));
                });
            });

            let areaHa = GeometryUtil.geodesicArea(coordsLatLng) / 10000;
            areaHa = Number(areaHa).toFixed(1);
            return areaHa;
        }
    }

    function generateMiniMap(polygon) {
        let wktGeom = wkt.parse(polygon.geometry);
        const style = {
            default: {
                color: "#3388ff",
                fillColor: "#ffffff00",
                weight: 1.4,
            },
            highlight: {
                color: "#010203",
                weight: 1.4,
                fillColor: "#010203",
            },
        };
        let zoneInMinimap = L.geoJSON(wktGeom, style.default);

        let highlight;

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

        zoneInMinimap.on("mouseover", function (e) {
            setHighlight(zoneInMinimap);
        });

        zoneInMinimap.on("mouseout", function (e) {
            unsetHighlight(zoneInMinimap);
        });

        const mini_map_init = L.map("fieldmap" + polygon.id, {
            zoomControl: false,
            scrollWheelZoom: false,
            scrollpropogattion: false,
            dragging: false,
            attributionControl: false,
            doubleClickZoom: false,
        });
        _maps[polygon.id] = mini_map_init;
        // L.tileLayer(REACT_APP_GOOGLESAT_URL, {}).addTo(mini_map_init);
        zoneInMinimap.addTo(mini_map_init);
        mini_map_init.fitBounds(zoneInMinimap.getBounds());
    }

    function handleMiniMapClick(_map, _polygon) {
        dispatch(setSelectedZone(_polygon.id));

        setPolygon(_polygon);
        getTimeSeries(_polygon).then((r) => {});
        let wktGeom = wkt.parse(_polygon.geometry);
        let zoneInMinimap = L.geoJSON(wktGeom);
        _map.fitBounds(zoneInMinimap.getBounds(), {
            maxZoom: 16,
            padding: [0, 50],
        });
    }

    function handleShowCrop(_map, _polygon) {
        const style = {
            default: {
                color: "white",
                weight: 1,
                fillColor: "white",
            },
            highlight: {
                color: "blue",
                weight: 1,
                fillColor: "#3592fd6b",
            },
        };
        let wktgeomZone = wkt.parse(_polygon.geometry);
        let geojsonFeatures = {
            type: "Feature",
            properties: { name: _polygon.name },
            geometry: wktgeomZone,
        };
        let zoneGeofence = new L.geoJSON(geojsonFeatures, {
            style: {
                color: "white",
                weight: 1,
                opacity: 1,
                // dashArray: '20,0',
                lineJoin: "round",
                fillOpacity: 0.3,
            },
        });
        let highlight;

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

        zoneGeofence.on("mouseover", function (e) {
            setHighlight(zoneGeofence);
        });
        zoneGeofence.on("mouseout", function (e) {
            unsetHighlight(zoneGeofence);
        });
        zoneGeofence.on("click", function (e) {
            console.log(_polygon.id);
        });
        _map.fitBounds(zoneGeofence.getBounds(), {
            maxZoom: 16,
            padding: [0, 50],
        });
        zoneGeofence.addTo(_map);
    }

    function callApiSelectedTimeSelected(_layer = "NDVI", _date, _polygon) {
        if (_polygon) {
            showLoader(_polygon.id);
            let baseUrl = REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
            if (_sentinelHubLayer) {
                props.map.removeLayer(_sentinelHubLayer);
            }
            let wktgeomZone = wkt.parse(_polygon.geometry);
            let geojsonFeatures = {
                type: "Feature",
                properties: { name: _polygon.name },
                geometry: wktgeomZone,
            };
            let zoneGeofence = new L.geoJSON(geojsonFeatures, {
                style: {
                    color: "red",
                    weight: 1,
                    opacity: 1,
                    // dashArray: '20,10',
                    lineJoin: "round",
                    fillOpacity: 0,
                },
            });
            zoneGeofence.addTo(props.map);
            let sentinelHubLayer = L.tileLayer
                .wms(baseUrl, {
                    layers: _layer,
                    time: Moment(_date).format("YYYY-MM-DD"),
                    transparent: true,
                    format: "image/png",
                    geometry: _polygon.geometry,
                    tiled: true,
                    maxZoom: 18,
                    reuseTiles: true,
                })
                .addTo(props.map)
                .bringToFront();
            _sentinelHubLayer = sentinelHubLayer;
            props.map.fitBounds(zoneGeofence.getBounds(), {
                maxZoom: 18,
                padding: [30, 50],
            });
            sentinelHubLayer.on("load", function () {
                let element = document.getElementById(
                    "sidebarElementChild" + _polygon.id
                );
                element.setAttribute("style", "display:none");
            });
        }
    }

    function showLoader(_polygon) {
        let element = document.getElementById("sidebarElementChild" + _polygon);
        let allMinimaps = document.getElementsByClassName("fieldMiniMap");
        let currentElement = document.getElementById(`fieldmap${_polygon}`);
        [].forEach.call(allMinimaps, function (el) {
            el.classList.remove("active");
        });
        currentElement.classList.add("active");
        element.setAttribute("style", "display:block");
    }
};

export default Fields;
