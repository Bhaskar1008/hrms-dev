import React, { useState, useEffect } from "react";
import { Button, Image, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
// import "./SuccessQuotation.css";
// import successImg from "../../../../images/SuccessQuotation/successState.svg";
// import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
// import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import CypherPaymentCommon from "../PaymentCypherCommon/CypherPaymentCommon";
// import bankSvg from "../../../../images/Quotation/AiFillBank.svg";
import { useSelector } from "react-redux";
import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import PaymentTypeSelectionPopup from "../../../components/ShareableLinkTravel/SuccessQuotation/Paymenttype";
// import axiosRequest from "../../../../axios-request/request.methods";
import Apiconfig from "../../../../../../config/api.config";
// import axios from "axios";

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

export default function TravelCypherPayment() {

  const {id} = useParams()
  console.log("parmId----------->",id);
  const queryString = window.location.href;

   var params = queryString.split("travel-cypher-payment/");
    var finalCypher = params[1]
  console.log("queryString", finalCypher);


  const tripData = useSelector((state) => state?.trip);
  const [loader, setloader] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [patmentType, setPaymentTypye] = useState([]);
  const data = [];
  const [getPolicyData, setGetPolicyData] = useState([])
  
  const {baseURL} = Apiconfig

  const handleGetRequest = async () => {
    try {
      // Construct the URL with query parameters based on the payload
      const axios = require('axios');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'cipherSecure/getPolicyData',
        headers: { 
          'ciphertext': finalCypher
        }
      };

      axios.request(config)
      .then((response) => {
        // console.log("checkapii----->", JSON.stringify(response.data));
        setGetPolicyData(response?.data?.data)
        
            }).catch((error) => {
          console.log(error);
        });

    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };

  useEffect(() => {
    handleGetRequest()
  }, [])
  

  const quotationDetails = getPolicyData?.oonaPolicyResponse?.paymentBreakdown;
 
  if (quotationDetails) {
    for (let key in quotationDetails) {
      data.push({ label: quotationLabel[key], value: quotationDetails[key] });
    }
  }

  const getTotalValue = () => {
    let label = "Converted"
    const index = data.findIndex((e) => e.label === label);
    if (index !== -1) {
      return data[index].value;
    }
    return null;
  };


  const ALLdetails = useSelector((state) => state);
  
  console.log("ALL Store=======>>>", ALLdetails);
  let CTPLPolicy = getPolicyData;

  const GetPaymentmethods = async () => {
    console.log("Paymnet methods");
    setloader(true);
    
    const axios = require('axios');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'cipherSecure/getPaymentMethod?product=TRAVEL&persona=CLIENT',
        headers: { 
          'ciphertext': finalCypher
        }
      };

      axios.request(config)
      .then((response) => {
        console.log("response?.statusCode", response);
        if (response?.data?.statusCode === -1) {
          if (response?.status === 200) {
            setPopupOpen(true);
            setloader(false);
            let paymnetmode = response?.data?.data;
            console.log("paymnetmode", paymnetmode);
            setPaymentTypye(paymnetmode);
            // console.log("Data=====>>>",paymnetmode)
          } else {
            message.error(response?.data?.data?.error);
            setloader(false);
          }
        } else {
          setloader(false);
        }
            }).catch((error) => {
              setloader(false);
          console.log(error);
        });


    // console.log("Get Pyment Methods",Response)
  };
  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const Paymnetgatewayredirect   = async (event)=>{
    setloader(true);

    const axios = require('axios');
    let formdata = {
      // requestId: CTPLPolicy?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      // cancelUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url-cyphyer/" + finalCypher,
      // firstName: CTPLPolicy?.travel_information?.policyHolder?.firstName,
      // middleName: CTPLPolicy?.travel_information?.policyHolder?.middleName,
      // lastName: CTPLPolicy?.travel_information?.policyHolder?.lastName,
      // address1: CTPLPolicy?.travel_information?.policyHolder?.address1,
      // address2: CTPLPolicy?.travel_information?.policyHolder?.address2,
      // city: CTPLPolicy?.travel_information?.policyHolder?.cityCode,
      // state: CTPLPolicy?.travel_information?.policyHolder?.provinceCode,
      // zip: CTPLPolicy?.travel_information?.policyHolder?.zipCode,
      // email: CTPLPolicy?.travel_information?.policyHolder?.emailAddress,
      // phone: CTPLPolicy?.travel_information?.policyHolder?.mobileNumber,
      // mobile: "",
      // amount: CTPLPolicy?.oonaPolicyResponse?.paymentBreakdown?.converted,
      // paymentText:event.paymentText,
      // paymentLink: Apiconfig?.ProjectLink + '/travel-policy-sucess/',
      // paymentMethod: event.paymentMethod,
      // responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url-cyphyer/" + finalCypher , //return url
      // policyNo: CTPLPolicy?._id, // policy _id

      // ===========   For maya payment form data ========== ----

      requestReferenceNumber: CTPLPolicy?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      cancelLink: Apiconfig?.ProjectLink + `/travel-cypher-payment/${finalCypher}`,
      failureLink: Apiconfig?.ProjectLink + `/travel-payment-return-url-cyphyer/${finalCypher}=?Policy_Number=${CTPLPolicy?.oonaPolicyResponse?.policyNumber}`,
      firstName: CTPLPolicy?.travel_information?.policyHolder?.firstName,
      lastName: CTPLPolicy?.travel_information?.policyHolder?.lastName,
      email: CTPLPolicy?.travel_information?.policyHolder?.emailAddress,
      phone: CTPLPolicy?.travel_information?.policyHolder?.mobileNumber,
      amount: CTPLPolicy?.oonaPolicyResponse?.paymentBreakdown?.converted,
      paymentText:event.paymentText,
      paymentLink: Apiconfig?.ProjectLink + '/travel-policy-sucess/',
      paymentMethod: event.paymentMethod,
      responseUrl: Apiconfig?.ProjectLink + `/travel-payment-return-url-cyphyer/${finalCypher}=?Policy_Number=${CTPLPolicy?.oonaPolicyResponse?.policyNumber}`, //return url
      successLink: Apiconfig?.ProjectLink + `/travel-payment-return-url-cyphyer/${finalCypher}=?Policy_Number=${CTPLPolicy?.oonaPolicyResponse?.policyNumber}`, //return url
      currency: "PHP",
      policyNumber: CTPLPolicy?.oonaPolicyResponse?.policyNumber,
      itemName: CTPLPolicy?.oonaPolicyResponse?.policyNumber,
      description:"Kahoona - Travel",
    };

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: baseURL + 'cipherSecure/getPaymentRequest',
        headers: { 
          'ciphertext': finalCypher
        },
        data : formdata
      };

      axios.request(config)
      .then((response) => {
         console.log(response, "response==Payment");
        if(event.paymentText === 'CC' || event.paymentText === 'GC' || event.paymentText === "Card / E-wallet"){

          if (response?.data?.statusCode === -1) {
            setPopupOpen(false);
            console.log("response", response);
             
            message.success("Please Wait Redirecting to Payment Gateway.....");
            setloader(true);
            
            let URLdata = response?.data?.data?.data?.body?.redirectUrl;
            // let Valuedata = response?.data?.data?.data?.value;
            // return
            if (response?.status === 200) {
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
            if(response?.statusCode === -1){
              message.success(response?.data?.message);
            }else{
              setloader(false);
              console.log("Error");
            } 
          }else{
            if(response?.statusCode === -1){
            message.success(response?.data?.message);
            history.push({
              pathname: "/travel-payment-success-cypher",
              state: {
                data : []
              }
          })
        }
          }
          // console.log("Else Part",Paymentresponse)
          }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  const creditermPayment = (event)=>{
    console.log("Event====>>",event)
  }

  const handleclick = (event) => {
    console.log("datat check", event);
    if(event.paymentText === 'CREDIT/DEBIT CARD' ||event.paymentText === 'GCASH' ){
        Paymnetgatewayredirect(event)
    }else if(event.paymentText === 'Credit Terms' ){
        // creditermPayment(event)
        console.log("inside CT");
        let eventdata = {
          paymentText:event.paymentText,
          paymentMethod:'CT'
        }
        Paymnetgatewayredirect(eventdata)
    }else{
      console.log("inside PL");
      let eventdata = {
        paymentText:event.paymentText,
        paymentMethod:'PL'
      }
      Paymnetgatewayredirect(eventdata)
    }
    
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
          Payment Reference{" "}
          #{tripData?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber}
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
        show: false,
      },
    },
  };

  const history = useHistory();

  const [show, setShow] = useState(false);

  function convertToPolicy() {
    setShow((prev) => !prev);
  }

  return (
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
      <CypherPaymentCommon {...successPagePay} onClick={GetPaymentmethods} />
      
    </div>
  );
}
