import React from "react";
import "./StepTravelTwo.css";

const StepTravelTwo = () => {
  return (
    <>
      <div className="rssteppa2">
        <div className="rsstep2">
          <div className="inner-page2"></div>
        </div>
        <div className="Rssidebarstep2">
          {/* <Progress percent={50} showInfo={false} /> */}
          <ul>
          <li> <span style={{color:'#4AC6BB',marginRight:'5px'}}>1</span> PRICE CHECK
                </li>
                <li><span style={{color:'#4AC6BB',marginRight:'5px'}}>2</span> CONVERT TO POLICY
                </li>
                <li><span style={{color:'#4AC6BB',marginRight:'5px'}}>3</span>CONFIRMATION AND PAYMENT
                </li>
          
          </ul>
        </div>
      </div>

      <div className="steppaMobile2">
        <div className="rsstepdata2">
          <div className="rsdata4">
            <h4>1</h4>
            <h4 style={{ marginLeft: "8px" }}>2</h4>
            <p style={{ marginLeft: "5px" }}>Convert to policy</p>
          </div>
          <div className="rsdata3">
            <h4>3</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTravelTwo;
