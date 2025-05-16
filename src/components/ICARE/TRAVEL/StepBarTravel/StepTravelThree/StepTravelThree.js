import React from "react";
import "./StepTravelThree.css";

const StepTravelThree = () => {
  return (
    <>
      <div className="rssteppa3">
        <div className="rsstep3">
          <div className="inner-page3"></div>
        </div>
        <div className="rssidebarstep3">
          {/* <Progress percent={50} showInfo={false} /> */}
          <ul>
            <li>
              {" "}
              <span style={{ color: "#4AC6BB", marginRight: "5px" }}>
                1
              </span>{" "}
              PRICE CHECK
            </li>
            <li>
              <span style={{ color: "#4AC6BB", marginRight: "5px" }}>2</span>{" "}
              CONVERT TO POLICY
            </li>
            <li>
              <span style={{ color: "#4AC6BB", marginRight: "5px" }}>3</span>
              CONFIRMATION AND PAYMENT
            </li>
          </ul>
        </div>
      </div>

      <div className="rssteppaMobile3">
        <div className="rsstepdata3">
          <div className="rsdata5">
            <h4>1</h4>
            <h4 style={{ marginLeft: "8px" }}>2</h4>
            <h4 style={{ marginLeft: "8px" }}>3</h4>
            <p style={{ marginLeft: "10px" }}>Confirmation & Payment</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTravelThree;
