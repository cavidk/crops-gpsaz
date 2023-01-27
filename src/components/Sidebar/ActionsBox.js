import React, {useEffect, useState, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchIcon from '@mui/icons-material/Search';
import ExpandIcon from '@mui/icons-material/ExpandMore';
import FilterIcon from '@mui/icons-material/Tune';
import DoubleRightIcon from '@mui/icons-material/DoubleArrow';
import {setSearchText} from "../../slices/searchTextSlice";

const ActionsBox = (props) => {
    const [searchInputClass, setSearchInputClass] = useState("d-none");
    const [searchInputMatFormClass, setSearchInputMatFormClass] = useState("");
    const [searchButtonClass, setSearchButtonClass] = useState("");
    const [inputIsFocused, setInputIsFocused] = useState(false);

    const inputRef = useRef(null);
    const dispatch = useDispatch();

    const searchText = useSelector((state) => state.searchText);

    useEffect(() => {
        if (inputIsFocused) {
            inputRef.current.focus();
        }
    }, [inputIsFocused]);

    useEffect(() => {
    }, [searchText]);

    function toggleSearch() {
        if (searchInputClass === "d-none") {
            setSearchInputClass("")
            setSearchButtonClass("active")
            setSearchInputMatFormClass("mat-focused")
            setInputIsFocused(true);
        } else {
            setSearchInputClass("d-none")
            setSearchInputMatFormClass("")
            setSearchButtonClass("")
            setInputIsFocused(false);
        }
    }

    return (
        <div className={"field-list-header"}>
            <div className={"field-list-header-top"}>
                <label>
                    <p className="field-name title">Field list</p>
                    <cm-area-limits data-id="area-limits"
                                    className="ng-star-inserted">
                        <a data-id="area-stats" className="link-secondary d-none">
                            766.4 ha
                        </a>
                    </cm-area-limits>
                    <div className="label-info"></div>
                </label>
            </div>
            <div className={"field-list-actions-box"}>
                <button onClick={toggleSearch} className={"search-btn " + searchButtonClass}>
                    <mat-icon role="img" svgicon="search"
                              class="mat-icon search-icon mat-icon-no-color" aria-hidden="true"
                              data-mat-icon-type="svg" data-mat-icon-name="search">
                        <SearchIcon/>
                    </mat-icon>
                    <span>Search</span>
                    <mat-icon role="img" svgicon="arrow-select"
                              class="mat-icon search-arrow mat-icon-no-color" aria-hidden="true"
                              data-mat-icon-type="svg" data-mat-icon-name="arrow-select">
                        <ExpandIcon/>
                    </mat-icon>
                </button>
                <div className={"cm-field-filter"}>
                    <button data-id="filter-button" className="filter-btn">
                        <mat-icon role="img" svgicon="filter-alt"
                                  class="mat-icon filter-icon mat-icon-no-color" aria-hidden="true"
                                  data-mat-icon-type="svg" data-mat-icon-name="filter-alt">
                            <FilterIcon/>
                        </mat-icon>
                        <span className="btn-text"><span>Filter</span></span>
                    </button>
                </div>
                <div className="aux-actions-box">
                    <button className="mat-tooltip-trigger aux-actions-btn"
                            aria-describedby="cdk-describedby-message-vbk-1-14">
                        <mat-icon role="img" svgicon="arrow-double-right"
                                  class="mat-icon aux-actions-icon mat-icon-no-color" aria-hidden="true"
                                  data-mat-icon-type="svg" data-mat-icon-name="arrow-double-right">
                            <DoubleRightIcon/>
                        </mat-icon>
                    </button>
                    <div className="aux-actions d-none" hidden="">
                        <cm-fields-download className="ng-star-inserted">
                            <button data-id="download-contours-button"
                                    className="disable-select-text">
                                <mat-icon role="img" svgicon="download-report"
                                          className="mat-icon download-icon mat-icon-no-color"
                                          aria-hidden="true" data-mat-icon-type="svg"
                                          data-mat-icon-name="download-report">
                                    <img src="../Main/assets/download-2.svg" alt=""/>
                                </mat-icon>
                                Export fields
                            </button>
                        </cm-fields-download>
                        <button className="bulk-edit-btn action-btn">
                            <mat-icon role="img" svgicon="bulk-edit"
                                      className="mat-icon bulk-edit-icon action-icon mat-icon-no-color"
                                      aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="bulk-edit">
                                <img src="../Main/assets/paint.svg" alt=""/>
                            </mat-icon>
                            Bulk edit
                        </button>
                    </div>
                </div>
            </div>


            <div className={"search-drop " + searchInputClass}>
                <div className="ng-star-inserted">
                    <div>
                        <div
                            className={"mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill " + searchInputMatFormClass}>
                            <div className="mat-form-field-wrapper ng-tns-c65-23">
                                <div className="mat-form-field-flex ng-tns-c65-23">

                                    <div className="mat-form-field-prefix ng-tns-c65-23">
                                        <button type="button"
                                                className="mat-focus-indicator search-btn mat-icon-button mat-button-base ng-tns-c65-23">
                                            <span className="mat-button-wrapper">
                                                <mat-icon _ngcontent-yvr-c270="" role="img" svgicon="search"
                                                          className="mat-icon mat-icon-no-color"
                                                          aria-hidden="true"
                                                          data-mat-icon-type="svg" data-mat-icon-name="search">
                                                    <SearchIcon/>
                                                </mat-icon>
                                            </span>
                                            <span
                                                matripple=""
                                                className="mat-ripple mat-button-ripple mat-button-ripple-round">
                                            </span>
                                            <span
                                                className="mat-button-focus-overlay"></span>
                                        </button>
                                    </div>

                                    <div className="mat-form-field-infix ng-tns-c65-23">
                                        <input ref={inputRef} type="text"
                                               onChange={(e) => { dispatch(setSearchText(e.target.value))}}
                                               autoComplete="off"
                                               className="mat-input-element mat-form-field-autofill-control"
                                               maxLength="100"
                                               placeholder="Field and crop search"
                                               />
                                        <span
                                            className="mat-form-field-label-wrapper"></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActionsBox;
