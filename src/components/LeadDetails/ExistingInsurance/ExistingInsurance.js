import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Switch,
  Button,
  Input,
  Select,
  Modal,
  Space,
  DatePicker,
  Table,
  Radio,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  ConsoleSqlOutlined,
  FileTextOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Tabs from "../../Tab/Tab";
import LeadDetailsTab from "../LeadDetails/LeadDetailsTab";
// import "../../StatusLead/StatusLead.css";
import "./ExistingInsurance.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";
import moment from "moment";
import _ from "lodash";
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const setInsurerOptions = [
  { value: "Relience Life", label: "Relience Life" },
  { value: "HDFC Life", label: "HDFC Life" },
  { value: "ICICI Prudential", label: "ICICI Prudential" },
  { value: "LIC", label: "LIC" },
  { value: "Edwlweiss", label: "Edwlweiss" },
  { value: "Religare", label: "Religare" },
];

const setPolicyTypeOptions = [
  { value: "Endowment Plans", label: "Endowment Plans" },
  { value: "Whole Life Policy", label: "Whole Life Policy" },
  { value: "Money Back Policy", label: "Money Back Policy" },
  { value: "Term Plan", label: "Term Plan" },
  { value: "Individual/FamilyFloater", label: "Individual/FamilyFloater" },
];

const setPolicyStatusOptions = [
  { value: "Inforce", label: "Inforced" },
  { value: "Applied", label: "Applied" },
  { value: "Declined", label: "Declined" },
];

const setRelationOptions = [
  { value: "Father", label: "Father" },
  { value: "Mother", label: "Mother" },
  { value: "Brother", label: "Brother" },
  { value: "Sister", label: "Sister" },
];

const setHealthTypeOfPlanOptions = [
  { value: "Individual", label: "Individual" },
  { value: "Family Floater", label: "Family Floater" },
];

// let personalRoute = "/leadmasterpage/leaddetails/personallead";

const ExistingInsurenceDetails = () => {
  let storeFormData = useSelector((state) => state.newLead.formData);
  const id = useSelector((state) => state.login.user.id);
  let storeLeadId = useSelector((state) => state.leads.currentUpdatingID);

  const address = storeFormData.address[0];

  let line1 = "";
  let line2 = "";
  let line3 = "";
  if (address !== undefined) {
    line1 = address.line1;
    line2 = address.line2;
    line3 = address.line3;
  }

  let lifeObjDisplay = useSelector(
    (state) => state.newLead.HaveLifeInsurance_details
  );
  let healthObjDisplay = useSelector((state) => state.newLead.Insurancedetails);
  const storeLeadId2 = useSelector((state) => state.newLead.leadId);
  let storeLifeInsArr = useSelector(
    (state) => state.newLead.formData.HaveLifeInsurance_details
  );
  if (
    storeLifeInsArr === "" ||
    storeLifeInsArr === "[]" ||
    storeLifeInsArr === undefined
  ) {
    storeLifeInsArr = [];
  }
  let storeHealthInsArr = useSelector(
    (state) => state.newLead.formData.Insurancedetails
  );
  if (
    storeHealthInsArr === "" ||
    storeHealthInsArr === "[]" ||
    storeHealthInsArr === undefined
  ) {
    storeHealthInsArr = [];
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  const [width, setWidth] = useState(window.innerWidth);
  // const [haveLifeInsurence, sethaveLifeInsurece] = useState("No");

  const [haveLifeInsurence, sethaveLifeInsurece] = useState(
    storeFormData.HaveLifeInsurance.ExistInsur
      ? storeFormData.HaveLifeInsurance.ExistInsur
      : "No"
  );
  const [lifeInsToggle, setLifeInsToggle] = useState(() => {
    if (storeFormData.HaveLifeInsurance.ExistInsur === "Yes") {
      return true;
    } else {
      return false;
    }
  });

  // const [haveHealthInsurece, sethaveHealthInsurece] = useState("No");
  const [haveHealthInsurece, sethaveHealthInsurece] = useState(
    storeFormData.HaveLifeInsurance.ExistHealthInsur
      ? storeFormData.HaveLifeInsurance.ExistHealthInsur
      : "No"
  );
  const [healthInsToggle, setHealthInsToggle] = useState(() => {
    if (storeFormData.HaveLifeInsurance.ExistHealthInsur === "Yes") {
      return true;
    } else {
      return false;
    }
  });

  const [lifeInsuranceYes, setLifeInsuranceYes] = useState();
  const [isNewLead, setIsNewLead] = useState(true);
  const [healthInsuranceYes, setHealthInsuranceYes] = useState();
  const [visibleHealthInsuranceMOdel, setVisibleHealthInsuranceModel] =
    useState(false);
  const [updateLIfeInsrr, setUpdateLifeInsrr] = useState(false);
  const [healthInsuranceLoading, setHealthInsuranceLoading] = useState(false);
  const [updateHealthInsrr, setUpdateHealthInsrr] = useState(false);
  const [visibleLifeInsuranceMOdel, setVisibleLifeInsuranceModel] =
    useState(false);
  const [lifeInsuranceLoading, setLifeInsuranceLoading] = useState(false);
  const [insurer, setInsurer] = useState("");

  const [lifeSumAssured, setLifeSumAssured] = useState("");
  const [policyType, setPolicyType] = useState("");
  const [policyStatus, setPolicyStatus] = useState("");
  const [policyStatusInforce, setpolicyStatusInforce] = useState(false);
  const [policyStatusApplied, setpolicyStatusApplied] = useState(false);
  const [policyStatusDeclined, setpolicyStatusDeclined] = useState(false);
  const [policyNumber, setPolicyNumber] = useState("");
  const [relation, setRelation] = useState("");
  const [selected, setSelected] = useState(null);
  const [healthSelected, setHealthSelected] = useState(null);

  const [insurername, setInsurerName] = useState("");
  const [dobOfInsurer, setDobOfInsurer] = useState("");
  const [commencementDate, setCommencementDate] = useState("");
  const commencementDateIn = commencementDate ? moment(commencementDate) : "";
  const [applicationDate, setApplicationDate] = useState("");
  const [typeOfPlan, setTypeOfPlan] = useState("");
  const [healthSumInsured, setHealthSumInsured] = useState("");
  const [healthRiskDate, setHealthRiskDate] = useState("");
  const healthRiskDateIn = healthRiskDate ? moment(healthRiskDate) : "";
  const [haveChronicDisease, sethaveChronicDisease] = useState(false);
  const [diseaseDescription, setDiseaseDescription] = useState("");
  let dateofBirth = dobOfInsurer ? moment(dobOfInsurer) : "";
  const [errorMessage, setErrorMessage] = useState();
  const [lifeInsObj, setlifeInsObj] = useState(() => {
    if (!_.isEmpty(storeLifeInsArr)) {
      return storeLifeInsArr;
    } else {
      return [];
    }
  });
  const [healthInsObj, setHealthInsObj] = useState(() => {
    if (!_.isEmpty(storeHealthInsArr)) {
      return storeHealthInsArr;
    } else {
      return [];
    }
  });
  useEffect(() => {
    if (haveHealthInsurece === "No") {
      setHealthInsObj([]);
      storeHealthInsArr = [];
      const formData = {
        ...storeFormData,
        Insurancedetails: [...storeHealthInsArr],
      };
      dispatch(actions.storeLead(formData));
    }
  }, [haveHealthInsurece]);
  useEffect(() => {
    if (haveLifeInsurence === "No") {
      setlifeInsObj([]);
      storeLifeInsArr = [];
      const formData = {
        ...storeFormData,
        HaveLifeInsurance_details: [...storeLifeInsArr],
      };
      dispatch(actions.storeLead(formData));
    }
  }, [haveLifeInsurence]);
  const breakpoint = 620;

  useEffect(() => {
    // form.setFieldsValue({
    //   // life ins
    //   healthInsuranceSwitch: haveHealthInsurece,
    //   lifeInsuranceSwitch: haveLifeInsurence,
    //   insurer: insurer,
    //   lifeSumAssured: lifeSumAssured,
    //   policyType: policyType,
    //   policyStatus: policyStatus,
    //   policyNumber: policyNumber,
    //   lifeApplicationDate: applicationDate,
    //   lifeRiskCommencementDate: commencementDate,

    //   // health Ins
    //   relation: relation,
    //   Name: insurername,
    //   dateOfBirth: dobOfInsurer,
    //   typeOfPlan: typeOfPlan,
    //   sumAssured: healthSumInsured,
    //   riskCommencementDate: healthRiskDate,
    //   chronicDisease: haveChronicDisease,
    //   diseaseDesc: diseaseDescription,
    // });

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const lifeInsuranceToggle = (event) => {
    // sethaveLifeInsurece(!haveLifeInsurence)
    const val = event.target.value;
    sethaveLifeInsurece(val);
    val === "Yes" ? setLifeInsToggle(true) : setLifeInsToggle(false);
    // if (value) {
    // } else {

    //     sethaveLifeInsurece('No')
    // }
  };

  let _leadID = useSelector((state) => state.leads.currentUpdatingID);
  const tabMenu = [
    {
      id: 1,
      value: "Status",
    },
    {
      id: 2,
      value: "Lead Details",
    },

    {
      id: 3,
      value: "History",
    },
  ];
  const tabMenu2 = [
    {
      id: 1,
      value: "Status",
    },
    {
      id: 2,
      value: "Lead Details",
    },
  ];

  const healthInsuranceToggle = (event) => {
    // sethaveHealthInsurece(!haveHealthInsurece)
    const val = event.target.value;
    sethaveHealthInsurece(val);
    val === "Yes" ? setHealthInsToggle(true) : setHealthInsToggle(false);

    // if (value) {

    // } else {

    //     sethaveHealthInsurece('No')
    // }
  };

  // Life Insurance handlers modal
  const insurerHandler = (value) => {
    setInsurer(value);
  };
  const LifeSumAssuredHandler = (e) => {
    setLifeSumAssured(e.target.value);
  };
  const policyTypeHandler = (value) => {
    setPolicyType(value);
  };
  const policyStatusHandler = (value) => {
    setPolicyStatus(value);
    if (value === "Inforce") {
      setpolicyStatusInforce(true);
      setpolicyStatusApplied(false);
      setpolicyStatusDeclined(false);
    } else {
      setpolicyStatusInforce(false);
      setpolicyStatusApplied(true);
      setpolicyStatusDeclined(true);
    }
  };

  const policyNumberHandler = (e) => {
    setPolicyNumber(e.target.value);
  };

  const commencementDateHandler = (date, dateString) => {
    setCommencementDate(moment(date).valueOf());
  };
  const applicationDateHandler = (date, dateString) => {
    setApplicationDate(moment(date).valueOf());
  };
  const healthRiskDateHandler = (date, dateString) => {
    setHealthRiskDate(moment(date).valueOf());
  };

  const insurerDObHandler = (date, dateString) => {
    setDobOfInsurer(moment(date).valueOf());
  };

  // health delte Model
  const deletHealthModalObject = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        storeHealthInsArr = storeHealthInsArr.filter(
          (item) => item.id !== record.id
        );
        setHealthInsObj(storeHealthInsArr);
        const formData = {
          ...storeFormData,
          Insurancedetails: [...storeHealthInsArr],
        };
        dispatch(actions.storeLead(formData));
      },
    });
  };

  const updateHealthModalObject = (record) => {
    const {
      SelectRelation,
      Name,
      DateofBirth,
      // IsInsuredsufferingfromanychronicdisease,
      Description,
      planName,
      sumInsured,
      riskDate,
    } = record;
    setHealthSelected({ ...record });
    // form.setFieldsValue({
    //   relation: SelectRelation,
    //   Name: Name,
    //   dateOfBirth: DateofBirth,
    //   typeOfPlan: planName,
    //   sumAssured: sumInsured,
    //   riskCommencementDate: riskDate,
    //   // chronicDisease: Description,
    //   diseaseDesc: Description,
    // });
    setUpdateHealthInsrr(true);
    setRelation(SelectRelation);
    setInsurerName(Name);
    setDobOfInsurer(DateofBirth);
    setTypeOfPlan(planName);
    setHealthSumInsured(sumInsured);
    setHealthRiskDate(riskDate);
    setDiseaseDescription(Description);
    // sethaveChronicDisease(IsInsuredsufferingfromanychronicdisease);
    setVisibleHealthInsuranceModel(true);
  };

  const deletLifeModalObject = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        storeLifeInsArr = storeLifeInsArr.filter(
          (item) => item.id !== record.id
        );
        setlifeInsObj(storeLifeInsArr);
        const formData = {
          ...storeFormData,
          HaveLifeInsurance_details: [...storeLifeInsArr],
        };
        dispatch(actions.storeLead(formData));
      },
    });
  };
  const updateLifeModalObject = (record) => {
    const {
      Insurer,
      sum_Assured,
      policy_Type,
      policy_Status,
      Comencedate,
      Appdate,
      policynumber,
    } = record;

    setSelected({ ...record });
    setUpdateLifeInsrr(true);

    // form.setFieldsValue({
    //   insurer: insurer,
    //   lifeSumAssured: lifeSumAssured,
    //   policyType: policyType,
    //   policyStatus: policyStatus,
    //   policyNumber: policyNumber,
    //   lifeApplicationDate: applicationDate,
    //   lifeRiskCommencementDate: commencementDate,
    // });
    setInsurer(Insurer);
    setLifeSumAssured(sum_Assured);
    setPolicyType(policy_Type);
    setPolicyStatus(policy_Status);
    setCommencementDate(Comencedate);
    setApplicationDate(Appdate);
    setPolicyNumber(policynumber);
    setVisibleLifeInsuranceModel(true);
  };

  // Health Insurance handlers modal

  const relationshipHandler = (value) => {
    setRelation(value);
  };

  const nameHandler = (e) => {
    setInsurerName(e.target.value);
  };
  const typeOfPlanHandler = (value) => {
    setTypeOfPlan(value);
  };

  const healthSumInsuredHandler = (e) => {
    setHealthSumInsured(e.target.value);
  };
  const descriptionHandler = (e) => {
    setDiseaseDescription(e.target.value);
  };

  const randomId = () => {
    let randomChars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  };

  const formData = {
    ...storeFormData,
    user_id: id,
    line1: line1,
    line2: line2,
    line3: line3,
    lead_Owner_Id: storeFormData.leadOwnerId,
    lead_Creator_Id: storeFormData.leadCreatorId,
    lead_Id: storeFormData.leadId,

    HaveLifeInsurance: {
      ExistHealthInsur: haveHealthInsurece,
      ExistInsur: haveLifeInsurence,
    },
    HaveLifeInsurance_details: storeLifeInsArr,
    Insurancedetails: storeHealthInsArr,
  };
  // const formData = {
  //   ...storeFormData,
  // };

  const proceedHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
      if (res.type === "EDIT_LEAD_SUCCESS") {
        setErrorMessage();
        setIsNewLead(false);
      } else if (res.type === "EDIT_LEAD_FAIL") {

        failedHandler(res.error);
      }
    });

    dispatch(actions.storeLead(storeFormData));
    history.push("productlead");
  };
  const prevdHandler = (event) => {
    event.preventDefault();
    dispatch(actions.storeLead(formData));
    history.push("professionallead");
  };
  const failedHandler = (error) => {
    alert(error);
  };
  const submitHandler = (event) => {
    if (!storeLeadId) {
      dispatch(actions.storeLead(storeFormData));

      // alert('New Lead Updated Successfully')
      // history.push('contactlead')

      // setIsNewLead(false)
    } else {
      dispatch(actions.editLead(storeFormData, storeLeadId)).then((res) => {
        if (res.type === "EDIT_LEAD_SUCCESS") {
          setErrorMessage();
          //   setIsNewLead(false)
        } else if (res.type === "EDIT_LEAD_FAIL") {

          failedHandler(res.error);
        }
      });
      // alert(' Lead Updated Successfully')
      // history.push('contactlead')
    }
    // history.push('productlead')
  };
  const saveLifeInsurane = (event) => {
    if (insurer === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (lifeSumAssured === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (policyType === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (policyStatus === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else {
      event.preventDefault();
      if (selected !== null) {
        const newArr = storeLifeInsArr.map((obj) => {
          if (obj.id === selected.id) {
            return {
              ...obj,
              Insurer: insurer,
              sum_Assured: lifeSumAssured,
              policy_Type: policyType,
              policy_Status: policyStatus,
              Comencedate: commencementDate,
              // Appdate: applicationDate,
              policynumber: policyNumber,
            };
          }
          return obj;
        });

        storeLifeInsArr = newArr;
        setSelected(null);
      } else {
        storeLifeInsArr.push({
          id: "insu" + randomId(),
          Insurer: insurer,
          sum_Assured: lifeSumAssured,
          policy_Type: policyType,
          policy_Status: policyStatus,
          Comencedate: commencementDate,
          // Appdate: applicationDate,
          policynumber: policyNumber,
        });
      }

      setlifeInsObj(storeLifeInsArr);
      const formData = {
        ...storeFormData,
        HaveLifeInsurance_details: [...storeLifeInsArr],
      };
      dispatch(actions.storeLead(formData));
      setVisibleLifeInsuranceModel(false);
    }
  };
  useEffect(() => {
    setlifeInsObj(storeLifeInsArr);
  }, [storeLifeInsArr]);
  const lifeInsColumn = [
    {
      title: "Insurer",
      dataIndex: "Insurer",
    },
    {
      dataIndex: "sum_Assured",
      title: "Sum Assured",
    },
    {
      title: "Policy Type",
      dataIndex: "policy_Type",
    },
    {
      title: "Policy Status",
      dataIndex: "policy_Status",
    },
    {
      title: "Risk",
      dataIndex: "Comencedate",
      render: (Comencedate) => {
        return <p>{moment(Comencedate).format("MM-DD-YYYY")}</p>;
      },
    },
    // {
    //   title: "Application Date",
    //   dataIndex: "Appdate",
    //   render: (Appdate) => {
    //     return <p>{moment(Appdate).format("MM-DD-YYYY")}</p>;
    //   },
    // },
    {
      title: "Policy Number",
      dataIndex: "policynumber",
    },
    {
      title: "Edit",
      render: (record) => {
        return <EditOutlined onClick={() => updateLifeModalObject(record)} />;
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <CloseCircleOutlined
            onClick={() => deletLifeModalObject(record)}
            style={{ color: "red" }}
          />
        );
      },
    },
  ];
  const saveHealthInsurance = (event) => {
    event.preventDefault();
    const regA = /^[a-zA-Z ]+$/;
    if (insurername) {
      if (!insurername.match(regA)) {
        message.error("Only Alphabets are Allowed");
        return;
      }
    }
    if (relation === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (insurername === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (dobOfInsurer === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (healthSumInsured === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else if (healthRiskDate === "") {
      message.warning("Please fill  Mandatory fields");
      return;
    } else {
      if (healthSelected !== null) {
        const newArr = storeHealthInsArr.map((obj) => {
          if (obj.id === healthSelected.id) {
            return {
              ...obj,
              SelectRelation: relation,
              Name: insurername,
              DateofBirth: dobOfInsurer,
              // IsInsuredsufferingfromanychronicdisease: healthInsuranceYes,
              Description: diseaseDescription ? diseaseDescription : "No",
              planName: typeOfPlan,
              sumInsured: healthSumInsured,
              riskDate: healthRiskDate,
            };
          }
          return obj;
        });

        storeHealthInsArr = newArr;
        setHealthSelected(null);
      } else {
        storeHealthInsArr.push({
          id: "insu" + randomId(),
          SelectRelation: relation,
          Name: insurername,
          DateofBirth: dobOfInsurer,
          // IsInsuredsufferingfromanychronicdisease: healthInsuranceYes,
          Description: diseaseDescription ? diseaseDescription : "No",
          planName: typeOfPlan,
          sumInsured: healthSumInsured,
          riskDate: healthRiskDate,
        });
      }
    }

    setHealthInsObj(storeHealthInsArr);
    const formData = {
      ...storeFormData,
      Insurancedetails: [...storeHealthInsArr],
    };
    dispatch(actions.storeLead(formData));
    setVisibleHealthInsuranceModel(false);
  };
  useEffect(() => {
    setHealthInsObj(storeHealthInsArr);
  }, [storeHealthInsArr]);

  const healthInsColumn = [
    {
      title: "Relation",
      dataIndex: "SelectRelation",
    },
    {
      title: "Name",
      dataIndex: "Name",
    },
    {
      title: "Date of Birth",
      dataIndex: "DateofBirth",
      render: (dobOfInsurer) => {
        return <p>{moment(dobOfInsurer).format("MM-DD-YYYY")}</p>;
      },
    },
    {
      title: "Plan Name",
      dataIndex: "planName",
    },
    {
      title: "Sum Insured",
      dataIndex: "sumInsured",
    },
    {
      title: "Risk Date",
      dataIndex: "riskDate",
      render: (Appdate) => {
        return <p>{moment(Appdate).format("MM-DD-YYYY")}</p>;
      },
    },
    {
      title: "Any Chronic Disease",
      // dataIndex: "IsInsuredsufferingfromanychronicdisease",
      dataIndex: "Description",
    },
    {
      title: "Edit",
      render: (record) => {
        return <EditOutlined onClick={() => updateHealthModalObject(record)} />;
      },
    },
    {
      title: "Action",
      render: (record) => {
        return (
          <CloseCircleOutlined
            onClick={() => deletHealthModalObject(record)}
            style={{ color: "red" }}
          />
        );
      },
    },
  ];

  const haveChronicDiseaseToggle = () => {
    sethaveChronicDisease(!haveChronicDisease);
  };
  // life Insurance handler
  const showLifeInsurancerModal = () => {
    setInsurer("");
    setLifeSumAssured("");
    setPolicyType("");
    setPolicyStatus("");
    setPolicyNumber("");
    setCommencementDate("");
    setUpdateLifeInsrr(false);
    setSelected(null);

    setVisibleLifeInsuranceModel(true);
  };
  const lifeInsurancerCancel = () => {
    setSelected(null);
    setVisibleLifeInsuranceModel(false);
  };
  const handleLifeInsurance = () => {
    // setModalText("Updating changes ");
    setSelected(null);
    setLifeInsuranceLoading(true);

    setTimeout(() => {
      setVisibleLifeInsuranceModel(false);
      setLifeInsuranceLoading(false);
    }, 2000);
  };

  // health insurance handlers
  const showHealthInsuranceModal = () => {
    setRelation("");
    setInsurerName("");
    setDobOfInsurer("");
    setTypeOfPlan("");
    setHealthSumInsured("");
    setUpdateHealthInsrr(false);
    setHealthSelected(null);
    setHealthRiskDate("");

    setVisibleHealthInsuranceModel(true);
  };
  const healthInsuranceCancel = () => {
    setHealthSelected(null);
    setVisibleHealthInsuranceModel(false);
  };
  const handleHealthInsurance = () => {
    // setModalText('Updating changes ');
    setHealthInsuranceLoading(true);
    setTimeout(() => {
      setVisibleHealthInsuranceModel(false);
      setHealthInsuranceLoading(false);
    }, 2000);
  };

  return (
    <>
      <Tabs
        tabMenu={_leadID ? tabMenu : tabMenu2}
        header="New Lead"
        // detailsRouteTab={personalRoute}
        activeKey="2"
      />
      <div className="form-container">
        <Form
          // layout="horizontal"
          preserve={false}
          // className="contact-detail-form"
          initialValues={{
            healthInsuranceSwitch: haveHealthInsurece,
            lifeInsuranceSwitch: haveLifeInsurence,
            // life insurance
            insurer: insurer,
            lifeSumAssured: lifeSumAssured,
            policyType: policyType,
            policyStatus: policyStatus,
            policyNumber: policyNumber,
            lifeApplicationDate: applicationDate,
            lifeRiskCommencementDate: commencementDate,
            // health insurance

            relation: relation,
            Name: insurername,
            dateOfBirth: dobOfInsurer,
            typeOfPlan: typeOfPlan,
            sumAssured: healthSumInsured,
            riskCommencementDate: healthRiskDate,
            chronicDisease: haveChronicDisease,

            diseaseDesc: diseaseDescription,
          }}
          fields={[
            {
              name: ["insurer"],
              value: insurer,
            },
            {
              name: ["lifeSumAssured"],
              value: lifeSumAssured,
            },
            {
              name: ["policyType"],
              value: policyType,
            },
            {
              name: ["policyStatus"],
              value: policyStatus,
            },
            {
              name: ["policyNumber"],
              value: policyNumber,
            },
            {
              name: ["relation"],
              value: relation,
            },
            {
              name: ["Name"],
              value: insurername,
            },
            {
              name: ["dateOfBirth"],
              value: dateofBirth,
            },
            {
              name: ["sumAssured"],
              value: healthSumInsured,
            },
            {
              name: ["riskCommencementDate"],
              value: healthRiskDateIn,
            },
          ]}
          onFinish={submitHandler}
          onFinishFailed={failedHandler}
        >
          <Row gutter={[0, 30]} justify={width > breakpoint ? "" : "center"}>
            {" "}
            <LeadDetailsTab activeKey="4" />
            <Col
              className="form-body  p50 mb-2 "
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Existing Insurance</p>
              <Row xs={24} sm={24} md={20} lg={20} xl={20}>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginBottom: "1rem" }}
                >
                  <Form.Item
                    className="form-item-name label-color"
                    name="lifeInsuranceSwitch"
                    label="Have life Insurance?"
                    rules={[
                      {
                        required: false,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Radio.Group
                      value={haveLifeInsurence}
                      onChange={lifeInsuranceToggle}
                      buttonStyle="solid"
                    >
                      <Radio.Button
                        size="large"
                        style={{
                          paddingTop: "6px",
                          paddingLeft: "20px",
                          height: "2rem",
                          width: "4rem",
                          lineHeight: "20px",
                        }}
                        value="Yes"
                      >
                        Yes
                      </Radio.Button>
                      <Radio.Button
                        style={{
                          paddingTop: "6px",
                          paddingLeft: "20px",
                          height: "2rem",
                          width: "4rem",
                          paddingTop: "6px",
                          lineHeight: "20px",
                        }}
                        value="No"
                      >
                        No
                      </Radio.Button>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                {lifeInsToggle && (
                  <div className="table-scroll">
                    <Col xs={24} sm={24} md={12} lg={12} xl={5}>
                      <Button
                        className="btn-insu"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          color: "#ffff",
                        }}
                        shape="round"
                        size="large"
                        block
                        onClick={showLifeInsurancerModal}
                      >
                        Add Insurance Details
                      </Button>
                    </Col>
                    <Table
                      className="table"
                      dataSource={lifeInsObj}
                      columns={lifeInsColumn}
                      rowKey={(record) => record.id}
                      // scroll={{ x: 600 }}
                      pagination={lifeInsObj.length > 3 ? true : false}
                    />
                  </div>
                )}
                <div>
                  <Modal
                    title="Insurance Details"
                    centered={true}
                    visible={visibleLifeInsuranceMOdel}
                    onOk={handleLifeInsurance}
                    confirmLoading={lifeInsuranceLoading}
                    footer={[
                      <Button key="cancel" onClick={lifeInsurancerCancel}>
                        Cancel
                      </Button>,
                      <Button
                        key="save"
                        type="primary"
                        onClick={saveLifeInsurane}
                      >
                        {updateLIfeInsrr == true ? "Update" : "Save"}
                      </Button>,
                    ]}
                    onCancel={lifeInsurancerCancel}
                    width={width > breakpoint ? 700 : "auto"}
                  >
                    <Row gutter={[12, 10]}>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="insurer"
                          label="Insurer"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                            {
                              message: "Only Alphabets are Allowed",
                              pattern: new RegExp(/^[a-zA-Z ]+$/),
                            },
                          ]}
                        >
                          <Select
                            value={insurer}
                            size="large"
                            defaultValue="Select"
                            options={setInsurerOptions}
                            placeholder="Set Insurer"
                            onChange={insurerHandler}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="lifeSumAssured"
                          label="Sum Assured"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },

                            {
                              message: "Only Numbers are Allowed",
                              pattern: new RegExp(/^[0-9]+$/),
                            },
                          ]}
                        >
                          <Input
                            value={lifeSumAssured}
                            className="first-name input-box"
                            placeholder="Enter Sum Assured"
                            onChange={LifeSumAssuredHandler}
                            type="number"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="policyType"
                          label="Select Policy Type"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Select
                            value={policyType}
                            size="large"
                            options={setPolicyTypeOptions}
                            placeholder="Select Policy Type"
                            onChange={policyTypeHandler}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="policyStatus"
                          label="Select Policy Status"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Select Policy Status",
                            },
                          ]}
                        >
                          <Select
                            value={policyStatus}
                            size="large"
                            options={setPolicyStatusOptions}
                            placeholder="Select Policy Status"
                            onChange={policyStatusHandler}
                          ></Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="policyNumber"
                          label="Policy Number"
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Enter Policy Number",
                            },
                            {
                              message: "Only Numbers are Allowed",
                              pattern: new RegExp(/^[0-9]+$/),
                            },
                          ]}
                        >
                          <Input
                            value={policyNumber}
                            className="first-name input-box"
                            placeholder="Enter Policy NUmber"
                            onChange={policyNumberHandler}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color datepicker"
                          // name="lifeRiskCommencementDate"
                          label="Risk Commencement Date"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: "Risk Commencement Date",
                            },
                          ]}
                        >
                          <DatePicker
                            inputReadOnly={true}
                            value={commencementDateIn}
                            placeholder="dd/mm/yyyy"
                            size="large"
                            style={{ width: "100%" }}
                            onChange={commencementDateHandler}
                          />
                        </Form.Item>
                      </Col>
                      {/* {policyStatusInforce && (
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color datepicker"
                            name="lifeRiskCommencementDate"
                            label="Risk Commencement Date"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: "Risk Commencement Date",
                              },
                            ]}
                          >
                            <DatePicker
                              value={commencementDate}
                              placeholder="dd/mm/yyyy"
                              size="large"
                              style={{ width: "100%" }}
                              onChange={commencementDateHandler}
                            />
                          </Form.Item>
                        </Col>
                      )} */}
                      {(policyStatusApplied || policyStatusDeclined) && (
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...formItemLayout}
                            className="form-item-name label-color"
                            name="lifeApplicationDate"
                            label="Application Date"
                            hasFeedback
                            rules={[
                              {
                                required: false,
                                message: "Application Date",
                              },
                            ]}
                          >
                            <DatePicker
                              inputReadOnly={true}
                              value={applicationDate}
                              placeholder="dd/mm/yyyy"
                              size="large"
                              style={{ width: "100%" }}
                              onChange={applicationDateHandler}
                            />
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </Modal>
                </div>
              </Row>

              <Row xs={24} sm={24} md={20} lg={20} xl={20}>
                <Col
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={12}
                  style={{ marginBottom: "1rem", marginTop: "1rem" }}
                >
                  <Form.Item
                    className="form-item-name label-color"
                    name="healthInsuranceSwitch"
                    label="Have health Insurance?"
                    rules={[
                      {
                        required: false,
                        message: "This field is required",
                      },
                    ]}
                  >
                    <Radio.Group
                      value={haveHealthInsurece}
                      onChange={healthInsuranceToggle}
                      buttonStyle="solid"
                    >
                      <Radio.Button
                        size="large"
                        className=""
                        style={{
                          paddingTop: "6px",
                          paddingLeft: "20px",
                          height: "2rem",
                          width: "4rem",
                          lineHeight: "20px",
                        }}
                        value="Yes"
                      >
                        Yes
                      </Radio.Button>
                      <Radio.Button
                        size="large"
                        style={{
                          paddingTop: "6px",
                          paddingLeft: "20px",
                          height: "2rem",
                          width: "4rem",
                          lineHeight: "20px",
                        }}
                        value="No"
                      >
                        No
                      </Radio.Button>
                    </Radio.Group>
                    {/* <Switch checkedChildren="No" unCheckedChildren="Yes" defaultChecked={false}  /> */}
                  </Form.Item>
                </Col>
              </Row>

              {healthInsToggle && (
                <div className="table-scroll">
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={12}
                    xl={5}
                    span={23}
                    // style={{ marginLeft: "42rem", marginBottom: "1rem" }}
                  >
                    <Button
                      className="btn-insu"
                      style={{
                        backgroundColor: "rgb(59, 55, 30)",
                        color: "#ffff",
                      }}
                      shape="round"
                      size="large"
                      block
                      onClick={showHealthInsuranceModal}
                    >
                      Add Insurance Details
                    </Button>
                  </Col>
                  <Table
                    className="table"
                    dataSource={healthInsObj}
                    columns={healthInsColumn}
                    rowKey={(record) => record.id}
                    pagination={false}
                    scroll={{ x: 600 }}
                  />
                </div>
              )}
              <>
                <Modal
                  title="Insurance Details"
                  centered={true}
                  visible={visibleHealthInsuranceMOdel}
                  onOk={handleHealthInsurance}
                  confirmLoading={healthInsuranceLoading}
                  footer={[
                    <Button key="cancel" onClick={healthInsuranceCancel}>
                      Cancel
                    </Button>,
                    <Button
                      key="save"
                      type="primary"
                      onClick={saveHealthInsurance}
                    >
                      {updateHealthInsrr === true ? "Update" : "Save"}
                    </Button>,
                  ]}
                  onCancel={healthInsuranceCancel}
                  width={width > breakpoint ? 700 : "auto"}
                >
                  <Row gutter={[12, 10]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="relation"
                        label="Select Relation"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Select Relation",
                          },
                        ]}
                      >
                        <Select
                          value={relation}
                          size="large"
                          options={setRelationOptions}
                          placeholder="Select Relation"
                          onChange={relationshipHandler}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="Name"
                        label=" Name"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Enter Name",
                          },
                          {
                            message: "Only Alphabets are Allowed",
                            pattern: new RegExp(/^[a-zA-Z ]+$/),
                          },
                        ]}
                      >
                        <Input
                          value={insurername}
                          className="first-name input-box"
                          placeholder="Enter The Name "
                          onChange={nameHandler}
                        ></Input>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="dateOfBirth"
                        label="Date of Birth"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Select Date of Birth",
                          },
                        ]}
                      >
                        <DatePicker
                          inputReadOnly={true}
                          value={dateofBirth}
                          placeholder="dd/mm/yyyy"
                          size="large"
                          disabledDate={(current) => current.isAfter(moment())}
                          style={{ width: "100%" }}
                          onChange={insurerDObHandler}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        // name="typeOfPlan"
                        label="Types of Plan "
                        hasFeedback
                        rules={[
                          {
                            required: false,
                            message: "Types of Plan ",
                          },
                        ]}
                      >
                        <Select
                          value={typeOfPlan}
                          size="large"
                          options={setHealthTypeOfPlanOptions}
                          placeholder="Select Types of Plan"
                          onChange={typeOfPlanHandler}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="sumAssured"
                        label="Sum Assured"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },

                          {
                            message: "Only Numbers are Allowed",
                            pattern: new RegExp(/^[0-9]+$/),
                          },
                        ]}
                      >
                        <Input
                          value={healthSumInsured}
                          className="first-name input-box"
                          placeholder="Enter Amount"
                          onChange={healthSumInsuredHandler}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="riskCommencementDate"
                        label="Risk Commencement Date"
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Select Date of Birth",
                          },
                        ]}
                      >
                        <DatePicker
                          inputReadOnly={true}
                          value={healthRiskDateIn}
                          placeholder="dd/mm/yyyy"
                          size="large"
                          style={{ width: "100%" }}
                          onChange={healthRiskDateHandler}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        className="form-item-name label-color"
                        name="chronicDisease"
                        label="Is Insured suffering from any chronic disease "
                        rules={[
                          {
                            required: true,
                            message: "This field is required",
                          },
                        ]}
                      >
                        <Switch
                          value={haveChronicDisease}
                          checkedChildren="No"
                          unCheckedChildren="Yes"
                          defaultChecked={false}
                          onChange={haveChronicDiseaseToggle}
                        />
                      </Form.Item>
                    </Col>
                    {haveChronicDisease ? (
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="diseaseDesc"
                          label="Enter Details"
                          hasFeedback
                          rules={[
                            {
                              required: false,
                              message: "This field is required",
                            },
                          ]}
                        >
                          <Input
                            value={diseaseDescription}
                            className="first-name input-box"
                            placeholder="Enter Description"
                            onChange={descriptionHandler}
                          />
                        </Form.Item>
                      </Col>
                    ) : null}
                  </Row>
                </Modal>
              </>
            </Col>
            <Col
              className="form-body  p300"
              xs={{ order: 5 }}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 6 : 0}
            >
              <div className="child">
                <Button
                  className="last-btn-1"
                  // type="primary"
                  // shape="round"
                  // size="large"
                  style={{
                    // backgroundColor: "rgb(59, 55, 30)",
                    border: "1",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={prevdHandler}
                  icon={<ArrowLeftOutlined />}
                >
                  Previous
                </Button>
                <Button
                  type="primary"
                  // shape="round"
                  // size="large"
                  className="last-btn-1"
                  style={{
                    backgroundColor: "rgb(59, 55, 30)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                  icon={<ArrowRightOutlined />}
                  onClick={proceedHandler}
                >
                  Next
                </Button>
              </div>

              {/* <Col xs={11} sm={12} md={4} >
                                    <Button
                                        type="primary"
                                        // shape="round"
                                        size="large"
                                        style={{ backgroundColor: 'rgb(59, 55, 30)', border: 'none' }}
                                        icon={<FileTextOutlined />} htmlType="submit"
                                    // disabled={!formIsValid}
                                    // onClick={updateHandler}
                                    >Update</Button>
                                </Col> */}
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ExistingInsurenceDetails;
