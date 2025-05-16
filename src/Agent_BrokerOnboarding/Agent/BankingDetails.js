import React , {useState,useEffect} from "react";
import { Form, Input, Button, Col, Row, Typography } from "antd";
import "./BankingDetails.css";
import { useHistory,useLocation } from 'react-router-dom';
const { Title, Text } = Typography;


const BankingDetails = () => {
  const [form] = Form.useForm();
  const location = useLocation();
  const history = useHistory();
  
  const  [bank, setBank] = useState({    
      bankName: "",
      branchName: "",
      accountName: "",
      accountNo: ""   
  });
  const personal = location.state?.personal || {};


  
  const handleBankChange = (e) => {
    const { name, value } = e.target;  
    setBank((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  


  const handleFinish = (values) => {
    const payload = {
      personal, 
      bank     
    };  
    console.log("Payload to send:", payload);
    history.push("/agent/educationalDetails",{ payload });
  };




  const goBack = () => {
    history.goBack(); // Go back to previous page
  };
  const goNext = () =>{
    history.push("/agent/educationalDetails");
  }

 
  return (
    <div className="accreditation-container">
      {/* <div className="accreditation-card">
       */}
      <div style={{ padding: 24, paddingTop: `${window.innerWidth < 600 ? "0px" : "24px"}`, backgroundColor: "#f6f7fa", borderRadius: 8, width: `${window.innerWidth < 600 ? "100%" : "80%"}` }}>
        <Title level={3} style={{ color: "#FF6A00", marginBottom: 24, fontWeight: "500", fontSize: "clamp(24px, 5vw, 42px)" }}>
          Agent Accreditation
        </Title>
        <Text className="accreditation-subtitle">Please provide Bank Account Details For Crediting of Prospective Commissions.</Text>

        <Form form={form} layout="vertical" onFinish={handleFinish} className="accreditation-form" style={{ width: window.innerWidth < 600 ? "100%" : "80%" }}>
          <Row gutter={24}>
            <Col xs={24} sm={12}>
              <Form.Item name="bankName" label="Bank Name" rules={[{ required: true, message: "Enter bank name" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
                <Input size="large" 
                 name="bankName"
                 value={bank.bankName}
                 onChange={handleBankChange}
                  placeholder="Enter bank name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="branchName" label="Branch Name" rules={[{ required: true, message: "Enter branch name" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
                <Input size="large" 
                name="branchName" 
                 value={bank.branchName}
                 onChange={handleBankChange}
                placeholder="Enter branch name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountName" label="Account Name" rules={[{ required: true, message: "Enter account name" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
                <Input size="large" 
                name="accountName"
                 value={bank.accountName}
                 onChange={handleBankChange}
                placeholder="Enter account name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountNo" label="Account No" rules={[{ required: true, message: "Enter account number" }]} labelCol={{ style: { fontWeight: 400, fontSize: "14px", lineHeight: "100%", letterSpacing: "0.5px" } }}>
                <Input size="large" 
                name="accountNo"
                 value={bank.accountNo}
                 onChange={handleBankChange}
                 placeholder="Enter Account No" />
              </Form.Item>
            </Col>
          </Row>

          <div className="button-group">
            <Button type="default" className="back-btn" onClick={goBack}>
              Back
            </Button>
            <Button type="primary" htmlType="submit" className="next-btn" >
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BankingDetails;
