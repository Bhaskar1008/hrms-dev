import React, { useState, useEffect } from "react";
import "./PolicyHolderInformationQuote.css";
import { useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Radio,
  Card,
  Select,
  Option,
  Form,
  Progress,
  Input,
  DatePicker,
  Upload,
  message,
} from "antd";
import _ from "lodash";
import moment, { now } from "moment";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import StepTwo from "../components/StepBar/StepTwo/StepTwo";
import { useDispatch, useSelector } from "react-redux";
import QuickQuoteFooter from "../MotorFormFooter/QuickQuoteFooter/QuickQuoteFooter";
import * as actions from "../../../../store/actions";

const PolicyHolderInformationQuote = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'

  // const [policySelectionData, setPolicySelectionData] = React.useState({});
  // const [customInputData, setCustomInputData] = React.useState({});

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const policyHolderQuote = useSelector(
    (state) => state?.motorQuotation?.formData
  );
  // console.log("policyHolderQuote", policyHolderQuote);

  // console.log("policyHolderQuote", policyHolderQuote);
  const policyDetailsData = useSelector(
    (state) => state?.motorQuotation?.formData?.policyHolder
  );
  // const mototest = useSelector(
  //   (state) => state
  // );


  const poliyholderFormalSuccess = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess?.data?.motor_comprehensive?.policyHolder
  );

  console.log("hey23", poliyholderFormalSuccess);

  useEffect(() => {
    setFirstName(
      policyDetailsData?.firstName
        ? policyDetailsData?.firstName
        : poliyholderFormalSuccess?.firstName
          ? poliyholderFormalSuccess?.firstName
          : null
    );
    setLastName(
      policyDetailsData?.lastName
        ? policyDetailsData?.lastName
        : poliyholderFormalSuccess?.lastName
          ? poliyholderFormalSuccess?.lastName
          : null
    );
    setMobileNumber(
      policyDetailsData?.mobileNumber
        ? policyDetailsData?.mobileNumber
        : poliyholderFormalSuccess?.mobileNumber
          ? poliyholderFormalSuccess?.mobileNumber.toString()
          : null
    );
    setEmailAddress(
      policyDetailsData?.emailAddress
        ? policyDetailsData?.emailAddress
        : poliyholderFormalSuccess?.emailAddress
          ? poliyholderFormalSuccess?.emailAddress
          : null
    );

    form.setFieldsValue({
      firstname: policyDetailsData?.firstName
        ? policyDetailsData?.firstName
        : poliyholderFormalSuccess?.firstName
          ? poliyholderFormalSuccess?.firstName
          : null,
      lastname: policyDetailsData?.lastName
        ? policyDetailsData?.lastName
        : poliyholderFormalSuccess?.lastName
          ? poliyholderFormalSuccess?.lastName
          : null,
      mobilenumber: policyDetailsData?.mobileNumber
        ? policyDetailsData?.mobileNumber
        : poliyholderFormalSuccess?.mobileNumber
          ? poliyholderFormalSuccess?.mobileNumber.toString()
          : null,
      emailaddress: policyDetailsData?.emailAddress
        ? policyDetailsData?.emailAddress
        : poliyholderFormalSuccess?.emailAddress
          ? poliyholderFormalSuccess?.emailAddress
          : null,
    });
  }, []);
  // functions *************

  const onFinishPolicyHolderInfo = (formData) => {
    const policyHolderInfo = {
      ...policyHolderQuote,
      policyHolder: {
        firstName: firstName,
        lastName: lastName,
        emailAddress: emailAddress,
        mobileNumber: mobileNumber,
      },
    };

    // console.log("policyHolderInfo==", policyHolderInfo);

    dispatch(actions.motorQuotationForm(policyHolderInfo));
    history.push("/Quote-info");
  };

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeEmailAddress = (e) => {
    setEmailAddress(e.target.value);
  };
  const onChangeMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/coverage-Quote-info");
  };

  // const onchangetoNext = () => {
  //   history.push("/Quote-info");
  // };
  //   UPPARCASE DATA ///
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  return (
    <>
      <div className="main-class">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>

            <StepTwo />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishPolicyHolderInfo}
              // onFinishFailed={onFinishFailed}
              // autoComplete="off"\
              form={form}
              fields={[
                {
                  // name: ["groupPolicy"],
                  // value: groupPolicy,
                },
              ]}
            >
              <div className="right-side">
                <div className="policy-type">
                  <h2>Just a few more details.</h2>
                </div>
                <div>
                  <div className="info-head">
                    <h3>Policy Holder Information</h3>
                  </div>
                  <div>
                    <Row gutter={16} className="row-bottom-margin">
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="firstname"
                          label="First Name"
                          rules={[
                            {
                              required: true,
                              message: "Type First Name",
                            },
                            {
                              pattern: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/,
                              message:
                                "Only letters (numbers or special characters not allowed).",
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="180"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(item) => onChangeFirstName(item)}
                            // defaultValue={button.sumInsured}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="lastname"
                          label="Last Name"
                          rules={[
                            {
                              required: true,
                              message: "Type Last Name",
                            },
                            {
                              pattern: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/,
                              message:
                                "Only letters (numbers or special characters not allowed).",
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="30"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(item) => onChangeLastName(item)}
                            // defaultValue={button.sumInsured}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="mobilenumber"
                          label="Mobile Number"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Type Mobile Number",
                          //   },
                          // ]}
                          rules={[
                            {
                              required: true,
                              message: "Enter Mobile Number",
                            },
                            {
                              type: "string",
                              min: 10,
                              max: 12,
                              message:
                                "Mobile Number should be between 10 and 12 digit.",
                            },
                            // {
                            //   pattern: new RegExp(/^(0|9)\d{9,11}$/), // Validates 10 to 12 digits starting with 0 or 9.
                            //   message: "Mobile Number should be Min 10 and Max 12 digits",
                            // },
                            // {
                            //   validator: (_, value) => {
                            //     const validPattern = /^[0-9\-]+$/;
                            //     if (
                            //       (!validPattern.test(value)) ||
                            //       (value.startsWith("0") && (value.length < 10 || value.length > 12)) ||
                            //       (value.startsWith("9") && (value.length < 10 || value.length > 12))
                            //     ) {
                            //       return Promise.reject("Invalid mobile number format.");
                            //     }
                            //     return Promise.resolve();
                            //   },
                            // },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="12"
                            placeholder="Mobile Number"
                            value={mobileNumber}
                            onInput={(e) => {
                              if (e.target.value.length > 12) {
                                e.target.value = e.target.value.slice(0, 12);
                              }
                            }}
                            onChange={(item) => onChangeMobileNumber(item)}
                            // defaultValue={button.sumInsured}
                            autoComplete="off"
                            type="number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="emailaddress"
                          label="Email Address"
                          rules={[
                            {
                              required: true,
                              pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                              message: "Please provide a valid email address",
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="60"
                            placeholder="Email Address"
                            value={emailAddress}
                            onChange={(item) => onChangeEmailAddress(item)}
                            // defaultValue={button.sumInsured}
                            autoComplete="off"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="button-header">
                  <Button
                    className="prev-button"
                    size={size}
                    onClick={onchangetoBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="next-button"
                    size={size}
                    htmlType="submit"
                  // onClick={onchangetoNext}
                  // onClick={onFinishPolicyGroup}
                  >
                    Next
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <QuickQuoteFooter />
    </>
  );
};

export default PolicyHolderInformationQuote;
