import React, { useState, useEffect } from "react";
import "./messageEmail.css"
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as actions from "../../../../store/actions";
import axiosRequest from "../../../../axios-request/request.methods";
import { Row, Col, Button, Select, Form, message, Upload, Drawer } from "antd";
import mails from "../../../../images/sharableLinkd_img/mail.png";
import messageImg from "../../../../images/sharableLinkd_img/message.png";
import whatsApp from "../../../../images/sharableLinkd_img/Whatups .png";
import copy from "../../../../images/sharableLinkd_img/content_copy.png";
import apiConfig from "../../../../config/api.config";
import { stoageGetter } from "../../../../helpers";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import { result } from "lodash";

const MessageEmail = (props) => {
    const { baseURL } = apiConfig;
    // console.log("props======>>",Comercialstructure)
    // Comercialstructure
    let userData = stoageGetter("user");
    const getAgentCode = userData?.agentCode;
    const channelCode = userData?.channelCode;

    const dispatch = useDispatch();
    const jwtTokenState = useSelector((state) => state?.login?.token);
    const userId = useSelector((state) => state.login.user.id)
    const [linkUrl, setlinkUrl] = useState("")
    const [openloader, setopenloader] = useState(false);
    const getCommericalValue = useSelector((state) => state?.GetCommercialValue?.commercial_Value);
    console.log("getCommericalValue---", getCommericalValue);
    const commericalNameListing = getCommericalValue?.NOM_NIVEL3;
    const commericalValueListing = getCommericalValue?.COD_NIVEL3;

    let agentcode = userData?.agentCode;

    useEffect(() => {
        if (jwtTokenState !== undefined) {
            callApiWithJwt();
        }
    }, [jwtTokenState !== undefined ? jwtTokenState : null]);

    let MobileNumberOfUser = userData?.mobileNo
    // this is for the ref
    const apiEndpoint = 'https://oonanode-dev.salesdrive.app/sdx-api/secure/customer/shareableLink';

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
    //         setopenloader(true)
    //         const response = await axios.post(apiEndpoint, apiData, {
    //             headers: {
    //                 'Authorization': `Bearer ${jwtToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         setlinkUrl(response.data?.data)
    //         setopenloader(false)

    //         console.log('API Response:', response.data);
    //     } catch (error) {
    //         setopenloader(false)
    //         // Handle errors here
    //         console.error('API Request Error:', error);
    //     }
    // };

    async function callApiWithJwt() {
        const formData = {
            mobileNumber: MobileNumberOfUser,
            agentCode: agentcode.toString(),
            commercialStructure: commericalValueListing.toString(),
            // commercialStructureCode: commericalNameListing,
            userId: userId,
            baseUrl: apiConfig?.ProjectLink + "/customer-login/",
        };

        dispatch(
            actions.fetchSaveCipherText(formData, (result) => {
                console.log("result------", result);
                if (result.statusCode === -1) {
                    setlinkUrl(result.data)
                    navigator.clipboard.writeText(result.data)
                }
            })
        );
    }

    // hooks end here
    const handleWhatsAppButtonClick = () => {

        var countryCode = "+91";
        var phoneNumber = '';
        var customText = encodeURIComponent(`Hello! Check out this link: \n  ${linkUrl}`);
        var whatsappLink =
            "https://wa.me/?text=" + customText;
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
                        <div className="display-mobile">
                        <div className="msd-sharable-drawer-option.messageIcon " >
                            <img
                                alt="Message"
                                src={messageImg}
                                onClick={handleMessageButtonClick}
                            />
                            <div className="msd-sharable-drawer-option-label.messageIcon-label">
                                Message
                            </div>
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
        </>

    );
};

export default MessageEmail;
