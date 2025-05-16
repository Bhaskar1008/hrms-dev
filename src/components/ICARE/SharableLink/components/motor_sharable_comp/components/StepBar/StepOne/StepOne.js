import React from "react";
import "./StepOne.css";

const StepOne = (props) => {
  const { quoteSteps, setQuoteStepsHandler } = props;
  return (
    <>
      <div className="steppa">
        <div className="step1">
          <div className="inner-page"></div>
        </div>
        <div className="sidebarstep">
          {/* <Progress percent={50} showInfo={false} /> */}
          <ul>
            <li> <span style={{color: '#4ac6bb', fontWeight: 'bold', marginRight:'5px'}}>1</span> Price Check</li>
            <li> <span style={{color: '#4ac6bb', fontWeight: 'bold', marginRight:'5px'}}>2</span> Create A Quote</li>
            <li> <span style={{color: '#4ac6bb', fontWeight: 'bold',marginRight:'5px'}}>3</span> Convert To policy</li>
          </ul>
        </div>
      </div>

      <div className="steppaMobile">
        <div className="stepdata">
          <div className="data1">
            <h4>1</h4>
            <p>Price Check</p>
          </div>
          <div className="data2">
            <h4 style={{ marginRight: "8px" }}>2</h4>
            <h4>3</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepOne;
