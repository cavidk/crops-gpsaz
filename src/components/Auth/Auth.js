import React, { useState } from "react";
import Login from './Login';
import SignUp from './Signup';
import "../../assets/css/login.css";
import image from '../../assets/images/farmer.jpeg';

const Auth = () => {
    const [activeButton, setActiveButton] = useState("signIn");

    const handleButtonClick = (buttonType) => {
        setActiveButton(buttonType);
    };

    return (
        <div className="cm-root">
            <div className="ui-login-page">
                <div className="login-bg" style={{ background: 'url(' + image + ') 90% 40% / cover no-repeat' }}>
                    <div className="logo">
                        <div role="img" className="mat-icon mat-icon-no-color" aria-hidden="true"
                             data-mat-icon-type="svg" data-mat-icon-name="logo_search">
                            <img src={require('../../assets/images/favicon.png')}
                                 alt="Crop Monitoring: Satellite-Based Software For Agricultural Needs"/>
                        </div>
                    </div>
                    {/* ... (your existing code for carousel) */}
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
                        {/* ... (your existing code for language selection) */}
                    </div>

                    <div className="form-wrap">
                        <div className="ui-auth-form">
                            <div data-id="text" className="text"> Manage your fields easier - Monitor online. Detect in
                                real-time. Act smart.
                            </div>
                            <div className="form-wrap-2">
                                <div data-id="login-form" className="form">
                                    <div className="ui-login-flow-btn-group">
                                        <div className="button-wrap">
                                            <button
                                                data-id="go-signup-btn"
                                                onClick={() => handleButtonClick("signUp")}
                                                className={` ${activeButton === "signUp" ? "checked" : ""}`}
                                            >
                                                Sign up for free
                                            </button>
                                        </div>
                                        <div className="button-wrap">
                                            <button
                                                
                                                data-id="sign-in-button"
                                                onClick={() => handleButtonClick("signIn")}
                                                className={`${activeButton === "signIn" ? "checked" : ""}`}
                                            >
                                                Sign In
                                            </button>
                                        </div>
                                    </div>
                                    {activeButton === "signIn" ? <Login /> : <SignUp />}
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
