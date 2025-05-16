import React from "react";
import "./AlternatePolicyHolder.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import axiosRequest from "../../../../axios-request/request.methods";
import {
  getThirdPartyDetails,
  getPrefix,
  getSaperator,
} from "../../../../services/travel/index";
import {
  Row,
  Col,
  Button,
  Select,
  Option,
  Form,
  Input,
  message,
  DatePicker,
  Spin,
} from "antd";
import img1 from "../../../../images/button images/MdVerified.png";
import img2 from "../../../../images/button images/upload.png";
import StepTravelTwo from "../../TRAVEL/StepBarTravel/StepTravelTwo/StepTravelTwo";
import PolicyQuoteFooter from "../MotorFormFooter/PolicyQuoteFooter/PolicyQuoteFooter";
import { useDispatch, useSelector } from "react-redux";
import { useState, createRef } from "react";
import { useEffect } from "react";
import * as actions from "../../../../store/actions";
import _ from "lodash";
import moment from "moment";
import StepThree from "../components/StepBar/StepThree/StepThree";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const formRef = createRef();

export default function AlternatePolicyHolder() {
  const history = useHistory();
  const dispatch = useDispatch();
  const showSectionByCondition = useSelector(
    (state) => state.make.motorConditionRenderSection
  );
  const policyDetailsData = useSelector(
    (state) => state?.motorQuotation?.formData?.policyHolder
  );
  const policyHolderQuote = useSelector(
    (state) => state?.motorQuotation?.formData
  );

  const STATEEEEEE = useSelector((state) => state);
  // console.log("policyDetailsData: ", policyDetailsData);
  // console.log("STATEEEEEE: ", STATEEEEEE);
  useEffect(() => {
    dispatch(actions.fetchAllMortgage());
    dispatch(actions.fetchAllMortgageClause());
    getPrefix()
      .then((item) => {
        // console.log("PREFIX: ", item.lovOptions);
        const prefix = item.lovOptions.map((item) => {
          return {
            label: item.NOM_VALOR,
            value: item.TIP_ASEG_PREF,
          };
        });
        // console.log("PREEEEEEEEE: ", prefix);
        setPrefix(prefix);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
    getSaperator()
      .then((item) => {
        // console.log("PREFIX: ", item.lovOptions);
        const saperator = item.lovOptions.map((item) => {
          return {
            label: item.NOM_VALOR,
            value: item.TIP_ASEG_SEP_LOV,
          };
        });
        // console.log("saperatorrrrrrrr: ", saperator);
        setSaperator(saperator);
      })
      .catch((err) => {
        console.log("ERROR: ", err);
      });
  }, [dispatch]);

  useEffect(() => {
    const getIdType = async () => {
      setShowScreenLoader(true);
      const url = "user/lov-options/documentType";
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {
        if (res?.data?.lovOptions && Array.isArray(res.data.lovOptions)) {
          setIdList(
            res.data.lovOptions.map((e) => ({
              label: e.NOM_VALOR,
              value: e.ADQC_ID,
            }))
          );
        }
      } else {
        message.error(res?.data?.data?.message ?? "Something went Wrong");
      }
      setShowScreenLoader(false);
    };
    getIdType();
  }, []);

  const { Option } = Select;
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  /* useStates */

  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [idList, setIdList] = useState([]);
  const [alternatePolicy, setAlternatePolicy] = useState("yes");
  const [isAlternatePolicyValidated, setAlternatePolicyValidated] =
    useState("");
  const [isAlternatePolicyBtnTriggered, setAlternatePolicyBtnTriggered] =
    useState(false);
  const [owner, setOwner] = useState("yes");
  const [isOwnerValidated, setOwnerValidated] = useState("");
  const [isOwnerBtnTriggered, setOwnerBtnTriggered] = useState(false);
  const [driver, setDriver] = useState("yes");
  const [isDriverValidated, setDriverValidated] = useState("");
  const [isDriverBtnTriggered, setDriverBtnTriggered] = useState(false);
  const [Lessor, setLessor] = useState("yes");
  const [isLessorValidated, setLessorValidated] = useState("");
  const [isLessorBtnTriggered, setLessorBtnTriggered] = useState(false);
  const [Lessee, setLessee] = useState("yes");
  const [isLesseeValidated, setLesseeValidated] = useState("");
  const [isLesseeBtnTriggered, setLesseeBtnTriggered] = useState(false);
  const [Assignee, setAssignee] = useState("yes");
  const [isAssigneeValidated, setAssigneeValidated] = useState("");
  const [isAssigneeBtnTriggered, setAssigneeBtnTriggered] = useState(false);
  const initialData = {
    idType: null,
    idNumber: "",
    firstName: "",
    lastName: "",
    birthDate: null,
    gender: null,
    prefix: null,
    saperator: null,
  };
  const [alternatePolicySec, setAlternatePolicySec] = useState(initialData);
  const [ownerDetails, setOwnerDetails] = useState(initialData);
  const [driverDetails, setDriverDetails] = useState(initialData);
  const [lessorDetails, setLessorDetails] = useState(initialData);
  const [lesseeDetails, setLesseeDetails] = useState(initialData);
  const [assigneeDetails, setAssigneeDetails] = useState(initialData);
  const [prefix, setPrefix] = useState([]);
  const [saperator, setSaperator] = useState([]);

  const [mortgage, setMortgage] = useState({
    clause: "",
    company: "",
  });

  const mortgageApi = useSelector((state) => state?.motorCoverage?.mortgage);
  // console.log("mortgageApi", mortgageApi);

  const mortgageClauseApi = useSelector(
    (state) => state?.motorCoverage?.mortgageClause
  );
  // console.log("mortgageClauseApi", mortgageClauseApi);
  const GenderOptions = [
    { label: "Male", value: "male", id: "1", notation: "M" },
    { label: "Female", value: "female", id: "0", notation: "F" },
    // { label: "Others", value: "others", id: "3", notation: "O" },
  ];

  let mortgageOptions =
    mortgageApi && !_.isEmpty(mortgageApi)
      ? mortgageApi.map((MORTGAGE) => {
          const label = MORTGAGE.name;
          const value = MORTGAGE.documentType;
          const key = MORTGAGE.documentCode;
          const newMortgage = { ...MORTGAGE, label, value, key };
          return newMortgage;
        })
      : null;
  // console.log("mortgageOptions: ", mortgageOptions);
  let mortgageClauseOptions =
    mortgageClauseApi && !_.isEmpty(mortgageClauseApi)
      ? mortgageClauseApi.map((MORTGAGECLAUSE) => {
          const label = MORTGAGECLAUSE.NOM_VALOR;
          const value = MORTGAGECLAUSE.TIP_MORT_CLAUSE;
          const key = MORTGAGECLAUSE.TIP_MORT_CLAUSE;
          const newMortgageClause = { ...MORTGAGECLAUSE, label, value, key };
          return newMortgageClause;
        })
      : null;
  // console.log("mortgageClauseOptions: ", mortgageClauseOptions);

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  /* Functions */
  const onchangetoBack = () => {
    history.push("/policyholder");
  };

  const onchangetoNext = () => {
    history.push("/motor-confirm-page");
  };

  const checkVerified = (details, section) => {
    if (!details?.idType) {
      message.error("Enter ID Type");
      return;
    }
    if (!details?.idNumber) {
      message.error("Enter ID Number");
      return;
    }
    setShowScreenLoader(true);
    axiosRequest
      .get(
        `user/third-party/detail?documentType=${details?.idType}&documentCode=${details?.idNumber}`
      )
      .then((response) => {
        // console.log("VALID DATA: ", response);
        setShowScreenLoader(false);
        if (response?.data?.customerDetail) {
          const { firstName, lastName, birthday, gender } =
            response?.data?.customerDetail;
          handleFieldChange("firstName", firstName, section);
          handleFieldChange("lastName", lastName, section);
          handleFieldChange("birthDate", birthday, section);
          handleFieldChange("gender", gender, section);
          if (section == "alternate-policy") {
            form.setFieldsValue({
              alternatePolicyBirthDate: moment(birthday),
            });
            setAlternatePolicyValidated("yes");
          }
          if (section == "owner") {
            form.setFieldsValue({
              OwnerBirthDate: moment(birthday),
            });
            setOwnerValidated("yes");
          }
          if (section == "driver") {
            form.setFieldsValue({
              DriverBirthDate: moment(birthday),
            });
            setDriverValidated("yes");
          }
          if (section == "lessor") {
            form.setFieldsValue({
              lessorBirthDate: moment(birthday),
            });
            setLessorValidated("yes");
          }
          if (section == "lessee") {
            form.setFieldsValue({
              lesseeBirthDate: moment(birthday),
            });
            setLesseeValidated("yes");
          }
          if (section == "assignee") {
            form.setFieldsValue({
              assigneeBirthDate: moment(birthday),
            });
            setAssigneeValidated("yes");
          }
        }
        if (section == "alternate-policy" && response?.statusCode !== -1) {
          setAlternatePolicyValidated("no");
        }
        if (section == "owner" && response?.statusCode !== -1) {
          setOwnerValidated("no");
        }
        if (section == "driver" && response?.statusCode !== -1) {
          setDriverValidated("no");
        }
        if (section == "assignee" && response?.statusCode !== -1) {
          setAssigneeValidated("no");
        }
        if (section == "lessor" && response?.statusCode !== -1) {
          setLessorValidated("no");
        }
        if (section == "lessee" && response?.statusCode !== -1) {
          setLesseeValidated("no");
        }

        if (response?.statusCode !== -1) {
          console.log(
            "NOT VALID CUSTOMER RESP VALID CHECK: ",
            response?.data
          );
          message.error("Details not found");
        }
      })
      .catch((err) => {
        console.log("ERRO: ", err);
        setShowScreenLoader(false);
      });
  };

  const handleFieldChange = (fieldName, value, section) => {
    if (section == "alternate-policy") {
      setAlternatePolicySec((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "owner") {
      setOwnerDetails((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "driver") {
      setDriverDetails((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "lessor") {
      setLessorDetails((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "lessee") {
      setLesseeDetails((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "assignee") {
      setAssigneeDetails((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "prefix") {
      setPrefix((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "saperator") {
      setSaperator((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
    if (section == "mortgage") {
      setMortgage((prevState) => ({
        ...prevState,
        [fieldName]: value,
      }));
    }
  };

  const resetInput = (section, clickedBtnStatus, sectionData) => {
    let hasValue = false;
    for (const key in sectionData) {
      if (sectionData[key] !== "") {
        hasValue = true;
        break;
      }
    }
    if (
      section == "alternate-policy" &&
      (alternatePolicy !== clickedBtnStatus || clickedBtnStatus === "clear") &&
      hasValue
    ) {
      for (const key in initialData) {
        handleFieldChange(key, null, section);
      }
      form.setFieldsValue({
        alternatePolicyBirthDate: "",
      });
      if (clickedBtnStatus !== "clear") {
        setAlternatePolicy(clickedBtnStatus);
      }
      setAlternatePolicyValidated("");
      setAlternatePolicyBtnTriggered(false);
    } else if (section == "alternate-policy") {
      setAlternatePolicy(clickedBtnStatus);
    }
    if (
      section == "owner" &&
      (owner !== clickedBtnStatus || clickedBtnStatus === "clear") &&
      hasValue
    ) {
      for (const key in initialData) {
        handleFieldChange(key, null, section);
      }
      form.setFieldsValue({
        OwnerBirthDate: null,
      });
      setOwnerValidated("");
      if (clickedBtnStatus !== "clear") {
        setOwner(clickedBtnStatus);
      }
    } else if (section == "owner") {
      setOwner(clickedBtnStatus);
    }
    if (
      section == "driver" &&
      (driver !== clickedBtnStatus || clickedBtnStatus === "clear") &&
      hasValue
    ) {
      for (const key in initialData) {
        handleFieldChange(key, null, section);
      }
      form.setFieldsValue({
        DriverBirthDate: null,
      });
      if (clickedBtnStatus !== "clear") {
        setDriver(clickedBtnStatus);
      }
      setDriverValidated("");
    } else if (section == "driver") {
      setDriver(clickedBtnStatus);
    }
    if (
      section == "lessor" &&
      (Lessor !== clickedBtnStatus || clickedBtnStatus === "clear") &&
      hasValue
    ) {
      for (const key in initialData) {
        handleFieldChange(key, null, section);
      }
      form.setFieldsValue({
        lessorBirthDate: null,
      });
      if (clickedBtnStatus !== "clear") {
        setLessor(clickedBtnStatus);
      }
      setLessorValidated("");
    } else if (section == "lessor") {
      setLessor(clickedBtnStatus);
    }
    if (
      section == "lessee" &&
      (Lessee !== clickedBtnStatus || clickedBtnStatus === "clear") &&
      hasValue
    ) {
      for (const key in initialData) {
        handleFieldChange(key, null, section);
      }
      form.setFieldsValue({
        lesseeBirthDate: null,
      });
      if (clickedBtnStatus !== "clear") {
        setLessee(clickedBtnStatus);
      }
      setLesseeValidated("");
    } else if (section == "lessee") {
      setLessee(clickedBtnStatus);
    }
    if (
      section == "assignee" &&
      (Assignee !== clickedBtnStatus || clickedBtnStatus === "clear") &&
      hasValue
    ) {
      for (const key in initialData) {
        handleFieldChange(key, null, section);
      }
      form.setFieldsValue({
        assigneeBirthDate: null,
      });
      if (clickedBtnStatus !== "clear") {
        setAssignee(clickedBtnStatus);
      }
      setAssigneeValidated("");
    } else if (section == "assignee") {
      setAssignee(clickedBtnStatus);
    }
    console.log("formData ALERTer: ", form.getFieldValue());
    console.log(
      { alternatePolicySec },
      { ownerDetails },
      { driverDetails },
      { lessorDetails },
      { lesseeDetails },
      { assigneeDetails },
      { mortgage }
    );
  };

  const finalSubmit = (formData) => {
    console.log("finalSubmit: ", formData);
    console.log(
      { alternatePolicySec },
      { ownerDetails },
      { driverDetails },
      { lessorDetails },
      { lesseeDetails },
      { assigneeDetails },
      { mortgage }
    );

    const PolicyHolderDetails = {
      ...policyHolderQuote,
    };

    const alternatePayload = alternatePolicySec?.idNumber
      ? {
          separator: alternatePolicySec?.saperator,
          prefix: alternatePolicySec?.prefix,
          thirdPartyData: {
            documentCode: alternatePolicySec?.idNumber,
            documentType: alternatePolicySec?.idType,
            firstName: alternatePolicySec?.firstName,
            lastName: alternatePolicySec?.lastName,
            birthday: moment(alternatePolicySec?.birthDate).format(
              "MM/DD/YYYY"
            ),
            gender: alternatePolicySec?.gender,
          },
        }
      : null;

    // console.log("alternatePayload", alternatePayload);
    const ownerPayload = ownerDetails?.idNumber
      ? {
          thirdPartyData: {
            documentCode: ownerDetails?.idNumber,
            documentType: ownerDetails?.idType,
            firstName: ownerDetails?.firstName,
            lastName: ownerDetails?.lastName,
            birthday: moment(ownerDetails?.birthDate).format("MM/DD/YYYY"),
            gender: ownerDetails?.gender,
          },
        }
      : null;

    // console.log("ownerPayload", ownerPayload);
    const driverPayload = driverDetails?.idNumber
      ? {
          thirdPartyData: {
            documentCode: driverDetails?.idNumber,
            documentType: driverDetails?.idType,
            firstName: driverDetails?.firstName,
            lastName: driverDetails?.lastName,
            birthday: moment(driverDetails?.birthDate).format("MM/DD/YYYY"),
            gender: driverDetails?.gender,
          },
        }
      : null;
    const lesseePayload = lesseeDetails?.idNumber
      ? {
          thirdPartyData: {
            documentCode: lesseeDetails?.idNumber,
            documentType: lesseeDetails?.idType,
            firstName: lesseeDetails?.firstName,
            lastName: lesseeDetails?.lastName,
            birthday: moment(lesseeDetails?.birthDate).format("MM/DD/YYYY"),
            gender: lesseeDetails?.gender,
          },
        }
      : null;

    const lessorPayload = lessorDetails?.idNumber
      ? {
          thirdPartyData: {
            documentCode: lessorDetails?.idNumber,
            documentType: lessorDetails?.idType,
            firstName: lessorDetails?.firstName,
            lastName: lessorDetails?.lastName,
            birthday: moment(lessorDetails?.birthDate).format("MM/DD/YYYY"),
            gender: lessorDetails?.gender,
          },
        }
      : null;

    const assigneePayload = assigneeDetails?.idNumber
      ? {
          thirdPartyData: {
            documentCode: assigneeDetails?.idNumber,
            documentType: assigneeDetails?.idType,
            firstName: assigneeDetails?.firstName,
            lastName: assigneeDetails?.lastName,
            birthday: moment(assigneeDetails?.birthDate).format("MM/DD/YYYY"),
            gender: assigneeDetails?.gender,
          },
        }
      : null;
    const mortgageDocType = mortgageOptions?.filter(
      (item) => item.documentCode == mortgage.company
    );
    const selectedMortgageClause = mortgageClauseOptions?.filter((item) => item.value == mortgage?.clause);
    console.log("mortgageDocType: ", mortgageDocType);
    const mortgagePayload = mortgage?.company
      ? {
          mortgageClause: mortgage?.clause,
          thirdPartyData: {
            documentCode: mortgage?.company,
            documentType: mortgageDocType
              ? mortgageDocType[0]?.documentType
              : "",
          },
        }
      : null;

    dispatch(
      actions.motorQuotationForm({
        secondary: alternatePayload ? alternatePayload : null,
        owner: ownerPayload,
        driver: driverPayload,
        assignee: assigneePayload,
        mortgagee: mortgagePayload,
        lessee: lesseePayload,
        lessor: lessorPayload,
        mortgageCompany: mortgageDocType?.length > 0 ? mortgageDocType[0]?.label : null,
        mortgageClause: selectedMortgageClause?.length > 0 ? selectedMortgageClause[0]?.label : null
      })
    );

    history.push("/motor-confirm-page");
  };

  const onFinishFailed = (err) => {
    console.log("err: ", err);
  };

  return (
    <>
      <div className="parent-customer">
        <div className="left-side">
          <Button
            type="dashed"
            onClick={onChangetoDashboard}
            className="dashbtn"
          >
            <ArrowLeftOutlined />
            Back to dashboard
          </Button>
          {/* <StepTravelTwo /> */}
          <StepThree />
        </div>
        <div className="rightsides">
          <div className="SpTag">
            Now, we just need to know more about your customer.
          </div>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            ref={formRef}
            form={form}
            onFinish={finalSubmit}
            onFinishFailed={onFinishFailed}
          >
            {showSectionByCondition.alternatePolicyHolder == "1" ? (
              <>
                <div className="headings-container">
                  <ul>
                    <li>
                      {" "}
                      <div className="headings">Alternate Policy Holder</div>
                    </li>
                  </ul>
                </div>
                <div className="existing-customer-container">
                  <div className="existing-customer">
                    Is this for an existing customer?
                  </div>
                  <div className="buttons-container">
                    <Button
                      className={`check-btn ${
                        alternatePolicy == "yes" ? "check-btn-click" : ""
                      }`}
                      onClick={() => {
                        resetInput(
                          "alternate-policy",
                          "yes",
                          alternatePolicySec
                        );
                      }}
                    >
                      <CheckIcon style={{ color: "#5BA46A" }} />
                      Yes
                    </Button>
                    <Button
                      className={`check-btn ${
                        alternatePolicy == "no" ? "check-btn-click" : ""
                      }`}
                      onClick={() => {
                        resetInput(
                          "alternate-policy",
                          "no",
                          alternatePolicySec
                        );
                      }}
                    >
                      <CloseIcon style={{ color: "#BB251A" }} />
                      No
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyIdType"
                        // label=" ID type"
                        label={
                          <>
                            {alternatePolicySec.idType && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID type
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.idType,
                            message: "Please Select ID Type",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.idType}
                        </p>
                        <Select
                          showSearch
                          bordered="false"
                          options={idList}
                          placeholder="Select ID Type"
                          value={alternatePolicySec.idType}
                          onChange={(val) =>
                            handleFieldChange("idType", val, "alternate-policy")
                          }
                          size="large"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyIdNumber"
                        // label="ID Number"
                        label={
                          <>
                            {alternatePolicySec.idNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID Number
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.idNumber,
                            message: "Please enter ID Number",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.idNumber}
                        </p>
                        <Input
                          className="RsInput"
                          // size="large"
                          maxLength="30"
                          value={alternatePolicySec.idNumber}
                          onChange={(e) =>
                            handleFieldChange(
                              "idNumber",
                              e.target.value,
                              "alternate-policy"
                            )
                          }
                          placeholder="Enter Valid ID Number"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {alternatePolicy == "yes" && (
                    <div className="verified-container">
                      <Button
                        className={`verified ${
                          isAlternatePolicyValidated == "yes"
                            ? "valid-user event-none"
                            : ""
                        } ${
                          isAlternatePolicyValidated == "no" &&
                          isAlternatePolicyBtnTriggered
                            ? "invalid-user event-none"
                            : ""
                        }`}
                        onClick={() => {
                          setAlternatePolicyBtnTriggered(true);
                          checkVerified(alternatePolicySec, "alternate-policy");
                        }}
                      >
                        {" "}
                        <img src={img1} />
                        {isAlternatePolicyValidated == "yes"
                          ? "Validated"
                          : isAlternatePolicyValidated == "no" &&
                            isAlternatePolicyBtnTriggered
                          ? "Try Again"
                          : "Validate"}
                      </Button>
                      <Button
                        className="clear"
                        onClick={() =>
                          resetInput(
                            "alternate-policy",
                            "clear",
                            alternatePolicySec
                          )
                        }
                      >
                        Clear All Fields
                      </Button>
                    </div>
                  )}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyFirstName"
                        // label="First Name"
                        label={
                          <>
                            {alternatePolicySec.firstName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            First Name
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.firstName,
                            message: "Please enter first name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.firstName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          value={alternatePolicySec.firstName}
                          onChange={(e) =>
                            handleFieldChange(
                              "firstName",
                              e.target.value,
                              "alternate-policy"
                            )
                          }
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyLastName"
                        // label="Last Name"
                        label={
                          <>
                            {alternatePolicySec.lastName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Last Name
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.lastName,
                            message: "please enter last name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.lastName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          value={alternatePolicySec.lastName}
                          onChange={(e) =>
                            handleFieldChange(
                              "lastName",
                              e.target.value,
                              "alternate-policy"
                            )
                          }
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyBirthDate"
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          value={alternatePolicySec.birthDate}
                          onChange={(e) =>
                            handleFieldChange(
                              "birthDate",
                              e,
                              "alternate-policy"
                            )
                          }
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyGender"
                        // label="Gender"
                        label={
                          <>
                            {alternatePolicySec.gender && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Gender
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.gender,
                            message: "Please select gender",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.gender}
                        </p>
                        <Select
                          placeholder="Gender"
                          size="large"
                          value={alternatePolicySec.gender}
                          onChange={(val) =>
                            handleFieldChange("gender", val, "alternate-policy")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GenderOptions.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicyPrefix"
                        // label="Prefix"
                        label={
                          <>
                            {alternatePolicySec.prefix && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Prefix
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.prefix,
                            message: "Please select prefix",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.prefix}
                        </p>
                        <Select
                          placeholder="Prefix"
                          size="large"
                          value={alternatePolicySec.prefix}
                          onChange={(val) =>
                            handleFieldChange("prefix", val, "alternate-policy")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {prefix.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="alternatePolicySaperator"
                        // label="Separator"
                        label={
                          <>
                            {alternatePolicySec.saperator && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Separator
                          </>
                        }
                        rules={[
                          {
                            required: !alternatePolicySec.saperator,
                            message: "Please select saperator",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {alternatePolicySec.saperator}
                        </p>
                        <Select
                          placeholder="Separator"
                          size="large"
                          value={alternatePolicySec.saperator}
                          onChange={(val) =>
                            handleFieldChange(
                              "saperator",
                              val,
                              "alternate-policy"
                            )
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {saperator.map((item, index) => (
                            <Option key={index} value={item.label}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}
            {/* /////////////////////////////////// */}
            {showSectionByCondition.owner === "0" ? (
              <>
                <div className="headings">Owner</div>
                <div className="existing-customer-container">
                  <div className="existing-customer">
                    Do you have an existing record ?
                  </div>
                  <div className="buttons-container">
                    <Button
                      className={`check-btn ${
                        owner == "yes" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("owner", "yes", ownerDetails)}
                    >
                      <CheckIcon style={{ color: "#5BA46A" }} />
                      Yes
                    </Button>
                    <Button
                      className={`check-btn ${
                        owner == "no" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("owner", "no", ownerDetails)}
                    >
                      <CloseIcon style={{ color: "#BB251A" }} />
                      No
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="OwnerIdType"
                        // label=" ID type"
                        label={
                          <>
                            {ownerDetails.idType && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID type
                          </>
                        }
                        rules={[
                          {
                            required: !ownerDetails.idType,
                            message: "Please Select ID Type",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>{ownerDetails.idType}</p>
                        <Select
                          showSearch
                          bordered="false"
                          placeholder="Select ID Type"
                          options={idList}
                          onChange={(e) =>
                            handleFieldChange("idType", e, "owner")
                          }
                          value={ownerDetails.idType}
                          size="large"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="OwnerIdNumber"
                        // label="ID Number"
                        label={
                          <>
                            {ownerDetails.idNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID Number
                          </>
                        }
                        rules={[
                          {
                            required: !ownerDetails.idNumber,
                            message: "Please enter ID Number",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {ownerDetails.idNumber}
                        </p>
                        <Input
                          className="RsInput"
                          // size="large"
                          maxLength="30"
                          value={ownerDetails.idNumber}
                          onChange={(e) =>
                            handleFieldChange(
                              "idNumber",
                              e.target.value,
                              "owner"
                            )
                          }
                          placeholder="Enter Valid ID Number"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {owner == "yes" && (
                    <div className="verified-container">
                      <Button
                        className={`verified ${
                          isOwnerValidated == "yes"
                            ? "valid-user event-none"
                            : ""
                        } ${
                          isOwnerValidated == "no" && isOwnerBtnTriggered
                            ? "invalid-user event-none"
                            : ""
                        }`}
                        onClick={() => {
                          setOwnerBtnTriggered(true);
                          checkVerified(ownerDetails, "owner");
                        }}
                      >
                        {" "}
                        <img src={img1} />
                        {isOwnerValidated == "yes"
                          ? "Validated"
                          : isOwnerValidated == "no" && isOwnerBtnTriggered
                          ? "Try Again"
                          : "Validate"}
                      </Button>

                      <Button
                        className="clear"
                        onClick={() =>
                          resetInput("owner", "clear", ownerDetails)
                        }
                      >
                        Clear All Fields
                      </Button>
                    </div>
                  )}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="OwnerFirstName"
                        // label="First Name"
                        label={
                          <>
                            {ownerDetails.firstName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            First Name
                          </>
                        }
                        rules={[
                          {
                            required: !ownerDetails.firstName,
                            message: "Please enter first name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {ownerDetails.firstName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "firstName",
                              e.target.value,
                              "owner"
                            )
                          }
                          value={ownerDetails.firstName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="OwnerLastName"
                        // label="Last Name"
                        label={
                          <>
                            {ownerDetails.lastName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Last Name
                          </>
                        }
                        rules={[
                          {
                            required: !ownerDetails.lastName,
                            message: "Please enter last name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {ownerDetails.lastName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          value={ownerDetails.lastName}
                          onChange={(e) =>
                            handleFieldChange(
                              "lastName",
                              e.target.value,
                              "owner"
                            )
                          }
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="OwnerBirthDate"
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            handleFieldChange("birthDate", e, "owner")
                          }
                          value={ownerDetails.birthDate}
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="OwnerGender"
                        // label="Gender"
                        label={
                          <>
                            {ownerDetails.gender && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Gender
                          </>
                        }
                        rules={[
                          {
                            required: !ownerDetails.gender,
                            message: "Please select gender",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>{ownerDetails.gender}</p>
                        <Select
                          placeholder="Gender"
                          size="large"
                          value={ownerDetails.gender}
                          onChange={(e) =>
                            handleFieldChange("gender", e, "owner")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GenderOptions.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}

            {/* ///////////////////// */}
            {showSectionByCondition.driver === "0" ? (
              <>
                <div className="headings">Driver</div>
                <div className="existing-customer-container">
                  <div className="existing-customer">
                    Is this for an existing customer?
                  </div>
                  <div className="buttons-container">
                    <Button
                      className={`check-btn ${
                        driver == "yes" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("driver", "yes", driverDetails)}
                    >
                      <CheckIcon style={{ color: "#5BA46A" }} />
                      Yes
                    </Button>
                    <Button
                      className={`check-btn ${
                        driver == "no" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("driver", "no", driverDetails)}
                    >
                      <CloseIcon style={{ color: "#BB251A" }} />
                      No
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="DriverIdType"
                        // label="ID type"
                        label={
                          <>
                            {driverDetails.idType && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID type
                          </>
                        }
                        rules={[
                          {
                            required: !driverDetails.idType,
                            message: "Please Select Id Type",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {driverDetails.idType}
                        </p>
                        <Select
                          showSearch
                          bordered="false"
                          placeholder="Select ID Type"
                          options={idList}
                          onChange={(e) =>
                            handleFieldChange("idType", e, "driver")
                          }
                          value={driverDetails.idType}
                          size="large"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="DriverIdNumber"
                        // label="ID Number"
                        label={
                          <>
                            {driverDetails.idNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID Number
                          </>
                        }
                        rules={[
                          {
                            required: !driverDetails.idNumber,
                            message: "Please enter ID Number",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {driverDetails.idNumber}
                        </p>
                        <Input
                          className="RsInput"
                          // size="large"
                          maxLength="30"
                          placeholder="Enter Valid ID Number"
                          onChange={(e) =>
                            handleFieldChange(
                              "idNumber",
                              e.target.value,
                              "driver"
                            )
                          }
                          value={driverDetails.idNumber}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {driver == "yes" && (
                    <div className="verified-container">
                      {/* <Button
                        className={`verified ${isDriverValidated ? "valid-user event-none" : ""
                          }`}
                        onClick={() => checkVerified(driverDetails, "driver")}
                      >
                        {" "}
                        <img src={img1} />
                        Validate
                      </Button> */}

                      <Button
                        className={`verified ${
                          isDriverValidated == "yes"
                            ? "valid-user event-none"
                            : ""
                        } ${
                          isDriverValidated == "no" && isDriverBtnTriggered
                            ? "invalid-user event-none"
                            : ""
                        }`}
                        onClick={() => {
                          setDriverBtnTriggered(true);
                          checkVerified(driverDetails, "driver");
                        }}
                      >
                        {" "}
                        <img src={img1} />
                        {isDriverValidated == "yes"
                          ? "Validated"
                          : isDriverValidated == "no" && isDriverBtnTriggered
                          ? "Try Again"
                          : "Validate"}
                      </Button>

                      <Button
                        className="clear"
                        onClick={() =>
                          resetInput("driver", "clear", driverDetails)
                        }
                      >
                        Clear All Fields
                      </Button>
                    </div>
                  )}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="DriverFirstName"
                        // label="First Name"
                        label={
                          <>
                            {driverDetails.firstName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            First Name
                          </>
                        }
                        rules={[
                          {
                            required: !driverDetails.firstName,
                            message: "Please enter first name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {driverDetails.firstName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          value={driverDetails.firstName}
                          onChange={(e) =>
                            handleFieldChange(
                              "firstName",
                              e.target.value,
                              "driver"
                            )
                          }
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="DriverLastName"
                        // label="Last Name"
                        label={
                          <>
                            {driverDetails.lastName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Last Name
                          </>
                        }
                        rules={[
                          {
                            required: !driverDetails.lastName,
                            message: "Please enter last name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {driverDetails.lastName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "lastName",
                              e.target.value,
                              "driver"
                            )
                          }
                          value={driverDetails.lastName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="DriverBirthDate"
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            handleFieldChange("birthDate", e, "driver")
                          }
                          value={driverDetails.birthDate}
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="DriverGender"
                        // label="Gender"
                        label={
                          <>
                            {driverDetails.gender && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Gender
                          </>
                        }
                        rules={[
                          {
                            required: !driverDetails.gender,
                            message: "Please select gender",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {driverDetails.gender}
                        </p>
                        <Select
                          placeholder="Gender"
                          size="large"
                          value={driverDetails.gender}
                          onChange={(e) =>
                            handleFieldChange("gender", e, "driver")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GenderOptions.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}

            {/* //////////////////// */}
            {showSectionByCondition.leased == "1" ? (
              <>
                <div className="headings">Lessor Information</div>
                <div className="existing-customer-container">
                  <div className="existing-customer">
                    Is this for an existing customer?
                  </div>
                  <div className="buttons-container">
                    <Button
                      className={`check-btn ${
                        Lessor == "yes" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("lessor", "yes", lessorDetails)}
                    >
                      <CheckIcon style={{ color: "#5BA46A" }} />
                      Yes
                    </Button>
                    <Button
                      className={`check-btn ${
                        Lessor == "no" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("lessor", "no", lessorDetails)}
                    >
                      <CloseIcon style={{ color: "#BB251A" }} />
                      No
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorIdType"
                        // label=" ID type"
                        label={
                          <>
                            {lessorDetails.idType && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID type
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.idType,
                            message: "Please Select Id type",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.idType}
                        </p>
                        <Select
                          showSearch
                          bordered="false"
                          options={idList}
                          placeholder="Select ID Type"
                          onChange={(e) =>
                            handleFieldChange("idType", e, "lessor")
                          }
                          value={lessorDetails.idType}
                          size="large"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorIdNumber"
                        // label="ID Number"
                        label={
                          <>
                            {lessorDetails.idNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID Number
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.idNumber,
                            message: "Please enter ID Number",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.idNumber}
                        </p>
                        <Input
                          className="RsInput"
                          // size="large"
                          maxLength="30"
                          placeholder="Enter Valid ID Number"
                          onChange={(e) =>
                            handleFieldChange(
                              "idNumber",
                              e.target.value,
                              "lessor"
                            )
                          }
                          value={lessorDetails.idNumber}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {Lessor == "yes" && (
                    <div className="verified-container">
                      <Button
                        className={`verified ${
                          isLessorValidated == "yes"
                            ? "valid-user event-none"
                            : ""
                        } ${
                          isLessorValidated == "no" && isLessorBtnTriggered
                            ? "invalid-user event-none"
                            : ""
                        }`}
                        onClick={() => {
                          setLessorBtnTriggered(true);
                          checkVerified(lessorDetails, "lessor");
                        }}
                      >
                        {" "}
                        <img src={img1} />
                        {isLessorValidated == "yes"
                          ? "Validated"
                          : isLessorValidated == "no" && isLessorBtnTriggered
                          ? "Try Again"
                          : "Validate"}
                      </Button>

                      <Button
                        className="clear"
                        onClick={() =>
                          resetInput("lessor", "clear", lessorDetails)
                        }
                      >
                        Clear All Fields
                      </Button>
                    </div>
                  )}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorFirstName"
                        // label="Lessor’s First Name"
                        label={
                          <>
                            {lessorDetails.firstName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Lessor’s First Name
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.firstName,
                            message: "Please enter first name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.firstName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "firstName",
                              e.target.value,
                              "lessor"
                            )
                          }
                          value={lessorDetails.firstName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorLastName"
                        // label="Lessor’s Last Name"
                        label={
                          <>
                            {lessorDetails.lastName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Lessor’s Last Name
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.lastName,
                            message: "Please enter last name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.lastName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "lastName",
                              e.target.value,
                              "lessor"
                            )
                          }
                          value={lessorDetails.lastName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorBirthDate"
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            handleFieldChange("birthDate", e, "lessor")
                          }
                          value={lessorDetails.birthDate}
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorGender"
                        // label="Gender"
                        label={
                          <>
                            {lessorDetails.gender && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Gender
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.gender,
                            message: "Please select gender",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.gender}
                        </p>
                        <Select
                          placeholder="Gender"
                          size="large"
                          value={lessorDetails.gender}
                          onChange={(e) =>
                            handleFieldChange("gender", e, "lessor")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GenderOptions.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorPrefix"
                        // label="Prefix"
                        label={
                          <>
                            {lessorDetails.prefix && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Prefix
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.prefix,
                            message: "Please select prefix",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.prefix}
                        </p>
                        <Select
                          placeholder="Prefix"
                          size="large"
                          value={lessorDetails.prefix}
                          onChange={(val) =>
                            handleFieldChange("prefix", val, "lessor")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {prefix.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lessorSaperator"
                        // label="Separator"
                        label={
                          <>
                            {lessorDetails.saperator && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Separator
                          </>
                        }
                        rules={[
                          {
                            required: !lessorDetails.saperator,
                            message: "Please select saperator",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lessorDetails.saperator}
                        </p>
                        <Select
                          placeholder="Separator"
                          size="large"
                          value={lessorDetails.saperator}
                          onChange={(val) =>
                            handleFieldChange("saperator", val, "lessor")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {saperator.map((item, index) => (
                            <Option key={index} value={item.label}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col> */}
                  </Row>
                </div>

                {/* //////////////////////// */}

                <div className="headings">Lessee Information</div>
                <div className="existing-customer-container">
                  <div className="existing-customer">
                    Is this for an existing customer?
                  </div>
                  <div className="buttons-container">
                    <Button
                      className={`check-btn ${
                        Lessee == "yes" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("lessee", "yes", lesseeDetails)}
                    >
                      <CheckIcon style={{ color: "#5BA46A" }} />
                      Yes
                    </Button>
                    <Button
                      className={`check-btn ${
                        Lessee == "no" ? "check-btn-click" : ""
                      }`}
                      onClick={() => resetInput("lessee", "no", lesseeDetails)}
                    >
                      <CloseIcon style={{ color: "#BB251A" }} />
                      No
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeIdType"
                        // label=" ID type"
                        label={
                          <>
                            {lesseeDetails.idType && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID type
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.idType,
                            message: "Please Select ID type",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.idType}
                        </p>
                        <Select
                          showSearch
                          bordered="false"
                          options={idList}
                          placeholder="Select ID Type"
                          onChange={(e) =>
                            handleFieldChange("idType", e, "lessee")
                          }
                          value={lesseeDetails.idType}
                          size="large"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeIdNumber"
                        // label="ID Number"
                        label={
                          <>
                            {lesseeDetails.idNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID Number
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.idNumber,
                            message: "Please slect ID Number",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.idNumber}
                        </p>
                        <Input
                          className="RsInput"
                          // size="large"
                          maxLength="30"
                          placeholder="Enter Valid ID Number"
                          onChange={(e) =>
                            handleFieldChange(
                              "idNumber",
                              e.target.value,
                              "lessee"
                            )
                          }
                          value={lesseeDetails.idNumber}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {Lessee == "yes" && (
                    <div className="verified-container">
                      <Button
                        className={`verified ${
                          isLesseeValidated == "yes"
                            ? "valid-user event-none"
                            : ""
                        } ${
                          isLesseeValidated == "no" && isLesseeBtnTriggered
                            ? "invalid-user event-none"
                            : ""
                        }`}
                        onClick={() => {
                          setLesseeBtnTriggered(true);
                          checkVerified(lesseeDetails, "lessee");
                        }}
                      >
                        {" "}
                        <img src={img1} />
                        {isLesseeValidated == "yes"
                          ? "Validated"
                          : isLesseeValidated == "no" && isLesseeBtnTriggered
                          ? "Try Again"
                          : "Validate"}
                      </Button>

                      <Button
                        className="clear"
                        onClick={() =>
                          resetInput("lessee", "clear", lesseeDetails)
                        }
                      >
                        Clear All Fields
                      </Button>
                    </div>
                  )}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeFirstName"
                        // label=" Lessee’s First Name"
                        label={
                          <>
                            {lesseeDetails.firstName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Lessee’s First Name
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.firstName,
                            message: "please enter first name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.firstName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "firstName",
                              e.target.value,
                              "lessee"
                            )
                          }
                          value={lesseeDetails.firstName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeLastName"
                        // label=" Lessee’s Last Name"
                        label={
                          <>
                            {lesseeDetails.lastName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Lessee’s Last Name
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.lastName,
                            message: "Please enter your name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.lastName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "lastName",
                              e.target.value,
                              "lessee"
                            )
                          }
                          value={lesseeDetails.lastName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeBirthDate"
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            handleFieldChange("birthDate", e, "lessee")
                          }
                          value={lesseeDetails.birthDate}
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeGender"
                        // label="Gender"
                        label={
                          <>
                            {lesseeDetails.gender && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Gender
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.gender,
                            message: "Please select gender",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.gender}
                        </p>
                        <Select
                          placeholder="Gender"
                          size="large"
                          value={lesseeDetails.gender}
                          onChange={(e) =>
                            handleFieldChange("gender", e, "lessee")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GenderOptions.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseePrefix"
                        // label="Prefix"
                        label={
                          <>
                            {lesseeDetails.prefix && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Prefix
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.prefix,
                            message: "Please select prefix",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.prefix}
                        </p>
                        <Select
                          placeholder="Prefix"
                          size="large"
                          value={lesseeDetails.prefix}
                          onChange={(val) =>
                            handleFieldChange("prefix", val, "lessee")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {prefix.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="lesseeSaperator"
                        // label="Separator"
                        label={
                          <>
                            {lesseeDetails.saperator && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Separator
                          </>
                        }
                        rules={[
                          {
                            required: !lesseeDetails.saperator,
                            message: "Please select saperator",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {lesseeDetails.saperator}
                        </p>
                        <Select
                          placeholder="Separator"
                          size="large"
                          value={lesseeDetails.saperator}
                          onChange={(val) =>
                            handleFieldChange("saperator", val, "lessee")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {saperator.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col> */}
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}
            {showSectionByCondition.assigned === "1" ? (
              <>
                <div className="headings">Assignee Information</div>
                <div className="existing-customer-container">
                  <div className="existing-customer">
                    Is this for an existing customer?
                  </div>
                  <div className="buttons-container">
                    <Button
                      className={`check-btn ${
                        Assignee == "yes" ? "check-btn-click" : ""
                      }`}
                      onClick={() =>
                        resetInput("assignee", "yes", assigneeDetails)
                      }
                    >
                      <CheckIcon style={{ color: "#5BA46A" }} />
                      Yes
                    </Button>
                    <Button
                      className={`check-btn ${
                        Assignee == "no" ? "check-btn-click" : ""
                      }`}
                      onClick={() =>
                        resetInput("assignee", "no", assigneeDetails)
                      }
                    >
                      <CloseIcon style={{ color: "#BB251A" }} />
                      No
                    </Button>
                  </div>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="assigneeIdType"
                        // label=" ID type"
                        label={
                          <>
                            {assigneeDetails.idType && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID type
                          </>
                        }
                        rules={[
                          {
                            required: !assigneeDetails.idType,
                            message: "Please Select ID type",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {assigneeDetails.idType}
                        </p>
                        <Select
                          showSearch
                          bordered="false"
                          placeholder="Select ID Type"
                          options={idList}
                          onChange={(e) =>
                            handleFieldChange("idType", e, "assignee")
                          }
                          value={assigneeDetails.idType}
                          size="large"
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="assigneeIdNumber"
                        // label="ID Number"
                        label={
                          <>
                            {assigneeDetails.idNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            ID Number
                          </>
                        }
                        rules={[
                          {
                            required: !assigneeDetails.idNumber,
                            message: "Please enter ID Number",
                          },
                        ]}
                      >
                        <p style={{ display: "none" }}>
                          {assigneeDetails.idNumber}
                        </p>
                        <Input
                          className="RsInput"
                          // size="large"
                          maxLength="30"
                          value={assigneeDetails.idNumber}
                          onChange={(e) =>
                            handleFieldChange(
                              "idNumber",
                              e.target.value,
                              "assignee"
                            )
                          }
                          placeholder="Enter Valid ID Number"
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  {Assignee == "yes" && (
                    <div className="verified-container">
                      {/* <Button
                        className={`verified ${isAssigneeValidated ? "valid-user event-none" : ""
                          }`}
                        onClick={() =>
                          checkVerified(assigneeDetails, "assignee")
                        }
                      >
                        {" "}
                        <img src={img1} />
                        Validate
                      </Button> */}

                      <Button
                        className={`verified ${
                          isAssigneeValidated == "yes"
                            ? "valid-user event-none"
                            : ""
                        } ${
                          isAssigneeValidated == "no" && isAssigneeBtnTriggered
                            ? "invalid-user event-none"
                            : ""
                        }`}
                        onClick={() => {
                          setAssigneeBtnTriggered(true);
                          checkVerified(assigneeDetails, "assignee");
                        }}
                      >
                        {" "}
                        <img src={img1} />
                        {isAssigneeValidated == "yes"
                          ? "Validated"
                          : isAssigneeValidated == "no" &&
                            isAssigneeBtnTriggered
                          ? "Try Again"
                          : "Validate"}
                      </Button>

                      <Button
                        className="clear"
                        onClick={() =>
                          resetInput("assignee", "clear", assigneeDetails)
                        }
                      >
                        Clear All Fields
                      </Button>
                    </div>
                  )}
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="assigneeFirstName"
                        // label=" Assignee’s First Name"
                        label={
                          <>
                            {assigneeDetails.firstName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Assignee’s First Name
                          </>
                        }
                        rules={[
                          {
                            required: !assigneeDetails.firstName,
                            message: "please enter first name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {assigneeDetails.firstName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "firstName",
                              e.target.value,
                              "assignee"
                            )
                          }
                          value={assigneeDetails.firstName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="assigneeLastName"
                        // label=" Assignee’s Last Name"
                        label={
                          <>
                            {assigneeDetails.lastName && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Assignee’s Last Name
                          </>
                        }
                        rules={[
                          {
                            required: !assigneeDetails.lastName,
                            message: "Please enter last name",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {assigneeDetails.lastName}
                        </p>
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "lastName",
                              e.target.value,
                              "assignee"
                            )
                          }
                          value={assigneeDetails.lastName}
                          maxLength={180}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="assigneeBirthDate"
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          onChange={(e) =>
                            handleFieldChange("birthDate", e, "assignee")
                          }
                          value={assigneeDetails.birthDate}
                          format="MM/DD/YYYY"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="assigneeGender"
                        // label="Gender"
                        label={
                          <>
                            {assigneeDetails.gender && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Gender
                          </>
                        }
                        rules={[
                          {
                            required: !assigneeDetails.gender,
                            message: "Please select gender",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <p style={{ display: "none" }}>
                          {assigneeDetails.gender}
                        </p>
                        <Select
                          placeholder="Gender"
                          size="large"
                          value={assigneeDetails.gender}
                          onChange={(e) =>
                            handleFieldChange("gender", e, "assignee")
                          }
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {GenderOptions.map((item, index) => (
                            <Option key={index} value={item.id}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}

            {/* ///////////////////////////// */}
            {showSectionByCondition.mortgaged === "1" ? (
              <>
                <div className="headings">Mortgage Information</div>
                <div className="existing-customer-container">
                  <Row gutter={16}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="mortgageClause"
                        label="Mortgage Clause"
                        rules={[
                          {
                            required: true,
                            message: "please enter Mortgage Clause",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        {/* <Input
                          placeholder="Mortgage Clause"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "clause",
                              e.target.value,
                              "mortgage"
                            )
                          }
                          value={mortgage.clause}
                          maxLength={180}
                        /> */}
                        <Select
                          placeholder="Mortgage Clause"
                          size="large"
                          onChange={(val) =>
                            handleFieldChange("clause", val, "mortgage")
                          }
                          value={mortgage.clause}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {mortgageClauseOptions?.map((item, index) => (
                            <Option key={index} value={item.value}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="mortgageCompany"
                        label="Mortgage Company"
                        rules={[
                          {
                            required: true,
                            message: "please enter Mortgage Company",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        {/* <Input
                          placeholder="Mortgage Company"
                          className="inputboxx"
                          onChange={(e) =>
                            handleFieldChange(
                              "company",
                              e.target.value,
                              "mortgage"
                            )
                          }
                          value={mortgage.company}
                          maxLength={180}
                        /> */}
                        <Select
                          placeholder="Mortgage Company"
                          size="large"
                          onChange={(val) =>
                            handleFieldChange("company", val, "mortgage")
                          }
                          value={mortgage.company}
                          filterOption={(input, option) =>
                            option.props.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {mortgageOptions?.map((item, index) => (
                            <Option key={index} value={item.documentCode}>
                              {item.label}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="rsRowDiv">
              <div className="rsfieldsinfo">
                <div className="Spverified-container">
                  <Button className="back-btn" onClick={onchangetoBack}>
                    Back
                  </Button>
                  <Button
                    className="next-btn"
                    htmlType="submit"
                    // onClick={onchangetoNext}
                  >
                    Next <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <PolicyQuoteFooter />
      {showScreenLoader ? (
        <div className="screenLoader">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
