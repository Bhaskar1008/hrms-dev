import React, { useState } from "react";
import "./SuccessQuotation.css";
import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";
import Quotationpendingpage from "../commonComponent/quoteSuccessPage"

import { useDispatch, useSelector } from "react-redux";
import AllFormFooter from "../../../../AllFormFooter/AllFormFooter";

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
  const policyNumber = useSelector(
    (state) => state?.ctplPolicy?.formData?.data?.oonaPolicyResponse?.policyNumber
  );
  console.log("policyNumber", policyNumber);
  console.log("test2", confirmTest);
  const [openloader, setopenloader] = useState(false);

  // const qoutationFormDataerrMsg = useSelector(state => (state?.ctplqoutation?.formData?.data))
  const qoutationFormData = useSelector(
    (state) => state?.ctplqoutation?.formData?.data
  );
  //   console.log("hey==>",qoutationFormData)
  let quotationNumber = qoutationFormData?.quotationNumber;
  //   console.log("hey==>1",quotationNumber)

  console.log(data, "-----------here");

  const successPage = {
    section1: {
      title: (
        <>
          Success! Here's is your <br /> quotation.
        </>
      ),
      subTitle: `Quotation #${quotationNumber}`,
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
      title: "Policy #GVGVHBHB5677890",
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
      title: `Policy #${policyNumber ? policyNumber : ""}`,
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
      <QuoteSuccessPage {...policyFail} />
    </div>
    <AllFormFooter />
    </>
  );
}
