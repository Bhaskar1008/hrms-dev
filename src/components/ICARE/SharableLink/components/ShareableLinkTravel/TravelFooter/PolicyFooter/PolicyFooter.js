import React from 'react';
import './PolicyFooter.css'
import { useSelector } from "react-redux";


export default function PolicyFooter() {
  const tripData = useSelector((state) => state?.trip);
  const test = useSelector((state) => state);

  console.log("new123==>", test)
  const convertedValue = tripData?.travelQuotationDetails?.paymentBreakdown?.converted;
  const ListingValueCurrent = tripData?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.converted

  return (
    <>
      <div className="bac">
        <div className="allformfooter">
          <div className="footer-details">
            <div className="firstdata">
              <p>YOUR SELECTION</p>
              <h2>
                Policy for Individual Travel
              </h2>
            </div>
          </div>
        </div>

        <div className="rsseconddata">
          <p>incl. taxes</p>
          <h2>₱ {convertedValue ? convertedValue : ListingValueCurrent}</h2>
        </div>
      </div>
    </>
  );
}
