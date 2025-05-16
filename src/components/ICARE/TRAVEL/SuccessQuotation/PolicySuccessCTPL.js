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
import { useSelector } from "react-redux";
import PaymentTypeSelectionPopup from "./Paymenttype";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import Apiconfig from '../../../../config/api.config'
import axiosRequest from '../../../../axios-request/request.methods'
import AllFormFooter from "../../AllFormFooter/AllFormFooter";
import { stoageGetter } from "../../../../helpers";

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


const policySuccessForCustomer = {
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
    title: "Policy #GVGVHBHB5677890",
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

const policyPaymentFailForTechnical = {
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



export default function PolicySuccessCTPL() {

  let login_user_data = stoageGetter("user");
  let channelCodeForUser = login_user_data?.channelCode?.channelCode

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [loader, setloader] = useState(false)
  const [patmentType, setPaymentTypye] = useState([])
  const linkText = "https://oo.na/agent/83dcgfg";
  const history = useHistory();
  const [show, setShow] = useState(false);
  const data = [];

  const CTPLPolicyDataListingPage = useSelector((state) => state?.ctplPolicy?.formData?.data);
  const CTPLPolicyData = useSelector((state) => state?.ctplPolicy?.formData?.data);
  console.log("CTPLPolicyData", CTPLPolicyData);
  console.log("CTPLPolicyDataListingPage", CTPLPolicyDataListingPage);

  console.log("paymentUrlllll--", CTPLPolicyData?.oonaPolicyResponse);

  const policyDetails = CTPLPolicyData?.oonaPolicyResponse?.paymentBreakdown;
  console.log("policyDetails", policyDetails);
  if (policyDetails) {
    for (let key in policyDetails) {
      data.push({ label: quotationLabel[key], value: policyDetails[key] });
    }
  }

  const getTotalValue = () => {
    const index = data.findIndex(e => e.label === 'Gross Premium')
    if (index !== -1) {
      return data[index].value
    }
    return null
  }

  // const ALLdetails = useSelector(state => (state))

  // let CTPLPolicyData = ALLdetails?.ctplPolicy?.formData?.data

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
          Payment Reference #{CTPLPolicyData?.oonaPolicyResponse?.referenceNumber}
        </div>
      ),
      data: data,
      totalAmount: getTotalValue(),
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


  function convertToPolicy() {
    setShow(prev => !prev)
  }
  var channelParam = ""
  if (channelCodeForUser === "CH2") {
    channelParam = "AGENT"
  }else{
    channelParam = "SALES"
  }

  const GetPaymentmethods = async () => {
    console.log("Paymnet methods")
    setloader(true)
    // let data ={paymentMethod:'cc'}
    // handleclick(data)
    // return
    // setPopupOpen(true);
    let Response = await axiosRequest.get(`user/payment/paymentMethods?product=CTPL&persona=${channelParam}`)
    console.log("Data=====>>>", Response)
    if (Response?.statusCode === -1) {
      if (Response?.data?.status === 200) {
        setPopupOpen(true);
        setloader(false)
        let paymnetmode = Response?.data?.data
        setPaymentTypye(paymnetmode)
        // console.log("Data=====>>>",paymnetmode)
      } else {
        message.error(Response?.data?.data?.error)
        setloader(false)
      }
    } else {
      setloader(false)
    }
    // console.log("Get Pyment Methods",Response)
  }
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  //   const handlePymentButton = () =>{
  //     if(travelPaymentPolicy?.ctplResponse?.allowPayment === true){
  //       return true
  //     }else if (travelPaymentPolicy?.ctplResponse?.referenceNumber !== null){
  //       return true
  //     }else{
  //       return false
  //     }
  //   }

  const handleclick = async (event) => {
    console.log("datat check", event)
    setloader(true)
    let API = 'user/payment/getPaymentRequest'

    let formdata = {
      // requestId: CTPLPolicyData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      // cancelUrl: Apiconfig?.ProjectLink + "/ctpl-payment-return-url",
      // firstName: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.firstName,
      // middleName: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.middleName,
      // lastName: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.lastName,
      // address1: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.addressLine1,
      // address2: "",
      // city: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.city,
      // state: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.province,
      // zip: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.zipCode,
      // email: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.email,
      // phone: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.mobileNumber,
      // mobile: "",
      // amount: CTPLPolicyData?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      // paymentMethod: event.paymentMethod,
      // paymentLink:Apiconfig?.ProjectLink +'/ctpl-cypher-payment/',
      // paymentText:event.paymentText,
      // responseUrl: Apiconfig?.ProjectLink + "/ctpl-payment-return-url", //return url
      // policyNo: CTPLPolicyData?._id // policy _id

      // this is the new payload for the ctpl
      requestReferenceNumber: CTPLPolicyData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      //ipAddress: "192.168.1.1",
      cancelLink: Apiconfig?.ProjectLink + "/CTPL-policy-sucess",
      // failureLink: Apiconfig?.ProjectLink + "/CTPL-payment-failed/Policy_Number:" + CTPLPolicyData?.oonaPolicyResponse?.policyNumber,
      failureLink: Apiconfig?.ProjectLink + `/ctpl-payment-return-url?Policy_Number=${CTPLPolicyData?.oonaPolicyResponse?.policyNumber}`,

      firstName: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.firstName,
    //  middleName: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.middleName,
      lastName: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.lastName,
      // address1: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.addressLine1,
      // address2: "",
      // city: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.city,
      // state: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.province,
      // zip: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.zipCode,
      email: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.email,
      phone: CTPLPolicyData?.CTPL_CustomerInfo_for_Policy?.mobileNumber,
      mobile: "",
      amount: CTPLPolicyData?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      paymentMethod: event.paymentMethod ? event.paymentMethod : "",
      successLink: Apiconfig?.ProjectLink + `/ctpl-payment-return-url?Policy_Number=${CTPLPolicyData?.oonaPolicyResponse?.policyNumber}`,
      paymentLink: Apiconfig?.ProjectLink + `/ctpl-cypher-payment/`,
      paymentText: event.paymentText,
      responseUrl: Apiconfig?.ProjectLink + "/ctpl-payment-return-url", //return url
      currency: "PHP",
      policyNumber: CTPLPolicyData?.oonaPolicyResponse?.policyNumber, // policy _id
      itemName: CTPLPolicyData?.oonaPolicyResponse?.policyNumber,
      description:"Kahoona - CTPL",
    }

    // return


    let Paymentresponse = await axiosRequest.post(API, formdata)
    console.log("Paymnet API", Paymentresponse)

    if (event.paymentText === 'CC' || event.paymentText === 'GC' || event.paymentText === 'Card / E-wallet') {
      if (Paymentresponse?.statusCode === -1) {
        setPopupOpen(false);
        console.log("Paymentresponse", Paymentresponse);

        message.success("Please Wait Redirecting to Payment Gateway.....");
        setloader(true);
        let URLdata = Paymentresponse?.data?.data?.body?.redirectUrl;
        // let Valuedata = Paymentresponse?.data?.data?.value;
        // return
        if (Paymentresponse?.data?.data?.status === 200) {

          window.open(URLdata,"_self")
          // let url = URLdata;
          // let value = Valuedata;
          // var mapForm = document.createElement("form");
          // mapForm.method = "POST";
          // mapForm.action = url;
          // var mapInput = document.createElement("input");
          // mapInput.type = "hidden";
          // mapInput.name = "paymentRequest";
          // mapInput.setAttribute("value", value);
          // mapForm.appendChild(mapInput);
          // document.body.appendChild(mapForm);
          // mapForm.submit();

          setloader(false);
        } else {
          setloader(false);
        }
      } else {
        setloader(false);
      }
    } else {
      setloader(false);
      setPopupOpen(false);
      if (event.paymentText === "Payment Link") {
        if (Paymentresponse?.statusCode === -1) {
          message.success(Paymentresponse?.data?.message);
          history.push({
            pathname: "/ctpl-customer-payment-link",
            state: {
              data: []
            }
          })
        }
      } else {
        if (Paymentresponse?.statusCode === -1) {
          message.success(Paymentresponse?.data?.message);
          history.push({
            pathname: "/ctpl-payment-success",
            state: {
              data: []
            }
          })
        } else {

        }
      }
      console.log("Else Part", Paymentresponse)
    }


  }

  return (
    <>
      <div className="main-containerpage">
        <FullPageLoader fromapploader={loader} />
        <PaymentTypeSelectionPopup
          visible={isPopupOpen}
          onCancel={handleClosePopup}
          onOk={handleClosePopup}
          paymnettype={patmentType}
          ispopupopen={isPopupOpen}
          onClick={handleclick}
        />
        <QuoteSuccessPage {...successPagePay} onClick={GetPaymentmethods} />

      </div>
      <AllFormFooter />
    </>
  );
}
