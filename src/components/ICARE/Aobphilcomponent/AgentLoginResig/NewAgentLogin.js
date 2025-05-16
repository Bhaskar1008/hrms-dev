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
  List,
} from "antd";
import {
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import apiConfig from "../../../../config/api.config";
import axios from "axios";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import logobar from "../../../../images/header_img/agent-login-logo.png";
import AgentLoginOtpInput from "../OTPInputBox/AgentLoginOtpInput";
import * as actions from "../../../../store/actions";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";

var otpclrarvariable = false;
var otptimer = 10;

const AgentLogin = () => {
  const { baseURL } = apiConfig;
  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  const mobileNumber = useSelector((state) => state?.agentOnBoardingRegister?.Loging_Mobile);

  const agentLoginPayload = useSelector((state) => state?.agentOnBoardingRegister?.formData);
  const referedBy = agentLoginPayload?.referedBy
  const agent_ID = agentLoginPayload?.agentId
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
  
  let index = currentURL.indexOf("app/agent-login/");
  let ciphertext = "";
  if (index !== -1) {
    ciphertext = currentURL.substring(index + "app/agent-login/".length);
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
    setAccept(true);
    hideModalPopConfirm();
  };

  const onCancelPopUpConfirm = () => {
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
    
    
  };
  const resendOTP = () => {
    otptimer = 10;
    onLogin()
  };

  const openConfirmPopUp = () => {
    setCompleteMessPop(true);
  };

  const onChangeMobileNumber = (e) =>{
    setPhoneNumber(e.target.value)
    dispatch(actions.LoginMobileNumber(e.target.value))
  }

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const uploadURL = `${baseURL}auth/agent/get/details-of-agent/${agent_ID}`
  const headerObject = {
    ciphertext: cypherStore,
    authorization: null,
    "Content-Type": "application/json",
  };

  const AccountFormSubmit = async () => {
    setOpenloader(true);
    try {
      const response = await axios.get(uploadURL, { headers: headerObject });
      
      if (response?.data?.statusCode === -1) {
        setOpenloader(false);
        dispatch(actions.storeAgentONBoardLisenceForm(response?.data?.data));
        let licenNaffilai = response?.data?.data?.agentData[0].applicantType
        dispatch(actions.StoreLiAff(licenNaffilai))
        const isSubmmited = response?.data?.data?.agentData[0]?.isResubmittingForm
        const aobStatus = response?.data?.data.agentData[0].adminAction_OnAppliction;
        const QCshouldEmpty = response?.data?.data?.agentData[0]?.QC_Discrepancy;
        if (aobStatus === "Returned") {
          history.push('/application-status');
        } else if (aobStatus === "UnderReview" || aobStatus === "ApplicationSubmitted") {
          history.push('/verify-details');
        } else if (["Approved", "Endorsed", "OnTraining", "TrainingCompleted"].includes(aobStatus)) {
          history.push('/success-profile');
        } else {
          history.push('/create-account');
        }
      } else {
        setOpenloader(false);
      }
    } catch (error) {
      console.error("Error in AccountFormSubmit:", error);
      setOpenloader(false);
    }
  };

  const submitOtp = async () => {
    setOpenloader(true)
    try {
      // setLoader(true);
      const Url = `${baseURL}auth/agent/registerd-agent/match/otp`;
      const requestBody = {
        mobileNumber: phoneNumber,
        smsOtp: EnteredOTP,
        otptype: "Verify",
        agentId: agent_ID,
        referedBy: referedBy,
      };
      const headers = {
        ciphertext,
        authorization: null,
        "Content-Type": "application/json",
      };
      const response = await axios.post(Url, requestBody, { headers });
      // setLoader(false);
      if (response?.data?.statusCode === -1) {
        setOpenloader(false)
        AccountFormSubmit()
        openConfirmPopUp();
        setIsModalOpen();
      }else if (response?.data?.statusCode === 121 || response?.data?.statusCode === 144) {
        setOpenloader(false)
        message.error(response?.data?.data);
      }
      
    } catch (error) {
      setOpenloader(false)
      if (error?.response?.data?.statusCode === 1) {
        setOpenloader(false)
        message.error(error?.response?.data?.data);
      }
    }
};

const onLogin = async () => {
  setOpenloader(true)
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
          // referedBy: referedBy,
        };
        const headers = {
          ciphertext,
          authorization: null,
          "Content-Type": "application/json",
        };
        const response = await axios.post(Url, requestBody, { headers });
        // setLoader(false);
        if (response?.data?.statusCode === -1) {
          setOpenloader(false)
          message.success(response?.data?.data?.message);
          // setButtonState(buttonEnable);
          dispatch(actions.storeAgentONBoardForm(response?.data?.data));
          showModal();
        }else{
          setOpenloader(false)
        }
        
      } catch (error) {
        setOpenloader(false)
        if (error?.response?.data?.statusCode === 1) {
          setOpenloader(false)
          message.error(error?.response?.data?.data);
        }
      }
  }
};


const onclickRegisterPage = () =>{
  // const dataD = {
  //   registerD: true
  // };
  // if (data?.register === true ) {
    history.push({
      pathname: '/agent-form', // Specify the destination route
      // state: { dataD } 
    });
  // }else{
    // history.push({
    //   pathname: '/agent-form',
    // });
  // }
  
}


  return (
    <>
      <LoginHeader />
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className="agent_login_wrapper">
        <div className="agent_login new_agent">
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
                <div className="login_card" style={{marginTop: '5rem'}}>
                  {!isRegistration ? (
                    <Card
                      className="login_box"
                      headStyle={{ textAlign: "center" }}
                      bordered={false}
                    >
                      <div className="form_content_wrap">
                        {/* <div className="text-center login_logo">
                          <img
                            src={logobar}
                            alt="Ios install Logo"
                            //   style={{ height: 32, width: 32, marginBottom: 8 }}
                          />
                        </div> */}
                        <div className="login_header_text">
                          <div className="heading">Check Application Status</div>
                          <div className="otp_description">
                            Please enter the mobile number you used during registration to check your status.
                          </div>
                        </div>

                        <Form.Item
                          {...formItemLayout}
                          name="phoneNumber"
                          label="Mobile Number"
                          style={{ fontWeight: "bold" }}
                          rules={[
                            {
                              required: true,
                              message: "Mobile No is required",
                            },
                            {
                              message:
                                "Mobile Number should be 10 digits and start with 9 Only",
                              // pattern: new RegExp(/^[6-9][0-9]{9}$/),
                              pattern: new RegExp(/^[0-9]{9,11}$/),
      
                            },
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter mobile number"
                            //   prefix={<UserOutlined />}
                            type="text"
                            value={phoneNumber}
                            maxLength='10'
                            pattern="\d{10}"
                            name="phoneNumber"
                            onChange={(e) => onChangeMobileNumber(e)}
                            style={{ borderRadius: "4px" }}
                            onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
                          />
                          
                        </Form.Item>

                        <Button
                          type="primary"
                          block
                          size="large"
                          htmlType="submit"
                          className="get_otp_btn1"
                        >
                          Get OTP
                        </Button>
                      </div>
                      {/* <p className="forgotPassword">
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
                      </p> */}
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
                          <div className="welcome">Welcome!</div>
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
                          className="data_checked"
                        >
                          Data Privacy Consent
                        </Checkbox>

                    <div className="button_group">
                    <Button
                          block
                          size="large"
                          htmlType="cancel"
                          onClick={cancelIsregistration}
                          className="cancel_btn"
                        >
                          Cancel
                        </Button>

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
                          onClick={onclickRegisterPage}
                        >
                          Register
                        </Button>
                        
                    </div>
                        
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
            circumstances:<br /> a) As necessary for the proper execution of process
            related to the company; <br /> b) The use or disclosure is reasonably
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
                We have sent you one time verification code on this number +63
                {mobileNumber}.
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
                  //     "We have sent you one time verification code on this number +63 9867123420."
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
