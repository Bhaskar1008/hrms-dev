import React, { useState, useRef } from "react";
import "./SharableLogin.css";
import { Row, Col, Form, Input, Modal } from "antd";
import DottedOTPInput from "../../../../OTPInput/DottedOTPInput";
import img1 from "../../../../../images/sideBar/oona.png";
import logobar from "../../../../../images/logo_phillife.png";
import { useHistory } from "react-router-dom";

var otptimer = 10;
var otpclrarvariable = false;
export default function MobileLogin() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otp1, setOTP1] = useState("");
  const [otp2, setOTP2] = useState("");
  const [otp3, setOTP3] = useState("");
  const [otp4, setOTP4] = useState("");
  const [isModalOtp, setIsModalOtp] = useState(false);
  const [timerstart, setTimerstart] = useState("60");
  const [EnteredOTP, setEnteredOTP] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(true);
  const childRef = useRef();
  const history = useHistory();
  const handleGetOTP = () => {
    setIsModalOtp(true);
  };

  const handleCancel1 = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    otpclrarvariable = false;
    setIsModalOtp(false);
    setOTP1("");
    setOTP2("");
    setOTP3("");
    setOTP4("");
  };

  const resendOTP = () => {
    // console.log("Call Resend OTP funstion here");
    otptimer = 10;
  };
  const handleOTPChange = (e) => {
    setEnteredOTP(e);
  };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const handleChange = () => {
    history.push('/customer-login');
  };

  
  return (
    <div className="outer-container">
      <div className="login-container">
        <img src={logobar} alt="Logo" className="oona-img" />

        <>
          <div className="text-container">
            <h1 className="heading">OTP Verification</h1>
            <p className="sub-heading">
            we have sent you one time verification code on this number +91 9867123420.
            <span  className="change" onClick={handleChange}>Change </span> 
            </p>
          </div>
          <form>
           
            <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div>
                <DottedOTPInput
                  cleardata={isModalOtp}
                  ref={childRef}
                  timers={timerstart}
                  length={4}
                  onChange={handleOTPChange}
                
                  onResend={resendOTP}
                  //   verifyOtp={() => submitOtp()}
                />
              </div>
            </Col>
          </Row>
          </form>

       
          <p className="sub-heading">didn’t receive the OTP? Resend OTP</p>
        </>

      
          
       
      </div>
    </div>
  );
}
