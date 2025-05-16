import React,{useState, useEffect} from 'react'
import { Row, Col, Button, Select, Form, message, Upload, Drawer } from "antd";
import apiConfig from "../../../../config/api.config";
import { stoageGetter } from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions";
import './AgentShareLink.css'
import { CopyOutlined } from '@ant-design/icons';
import FullPageLoader from '../../../FullPageLoader/FullPageLoader';

const AgentShareLink = () => {
    let userData = stoageGetter("user");

    // const [linkUrl, setlinkUrl] = useState("")
    // console.log("linkUrl---", linkUrl);
    // dispatch(actions.GetAgentCypherStore(linkUrl));
    const  [loader, setLoader] = useState(false)
    let MobileNumberOfUser = userData?.mobileNo
    let agentcode = userData?.agentCode;
    

    const dispatch = useDispatch();
    const jwtTokenState = useSelector((state) => state?.login?.token);
    const userId = useSelector((state) => state.login.user.id)
    
    const getCommericalValue = useSelector((state) => state?.GetCommercialValue?.commercial_Value);
    console.log("getCommericalValue---", getCommericalValue);
    const commericalNameListing = getCommericalValue?.NOM_NIVEL3;
    const commericalValueListing = getCommericalValue?.COD_NIVEL3;

    // useEffect(() => {
    //     if (jwtTokenState !== undefined) {
    //         callApiWithJwt();
    //     }
    // }, [jwtTokenState !== undefined ? jwtTokenState : null]);

    // function api hit for agent
    async function callApiWithJwt() {
        setLoader(true)
        const formData = {
            mobileNumber: MobileNumberOfUser,
            agentCode: agentcode,
            commercialStructure: commericalNameListing,
            // commercialStructureCode: commericalValueListing,
            userId: userId,
            baseUrl: apiConfig?.ProjectLink + "/agent-login/",
        };

        dispatch(
            actions.fetchSaveCipherText(formData, (result) => {
                console.log("result------", result);
                if (result.statusCode === -1) {
                    setLoader(false)
                    let currentURL = result.data;
                    let index = currentURL.indexOf("agent-login/");
                     navigator.clipboard.writeText(currentURL)
                     if (currentURL !== "") {
                        message.success("Link copied successfully!");
                     }else{
                        message.error("Error copying link. Please try again");
                     }
                        // .then(() => {
                        //     console.log("Link copied successfully!");
                        //     message.success("Link copied successfully!");
                        //     // setVisible(false);
                        // })
                        // .catch((error) => {
                        //     console.error("Error copying link:", error);
                        //     message.error("Error copying link. Please try again");
                        //     // setVisible(false);
                        // });

                    let ciphertext = "";
                    if (index !== -1) {
                    setLoader(false)
                    ciphertext = currentURL.substring(index + "agent-login/".length);
                    console.log("Login---", ciphertext);
                    // setlinkUrl(ciphertext)
                    dispatch(actions.GetAgentCypherStore(ciphertext))
                    
                    } 
                }else{
                    setLoader(false)
                }
            })
        );
    }
    

  return (
    <>
    <FullPageLoader fromapploader={loader} />
        <div className='agent-share'>
            <Button onClick={callApiWithJwt}> <CopyOutlined /> Agent Referral Link</Button>
        </div>
    </>
    

  )
}

export default AgentShareLink