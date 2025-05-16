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
import PolicyQuoteFooter from "../MotorFormFooter/PolicyQuoteFooter/PolicyQuoteFooter";
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



export default function PolicySuccessMotor() {
  let login_user_data = stoageGetter("user");
  let channelCodeForUser = login_user_data?.channelCode?.channelCode
  
  const motorData = useSelector((state) => state?.motorQuotation);
  console.log("motorData============>", motorData);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [loader, setloader] = useState(false)
  const [patmentType, setPaymentTypye] = useState([])
  const linkText = "https://oo.na/agent/83dcgfg";
  const history = useHistory();
  const [show, setShow] = useState(false);
  const data = [];

  const quotationDetails = motorData?.motorPolicyResponse.data?.oonaPolicyResponse?.paymentBreakdown;
  const OnlyOnnaResponse = motorData?.motorPolicyResponse.data?.oonaPolicyResponse
  console.log("OnlyOnnaResponse", OnlyOnnaResponse);
  console.log("quotationDetails", quotationDetails);

  if (quotationDetails) {
    for (let key in quotationDetails) {
      data.push({ label: quotationLabel[key], value: quotationDetails[key] });
    }
  }

  let MotorPolicy = motorData?.motorPolicyResponse.data
  console.log("MotorPolicy: ", MotorPolicy);
  

  const getTotalValue = () => {
    const index = data.findIndex(e => e.label === 'Gross Premium')
    if (index !== -1) {
      return data[index].value
    }
    return null
  }

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
          Payment Reference #{motorData?.motorPolicyResponse?.data?.oonaPolicyResponse?.referenceNumber}
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
    let Response = await axiosRequest.get(`user/payment/paymentMethods?product=MOTOR&persona=${channelParam}`)
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

  const handleclick = async (event) => {
    console.log("datat check", event)
    setloader(true)
    let formdata ={}
    let API = 'user/payment/getPaymentRequest'
if(OnlyOnnaResponse?.hasOwnProperty("oonaPolicyResponse") === true){
    formdata = {
      // requestReferenceNumber: OnlyOnnaResponse?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      // cancelLink: Apiconfig?.ProjectLink + "/motor-payment-return-url",
      // failureLink: Apiconfig?.ProjectLink + "/motor-payment-return-url",
      // firstName: MotorPolicy?.motor_comprehensive?.policyHolder?.firstName,
      // middleName: MotorPolicy?.motor_comprehensive?.policyHolder?.middleName,
      // lastName: MotorPolicy?.motor_comprehensive?.policyHolder?.lastName,
      // address1: MotorPolicy?.motor_comprehensive?.policyHolder?.address1,
      // address2: "",
      // city: MotorPolicy?.motor_comprehensive?.policyHolder?.cityCode,
      // state: MotorPolicy?.motor_comprehensive?.policyHolder?.provinceCode,
      // zip: MotorPolicy?.motor_comprehensive?.policyHolder?.zipCode,
      // email: MotorPolicy?.motor_comprehensive?.policyHolder?.emailAddress,
      // phone: MotorPolicy?.motor_comprehensive?.policyHolder?.mobileNumber,
      // mobile: "",
      // amount: MotorPolicy?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      // paymentMethod: event.paymentMethod ? event.paymentMethod : "",
      // successLink:Apiconfig?.ProjectLink +'/motor-cypher-payment/',
      // paymentLink:Apiconfig?.ProjectLink +'/motor-cypher-payment/',
      // paymentText:event.paymentText,
      // responseUrl: Apiconfig?.ProjectLink + "/motor-payment-return-url", //return url
      // currency: "PHP",
      // policyNo: MotorPolicy?._id // policy _id


      //  ================ this is new api from new payment ===========
      requestReferenceNumber: OnlyOnnaResponse?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      cancelLink: Apiconfig?.ProjectLink + '/motor-payment-pay-now',
      failureLink: Apiconfig?.ProjectLink + `/motor-payment-return-url?Policy_Number=${MotorPolicy?.oonaPolicyResponse?.policyNumber}`,
      firstName: MotorPolicy?.motor_comprehensive?.policyHolder?.firstName,
      // middleName: MotorPolicy?.motor_comprehensive?.policyHolder?.middleName,
      lastName: MotorPolicy?.motor_comprehensive?.policyHolder?.lastName,
      // address1: MotorPolicy?.motor_comprehensive?.policyHolder?.address1,
      // address2: "",
      // city: MotorPolicy?.motor_comprehensive?.policyHolder?.cityCode,
      // state: MotorPolicy?.motor_comprehensive?.policyHolder?.provinceCode,
      // zip: MotorPolicy?.motor_comprehensive?.policyHolder?.zipCode,
      email: MotorPolicy?.motor_comprehensive?.policyHolder?.emailAddress,
      phone: MotorPolicy?.motor_comprehensive?.policyHolder?.mobileNumber,
      // mobile: "",
      amount: MotorPolicy?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      paymentMethod: event.paymentMethod ? event.paymentMethod : "",
      successLink:Apiconfig?.ProjectLink +`/motor-payment-return-url?Policy_Number=${MotorPolicy?.oonaPolicyResponse?.policyNumber}`,
      paymentLink:Apiconfig?.ProjectLink +'/motor-cypher-payment/',
      paymentText:event.paymentText,
      responseUrl: Apiconfig?.ProjectLink + "/motor-payment-return-url", //return url
      currency: "PHP",
      policyNumber: MotorPolicy?.oonaPolicyResponse?.policyNumber,
      itemName: MotorPolicy?.oonaPolicyResponse?.policyNumber,
      description:"Kahoona - Motor",
    }

  }else{
    formdata = {
      // requestReferenceNumber: OnlyOnnaResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      // cancelLink: Apiconfig?.ProjectLink + "/motor-payment-return-url",
      // failureLink: Apiconfig?.ProjectLink + "/motor-payment-return-url",
      // firstName: MotorPolicy?.motor_comprehensive?.policyHolder?.firstName,
      // middleName: MotorPolicy?.motor_comprehensive?.policyHolder?.middleName,
      // lastName: MotorPolicy?.motor_comprehensive?.policyHolder?.lastName,
      // address1: MotorPolicy?.motor_comprehensive?.policyHolder?.address1,
      // address2: "",
      // city: MotorPolicy?.motor_comprehensive?.policyHolder?.cityCode,
      // state: MotorPolicy?.motor_comprehensive?.policyHolder?.provinceCode,
      // zip: MotorPolicy?.motor_comprehensive?.policyHolder?.zipCode,
      // email: MotorPolicy?.motor_comprehensive?.policyHolder?.emailAddress,
      // phone: MotorPolicy?.motor_comprehensive?.policyHolder?.mobileNumber,
      // mobile: "",
      // amount: MotorPolicy?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      // paymentMethod: event.paymentMethod ? event.paymentMethod : "",
      // successLink:Apiconfig?.ProjectLink +'/motor-cypher-payment/',
      // paymentLink:Apiconfig?.ProjectLink +'/motor-cypher-payment/',
      // paymentText:event.paymentText,
      // responseUrl: Apiconfig?.ProjectLink + "/motor-payment-return-url", //return url
      // currency: "PHP",
      // policyNo: MotorPolicy?._id      // policy _id

      // ------------------------- this is new payment api -----------------------------

      requestReferenceNumber: OnlyOnnaResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      cancelLink: Apiconfig?.ProjectLink + '/motor-payment-pay-now',
      failureLink: Apiconfig?.ProjectLink + `/motor-payment-return-url?Policy_Number=${MotorPolicy?.oonaPolicyResponse?.policyNumber}`,
      firstName: MotorPolicy?.motor_comprehensive?.policyHolder?.firstName,
     // middleName: MotorPolicy?.motor_comprehensive?.policyHolder?.middleName,
      lastName: MotorPolicy?.motor_comprehensive?.policyHolder?.lastName,
      // address1: MotorPolicy?.motor_comprehensive?.policyHolder?.address1,
      // address2: "",
      // city: MotorPolicy?.motor_comprehensive?.policyHolder?.cityCode,
      // state: MotorPolicy?.motor_comprehensive?.policyHolder?.provinceCode,
      // zip: MotorPolicy?.motor_comprehensive?.policyHolder?.zipCode,
      email: MotorPolicy?.motor_comprehensive?.policyHolder?.emailAddress,
      phone: MotorPolicy?.motor_comprehensive?.policyHolder?.mobileNumber,
      // mobile: "",
      amount: MotorPolicy?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      paymentMethod: event.paymentMethod ? event.paymentMethod : "",
      successLink:Apiconfig?.ProjectLink +`/motor-payment-return-url?Policy_Number=${MotorPolicy?.oonaPolicyResponse?.policyNumber}`,
      paymentLink:Apiconfig?.ProjectLink +'/motor-cypher-payment/',
      paymentText:event.paymentText,
      responseUrl: Apiconfig?.ProjectLink + "/motor-payment-return-url", //return url
      currency: "PHP",
      policyNumber: MotorPolicy?.oonaPolicyResponse?.policyNumber,      // policy _id
      itemName: MotorPolicy?.oonaPolicyResponse?.policyNumber,
      description:"Kahoona - Motor",
    }
  }

    // return


    let Paymentresponse = await axiosRequest.post(API, formdata)
    console.log("Paymnet API", Paymentresponse)

    if(event.paymentText === 'CC' || event.paymentText === 'GC' || event.paymentText === 'Card / E-wallet'){
      if (Paymentresponse?.statusCode === -1) {
        setPopupOpen(false);
        console.log("Paymentresponse", Paymentresponse);
         
        message.success("Please Wait Redirecting to Payment Gateway.....");
        setloader(true);
        let URLdata = Paymentresponse?.data?.data?.body?.redirectUrl;
        let Valuedata = Paymentresponse?.data?.data?.value;
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
    }else{
      setloader(false);
      setPopupOpen(false);
      if(event.paymentText === "Payment Link"){
        if(Paymentresponse?.statusCode === -1){
          message.success(Paymentresponse?.data?.message);
          history.push({
            pathname: "/motor-customer-payment-link",
            state: {
              data : []
            }
        })
      }}else{
        if(Paymentresponse?.statusCode === -1){
        message.success(Paymentresponse?.data?.message);
        history.push({
          pathname: "/motor-policy-customer-pay",
          state: {
            data : []
          }
      })
    }
      }
      console.log("Else Part",Paymentresponse)
      }


  }

  return (
    <>
      <div className="main-container">
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
      <PolicyQuoteFooter />
    </>
  );
}
