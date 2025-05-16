import React, { useState } from "react";
import img5 from "../../../images/Success/success.png";
import img6 from "../../../images/Success/wrapper.png";
import "./Success.css";
import img1 from "../../../images/copy-img/copy.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button ,Col,Row} from "antd";
import { useHistory } from "react-router-dom";
import SimpleHeader from '../../ICARE/OonaHeader/SimpleHeader'
import { useDispatch, useSelector } from "react-redux";
import AllFormFooter from "../AllFormFooter/AllFormFooter";

export default function SuccessCTPL() {
  
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const SuccessCTPLCustomer = useSelector((state) => state?.ctplPolicy);
  console.log("SuccessCTPLCustomer: ", SuccessCTPLCustomer);

  let refranceNumber = SuccessCTPLCustomer?.formData?.data?.oonaPolicyResponse?.referenceNumber

  console.log("refranceNumber", refranceNumber);

  return (
    <>
    <SimpleHeader />
    <div className="rsmaindivv">
        <div className="center_success_image">
          <img src={img5} className="success_img" alt="success" />
        </div>

        <div className="success_msg"> Sent! </div>
        <div className="success_msg2">
            <h2 className="headingForPaymentsuccess">Payment link has been sent to the customer's registered email.</h2>
            <h2 className="headingForPaymentsuccess">Payment Reference #{refranceNumber}</h2>
        </div>
        <div className="btn_parent">
          <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Button className="back_btn" onClick={onChangetoDashboard} >
            <ArrowLeftOutlined />
            Back to dashboard
          </Button>
          </Col>

          </Row>
         
        </div>
      </div>
      <AllFormFooter />
    </>
  );
}
