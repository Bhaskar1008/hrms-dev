import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
import Policypendingpage from "../../../../TRAVEL/commonComponent/Quotationpendingpage";
import { useDispatch, useSelector } from "react-redux";
import WithoutApproxFooter from "../MotorFormFooter/QuickQuoteFooter/WithoutApproxFooter";

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

export default function TechnicalControlForMotor() {
  const dispatch = useDispatch();
  const REDUX = useSelector((state) => state);
  console.log("REDUX: ", REDUX);
  const data = [];

  const confirmTest = useSelector((state) => state);
  console.log("test2", confirmTest);

  const qoutationFormData = useSelector(
    (state) => state?.ctplqoutation?.formData?.data
  );
  //   console.log("hey==>",qoutationFormData)
  // let quotationNumber = qoutationFormData?.quotationNumber;
  let firstQuotationNumber =
    confirmTest?.motorQuotation?.motorQutotionSucess?.data
      ?.oonaQuotationResponse?.quotationNumber;

  console.log("firstQuotationNumber", firstQuotationNumber);

  let formalQuotationNumber =
    confirmTest?.motorQuotation?.formalQuotationSucess?.data?.oonaQuotationResponse?.quotationNumber;

  console.log("formalQuotationNumber", formalQuotationNumber);

  let secondQuotationNumber =
    confirmTest?.motorQuotation?.motorQutotionSucess?.oonaQuotationResponse
      ?.quotationNumber;
  console.log("secondQuotationNumber", secondQuotationNumber);

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
      title: `Quotation #${formalQuotationNumber
          ? formalQuotationNumber
          : secondQuotationNumber
        }`,
      displayDetails: true,
      tag: {
        name: "Pending",
        color: "#F68B1F",
      },
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

  const history = useHistory();

  const [show, setShow] = useState(false);

  return (
    <>

      <div className="main-container">
        <Policypendingpage {...policyFail} />

      </div>
      <WithoutApproxFooter />
    </>
  );
}
