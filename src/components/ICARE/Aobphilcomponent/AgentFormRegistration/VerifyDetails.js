import React from 'react'
import {useSelector } from "react-redux";
import "./AgentForm.css";
import "./CreateAccount.css";
import "./ApplicationStatus.css";
import Group from "../../../../../src/images/Group-verify.png";
import {Row,Col} from "antd";
import ProgressLine from "./ProgressLine";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";

const VerifyDetails = () => {
const AllApplicationFormData = useSelector((state) => state?.agentOnBoardingRegister?.allApplicationForm?.applicationId);
const applicationIDlogin = useSelector((state) => state?.AOBLicenceAffiliat?.formData?.agentData);
var applicationID = ""
if (applicationIDlogin !== undefined){
  applicationID = applicationIDlogin[0]?.applicationId
}else{
  applicationID = AllApplicationFormData
}

  return (
    <div>
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
                    <div className="account_form_header">REGISTRATION FORM</div>
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
                    <div className="d-flex flex-column justify-content-center align-items-center">
                            <div className="group-parent1">
                              <img
                                className="frame-child1"
                                alt=""
                                src={Group}
                              />
                              
                              <div className="verifying-details-parent">
                                <div className="verifying-details">
                                  Verifying details
                                </div>
                                <div className="application-id">
                                  Application ID : #{applicationID}
                                </div>
                              </div>
                            </div>
                            <div className="our-team-is-verifying-your-doc-parent">
                              <div className="our-team-is">
                                Our team is verifying your documents before you
                                are officially onboarded on the Salesdrive
                                Platform.
                              </div>
                              <div className="our-team-is">
                                You may come back to this page to check on your
                                account status. You will be notified via email
                                once validation is completed.
                              </div>
                            </div>
                          </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
         
    </div>
  )
}

export default VerifyDetails