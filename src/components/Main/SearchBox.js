import React, {Component, useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import RemoveIcon from '@mui/icons-material/Close';
import FilterIcon from '@mui/icons-material/Tune';
import DoubleRightIcon from '@mui/icons-material/DoubleArrow';
// import SvgIcon, { SvgIconProps } from '@material-ui/icons/Svg';
import "../../assets/css/main.css"

const SearchBox = (props) => {
    const [searchText, setSearchText] = useState("");
    const [searchClass, setSearchClass] = useState("d-none");
    const [searchValues, setSearchValues] = useState([]);

    useEffect(() => {

    }, []);


    function handleMapSearch(e) {
        let searchValue = e.target.value;
        setSearchText(searchValue)
        if (searchValue.length >= 3) {
            setSearchClass("")
        } else {
            setSearchClass("d-none")
        }
    }

    return (
        <div className="search-box">
            <ui-location-search _nghost-tiq-c142="">
                <div data-id="autocomplete__component" className="search-wrapper">
                    <label className="search-wrapper__label">
                        <div data-id="logo-icon" className="logo-icon-container">
                          <span logoicon="">
                            <mat-icon role="img" svgicon="logo_search"
                                      class="mat-icon logo_search_icon mat-icon-no-color" aria-hidden="true"
                                      data-mat-icon-type="svg" data-mat-icon-name="logo_search">
                                <img src={require('../../assets/images/favicon.png')} alt="Crop Monitoring: Satellite-Based Software For Agricultural Needs"/>
                            </mat-icon>
                          </span>
                        </div>
                        <input type="text" data-id="location-search-input"
                               className="search-input ng-valid ng-touched ng-dirty"
                               placeholder="Search location"
                               onChange={handleMapSearch}
                        />
                        <div className="search-controls">
                            {searchText.length >= 1 && (
                                <button data-id="autocomplete__clear-btn"
                                        className="search-controls__button">
                                <span className="clear-icon-container">
                                  <span clearicon="">
                                    <mat-icon role="img" svgicon="close"
                                              class="mat-icon close_icon mat-icon-no-color"
                                              aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="close">
                                      <RemoveIcon/>
                                    </mat-icon>
                                  </span>
                                </span>
                                </button>
                            )}

                            <button data-id="autocomplete__search-btn"
                                    className="search-controls__button">
                                <span className="search-icon-container">
                                  <span searchicon="">
                                    <mat-icon role="img" svgicon="search"
                                              class="mat-icon search_icon mat-icon-no-color"
                                              aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="search">
                                     <SearchIcon fontSize="large" sx={{fontSize: 40}}/>
                                    </mat-icon>
                                  </span>
                                </span>
                            </button>

                        </div>
                    </label>
                    {searchValues.length > 0 && (
                        <div className={"search-results " + searchClass}>
                            <ul className="search-results__list">
                                {searchValues.map((search, i) => (
                                    <li data-id="autocomplete__result-item"
                                        className="search-results__list-item">
                                    <span className="highlightSearch" data-id="highlight-search-result">
                                        <span className="highlightSearch">{searchText}</span>{search.value}
                                    </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </ui-location-search>
        </div>
    )
}

export default SearchBox;
