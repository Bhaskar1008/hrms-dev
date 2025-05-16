import React,{ useState, useEffect,useRef } from "react";
import { Form, Input, Select, Button, Row, Col, Typography,DatePicker,  message,Modal } from "antd";
import "./PersonalDetails.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import * as actions from "../../store/actions/index";
import apiConfig from "../../config/api.config";
import axios from "axios";
import {  CheckCircleOutlined } from "@ant-design/icons";
import AgentLoginOtpInput from "../../components/ICARE/AgentComponents/OTPInputBox/AgentLoginOtpInput";
const { baseURL } = apiConfig;
const { Title, Text } = Typography;
const { Option } = Select;
var otptimer = 10;

const PersonalDetailsAgent = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const childRef = useRef();
  const [timerstart, setTimerstart] = useState("60");
  const [EnteredOTP, setEnteredOTP] = useState("");
  const [openloader, setOpenloader] = useState(false);
  const [emailId, setEmailId] = useState(""); 
  const [phoneNum, setPhoneNum] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [verificationType, setVerificationType] = useState("");
  const [isEmailEntered,setIsEmailEntered] = useState(false);
  const [isPhoneNumberEntered, setIsPhoneNumberEntered] = useState(false);
  // const [agentForm, setAgentForm] = useState({
  //   first_name: "",
  //   middle_name: "",
  //   last_name: "",
  //   email: "",
  //   phone_number: "",
  // });
  // console.log("Agent Test ------------------", agentForm)

  const [personal, setPersonal] = useState({
      applyAs: '',
      firstName: '',
      middleName: '',
      lastName: '',
      address1: '',
      address2: '',
      state: '',
      city: '',
      pinCode: '',
      dob: '',
      age: '',
      gender: '',
      telNo: '',
      mobileNo: '',
      email: '',
      tin: ''
  });
  
  // console.log("personal", personal.mobileNo);
  const [showTimer, setShowTimer] = useState(false);
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

  const states = useSelector((state) => state?.address?.states);
  console.log("State==>",states)

  const city = useSelector((state) => state?.address?.cities);
  console.log("City==>",city)

  const [disableButton, setDisableButton] = useState("")
  const mobileNumber = useSelector((state) => state?.agentOnBoardingRegister?.Loging_Mobile);
  const [completeMessPop, setCompleteMessPop] = useState(false);
  const referalLinkBind = useSelector((state) => state?.cipherStore?.SaveCipherTEXT?.formData?.errMsg?.agentName);

  const referalLinkBindghjhg = useSelector((state) => state?.cipherStore);  
  const [referValue, setreferValue] = useState(registerlogin?.registerKey === "" ? "1101" : referalLinkBind)


  const handlePersonalChange = (e) => {
    const { name, value } = e.target;  
    setPersonal((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  const handleDropdownChange = (value, option) => {
    const name = option?.props?.name;
    setPersonal(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  

  const handleProvinceChange = (provinceCode) => {
    setPersonal((prev) => ({
      ...prev,
      state: provinceCode, // storing provinceCode
      city: '', // reset city
    }));
  
    dispatch(actions.fetchAllCities(provinceCode));
  };
  
  const handleCityChange = (value) => {
    setPersonal((prev) => ({
      ...prev,
      city: value,
    }));
  };

   const onChangeBirthDate = (date, dateString) => {
    // let dateFormat = moment(date).format("YYYY-MM-DD");
    // console.log(dateFormat,"dateFormat")
    setPersonal({
      ...personal, // Spread the existing personal state
      dob: dateString,
    });
  };
  console.log("dob==>",personal.dob)

  

  const handleVerify = async (type) => {
    setOpenloader(true);
    setEnteredOTP("");
    setVerificationType(type);
    if (type === "email") {
      if (!personal.email) {
        message.error("Please enter email address");
        setIsEmailEntered(false);
        setOpenloader(false);
        return;
      } else {
        setIsEmailEntered(true);
      }
    }
  
    if (type === "phone") {
      if (!personal.mobileNo) {
        message.error("Please enter phone number");
        setIsPhoneNumberEntered(false);
        setOpenloader(false);
        return;
      } else {
        setIsPhoneNumberEntered(true);
      }
    }
    
    try {
      const Url = `${baseURL}auth/agent/verifyMobileNumber`;
      const requestBody = {
        mobileNumber: personal.mobileNo,
        email: personal.email,
      };
  
      const headers = {
        authorization: null,
        "Content-Type": "application/json",
      };
  
      if (registerlogin?.registerKey !== "") {
        headers.ciphertext = cypherStore;
      }
  
      const response = await axios.post(Url, requestBody, { headers });
  
      if (response?.data?.statusCode === -1) {
        setOpenloader(false);
        message.success(response?.data?.data);
        setEnteredOTP("");
        showModal();
      } else {
        setOpenloader(false);
      }
    } catch (error) {
      setOpenloader(false);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };
  

  const openConfirmPopUp = () => {
   
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
    setPersonal((prev) => ({
      ...prev,
      mobileNo: phoneNumber,
    }));

    if (phoneNumber.length === 10) {
      setIsPhoneNumberEntered(true);
      setPhoneNum('VERIFY');
    } else {
      setIsPhoneNumberEntered(false);
      setPhoneNum('');
    }
  }

  const handleEmailChange = (e) => {
    // phoneNumber.includes('9') && 
    // e.preventDefault();
    setPersonal((prev) => ({
      ...prev,
      email: e.target.value,
    })
  )
 
    if (checkEmailFormat(e.target.value)) {
      setIsEmailEntered(true)
      setEmailId('VERIFY');
    } else {
      setIsEmailEntered(false)
      setEmailId('');
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
        mobileNumber: personal.mobileNo,
        email:personal.email,
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
         
        }, 3000);
        if (EnteredOTP !== "" && EnteredOTP.length === 4) {
          setOpenloader(false);
          openConfirmPopUp();
          setIsModalOpen(false);
          message.success(response?.data?.data?.errMsg);          
          if(verificationType === "phone"){
            setPhoneNum("VERIFIED") 
                
          }
          if(verificationType === "email"){
            setEmailId("VERIFIED")  
            setShowButton(true)
          
          }         
          
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
    if (isPhoneNumberEntered) {
      handleVerify("phone");
    }
    if (isEmailEntered) {
      handleVerify("email");
    }
    setShowTimer(true)
    console.log("Call Resend OTP funstion here");
    otptimer = 10;
  };


  // ============== submit form =====================
  // const handleSubmitApplication = async () => {

  //   setOpenloader(true);
  //   try {
  //     // setLoader(true);
  //     const Url = `${baseURL}auth/agent/register`;
  //     const requestBody = {
  //       firstName: personal.first_name,
  //       middleName: personal.middle_name,
  //       lastName: personal.last_name,
  //       email: personal.email,
  //       mobileNumber: personal.phone_number,
  //       ReferalCode: referValue,
  //       isReferral: registerlogin?.registerKey === "" ? false : true
  //     };
  //     console.log("requestBody", requestBody);

  //     const headers = {
  //       authorization: null,
  //       "Content-Type": "application/json",
  //     };

  //     if (registerlogin?.registerKey !== "") {
  //       headers.ciphertext = cypherStore;
  //     }

  //     const response = await axios.post(Url, requestBody, { headers });
  //     // setLoader(false);
  //     if (response?.data?.errCode === -1) {
  //       setOpenloader(false);
  //       message.success(response?.data?.errMsg?.message);
  //       dispatch(actions.resetLicencseAfiliateForm({}));
  //       history.push("/create-account")
  //       let wholeRespose = { ...requestBody, ...response?.data?.errMsg }
  //       dispatch(actions.storeAgentONBoardForm(wholeRespose));
  //     } else {
  //       setOpenloader(false);
  //     }

  //   } catch (error) {
  //     setOpenloader(false);
  //     if (error?.response?.data?.errCode === 1) {
  //       setOpenloader(false);
  //       setDisableButton("exists")
  //       setEmailId('VERIFY')
  //       setPhoneNum("VERIFY");
  //       setEnteredOTP("")
  //       message.error(error?.response?.data?.errMsg);
  //     } else {
  //       setOpenloader(false);
  //     }
  //   }
  // };


  const isValidPhoneNumber = (phoneNumber) => /^[6789]/.test(phoneNumber);
 const  checknmberstart = (personal) =>{
  if (isValidPhoneNumber(personal?.mobileNo)) {
    return true;
  } else {
    return false;
  }
 } 

 const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email);

const checkEmailFormat = (personal) => {
  return isValidEmail(personal);
};


// useEffect(() => {
//   form.setFieldsValue(personal);
// }, [personal]);


  useEffect(() => {
    dispatch(actions.fetchAllState());  
   
    
  }, []);

  const handleSubmit = (values) => {
    const payload = {
      personal: { ...personal }
    };
    console.log("Payload to send:", payload);
    history.push("/agent/bankingDetails",{ personal });
  };


  
  
  return (
    <>
    <div style={{ padding: 24, paddingTop: `${window.innerWidth < 600 ? "0px" : "24px"}`, backgroundColor: "#f6f7fa", borderRadius: 8, width: `${window.innerWidth < 600 ? "100%" : "80%"}` }}>
      <Title level={3} style={{ color: "#FF6D00", marginBottom: 24, fontWeight: "500", fontSize: "clamp(24px, 5vw, 42px)" }}>
        Agent Accreditation
      </Title>
      <Text type="secondary" style={{ fontWeight: "400", letterSpacing: "7%", color: "#4A5259", fontSize: "clamp(5px, 5vw, 14px)" }}>
        To know you better, fill out this form to complete your registration. Your details will be saved to your account.
      </Text>

      <Form form={form}
    layout="vertical" onFinish={handleSubmit}
                      fields={[
                        {
                          name: ["referValue"],
                          value: referValue,
                        },
                      ]} style={{ marginTop: 24, width: window.innerWidth < 600 ? "100%" : "80" }}>
        <Row gutter={16} style={{}}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Apply As" name="applyAs" rules={[{ required: true, message: "Please select agent type" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Select size="large"  name="applyAs"  value={personal.applyAs} allowClear  
               onChange={handleDropdownChange}
              placeholder="Select Type of Agent">
                <Option value="individual" name="applyAs" >Individual</Option>
                <Option value="corporate" name="applyAs" >Corporate</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="First Name"  name="firstName" rules={[{ required: true, message: "Please enter first name" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large"               
              name="firstName"
              value={personal.firstName}
              onChange={handlePersonalChange}
              placeholder="Enter first name" 
               />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Middle Name"  name="middleName"  rules={[{ required: true, message: "Please enter middle name" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large" 
              name="middleName" 
              value={personal.middleName}
              onChange={handlePersonalChange}
              placeholder="Enter middle name" 
               />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Last Name" name="lastName"  rules={[{ required: true, message: "Please enter last name" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large" 
              name="lastName"  
              value={personal.lastName}
              onChange={handlePersonalChange}
              placeholder="Enter last name" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Address Line 1" name="address1"   rules={[{ required: true, message: "Please enter address line 1" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large"
              name="address1"  
              value={personal.address1}
              onChange={handlePersonalChange}
              placeholder="Enter address line 1" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Address Line 2" name="address2" rules={[{ required: true, message: "Please enter address line 2" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large" name="address2"
               value={personal.address2}
               onChange={handlePersonalChange}
              placeholder="Enter address line 2" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="State" name="state" rules={[{ required: true, message: "Please enter Provinces" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Select size="large" name="state"  value={personal.state} allowClear  
               onChange={handleProvinceChange} placeholder="Select province">
                {states && states.map((province) => (
                    <Select.Option
                      key={province._id}
                      value={province.provinceCode} 
                    >
                      {province.provinceName}       
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="City"  name="city"   rules={[{ required: true, message: "Please enter city" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Select size="large"  name="city"   value={personal.city} allowClear  
               onChange={handleCityChange } placeholder="Select city"  disabled={!personal.state || city.length === 0}>
                  {city && city.map((cityItem) => (
                    <Select.Option key={cityItem._id} value={cityItem.Municipality_code}>
                      {cityItem.Municipality_name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="PIN Code" name="pinCode" rules={[{ required: true, message: "Please enter Pincode" }]}  labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large" 
               name="pinCode"
               value={personal.pinCode}
               onChange={handlePersonalChange}
              placeholder="Enter pincode" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Date of Birth" name="dob" rules={[{ required: true, message: "Please enter dob" }]}  labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              {/* <Input type="date" size="large" placeholder="MM/DD/YYYY" /> */}
              <DatePicker
                            
                            className="first-name input-box"
                            size="large"
                            format="MM/DD/YYYY"
                            placeholder="MM/DD/YYYY"
                            name="dob"
                            value={personal.dob ? moment(personal.dob, "YYYY-MM-DD") : null}
                            onChange={onChangeBirthDate}
                            style={{ width: "100%" }}
                          />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Age"  name="age" rules={[{ required: true, message: "Please enter age" }]}  labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large"  name="age" 
                 value={personal.age}
                onChange={handlePersonalChange}  
                placeholder="Enter your age" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Gender" name="gender" rules={[{ required: true, message: "Please enter gender" }]}  labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Select size="large" name="gender" value={personal.gender} allowClear  
                onChange={handleDropdownChange}  placeholder="Select gender">
                <Option value="male"  name="gender">Male</Option>
                <Option value="female"  name="gender" >Female</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="Tel No"name="telNo"  rules={[{ required: true, message: "Please enter telephone number" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large"
              name="telNo"
              value={personal.telNo}
                onChange={handlePersonalChange}   placeholder="Enter tel no" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
                            <Form.Item
                              label="Mobile Number"
                              name="mobileNo"
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
                              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
                            >
                              <Input
                                type="text"
                                maxLength={14}
                                size="large"
                                placeholder="Enter Mobile number"
                                name="mobileNo"
                                value={personal.mobileNo}
                                suffix={                                   
                                  <span
                                    style={{
                                      letterSpacing: "0.5px",
                                      fontWeight: 500,
                                      color: "#4ac6bb",
                                      cursor: phoneNum === "VERIFIED" ? "default" : "pointer",
                                    }}
                                    onClick={phoneNum === "VERIFIED" ? undefined : () => handleVerify("phone")}
                                  >
                                    {phoneNum}
                                  </span>
                                
                              }
                                
                                disabled={disableButton !== "exists" && phoneNum === "VERIFIED"}
                                onChange={handlePhoneNumberChange}
                                onKeyDown={(evt) => {
                                  if (!/[0-9]/.test(evt.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
                                    evt.preventDefault();
                                  }
                                }}
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
                            labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
                          >
                            <Input
                              size="large"
                              placeholder="Enter email address"
                              name="email"
                              value={personal.email}                            
                              suffix={
                                   
                                      <span
                                        style={{
                                          letterSpacing: "0.5px",
                                          fontWeight: 500,
                                          color: "#4ac6bb",
                                          cursor: emailId === "VERIFIED" ? "default" : "pointer",
                                        }}
                                       
                                        onClick={emailId === "VERIFIED" ? undefined : () => handleVerify("email")}
                                      >
                                        {emailId}
                                      </span>
                                    
                                  }
                              disabled={disableButton !== "exists" && emailId === "VERIFIED"}
                              onChange={handleEmailChange}
                              maxLength='50'
                            />
                          </Form.Item>
                        </Col>

       
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="TIN No" name="tin" rules={[{ required: true, message: "Please enter referral link" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Input size="large" name="tin" value={personal.tin}
                onChange={handlePersonalChange}   
                placeholder="Enter referral link" />
            </Form.Item>
          </Col>
        </Row>

        <div className="button-group-nxt">           
        {showButton && (
    <Button type="primary" htmlType="submit" className="next-btn">
      Next
    </Button>
  )}
         </div>
      </Form>
    </div>
    <Modal
        width={500}
        className="verify_mobile_modal"
        title={
          <span style={{ color: '#00AEC1' , fontSize: '18px' , fontWeight:'600'}}>
            Verify {verificationType === 'email' ? 'Email Address' : 'Mobile Number'}
          </span>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        borderRadius={8}
        bordered={false}
        footer={null}
      >
        <div className="otp-container">
          <span>Enter the OTP that has been sent to </span>
          <span className="span_uniqueId"> {verificationType === 'email'? personal.email : personal.mobileNo}</span>
          <span> to complete {verificationType === 'email'? "email": "phone"} confirmation.</span>
        </div>

        <AgentLoginOtpInput
        key={verificationType}
          cleardata={isModalOpen}
          customTextWithResend={showTimer ? false : true}
          btn_text="Verify"
          ref={childRef}
          timers={timerstart}
          length={4}
          onChange={handleOTPChange}         
          onResend={() => resendOTP()}
          verifyOtp={() => submitOtp()}
          showTimer={showTimer}
        />
      </Modal>


      <Modal
        width={500}
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
              style={{ color: "#d3d3d3", fontSize: "100px" }}
            />
          </div>
          <div
            className="success_test"
            style={{ fontSize: 24, color: "#00AEC1", marginBottom: 10 ,fontWeight : "900"}}
          >
            SUCCESS!
          </div>
          <div style={{ fontSize: '16px',color:'#3C3D3D',fontWeight:'500' ,marginBottom: 24}}>{verificationType === 'email'? "Email": "Phone"} verified successfully</div>
        </div>
      </Modal>
    </>
  );
};

export default PersonalDetailsAgent;
