import React, { useEffect, useState } from "react";
import "./AgentForm.css";
import "./CreateAccount.css";
import "./ApplicationStatus.css";
import { useHistory } from "react-router";
import {
  Button,
  Row,
  Col,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";
import Warning from "../../../../../src/images/WarningCircle.svg";
import ProgressLine from "./ProgressLine";
import axios from "axios";
import apiConfig from "../../../../config/api.config";
import NoQcDiscrepancyCard from "./NoQcDiscrepancyCard";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import * as actions from "../../../../store/actions/index";
import moment from "moment";

const ApplicationStatus = () => {
  const dispatch = useDispatch();
  const { baseURL } = apiConfig;
  const [allQCDiscrapencyData, setAllQCDiscrapencyData] = useState([])
  const [allResponseStore, setAllResponseStore] = useState("")
  const [applicationID, setApplicationID] = useState('')
  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  // const AllApplicationFormData = useSelector((state) => state?.agentOnBoardingRegister?.allApplicationForm);
  // const applicationID = AllApplicationFormData?.applicationId
  // const Application_Id = AllApplicationFormData?.result?._id
  const agentLoginPayload = useSelector((state) => state?.agentOnBoardingRegister?.formData);
  const agent_ID = agentLoginPayload?.agentId
  console.log("application-status", agent_ID);

  const uploadURL = `${baseURL}auth/agent/get/details-of-agent/${agent_ID}`
  const headerObject = {
    ciphertext: cypherStore,
    authorization: null,
    "Content-Type": "application/json",
  };

  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const [isVerifyingVisible, setVerifyingVisible] = useState(true);
  const [isQCDiscrepancyVisible, setQCDiscrepancyVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    AccountFormSubmit()
  }, [])
  
  const AccountFormSubmit = async () =>{
    setLoader(true)
    try {
      const Url = uploadURL;
      const headers = headerObject
      const response = await axios.get(Url, { headers });
      if (response?.data?.statusCode === -1) {
        setLoader(false)
        console.log("storeAgentAllApplicationForm", response?.data?.data);
        dispatch(actions.storeAgentONBoardLisenceForm(response?.data?.data));
        setAllResponseStore(response?.data?.data)
        let isReSummite = response?.data?.data?.agentData[0].isResubmittingForm
        if (isReSummite === true) {
          setAllQCDiscrapencyData(response?.data?.data?.agentData[0]?.latest_RaisedQC)
        }else{
          setAllQCDiscrapencyData(response?.data?.data?.agentData[0]?.QC_Discrepancy)
        }
        
        setApplicationID(response?.data?.data?.agentData[0]?.applicationId)
      }else{
        setLoader(false)
      }
    } catch (error) {
      setLoader(false)
      console.error("Error calling API:", error);
    }
  }

  const oonResubmitData = () =>{
    history.push({
      pathname: '/create-account',
      state: { data: allQCDiscrapencyData, data1: allResponseStore},
    });
  } 

  const onBack = () =>{
    history.push("/app/agent-login-new/" + cypherStore)
  }
   
  return (
    <>
    <FullPageLoader fromapploader={loader}/>
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
                    <div className="w-100 mobile-view-qc">
                            <div className="qc-discrepancy-parent">
                              <div className="qc-discrepancy">
                                QC Discrepancy
                              </div>
                              <div className="application-id1">
                                Application ID : #{applicationID}
                              </div>
                            </div>
                            {allQCDiscrapencyData && allQCDiscrapencyData?.length > 0 ? <>
                              {allQCDiscrapencyData && allQCDiscrapencyData.map((allQCData, index) => {
                                      return <div key={index} className="component-26-wrapper">
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
                                        <div className="qc-discrepency-raised" style={{fontWeight: 'bold', textTransform: "capitalize", color: 'black'}}>
                                          {allQCData?.msg}
                                        </div>
                                        <div className="qc-remarks">
                                          QC Remarks : {allQCData?.subTitle} - {allQCData?.title}
                                        </div>
                                        <div className="typography">
                                          <div className="update-details">
                                            {allQCData?.subTitle}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="lead-id-wrapper">
                                        <div className="lead-id">
                                          <i className="as-on">As on</i>
                                          <i className="i">{moment(allQCData?.updatedAt).format('MM/DD/YYYY')}</i>
                                          <i className="as-on">at</i>
                                          <i className="i">{moment(allQCData?.updatedAt).format('hh:mm a')}</i>
                                        </div>
                                      </div>
                                    </div>
                                    </div>
                                </div>
                              </div>
                            </div>
                                    })}
                            </> : <>
                            <NoQcDiscrepancyCard />
                            </>}
                          
                          <div className="button_gropup">
                            <Button
                                  className="BackButton"
                                  size="large"
                                  onClick={() => onBack()}
                                >
                                  Back
                              </Button>

                            {allQCDiscrapencyData && allQCDiscrapencyData?.length > 0 ? <>
                              <Button
                                className="re-submit"
                                size="large"
                                onClick={() => oonResubmitData(allQCDiscrapencyData, allResponseStore)}
                              >
                                Re - Submit
                              </Button>
                            </> : ""}

                            
                          </div>
                          
                          </div>
                    
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
