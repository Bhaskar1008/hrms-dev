import React from "react";
import { stoageGetter } from "../helpers";
import axios from "axios";
import "./HypervergeSDK.css";
import apiConfig from "../config/api.config";
import axiosRequest from "../axios-request/request.methods";
import {
  FolderAddOutlined,
  DeleteOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { Button, Upload, message, Image } from "antd";
import { useState } from "react";
const { baseURL } = apiConfig;


const HypervergeSDK = ({
  heading = " Please upload document",
  headingColor = "rgba(0, 0, 0, 0.85)",
  themeBg = "#1D428A",
  hintText,
  hintColor = "rgba(0, 0, 0, 0.85)",
  width = "100%",
  height = "100%",
  border = "none",
  borderColor = "transparent",
  borderRadius = "18px",
  handleHyperResponse,
  documentCode,
  documentType,
  documentId
}) => {
  const [hyperResult, setHyperResult] = useState("");
  const [fullName, setFullName] = useState("");
  const [imagePath, setImagePath] = useState("");

  let login_user_data = stoageGetter("user");
  console.log("User Data==>>", login_user_data.mobileNo);
  const onBoardHandler = async (KYCResult) => {
    if (!documentId) {
      message.error("Document id is not available");
      return;
    }
    if (!documentType) {
      message.error("Please select Valid ID");
      return;
    }
    if (!documentCode) {
      message.error("Please enter ID Number");
      return;
    }
    console.log("KKKKKKKKKK: ", KYCResult);
    let agentMobileNumber = login_user_data.mobileNo;
    let API = `user/hyperverge/tokenGeneration?documentId=${documentId}&documentType=${documentType}&documentCode=${documentCode}`;
    let Response = await axiosRequest.get(API);
    console.log("HYPER Response ==== >>>", Response);

    if (Response.statusCode === -1) {
      let token = Response.data.accessToken;
      let transactionId = Response.data.transactionId;
      let workflowIDs = Response.data.workflow;
      LaunchSDK(KYCResult, token, transactionId, workflowIDs);
    } else {
    }
  };

  const LaunchSDK = async (KYCResult, Token, transactionId, workflowIDs) => {
    console.log("Hyper", { KYCResult, Token, transactionId, workflowIDs });
    const hyperKycConfigs = new window.HyperKycConfig(
      Token,
      workflowIDs,
      transactionId
    );
    console.log("hyperKycConfigs: ", hyperKycConfigs);
    window.HyperKYCModule.launch(hyperKycConfigs, (ResultsHandler) => {
      handleHyperResponse(ResultsHandler);
      console.log("Result Hadler ===>>>>>", ResultsHandler);
      setHyperResult(ResultsHandler);
      if (ResultsHandler.status == "auto_approved") {
        setImagePath(ResultsHandler?.details?.imagePath)
        console.log("IMAGE PATH: ", imagePath);
        const selectedName = ResultsHandler?.details?.fullName
          ? ResultsHandler?.details?.fullName
          : `${ResultsHandler?.details?.firstName} ${ResultsHandler?.details?.middleName} ${ResultsHandler?.details?.lastName}`;
        setFullName(selectedName);
      } else {
        setImagePath("");
      }
    });
  };

  // const ResultsHandler = (KYCResult) => {
  //   switch (KYCResult.status) {
  //     case "user_cancelled":
  //       // alert("User Canceled");
  //       message.error("user Canceled")
  //       break;
  //     case "error":
  //       message.error("Failed Transection")
  //       break;
  //     case "auto_approved":
  //       // alert("Approved");
  //       message.success("Approved")
  //       break;
  //     case "auto_declined":
  //       // alert("Auto Declined");
  //       message.error("Auto Declined")
  //       break;
  //     case "needs_review":
  //       // workflow success
  //       message.warn("Needs Review")
  //       // alert("Successs");
  //       break;
  //       default:
  //       message.success("'Unknown Status'")
  //       break;
  //   }
  // }

  const resetDoc = () => {
    setHyperResult("");
    setFullName("");
    setImagePath("");
  };

  return (
    <div>
      <p className="fw-bold" style={{ color: headingColor }}>
        <span style={{ color: 'red' }}>* </span>
        {heading}
      </p>
      <div
        className="browser-box"
        style={{ width, height, border, borderColor, borderRadius }}
      >
        <div className="doc-box">
          {
            !imagePath && (
              <div
                className="child11"
                style={{
                  backgroundColor: themeBg,
                  borderColor: themeBg,
                  marginRight: "20px",
                }}
              >
                <FolderAddOutlined style={{ color: 'white' }} />
              </div>
            )
          }
          {
            imagePath && (
          <Image
            width={45}
            src={imagePath}
            style={{marginRight: '10px'}}
          />
            )
          }
          <div className="doc-text-container">
            {fullName && (
              <p className="doc-text" title={fullName}>
                <FileProtectOutlined style={{ marginRight: "10px" }} />
                <span className="signature-name" title={fullName}>
                {fullName}
                </span>
                <DeleteOutlined
                  className="doc-delete-icon"
                  onClick={resetDoc}
                />
              </p>
            )}
          </div>
        </div>

        <Button
          className={`browse-btn ${hyperResult?.status == "auto_approved" ? "points-none" : ""
            }`}
          style={{ backgroundColor: themeBg }}
          onClick={onBoardHandler}
        >
          Browse
        </Button>
      </div>
      <p className="fw-bold" style={{ marginTop: 10, color: hintColor }}>
        {hintText}
      </p>
    </div>
  );
};

export default HypervergeSDK;
