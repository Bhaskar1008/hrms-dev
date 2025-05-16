import React, { useEffect, useState, createRef, useRef } from "react";
import "./AgentLogin.css";
import {
  Card,
  Input,
  Button,
  Image,
  Form,
  message,
  Modal,
  Row,
  Col,
  Checkbox,
  DownloadOutlined,
  PlusOutlined,
  List,
} from "antd";
import {
  UserOutlined,
  KeyOutlined,
  ConsoleSqlOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiConfig from "../../../../config/api.config";
import axios from "axios";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import logobar from "../../../../images/logo_phillife.png";
import { disable } from "workbox-navigation-preload";
import AgentLoginOtpInput from "../OTPInputBox/AgentLoginOtpInput";
import * as actions from "../../../../store/actions";

// import OfflineMessage from "../../OfflineMessageU";
const { baseURL,} = apiConfig;
const loginfromLink = null;
var otpclrarvariable = false;
var otptimer = 10;

const AgentLogin = () => {

  

  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  console.log("newstore store from cypher", cypherStore);
  const [completeMessPop, setCompleteMessPop] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form] = Form.useForm();
  
  const [EnteredOTP, setEnteredOTP] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [timerstart, setTimerstart] = useState("60");
  //const [loading, setLoading] = useState(false)
  // this is for the add to homescreen
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  let currentURL = window.location.href;
  let index = currentURL.indexOf("agent-login/");
  let ciphertext = "";
  if (index !== -1) {
    ciphertext = currentURL.substring(index + "agent-login/".length);
    // console.log(ciphertext);
    dispatch(actions.GetAgentCypherStore(ciphertext))
  }
  // otp usestate hooks
  const [openloader, setOpenloader] = useState(false);
  const [windowWidth, setWidth] = useState(window.innerWidth);

  // is registration
  const [isRegistration, setIsregistration] = useState(false);
  const [openModalPopConfirm, setOpenModalPopConfirm] = useState(false);
  const [accept, setAccept] = useState(false);

  const visibleModalPopConfirm = () => {
    setOpenModalPopConfirm(true);
  };

  const hideModalPopConfirm = () => {
    setOpenModalPopConfirm(false);
  };

  const onOkPopUpConfirm = () => {
    console.log("accepted");
    setAccept(true);
    hideModalPopConfirm();
  };

  const onCancelPopUpConfirm = () => {
    console.log("declined");
    hideModalPopConfirm();
  };

  const registrationHandler = (e) => {
    e.preventDefault();
    setIsregistration(true);
  };
  const cancelIsregistration = (e) => {
    e.preventDefault();
    setIsregistration(false);
  };

  useEffect(() => {
    // Function to handle window resize
    const getMobileOperatingSystem = () => {
      var userAgent = navigator.userAgent || navigator.vendor || window.opera;

      // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
      }

      if (/android/i.test(userAgent)) {
        return "Android";
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
      }

      return "unknown";
    };
    function getPlatform() {
      var platform = ["Win32", "Android", "iOS"];

      for (var i = 0; i < platform.length; i++) {
        if (navigator.platform.indexOf(platform[i]) > -1) {
          return platform[i];
        }
      }
    }
    function getBrowserName() {
      if (
        (navigator.userAgent.indexOf("Opera") ||
          navigator.userAgent.indexOf("OPR")) != -1
      ) {
        return "Opera";
      } else if (navigator.userAgent.indexOf("Edg") != -1) {
        return "Edge";
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
      } else if (
        navigator.userAgent.indexOf("MSIE") != -1 ||
        !!document.documentMode == true
      ) {
        //IF IE > 10
        return "IE";
      } else {
        return "unknown";
      }
    }

    getBrowserName();
    getPlatform();
    // alert(getMobileOperatingSystem() + " greatPlatform " + getPlatform() + " getBrowser " + getBrowserName())
    console.log("hey34", getMobileOperatingSystem());
  
    const handleResize = () => {
      setWidth(window.innerWidth);
      // if (!localStorage.getItem('appInstalled') && !window.matchMedia('(display-mode: standalone)').matches) {
      //   console.log("hello")
      //   setShowButton(true);
      // } else {
      //   console.log("hello2")
      //   setShowButton(false);
      // }
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    if (window.localStorage.getItem("appInstalled")) {
      setShowButton(false); // App is installed, hide the button
    }
    // Check if the app is already installed
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    if (mediaQueryList.matches) {
      setShowButton(false);
    }
    // setShowButton(!mediaQueryList.matches);

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      // Prevent the default browser prompt
      event.preventDefault();

      // Store the event for later use
      // setDeferredPrompt(event);

      // Show the "Add to Home Screen" button
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  // this the hanlde click button

  // Auto by pass Code Ends Here
  // for the otp
  
  const childRef = useRef();

  // method for the otp
  const handleCancel = () => {
    otpclrarvariable = false;
    setIsModalOpen(false);
    
  };

  // verify mobile modal start
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
 
  const handleOTPChange = (e) => {
    // setOtpValue(e.target.value);
    setEnteredOTP(e);
    console.log("event===>", e);
  };
  const resendOTP = () => {
    console.log("Call Resend OTP funstion here");
    otptimer = 10;
  };
  const openConfirmPopUp = () => {
    setCompleteMessPop(true);
  };
  const cancelConfirmPopUp = () => {
    setCompleteMessPop(false);
  };
  const onChangeMobileNumber = (e) =>{
    setPhoneNumber(e.target.value)
  }

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const submitOtp = async () => {
    try {
      // setLoader(true);
      const Url = `${baseURL}auth/agent/registerd-agent/match/otp`;
      const requestBody = {
        mobileNumber: phoneNumber,
        smsOtp: EnteredOTP,
        otptype: "Verify",
        user_id: "642e6670a0d8c64b6996a8f1",
        agentId: "65a7aa996c0971b895904167",
        referedBy: "64945a044539b9717d5e6c4e",
      };
      const headers = {
        ciphertext,
        authorization: null,
        "Content-Type": "application/json",
      };
      const response = await axios.post(Url, requestBody, { headers });
      // setLoader(false);
      if (response?.data?.statusCode === -1) {
        // message.success(response?.data?.data);
        // setTimeout(() => {
        //   cancelConfirmPopUp();
        //   // setName("VERIFIED");
        // }, 3000);
        history.push('/application-status')
        openConfirmPopUp();
        setIsModalOpen();
      }else if (response?.data?.statusCode === 121) {
        message.error(response?.data?.data);
      }
      
    } catch (error) {
      console.log("errorresponse", error?.response);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
};

const onLogin = async () => {
  if (phoneNumber) {
    // setIsPhoneNumberEntered(true);
  }

  if (phoneNumber === "") {
    message.error("Please enter phone Number");
    // setIsPhoneNumberEntered(false);
  } else if (phoneNumber.length < 10) {
    message.error("Please enter valid phone Number");
  }  else {
      try {
        // setLoader(true);
        const Url = `${baseURL}auth/agent/registerd/agent/login`;
        const requestBody = {
          mobileNumber: phoneNumber,
          referedBy: "64945a044539b9717d5e6c4e",
        };
        const headers = {
          ciphertext,
          authorization: null,
          "Content-Type": "application/json",
        };
        const response = await axios.post(Url, requestBody, { headers });
        // setLoader(false);
        
        if (response?.data?.statusCode === -1) {
          // message.success(response?.data?.data);
          // setButtonState(buttonEnable);
          showModal();
        }
        
      } catch (error) {
        if (error?.response?.data?.statusCode === 1) {
          message.error(error?.response?.data?.data);
        }
      }
  }
};



  return (
    <>
      
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className="agent_login_wrapper">
        <div className="agent_login">
          <div className="ios"></div>
          <Row
            gutter={[16, 16]}
            style={{ marginLeft: "0px", marginRight: "0px", height: "100vh" }}
          >
            <Col
              className="login_card_column m-auto"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
            >
              <Form className="form_wrapper" form={form} onFinish={onLogin}>
                <div className="login_card">
                  {!isRegistration ? (
                    <Card
                      className="login_box"
                      headStyle={{ textAlign: "center" }}
                      bordered={false}
                    >
                      <div className="form_content_wrap">
                        <div className="text-center login_logo">
                          <img
                            src={logobar}
                            alt="Ios install Logo"
                            //   style={{ height: 32, width: 32, marginBottom: 8 }}
                          />
                        </div>
                        <div className="login_header_text">
                          <div className="heading">Login</div>
                          <div className="otp_description">
                            We will send you the verification code on this
                            number
                          </div>
                        </div>

                        <Form.Item
                          {...formItemLayout}
                          name="email"
                          label="Mobile Number"
                          style={{ fontWeight: "bold" }}
                        >
                          <Input
                            size="large"
                            maxLength={10}
                            type="tel"
                            placeholder="Enter mobile number"
                            //   prefix={<UserOutlined />}
                            value={phoneNumber}
                            onChange={(e) => onChangeMobileNumber(e)}
                            style={{ borderRadius: "4px" }}
                          />
                        </Form.Item>

                        <Button
                          type="primary"
                          block
                          size="large"
                          htmlType="submit"
                          className="get_otp_btn"
                        >
                          Get OTP
                        </Button>
                      </div>
                      <p className="forgotPassword">
                        Don't have a account? <b className="contactUs"></b>
                        <a
                          style={{
                            color: "#4AC6BB",
                            fontSize: 12,
                            fontWeight: 600,
                            lineHeight: "16px",
                            wordBreak: "break-word",
                          }}
                          href=""
                          rel="ContactUs"
                          onClick={registrationHandler}
                        >
                          REGISTER
                        </a>
                      </p>
                    </Card>
                  ) : (
                    <Card
                      className="welcome_onboarding"
                      borderRadius={8}
                      headStyle={{ textAlign: "center" }}
                      bordered={false}
                    >
                      <div className="welcome_onboraing_registration">
                        <div className="text-center login_logo">
                          <img
                            src={logobar}
                            alt="Ios install Logo"
                            //   style={{ height: 32, width: 32, marginBottom: 8 }}
                          />
                        </div>
                        <div className="login_header_text mb-3">
                          <div className="heading">WELCOME!</div>
                          <div className="otp_description">
                            Before we begin the registration process, please
                            take a moment to review document checklist below and
                            ensure that you have the necessary documents ready
                            as you will need them throughout the process.
                          </div>
                        </div>
                        <div className="checklist_for_resigter">
                          Checklist for Registration <br />
                          <span className="png_jpeg">
                            ( .PNG or .JPG format )
                          </span>
                        </div>
                        <ul className="list-inline">
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            Download BPI account opening form
                          </li>
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            Clear scanned copy of SSS ID and TIN ID
                          </li>
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            Evidence of Payment license fee, Proof of bank
                            account number ownership and 2*2 size Photo
                          </li>
                          <li className="d-flex gap-2">
                            <CheckOutlined />
                            CA Form (Application for insurance agent’s license),
                            Clear copy of exam result from IC or Clearance from
                            other company
                          </li>
                        </ul>
                        <Checkbox
                          checked={accept}
                          onChange={visibleModalPopConfirm}
                        >
                          Data Privacy Consent
                        </Checkbox>

                        <Button
                          type="primary"
                          block
                          size="large"
                          htmlType="submit"
                          className={`${
                            accept === false
                              ? "registerbtndisabled"
                              : "registerbtn"
                          }`}
                          disabled={!accept}
                          onClick={() => history.push("/agent-form")}
                        >
                          Register
                        </Button>
                        <Button
                          block
                          size="large"
                          htmlType="cancel"
                          onClick={cancelIsregistration}
                          className="cancel_btn"
                        >
                          Cancel
                        </Button>
                      </div>
                    </Card>
                  )}
                </div>
              </Form>
            </Col>
          </Row>
        </div>

        {/* popconfirm modal start */}
        <Modal
          className="register_pop_conf_modal"
          centered
          open={openModalPopConfirm}
          // width={450}
          style={{
            top: 0,
          }}
          onCancel={onCancelPopUpConfirm}
          footer={null}
          closable={false}
        >
          <div className="modal_header d-flex justify-content-between align-items-center">
            <div className="header_title">Data Privacy Consent</div>
            <div>
              <CloseOutlined
                style={{ fontSize: "16px" }}
                onClick={onCancelPopUpConfirm}
              />
            </div>
          </div>
          <div className="modal_content mb-3">
            By signing this Licensed Agent’s Profile Sheet, I consent to the
            collection, generation, use, processing, storage, and retention of
            my personal data by Phillife Financial. I also authorize Phillife Financial
            to disclose my information to third parties for the following
            circumstances: a) As necessary for the proper execution of process
            related to the company; b) The use or disclosure is reasonably
            necessary, required, or authorized under law. This is in accordance
            with the provisions of the Data Privacy Act of 2012 and its
            implementing Rules and Regulations, including the circulars and
            memorandum orders by the National Privacy Commission. I understand
            that my application for a Licensed Agent Code to sell Phillife Financial
            will only be processed upon submission of complete licensing
            requirements as indicated in Annex A By signing this Licensed
            Agent’s Profile Sheet, I consent to the collection, generation, use,
            processing, storage, and retention of my personal data by Phillife Financial. I also authorize Phillife Financial to disclose my
            information to third parties for the following circumstances: a) As
            necessary for the proper execution of process related to the
            company; b) The use or disclosure is reasonably necessary, required,
            or authorized under law. This is in accordance with the provisions
            of the Data Privacy Act of 2012 and its implementing Rules and
            Regulations, including the circulars and memorandum orders by the
            National Privacy Commission. I understand that my application for a
            Licensed Agent Code to sell Phillife Financial will only be processed
            upon submission of complete licensing requirements as indicated in
            Annex A.
          </div>
          <div
            className="button_accept_cancel d-flex gap-3"
            key="footer-buttons"
          >
            <Button
              onClick={onCancelPopUpConfirm}
              size="large"
              className="decline"
              block
              type="default"
            >
              Decline
            </Button>
            <Button
              onClick={onOkPopUpConfirm}
              size="large"
              className="accept"
              block
              type="default"
            >
              Accept
            </Button>
          </div>
        </Modal>

        {/* popconfirm modal end */}
        <Modal
          className="otp_verify_modal"
          bodyStyle={{ padding: 16 }}
          visible={isModalOpen}
          onOk={true}
          onCancel={handleCancel}
          footer={null}
          okText="Submit Details"
          width={320}
          //   height={700}
          closable={false}
        >
          <Row className="otp_verify_modal">
            <Col className="mb-4" xs={24} sm={24} md={24} lg={24} xl={24}>
              <div className="text-center">
                <img src={logobar} alt="logo" />
              </div>
            </Col>
            <Col
              className="text-center mb-4"
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
            >
              <div className="text_otp_verification mb-2">OTP Verification</div>
              <div className="message">
                We have sent you one time verification code on this number +91
                9867123420.
                <a onClick={handleCancel} className="change_number" href="#">
                  CHANGE
                </a>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div>
                <AgentLoginOtpInput
                  cleardata={isModalOpen}
                  customTextWithResend={true}
                  btn_text="Verify & Proceed"
                  ref={childRef}
                  timers={timerstart}
                  length={4}
                  onChange={handleOTPChange}
                  //   Messagetext={
                  //     "We have sent you one time verification code on this number +91 9867123420."
                  //   }
                  onResend={resendOTP}
                  verifyOtp={() => submitOtp()}
                />
              </div>
            </Col>
          </Row>
        </Modal>

      </div>
    </>
  );
};

export default AgentLogin;
