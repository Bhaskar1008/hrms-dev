import React from "react";

const ProgressLine = ({ percent, width }) => {
  return (
    <div
      className="progress_bar d-none d-md-block"
      style={{
        width: width ? `${width}px` : "10px",
        height: "200px",
        background: "#C8CDD1",
        borderRadius: "20px",
      }}
    >
      <span
        className="progress"
        style={{
          width: "100%",
          height: percent ? `${percent}%` : "50%",
          background: "#4AC6BB",
          display: "block",
          borderRadius: "20px",
        }}
      ></span>
    </div>
  );
};

export default ProgressLine;
