import React, { useState } from "react";
import { Button, Image } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
import { useDispatch, useSelector } from "react-redux";


import Quotationpendingpage from "../commonComponent/Quotationpendingpage"

import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import TravelFooter from "../TravelFooter/TravelFooter";


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



export default function PaymentFailedMotor(props) {
  const data = [];

  const [openloader, setopenloader] = useState(false)

  const quotaionNumber = useSelector((state) => state?.trip?.travelQuotationDetails?.quotationNumber
  );
  const quotaionNumberTechnicalControl = useSelector((state) => state?.trip?.travelQuotationDetails?.storeAllRes?.quotationNumber
  );
  console.log("quotaionNumberTechnicalControl", quotaionNumberTechnicalControl);

  const policyPaymentFail = {
    section1: {
      title: (
        <>
          Oops! We need a moment <br /> to check that.
        </>
      ),
      subTitle: null,
      img: "quotationFail",
      share: {
        show: false,
      },
    },
    section2: {
      title: `Quotation #${quotaionNumberTechnicalControl ? quotaionNumberTechnicalControl : ''} `,
      tag: {
        name: "Pending",
        color: '#F68B1F'
      },
      displayDetails: true,
      data: data,
      successBtn: {
        show: false,
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
    <>
      <div className="main-containerpage">
        <FullPageLoader fromapploader={openloader} />
        <Quotationpendingpage {...policyPaymentFail} />

      </div>

      <TravelFooter />
    </>
  );
}
