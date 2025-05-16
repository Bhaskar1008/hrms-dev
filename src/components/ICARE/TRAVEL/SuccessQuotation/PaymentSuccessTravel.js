import React, { useState } from "react";
import { Button, Image, message } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
import successImg from "../../../../images/SuccessQuotation/successState.svg";
import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import bankSvg from "../../../../images/Quotation/AiFillBank.svg";
import * as actions from "../../../../store/actions/index";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import { checkAgent, stoageGetter } from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../axios-request/request.methods";
import Travelpolicy from "../TravelFooter/Travelpolicy"

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
    title: "Policy #1234567890",
    tag: "Pending",
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

const successPagePay = {
  section1: {
    title: (
      <>
        Success! You may now <br /> pay for this policy.
      </>
    ),
    subTitle: "",
    img: "successImg",
    share: {
      show: false,
    },
  },
  section2: {
    title: (
      <div style={{ fontWeight: 500, fontSize: "17px" }}>
        Payment Reference #0000000001
      </div>
    ),
    data: data,
    displayDetails: true,
    successBtn: {
      show: true,
      text: "Pay Now",
    },
    downloadEditBtn: {
      show: false,
    },

    blur: false,
    backBtn: {
      show: true,
    },
  },
};

const policyPaymentFail = {
  section1: {
    title: <>Oops! Payment Failed.</>,
    subTitle: "",
    img: "paymentFail",
    subTitleForDown: "Please try again later or contact your designated Sales Representative for assistance.",
    share: {
      show: false,
    },
  },
  section2: {
    title: "Policy #1234567890",
    subTitle: "Payment Reference #0000000001",
    data: data,
    displayDetails: false,
    successBtn: {
      show: true,
      text: "Try Again",
    },
    downloadEditBtn: {
      show: false,
    },

    blur: false,
    backBtn: {
      show: true,
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

export default function PaymentSuccessTravel() {
  const dispatch = useDispatch();
  const login_user_data = stoageGetter("user");
  const agentCode = login_user_data?.agentCode;

  const policyData = useSelector(
    (state) => state?.trip?.travelPolicyQuotationData?.policyNumber
  );
  const tripData = useSelector((state) => state?.trip);
  console.log("tripData?.travelPolicyData?.agent", tripData);
  const RereranceNumber = useSelector(
    (state) => state?.trip?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber
  );
  console.log("RereranceNumber", RereranceNumber);
  const data = [];
  const [openloader, setopenloader] = useState(false);

  // const [postData, setPostData] = useState();

  const downloadPdf = async () => {
    setopenloader(true);

    var formData = {
      agentCode: login_user_data?.channelCode?.channelCode === 'CH1' ? tripData?.travelPolicyQuotationData
      ?.travel_information?.agentCode : login_user_data?.channelCode?.channelCode === 'CH1' ? tripData?.travelPolicyData?.agent : agentCode,
      policyNumber: policyData ? policyData : "",
      agentCopy: true,
      isPayment: false,
      isDownloadable: true,
    }
    
    try {
      const res = await axiosRequest.post("user/printQuote", formData, { secure: true }) // api call
      // setPostData(res?.data);
      console.log("response", res);
      if (res.statusCode === -1) {
        setopenloader(false);
        var a = document.createElement('a');
        a.href = res?.data?.fileUrl;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        message.success(res?.data?.message);
      } else {
        setopenloader(false);
      }
    } catch (error) {
      setopenloader(false);
      console.error("Error posting data:", error);
    }
  };

  const policyPaymentSuccess = {
    section1: {
      title: (
        <>
          Success! Your Payment <br />
          has been completed.
        </>
      ),
      subTitle: "",
      img: "successImg",
      share: {
        show: false,
      },
    },
    section2: {
      title: `Policy #${policyData}`,
      subTitle: `Payment Reference #${RereranceNumber}`,
      tag: {
        name: "Active",
        color: "#4ac6bb",
      },
      //tag: 'Active',
      data: data,
      displayDetails: false,
      successBtn: {
        show: true,
        text: "Download (Policy PDF)",
      },
      downloadEditBtn: {
        show: false,
      },
      blur: false,
      backBtn: {
        show: true,
      },
    },
  };

  const policySend = {
    section1: {
      title: (
        <>
          Success! Policy has been <br />
          send to the customer's <br />
          registered email.
        </>
      ),
      subTitle: "",
      img: "successImg",
      share: {
        show: false,
      },
    },
    section2: {
      title: `Policy  ${policyData}`,
      data: data,
      displayDetails: false,
      successBtn: {
        show: true,
        text: "Download (Policy PDF)",
      },
      downloadEditBtn: {
        show: false,
      },
      blur: false,
      backBtn: {
        show: true,
      },
    },
  };

  return (
    <>
    <div className="main-container">
      <FullPageLoader fromapploader={openloader} />
      <QuoteSuccessPage {...policyPaymentSuccess} onClick={downloadPdf} />
    </div>
   <Travelpolicy/>
    </>
  );
}
