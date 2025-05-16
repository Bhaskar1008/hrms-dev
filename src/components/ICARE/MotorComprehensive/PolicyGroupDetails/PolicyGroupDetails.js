import React, { useState, useEffect } from "react";
import "./PolicyGroupDetails.css";
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
import moment, { now } from "moment";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
// import AutoSelectCompletion from "../components/AutoSelectCompletion";
import StepOne from "../components/StepBar/StepOne/StepOne";
import * as actions from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { checkAgent, stoageGetter } from "../../../../helpers";
import axiosRequest from "../../../../axios-request/request.methods";
import MotorFormFooter from "../MotorFormFooter/MotorFormFooter";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";

const PolicyGroupDetails = () => {
  let login_user_data = stoageGetter("user");

  const getAgentCode = login_user_data?.agentCode;
  const channelCode = login_user_data?.channelCode;
  // console.log("channelcode", channelCode);
  const userName = login_user_data?.employeeCode;
  // console.log("agent_id", getAgentCode);
  // console.log("agent_id1", channelCode);
  const test2 = useSelector((state) => state);
  console.log("test2", test2);

  // here we will geta data of vehicle
  const motoVehicle = useSelector((state) => state?.motorQuotation?.formData);
  // console.log("motoVehicle", motoVehicle);

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'
  const [selectedAgentCode, setSelectedAgentCode] = useState(null);

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const [groupPolicy, setGroupPolicy] = useState(null);
  // console.log("new==>", groupPolicy);
  const [contract, setContract] = useState(null);
  const [subContract, setSubContract] = useState(null);
  // here  subcontract name will come

  const [commercialStructure, setCommercialStructure] = useState(null);
  // console.log("hello===>", commercialStructure);
  const [openloader, setopenloader] = useState(false);
  const [openloader1, setopenloader1] = useState(false);
  const [agent, setAgent] = useState("");
  const [subAgent, setSubAgent] = useState([
    {
      thirdPartyData: {
        documentCode: null,
        documentType: null,
        // name: null,
      },
    },
  ]);
  // console.log("subAgent", subAgent[0].thirdPartyData?.documentCode);

  const [subAgentDocumentCode, setSubAgentDocumentCode] = useState(null);
  const [subAgentDocumentType, setSubAgentDocumentType] = useState(null);

  const [paymentTerms, setPaymentTerms] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");
  const [expirydate, setExpiryDate] = useState("");

  const [selectgroupPolicy, setSelectGroupPolicy] = useState(null);
  const [selectcontractName, setSelectContract] = useState(null);
  const [selectsubContractName, setSelectSubContract] = useState(null);
  const [groupPolicyOptions, setGroupPolicyOptions] = useState([]);
  const [agentOptions, setAgentOptions] = useState([]);
  const [subAgentOptions, setSubAgentOptions] = useState([]);
  const [contractOptions, setContractOptions] = useState([]);
  const [subContractOptions, setSubContractOptions] = useState([]);
  const [selectcommercialStructure, setSelectCommercialStructure] =
    useState("");

  const [selectAgent, setSelectAgent] = useState("");
  const [selectSubAgent, setSelectSubAgent] = useState("");
  const [selectPaymentTerms, setSelectPaymentTerms] = useState("");
  const disabledDateForSecondPicker = (current) => {
    if (!effectiveDate) {
      return true; // No date selected in the first DatePicker
    }

    return current && current <= moment(effectiveDate).add(1, "days");
  };
  let policyGroupData = useSelector((state) => state?.motorQuotation?.formData);
  console.log("policyGroupData", policyGroupData);

  useEffect(() => {
    if (channelCode?.channelCode !== "CH1") {
      // dispatch(actions.fetchAllGroupPolicy(getAgentCode));
      getGroupPolicy(getAgentCode);
      getSubAgentList(getAgentCode);
      // dispatch(
      //   actions.fetchAllSubAgent(getAgentCode, (result) => {
      //     if (result?.statusCode === -1) {
      //       setopenloader1(false);
      //     } else {
      //       setopenloader1(false);
      //     }
      //   })
      // );
    }

    dispatch(actions.fetchAllPaymentTerms());

    let url = "";
    if (channelCode.channelCode == "CH1") {
      url = `user/travel/commercialStructures`;
    } else {
      url = `user/lov?name=CommStructure&AgentCode=${getAgentCode}`;
    }
    dispatch(actions.fetchAllCommercialStructure(url));
  }, [dispatch]);

  // data binding useEffect will start here
  useEffect(() => {
    if (policyGroupData) {
      prepopulateData();
    }
  }, []);
  const prepopulateData = async () => {
    setCommercialStructure(
      policyGroupData?.branchCode ? Number(policyGroupData?.branchCode) : null
    );
    setEffectiveDate(
      policyGroupData?.effectivityDate
        ? moment(policyGroupData?.effectivityDate).format("MM/DD/YYYY")
        : ""
    );
    setExpiryDate(
      policyGroupData?.expirationDate
        ? moment(policyGroupData?.expirationDate).format("MM/DD/YYYY")
        : ""
    );
    let agentCode = null;
    if (channelCode?.channelCode === "CH1" && policyGroupData?.agentCode) {
      agentCode = policyGroupData?.agentCode;
      getAgentList(policyGroupData?.branchCode);
      setSelectedAgentCode(policyGroupData?.agentCode);
    } else {
      agentCode = getAgentCode;
    }
    setAgent(policyGroupData?.agentCode ? policyGroupData?.agentCode : null);
    if (policyGroupData?.subAgents?.length > 0) {
      getSubAgentList(agentCode);
      setSubAgent(
        policyGroupData?.subAgents[0]?.thirdPartyData?.documentCode
          ? parseInt(
            policyGroupData?.subAgents[0]?.thirdPartyData?.documentCode
          )
          : ""
      );
      setSubAgentDocumentCode(
        policyGroupData?.subAgents[0]?.thirdPartyData?.documentCode
      );
      setSubAgentDocumentType(
        policyGroupData?.subAgents[0]?.thirdPartyData?.documentType
      );
    }
    if (policyGroupData?.policyGroupCode) {
      getGroupPolicy(agentCode);
      setGroupPolicy(
        policyGroupData?.policyGroupCode
          ? policyGroupData?.policyGroupCode
          : null
      );
      setSelectGroupPolicy(
        policyGroupData?.policyGroupName
          ? policyGroupData?.policyGroupName
          : null
      );
    }
    if (policyGroupData?.policyGroupCode && policyGroupData?.contractCode) {
      getContactList(policyGroupData?.policyGroupCode, agentCode);
      setContract(
        policyGroupData?.contractCode ? policyGroupData?.contractCode : null
      );
      setSelectContract(
        policyGroupData?.selectcontractName
          ? policyGroupData?.selectcontractName
          : null
      );
    }
    if (policyGroupData?.subContractCode) {
      getSubContractList(policyGroupData?.contractCode, agentCode);
      setSubContract(
        policyGroupData?.subContractCode
          ? policyGroupData?.subContractCode
          : null
      );
      setSelectSubContract(
        policyGroupData?.selectsubContractName
          ? policyGroupData?.selectsubContractName
          : null
      );
    }
    setPaymentTerms(
      policyGroupData?.paymentPlanCode
        ? (policyGroupData?.paymentPlanCode).toString()
        : null
    );

    form.setFieldsValue({
      EffectivityDate: policyGroupData?.effectivityDate
        ? moment(policyGroupData?.effectivityDate)
        : "",
      ExpiryDate: policyGroupData?.expirationDate
        ? moment(policyGroupData?.expirationDate)
        : "",
      policyGroup: policyGroupData?.policyGroupName
        ? policyGroupData?.policyGroupName
        : null,
      ContractNumber: policyGroupData?.selectcontractName
        ? policyGroupData?.selectcontractName
        : null,
      subContractNumber: policyGroupData?.selectsubContractName
        ? policyGroupData?.selectsubContractName
        : null,
      commercialStructure: policyGroupData?.branchCode
        ? Number(policyGroupData?.branchCode)
        : null,
      agent: policyGroupData?.agentCode ? policyGroupData?.agentCode : null,
      paymentterms: policyGroupData?.paymentPlanCode
        ? (policyGroupData?.paymentPlanCode).toString()
        : null,
      subAgent:
        policyGroupData?.subAgents?.length > 0
          ? parseInt(
            policyGroupData?.subAgents[0]?.thirdPartyData?.documentCode
          )
          : "",
    });
  };

  // functions *************

  let groupPolicyApi = useSelector(
    (state) => state?.groupPolicy?.groupPolicy?.lov
  );
  let contractApi = useSelector((state) => state?.groupPolicy?.contract?.lov);

  let subContractApi = useSelector(
    (state) => state?.groupPolicy?.subcontract?.lov
  );

  let commercialStructureApi = useSelector(
    (state) => state?.groupPolicy?.commercialStructure
  );

  let agentApi = useSelector((state) => state?.groupPolicy?.agent);
  // console.log("agentApi", agentApi);
  let subAgentApi = useSelector((state) => state?.groupPolicy?.subAgent);
  // console.log(subAgentApi, "subAgentApi");

  let paymentTermsApi = useSelector(
    (state) => state?.groupPolicy?.paymentTerms?.lov
  );
  // console.log("paymentTermsApi", paymentTermsApi);

  // let groupPolicyOptions =
  //   groupPolicyApi && !_.isEmpty(groupPolicyApi)
  //     ? groupPolicyApi?.map((GROUPPOLICY) => {
  //       const label = GROUPPOLICY.NOM_POLIZA;
  //       const value = GROUPPOLICY.NUM_POLIZA;
  //       const newGroupPolicy = { ...GROUPPOLICY, label, value };
  //       return newGroupPolicy;
  //     })
  //     : null;

  const getGroupPolicy = async (agentCode) => {
    setopenloader1(true);
    let res = await axiosRequest.get(
      `user/lov?name=GroupPolicyMOTOR&AgentCode=${agentCode}&Subline=${policyGroupData?.subline}&ProductCodeMotor=10001`
    );
    setopenloader1(false);
    // console.log("RESP: ", res);
    if (res?.statusCode == -1) {
      const data = res?.data?.lov?.map((item) => ({
        ...item,
        label: item?.NOM_POLIZA,
        value: item?.NUM_POLIZA,
      }));
      // console.log("DATAAA: ", data);
      setGroupPolicyOptions(data);
    } else {
      setGroupPolicyOptions([]);
    }
  };
  const getAgentList = async (commstru) => {
    setopenloader1(true);
    let res = await axiosRequest.get(
      `user/get/agent-list?commercialStructure=${commstru}`
    );
    setopenloader1(false);

    // console.log("RESP: ", res);
    if (res?.statusCode == -1) {
      const data = res?.data?.map((AGENT) => {
        const label = AGENT?.nomCompleto;
        const value = AGENT?.codAgt;
        // const key = AGENT?.codNivel3;
        const newAgent = { ...AGENT, label, value };
        return newAgent;
      });
      // console.log("SSsetSubAgentOptions: ", data);
      setAgentOptions(data);
    } else {
      setAgentOptions([]);
    }
  };
  const getSubAgentList = async (agentCode) => {
    setopenloader1(true);
    let res = await axiosRequest.get(
      `user/get/subagent-list?agentCode=${agentCode}`
    );
    setopenloader1(false);
    // console.log("RESP: ", res);
    if (res?.statusCode == -1) {
      const data = res?.data?.map((SUBAGENT) => {
        const label = SUBAGENT?.name;
        const value = SUBAGENT?.childCode;
        // const key = SUBAGENT?.agentCode;
        const newSubAgent = { ...SUBAGENT, label, value };
        return newSubAgent;
      });
      // console.log("SSsetSubAgentOptions: ", data);
      setSubAgentOptions(data);
    } else {
      setSubAgentOptions([]);
    }
  };

  const getContactList = async (policyGroupId, agentCode) => {
    setopenloader1(true);
    let res = await axiosRequest.get(
      `user/lov?name=Contract&GroupPolicyMOTOR=${policyGroupId}&Subline=${policyGroupData?.subline}&AgentCode=${agentCode}`
    );
    setopenloader1(false);
    // console.log("RESP: ", res);
    if (res?.statusCode == -1) {
      const data = res?.data?.lov?.map((CONTRACT) => {
        const label = CONTRACT.NOM_CONTRATO;
        const value = CONTRACT.NUM_CONTRATO;
        const key = CONTRACT.NUM_CONTRATO;
        const newContract = { ...CONTRACT, label, value, key };
        return newContract;
      });
      // console.log("Contact : ", data);
      setContractOptions(data);
    } else {
      setContractOptions([]);
    }
  };
  const getSubContractList = async (contactCode, agentCode) => {
    setopenloader1(true);
    let res = await axiosRequest.get(
      `user/lov?name=Subcontract&Contract=${contactCode}&Subline=${policyGroupData?.subline}&AgentCode=${agentCode}`
    );
    setopenloader1(false);
    // console.log("RESP: ", res);
    if (res?.statusCode == -1) {
      const data = res?.data?.lov?.map((SUBCONTRACT) => {
        const label = SUBCONTRACT.NOM_SUBCONTRATO;
        const value = SUBCONTRACT.NUM_SUBCONTRATO;
        const key = SUBCONTRACT.NUM_SUBCONTRATO;
        const newSubContract = { ...SUBCONTRACT, label, value, key };
        return newSubContract;
      });
      // console.log("Contact : ", data);
      setSubContractOptions(data);
    } else {
      setSubContractOptions([]);
    }
  };

  // let contractOptions =
  //   contractApi && !_.isEmpty(contractApi)
  //     ? contractApi?.map((CONTRACT) => {
  //       const label = CONTRACT.NOM_CONTRATO;
  //       const value = CONTRACT.NUM_CONTRATO;
  //       const key = CONTRACT.NUM_CONTRATO;
  //       const newContract = { ...CONTRACT, label, value, key };
  //       return newContract;
  //     })
  //     : null;

  // let subContractOptions =
  //   subContractApi && !_.isEmpty(subContractApi)
  //     ? subContractApi?.map((SUBCONTRACT) => {
  //       const label = SUBCONTRACT.NOM_SUBCONTRATO;
  //       const value = SUBCONTRACT.NUM_SUBCONTRATO;
  //       const key = SUBCONTRACT.NUM_SUBCONTRATO;
  //       const newSubContract = { ...SUBCONTRACT, label, value, key };
  //       return newSubContract;
  //     })
  //     : null;

  let commercialStructureOptions =
    commercialStructureApi &&
      (commercialStructureApi.data || commercialStructureApi.lov)
      ? channelCode?.channelCode === "CH1"
        ? commercialStructureApi.data?.map((e) => ({
          label: e?.branchName,
          value: Number(e?.branchCode),
        }))
        : commercialStructureApi.lov?.map((e) => ({
          label: e?.NOM_NIVEL3,
          value: Number(e?.COD_NIVEL3),
        }))
      : [];

  // let agentOptions =
  //   agentApi && !_.isEmpty(agentApi)
  //     ? agentApi?.map((AGENT) => {
  //         const label = AGENT?.nomCompleto;
  //         const value = AGENT?.codAgt;
  //         // const key = AGENT?.codNivel3;
  //         const newAgent = { ...AGENT, label, value };
  //         return newAgent;
  //       })
  //     : null;
  // let subAgentOptions = null;
  // if (subAgentApi !== undefined) {
  //   if (subAgentApi?.message !== "No data found") {
  //     subAgentOptions =
  //       subAgentApi && !_.isEmpty(subAgentApi)
  //         ? subAgentApi?.map((SUBAGENT) => {
  //             const label = SUBAGENT?.name;
  //             const value = SUBAGENT?.childCode;
  //             // const key = SUBAGENT?.agentCode;
  //             const newSubAgent = { ...SUBAGENT, label, value };
  //             return newSubAgent;
  //           })
  //         : null;
  //   }
  // }
  // console.log("subAgentOptions: ", subAgentOptions);

  let paymentTermsOptions =
    paymentTermsApi && !_.isEmpty(paymentTermsApi)
      ? paymentTermsApi?.map((PAYMENTTERMS) => {
        const label = PAYMENTTERMS?.NOM_FRACC_PAGO;
        const value = PAYMENTTERMS?.COD_FRACC_PAGO;
        const key = PAYMENTTERMS?.COD_FRACC_PAGO;
        const newPaymentTerms = { ...PAYMENTTERMS, label, value, key };
        return newPaymentTerms;
      })
      : null;

  const groupPolicySelectHandler = (value, key) => {
    setopenloader1(true);
    setGroupPolicy(key?.NUM_POLIZA);
    setSelectGroupPolicy(key?.NOM_POLIZA);
    if (channelCode.channelCode == "CH1") {
      getContactList(key.NUM_POLIZA, selectedAgentCode);
      // dispatch(
      //   actions.fetchAllContract(
      //     key.NUM_POLIZA,
      //     selectedAgentCode,
      //     (result) => {
      //       if (result?.statusCode === -1) {
      //         setopenloader1(false);
      //       } else {
      //         setopenloader1(false);
      //       }
      //     }
      //   )
      // );
    } else {
      getContactList(key.NUM_POLIZA, getAgentCode);
      // dispatch(
      //   actions.fetchAllContract(key.NUM_POLIZA, getAgentCode, (result) => {
      //     if (result?.statusCode === -1) {
      //       setopenloader1(false);
      //     } else {
      //       setopenloader1(false);
      //     }
      //   })
      // );
    }

    setContractOptions([]);
    setSubContractOptions([]);
    setContract(null);
    setSubContract(null);
    setSelectContract(null);
    setSelectSubContract(null);
    form.setFieldsValue({
      ContractNumber: null,
      subContractNumber: null,
    });
  };

  const changesPolicyMethods = () => {
    // setContract("");
    // setSubContract("");
    // form.setFieldsValue({
    //   policyGroup: null,
    //   ContractNumber: null,
    // });
  };

  const ContractChangeHandler = (value, key) => {
    // console.log("key==>", key);
    setopenloader1(true);
    setContract(key?.NUM_CONTRATO);
    setSelectContract(key?.NOM_CONTRATO);
    if (channelCode.channelCode == "CH1") {
      getSubContractList(key?.NUM_CONTRATO, selectedAgentCode);
      // dispatch(
      //   actions.fetchAllSubContract(
      //     key?.NUM_CONTRATO,
      //     selectedAgentCode,
      //     (result) => {
      //       if (result?.statusCode === -1) {
      //         setopenloader1(false);
      //       } else {
      //         setopenloader1(false);
      //       }
      //     }
      //   )
      // );
    } else {
      getSubContractList(key?.NUM_CONTRATO, getAgentCode);
      // dispatch(
      //   actions.fetchAllSubContract(
      //     key?.NUM_CONTRATO,
      //     getAgentCode,
      //     (result) => {
      //       if (result?.statusCode === -1) {
      //         setopenloader1(false);
      //       } else {
      //         setopenloader1(false);
      //       }
      //     }
      //   )
      // );
    }

    setSubContract(null);
    setSelectSubContract(null);
    setSubContractOptions([]);
    form.setFieldsValue({
      subContractNumber: null,
    });
  };

  const SubContractChangeHandler = (value, key) => {
    // console.log("hey23", key);
    // console.log("hey2", value);
    setSubContract(key?.NUM_SUBCONTRATO);
    setSelectSubContract(key?.NOM_SUBCONTRATO);
  };

  const commericalOnChangeHandler = (value, key) => {
    // console.log("hey23", key);
    setCommercialStructure(key?.value);
    dispatch(actions.GetCommercialValue(key?.label));
    setSelectCommercialStructure(key?.label);
    setAgent(null);
    setSubAgent(null);
    setGroupPolicy(null);
    setContract(null);
    setSubContract(null);
    setSelectContract(null);
    setSelectSubContract(null);
    setSelectGroupPolicy(null);
    setSubAgentDocumentCode(null);
    setSubAgentDocumentType(null);

    form.setFieldsValue({
      agent: null,
      subAgent: null,
      policyGroup: null,
      ContractNumber: null,
      subContractNumber: null,
    });
    setContractOptions([]);
    setSubContractOptions([]);
    setAgentOptions([]);
    if (channelCode.channelCode == "CH1") {
      // setopenloader1(true);
      // dispatch(
      //   actions.fetchAllAgent(key?.value, (result) => {
      //     if (result?.statusCode === -1) {
      //       setopenloader1(false);
      //     } else {
      //       setopenloader1(false);
      //     }
      //   })
      // );
      getAgentList(key?.value);
      setSubAgentOptions([]);
      setGroupPolicyOptions([]);
    }
  };

  const AgentChangeHandler = (value, key) => {
    setSelectedAgentCode(key?.codAgt);
    setopenloader1(true);
    setSelectAgent(key?.codNivel3);
    setAgent(key?.nomCompleto);
    if (channelCode.channelCode == "CH1") {
      // dispatch(
      //   actions.fetchAllSubAgent(key?.codAgt, (result) => {
      //     if (result?.statusCode === -1) {
      //       setopenloader1(false);
      //     } else {
      //       setopenloader1(false);
      //     }
      //   })
      // );
      getSubAgentList(key?.codAgt);
      setopenloader1(true);
      getGroupPolicy(key?.codAgt);
      // dispatch(
      // actions.fetchAllGroupPolicy(key?.codAgt, (result) => {
      //   if (result?.statusCode === -1) {
      //     setopenloader1(false);
      //   } else {
      //     setopenloader1(false);
      //   }
      // })
      // );
    } else {
      getSubAgentList(getAgentCode);
      // dispatch(
      //   actions.fetchAllSubAgent(getAgentCode, (result) => {
      //     if (result?.statusCode === -1) {
      //       setopenloader1(false);
      //     } else {
      //       setopenloader1(false);
      //     }
      //   })
      // );
    }

    setSubAgent(null);
    setGroupPolicy(null);
    setContract(null);
    setSubContract(null);
    setSelectContract(null);
    setSelectSubContract(null);
    setSelectGroupPolicy(null);
    setSubAgentDocumentCode(null);
    setSubAgentDocumentType(null);
    setContractOptions([]);
    setSubContractOptions([]);
    setGroupPolicyOptions([]);
    form.setFieldsValue({
      subAgent: null,
      policyGroup: null,
      ContractNumber: null,
      subContractNumber: null,
    });
  };

  // console.log("setSelectAgent", selectAgent);

  // console.log("setAgent", agent);

  const ExpiryDateChangeHandler = (date, dateString) => {
    // console.log("exp", dateString);
    setExpiryDate(dateString);
  };

  const PaymentTermChangeHandler = (value, key) => {
    setPaymentTerms(key.COD_FRACC_PAGO);
    setSelectPaymentTerms(key.NOM_FRACC_PAGO);
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/price-check-info");
  };
  const SubAgentChangeHandler = (value, key) => {
    // documentCode: key.documentCode,
    // documentType: key.documentType
    // setSubAgent(key.documentCode)
    setSubAgent([
      {
        thirdPartyData: {
          documentCode: key.documentCode,
          documentType: key.documentType,
          // name: key.name,
        },
      },
    ]);

    setSubAgentDocumentCode(key.documentCode);
    setSubAgentDocumentType(key.documentType);
    // console.log("hey====value", value);
    // console.log("hey====1value", key);
    // console.log("onchange", subAgentDocumentCode);
  };

  // const onchangetoNext = () => {
  //   history.push("/vehicle-information-info");
  // };
  const effectiveDateHander = (date, dateString) => {
    setEffectiveDate(dateString);
    const expiryDate = date ? moment(date).add(1, "years") : null;
    form.setFieldsValue({ ExpiryDate: expiryDate });

    setExpiryDate(moment(expiryDate).format("MM/DD/YYYY"));
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // payload is bind here

  const onFinishPolicyGroup = async (formdata) => {
    setopenloader(true);
    // console.log({ motoVehicle });
    const policyInfo = {
      ...motoVehicle,
      effectivityDate: effectiveDate,
      expirationDate: expirydate,
      policyGroupCode: groupPolicy,
      policyGroupName: selectgroupPolicy,
      contractCode: contract,
      subContractCode: subContract,
      branchCode: commercialStructure,
      // subline: null,
      paymentPlanCode: paymentTerms,
      selectcontractName,
      selectsubContractName,

    };
    if (channelCode?.channelCode === "CH1") {
      policyInfo.agentCode = selectedAgentCode;
      policyInfo.userCode = userName;
      // policyInfo.subAgents = subAgent;
    } else {
      policyInfo.agentCode = getAgentCode.toString()
    }
    policyInfo.subAgents =
      subAgentDocumentCode && subAgentDocumentType
        ? [
          {
            thirdPartyData: {
              documentCode: subAgentDocumentCode,
              documentType: subAgentDocumentType,
            },
          },
        ]
        : null;
    // subAgent
    const policyPayload = { ...policyInfo };
    delete policyPayload.selectcontractName;
    delete policyPayload.selectsubContractName;
    // console.log("formdata1=====>", policyInfo);
    dispatch(actions.motorQuotationForm(policyInfo));
    // console.log("hello", policyPayload);

    let result = await axiosRequest.post(
      "user/motor-quick-quotation",
      policyPayload,
      {
        secure: true,
      }
    );
    // console.log("result===>", result);
    if (result?.statusCode === -1) {
      dispatch(actions.createMotorQuotationSuccess(result));
      if (result?.data?.oonaQuotationResponse?.technicalControls.length > 0) {
        history.push("/motor-technical-control");
        setopenloader(false);
      } else {
        history.push("/vehicle-information-info");
        setopenloader(false);
      }
      setopenloader(false);
    } else if (result?.statusCode === 1) {
      // history.push("/motor-technical-control");
      dispatch(actions.createMotorQuotationSuccess(result));
      setopenloader(false);
    } else {
      setopenloader(false);
    }
  };
  return (
    <>
      <div className="main-class">
        <FullPageLoader spinloader={openloader1} />
        <FullPageLoader fromapploader={openloader} />
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                style={{}}
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                onClick={onChangetoDashboard}
              >
                Back to Dashboard
              </Button>
            </div>

            <StepOne />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
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
              <div className="right-side">
                <div className="policy-type">
                  <h2>Just a few more details</h2>
                </div>
                <div className="RsPolicyDiv">
                  <div className="questionDiv">
                    <h3>Which Commercial Structure to use?</h3>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la formFill"
                        label="Commercial Structure"
                        name="commercialStructure"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Commercial Structure",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          onSearch={onSearch}
                          style={{ width: "100%" }}
                          size="large"
                          value={commercialStructure}
                          placeholder="Select Commercial Structure"
                          onChange={(item, key) => {
                            commericalOnChangeHandler(item, key);
                          }}
                          options={commercialStructureOptions}
                          filterOption={filterOption}
                          optionFilterProp="children"
                        />
                      </Form.Item>

                      {/* <AutoSelectCompletion
                        onChange={(item, key) => {
                          // setCommercialStructure(key);
                          commericalOnChangeHandler(item, key);
                        }}
                        value={commercialStructure}
                        label="Commercial Structure"
                        name="commercialStructure"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Commercial Structure",
                          },
                        ]}
                        placeholder="Select"
                        options={commercialStructureOptions()}
                      /> */}
                    </Col>
                    {channelCode?.channelCode === "CH1" &&
                      agentOptions?.length > 0 ? (
                      <>
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la formFill"
                            label="Agent"
                            name="agent"
                            rules={[
                              {
                                required: true,
                                message: "Select Agent",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              onSearch={onSearch}
                              style={{ width: "100%" }}
                              size="large"
                              value={agent}
                              placeholder="Select Agent"
                              onChange={(item, key) => {
                                AgentChangeHandler(item, key);
                              }}
                              options={agentOptions}
                              filterOption={filterOption}
                              optionFilterProp="children"
                            />
                          </Form.Item>
                          {/* <AutoSelectCompletion
                            onChange={(item, key) => {
                              // set(key);
                              AgentChangeHandler(item, key);
                            }}
                            value={agent}
                            label="Agent"
                            name="agent"
                            rules={[
                              {
                                required: true,
                                message: "Select",
                              },
                            ]}
                            placeholder="Select"
                            options={agentOptions}
                          /> */}
                        </Col>
                      </>
                    ) : (
                      ""
                    )}
                    {subAgentOptions?.length > 0 && (
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Sub-Agent"
                          name="subAgent"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Select Make",
                        //   },
                        // ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={subAgent}
                            placeholder="Select Sub-Agent"
                            onChange={(item, key) => {
                              SubAgentChangeHandler(item, key);
                            }}
                            options={subAgentOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                        {/* <AutoSelectCompletion
                            onChange={(item, key) => {
                              // set(key);
                              SubAgentChangeHandler(item, key);
                            }}
                            value={subAgent?.thirdPartyData}
                            label="Sub-Agent"
                            name="subAgent"
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Please Select Make",
                            //   },
                            // ]}
                            placeholder="Select"
                            options={subAgentOptions}
                          /> */}
                      </Col>
                    )}
                  </Row>

                  <div className="questionDiv">
                    <h3>Policy Holder Information</h3>
                  </div>

                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="EffectivityDate"
                        label="Effective Date"
                        rules={[
                          {
                            required: true,
                            message: "Effective Date",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          onChange={effectiveDateHander}
                          className="first-name input-box"
                          size="large"
                          format="MM/DD/YYYY"
                          value={effectiveDate}
                          placeholder="Select Date"
                          // value={effectivitydate}
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="ExpiryDate"
                        label="Expiry Date"
                        rules={[
                          {
                            required: true,
                            message: "Expiry Date",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          onChange={ExpiryDateChangeHandler}
                          className="first-name input-box"
                          size="large"
                          placeholder="Select Date"
                          format="MM/DD/YYYY"
                          // value={expirydate}
                          style={{ width: "100%" }}
                          disabledDate={disabledDateForSecondPicker}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la formFill"
                        label="Payment Terms"
                        name="paymentterms"
                        rules={[
                          {
                            required: true,
                            message: "Payment Terms",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          onSearch={onSearch}
                          style={{ width: "100%" }}
                          size="large"
                          value={paymentTerms}
                          placeholder="Plan 30, 60, 90 or Annual"
                          onChange={(item, key) => {
                            PaymentTermChangeHandler(item, key);
                          }}
                          options={paymentTermsOptions}
                          filterOption={filterOption}
                          optionFilterProp="children"
                        />
                      </Form.Item>
                      {/* <AutoSelectCompletion
                        // onChange={changeHandler}
                        // value={policySelectionData.paymentterms}
                        value={paymentTerms}
                        label="Payment Terms"
                        name="paymentterms"
                        rules={[
                          {
                            required: true,
                            message: "Payment Terms",
                          },
                        ]}
                        placeholder="Others"
                        options={paymentTermsOptions}
                        onChange={(item, key) => {
                          PaymentTermChangeHandler(item, key);
                        }}
                      /> */}
                    </Col>
                  </Row>
                </div>
                {groupPolicyOptions.length > 0 && (
                  <div className="RsPolicyDiv">
                    <div className="questionDiv">
                      <h3>Which policy group to use?</h3>
                    </div>
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Policy Group"
                          name="policyGroup"
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={groupPolicy}
                            placeholder="Policy Group"
                            onSelect={(item, key) => {
                              groupPolicySelectHandler(item, key);
                            }}
                            options={groupPolicyOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                            onChange={changesPolicyMethods}
                          />
                        </Form.Item>
                        {/* <AutoSelectCompletion
                        onSelect={(item, key) => {
                          groupPolicySelectHandler(item, key);
                        }}
                        value={groupPolicy}
                        label="Policy Group"
                        name="policyGroup"
                        placeholder="Policy Group"
                        options={groupPolicyOptions}
                      /> */}
                      </Col>
                      {contractOptions?.length > 0 && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la formFill"
                            label="Contract"
                            name="ContractNumber"
                            rules={[
                              {
                                required: true,
                                message: "Contract is required",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              onSearch={onSearch}
                              style={{ width: "100%" }}
                              size="large"
                              value={contract}
                              placeholder="Contract"
                              onChange={(item, key) => {
                                ContractChangeHandler(item, key);
                              }}
                              options={contractOptions}
                              filterOption={filterOption}
                              optionFilterProp="children"
                            />
                          </Form.Item>
                          {/* <AutoSelectCompletion
                        onChange={(item, key) => {
                          // setContract(key);
                          ContractChangeHandler(item, key);
                        }}
                        value={contract}
                        label="Contract Number"
                        name="ContractNumber"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Select Make",
                        //   },
                        // ]}

                        placeholder="Contract"
                        options={contractOptions}
                      /> */}
                        </Col>
                      )}
                      {subContractOptions?.length > 0 && (
                        <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name la formFill"
                            label="Sub-Contract"
                            name="subContractNumber"
                            rules={[
                              {
                                required: true,
                                message: "Sub-Contract is required",
                              },
                            ]}
                          >
                            <Select
                              showSearch
                              onSearch={onSearch}
                              style={{ width: "100%" }}
                              size="large"
                              value={subContract}
                              placeholder="Sub Contract"
                              onChange={(item, key) => {
                                // setSubContract(key);
                                SubContractChangeHandler(item, key);
                              }}
                              options={subContractOptions}
                              filterOption={filterOption}
                              optionFilterProp="children"
                            />
                          </Form.Item>
                          {/* <AutoSelectCompletion
                        onChange={(item, key) => {
                          // setSubContract(key);
                          SubContractChangeHandler(item, key);
                        }}
                        value={subContract}
                        label="Sub-Contract Number"
                        name="subContractNumber"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please Select Make",
                        //   },
                        // ]}
                        placeholder="Sub Contract"
                        options={subContractOptions}
                        // disabled={true}
                      /> */}
                        </Col>
                      )}
                    </Row>
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
                  // onClick={onchangetoNext}
                  // onClick={onFinishPolicyGroup}
                  >
                    Next
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <MotorFormFooter />
    </>
  );
};
export default PolicyGroupDetails;
