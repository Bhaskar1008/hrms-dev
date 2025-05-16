import React, { useState, useEffect } from "react";
import "./PolicyGroup.css";
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
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../store/actions";
import StepTwo from "../../../../StepBar/StepTwo/StepTwo";
import axiosRequest from "../../../../../../axios-request/request.methods";
import AllFormFooter from "../../../../AllFormFooter/AllFormFooter";
import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import { checkAgent, stoageGetter } from "../../../../../../helpers";
import Header from "../../SampleHeader/Header";

const PolicyGroup = () => {
  let login_user_data = stoageGetter("user");

  const JWPDecryption = useSelector((state) => state);
  console.log("JWPDecryption---", JWPDecryption);
  const GetAgentCodeFromJWT = JWPDecryption?.JWTDecrypt?.JWTDecryptData?.formData

  const GetAgentCode = GetAgentCodeFromJWT?.tokenData?.agentCode;
  const channelCode = GetAgentCodeFromJWT?.userData?.channelCode;
  const userName = GetAgentCodeFromJWT?.userData?.employeeCode;
  // const channelCode = {channelCode: 'CH1'}
  

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;

  const { Option } = Select;
  const [size, setSize] = useState("default"); // default is 'middle'
  const [agent, setAgent] = useState(null);
  const [subAgent, setSubAgent] = useState(null);
  const [optionList, setOptionList] = useState({
    agent: [],
    subAgent: [],
  });
  const [groupPolicy, setGroupPolicy] = useState(null);
  const [contract, setContract] = useState(null);
  const [subContract, setSubContract] = useState(null);
  const [commercialStructure, setCommercialStructure] = useState(null);
  const [selectedAgentCode, setSelectedAgentCode] = useState(null);
  const [groupPolicyOptions, setGroupPolicyOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [subContractOptions, setSubContractOptions] = useState([]);
  const [subAgentLoader, setSubAgentLoader] = useState(false);

  
  
  const getSubAgentList = async (agentCode) => {
    setSubAgentLoader(true);
    const url = `user/get/subagent-list?agentCode=${agentCode}`;
    const res = await axiosRequest.get(url);
    if (res.statusCode === -1) {
      if (res?.data && Array.isArray(res.data)) {
        setOptionList((prev) => {
          prev["subAgent"] = res.data.map((e) => ({
            label: e.name,
            value: e.documentCode,
            documentCode: e.documentCode,
            documentType: e.documentType,
            childCode: e.childCode,
          }));

          return { ...prev };
        });
      }
    }
    setSubAgentLoader(false);

    if (channelCode?.channelCode === "CH1") {
      getGroupPolicy(agentCode);
    }
  };

  // name
  const [selectgroupPolicy, setSelectGroupPolicy] = useState(null);
  const [selectcontract, setSelectContract] = useState(null);
  const [selectsubContract, setSelectSubContract] = useState(null);
  const [selectcommercialStructure, setSelectCommercialStructure] =
    useState(null);
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    let url1 = `user/lov?name=CommStructure&AgentCode=${GetAgentCode}`;
    if (channelCode?.channelCode === "CH1") {
      url1 = `user/travel/commercialStructures`;
    } else {
      getGroupPolicy(GetAgentCode);
      getSubAgentList(GetAgentCode);
    }

    dispatch(actions.fetchAllCommercialStructure(url1));
  }, []);

  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );

  const qoutationFormData = useSelector(
    (state) => state?.ctplqoutation?.formData
  );
  const sublineId =
  qoutationFormData?.CTPL_VehicleInfo_for_Quotation?.subline;
  // tesitng ctplqoutation.formData
  const formdAta = useSelector((state) => state?.ctplqoutation?.formData);
  const result = useSelector(
    (state) => state?.ctplqoutation?.formData?.statusCode
  );

  const resultdfghj = useSelector((state) => state?.ctplqoutation?.formData);
  // let groupPolicyApi = useSelector(
  //   (state) => state?.groupPolicy?.groupPolicy?.lov
  // );
  // let contractApi = useSelector((state) => state?.groupPolicy?.contract?.lov);

  let subContractApi = useSelector(
    (state) => state?.groupPolicy?.subcontract?.lov
  );

  let commercialStructureApi = useSelector(
    (state) => state?.groupPolicy?.commercialStructure
  );


  const getAgentList = async (commercialId, prams) => {
    setLoader(true);
    const url = `user/get/agent-list?commercialStructure=${commercialId}`;
    const res = await axiosRequest.get(url);
    if (prams === undefined) {
      setLoader(false);
    } else {
      setLoader(true);
    }

    if (res.statusCode === -1) {
      if (res?.data && Array.isArray(res.data)) {
        setOptionList((prev) => {
          prev["agent"] = res.data.map((e) => ({
            label: e.nomCompleto,
            value: e.codAgt,
          }));
          return { ...prev };
        });
      }
    }
  };
  const getGroupPolicy = async (agentCode) => {
    setLoader(true);
    let res = await axiosRequest.get(
      `user/lov?name=GroupPolicyCTPL&AgentCode=${agentCode}&Subline=${sublineId}`
    );
    setLoader(false);
    if (res?.statusCode == -1) {
      const data = res?.data?.lov?.map((item) => ({
        ...item,
        label: item?.NOM_POLIZA,
        value: item?.NUM_POLIZA,
      }));
      setGroupPolicyOptions(data);
    } else {
      setGroupPolicyOptions([]);
    }
  };
  const getContactList = async (policyGroupId, agentCode) => {
    setLoader(true);
    let res = await axiosRequest.get(
      `user/lov?name=Contract&GroupPolicyCTPL=${policyGroupId}&Subline=${sublineId}&AgentCode=${agentCode}`
    );
    setLoader(false);
    if (res?.statusCode == -1) {
      const data = res?.data?.lov?.map((CONTRACT) => {
        const label = CONTRACT.NOM_CONTRATO;
        const value = CONTRACT.NUM_CONTRATO;
        const key = CONTRACT.NUM_CONTRATO;
        const newContract = { ...CONTRACT, label, value, key };
        return newContract;
      });
      setContractOptions(data);
    } else {
      setContractOptions([]);
    }
  };
  const getSubContractList = async (contactCode, agentCode) => {
    setLoader(true);
    let res = await axiosRequest.get(
      `user/lov?name=Subcontract&Contract=${contactCode}&Subline=${sublineId}&AgentCode=${agentCode}`
    );
    setLoader(false);
    if (res?.statusCode == -1) {
      const data = res?.data?.lov?.map((SUBCONTRACT) => {
        const label = SUBCONTRACT.NOM_SUBCONTRATO;
        const value = SUBCONTRACT.NUM_SUBCONTRATO;
        const key = SUBCONTRACT.NUM_SUBCONTRATO;
        const newSubContract = { ...SUBCONTRACT, label, value, key };
        return newSubContract;
      });
      setSubContractOptions(data);
    } else {
      setSubContractOptions([]);
    }
  };

  let commercialStructureOptions = () => {
    if (
      commercialStructureApi &&
      (commercialStructureApi?.data || commercialStructureApi?.lov)
    ) {
      if (channelCode?.channelCode === "CH1") {
        return commercialStructureApi?.data?.map((e) => ({
          label: e?.branchName,
          value: e?.branchCode,
        }));
      } else
        return commercialStructureApi?.lov?.map((e) => ({
          label: e?.NOM_NIVEL3,
          value: e?.COD_NIVEL3,
        }));
    }
    return [];
  };

  const commericalOnChangeHandler = async (value, key) => {
    setCommercialStructure(key);
    setSelectCommercialStructure(key?.label);

    if (channelCode?.channelCode == "CH1") {
      setLoader(true);
      const url = `user/get/agent-list?commercialStructure=${value}`;
      const res = await axiosRequest.get(url);
      setLoader(false);
      if (res.statusCode === -1) {
        if (res?.data && Array.isArray(res.data)) {
          setOptionList((prev) => {
            prev["agent"] = res.data.map((e) => ({
              label: e.nomCompleto,
              value: e.codAgt,
            }));
            return { ...prev };
          });
        }
      }
      setOptionList((prev) => {
        prev["subAgent"] = [];
        return { ...prev };
      });
      setGroupPolicyOptions([]);
    }
    setSubAgent(null);
    setAgent(null);
    setSelectGroupPolicy(null);
    setContractOptions([]);
    setSubContractOptions([]);
    setSelectContract(null);
    setSelectSubContract(null);
    setGroupPolicy(null);
    setContract(null);
    setSubContract(null);
    form.setFieldsValue({
      contract: null,
      subContract: null,
      groupPolicy: null,
      agent: null,
      subAgent: null,
    });
    setCommercialStructure(value);
  };

  const agentChangeHandler = async (val, key) => {
    setSubAgent(null);
    setGroupPolicyOptions([]);
    setSelectGroupPolicy(null);
    setContractOptions([]);
    setSubContractOptions([]);
    setSelectContract(null);
    setSelectSubContract(null);
    setGroupPolicy(null);
    setContract(null);
    setSubContract(null);
    form.setFieldsValue({
      contract: null,
      subContract: null,
      groupPolicy: null,
      agent: val,
    });
    setOptionList((prev) => {
      prev["subAgent"] = [];
      return { ...prev };
    });
    setSelectedAgentCode(val);
    getSubAgentList(val);
    setAgent(val);
  };

  const groupPolicySelectHandler = (value, key) => {
    setLoader(true);
    setGroupPolicy(key.NUM_POLIZA);
    setSelectGroupPolicy(key.NOM_POLIZA);
    setContractOptions([]);
    setSubContractOptions([]);
    setContract(null);
    setSubContract(null);
    form.setFieldsValue({
      contract: null,
      subContract: null,
    });
    if (channelCode?.channelCode === "CH1") {
      getContactList(key.NUM_POLIZA, selectedAgentCode);
    } else {
      getContactList(key.NUM_POLIZA, GetAgentCode);
    }
  };

  const changesPolicyMethods = () => {
    setContract(null);
    setSubContract(null);
    setSelectContract(null);
    setSelectSubContract(null);

    form.setFieldsValue({
      contract: null,
      subContract: null,
    });
  };

  const ContractChangeHandler = (value, key) => {
    setSubContract(null);
    setSelectSubContract(null);
    form.setFieldsValue({
      subContract: null,
    });

    setLoader(true);
    setContract(key.NUM_CONTRATO);
    setSelectContract(key.NOM_CONTRATO);

    if (channelCode?.channelCode === "CH1") {
      getSubContractList(key.NUM_CONTRATO, selectedAgentCode);
    } else {
      getSubContractList(key.NUM_CONTRATO, GetAgentCode);
    }
  };

  const SubContractChangeHandler = (value, key) => {
    setSelectSubContract(key.NOM_SUBCONTRATO);
    setSubContract(key.NUM_SUBCONTRATO);
  };

  const onChangetoDashboard = () => {
    dispatch(actions.resetFormData({}));
    history.push("/quotation-policy-tabs");
  };

  const onchangetoBack = () => {
    history.push("/customer-vehicle-information");
  };
  const onchange = (val) => {
    setSubAgent(val);
  };

  useEffect(() => {
    setCommercialStructure(
      qoutationFormData?.quotation_group_info?.commercial_structure
        ? qoutationFormData?.quotation_group_info?.commercial_structure
        : null
    );
    let agentCode = null;
    if (channelCode?.channelCode === "CH1" && qoutationFormData?.agentCode) {
      agentCode = qoutationFormData?.agentCode;
      getAgentList(
        qoutationFormData?.quotation_group_info?.commercial_structure,
        "formUseEffect2"
      );
      setSelectedAgentCode(qoutationFormData?.agentCode);
    } else {
      agentCode = GetAgentCode;
    }
    if (qoutationFormData?.quotation_group_info?.policy_group) {
      getGroupPolicy(agentCode);
    }
    if (
      qoutationFormData?.quotation_group_info?.policy_group &&
      qoutationFormData?.quotation_group_info?.contract_Num
    ) {
      getContactList(
        qoutationFormData?.quotation_group_info?.policy_group,
        agentCode
      );
    }
    if (qoutationFormData?.quotation_group_info?.sub_contract_Num) {
      getSubContractList(
        qoutationFormData?.quotation_group_info?.contract_Num,
        agentCode
      );
    }
    setGroupPolicy(
      qoutationFormData?.quotation_group_info?.policy_group
        ? qoutationFormData?.quotation_group_info?.policy_group
        : null
    );
    setContract(
      qoutationFormData?.quotation_group_info?.contract_Num
        ? qoutationFormData?.quotation_group_info?.contract_Num
        : null
    );
    setSubContract(
      qoutationFormData?.quotation_group_info?.sub_contract_Num
        ? qoutationFormData?.quotation_group_info?.sub_contract_Num
        : null
    );

    // name bind ---->
    setSelectGroupPolicy(
      qoutationFormData?.quotation_group_info?.policy_group_name
        ? qoutationFormData?.quotation_group_info?.policy_group_name
        : ""
    );
    setSelectContract(
      qoutationFormData?.quotation_group_info?.contract_Num_name
        ? qoutationFormData?.quotation_group_info?.contract_Num_name
        : ""
    );
    setSelectSubContract(
      qoutationFormData?.quotation_group_info?.sub_contract_Num_name
        ? qoutationFormData?.quotation_group_info?.sub_contract_Num_name
        : ""
    );
    setSelectCommercialStructure(
      qoutationFormData?.quotation_group_info?.commercial_structure_name
        ? qoutationFormData?.quotation_group_info?.commercial_structure_name
        : ""
    );
    setAgent(qoutationFormData?.agentCode ? qoutationFormData?.agentCode : "");

    if (qoutationFormData?.subAgents?.length > 0) {


      getSubAgentList(agentCode);

      setSubAgent(
        qoutationFormData?.subAgents[0]?.thirdPartyData?.documentCode
          ? qoutationFormData?.subAgents[0]?.thirdPartyData?.documentCode
          : ""
      );
    }

    form.setFieldsValue({
      commercialStructure: qoutationFormData?.quotation_group_info
        ?.commercial_structure
        ? qoutationFormData?.quotation_group_info?.commercial_structure
        : null,
      groupPolicy: qoutationFormData?.quotation_group_info?.policy_group
        ? qoutationFormData?.quotation_group_info?.policy_group
        : null,
      contract: qoutationFormData?.quotation_group_info?.contract_Num
        ? qoutationFormData?.quotation_group_info?.contract_Num
        : null,
      subContract: qoutationFormData?.quotation_group_info?.sub_contract_Num
        ? qoutationFormData?.quotation_group_info?.sub_contract_Num
        : null,

      /// name bind
      selectgroupPolicy: qoutationFormData?.quotation_group_info
        ?.policy_group_name
        ? qoutationFormData?.quotation_group_info?.policy_group_name
        : "",
      selectcontract: qoutationFormData?.quotation_group_info?.contract_Num_name
        ? qoutationFormData?.quotation_group_info?.contract_Num_name
        : "",
      selectsubContract: qoutationFormData?.quotation_group_info
        ?.sub_contract_Num_name
        ? qoutationFormData?.quotation_group_info?.sub_contract_Num_name
        : "",
      selectcommercialStructure: qoutationFormData?.quotation_group_info
        ?.commercial_structure_name
        ? qoutationFormData?.quotation_group_info?.commercial_structure_name
        : "",
      agent: qoutationFormData?.agentCode ? qoutationFormData?.agentCode : "",
      subAgent:
        qoutationFormData?.subAgents?.length > 0
          ? qoutationFormData?.subAgents[0]?.thirdPartyData?.documentCode
          : "",
    });
  }, []);

  const onFinishPolicyGroup = async (fomData) => {
    const selectedSubAgent = optionList?.subAgent?.filter(
      (item) => item?.childCode == subAgent
    )[0];
    const groupPolicyInfoRequestBody = {
      quotation_group_info: {
        policy_group: groupPolicy,
        contract_Num: contract,
        sub_contract_Num: subContract,
        commercial_structure: commercialStructure,
        // name
        policy_group_name: selectgroupPolicy,
        contract_Num_name: selectcontract,
        sub_contract_Num_name: selectsubContract,
        commercial_structure_name: selectcommercialStructure,
      },
    };
    if (selectedSubAgent) {
      groupPolicyInfoRequestBody.subAgents = [
        {
          thirdPartyData: {
            documentCode: selectedSubAgent?.documentCode,
            documentType: selectedSubAgent?.documentType,
          },
        },
      ];
    } else {
      groupPolicyInfoRequestBody.subAgents = null;
    }
    if (channelCode?.channelCode === "CH1") {
      groupPolicyInfoRequestBody.agentCode = agent;
      groupPolicyInfoRequestBody.userCode = userName;
    }

    dispatch(actions.storeQuotationForm(groupPolicyInfoRequestBody));
    history.push("/customer-sharableLink-information");
  };

  return (
    <>
    <Header />
      <FullPageLoader spinloader={loader || subAgentLoader} />
      <div className="main-class">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                icon={<ArrowLeftOutlined />}
                size={size}
                className="dashboard-button"
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>

            <StepTwo />
          </Col>
          <Col
            xs={24}
            sm={24}
            md={14}
            lg={14}
            xl={14}
            style={{ padding: "0px" }}
          >
            <div className="right-side">
              <div className="policy-type">
                <h2>Almost there! Just need a few more details.</h2>
              </div>

              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinishPolicyGroup}
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
                <div className="RsPolicyDiv">
                  <div className="questionDiv">
                    <h3>Which commercial structure to use?</h3>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la policyGroup"
                        name="commercialStructure"
                        label="Commercial Structure"
                        rules={[
                          {
                            required: true,
                            message: "Commercial Structure is required",
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          // style={{ width: "100%" }}
                          placeholder="Select"
                          optionFilterProp="children"
                          onChange={(item, key) => {
                            commericalOnChangeHandler(item, key);
                          }}
                          value={commercialStructure}
                          options={commercialStructureOptions()}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {/* {commericalStructureOptions.map((item, index) => (
                          <Option key={index} value={item.value}>
                            {item.label}
                          </Option>
                        ))} */}
                        </Select>
                      </Form.Item>
                    </Col>
                    {channelCode?.channelCode === "CH1" &&
                      commercialStructure ? (
                      <>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la policyGroup"
                            name="agent"
                            label="Agent"
                            rules={[
                              {
                                required: true,
                                message: "Agent is required",
                              },
                            ]}
                          >
                            <span style={{ display: "none" }}>{agent}</span>
                            <Select
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="Select"
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              options={optionList.agent}
                              value={agent}
                              onChange={(val, key) =>
                                agentChangeHandler(val, key)
                              }
                            ></Select>
                          </Form.Item>
                        </Col>
                      </>
                    ) : (
                      ""
                    )}

                    {optionList.subAgent && optionList.subAgent.length > 0 ? (
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la policyGroup"
                          name="subAgent"
                          label="Sub Agent"
                        >
                          <span style={{ display: "none" }}>{subAgent}</span>
                          <Select
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            options={optionList.subAgent}
                            value={subAgent}
                            onChange={(val) => onchange(val)}
                          ></Select>
                        </Form.Item>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </div>

                {groupPolicyOptions.length > 0 && (
                  <div className="RsPolicyDiv">
                    <div className="questionDiv">
                      <h3>Which policy group to use?</h3>
                      {/* <ul>
                    <li>

                    </li>
                  </ul> */}
                    </div>
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la policyGroup"
                          name="groupPolicy"
                          label="Policy Group"
                        >
                          <Select
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select"
                            onSelect={(item, key) => {
                              groupPolicySelectHandler(item, key);
                            }}
                            // options={() => {}}
                            options={groupPolicyOptions}
                            value={groupPolicy}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={changesPolicyMethods}
                          >
                            {/* {makeOption.map((item, index) => (
                        <Option key={index} value={item.value}>
                          {item.label}
                        </Option>
                      ))} */}
                          </Select>
                        </Form.Item>
                      </Col>
                      {contractOptions?.length > 0 && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la policyGroup"
                            name="contract"
                            label="Contract Number"
                            rules={[
                              {
                                required: true,
                                message: "Contract Number is required",
                              },
                            ]}
                          >
                            <Select
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="Select"
                              optionFilterProp="children"
                              // onSelect={(item, key) => {
                              //   setContract(key);
                              //   ContractChangeHandler(item, key);
                              // }}
                              // options={() => {}}
                              options={contractOptions}
                              value={contract}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={(item, key) => {
                                // setContract(key);
                                ContractChangeHandler(item, key);
                              }}
                            >
                              {/* {makeOption.map((item, index) => (
                        <Option key={index} value={item.value}>
                          {item.label}
                        </Option>
                      ))} */}
                            </Select>
                          </Form.Item>
                        </Col>
                      )}

                      {subContractOptions?.length > 0 && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la policyGroup"
                            name="subContract"
                            label="Sub-Contract Number"
                            rules={[
                              {
                                required: true,
                                message: "Sub-Contract Number is required",
                              },
                            ]}
                          >
                            <Select
                              size="large"
                              style={{ width: "100%" }}
                              placeholder="Select"
                              optionFilterProp="children"
                              // onSelect={(item, key) => {
                              //   setSubContract(key);
                              //   SubContractChangeHandler(item, key);
                              // }}
                              // options={() => {}}
                              options={subContractOptions}
                              value={subContract}
                              filterOption={(input, option) =>
                                option.props.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              onChange={(item, key) => {
                                // setSubContract(key);
                                SubContractChangeHandler(item, key);
                              }}
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
                      )}
                    </Row>
                  </div>
                )}

                <div className="button-header">
                  <Button
                    className="next-button"
                    size={size}
                    htmlType="submit"
                  // onClick={onFinishPolicyGroup}
                  >
                    Next
                    <ArrowRightOutlined />
                  </Button>

                  <Button
                    className="prev-button"
                    size={size}
                    onClick={onchangetoBack}
                  >
                    Back
                  </Button>

                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
      <AllFormFooter />
    </>
  );
};

export default PolicyGroup;
