import React, { useState, useEffect } from "react";
import "./MotorConfirmPage.css";
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
} from "antd";

import _ from "lodash";
import axiosRequest from "../../../../../../axios-request/request.methods";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { checkAgent, stoageGetter } from "../../../../../../helpers";
import * as actions from "../../../../../../store/actions";
import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import CommonHeader from "../../../LoginHeader/LoginHeader"

import StepThree from "../components/StepBar/StepThree/StepThree";
import PolicyQuoteFooter from "../MotorFormFooter/PolicyQuoteFooter/PolicyQuoteFooter";

const MotorConfirmPage = () => {
  let login_user_data = stoageGetter("user");

  const channelCode = login_user_data?.channelCode;
  // console.log("channelcode", channelCode);
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'
  const [loader, setLoader] = useState(false);
  const [openloader, setopenloader] = useState(false);
  const test = useSelector((state) => state);
  // console.log("test", test);
  let coveragesApi = useSelector(
    (state) => state?.motorCoverage?.generateCoverages?.data?.coverages
  );

  const hyperMotorData = useSelector(
    (state) => state?.hyperverge?.hypervergeMotor
  );
  // console.log("coveragesApi", coveragesApi);

  // data binding will start from here
  const vehicleData = useSelector(
    (state) => state?.motorQuotation?.formData?.vehicleData
  );
  console.log("vehicleData--------------", vehicleData);

  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );

  let SuffixOptions = useSelector((state) => state?.make?.suffix);
  // console.log({ SuffixOptions });
  // TIPO_SUFIJO_NOMBRE
  // let suffixName = SuffixOptions.find(item => item.TIPO_SUFIJO_NOMBRE == policyHolderData?.suffix)

  const quatationData = useSelector((state) => state?.motorQuotation?.formData);
  console.log("quatationData", quatationData);
  const leadId = useSelector(
    (state) => state?.motorQuotation?.formalQuotationSucess?.data?.leadId
  );
  const num = vehicleData?.vehicleValue;
  const options = { maximumFractionDigits: 2 };
  const formattedNumber = Intl.NumberFormat("en-US", options).format(num);

  // console.log("new==>", quataionNumber);
  const coverageData = useSelector(
    (state) => state?.motorQuotation?.formData?.coverages
  );
  const policyHolderData = useSelector(
    (state) => state?.motorQuotation?.formData?.policyHolder
  );
  const alternatePolicyHolder = useSelector(
    (state) => state?.motorQuotation?.formData?.secondary?.thirdPartyData
  );
  const alternatePolicyHolderOwner = useSelector(
    (state) => state?.motorQuotation?.formData?.owner?.thirdPartyData
  );
  const alternatePolicyHolderDriver = useSelector(
    (state) => state?.motorQuotation?.formData?.driver?.thirdPartyData
  );
  const alternatePolicyHolderAssignee = useSelector(
    (state) => state?.motorQuotation?.formData?.assignee?.thirdPartyData
  );
  const alternateLessee = useSelector(
    (state) => state?.motorQuotation?.formData?.lessee?.thirdPartyData
  );
  const alternateLessor = useSelector(
    (state) => state?.motorQuotation?.formData?.lessor?.thirdPartyData
  );
  // console.log("alternatePolicyHolderOwner", alternatePolicyHolderOwner);

  // let covergeArray = [];
  // if (coverageData?.length >= 0 || coverageData !== null) {
  //   coverageData?.map((data) => {
  //     const filteredCity = coveragesApi?.filter((item) => {
  //       if (data.coverage == item.coverage) {
  //         covergeArray.push(item);
  //       }
  //     });
  //   });
  // }
  const motorQuote = useSelector(
    (state) => state?.motorQuotation?.motorQutotionSucess?.data
  );
  let quataionNumber = null;
  quataionNumber = motorQuote?.oonaQuotationResponse?.quotationNumber;
  if (!quataionNumber) {
    quataionNumber = motorQuote?.quotationNumber;
  }

  const filteredArray = coverageData?.filter((itemA) => {
    // console.log("itemA", itemA);
    const isIncludedInB = coveragesApi?.some(
      (itemB) => itemB.coverage == itemA.coverage && itemB.isMandatory == true
    );
    return !isIncludedInB;
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
    } else {
      return {
        coverage: itemA.coverage,
        coverageNameA: itemA.coverageName,
        coverageNameB: "Not Found ",
      };
    }
  });

  // console.log(comparedCoverages, "comparedCoverages");

  const getAccessoryType = (type) => {
    // console.log("hey", a);

    const splitWord = type.split("-");
    // console.log("splitWord", splitWord);
    if (splitWord[1] === "A") {
      return "Additional";
    } else if (splitWord[1] === "B") {
      return "Built In";
    } else if (splitWord[1] === "F") {
      return "Free";
    }
  };

  const getTransmission = (trans) => {
    // console.log("hey", a);

    const splitWord = trans;
    // console.log("splitWord", splitWord);
    if (splitWord === "A") {
      return "Automatic";
    } else if (splitWord === "M") {
      return "Manual";
    }
  };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const createFormData = {
    quotationNumber: quataionNumber,
    documentUploaded: hyperMotorData?.documentUploaded,
    documentId: quatationData?.documentId,
    effectivityDate: quatationData?.effectivityDate,
    expirationDate: quatationData?.expirationDate,
    policyGroupCode: quatationData?.policyGroupCode,
    policyGroupName: quatationData?.policyGroupName,
    contractCode: quatationData?.contractCode,
    branchCode: quatationData?.branchCode,
    subline: quatationData?.subline,
    sublineName: quatationData?.sublineName,
    productTier: quatationData?.productTier,
    productTierName: quatationData?.productTierName,
    paymentPlanCode: quatationData?.paymentPlanCode,
    vehicleData: quatationData?.vehicleData,
    coverages: quatationData?.coverages,
    accessories: quatationData?.accessories,
    assignee: quatationData?.assignee,
    mortgagee: quatationData?.mortgagee,
    secondary: quatationData?.secondary,
    lessor: quatationData?.lessor,
    lessee: quatationData?.lessee,
    owner: quatationData?.owner,
    driver: quatationData?.driver,
    policyHolder: quatationData?.policyHolder,
    leadId: leadId,
    // documentId: documentId,
    subContractCode: quatationData?.subContractCode,
    subAgents: quatationData?.subAgents,
    userCode: quatationData?.userCode,
  };

  if (channelCode?.channelCode === "CH1") {
    createFormData.agentCode = quatationData?.agentCode;
    // createFormData.userCode = quatationData?.userCode;
  }

  // console.log("createFormData_", createFormData);
  // functions *************
  const onChangetoDashboard = () => {
    // history.push("/iCare-Dashboard");
    history.push("/quotation-policy-tabs");
  };

  const onchangetoBack = () => {
    // history.push("/alternate-policyholder");
    history.goBack();
  };

  const onchangetoNext = async () => {
    setopenloader(true);
    // console.log("Form datata==>", createFormData);
    let result = await axiosRequest.post("customer/motorPolicy", createFormData, {
      secure: true,
    });

    if (result?.statusCode === -1) {

      // console.log("hey", result);
      // dispatch(actions.createCTPLQuotation(result));
      dispatch(actions.motorPolicyStore(result));
      // if (result?.data?.oonaPolicyResponse?.technicalControls.length > 0) {

      if (result?.data?.oonaPolicyResponse?.technicalControls.length > 0) {
        if (result?.data?.oonaPolicyResponse?.technicalControls?.[0]?.code === 1624 ||
          result?.data?.oonaPolicyResponse?.technicalControls?.[0]?.error === "Payment is required") {
          history.push("/customer-motor-payment-pay-now");

        } else {
          history.push("/customer-motor-policy-technical-control");

        }
        // history.push("/motor-technical-control");
      } else if (
        result?.data?.oonaQuotationResponse?.paymentBreakdown == null ||
        result?.data?.oonaQuotationResponse?.technicalControls.length > 0
      ) {
        history.push("/customer-formal-technical-control");

      } else {
        history.push("/customer-motor-payment-pay-now");
      }
      setopenloader(false);
    } else if (result?.statusCode === 1) {
      // dispatch(actions.createCTPLQuotation(result));
      setopenloader(false);
    } else {
      setopenloader(false);
    }
    // history.push("/success-Quote-info");
  };
  const showGenderName = (genderId) => {
    if (genderId == "1") {
      return "Male";
    } else if (genderId == "0") {
      return "Female";
    }
    // else if (genderId == "3") {
    //   return "Others"
    // }
    return "";
  };
  let suffixName = SuffixOptions?.find((item) => {
    if (item?.TIPO_SUFIJO_NOMBRE === policyHolderData?.suffix) {
      return item?.NOM_VALOR;
    }
  });
  // console.log("name==>", suffixName?.NOM_VALOR);
  return (
    <>
      <div className="main-class">
        <div style={{ marginBottom: '71px' }}>
          <CommonHeader />
        </div>

        <FullPageLoader fromapploader={openloader}></FullPageLoader>
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
                Back to Home{" "}
              </Button>
            </div>

            <StepThree />
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
                <div className="policy-type">
                  <h2>One last look! Did we get everything right?</h2>
                </div>
                <div className="info-head">
                  <h3>Vehicle Information</h3>
                </div>

                <div>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Make</div>
                        <div className="subheading">
                          {vehicleData?.makeName ? vehicleData?.makeName : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Model</div>
                        <div className="subheading">
                          {vehicleData?.modelName
                            ? vehicleData?.modelName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Vehicle Type</div>
                        <div className="subheading">
                          {vehicleData?.vehicleTypeName
                            ? vehicleData?.vehicleTypeName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Model Year</div>
                        <div className="subheading">
                          {vehicleData?.yearModel
                            ? vehicleData?.yearModel
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Sub Model</div>
                        <div className="subheading">
                          {vehicleData?.subModelName
                            ? vehicleData?.subModelName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Transmission</div>
                        <div className="subheading">
                          {getTransmission(vehicleData?.transmission)
                            ? getTransmission(vehicleData?.transmission)
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Type of Use</div>
                        <div className="subheading">
                          {vehicleData?.typeOfUseName
                            ? vehicleData?.typeOfUseName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Vehicle Value</div>
                        <div className="subheading">₱ {formattedNumber}</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Area of Usage</div>
                        <div className="subheading">
                          {vehicleData?.areaOfUseName
                            ? vehicleData?.areaOfUseName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Plate Number</div>
                        <div className="subheading">
                          {vehicleData?.plateNumber
                            ? vehicleData?.plateNumber
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Conduction Number</div>
                        <div className="subheading">
                          {vehicleData?.conductionNumber
                            ? vehicleData?.conductionNumber
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Chassis/Serial Number</div>
                        <div className="subheading">
                          {vehicleData?.chassisNumber
                            ? vehicleData?.chassisNumber
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Motor/Engine Number</div>
                        <div className="subheading">
                          {vehicleData?.engineNumber
                            ? vehicleData?.engineNumber
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">MV File Number</div>
                        <div className="subheading">
                          {vehicleData?.fileNumber
                            ? vehicleData?.fileNumber
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Subline</div>
                        <div className="subheading">
                          {quatationData?.sublineName
                            ? quatationData?.sublineName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Purchase Date</div>
                        <div className="subheading">
                          {quatationData?.datePurchased
                            ? quatationData?.datePurchased
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                {/* <div className="info-head">
                  <h3>Accessory Information</h3>
                </div>
                <div>
                  <div className="row-bottom-margin">
                    <h6>Accessory 1</h6>
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
                {quatationData?.accessories ? (
                  <div className="info-head">
                    <h3>Accessory Information</h3>
                  </div>
                ) : (
                  ""
                )}
                {/* <div className="info-head">
                  <h3>Accessory Information</h3>
                </div> */}

                {quatationData?.accessories !== null ||
                  quatationData?.accessories?.lenght > 0 ? (
                  quatationData?.accessories?.map((data, index) => {
                    return (
                      <div>
                        <div className="row-bottom-margin">
                          <h6>Accessory- {index + 1}</h6>
                        </div>
                        <Row gutter={16} className="row-bottom-margin">
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
                              <div className="subheading">{data?.price}</div>
                            </div>
                          </Col>
                          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                            <div>
                              <div className="heading">Description</div>
                              <div className="subheading">
                                {data?.description ? data?.description : "-"}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                ) : (
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Category</div>
                        <div className="subheading">-</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Type</div>
                        <div className="subheading">-</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Price</div>
                        <div className="subheading">-</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                      <div>
                        <div className="heading">Description</div>
                        <div className="subheading">-</div>
                      </div>
                    </Col>
                  </Row>
                )}
                {/*
                <div>
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
                            <Row gutter={16} className="row-bottom-margin">
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
                        )}
                      </>
                    );
                  })}
                {comparedCoverages &&
                  comparedCoverages?.map((data) => {
                    return (
                      <>
                        <div>
                          <Row gutter={16} className="row-bottom-margin">
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
                  <Row gutter={16} className="row-bottom-margin">
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
                {quatationData?.policyGroupName ? (
                  <div className="info-head">
                    <h3>Policy Group Information</h3>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <Row gutter={16} className="row-bottom-margin">
                    {quatationData?.policyGroupName ? (
                      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div>
                          <div className="heading">Policy Group</div>
                          <div className="subheading">
                            {" "}
                            {quatationData?.policyGroupName
                              ? quatationData?.policyGroupName
                              : "-"}
                          </div>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                    {quatationData?.selectcontractName ? (
                      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div>
                          <div className="heading">Contract Number</div>
                          <div className="subheading">
                            {quatationData?.selectcontractName
                              ? quatationData?.selectcontractName
                              : ""}
                          </div>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                    {quatationData?.selectsubContractName ? (
                      <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                        <div>
                          <div className="heading">Sub-Contract Number</div>
                          <div className="subheading">
                            {quatationData?.selectsubContractName
                              ? quatationData?.selectsubContractName
                              : "-"}
                          </div>
                        </div>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </div>
                {policyHolderData ? (
                  <div className="info-head">
                    <h3>Policy Holder Information</h3>
                  </div>
                ) : (
                  ""
                )}

                <div>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">First Name</div>
                        <div className="subheading">
                          {policyHolderData?.firstName
                            ? policyHolderData?.firstName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Last Name</div>
                        <div className="subheading">
                          {policyHolderData?.lastName
                            ? policyHolderData?.lastName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Middle Name</div>
                        <div className="subheading">
                          {policyHolderData?.middleName
                            ? policyHolderData?.middleName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Mobile Number</div>
                        <div className="subheading">
                          {policyHolderData?.mobileNumber
                            ? policyHolderData?.mobileNumber
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Email Address</div>
                        <div className="subheading">
                          {policyHolderData?.emailAddress
                            ? policyHolderData?.emailAddress
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Birthdate</div>
                        <div className="subheading">
                          {policyHolderData?.birthday
                            ? policyHolderData?.birthday
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Email Address</div>
                        <div className="subheading">number</div>
                      </div>
                    </Col> */}
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Suffix</div>
                        <div className="subheading">
                          {suffixName?.NOM_VALOR ? suffixName?.NOM_VALOR : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Gender</div>
                        <div className="subheading">
                          {showGenderName(
                            policyHolderData?.gender
                              ? policyHolderData?.gender
                              : "-"
                          )}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Place Of Birth</div>
                        <div className="subheading">
                          {policyHolderData?.placeOfBirth
                            ? policyHolderData?.placeOfBirth
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Citizenship</div>
                        <div className="subheading">
                          {policyHolderData?.citizenshipName
                            ? policyHolderData?.citizenshipName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={16} className="row-bottom-margin">
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Province</div>
                        <div className="subheading">
                          {policyHolderData?.provinceName
                            ? policyHolderData?.provinceName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">City</div>
                        <div className="subheading">
                          {policyHolderData?.cityName
                            ? policyHolderData?.cityName
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Zipcode</div>
                        <div className="subheading">
                          {policyHolderData?.zipCode
                            ? policyHolderData?.zipCode
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Address Line 1</div>
                        <div className="subheading">
                          {policyHolderData?.address1
                            ? policyHolderData?.address1
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Address Line 2</div>
                        <div className="subheading">
                          {policyHolderData?.address2
                            ? policyHolderData?.address2
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {(alternatePolicyHolder?.documentCode ||
                  alternatePolicyHolderOwner?.documentCode ||
                  alternatePolicyHolderAssignee?.documentCode ||
                  alternatePolicyHolderDriver?.documentCode ||
                  alternateLessor?.documentCode ||
                  alternateLessee?.documentCode ||
                  (quatationData?.mortgageCompany &&
                    quatationData?.mortgageClause)) && (
                    <div>
                      <div className="info-head">
                        <h3>Alternate Policy Holder </h3>
                      </div>
                      <div>
                        <Row gutter={[16, 16]} className="row-bottom-margin">
                          {alternatePolicyHolder?.documentCode && (
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                              <div>
                                <div className="title_space">
                                  <h6>Policy Holder</h6>
                                </div>
                                <div className="title_space">
                                  <div className="heading">FirstName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolder?.firstName
                                      ? alternatePolicyHolder?.firstName
                                      : "-"}
                                  </div>
                                </div>
                                <div className="title_space">
                                  <div className="heading">LastName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolder?.lastName
                                      ? alternatePolicyHolder?.lastName
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {alternatePolicyHolderOwner?.documentCode && (
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                              <div>
                                <div className="title_space">
                                  <h6>OWNER</h6>
                                </div>
                                <div className="title_space">
                                  <div className="heading">FirstName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolderOwner?.firstName
                                      ? alternatePolicyHolderOwner?.firstName
                                      : "-"}
                                  </div>
                                </div>
                                <div className="title_space">
                                  <div className="heading">LastName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolderOwner?.lastName
                                      ? alternatePolicyHolderOwner?.lastName
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {alternatePolicyHolderDriver?.documentCode && (
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                              <div>
                                <div className="title_space">
                                  <h6>DRIVER</h6>
                                </div>
                                <div className="title_space">
                                  <div className="heading">FirstName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolderDriver?.firstName
                                      ? alternatePolicyHolderDriver?.firstName
                                      : "-"}
                                  </div>
                                </div>
                                <div className="title_space">
                                  <div className="heading">LastName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolderDriver?.lastName
                                      ? alternatePolicyHolderDriver?.lastName
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {alternatePolicyHolderAssignee?.documentCode && (
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                              <div>
                                <div className="title_space">
                                  <h6>Assignee</h6>
                                </div>
                                <div className="title_space">
                                  <div className="heading">FirstName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolderAssignee?.firstName
                                      ? alternatePolicyHolderAssignee?.firstName
                                      : "-"}
                                  </div>
                                </div>
                                <div className="title_space">
                                  <div className="heading">LastName</div>
                                  <div className="subheading">
                                    {alternatePolicyHolderAssignee?.lastName
                                      ? alternatePolicyHolderAssignee?.lastName
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {alternateLessor?.documentCode && (
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                              <div>
                                <div className="title_space">
                                  <h6>Lessor</h6>
                                </div>
                                <div className="title_space">
                                  <div className="heading">FirstName</div>
                                  <div className="subheading">
                                    {alternateLessor?.firstName
                                      ? alternateLessor?.firstName
                                      : "-"}
                                  </div>
                                </div>
                                <div className="title_space">
                                  <div className="heading">LastName</div>
                                  <div className="subheading">
                                    {alternateLessor?.lastName
                                      ? alternateLessor?.lastName
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {alternateLessee?.documentCode && (
                            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                              <div>
                                <div className="title_space">
                                  <h6>Lessee</h6>
                                </div>
                                <div className="title_space">
                                  <div className="heading">FirstName</div>
                                  <div className="subheading">
                                    {alternateLessee?.firstName
                                      ? alternateLessee?.firstName
                                      : "-"}
                                  </div>
                                </div>
                                <div className="title_space">
                                  <div className="heading">LastName</div>
                                  <div className="subheading">
                                    {alternateLessee?.lastName
                                      ? alternateLessee?.lastName
                                      : "-"}
                                  </div>
                                </div>
                              </div>
                            </Col>
                          )}
                          {quatationData?.mortgageCompany &&
                            quatationData?.mortgageClause && (
                              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                                <div>
                                  <div className="title_space">
                                    <h6>Mortgage</h6>
                                  </div>
                                  <div className="title_space">
                                    <div className="heading">Clause</div>
                                    <div className="subheading">
                                      {quatationData?.mortgageClause}
                                    </div>
                                  </div>
                                  <div className="title_space">
                                    <div className="heading">Company</div>
                                    <div className="subheading">
                                      {quatationData?.mortgageCompany}
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            )}
                        </Row>
                      </div>
                    </div>
                  )}
                <div className="button-header">
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
                    Proceed
                    {/* <ArrowRightOutlined /> */}
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <PolicyQuoteFooter />
    </>
  );
};
export default MotorConfirmPage;
