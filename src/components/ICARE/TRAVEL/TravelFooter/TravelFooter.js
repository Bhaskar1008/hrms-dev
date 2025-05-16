import React from "react";
import "./TravelFooter.css";
export default function TravelFooter() {
  return (
    <>
      <div className="bac">
        <div className="allformfooter">
          <div className="footer-details">
            <div className="firstdata">
              <p>YOUR SELECTION</p>
              <h2>Quick Quote for Individual Travel</h2>
            </div>
          </div>
        </div>

        <div className="Rsseconddata">
          {/* <p>APPROX</p> */}
          {/* <h2>{ vehicalPriceInfo === "" || vehicalPriceInfo === {} || vehicalPriceInfo === undefined || vehicalPriceInfo === null ? 'Php 0' : `Php ${vehiclePrice ? vehiclePrice : 0}`}</h2> */}
        </div>
      </div>
    </>
  );
}
