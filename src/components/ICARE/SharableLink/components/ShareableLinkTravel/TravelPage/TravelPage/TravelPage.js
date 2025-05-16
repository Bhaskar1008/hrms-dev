import React, { useEffect, useState } from "react";
import "./TravelPage.css";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Select, Row, Col, Input, Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setTravelUserDetails } from "../../../../../../../store/actions/travel";
import StepTravelOne from "../../StepBarTravel/StepTravelOne/StepTravelOne";
import TravelFooter from "../../TravelFooter/TravelFooter";
import Header from "../../../SampleHeader/Header";
function TravelPage() {
  const dispatch = useDispatch();
  const tripData = useSelector((state) => state?.trip);
  const travelPageData = tripData?.travelUserInfo;
  const [maxMobileLength, setMaxMobileLength] = useState(10);
  const [formDetails, setFormDetail] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
  });
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  useEffect(() => {
    if (travelPageData) {
      setFormDetail((prev) => ({
        ...prev,
        firstName: travelPageData?.firstName,
        lastName: travelPageData.lastName,
        mobile: travelPageData.mobile,
        email: travelPageData?.email,
      }))
    }
  }, [travelPageData])
  // const onFinishCustomerInfo = () => {

  // };
  const history = useHistory();
  const submitHandler = () => {
    const regex1 = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    if (!formDetails.firstName) {
      setFirstNameError('First Name is required.');
    } else if (!regex1.test(formDetails.firstName)) {
      setFirstNameError('Numeric and Special characters are not allowed.');
    } else {
      setFirstNameError("");
    }
    if (!formDetails.lastName) {
      setLastNameError('Last Name is required.');
    } else if (!regex1.test(formDetails.lastName)) {
      setLastNameError('Numeric and Special characters are not allowed.');
    } else {
      setLastNameError("");
    }

    const regex2 = /^[0-9]+$/;
    if(!formDetails.mobile){
      setMobileNumberError("Mobile Number is required.")
    } else if (!regex2.test(formDetails.mobile)) {
      setMobileNumberError('Only number allowed.');
    } else if (formDetails.mobile.length < 10 || formDetails.mobile.length > 12) {
      setMobileNumberError('Mobile number must be between 10 and 12 digits');
    } else {
      setMobileNumberError('');
    }
    const regex3 = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!formDetails.email) {
      setEmailError('Email is required.');
    } else if (!regex3.test(formDetails.email)) {
      setEmailError('Please provide a valid email address.');
    } else {
      setEmailError('');
    }
    if (firstNameError || lastNameError || mobileNumberError || emailError) {
      return;
    }
    if (!formDetails.firstName || !formDetails.lastName || !formDetails.mobile || !formDetails.email) {
      return;
    }
    dispatch(setTravelUserDetails(formDetails));
    history.push("/customer/customer-detail");
  };
  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  const onClickBack = () => {
    // history.goBack();
    history.push("/customer/travel-info");
  };
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };


  // const onChangeHandler = (e) => {
  //   setFormDetail((prev) => ({ ...prev, [e.target.name]: e.target.value }));


  // };
  const onChangeHandler = (e) => {
    const inputValue = e.target.value;
    setFormDetail((prev) => ({ ...prev, [e.target.name]: inputValue }));
  };
   //   UPPARCASE DATA ///
   const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };


  return (
    <>
    <Header/>
      <div className="parent-element">
        <div className="left-side">
          <Button
            type="dashed"
            onClick={onChangetoDashboard}
            className="dashbtn"
          >
            <ArrowLeftOutlined />
            Back to Home
          </Button>
          <StepTravelOne />
        </div>
        {/* <div className="line"></div> */}
        <div className="right-side">
          <div className="RsCustomer">
            Now, we just need to get some customer information.
          </div>
          <div className="rspolicyHolderdiv">
            <div className="policy">
              <ul>
                <li>
                  <div className="policyHolder">Policy Holder Information</div>
                </li>
              </ul>
            </div>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
            //  onFinish={onFinishCustomerInfo}
            >
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="First Name"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your name !",
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;

                          if (!validPattern.test(value)) {
                            return Promise.reject(
                              " Numeric and Special characters are not allowed."
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: 'none' }}>{formDetails.firstName}</span>
                    <Input
                      placeholder="First Name"
                      name="firstName"
                      value={formDetails.firstName}
                      onChange={onChangeHandler}
                      className="inputboxx"
                      maxLength={180}
                      
                      onInput={(e) => {
                        toInputUppercase(e)
                        const inputValue = e.target.value;
                        const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
                        if (!inputValue) {
                          setFirstNameError('First Name is required.');
                        } else if (!regex.test(inputValue)) {
                          setFirstNameError('Numeric and Special characters are not allowed.');
                        } else {
                          setFirstNameError('');
                        }
                      }}
                    />
                    {firstNameError && (
                      <div className="error-message" style={{ color: 'red' }}>{firstNameError}</div>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "please enter your name !",
                      },
                      // {
                      //   validator: (_, value) => {
                      //     const validPattern = /^[a-zA-Z]+$/;

                      //     if (!validPattern.test(value)) {
                      //       return Promise.reject(
                      //         " Numeric and Special characters are not allowed."
                      //       );
                      //     }

                      //     return Promise.resolve();
                      //   },
                      // },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: 'none' }}>{formDetails.lastName}</span>
                    <Input
                      placeholder="Last Name"
                      name="lastName"
                      value={formDetails.lastName}
                      onChange={onChangeHandler}
                      className="inputboxx"
                      maxLength={30}
                      
                      onInput={(e) => {
                        toInputUppercase(e)
                        const inputValue = e.target.value;
                        const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
                        if (!inputValue) {
                          setLastNameError('Last Name is required.');
                        } else if (!regex.test(inputValue)) {
                          setLastNameError('Numeric and Special characters are not allowed.');
                        } else {
                          setLastNameError('');
                        }
                      }}
                    />
                    {lastNameError && (
                      <div className="error-message" style={{ color: 'red' }}>{lastNameError}</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="mobile"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Enter Mobile Number",
                      },
                      {
                        pattern: /^[0-9]\d{9,11}$/,
                        message: "Mobile number must be between 10 and 12 digits",
                      },
                      // {
                      //   validator: (rule, value, callback) => {
                      //     const validPattern = /^[0-9\-]+$/;
                      //     if (!validPattern.test(value) || value.length < 10 || value.length > 12) {
                      //       callback("Invalid mobile number format.");
                      //     } else {
                      //       callback();
                      //     }
                      //   },
                      // },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: 'none' }}>{formDetails.mobile}</span>
                    <Input
                      className="inputboxx"
                      size="default"
                      value={formDetails.mobile}
                      placeholder="Mobile Number"
                      name="mobile"
                      onChange={(e) =>{
                        const inputValue = e.target.value;
                        if (inputValue.length <= 12) {
                          onChangeHandler(e);
                        }
                        const regex2 = /^[0-9]+$/;
                        if(!inputValue){
                          setMobileNumberError("Mobile Number is required.")
                        } else if (!regex2.test(inputValue)) {
                          setMobileNumberError('Only number allowed.');
                        } else if (inputValue.length < 10 || inputValue.length > 12) {
                          setMobileNumberError('Mobile number must be between 10 and 12 digits');
                        } else {
                          setMobileNumberError('');
                        }
                      } 
                    }
                      maxLength={12}
                      autoComplete="off"
                      // type="number"
                      onInput={(e) => {
                        let inputValue = e.target.value;
                        if (inputValue.length > 12) {
                          inputValue = inputValue.slice(0, 12);
                          e.target.value = e.target.value.slice(0, 12);
                        }
                      }}
                    />
                    {mobileNumberError && (
                      <div className="error-message" style={{ color: 'red' }}>{mobileNumberError}</div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                        ),
                        message: "Please provide a valid email address",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: 'none' }}>{formDetails.email}</span>
                    <Input
                      className="inputboxx"
                      size="default"
                      maxLength="60"
                      name="email"
                      value={formDetails.email}
                      onChange={onChangeHandler}
                      placeholder="Email Address"
                      autoComplete="off"
                      onInput={(e) => {
                        const inputValue = e.target.value;
                        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                        if (!inputValue) {
                          setEmailError('Email is required.');
                        } else if (!regex.test(inputValue)) {
                          setEmailError('Please provide a valid email address.');
                        } else {
                          setEmailError('');
                        }
                      }}
                    />
                    {emailError && (
                      <div className="error-message" style={{ color: 'red' }}>{emailError}</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <div className="btnParentDiv">
              <Button className="back_btn" onClick={onClickBack}>
                Back
              </Button>
              <Button
                className="Rsconfirm_btn"
                onClick={submitHandler}
                htmlType="submit"
              >
                Next
                <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TravelFooter />
      </div>
    </>
  );
}

export default TravelPage;
