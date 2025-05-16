import React, { useEffect, useState, createRef, useRef } from "react";
import "./AgentForm.css";
import "./CreateAccount.css";
import "./ApplicationStatus.css";
import { useHistory } from "react-router";
import {
  Card,
  Input,
  Button,
  Image,
  Form,
  message,
  Modal,
  Row,
  Col,
  Checkbox,
  DownloadOutlined,
  PlusOutlined,
  List,
  Radio,
  Upload,
} from "antd";
import {
  UserOutlined,
  KeyOutlined,
  ConsoleSqlOutlined,
  CloseOutlined,
  CheckOutlined,
  FolderAddOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";
import Group from "../../../../../src/images/Group.svg";
import Frame from "../../../../../src/images/Frame.svg";
import Layer from "../../../../../src/images/Layer.svg";
import Warning from "../../../../../src/images/WarningCircle.svg";
import ProgressLine from "./ProgressLine";
import axios from "axios";
import apiConfig from "../../../../config/api.config";

const ApplicationStatus = () => {
  const dispatch = useDispatch();
  const { baseURL } = apiConfig;

  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  const AllApplicationFormData = useSelector((state) => state?.agentOnBoardingRegister?.allApplicationForm);
  const applicationID = AllApplicationFormData?.applicationId
  const Application_Id = AllApplicationFormData?.result?._id
  console.log("Application_Id", Application_Id);

  const uploadURL = `${baseURL}auth/agent/get/details-of-agent/${Application_Id}`
  const headerObject = {
    ciphertext: cypherStore,
    authorization: null,
    "Content-Type": "application/json",
  };

  const history = useHistory();

  const [toggle, setToggle] = useState(false);

  const [form] = Form.useForm();
  const [email, setEmail] = useState("");
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const [isVerifyingVisible, setVerifyingVisible] = useState(true);
  const [isQCDiscrepancyVisible, setQCDiscrepancyVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AccountFormSubmit()
  }, [])
  
  const AccountFormSubmit = async () =>{
    
    try {
      const Url = uploadURL;
      const headers = headerObject
      const response = await axios.get(Url, { headers });
      if (response?.data?.statusCode === -1) {
        console.log("storeAgentAllApplicationForm", response?.data);
      }
    } catch (error) {
      console.error("Error calling API:", error);
    }
  }

  return (
    <>
      <div className="application_status">
        <LoginHeader />
        <Row className="m-auto">
          <Col className="m-auto" xs={24} sm={24} md={24} lg={22} xl={22}>
            <div className="main_container">
              <div className="title_wrapper">
                <div className="subheader d-block d-md-none">
                  <div className="register-yourself">Create Account</div>
                </div>
                <ProgressLine width={13} percent={100} />
                <div className="component-29">
                  <div className="ellipse-parent">
                    <div className="frame-child"></div>
                    <div className="div">1</div>
                  </div>
                  <div className="ellipse-parent">
                    <div className="frame-item2"></div>
                    <div className="div">2</div>
                  </div>
                  <div className="ellipse-parent">
                    <div className="frame-item2"></div>
                    <div className="div">3</div>
                  </div>

                  <div className="mobile-verification d-block d-md-none">
                    APPLICATION STATUS
                  </div>
                </div>
                <div className="desktop-verification d-none d-md-block">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <div className="account_form_header">ACCOUNT FORM</div>
                    <div className="account_form_header">ACCOUNT FORM</div>
                    <div className="account_form_header">
                      Application Status
                    </div>
                  </div>
                </div>
              </div>
              <div className="form_wrapper">
                <Row
                  gutter={[16, 16]}
                  style={{
                    marginLeft: "0px",
                    marginRight: "0px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    // height: "100vh",
                  }}
                >
                  <Col
                    xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}
                    style={{ padding: 0 }}
                  >
                    <div className="w-100 mobile-view-qc">
                            <div className="qc-discrepancy-parent">
                              <div className="qc-discrepancy">
                                QC Discrepancy
                              </div>
                              <div className="application-id1">
                                Application ID : #{applicationID}
                              </div>
                            </div>
                            <div className="component-26-wrapper">
                              <div className="component-26">
                                <div className="component-26-inner">
                                  <div className="frame-group">
                                    <div className="warningcircle-wrapper">
                                      <img
                                        className="warningcircle-icon"
                                        alt=""
                                        src={Warning}
                                      />
                                    </div>
                                    <div className="frame-container">
                                      <div className="qc-discrepancy-parent">
                                        <div className="qc-discrepency-raised">
                                          Document not clear
                                        </div>
                                        <div className="qc-remarks">
                                          QC Remarks : Re-upload - SSS ID
                                        </div>
                                        <div className="typography">
                                          <div className="update-details">
                                            update details
                                          </div>
                                        </div>
                                      </div>
                                      <div className="lead-id-wrapper">
                                        <div className="lead-id">
                                          <i className="as-on">As on</i>
                                          <i className="i">03/04/2023</i>
                                          <i className="as-on">at</i>
                                          <i className="pm">16:12:00 PM</i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <Button
                              className="re-submit"
                              size="large"
                              onClick={() => history.push("/create-account")}
                            >
                              Re - Submit
                            </Button>
                          </div>
                          
                    {/* <div className="create-account-heading">Create Account</div> */}
                    
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ApplicationStatus;
