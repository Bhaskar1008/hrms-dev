import React, { useState } from "react";
import "./SuccessQuotation.css";
import { useDispatch, useSelector } from "react-redux";
import RiskInspectionProps from "./RiskInspectionProps";
import WithoutApproxFooter from "../MotorFormFooter/QuickQuoteFooter/WithoutApproxFooter";

const paymentMethod = [
  { label: "Debit / Credit Card", value: "debitOrCreditCard" },
  { label: "GCash", value: "gcash" },
  { label: "Send Payment Link", value: "sendPaymentLink" },
  { label: "Credit Terms", value: "creditTerms" },
];
var quataionNumber1 = "";

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

export default function RiskInspectionRequired() {
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
  // console.log("test2", confirmTest);
  const [openloader, setopenloader] = useState(false);

  // const qoutationFormDataerrMsg = useSelector(state => (state?.ctplqoutation?.formData?.data))
  const qoutationFormData = useSelector((state) => state);
  // console.log("hey==>", qoutationFormData);
  let quotationNumber =
    qoutationFormData?.motorQuotation?.formalQuotationSucess
      ?.oonaQuotationResponse?.quotationNumber;

  let formalQuotationNumber =
    qoutationFormData?.motorQuotation?.formalQuotationSucess?.data
      ?.oonaQuotationResponse?.quotationNumber;
  // console.log("quotationNumber", quotationNumber);
  let bindQuation = quotationNumber ? quotationNumber : formalQuotationNumber;

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
      title: `Quotation #${bindQuation}`,
      tag: {
        name: "Required",
        color: "#fff",
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
    <div className="main-container">
      <RiskInspectionProps {...QuotationPending} />
    </div>
    <WithoutApproxFooter />
    </>
  );
}
