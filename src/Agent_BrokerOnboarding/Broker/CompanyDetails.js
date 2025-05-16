import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Row, Col, Typography, DatePicker, Select } from "antd";
import "./CompanyDetails.css";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import moment from "moment";

const { Title, Text } = Typography;
const { Option } = Select;

const initialFormState = {
  companyName: "",
  businessAddress1: "",
  businessAddress2: "",
  businessEmail: "",
  state: "",
  city: "",
  telNo: "",
  tinNo: "",
  residenceCertNo: "",
  dateIssued: null,
  placeIssued: "",
  secRegNo: "",
  icLicenseNo: "",
};

const PersonalDetailsBroker = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  const [formData, setFormData] = useState(initialFormState);

  const companyState = useSelector((state) => state?.companyReducer?.companyDetails)

  useEffect(() => {
    if (companyState && Object.keys(companyState).length > 0) {
      const patchedCompanyState = {
        ...companyState,
        dateIssued: companyState.dateIssued
          ? moment(companyState.dateIssued, "MM/DD/YYYY")
          : null,
      };
      setFormData(patchedCompanyState);
      form.setFieldsValue(patchedCompanyState);
    }
  }, [companyState, form]);

  useEffect(() => {
    dispatch(actions.fetchAllState());
  }, [dispatch]);

  const states = useSelector((state) => {
    const s = state?.address?.states;
    return Array.isArray(s) ? s : [];
  });
  const city = useSelector((state) => {
    const c = state?.address?.cities;
    return Array.isArray(c) ? c : [];
  });
  console.log(states, "akshaysriram")

const onChangeBirthDate = (date) => {
  setFormData({
    ...formData,
    dateIssued: date,
  });
  form.setFieldsValue({ dateIssued: date });
};

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value });
  };

  const handleProvinceChange = (provinceCode) => {
    setFormData((prev) => ({
      ...prev,
      state: provinceCode, // storing provinceCode
      city: '', // reset city
    }));
    dispatch(actions.fetchAllCities(provinceCode));
  };

  const handleCityChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      city: value,
    }));
  };

  console.log(formData, "akshaysriram")

  const onFinish = (values) => {
    const dataToSave = {
      ...formData,
      dateIssued: formData.dateIssued
        ? formData.dateIssued.format("MM/DD/YYYY")
        : null,
    };
    dispatch(actions.saveCompanyDetails(dataToSave));
    goNext();
  };

  const goNext = () => {
    history.push("/broker/representativeDetails");
  };

  return (
    <div
      style={{
        padding: 24,
        backgroundColor: "#f6f7fa",
        borderRadius: 8,
        width: "100%",
      }}
    >
      <Title
        level={3}
        style={{
          color: "#FF6D00",
          marginBottom: 24,
          fontWeight: "500",
          fontSize: "clamp(24px, 5vw, 42px)",
        }}
      >
        Broker Accreditation
      </Title>
      <Text
        type="secondary"
        style={{
          fontWeight: "400",
          letterSpacing: "7%",
          color: "#4A5259",
          fontSize: "clamp(5px, 5vw, 14px)",
        }}
      >
        To know you better, fill out this form to complete your registration. Your details will be saved to your account.
      </Text>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={formData}
        style={{ marginTop: 24, width: window.innerWidth < 600 ? "100%" : "80%" }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true, message: "Please enter company name" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={e => handleChange("companyName", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Business Address Line 1"
              name="businessAddress1"
              rules={[{ required: true, message: "Please enter business address" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter business address"
                value={formData.businessAddress1}
                onChange={e => handleChange("businessAddress1", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Business Address Line 2"
              name="businessAddress2"
              rules={[{ required: true, message: "Please enter business address line 2" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter business address"
                value={formData.businessAddress2}
                onChange={e => handleChange("businessAddress2", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Business Email ID"
              name="businessEmail"
              rules={[
                { required: true, message: "Please enter business email" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter business email id"
                value={formData.businessEmail}
                onChange={e => handleChange("businessEmail", e.target.value)}
                suffix={<span style={{ color: "#4AC6BB", letterSpacing: "0.5px", fontWeight: "500" }}>VERIFY</span>}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item label="State" name="state" rules={[{ required: true, message: "Please enter Provinces" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Select size="large" name="state" value={formData.state} allowClear
                onChange={handleProvinceChange} placeholder="Select province">
                {states && states?.map((province) => (
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
            <Form.Item label="City" name="city" rules={[{ required: true, message: "Please enter city" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
              <Select size="large" name="city" value={formData.city} allowClear
                onChange={handleCityChange} placeholder="Select city" disabled={!formData.state || city.length === 0}>
                {city && city?.map((cityItem) => (
                  <Select.Option key={cityItem._id} value={cityItem.Municipality_code}>
                    {cityItem.Municipality_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Tel No"
              name="telNo"
              rules={[{ required: true, message: "Please enter telephone number" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter tel no"
                value={formData.telNo}
                onChange={e => handleChange("telNo", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="TIN No"
              name="tinNo"
              rules={[{ required: true, message: "Please enter TIN number" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter TIN no"
                value={formData.tinNo}
                onChange={e => handleChange("tinNo", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Company Residence Certificate No"
              name="residenceCertNo"
              rules={[{ required: true, message: "Please enter residence certificate number" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter residence certificate No"
                value={formData.residenceCertNo}
                onChange={e => handleChange("residenceCertNo", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Date Issued"
              name="dateIssued"
              rules={[{ required: true, message: "Please enter date issued" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <DatePicker
                onChange={onChangeBirthDate}
                className="first-name input-box"
                size="large"
                format="MM/DD/YYYY"
                placeholder="MM/DD/YYYY"
                style={{ width: "100%" }}
                value={formData.dateIssued}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Place Issued"
              name="placeIssued"
              rules={[{ required: true, message: "Please enter place issued" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter place of issue"
                value={formData.placeIssued}
                onChange={e => handleChange("placeIssued", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="SEC Registration No"
              name="secRegNo"
              rules={[{ required: true, message: "Please enter SEC registration number" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter SEC registration no"
                value={formData.secRegNo}
                onChange={e => handleChange("secRegNo", e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="IC License No"
              name="icLicenseNo"
              rules={[{ required: true, message: "Please enter IC license number" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter IC license no"
                value={formData.icLicenseNo}
                onChange={e => handleChange("icLicenseNo", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <div className="button-group-nxt">
          <Button type="primary" htmlType="submit" className="next-btn">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PersonalDetailsBroker;