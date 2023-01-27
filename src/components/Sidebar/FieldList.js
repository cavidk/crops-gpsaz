import ActionsBox from "./ActionsBox";
import Fields from "./Fields";
import React from "react";

const FieldList = (props) => {
    return (
        <div
            className={
                "main-map-sidebar " +
                props.sidebarMobileClass +
                " " +
                props.sidebarClass
            }
        >
            <div className={"sidebar-column"}>
                <div className={"fold-container"}>
                    <div className={"field-list-container"}>
                        <ActionsBox />
                        <div className={"field-list-content"}>
                            <Fields map={props.map} />
                        </div>
                        <div className={"field-list-buttons"}>
                            <div>
                                <button className="primary-large ui-button">
                                    <div
                                        role="img"
                                        svgicon="plus"
                                        className="mat-icon ui-btn-icon-before-text mat-icon-no-color"
                                        aria-hidden="true"
                                        data-mat-icon-type="svg"
                                        data-mat-icon-name="plus"
                                    >
                                        <svg
                                            width="100%"
                                            height="100%"
                                            viewBox="0 0 14 14"
                                            fill=""
                                            xmlns="http://www.w3.org/2000/svg"
                                            fit=""
                                            preserveAspectRatio="xMidYMid meet"
                                            focusable="false"
                                        >
                                            <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill=""></path>
                                        </svg>
                                    </div>
                                    <div className="content-wrp"> Add field</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        props.sidebarMobileClass == "mobile"
                            ? "btn-wrap"
                            : "btn-wrap d-none"
                    }
                >
                    <button className="fold-btn" onClick={props.handleToggleSidebar}>
                        <div>
                            <div className={"fold-content"}>
                                <span className={"fold-text"}>{props.sidebarButtonText}</span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FieldList;
