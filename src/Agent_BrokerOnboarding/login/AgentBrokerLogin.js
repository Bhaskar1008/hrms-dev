import React, { useEffect, useState, createRef, useRef } from "react";
import "../../components/Login/Login.css";
import { Card, Input, Button, Image, Form, message, Modal, Typography, Row, Col, Checkbox, DownloadOutlined, PlusOutlined } from "antd";
import { UserOutlined, KeyOutlined, ConsoleSqlOutlined, CloseOutlined } from "@ant-design/icons";
import AddBoxIcon from "@material-ui/icons/AddBox";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { stoageSetter } from "../../helpers";
// import LoginHeader from "../ICARE/LoginHeader/LoginHeader";
import LoginHeader from "../../components/ICARE/LoginHeader/LoginHeader";
import axiosRequest from "../../axios-request/request.methods"
// import DottedOTPInput from "../OTPInput/DottedOTPInput";
import DottedOTPInput from "../../components/OTPInput/DottedOTPInput";
import logoIos from "../../images/pwaIOs.png";
import OfflineMessage from "../../OfflineMessageU";
// import termsconditionpdf from "../../images/Main Agreement Terms and Conditions.pdf";
// import Privacypolicy from "../../images/PhilLife Privacy Policy.pdf";
import icare from "../../images/iCare_Official_Logo.png";
import apiConfig from "../../config/api.config";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
const { baseURL, auth, secure, NODE_ENV, ProjectLink } = apiConfig;
const loginfromLink = null;
var otpclrarvariable = false;
var otptimer = 10;
const { Title, Text } = Typography;

const AgentBrokerLogin = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOtp, setIsModalOtp] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [userObject, setUserObject] = useState(null);
  const [EnteredOTP, setEnteredOTP] = useState("");
  const [showloader, setShowloader] = useState(false);
  const [timerstart, setTimerstart] = useState("60");
  const [sloginData, setLoginData] = useState(null);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(0);

  // this is for the add to homescreen
  const [showButton, setShowButton] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const _LicUserId = searchParams.get("sdx");
  console.log("_LicUserId", _LicUserId);
  // console.log("searchParams", searchParams);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const agent_data = useSelector((state) => state.login.login_agent_data);
  // const userId =  useSelector((state) => state.login.user.id)

  const dispatch = useDispatch();
  const history = useHistory();
  // otp usestate hooks
  const [isChecked, setIsChecked] = useState(false);
  const [openloader, setOpenloader] = useState(false);
  const [windowWidth, setWidth] = useState(window.innerWidth);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const sendEmail = () => {
    window.open("mailto:PAOCTeam@phillife.com.ph");
  };
  // Handle OTP input (simplified for 3 fields)
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Limit to 1 character
    setOtp(newOtp);
    if (index < 3 && value) {
      document.getElementById(`otp-input-${index + 1}`).focus(); // Move focus to next field
    }
  };
  const handleOtpsend = () => {
    setIsOtpSend(true);
    // setPhoneNumber();
    setTimer(170); // 2:50 = 170 seconds
    // Simulate sending OTP (replace with actual API call)
    console.log("OTP sent to", phoneNumber);
    startTimer();
  };
  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
      if (timer === 0) clearInterval(interval);
    }, 1000);
  };

  // Format timer as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const [iosButton, setIosButton] = useState(false);

  useEffect(() => {
    if (_LicUserId === "true") {
      onLogin();
    }
  }, []);

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
      if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf("OPR")) != -1) {
        return "Opera";
      } else if (navigator.userAgent.indexOf("Edg") != -1) {
        return "Edge";
      } else if (navigator.userAgent.indexOf("Chrome") != -1) {
        return "Chrome";
      } else if (navigator.userAgent.indexOf("Safari") != -1) {
        return "Safari";
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        return "Firefox";
      } else if (navigator.userAgent.indexOf("MSIE") != -1 || !!document.documentMode == true) {
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
    if (getMobileOperatingSystem() === "iOS") {
      setIosButton(true);
      setIsOpen(true);
    }

    const handleResize = () => {
      setWidth(window.innerWidth);
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
      setDeferredPrompt(event);

      // Show the "Add to Home Screen" button
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);
  // this the hanlde click button
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        window.localStorage.setItem("appInstalled", "true");
        setShowButton(false);
      } else {
        // localStorage.removeItem('appInstalled');
      }
    }
  };

  const childRef = useRef();
  // method for the otp
  const handleCancel = () => {
    // setIsModalOpen(false);
    otpclrarvariable = false;
    setIsModalOtp(false);
  };
  const gotoAOBmodule = () => {
    history.push("/agent-login-new");
  };

  const handleOTPChange = (e) => {
    // setOtpValue(e.target.value);
    setEnteredOTP(e);
    console.log("event===>", e);
  };
  const resendOTP = () => {
    // console.log("Call Resend OTP funstion here");
    // otptimer = 10;
    onLogin();
  };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  let allOTP = "";

  const submitOtp = (data) => {
    setOpenloader(true);

    axios
      .post(baseURL + `auth/user/matchOtp`, {
        smsOtp: EnteredOTP,
        otptype: "LoginFlow",
        user_id: sloginData[0][0]._id,
      })
      .then((res, error) => {
        console.log("res.data.statusCode-----------------------", res);
        if (res.data.statusCode === -1) {
          let _loginData = [];
          // actions.multiChannelData()
          console.log("userObject--", sloginData);
          let _defaultChannel = sloginData[0];

          // .filter(
          //   (item, index) => item.setDefault === true
          // );
          _loginData.push(_defaultChannel, sloginData[1]);
          stoageSetter("multi_channel", sloginData[0]);
          dispatch(actions.loginSuccess(_loginData));
          dispatch(actions.multiChannelData(sloginData[0]));

          history.push("/iCare-Dashboard");
          message.success(res.data.data);

          otpclrarvariable = false;
          setIsModalOtp(false);
          setOpenloader(false);
        } else if (res.data.statusCode === 121) {
          setOpenloader(false);
          message.error(res.data.data);
        } else {
          setOpenloader(false);
        }
      })
      .catch((error) => {
        setOpenloader(false);
      });
  };

  const onLogin = () => {
    dispatch(actions.GetCustomerToken({}));
    //setLoading(true)
    setOpenloader(true);
    window.localStorage.clear();
    axios
      .post(baseURL + `auth/user/login`, {
        // email: _LicUserId === "true" ? "AG87310761" : '',
        email: email,
        password,
        otp_flow: true,
      })
      .then((res, error) => {
        if (res === undefined || res === null || res === "") {
          return;
        }
        if (res.status === 200) {
          //setLoading(false)
          // if (!res.ok) {
          //     message.error('Please check your internet connections');
          // } else {
          try {
            if (res.data.statusCode === -1) {
              console.log("res.data.statusCode", res.data.statusCode);
              let _loginData = [];
              let _defaultChannel = userObject[0];

              setOpenloader(false);
              _loginData.push(_defaultChannel, userObject[1]);
              stoageSetter("multi_channel", userObject[0]);
              dispatch(actions.loginSuccess(_loginData));
              dispatch(actions.multiChannelData(userObject[0]));
              history.push("/iCare-Dashboard");
            } else if (res.data.statusCode === 10609) {
              // if (_LicUserId === "true") {
              // history.push("/icare-Dashboard");
              otpclrarvariable = false;
              setIsModalOtp(true);
              setTimerstart("60");
              setUserObject(res.data.data);
              console.log("USER ID====>>", res.data.data[0][0]._id);
              setUserId(res.data.data[0][0]._id);
              childRef.current.childFunction();
              setOpenloader(false);
              setLoginData(res.data.data);
              // submitOtp(res.data.data);
              // }

              // 10609
            } else {
              // setLoading(false)
              message.error(res.data.data);
              setOpenloader(false);
            }
          } catch (err) {
            console.log(err);
            //  setLoading(false)
            setOpenloader(false);
          }
        }
      })
      .catch((error) => {
        // setLoading(false)
        setOpenloader(false);
        if (error?.response?.status === 400) {
          if (error?.response?.data?.statusCode === 1) message.error("Please Enter Correct User Credentials");
        }
      });
  };

  const buttonStyle = {
    borderRadius: 8,
    borderColor: "white",
    backgroundColor: "#000080",
    color: "white",
  };

  const modalTitleStyle = {
    background: "var(--primary-oona-purple, #1D428A)", // Set the background color to purple
    color: "white", // Set the text color to white
  };
  // background: var(--primary-oona-purple, #1D428A);

  const [isModalVisible, setIsModalVisible] = useState(true);
  const shareButtonIos = () => {
    setIsModalVisible(true);
    // if (navigator.share) {
    //   navigator
    //     .share({
    //       title: "kahoona.dev",
    //       text: "Check out kahoona.",
    //       url: "https://kahoona-dev.salesdrive.app/login",
    //     })
    //     .then(() => console.log("Successful share"))
    //     .catch((error) => console.log("Error sharing", error));
    // }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible(false);
  };

  const verifyLogin = async (values) => {
    try {
      const payload = {
        mobileNumber: values.mobile,
        email: "",
      };

      const response = await axiosRequest.post(
        "agent/verifyMobileNumber",
        payload,
        { secure: false }
      );

      if (response.statusCode === -1) {
        message.success("Verification successful!");
        handleOtpsend()
      } else {
        message.error(response.errMsg || "Verification failed");
      }
    } catch (err) {
      message.error("Verification failed");
      console.error(err);
    }
  };

  const verifyOTP = async () => {
    try {
      const payload = {
        mobileNumber: phoneNumber,
        email: "",
        smsOtp: otp.join(""),
        otptype: "Verify",
        link: "https://ihc-dev-node.salesdrive.app/app/agent-login-new/"
      };

      const response = await axiosRequest.post(
        "agent/register/match-otp",
        payload,
        { secure: false }
      );

      if (response.statusCode === -1) {
        message.success("OTP verified successfully!");
        history.push("/welcome");
      } else {
        message.error(response.errMsg || "OTP verification failed");
      }
    } catch (err) {
      message.error("OTP verification failed");
      console.error(err);
    }
  };

  return (
    <>
      <LoginHeader logoutShow style={{ position: "absolute", top: "-35%" }} />
      <div className="newFile">
        <OfflineMessage />
      </div>
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className="outerDiv">
        <div className="main-body">
          {/* <div className="ios">
            {isOpen && windowWidth <= 842 && (
              <>
                <div className="popup1">
                  <div className="popup_header">
                    <h2>Install our app for easier access</h2>
                    <hr />
                  </div>

                  <div className="popup_body">
                    <p>To install PhilLife as an app on your device, tap the menu (or share) button on your browser and choose “Add to Home Screen” </p>
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px" }}>
                        <div>
                          <img src={logoIos} alt="Ios install Logo" style={{ height: 32, width: 32, marginBottom: 8 }} />
                        </div>
                        <div style={{ fontSize: 25 }}>&gt;</div>
                        <div>
                          <AddBoxIcon style={{ fontSize: 32, marginRight: 5 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="popup_footer">
                    <Button className="delete-button1" icon={<CloseOutlined />} onClick={togglePopup} />
                  </div>
                </div>
              </>
            )}
          </div> */}
          <Row
            justify="center"
            align="middle"
            style={{
              minHeight: "100vh",
              background: "#f0f2f5",
              padding: "16px",
            }}
          >
            <Col xs={24} sm={20} md={16} lg={12} xl={8}>
              <Card
                style={{
                  width: "100%",
                  maxWidth: 400,
                  borderRadius: 10,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  margin: "0 auto",
                }}
              >
                <Image src={icare} width="104px" preview={false} /> {/* Replace with your logo path */}
                <Title level={4} style={{ color: "#00BFFF", marginTop: 4 }}>
                  {isOtpSend ? "OTP Verification" : "Register"}
                </Title>
                <Text type="secondary">{isOtpSend ? `We have sent you one time verification code on this No ${phoneNumber} ` : "We will send you the verification code on this No"}</Text>
                <Text style={{ cursor: "pointer", color: "#FF6D00", borderBottom: "1px solid #FF6D00" }} onClick={() => setIsOtpSend(false)}>
                  {isOtpSend ? "CHANGE" : ""}
                </Text>
                <Form
                  layout="vertical"
                  onFinish={
                    isOtpSend
                      ? () => {
                        verifyOTP()
                      }
                      : (values) => {
                        setPhoneNumber(values.mobile);
                        verifyLogin(values)
                      }
                  }
                  style={{ marginTop: 24, textAlign: "left" }}
                >
                  {!isOtpSend ? (
                    <Form.Item
                      label="Mobile No"
                      name="mobile"
                      rules={[
                        { required: true, message: "Please enter your mobile number" },
                        { pattern: /^[0-9]{10}$/, message: "Enter valid 10-digit number" },
                      ]}
                    >
                      <Input size="large" placeholder="Enter the mobile number" />
                    </Form.Item>
                  ) : (
                    <>
                      <div style={{ marginTop: 24, display: "flex", justifyContent: "center", gap: 8 }}>
                        {otp.map((digit, index) => (
                          <Input key={index} id={`otp-input-${index}`} size="large" value={digit} onChange={(e) => handleOtpChange(index, e.target.value)} style={{ width: 50, textAlign: "center" }} maxLength={1} />
                        ))}
                      </div>
                      <Text type="secondary" style={{ marginTop: 16, display: "flex", justifyContent: "space-between" }}>
                        Didn't get the code?{" "}
                        <span style={{ color: "#223C86", cursor: timer > 0 ? "not-allowed" : "pointer", fontWeight: "600" }} onClick={timer === 0 ? handleOtpsend : undefined}>
                          RESEND code in {timer > 0 ? formatTime(timer) : "now"} sec
                        </span>
                      </Text>
                    </>
                  )}

                  <Form.Item style={{ marginTop: 24 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: "#FF6A00",
                        borderColor: "#FF6A00",
                        width: "100%",
                        borderRadius: 6,
                      }}
                      size="large"
                      disabled={isOtpSend && otp.some((d) => !d)} // Disable if any OTP field is empty
                    >
                      {isOtpSend ? "Verify & Proceed" : "Get OTP"}
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>

        <Modal title="OTP Verification" visible={isModalOtp} onOk={true} onCancel={handleCancel} footer={null} okText="Submit Details" width={400} height={600}>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div>
                <DottedOTPInput
                  cleardata={isModalOtp}
                  ref={childRef}
                  timers={timerstart}
                  length={4}
                  onChange={handleOTPChange}
                  Messagetext={"We have sent an OTP to your Registered Email Address."}
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

export default AgentBrokerLogin;
