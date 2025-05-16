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
  background: "#1D428A",
  border: "1px solid #1D428A",
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
  background: "#686868",
  border: "none",
  color: "#fff",
  width: "100%",
  height: "48px",
  padding: "0px 20px",
};
const AgentForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  console.log("name=========", name);
  const [buttonDisable, setButtonDisable] = useState(btnDisable);
  const [buttonEnable, setButtonEnable] = useState(btnEnable);
  const [buttonState, setButtonState] = useState(buttonDisable);
  const [timerstart, setTimerstart] = useState("60");
  const [EnteredOTP, setEnteredOTP] = useState("");
  const childRef = useRef();
  const [agentForm, setAgentForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  console.log('hdkjove',agentForm.phone_number)

  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  const { store } = rootIndex;
  const _store = store.getState();
  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  console.log("newstore store from cypher", cypherStore);
  const [completeMessPop, setCompleteMessPop] = useState(false);


  const handleVerify = async () => {
    if (agentForm.phone_number) {
      setIsPhoneNumberEntered(true);
    }

    if (agentForm.phone_number === "") {
      message.error("Please enter phone Number");
      setIsPhoneNumberEntered(false);
    } else if (agentForm.phone_number.length < 10) {
      message.error("Please enter valid phone Number");
    }  else {
        try {
          // setLoader(true);
          const Url = `${baseURL}auth/agent/verifyMobileNumber`;
          const requestBody = {
            mobileNumber: agentForm.phone_number,
            referedby: "64945a044539b9717d5e6c4e",
          };
          const headers = {
            ciphertext: cypherStore,
            authorization: null,
            "Content-Type": "application/json",
          };
          const response = await axios.post(Url, requestBody, { headers });
          // setLoader(false);
          
          if (response?.data?.statusCode === -1) {
            message.success(response?.data?.data);
            setButtonState(buttonEnable);
            showModal();
          }
          
        } catch (error) {
          if (error?.response?.data?.statusCode === 1) {
            message.error(error?.response?.data?.data);
          }
        }
    }
  };
  
  const openConfirmPopUp = () => {
    setCompleteMessPop(true);
  };
  const cancelConfirmPopUp = () => {
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
    setIsModalOpen(false);
  };

  const handlePhoneNumberChange = (e) => {
    e.preventDefault();
    const phoneNumber = e.target.value;
    
    setAgentForm((prev) => ({
      ...prev,
      phone_number: phoneNumber,
    }));

    if (phoneNumber.length === 10) {
      setIsPhoneNumberEntered(true);
      setName('VERIFY');
    }  else {
      setIsPhoneNumberEntered(false);
      setName(''); 
    }
  }

  
  // verify mobile modal end
  // verfy mobile number otp fun
  const submitOtp = async () => {
      try {
        // setLoader(true);
        const Url = `${baseURL}auth/agent/verifyMobileNumber`;
        const requestBody = {
          mobileNumber: agentForm.phone_number,
          smsOtp: EnteredOTP,
          otptype: "Verify",
          user_id: "642e6670a0d8c64b6996a8f1",
          referedby: "64945a044539b9717d5e6c4e",
        };
        const headers = {
          ciphertext: cypherStore,
          authorization: null,
          "Content-Type": "application/json",
        };
        const response = await axios.post(Url, requestBody, { headers });
        // setLoader(false);
        if (response?.data?.statusCode === -1) {
          console.log("hjklkghjkl",  response.data.message);
          message.success(response?.data?.data);
          setTimeout(() => {
            cancelConfirmPopUp();
            setName("VERIFIED");
          }, 3000);
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
    console.log("Call Resend OTP funstion here");
    otptimer = 10;
  };

  
// ============== submit form =====================
  const handleSubmitApplication = async () => {
  
    try {
      // setLoader(true);
      const Url = `${baseURL}auth/agent/register`;
      const requestBody = {
          firstName: agentForm.first_name,
          middleName: agentForm.middle_name,
          lastName: agentForm.last_name,
          email: agentForm.email,
          mobileNumber: agentForm.phone_number
      };
      const headers = {
        ciphertext: cypherStore,
        authorization: null,
        "Content-Type": "application/json",
      };
      const response = await axios.post(Url, requestBody, { headers });
      // setLoader(false);
      if (response?.data?.statusCode === -1) {
        message.success(response?.data?.data?.message);
        history.push("/create-account")
      }
      dispatch(actions.storeAgentONBoardForm(response?.data?.data));
      
    } catch (error) {
      console.log("errorresponse", error?.response);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };


  return (
    <>
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
                    <div className="account_form_header">CREATE ACCOUNT</div>
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
                        New Agent/mitra Registration form
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
                                  const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
        
                                  if (!validPattern.test(value)) {
                                    return Promise.reject(
                                      "Numeric and Special characters are not allowed."
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
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  first_name: e.target.value,
                                }))
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Middle Name"
                            name="middle_name"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter middle name",
                              },
                              {
                                validator: (_, value) => {
                                  const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
        
                                  if (!validPattern.test(value)) {
                                    return Promise.reject(
                                      "Numeric and Special characters are not allowed."
                                    );
                                  }
        
                                  return Promise.resolve();
                                },
                              }
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter middle name"
                              name="middle_name"
                              value={agentForm.middle_name}
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  middle_name: e.target.value,
                                }))
                              }
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
                                  const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
        
                                  if (!validPattern.test(value)) {
                                    return Promise.reject(
                                      "Numeric and Special characters are not allowed."
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
                              value={agentForm.last_name}
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  last_name: e.target.value,
                                }))
                              }
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
                                message: "Please Email address",
                              },
                              {
                                pattern:
                                  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please Enter Valid Email Address",
                              },
                            ]}
                          >
                            <Input
                              size="large"
                              placeholder="Enter email address"
                              name="email"
                              value={agentForm.email}
                              onChange={(e) =>
                                setAgentForm((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Phone Number"
                            name="phone_number"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Phone number",
                              },
                              {
                                pattern: /^[0-9]+$/,
                                message: "Please Enter Valid Phone Number",
                              },
                            ]}
                            //   value={filterData.ProductCode}
                          >
                            <Input
                              type="number"
                              maxLength={10}
                              size="large"
                              placeholder="Enter phone number"
                              suffix={
                                isPhoneNumberEntered &&
                                (
                                  <a
                                  style={{
                                    letterSpacing: "0.5px",
                                    fontWeight: 500,
                                    color: "#4ac6bb",
                                    cursor: "pointer",
                                  }}
                                  
                                  onClick={name === "VERIFIED" ? "" : handleVerify}
                                  
                                >
                                  {name}
                                </a>
                                )
                              }
                              // onKeyDown={(evt) => { handleKeyPress(evt)}}
                              name="phone_number"
                              value={agentForm.phone_number}
                              onChange={handlePhoneNumberChange}
                              disabled={name === "VERIFIED" ? true : false}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Form.Item
                            label="Referal Link"
                            name="referal_link"
                            rules={[
                              {
                                required: false,
                                message: "Please Enter Referral link",
                              },
                            ]}
                            //   value={filterData.ProductCode}
                          >
                            <Input
                              size="large"
                              placeholder="Enter referal link"
                              // onChange={(e) =>
                              //   setFilterData((prev) => ({
                              //     ...prev,
                              //     ProductCode: e.target.value,
                              //   }))
                              // }
                            />
                          </Form.Item>
                          <i className="a-referral-link">
                            A referral link from FileLife or an Agent/Mitra is
                            required to continue registration
                          </i>
                        </Col>
                      </Row>
                      <Col xs={24} sm={24} md={24} lg={4}>
                        <div style={{ marginTop: 24 }}>
                          <Button
                            style={buttonState}
                            htmlType="submit"
                            className="nextbtn"
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
        title="Verify Mobile Number"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        borderRadius={8}
        bordered={false}
        footer={null}
      >
        <div className="enter-the-otp-container">
          <span>Enter the OTP that has been sent to </span>
          <span className="span">08991234567</span>
          <span> to complete phone number confirmation.</span>
        </div>

        <AgentLoginOtpInput
          className="agent_form"
          showTimer={true}
          cleardata={isModalOpen}
          ref={childRef}
          timers={timerstart}
          length={4}
          onChange={handleOTPChange}
          onResend={resendOTP}
          // onKeyPress={(evt) => { handleKeyPress(evt)}}
          verifyOtp={() => submitOtp()}
        />
        {/* <div class="resend-otp-in">Resend OTP in 50 seconds</div> */}
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
            style={{ fontSize: 24, color: "#1D428A", marginBottom: 16 }}
          >
            Success!
          </div>
          <div style={{ fontSize: 16 }}>Mobile verification completed</div>
        </div>
      </Modal>
    </>
  );
};

export default AgentForm;
