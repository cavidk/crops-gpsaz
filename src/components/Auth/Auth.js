import Login from './Login';

import "../../assets/css/login.css";
import image from '../../assets/images/farmer.jpeg';
import React from "react";


const Auth = () => {


    return (
        <div className="cm-root">
            <div className="ui-login-page">
                <div className="login-bg"
                     style={{background: 'url(' + image + ') 90% 40% / cover no-repeat'}}>
                    <div className="logo">
                        <div role="img" className="mat-icon mat-icon-no-color" aria-hidden="true"
                             data-mat-icon-type="svg" data-mat-icon-name="logo_search">
                            <img src={require('../../assets/images/favicon.png')}
                                 alt="Crop Monitoring: Satellite-Based Software For Agricultural Needs"/>
                        </div>
                    </div>
                    <div className="ui-carousel login-carousel">
                        <div data-id="carousel" className="carusel">
                            <div data-id="carousel-item" className="carousel-item">
                                <h3 data-id="title" className="ng-star-inserted">Manage your fields remotely</h3>
                                <div data-id="description" className="ng-star-inserted"> Monitor the state of your crops
                                    right from the office, learn about the slightest changes on-the-spot, and make fast
                                    and
                                    reliable decisions on field treatment
                                </div>
                            </div>
                            <div data-id="carousel-item" className="carousel-item"></div>
                            <div data-id="carousel-item" className="carousel-item"></div>
                            <div className="carousel-indicator">
                                <div data-id="carousel-indicator" data-item="0"
                                     className="ng-star-inserted active"></div>
                                <div data-id="carousel-indicator" data-item="1"
                                     className="ng-star-inserted d-none"></div>
                                <div data-id="carousel-indicator" data-item="2"
                                     className="ng-star-inserted d-none"></div>
                            </div>
                            <div className="carousel-arrows">
                                <button data-id="carousel-arrow-back" className="carousel-arrow">
                                    <div role="img" color="white" svgicon="arrow-back"
                                         className="mat-icon mat-white mat-icon-no-color"
                                         aria-hidden="true" data-mat-icon-type="svg"
                                         data-mat-icon-name="arrow-back">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                             viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                                             focusable="false">
                                            <path fill=""
                                                  d="M17.67 3.87L15.9 2.1 6 12l9.9 9.9 1.77-1.77L9.54 12z"></path>
                                        </svg>
                                    </div>
                                </button>
                                <button data-id="carousel-arrow-next" className="carousel-arrow next">
                                    <div role="img" color="white" svgicon="arrow-back"
                                         className="mat-icon mat-white mat-icon-no-color"
                                         aria-hidden="true" data-mat-icon-type="svg"
                                         data-mat-icon-name="arrow-back">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                                             viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                                             focusable="false">
                                            <path fill=""
                                                  d="M17.67 3.87L15.9 2.1 6 12l9.9 9.9 1.77-1.77L9.54 12z"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="container-form">
                    <div className="logo ng-star-inserted">
                        <div role="img" className="mat-icon notranslate mat-icon-no-color"
                             aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="logo_search">
                            <img src={require('../../assets/images/favicon.png')}
                                 alt="Crop Monitoring: Satellite-Based Software For Agricultural Needs"/>
                        </div>
                    </div>
                    <div className="lang-select d-none">
                        <ng-select
                            className="ng-select-transparent ng-select ng-select-single ng-valid">
                            <div className="ng-select-container ng-has-value">
                                <div className="ng-value-container">
                                    <div className="ng-placeholder"></div>
                                    <div className="ng-value">
                                        <div role="img"
                                             className="mat-icon icon-before-text mat-icon-no-color"
                                             aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="en">

                                        </div>
                                        English
                                    </div>
                                    <div role="combobox" aria-haspopup="listbox" className="ng-input"
                                         aria-expanded="false">
                                        <input aria-autocomplete="list" type="text" autoCorrect="off"
                                               autoCapitalize="off"
                                               autoComplete="a28c0e38be8d" readOnly=""/>
                                    </div>
                                </div>
                                <span className="ng-arrow-wrapper">
                                    <span className="ng-arrow"></span>
                                </span>
                            </div>
                        </ng-select>
                    </div>

                    <div className="form-wrap">
                        <div className="ui-auth-form">
                            <div data-id="text" className="text"> Manage your fields easier - Monitor online. Detect in
                                real-time. Act smart.
                            </div>
                            <div className="form-wrap-2">
                                <div data-id="login-form" className="form">
                                    <div className={"ui-login-flow-btn-group"}>
                                        <div className="button-wrap">
                                            <button data-id="go-signup-btn"> Sign up for free</button>
                                        </div>
                                        <div className="button-wrap">
                                            <button data-id="sign-in-button" className="checked"> Sign In</button>
                                        </div>
                                    </div>
                                    <Login/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
