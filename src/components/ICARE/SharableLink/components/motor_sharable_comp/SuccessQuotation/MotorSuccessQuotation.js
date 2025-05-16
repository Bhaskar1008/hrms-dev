import React, { useState } from "react";
import { Button, Image, message } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
// import successImg from "../../../../images/SuccessQuotation/successState.svg";
// import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
// import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";
// import { useParams } from "react-router-dom/cjs/react-router-dom.min";
// import bankSvg from "../../../../images/Quotation/AiFillBank.svg";
import * as actions from "../../../../../../store/actions/index";
import LoginHeader from "../../../LoginHeader/LoginHeader"


import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import { stoageGetter } from "../../../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../../../axios-request/request.methods";

import WithoutApproxFooter from "../MotorFormFooter/QuickQuoteFooter/WithoutApproxFooter";

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
    title: "Policy #1234567890",
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

export default function MotorSuccessQuotation() {
  const dispatch = useDispatch();
  const data = [];
  let login_user_data = stoageGetter("user");

  const confirmTest = useSelector((state) => state);
  console.log("test2", confirmTest);
  const [openloader, setopenloader] = useState(false);

  const agentCodeFromPage = useSelector(
    (state) => state?.motorQuotation?.motorQutotionSucess?.agentCode
  );
  console.log("agentCodeFromPage==>", agentCodeFromPage);

  //const qoutationFormDataerrMsg = useSelector(state => (state?.ctplqoutation?.formData?.data))

  const qoutationFormData = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess.data
  );

  const qoutationFormDataListing = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess
  );
  console.log("qoutationFormDataListing==>", qoutationFormDataListing);

  let quotationNumber =
    qoutationFormData?.oonaQuotationResponse?.quotationNumber;
  console.log("hey==>1", quotationNumber);

  let quotationNumberListing =
    qoutationFormDataListing?.oonaQuotationResponse?.quotationNumber;

  const quotationDetails =
    qoutationFormData?.oonaQuotationResponse?.paymentBreakdown;
  console.log("paymentBreakdown", quotationDetails);

  const quotationDetailsListing =
    qoutationFormDataListing?.oonaQuotationResponse?.paymentBreakdown;
  console.log("quotationDetailsListing", quotationDetails);

  if (quotationDetails) {
    for (let key in quotationDetails) {
      data.push({ label: quotationLabel[key], value: quotationDetails[key] });
    }
  }

  if (quotationDetailsListing) {
    for (let key in quotationDetailsListing) {
      data.push({
        label: quotationLabel[key],
        value: quotationDetailsListing[key],
      });
    }
  }

  const getTotalValue = () => {
    const index = data.findIndex((e) => e.label === "Gross Premium");
    if (index !== -1) {
      return data[index].value;
    }
    return null;
  };

  const successPage = {
    section1: {
      title: (
        <>
          Success! Here's your <br /> quotation.
        </>
      ),
      subTitle: `Quotation #${quotationNumber ? quotationNumber : quotationNumberListing
        }`,
      img: "successImg",
      share: {
        show: true,
      },
    },
    section2: {
      title: "",
      data: data,
      totalAmount: getTotalValue(),
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

  const history = useHistory();

  const convertToPolicy = () => {
    // url name
    history.push("/customer-policyholder");
  };
  // function edit() {
  //   history.push("/price-check-info");
  // }

  async function downloadQuotePdf() {

    setopenloader(true);
    const formData = {
      agentCode:
        login_user_data?.channelCode?.channelCode === "CH1"
          ? agentCodeFromPage
          : login_user_data.agentCode,

      // quotationNumber: qoutationFormData?.oonaQuotationResponse?.quotationNumber,
      agentCopy: false,
      isPayment: false,
      isDownloadable: true,
      quotationNumber: quotationNumber
        ? quotationNumber
        : quotationNumberListing,
    };

    // dispatch(
    //   actions.fetchAllSaveQuotaionPDF(formData, (result) => {


    //     if (result?.statusCode === -1) {
    //       setopenloader(false);
    //       var a = document.createElement("a");
    //     a.href = result?.fileUrl;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     message.success(result?.message);
    //     } else {
    //       setopenloader(false);
    //     }
    //   })
    // );
    try {
      const res = await axiosRequest.post('user/printQuote', formData); // Replace with your API endpoint
      if (res.statusCode === -1) {
        var a = document.createElement('a');
        a.href = res?.data?.fileUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setopenloader(false)
        message.success(res?.data?.message)
      } else {
        setopenloader(false)
      }
    } catch (error) {
      setopenloader(false)
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  }

  return (
    <>
      <div className="main-container">
        <LoginHeader />
        <FullPageLoader fromapploader={openloader} />
        <QuoteSuccessPage
          {...successPage}

          onClick={convertToPolicy}
          // onclickedit={edit}
          downloadQuotePdf={downloadQuotePdf}
        />
      </div>
      {/* <QuickQuoteFooter /> */}
      <WithoutApproxFooter />
    </>

  );
}
