// import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo";

const Popup = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex  justify-center items-center z-40 py-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-black p-4 md:m-0 m-4 rounded-lg shadow-md w-96 h-96 overflow-y-auto relative border-white border-2">
        <Logo className="flex flex-row justify-center py-6 cursor-pointer" />
        <FontAwesomeIcon
          icon={faXmark}
          className="h-6 cursor-pointer absolute p-2 top-0 right-2  "
          onClick={onClose}
        />
        {/* </div> */}
        <div className="flex flex-col justify-center px-4">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
