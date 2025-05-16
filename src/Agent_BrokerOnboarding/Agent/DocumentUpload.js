import React from "react";
import { Upload, Button, Typography, Form, Checkbox } from "antd";
import "./DocumentUpload.css";
import { FolderAddOutlined  } from "@ant-design/icons";
import { useHistory } from 'react-router-dom';
const { Title, Text, Link } = Typography;

const DocumentUpload = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const uploadProps = {
    beforeUpload: () => false, // Don't upload automatically
    maxCount: 1,
  };

  const downloadFile = (fileUrl) => {
    const allowedExtensions = ['pdf', 'jpg'];
    const fileExt = fileUrl.split('.').pop().toLowerCase();
  
    if (allowedExtensions.includes(fileExt)) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = fileUrl.split('/').pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Only PDF or JPG files can be downloaded.");
    }
  };
 

  const handleSubmit = (values) => {
    console.log("Uploaded Documents:", values);
    goNext();
  };
  const goBack = () => {
    history.goBack(); // Go back to previous page
  }

  const goNext = () =>{
    history.push("/agent/status");
  }
  return (
    <div className="doc-upload-container">
      {/* <div className="doc-upload-card"> */}
      <div style={{ padding: 24, paddingTop: `${window.innerWidth < 600 ? "0px" : "24px"}`, backgroundColor: "#f6f7fa", borderRadius: 8, width: `${window.innerWidth < 600 ? "100%" : "80%"}` }}>
        <Title level={3} style={{ color: "#FF6D00", marginBottom: 24, fontWeight: "500", fontSize: "clamp(24px, 5vw, 42px)" }}>
          Agent Accreditation
        </Title>
        <div className="doc-download">
         <a href="" target="_blank" className="download-form" onClick={() => downloadFile("https://example.com/sample.pdf")}>Download Form</a>
          <p style={{color:"#4A5259",fontSize: "14px",fontWeight:"400", marginTop: "10px"}}>Click here to open the form link, fill it out and submit.</p>
        </div>
        <div className="doc-card" style={{ marginBottom: "4%" }}>
          <Text  className="doc-card-title">Agent Contract Form</Text>
                  <label htmlFor="fileUpload" className="doc-card-subtitle" >
          Click to open
        </label>
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
        />               
        </div>

        <Form form={form} layout="vertical" onFinish={handleSubmit} className="doc-upload-form">
          <Form.Item label="Agent Contract Form"  className="custom-form-label" name="agentContractForm" rules={[{ required: true, message: "Please upload Agent Contract Form" }]}>
            <div className="doc-card doc-upload-row ">
              <div className="doc-upload-icon">
                <FolderAddOutlined style={{fontSize: "25px"}} />
              </div>
              <Upload {...uploadProps}>
                <Button className="browse-btn">Browse</Button>
                
              </Upload>
            </div>
            <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>
          </Form.Item>
       
          <p className="doc-paragraph-text">Please download form from below to fill them out. You will require scanned copy to upload.</p>
          
          <div className="doc-card" style={{ marginBottom: "4%" }}>
            <Text className="doc-card-title">UBP ePAYCARD account opening form</Text>
            <a href="" target="_blank" className="doc-card-subtitle" onClick={() => downloadFile("https://example.com/sample.pdf")}>
              Download
            </a>            
          </div>

          <Form.Item label="UBP ePAYCARD Account Opening Form"  className="custom-form-label" name="epaycardaccountopening" rules={[{ required: true, message: "Please upload UBP EPAYCARD Account Opening Form" }]}>
            <div className="doc-card doc-upload-row">
              <div className="doc-upload-icon">
                <FolderAddOutlined style={{fontSize: "25px"}} />
              </div>
              <Upload {...uploadProps}>
                <Button className="browse-btn">Browse</Button>
              </Upload>
            </div>
            <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>
          </Form.Item>

          <Title level={5} className="doc-section-title">
            ID Proof
          </Title>

          <Form.Item label="TIN ID"   className="custom-form-label" name="tinId" rules={[{ required: true, message: "Please upload TIN ID" }]}>
            <div className="doc-card doc-upload-row">
              <div className="doc-upload-icon">
                <FolderAddOutlined style={{fontSize: "25px"}} />
              </div>
              <Upload {...uploadProps}>
                <Button className="browse-btn">Browse</Button>
              </Upload>
            </div>
          </Form.Item>

          <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>

          <Form.Item label="Valid ID (Government Issued)"  className="custom-form-label" name="validId" rules={[{ required: true, message: "Please upload Valid ID" }]}>
            <div className="doc-card doc-upload-row">
              <div className="doc-upload-icon">
                <FolderAddOutlined style={{fontSize: "25px"}} />
              </div>
              <Upload {...uploadProps}>
                <Button className="browse-btn">Browse</Button>
              </Upload>
            </div>
          </Form.Item>

          <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>

          <Title level={5} className="doc-section-title">
            For Agency Leaders
          </Title>

          <Form.Item label="NBI Clearance Form" className="custom-form-label" name="nbiClearance">
            <div className="doc-card doc-upload-row">
              <div className="doc-upload-icon">
                <FolderAddOutlined style={{fontSize: "25px"}} />
              </div>
              <Upload {...uploadProps}>
                <Button className="browse-btn">Browse</Button>
              </Upload>
            </div>
          </Form.Item>

          <Text className="doc-note">Maximum 2 MB. PNG or JPG files only</Text>

          <Title level={5} className="doc-section-title">
            Other Documents
          </Title>

          <Form.Item label="2x2 Size Photo (White Background)"  className="custom-form-label" name="photo" rules={[{ required: true, message: "Please upload 2x2 Photo" }]}>
            <div className="doc-card doc-upload-row">
              <div className="doc-upload-icon">
                <FolderAddOutlined style={{fontSize: "25px"}} />
              </div>
              <Upload {...uploadProps}>
                <Button className="browse-btn">Browse</Button>
              </Upload>
            </div>
          </Form.Item>

          <Text className="doc-note">Size: 2x2 inch. Maximum 2 MB. PNG or JPG files only</Text>

          <Form.Item
            name="declaration"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("You must accept the declaration"))),
              },
            ]}
          >
            <Checkbox className="declaration-text">I hereby declare that the information provided above is true and correct to the best of my knowledge and ability and that I shall conduct myself in accordance with all the Rules and Regulations and Company Policies of Insular Health Care, at all times.</Checkbox>
          </Form.Item>

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

export default DocumentUpload;
