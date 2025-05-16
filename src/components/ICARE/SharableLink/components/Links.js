import React, { useState, useEffect } from "react";
import { useCallback } from "react";
import "./Links.css";
import whatsApp from "../../../../images/sharableLinkd_img/Whatups .png";
import * as actions from "../../../../store/actions/index";
import axios from "axios";
import mails from "../../../../images/sharableLinkd_img/mail.png";
import messageImg from "../../../../images/sharableLinkd_img/message.png";
import copy from "../../../../images/sharableLinkd_img/content_copy.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Drawer, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import SimpleHeader from "../../../ICARE/SharableLink/components/SharableSampleHear";
import { useDispatch, useSelector } from "react-redux";
import AllFormFooter from "../../AllFormFooter/AllFormFooter";
import img3 from "../../../../images/policyGroup/copy.png";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import { CloseOutlined } from '@ant-design/icons';
import { stoageGetter } from "../../../../helpers";
import apiConfig from "../../../../config/api.config";
import rootIndex from "../../../../store/root_index";

import axiosRequest from "../../../../axios-request/request.methods";

export const MobileDrawer = ({
    visible,
    onClose,
    handleWhatsAppButtonClick,
    handleMessageButtonClick,
    handleEmailButtonClick,
    handleCopyLink,
}) => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  // Set the placement based on the viewport width
  const placement = viewportWidth > 424 ? 'right' : 'bottom';

    return (
        <div>
            <Drawer
                 placement={placement}
                closable={false}
                onClose={onClose}
                visible={visible}
                // title={commercialStructure?.length === 1 ? 'Share':"Commercial Structure"}
                closeIcon={<CloseOutlined style={{ position: 'absolute', right: '16px', marginTop: "-6px"}} />}
                style={{ overflow: 'auto' }}
            >
                <div className="sharable-drawer-container">
                    <div className="sharable-drawer-divider" />
                    <div className="sharable-drawer-content">
                        <div className="sharable-drawer-title">Share link via</div>
                        <div className="sharable-drawer-option-container">
                            <div className="sharable-drawer-option">
                                <img alt="Mail" src={mails} onClick={handleEmailButtonClick} />
                                <div className="sharable-drawer-option-label">Email</div>
                            </div>
                            <div className="sharable-drawer-option">
                                <img
                                    alt="Message"
                                    src={messageImg}
                                    onClick={handleMessageButtonClick}
                                />
                                <div className="sharable-drawer-option-label">Message</div>
                            </div>
                            <div className="sharable-drawer-option">
                                <img
                                    alt="WhatsApp"
                                    src={whatsApp}
                                    onClick={handleWhatsAppButtonClick}
                                />
                                <div className="sharable-drawer-option-label">Whatsapp</div>
                            </div>
                            <div className="sharable-drawer-option">
                                <img alt="Copy Link" src={copy} onClick={handleCopyLink} />
                                <div className="sharable-drawer-option-label">Copy Link</div>
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default function Links(getData) {
    console.log("Process Data======>>>>", getData)
    const jwtTokenState = useSelector((state) => state?.login?.token);
    const userId = useSelector((state) => state.login.user.id);
    console.log("check", jwtTokenState?.length);
    const breakpoint = 620;
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        if (jwtTokenState !== undefined) {
            saveCipherText();
        }
    }, [jwtTokenState !== undefined ? jwtTokenState : null]);

    let userData = stoageGetter("user");

    const { baseURL } = apiConfig;

    let MobileNumberOfUser = userData?.mobileNo;
    let agentcode = userData?.agentCode;
    const getCommericalValue = useSelector((state) => state?.GetCommercialValue?.commercial_Value);
    const [linkUrl, setlinkUrl] = useState("");
    console.log("he==>", linkUrl);
    const [openloader, setopenloader] = useState(false);
    const cipherTextstore = useSelector((state) => state);
    console.log("cipherTextstore----", cipherTextstore);
    // this is use to

    // const apiEndpoint =
    //     "https://oonanode-dev.salesdrive.app/sdx-api/secure/customer/shareableLink";

    // const callApiWithJwt = async () => {
    //     try {
    //         // Example: Assuming you have a valid JWT token stored somewhere
    //         const jwtToken = jwtTokenState;
    //         const apiData = {
    //             mobileNumber: MobileNumberOfUser,
    //             agentCode: agentcode,
    //             commercialStructure: "AgentCommercialStructure",
    //             userId: userId,
    //             baseUrl: apiConfig?.ProjectLink + "/customer-login/",
    //         };
    //         setopenloader(true);
    //         const response = await axios.post(apiEndpoint, apiData, {
    //             headers: {
    //                 Authorization: `Bearer ${jwtToken}`,
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         setlinkUrl(response.data?.data);
    //         setopenloader(false);

    //         console.log("API Response:", response.data);
    //     } catch (error) {
    //         setopenloader(false);
    //         // Handle errors here
    //         console.error("API Request Error:", error);
    //     }
    // };

    async function saveCipherText() {
        const formData = {
            mobileNumber: MobileNumberOfUser,
            agentCode: agentcode,
            commercialStructure: getCommericalValue,
            userId: userId,
            baseUrl: apiConfig?.ProjectLink + "/customer-login/",
        };

        dispatch(
            actions.fetchSaveCipherText(formData, (result) => {
                console.log("result------", result);
                setlinkUrl(result?.data);
            })
        );
    }

    const [width, setWidth] = useState(window.innerWidth);
    const [visible, setVisible] = useState(false);
    const [isShareLinkOpen, setShareLinkOpen] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // fucntion will start from here
    const openShareLink = useCallback(() => {
        setVisible(true);
        setShareLinkOpen(true);
    }, []);
    console.log("hello");

    // here is the some functinality that I have added on the share button

    const handleWhatsAppButtonClick = () => {
        var countryCode = "+91";
        var phoneNumber = MobileNumberOfUser;
        var customText = encodeURIComponent(`Check out the link ${linkUrl}`);
        var whatsappLink =
            "https://wa.me/" + countryCode + phoneNumber + "?text=" + customText;
        window.open(whatsappLink);
    };
    const handleMessageButtonClick = () => {
        const linkUrl = apiConfig?.ProjectLink + "/customer-login";
        const message = `Hello! Check out this link: ${linkUrl}`;
    
        // Using the sms: URI scheme to create the link
        const url = `sms:?body=${encodeURIComponent(message)}`;
    
        // Create an "a" element and simulate a click to open the link
        const link = document.createElement('a');
        link.href = url;
        link.style.display = 'none'; // Hide the link
        document.body.appendChild(link);
    
        // Simulate a click on the link
        link.click();
        // Clean up: remove the link element
        document.body.removeChild(link);
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
    const onClose = () => {
        setVisible(false);
    };

    const handleCopyLink = () => {
        // downloadQuotePdf();

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
    };

    return (
        <>
            <FullPageLoader fromapploader={openloader}></FullPageLoader>
            <SimpleHeader />
            <div className="rsmaindivv">
                <div className="main-commercial">
                    <div className="agent-info-container">
                        <div className="flex-container">
                            <div className="bold-text">Commercial Structure</div>
                            <div className="share-instruction-text">
                                <span>{`Please click on your agent type to `}</span>
                                <b>share link with your customer</b>
                                <span>.</span>
                            </div>
                        </div>
                        <div className="agent-type-container">
                            <div className="agent-type">
                                <div className="agent-title">
                                    <div className="bold-text1">BACOLOD AGENTS</div>
                                </div>
                                <div className="share-link-container" onClick={openShareLink}>
                                    <div className="flex-container1">
                                        <div className="flex-item">
                                            Tap here to share link with customer
                                        </div>
                                    </div>
                                    <div className="share-link-icon">
                                        <img className="image-style" alt="sharlink" src={img3} />
                                    </div>
                                </div>
                            </div>
                            <div className="agent-type">
                                <div className="agent-title">
                                    <div className="bold-text1">LAS PINAS AGENTS</div>
                                </div>
                                <div className="share-link-container" onClick={openShareLink}>
                                    <div className="flex-container1">
                                        <div className="flex-item">
                                            Tap here to share link with customer
                                        </div>
                                    </div>
                                    <div className="share-link-icon">
                                        <img className="image-style" alt="sharlink" src={img3} />
                                    </div>
                                </div>
                            </div>
                            <div className="agent-type">
                                <div className="agent-title">
                                    <div className="bold-text1"> MBO AGENTS</div>
                                </div>
                                <div className="share-link-container" onClick={openShareLink}>
                                    <div className="flex-container1">
                                        <div className="flex-item">
                                            Tap here to share link with customer
                                        </div>
                                    </div>
                                    <div className="share-link-icon">
                                        <img className="image-style" alt="sharlink" src={img3} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {width < breakpoint && (
                    <>
                        <MobileDrawer
                            visible={visible}
                            onClose={() => setVisible(false)}
                            handleWhatsAppButtonClick={handleWhatsAppButtonClick}
                            handleMessageButtonClick={handleMessageButtonClick}
                            handleEmailButtonClick={handleEmailButtonClick}
                            handleCopyLink={handleCopyLink}
                        />
                    </>
                )}
            </div>
        </>
    );
}
