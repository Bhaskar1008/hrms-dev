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
import {checkAgent, stoageGetter} from '../../../../helpers'
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from '../../../../axios-request/request.methods'
// import WithoutApproxFooter from "../MotorFormFooter/QuickQuoteFooter/WithoutApproxFooter";
import PolicyFooter from "../MotorFormFooter/QuickQuoteFooter/PolicyFooter";

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
  netPrem: 'Net Premium',
  docStamp: "Document Stamp",
  eVat: "EVAT",
  lgt: "LGT",
  others: "Others",
  tax: "Tax",
  grossPrem: "Gross Premium",
  converted: "Converted",
};

export default function PaymentCustomerPayMotor() {
  const login_user_data = stoageGetter("user");
  const agentCode = login_user_data?.agentCode
  const data = [];
  const confirmTest = useSelector(state => (state))
  console.log("test2", confirmTest)
  const [openloader, setopenloader] = useState(false)

  const PolicyNumber = useSelector(state => (state?.motorQuotation?.motorPolicyResponse?.data?.oonaPolicyResponse?.policyNumber));

  const ReferanceNumber = useSelector(state => (state?.motorQuotation?.motorPolicyResponse?.data?.oonaPolicyResponse?.referenceNumber));
  
  const agentCodeFromPage = useSelector(state => (state?.motorQuotation?.motorQutotionSucess?.agentCode))
  const withListing = useSelector(state => (state?.motorQuotation?.motorPolicyResponse?.data?.agentCode))
  // const [postData, setPostData] = useState();

  console.log("PolicyNumber==>",PolicyNumber, agentCodeFromPage, withListing)

  const printPDF = async () => {
    let FormPDFData = {
      agentCode: login_user_data?.channelCode?.channelCode === "CH1"
      ? agentCodeFromPage : login_user_data?.channelCode?.channelCode === "CH1" ? withListing
        : agentCode,
      policyNumber: PolicyNumber ? PolicyNumber : "",
      agentCopy: true,
      isPayment: false,
      isDownloadable: true
  }
    setopenloader(true)
    try {
    const res = await axiosRequest.post('user/printQuote', FormPDFData); // Replace with your API endpoint
   
            if (res.statusCode === -1) {
              var a = document.createElement('a');
              a.href = res?.data?.fileUrl;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              setopenloader(false)
              message.success(res?.data?.message)
            }else{
              setopenloader(false)
            }

            } catch (error) {
              setopenloader(false)
              if (error?.response?.data?.statusCode === 1) {
                message.error(error?.response?.data?.data);
              }
            }
  };

  const successPage = {
    section1: {
      title: (
        <>
          Success! Here's is your <br /> quotation.
        </>
      ),
      subTitle: `Quotation No.`,
      img: "successImg",
      share: {
        show: true,
      },
    },
    section2: {
      title: "",
      data: data,
      displayDetails: true,
      successBtn: {
        show: true,
        text: "Convert To Policy",
      },
      downloadEditBtn: {
        show: true,
      },
      blur: false,
      backBtn: {
        show: true,
      },
    },
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
      title:  `Policy - ${PolicyNumber}`,
      tag: {
        name: 'Active',
        color: '#4ac6bb'
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
        title:  `Policy #${PolicyNumber}`,
        subTitle:  `Payment Reference #${ReferanceNumber}`,
        tag: {
          name: 'Active',
          color: '#4ac6bb'
        },
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
      <QuoteSuccessPage {...policySend} onClick={printPDF}/>
      
    </div>
    {/* <WithoutApproxFooter /> */}
    <PolicyFooter />
   </>
  );
}
