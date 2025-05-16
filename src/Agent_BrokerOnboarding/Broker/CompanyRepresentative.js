import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Typography } from "antd";
import "./CompanyRepresentative.css";
import { useHistory } from 'react-router-dom';
import axiosRequest from "../../axios-request/request.methods";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const { Title, Text } = Typography;

const initialFormState = {
  firstName: "",
  lastName: "",
  designation: "",
  mobileNo: "",
  email: "",
};

const CompanyRepresentativeDetails = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(initialFormState);

  const companyState = useSelector((state) => state?.companyReducer?.companyDetails)
  const representativeState = useSelector((state) => state?.representativeReducer?.representativeDetails)

  console.log(representativeState, "akshaysriram")

  useEffect(() => {
    if (representativeState && Object.keys(representativeState).length > 0) {
      setFormData(representativeState);
      form.setFieldsValue(representativeState);
    }
  }, [representativeState, form]);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    form.setFieldsValue({ [field]: value });
  };

  const onFinish = async () => {
    const companyDetails = {
      companyName: companyState?.companyName,
      companyResidentCerificateNo: companyState?.residenceCertNo,
      dateIssued: moment(companyState?.dateIssued, "MM/DD/YYYY").format("YYYY-MM-DD"),
      placeIssued: companyState?.placeIssued,
      secRegNo: companyState?.secRegNo,
      icLicNo: companyState?.icLicenseNo,
      tin: companyState?.tinNo,
      businessEmail: companyState?.businessEmail,
      telNo: companyState?.telNo,
      address1: companyState?.businessAddress1,
      address2: companyState?.businessAddress2
    };

    const representative = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      designation: formData.designation,
      mobileNo: formData.mobileNo,
      email: formData.email
    };

    dispatch(actions.saveRepresentativeDetails(representative));

    try {
      const response = await axiosRequest.post(
        'agent/register',
        {
          accreditationType: "broker",
          companyDetails,
          representative
        },
        { secure: false }
      );
      if (response.statusCode === -1) {
        dispatch(actions.brokerDetails(response))
        history.push("/broker/documentUpload");
      }
    } catch (err) {
      console.error("Registration submission failed:", err);
    }
  };

  const goBack = () => {
    history.goBack();
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
        Please provide Company Representative details
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
              label="Representative First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={e => handleChange("firstName", e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Representative Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={e => handleChange("lastName", e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Designation"
              name="designation"
              rules={[{ required: true, message: "Please enter designation" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter designation"
                value={formData.designation}
                onChange={e => handleChange("designation", e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Mobile No"
              name="mobileNo"
              rules={[{ required: true, message: "Please enter mobile number" }]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter mobile number"
                value={formData.mobileNo}
                onChange={e => handleChange("mobileNo", e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Email ID"
              name="email"
              rules={[
                { required: true, message: "Please enter email ID" },
                { type: "email", message: "Please enter a valid email address" },
              ]}
              labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
            >
              <Input
                size="large"
                placeholder="Enter email ID"
                value={formData.email}
                onChange={e => handleChange("email", e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <div className="button-group">
          <Button type="default" className="back-btn" onClick={goBack}>
            Back
          </Button>
          <Button type="primary" htmlType="submit" className="next-btn">
            Next
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CompanyRepresentativeDetails;