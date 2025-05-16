import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoginHeader from "../../components/ICARE/LoginHeader/LoginHeader";
import PersonalDetailsBroker from "./CompanyDetails";
import CompanyRepresentativeDetails from "./CompanyRepresentative";
import DocumentUploadBroker from "./DocumentUploadBroker";
import BrokerStatus from "./BrokerStatus";
import "./BrokerMain.css";

const BrokerMainApp = () => {
  const history = useHistory();
  const { tabKey } = useParams();
  const [activeKey, setActiveKey] = useState(tabKey || "companyDetails");
  const [_visitedTabs, setVisitedTabs] = useState(new Set());

  const sideTabs = [
    { label: "Company Details", key: "companyDetails", content: <PersonalDetailsBroker /> },
    { label: "Representative Details", key: "representativeDetails", content: <CompanyRepresentativeDetails /> },
    { label: "Document Upload", key: "documentUpload", content: <DocumentUploadBroker /> },
    { label: "Status", key: "status", content: <BrokerStatus /> },
  ];

  useEffect(() => {
    const exists = sideTabs.find((tab) => tab.key === tabKey);
    if (!exists) {     
      history.replace("/broker/companyDetails");
    } else {
      setActiveKey(tabKey);
      setVisitedTabs((prev) => new Set([...prev, tabKey]));
    }
  }, [tabKey, history]);

  // const onTabClick = (key) => {
  //   setActiveKey(key);
  //   history.push(`/broker/${key}`);
  //   setVisitedTabs((prev) => new Set([...prev, key]));
  // };



  const activeTab = sideTabs.find((tab) => tab.key === activeKey);
  const currentIndex = sideTabs.findIndex((tab) => tab.key === activeKey);
  const totalTabs = sideTabs.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalTabs) * 100);

  return (
    <div className="agentMainBg" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", position: "relative", backgroundColor: "#f6f7fa" }}>
      <LoginHeader style={{ zIndex: 1000 }} />
      <div className="agentMainContainer" style={{ display: "flex", flex: 1, marginTop: "60px", overflow: "hidden", backgroundColor: "#f6f7fa" }}>
         {/* Vertical Navigation with Progress Line */}
         <div style={{ display: "flex", padding: "20px" , marginTop: "20px", marginRight : "60px"}}>
          {/* Progress Line */}
          <div style={{ position: "relative", marginRight: "20px",marginTop: "16px" }}>
            <div
              style={{
                width: "10px",
                height: `${totalTabs * 49}px`,
                backgroundColor: "#ddd",
                borderRadius: "4px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: `${progressPercent}%`,
                  backgroundColor: "#00BCD4",
                  borderRadius: "4px",
                  position: "absolute",
                  top: 0,
                  transition: "height 0.3s ease",
                }}
              />
            </div>
         
          </div>

          {/* Tab List */}
          <div>
            {sideTabs.map((tab) => (
              <div
                key={tab.key}
                // onClick={() => onTabClick(tab.key)}
                style={{
                  // cursor: "pointer",
                  marginBottom: "10px",                 
                  fontWeight: activeKey === tab.key ? "bold" : "normal",
                  color: activeKey === tab.key ? "#18191B" : "#000",
                  lineHeight: "48px",
                }}
              >
                {tab.label.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: `${window.innerWidth < 600 ? "0px" : "20px"}`,
            background: "#f6f7fa",
            overflowY: "auto",
            height: "calc(100vh - 60px)",
            
          }}
          className="tab-content"
        >
          {activeTab ? activeTab.content : <div style={{ color: "red" }}>No content available for {activeKey}</div>}
        </div>
      </div>
    </div>
  );
};

export default BrokerMainApp;
