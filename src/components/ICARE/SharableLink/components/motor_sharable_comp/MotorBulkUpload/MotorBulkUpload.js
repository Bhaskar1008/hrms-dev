import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "./MotorBulkUpload.css";
import { Row, Col, Button, Upload, message } from "antd";
import axiosRequest from "../../../../axios-request/request.methods";
import * as actions from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import StepTwo from "../components/StepBar/StepTwo/StepTwo";

const MotorBulkUpload = (props) => {
  console.log("new===>", props?.location?.data?.selectedButton)
  let fileNameType = props?.location?.data?.selectedButton

  const dispatch = useDispatch();
  const history = useHistory();
  const photoIdArray = useSelector((state) => state?.uploadDocument?.photID);
  const signArray = useSelector((state) => state?.uploadDocument?.Sign);
  const [size, setSize] = useState("default");
  const [fileName, setFileName] = useState("");
  const [pushButton, setPushButton] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState([]);
  const [selectedSign, setSelectedSign] = useState([]);
  const [signatureName, setSignatureName] = useState("");
  const [selectFile, setSelectFile] = useState([]);

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );
  const bulkSucess = async () => {
    const file = fileName?.file;
    let data = new FormData();

    data.append("media_upload", file);
    if (fileNameType === "Fleet") {

      data.append("base", "MOTOR FLEET");
    } else {
      data.append("base", "MOTOR BULK");
    }

    await axiosRequest
      .post("user/group-excel-upload", data)
      .then((res) => {
        // console.log("response", res);
        setLoader(false);
        if (res.statusCode == -1) {
          setShowMsg(true);
          history.push("/motor-bulk-upload-success");
        }
      })
      .catch((err) => {
        setLoader(false);
        history.push("/motor-bulk-upload-error");
        // console.log("err", err);
      });
  };

  const handleUpload = async (selectFile, name) => {
    setLoader(true);

    const file = selectFile?.file;
    const sigName = selectFile?.file?.name;

    let isDeleteFile = "";
    if (sigName) {
      isDeleteFile = false;
      setSelectFile(selectFile?.fileList);
      setSelectedPhoto(selectFile?.fileList);
    } else {
      setSelectFile([]);
      setSelectedPhoto([]);

      isDeleteFile = true;
      setLoader(false);
    }

    const allowedFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (
      file &&
      (!allowedFileTypes.includes(file.type) ||
        (selectFile?.cancelable && isDeleteFile))
    ) {
      setLoader(false);
      message.error("Please Upload .XLSX type");
      return;
    }
    setSignatureName(sigName);
    setFileName(selectFile);
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
            <StepTwo />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="right-side">
              <div className="policy-type">
                <h2>Just need a few details</h2>
              </div>
            </div>
            <div className="RsCtplUpload">
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
                    Upload a list of clients
                  </p>{" "}
                </li>
              </ul>

              <div className="browser-box">
                <div className="doc-box">
                  <div
                    className="child11"
                    style={{
                      backgroundColor: "#1D428A",
                      borderColor: "#1D428A",
                      marginRight: "15px",
                    }}
                  >
                    <FolderAddOutlined style={{ color: "white" }} />
                  </div>
                  <div className="doc-text-container">
                    {signatureName && (
                      <p className="doc-text" title={signatureName}>
                        <CloudDownloadOutlined
                          style={{ marginRight: "10px" }}
                        />
                        <span className="signature-name" title={signatureName}>
                          {signatureName}
                        </span>
                        <DeleteOutlined
                          className="doc-delete-icon"
                          onClick={handleUpload}
                        />
                      </p>
                    )}
                  </div>
                </div>
                <Upload
                  selectFile={selectedPhoto}
                  onChange={handleUpload}
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <Button
                    className={`browse-btn`}
                    style={{ backgroundColor: "#1D428A", marginLeft: "auto" }}
                  >
                    Browse
                  </Button>
                </Upload>
              </div>
              <p style={{ fontWeight: "bold", marginTop: 5, color: '#000' }}>
                Upload .xlsx files only
              </p>

              <p style={{color: '#000'}}>
                <b>
                  Download the Sample file{" "}
                  <span style={{ color: "#1D428A" }}>
                    <a href="https://image-upload-bucket-2019.s3.ap-south-1.amazonaws.com/Motorcomprehensive.xlsx">
                      here
                    </a>
                  </span>
                </b>
              </p>
            </div>
            <div className="button-header">
              <Button className="next-button" size={size} onClick={bulkSucess}>
                Proceed
                <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MotorBulkUpload;
