import React from "react";
import "./MotorFormFooter.css";
import { useDispatch, useSelector } from "react-redux";

const MotorFormFooter = () => {
  return (
    <>
      <div className="bac">
        <div className="allformfooter">
          <div className="footer-details">
            <div className="firstdata">
              <p>YOUR SELECTION</p>
              <h2>
                Quick Quote for Individual Motor Comprehensive
                {/* <span className="npolicy">No Policy Group</span> */}
              </h2>
            </div>
          </div>
        </div>

        <div className="Rsseconddata">
          {/* <p>APPROX</p>
          <h2>{ vehicalPriceInfo === "" || vehicalPriceInfo === {} || vehicalPriceInfo === undefined || vehicalPriceInfo === null ? 'Php 0' : `Php ${vehiclePrice ? vehiclePrice : 0}`}</h2> */}
        </div>
      </div>
    </>
  );
};

export default MotorFormFooter;
