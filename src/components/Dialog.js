import React from "react";
import "./Dialog.css";

function Dialog({ onClose, children }) {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="Dialog_close-button" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}

export default Dialog;
