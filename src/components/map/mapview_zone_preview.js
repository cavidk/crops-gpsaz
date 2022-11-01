import React from "react";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-sidebar-v2";
import "leaflet-draw";
import "../zones/css/zone-preview.css";
import "./css/leaflet-sidebar.css";
import "./css/leaflet-sidebar.min.css";
import Moment from 'moment';

const wkt = require('wkt');
const REACT_APP_SENTINEL_NDVI_API_ENDPOINT = process.env.REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
const REACT_APP_OSRM_URL = process.env.REACT_APP_OSRM_URL;
const REACT_APP_MAPBOX_URL = process.env.REACT_APP_MAPBOX_URL;
const REACT_APP_GOOGLESAT_URL = process.env.REACT_APP_GOOGLESAT_URL;
const request = require('../../resources/request');

class Map extends React.Component {

    constructor(props) {
        super(props);
        // console.log('---constructor MAP  --');
        this.state = {
            invp: [],
            all: "",
            selectedid: [],
            zoneTableRows: [],
            timeSeriesList: [],
            selectedPolygon: "",
            selectedZoneGeofence: "",
            selectedTime: "",
            map: ""
        };
        this.setTimeSeries = this.setTimeSeries.bind(this);
        this.onTriggerSendTimeSeries = this.onTriggerSendTimeSeries.bind(this);
        this.callApiSelectedTimeSelected = this.callApiSelectedTimeSelected.bind(this);
    }

    getSentinelService(val, layerName = "NDVI") {
        this.setState({selectedTime: val});
        this.callApiSelectedTimeSelected(this.state.selectedPolygon, this.state.selectedZoneGeofence, layerName, val);
    }

    callApiSelectedTimeSelected(polygon, zoneGeofence, layerName, date) {
        let baseUrl = REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
        let layerId = layerName;
        if (this.sentinelHubLayer != null) {
            this.state.map.removeLayer(this.sentinelHubLayer);
        }
        let timeStr = Moment(date).format('YYYY-MM-DD');
        let time = timeStr + "/" + timeStr;
        console.log("time");
        console.log(time);
        console.log("Polygon geometry", polygon);
        this.sentinelHubLayer = L.tileLayer.wms(baseUrl, {
            attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
            layers: layerId,
            tileSize: 512,
            maxcc: 50,
            time: time,
            gain: '0.3',
            gamma: '0.8',
            transparent: 'true',
            format: 'image/png',
            crs: L.CRS.EPSG4326,
            geometry: polygon.geometry
        }).addTo(this.state.map)
        this.state.map.fitBounds(zoneGeofence.getBounds());
    }

    setTimeSeries = val => {
        const dateArray = [];
        setTimeout(() => {
            val.forEach((el) => {
                dateArray.push(new Date(el));
            })
        }, 1000);
        this.setState({timeSeriesList: dateArray});
    }

    onTriggerSendTimeSeries = (event) => {
        this.props.zonePreviewCallback(this.state.timeSeriesList);
        event.preventDefault();
    }

    componentDidMount() {
        const {router} = this.props;
        // create map
        var map = L.map("map", {
            renderer: L.canvas(),
            center: [40.475362, 49.815538],
            zoom: 12,
            attributionControl: false,
            layers: [
                L.tileLayer(
                    REACT_APP_OSRM_URL
                )
            ]
        });
        this.setState({map: map});
        var sidebar = L.control
            .sidebar({
                autopan: false,
                position: "right",
                container: "sidebar",
                closeButton: true
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


        let mbAttr =
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
        let mbUrl =
            REACT_APP_MAPBOX_URL;

        let grayscale = L.tileLayer(mbUrl, {
            id: "mapbox/light-v9",
            tileSize: 512,
            zoomOffset: -1
            // ,
            // attribution: mbAttr
        });
        let streets = L.tileLayer(mbUrl, {
            id: "mapbox/streets-v11",
            tileSize: 512,
            zoomOffset: -1
            // ,
            // attribution: mbAttr
        });

        let topographic = L.tileLayer(
            REACT_APP_OSRM_URL,
            {
                id: "Topographic",
                tileSize: 512,
                zoomOffset: -1
                // ,
                // attribution: mbAttr
            }
        );

        let googleSatt = L.tileLayer(
            REACT_APP_GOOGLESAT_URL,
            {
                id: "Google Satallite",
                tileSize: 512,
                zoomOffset: -1
                // ,
                // attribution: mbAttr
            }
        );

        let baseLayers = {
            OpenStreetMap: streets
            ,
            Grayscale: grayscale,
            Topographic: topographic,
            GoogleSat: googleSatt
        };
        var options = {
            position: "topright",
            draw: {
                polygon: {
                    title: "Draw a polygon!",
                    allowIntersection: false,
                    drawError: {
                        drawError: {
                            color: "#b00b00",
                            timeout: 1000
                        },
                        shapeOptions: {
                            color: "#bada55"
                        },
                        showArea: true
                    },
                    polyline: false,
                    rectangle: false,
                    circle: false,
                    marker: false
                },
                edit: {
                    featureGroup: this.editableLayers, //REQUIRED!!
                    remove: false
                }
            }
        }
        // L.control.layers(baseLayers).addTo(map);

        let zones = [];
        if (sentinelHubLayer != null) {
            map.removeLayer(sentinelHubLayer);
        }

        zones = this.props.userZoneObject;
        let timeSeries = [];

        function callApiSelectedTime(polygon, zoneGeofence, layerName, date) {
            let baseUrl = REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
            // let baseUrl = '${REACT_APP_SENTINEL_NDVI_API_ENDPOINT}';
            let layerId = layerName;
            if (sentinelHubLayer != null) {
                map.removeLayer(sentinelHubLayer);
            }
            let time = date + "/" + date;
            sentinelHubLayer = L.tileLayer.wms(baseUrl, {
                attribution: '&copy; <a href="http://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                layers: layerId,
                tileSize: 512,
                maxcc: 50,
                time: time,
                gain: '0.3',
                gamma: '0.8',
                transparent: 'true',
                format: 'image/png',
                crs: L.CRS.EPSG4326,
                geometry: polygon.geometry
            }).addTo(map);
            console.log(zoneGeofence)
            map.fitBounds(zoneGeofence.getBounds());
            console.log(sentinelHubLayer)
        }

        function GetTimeSeries(polygon, zoneGeofence) {
            let bboxCoords = zoneGeofence.getBounds();
            let bboxText = bboxCoords._southWest.lng + "," + bboxCoords._southWest.lat + "," + bboxCoords._northEast.lng + "," + bboxCoords._northEast.lat;
            let today = new Date();
            let oneYrAgo = new Date();
            oneYrAgo.setFullYear(today.getFullYear() - 1);
            let dateStrToday = Moment(today).format('YYYY-MM-DDTHH:mm');
            let dateStrYearBefore = Moment(oneYrAgo).format('YYYY-MM-DDTHH:mm');
            let request_url = 'imagery/timeSeries?bbox=' + bboxText + '&datetime=' + dateStrYearBefore + 'Z/' + dateStrToday + 'Z&collections=sentinel-2-l2a';
            request.get(request_url, (err, res) => {
                if (err) {
                    console.log('error if :' + err)
                } else {
                    const timeSeriesJson = JSON.parse(res.text);
                    Object.keys(timeSeriesJson.features).forEach(function (key) {
                        timeSeries.push(timeSeriesJson.features[key]);
                    });
                }
                if (timeSeries.length > 0)
                    callApiSelectedTime(polygon, zoneGeofence, "NDVI", timeSeries[0]);
            })

        }

        var i = 0;
        setTimeout(() => {
            zones.forEach((polygon) => {
                i++;
                console.log("i: "+polygon.geometry)

                let wktgeomZone = wkt.parse(polygon.geometry);

                var geojsonFeatures = {
                    "type": "Feature",
                    "properties": {'name': polygon.name},
                    "geometry": wktgeomZone
                }
                var zoneGeofence = L.geoJSON(geojsonFeatures);
                GetTimeSeries(polygon, zoneGeofence);
                this.setTimeSeries(timeSeries);
                this.setState({selectedPolygon: polygon});
                this.setState({selectedZoneGeofence: zoneGeofence});
                setTimeout(() => {
                    this.onTriggerSendTimeSeries();
                }, 1000);
            });
        }, 1000);
    };
}

export default Map;
