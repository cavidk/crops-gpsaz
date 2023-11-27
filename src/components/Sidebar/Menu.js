import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircleOutlined";
import React, {useState} from "react";
import ProfileModal from "../Modals/ProfileModal";

const Menu = (props) => {
    const [sidebarUserProfileClass, setSidebarUserProfileClass] = useState("collased");
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [collapsedMenuClass, setCollapsedMenuClass] = useState("collapsed")

    function toggleMenu() {
        if (collapsedMenuClass === "collapsed") {
            setCollapsedMenuClass("opened");
        } else {
            setCollapsedMenuClass("collapsed")
        }
    }

    function userProfileHandler() {
        if (sidebarUserProfileClass === "collased") {
            setSidebarUserProfileClass("opened")
            setShowUserInfo(true)
        } else {
            setSidebarUserProfileClass("collased")
            setShowUserInfo(false)
        }
    }
    return (
        <div className={"menu-box"}>
            <div className={"cm-sidebar-menu-container menu-container " + collapsedMenuClass}>
                <div className="top-menu">
                    <div className="header-top-menu">
                        <div className="simple-menu" style={{paddingLeft: '6px'}}>
                            <button onClick={toggleMenu}
                                    className="mat-tooltip-trigger icon-sb toggle-button menu-btn disable-select-text collapsed">
                                          <span className="btn-icon">
                                            <div className="mat-icon mat-icon-no-color">
                                              <MenuIcon fontSize="large"/>
                                            </div>
                                          </span>
                                <span className="isSoonLabel d-none"></span>
                            </button>
                        </div>
                        <div className="simple-menu" style={{paddingLeft: '6px'}}></div>
                    </div>
                </div>
                <div className="bottom-menu">
                    <div className="cm-account-menu-settings" style={{paddingLeft: '6px'}}>
                        <div className={"mat-menu-trigger simple-menu " + sidebarUserProfileClass}
                             aria-haspopup="menu">
                            <button className="mat-tooltip-trigger account-sb active-link">
                                          <span className="btn-icon">
                                               
                                              <AccountCircleIcon/>
                                          </span>

                                <span className={"btn-text " + collapsedMenuClass}>
                                               <div className="full-user-name">
                                                   <span className>username</span>
                                               </div>
                                               <div className="team-name">
                                                   Team @GPS.az
                                               </div>
                                            </span>

                                <div className="arrow" onClick={userProfileHandler}>
                                    <div className="triangle"></div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className={"footer-bottom-menu simple-menu " + collapsedMenuClass}>
                        <button
                            className="mat-tooltip-trigger disable-select-text hiddenText primary-large ui-button">
                            <div role="img" svgicon="upgrade"
                                 className="mat-icon ui-btn-icon-before-text mat-icon-no-color"
                                 aria-hidden="true" data-mat-icon-type="svg"
                                 data-mat-icon-name="upgrade">
                                <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg" fit=""
                                     preserveAspectRatio="xMidYMid meet" focusable="false">
                                    <path
                                        d="M13.9699 19.7695H10.03V17.8189H13.9699V19.7695ZM13.9699 9.48116H18.0765L12 1.2002L5.92334 9.48116H10.03V16.7389H13.9699V9.48116ZM10.03 22.8002H13.9699V20.8495H10.03V22.8002Z"
                                        fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="content-wrp">up</div>
                        </button>
                    </div>
                </div>
            </div>
            <ProfileModal show={showUserInfo}
                          onClickOutside={() => {
                              userProfileHandler()
                          }}/>
        </div>
    );
}

export default Menu
