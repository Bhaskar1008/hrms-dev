import React, { useState, useEffect } from "react";
import "./VehicleQuote.css";
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
import QuickQuoteFooter from "../MotorFormFooter/QuickQuoteFooter/QuickQuoteFooter";
import { useDispatch, useSelector } from "react-redux";
import { checkAgent, stoageGetter } from "../../../../helpers";
import * as actions from "../../../../store/actions";

const VehicleQuote = () => {
  let login_user_data = stoageGetter("user");

  const getAgentCode = login_user_data?.agentCode;
  const channelCode = login_user_data?.channelCode;
  // console.log("agent_id", getAgentCode);
  // console.log("agent_id1", channelCode);

  const [form] = Form.useForm();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const data = location.state;
  // console.log("data", data);
  const [loader, setLoader] = useState(false);
  const [size, setSize] = useState("default"); // default is 'middle'

  const [vehicleConditioned, setVehicleConditioned] = useState(false);

  const [nonStandardaccessories, setNonStandardaccessories] = useState(false);

  const [plateNumber, setPlateNumber] = useState(null);
  const [conductionNumber, setConductionNumber] = useState(null);
  // const [destinationErrMsg, setDestinationErrMsg] = useState("");

  const [chassisNumber, setChassisNumber] = useState("");
  const [motorNumber, setMotorNumber] = useState("");
  const [mvFileNumber, setMVFileNumber] = useState("");
  // console.log("hey==", mvFileNumber);
  const [purchaseDate, setPurchaseDate] = useState("");
  // console.log("purchase", purchaseDate);


  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  useEffect(() => {
    setPlateNumber(
      vehicleQuote?.plateNumber ? vehicleQuote?.plateNumber : null
    );
    setConductionNumber(
      vehicleQuote?.conductionNumber ? vehicleQuote?.conductionNumber : null
    );
    setChassisNumber(
      vehicleQuote?.chassisNumber ? vehicleQuote?.chassisNumber : null
    );
    setMotorNumber(
      vehicleQuote?.engineNumber ? vehicleQuote?.engineNumber : null
    );
    setMVFileNumber(vehicleQuote?.fileNumber ? vehicleQuote?.fileNumber : null);
    setNonStandardaccessories(
      storedData?.nonStandardaccessories
        ? storedData?.nonStandardaccessories
        : false
    );
    setVehicleConditioned(
      storedData?.isReconditioned ? storedData?.isReconditioned : false
    );

    setPurchaseDate(
      storedData?.datePurchased
        ? moment(storedData?.datePurchased).format("MM/DD/YYYY")
        : ""
    );
    form.setFieldsValue({
      platenumber: vehicleQuote?.plateNumber ? vehicleQuote?.plateNumber : null,
      conductionnumber: vehicleQuote?.conductionNumber
        ? vehicleQuote?.conductionNumber
        : null,
      chassisnumber: vehicleQuote?.chassisNumber
        ? vehicleQuote?.chassisNumber
        : null,
      motornumber: vehicleQuote?.engineNumber
        ? vehicleQuote?.engineNumber
        : null,
      mvfilenumber: vehicleQuote?.fileNumber ? vehicleQuote?.fileNumber : null,
      purchasedate: storedData?.datePurchased
        ? moment(storedData?.datePurchased)
        : "",
    });

  }, []);

  // functions *************
  const storedData = useSelector((state) => state?.motorQuotation?.formData);
  console.log("storedData", storedData);
  const vehicleQuote = useSelector(
    (state) => state?.motorQuotation?.formData?.vehicleData
  );
  // this code is to male conduction madatory
  const modalYearSelected = useSelector(
    (state) => state?.motorQuotation?.formData?.vehicleData?.yearModel
  )

  const currentYearModal = new Date().getFullYear();
  const previousYearModal = currentYearModal - 1;
  const nextYearModal = currentYearModal + 1
  let currentYearModalString = currentYearModal.toString()
  let previousYearModalString = previousYearModal.toString()
  let nextYearModalString = nextYearModal.toString()





  // Calculate the previous year


  // console.log("vehicleQuote", vehicleQuote);
  // upper case data
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  // let createFormData = {
  //   ...test,
  // };

  // console.log("createFormDatavehicle", createFormData);

  const onFinishVehicleQuote = async (formData) => {
    let vehicleInfo = {
      ...storedData,
      nonStandardaccessories,
      isReconditioned: vehicleConditioned,
      datePurchased: purchaseDate,
      vehicleData: {
        ...vehicleQuote,
        fileNumber: mvFileNumber,
        conductionNumber: conductionNumber,
        plateNumber: plateNumber,
        engineNumber: motorNumber,
        chassisNumber: chassisNumber,
      },
    };

    if (modalYearSelected == previousYearModalString || modalYearSelected == currentYearModalString || modalYearSelected == nextYearModalString) {
      if ((plateNumber === null || plateNumber === "") && (conductionNumber === null || conductionNumber === "")) {
        message.error("Please enter either Plate Number or Conduction Number");
        return;
      }


    }
    dispatch(actions.motorQuotationForm(vehicleInfo));

    if (nonStandardaccessories === false) {
      history.push("/coverage-Quote-info");
    } else {
      history.push("/accessory-Quote-info");
    }
  };

  const onChangeVehicleConditioned = (e) => {
    // console.log("tesst", e.target.value);
    setVehicleConditioned(e.target.value);
  };

  const onChangeNonStandardAccessories = (e) => {
    setNonStandardaccessories(e.target.value);
  };

  const onChangeBirthDate = (date, dateString) => {
    setPurchaseDate(dateString);
  };

  const onChangePlateNumber = (e) => {
    setPlateNumber(e.target.value);
  };
  const OnConductionNumberHandler = (e) => {
    setConductionNumber(e.target.value);
  };
  const onChangeChassisNumber = (e) => {
    setChassisNumber(e.target.value);
  };

  const onChangeMotorNumber = (e) => {
    setMotorNumber(e.target.value);
  };

  const onChangeMVFileNumber = (e) => {
    setMVFileNumber(e.target.value);
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/vehicle-information-info");
  };

  // const onchangetoNext = () => {
  //   history.push("/accessory-Quote-info");
  // };

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
              onFinish={onFinishVehicleQuote}
              // onFinishFailed={onFinishFailed}
              // autoComplete="off"\
              form={form}
              fields={[
                {
                  name: ["plateNumber"],
                  value: plateNumber,
                },
                {
                  name: ["chassisNumber"],
                  value: chassisNumber,
                },
                {
                  name: ["mvFileNumber"],
                  value: mvFileNumber,
                },
                {
                  name: ["motorNumber"],
                  value: motorNumber,
                },
                {
                  name: ["conductionNumber"],
                  value: conductionNumber,
                },
              ]}
            >
              <div className="right-side">
                <div className="policy-type">
                  <h2>Let's get to know more about the vehicle.</h2>
                </div>
                <div>
                  <div className="info-head">
                    <h3>Vehicle Information</h3>
                  </div>
                  <div>
                    <Row gutter={16} className="row-bottom-margin">
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="platenumber"
                          label="Plate Number"
                          rules={[
                            {
                              required: modalYearSelected !== previousYearModalString &&
                                modalYearSelected !== currentYearModalString &&
                                modalYearSelected !== nextYearModalString,
                              message: "Plate Number is required",
                            },
                            {
                              max: 11,
                              message: "Maximum of 11 alphanumeric characters",
                            },
                            {
                              validator: (_, value) => {

                                const validPattern = /^[a-zA-Z0-9]*$/;

                                if (value && !validPattern.test(value)) {
                                  return Promise.reject("Special characters are not allowed.");
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="11"
                            placeholder="Plate Number"
                            value={plateNumber}
                            defaultValue={plateNumber}
                            onChange={(item) => onChangePlateNumber(item)}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          // defaultValue={button.sumInsured}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="conductionnumber"
                          label="Conduction Number"
                        // rules={[
                        //   {
                        //     required: false,
                        //     whitespace: true, // Trim whitespace before validation
                        //   },
                        //   {
                        //     max: 6,
                        //     message: "Maximum of 6 alphanumeric characters",
                        //   },
                        //   {
                        //     pattern: /^[a-zA-Z0-9_]+$/,
                        //     message: "Only alphanumeric characters are allowed.",
                        //   },
                        // ]}
                        // rules={[
                        //   {
                        //     required: (modalYearSelected === previousYearModalString || modalYearSelected === currentYearModalString) ? true : false,
                        //     whitespace: true, // Trim whitespace before validation
                        //     message: "Conduction Number is required"
                        //   },
                        //   {
                        //     validator: (_, value) => {
                        //       // If the value is empty, it's considered valid
                        //       if (!value) {
                        //         return Promise.resolve();
                        //       }

                        //       // Use a regular expression to validate the format
                        //       const validPattern = /^[a-zA-Z0-9]+$/;

                        //       if (!validPattern.test(value)) {
                        //         return Promise.reject(
                        //           "Please enter a valid Conduction Number"
                        //         );
                        //       }

                        //       return Promise.resolve();
                        //     },
                        //   },
                        // ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="20"
                            placeholder="Enter Conduction Number"
                            value={conductionNumber}
                            defaultValue={conductionNumber}
                            onChange={(item) => OnConductionNumberHandler(item)}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          // defaultValue={button.sumInsured}
                          />
                        </Form.Item>
                        {/* {destinationErrMsg && (
                          <div className="error-message" style={{ color: "red" }}>
                            {destinationErrMsg}
                          </div>
                        )} */}
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="chassisnumber"
                          label="Chassis/Serial Number"
                          rules={[
                            {
                              required: true,
                              message:
                                "Chassis/Serial Number is required.",
                            },
                            {
                              max: 30,
                              message: "Minimum 5 characters and maximum 30",
                              min: 5,
                            },
                            {
                              validator: (_, value) => {
                                const validPattern = /^[a-zA-Z0-9_]+$/;

                                if (!validPattern.test(value)) {
                                  return Promise.reject(
                                    "Special characters are not allowed."
                                  );
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="30"
                            minLength="15"
                            placeholder="Chassis/Serial Number"
                            value={chassisNumber}
                            defaultValue={chassisNumber}
                            onChange={(item) => onChangeChassisNumber(item)}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          // defaultValue={button.sumInsured}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="motornumber"
                          label="Motor/Engine Number"
                          rules={[
                            {
                              required: true,
                              message:
                                "Motor/Engine Number is required.",
                            },
                            {
                              max: 30,
                              message: "Minimum 5 characters and maximum 30",
                              min: 5,
                            },
                            {
                              validator: (_, value) => {
                                const validPattern = /^[a-zA-Z0-9_]+$/;
                                if (!validPattern.test(value)) {
                                  return Promise.reject(
                                    "Special characters are not allowed."
                                  );
                                }
                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="30"
                            minLength="15"
                            placeholder="Motor/Engine Number"
                            value={motorNumber}
                            defaultValue={motorNumber}
                            onChange={(item) => onChangeMotorNumber(item)}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          // defaultValue={button.sumInsured}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="mvfilenumber"
                          label="MV File Number"
                          rules={[
                            {
                              required: false,
                              message: "MV File Number is required.",
                            },
                            {
                              max: 15,
                              message: "Min 15 Digits allowed.",
                              min: 15,
                            },

                            // {
                            //   validator: (_, value) => {
                            //     const validPattern = /^[0-9]+$/;
                            //     if (!validPattern.test(value)) {
                            //       return Promise.reject(
                            //         "Only numbers are allowed."
                            //       );
                            //     }
                            //     return Promise.resolve();
                            //   },
                            // },
                            // {
                            //   validator: (_, value) => {
                            //     const validPattern = /^[a-zA-Z0-9_]+$/;
                            //     if (!validPattern.test(value)) {
                            //       return Promise.reject(
                            //         "Special characters are not allowed."
                            //       );
                            //     }
                            //     return Promise.resolve();
                            //   },
                            // },
                            {
                              validator: (_, value) => {
                                // If the value is empty, it's considered valid
                                if (!value) {
                                  return Promise.resolve();
                                }

                                // Use a regular expression to validate the format
                                const validPattern = /^[0-9]+$/;

                                if (!validPattern.test(value)) {
                                  return Promise.reject(
                                    "Only numbers are allowed."
                                  );
                                }

                                return Promise.resolve();
                              },
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength={15}
                            minLength={15}
                            placeholder="MV File Number"
                            value={mvFileNumber}
                            defaultValue={mvFileNumber}
                            onChange={(item) => onChangeMVFileNumber(item)}
                            autoComplete="off"
                            onInput={toInputUppercase}
                          // defaultValue={button.sumInsured}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="purchasedate"
                          label="Purchase Date"
                          style={{ marginBottom: "1rem" }}
                        >
                          <DatePicker
                            onChange={onChangeBirthDate}
                            className="first-name input-box"
                            size="large"
                            format="MM/DD/YYYY"
                            placeholder="Select Date"
                            // value={birthdate}
                            style={{ width: "100%" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="register-head">
                          <div className="policy-typeradio">
                            <h2>
                              Is the vehicle reconditioned?{" "}
                              <span style={{ color: "red", marginLeft: "5px" }}>
                                *
                              </span>
                            </h2>
                          </div>

                          <Radio.Group
                            onChange={onChangeVehicleConditioned}
                            value={vehicleConditioned}
                            style={{ marginTop: "5px" }}
                            defaultValue={vehicleConditioned}
                          >
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className="register-head">
                          <div className="policy-typeradio">
                            <h2>Do you have non-standard accessories?</h2>
                          </div>

                          <Radio.Group
                            onChange={onChangeNonStandardAccessories}
                            value={nonStandardaccessories}
                            defaultValue={nonStandardaccessories}
                            style={{ marginTop: "5px" }}
                          >
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                          </Radio.Group>
                        </div>
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
export default VehicleQuote;
