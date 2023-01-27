import Login from './Login';

import "../../assets/css/login.css";
import image from '../../assets/images/farmer.jpeg';


const Auth = () => {


    return (
        <div className="cm-root">
            <div className="ui-login-page">
                <div className="login-bg"
                     style={{background: 'url('+image+') 90% 40% / cover no-repeat'}}>
                    <div className="logo">
                        <div role="img" className="mat-icon mat-icon-no-color" aria-hidden="true"
                             data-mat-icon-type="svg" data-mat-icon-name="logo_search">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 690" fill="none" fit=""
                                 height="100%" width="100%"
                                 preserveAspectRatio="xMidYMid meet" focusable="false">
                                <path
                                    d="M535.696 164.788c-34.43-.003-64.355 11.286-89.775 33.867-26.042 23.134-42.572 53.592-49.588 91.375-17.418 14.487-31.091 26.644-41.018 36.468s-21.088 21.949-33.481 36.372c-10.324-22.449-16.93-48.897-19.82-79.345s-.63-68.626 6.779-114.532c23.75-11.846 44.699-30.486 62.845-55.918 17.317-24.269 23.696-54.926 19.137-91.971a77.91 77.91 0 0 1 8.863 7.627l136.058 136.058z"
                                    fill="#5a7e64"></path>
                                <path
                                    d="M583.778 212.869l77.491 77.491c30.177 30.177 30.177 79.104 0 109.281l-92.31 92.31c-28.961-25.8-62.593-37.61-100.895-35.432-38.792 2.207-72.767 19.434-101.926 51.682-16.876-.025-32.705-1.508-47.486-4.448s-28.725-8.236-41.831-15.885c15.428-26.832 37.015-57.041 64.764-90.625s53.554-59.914 77.418-78.989c44.133 7.165 81.485-.257 112.057-22.266 29.966-21.572 47.538-49.278 52.718-83.119z"
                                    fill="#adae5c"></path>
                                <path
                                    d="M483.662 577.248L399.64 661.27c-30.177 30.177-79.103 30.177-109.28 0l-67.183-67.183c6.162-15.801 11.681-28.868 16.556-39.201 7.551-16.004 14.669-29.771 21.353-41.302 22.151 9.521 39.596 15.663 52.337 18.426s31.669 4.51 56.785 5.24c18.616 17.876 34.881 29.256 48.794 34.138 13.725 4.815 35.278 6.769 64.66 5.86z"
                                    fill="#dbb450"></path>
                                <path
                                    d="M198.925 569.834L28.732 399.641c-30.177-30.177-30.177-79.103 0-109.28L261.064 58.029c-.114 27.132.857 46.352 2.914 57.657 2.156 11.847 6.976 25.553 14.461 41.118-9.318 52.979-11.789 99.374-7.414 139.184s14.284 72.173 29.726 97.086c-22.604 28.334-41.806 55.756-57.608 82.265-14.854 24.918-29.593 56.416-44.218 94.495z"
                                    fill="#41634a"></path>
                            </svg>
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
                                <div data-id="carousel-indicator" data-item="1" className="ng-star-inserted d-none"></div>
                                <div data-id="carousel-indicator" data-item="2" className="ng-star-inserted d-none"></div>
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
                                    <Login />
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
