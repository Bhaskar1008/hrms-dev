import React, { useState, useEffect } from "react";
import "./TravelPolicyGroup.css";
import { useHistory, useLocation } from "react-router-dom";
import { isEmpty } from "lodash";

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
  Spin,
} from "antd";
import _ from "lodash";
import axiosRequest from "../../../../../../axios-request/request.methods";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../store/actions";
import { checkAgent, stoageGetter } from "../../../../../../helpers";
import StepTravelOne from "../StepBarTravel/StepTravelOne/StepTravelOne";
import { setTravelPolicyDetails } from "../../../../../../store/actions/travel";
import TravelFooter from "../TravelFooter/TravelFooter";
import Header from "../../SampleHeader/Header";


const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const TravelPolicyGroup = () => {
  let login_user_data = stoageGetter("user");

  const sampletripData = useSelector((state) => state?.JWTDecrypt?.JWTDecryptData?.formData?.userData);
  console.log(sampletripData,"sampletripData")

  const [form] = Form.useForm();
  const getAgentCode = sampletripData?.agentCode;
  // const getAgentCode = 1101;
  const channelCode = sampletripData?.channelCode?.channelCode;
  // const channelCode = {channelCode: 'CH1'}
  const history = useHistory();
  const dispatch = useDispatch();
  const tripData = useSelector((state) => state?.trip);
  
  const travelPolicyData = tripData?.travelPolicyData;
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [showSubagentLoader, setShowSubagentLoader] = useState(false);
  const [policyDetails, setPolicyDetails] = useState({
    group: null,
    contractNumber: null,
    subContractNumber: null,
    commercial: null,
    agent: null,
    subAgent: null,
  });
  const [optionList, setOptionsList] = useState({
    group: [],
    contractNumber: [],
    subContractNumber: [],
    commercial: [],
    commercialName: [],
    agent: [],
    subAgent: [],
  });

  const [size, setSize] = useState("default"); // default is 'middle'

  const setPolicyDetailsFn = (name, val) => {
    setPolicyDetails((prev) => {
      prev[name] = val;
      return { ...prev };
    });
    form.setFieldsValue({
      [name]: val,
    });
  };
  const resetArray = (name) => {
    setOptionsList((pre) => {
      pre[name] = []
      return { ...pre };
    })
  }
  const resetFields = async (name) => {
    setPolicyDetails((pre) => {
      pre[name] = null;
      return { ...pre };
    })
  }

  const getLovByType = async (url, name, label, value) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(url);
    if (res.statusCode === -1) {
      if (res?.data?.lov && Array.isArray(res.data.lov)) {
        setOptionsList((prev) => {
          prev[name] = res.data.lov.map((e) => ({
            label: e[label],
            value: e[value],
          }));
          return { ...prev };
        });
      }
    }
    setShowScreenLoader(false);
  };

  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };

  const onFinishPolicyGroup = (formData) => {
    const subAgent = optionList?.subAgent?.filter((item) => item?.value == policyDetails?.subAgent)[0];
    const agentName = optionList.agent?.filter((item) => item?.value == policyDetails?.agent)[0];
    const data = {
      group: optionList.group.filter((e) => e.value === policyDetails.group)[0],
      contractNumber: optionList.contractNumber.filter(
        (e) => e.value === policyDetails.contractNumber
      )[0],
      subContractNumber: optionList.subContractNumber.filter(
        (e) => e.value === policyDetails.subContractNumber
      )[0],
      commercial: optionList.commercial.filter(
        (e) => e.value === policyDetails.commercial
      )[0],
      commercialName: optionList.commercial.filter(
        (e) => e.label === policyDetails.commercial
      )[0],
      agent: policyDetails.agent,
      agentName: agentName?.label,

      subAgents: subAgent ? [
        {
          thirdPartyData: {
            documentCode: subAgent?.documentCode,
            documentType: subAgent?.documentType
          }
        }
      ] : null
    };

    dispatch(setTravelPolicyDetails(data));
    history.push("/customer/travel-policy-holder");
  };
  const onFaild = (err) => {
  }
  const onClickBack = () => {
    // history.goBack();
    history.push("/customer/travel-info");
  };

  const getCommercialData = async () => {

    if (channelCode.channelCode !== "CH1") {
      const url2 = `user/lov?name=CommStructure&AgentCode=${getAgentCode}`;
      getLovByType(url2, "commercial", "NOM_NIVEL3", "COD_NIVEL3");
      return;
    }
    setShowScreenLoader(true);
    const url = `user/travel/commercialStructures`;
    const res = await axiosRequest.get(url);
    if (res.statusCode === -1) {
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setOptionsList((prev) => {
          prev["commercial"] = res.data.data.map((e) => ({
            label: e.branchName,
            value: e.branchCode,
          }));
          return { ...prev };
        });
      }
    }

    getLovByType(url, "group", "NOM_POLIZA", "NUM_POLIZA");
    setShowScreenLoader(false);
  };

  const getAgentData = async (val) => {
    setShowScreenLoader(true);
    const url = `user/get/agent-list?commercialStructure=${val}`;
    const res = await axiosRequest.get(url);
    setShowScreenLoader(false);
    if (res.statusCode === -1) {
      if (res?.data && Array.isArray(res.data)) {
        setOptionsList((prev) => {
          prev["agent"] = res.data.map((e) => ({
            label: e.nomCompleto,
            value: e.codAgt,
          }));
          return { ...prev };
        });
      }
    }
    setPolicyDetails((prev) => {
      prev.agent = null;
      prev.subAgent = null;
      return { ...prev };
    });
  };

  const getSubAgentData = async (val) => {
    setShowSubagentLoader(true);
    const url = `user/get/subagent-list?agentCode=${val}`;
    const res = await axiosRequest.get(url);
    if (res.statusCode === -1) {
      if (res?.data && Array.isArray(res.data)) {
        setOptionsList((prev) => {
          prev["subAgent"] = res.data.map((e) => ({
            label: e.name,
            value: e.documentCode,
            documentCode: e.documentCode,
            documentType: e.documentType
          }));
          return { ...prev };
        });
      }
    } else {
      resetArray("subAgent");
    }
    setShowSubagentLoader(false);

  };

  const onChangeHandler = (val, name) => {
    setPolicyDetailsFn(name, val);
    if (name === "group") {
      form.resetFields(['contractNumber', 'subContractNumber']);
      resetFields('contractNumber');
      resetFields('subContractNumber');
      resetArray("contractNumber");
      resetArray("subContractNumber");
      const url = `user/lov?name=ContractCodeTravel&GroupPolicyTravel=${val}&AgentCode=${policyDetails.agent}`;
      getLovByType(url, "contractNumber", "NOM_CONTRATO", "NUM_CONTRATO");
    } else if (name === "contractNumber") {
      const url = `user/lov?name=SubcontractCodeTravel&ContractCodeTravel=${val}&AgentCode=${policyDetails.agent}`;
      resetFields('subContractNumber');
      form.resetFields(['subContractNumber']);
      getLovByType(
        url,
        "subContractNumber",
        "NOM_SUBCONTRATO",
        "NUM_SUBCONTRATO"
      );
    } else if (name === "commercial" && channelCode.channelCode === "CH1") {
      resetFields('agent');
      resetFields('subAgent');
      resetFields('group');
      resetFields('contractNumber');
      resetFields('subContractNumber');
      form.resetFields(['agent', 'subAgent', 'group', 'contractNumber', 'subContractNumber']);
      resetArray("group");
      resetArray("agent");
      resetArray("subAgent");
      resetArray("contractNumber");
      resetArray("subContractNumber");
      getAgentData(val);
    } else if (name === "agent") {
      const url2 = `user/lov?name=GroupPolicyTravel&AgentCode=${val}`;
      getLovByType(url2, "group", "NOM_POLIZA", "NUM_POLIZA");
      resetFields('subAgent');
      resetFields('group');
      resetFields('contractNumber');
      resetFields('subContractNumber');
      form.resetFields(['subAgent', 'group', 'contractNumber', 'subContractNumber']);
      resetArray("contractNumber");
      resetArray("subContractNumber");
      getSubAgentData(val);
    }

    // if (name === "group") {
    //   setPolicyDetailsFn("contractNumber", null);
    //   setPolicyDetailsFn("subContractNumber", null);
    // } else if (name === "contractNumber") {
    //   setPolicyDetailsFn("subContractNumber", null);
    // }
    
  };

  useEffect(() =>{
    if(travelPolicyData){
      prepopulateData(travelPolicyData)
    }
  }, [travelPolicyData])

  const prepopulateData = async(data) => {
    if(data?.commercial?.value && optionList?.commercial?.length === 0){
      await getCommercialData();
    }
    if(data?.commercial?.value && !policyDetails.commercial){
      setPolicyDetailsFn("commercial", data?.commercial?.value);
    }
    let agentCode = null;
    if(channelCode?.channelCode === "CH1"){
      agentCode = data?.agent
    } else {
      agentCode = getAgentCode;
    }
    if(agentCode && channelCode?.channelCode === "CH1" && optionList?.agent?.length === 0){
      await getAgentData(data?.commercial?.value)
    }
    if(agentCode && channelCode?.channelCode === "CH1" && !policyDetails.agent){
      setPolicyDetailsFn("agent", agentCode);
    }
    if(data?.subAgents?.length > 0 && optionList?.subAgent?.length === 0){
      await getSubAgentData(agentCode)
    }
    if(data?.subAgents?.length > 0 && !policyDetails.subAgent){
      setPolicyDetailsFn("subAgent", data?.subAgents[0]?.thirdPartyData?.documentCode);
    }
    if(data?.group?.value && optionList?.group?.length === 0){
      const url2 = `user/lov?name=GroupPolicyTravel&AgentCode=${agentCode}`;
      await getLovByType(url2, "group", "NOM_POLIZA", "NUM_POLIZA");
    }
    if(data?.group?.value && !policyDetails.group){
      setPolicyDetailsFn("group", data?.group?.value);
    }
    if(data?.contractNumber?.value && optionList?.contractNumber?.length === 0){
      const url = `user/lov?name=ContractCodeTravel&GroupPolicyTravel=${data?.group?.value}&AgentCode=${agentCode}`;
      await getLovByType(url, "contractNumber", "NOM_CONTRATO", "NUM_CONTRATO");
    }
    if(data?.contractNumber?.value && !policyDetails.contractNumber){
      setPolicyDetailsFn("contractNumber", data?.contractNumber?.value);
    }
    if(data?.subContractNumber?.value && optionList?.subContractNumber?.length === 0){
      const url = `user/lov?name=SubcontractCodeTravel&ContractCodeTravel=${data?.contractNumber?.value}&AgentCode=${agentCode}`;
      await getLovByType(
        url,
        "subContractNumber",
        "NOM_SUBCONTRATO",
        "NUM_SUBCONTRATO"
      );   
     }
    if(data?.subContractNumber?.value && !policyDetails.subContractNumber){
      setPolicyDetailsFn("subContractNumber", data?.subContractNumber?.value);
    }
  }

  useEffect(() => {
    const url = `user/lov?name=GroupPolicyTravel&AgentCode=${getAgentCode}`;

    getCommercialData();

    if (channelCode.channelCode !== 'CH1') {
      getSubAgentData(getAgentCode)
      getLovByType(url, "group", "NOM_POLIZA", "NUM_POLIZA");
    }
  }, []);
  
  const onSearch = (value) => {
  
  };
  const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  return (
    <>
    <Header/>
      <fullPageLoader fromapploader={true} />
      <div className="rsmain-class">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button onClick={onChangetoDashboard} className="dashbtn">
                <ArrowLeftOutlined />
                Back to Home
              </Button>
            </div>

            <StepTravelOne />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="right-side">
              <div className="policy-type">Just a few more details.</div>

              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                form={form}
                onFinish={onFinishPolicyGroup}
                onFinishFailed={onFaild}
              >
                <div className="rspolicydiv">
                  <div className="questionDiv">
                   
                     
                        <h3>Which commercial structure to use?</h3>
                      
                    
                  </div>
                  <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la policyGroup"
                        name="commercial"
                        label="Commercial Structure"
                        rules={[
                          {
                            required: true,
                            message: "Please select this filed",
                          },
                        ]}
                      >
                        <Select
                        showSearch
                        bordered="false"
                        onSearch={onSearch}
                          size="large"
                          // style={{ width: "100%" }}
                          placeholder="Select Commercial Structure"
                          optionFilterProp="children"
                          filterOption={filterOption}
                          
                          // filterOption={(input, option) =>
                          //   option.props.children
                          //     .toLowerCase()
                          //     .indexOf(input.toLowerCase()) >= 0
                          // }
                          options={optionList.commercial}
                          value={policyDetails.commercial}
                          onChange={(val) => onChangeHandler(val, "commercial")}
                        >
                          {/* {commericalStructureOptions.map((item, index) => (
                          <Option key={index} value={item.value}>
                            {item.label}
                          </Option>
                        ))} */}
                        </Select>
                      </Form.Item>
                    </Col>
                    {channelCode?.channelCode === "CH1" && optionList?.agent?.length > 0 ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la policyGroup"
                            name="agent"
                            label="Agent"
                            rules={[
                              {
                                required: true,
                                message: "Agent is required.",
                              },
                            ]}
                          >
                            {/* <span style={{ display: "none" }}>
                              {policyDetails.agent}
                            </span> */}
                            <Select
                             showSearch
                             bordered="false"
                             onSearch={onSearch}
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="Select Agent"
                              optionFilterProp="children"
                          filterOption={filterOption}
                              options={optionList.agent}
                              value={policyDetails.agent}
                              onChange={(val) => onChangeHandler(val, "agent")}
                            ></Select>
                          </Form.Item>
                        </Col>

                      </>
                    ) : (
                      ""
                    )}

                    {
                      (optionList?.subAgent && optionList?.subAgent?.length > 0) ? <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la policyGroup"
                          name="subAgent"
                          label="Sub Agent"
                        >
                          {/* <span style={{ display: "none" }}>
                            {policyDetails.subAgent}
                          </span> */}
                          <Select
                           showSearch
                           bordered="false"
                           onSearch={onSearch}
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select Sub-Agent"
                            optionFilterProp="children"
                          filterOption={filterOption}
                            options={optionList.subAgent}
                            value={policyDetails.subAgent}
                            onChange={(val) =>
                              onChangeHandler(val, "subAgent")
                            }
                          ></Select>
                        </Form.Item>
                      </Col> : ''
                    }
                  </Row>
                </div>
                {(optionList?.group && optionList?.group?.length > 0) ? <div className="rspolicydiv">
                  <div className="questionDiv">
                   
                      
                        <h3>Which policy group to use?</h3>
                      
                   
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la policyGroup"
                        name="group"
                        label="Policy Group"
                      >
                        {/* <span style={{ display: "none" }}>
                          {policyDetails.group}
                        </span> */}
                        <Select
                         showSearch
                         bordered="false"
                         onSearch={onSearch}
                          size="large"
                          style={{ width: "100%" }}
                          placeholder="Select"
                          optionFilterProp="children"
                          filterOption={filterOption}
                          options={optionList.group}
                          value={policyDetails.group}
                          onChange={(val) => onChangeHandler(val, "group")}
                        >
                          {/* {makeOption.map((item, index) => (
                        <Option key={index} value={item.value}>
                          {item.label}
                        </Option>
                      ))} */}
                        </Select>
                      </Form.Item>
                    </Col>
                    {
                      optionList?.contractNumber?.length > 0 &&
                      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la policyGroup"
                          name="contractNumber"
                          label="Contract"
                          rules={[
                            {
                              required: true,
                              message: "Contract Number is required.",
                            },
                          ]}
                        >
                          {/* <span style={{ display: "none" }}>
                            {policyDetails.contractNumber}
                          </span> */}
                          <Select
                           showSearch
                           bordered="false"
                           onSearch={onSearch}
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={optionList.contractNumber}
                            value={policyDetails.contractNumber}
                            onChange={(val) =>
                              onChangeHandler(val, "contractNumber")
                            }
                          >
                            {/* {makeOption.map((item, index) => (
                              <Option key={index} value={item.value}>
                                {item.label}
                              </Option>
                            ))} */}
                          </Select>
                        </Form.Item>
                      </Col>
                    }

                    {
                      optionList?.subContractNumber?.length > 0 &&
                      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la policyGroup"
                          name="subContractNumber"
                          label="Sub-Contract"
                          rules={[
                            {
                              required: true,
                              message: "Sub Contract Number is required.",
                            },
                          ]}
                        >
                          {/* {
                            <span style={{ display: " none" }}>
                              {policyDetails.subContractNumber}
                            </span>
                          } */}
                          <Select
                           showSearch
                           bordered="false"
                           onSearch={onSearch}
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select"
                            optionFilterProp="children"
                          filterOption={filterOption}
                            options={optionList.subContractNumber}
                            value={policyDetails.subContractNumber}
                            onChange={(val) =>
                              onChangeHandler(val, "subContractNumber")
                            }
                          >
                            {/* {makeOption.map((item, index) => (
                        <Option key={index} value={item.value}>
                          {item.label}
                        </Option>
                      ))
                      } */}
                          </Select>
                        </Form.Item>
                      </Col>
                    }
                  </Row>
                </div> : ''}

                <div className="button-header">
                  <Button
                    className="prev-button"
                    size={size}
                    onClick={onClickBack}
                  >
                    Back
                  </Button>
                  <Button className="next-button" size={size} htmlType="submit">
                    Next
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TravelFooter />
      </div>
      {showScreenLoader || showSubagentLoader ? (
        <div className="screenLoader">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TravelPolicyGroup;
