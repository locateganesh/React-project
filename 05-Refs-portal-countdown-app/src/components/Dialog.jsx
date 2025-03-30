import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Dialog = forwardRef(({targetTime, remainingTime, onReset}, ref) => {
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     onReset();
    //     dialog.current.hideModal();
    // }

    const containS = targetTime > 1 ? 's' : ''; 
    return createPortal(<dialog ref={dialog} className="result-modal">
        {userLost && <h2>You Lost!</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>The target time was <strong>{targetTime} second{containS}.</strong></p>
        <p>The stopped the timer with <strong>{formattedRemainingTime} second{containS} left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            <button>Close</button>
        </form>
    </dialog>, document.getElementById('modal'));

    // this above example is for
        // if any other dev change from dialog to div tag then it starts breaking.
        // Ref can be handled by useImperativeHandle.
});

export default Dialog;