import React, { useState, useEffect } from "react";
import "./VehicleInformationDetails.css";
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
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import StepOne from "../components/StepBar/StepOne/StepOne";
import QuickQuoteFooter from "../MotorFormFooter/QuickQuoteFooter/QuickQuoteFooter";
import axiosRequest from "../../../../axios-request/request.methods";
import { useDispatch, useSelector } from "react-redux";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import { checkAgent, stoageGetter } from "../../../../helpers";
import * as actions from "../../../../store/actions/index";

const VehicleInformationDetails = () => {
  let channelcodeforRef = stoageGetter("user");
  let channelCodeforUse = channelcodeforRef?.channelCode?.channelCode;
  console.log("channelCodeforUse", channelCodeforUse);
  const getAgentCode = channelcodeforRef?.agentCode;

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'
  const [openloader, setopenloader] = useState(false);
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
  const test = useSelector((state) => state);
  const quatationData = useSelector((state) => state?.motorQuotation?.formData);
  console.log("quatationData", quatationData);
  // functions *************
  const vehicleStore = quatationData?.vehicleData;
  // console.log("hey==>", vehicleStore);
  // vehicleValue
  const num = vehicleStore?.vehicleValue;
  const options = { maximumFractionDigits: 2 };
  const formattedNumber = Intl.NumberFormat("en-US", options).format(num);

  let createFormData = {
    ...quatationData,
  };
  const successPaymentBreakdown = useSelector(
    (state) =>
      state?.motorQuotation?.motorQutotionSucess?.data?.oonaQuotationResponse
        ?.paymentBreakdown
  );

  // console.log("newfiled==>", successPaymentBreakdown);

  console.log("createFormData", createFormData);
  useEffect(() => {
    getPolicyTerm();
    getSubAgentName();
    getAgentName();
    getCommericalStrucure();
  }, []);
  const onProceedData = async () => {
    history.push("/vehicle-Quote-info");
    // setopenloader(true);
    // console.log("Form datata==>", createFormData);
    // let result = await axiosRequest.post(
    //   "user/motor-quick-quotation",
    //   createFormData,
    //   {
    //     secure: true,
    //   }
    // );

    // console.log("Result ==== >", result);
    // // dispatch(actions.createCtplPolicy(createFormData))
    // if (result?.statusCode === -1) {
    //   dispatch(actions.createMotorQuotation(result));

    //   history.push("/vehicle-Quote-info");
    //   // setopenloader(false);
    // } else if (result?.statusCode === 1) {
    //   dispatch(actions.createMotorQuotation(result));
    //   // setopenloader(false);
    // } else {
    //   // setopenloader(false);
    // }
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/policy-group-info");
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

  // const onchangetoNext = () => {
  //   history.push("/vehicle-Quote-info");
  // };

  const getSubAgentName = async () => {

    if (quatationData?.subAgents?.length > 0) {
      let login_user_data = stoageGetter("user");
      const channelCode = login_user_data?.channelCode;
      let agentCode = null;
      if (channelCode.channelCode !== "CH1") {
        agentCode = login_user_data?.agentCode;
      } else {
        agentCode = createFormData?.agentCode;
      }
      const subAgentId =
        createFormData?.subAgents[0]?.thirdPartyData?.documentCode;
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
        agentCode = createFormData?.agentCode;
      }
      const subAgentId = createFormData?.branchCode;
      const selectedAgentcodenew = createFormData?.agentCode;
      setopenloader(true);

      const url = `user/get/agent-list?commercialStructure=${subAgentId}`;
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {
        const selectedAgent = res?.data?.filter(
          (item) => item.codAgt == selectedAgentcodenew
        );
        console.log("selectedSAgent: ", selectedAgent);
        if (res?.data && Array.isArray(res.data && selectedAgent)) {
          setAgentName(selectedAgent[0]?.nomCompleto);
          console.log("res.data: ", res.data);
        }
      }
      setopenloader(false);
    }
  };
  const getPolicyTerm = async () => {
    const selectedPolicyterm = createFormData?.paymentPlanCode;
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
    const selectedCommercial = createFormData?.branchCode;
    const selectedCommercial1 = createFormData?.branchCode
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
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className="main-class">
        <Row
          gutter={16}
          className="policy-header"
          style={{ marginTop: "15px" }}
        >
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
            <div className="mobileMargin">
              <StepOne />
            </div>
          </Col>
          <Col xs={24} sm={24} md={10} lg={10} xl={10}>
            <div className="right-side">
              <div className="step-heading">
                <div className="policy-type">
                  <h2>
                    Here’s an estimated premium based on the vehicle details.
                  </h2>
                </div>
                <div className="destop--dta">
                  <div className="info-head">
                    <h3>Vehicle Information</h3>
                  </div>
                </div>
              </div>
              <div>
                <Row className="row-bottom-margin" style={{ rowGap: "15px" }}>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Make</div>
                      <div className="subheading">{vehicleStore?.makeName}</div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Model</div>
                      <div className="subheading">
                        {vehicleStore?.modelName}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Vehicle Type</div>
                      <div className="subheading">
                        {vehicleStore?.vehicleTypeName}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Model Year</div>
                      <div className="subheading">
                        {vehicleStore?.yearModel}
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row className="row-bottom-margin" style={{ rowGap: "15px" }}>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Sub Model</div>
                      <div className="subheading">
                        {vehicleStore?.subModelName}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Transmission</div>
                      <div className="subheading">
                        {getTransmission(vehicleStore?.transmission)}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Subline</div>
                      <div className="subheading">
                        {quatationData?.sublineName}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Type of Use</div>
                      <div className="subheading">
                        {vehicleStore?.typeOfUseName}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="row-bottom-margin" style={{ rowGap: "15px" }}>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Vehicle Value</div>
                      <div className="subheading">₱ {formattedNumber}</div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Area of Usage</div>
                      <div className="subheading">
                        {vehicleStore?.areaOfUseName}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="info-head">
                <h3>Product</h3>
              </div>
              <div>
                <Row
                  gutter={16}
                  className="row-bottom-margin"
                  style={{ rowGap: "15px" }}
                >
                  <Col xs={24} sm={24} md={8} lg={12} xl={12}>
                    <Button
                      className="btn_Product"
                      style={{ border: "1px solid #4AC6BB" }}
                    >
                      {quatationData?.productTierName}
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="info-head">
                <h3>Policy Group Information</h3>
              </div>
              <div>
                {channelCodeforUse == "CH1" ? <Row
                  gutter={16}
                  className="row-bottom-margin"
                  style={{ rowGap: "15px" }}
                >
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">Commercial Structure</div>
                      <div className="subheading">{commercialStr}</div>
                    </div>
                  </Col>
                  {agentName !== "" && channelCodeforUse == "CH1" && (
                    <Col xs={12} sm={12} md={6} lg={8} xl={8}>
                      <div>
                        <div className="heading">{agentName && "Agent"}</div>
                        <div className="subheading">{agentName}</div>
                      </div>
                    </Col>
                  )}

                  {subAgentName !== "" && (
                    <Col xs={12} sm={12} md={6} lg={8} xl={8}>
                      <div>
                        <div className="heading">
                          {subAgentName && "Sub Agent"}
                        </div>
                        <div className="subheading">{subAgentName}</div>
                      </div>
                    </Col>
                  )}
                </Row> : <Row
                  gutter={16}
                  className="row-bottom-margin"
                // style={{ rowGap: "px" }}
                >
                  <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div>
                      <div className="heading">Commercial Structure</div>
                      <div className="subheading">{commercialStr}</div>
                    </div>
                  </Col>
                </Row>}
                <Row
                  gutter={16}
                  className="row-bottom-margin"
                  style={{ rowGap: "15px" }}
                >
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">Effective Date</div>
                      <div className="subheading">
                        {quatationData?.effectivityDate}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">Expiry Date</div>
                      <div className="subheading">
                        {quatationData?.expirationDate}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">
                        {policyTerm && "Payment Term"}
                      </div>
                      <div className="subheading">{policyTerm}</div>
                    </div>
                  </Col>


                </Row>

                <Row className="row-bottom-margin"
                  gutter={16}
                  style={{ rowGap: "15px" }}>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">
                        {quatationData?.policyGroupName && "Policy Group"}
                      </div>
                      <div className="subheading">
                        {quatationData?.policyGroupName}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">
                        {quatationData?.selectcontractName && "Contract"}
                      </div>
                      <div className="subheading">
                        {quatationData?.selectcontractName}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                    <div>
                      <div className="heading">
                        {quatationData?.selectsubContractName && "Sub-Contract"}
                      </div>
                      <div className="subheading">
                        {quatationData?.selectsubContractName}
                      </div>
                    </div>
                  </Col>
                </Row>

              </div>
            </div>
          </Col>

          <Col xs={24} sm={24} md={8} lg={8} xl={8}>
            <div className="premium-breacldoen">
              <div className="preee--heading">
                <h3>Premium Breakdown</h3>
              </div>
              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>Net Premium</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.netPrem
                      ? successPaymentBreakdown?.netPrem
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>Document Stamp</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.docStamp
                      ? successPaymentBreakdown?.docStamp
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>EVAT</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.eVat
                      ? successPaymentBreakdown?.eVat
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>LGT</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.lgt
                      ? successPaymentBreakdown?.lgt
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>Others</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.others
                      ? successPaymentBreakdown?.others
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>Tax</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.tax
                      ? successPaymentBreakdown?.tax
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h2>Gross Premium</h2>
                </div>
                <div className="child-preimum">
                  <p>
                    {" "}
                    {successPaymentBreakdown?.grossPrem
                      ? successPaymentBreakdown?.grossPrem
                      : 0}
                  </p>
                </div>
              </div>

              <div className="parent-preimum">
                <div className="child-preimum">
                  <h1>Total Amount</h1>
                </div>
                <div className="child-preimum">
                  <h3>
                    {" "}
                    ₱{" "}
                    {successPaymentBreakdown?.grossPrem
                      ? successPaymentBreakdown?.grossPrem
                      : 0}
                  </h3>
                </div>
              </div>

              <div className="button-headerPreium">
                <Button
                  className="next-buttonProceess"
                  size={size}
                  htmlType="submit"
                  onClick={onProceedData}
                // onClick={onFinishPolicyGroup}
                >
                  Proceed
                  <ArrowRightOutlined />
                </Button>

                <Button
                  className="backprev-button"
                  size={size}
                  onClick={onchangetoBack}
                >
                  Back
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <QuickQuoteFooter />
    </>
  );
};
export default VehicleInformationDetails;
