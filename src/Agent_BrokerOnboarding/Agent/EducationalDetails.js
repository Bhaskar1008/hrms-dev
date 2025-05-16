import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Row, Col } from "antd";
import "./EducationalDetails.css";
import { useHistory,useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

const EducationalDetails = () => {
  const [form] = Form.useForm();
  const location = useLocation();  
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [educationDetails, setEducationDetails] = useState([]);

  console.log("education",educationDetails)

  const payload = location.state?.payload || {};
  const { personal, bank } = payload;

  const handleEducationChange = (e, level, field) => {
    const { value } = e.target;
  
    setEducationDetails((prev) => {
      return prev.map((item) =>
        item.educationLevel === level
          ? { ...item, [field]: value }
          : item
      );
    });
  };
  

  const handleCheckboxChange = (e, level) => {
    const checked = e.target.checked;
  
    setSelected((prev) =>
      checked ? [...prev, level] : prev.filter((item) => item !== level)
    );
  
    setEducationDetails((prev) => {
      if (checked) {
        // Only add if not already present
        const exists = prev.some((item) => item.educationLevel === level);
        if (!exists) {
          return [...prev, {
            educationLevel: level,
            courseName: "",
            institutionName: "",
            completionYear: ""
          }];
        }
        return prev;
      } else {
        return prev.filter((item) => item.educationLevel !== level);
      }
    });
  };
  
  const handleFinish = () => {
    const updatedPayload = {
      personal,
      bank,
      education: educationDetails
    };

    console.log("Final payload to send:", updatedPayload);
    
    history.push("/agent/workExperience", { payload: updatedPayload });
  };
  const goBack = () => {
    history.goBack();// Go back to previous page
  }
  

  const commonFields = {
    courseName: {
      label: "Course Name",
      placeholder: "Enter course name",
    },
    institutionName: {
      label: "Institution Name",
      placeholder: "Enter institution name",
    },
    completionYear: {
      label: "Completion Year",
      placeholder: "Enter year",
    },
  };

  const educationLabels = {
    highschool: "Highschool Graduate",
    vocational: "Vocational",
    college: "College Graduate",
    postgraduate: "Post Graduate",
  };

  return (
    <div className="education-container">
      <div
        style={{
          padding: 24,
          paddingTop: `${window.innerWidth < 600 ? "0px" : "24px"}`,
          backgroundColor: "#f6f7fa",
          borderRadius: 8,
          width: `${window.innerWidth < 600 ? "100%" : "80%"}`,
        }}
      >
        <Title
          level={3}
          style={{
            color: "#FF6D00",
            marginBottom: 24,
            fontWeight: "500",
            fontSize: "clamp(24px, 5vw, 42px)",
            paddingBottom: "10px",
          }}
        >
          Agent Accreditation
        </Title>
        <div className="education-checkbox-group">
          <Text className="education-subtitle">
            Please provide all details about your educational background.
          </Text>

          <Text className="education-link">Select And Provide Details</Text>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="education-form"
          >
            {Object.entries(educationLabels).map(([key, label]) => (
              <div key={key} style={{ marginBottom: "24px" }}>
                <Checkbox
                  className="custom-checkbox"
                  value={key}
                  checked={selected.includes(key)}
                  onChange={(e) => handleCheckboxChange(e, key)}
                >
                  {label}
                </Checkbox>

                {selected.includes(key) && (
                  <div style={{ marginTop: "12px" }}>
                    {Object.entries(commonFields).map(([fieldKey, field]) => {
                       const inputValue =
                       educationDetails.find((item) => item.educationLevel === key)?.[fieldKey] || "";

                      return (
                        <Form.Item
                        key={`${key}_${fieldKey}`}
                        label={field.label}
                        name={`${key}_${fieldKey}`}
                        rules={[
                          {
                            required: true,
                            message: `Enter ${field.label.toLowerCase()}`,
                          },
                        ]}
                        style={{ marginBottom: "8px" }}
                      >
                          <Input
                            size="large"
                            placeholder={field.placeholder}
                            style={{ borderRadius: "4px" }}
                            value={inputValue}
                            onChange={(e) =>
                              handleEducationChange(e, key, fieldKey)
                            }
                          />
                        </Form.Item>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div className="education-btn-group">
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
    </div>
  );
};

export default EducationalDetails;
