import React from "react";
import "./BulkUploadSuccess.css";
import img1 from "../../../images/BulkUploadImages/success.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";

export default function BulkUploadSuccess() {


  const history = useHistory();
  const dispatch = useDispatch();

  const onChangetoDashboard = () => {
    dispatch(actions.resetFormData({}))
    history.push("/iCare-Dashboard");
  };

  return (
    <div className="mainContainer">
      <div className=" image-container">
        <img src={img1} className="success" alt="success" />
        <div className="message-container">
          <div className="message">Success!</div>
          <div className="message2">
            Client list has been uploaded! Coordinate with the PSC for further
            developments.
          </div>
          <div className="message2">
            Once policy application has been issued and email will be sent to you
            and your client.
          </div>
        </div>
        <Button className="dashboard" onClick={onChangetoDashboard}>
          <ArrowLeftOutlined />
          Back to dashboard
        </Button>
      </div>
    </div>
  );
}
