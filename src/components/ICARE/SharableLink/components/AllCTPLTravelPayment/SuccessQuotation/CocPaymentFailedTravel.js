import React, { useState } from "react";
import { Button, Image } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
import { useSelector, useDispatch } from "react-redux";

import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";


import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";


const paymentMethod = [
  { label: "Debit / Credit Card", value: "debitOrCreditCard" },
  { label: "GCash", value: "gcash" },
  { label: "Send Payment Link", value: "sendPaymentLink" },
  { label: "Credit Terms", value: "creditTerms" },
];

const data = [
  { label: "Net Premium", value: "427.09" },
  { label: "Document Stamp", value: "427.09" },
  { label: "EVAT", value: "427.09" },
  { label: "LGT", value: "427.09" },
  { label: "Others", value: "427.09" },
  { label: "Tax", value: "427.09" },
  { label: "Gross Premium", value: "427.09" },
];



export default function PaymentFailedTravel(props) {

  const [openloader, setopenloader] = useState(false)
  const dataFromPreviousPage = props?.location?.state?.data;

  let policyNumber = dataFromPreviousPage?.body?.policyNumber

  // const policyNumber = useSelector((state) => state?.trip?.travelPolicyQuotationData?.oonaPolicyResponse?.policyNumber);

  const policyPaymentFail = {
    section1: {
      title: <>Oops!
        Confirmation of Cover (COC) Authentication Failed</>,
      subTitle: "",
      img: "paymentFail",
      share: {
        show: false,
      },
    },
    section2: {
      // ${policyNumber}
      title: `Policy #${policyNumber ? policyNumber : ''}`,
      tag: {
        name: "Pending",
        color: '#F68B1F'
      },
      data: data,
      displayDetails: true,
      successBtn: {
        show: false

      },
      downloadEditBtn: {
        show: false,
      },

      blur: true,
      backBtn: {
        show: true,
      },
    },
  };


  return (
    <div className="main-container">
      <FullPageLoader fromapploader={openloader} />
      <QuoteSuccessPage {...policyPaymentFail} />

    </div>
  );
}
