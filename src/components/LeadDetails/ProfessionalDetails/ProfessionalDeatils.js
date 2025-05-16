import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Select } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, FileTextOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";
import Tabs from "../../Tab/Tab";
import LeadDetailsTab from "../LeadDetails/LeadDetailsTab";
// import "../../StatusLead/StatusLead.css";
import "./ProfessionalDeatils.css";

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

const educationOptions = [
  { value: "No Formal Schooling", label: "No Formal Schooling" },
  { value: "Elementary Graduate", label: "Elementary Graduate" },
  { value: "Highschool Graduate", label: "High School Graduate" },
  { value: " Vocational Graduate", label: "Vocational Graduate" },
  { value: "College Graduate", label: "College Graduate" },
  { value: "Post Graduate", label: "Post Graduate" },
  // { value: "Illiterate / uneducated", label: "Illiterate/Uneducated" },
  { value: "Others", label: "Others" },
];

const professionOptions = [
  { value: "salaried-government", label: "Salaried-Government" },
  { value: "salaried-private", label: "Salaried-Private" },
  { value: "self-employed-professional", label: "Self-Employed Professional" },
  { value: "agriculturist-farmer", label: "Agriculturist/Farmer" },
  { value: "entrepreneur-business-owner", label: "Entrepreneur/Business Owner" },
  { value: "retired", label: "Retired" },
  { value: "student", label: "Student" },
  { value: "housewife", label: "Housewife" },
  { value: "stay-at-home-dad", label: "Stay-At-Home-Dad" },
  { value: "unemployed", label: "Unemployed" },
  { value: "business-owner", label: "Business Owner" },
  { value: "others", label: "Others" },
];

const incomeGroupOptions = [
  { value: "Below ₱ 10,000 ", label: "Below ₱ 10,000" },
  { value: "₱ 10,000 to 30,000", label: "₱ 10,000 to 30,000" },
  { value: "₱ 30,000 to 100,000", label: " ₱ 30,000 to 100,000" },
  { value: "₱ 100,000  to 180,000", label: "₱ 100,000  to 180,000" },
  {
    value: "Above ₱ 180,000",
    label: "Above ₱ 180,000",
  },

  // { value: "More than 20 Lacs", label: "above  20 Lacs" },
];
const vehicleOptions = [
  { value: "2-wheeler", label: "2-Wheeler (Motorcycle/Scooter)" },
  { value: "private-car", label: "Private Car (Sedan/Hatchback)" },
  { value: "suv-mpv-van", label: "SUV/MPV/Van" },
  { value: "truck-commercial", label: "Truck/Commercial Vehicle" },
  { value: "public-transport", label: "Public Transport User (No Vehicle Owned)" },
  { value: "no-vehicle", label: "No Vehicle Owned & No Regular Public Transport Use" },
];

// let personalRoute = "/leadmasterpage/leaddetails/personallead";

const ProfessionalDetails = () => {
  // let leadType = "laRecruitment";

  const dispatch = useDispatch();
  const history = useHistory();
  const [form] = Form.useForm();
  let storeFormData = useSelector((state) => state.newLead.formData);
  const address = storeFormData.address[0];
  let leadType = storeFormData?.leadType;

  let line1 = "";
  let line2 = "";
  let line3 = "";
  if (address !== undefined) {
    line1 = address.line1;
    line2 = address.line2;
    line3 = address.line3;
  }
  let storeEducation = useSelector((state) => state.newLead.formData.education);
  const successMsg = useSelector((state) => state.newLead.successMsg);
  let storeProfessionType = useSelector((state) => state.newLead.formData.professionType);
  let storeIncomeGroup = useSelector((state) => state.newLead.formData.incomeGroup);
  let storeVehicle = useSelector((state) => state.newLead.formData.vehicleInfo[0]);
  let storeLeadId = useSelector((state) => state.leads.currentUpdatingID);

  const storeLeadId2 = useSelector((state) => state.newLead.leadId);
  const id = useSelector((state) => state.login.user.id);

  const [isNewLead, setIsNewLead] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  const [width, setWidth] = useState(window.innerWidth);
  const [educationDetails, setEducationDetails] = useState(storeEducation ? storeEducation : "Select");
  const [vehicle, setVehicle] = useState(storeVehicle.typeofvehicleInsured ? storeVehicle.typeofvehicleInsured : "Select");
  const [professionType, setProfessionType] = useState(storeProfessionType ? storeProfessionType : "Select");
  const [incomeGroup, setIncomeGroup] = useState(storeIncomeGroup ? storeIncomeGroup : "Select");
  const breakpoint = 620;
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

  useEffect(() => {
    if (storeLeadId !== "") {
      setIsNewLead(false);
    }
    form.setFieldsValue({
      education: educationDetails,
      profession: professionType,
      income: incomeGroup,
      incomeGroup: incomeGroup,
    });
  }, [educationDetails, professionType, incomeGroup, form]);

  const educationDetailsHandler = (value) => {
    setEducationDetails(value);
  };
  const professionTypeHandler = (value) => {
    setProfessionType(value);
  };
  const vehicleTypeHandler = (value) => {
    setVehicle(value);
  };
  const incomeGroupHandler = (value) => {
    setIncomeGroup(value);
  };
  const formData = {
    ...storeFormData,

    education: educationDetails,
    profession: professionType,
    professionType: professionType,
    income: incomeGroup,
    incomeGroup: incomeGroup,
    leadCreatorId: id,
    leadOwnerId: id,
    lead_Creator_Id: id,
    lead_Owner_Id: id,
    user_id: id,
    typeofvehicleInsured: vehicle,
    line1: line1,
    line2: line2,
    line3: line3,

    // vehicleInfo: [
    //   {
    //     typeofvehicleInsured: vehicle,
    //   },
    // ],
  };
  const failedHandler = (error) => {
    alert(error);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    // if (!storeLeadId) {
    //   dispatch(actions.storeLead(formData));

    //   // alert('New Lead Updated Successfully')
    //   // history.push('contactlead')

    //   setIsNewLead(false);
    // } else {
    dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
      if (res.type === "EDIT_LEAD_SUCCESS") {
        setErrorMessage(successMsg);
        setIsNewLead(false);
      } else if (res.type === "EDIT_LEAD_FAIL") {
        failedHandler(res.error);
      }
    });
    // alert(' Lead Updated Successfully')
    // history.push('contactlead')
    // alert("New Lead Updated Successfully");

    // history.push("/leadmasterpage/leadhistory");
    history.push("/leadMaster/all_leads");

    // dispatch(actions.storeLead(formData))
    // if(isNewLead){

    //     alert('New Lead Updated Successfully')
    //     dispatch(actions.editLead(formData, storeLeadId))
    //     history.push('existingLead')

    //     setIsNewLead(false)
    // }else{

    //     alert(' Lead Updated Successfully')
    //     history.push('existingLead')

    // }
  };
  const proceedHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
      if (res.type === "EDIT_LEAD_SUCCESS") {
        setErrorMessage(successMsg);
        setIsNewLead(false);
      } else if (res.type === "EDIT_LEAD_FAIL") {
        failedHandler(res.error);
      }
    });

    dispatch(actions.storeLead(formData));
    history.push("existingLead");
  };

  const prevdHandler = (event) => {
    event.preventDefault();
    dispatch(actions.storeLead(formData));
    history.push("contactlead");
  };
  const updateHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editLead(formData, storeLeadId));
    history.push("existingLead");

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
  }, [width]);
  return (
    <>
      <div className="leadtapf">
        <Tabs
          // className="tabs"
          tabMenu={_leadID ? tabMenu : tabMenu2}
          tabBarGutter={0}
          header="New Lead"
          // detailsRouteTab={personalRoute}
          activeKey="2"
        />
      </div>

      <div className="form-container1">
        <Form
          // layout="horizontal"
          // className="contact-detail-form"
          initialValues={{
            education: educationDetails,
            profession: professionType,
            income: incomeGroup,
          }}
          onFinish={submitHandler}
          onFinishFailed={failedHandler}
        >
          <Row gutter={[0, 30]} justify={width > breakpoint ? "" : "center"}>
            <LeadDetailsTab activeKey="3" />
            <Col
              // className="form-body p40 "
              className="form-body  p50 mb-2"
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
              // style={{
              //   marginTop: -290,
              //   marginLeft: 150,
              //   backgroundColor: "white",
              // }}
            >
              <p className="form-title">Professional Details</p>
              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item {...formItemLayout} className="form-item-name label-color" name="educationDetails" label="Education" hasFeedback>
                    <Select bordered={false} className="select-box" defaultValue={educationDetails} size="large" options={educationOptions} placeholder="Select" onChange={educationDetailsHandler}></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="professionType"
                    label="Profession Type"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select your Marital Status!",
                      },
                    ]}
                  >
                    <Select bordered={false} className="select-box" size="large" options={professionOptions} placeholder="Select" defaultValue={professionType} onChange={professionTypeHandler}></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="incomeGroup"
                    label="Income Group"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select income!",
                      },
                    ]}
                  >
                    <Select bordered={false} className="select-box" size="large" options={incomeGroupOptions} placeholder="Select " defaultValue={incomeGroup} onChange={incomeGroupHandler}></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="typeofvehicleInsured"
                    label="Vehicle Type"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select Vehicle",
                      },
                    ]}
                  >
                    <Select bordered={false} className="select-box" size="large" options={vehicleOptions} placeholder="Select " defaultValue={vehicle} onChange={vehicleTypeHandler}></Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <div className="professional">
              <Col className="form-body p1300" xs={{ order: 5 }} sm={24} md={16} lg={15} xl={15} span={23} offset={width > breakpoint ? 6 : 0}>
                <div className="child">
                  <Button
                    onClick={prevdHandler}
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
                    icon={<ArrowLeftOutlined />}
                  >
                    Previous
                  </Button>
                  {/* {leadType === "LA Recruitment" ||
                leadType === "OP Recruitment" ?
                (
                  <Button
                    type="primary"
                    // shape="round"
                    className="last-btn-1"
                    size="large"
                    style={{
                      backgroundColor: "rgb(59, 55, 30)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    icon={<FileTextOutlined />}
                    onClick={submitHandler}
                    htmlType="submit"
                  >
                    Submit
                  </Button>
                ) :
                (
                  <Button
                    className="last-btn-1"
                    type="primary"
                    // shape="round"
                    onClick={proceedHandler}
                    // size="large"
                    style={{
                      backgroundColor: "rgb(59, 55, 30)",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      // marginLeft: 70,
                    }}
                    icon={<ArrowRightOutlined />}
                  >
                    Next
                  </Button>
                )
                } */}
                  <Button
                    type="primary"
                    // shape="round"
                    className="last-btn-1"
                    size="large"
                    style={{
                      backgroundColor: "#1D428A",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                    }}
                    // icon={}
                    onClick={submitHandler}
                    htmlType="submit"
                  >
                    Submit <FileTextOutlined />
                  </Button>
                </div>

                {/* <Col xs={12} sm={12} md={4}> */}
                {/* <Form.Item>
                                            <Button
                                                className="last-btn-22"
                                                type="primary"
                                                // shape="round"
                                                size="large"
                                                style={{ backgroundColor: 'rgb(59, 55, 30)', border: 'none' }}
                                                icon={<FileTextOutlined />} htmlType="submit"
                                                // disabled={!formIsValid}
                                                // onClick={updateHandler}
                                            >Update</Button>
                                        </Form.Item> */}
                {/* </Col> */}
                {/* <Col xs={12} sm={12} md={4}>
                    <Form.Item>
                      <Button
                        className="last-btn-33"
                        type="primary"
                        // shape="round"
                        size="large"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          border: "none",
                        }}
                        icon={<ArrowRightOutlined />}
                        htmlType="submit"
                        onClick={proceedHandler}
                      >
                        Proceed
                      </Button>
                    </Form.Item>
                  </Col> */}
              </Col>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default React.memo(ProfessionalDetails);
