import React, { useState } from "react";
import { Button, Image, message } from "antd";
import { useHistory } from "react-router-dom";
import "./SuccessQuotation.css";
// import successImg from "../../../../images/SuccessQuotation/successState.svg";
// import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
// import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import axiosRequest from "../../../../../../axios-request/request.methods";
import QuoteSuccessPage from "../commonComponent/quoteSuccessPage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import bankSvg from "../../../../../../images/Quotation/AiFillBank.svg";
import { stoageGetter } from "../../../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../store/actions/index";
import { result } from "lodash";
import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import TravelFooter from "../TravelFooter/TravelFooter";
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
  
  const [openloader, setopenloader] = useState(false)
  const dispatch = useDispatch();
  const tripData = useSelector((state) => state?.trip);

  // console.log("trip===>", quotaionNumber)
  console.log("tripDataQuotation===========>", tripData?.travelQuotationDetails?.quotationNumber);
  const data = [];

  const quotationDetails = tripData?.travelQuotationDetails?.paymentBreakdown;
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

  const successPage = {
    section1: {
      title: (
        <>
          Success! Here's your <br /> quotation.
        </>
      ),
      subTitle: `Quotation #${tripData?.travelQuotationDetails?.quotationNumber}`,
      img: "successImg",
      share: {
        show: true,
      },
    },
    section2: {
      title: ` `,
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

  function convertToPolicy() {
    history.push("/customer-info");
  }
  function edit() {
    history.push("/travel-info");
  }
  async function downloadQuotePdf() {
    setopenloader(true)
    const formData = {
      agentCode: login_user_data?.channelCode?.channelCode === 'CH1' ? tripData?.travelPolicyData?.agent : login_user_data?.agentCode,
      agentCopy: true,
      // endoresmentNumber: "0",
      isPayment: false,
      isDownloadable: true,
      quotationNumber: tripData?.travelQuotationDetails?.quotationNumber ? tripData?.travelQuotationDetails?.quotationNumber : "",

    };
    // dispatch(actions.fetchAllSaveQuotaionPDF(formData, result => {
      
    //   if (result?.statusCode === -1) {
    //     alert("jhgfghjkl")
    //     console.log("result?.fileUrl", result);
    //     setopenloader(false)
    //     var a = document.createElement('a');
    //     a.href = result?.fileUrl;
    //     document?.body.appendChild(a);
    //     a.click();
    //     document?.body?.removeChild(a);
    //     message.success(result?.message)
        
    //   } else {
    //     setopenloader(false)
    //   }
    // }))
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
              }else{
                setopenloader(false)
              }
  
              } catch (error) {
                setopenloader(false)
                console.error('Error posting data:', error);
              }
  
  }

  return (
    <div className="main-containerpage">
      <FullPageLoader fromapploader={openloader} />
      <QuoteSuccessPage
        {...successPage}
        onClick={convertToPolicy}
        onclickedit={edit}
        downloadQuotePdf={downloadQuotePdf}
      />
        <div style={{ marginTop: "2rem" }}>
        <TravelFooter />
      </div>
    </div>
  );
}
