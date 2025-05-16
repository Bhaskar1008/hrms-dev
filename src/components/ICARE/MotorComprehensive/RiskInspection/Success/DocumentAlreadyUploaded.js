import React from "react";
import "./Success.css";
import img1 from "../../../../../images/Success/success.png";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "antd";

export default function DocumentAlreadyUploaded() {
  const { id } = useParams();
  const history = useHistory();

  const backtofirst = () =>{
    history.push(`/risk-inspection/${id}`)
  }

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
        <div className="thanku_you">Documents already submitted</div>
        
        <div className="bacbutton">
           <Button onClick={backtofirst}>Back</Button>
        </div>
      </div>
    </div>
  );
}
