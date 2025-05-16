import React,{useState, useEffect} from 'react'
import { Row, Col, Button, Select, Form, message, Upload, Drawer } from "antd";
import apiConfig from "../../../../config/api.config";
import { stoageGetter } from "../../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../axios-request/request.methods";
import * as actions from "../../../../store/actions";
import './AgentShareLink.css'
import { CopyOutlined } from '@ant-design/icons';
import FullPageLoader from '../../../FullPageLoader/FullPageLoader';

const AgentShareLink = () => {
    let userData = stoageGetter("user");
    const getAgentCode = userData?.agentCode;
    const channelCode = userData?.channelCode;
    const designationName = userData?.designation?.designatioName
    const  [loader, setLoader] = useState(false)
    let MobileNumberOfUser = userData?.mobileNo
    let agentcode = userData?.agentCode;
    const redirectionENV = process.env.REACT_APP_NODE_URL_AGENT_CI
    
    const [CommericalValue, setCommericalValue] = useState("")

    const dispatch = useDispatch();
    const jwtTokenState = useSelector((state) => state?.login?.token);
    const userId = useSelector((state) => state.login.user.id)
    
    const getCommericalValue = useSelector((state) => state);
    console.log("getCommericalValue---", getCommericalValue);
    const commericalNameListing = getCommericalValue?.NOM_NIVEL3;
    const commericalValueListing = getCommericalValue?.COD_NIVEL3;

    
    useEffect(() => {
        let url1 = `user/lov?name=CommStructure&AgentCode=${getAgentCode}`;
        if (channelCode.channelCode === "CH1") {
          url1 = `user/travel/commercialStructures`;
        } else {
        //   getGroupPolicy(getAgentCode);
        //   getSubAgentList(getAgentCode);
        }
        setLoader(true);
        dispatch(actions.fetchAllCommercialStructure(url1, result =>{
          if (result.statusCode === -1) {
            setLoader(false);
            const initialArr = result?.data?.lov[0]?.COD_NIVEL3
            console.log("initialArr---", initialArr);
            setCommericalValue(initialArr ? initialArr : [] )
            callApiWithJwt(initialArr)
          }else{
              setLoader(false);
            }
          }
        ));
      }, [])

      
      // function api hit for agent
    async function callApiWithJwt(eventdata) {
        setLoader(true)
        const formData = {
            mobileNumber: MobileNumberOfUser,
            agentCode: agentcode,
            commercialStructure: eventdata? eventdata : CommericalValue,
            // commercialStructureCode: commericalValueListing,
            userId: userId,
            // https://kahoona.uat.myoona.ph
            // apiConfig?.ProjectLink
            baseUrl: apiConfig?.ProjectLink+ "/app/agent-login-new/",
        };

        dispatch(
            actions.fetchSaveCipherText(formData, (result) => {
                console.log("result------", result);
                if (result.statusCode === -1) {
                    setLoader(false)
                    let allResponse = result?.data
                    let currentURL = result?.data?.responseData;
                    // let index = currentURL.indexOf("agent-login-new/");
                    //  navigator.clipboard.writeText(currentURL)
                    //  if (currentURL !== "") {
                    //     message.success("Link copied successfully!");
                    //  }else{
                    //     message.error("Error copying link. Please try again");
                    //  }
                    handleNavigation(currentURL)
                        
                    // let ciphertext = "";
                    // if (index !== -1) {
                    // setLoader(false)
                    // ciphertext = currentURL.substring(index + "agent-login-new/".length);
                    // // setlinkUrl(ciphertext)
                    // dispatch(actions.GetAgentCypherStore(allResponse))
                    // dispatch(actions.GetAgentRegisterKeyStore("shareLogin"))
                    
                    // } 
                }else{
                    setLoader(false)
                }
            })
        );
    }

    const handleNavigation = async (event) =>{
      console.log("Im Clicked",event)
      setLoader(true)
  
        const formData = {
          
          data: {
            redirect: {
              sdRefId: "",
              documentId: "", 
              product: "profile",
              coverage: "", 
              deeplink: "",
              promo: "",
              discountPct: "", 
              workflow: {
                role: channelCode?.channelCode === 'CH1' ? 'sales' : designationName.toLowerCase(), // channel name 
                createdBy: channelCode?.channelCode === 'CH1' ? 'sales' : designationName.toLowerCase() // channel name 
              },
              isHub : false,
              isProfile:true,
            },
            agent: {
              branchCode: "", 
              agentCode: channelCode?.channelCode === "CH1" ? "" : getAgentCode,
              userCode: "", 
              createdByCode: "",
              referalLink:event,
              subAgent: {
                // documentCode: channelCode?.channelCode === "CH2" ? subAgent : "5209", 
                // documentType: channelCode?.channelCode === "CH2" ? SubagentName : "HUO"
                documentCode: "", 
                documentType: ""
              }
            },
            customer: {}
          }
        };
  
      try {
        const res = await axiosRequest.post('user/encrypt', formData); // Replace with your API endpoint
        if (res.statusCode === -1) {
          setLoader(false)
          console.log("res===============>", res);
          // setTokenData() 
          let token = res?.data?.encryptedData
          window.location.replace(`${redirectionENV}rh#/?token=${token}`);
        } else{
          setLoader(false)
        }
      } catch (error) {
        setLoader(false)
        if (error?.response?.data?.statusCode === 1) {
          setLoader(false)
          message.error(error?.response?.data?.data);
        }
      }
     
      // redirectingURl = ;
      
    }

    

  return (
    <>
    {/* <FullPageLoader fromapploader={loader} />
        <div className='agent-share'>
            <Button onClick={callApiWithJwt}> <CopyOutlined /> Referral Link</Button>
        </div> */}
    </>
    

  )
}

export default AgentShareLink