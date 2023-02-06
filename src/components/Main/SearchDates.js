import React, {useCallback, useEffect, useState, useRef, useContext} from 'react';
import {ScrollMenu, VisibilityContext, useScrollingMenu} from "react-horizontal-scrolling-menu";
import {LeftArrow, RightArrow, useDrag} from "./Scroll";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../../assets/css/searchdates.css';
import {useSelector, useDispatch} from 'react-redux';
import {setSelectedDate} from "../../slices/selectedDateSlice";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const SearchDates = (props) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [minDate, setMinDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
    const [maxDate, setMaxDate] = useState(new Date());


    const selectedDate = useSelector((state) => state.selectedDate);
    const availableDates = useSelector((state) => state.availableDates);

    const handleClick = () => {
        setOpen(!open);
    }

    const handleChange = (e) => {
        setOpen(!open);
        dispatch(setSelectedDate(e))
        scrollTo(e)
    }

    const changeDateClick = (date) => {
        dispatch(setSelectedDate(date))
        scrollTo(date)
    }

    const handleClickOutside = (e) => {
        if (!ref.current.contains(e.target)) {
            setOpen(false);
        }
    }

    const {dragStart, dragStop, dragMove, dragging} = useDrag();
    const handleDrag = ({scrollContainer}: scrollVisibilityApiType) => (
        ev: React.MouseEvent
    ) =>
        dragMove(ev, (posDiff) => {
            if (scrollContainer.current) {
                scrollContainer.current.scrollLeft += posDiff;
            }
        });

    const scrollTo = (date) => {
        if (date) {
            const id = formatDate(date);
            const section = document.querySelector('#item' + id);
            section.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }

    function formatDate(date) {
        if (date) {
            return date.toLocaleDateString().replace(/[/]/g, "").replace(/[-]/g, "");
        }
        return null;
    }

    return (
        <div className="ng-star-inserted cm-map-index-layer">
            {open && (
                <div className={"datepicker-parent datepicker-main"}>
                    <DatePicker selected={selectedDate["selectedDate"]}
                                onChange={handleChange}
                                maxDate={maxDate}
                                minDate={minDate}
                                includeDates={availableDates["availableDates"]}
                                onClickOutside={handleClickOutside}
                                wrapperClassName="parent-class"
                                withPortal={false}
                                inline/>
                </div>
            )}
            <div className="scenes-container">
                <div className="datepicker-container">
                    <div className={"ui-date-only-picker"} ref={ref}>
                        <div className="wrap-date-picker">
                            <div appearance="fill"
                                 className="mat-form-field ng-tns-c65-94 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill">
                                <div className="mat-form-field-wrapper ng-tns-c65-94">
                                    <div className="mat-form-field-flex ng-tns-c65-94">
                                        <div className="mat-form-field-suffix ng-tns-c65-94">
                                            <div matsuffix="" className="mat-datepicker-toggle ng-tns-c65-94"
                                                 data-mat-calendar="mat-datepicker-19">
                                                <button type="button" onClick={handleClick}
                                                        className="mat-focus-indicator mat-icon-button mat-button-base"
                                                        aria-haspopup="dialog" aria-label="Open calendar" tabIndex="0">
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
                    <div className="ui-label ui-pro-label d-none">
                        <span className="value">Pro</span>
                    </div>
                </div>
                <div className="scene-list-container">
                    <div className="scrolled-right scrolled-left cm-scene-list">
                        <div className="backBtn d-none">
                            <button id="backBtn" data-id="scene-list-back-btn" className="icon small">
                                <mat-icon role="img" svgicon="arrow-back"
                                          class="mat-icon mat-icon-no-color" aria-hidden="true"
                                          data-mat-icon-type="svg" data-mat-icon-name="arrow-back">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                         viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                                         focusable="false">
                                        <path fill="" d="M17.67 3.87L15.9 2.1 6 12l9.9 9.9 1.77-1.77L9.54 12z"></path>
                                    </svg>
                                </mat-icon>
                            </button>
                        </div>
                        <div data-id="scenesContainer" style={{pointerEvents: 'auto'}}
                             className="ng-star-inserted drag-scroll">
                            <div className="drag-scroll-wrapper drag-scroll-container"
                                 style={{width: '100 %', height: '48px', overflow: 'hidden'}}>
                                <ScrollMenu
                                    LeftArrow={LeftArrow}
                                    RightArrow={RightArrow}
                                    onMouseDown={() => dragStart}
                                    onMouseUp={() => dragStop}
                                    onMouseMove={handleDrag}
                                    onWheel={onWheel}
                                    options={{throttle: 0}}>
                                    {Object.keys(availableDates).length >= 1 && availableDates['availableDates'].map((date, i) => (
                                        <div id={"item" + formatDate(date)}
                                             key={formatDate(date)}
                                             className={`scene-list-item scene-item ${areDatesEqual(selectedDate["selectedDate"], date) ? "active" : ""}`}
                                             style={{display: 'inline-block'}}
                                             onClick={() => changeDateClick(date)}>
                                            <div
                                                data-id="scene-item-content" className="scene-item-content">
                                                <div data-id="scene-item-container" className="scene-item-in">
                                                    <div data-id="scene-icon" className="scene-icon">
                                                        <div role="img" color="satellite-white"
                                                             svgicon="satellite-white"
                                                             className="mat-icon mat-satellite-white mat-icon-no-color"
                                                             aria-hidden="true" data-mat-icon-type="svg"
                                                             data-mat-icon-name="satellite-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="100%"
                                                                 height="100%" fit=""
                                                                 preserveAspectRatio="xMidYMid meet"
                                                                 focusable="false">
                                                                <path
                                                                    d="M18.563 13.055l-3.77-3.77.985-.985a.65.65 0 0 0 .19-.456.64.64 0 0 0-.19-.456L12.61 4.22c-.252-.252-.66-.252-.912 0l-.985.985-3.77-3.77c-.252-.252-.66-.252-.912 0l-3.164 3.17c-.252.252-.252.66 0 .912l3.77 3.77-.985.985a.65.65 0 0 0-.19.456.64.64 0 0 0 .19.456L8.82 14.35a.64.64 0 0 0 .912 0l.985-.985 3.77 3.77a.64.64 0 0 0 .912 0l3.167-3.167a.65.65 0 0 0 .19-.456.64.64 0 0 0-.19-.456zM4.236 5.062L6.5 2.807 9.803 6.12 7.548 8.374 4.236 5.062zm5.04 7.92L7.02 10.727l5.137-5.136 2.255 2.255-5.136 5.136zm5.665 2.784l-3.312-3.312 2.255-2.255 3.313 3.313-2.255 2.255zM7.47 17.46c-1.317 0-2.555-.513-3.486-1.444A4.9 4.9 0 0 1 2.54 12.53c0-.356-.3-.645-.645-.645s-.645.3-.645.645a6.18 6.18 0 0 0 1.822 4.398A6.18 6.18 0 0 0 7.47 18.75c.356 0 .645-.3.645-.645s-.3-.645-.645-.645zm-.258-1.24c.356 0 .645-.3.645-.645s-.3-.645-.645-.645a2.13 2.13 0 0 1-1.515-.628 2.13 2.13 0 0 1-.628-1.515c0-.356-.3-.645-.645-.645s-.645.3-.645.645a3.41 3.41 0 0 0 1.005 2.427 3.41 3.41 0 0 0 2.427 1.005z"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <span className="scene-item-text">
                                                    {date.toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </ScrollMenu>
                            </div>
                        </div>
                        <div className="forwardBtn d-none">
                            <button id="forwardBtn" data-id="scene-list-forward-btn" className="icon small nonactive"
                                    disabled="">
                                <mat-icon role="img" svgicon="arrow-forward"
                                          class="mat-icon mat-icon-no-color" aria-hidden="true"
                                          data-mat-icon-type="svg" data-mat-icon-name="arrow-forward">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                         viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                                         focusable="false">
                                        <path fill="" d="M6.33 3.87L8.1 2.1 18 12l-9.9 9.9-1.77-1.77L14.46 12z"></path>
                                    </svg>
                                </mat-icon>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="no-body-padding no-header-padding ui-legend-expand d-none">
                <div className="legend-container">
                    <div className="legend-header-wrap">
                        <div className="legend-header">
                            <div className="legend-header-title">
                                <cm-legend-band-select data-id="legend-band-select">
                                    <div id="selected-band" className="selected-band-wrap">
                                        <ui-new-label className="ui-label middle-size hidden" _nghost-ldh-c70="">
                                            <span className="value">new</span>
                                        </ui-new-label>
                                        <button data-id="menu-trigger" className="mat-menu-trigger band-name"
                                                aria-haspopup="menu">
                                            <div className="selected-band">
                                                <span data-id="legend-selected-band"
                                                      className="selected-band-text"> NDVI </span>
                                            </div>
                                            <div className="selected-band__trigger-icon">
                                                <mat-icon role="img" svgicon="triangle" data-id="legend-arrow"
                                                          class="mat-icon mat-icon-no-color"
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
                                                </mat-icon>
                                            </div>
                                        </button>
                                    </div>
                                    <mat-menu yposition="above" xposition="before"
                                              className="ng-star-inserted"></mat-menu>
                                </cm-legend-band-select>
                                <mat-divider role="separator"
                                             className="mat-divider mat-divider-vertical"
                                             aria-orientation="vertical"></mat-divider>
                            </div>
                            <div className="legend-controls">
                                <button id="legend-toggle" mattooltipposition="above"
                                        mattooltiptouchgestures="off" className="mat-tooltip-trigger icon map-control"
                                        aria-describedby="cdk-describedby-message-ldh-1-131"
                                        cdk-describedby-host="ldh-1">
                                    <mat-icon role="img"
                                              class="mat-icon mat-icon-no-color" aria-hidden="true"
                                              data-mat-icon-type="svg" data-mat-icon-name="expand-legend-closed">
                                        <svg width="100%" height="100%" viewBox="0 0 16 10" fill="none"
                                             xmlns="http://www.w3.org/2000/svg" fit=""
                                             preserveAspectRatio="xMidYMid meet" focusable="false">
                                            <path
                                                d="M14.1591 9.16665L15.5 7.90272L8 0.833313L0.5 7.90272L1.84091 9.16665L8 3.36116L14.1591 9.16665Z"
                                                fill="white"></path>
                                        </svg>
                                    </mat-icon>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function areDatesEqual(date1, date2) {
        if (date1 && date2) {
            return (
                date1.getUTCDate() === date2.getUTCDate() &&
                date1.getUTCMonth() === date2.getUTCMonth() &&
                date1.getUTCFullYear() === date2.getUTCFullYear()
            );
        }
        return false;
    }

    function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
        const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
        if (isThouchpad) {
            ev.stopPropagation();
            return;
        }
        if (ev.deltaY < 0) {
            apiObj.scrollNext();
        } else if (ev.deltaY > 0) {
            apiObj.scrollPrev();
        }
    }
}


export default SearchDates;
