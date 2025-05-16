import React, { useEffect, useState, createRef, useRef } from "react";
import "./AgentForm.css";
import { agentOnbordingRegistration } from "../../../../store/actions/auth";
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
  CheckCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import AddBoxIcon from "@material-ui/icons/AddBox";
import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import { Link } from "react-router-dom";
import * as actions from "../../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import loginLogo from "../../../../images/onnanepocicon.png";
// import apiConfig from "../../config/api.config";
import apiConfig from "../../../../config/api.config";
import axios from "axios";
import { stoageSetter } from "../../../../helpers";
import { width } from "@mui/system";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";
import DottedOTPInput from "../../../OTPInput/DottedOTPInput";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import bgloginimage from "../../../../images/oona-ph-bg.png";
import logoIos from "../../../../images/pwaIOs.png";
import logobar from "../../../../images/header_img/agent-login-logo.png";
import kahoona from "../../../../images/kahoona.png";
import { wrap } from "lodash";
import rootIndex from "../../../../store/root_index";
import AgentLoginOtpInput from "../OTPInputBox/AgentLoginOtpInput";
import ProgressLine from "./ProgressLine";
// import { dispatch } from "rxjs/internal/observable/pairs";

// import OfflineMessage from "../../OfflineMessageU";
const { baseURL, auth, secure, NODE_ENV, ProjectLink } = apiConfig;
const loginfromLink = null;
var otpclrarvariable = false;
var otptimer = 10;

const btnEnable = {
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",
  background: "#1d428a",
  border: "1px solid #1d428a",
  boxShadow: "0px 2px 0px rgba(0, 0, 0, 0.043)",
  borderRadius: "12px",
  padding: "0px 20px",
  color: "#fff",
  width: "100%",
  height: "48px",
};

const btnDisable = {
  borderRadius: "12px",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",
  background: "#626262",
  border: "none",
  color: "#fff",
  width: "100%",
  height: "48px",
  padding: "0px 20px",
};

const btnDisabledfg = {
  borderRadius: "12px",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",
  background: "black",
  border: "none",
  color: "#fff",
  width: "100%",
  height: "48px",
  padding: "0px 20px",
};

const AgentForm = ({ location }) => {
  // const { dataD } = location?.state;
  // console.log("props---ddddddddddd", dataD?.registerD);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isEmailEntered,setIsEmailEntered] = useState(false)
  console.log("name=========", name);
  const [buttonDisable, setButtonDisable] = useState(btnDisable);
  const [buttonEnable, setButtonEnable] = useState(btnEnable);
  const [buttonState, setButtonState] = useState(buttonDisable);
  const [timerstart, setTimerstart] = useState("60");
  const [showTimer, setShowTimer] = useState(false);
  const [EnteredOTP, setEnteredOTP] = useState("");
  const [openloader, setOpenloader] = useState(false);
  const [num, setNum] = useState('');
  const childRef = useRef();
  const [agentForm, setAgentForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  console.log('EnteredOTP', EnteredOTP)

  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  const [disableButton, setDisableButton] = useState("")
  const { store } = rootIndex;
  const _store = store.getState();

  const registerlogin = useSelector((state) => state?.GetAgentCypherStore);

  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  console.log("newstore store from cypher", cypherStore);
  let currentURL = window.location.href.split('agent-form/')[0];
  const referLinkBase = currentURL + "/app/agent-login-new/" + cypherStore
  const parts = referLinkBase.split('/');
  // Filter out "agent-form" from the parts array
  const filteredParts = parts.filter(part => part !== "agent-form");
  // Join the filtered parts back together with '/'
  const newUrl = filteredParts.join('/');
  console.log("newUrl", newUrl);

  const mobileNumber = useSelector((state) => state?.agentOnBoardingRegister?.Loging_Mobile);
  const [completeMessPop, setCompleteMessPop] = useState(false);
  const referalLinkBind = useSelector((state) => state?.cipherStore?.SaveCipherTEXT?.formData?.data?.agentName);
  const referalLinkBindghjhg = useSelector((state) => state?.cipherStore);
  console.log("referalLinkBindghjhg-------", referalLinkBindghjhg);

  const [referValue, setreferValue] = useState(registerlogin?.registerKey === "" ? "1101" : referalLinkBind)


  const changeReferalCode = (e) => {
    setreferValue(e.target.value)
  }

  const handleVerify = async () => {
    setOpenloader(true);
    setEnteredOTP("")

    if (agentForm.phone_number) {
      setIsPhoneNumberEntered(true);
    }

    if(agentForm?.email){
      setIsEmailEntered(true)
    }

    if (agentForm.email === "") {
      message.error("Please enter email address");
      setIsPhoneNumberEntered(false);
      setIsEmailEntered(false)
      setOpenloader(false);
    } 
    // else if (agentForm.phone_number.length < 11) {
    //   message.error("Please enter valid phone Number");
    // } 
    else {
      try {
        // setLoader(true);
        const Url = `${baseURL}auth/agent/verifyMobileNumber`;
        const requestBody = {
          mobileNumber: agentForm.phone_number,
          email : agentForm.email
          // referedby: "64945a044539b9717d5e6c4e",
        };

        const headers = {
          authorization: null,
          "Content-Type": "application/json",
        };

        if (registerlogin?.registerKey !== "") {
          headers.ciphertext = cypherStore;
        }
        const response = await axios.post(Url, requestBody, { headers });
        // setLoader(false);

        if (response?.data?.statusCode === -1) {
          setOpenloader(false);
          message.success(response?.data?.data);
          // setButtonState(buttonEnable);
          setEnteredOTP("")
          showModal();
          } else {
          setOpenloader(false);
        }

      } catch (error) {
        setOpenloader(false);
        if (error?.response?.data?.statusCode === 1) {
          setOpenloader(false);
          message.error(error?.response?.data?.data);
        } else {
          setOpenloader(false);
        }
      }
    }
  };

  const openConfirmPopUp = () => {
    console.log("moddel----fgconfirm");
    setCompleteMessPop(true);
  };
  const cancelConfirmPopUp = () => {
    console.log("moddel----fgcancle");
    setCompleteMessPop(false);
  };
  // verify mobile modal start
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {

    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    console.log("moddel----fgcancle");
    childRef.current.childFunction();
    setIsModalOpen(false);
  };


  const handlePhoneNumberChange = (e) => {
    // phoneNumber.includes('9') && 
    e.preventDefault();
    const phoneNumber = e.target.value.slice(0, 11);
    dispatch(actions.LoginMobileNumber(phoneNumber))
    setAgentForm((prev) => ({
      ...prev,
      phone_number: phoneNumber,
    }));

    if (phoneNumber.length === 11) {
      setIsPhoneNumberEntered(true);
      // setName('VERIFY');
    } else {
      setIsPhoneNumberEntered(false);
      // setName('');
    }
  }

  const handleEmailChange = (e) => {
    // phoneNumber.includes('9') && 
    // e.preventDefault();
    setAgentForm((prev) => ({
      ...prev,
      email: e.target.value,
    })
  )
 
    if (checkEmailFormat(e.target.value)) {
      setIsEmailEntered(true)
      setName('VERIFY');
    } else {
      setIsEmailEntered(false)
      setName('');
    }
  }

 

  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };


  // verify mobile modal end

  // verfy mobile number otp fun
  const submitOtp = async () => {
    setOpenloader(true);
    try {
      // setLoader(true);
      const Url = `${baseURL}auth/agent/register/match-otp`;
      const requestBody = {
        mobileNumber: agentForm.phone_number,
        email:agentForm.email,
        smsOtp: EnteredOTP,
        otptype: "Verify",
        link: `${apiConfig?.ProjectLink}/app/agent-login-new/`
      };
      const headers = {
        authorization: null,
        "Content-Type": "application/json",
      };

      if (registerlogin?.registerKey !== "") {
        headers.ciphertext = cypherStore;
      }

      const response = await axios.post(Url, requestBody, { headers });
      // setLoader(false);
      if (response?.data?.statusCode === -1) {
        setOpenloader(false);

        setTimeout(() => {
          cancelConfirmPopUp();
          setName("VERIFIED");
        }, 3000);
        if (EnteredOTP !== "" && EnteredOTP.length === 4) {
          setOpenloader(false);
          openConfirmPopUp();
          setIsModalOpen(false);
          message.success(response?.data?.data?.data);
        } else {
          setOpenloader(false);
          setIsModalOpen(true);
          message.error("Please Enter Correct OTP")
        }


      } else if (response?.data?.statusCode === 121) {
        setEnteredOTP("")
        setOpenloader(false);
        message.error(response?.data?.data);
      } else if (response?.data?.statusCode === 144) {
        setIsModalOpen(true);
        setEnteredOTP("")
        setOpenloader(false);
        message.error(response?.data?.data);
      } else if (response?.data?.statusCode === 770) {
        setOpenloader(false);
        setEnteredOTP("")
        setIsModalOpen(true);
        message.error(response?.data?.data);
      } else {
        setOpenloader(false);
      }

    } catch (error) {
      setOpenloader(false);
      if (error?.response?.data?.statusCode === 1) {
        setOpenloader(false);
        message.error(error?.response?.data?.data);
      } else {
        setOpenloader(false);
      }
    }
  };

  // Event handler for handling pressing the Enter key
  const handleKeyPress = (event) => {
    console.log("fdfghjkl;", event);
    if (event.key === 'Enter') {
      submitOtp(event);
    }
  };

  // handle otp
  const handleOTPChange = (e) => {
    // setOtpValue(e.target.value);
    setEnteredOTP(e);
    console.log("event===>", e);
  };
  // resend otp
  const resendOTP = () => {
    handleVerify();
    setShowTimer(true)
    console.log("Call Resend OTP funstion here");
    otptimer = 10;
  };


  // ============== submit form =====================
  const handleSubmitApplication = async () => {

    setOpenloader(true);
    try {
      // setLoader(true);
      const Url = `${baseURL}auth/agent/register`;
      const requestBody = {
        firstName: agentForm.first_name,
        middleName: agentForm.middle_name,
        lastName: agentForm.last_name,
        email: agentForm.email,
        mobileNumber: agentForm.phone_number,
        ReferalCode: referValue,
        isReferral: registerlogin?.registerKey === "" ? false : true
      };
      console.log("requestBody", requestBody);

      const headers = {
        authorization: null,
        "Content-Type": "application/json",
      };

      if (registerlogin?.registerKey !== "") {
        headers.ciphertext = cypherStore;
      }

      const response = await axios.post(Url, requestBody, { headers });
      // setLoader(false);
      if (response?.data?.statusCode === -1) {
        setOpenloader(false);
        message.success(response?.data?.data?.message);
        dispatch(actions.resetLicencseAfiliateForm({}));
        history.push("/create-account")
        let wholeRespose = { ...requestBody, ...response?.data?.data }
        dispatch(actions.storeAgentONBoardForm(wholeRespose));
      } else {
        setOpenloader(false);
      }

    } catch (error) {
      setOpenloader(false);
      if (error?.response?.data?.statusCode === 1) {
        setOpenloader(false);
        setDisableButton("exists")
        setName('VERIFY')
        setEnteredOTP("")
        message.error(error?.response?.data?.data);
      } else {
        setOpenloader(false);
      }
    }
  };


  const isValidPhoneNumber = (phoneNumber) => /^[6789]/.test(phoneNumber);
 const  checknmberstart = (agentForm) =>{
  if (isValidPhoneNumber(agentForm?.phone_number)) {
    return true;
  } else {
    return false;
  }
 } 

 const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

const checkEmailFormat = (agentForm) => {
  return isValidEmail(agentForm);
};




  return (
    <>
      <FullPageLoader fromapploader={openloader} />
      {/* <LoginHeader /> */}
      {/* {ProjectLink.includes("dev") === true || ProjectLink.includes("uat") === true ? (
        <div className="newFile">
          <OfflineMessage />
        </div>
  
      ) : null} */}
      {/* <div className="newFile">
        <OfflineMessage />
      </div> */}

      <div className="agent_form">
        <LoginHeader />
        <Row className="m-auto">
          <Col className="m-auto" xs={24} sm={24} md={24} lg={22} xl={22}>
            <div className="main_container">
              <div className="title_wrapper">
                <div className="subheader d-block d-md-none">
                  <div className="register-yourself">Register yourself</div>
                </div>
                <ProgressLine width={13} percent={40} />
                <div className="component-29">
                  <div className="ellipse-parent">
                    <div className="frame-child"></div>
                    <div className="div">1</div>
                  </div>
                  <div className="mobile-verification d-block d-md-none">
                    Registration form
                  </div>
                  <div className="ellipse-parent">
                    <div className="frame-item"></div>
                    <div className="div">2</div>
                  </div>
                  <div className="ellipse-parent">
                    <div className="frame-item"></div>
                    <div className="div">3</div>
                  </div>
                </div>
                <div className="desktop-verification d-none d-md-block">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <div className="account_form_header">Registration form</div>
                    <div className="account_form_header">ACCOUNT FORM</div>
                    <div className="account_form_header">

                      APPLICATION STATUS
                    </div>
                  </div>
                </div>
              </div>
              <div className="form_wrapper">
                <Row
                  gutter={[16, 16]}
                // style={{ marginLeft: "0px", marginRight: "0px", height: "100vh" }}
                >
                  <Col
                    className="login_card_column"
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                  >
                    <div className="desktop-register-yourself d-none d-md-block">
                      Register yourself
                    </div>
                    <div className="new-agentmitra-registration-f-parent">
                      <div className="new-agentmitra-registration">
                        New Agent Registration Form
                      </div>
                      <div className="to-know-you">
                        To know you better, fill out this form to complete your
                        registration. Your details will be saved to your
                        account.
                      </div>
                    </div>
                    {/* <Form className="form_wrapper" form={form}>
             
    </Form> */}
                    <Form
                      form={form}
                      name="form_item_path"
                      layout="vertical"
                      className="mb-3"
                      onFinish={handleSubmitApplication}
                      fields={[
                        {
                          name: ["referValue"],
                          value: referValue,
                        },
                      ]}
                    >
                      <Row
                        className="align-item-stretch"
                        style={{ marginTop: "24px" }}
                        gutter={[16, { xs: 16, sm: 10, md: 16, lg: 16 }]}
                      >
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="First Name"
                            name="first_name"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter first name",
                              },
                              {
                                validator: (_, value) => {
                                  const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ .'-]+$/;

                                  if (!validPattern.test(value)) {
                                    return Promise.reject(
                                      "Numeric are not allowed."
                                    );
                                  }

                                  return Promise.resolve();
                                },
                              }
                            ]}
                          // value={filterData.certificate_number}
                          >
                            <Input
                              size="large"
                              placeholder="Enter first name"
                              name="first_name"
                              value={agentForm.first_name}
                              onInput={toInputUppercase}
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  first_name: e.target.value,
                                }))
                              }
                              maxLength='50'
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Middle Name"
                            name="middle_name"
                            rules={agentForm.middle_name !== "" ?
                              [
                                {
                                  required: false,
                                  whitespace: true,
                                  message: "Please Enter middle name",
                                },
                                {
                                  message: "Numeric are not allowed.",
                                  // pattern: new RegExp(/^[6-9][0-9]{9}$/),
                                  pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ .'-]+$/),

                                },
                                // {
                                //   validator: (_, value) => {
                                //     console.log("value---", value);
                                //     const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
                                //     if (condition) {

                                //     } else {

                                //     }

                                //     if (!validPattern.test(value)) {
                                //       return Promise.reject(
                                //         "Numeric and Special characters are not allowed."
                                //       );
                                //     }

                                //     return Promise.resolve();
                                //   },
                                // }
                              ]
                              : ""}
                          >
                            <Input
                              size="large"
                              placeholder="Enter middle name"
                              name="middle_name"
                              onInput={toInputUppercase}
                              value={agentForm.middle_name}
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  middle_name: e.target.value,

                                }))
                              }
                              maxLength='50'
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Last Name"
                            name="last_name"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter last name",
                              },
                              {
                                validator: (_, value) => {
                                  const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ .'-]+$/;

                                  if (!validPattern.test(value)) {
                                    return Promise.reject(
                                      "Numeric are not allowed."
                                    );
                                  }

                                  return Promise.resolve();
                                },
                              }
                            ]}
                          //value={filterData.customer_name}
                          >
                            <Input
                              size="large"
                              placeholder="Enter last name"
                              name="last_name"
                              onInput={toInputUppercase}
                              value={agentForm.last_name}
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  last_name: e.target.value,
                                }))
                              }
                              maxLength='50'
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Email Address"
                            name="email_address"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Email address",
                              },
                              {
                                pattern:
                                /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,

                                message: "Please Enter Valid Email Address",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter email address"
                              name="email"
                              value={agentForm.email}
                              // suffix={
                              //   isEmailEntered ? (
                              //     <text
                              //       style={{
                              //         letterSpacing: "0.5px",
                              //         fontWeight: 500,
                              //         color: "#4ac6bb",
                              //         cursor: "pointer",
                              //       }}
                              //       onClick={name === "VERIFIED" ? undefined : handleVerify}
                              //     >
                              //       {name}
                              //     </text>
                              //   ) : null
                              // }
                              suffix={
                                    // isEmailEntered ? (
                                      <span
                                        style={{
                                          letterSpacing: "0.5px",
                                          fontWeight: 500,
                                          color: "#4ac6bb",
                                          cursor: name === "VERIFIED" ? "default" : "pointer",
                                        }}
                                        onClick={name === "VERIFIED" ? undefined : handleVerify}
                                      >
                                        {name}
                                      </span>
                                    // ) : null
                                  }
                              disabled={disableButton !== "exists" && name === "VERIFIED"}
                              onChange={handleEmailChange}
                              maxLength='50'
                            />
                          </Form.Item>
                        </Col>


                        <Col xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                              label="Mobile Number"
                              name="phone_number"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Mobile number",
                                },
                                {
                                  pattern: new RegExp(/^[06789][0-9]{9,13}$/),
                                  message: "Mobile number must be 10 to 14 digits and start with 0, 6, 7, 8, or 9",
                                },
                                {
                                  min: 10,
                                  message: "Phone number must be at least 10 digits",
                                },
                                {
                                  max: 14,
                                  message: "Phone number cannot exceed 14 digits",
                                }
                              ]}
                            >
                              <Input
                                type="text"
                                maxLength={14}
                                size="large"
                                placeholder="Enter Mobile number"
                                name="phone_number"
                                value={agentForm?.phone_number}
                                onChange={handlePhoneNumberChange}
                                onKeyDown={(evt) => {
                                  if (!/[0-9]/.test(evt.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
                                    evt.preventDefault();
                                  }
                                }}
                              />
                            </Form.Item>
                          </Col>


                        {/* {registerlogin?.registerKey !== "" ? <>
                          <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Referral Name"
                            name="referValue"
                            rules={registerlogin?.registerKey === "" ? "" : [
                              {
                                required: true,
                                message: "Please Enter Referral Name",
                              },
                            ]}
                              value={filterData.ProductCode}
                          >
                            <Input
                              size="large"
                              placeholder="Enter Referral Name"
                              value={referValue}
                              defaultValue={referValue}
                              onChange={changeReferalCode}
                              disabled={referalLinkBind !== undefined ? true : false}

                              maxLength='60'
                            />
                          </Form.Item>
                          {registerlogin?.registerKey === "" ? "" : <>
                          <i className="a-referral-link">
                            A referral Name from Oona or an Agent/Affiliate is
                            required to continue registration
                          </i>
                          </>}
                          
                        </Col>
                        </> : ""} */}




                      </Row>
                      <Col xs={24} sm={24} md={24} lg={4}>
                        <div style={{ marginTop: 24 }}>
                          <Button
                            style={name === 'VERIFIED' ? buttonEnable : buttonState}
                            htmlType="submit"
                            className={`${name} === "VERIFIED" ` ? "" : "nextbtn"}
                            disabled={name === "VERIFIED" ? false : true}
                          >
                            Next <ArrowRightOutlined />
                          </Button>
                        </div>
                      </Col>
                    </Form>
                  </Col>

                  {/* <div className="addCard">
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>

                        <Card
                          bordered={false}
                          className="advertise-card"
                          title="FREE TO BE ME"
                        >
                          <p>
                            We now offer travel insurance coverage options for
                            worry-free travels to major destinations - now with Covid-19
                            coverage!
                          </p>
                        </Card>

                    </Col>
                    </div> */}
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Modal
        width={320}
        className="verify_mobile_modal"
        title="Verify Email Address"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        borderRadius={8}
        bordered={false}
        footer={null}
      >
        <div className="enter-the-otp-container">
          <span>Enter the OTP that has been sent to </span>
          <span className="span">{mobileNumber}</span>
          <span> complete email address confirmation.</span>
        </div>

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
      </Modal>


      <Modal
        width={320}
        className="complete_mobile_verification"
        open={completeMessPop}
        onOk={false}
        closable={false}
        borderRadius={8}
        bordered={false}
        footer={null}
      >
        <div style={{ textAlign: "center" }}>
          <div className="success-icon">
            <CheckCircleOutlined
              className="animated-icon"
              style={{ color: "green", fontSize: "100px" }}
            />
          </div>
          <div
            className="success_test"
            style={{ fontSize: 24, color: "#1d428a", marginBottom: 16 }}
          >
            Success!
          </div>
          <div style={{ fontSize: 16 }}>Email verification completed</div>
        </div>
      </Modal>
    </>
  );
};

export default AgentForm;
