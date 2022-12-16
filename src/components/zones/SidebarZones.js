import React from "react";
import {withRouter} from '../map/withRouter';
import InfiniteScroll from "react-infinite-scroll-component";
import GeometryUtil from "leaflet-geometryutil";
import wkt from "wkt";
import * as L from "leaflet";
import Moment from "moment";

const REACT_APP_SENTINEL_NDVI_API_ENDPOINT = process.env.REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
const REACT_APP_GOOGLESAT_URL = process.env.REACT_APP_GOOGLESAT_URL;
const REACT_APP_OSRM_URL = process.env.REACT_APP_OSRM_URL;

class SidebarZones extends React.Component {

    sentinelHubLayer = null;
    maps = [];

    constructor(props) {
        super(props);
        this.state = {
            zones: [],
            map: null,
            highlight: null,
            page: 1,
            sentinelType: "NDVI",
            polygon: null,
            cloudCoverage: 15,
            timeSeries: [],
            selectedDate: new Date(),
            sentinelHubLayer: null,
            searchText: null,
            search: false,
            hasMore: true,
        }
    }

    componentWillMount() {
        this.setState({zones: this.props.zones})
        this.setState({map: this.props.map})
    }

    componentDidMount() {
        this.props.zones.map((polygon, index) => {
            this.generateMiniMap(polygon)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log("prev: ", prevState)
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.sentinelType !== this.state.sentinelType) {
            this.setState({sentinelType: nextProps.sentinelType})
            if (this.state.polygon) {
                this.callApiSelectedTimeSelected(nextProps.sentinelType, nextProps.selectedDate, this.state.polygon)
            }
        }
        if (nextProps.selectedDate.toDateString() !== this.state.selectedDate.toDateString()) {
            this.setState({selectedDate: nextProps.selectedDate})
            if (this.state.polygon) {
                this.callApiSelectedTimeSelected(this.state.sentinelType, nextProps.selectedDate, this.state.polygon)
            }
        }
        if (nextProps.searchText !== this.state.searchText) {
            this.setState({searchText: nextProps.searchText})
            this.fetchMoreData(nextProps.searchText, true)
        }
        if (nextProps.cloudCoverage !== this.state.cloudCoverage) {
            this.setState({cloudCoverage: nextProps.cloudCoverage})
            if (this.state.polygon) {
                this.getTimeSeries(this.state.polygon, nextProps.cloudCoverage)
            }
        }
    }

    fetchMoreData = async (searchText = this.state.searchText, search = false) => {
        let zones = []
        let page = this.state.page + 1
        if(search === true) {
            this.state.zones.map((zone, i) => {
                if(this.maps[zone.id]){
                    this.maps[zone.id].off()
                    this.maps[zone.id].remove()
                }
            })
            this.maps = []
            this.setState({zones: []})
            this.setState({page: 1})
            page = 1
        }
        if(searchText == null){
            searchText = '';
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
        }
        const fetchZones = async () => {
            const res = await fetch(
                process.env.REACT_APP_API_BASE_URL + `zones?page=${page}&query=${searchText}`,
                {headers}
            ).then(response => response.json());
            return res;
        };
        await fetchZones().then(response => {
            zones = response.data.data.concat(zones)
        });
        const _zones = this.state.zones;
        if(search === true){
            this.setState({zones: zones})
        }else{
            this.setState({zones: _zones.concat(zones)})
            this.setState({page: this.state.page + 1})
        }
        zones.map((polygon, index) => {
            this.generateMiniMap(polygon)
        })
        if(zones.length < 10){
            this.setState({hasMore: false})
        }else{
            this.setState({hasMore: true})
        }
    };

    render() {
        return (
            <div className="sideBarZones" id={"_sideBarZones"}>
                <InfiniteScroll
                    dataLength={this.state.zones.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.hasMore}
                    loader={<div className="loader"></div>}
                    scrollableTarget="_sideBarZones"
                >
                    {this.state.zones.map((i, index) => (
                        <div className="temp-class" id={`sidebarElement${i.id}`}>
                            <div className="zoneTableRow">
                                <div className="fieldMiniMap" id={`fieldmap${i.id}`}
                                     onClick={() => this.handleMiniMapClick(this.props.map, i)}>
                                    <div className="lds-dual-ring" id={`sidebarElementChild${i.id}`}></div>

                                </div>
                                <div className="zoneDescriptionDiv">
                                    <div className="zoneDescriptionTxt">
                                        <b><label>{i.name}</label></b><br></br>
                                        <b><label>{i.description}</label></b><br></br>
                                        <b><label>Area : {this.calculateArea(i)} hectare</label></b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }

    getTimeSeries = async (polygon, cloudCoverage = this.state.cloudCoverage) => {
        this.showLoader(polygon.id);
        let timeSeries = []
        let wktgeomZone = wkt.parse(polygon.geometry);
        let geojsonFeatures = {
            "type": "Feature", "properties": {'name': polygon.name}, "geometry": wktgeomZone
        };
        let myStyle = {"opacity": 1};
        let zoneGeofence = L.geoJSON(geojsonFeatures, {style: myStyle});
        let bboxCoords = zoneGeofence.getBounds();
        let bboxText = bboxCoords._southWest.lng + "," + bboxCoords._southWest.lat + "," + bboxCoords._northEast.lng + "," + bboxCoords._northEast.lat;
        let today = new Date();
        let oneYrAgo = new Date();
        oneYrAgo.setFullYear(today.getFullYear() - 1);
        let dateStrToday = Moment(today).format('YYYY-MM-DDTHH:mm:ss');
        let dateStrYearBefore = Moment(oneYrAgo).format('YYYY-MM-DDTHH:mm:ss');
        let request_url = 'timeseries?bbox=' + bboxText + '&datetime=' + dateStrYearBefore + 'Z/' + dateStrToday + 'Z&collections=sentinel-2-l2a&cloud_coverage=' + cloudCoverage;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
        }
        const getTimezones = async () => {
            const res = await fetch(
                process.env.REACT_APP_API_BASE_URL + request_url,
                {headers}
            ).then(response => response.json());
            return res;
        };
        await getTimezones().then(response => {
            response.data.features.forEach(date => {
                timeSeries.push(date);
            })
        });

        this.setState({selectedDate: new Date(timeSeries[0])})
        this.props.availableDatesHandler(timeSeries)
        this.props.selectedDateHandler(new Date(timeSeries[0]))

        this.callApiSelectedTimeSelected(this.state.sentinelType, timeSeries[0], polygon)
    }

    calculateArea(polygon) {
        let wktgeomZone = wkt.parse(polygon.geometry);
        let geojsonFeatures = {
            "type": "Feature", "properties": {'name': polygon.name}, "geometry": wktgeomZone
        };
        let myStyle = {
            "opacity": 1
        };
        let zoneGeofence = L.geoJSON(geojsonFeatures, {
            style: myStyle
        });
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
        return areaHa;
    }

    generateMiniMap(polygon) {
        let wktGeom = wkt.parse(polygon.geometry);
        const style = {
            'default': {
                'color': '#3388ff',
                'fillColor': '#ffffff00',
                'weight': 1.4
            }, 'highlight': {
                'color': 'yellow',
                'weight': 1.4,
                'fillColor': '#3388ff',
            }
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

        zoneInMinimap.on('mouseover', function (e) {
            setHighlight(zoneInMinimap);
        });

        zoneInMinimap.on('mouseout', function (e) {
            unsetHighlight(zoneInMinimap);
        });

        const mini_map_init = L.map("fieldmap" + polygon.id, {
            zoomControl: false,
            scrollWheelZoom: false,
            scrollpropogattion: false,
            dragging: false,
            attributionControl: false,
            doubleClickZoom: false
        });
        this.maps[polygon.id] = mini_map_init;
        L.tileLayer(REACT_APP_GOOGLESAT_URL, {}).addTo(mini_map_init);
        zoneInMinimap.addTo(mini_map_init);
        mini_map_init.fitBounds(zoneInMinimap.getBounds());
    }

    handleMiniMapClick(map, polygon) {
        this.setState({polygon: polygon})
        this.getTimeSeries(polygon).then(r => {
        })
        let wktGeom = wkt.parse(polygon.geometry);
        let zoneInMinimap = L.geoJSON(wktGeom);
        map.fitBounds(zoneInMinimap.getBounds(), {
            maxZoom: 16,
            padding: [0, 50]
        });
    }

    callApiSelectedTimeSelected(layer = "NDVI", date, polygon) {
        if (polygon) {
            let baseUrl = REACT_APP_SENTINEL_NDVI_API_ENDPOINT;
            if (this.sentinelHubLayer != null) {
                this.props.map.removeLayer(this.sentinelHubLayer);
            }

            let wktgeomZone = wkt.parse(polygon.geometry);
            let geojsonFeatures = {
                "type": "Feature",
                "properties": {'name': polygon.name},
                "geometry": wktgeomZone
            }
            let zoneGeofence = new L.geoJSON(geojsonFeatures,{
                style: {
                    color: "red",
                        weight: 1,
                        opacity: 1,
                        dashArray: '20,10',
                        lineJoin: 'round',
                        fillOpacity: 0
                }
            });
            zoneGeofence.addTo(this.props.map)

            let sentinelHubLayer = L.tileLayer.wms(baseUrl, {
                attribution: '&copy; <a href="https://www.sentinel-hub.com/" target="_blank">Sentinel Hub</a>',
                urlProcessingApi: "https://services.sentinel-hub.com/ogc/wms/1d4de4a3-2f50-493c-abd8-861dec3ae6b2",
                layers: layer,
                tileSize: 512,
                preset: layer,
                maxcc: 20,
                time: Moment(date).format('YYYY-MM-DD'),
                gain: '0.3',
                gamma: '0.8',
                transparent: true,
                format: 'image/png',
                crs: L.CRS.EPSG4326,
                geometry: polygon.geometry
            }).addTo(this.props.map).bringToFront();

            this.sentinelHubLayer = sentinelHubLayer;
            this.props.map.fitBounds(zoneGeofence.getBounds(), {
                maxZoom: 16,
                padding: [0, 50]
            });
            sentinelHubLayer.on('load', function () {
                let element = document.getElementById("sidebarElementChild" + polygon.id);
                element.setAttribute("style", "display:none");
            })
        }
    }

    showLoader(polygon) {
        let element = document.getElementById("sidebarElementChild" + polygon);
        element.setAttribute("style", "display:block");
    }
}

export default withRouter(SidebarZones);
