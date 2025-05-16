import React, { useState, useEffect } from "react";
import "./TravelBulkUpload.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { Row, Col, Button, Upload, message, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../axios-request/request.methods";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";

import img2 from "../../../../images/button images/upload.png";
import StepTravelTwo from "../StepBarTravel/StepTravelTwo/StepTravelTwo";
import GroupFooter from "../TravelFooter/GroupFooter/GroupFooter";
export default function TravelBulkUpload() {
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const dispatch = useDispatch();
  const [selectFile, setSelectFile] = useState([]);
  const [fileList, setFileList] = useState([])
  const [showMsg, setShowMsg] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loader, setLoader] = useState(false);
  const [signatureName, setSignatureName] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState([]);





  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const onClickproceed = async () => {
    let url = `user/group-excel-upload`
    const formData = new FormData()
    formData.append('media_upload', selectFile)
    const data = await axiosRequest.post(url, formData)
    if (data.statusCode === -1) {
      history.push("/travel-bulk-upload-success");
      return
    } else {
      // message.error('something went wrong')
      history.push("/motor-bulk-upload-error");
    }



  };
  const bulkSucess = async () => {
    setLoader(true);
    const file = fileName?.file;
    let data = new FormData();

    //   let filetype = file.type.split("/");
    // console.log("filetype", filetype);
    if (!file) {
      message.error("Please Upload the .Xlsx file Only")
      setLoader(false);
    } else {
      data.append("file", file);
      data.append("product", "Travel");
      //   data.append("issuanceCollection_id", "1101");

      await axiosRequest
        .post("bulk-upload/uplaod-file", data)
        .then((res) => {
          console.log("response", res);
          setLoader(false);
          if (res.statusCode == -1) {
            setShowMsg(true);
            history.push("/travel-bulk-upload-success");
            // message.success("File uploaded successfully");
          }
        })
        .catch((err) => {
          setLoader(false);
          history.push("/travel-bulk-upload-error");
        });
    }



  };

  // const handleUpload = async (selectFile) => {
  //   console.log("seletedfile", selectFile);
  //   const file = selectFile.file;
  //   if (file && file.size > 2 * 1024 * 1024) {
  //     message.error("File size should not exceed 2 MB");
  //     return
  //   }
  //     // let data = new FormData();
  //     // let filetype = file.type.split("/");
  //     // // console.log("filetype", filetype);
  //     // data.append("file", file);
  //     // data.append("fileType", filetype[1]);
  //     // data.append("issuanceCollection_id", "1101");

  //     // await axiosRequest
  //     //   .post("admin/v4/userdocument", data)
  //     //   .then((res) => {
  //     //     console.log("response", res);
  //     //     if (res.statusCode == 1) {
  //     //       setShowMsg(true);
  //     //       message.success("File uploaded successfully");
  //     //     }
  //     //   })
  //     //   .catch((err) => {
  //     //     console.log("err", err);
  //     //   });
  //     setFileList([file])
  //     setSelectFile(file)
  // };
  const handleUpload = async (selectFile, name) => {
    setLoader(true);

    // if (!documentId) {
    //     message.error("Document Id is not available.");
    //     setLoader(false);
    //     return;
    // }

    const file = selectFile?.file;
    const sigName = selectFile?.file?.name;

    let isDeleteFile = "";
    if (sigName) {
      isDeleteFile = false;
      setSelectFile(selectFile?.fileList);
      setSelectedPhoto(selectFile?.fileList);
      setLoader(false);
      // dispatch(actions.uploadPhotoId(selectFile?.fileList));
    } else {
      setSelectFile([]);
      setSelectedPhoto([]);
      // dispatch(actions.uploadPhotoId(""));
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
    setLoader(false);

  };
  return (
    <>
      <FullPageLoader spinloader={loader} />
      <div className="main-classes">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>

            <StepTravelTwo />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="right-sides">
              <div
                className={isMobileView ? "rsStart mobile-heading" : "rsStart"}
              >
                {isMobileView ? "Just need a few details" : "Let’s Start!"}
              </div>

              <div className="rsquestionDiv">
              
                  
                    <h3>Convert to policy </h3>
                  
                
              </div>
              <div className="rsuploaderDiv">
                <div className="rsUpload">Upload a list of clients</div>
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
                <div className="rsUploadText">

                  <p style={{color: '#000' }}><b>Download the Sample file <span style={{ color: "#1D428A" }}> <a href="https://oona-ph-bucket.s3.ap-south-1.amazonaws.com/bulk_upload/userUpload/7337/1709793983648-travelBulkUpload">
                    here
                  </a></span></b></p>
                  {/* <p>Download the template here</p> */}
                </div>
              </div>

              <Button className="rsProceed" onClick={bulkSucess}>
                Proceed <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <GroupFooter />
    </>
  );
}
