import React, { useState, useRef, useEffect } from "react";
import "./SharableLogin.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form, Input, Modal, message } from "antd";
import MobileLogin from "./Mobilelogin";
import DottedOTPInput from "../OTPInput/OTPInputBox";
import img1 from "../../../../../images/sideBar/oona.png";
import { generateCustomerOtp } from "../../../../../services/travel";
import apiConfig from "../../../../../config/api.config";
import rootIndex from "../../../../../store/root_index";
import FullPageLoader from "../../../../FullPageLoader/FullPageLoader";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../store/actions/index";
var otptimer = 10;
var otpclrarvariable = false;

export default function SharableLogin() {
  const dispatch = useDispatch();
  console.log("apiConfigapiConfig: ", apiConfig);
  const baseURL = apiConfig?.baseURL;
  const { store } = rootIndex;
  const _store = store.getState();
  console.log("_store_store: ", _store);
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otp1, setOTP1] = useState("");
  const [otp2, setOTP2] = useState("");
  const [otp3, setOTP3] = useState("");
  const [otp4, setOTP4] = useState("");
  const [isModalOtp, setIsModalOtp] = useState(false);
  const [timerstart, setTimerstart] = useState("60");
  const [EnteredOTP, setEnteredOTP] = useState("");
  const [isDisableButton, setIsDisableButton] = useState(false)
  const [loader, setLoader] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isMobileLoginVisible, setMobileLoginVisible] = useState(false); // Define isMobileLoginVisible state
  const childRef = useRef();
  const history = useHistory();

  const [form] = Form.useForm();

  const handleGetOTP = async () => {
    let currentURL = window.location.href;
    let index = currentURL.indexOf("customer-login/");
    let ciphertext = "";
    if (index !== -1) {
      ciphertext = currentURL.substring(index + "customer-login/".length);
      console.log(ciphertext);
    }

    try {
      setLoader(true);
      const Url = `${baseURL}cipherSecure/customerOtpGeneration`;
      const requestBody = {
        mobileNumber,
      };
      const headers = {
        ciphertext,
        authorization: "Bearer " + _store.login.token,
        "Content-Type": "application/json",
      };
      const response = await axios.post(Url, requestBody, { headers });
      setLoader(false);
      console.log("responseresponseresponse: ", response);

      if (isMobileView) {
        setIsModalOtp(false);
        setMobileLoginVisible(true);
        history.push("/otp-verification");
      } else {
        setIsModalOtp(true);
      }
    } catch (error) {
      setLoader(false);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
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
    otptimer = 10;
  };
  const handleOTPChange = (e) => {
    setEnteredOTP(e);
  };


  const onNumberChange = (evt) => {
    setMobileNumber(evt.target.value)
    if (evt.target.value[0] === "9") {
      setIsDisableButton(false)
    }else{
      setIsDisableButton(true)
    }
  }

  const handleKeyPress = (event) => {
    const isNumber = /^[0-9]$/.test(event.key);
      const isBackspace = event.key === "Backspace";
      console.log("Enter Pressed",event.key)
      if (event.target.value[0] === "9") {
        setIsDisableButton(false)
        if (!isNumber && !isBackspace) {
        console.log("Backepsce")
        if(event.key === 'Enter'){
          handleGetOTP();
        }else {
          event.preventDefault();
        }
      }
      }else{
        setIsDisableButton(true)
      }
      
  };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  return (
    <>
      <FullPageLoader fromapploader={loader} />
      <div className="outer-container">
        <div className="login-container">
          <img src={img1} alt="Logo" className="oona-img" />

          <div className="text-container">
            <h1 className="heading">Welcome</h1>
            <p className="sub-heading">
              Please login with your registered mobile number to
              <br /> continue your quotation or download policy.
            </p>
          </div>
          <Form form={form}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item
                  name="mobileNumber"
                  label="Mobile Number"
                  className="form-item-name la"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your mobile number!",
                    },
                    {
                      pattern: new RegExp(/^(9)\d{9,11}$/), // Validates 10 to 12 digits starting with 0 or 9.
                      message: "Mobile Number should be 10 digits and start with 9 only",
                    },
                    
                  ]}

                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                >
                  {/* <Space.Compact>
                    <Search  placeholder="input search text" allowClear />
                  </Space.Compact> */}
                  <Input
                    type="text"
                    size="default"
                    addonBefore="+63"
                    value={mobileNumber}
                    onChange={(e) => onNumberChange(e)}
                    placeholder="Enter Mobile Number"
                    required
                    maxLength="10"
                   
                    // onKeyPress={handleKeyPress} // Listen for Enter key press
                    style={{ fontWeight: 'bold', color: 'black' }}
                    onKeyDown={(evt) => { handleKeyPress(evt)}}
                    // ref={(el) => (inputRefs.current[index] = el)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <div>
            <button
              type="button"
              onClick={handleGetOTP}
              className={mobileNumber?.length < 10 ? 'proceed-btnDisable' : 'proceed-btn'}
              disabled={mobileNumber?.length < 10 || isDisableButton}
            >
              Get OTP
            </button>
          </div>
          <p className="sub-heading">you will receive 4 digit OTP number</p>

          {isMobileLoginVisible ? (
            //  mobile view h
            ""
          ) : (
            //  desktop view
            <>
              <Modal
                title="Verify Mobile Number"
                visible={isModalOtp}
                onOk={true}
                onCancel={handleCancel}
                footer={null}
                okText="Submit Details"
                width={400}
                height={600}
              >
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>
                      <DottedOTPInput
                        cleardata={isModalOtp}
                        ref={childRef}
                        timers={timerstart}
                        length={4}
                        onChange={handleOTPChange}
                        Messagetext={<p>Enter the OTP that has been sent to <span style={{fontWeight: 'bold'}}>{mobileNumber}</span> complete phone number verification.</p>}
                        onResend={resendOTP}
                        EnteredOtp={EnteredOTP}
                        mobileNumber={mobileNumber}
                      //   verifyOtp={() => submitOtp()}
                      />
                    </div>
                  </Col>
                </Row>
              </Modal>
            </>
          )}
        </div>
      </div>
    </>
  );
}
