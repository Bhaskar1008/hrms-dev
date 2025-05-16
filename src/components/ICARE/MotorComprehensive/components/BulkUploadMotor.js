import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./BulkUploadMotor.css";
import { Row, Col, Button, Upload } from "antd";
import {
  ArrowLeftOutlined,
  FolderAddOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const BulkUpload = () => {
  const history = useHistory();

  const [size, setSize] = useState("default");

  const onChangetoDashboard = () => {
    // dispatch(actions.resetFormData({}))
    history.push("/iCare-Dashboard");
  };
  const uploadProps = {
    name: "file",
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    headers: {
      authorization: "authorization-text",
    },
    onChangeforUpload(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        // message.success(`${info.file.name} file uploaded successfully`);
        console.log("file uploaded successfully");
      } else if (info.file.status === "error") {
        console.log("file upload failed");

        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <>
      <div className="main-class">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>

            <div className="sidebar">
              <ul>
                <li> VEHICLE DETAILS</li>
                <li>
                  <span style={{ color: "#4AC6BB" }}>2</span> Customer DETAILS
                </li>
                <li>
                  <span style={{ color: "#4AC6BB" }}>3</span> Confirmation &
                  Payment
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="right-side">
              <div className="policy-type">
                <h2>Let’s Start!</h2>
              </div>
            </div>
            <ul
              style={{
                marginLeft: "-35px",
                fontSize: "25px",
                color: "#1D428A",
              }}
            >
              <li>
                <p
                  style={{
                    fontWeight: "bold",
                    fontSize: "26px",
                    color: "#1D428A",
                  }}
                >
                  {" "}
                  Customer Details
                </p>{" "}
              </li>
            </ul>
            <p style={{ fontWeight: "bold" }}> Bulk Upload</p>
            <div className="uploadDivMotor">
              <div className="folderIconMotor">
                <FolderAddOutlined
                  style={{ fontSize: "27px" }}
                  className="FolderAddOutlinedMotor"
                />
              </div>
              <div className="browseBtnMotor">
                <Upload {...uploadProps}>
                  <Button className="browseButtonMotor">Browse</Button>
                </Upload>
              </div>
            </div>
            <p style={{ fontWeight: "bold" }}>
              Maximum 2 MB. PNG or JPG files only
            </p>

            <p>
              <b>
                Download the template{" "}
                <span style={{ color: "#1D428A" }}>here</span>
              </b>
            </p>
            <div className="button-header">
              <Button className="prev-button" size={size}>
                Back
              </Button>
              <Button
                className="next-button"
                icon={<ArrowRightOutlined />}
                size={size}
              >
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default BulkUpload;
