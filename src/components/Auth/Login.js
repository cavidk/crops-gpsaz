import React, {useRef, useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import Social from "./Social";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const request = require("../../utils/request");

const Login = () => {
    const [submit, setSubmit] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [focused, setFocused] = React.useState(false);
    const [errors, setErrors] = useState([]);
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const usernameRef = useRef(null);

    useEffect(() => {
        // console.log(errors)
    }, [errors]);

    const handleLoginClick = () => {
        setSubmit(true);
        let errors = {};

        if (username && password) {
            const user = {
                username: username || undefined,
                password: password || undefined,
            };
            request.login(user, (err, res) => {
                if (err !== null) {
                    errors.auth = "Incorrect authentication credentials.";
                    setErrors(errors);
                } else {
                    request.auth.authenticate(res.data, () => {
                        navigate("/");
                    });
                }
            });
        } else {
            if (username === "") {
                errors.username = "This field cannot be empty.";
            }
            if (password === "") {
                errors.password = "This field cannot be empty.";
            }
            setErrors(errors);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLoginClick();
        }
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    return (
        <div className="form-in">
            <Social/>
            <div className="separator d-none">
                <span className="or-text">or</span>
            </div>

            <form className="ng-untouched">
                <div>
                    <div className="wrap-control">
                        <p className={"small"}>Username</p>
                        <div
                            className={
                                "mat-form-field small-mat-form-field mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill " +
                                (focused === true ? "focused" : "")
                            }
                        >
                            <div className="mat-form-field-wrapper">
                                <div className="mat-form-field-flex">
                                    <div className="mat-form-field-infix">
                                        <input
                                            ref={usernameRef}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            type="email"
                                            onChange={(e) => setUsername(e.target.value)}
                                            autoComplete="on"
                                            className="mat-input-element mat-form-field-autofill-control cdk-text-field-autofill-monitored"
                                            data-id="email"
                                            required=""
                                            id="mat-input-10"
                                            aria-required="true"
                                        />
                                        <span
                                            className={
                                                "mat-form-field-label-wrapper " +
                                                (focused === true || username !== "" ? "d-none" : "")
                                            }
                                        >
                                          <label
                                              className="mat-form-field-label mat-empty mat-form-field-empty"
                                              id="mat-form-field-label-21"
                                          >
                                            <mat-label>
                                              samigmuseyibli
                                            </mat-label>
                                            <span
                                                aria-hidden="true"
                                                className="mat-placeholder-required mat-form-field-required-marker"
                                            >                                                *
                                            </span>
                                          </label>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors.auth && errors.auth !== "" && (
                            <mat-error
                                _ngcontent-vtf-c324=""
                                aria-atomic="true"
                                class="mat-error"
                                aria-live="polite"
                                data-id="email-error"
                                id="mat-error-3"
                            >
                                {errors.auth}
                            </mat-error>
                        )}

                        {errors.username && username === "" && (
                            <mat-error
                                _ngcontent-vtf-c324=""
                                aria-atomic="true"
                                class="mat-error"
                                aria-live="polite"
                                data-id="email-error"
                                id="mat-error-3"
                            >
                                {errors.username}
                            </mat-error>
                        )}
                    </div>
                    <div className="wrap-control">
                        <div className="forgot-wrap">
                            <p className={"small"}>Password</p>
                            <a className="forgot-link d-none" href="/login/restore-password">
                                Forgot Password?
                            </a>
                        </div>

                        <div
                            className="mat-form-field small-mat-form-field  mat-primary mat-form-field-type-mat-input mat-form-field-appearance-fill">
                            <div className="mat-form-field-wrapper ">
                                <div className="mat-form-field-flex ">
                                    <div className="mat-form-field-infix ">
                                        <input
                                            autoComplete="on"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="mat-input-element mat-form-field-autofill-control password-input  cdk-text-field-autofill-monitored"
                                            type={showPassword ? "text" : "password"}
                                            data-id="password"
                                            required=""
                                            id="mat-input-11"
                                            aria-required="true"
                                        />
                                        <span className="mat-form-field-label-wrapper "></span>
                                    </div>
                                    <div className="mat-form-field-suffix ">
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="mat-focus-indicator mat-icon-button mat-button-base togglePassword"
                                        >
                                              <span className="mat-button-wrapper">
                                                <div
                                                    role="img"
                                                    className="mat-icon mat-icon-no-color whunset"
                                                    aria-hidden="true"
                                                    data-mat-icon-type="svg"
                                                    data-mat-icon-name="eye"
                                                >
                                                  {!showPassword && <VisibilityOutlinedIcon/>}

                                                    {showPassword && <VisibilityOffOutlinedIcon/>}
                                                </div>
                                              </span>
                                            <span
                                                className="mat-ripple mat-button-ripple mat-button-ripple-round"></span>
                                            <span className="mat-button-focus-overlay"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {errors.auth && errors.auth !== "" && (
                            <mat-error
                                _ngcontent-vtf-c324=""
                                aria-atomic="true"
                                class="mat-error"
                                aria-live="polite"
                                data-id="email-error"
                                id="mat-error-3"
                            >
                                {errors.auth}
                            </mat-error>
                        )}
                        {errors.password && password === "" && (
                            <mat-error
                                _ngcontent-vtf-c324=""
                                aria-atomic="true"
                                class="mat-error"
                                aria-live="polite"
                                data-id="email-error"
                                id="mat-error-3"
                            >
                                {errors.password}
                            </mat-error>
                        )}
                    </div>
                    <button
                        onClick={handleLoginClick}
                        type={"button"}
                        className="submit-btn primary-large ui-button"
                    >
                        <div className="content-wrp"> Sign In</div>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
