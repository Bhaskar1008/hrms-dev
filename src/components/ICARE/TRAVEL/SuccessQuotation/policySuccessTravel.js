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
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import PaymentTypeSelectionPopup from "./Paymenttype";
import axiosRequest from "../../../../axios-request/request.methods";
import Apiconfig from "../../../../config/api.config";
import PolicyFooter from "../TravelFooter/PolicyFooter/PolicyFooter";
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

export default function SuccessQuotation() {
  let login_user_data = stoageGetter("user");
  let channelCodeForUser = login_user_data?.channelCode?.channelCode
  console.log("login_user_data?.agentCode", channelCodeForUser);

  const tripData = useSelector((state) => state?.trip);
  const [loader, setloader] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [patmentType, setPaymentTypye] = useState([]);

  const data = [];

  // const quotationDetails =
  //   tripData?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown;
  // console.log("quotationDetails", quotationDetails);

  // if (quotationDetails) {
  //   for (let key in quotationDetails) {
  //     data.push({ label: quotationLabel[key], value: quotationDetails[key] });
  //   }
  // }

  // const getTotalValue = () => {
  //   let label = "Converted"
  //   // if (tripData?.tripInfo?.travelPack === 'W' || tripData?.tripInfo?.travelPack === 'S') {
  //   //   label = "Gross Premium"
  //   // }
  //   const index = data.findIndex((e) => e.label === label);
  //   if (index !== -1) {
  //     return data[index].value;
  //   }
  //   return null;
  // };

  const quotationDetails =  tripData?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown;
  if (quotationDetails) {
    for (let key in quotationDetails) {
     const isTripDomestic = tripData?.tripInfo?.travelType === "D";
     console.log(isTripDomestic,"isTripDomestic=======>>>>>>>>>>>>>>>>>>>>>",key)
      if(key === 'converted' && isTripDomestic){
        continue;
      }
      data.push({ label: quotationLabel[key], value: quotationDetails[key] });
    }
  }

  const getTotalValue = () => {
    return tripData?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.converted;
  };

  const qoutationFormData = useSelector(
    (state) => state?.ctplqoutation?.formData
  );
  const ALLdetails = useSelector((state) => state);
  let CTPLPolicy = ALLdetails?.trip;

  var channelParam = ""
  if (channelCodeForUser === "CH2") {
    channelParam = "AGENT"
  }else{
    channelParam = "SALES"
  }
  
  const GetPaymentmethods = async () => {
    console.log("Paymnet methods");
    setloader(true);
    let Response = await axiosRequest.get(
      `user/payment/paymentMethods?product=TRAVEL&persona=${channelParam}`
    );
    console.log("Data=====>>>", Response);
    if (Response?.statusCode === -1) {
      if (Response?.data?.status === 200) {
        setPopupOpen(true);
        setloader(false);
        let paymnetmode = Response?.data?.data;
        setPaymentTypye(paymnetmode);
        // console.log("Data=====>>>",paymnetmode)
      } else {
        message.error(Response?.data?.data?.error);
        setloader(false);
      }
    } else {
      setloader(false);
    }
    // console.log("Get Pyment Methods",Response)
  };
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

  const Paymnetgatewayredirect = async (event) => {
    setloader(true);
    let API = "user/payment/getPaymentRequest";
    let formdata = {}
    if (CTPLPolicy?.travelUserDetailedInfo === null) {

      let TravelDatafromlisting = CTPLPolicy?.travelPolicyQuotationData?.travel_information?.policyHolder

       formdata = {
      //   requestId: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
      //   ipAddress: "192.168.1.1",
      //   cancelUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url",
      //   firstName: TravelDatafromlisting?.firstName,
      //   middleName: TravelDatafromlisting?.middleName,
      //   lastName: TravelDatafromlisting?.lastName,
      //   address1: TravelDatafromlisting?.address1,
      //   address2: TravelDatafromlisting?.address2,
      //   city: TravelDatafromlisting?.cityCode,
      //   state: TravelDatafromlisting?.provinceCode,
      //   zip: TravelDatafromlisting?.zipCode,
      //   email: TravelDatafromlisting?.emailAddress,
      //   phone: TravelDatafromlisting?.mobileNumber,
      //   mobile: "",
      //   amount: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.converted,
      //   paymentMethod: event.paymentMethod,
      //   paymentText:event.paymentText,
      //   paymentLink:Apiconfig?.ProjectLink +'/travel-cypher-payment/',
      //   responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url", //return url
      //   policyNo: CTPLPolicy?.travelPolicyQuotationData?._id, // policy _id

        // newpayload added from here

        requestReferenceNumber: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
        cancelLink: Apiconfig?.ProjectLink + "/travel-policy-sucess",
        failureLink: Apiconfig?.ProjectLink + `/travel-payment-return-url?Policy_Number=${CTPLPolicy?.travelPolicyQuotationData?.policyNumber}`,
        firstName: TravelDatafromlisting?.firstName,
        middleName: TravelDatafromlisting?.middleName,
        lastName: TravelDatafromlisting?.lastName,
        email: TravelDatafromlisting?.emailAddress,
        phone: TravelDatafromlisting?.mobileNumber,
        mobile: "",
        birthday:"",
        amount: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.converted,
        paymentMethod: event.paymentMethod ? event.paymentMethod : "",
        paymentText: event.paymentText,
        paymentLink: Apiconfig?.ProjectLink + '/travel-cypher-payment/',
        successLink: Apiconfig?.ProjectLink + `/travel-payment-return-url?Policy_Number=${CTPLPolicy?.travelPolicyQuotationData?.policyNumber}`,
        responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url", //return url
        currency: "PHP",
        policyNumber: CTPLPolicy?.travelPolicyQuotationData?.policyNumber, // policy _id
        itemName:CTPLPolicy?.travelPolicyQuotationData?.policyNumber,
        description:"Kahoona - Travel",
      };
    } else {
      formdata = {
        // requestId: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber, // policy refrence number
        // ipAddress: "192.168.1.1",
        // cancelUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url",
        // firstName: CTPLPolicy?.travelUserDetailedInfo?.firstName,
        // middleName: CTPLPolicy?.travelUserDetailedInfo?.middleName,
        // lastName: CTPLPolicy?.travelUserDetailedInfo?.lastName,
        // address1: CTPLPolicy?.travelUserDetailedInfo?.address1,
        // address2: CTPLPolicy?.travelUserDetailedInfo?.address2,
        // city: CTPLPolicy?.travelUserDetailedInfo?.city,
        // state: CTPLPolicy?.travelUserDetailedInfo?.province,
        // zip: CTPLPolicy?.travelUserDetailedInfo?.zipCode,
        // email: CTPLPolicy?.travelUserDetailedInfo?.emailAddress,
        // phone: CTPLPolicy?.travelUserDetailedInfo?.mobileNumber,
        // mobile: "",
        // amount: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.converted,
        // paymentMethod: event.paymentMethod,
        // paymentLink: Apiconfig?.ProjectLink + '/travel-cypher-payment/',
        // paymentText: event.paymentText,
        // responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url", //return url
        // policyNo: CTPLPolicy?.travelPolicyQuotationData?._id, // policy _id

        // this is for the new payload
        requestReferenceNumber: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.referenceNumber, // 
        cancelLink: Apiconfig?.ProjectLink + "/travel-policy-sucess",
        failureLink: Apiconfig?.ProjectLink + `/travel-payment-return-url?Policy_Number=${CTPLPolicy?.travelPolicyQuotationData?.policyNumber}`,
        firstName: CTPLPolicy?.travelUserDetailedInfo?.firstName,
        // middleName: CTPLPolicy?.travelUserDetailedInfo?.middleName,
        lastName: CTPLPolicy?.travelUserDetailedInfo?.lastName,
        email: CTPLPolicy?.travelUserDetailedInfo?.emailAddress,
        phone: CTPLPolicy?.travelUserDetailedInfo?.mobileNumber,
        amount: CTPLPolicy?.travelPolicyQuotationData?.oonaPolicyResponse?.paymentBreakdown?.converted,
        paymentMethod: event.paymentMethod ? event.paymentMethod : "",
        paymentLink: Apiconfig?.ProjectLink + '/travel-cypher-payment/',
       // https://kahoona-uat.salesdrive.app/travel-cypher-payment/
        successLink: Apiconfig?.ProjectLink + `/travel-payment-return-url?Policy_Number=${CTPLPolicy?.travelPolicyQuotationData?.policyNumber}`,
        paymentText: event.paymentText,
        responseUrl: Apiconfig?.ProjectLink + "/travel-payment-return-url", //return url
        currency: "PHP",
        policyNumber: CTPLPolicy?.travelPolicyQuotationData?.policyNumber,
        itemName: CTPLPolicy?.travelPolicyQuotationData?.policyNumber,
        description:"Kahoona - Travel",
      };
    }
    console.log(
      "formdata",
      formdata
    );

    
    let Paymentresponse = await axiosRequest.post(API, formdata);
    console.log("Paymnet API", Paymentresponse);

    
    if (event.paymentText === 'CC' || event.paymentText === 'GC' || event.paymentText === 'Card / E-wallet' ) {
      
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
          // // mapInput.setAttribute("value", value);
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
            pathname: "/travel-customer-payment-link",
            state: {
              data: []
            }
          })
        }
      } else {
        if (Paymentresponse?.statusCode === -1) {
          message.success(Paymentresponse?.data?.message);
          history.push({
            pathname: "/travel-policy-customer-pay",
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

  const creditermPayment = (event) => {
    console.log("Event====>>", event)
  }

  const handleclick = (event) => {
    if (event.paymentText === 'CREDIT/DEBIT CARD' || event.paymentText === 'GCASH') {
      Paymnetgatewayredirect(event)
    } else if (event.paymentText === 'Credit Terms') {
      // creditermPayment(event)
      let eventdata = {
        paymentText: event.paymentText,
        paymentMethod: ""
      }
      Paymnetgatewayredirect(eventdata)
    } else {
      console.log("inside PL");
      let eventdata = {
        paymentText: event.paymentText,
        paymentMethod: "",
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
        show: true,
      },
    },
  };

  const history = useHistory();

  const [show, setShow] = useState(false);

  function convertToPolicy() {
    setShow((prev) => !prev);
  }

  return (
    <div className="main-containerpage">
     {/* <form action="/pay-with-maya" method="POST">
   		<button type="submit">Pay with Maya</button>
  	</form> */}
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
      <div style={{ marginTop: "3rem" }}>
        <PolicyFooter />
      </div>
    </div>
  );
}
