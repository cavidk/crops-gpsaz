import React, {useEffect, useState} from 'react';

import '../../assets/css/bottom-panel-tools.css';
import {useSelector} from "react-redux";

const BottomPanelTools = () => {
    const [indexBodyClass, setIndexBodyClass] = useState("d-none");
    const indices = useSelector((state) => state.indices);

    const handleToggleIndices = () => {
        if (indexBodyClass === "") {
            setIndexBodyClass("d-none");
        } else {
            setIndexBodyClass("");
        }
    }

    return (
        <div className="bottom-panel-tools">
            <div className="ui-legend-cloudness">
                <div className="clouds-header">
                    <div>
                        <span className="clouds-title">Clouds</span>
                        <div className="ui-hint-button">
                            <div className={"_ngcontent-jdw-c101"}>
                                <span className="is-empty"></span>
                                <div role="img" svgicon="hint-info-with-bg"
                                     className="mat-icon mat-icon-no-color"
                                     aria-hidden="true" data-mat-icon-type="svg"
                                     data-mat-icon-name="hint-info-with-bg">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                         xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet"
                                         focusable="false">
                                        <path
                                            d="M12 22.0002C6.48 22.0002 2 17.5203 2 12.0003C2 6.48024 6.48 2.00024 12 2.00024C17.52 2.00024 22.0001 6.48024 22.0001 12.0003C22.0001 17.5203 17.52 22.0002 12 22.0002Z"
                                            fill="currentColor"></path>
                                        <path
                                            d="M12.6338 9.97949H11.2051L11.0479 17H12.7979L12.6338 9.97949ZM11 7.83301C11 8.09277 11.0843 8.30697 11.2529 8.47559C11.4215 8.64876 11.6517 8.73535 11.9434 8.73535C12.235 8.73535 12.4652 8.64876 12.6338 8.47559C12.8024 8.30697 12.8867 8.09277 12.8867 7.83301C12.8867 7.58236 12.8047 7.37272 12.6406 7.2041C12.4766 7.03548 12.2441 6.95117 11.9434 6.95117C11.6426 6.95117 11.4102 7.03548 11.2461 7.2041C11.082 7.37272 11 7.58236 11 7.83301Z"
                                            fill="white"></path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span data-id="clouds-area" className="clouds-area"> 0 ha / 0% </span>
                </div>
                <div className="progress-container">
                    <div id="progress-value" className="progress-value" style={{'width': '15%'}}></div>
                </div>

                <div className="cloud-mob ng-star-inserted">
                    <div role="img" svgicon="cloudy-scene" className="mat-icon notranslate mat-icon-no-color whunset"
                         aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="cloudy-scene">
                        <svg width="100%" height="100%" viewBox="0 0 22 14" xmlns="http://www.w3.org/2000/svg" fit=""
                             preserveAspectRatio="xMidYMid meet" focusable="false">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M17.5962 4.72969C16.7658 1.99256 14.1287 0 11 0C8.5651 0 6.42446 1.21226 5.20443 3.03892C5.51492 3.15503 5.80388 3.3121 6.06346 3.49801C6.90015 4.09726 7.5 5.0481 7.5 6H6.5C6.5 5.4519 6.12961 4.77542 5.48118 4.31101C4.90879 3.90105 4.17439 3.69788 3.4092 3.89548C1.40769 4.67946 0 6.55969 0 8.75C0 11.6462 2.46583 14 5.5 14H17.4167C19.9467 14 22 12.04 22 9.625C22 8.14291 21.2264 6.84092 20.0425 6.05642C20 6.03918 19.952 6.0205 19.8987 6.00103C19.6511 5.91052 19.2951 5.80437 18.8681 5.74451C18.0166 5.62514 16.8961 5.6904 15.7721 6.41948C14.6005 7.1794 14.0386 7.98224 13.7659 8.56886C13.6285 8.86446 13.5621 9.11062 13.5299 9.27636C13.5138 9.35927 13.5063 9.42204 13.5029 9.46072C13.5011 9.48005 13.5004 9.49333 13.5001 9.50006L13.5 9.50508C13.5 9.50493 13.5 9.50453 13.5 9.50388L13.5 9.50227L13.5 9.50122L13.5 9.50064C13.5 9.50032 13.5 9.50001 13 9.5C12.5 9.49999 12.5 9.49966 12.5 9.49932L12.5 9.49861L12.5 9.49704L12.5 9.49338L12.5002 9.48397C12.5002 9.48086 12.5003 9.47741 12.5004 9.47362C12.5006 9.46865 12.5008 9.46309 12.5011 9.45696C12.502 9.43538 12.5037 9.40672 12.5069 9.37152C12.5132 9.30114 12.5252 9.2045 12.5482 9.08597C12.5942 8.84884 12.684 8.52405 12.8591 8.14735C13.2114 7.38938 13.8995 6.44222 15.2279 5.58052C16.0408 5.05322 16.855 4.81048 17.5962 4.72969Z"></path>
                        </svg>
                    </div>
                    <div className="cloud-val">0%</div>
                </div>
            </div>
            <div className={`analytic-legend ${indexBodyClass === "" ? "opened" : ""}`}>
                <div data-id="legend-expand" className="ui-legend-expand no-body-padding no-header-padding">
                    <div className="legend-container">
                        <div className="legend-header-wrap">
                            <div className={`legend-header ${indexBodyClass === "" ? "opened" : ""}`}>
                                <div className="legend-header-title">
                                    <div data-id="legend-band-select" className={"cm-legend-band-select"}>
                                        <div id="selected-band" className="selected-band-wrap">
                                            <div className="ui-label ui-new-label middle-size hidden">
                                                <span className="value">new</span>
                                            </div>
                                            <button data-id="menu-trigger" className="mat-menu-trigger band-name">
                                                <div className="selected-band">
                                                    <span data-id="legend-selected-band"
                                                          className="selected-band-text"> NDVI </span>
                                                </div>
                                                <div className="selected-band__trigger-icon">
                                                    <div role="img" svgicon="triangle" data-id="legend-arrow"
                                                         className="mat-icon mat-icon-no-color"
                                                         aria-hidden="true" data-mat-icon-type="svg"
                                                         data-mat-icon-name="triangle">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                                             height="100%" fit="" preserveAspectRatio="xMidYMid meet"
                                                             focusable="false">
                                                            <defs>
                                                                <path id="triangle"
                                                                      d="M400.706 7595.71l2.6 2.59c.4.39 1.02.39 1.4 0l2.6-2.59c.63-.63.18-1.71-.7-1.71h-5.18c-.9 0-1.33 1.08-.7 1.71z"></path>
                                                            </defs>
                                                            <use transform="translate(-400 -7594)"></use>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                    <div role="separator"
                                         className="mat-divider mat-divider-vertical"
                                         aria-orientation="vertical"></div>
                                    <div className={"cm-legend-button-toolbar d-none"}>
                                        <div role="separator"
                                             className="mat-divider mat-divider-vertical"
                                             aria-orientation="vertical"></div>
                                        <div data-id="legend-export-scene" mattooltipposition="above"
                                             className="cm-export-scene-button mat-tooltip-trigger legend-toolbar-button"
                                             aria-describedby="cdk-describedby-message-jdw-1-155"
                                             cdk-describedby-host="jdw-1">
                                            <button data-id="download-btn" className="mat-menu-trigger"
                                                    aria-haspopup="menu">
                                                <div role="img" svgicon="download"
                                                     className="mat-icon mat-icon-no-color"
                                                     aria-hidden="true" data-mat-icon-type="svg"
                                                     data-mat-icon-name="download">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                                         viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                                                         focusable="false">
                                                        <g fill="none">
                                                            <path d="M0 0h24v24H0z"></path>
                                                            <path fill="currentColor"
                                                                  d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
                                                        </g>
                                                    </svg>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="legend-controls">
                                    <button id="legend-toggle"
                                            onClick={handleToggleIndices}
                                            className="mat-tooltip-trigger icon map-control">
                                        <div role="img" className="mat-icon mat-icon-no-color"
                                             aria-hidden="true" data-mat-icon-type="svg"
                                             data-mat-icon-name="expand-legend-closed">
                                            <svg width="100%" height="100%" viewBox="0 0 16 10" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg" fit=""
                                                 preserveAspectRatio="xMidYMid meet" focusable="false">
                                                <path
                                                    d="M14.1591 9.16665L15.5 7.90272L8 0.833313L0.5 7.90272L1.84091 9.16665L8 3.36116L14.1591 9.16665Z"
                                                    fill="white"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/*ss*/}
                        <div className={"legend-body " + indexBodyClass}>
                            <div className="legend-body-content">
                                <div className={"cm-legend-list"} data-id="legend-list">
                                    <ul data-id="legend-of-scene" className="ng-star-inserted">
                                        {indices['indices'] && indices['indices'].histogram.bins.length > 1 && indices['indices'].histogram.bins.map((i, index) => (
                                            <li data-id="scenes-legend" className="ng-star-inserted">
                                                <div className="cell cell-color">
                                                    <div className="edge-color"
                                                         style={{backgroundColor: `${i.color}`}}
                                                    ></div>
                                                </div>
                                                <div className="cell">
                                                    <div data-id="edge-value" className="edge-value"
                                                    > {i.lowEdge.toFixed(2)} − {i.highEdge.toFixed(2)}
                                                    </div>
                                                </div>
                                                <div className="cell">
                                                    {i.highEdge <= 0.20 ? (
                                                        <div data-id="edge-title" className="title">
                                                            Open soil
                                                        </div>
                                                    ) : (i.highEdge > 0.20 && i.highEdge <= 0.60) ? (
                                                        <div data-id="edge-title" className="title">
                                                            Moderate vegetation
                                                        </div>
                                                    ) : (
                                                        <div data-id="edge-title" className="title">
                                                            Dense vegetation
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="cell">
                                                    <div data-id="edge-legend-area-value" className="value"
                                                    > {i.count} ha
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/*ss*/}
                    </div>
                </div>
            </div>


            <button className="mat-tooltip-trigger icon select-screen-mode">
                <div role="img" className="mat-icon mat-icon-no-color" aria-hidden="true"
                     data-mat-icon-type="svg" data-mat-icon-name="turn-on-full-screen-mode">
                    <svg width="100%" height="100%" viewBox="0 0 14 14" fill="" xmlns="http://www.w3.org/2000/svg"
                         fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                        <path
                            d="M1 9C0.45 9 0 9.45 0 10V13C0 13.55 0.45 14 1 14H4C4.55 14 5 13.55 5 13C5 12.45 4.55 12 4 12H2V10C2 9.45 1.55 9 1 9ZM1 5C1.55 5 2 4.55 2 4V2H4C4.55 2 5 1.55 5 1C5 0.45 4.55 0 4 0H1C0.45 0 0 0.45 0 1V4C0 4.55 0.45 5 1 5ZM12 12H10C9.45 12 9 12.45 9 13C9 13.55 9.45 14 10 14H13C13.55 14 14 13.55 14 13V10C14 9.45 13.55 9 13 9C12.45 9 12 9.45 12 10V12ZM9 1C9 1.55 9.45 2 10 2H12V4C12 4.55 12.45 5 13 5C13.55 5 14 4.55 14 4V1C14 0.45 13.55 0 13 0H10C9.45 0 9 0.45 9 1Z"
                            fill=""></path>
                    </svg>
                </div>
            </button>


        </div>
    );
}

export default BottomPanelTools;
