import React, {Component, useEffect, useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import FilterIcon from '@material-ui/icons/Tune';
import DoubleRightIcon from '@material-ui/icons/DoubleArrow';
import "../zones/css/zone-preview.css";
import "./css/main.css"

const ActionsBox = (props) => {

    useEffect(() => {

    }, []);


    return (
        <div className={"field-list-header"}>
            <div className={"field-list-header-top"}>
                <label>
                    <p className="field-name title">Field list</p>
                    <cm-area-limits data-id="area-limits"
                                    className="ng-star-inserted">
                        <a data-id="area-stats" className="link-secondary">
                            766.4 ha
                        </a>
                    </cm-area-limits>
                    <div className="label-info"></div>
                </label>
            </div>
            <div className={"field-list-actions-box"}>
                <button className="search-btn">
                    <mat-icon role="img" svgicon="search"
                              class="mat-icon notranslate search-icon mat-icon-no-color" aria-hidden="true"
                              data-mat-icon-type="svg" data-mat-icon-name="search">
                        <SearchIcon />
                    </mat-icon>
                    <span>Search</span>
                    <mat-icon role="img" svgicon="arrow-select"
                              class="mat-icon notranslate search-arrow mat-icon-no-color" aria-hidden="true"
                              data-mat-icon-type="svg" data-mat-icon-name="arrow-select">
                        <ExpandIcon />
                    </mat-icon>
                </button>
                <div className={"cm-field-filter"}>
                    <button data-id="filter-button" className="filter-btn">
                        <mat-icon role="img" svgicon="filter-alt"
                                  class="mat-icon notranslate filter-icon mat-icon-no-color" aria-hidden="true"
                                  data-mat-icon-type="svg" data-mat-icon-name="filter-alt">
                            <FilterIcon />
                        </mat-icon>
                        <span className="btn-text"><span>Filter</span></span>
                    </button>
                </div>
                <div className="aux-actions-box">
                    <button className="mat-tooltip-trigger aux-actions-btn"
                            aria-describedby="cdk-describedby-message-vbk-1-14">
                        <mat-icon role="img" svgicon="arrow-double-right"
                                  class="mat-icon notranslate aux-actions-icon mat-icon-no-color" aria-hidden="true"
                                  data-mat-icon-type="svg" data-mat-icon-name="arrow-double-right">
                            <DoubleRightIcon />
                        </mat-icon>
                    </button>
                    <div className="aux-actions d-none" hidden="">
                        <cm-fields-download className="ng-star-inserted">
                            <button data-id="download-contours-button"
                                    className="disable-select-text">
                                <mat-icon role="img" svgicon="download-report"
                                          className="mat-icon notranslate download-icon mat-icon-no-color"
                                          aria-hidden="true" data-mat-icon-type="svg"
                                          data-mat-icon-name="download-report">
                                    <img src="./assets/download-2.svg" alt=""/>
                                </mat-icon>
                                Export fields
                            </button>
                        </cm-fields-download>
                        <button className="bulk-edit-btn action-btn">
                            <mat-icon role="img" svgicon="bulk-edit"
                                      className="mat-icon notranslate bulk-edit-icon action-icon mat-icon-no-color"
                                      aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="bulk-edit">
                                <img src="./assets/paint.svg" alt=""/>
                            </mat-icon>
                            Bulk edit
                        </button>
                    </div>
                </div>
            </div>


            <div className="search-drop ng-star-inserted">
                <div className="ng-star-inserted">
                    <div>
                        <div className="mat-form-field small-mat-form-field ng-tns-c65-23 mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill mat-form-field-can-float ng-pristine ng-valid ng-star-inserted ng-touched">
                            <div className="mat-form-field-wrapper ng-tns-c65-23">
                                <div className="mat-form-field-flex ng-tns-c65-23">

                                    <div className="mat-form-field-prefix ng-tns-c65-23 ng-star-inserted">
                                        <button type="button" className="mat-focus-indicator search-btn mat-icon-button mat-button-base ng-tns-c65-23">
                                            <span className="mat-button-wrapper">
                                                <mat-icon _ngcontent-yvr-c270="" role="img" svgicon="search"
                                                          className="mat-icon notranslate mat-icon-no-color" aria-hidden="true"
                                                          data-mat-icon-type="svg" data-mat-icon-name="search">
                                                    <SearchIcon />
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
                                        <input  type="text" data-id="field-search" id="field-search"
                                            name="field-search" aria-label="field-search" autoComplete="off"
                                            className="mat-input-element mat-form-field-autofill-control ng-tns-c65-23 ng-pristine ng-valid cdk-text-field-autofill-monitored ng-touched"
                                            maxLength="100" placeholder="Field and crop search"
                                            data-placeholder="Field and crop search" aria-invalid="false"
                                            aria-required="false" />
                                        <span
                                            className="mat-form-field-label-wrapper ng-tns-c65-23"></span>
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
