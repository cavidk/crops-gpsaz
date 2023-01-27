import React, {useEffect, useState, useRef} from 'react';
import '../../assets/css/modals.css'
import {auth} from '../../utils/request'
import {useNavigate } from "react-router-dom";

const ProfileModal = (props) => {
    const [user, setUser] = useState([]);
    const [modalClass, setModalClass] = useState("d-none");
    const ref = useRef(null);
    const navigate  = useNavigate ();

    const { onClickOutside, show } = props;

    useEffect(() => {
        if(show){
            setModalClass("")
        }else{
            setModalClass("d-none")
        }
    }, [show]);

    useEffect(() => {
        setUser(JSON.parse(auth.getUser()))
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                onClickOutside && onClickOutside();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside ]);


    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    if(!props.show)
        return null;

    return (
        <div className={"cdk-overlay-container " + modalClass}>
            <div className="cdk-overlay-backdrop user-backdrop cdk-overlay-backdrop-showing"></div>
            <div className="cdk-overlay-connected-position-bounding-box" dir="ltr"
                 style={{right: '0px', bottom: '102px'}}>
                <div ref={ref} className="cdk-overlay-pane" style={{position: 'static'}}>
                    <div tabIndex="-1" role="menu"
                         className="mat-menu-panel ng-trigger ng-trigger-transformMenu ng-tns-c82-0 cm-menu-select mat-menu-before mat-menu-above mat-elevation-z4"
                         id="mat-menu-panel-0" style={{transformOrigin: 'right bottom'}}>
                        <div className="mat-menu-content ng-tns-c82-0">
                            <div className="user ng-tns-c82-0">
                                <div data-id="user-avatar" className="user-avatar">
                                    <mat-icon role="img" svgicon="avatar"
                                              className="mat-icon mat-icon-no-color"
                                              aria-hidden="true" data-mat-icon-type="svg" data-mat-icon-name="avatar">
                                        <svg width="100%" height="100%" viewBox="0 0 48 48" fill="none"
                                             xmlns="http://www.w3.org/2000/svg" fit=""
                                             preserveAspectRatio="xMidYMid meet"
                                             focusable="false">
                                            <path
                                                d="M24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
                                                fill="var(--border-minor)"></path>
                                            <path
                                                d="M41.463 38.034C40.419 37.209 39.147 36.615 37.767 36.327L31.188 35.007C30.498 34.875 30 34.257 30 33.537V32.028C30.423 31.434 30.822 30.645 31.239 29.82C31.563 29.181 32.052 28.218 32.295 27.969C33.627 26.631 34.914 25.128 35.313 23.19C35.685 21.372 35.319 20.418 34.89 19.65C34.89 17.733 34.83 15.333 34.377 13.587C34.323 11.223 33.894 9.894 32.814 8.73C32.052 7.905 30.93 7.713 30.027 7.56C29.673 7.5 29.184 7.416 29.004 7.32C27.405 6.456 25.824 6.033 23.937 6C19.986 6.162 15.129 8.676 13.503 13.158C12.999 14.523 13.05 16.764 13.092 18.564L13.053 19.647C12.666 20.403 12.285 21.363 12.66 23.187C13.056 25.128 14.343 26.634 15.699 27.99C15.921 28.218 16.422 29.19 16.752 29.832C17.175 30.654 17.577 31.44 18 32.031V33.54C18 34.257 17.499 34.875 16.806 35.01L10.221 36.33C8.85 36.621 7.57799 37.209 6.53699 38.034C6.21299 38.295 6.009 38.676 5.976 39.09C5.943 39.504 6.08099 39.909 6.35999 40.218C10.842 45.162 17.271 48 24 48C30.729 48 37.161 45.165 41.64 40.218C41.919 39.909 42.06 39.501 42.024 39.087C41.991 38.673 41.787 38.292 41.463 38.034Z"
                                                fill="#313D49"></path>
                                        </svg>
                                    </mat-icon>
                                </div>
                                <div data-id="user-info" className="user-info">
                                    <div data-id="user-name" className="name">{user.name}</div>
                                    <div data-id="user-email" className="email">{user.email}</div>
                                </div>
                            </div>
                            <button className="mat-focus-indicator mat-menu-item ng-tns-c82-0"
                                    name="Settings" data-id="settings-button" role="menuitem"> Settings
                            </button>
                            <button onClick={handleLogout} className="mat-focus-indicator mat-menu-item ng-tns-c82-0"
                                    name="Log out" data-id="log-out-button" role="menuitem"> Log out
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileModal;
