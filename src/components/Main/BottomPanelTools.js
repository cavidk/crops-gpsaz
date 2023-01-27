import React, {useEffect, useState} from 'react';

import '../../assets/css/bottom-panel-tools.css';

const BottomPanelTools = () => {
    const [indexBodyClass, setIndexBodyClass] = useState("d-none");

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
                <div data-id="legend-clouds" className="clouds-header">
                    <div>
                        <span className="clouds-title">Clouds</span>
                        <div className="ui-hint-button">
                            <div className={"_ngcontent-jdw-c101"}>
                                <span className="is-empty"></span>
                                <div role="img" svgicon="hint-info-with-bg"
                                     className="mat-icon mat-icon-no-color"
                                     aria-hidden="true" data-mat-icon-type="svg"
                                     data-mat-icon-name="hint-info-with-bg">
                                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">
                                        <path d="M12 22.0002C6.48 22.0002 2 17.5203 2 12.0003C2 6.48024 6.48 2.00024 12 2.00024C17.52 2.00024 22.0001 6.48024 22.0001 12.0003C22.0001 17.5203 17.52 22.0002 12 22.0002Z" fill="currentColor"></path>
                                        <path d="M12.6338 9.97949H11.2051L11.0479 17H12.7979L12.6338 9.97949ZM11 7.83301C11 8.09277 11.0843 8.30697 11.2529 8.47559C11.4215 8.64876 11.6517 8.73535 11.9434 8.73535C12.235 8.73535 12.4652 8.64876 12.6338 8.47559C12.8024 8.30697 12.8867 8.09277 12.8867 7.83301C12.8867 7.58236 12.8047 7.37272 12.6406 7.2041C12.4766 7.03548 12.2441 6.95117 11.9434 6.95117C11.6426 6.95117 11.4102 7.03548 11.2461 7.2041C11.082 7.37272 11 7.58236 11 7.83301Z" fill="white"></path>
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
            </div>
            <div className="analytic-legend">
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
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(0, 126, 71'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.95 − 1.00
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(0, 151, 85'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.90 − 0.95
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(20, 170, 96'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.85 − 0.90
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(83, 189, 107'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.80 − 0.85
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(119, 202, 111'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.75 − 0.80
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(155, 216, 115'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.70 − 0.75
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(185, 227, 131'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.65 − 0.70
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(213, 239, 148'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.60 − 0.65
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Dense vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(234, 247, 172'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.55 − 0.60
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Moderate vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.01 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(253, 254, 194'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.50 − 0.55
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Moderate vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.04 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(255, 239, 171'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.45 − 0.50
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Moderate vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.09 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(255, 224, 147'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.40 − 0.45
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Moderate vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.08 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(255, 198, 125'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.35 − 0.40
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Sparse vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.18 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(255, 171, 105'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.30 − 0.35
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Sparse vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.22 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(255, 141, 90'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.25 − 0.30
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Sparse vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.15 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color"
                                                     style={{backgroundColor: 'rgb(254, 108, 74'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.20 − 0.25
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Sparse vegetation
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.16 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(239, 76, 58'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.15 − 0.20
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Open soil
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.15 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(224, 45, 44'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.10 − 0.15
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Open soil
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.53 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(197, 20, 42'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > 0.05 − 0.10
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Open soil
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 1.58 ha
                                                </div>
                                            </div>
                                        </li>
                                        <li data-id="scenes-legend" className="ng-star-inserted">
                                            <div className="cell cell-color">
                                                <div className="edge-color" style={{backgroundColor: 'rgb(173, 0, 40'}}
                                                ></div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-value" className="edge-value"
                                                > -1.00 − 0.05
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-title" className="title"
                                                > Open soil
                                                </div>
                                            </div>
                                            <div className="cell">
                                                <div data-id="edge-legend-area-value" className="value"
                                                > 0.7 ha
                                                </div>
                                            </div>
                                        </li>
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
