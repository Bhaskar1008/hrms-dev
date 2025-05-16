import React from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import img7 from "../../../images/Failed/Failed.png";
import "./Error.css";
import { Button } from "antd";

export default function Error() {
  // dispatch(actions.resetFormData({}))
  return (
    <>
    <div className="main">
      <div className="center">
        <img src={img7} className="error_img" alt="Error" />
      </div>
      <div className="error_msg"> Uh-oh! Something went wrong! </div>
      <div className="error_msg2">
      Policy has been created but on provisional status. We’ve saved your details so you can try to pay again. 
      </div>
      <div className="error_msg2">Please contact your designated Sales Office for assistance.</div>
      <div >
     <div >
      <Button  className="backbtn">
        <ArrowLeftOutlined />
        Back to dashboard
      </Button>
      <Button className="pay_btn">Pay Again</Button>
      </div>
      </div>
      </div>
    </>
  );
}
