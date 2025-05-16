import React, { useState } from "react";
import { Form, Upload, Button, Row, Col, Typography, Checkbox } from "antd";
import { FolderAddOutlined, DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import "./DocumentUploadBroker.css";
import { useHistory } from 'react-router-dom';
import axiosRequest from "../../axios-request/request.methods";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;

const DocumentUploadBroker = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [uploadedFiles, setUploadedFiles] = useState({
    tinCertificate: null,
    residenceCertificate: null,
    secRegistration: null,
    icLicense: null,
  });
  const brokerDetails = useSelector((state) => state.brokerReducer.brokerDetails.data)

  console.log(brokerDetails, "akshaysriram")

  const agentId = "6826ab58291ae407c1766cf7";
  const companyName = "ABC XYZ";

  const getUploadProps = (fieldName) => ({
    beforeUpload: async (file) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('agentId', brokerDetails?.agentId);
      formData.append('documentType', getDocumentType(fieldName));
      formData.append('companyName', brokerDetails?.companyName);

      try {
        const response = await axiosRequest.post(
          'agent/document/upload',
          formData, { secure: false }
        );
        console.log(response, "akshaysriram")
        if (response.statusCode != -1) {
          throw new Error('Upload failed');
        }
        console.log(response, "akshaysriram")
        const key = response?.data?.data?.documentUploadResult?.documentType || "";
        setUploadedFiles(prev => ({
          ...prev,
          [fieldName]: key,
        }));
        form.setFieldsValue({ [fieldName]: key });
        console.log('Upload success, key:', key);
      } catch (err) {
        console.error('Upload failed: ' + err.message);
      }
      return false; // Prevent Upload from uploading automatically
    },
    showUploadList: false,
  });

  const getDocumentType = (fieldName) => {
    switch (fieldName) {
      case "tinCertificate":
        return "TIN Certificate";
      case "residenceCertificate":
        return "Company Residence Certificate";
      case "secRegistration":
        return "SEC Registration";
      case "icLicense":
        return "IC lisence";
      default:
        return "";
    }
  };

  const handleRemove = (fieldName) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: null,
    }));
  };

  const renderUploadedFile = (fieldName) => {
    const key = uploadedFiles[fieldName];
    console.log(key, "akshaysriram")
    if (!key) return null;
    return (
      <div className="doc-card doc-upload-row">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FileImageOutlined style={{ color: "#FF6A00", fontSize: 24 }} />
          <Text>{key}</Text>
        </div>
        <DeleteOutlined style={{ color: "red", cursor: "pointer" }} onClick={() => handleRemove(fieldName)} />
      </div>
    );
  };

  const onFinish = async (values) => {
    const documnetSubmitted_Types = Object.entries(uploadedFiles)
      .filter(([_, key]) => !!key)
      .map(([field]) => getDocumentType(field));

    try {
      const response = await axiosRequest.post(
        'agent/submitApplication',
        {
          applicantType: "licenced",
          agentId,
          documnetSubmitted_Types,
          isResubmittingForm: false,
        },
        { secure: false }
      );
      goNext();
    } catch (err) {
      console.error("Application submission failed:", err);
    }
  };

  const goBack = () => {
    history.goBack();
  };

  const goNext = () => {
    history.push("/broker/status");
  };

  return (
    <div className="doc-upload-container">
      <div style={{ padding: 24, backgroundColor: "#f6f7fa", borderRadius: 8, width: `${window.innerWidth < 600 ? "100%" : "70%"}` }}>
        <Title level={3} style={{ color: "#FF6D00", marginBottom: 24, fontWeight: "500", fontSize: "clamp(24px, 5vw, 42px)" }}>
          Broker Accreditation
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish} className="doc-upload-form">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="TIN ID" name="tinCertificate" rules={[{ required: true, message: "Please upload TIN Certificate" }]}>
                <div className="doc-card doc-upload-row">
                  <div className="doc-upload-icon">
                    <FolderAddOutlined style={{ fontSize: "25px" }} />
                  </div>
                  <Upload {...getUploadProps("tinCertificate")}>
                    <Button className="browse-btn">Browse</Button>
                  </Upload>
                </div>
                <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>
                {renderUploadedFile("tinCertificate")}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Company Residence Certificate" name="residenceCertificate" rules={[{ required: true, message: "Please upload Company Residence Certificate" }]}>
                <div className="doc-card doc-upload-row">
                  <div className="doc-upload-icon">
                    <FolderAddOutlined style={{ fontSize: "25px" }} />
                  </div>
                  <Upload {...getUploadProps("residenceCertificate")}>
                    <Button className="browse-btn">Browse</Button>
                  </Upload>
                </div>
                <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>
                {renderUploadedFile("residenceCertificate")}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="SEC Registration" name="secRegistration" rules={[{ required: true, message: "Please upload SEC Registration" }]}>
                <div className="doc-card doc-upload-row">
                  <div className="doc-upload-icon">
                    <FolderAddOutlined style={{ fontSize: "25px" }} />
                  </div>
                  <Upload {...getUploadProps("secRegistration")}>
                    <Button className="browse-btn">Browse</Button>
                  </Upload>
                </div>
                <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>
                {renderUploadedFile("secRegistration")}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="IC Licence" name="icLicense" rules={[{ required: true, message: "Please upload IC License" }]}>
                <div className="doc-card doc-upload-row">
                  <div className="doc-upload-icon">
                    <FolderAddOutlined style={{ fontSize: "25px" }} />
                  </div>
                  <Upload {...getUploadProps("icLicense")}>
                    <Button className="browse-btn">Browse</Button>
                  </Upload>
                </div>
                <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>
                {renderUploadedFile("icLicense")}
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="declaration"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("You must accept the declaration"))),
                  },
                ]}
              >
                <Checkbox className="declaration-text">
                  I hereby declare that the information provided above is true and correct to the best of my knowledge and ability and that I shall conduct myself in accordance with all the Rules and Regulations and Company Policies of Insular Health
                  Care, at all times.
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <div className="doc-btn-group">
            <Button type="default" className="back-btn" onClick={goBack}>
              Back
            </Button>
            <Button type="primary" htmlType="submit" className="next-btn">
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default DocumentUploadBroker;