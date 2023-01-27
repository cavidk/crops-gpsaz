import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

const Social = () => {
    return (
        <div className={"ui-personalized-social-buttons d-none"}>
            <div className="social-buttons">
                <div className="btns-box">
                    <div className="fb-button-wrapper btn-item">
                        <button className="fb-login-button-default">
                          <span className="fb-login-button-default__icon">
                            <div
                                role="img"
                                className="mat-icon mat-icon-no-color"
                                aria-hidden="true"
                                data-mat-icon-type="svg"
                                data-mat-icon-name="facebook-2"
                            >
                              <svg
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  preserveAspectRatio="xMidYMid meet"
                                  focusable="false"
                              >
                                <path
                                    d="M18 8.99996C18 4.02939 13.9706 -4.00543e-05 9 -4.00543e-05C4.02943 -4.00543e-05 0 4.02939 0 8.99996C0 13.4921 3.29117 17.2154 7.59375 17.8906V11.6015H5.30859V8.99996H7.59375V7.01715C7.59375 4.76152 8.93739 3.51558 10.9932 3.51558C11.9779 3.51558 13.0078 3.69137 13.0078 3.69137V5.90621H11.8729C10.7549 5.90621 10.4062 6.59997 10.4062 7.3117V8.99996H12.9023L12.5033 11.6015H10.4062V17.8906C14.7088 17.2154 18 13.4921 18 8.99996Z"
                                    fill="currentColor"
                                ></path>
                              </svg>
                            </div>
                          </span>
                          <span className="fb-login-button-default__text">
                              Sign in with Facebook
                          </span>
                        </button>
                    </div>
                    <button data-id="google-btn" className="google-btn btn-item">
                        <span className="google-btn__icon">
                          <div
                              role="img"
                              className="mat-icon mat-icon-no-color"
                              aria-hidden="true"
                              data-mat-icon-type="svg"
                              data-mat-icon-name="google-2"
                          >
                            <GoogleIcon />
                          </div>
                        </span>
                        <span className="google-btn__text"> Continue with Google </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Social;
