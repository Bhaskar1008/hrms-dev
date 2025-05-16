import React from "react";
import {stoageGetter } from "../helpers";
import axios from "axios";
import apiConfig from "../config/api.config";
import axiosRequest from '../axios-request/request.methods'

const { baseURL} = apiConfig;

const sdk = () => {

  let login_user_data = stoageGetter("user");
  const onBoardHandler = async (KYCResult) => {
  let agentMobileNumber = login_user_data.mobileNo
  let API ='user/hyperverge/tokenGeneration?quotationId=saikrishna'
  let Response = await axiosRequest.get(API)
  
        if(Response.statusCode === -1){
            let token  = Response.data.accessToken
            let transactionId = Response.data.transactionId
            let workflowIDs = Response.data.workflow
            LaunchSDK(KYCResult,token,transactionId,workflowIDs)
          }else{
  
          }
  };

  const  LaunchSDK = async (KYCResult,Token,transactionId,workflowIDs) => {
    const hyperKycConfigs = new window.HyperKycConfig(Token,workflowIDs, transactionId);
     window.HyperKYCModule.launch(hyperKycConfigs, ResultsHandler);
        
  }
  const ResultsHandler = (KYCResult)=>{
    switch (KYCResult.status) {
      case "user_cancelled":
        // alert("User Canceled");
        break;
      case "error":
        break;
      case "auto_approved":
        // alert("Approved");
        break;
      case "auto_declined":
        // alert("Auto Declined");
        break;
      case "needs_review":
        // workflow success
        // alert("Successs");
        break;
    }
  }

  return (
    <div>
    
      <button style={{backgroundColor:'#01b4bb',border:'none',margin:'20px',padding:'10px',color:'#FFFFFF',borderRadius:'5px',cursor:'pointer'}} 
      onClick={onBoardHandler}>Launch SDK</button>
    </div>
  );
};

export default sdk;