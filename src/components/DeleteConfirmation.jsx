import { useEffect } from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 10000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  

  useEffect(()=>{
    console.log('TIME OUT');
    const timer = setTimeout(()=>{
      onConfirm();
    },TIMER);

    return () => {
      console.log('Clear Time out');
      clearTimeout(timer);
    }
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <ProgressBar timer={TIMER} />
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
