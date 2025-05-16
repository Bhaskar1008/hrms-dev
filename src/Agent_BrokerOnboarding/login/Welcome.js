import React, { useState } from "react";
import { Button, Card, Checkbox, Col, Form, Image, Row, Select, Typography } from "antd";
import icare from "../../images/iCare_Official_Logo.png";
import LoginHeader from "../../components/ICARE/LoginHeader/LoginHeader";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import { useHistory, useLocation } from "react-router";

import { CheckOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
const { Option } = Select;

const Welcome = () => {
  const [consent, setConsent] = useState(false);
  const [role, setRole] = useState("AGENT");
  const [openloader, setOpenloader] = useState(false);

  const handleRegister = () => {
    if (consent) {
      console.log("Proceed to registration with role:", role);
      role === "AGENT" ? history.push("/agent/personalDetails") : history.push("/broker/personalDetails");
      // Navigate to next step or page
    }
  };
  const history = useHistory();
  return (
    <>
      <LoginHeader logoutShow />
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className="welcome-parent">       
        <style>{`
        .custom-checkbox .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #FF6D00;
          border-color: #FF6D00;
        }

        .custom-checkbox .ant-checkbox-inner {
          border-radius: 4px;
        }

        .custom-checkbox .ant-checkbox-checked::after {
          border-color: #FF6D00;
        }
      `}</style>
        <Row justify="center" align="middle" style={{ minHeight: "110vh", background: "#f0f2f5", padding: 16 }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card
              style={{
                width: "100%",
                maxWidth: 450,
                borderRadius: 10,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              <Image src={icare} width={118} preview={false} /> {/* Update with actual path */}
              <Title level={4} style={{ color: "#FF6D00" }}>
                Welcome!
              </Title>
              <Text type="secondary">Before starting registration, review the checklist below and ensure you have the required documents ready for the process.</Text>
              <div style={{ margin: "16px 0" }}>
                <Text style={{ color: "#4AC6BB", fontWeight:"bold" ,fontSize:"14px"}}>
                  Register as
                </Text>
                <Select value={role} onChange={(value) => setRole(value)} bordered={false} style={{ color: "#FF6D00", fontWeight: "500",fontSize:"14px" }}>
                  <Option value="AGENT">AGENT</Option>
                  <Option value="PARTNER">BROKER</Option>
                </Select>
              </div>
              <div style={{ textAlign: "left", marginTop: 16 }}>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                  {["Valid ID (Government Issued)", "NBI Clearance certificate", "TIN No certificate", "Self Photograph (2X2 with White Background)", "All these doc should be ava. as jpeg or pdf"].map((item, index) => (
                    <li key={index} style={{ marginBottom: 8, fontWeight: "500", color: "#818181", fontSize: "12px" }}>
                      <CheckOutlined style={{ marginRight: "2px" }} /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="consent-checkbox" style={{ display: "flex", justifyContent: "flex-start" }}>
                <Checkbox className="custom-checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  style={{
                    marginTop: 16,
                    alignSelf: "flex-start",
                    "--antd-wave-shadow-color": "#FF6D00", // For wave effect
                    "--checkbox-color": "#FF6D00",                   
                  }}
                >
                  <span style={{  fontWeight: "500", fontSize: "14px" }}>Data Privacy Consent</span>
                </Checkbox>
              </div>
              <Row gutter={12} style={{ marginTop: 24 }}>
                <Col span={12}>
                  <Button block style={{ borderColor: "#00BFFF", color: "#00AEC1", width: "100%", borderRadius: "8px" }}>
                    Cancel
                  </Button>
                </Col>
                <Col span={12}>
                  <Button type="primary" block style={{ backgroundColor: consent ? "#FF6D00" : "#7C7C7C", borderColor: "#7C7C7C", width: "100%", borderRadius: "8px", color: "#ffffff" }} onClick={() => handleRegister()} disabled={!consent}>
                    Register
                  </Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Welcome;
