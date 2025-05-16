import React, {useState, createRef, useRef } from "react";
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
import logobar from "../../../../images/logo_phillife.png";
import AgentLoginOtpInput from "../OTPInputBox/AgentLoginOtpInput";
import  checkListPdf from '../../../../images/Agency_Licensing_Checklist.pdf'
import * as actions from "../../../../store/actions";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";

var otpclrarvariable = false;
var otptimer = 10;

const AgentLogin = () => {
  const { baseURL } = apiConfig;
  
  const [completeMessPop, setCompleteMessPop] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("")
  const [form] = Form.useForm();
  
  const [EnteredOTP, setEnteredOTP] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [timerstart, setTimerstart] = useState("60");
  const [showTimer, setShowTimer] = useState(false);
  //const [loading, setLoading] = useState(false)
  // this is for the add to homescreen
  const [showButton, setShowButton] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  // let currentURL = window.location.href;
  
  // let index = currentURL.indexOf("agent-login-new/");
  let ciphertext = "";
  
  // if (index !== -1) {
  //   ciphertext = currentURL.substring(index + "agent-login-new/".length);
  //   dispatch(actions.GetAgentCypherStore(ciphertext))
  // }
  // otp usestate hooks
  const [openloader, setOpenloader] = useState(false);
  const [windowWidth, setWidth] = useState(window.innerWidth);

  // is registration
  const [isRegistration, setIsregistration] = useState(false);
  const [openModalPopConfirm, setOpenModalPopConfirm] = useState(false);
  const [accept, setAccept] = useState(false);
  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  const mobileNumber = useSelector((state) => state?.agentOnBoardingRegister?.Loging_Mobile);

  const agentLoginPayload = useSelector((state) => state?.agentOnBoardingRegister?.formData);
  
  const referedBy = agentLoginPayload?.referedBy
  const agent_ID = agentLoginPayload?.agentId

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
    setAccept(false);
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

  // this the hanlde click button

  // Auto by pass Code Ends Here
  // for the otp
  
  const childRef = useRef();

  // method for the otp
  const handleCancel = () => {
    otpclrarvariable = false;
    console.log("Im called")
    childRef.current.childFunction();
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
    onLogin();
    setShowTimer(true);
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
  // if (registerlogin?.registerKey !== "") {
  //   headerObject.
  // }
  /**
   * Submits the account form by fetching agent details and redirecting based on the status.
   * 
   * @async
   * @function AccountFormSubmit
   * @throws {Error} If there's an issue with the API call
   */
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

        console.log("response===>>",response)
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

  // Test cases:
  // 1. Test with aobStatus "Returned" and QCshouldEmpty.length = 0
  // 2. Test with aobStatus "UnderReview" and QCshouldEmpty.length > 0
  // 3. Test with aobStatus "Approved"
  // 4. Test with aobStatus "Endorsed"
  // 5. Test with aobStatus "OnTraining"
  // 6. Test with aobStatus "TrainingCompleted"
  // 7. Test with aobStatus "Pending" (should redirect to create-account)
  // 8. Test with API error (should set openloader to false)

  const submitOtp = async () => {
    setOpenloader(true)
    try {
      // setLoader(true);
      const Url = `${baseURL}auth/agent/registerd-agent/match/otp`;
      const requestBody = {
        aobEmailAddress: phoneNumber,
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
        console.log("response===>>",response)
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
          aobEmailAddress: phoneNumber,
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
    history.push({
      pathname: '/agent-form', // Specify the destination route
      // state: { dataD } 
    });
}


  return (
    <>
      <LoginHeader />
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
                          <div className="heading">Login</div>
                          <div className="otp_description">
                            We will send you the verification code on this Email
                          </div>
                        </div>

                        <Form.Item
                          {...formItemLayout}
                          name="phoneNumber"
                          label="Email Address"
                          style={{ fontWeight: "bold" }}
                          rules={[
                            {
                              required: true,
                              message: "Email is required",
                            },
                            {
                              message: "Enter a valid email address",
                              pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
                            }
                          ]}
                        >
                          <Input
                            size="large"
                            placeholder="Enter Email Address"
                            //   prefix={<UserOutlined />}
                            type="text"
                            value={phoneNumber}
                            maxLength='60'
                            // pattern="\d{10}"
                            name="phoneNumber"
                            onChange={(e) => onChangeMobileNumber(e)}
                            style={{ borderRadius: "4px" }}
                            onKeyDown={(evt) => ["+",].includes(evt.key) && evt.preventDefault()}
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
                          Register
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
                        {/* <div className="text-center login_logo">
                          <img
                            src={logobar}
                            alt="Ios install Logo"
                            //   style={{ height: 32, width: 32, marginBottom: 8 }}
                          />
                        </div> */}
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
                          {/* <span className="png_jpeg">
                            ( .PNG or .JPG format )
                          </span> */}
                        </div>
                        <div className="otp_description">
                            Agency Licensing Checklist{" "}
                            <a href={checkListPdf} target="_blank" rel="noreferrer" style={{textDecoration: "underline !important"}}>
                                Download 
                            </a>{""}
                          </div>
                        
                        {/* <ul className="list-inline">
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
                        </ul> */}
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
          PhilLife Financial Agent Data Privacy Statement and Consent
          to Process Personal and Sensitive Personal Information
          (PhilLife Financial Data Privacy Policy updated on March 5, 2025)
          <br /> I hereby explicitly and unambiguously consent to the collection, use, and transfer, in electronic or other
              form, of my personal data as described in this Application for affiliation as a life insurance agent
              (“Application”) by Philippine Life Financial Assurance Corporation (“PhilLife”) for the exclusive purpose
              of implementing, administering, and managing my Application in PhilLife (the “Principal”). 
              <br /> I understand that by disclosing my personal data to the Principal, PhilLife holds certain personal
              information about me, including, but not limited to, my name, home address and telephone number, date of
              birth, email address, family size, marital status, sex, beneficiary information, emergency contacts,
              passport/visa information, age, language skills, driver’s license information, nationality, C.V. (or resume),
              wage history, employment references, Social Security System (SSS) number, Pag-Ibig number, Tax
              Identification Number (TIN) or other identification number, salary, job title, employment or severance
              contract, current wage and benefit information, personal bank account number, plan or benefit enrollment
              forms and elections when applicable, for purpose of managing and administering my appointment as agent
              in PhilLife (“Data”).
              <br />
              I understand that Data may be transferred to any third parties assisting PhilLife in the implementation,
              administration, and management of my assignment (e.g., payroll administrators, disbursing bank), that these
              recipients may be outside the Company. I understand that I may request a list with the names and addresses
              of any potential recipients of the Data by contacting the Company’s Agency Licensing Department. I
              authorize the recipients to receive, possess, use, retain and transfer the Data, in electronic or other form, for
              implementing, administering, and managing my agency.
              <br />
              I understand that Data will be held by PhilLife only as long as it is necessary to implement, administer and
              manage my agency with PhilLife. I understand that I may, at any time, view Data, request additional
              information about the storage and processing of Data, require any necessary amendments to Data or refuse
              or withdraw the consents herein, in any case without cost, by contacting in writing the PhilLife’s Agency
              Licensing Department. I understand, however, that refusing or withdrawing my consent may affect my
              application with PhilLife. For more information on the consequences of refusal to consent or withdrawal
              of consent, I am informed and understand that I may contact the Company’s Agency Licensing Department.
              I acknowledge that I have read, understood, and hereby agree to this PhilLife Financial Data Privacy
              Statement described above, pursuant to the Data Privacy Act of 2012, its implementing rules, regulations,
              circulars, and issuances by the National Privacy Commission (“Privacy Laws”).
              I represent and warrant those consents required under the Privacy Law were obtained from other individuals
              whose Personal Data I have shared to PhilLife whenever necessary during my agency contract with
              PhilLife.
              <br />
              Signed on the date of registration of this Application at the principal office PhilLife Financial, and by
              electronic means using my login credentials registered in PhilLife’s Sales Drive app.
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
              className="text-center mb-2"
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
            >
              <div className="text_otp_verification mb-2">OTP Verification</div>
              <div className="message">
                We have sent you one time verification code on Entered Email 
                {mobileNumber}.
                <a onClick={handleCancel} className="change_number" href="#">
                  CHANGE
                </a>
              </div>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              {/* <div> */}
                <AgentLoginOtpInput
                  cleardata={isModalOpen}
                  customTextWithResend={showTimer ? false : true}
                  btn_text="Verify & Proceed"
                  ref={childRef}
                  timers={timerstart}
                  length={4}
                  onChange={handleOTPChange}
                  //   Messagetext={
                  //     "We have sent you one time verification code on this number +63 9867123420."
                  //   }
                  onResend={() => resendOTP()}
                  verifyOtp={() => submitOtp()}
                  showTimer={showTimer}
                />
              {/* </div> */}
            </Col>
          </Row>
        </Modal>

      </div>
    </>
  );
};

export default AgentLogin;
