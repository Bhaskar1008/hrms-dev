import React, { useState } from "react";
import { Button, Image } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
import axiosRequest from "../../../../../../axios-request/request.methods";
import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";
import { useSelector } from "react-redux";
import { stoageGetter } from "../../../../../../helpers";
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



const policyFail = {
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
    title: "Policy #1234567890",
    displayDetails: true,
    tag: "",
    data: data,
    successBtn: {
      show: false,
    },
    downloadEditBtn: {
      show: false,
    },
    blur: true,
    backBtn: {
      show: false,
    },
  },
};


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



export default function SuccessQuotation() {
  let login_user_data = stoageGetter("user");

  const sampletripData = useSelector((state) => state?.JWTDecrypt?.JWTDecryptData?.formData?.userData);
  const getAgentCode = sampletripData?.agentCode;
  const getchannelCode = sampletripData?.channelCode?.channelCode;
  
  const tripData = useSelector((state) => state?.trip);
  const policyNumber = useSelector((state) => state?.trip?.travelPolicyQuotationData?.oonaPolicyResponse?.policyNumber);
  console.log("policy==>", policyNumber)
  const data = [];
  const quotationDetails = tripData?.travelQuotationDetails?.paymentBreakdown;
  if (quotationDetails) {
    for (let key in quotationDetails) {
      data.push({ label: quotationLabel[key], value: quotationDetails[key] });
    }
  }

  const getTotalValue = () => {
    const index = data.findIndex((e) => e.label === "Converted");
    if (index !== -1) {
      return data[index].value;
    }
    return null;
  };


  const history = useHistory();

  function convertToPolicy() {
    history.push("/customer/customer-info");
  }

  async function downloadQuotePdf() {
    const formData = {
      agentCode: getchannelCode === 'CH1' ? tripData?.travelPolicyData.agent ? tripData?.travelPolicyData.agent : getAgentCode : getAgentCode,
      quotationNumber: tripData?.travelQuotationDetails?.quotationNumber,
      agentCopy: true,
      isPayment: false,
      isDownloadable: true,
    };
    const data = await axiosRequest.post("user/printQuote", formData);
  }
  const policyPending = {
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
      title: `Policy #${policyNumber ? policyNumber : ''}`,
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
      <QuoteSuccessPage
        {...policyPending}
        onClick={convertToPolicy}
        downloadQuotePdf={downloadQuotePdf}
      />
    </div>
    <TravelFooter />
    </>
  );
}
