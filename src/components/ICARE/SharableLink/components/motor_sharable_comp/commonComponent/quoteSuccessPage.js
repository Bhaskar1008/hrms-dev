import React, { useState, useEffect } from "react";
import { Button, Image, message } from "antd";
import "./quoteSuccessPage.css";
import Header from "../../../LoginHeader/LoginHeader"
import successImg from "../../../../../../images/SuccessQuotation/successState.svg";
import quotationFail from "../../../../../../images/Quotation/quotationFail.svg";
import paymentFail from "../../../../../../images/Quotation/paymentFail.png";
// import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
import shareIcon from "../../../../../../images/SuccessQuotation/Heroicons.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { stoageGetter } from "../../../../../../helpers";
import { MobileDrawer } from "../../../../SharableLink/components/Links"

const img = {
  successImg,
  quotationFail,
  paymentFail,
};

// const currencySign = {
//   '1': '₱',
//   '2': '$',
//   '3': '€'
// }
const oldStyles = {
  color: '#18191B',
  fontSize: '20px',
  padding: '10px 142px',
  fontWeight: 500,
};
const messageStyle
  = {
  color: '#18191B',
  fontSize: '20px',
  // padding: '10px 120px',
  fontWeight: 500,
  position: 'relative',
  top: '87px'
};
let width = window.innerWidth

export default function QuoteSuccessPage({
  section1,
  section2,
  onClick,
  downloadQuotePdf,
  onclickedit,
}) {
  const tripInfo = useSelector((state) => state?.trip?.tripInfo);
  console.log("new==>", tripInfo);

  const history = useHistory();
  const backToDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  let location = useLocation();
  // THIS IS SAME
  const breakpoint = 620;

  let userData = stoageGetter("user");

  let phoneNumberOfUser = userData?.mobileNo

  // hooks start from the here

  const [width, setWidth] = useState(window.innerWidth);
  const [visible, setVisible] = useState(false);
  const [isShareLinkOpen, setShareLinkOpen] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState(""); // Default recipient email
  const [subject, setSubject] = useState("here subject");
  const [body, setBody] = useState("this is the body of the mail");


  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);






  return (
    <>
      <Header />
      <div className="successQuotationContainer">

        <div className="section1">
          <div>
            <h2 className="successHeaderPC">{section1.title}</h2>
            {section1.subTitle ? <p>{section1.subTitle}</p> : ""}

            <Image preview={false} alt="login-logo" src={img[section1.img]} />
            {/* {section1.share.show ? (
              <div className="shareContainer share1">
                <p>Send this link to the customer</p>
                <div className="shareDiv" onClick={() => setVisible(true)}>
                  <p>https://oo.na/agent/83dcg</p>
                  <Image preview={false} alt="login-logo" src={shareIcon} />
                </div>
              </div>
            ) : (
              ""
            )} */}

            <p style={width < 420 && location?.pathname === "/motor-payment-failed" ? messageStyle : oldStyles}>{section1.subTitleForDown ? section1.subTitleForDown : ""}</p>
          </div>
        </div>
        <div className="section2">
          <div style={{ height: "fit-content", padding: "25px" }}>
            {/* {section2.blur ? (
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
            )} */}
            {section2.title ? (
              <p style={{ marginBottom: "10px", color: '#1D428A' }}>
                {section2.title}{" "}
                {section2?.tag?.name ? (
                  <span style={{ backgroundColor: section2?.tag?.color, marginTop: '3px' }}>
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
                  <p>₱ {section2?.totalAmount ?? "-"}</p>
                </div>

                {/* {section1.share.show ? (
                  <div className="shareContainer share2">
                    <p>Send this link to the customer</p>
                    <div className="shareDiv" onClick={() => setVisible(true)}>
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
                {/* <Button
                  className="quoteWhiteBtn"
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
                <span>Back To Home</span>
              </Button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div >
      {/* <MobileDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        handleWhatsAppButtonClick={handleWhatsAppButtonClick}
        handleMessageButtonClick={handleMessageButtonClick}
        handleEmailButtonClick={handleEmailButtonClick}
        handleCopyLink={handleCopyLink}

      /> */}
    </>
  );
}
