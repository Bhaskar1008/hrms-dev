import React, { useState, useEffect } from "react";
import "./QuoteInformation.css";
import { useHistory, useLocation } from "react-router-dom";

import {
  Row,
  Col,
  Button,
  Radio,
  Card,
  Select,
  Option,
  Form,
  Progress,
  Input,
  DatePicker,
  Upload,
  message,
  Checkbox,
  Space,
} from "antd";
import _ from "lodash";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import StepTwo from "../components/StepBar/StepTwo/StepTwo";
import QuickQuoteFooter from "../MotorFormFooter/QuickQuoteFooter/QuickQuoteFooter";
import * as actions from "../../../../store/actions/index";
import axiosRequest from "../../../../axios-request/request.methods";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import { checkAgent, stoageGetter } from "../../../../helpers";
import { CheckBox } from "@material-ui/icons";

const QuoteInformation = () => {
  let channelcodeforRef = stoageGetter("user");
  let channelCodeforUse = channelcodeforRef?.channelCode?.channelCode
  const getAgentCode = channelcodeforRef?.agentCode;
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'
  const [openloader, setopenloader] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const [subAgentName, setSubAgentName] = useState("");
  const [agentName, setAgentName] = useState("");
  const [policyTerm, setPolicyTerm] = useState("");
  const [commercialStr, setCommercialStr] = useState("");

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const quotationNumber = useSelector(
    (state) =>
      state?.motorQuotation?.motorQutotionSucess?.data?.oonaQuotationResponse
        ?.quotationNumber
  );
  // console.log("quotationNumber", quotationNumber);
  const TEST = useSelector((state) => state);
  // console.log("REST", TEST);
  const quatationData = useSelector((state) => state?.motorQuotation?.formData);
  // console.log("quatationData", quatationData);
  const successCoverageData = useSelector(
    (state) =>
      state?.motorQuotation?.motorQutotionSucess?.data?.motor_comprehensive
        ?.coverages
  );
  // console.log("successCoverageData", successCoverageData);

  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );
  // console.log("documentId===>", documentId);

  const accessoryApi = useSelector(
    (state) => state?.groupPolicy?.accessoryList?.lov
  );
  // console.log("accessoryApi", accessoryApi);

  const accessoryData = useSelector(
    (state) => state?.motorQuotation?.formData?.accessories
  );
  // console.log("accessoryData", accessoryData);
  const coverageData = useSelector(
    (state) => state?.motorQuotation?.formData?.coverages
  );
  console.log("coverageData", coverageData);

  let coveragesApi = useSelector(
    (state) => state?.motorCoverage?.generateCoverages?.data?.coverages
  );
  console.log("coveragesApi", coveragesApi);

  // functions *************
  const vehicleStore = quatationData?.vehicleData;
  // console.log("hey==>", vehicleStore);
  const num = vehicleStore?.vehicleValue;
  const options = { maximumFractionDigits: 2 };
  const formattedNumber = Intl.NumberFormat("en-US", options).format(num);

  const SublineNumber = quatationData?.sublineName;
  const datePurchange = quatationData?.datePurchased;
  const policyHolderData = useSelector(
    (state) => state?.motorQuotation?.formData?.policyHolder
  );
  // console.log("newData1==>", policyHolderData?.mobileNumber);

  // let covergeArray = [];
  // if (coverageData?.length >= 0 || coverageData !== null) {
  //   coverageData?.map((data) => {
  //     console.log("data", data);
  //     if (data !== null) {
  //       const filteredCity = coveragesApi?.filter((item) => {
  //         if (data.coverage == item.coverage) {
  //           return covergeArray.push(item);
  //         }
  //       });
  //       console.log("filteredCity", filteredCity);
  //     }
  //   });
  // }

  const filteredArray = coverageData?.filter((itemA) => {
    // console.log("itemA", itemA);
    if (itemA !== null) {
      const isIncludedInB = coveragesApi?.some(
        (itemB) => itemB.coverage == itemA.coverage && itemB.isMandatory == true
      );
      return !isIncludedInB;
    }
  });

  // console.log("filteredArray", filteredArray);

  const coverageNamesMap = {};
  coveragesApi?.forEach((item) => {
    coverageNamesMap[item.coverage] = item.coverageName;
  });

  const comparedCoverages = filteredArray?.map((itemA) => {
    const coverageNameB = coverageNamesMap[itemA.coverage];
    if (coverageNameB) {
      return {
        coverage: itemA.coverage,
        coverageNameA: itemA.coverageName,
        coverageNameB: coverageNameB,
      };
    }
    //  {
    //   return {
    //     coverage: itemA.coverage,
    //     coverageNameA: itemA.coverageName,
    //     coverageNameB: "No Found",
    //   };
    // }
  });

  // console.log(comparedCoverages, "comparedCoverages");

  const getAccessoryType = (type) => {
    const splitWord = type.split("-");

    if (splitWord[1] === "A") {
      return "Additional";
    } else if (splitWord[1] === "B") {
      return "Built In";
    } else if (splitWord[1] === "F") {
      return "Free";
    }
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/policyholder-quote-info");
  };

  const getTransmission = (trans) => {
    const splitWord = trans;

    if (splitWord === "A") {
      return "Automatic";
    } else if (splitWord === "M") {
      return "Manual";
    }
  };

  const onchangetoNext = async () => {
    // if (policyHolderData.mobileNumber === policyHolderData.mobileNumber) {
    //   return message.error("Mobile Number Already Exist")
    // }
    setopenloader(true);
    const quotationInfo = {
      ...quatationData,
      // quotationNumber: quotationNumber,
      effectivityDate: quatationData?.effectivityDate,
      expirationDate: quatationData?.expirationDate,
      policyGroupCode: quatationData?.policyGroupCode,
      policyGroupName: quatationData?.policyGroupName,
      contractCode: quatationData?.contractCode,
      subContractCode: quatationData?.subContractCode,
      branchCode: quatationData?.branchCode,
      paymentPlanCode: quatationData?.paymentPlanCode,
      // subline: null,
      productTier: quatationData?.productTier,
      productTierName: quatationData?.productTierName,
      vehicleData: quatationData?.vehicleData,
      coverages: successCoverageData ? successCoverageData : [],
      accessories: quatationData?.accessories,
      assignee: quatationData?.assignee,
      mortgagee: quatationData?.mortgagee,
      secondary: quatationData?.secondary,
      owner: quatationData?.owner,
      driver: quatationData?.driver,
      policyHolder: quatationData?.policyHolder,
      documentId,
    };

    const motorPayload = { ...quotationInfo };
    delete motorPayload.nonStandardaccessories;
    delete motorPayload.selectcontractName;
    delete motorPayload.selectsubContractName;

    // console.log("quotationInfo: ", quotationInfo);
    // console.log("quotationInfo: ", quotationInfo);
    // console.log("motorPayload: ", motorPayload);
    let result = await axiosRequest.post(
      "user/motor-formal-quotation",
      motorPayload,
      { secure: true }
    );
    // console.log("ResultForMotorFormal", result);

    // result.qc_status == showing page form generate riskinspenstion
    dispatch(actions.motorQuotationForm(quotationInfo));

    if (result?.statusCode === -1) {
      dispatch(actions.motorFormalQuotationForm(result));
      if (result?.data?.oonaQuotationResponse?.technicalControls.length > 0) {
        history.push("/motor-technical-control");
        setopenloader(false);
      } else if (result?.data?.QC_status === "Required") {
        history.push("/risk-inspection-required");
        setopenloader(false);
      } else {
        history.push("/motor-convert-policy");
        setopenloader(false);
      }
    } else if (result?.statusCode === 1) {
      // dispatch(actions.motorFormalQuotationForm(result));
      setopenloader(false);
    }
    //  else if (result?.length === 0) {
    //   setopenloader(false);
    //   message.error("DOCUMENT RETAINED FOR TECHNICAL CONTROL");
    //   // history.push("/motor-technical-control");
    // }
    else {
      // console.log("Im in Colseole of Else", result?.data?.message);
      if (result.length !== 0) {
        // console.log("Im in Colseole of Else hh", result);
        message.error(result?.data?.message);
      }
      setopenloader(false);
    }
  };

  useEffect(() => {
    getPolicyTerm();
    getSubAgentName();
    getAgentName()

    getCommericalStrucure();
  }, []);

  const getSubAgentName = async () => {
    if (quatationData?.subAgents?.length > 0) {
      let login_user_data = stoageGetter("user");
      const channelCode = login_user_data?.channelCode;
      let agentCode = null;
      if (channelCode.channelCode !== "CH1") {
        agentCode = login_user_data?.agentCode;
      } else {
        agentCode = quatationData?.agentCode;
      }
      const subAgentId =
        quatationData?.subAgents[0]?.thirdPartyData?.documentCode;
      setopenloader(true);
      const url = `user/get/subagent-list?agentCode=${agentCode}`;
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {
        const selectedSubAgent = res?.data?.filter(
          (item) => item.documentCode == subAgentId
        );
        console.log("selectedSubAgent: ", selectedSubAgent);
        if (res?.data && Array.isArray(res.data && selectedSubAgent)) {
          setSubAgentName(selectedSubAgent[0]?.name);
          console.log("res.data: ", res.data);
        }
      }
      setopenloader(false);
    }
  };
  const getAgentName = async () => {


    if (quatationData?.agentCode?.length > 0) {
      let login_user_data = stoageGetter("user");
      const channelCode = login_user_data?.channelCode;
      let agentCode = null;
      if (channelCode.channelCode !== "CH1") {
        agentCode = login_user_data?.agentCode;
      } else {
        agentCode = quatationData?.agentCode
      }
      const subAgentId = quatationData?.branchCode;
      const selectedAgentcodenew = quatationData?.agentCode
      setopenloader(true)

      const url = `user/get/agent-list?commercialStructure=${subAgentId}`;
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {

        const selectedAgent = res?.data?.filter((item) => item.codAgt == selectedAgentcodenew)
        console.log("selectedSAgent: ", selectedAgent);
        if (res?.data && Array.isArray(res.data && selectedAgent)) {
          setAgentName(selectedAgent[0]?.nomCompleto);
          console.log("res.data: ", res.data);
        }
      }
      setopenloader(false)
    }
  };
  const getPolicyTerm = async () => {
    const selectedPolicyterm = quatationData?.paymentPlanCode;
    setopenloader(true);

    const url = `user/lov?name=PaymentTerms`;
    const res = await axiosRequest.get(url);
    if (res.statusCode === -1) {
      const selectePolicyTerm = res?.data?.lov?.filter(
        (item) => item.COD_FRACC_PAGO == selectedPolicyterm
      );
      console.log("selectedSAgent: ", selectePolicyTerm);
      if (res?.data && Array.isArray(res.data && selectePolicyTerm)) {
        setPolicyTerm(selectePolicyTerm[0]?.NOM_FRACC_PAGO);
        console.log("res.data: ", res.data);
      }
    }
    setopenloader(false);
  };
  const getCommericalStrucure = async () => {
    const selectedCommercial = quatationData?.branchCode;
    const selectedCommercial1 = quatationData?.branchCode
    setopenloader(true);

    let url = "";
    if (channelCodeforUse == "CH1") {
      url = `user/travel/commercialStructures`;
    } else {
      url = `user/lov?name=CommStructure&AgentCode=${getAgentCode}`;
    }

    const res = await axiosRequest.get(url);
    if (res.statusCode === -1) {
      let selectedCommercialStructure = "";
      if (res?.data?.data) {
        selectedCommercialStructure = res?.data?.data?.filter(
          (item) => item.branchCode == selectedCommercial
        );
      } else {
        selectedCommercialStructure = res?.data?.lov?.filter(
          (item) => item.COD_NIVEL3 == selectedCommercial1
        );
      }


      if (
        res?.data &&
        Array.isArray(res.data && selectedCommercialStructure)
      ) {
        if (channelCodeforUse == "CH1") {

          setCommercialStr(selectedCommercialStructure[0]?.branchName);
        } else {
          setCommercialStr(selectedCommercialStructure[0]?.NOM_NIVEL3);
        }
        console.log("res.data: ", res.data);
      }
    }
    setopenloader(false);
  };

  return (
    <>
      <div className="main-class">
        <FullPageLoader fromapploader={openloader}></FullPageLoader>
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div className="left-side">
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
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinishPolicyGroup}
              // onFinishFailed={onFinishFailed}
              // autoComplete="off"\
              form={form}
              fields={[
                {
                  // name: ["groupPolicy"],
                  // value: groupPolicy,
                },
              ]}
            >
              <div className="right-side">
                <div className="step-heading">
                  <div className="policy-type">
                    <h2>One last look! Did we get everything right?</h2>
                  </div>
                  <div className="destop--dta">
                    <div className="info-head">
                      <h3>Vehicle Information</h3>
                    </div>
                  </div>
                </div>
                <div>
                  <Row
                    gutter={16}
                    className="row-bottom-margin"
                    style={{ rowGap: "15px" }}
                  >
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Make</div>
                        <div className="subheading">
                          {vehicleStore?.makeName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Model</div>
                        <div className="subheading">
                          {vehicleStore?.modelName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Vehicle Type</div>
                        <div className="subheading">
                          {" "}
                          {vehicleStore?.vehicleTypeName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Model Year</div>
                        <div className="subheading">
                          {vehicleStore?.yearModel}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Sub Model</div>
                        <div className="subheading">
                          {" "}
                          {vehicleStore?.subModelName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Transmission</div>
                        <div className="subheading">
                          {getTransmission(vehicleStore?.transmission)}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row
                    gutter={16}
                    className="row-bottom-margin"
                    style={{ rowGap: "15px" }}
                  >
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Type of Use</div>
                        <div className="subheading">
                          {vehicleStore?.typeOfUseName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Vehicle Value</div>
                        <div className="subheading"> ₱ {formattedNumber}</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Area of Usage</div>
                        <div className="subheading">
                          {vehicleStore?.areaOfUseName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Plate Number</div>
                        <div className="subheading">
                          {" "}
                          {vehicleStore?.plateNumber}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Conduction Number</div>
                        <div className="subheading">
                          {" "}
                          {vehicleStore?.conductionNumber}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Chassis/Serial Number</div>
                        <div className="subheading">
                          {vehicleStore?.chassisNumber}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row
                    gutter={16}
                    className="row-bottom-margin"
                    style={{ rowGap: "15px" }}
                  >
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Motor/Engine Number</div>
                        <div className="subheading">
                          {vehicleStore?.engineNumber}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">MV File Number</div>
                        <div className="subheading">
                          {vehicleStore?.fileNumber}
                        </div>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Subline</div>
                        <div className="subheading">
                          {SublineNumber ? SublineNumber : "-"}
                        </div>
                      </div>
                    </Col>

                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Purchase Date</div>
                        <div className="subheading">
                          {datePurchange ? datePurchange : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {quatationData?.accessories?.length >= 0 ? (
                  <div className="info-head">
                    <h3>Accessory Information</h3>
                  </div>
                ) : (
                  ""
                )}

                {
                  quatationData?.accessories?.length >= 0
                    ? quatationData?.accessories?.map((data, index) => {
                      return (
                        <div>
                          <div className="row-bottom-margin">
                            <h6>Accessory- {index + 1}</h6>
                          </div>
                          <Row
                            gutter={16}
                            className="row-bottom-margin"
                            style={{ rowGap: "15px" }}
                          >
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                              <div>
                                <div className="heading">Category</div>
                                <div className="subheading">
                                  {data?.accessoryName}
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                              <div>
                                <div className="heading">Type</div>
                                <div className="subheading">
                                  {getAccessoryType(data?.accessoryName)}
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                              <div>
                                <div className="heading">Price</div>
                                <div className="subheading">
                                  {data?.price}
                                </div>
                              </div>
                            </Col>
                            <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                              <div>
                                <div className="heading">Description</div>
                                <div className="subheading">
                                  {data?.description
                                    ? data?.description
                                    : "-"}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      );
                    })
                    : ""
                  // "<Row gutter={16} className="row-bottom-margin">
                  //   <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  //     <div>
                  //       <div className="heading">Category</div>
                  //       <div className="subheading">-</div>
                  //     </div>
                  //   </Col>
                  //   <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  //     <div>
                  //       <div className="heading">Type</div>
                  //       <div className="subheading">-</div>
                  //     </div>
                  //   </Col>
                  //   <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  //     <div>
                  //       <div className="heading">Price</div>
                  //       <div className="subheading">-</div>
                  //     </div>
                  //   </Col>
                  //   <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  //     <div>
                  //       <div className="heading">Description</div>
                  //       <div className="subheading">-</div>
                  //     </div>
                  //   </Col>
                  // </Row>"
                }

                {/* <div>

                  <div className="row-bottom-margin">
                    <h6>Accessory 2</h6>
                  </div>

                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Category</div>
                        <div className="subheading">category</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Type</div>
                        <div className="subheading">type</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Price</div>
                        <div className="subheading">price</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Description</div>
                        <div className="subheading">description</div>
                      </div>
                    </Col>
                  </Row>
                </div> */}
                {/* {covergeArray && ( */}
                <div className="info-head">
                  <h3>Coverage Information</h3>
                </div>
                {/* )} */}

                {coveragesApi &&
                  coveragesApi?.map((button, index) => {
                    return (
                      <>
                        {button.isMandatory && (
                          <div>
                            <Row
                              gutter={16}
                              className="row-bottom-margin"
                              style={{ rowGap: "15px" }}
                            >
                              <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                                <Button
                                  className="btn_Product"
                                  style={{
                                    border: "1px solid #4AC6BB",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    textAlign: "center",
                                    alignItems: "center",
                                    color: "#1D428A",
                                    fontWeight: "600",
                                  }}
                                >
                                  {button.coverageName}
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        )}
                      </>
                    );
                  })}
                {comparedCoverages &&
                  comparedCoverages?.map((data) => {
                    return (
                      <>
                        <div>
                          <Row
                            gutter={16}
                            className="row-bottom-margin"
                            style={{ rowGap: "15px" }}
                          >
                            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                              <Button
                                className="btn_Product"
                                style={{
                                  border: "1px solid #4AC6BB",
                                  display: "flex",
                                  justifyContent: "space-between",
                                  textAlign: "center",
                                  alignItems: "center",
                                  color: "#1D428A",
                                  fontWeight: "600",
                                }}
                              >
                                {data?.coverageNameB}
                                {/* <DownOutlined
                                  style={{
                                    color: "#4AC6BB",
                                    paddingTop: "2px",
                                  }}
                                /> */}
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </>
                    );
                  })}
                {/* <div>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">options</div>
                        <div className="subheading"></div>
                      </div>
                    </Col>
                  </Row>
                </div> */}
                <div className="info-head">
                  <h3>Product</h3>
                </div>
                <div>
                  <Row
                    gutter={16}
                    className="row-bottom-margin"
                    style={{ rowGap: "15px" }}
                  >
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Button
                        className="btn_Product"
                        style={{
                          border: "1px solid #4AC6BB",
                          display: "flex",
                          justifyContent: "space-between",
                          textAlign: "center",
                          alignItems: "center",
                          color: "#1D428A",
                          fontWeight: "600",
                        }}
                      >
                        {quatationData?.productTierName}
                      </Button>
                    </Col>
                  </Row>
                </div>

                {/* {quatationData?.policyGroupName ? (
                  <div className="info-head">
                    <h3>Policy Group Information</h3>
                  </div>
                ) : (
                  ""
                )} */}
                <div className="info-head">
                  <h3>Policy Group Information</h3>
                </div>
                {quatationData?.branchCode ? (
                  <div>
                    <Row
                      gutter={16}
                      className="row-bottom-margin"
                      style={{ rowGap: "15px" }}
                    >
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div>
                          <div className="heading">Commercial Structure</div>
                          <div className="subheading">
                            {commercialStr}
                          </div>
                        </div>
                      </Col>
                      {(agentName && channelCodeforUse == "CH1") ? (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div>
                            <div className="heading">{agentName && "Agent"}</div>
                            <div className="subheading">
                              {agentName}
                            </div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                      {(subAgentName && channelCodeforUse == "CH1") ? (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div>
                            <div className="heading">
                              {subAgentName && "Sub Agent"}
                            </div>
                            <div className="subheading">{subAgentName}</div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </div>
                ) : (
                  ""
                )}
                {quatationData?.effectivityDate ? (
                  <div>
                    <Row
                      gutter={16}
                      className="row-bottom-margin"
                      style={{ rowGap: "15px" }}
                    >
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div>
                          <div className="heading">Effective Date</div>
                          <div className="subheading">
                            {quatationData?.effectivityDate}
                          </div>
                        </div>
                      </Col>
                      {quatationData?.expirationDate ? (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div>
                            <div className="heading">Expiry Date</div>
                            <div className="subheading">
                              {quatationData?.expirationDate}
                            </div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                      {policyTerm ? (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div>
                            <div className="heading">
                              {policyTerm && "Payment Term"}
                            </div>
                            <div className="subheading">{policyTerm}</div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </div>
                ) : (
                  ""
                )}
                {quatationData?.policyGroupName ? (
                  <div>
                    <Row
                      gutter={16}
                      className="row-bottom-margin"
                      style={{ rowGap: "15px" }}
                    >
                      <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                        <div>
                          <div className="heading">Policy Group</div>
                          <div className="subheading">
                            {quatationData?.policyGroupName}
                          </div>
                        </div>
                      </Col>
                      {quatationData?.selectcontractName ? (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div>
                            <div className="heading">Contract Number</div>
                            <div className="subheading">
                              {quatationData?.selectcontractName}
                            </div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                      {quatationData?.selectsubContractName ? (
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <div>
                            <div className="heading">Sub-Contract Number</div>
                            <div className="subheading">
                              {quatationData?.selectsubContractName}
                            </div>
                          </div>
                        </Col>
                      ) : (
                        ""
                      )}
                    </Row>
                  </div>
                ) : (
                  ""
                )}
                {/* <div>
                  <Row
                    gutter={16}
                    className="row-bottom-margin"
                    style={{ rowGap: "15px" }}
                  >
                    {agentName !== "" && channelCodeforUse == "CH1" ? (
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Agent</div>
                          <div className="subheading">{agentName}</div>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                    {subAgentName !== "" ? (
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Sub Agent</div>
                          <div className="subheading">{subAgentName}</div>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </div> */}

                <div className="info-head">
                  <h3>Policy Holder Information</h3>
                </div>
                <div>
                  <Row
                    gutter={16}
                    className="row-bottom-margin"
                    style={{ rowGap: "15px" }}
                  >
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">First Name</div>
                        <div className="subheading">
                          {policyHolderData?.firstName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Last Name</div>
                        <div className="subheading">
                          {policyHolderData?.lastName}
                        </div>
                      </div>
                    </Col>
                    {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Middle Name</div>
                        <div className="subheading">Name</div>
                      </div>
                    </Col> */}
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Mobile Number</div>
                        <div className="subheading">
                          {policyHolderData?.mobileNumber}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Email Address</div>
                        <div className="subheading">
                          {policyHolderData?.emailAddress}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="button-header">
                  {/* <Row gutter={[16,16]}>
                  <Col xs={24} sm={24} md={14} lg={14} xl={14}>

                    </Col>
                  </Row> */}
                  <Button
                    className="prev-button"
                    size={size}
                    onClick={onchangetoBack}
                  >
                    Back
                  </Button>
                  <Button
                    className="next-button"
                    size={size}
                    htmlType="submit"
                    onClick={onchangetoNext}
                  // onClick={onFinishPolicyGroup}
                  >
                    Confirm Details
                    {/* <ArrowRightOutlined /> */}
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <QuickQuoteFooter />
    </>
  );
};
export default QuoteInformation;
