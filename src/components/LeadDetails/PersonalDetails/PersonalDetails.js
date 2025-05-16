import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Form,
  Typography,
  Radio,
  Button,
  Input,
  Select,
  Tabs,
  DatePicker,
  Table,
  Modal,
  InputNumber,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
//  autocomplete="off"

import TabsMain from "../../Tab/Tab";
import LeadDetailsTab from "../LeadDetails/LeadDetailsTab";
// import "../../StatusLead/StatusLead.css";
import "./PersonalDetails.css";
import * as actions from "../../../store/actions/index";
import { useHistory } from "react-router-dom";
import moment, { now } from "moment";
import { isElement, isEmpty } from "lodash";
import { msToDateString } from "../../../helpers";
import _ from "lodash";
import { Fragment } from "fullcalendar";

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const maritalStatusOptions = [
  { value: "select", label: "Select" },
  { value: "single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
  { value: "Widowed", label: "Widowed" },
];
const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];
// const personalRoute = "/leadmasterpage/leaddetails/personallead";

const PersonalDetails = () => {
  // from data which w
  let _leadID = useSelector((state) => state.leads.currentUpdatingID);

  useEffect(() => {
    dispatch(actions.fetchLeadDetails(_leadID));
  }, []);
  let storeFormData = useSelector((state) => state.newLead.formData);
  const test = useSelector(
    (state) => state?.newLead?.formData?.appointmentDetails
  );
  let startDate = test?.start_date;
  let startTime = test?.start_time;


  let gender2 = storeFormData.gender;
  const address = storeFormData.address[0];
  let line1 = "";
  let line2 = "";
  let line3 = "";
  if (address !== undefined) {
    line1 = address.line1;
    line2 = address.line2;
    line3 = address.line3;
  }

  const dispatch = useDispatch();
  const history = useHistory();
  const [genderRadio, setGenderRadio] = useState(
    gender2 !== "" ? gender2 : "Male"
  );
  const [childGenderRadio, setChildGenderRadio] = useState("Male");
  const leadStatus = useSelector((state) => state.newLead.leadStatus);
  let storeLeadId = useSelector((state) => state.leads.currentUpdatingID);
  // let storeLeadId2 = useSelector((state) => state.newLead.leadId);

  const successMsg = useSelector((state) => state.newLead.successMsg);
  const id = useSelector((state) => state.login.user.id);

  const leadDisposition = useSelector((state) => state.newLead.leadDisposition);

  const leadSubDisposition = useSelector(
    (state) => state.newLead.leadSubDisposition
  );
  const appointmentdisPosition = useSelector(
    (state) => state.newLead.formData.appointmentdisPosition
  );
  const appointmentsubdisPosition = useSelector(
    (state) => state.newLead.appointmentsubdisPosition
  );

  const remarksfromUser = useSelector(
    (state) => state.newLead.formData.remarksfromUser
  );


  // const storeLeadId = useSelector((state) => state.newLead.leadId);
  let storeChildInfo = useSelector((state) => state.newLead.formData.ChildInfo);
  if (
    storeChildInfo === "" ||
    storeChildInfo === "[]" ||
    storeChildInfo === undefined
  ) {
    storeChildInfo = [];
  }

  let childTableArr = useSelector((state) => state.newLead.childParsedData);
  // const id = useSelector((state)=>state.newLead.leadId)
  // useEffect(() => {

  // }, [dispatch,id])
  // if(!_.isEmpty(storeChildInfo)){

  //         // return storeChildInfo
  //     }else{
  //         return []
  //     }
  // if(!_.isEmpty(storeChildInfo)){
  //     return storeChildInfo
  // }else{
  //     return []
  // }

  const [form] = Form.useForm();
  const [width, setWidth] = useState(window.innerWidth);
  const [errorMessage, setErrorMessage] = useState();
  const [childrenNumber, setChildrenNumber] = useState(
    storeFormData.ChildInfo ? storeFormData.ChildInfo : ""
  );

  const [firstName, setFirstName] = useState(storeFormData.firstName);
  const [lastName, setLastName] = useState(storeFormData.lastName);
  const [dob, setDob] = useState(
    () => storeFormData.dob !== "" && moment(storeFormData.dob)
  );
  const [dobPost, setDobPost] = useState();
  const [isDobValid, setIsDobValid] = useState(
    () => storeFormData.dob !== "" && true
  );
  const [dobErrorMessage, setDobErrorMessage] = useState();
  const [leadIdData, setLeadIdData] = useState("");
  const [gender, setGender] = useState(storeFormData.gender);
  const [maritalStatus, setMaritalStatus] = useState(
    storeFormData.maritalStatus !== "" ? storeFormData.maritalStatus : "select"
  );
  // const [maritalStatus, setMaritalStatus] = useState(
  //   storeFormData.maritalStatus
  // );
  const [appendChildComponent, setappendChildComponent] = useState(() => {
    if (
      maritalStatus === "Married" ||
      maritalStatus === "Divorced" ||
      maritalStatus === "Widowed"
    ) {
      return true;
    } else {
      return false;
    }
  });
  const [childStatus, setChildStatus] = useState(storeFormData.childStatus);
  const [haveChildren, sethaveChildren] = useState(() => {
    if (childStatus === "Yes" && maritalStatus !== "single") {
      return true;
    } else {
      setChildrenNumber("");
      return false;
    }
  });

  const [childModel, setChildModel] = useState();
  const [childInfoObj, setChildInfoObj] = useState(() => {
    if (!_.isEmpty(storeChildInfo)) {

      return storeChildInfo;
    } else {
      return [];
    }
  });
  const [childParsedArr, setChildParsedArr] = useState(childTableArr);
  const [childName, setChildName] = useState();
  const [childAge, setChildAge] = useState();
  const [childAgePost, setChildAgePost] = useState();
  const [childGender, setChildGender] = useState("Male");
  const [isNewLead, setIsNewLead] = useState();
  const [size, setSize] = useState("small");

  const config = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const breakpoint = 620;

  // const validateMessages = {
  //     // required: `${label} is required!`,
  //     types: {
  //       email: `Age should be between 18 to 55 years`,
  //       dob: dobErrorMessage
  //     },
  //     number: {
  //       range: 'Number must be 10 digits',
  //     },
  // };

  useEffect(() => {

    if (storeLeadId !== "") {
      setIsNewLead(false);
    }
    form.setFieldsValue({
      firstname: firstName,
      lastname: lastName,
      gender: gender,
      dob: dob,
      maritalstatus: maritalStatus,
    });
  }, [firstName, lastName, dob, maritalStatusOptions, form]);
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const onChangeChildNumber = (value) => {
    setChildrenNumber(value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeDOB = (date, dateString) => {
    let msDate = moment(date).valueOf();
    isDobValid
      ? setDob(msDate)
      : setDobErrorMessage("Age should be between 18 and 55 years");
  };
  const dobHandler = (date, dateString) => {
    let minYear = moment().subtract(18, "years");
    let maxYear = moment().subtract(90, "years");
    let signal = moment(dateString).isBetween(maxYear, minYear);
    setIsDobValid(signal);
    setDob(date);
    setDobPost(dateString);
  };

  const onChangeGender = (e) => {
    setGender(e.target.value);
  };

  const onChangeMaritalStatus = (value) => {
    setMaritalStatus(value);
    if (value === "Married" || value === "Divorced" || value === "Widowed") {
      setappendChildComponent(true);
    } else {
      setappendChildComponent(false);
    }
  };

  const haveChildrenHandler = (event) => {
    setChildStatus(event.target.value);
    sethaveChildren(!haveChildren);
  };
  const childNameHandler = (event) => {
    const name = event.target.value;
    setChildName(name);
  };
  const childGenderHandler = (e) => {
    setChildGender(e.target.value);
  };
  const childDOBHandler = (date, dateString) => {
    setChildAge(date);
    setChildAgePost(dateString);
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

  const handleChildModal = () => {
    setChildModel(!childModel);
  };
  const saveChildInfo = (event) => {
    event.preventDefault();

    storeChildInfo.push({
      id: "ch" + randomId(),
      childName: childName,
      childAge: childAgePost,
      childGender: childGender,
    });

    setChildInfoObj(storeChildInfo);

    const formData = {
      ...storeFormData,
      ChildInfo: [...storeChildInfo],
    };

    dispatch(actions.storeLead(formData));

    setChildModel(false);
  };
  const childColumn = [
    {
      title: "Name",
      dataIndex: "childName",
    },
    {
      title: "Date of Birth",
      dataIndex: "childAge",
      // render: (dobOfInsurer) => { return (<p>{moment(dobOfInsurer).format('DD-MM-YYYY')}</p>) }
    },
    {
      title: "Gender",
      dataIndex: "childGender",
    },
    {
      title: "Action",
      render: () => <CloseCircleOutlined />,
    },
  ];
  useEffect(() => {
  }, [storeChildInfo]);

  const formData = {
    ...storeFormData,

    firstName: firstName,
    lastName: lastName,

    lead_Owner_Id: storeFormData.leadOwnerId,
    lead_Creator_Id: storeFormData.leadCreatorId,
    lead_Id: storeFormData.leadId,
    start_date: startDate ? startDate : "",
    start_time: startTime ? startTime : "",

    user_id: id,
    dob: dobPost,
    gender: gender,
    maritalStatus: maritalStatus,
    childStatus: childStatus,
    // ChildInfo: storeChildInfo,
    ChildInfo: childrenNumber,
    line1: line1,
    line2: line2,
    line3: line3,
    _id: storeLeadId,

    gender: genderRadio,
  };

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

  // const formData = {
  //   ...storeFormData,
  //   user_id: id,
  //   leadStatus: leadStatus,
  //   leadDisposition: leadDisposition,
  //   // leadDisposition1: leadDisposition1,
  //   leadsubDisposition: leadSubDisposition,
  //   appointmentdisPosition: checkValidity(appointmentDisposition),
  //   remarksfromUser: remarkFromUser,
  //   remarksfromSource: remarkFromSource,
  //   worksiteEvent: workSiteEvent,
  //   teamMembers: JSON.stringify(addTeamMemb),
  //   leadSource: null,
  //   appointment_status: checkValidity(appointmentStatus),
  //   appointmentsubdisPosition: checkValidity(appointmentSubDisposition),
  //   lead_Owner_Id: id,
  //   lead_Creator_Id: id,
  //   LeadType: leadType,
  //   leadPropensity: leadPropensity,
  //   line1: "",
  //   line2: "",
  //   line3: "",
  //   country: "India",
  //   state: stateProvince === "Select" ? "" : stateProvince,
  //   city: cityProvince === "Select" ? "" : cityProvince,
  //   pincode: null,
  //   primaryMobile: primaryNo,
  //   secondaryMobile: null,
  //   landlineNo: null,
  //   email: email,
  //   socialSecurityAdharNo: "",
  //   mailingAddressStatus: "Yes",
  //   mailingAddressSecond:
  //     '{"mailingaddress":{"line1":"","line2":"","line3":""},"state":"Arunachal Pradesh","city":"Margherita","country":"India","pincode":""}',
  //   firstName: firstName,
  //   lastName: lastName,
  //   dob: "",
  //   gender: "",
  //   maritalStatus: "",
  //   childStatus: "",
  //   ChildInfo: "[]",
  //   education: "",
  //   incomeGroup: "",
  //   annuaLincome: null,
  //   professionType: "",
  //   productCategory: "",
  //   productType: "",
  //   solution: "",
  //   expectedPremium: null,
  //   expectedclosureDate: "",
  //   HaveLifeInsurance: {
  //     ExistInsur: "No",
  //     ExistHealthInsur: "No",
  //   },
  //   Insurancedetails: "[]",
  //   HaveLifeInsurance_details: "[]",
  //   start_date: appointmentDatePost,
  //   start_date1: allDatePost,
  //   start_time: parseInt(appointmentTime),
  // };
  const failedHandler = (error) => {
    alert(error);
  };
  const proceedHandler = (event) => {
    event.preventDefault();
    let _lead_id = storeLeadId !== undefined ? storeLeadId : leadIdData;

    dispatch(actions.editLead(formData, _lead_id)).then((res) => {
      if (res?.type === "EDIT_LEAD_SUCCESS") {
        setErrorMessage(successMsg);
        setIsNewLead(false);
      } else if (res?.type === "EDIT_LEAD_FAIL") {

        failedHandler(res.error);
      }
    });

    dispatch(actions.storeLead(storeFormData));
    history.push("contactlead");
  };

  const submitHandler = (event) => {
    if (!storeLeadId) {
      dispatch(actions.storeLead(formData));

      // alert("New Lead Updated Successfully");
      history.push("contactlead");

      setIsNewLead(false);
    } else {
      dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
        if (res?.type === "EDIT_LEAD_SUCCESS") {
          setErrorMessage();
          setIsNewLead(false);
        } else if (res?.type === "EDIT_LEAD_FAIL") {

          failedHandler(res.error);
        }
      });
      // alert(' Lead Updated Successfully')
      // history.push('contactlead')
    }
  };

  const prevdHandler = (event) => {
    event.preventDefault();

    dispatch(actions.storeLead(formData));
    history.push("/leadmasterpage/statuslead");
  };

  const updateHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editLead(formData, storeLeadId));
    history.push("contactlead");

    // if (!formIsValid) {
    //   return;
    // }else{
    // }

    // setErrorMessage('Form submitted successfully')
    // setIsNewLead(false)
    // setErrorMessage( res.data.data)

    // resetFirstName();
    // resetLastName();
    // resetEmail();
  };
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  // RadioChangeEvent

  const genderChange = ({ target: { value } }) => {
    setGenderRadio(value);
  };
  const ChildGenderChange = ({ target: { value } }) => {
    setChildGenderRadio(value);
  };

  return (
    <>
      <div className="leadtabpr">
        <TabsMain
          tabMenu={_leadID ? tabMenu : tabMenu2}
          tabBarGutter={0}
          header="New Lead"
          // detailsRouteTab={personalRoute}
          activeKey="2"

        />
      </div>
      <div className="form-container2">
        <Form
          // layout="horizontal"
          // className="contact-detail-form"
          form={form}
          // validateMessages={validateMessages}
          initialValues={{
            name: firstName,
            lastname: lastName,
            gender: gender,
            dob: dob,
            maritalstatus: maritalStatus,
            Children: childStatus,
          }}
          onFinish={submitHandler}
          onFinishFailed={failedHandler}
        >
          <Row gutter={[0, 30]} justify={width > breakpoint ? "" : "center"}>

            <LeadDetailsTab activeKey="1" />



            <Col
              className="form-body p50 mb-2"
              // style={{
              //   marginTop: -280,
              //   marginLeft: 150,
              //   backgroundColor: "white",
              // }}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Personal Details</p>
              <Row gutter={16} className="mb-2 statsLead">
                {/* <Col className="form-body p40" xs={24} sm={24} md={20} lg={20} xl={20} > */}
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="firstname"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required ",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter First Name"
                      // defaultValue={firstName}
                      maxLength={50}
                      value={firstName}
                      onChange={onChangeFirstName}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="lastname"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={onChangeLastName}
                      maxLength={50}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="dob"
                    label="Date of Birth"
                    rules={[
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!isDobValid) {
                            return Promise.reject(
                              new Error("Age should be between 18 and 90 years")
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  // validateStatus='error'
                  // help='Age should be between 18 and 55 years'
                  // hasFeedback
                  // rules={[
                  //     {
                  //         type:dob,
                  //         required: false,
                  //         message: dobErrorMessage,
                  //     },
                  // ]}
                  // style={{ marginBottom: '1rem' }}
                  >
                    <DatePicker
                      // value={dob}
                      inputReadOnly={true}
                      {...config}
                      onChange={dobHandler}
                      placeholder="MM-DD-YYYY"
                      size="large"
                      style={{
                        width: "100%",
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px rgb(153, 153, 153) solid",
                        height: "2.7rem",
                      }}
                      // disabledDate={(current) =>
                      //   current.isBefore(moment().subtract(70, "years")) ||
                      //   current.isAfter(moment().subtract(18, "years"))
                      // }
                      // selected={(dob !== "")? moment(dob, 'YYYY-MM-DD'):moment()}
                      // value={(dob !== "")? moment(dob, 'YYYY-MM-DD'):""}
                      format="MM-DD-YYYY"
                    // defaultValue={'2015/01/01'}
                    // defaultValue={moment('01/01/2015',dateFormat)}
                    // format={dateFormatList}
                    // format={"DD/MM/YYYY"}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    name="gender"
                    label="Gender"
                    onChange={onChangeGender}
                    // rules={[{ required: true, message: "Please pick gender" }]}
                    value={gender}
                  >
                    {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}  >
                                                <Radio.Button style={{ paddingTop: '6px' }} value="Male">Male</Radio.Button>
                                                <Radio.Button style={{ paddingTop: '6px' }} value="Female">Female</Radio.Button>
                                                <Radio.Button style={{ paddingTop: '6px' }} value="Other">Other</Radio.Button>
                                            </Radio.Group> */}
                    <>
                      <Radio.Group
                        options={genderOptions}
                        onChange={genderChange}
                        value={genderRadio}
                        optionType="button"
                        buttonStyle="solid"
                      />
                    </>

                    {/* <Radio.Group size="large" options={genderOptions} value={gender} style={{display:'flex',textAlign:'center'}} optionType="button"> */}
                    {/* <Radio.Button value="Male">Male</Radio.Button>
                                            <Radio.Button value="Female">Female</Radio.Button>
                                            <Radio.Button value="Other">Other</Radio.Button> */}
                    {/* </Radio.Group> */}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="maritalStatus"
                    label="Marital Status"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select your Marital Status!",
                      },
                    ]}
                  >
                    <Select
                      bordered={false}
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px rgb(153, 153, 153) solid",
                      }}
                      size="large"
                      options={maritalStatusOptions}
                      placeholder="Select Maretial Status"
                      onChange={onChangeMaritalStatus}
                      value={maritalStatus}
                      defaultValue={maritalStatus}
                    ></Select>
                  </Form.Item>
                </Col>
                {appendChildComponent && (
                  <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="Children"
                      label="Children"
                      onChange={haveChildrenHandler}
                      hasFeedback
                      rules={[
                        {
                          required: false,
                          message: "Select Children",
                        },
                      ]}
                    >
                      <Radio.Group buttonStyle="solid" value={childStatus}>
                        <Radio.Button value="Yes">Yes</Radio.Button>
                        <Radio.Button value="No">No</Radio.Button>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                )}
                {haveChildren && maritalStatus !== "single" && (
                  <Col
                    xs={24}
                    sm={24}
                    md={6}
                    lg={6}
                    xl={6}
                    style={{ marginTop: "1rem" }}
                  >
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      label="Number of Children"
                      name="ChildInfo"
                    >
                      <InputNumber
                        min={1}
                        max={20}
                        onChange={onChangeChildNumber}
                        value={childrenNumber}
                        defaultValue={childrenNumber}
                      />
                    </Form.Item>
                  </Col>
                )}
                {/* {haveChildren && (
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={6}
                      lg={6}
                      xl={6}
                      style={{ marginTop: "1rem" }}
                    >
                      <Button
                        primary
                        size="large"
                        block
                        onClick={handleChildModal}
                      >
                        Add Child
                      </Button>
                    </Col>

                    <Table
                      className="table"
                      style={{ marginTop: "1rem" }}
                      dataSource={childInfoObj}
                      columns={childColumn}
                      scroll={{ x: 600 }}
                    />
                  </>
                )} */}
                <>
                  <Modal
                    title="Child Details"
                    centered={true}
                    visible={childModel}
                    onOk={handleChildModal}
                    footer={[
                      <Button key="cancel" onClick={handleChildModal}>
                        Cancel
                      </Button>,
                      <Button key="save" type="primary" onClick={saveChildInfo}>
                        Save
                      </Button>,
                    ]}
                    onCancel={handleChildModal}
                    width={700}
                  >
                    <Row gutter={[12, 10]} className="statsLead">
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="childname"
                          label="Child Name"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            className="first-name input-box"
                            placeholder="Enter Child Name"
                            value={childName}
                            onChange={childNameHandler}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name label-color"
                          name="dobOfChild"
                          label="Date of Birth"
                          rules={[{ required: true }]}
                        >
                          <DatePicker
                            inputReadOnly={true}
                            value={childAge}
                            onChange={childDOBHandler}
                            size="large"
                            style={{
                              width: "100%",
                              boxShadow: "none",
                              border: "none",
                              borderBottom: "1px rgb(153, 153, 153) solid",
                              height: "1.7rem",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          name="gender"
                          label="Gender"
                          onChange={childGenderHandler}
                          rules={[
                            {
                              required: true,
                              message: "Please pick gender",
                            },
                          ]}
                          value={childGender}
                        >
                          {/* <Radio.Group size="large">
                                                            <Radio.Button value="Male">Male</Radio.Button>
                                                            <Radio.Button value="Female">Female</Radio.Button>
                                                            <Radio.Button value="Other">Other</Radio.Button>
                                                        </Radio.Group> */}
                          <Radio.Group
                            options={genderOptions}
                            onChange={ChildGenderChange}
                            value={childGenderRadio}
                            optionType="button"
                            buttonStyle="solid"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Modal>
                </>
                {/* </Col> */}
              </Row>
            </Col>
            <div className="perosnalDetailsfooter">
              <Col
                className="form-body  p300"

                xs={{ order: 5 }}
                sm={24}
                md={24}
                lg={24}
                xl={15}
                span={24}
                offset={width > breakpoint ? 6 : 0}
              >
                <div className="child">
                  <Button
                    className="last-btn-1"
                    // type="primary"
                    // shape="round"
                    onClick={prevdHandler}
                    // size="large"
                    style={{
                      // backgroundColor: "rgb(59, 55, 30)",
                      border: "1",
                      display: "flex",
                      alignItems: "center",
                    }}
                    icon={<ArrowLeftOutlined />}
                  >
                    Previous
                  </Button>
                  <Button
                    className="last-btn-1"
                    type="primary"
                    // shape="round"
                    onClick={proceedHandler}
                    // size="large"
                    style={{
                      backgroundColor: "rgb(29, 66, 138)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      // marginLeft: 70,
                    }}
                    

                  >
                    Next <ArrowRightOutlined />
                  </Button>
                </div>

                {/* <Row gutter={[8, 8]}> */}
                <Col xs={11} sm={12} md={4} offset={width > breakpoint ? 8 : 2}>
                  <Form.Item></Form.Item>
                </Col>
                <Col xs={10} sm={12} md={4} lg={6}>
                  <Form.Item></Form.Item>
                </Col>
                {/* <Col xs={10} sm={12} md={4} >
                                        <Form.Item>
                                            <Button
                                                className="last-btn-2"
                                                type="primary"
                                                // shape="round"
                                                size="large"
                                                style={{ backgroundColor: 'rgb(59, 55, 30)', border: 'none' }}
                                                icon={<FileTextOutlined />} htmlType="submit"
                                            // disabled={!formIsValid}
                                            // onClick={updateHandler}
                                            >Update</Button>
                                        </Form.Item>
                                    </Col> */}
                {/* <Col xs={10} sm={12} md={4}>
                                        <Form.Item>
                                            <Button
                                                className="last-btn-3"
                                                type="primary"
                                                // shape="round"
                                                size="large" style={{ backgroundColor: 'rgb(59, 55, 30)', border: 'none' }}
                                                icon={<ArrowRightOutlined />}
                                                htmlType="submit"
                                            // onClick={proceedHandler}
                                            >Proceed</Button>
                                        </Form.Item>
                                    </Col> */}
                {/* </Row> */}
              </Col>
            </div>

          </Row>
        </Form>
      </div>
    </>
  );
};

export default React.memo(PersonalDetails);
