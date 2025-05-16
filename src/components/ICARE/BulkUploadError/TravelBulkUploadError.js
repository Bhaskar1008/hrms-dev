import React from "react";
import "./BulkUploadError.css";
import img1 from "../../../images/BulkUploadImages/success.png";
import img2 from "../../../images/BulkUploadImages/error.png";
import img3 from "../../../images/BulkUploadImages/cloud.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
export default function BulkUploadError() {
    const history = useHistory();
    const onChangetoDashboard = () => {
      // dispatch(actions.resetFormData({}))
        history.push("/iCare-Dashboard");
      };
  return (
    <div className="mainContainer">
        <div className="container">
      <div className=" image-container">
      <img src={img1} className="success" alt="success" />
      <img src={img3} className="cloud" alt="error" />
      <img src={img2} className="error" alt="error" />

      </div>
      <div className="errormsg-container">
      <div className="errormsg">Error</div>
      <div className="errormsg2">Client list was not uploaded. Please try again and make sure to follow the appropriate template for uploading files.</div>
      </div>
      <Button className="dashboard"  onClick={onChangetoDashboard}>
          <ArrowLeftOutlined />
          Back to dashboard
        </Button>
      </div>
     
    </div>
  );
}
