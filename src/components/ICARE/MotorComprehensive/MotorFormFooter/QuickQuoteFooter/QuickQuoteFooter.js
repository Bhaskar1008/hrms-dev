import React from "react";
import "./QuickQuoteFooter.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
export default function QuickQuoteFooter() {

  const history = useHistory();
  const location = useLocation();
  const FinalValue = useSelector(
    (state) => state?.motorQuotation?.motorQutotionSucess?.data?.oonaQuotationResponse?.paymentBreakdown?.grossPrem
  )
  // const FinalValueformal = useSelector(
  //   (state) => state?.motorQuotation?.motorQutotionSucess?.data?.oonaQuotationResponse?.grossPrem
  // )
  const FinalValueformal = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess?.data?.oonaQuotationResponse?.grossPrem
  )
  console.log("footer", FinalValueformal)
  return (
    <div>
      <div className="bac">
        <div className="allformfooter">
          <div className="footer-details">
            <div className="firstdata">
              <p>YOUR SELECTION</p>
              <h2>Quick Quote for Individual Motor Comprehensive</h2>
            </div>
          </div>
        </div>

        <div className="seconddata">
          <p>APPROX</p>
          {/* <h2>{"₱ $24701.37"}</h2> */}
          <h2>{`₱ ${FinalValueformal ? FinalValueformal : FinalValue ? FinalValue : ''}`}</h2>
        </div>
        
      </div>
    </div>
  );
}
