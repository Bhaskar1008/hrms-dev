import React from "react";
import "./StepThree.css";

const StepThree = () => {
  return (
    <>
      <div className="steppa3">
        <div className="step3">
          <div className="inner-page3"></div>
        </div>
        <div className="sidebarstep3">
          {/* <Progress percent={50} showInfo={false} /> */}
          <ul>
            <li> <span style={{color: '#4ac6bb', fontWeight: 'bold', marginRight:'5px'}}>1</span> Price Check</li>
            <li> <span style={{color: '#4ac6bb', fontWeight: 'bold', marginRight:'5px'}}>2</span> Create A Quote</li>
            <li> <span style={{color: '#4ac6bb', fontWeight: 'bold', marginRight:'5px'}}>3</span> Convert To policy</li>
          </ul>
        </div>
      </div>

      <div className="steppaMobile3">
        <div className="stepdata3">
          <div className="data5">
            <h4>1</h4>
            <h4 style={{ marginLeft: "8px" }}>2</h4>
            <h4 style={{ marginLeft: "8px" }}>3</h4>
            <p style={{ marginLeft: "7px" }}>Convert To policy</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThree;
