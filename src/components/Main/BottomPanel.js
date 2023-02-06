import React, {useEffect, useState, useRef} from 'react';
import TimeseriesChart from "./TimeseriesChart";
import Loading from '../Loader/Loading';
import DatePicker from "react-datepicker";
import axios from "axios";

const request = require('../../utils/request');
import '../../assets/css/timeseries.css';
import {useDispatch, useSelector} from "react-redux";
import {setIndices} from "../../slices/indicesSlice";
import {setAvailableDates} from "../../slices/availableDatesSlice";

const BottomPanel = (props) => {
    const refDateFrom = useRef(null);
    const refDateTo = useRef(null);
    const dispatch = useDispatch();

    const [zoneStatistics, setZoneStatistics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState("NDVI");
    const [dateFrom, setDateFrom] = useState(new Date(new Date().setMonth(new Date().getMonth() - 6)));
    const [dateTo, setDateTo] = useState(new Date());
    const [minDate, setMinDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    const [maxDate, setMaxDate] = useState(new Date());
    const [openDateFrom, setOpenDateFrom] = useState(false);
    const [openDateTo, setOpenDateTo] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const selectedZone = useSelector((state) => state.selectedZone);
    const selectedDate = useSelector((state) => state.selectedDate);

    useEffect(() => {
        getStatistics(selectedZone).then(r => {});
        // getIndices(selectedZone).then(r => {});
    }, [selectedZone])

    useEffect(() => {
        getIndices(selectedZone).then(r => {});
    }, [selectedDate])

    return (
        <div>
            <div className="wrapper-bottom-panel">

                <div className="cm-chart-options">
                    {openDateFrom && (
                        <div className={"datepicker-parent datepicker-datefrom"}>
                            <DatePicker selected={dateFrom}
                                        onChange={handleDateFrom}
                                        maxDate={maxDate}
                                        minDate={minDate}
                                        onClickOutside={handleClickOutside}
                                        wrapperClassName="parent-class"
                                        inline/>
                        </div>
                    )}

                    {openDateTo && (
                        <div className={"datepicker-parent datepicker-dateto"}>
                            <DatePicker selected={dateTo}
                                        onChange={handleDateTo}
                                        maxDate={maxDate}
                                        minDate={minDate}
                                        onClickOutside={handleClickOutside}
                                        wrapperClassName="parent-class"
                                        inline/>
                        </div>
                    )}

                    <div className="index-select-wrp">
                        <div data-id="index-select"
                             className="index-select ng-select ng-select-single ng-valid ng-select-top ng-touched">
                            <div className="ng-select-container ng-has-value">
                                <div className="ng-value-container">
                                    <div className="ng-placeholder">Index</div>
                                    <div className="ng-value"> NDVI</div>
                                    <div role="combobox" aria-haspopup="listbox" className="ng-input"
                                         aria-expanded="false">
                                        <input aria-autocomplete="list" type="text" autoCorrect="off"
                                               autoCapitalize="off" autoComplete="abe1f6fb7db4" readOnly={true}/>
                                    </div>
                                </div>
                                <span className="ng-arrow-wrapper">
                                 <span className="ng-arrow"></span>
                              </span>
                            </div>
                        </div>
                    </div>

                    <div className="ui-date-range field-page">
                        <div data-id="start-date" className="ui-date-picker date-picker-group-first" ref={refDateFrom}>
                            <div className="wrap-date-picker">
                                <div
                                    className="mat-form-field ng-tns-c65-75 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill ng-valid mat-form-field-should-float ng-touched ng-dirty">
                                    <div className="mat-form-field-wrapper ng-tns-c65-75">
                                        <div className="mat-form-field-flex ng-tns-c65-75">

                                            <div className="mat-form-field-infix ng-tns-c65-75">

                                                <input matinput="" autoComplete="off"
                                                       className="mat-datepicker-input mat-input-element mat-form-field-autofill-control ng-tns-c65-51 ng-valid cdk-text-field-autofill-monitored ng-touched"
                                                       data-id="date-picked" placeholder="Start date"
                                                       aria-haspopup="dialog" min="2016-01-01T00:00:00+04:00"
                                                       max="2023-02-06T15:38:21+04:00"
                                                       data-mat-calendar="mat-datepicker-7" id="mat-input-7"
                                                       data-placeholder="Start date" readOnly={true}
                                                       aria-invalid="false" aria-required="false"
                                                       value={dateFrom.toLocaleDateString('en-US', {
                                                           month: 'short',
                                                           day: 'numeric',
                                                           year: 'numeric'
                                                       })}/>
                                                <span className="mat-form-field-label-wrapper ng-tns-c65-75">
                                                     <label
                                                         className="mat-form-field-label ng-tns-c65-75"
                                                         id="mat-form-field-label-23" htmlFor="mat-input-11"
                                                         aria-owns="mat-input-11">
                                                        <mat-label
                                                            className="ng-tns-c65-75">Start date</mat-label>
                                                     </label>
                                                  </span>

                                            </div>
                                            <div className="mat-form-field-suffix ng-tns-c65-75"
                                            >
                                                <div className="mat-datepicker-toggle ng-tns-c65-75"
                                                     data-mat-calendar="mat-datepicker-10">
                                                    <button type="button"
                                                            className="mat-focus-indicator mat-icon-button mat-button-base"
                                                            aria-haspopup="dialog" aria-label="Open calendar"
                                                            tabIndex="0"
                                                            onClick={handleDateFromClick}>
                                                            <span className="mat-button-wrapper">
                                                               <svg viewBox="0 0 24 24" width="24px" height="24px"
                                                                    fill="currentColor"
                                                                    focusable="false"
                                                                    className="mat-datepicker-toggle-default-icon">
                                                                  <path
                                                                      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
                                                               </svg>
                                                            </span>
                                                        <span
                                                            className="mat-ripple mat-button-ripple mat-button-ripple-round"></span>
                                                        <span className="mat-button-focus-overlay"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ui-date-range field-page">
                        <div data-id="start-date" className="ui-date-picker date-picker-group-first" ref={refDateTo}>
                            <div className="wrap-date-picker">
                                <div
                                    className="mat-form-field ng-tns-c65-75 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill ng-valid mat-form-field-should-float ng-touched ng-dirty">
                                    <div className="mat-form-field-wrapper ng-tns-c65-75">
                                        <div className="mat-form-field-flex ng-tns-c65-75">

                                            <div className="mat-form-field-infix ng-tns-c65-75">

                                                <input matinput="" autoComplete="off"
                                                       className="mat-datepicker-input mat-input-element mat-form-field-autofill-control ng-tns-c65-51 ng-valid cdk-text-field-autofill-monitored ng-touched"
                                                       data-id="date-picked" placeholder="End date"
                                                       aria-haspopup="dialog" min="2016-01-01T00:00:00+04:00"
                                                       max="2023-02-06T15:38:21+04:00"
                                                       data-mat-calendar="mat-datepicker-7" id="mat-input-7"
                                                       data-placeholder="End date" readOnly={true}
                                                       aria-invalid="false" aria-required="false"
                                                       value={dateTo.toLocaleDateString('en-US', {
                                                           month: 'short',
                                                           day: 'numeric',
                                                           year: 'numeric'
                                                       })}/>
                                                <span className="mat-form-field-label-wrapper ng-tns-c65-75">
                                                     <label
                                                         className="mat-form-field-label ng-tns-c65-75"
                                                         id="mat-form-field-label-23" htmlFor="mat-input-11"
                                                         aria-owns="mat-input-11">
                                                        <mat-label
                                                            className="ng-tns-c65-75">End date</mat-label>
                                                     </label>
                                                  </span>

                                            </div>
                                            <div className="mat-form-field-suffix ng-tns-c65-75"
                                            >
                                                <div className="mat-datepicker-toggle ng-tns-c65-75"
                                                     data-mat-calendar="mat-datepicker-10">
                                                    <button type="button"
                                                            className="mat-focus-indicator mat-icon-button mat-button-base"
                                                            aria-haspopup="dialog" aria-label="Open calendar"
                                                            tabIndex="0"
                                                            onClick={handleDateToClick}>
                                                            <span className="mat-button-wrapper">
                                                               <svg viewBox="0 0 24 24" width="24px" height="24px"
                                                                    fill="currentColor"
                                                                    focusable="false"
                                                                    className="mat-datepicker-toggle-default-icon">
                                                                  <path
                                                                      d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
                                                               </svg>
                                                            </span>
                                                        <span
                                                            className="mat-ripple mat-button-ripple mat-button-ripple-round"></span>
                                                        <span className="mat-button-focus-overlay"></span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="field-box d-none">
                        <div
                            className="weather-data-select ng-select ng-select-single ng-valid ng-touched ng-select-top">
                            <div className="ng-select-container ng-has-value">
                                <div className="ng-value-container">
                                    <div className="ng-placeholder">Weather Data</div>
                                    <div className="ng-value">
                                        <span className="text">Moisture</span>
                                    </div>
                                    <div role="combobox" aria-haspopup="listbox" className="ng-input"
                                         aria-expanded="false">
                                        <input aria-autocomplete="list" type="text" autoCorrect="off"
                                               autoCapitalize="off" readOnly={true}/>
                                    </div>
                                </div>
                                <span className="ng-arrow-wrapper">
                                 <span className="ng-arrow"></span>
                              </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cm-chart chart">
                    <div className="chart-in">
                        <div className="legend-list d-none">
                            <div data-id="chart-legend-item" className="ui-chart-legend-item">
                                <div
                                    className="mat-tooltip-trigger disable-select-text chart-legend-item-in"
                                    aria-describedby="cdk-describedby-message-hdf-1-158"
                                    style={{color: 'rgb(0, 230, 118)'}}>
                                    <div role="img" svgicon="chart-legend-icon"
                                         className="mat-icon chart-legend-icon mat-icon-no-color"
                                         aria-hidden="true" data-mat-icon-type="svg"
                                         data-mat-icon-name="chart-legend-icon" style={{color: '#00E676'}}>
                                        <svg width="100%" height="100%" viewBox="0 0 20 10" fill=""
                                             xmlns="http://www.w3.org/2000/svg" fit=""
                                             preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <path
                                                d="M10 10C12.7615 10 15 7.76142 15 5C15 2.23858 12.7615 0 10 0C7.23862 0 5.00004 2.23858 5.00004 5C5.00004 7.76142 7.23862 10 10 10Z"></path>
                                            <path
                                                d="M0.833374 6.04167H4.25941C4.19848 5.70367 4.16667 5.35555 4.16667 5C4.16667 4.64445 4.19848 4.29633 4.25941 3.95833H0.833374V6.04167Z"></path>
                                            <path
                                                d="M15.8333 5C15.8333 5.35555 15.8015 5.70367 15.7406 6.04167H19.1667V3.95833H15.7406C15.8015 4.29633 15.8333 4.64445 15.8333 5Z"></path>
                                        </svg>
                                    </div>
                                    <div className="text">2021/2023</div>
                                </div>
                            </div>
                            <div data-id="chart-legend-item" className="ui-chart-legend-item">
                                <div
                                    className="mat-tooltip-trigger disable-select-text chart-legend-item-in"
                                    style={{color: 'rgb(47, 143, 252)'}}>
                                    <div role="img" svgicon="chart-legend-icon"
                                         className="mat-icon chart-legend-icon mat-icon-no-color"
                                         aria-hidden="true" data-mat-icon-type="svg"
                                         data-mat-icon-name="chart-legend-icon" style={{color: '#2F8FFC'}}>
                                        <svg width="100%" height="100%" viewBox="0 0 20 10" fill=""
                                             xmlns="http://www.w3.org/2000/svg" fit=""
                                             preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <path
                                                d="M10 10C12.7615 10 15 7.76142 15 5C15 2.23858 12.7615 0 10 0C7.23862 0 5.00004 2.23858 5.00004 5C5.00004 7.76142 7.23862 10 10 10Z"></path>
                                            <path
                                                d="M0.833374 6.04167H4.25941C4.19848 5.70367 4.16667 5.35555 4.16667 5C4.16667 4.64445 4.19848 4.29633 4.25941 3.95833H0.833374V6.04167Z"></path>
                                            <path
                                                d="M15.8333 5C15.8333 5.35555 15.8015 5.70367 15.7406 6.04167H19.1667V3.95833H15.7406C15.8015 4.29633 15.8333 4.64445 15.8333 5Z"></path>
                                        </svg>
                                    </div>
                                    <div className="text">Precip, mm</div>
                                </div>
                            </div>
                        </div>
                        <button data-id="download-legend-report"
                                className="mat-tooltip-trigger icon small"
                                aria-describedby="cdk-describedby-message-hdf-1-110">
                            <div role="img" svgicon="download-report"
                                 className="mat-icon mat-icon-no-color"
                                 aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="download-report">
                                <svg width="100%" height="100%" viewBox="0 0 12 15" xmlns="http://www.w3.org/2000/svg"
                                     fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                    <path
                                        d="M11.8334 5.5H8.50008V0.5H3.50008V5.5H0.166748L6.00008 11.3333L11.8334 5.5ZM0.166748 13V14.6667H11.8334V13H0.166748Z"
                                        fill=""></path>
                                </svg>
                            </div>
                        </button>

                        {Object.keys(zoneStatistics).length > 1 && errorMessage === null && (
                            <TimeseriesChart statistics={zoneStatistics}/>
                        )}

                        {errorMessage !== null && (
                            <div className="error-message">
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        {loading === true && (
                            <Loading/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    function handleDateFromClick() {
        if (openDateTo === true) {
            setOpenDateTo(false);
        }
        setOpenDateFrom(!openDateFrom);
    }

    function handleDateToClick() {
        if (openDateFrom === true) {
            setOpenDateFrom(false);
        }
        setOpenDateTo(!openDateTo);
    }

    function handleDateFrom(e) {
        setDateFrom(e)
        getStatistics(selectedZone, e, dateTo).then(() => {
        });
        setOpenDateFrom(false);
    }

    function handleDateTo(e) {
        setDateTo(e)
        getStatistics(selectedZone, dateFrom, e).then(() => {
        });
        setOpenDateTo(false);
    }

    function handleClickOutside(e) {
        if (!refDateFrom.current.contains(e.target) && !refDateTo.current.contains(e.target)) {
            setOpenDateFrom(false);
            setOpenDateTo(false);
        }
    }

    async function getStatistics(_polygon = selectedZone, _dateFrom = dateFrom, _dateTo = dateTo, _index = index) {
        setLoading(true);
        setErrorMessage(null)
        let statistics = [];
        const instance = axios.create({baseURL: request.REACT_APP_API_BASE_URL})
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
            },
            params: {
                polygon: _polygon["selectedZone"],
                dateFrom: _dateFrom,
                dateTo: _dateTo,
                index: _index
            }
        }
        await instance.get("/v1/statistics", config).then(resp => {
            if (resp.data.error) {
                setErrorMessage(resp.data.error.message);
            } else {
                statistics = resp.data.data
            }
        })
        if (statistics.dates) {
            setErrorMessage(null);
            setZoneStatistics(statistics);
        }
        setLoading(false)
    }


    async function getIndices(selectedZone) {
        selectedZone = selectedZone['selectedZone']
        let indices = [];
        const instance = axios.create({baseURL: request.REACT_APP_API_BASE_URL})
        const config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Accept': 'application/json',
                'Authorization': "Bearer " + JSON.parse(sessionStorage.getItem('jwt'))
            },
            params: {
                zone: selectedZone,
                selectedDate: selectedDate['selectedDate'],
                sentinelType: "NDVI"
            }
        }
        await instance.get("/v1/zones/" + selectedZone, config).then(resp => {
            if (resp.data.error) {
                console.log("Errr: ", resp.data.error.message);
            } else {
                indices = resp.data.data
            }
        })
        if (indices.histogram && indices.zone) {
            dispatch(setIndices(indices));
        }
    }
}


export default BottomPanel;
