import React from "react";
import PropTypes from "prop-types";

const boardSquare = ({ value, onClick, disabled }) => {
  return (
    <div
      className={
        "w-1/3 h-40 flex items-center- justify-center mx:px-5 mx:py-3 p-2 " +
        (disabled ? "" : "cursor-pointer")
      }
      onClick={disabled ? null : onClick}
    >
      <div className="w-full h-full flex items-center justify-center text-5xl shadow rounded-lg text-gray-800 border-b-2 font-black">
        {value}
      </div>
    </div>
  );
};

boardSquare.propTypes = {
  value: PropTypes.string.isRequired
};

export default boardSquare;
