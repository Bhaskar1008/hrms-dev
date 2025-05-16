import React, { useState } from "react";
import { Button, Image } from "antd";
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
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../axios-request/request.methods";
import { stoageGetter } from "../../../../helpers";
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
      <div style={{ fontWeight: 500, fontSize: "17px", color: '#1D428A' }}>
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

export default function PaymentFailedMotor(props) {
  const dispatch = useDispatch();
  const [loader, setloader] = useState(false);
  const { id } = stoageGetter("user");
  const motorData = useSelector((state) => state?.motorQuotation);
  const data = [];
  const history = useHistory();

  const dataFromPreviousPage = props?.location?.state?.data;
  console.log("Props Data=====>>>", dataFromPreviousPage);

  let policyNumberFromMaya = props?.location?.state?.data?.body?.policyNumber


  let policyNumberFromMayaCancle = props?.location?.state?.data?.oonaPolicyResponse?.policyNumber
  console.log("policyNumberFromMaya", policyNumberFromMayaCancle);

  let policyNumberFromMayaCancleId = props?.location?.state?.data?._id
  console.log("policyNumberFromMayaCancle", policyNumberFromMayaCancleId);

  let PolicyNumber = dataFromPreviousPage?.policyNumber;
  let RefrenceNumber = dataFromPreviousPage?.requestIdNumber;
  let PolicyId = dataFromPreviousPage?.policyId;

  let MotorPolicy = motorData?.motorPolicyResponse.data;
  console.log(MotorPolicy, PolicyId, "-----------MotorPolicy");

  const backToPaymentPage = () => {
    history.push("/motor-payment-pay-now");
  };

  const paymentFailed = async (PolicyNumber) => {
    console.log("PolicyNumber", PolicyNumber);
    setloader(true);
    try {
      let API = "user/policy/getPolicy/" + id + "?policyId=" + PolicyNumber;
      let result = await axiosRequest.get(API, {
        secure: true,
      });
      console.log("Datatat=====>>>", result);
      if (result?.statusCode === -1) {
        setloader(false);
        console.log("result----", result.data[0]);
        //setPerparticulerQuotation(result.data[0])
        onchangetoNext(result.data[0][0]);
      } else {
        setloader(false);
      }
      /// dispatch(actions.fetchLeadDetailsSuccess(result.data[0]));
    } catch (err) {
      setloader(false);
      console.log(err);
    }
  };

  const onchangetoNext = (data) => {
    console.log("Paymnet Datattt====>>>>", data);
    let allPolicyCTPL = {
      errCode: -1,
      errMsg: data,
    };
    console.log("Data====>>>>", allPolicyCTPL);
    dispatch(actions.motorPolicyStore(allPolicyCTPL));
    if (data?.oonaPolicyResponse?.paymentBreakdown == null) {
      history.push("/motor-policy-technical-control");
    } else {
      history.push("/motor-payment-pay-now");
    }
  };

  const successPage = {
    section1: {
      title: (
        <>
          Success!Here's is your <br /> quotation.
        </>
      ),
      subTitle: `Quotation No. `,
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

  const policyPaymentFail = {
    section1: {
      title: <>Oops! Payment Failed.</>,
      subTitle: "",
      img: "paymentFail",
      subTitleForDown: "Please try again later or contact your designated Sales Office for assistance.",
      share: {
        show: false,
      },
    },
    section2: {
      title: `Policy #${policyNumberFromMaya ? policyNumberFromMaya : policyNumberFromMayaCancle}`,
      subTitle: ``,
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

  return (
    <>
      <div className="main-container">
        <QuoteSuccessPage
          {...policyPaymentFail}
          onClick={() => paymentFailed(PolicyId ? PolicyId : policyNumberFromMayaCancleId)}
        />
      </div>
      {/* <WithoutApproxFooter /> */}
      <PolicyFooter />
    </>
  );
}
