import React, { useState } from "react";
import "./QuotePolicyInformation.css"
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

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
} from "antd";

import TravelInfo from "../TravelInfo/TravelInfo";
import StepTwo from "../../MotorComprehensive/components/StepBar/StepTwo/StepTwo";

export default function QuotePolicyInformation() {
  const [policyTypeD2, setPolicyTypeD2] = useState("");
  const [showTraveler2Fields, setShowTraveler2Fields] = useState(false);
  const [showTraveler3Fields, setShowTraveler3Fields] = useState(false);

  const [showTraveler4Fields, setShowTraveler4Fields] = useState(false);

  const { Option } = Select;
  const PolicyOptionType2 = [
    { label: "Individual", value: "Individual" },
    { label: "Group", value: "Group" },
  ];
  const PolicyOptionOnchange = (e) => {
    setPolicyTypeD2(e);
  };
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const onClickNext = () => {
    history.push("/quick-quote-info");
  };
  return (
    <>
      <div className="parent-customer">
        <div className="left-side">
          <Button type="dashed" onClick={onChangetoDashboard} className="dashbtn">
            <ArrowLeftOutlined />
            Back to dashboard
          </Button>
          <StepTwo />
        </div>
        <div className="rightsides">
          <h6 className="headers">
            Let's get started with some important details.
          </h6>
          <div>
            <h5 className="heading">Policy Holder Information</h5>
          </div>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="First Name"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "please enter your name !",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder="Customer Name" className="inputbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Middle Name"
                label="Middle Name"
                rules={[
                  {
                    required: true,
                    message: "please enter your middle name !",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder="Customer Name" className="inputbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Last Name"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "please enter your name !",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder="Customer Name" className="inputbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Birthdate"
                label="Birthdate"
                rules={[
                  {
                    required: true,
                    message: "please enter your birthdate",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <DatePicker
                 size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Suffix"
                label="Suffix"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  placeholder="suffix"
                  bordered={false}
                  className="inputbox"
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Gender"
                label="Gender"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  placeholder="Gender"
                  size="large"
                  // className="inputbox"
                  // bordered={false}
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="form-item-name la"
                {...formItemLayout}
                name="Place of Birth"
                label="Place of Birth"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder="Location" className="inputbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                className="form-item-name la"
                {...formItemLayout}
                name="Citizenship"
                label="Citizenship"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  placeholder="citizenship"
                  size="large"
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                className="form-item-name la"
                {...formItemLayout}
                // className="form-item-name label-color"
                name="phone"
                label="Mobile Number"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                  // {
                  //   message:
                  //   "Mobile Number should be 10 digits and start with 0 & 9 Only",
                  //   pattern: new RegExp(/^[09]\d*$/),
                  // },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input
                className="inputbox"
                  placeholder=" Enter Primary Mobile"
                  // value={primaryNo}
                  // defaultValue={primaryNo}
                  // onChange={(item) => primaryNoHandler(item)}
                  maxLength={10}
                  // disabled={isDisabled}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                className="form-item-name la"
                {...formItemLayout}
                // className="form-item-name label-color"
                name="Email Address"
                label="Email Address"
                rules={[
                  {
                    type: "email",
                    message: "Please provide valid email address",
                  },
                  //    {
                  //     message: "Enter valid email address",
                  //     pattern: new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/),
                  //  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input
                className="inputbox"
                  placeholder="Enter Email Address"
                  // value={email}
                  // defaultValue={storeEmailValue}
                  // onChange={(item) => emailAddressHandler(item)}
                  autoComplete="off"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                className="form-item-name la"
                {...formItemLayout}
                // className=""
                name="state"
                label="Province"
                rules={[
                  {
                    required: false,
                    message: "Select  Province!",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                  size="large"
                  // size="default"
                  placeholder="Select Your Province"
                  // options={stateOptions}
                  // onSelect={(e,data)=>stateSelectHandler(e,data)}
                  // value={stateProvince}
                  autoComplete="on"
                  // defaultValue={storeStateValue}
                  // onChange={(item, key) => stateChangetHandler(item, key)}
                  // onChange={stateChangetHandler}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={24} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="city"
                label="City"
                rules={[
                  {
                    required: false,
                    message: "Please select your city!",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                  
                  size="large"
                  placeholder="Select  city"
                  // options={citiesOptions}
                  autoComplete="off"
                  // value={cityProvince}
                  // defaultValue={storeCityValue}
                  // onChange={(item, key) => cityChangeHandler(item, key)}
                ></Select>
              </Form.Item>
            </Col>
          </Row>
          <Col xs={24} sm={12} md={24} lg={12} xl={24}>
            <Form.Item
              {...formItemLayout}
              className="form-item-name la"
              name="Zip Code"
              label="Zip Code"
              rules={[
                {
                  required: false,
                  message: "Please select your Zip Code",
                },
              ]}
              style={{ marginBottom: "1rem" }}
            >
              <Select
              size="large"
                placeholder="Zip Code"
              ></Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={24} lg={12} xl={24}>
            <Form.Item
              className="form-item-name la"
              {...formItemLayout}
              // className="form-item-name label-color"
              name="Address line 1"
              label="Address line 1"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                className="inputbox"
                placeholder=" line 2"
                // onChange={addLine1Handler}
                // value={addressLine1}
                // maxLength={35}
                // autoComplete="off"
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={24} lg={12} xl={24}>
            <Form.Item
              {...formItemLayout}
              className="form-item-name la"
              // className="form-item-name label-color"
              name="Address line 2"
              label="Address line 2"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                className="inputbox"
                placeholder=" Line 2"
                // onChange={addLine1Handler}
                // value={addressLine1}
                // maxLength={35}
                // autoComplete="off"
              />
            </Form.Item>
          </Col>
          <div>
            <h5 className="Travelerinfo">Travel Information</h5>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Country to visit"
                label="Country to visit"
                rules={[
                  {
                    required: true,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                 size="large"
                  style={{ width: "100%" }}
                  placeholder="Philippines"
                  optionFilterProp="children"
                  // onChange={onChaangeMake}
                  // onSearch={onSearch}
                  // value={makeVehical}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled
                >
                  {/* {makeOption.map((item, index) => 
                            <Option key={index} value={item.value}>{item.label}</Option>) } */}
                </Select>
              </Form.Item>
            </Col>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="Travel package"
                  label="Travel package"
                  rules={[
                    {
                      required: true,
                      message: "Make",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Select
                    showSearch
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Default"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  ></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="Currency"
                  label="Currency"
                  rules={[
                    {
                      required: true,
                      message: "Make",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <Select
                   size="large"
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="PHP"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    disabled
                  ></Select>
                </Form.Item>
              </Col>
            </Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Product"
                label="Product"
                rules={[
                  {
                    required: true,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <div className="btn_parent">
                <div>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Button className="traveloption">Travel Basic</Button>
            </Col>
          </div>
          <div>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Button className="traveloption">Travel Plus (COVID-19 covered) </Button>
            </Col>
          </div>
                </div>
                   
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Medical Package"
                label="Medical Package"
                rules={[
                  {
                    required: true,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
            </Col>

            <div>
              <div className="header2">Is this a one way trip?</div>
              <div>
                <Radio.Group style={{ marginTop: "5px", gap: "32px" }}>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>{" "}
              </div>
            </div>
            <Row gutter={16} style={{ width: "100%" }}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="Arrival Date"
                  label="Arrival Date"
                  rules={[
                    {
                      required: true,
                      message: "Arrival Date",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <DatePicker
                    
                    size="large"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Form.Item
                  {...formItemLayout}
                  className="form-item-name la"
                  name="Departure Date"
                  label="Departure Date"
                  rules={[
                    {
                      required: true,
                      message: "Departure Date",
                    },
                  ]}
                  style={{ marginBottom: "1rem" }}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    
                  />
                </Form.Item>
              </Col>
            </Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Trip Duration"
                label="Trip Duration"
                rules={[
                  {
                    required: false,
                    message: "Trip Duration",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                 size="large"
                  style={{ width: "100%" }}
                  placeholder="Days"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  disabled
                ></Select>
                <div style={{ color: "#818F99", fontsize: "12px" }}>
                  Trip Duration will automatically be updated for you.
                </div>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={24}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Complete Itinerary"
                label="Complete Itinerary"
                rules={[
                  {
                    required: false,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input className="inputbox" placeholder="itinerary"></Input>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Purpose of Trip"
                label="Purpose of Trip"
                rules={[
                  {
                    required: false,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="others"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
                <div style={{ marginTop: "16px" }}>
                  <Input
                    className="inputbox"
                    placeholder="Specify Purpose of Trip"
                  />
                </div>
              </Form.Item>
            </Col>

            <div>
              <div className="header2">
                Will traveler/s be participating in hazardous sports?
              </div>
              <div>
                <Radio.Group style={{ marginTop: "5px", gap: "32px" }}>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </div>
              <input placeholder="sports" type="text" className="textinputt" />
            </div>
            <div className="header2">
              Will traveler/s be bringing sports equipment?
            </div>
            <div>
              <Radio.Group style={{ marginTop: "5px" }}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <input
              placeholder="Type of Equipment"
              type="text"
              className="textinputt"
            />
            <div className="header2">Will traveler/s be going on a cruise?</div>
            <div>
              <Radio.Group style={{ marginTop: "5px" }}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <div className="header2">Are traveler/s COVID-19 covered? </div>
            <div>
              <Radio.Group style={{ marginTop: "5px" }}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Type of Coverage"
                label="Type of Coverage"
                rules={[
                  {
                    required: true,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                 size="large"
                  style={{ width: "100%" }}
                  placeholder="Select"
                  optionFilterProp="children"
                  onChange={PolicyOptionOnchange}
                  value={policyTypeD2}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {PolicyOptionType2.map((item, index) => (
                    <Option key={index} value={item.value}>
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </div>
          <div>
            <h5 className="Travelerinfo">Traveler Information</h5>
            <div className="traveler_btn">
              <b className="traveler">Traveler 1</b>
              <input type="checkbox" />
            </div>
            <div className="header2">Is the policy holder a traveler?</div>
            <div>
              <Radio.Group style={{ marginTop: "5px", gap: "32px" }}>
                <Radio value="yes">Yes</Radio>
                <Radio value="no">No</Radio>
              </Radio.Group>
            </div>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Complete Name"
                label="Complete Name"
                rules={[
                  {
                    required: true,
                    message: "please enter your complete name !",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder="Customer Name" className="inputbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Birthdate"
                label="Birthdate"
                rules={[
                  {
                    required: true,
                    message: "please enter your birthdate",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <DatePicker
                 size="large"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Passport Number"
                label="Passport Number"
                rules={[
                  {
                    required: true,
                    message: "please enter your passport name !",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder="Customer Name" className="inputbox" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Relationship"
                label="Relationship"
                rules={[
                  {
                    required: true,
                    message: "Make",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Select
                  showSearch
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Select"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                className="form-item-name la"
                name="Physician’s Name & Number"
                label="Physician’s Name & Number"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
                style={{ marginBottom: "1rem" }}
              >
                <Input placeholder=" Name & Number" className="inputbox" />
              </Form.Item>
            </Col>

            {/* traveler 2 informtaion */}
            <div className="traveler_btn">
              <b className="traveler">Traveler 2</b>
              <input
                type="checkbox"
                onChange={(e) => setShowTraveler2Fields(e.target.checked)}
              />
            </div>
            {showTraveler2Fields && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Complete Name"
                    label="Complete Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your complete name!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder="Customer Name" className="inputbox" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Birthdate"
                    label="Birthdate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your birthdate",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <DatePicker
                     
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Passport Number"
                    label="Passport Number"
                    rules={[
                      {
                        required: true,
                        message: "please enter your passport name !",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder="Customer Name" className="inputbox" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Relationship"
                    label="Relationship"
                    rules={[
                      {
                        required: true,
                        message: "Make",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Physician’s Name & Number"
                    label="Physician’s Name & Number"
                    rules={[
                      {
                        required: false,
                        message: "",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder=" Name & Number" className="inputbox" />
                  </Form.Item>
                </Col>
              </>
            )}
          </div>
          <div className="traveler-parent">
            <div className="traveler_btn">
              <b className="traveler">Traveler 3</b>
              <input
                type="checkbox"
                onChange={(e) => setShowTraveler3Fields(e.target.checked)}
              />
            </div>
            {showTraveler3Fields && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Complete Name"
                    label="Complete Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your complete name!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder="Customer Name" className="inputbox" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Birthdate"
                    label="Birthdate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your birthdate",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <DatePicker
                     
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Passport Number"
                    label="Passport Number"
                    rules={[
                      {
                        required: true,
                        message: "please enter your passport name !",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder="Customer Name" className="inputbox" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Relationship"
                    label="Relationship"
                    rules={[
                      {
                        required: true,
                        message: "Make",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Physician’s Name & Number"
                    label="Physician’s Name & Number"
                    rules={[
                      {
                        required: false,
                        message: "",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder=" Name & Number" className="inputbox" />
                  </Form.Item>
                </Col>
              </>
            )}
          </div>
          <div className="traveler-parent">
            <div className="traveler_btn">
              <b className="traveler">Traveler 4</b>
              <input
                type="checkbox"
                onChange={(e) => setShowTraveler4Fields(e.target.checked)}
              />
            </div>
            {showTraveler4Fields && (
              <>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Complete Name"
                    label="Complete Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your complete name!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder="Customer Name" className="inputbox" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Birthdate"
                    label="Birthdate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your birthdate",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <DatePicker
                       size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Passport Number"
                    label="Passport Number"
                    rules={[
                      {
                        required: true,
                        message: "please enter your passport name !",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder="Customer Name" className="inputbox" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Relationship"
                    label="Relationship"
                    rules={[
                      {
                        required: true,
                        message: "Make",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "100%" }}
                      placeholder="Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Physician’s Name & Number"
                    label="Physician’s Name & Number"
                    rules={[
                      {
                        required: false,
                        message: "",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input placeholder=" Name & Number" className="inputbox" />
                  </Form.Item>
                </Col>
          
              </>

            )}
                  <div>
            <h6 className="travel-heading "> Select a Product </h6>
          </div>
          <div>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Button className="traveloption">Travel Basic</Button>
            </Col>
          </div>
          <div>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <Button className="traveloption">Travel Plus (COVID-19 covered) </Button>
            </Col>
          </div>
          </div>
          <div className="traveler-parent" >
            <Button className="next-btn" onClick={onClickNext} >
              Next <ArrowRightOutlined />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
