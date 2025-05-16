import React, { useState } from "react";
import { Form, Input, Button, Select, Radio, Typography, Checkbox ,Divider} from "antd";
import { PlusSquareFilled } from "@ant-design/icons";
import "./WorkExperience.css";
import { useHistory,useLocation } from 'react-router-dom';
import apiConfig from "../../config/api.config";
const { Title, Text } = Typography;
const { Option } = Select;
const { baseURL } = apiConfig;
const WorkExperience = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const [workList, setWorkList] = useState([{ id: 1 }]);
  const [noWorkExperience, setNoWorkExperience] = useState(false);
  const history = useHistory();

 // Get previous payload sent from educationalDetails page
 const prevPayload = location.state?.payload || {};
 const { personal, bank, education } = prevPayload;

  const addWorkExperience = () => {
    setWorkList([...workList, { id: workList.length + 1 }]);
  };

  const handleFinish = async (values) => {
    // If no work experience, send empty array
    const workExperiencePayload = noWorkExperience ? [] : (values.work || []);
  
    const workPayload = {
      workExperience: workExperiencePayload,
      hasBeenAgent: values.hasBeenAgent || "no",
      stillConnected: values.stillConnected || "no",
      hasCases: values.hasCases || "no",
      hasBeenTerminated: values.hasBeenTerminated || "no",
    };
  
    const updatedPayload = {
      personal,
      bank,
      education,
      work: workPayload
    };

    console.log("Updated Payload:", updatedPayload);

    try {
      const response = await fetch(`${baseURL}auth/agent/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add auth headers here if needed, e.g. Authorization
        },
        body: JSON.stringify(updatedPayload),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("API response:", data);
  
      // Navigate to next step or show success message
      history.push("/agent/documentUpload", { payload: updatedPayload });
  
    } catch (error) {
      console.error("API call failed:", error);
      // Show error to user if needed
    }
  
    
  };
  

  const goBack = () => {
    history.goBack(); // Go back to previous page
  };

  const containerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '16px 0'
  };

  const buttonStyle = {
    color: '#FF6D00', 
    background:"none",
    border:"none",
    outlined:"none",
    cursor:"pointer",
    fontSize:"14px",
    fontWeight:"500"
  };
  return (
    <div className="work-container">
      {/* <div className="work-card"> */}

      <div style={{ padding: 24, paddingTop: `${window.innerWidth < 600 ? "0px" : "24px"}`, backgroundColor: "#f6f7fa", borderRadius: 8, width: `${window.innerWidth < 600 ? "100%" : "80%"}` }}>
        <Title level={3} style={{ color: "#FF6D00", marginBottom: 24, fontWeight: "500", fontSize: "clamp(24px, 5vw, 42px)" }}>
          Agent Accreditation
        </Title>
        <Text className="work-subtitle">Please provide all details about your working and selling experiences.</Text>
        <p className="work-experience">Work Experience</p>
        <Checkbox checked={noWorkExperience} onChange={(e) => setNoWorkExperience(e.target.checked)} style={{ color: "#707070", fontWeight: "400", fontSize: "14px" }}>
          I have no work experience
        </Checkbox>

        <Form form={form} layout="vertical" onFinish={handleFinish} className="work-form">
          {!noWorkExperience &&
            workList.map((work, index) => (
              <div key={work.id} className="work-block">
               <div className="work-divider" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ fontWeight: "500", fontSize: "12px", color: "#00AEC1", marginRight: '10px' }}>
                    Work Experience {index + 1}
                  </span>
                  <div style={{ flexGrow: 1, height: '1px', backgroundColor: '#E0E0E0' }} />
                </div>

                <Form.Item
                  label="Job Title"
                  name={["work", index, "jobTitle"]}
                  rules={[{ required: true, message: "Please enter job title" }]}
                  labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
                  style={{ marginBottom: "8px" }}
                >
                  <Input size="large" placeholder="Enter Job Title" style={{ borderRadius: "4px" }} />
                </Form.Item>

                <Form.Item
                  label="Company"
                  name={["work", index, "company"]}
                  rules={[{ required: true, message: "Please enter company name" }]}
                  labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
                  style={{ marginBottom: "8px" }}
                >
                  <Input size="large" placeholder="Placeholder text" style={{ borderRadius: "4px" }} />
                </Form.Item>

                <div className="work-row">
                  <Form.Item
                    label="From"
                    name={["work", index, "from"]}
                    rules={[{ required: true, message: "Select from year" }]}
                    labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
                    style={{ marginBottom: "8px", width: "50%" }}
                  >
                    <Input size="large" placeholder="Start Year" style={{ borderRadius: "4px" }} />
                  </Form.Item>

                  <Form.Item
                    label="To"
                    name={["work", index, "to"]}
                    rules={[{ required: true, message: "Select to year" }]}
                    labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}
                    style={{ marginBottom: "8px", width: "50%" }}
                  >
                   <Input size="large" placeholder="End Year" style={{ borderRadius: "4px" }} />
                  </Form.Item>
                </div>
              </div>
            ))}

          {!noWorkExperience && (
            <div style={containerStyle}>
            <Button type="text" 
              icon={<PlusSquareFilled style={{ fontSize: '18px', verticalAlign: 'middle'  }}/>}
              onClick={addWorkExperience}
              style={buttonStyle}
            >
             <span style={{ verticalAlign: 'middle' ,marginTop : "5px"}}>Add Work Experience</span>
            </Button>
          </div>
          )}

          <Divider className="work-divider" />

          <p className="work-experience">Declarations</p>

          <div className="declaration-group">
            <Text style={{ fontWeight: 500 }}>Have you been an agent of any HMO, Life, Non-Life, Pre-Need Company before?</Text>
            <Form.Item name="hasBeenAgent" rules={[{ required: true }]}>
              <Radio.Group >
                <Radio className="custom-radio" value="yes">Yes</Radio>
                <Radio  className="custom-radio" value="no">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Text style={{ fontWeight: 500 }}>Are you still connected with the said company?</Text>
            <Form.Item name="stillConnected" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio className="custom-radio"  value="yes">Yes</Radio>
                <Radio className="custom-radio"  value="no">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Text style={{ fontWeight: 500 }}>Has there been any civil or criminal filed or pending case against you?</Text>
            <Form.Item name="hasCases" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio className="custom-radio"  value="yes">Yes</Radio>
                <Radio className="custom-radio" value="no">No</Radio>
              </Radio.Group>
            </Form.Item>

            <Text style={{ fontWeight: 500 }}>Have you ever been discharged or terminated from any employment?</Text>
            <Form.Item name="hasBeenTerminated" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio className="custom-radio" value="yes">Yes</Radio>
                <Radio className="custom-radio" value="no">No</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="work-btn-group">
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

export default WorkExperience;
