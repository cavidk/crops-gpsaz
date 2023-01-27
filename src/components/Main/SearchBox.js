import React, {Component, useEffect, useState} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import RemoveIcon from '@material-ui/icons/Close';
import FilterIcon from '@material-ui/icons/Tune';
import DoubleRightIcon from '@material-ui/icons/DoubleArrow';
// import SvgIcon, { SvgIconProps } from '@material-ui/icons/Svg';
import "./css/main.css"

const SearchBox = (props) => {

    useEffect(() => {

    }, []);


    return (
        <div className="search-box">
            <ui-location-search _nghost-tiq-c142="">
                <div data-id="autocomplete__component" className="search-wrapper">
                    <label className="search-wrapper__label">
                        <div data-id="logo-icon" className="logo-icon-container">
                          <span logoicon="">
                            <mat-icon role="img" svgicon="logo_search"
                                      class="mat-icon notranslate logo_search_icon mat-icon-no-color" aria-hidden="true"
                                      data-mat-icon-type="svg" data-mat-icon-name="logo_search">
                                <img src={require('./assets/favicon.png')} alt=""/>
                            </mat-icon>
                          </span>
                        </div>
                        <input type="text" data-id="location-search-input"
                               className="search-input ng-valid ng-touched ng-dirty" placeholder="Search location"/>
                        <div className="search-controls">
                            <button data-id="autocomplete__clear-btn"
                                    className="search-controls__button ng-star-inserted">
                                <span className="clear-icon-container">
                                  <span clearicon="">
                                    <mat-icon role="img" svgicon="close" class="mat-icon notranslate close_icon mat-icon-no-color"
                                              aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="close">
                                      <RemoveIcon/>
                                    </mat-icon>
                                  </span>
                                </span>
                            </button>
                            <button data-id="autocomplete__search-btn"
                                    className="search-controls__button ng-star-inserted">
                                <span className="search-icon-container">
                                  <span searchicon="">
                                    <mat-icon role="img" svgicon="search" class="mat-icon notranslate search_icon mat-icon-no-color"
                                              aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="search">
                                     <SearchIcon fontSize="large" sx={{ fontSize: 40 }}/>
                                    </mat-icon>
                                  </span>
                                </span>
                            </button>
                        </div>
                    </label>
                    <div className="search-results ng-star-inserted">
                        <ul className="search-results__list ng-star-inserted">
                            <li data-id="autocomplete__result-item"
                                className="search-results__list-item ng-star-inserted">
                                    <span  class="highlightSearch" data-id="highlight-search-result">
                                    <span className="highlightSearch">Baku</span>, Azerbaijan </span>
                            </li>
                            <li data-id="autocomplete__result-item"
                                className="search-results__list-item ng-star-inserted">
                                    <span  class="highlightSearch" data-id="highlight-search-result">
                                    <span className="highlightSearch">Baku</span>riani, Georgia </span>
                            </li>
                            <li data-id="autocomplete__result-item"
                                className="search-results__list-item ng-star-inserted">
                                    <span  class="highlightSearch" data-id="highlight-search-result">
                                    <span className="highlightSearch">Baku</span>m, Germany </span>
                            </li>
                            <li data-id="autocomplete__result-item"
                                className="search-results__list-item ng-star-inserted">
                                    <span class="highlightSearch" data-id="highlight-search-result">
                                    <span className="highlightSearch">Baku</span>n Dam, Belaga, Sarawak, Malaysia </span>
                            </li>
                            <li data-id="autocomplete__result-item"
                                className="search-results__list-item ng-star-inserted">
                                  <span highlightsearch="" class="highlightSearch" data-id="highlight-search-result">
                                  <span className="highlightSearch">Baku</span>ltala, Behala, Kolkata, West Bengal, India </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </ui-location-search>
        </div>
    )
}

export default SearchBox;
