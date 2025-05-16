import React, { useState } from "react";
import { Button, Image , message, Drawer} from "antd";
import "./quoteSuccessPage.css";
import successImg from "../../../../images/SuccessQuotation/successState.svg";
import quotationFail from "../../../../images/Quotation/quotationFail.svg";
import paymentFail from "../../../../images/Quotation/paymentFail.png";
import arrow from "../../../../images/SuccessQuotation/wrapper.svg";
import shareIcon from "../../../../images/SuccessQuotation/Heroicons.svg";
import { useHistory } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons"
import MessageEmail from "../../SharableLink/components/messageEmail";
import { DrawerFunction } from "../../MotorComprehensive/MotorPolicyPage/MotorPolicyPage";
import mails from "../../../../images/sharableLinkd_img/mail.png";
import messageImg from "../../../../images/sharableLinkd_img/message.png";
import whatsApp from "../../../../images/sharableLinkd_img/Whatups .png";
import copy from "../../../../images/sharableLinkd_img/content_copy.png";
import { stoageGetter } from "../../../../helpers";
import * as actions from "../../../../store/actions";
import apiConfig from "../../../../config/api.config";
import noPyamentBreakdoen from '../../../../images/Failed/payment_breakdown.png'
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
  let userData = stoageGetter("user");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [linkUrl, setlinkUrl] = useState("")
    console.log('he==>', linkUrl, section2)

  const showDrawer = () => {
    setOpen(true);
  };

  const apiDataConfig = apiConfig?.baseURL
  console.log("apiDataConfig---", apiDataConfig);
  
  let MobileNumberOfUser = userData?.mobileNo
  let agentcode = userData?.agentCode;

  const userId = useSelector((state) => state?.login?.user?.id)
  const tripInfo = useSelector((state) => state?.trip?.travelPolicyData);
  let commericalValue = tripInfo?.commercial
  let commericalName = tripInfo?.commercialName
  console.log("tripInfo----", tripInfo, commericalValue, commericalName);
  const [showmodel, setShowModel] = useState(false)

  const stateDatat = useSelector((state) => state);
  console.log("state----", stateDatat);

  const TravelFlow = stateDatat?.trip?.travelQuotationDetails?.LOB

  const CTPLFlowListing = stateDatat?.ctplqoutation?.formData?.data?.LOB
  console.log("TravelFlowListing----", CTPLFlowListing);
  // const SelectedCommercial = useSelector((state) => state?.ctplqoutation?.formData?.quotation_group_info);
  // const commericalName = SelectedCommercial.commercial_structure_name
  // const commericalValue = SelectedCommercial.commercial_structure

  // console.log("SelectedCommercial---", SelectedCommercial);

  const SelectedCommercialFromListing = useSelector((state) => state?.ctplqoutation?.formData?.data?.quotation_group_info);
  console.log("SelectedCommercialFromListing", SelectedCommercialFromListing);
  
  const SelectedCommercialFromListingTravel = useSelector((state) => state?.trip?.travelPolicyData?.commercial);
  console.log("SelectedCommercialFromListingTravel---", SelectedCommercialFromListingTravel);

  const SelectedCommercialFromListingTravelSales = useSelector((state) => state);
  console.log("SelectedCommercialFromListingTravelSales---", SelectedCommercialFromListingTravelSales);

  const tripData = useSelector((state) => state?.trip);
  const slectAgentCodeData = useSelector((state) => state?.ctplqoutation?.formData?.data?.agentCode);
  // console.log("slectAgentCodeData",slectAgentCodeData);
  // ctpl, travel ---
  let commericalNameListing = ""
  let commericalValueListing = ""
  let AgentCodeOnly = "" 
  
  if(CTPLFlowListing === "CTPL"){
    commericalNameListing = SelectedCommercialFromListing?.commercial_structure_name
    commericalValueListing = SelectedCommercialFromListing?.commercial_structure
    AgentCodeOnly = slectAgentCodeData
  }else{
    commericalNameListing = SelectedCommercialFromListingTravel?.label ? SelectedCommercialFromListingTravel?.label : commericalName 
    commericalValueListing = SelectedCommercialFromListingTravel?.value ? SelectedCommercialFromListingTravel?.value : commericalValue
    AgentCodeOnly = tripData?.travelPolicyData?.agent
  }

  console.log("commericalValueListing---", commericalNameListing, commericalValueListing);
  // const Link = useSelector(
  //   (state) => state?.saveQuotationPdf?.SaveQuotaionPDF?.formData?.fileUrl
  // );
  

  const history = useHistory();
  const backToDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const goBackForEdit = () => {
    history.goBack();
  };

  const modalShowFunction = () =>{
    setShowModel(true)
    console.log("hhhj");
    // console.log("SelectedCommercial---", SelectedCommercial);
  }

  const onClose = () => {
    setOpen(false);
  };

  async function callApiWithJwt() {
    const formData = {
        mobileNumber: MobileNumberOfUser,
            agentCode: userData?.channelCode?.channelCode === 'CH1' ? AgentCodeOnly.toString() : userData?.agentCode.toString(),
            commercialStructure: commericalValueListing.toString(),
            userId: userId,
            baseUrl: apiConfig?.ProjectLink + "/customer-login/",
    };

    dispatch(
        actions.fetchSaveCipherText(formData, (result) => {
            console.log("result------", result.statusCode);
            if (result?.statusCode === -1) {
              setlinkUrl(result?.data)
              setOpen(true);
            }
            
        })
    );
}

// hooks end here
const handleWhatsAppButtonClick = () => {

    var countryCode = "+91";
    var phoneNumber = MobileNumberOfUser;
    var customText = encodeURIComponent(`Check out the link ${linkUrl}`);
    var whatsappLink =
        "https://wa.me/" + countryCode + phoneNumber + "?text=" + customText;
    window.open(whatsappLink);
};;
const handleMessageButtonClick = () => {
    // const linkToCopy = apiConfig?.ProjectLink + "/customer-login";
    var url =
        "sms:&body=" +
        encodeURIComponent(`Hello! Check out this link: ${linkUrl}`);

    window.open(url);
};

const handleEmailButtonClick = () => {

    const subject = "Customer link"; // Replace with the desired email subject
    // const link = apiConfig?.ProjectLink + "/customer-login"; // Replace with your actual link
    const bodyText = `Hello,\n\nCheck out this link: ${linkUrl}`;

    const mailtoURL = `mailto:?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(bodyText)}`;

    window.open(mailtoURL);
};

const handleCopyLink = () => {
    // callApiWithJwt()
    if (linkUrl !== '' ) {
      navigator.clipboard
        .writeText(linkUrl)
        .then(() => {
            console.log("Link copied successfully!");
            message.success("Link copied successfully!");
            // setVisible(false);
        })
        .catch((error) => {
            console.error("Error copying link:", error);
            message.error("Error copying link. Please try again");
            // setVisible(false);
        });
    }
    
};



  return (
    <>
    
    <Drawer title="Send this link to the customer" placement="right" onClose={onClose} open={open}>
    <div className="msd-sharable-drawer-container" >
                <div />
                <div className="msd-sharable-drawer-content">
                    <div className="msd-sharable-drawer-title">Share link via</div>
                    <div className="msd-sharable-drawer-option-container">

                        <div className="msd-sharable-drawer-option">
                            <img
                                alt="Mail"
                                src={mails}
                                onClick={handleEmailButtonClick}
                            />
                            <div className="msd-sharable-drawer-option-label">Email</div>
                        </div>
                        <div className="msd-sharable-drawer-option">
                            <img
                                alt="Message"
                                src={messageImg}
                                onClick={handleMessageButtonClick}
                            />
                            <div className="msd-sharable-drawer-option-label">
                                Message
                            </div>
                        </div>
                        <div className="msd-sharable-drawer-option">
                            <img
                                alt="WhatsApp"
                                src={whatsApp}
                                onClick={handleWhatsAppButtonClick}
                            />
                            <div className="msd-sharable-drawer-option-label">
                                Whatsapp
                            </div>
                        </div>
                        <div className="msd-sharable-drawer-option">
                            <img
                                alt="Copy Link"
                                src={copy}
                                onClick={handleCopyLink}
                            />
                            <div className="msd-sharable-drawer-option-label">
                                Copy Link
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </Drawer>
    
    {/* <DrawerFunction onClose={onClose} showDrawer={showmodel}/> */}

      <div className="successQuotationContainer">
        <div className="section1">
          <div>
            <h2 className="successHeaderPC">{section1.title}</h2>
            {section1.subTitle ? <p>{section1.subTitle}</p> : ""}

            <Image preview={false} alt="login-logo" src={img[section1.img]} />
            {section1.share.show ? (
              <div className="shareContainer share1">
                <p>Send this link if your client wants to fill out the form</p>
                <div className="shareDiv" onClick={() => callApiWithJwt()}>
                  <p>{apiDataConfig}</p>
                  <Image preview={false} alt="login-logo" src={shareIcon} />
                </div>
              </div>
            ) : (
              ""
            )}
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
                {section2?.data && section2?.data?.length === 0 ? <>
                <div className="noPaymentBreakdownFound">
                  <img src={noPyamentBreakdoen} />
                  <p>No Premium Breakdown Found.</p>
                </div>
                </> : <>
                {section2.data.map((e, i) => {
                  return (
                    <div className="priceDiv">
                      <p className="priceLabel">{e.label}</p>
                      <p className="priceValue">{e.value}</p>
                    </div>
                  );
                })}
                </>}
               
                <div className="totalAmount">
                  <p>Total Amount</p>
                  <p>
                  ₱
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
               
                <Button className="quoteWhiteBtn" 
                 onClick={() => onClick && onclickedit()}
              
              >
                  Edit
                </Button>
              </div>
            ) : (
              ""
            )}
            {section2.backBtn.show ? (
              <Button className="quoteBtnLight" onClick={backToDashboard}>
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
