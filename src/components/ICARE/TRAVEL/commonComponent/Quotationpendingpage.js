import React, { useState } from "react";
import { Button, Image } from "antd";
import "./Quotationpendingpage.css";
import successImg from "../../../../images/SuccessQuotation/successState.svg";
import quotationFail from "../../../../images/Quotation/quotationFail.svg";
import paymentFail from "../../../../images/Quotation/paymentFail.png";
import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
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

export default function QuoteSuccessPage({
  section1,
  section2,
  onClick,
  downloadQuotePdf,
}) {
  const tripInfo = useSelector((state) => state?.trip?.tripInfo);
  // console.log("new==>", tripInfo);

  const history = useHistory();
  const backToDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  return (
    <>
      <div className="successQuotationContainer">
        <div className="section1">
          <div>
            <h2 className="successHeaderPC">{section1.title}</h2>
            {section1.subTitle ? <p>{section1.subTitle}</p> : ""}

            <Image preview={false} alt="login-logo" src={img[section1.img]} />
            {section1.share.show ? (
              <div className="shareContainer share1">
                <p>Send this link to the customer</p>
                <div className="shareDiv">
                  <p>https://oo.na/agent/83dcg</p>
                  <Image preview={false} alt="login-logo" src={shareIcon} />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="section2">
          <div style={{ height: "400px", padding: "25px" }}>
            {section2.blur ? (
              <div className={"quotationpolicySection"}>
                <p>
                  Quotation has been created but requires <br /> approval.
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
              <div style={{ marginBottom: "10px" }}>{section2.subTitle}</div>
            ) : (
              ""
            )}
            <div
              className={`section2-details ${section2.blur ? "blurMobileView" : ""
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
                    {currencySign[tripInfo?.currency]}
                    {section2?.totalAmount ?? "-"}
                  </p>
                </div>
                {section1.share.show ? (
                  <div className="shareContainer share2">
                    <p>Send this link to the customer</p>
                    <div className="shareDiv">
                      <p>https://oo.na/agent/83dcg</p>
                      <Image preview={false} alt="login-logo" src={shareIcon} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div
                className="failDiv"
                style={{ display: section2.blur ? "block" : "none" }}
              >
                <p>
                  Quotation has been created but requires <br /> approval.{" "}
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
                <Button className="quoteWhiteBtn">Edit</Button>
              </div>
            ) : (
              ""
            )}
            {section2.backBtn.show ? (
              <Button className="quotationBtnLight" onClick={backToDashboard}>
                {" "}

                <ArrowLeftOutlined />
                <span>Back To Dashboard</span>
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
