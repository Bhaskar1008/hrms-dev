import React from "react";
import "./PolicyQuoteFooter.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
export default function PolicyQuoteFooter() {

  const location = useLocation();

  const FinalValue = useSelector(
    (state) => state?.motorQuotation?.motorQutotionSucess?.data?.oonaQuotationResponse?.paymentBreakdown?.grossPrem
  )
  const FinalValueformalForYes = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess?.oonaQuotationResponse?.paymentBreakdown?.grossPrem
  )
  const FinalValueformal = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess?.data?.oonaQuotationResponse?.paymentBreakdown?.grossPrem
  )

  console.log("FinalValueformal", FinalValueformal, FinalValueformalForYes, FinalValue);


  return (
    <div>
      <div className="bac">
        <div className="allformfooter">
          <div className="footer-details">
            <div className="firstdata">
              <p>YOUR SELECTION</p>
              <h2>Policy for Individual Motor Comprehensive</h2>
            </div>
          </div>
        </div>

    {
      location.pathname !== "/motor-payment-pay-now" && location.pathname !== "/motor-payment-success" ? <>
      <div className="seconddata">
          <p>APPROX</p>
          {/* <h2>{"₱ $24701.37"}</h2> */}
          <h2>{`₱ ${FinalValueformal ? FinalValueformal : FinalValue ? FinalValue : FinalValueformalForYes ? FinalValueformalForYes : '-'}`}</h2>
        </div>
      </> : ""
    }
        
      </div>
    </div>
  );
}
