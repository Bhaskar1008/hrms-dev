import React, { useState } from "react";
import { Button, Image } from "antd";
import "./quoteSuccessPage.css";
import successImg from "../../../../../../images/SuccessQuotation/successState.svg";
import quotationFail from "../../../../../../images/Quotation/quotationFail.svg";
import paymentFail from "../../../../../../images/Quotation/paymentFail.png";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
const img = {
  successImg,
  quotationFail,
  paymentFail,
};

const currencySign = {
  1: "₱",
  2: "$",
  3: "€",
};

const currencyType = (currency) =>{
  console.log("currency===>", currency);
  if (currency == "1") {
    return "₱"
  } else if (currency == "2") {
    return "$"
  }else if(currency === "3"){
    return "€"
  }else{
    return "₱"
  }
}


export default function QuoteSuccessPage({
  section1,
  section2,
  onClick,
  onclickedit,
  downloadQuotePdf,
}) {
  const tripInfo = useSelector((state) => state?.trip?.tripInfo);

  // const Link = useSelector(
  //   (state) => state?.saveQuotationPdf?.SaveQuotaionPDF?.formData?.fileUrl
  // );
  // console.log("link==>", Link);

  const history = useHistory();
  const backToDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  const goBackForEdit = () => {
    history.goBack();
  };

  return (
    <>
      <div className="successQuotationContainer">
        <div className="section1">
          <div>
            <h2 className="successHeaderPC">{section1.title}</h2>
            {section1.subTitle ? <p>{section1.subTitle}</p> : ""}

            <Image preview={false} alt="login-logo" src={img[section1.img]} />
            
            <p style={{color: '#000', fontSize: "20px", padding: "10px 120px",
            fontWeight: 600}}>{section1.subTitleForDown ? section1.subTitleForDown : ""}</p>
          </div>
        </div>
        <div className="section2">
          <div style={{ height: "fit-content", padding: "25px" }}>
            {section2.blur ? (
              <div className={"policySection"}>
                <p>
                  Policy has been created but requires <br /> approval.
                </p>
                <p>
                  Please contact your designated Sales
                  <br /> representative for assistance.
                </p>
              </div>
            ) : (
              ""
            )}
            {section2.title ? (
              <p style={{ marginBottom: section2.subTitle ? "10px" : "" }}>
                {section2.title}{" "}
                {section2?.tag?.name ? (
                  <span style={{ backgroundColor: section2?.tag?.color }}>
                    {section2?.tag?.name}
                  </span>
                ) : (
                  ""
                )}
              </p>
            ) : (
              ""
            )}
            {section2.subTitle ? (
              <div style={{ marginBottom: "10px", color: '#000' }}>{section2.subTitle}</div>
            ) : (
              ""
            )}
            <div
              className={`section2-details ${
                section2.blur ? "blurMobileView" : ""
              }`}
              style={{ display: section2.displayDetails ? "block" : "none" }}
            >
              <div className={section2.blur ? "blur" : ""}>
                <p>Premium Breakdown</p>
                {section2.data.map((e, i) => {
                  return (
                    <div className="priceDiv">
                      <p className="priceLabel">{e.label}</p>
                      <p className="priceValue">{e.value}</p>
                    </div>
                  );
                })}
                <div className="totalAmount">
                  <p>Total Amount</p>
                  <p>
                  ₱
                    {section2?.totalAmount ?? "-"}
                  </p>
                </div>
                {/* {section1.share.show ? (
                  <div className="shareContainer share2">
                    <p>Send this link to the customer</p>
                    <div className="shareDiv">
                      <p>https://oo.na/agent/83dcg</p>
                      <Image preview={false} alt="login-logo" src={shareIcon} />
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
              <div
                className="failDiv"
                style={{ display: section2.blur ? "block" : "none" }}
              >
                <p>
                  Policy has been created but requires <br /> approval.{" "}
                </p>
                <p>
                  Please contact your designated Sales <br /> Office for
                  assistance.
                </p>
              </div>
            </div>
            {section2.successBtn.show ? (
              <Button
                className="successBtn"
                onClick={() => onClick && onClick()}
              >
                {section2.successBtn.text}
              </Button>
            ) : (
              ""
            )}
            {section2.downloadEditBtn.show ? (
              <div className="setOfbtn">
               
                <Button
                  className="quoteWhiteBtn"
                  onClick={() => downloadQuotePdf && downloadQuotePdf()}
                >
                  Download Quote (PDF)
                </Button>
               
                {/* <Button className="quoteWhiteBtn" 
                 onClick={() => onClick && onclickedit()}
              
              >
                  Edit
                </Button> */}
              </div>
            ) : (
              ""
            )}
            {section2.backBtn.show ? (
              <Button className="quoteBtnLight" onClick={backToDashboard}>
                {" "}
          
                <ArrowLeftOutlined />
                <span>Go To Home</span>
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
