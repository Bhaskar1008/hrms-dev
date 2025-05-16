import React from "react";
import { Typography, Card, Button } from "antd";
// import { FileSearchOutlined, FileImageOutlined } from "@ant-design/icons";
import Analysis from "../../assets/Analysis.png"
import Presentation from "../../assets/Presentation.png"
import { useHistory } from 'react-router-dom';
const { Title, Text } = Typography;

const BrokerStatus = () => {
  const registrationId = "#123456789";
  const history = useHistory();
  const handlePresentationClick = () => {
    console.log("Opening Agency Program Presentation...");
    // Here you can open a link or modal
  };

 

  return (
    <div
    style={{
      padding: 24,
      minHeight: "100vh",
      backgroundColor: "#f6f7fa",
      textAlign: "center",
    }}
  >
    <Title
      level={3}
      style={{
        color: "#FF6D00",
        textAlign: "left",
        fontWeight: "500",
        fontSize: "clamp(24px, 5vw, 42px)",
      }}
    >
     Broker Accreditation
    </Title>

    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <img src={Analysis} width="120px" />
      {/* <FileSearchOutlined style={{ fontSize: 80, color: "#1890ff" }} /> */}

      <Title level={4} style={{ color: "#00AEC1", marginTop: 10}}>
        Verifying Details
      </Title>

      <Text strong style={{color:"#212121"}}>Registration ID: {registrationId}</Text>

      <div style={{ marginTop: 24, maxWidth: 600, marginInline: "auto" }}>
        <p style={{ fontSize: 16, color: "#4A5259" }}>
          Our team is currently verifying your documents before officially accrediting you.
          
        </p>
        <p style={{ fontSize: 16, color: "#4A5259" }}>
        You can return to this page to check your Registration status. We will notify you via email once the validation process is complete.
        </p>
      </div>

      <div style={{ marginTop: 48, maxWidth: 650, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: 16, color: "#4A5259" }}>Meanwhile, explore the BOP/Agency program presentation to learn about iCare and top healthcare plans in the Philippines.</p>

        <div
          hoverable
          style={{
            width: 300,
            height: 80,
            display: 'flex',
            border: "1px solid #ffe7cc",
            margin: "20px",
            justifyContent: "center",
            borderRadius: 10,
            paddingRight: 10,
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
          }}
          onClick={handlePresentationClick}
        >

           <img src={Presentation} width="74px" />
          {/* <FileImageOutlined style={{ fontSize: 40, color: "#FF6D00" }} /> */}
          <div style={{display: "flex", flexDirection: "column", alignItems: 'start' }}>
          <Title style={{ fontSize: "14px", marginTop: 16, color: "#00AEC1" }}>
            Agency program presentation
          </Title>
          <Text style={{ fontSize: 12, color: "#888" }}>TAP TO VIEW</Text>
          </div>

        </div>
      </div>
    </div>
  </div>
  );
};

export default BrokerStatus;
