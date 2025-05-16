import React, { useState, useEffect } from "react";
import "./RiskInspection.css";
import {
  Row,
  Col,
  Button,
  Radio,
  Card,
  Select,
  Option,
  Form,
  Progress,
  Input,
  DatePicker,
  Upload,
  message,
} from "antd";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import axios from "axios";
import apiConfig from "../../../../config/api.config";

const RiskInspection = () => {

  const { baseURL } = apiConfig;

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { type } = useParams();
  console.log("type----------->",id,type);

  // const onchangeProceed = () => {
  //   history.push(`/inspection-file-upload/${id}`);
  // };
  const onchangeProceed = async () => {
    try {
      const response = await axios.get(`${baseURL}riskInspection/quotationDetails/${type}`);
      console.log("response",response);
      if (response?.data?.statusCode === -1) {
        console.log('GET request successful');
        history.push(`/inspection-file-upload/${id}/${type}`);
        //setGetRiskInspentionData(response?.data?.data);
      } else if (response?.data?.statusCode === 9611) {
        message.success(response?.data?.data)
        history.push(`/document-already-uploaded/${id}/${type}`)
      }else{
        console.log('GET request failed');
      }
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };
  



  return (
    <>
      {/* <OonaHeader /> */}
      {/* <div className="main-container">
        <div>
          <img
            src="https://oona-ph-bucket.s3.amazonaws.com/report/6194c01f1dabcfbeeb2b451cfbca1587b8718b3c2a22c34a0c01742d601b8438.png"
            alt="motor Image"
            class="img1"
          />
        </div>
        <div className="title">
          <h1>Quotation: QP223456789</h1>
          <div className="sub_title">
            <h3>IMPORTANT REMAINDERS:</h3>
            
        
        </div>
      </div> */}
      <div class="email-container">
        <div class="middle-section">
          <img
            src="https://oona-ph-bucket.s3.amazonaws.com/report/6194c01f1dabcfbeeb2b451cfbca1587b8718b3c2a22c34a0c01742d601b8438.png"
            alt="motor Image"
            class="img1"
          />
          <div className="title">
            {" "}
            <h3>QuotationID: {id}</h3>
          </div>
          <div className="sub_title">
            <h5>IMPORTANT REMINDERS:</h5>
          </div>
          <div className="list">
            <li>All vehicle photos must be coloured, sharp, and clear.</li>
            <li>
              Additional photos should be taken for damage's observed and
              non-standard accessories installed
            </li>
            <li>Photo quality should be atleast 320 x 480 pixels</li>
            <li>
              Photos must be in PNG and JPEG files with a maximum of ## in size
            </li>
          </div>
          <div >
            <Button className="Rsbtn" onClick={onchangeProceed}>
              Proceed
              <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiskInspection;
