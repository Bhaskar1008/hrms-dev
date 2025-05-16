import React, { useState } from "react";
import { Button, Image } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
// import successImg from "../../../../images/SuccessQuotation/successState.svg";
// import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
// import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
// import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import bankSvg from "../../../../images/Quotation/AiFillBank.svg";
// import * as actions from "../../../../store/actions/index";
// import FullPageLoader from "../../../FullPageLoader/FullPageLoader";

import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../../../axios-request/request.methods";
import Quotationpendingpage from "../commonComponent/Quotationpendingpage"

const paymentMethod = [
  { label: "Debit / Credit Card", value: "debitOrCreditCard" },
  { label: "GCash", value: "gcash" },
  { label: "Send Payment Link", value: "sendPaymentLink" },
  { label: "Credit Terms", value: "creditTerms" },
];
var quataionNumber1 = ""

const data = [
  { label: "Net Premium", value: "427.09" },
  { label: "Document Stamp", value: "427.09" },
  { label: "EVAT", value: "427.09" },
  { label: "LGT", value: "427.09" },
  { label: "Others", value: "427.09" },
  { label: "Tax", value: "427.09" },
  { label: "Gross Premium", value: "427.09" },
];

// const QuotationPending = {
//   section1: {
//     title: (
//       <>
//         Oops! We need a moment <br /> to check that.
//       </>
//     ),
//     subTitle: null,
//     img: "quotationFail",
//     share: {
//       show: false,
//     },
//   },
//   section2: {
//     title: `Quotation# ${quataionNumber1}`,
//     tag: "Pending",
//     displayDetails: true,
//     data: data,
//     successBtn: {
//       show: false,
//     },
//     downloadEditBtn: {
//       show: false,
//     },
//     blur: true,
//     backBtn: {
//       show: true,
//     },
//   },
// };

const quotationLabel = {
  netPrem: "Net Premium",
  docStamp: "Document Stamp",
  eVat: "EVAT",
  lgt: "LGT",
  others: "Others",
  tax: "Tax",
  grossPrem: "Gross Premium",
  converted: "Converted",
};

export default function TechnicalControlForCTPL() {
  const dispatch = useDispatch();
  const tripData = useSelector((state) => state?.trip);
  const data = [];
  //   const quotationDetails = tripData?.travelQuotationDetails?.paymentBreakdown;
  //   if (quotationDetails) {
  //     for (let key in quotationDetails) {
  //       data.push({label: quotationLabel[key], value: quotationDetails[key]});
  //     }
  //   }
  const confirmTest = useSelector((state) => state);
  console.log("test2", confirmTest);
  const [openloader, setopenloader] = useState(false);

  // const qoutationFormDataerrMsg = useSelector(state => (state?.ctplqoutation?.formData?.data))
  const qoutationFormData = useSelector(
    (state) => state?.ctplqoutation?.formData?.data
  );
  console.log("hey==>", qoutationFormData)
  let quotationNumber = qoutationFormData?.oonaQuotationResponse?.quotationNumber;
  console.log("hey==>1", quotationNumber)

  const QuotationPending = {
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
      title: `Quotation #${quotationNumber}`,
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
    <div className="main-containerpage">
      <Quotationpendingpage {...QuotationPending} />
    </div>
  );
}
