import React, { useState } from "react";
import { Button, Image } from "antd";
import { useHistory } from "react-router-dom";
import "./QuotationSuccessPage.css";
import successImg from "../../../../images/SuccessQuotation/successState.svg";
import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import SuccessQuotePage from "../SuccessQuotePage/SuccessQuotePage";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import bankSvg from "../../../../images/Quotation/AiFillBank.svg";
import { useSelector } from "react-redux";

export default function QuotationSuccessPage() {
  //   const tripData = useSelector((state) => state?.trip);
  //   const data = [];
  //   const quotationDetails = tripData?.travelQuotationDetails?.paymentBreakdown;
  //   if (quotationDetails) {
  //     for (let key in quotationDetails) {
  //       data.push({ label: quotationLabel[key], value: quotationDetails[key] });
  //     }
  //   }

  //   console.log(data, "-----------here");

  const successPage = {
    section1: {
      title: (
        <>
          Success! Here's is your <br /> quotation.
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
      data: [],
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

  const [show, setShow] = useState(false);

  function convertToPolicy() {
    history.push("/policyholder");
  }
  function edit() {
    history.push("/quote-info");
  }


  return (
    <div className="main-container">
      <SuccessQuotePage {...successPage} onClick={convertToPolicy} 
      onClickedit={edit}
      />
    </div>
  );
}
