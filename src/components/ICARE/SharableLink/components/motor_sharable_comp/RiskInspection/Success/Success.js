import React from "react";
import "./Success.css";
import img1 from "../../../../../images/Success/success.png";
import { useParams } from "react-router-dom";

export default function Success() {
  const { id } = useParams();

  return (
    <div class="email-container">
      <div class="middle-section">
        <img
          src="https://oona-ph-bucket.s3.amazonaws.com/report/6194c01f1dabcfbeeb2b451cfbca1587b8718b3c2a22c34a0c01742d601b8438.png"
          alt="motor Image"
          class="img1"
        />
        <div className="title">
          {" "}
          <h3>Quotation: #{id}</h3>
        </div>
        <div className="img">
          <img src={img1} alt="thankyou img " />
         
        </div>
        <div className="thanku_you"> Thank you !</div>
        <div className="Rsmsg">
            <p>Your vehicle photos have been submitted.</p>
            <p>You will receive an update on your application in 2 days via Email & SMS.</p>
        </div>
        <div>
           
        </div>
      </div>
    </div>
  );
}
