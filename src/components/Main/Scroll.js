import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export function LeftArrow() {
    const {
        isFirstItemVisible,
        scrollPrev,
        visibleElements,
        initComplete
    } = React.useContext(VisibilityContext);

    const [disabled, setDisabled] = React.useState(
        !initComplete || (initComplete && isFirstItemVisible)
    );
    React.useEffect(() => {
        // NOTE: detect if whole component visible
        if (visibleElements.length) {
            setDisabled(isFirstItemVisible);
        }
    }, [isFirstItemVisible, visibleElements]);

    return (
        <div className="backBtn">
            <button className="icon small"  disabled={disabled} onClick={() => scrollPrev()}>
                <div role="img" svgicon="arrow-back"
                          className="mat-icon mat-icon-no-color" aria-hidden="true"
                          data-mat-icon-type="svg" data-mat-icon-name="arrow-back">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                         viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                         focusable="false">
                        <path fill="" d="M17.67 3.87L15.9 2.1 6 12l9.9 9.9 1.77-1.77L9.54 12z"></path>
                    </svg>
                </div>
            </button>
        </div>
    );
}

export function RightArrow() {
    const { isLastItemVisible, scrollNext, visibleElements } = React.useContext(
        VisibilityContext
    );

    const [disabled, setDisabled] = React.useState(
        !visibleElements.length && isLastItemVisible
    );
    React.useEffect(() => {
        if (visibleElements.length) {
            setDisabled(isLastItemVisible);
        }
    }, [isLastItemVisible, visibleElements]);

    return (
        <div className="forwardBtn">
            <button className="icon small nonactive"
                    disabled={disabled} onClick={() => scrollNext()}>
                <div role="img" svgicon="arrow-forward"
                          className="mat-icon mat-icon-no-color" aria-hidden="true"
                          data-mat-icon-type="svg" data-mat-icon-name="arrow-forward">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
                         viewBox="0 0 24 24" fit="" preserveAspectRatio="xMidYMid meet"
                         focusable="false">
                        <path fill="" d="M6.33 3.87L8.1 2.1 18 12l-9.9 9.9-1.77-1.77L14.46 12z"></path>
                    </svg>
                </div>
            </button>
        </div>
    );
}

export function useDrag() {
    const [clicked, setClicked] = React.useState(false);
    const [dragging, setDragging] = React.useState(false);
    const position = React.useRef(0);

    const dragStart = React.useCallback((ev: React.MouseEvent) => {
        position.current = ev.clientX;
        setClicked(true);
    }, []);

    const dragStop = React.useCallback(
        () =>
            // NOTE: need some delay so item under cursor won't be clicked
            window.requestAnimationFrame(() => {
                setDragging(false);
                setClicked(false);
            }),
        []
    );

    const dragMove = (ev: React.MouseEvent, cb: (posDif: number) => void) => {
        const newDiff = position.current - ev.clientX;

        const movedEnough = Math.abs(newDiff) > 5;

        if (clicked && movedEnough) {
            setDragging(true);
        }

        if (dragging && movedEnough) {
            position.current = ev.clientX;
            cb(newDiff);
        }
    };

    return {
        dragStart,
        dragStop,
        dragMove,
        dragging,
        position,
        setDragging
    };
}
