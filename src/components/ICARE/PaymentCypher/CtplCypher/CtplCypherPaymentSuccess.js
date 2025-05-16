import React, { useState, useEffect } from "react";
import { Button, Image, message } from "antd";
import { useHistory, useParams } from "react-router-dom";
// import "./SuccessQuotation.css";
import successImg from "../../../../images/SuccessQuotation/successState.svg";
import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import CypherPaymentCommon from "../PaymentCypherCommon/CypherPaymentCommon";
import bankSvg from "../../../../images/Quotation/AiFillBank.svg";
import { useSelector } from "react-redux";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import PaymentTypeSelectionPopup from "../../TRAVEL/SuccessQuotation/Paymenttype";
import axiosRequest from "../../../../axios-request/request.methods";
import Apiconfig from "../../../../config/api.config";
import axios from "axios";

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

export default function MotorCypherPayment() {

  const {id} = useParams()
  console.log("parmId----------->",id);
  const queryString = window.location.href;

   var params = queryString.split("ctpl-cypher-payment/");
   
    var finalCypher = params[1]
  console.log("queryString", finalCypher);

  const tripData = useSelector((state) => state?.trip);
  const [loader, setloader] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [patmentType, setPaymentTypye] = useState([]);
  const data = [];
  const [getPolicyData, setGetPolicyData] = useState([])
  console.log("getPolicyData===>", getPolicyData);

  const {baseURL} = Apiconfig
  console.log("NODE_ENV===>", baseURL);

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
  console.log("quotationDetails", quotationDetails);

  if (quotationDetails) {
    for (let key in quotationDetails) {
      data.push({ label: quotationLabel[key], value: quotationDetails[key] });
    }
  }

  const getTotalValue = () => {
    let label = "Gross Premium"
    const index = data.findIndex((e) => e.label === label);
    if (index !== -1) {
      return data[index].value;
    }
    return null;
  };


  const ALLdetails = useSelector((state) => state);
  
  console.log("ALL Store=======>>>", ALLdetails);
  let CTPLPolicyGetDataCypher = getPolicyData;

  console.log("CTPLPolicyGetDataCypher", CTPLPolicyGetDataCypher);
  const GetPaymentmethods = async () => {
    console.log("Paymnet methods");
    setloader(true);
    // let data ={paymentMethod:'cc'}
    // handleclick(data)
    // return
    // setPopupOpen(true);
    // let Response = await axios.get(
    //   `&cipherText`
    // );
    // console.log("Data=====>>>", Response);

    const axios = require('axios');
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + 'cipherSecure/getPaymentMethod?product=CTPL&persona=CLIENT',
        headers: { 
          'ciphertext': finalCypher
        }
      };

      axios.request(config)
      .then((response) => {
        console.log("response?.statusCode", response);
        if (response?.data?.statusCode === -1) {
          if (response?.status === 200) {
            if (response?.data?.data?.data?.length === 1) {
              console.log("sindledata");
              let eventdata = {
                paymentText:response?.data?.data?.data[0]?.paymentText,
                paymentMethod:'Card / E-wallet'
              }
              Paymnetgatewayredirect(eventdata)
            }else{
              setPopupOpen(true);
            }
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
    //let API = "https://oonanode-dev.salesdrive.app/sdx-api/cipherSecure/getPaymentRequest";

    // let formdata = {
    //   requestId: CTPLPolicyGetDataCypher?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
    //   ipAddress: "192.168.1.1",
    //   cancelUrl: Apiconfig?.ProjectLink + "/Fail",
    //   firstName: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.firstName,
    //   middleName: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.middleName,
    //   lastName: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.lastName,
    //   address1: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.address1,
    //   address2: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.address2,
    //   city: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.city,
    //   state: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.province,
    //   zip: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.zipCode,
    //   email: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.emailAddress,
    //   phone: CTPLPolicyGetDataCypher?.travel_information?.policyHolder?.mobileNumber,
    //   mobile: "",
    //   amount: CTPLPolicyGetDataCypher?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
    //   paymentText:event.paymentText,
    //   paymentLink:'http://localhost:8080/travel-policy-sucess/',
    //   paymentMethod: event.paymentMethod,
    //   responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url", //return url
    //   policyNo: CTPLPolicyGetDataCypher?.travelPolicyQuotationData?._id, // policy _id
    // };
  //   if(CTPLPolicyGetDataCypher?.travelUserDetailedInfo === null){

  //     let TravelDatafromlisting = CTPLPolicyGetDataCypher?.travelPolicyQuotationData?.travel_information?.policyHolder
  //   formdata = {
  //     requestId: CTPLPolicyGetDataCypher?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
  //     ipAddress: "192.168.1.1",
  //     cancelUrl: Apiconfig?.ProjectLink + "/Fail",
  //     firstName: TravelDatafromlisting?.firstName,
  //     middleName: TravelDatafromlisting?.middleName,
  //     lastName: TravelDatafromlisting?.lastName,
  //     address1: TravelDatafromlisting?.address1,
  //     address2: TravelDatafromlisting?.address2,
  //     city: TravelDatafromlisting?.cityCode,
  //     state: TravelDatafromlisting?.provinceCode,
  //     zip: TravelDatafromlisting?.zipCode,
  //     email: TravelDatafromlisting?.emailAddress,
  //     phone: TravelDatafromlisting?.mobileNumber,
  //     mobile: "",
  //     amount: CTPLPolicyGetDataCypher?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
  //     paymentText:event.paymentText,
  //     paymentMethod: event.paymentMethod,
  //     paymentLink:'http://localhost:8080/travel-policy-sucess/',
  //     responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url", //return url
  //     policyNo: CTPLPolicyGetDataCypher?.travelPolicyQuotationData?._id, // policy _id
  //   };
  // }else{
    
  // }
    // console.log(
    //   "CTPLPolicyGetDataCypher?.travelPolicyQuotationData?._id",
    //   CTPLPolicyGetDataCypher?.travelPolicyQuotationData?._id
    // );
    // return

    // let Paymentresponse = await axios.post(API, formdata);
    // console.log("Paymentresponse==>", Paymentresponse);

    const axios = require('axios');
    let formdata = {
      // requestId: CTPLPolicyGetDataCypher?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      // ipAddress: "192.168.1.1",
      // cancelUrl: Apiconfig?.ProjectLink + "/ctpl-payment-return-url-cyphyer/" + finalCypher,
      // firstName: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.firstName,
      // middleName: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.middleName,
      // lastName: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.lastName,
      // address1: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.addressLine1,
      // address2: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.addressLine2,
      // city: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.city,
      // state: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.province,
      // zip: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.zipCode,
      // email: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.email,
      // phone: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.mobileNumber,
      // mobile: "",
      // amount: CTPLPolicyGetDataCypher?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      // paymentText:event.paymentText,
      // paymentLink: Apiconfig?.ProjectLink + '/motor-policy-sucess/',
      // paymentMethod: event.paymentMethod,
      // responseUrl: Apiconfig?.ProjectLink + "/ctpl-payment-return-url-cyphyer/" + finalCypher , //return url
      // policyNo: CTPLPolicyGetDataCypher?._id, // policy _id




      // new payment ---- 

      requestReferenceNumber: CTPLPolicyGetDataCypher?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      cancelLink: Apiconfig?.ProjectLink + `/ctpl-cypher-payment/${finalCypher}`,
      failureLink: Apiconfig?.ProjectLink + `/ctpl-payment-return-url-cyphyer/${finalCypher}=?Policy_Number=${CTPLPolicyGetDataCypher?.oonaPolicyResponse?.policyNumber}`,
      firstName: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.firstName,
      lastName: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.lastName,
      email: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.email,
      phone: CTPLPolicyGetDataCypher?.CTPL_CustomerInfo_for_Policy?.mobileNumber,
      mobile: "",
      amount: CTPLPolicyGetDataCypher?.oonaPolicyResponse?.paymentBreakdown?.grossPrem,
      paymentText:event.paymentText,
      paymentLink: Apiconfig?.ProjectLink + '/motor-policy-sucess/',
      paymentMethod: event.paymentMethod,
      responseUrl: Apiconfig?.ProjectLink + `/ctpl-payment-return-url-cyphyer/${finalCypher}=?Policy_Number=${CTPLPolicyGetDataCypher?.oonaPolicyResponse?.policyNumber}`, //return url
      successLink: Apiconfig?.ProjectLink + `/ctpl-payment-return-url-cyphyer/${finalCypher}=?Policy_Number=${CTPLPolicyGetDataCypher?.oonaPolicyResponse?.policyNumber}`, //return url
      currency: "PHP",
      policyNumber: CTPLPolicyGetDataCypher?.oonaPolicyResponse?.policyNumber,
      itemName: CTPLPolicyGetDataCypher?.oonaPolicyResponse?.policyNumber,
      description:"Kahoona - CTPL",
   
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
        if(event.paymentText === 'CC' || event.paymentText === 'GC' || event.paymentText === 'Card / E-wallet'){

          if (response?.data?.statusCode === -1) {
            setPopupOpen(false);
            console.log("response", response);
             
            message.success("Please Wait Redirecting to Payment Gateway.....");
            setloader(true);
            
            let URLdata = response?.data?.data?.data?.body?.redirectUrl;
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
              pathname: "/ctpl-payment-success-cypher",
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
          #{CTPLPolicyGetDataCypher?.oonaPolicyResponse?.referenceNumber}
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
