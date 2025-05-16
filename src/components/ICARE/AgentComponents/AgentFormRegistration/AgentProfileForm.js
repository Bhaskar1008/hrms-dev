import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  message
} from "antd";
import React from "react";
import { useState, useEffect } from "react";
import * as actions from "../../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux"
import moment from "moment";


const AgentProfileForm = ({messageData, setClose}) => {
  
  let accountFormProps = messageData 
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState(""); 
  const [homeAddress, setHomeAddress] = useState("");
  const [landLineNumber, setLandLineNumber] = useState("");
  const [Preferred, setPreferred] = useState("");
  const [unitManager, setUnitManager] = useState("")
  const [nonLife, setNonLife] = useState(false)
  const [rating, setRating] = useState("")
  const [dateofExam, setDateofExam] = useState("")
  const [venueofExam, setVenueofExam] = useState("")
  const [doyouhave, setDoyouhave] = useState(false)
  const [companyName, setCompanyName] = useState("")  
  const [companyName1, setCompanyName1] = useState("")
  const [oonaInsurance, setOonaInsurance] = useState(false)
  const [oonaInsuranceAnyBody, setOonaInsuranceAnyBody] = useState(false)
  const [Name, setName] = useState("")
  const [Relationship, setRelationship]= useState("")
  const [formeragent, setFormeragent] = useState(false)
  const [agentCode, setAgentCode] = useState("")
  const [Years, setYears]= useState("")

  // lisense data====
  const AllFormLicenseData = useSelector((state) => state?.agentOnBoardingRegister?.LisenceForm);
  const licenseForm = AllFormLicenseData?.licensedAgentProfileForm;

  // aafililate  data ====
  const AllFormAafililateData = useSelector((state) => state?.agentOnBoardingRegister?.LisenceForm);
  const AfilicateForm = AllFormAafililateData?.AffiliatesAgentProfileForm
  console.log("AllFormAafililateData", AfilicateForm, licenseForm);

  useEffect(() => {

    if (AfilicateForm === undefined && licenseForm === undefined) {
      setFullName("");
    setEmailAddress( "");
    setHomeAddress("");
    setLandLineNumber( "");
    setPreferred("");
    setUnitManager("");
    setNonLife( false); // boolean
    setRating("");
    setDateofExam("");
    setVenueofExam("");
    setDoyouhave(false);
    setCompanyName("");
    // setCompanyName1(licenseForm?.fullName);
    setOonaInsurance(false);
    // setOonaInsuranceAnyBody(licenseForm?.fullName);
    setName("");
    setRelationship("");
    setFormeragent(false);
    setAgentCode( "");
    setYears( "");

    form.setFieldsValue({
      fullName: "",
      emailAddress: "",
      homeAddress: "",
      landLineNumber: "",
      Preferred:  "",
      unitManager: "",
      nonLife:  false,
      rating: "",
      dateofExam: "",
      venueofExam: "",
      doyouhave: false,
      companyName: "",
      // companyName1: licenseForm?.fullName,
      oonaInsurance: false,
      // oonaInsuranceAnyBody: licenseForm?.fullName,
      Name: "",
      Relationship: "",
      formeragent: false,
      agentCode:  "",
      Years:  ""
    })
    }
    
    if (accountFormProps === 'licenced') {
    setFullName(licenseForm?.fullName ? licenseForm?.fullName : "");
    setEmailAddress(licenseForm?.email ? licenseForm?.email : "");
    setHomeAddress(licenseForm?.homeorBusinessAddress ? licenseForm?.homeorBusinessAddress : "");
    setLandLineNumber(licenseForm?.landlineorMobileNumber ? licenseForm?.landlineorMobileNumber : "");
    setPreferred(licenseForm?.preferredOonaSalesOffice ? licenseForm?.preferredOonaSalesOffice : "");
    setUnitManager(licenseForm?.nameofRecruiterorUnitManager ? licenseForm?.nameofRecruiterorUnitManager : "");
    setNonLife(licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission : false); // boolean
    setRating(licenseForm?.rating ? licenseForm?.rating : "");
    setDateofExam(licenseForm?.dateofExam ? licenseForm?.dateofExam : "");
    setVenueofExam(licenseForm?.venueofExam ? licenseForm?.venueofExam : "");
    setDoyouhave(licenseForm?.NON_Life_InsuranceCompanyStillConnected ? licenseForm?.NON_Life_InsuranceCompanyStillConnected : false);
    setCompanyName(licenseForm?.IfYesCompanyName ? licenseForm?.IfYesCompanyName : "");
    // setCompanyName1(licenseForm?.fullName);
    setOonaInsurance(licenseForm?.isAgent_related_to_OonaInsurance ? licenseForm?.isAgent_related_to_OonaInsurance : false);
    // setOonaInsuranceAnyBody(licenseForm?.fullName);
    setName(licenseForm?.relatedAgentName ? licenseForm?.relatedAgentName : "");
    setRelationship(licenseForm?.relationWithAgent ? licenseForm?.relationWithAgent : "");
    setFormeragent(licenseForm?.formerAgent_or_OonaEmploye ? licenseForm?.formerAgent_or_OonaEmploye : false);
    setAgentCode(licenseForm?.priviouseAgentCodeorEmployeeNumber ? licenseForm?.priviouseAgentCodeorEmployeeNumber : "");
    setYears(licenseForm?.numberOfYearsAffiliated ? licenseForm?.numberOfYearsAffiliated : "");

    form.setFieldsValue({
      fullName: licenseForm?.fullName ? licenseForm?.fullName : "",
      emailAddress: licenseForm?.email ? licenseForm?.email : "",
      homeAddress: licenseForm?.homeorBusinessAddress ? licenseForm?.homeorBusinessAddress : "",
      landLineNumber: licenseForm?.landlineorMobileNumber ? licenseForm?.landlineorMobileNumber : "",
      Preferred: licenseForm?.preferredOonaSalesOffice ? licenseForm?.preferredOonaSalesOffice : "",
      unitManager: licenseForm?.nameofRecruiterorUnitManager ? licenseForm?.nameofRecruiterorUnitManager : "",
      nonLife: licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission : false,
      rating: licenseForm?.rating ? licenseForm?.rating : "",
      dateofExam: licenseForm?.dateofExam ? licenseForm?.dateofExam : "",
      venueofExam: licenseForm?.venueofExam ? licenseForm?.venueofExam : "",
      doyouhave: licenseForm?.NON_Life_InsuranceCompanyStillConnected ? licenseForm?.NON_Life_InsuranceCompanyStillConnected : false,
      companyName: licenseForm?.IfYesCompanyName ? licenseForm?.IfYesCompanyName : "",
      // companyName1: licenseForm?.fullName,
      oonaInsurance: licenseForm?.isAgent_related_to_OonaInsurance ? licenseForm?.isAgent_related_to_OonaInsurance : false,
      // oonaInsuranceAnyBody: licenseForm?.fullName,
      Name: licenseForm?.relatedAgentName ? licenseForm?.relatedAgentName : "",
      Relationship: licenseForm?.relationWithAgent ? licenseForm?.relationWithAgent : "",
      formeragent: licenseForm?.formerAgent_or_OonaEmploye ? licenseForm?.formerAgent_or_OonaEmploye : false,
      agentCode: licenseForm?.priviouseAgentCodeorEmployeeNumber ? licenseForm?.priviouseAgentCodeorEmployeeNumber : "",
      Years: licenseForm?.numberOfYearsAffiliated ? licenseForm?.numberOfYearsAffiliated : ""
    })
  }else{
    setFullName(AfilicateForm?.fullName ? AfilicateForm?.fullName : "");
    setEmailAddress(AfilicateForm?.email ? AfilicateForm?.email : "");
    setHomeAddress(AfilicateForm?.homeorBusinessAddress ? AfilicateForm?.homeorBusinessAddress : "");
    setLandLineNumber(AfilicateForm?.landlineorMobileNumber ? AfilicateForm?.landlineorMobileNumber : "");
    setPreferred(AfilicateForm?.preferredOonaSalesOffice ? AfilicateForm?.preferredOonaSalesOffice : "");
    setUnitManager(AfilicateForm?.nameofRecruiterorUnitManager ? AfilicateForm?.nameofRecruiterorUnitManager : "");
    setNonLife(AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission : false); // boolean
    setRating(AfilicateForm?.rating ? AfilicateForm?.rating : "");
    setDateofExam(AfilicateForm?.dateofExam ? AfilicateForm?.dateofExam : "");
    setVenueofExam(AfilicateForm?.venueofExam ? AfilicateForm?.venueofExam : "");
    setDoyouhave(AfilicateForm?.NON_Life_InsuranceCompanyStillConnected ? AfilicateForm?.NON_Life_InsuranceCompanyStillConnected : false);
    setCompanyName(AfilicateForm?.IfYesCompanyName ? AfilicateForm?.IfYesCompanyName : "");
    // setCompanyName1(AfilicateForm?.fullName);
    setOonaInsurance(AfilicateForm?.isAgent_related_to_OonaInsurance ? AfilicateForm?.isAgent_related_to_OonaInsurance : false);
    // setOonaInsuranceAnyBody(AfilicateForm?.fullName);
    setName(AfilicateForm?.relatedAgentName ? AfilicateForm?.relatedAgentName : "");
    setRelationship(AfilicateForm?.relationWithAgent ? AfilicateForm?.relationWithAgent : "");
    setFormeragent(AfilicateForm?.formerAgent_or_OonaEmploye ? AfilicateForm?.formerAgent_or_OonaEmploye : false);
    setAgentCode(AfilicateForm?.priviouseAgentCodeorEmployeeNumber ? AfilicateForm?.priviouseAgentCodeorEmployeeNumber : "");
    setYears(AfilicateForm?.numberOfYearsAffiliated ? AfilicateForm?.numberOfYearsAffiliated : "");

    form.setFieldsValue({
      fullName: AfilicateForm?.fullName ? AfilicateForm?.fullName : "",
      emailAddress: AfilicateForm?.email ? AfilicateForm?.email : "",
      homeAddress: AfilicateForm?.homeorBusinessAddress ? AfilicateForm?.homeorBusinessAddress : "",
      landLineNumber: AfilicateForm?.landlineorMobileNumber ? AfilicateForm?.landlineorMobileNumber : "",
      Preferred: AfilicateForm?.preferredOonaSalesOffice ? AfilicateForm?.preferredOonaSalesOffice : "",
      unitManager: AfilicateForm?.nameofRecruiterorUnitManager ? AfilicateForm?.nameofRecruiterorUnitManager : "",
      nonLife: AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission : false,
      rating: AfilicateForm?.rating ? AfilicateForm?.rating : "",
      dateofExam: AfilicateForm?.dateofExam ? AfilicateForm?.dateofExam : "",
      venueofExam: AfilicateForm?.venueofExam ? AfilicateForm?.venueofExam : "",
      doyouhave: AfilicateForm?.NON_Life_InsuranceCompanyStillConnected ? AfilicateForm?.NON_Life_InsuranceCompanyStillConnected : false,
      companyName: AfilicateForm?.IfYesCompanyName ? AfilicateForm?.IfYesCompanyName : "",
      // companyName1: AfilicateForm?.fullName,
      oonaInsurance: AfilicateForm?.isAgent_related_to_OonaInsurance ? AfilicateForm?.isAgent_related_to_OonaInsurance : false,
      // oonaInsuranceAnyBody: AfilicateForm?.fullName,
      Name: AfilicateForm?.relatedAgentName ? AfilicateForm?.relatedAgentName : "",
      Relationship: AfilicateForm?.relationWithAgent ? AfilicateForm?.relationWithAgent : "",
      formeragent: AfilicateForm?.formerAgent_or_OonaEmploye ? AfilicateForm?.formerAgent_or_OonaEmploye : false,
      agentCode: AfilicateForm?.priviouseAgentCodeorEmployeeNumber ? AfilicateForm?.priviouseAgentCodeorEmployeeNumber : "",
      Years: AfilicateForm?.numberOfYearsAffiliated ? AfilicateForm?.numberOfYearsAffiliated : ""
    })
  }

  }, [AfilicateForm, licenseForm])
  

  // functions for all forms 
  const onchangefullName = (e) =>{
    setFullName(e.target.value)
  }
  const onchangeEmailAddress = (e) =>{
    setEmailAddress(e.target.value)
  }
  const onchangeHomeAddress = (e) =>{
    setHomeAddress(e.target.value)
  }
  const onchangeLandLineNumber = (e) =>{
    setLandLineNumber(e.target.value)
  }
  const onchangePreferred = (e) =>{
    setPreferred(e)
  }
  const onchangeUnitManager = (e) =>{
    setUnitManager(e.target.value)
  }
  const onchangeNonLife = (e) =>{
    setNonLife(e.target.value)
  }
  const onchangeRating = (e) =>{
    setRating(e.target.value)
  }
  const onchangeDateofExam = (date, dateString) =>{
    const dateFormat = "MM/DD/YYYY"; // Date format
    const formattedDate = moment(dateString).format(dateFormat);
    setDateofExam(formattedDate)
  }
  const onchangeVenueofExam = (e) =>{
    setVenueofExam(e.target.value)
  }
  const onchangeDoyouhave = (e) =>{
    setDoyouhave(e.target.value)
  }
  const onchangeCompanyName = (e) =>{
    setCompanyName(e.target.value)
  }
  const onchangeCompanyName1 = (e) =>{
    setCompanyName1(e.target.value)
  }
  
  const onchangeOonaInsurance = (e) =>{
    setOonaInsurance(e.target.value)
  }
  const onchangeoonaInsuranceAnyBody = (e) =>{
    setOonaInsuranceAnyBody(e.target.value)
  }
  const onchangeName = (e) =>{
    setName(e.target.value)
  }
  const onchangeRelationship = (e) =>{
    setRelationship(e.target.value)
  }
  const onchangeFormeragent = (e) =>{
    setFormeragent(e.target.value)
  }
  const onchangeAgentCode = (e) =>{
    setAgentCode(e.target.value)
  }
  const onchangeYears = (e) =>{
    setYears(e)
  }

  const onFinishFailed = () => {
    if (accountFormProps === 'licenced') {
      message.error('Please Fill Mandtory Form!');
    }else{
      message.error('Please Fill Mandtory Form!');
    }
  };

const SubmitLisenceForm = (formData) =>{
  
  if (accountFormProps === 'licenced') {
    
    formData = {
      licensedAgentProfileForm: {
        fullName: fullName,
        email: emailAddress,
        homeorBusinessAddress: homeAddress, //string
        landlineorMobileNumber: landLineNumber, //string
        preferredOonaSalesOffice: Preferred, //string
        nameofRecruiterorUnitManager: unitManager, // string
        
        pass_NonLifeLicensureExam_byInsuranceCommission: nonLife, //Must Be Bolean
        rating: rating, //Must Be Number
        dateofExam: dateofExam, //String
        venueofExam: venueofExam, //String

        NON_Life_InsuranceCompanyStillConnected: doyouhave, //Boolean
        IfYesCompanyName: companyName, //String
        isAgent_related_to_OonaInsurance: oonaInsurance, //Boolean
        relatedAgentName: Name, //String
        relationWithAgent: Relationship, //String
        formerAgent_or_OonaEmploye: formeragent, //Boolean
        priviouseAgentCodeorEmployeeNumber: agentCode, //String
        numberOfYearsAffiliated: Years, //Number
    },
    }
  }else{
    formData = {
      AffiliatesAgentProfileForm:{
        fullName: fullName,
        email: emailAddress,
        homeorBusinessAddress: homeAddress, //string
        landlineorMobileNumber: landLineNumber, //string
        preferredOonaSalesOffice: Preferred, //string
        nameofRecruiterorUnitManager: unitManager, // string
        pass_NonLifeLicensureExam_byInsuranceCommission: nonLife, //Must Be Bolean
        rating: rating, //Must Be Number
        dateofExam: dateofExam, //String
        venueofExam: venueofExam, //String
        NON_Life_InsuranceCompanyStillConnected: doyouhave, //Boolean
        IfYesCompanyName: companyName, //String
        isAgent_related_to_OonaInsurance: oonaInsurance, //Boolean
        relatedAgentName: Name, //String
        relationWithAgent: Relationship, //String
        formerAgent_or_OonaEmploye: formeragent, //Boolean
        priviouseAgentCodeorEmployeeNumber: agentCode, //String
        numberOfYearsAffiliated: Years, //Number
      },
    }
  }
  console.log("formDatat---", formData);
  dispatch(actions.storeAgentONBoardLisenceForm(formData));
  setClose(false)
}
  

  return (
    <div
      className="agent_profile_form"
      style={{ maxWidth: 730, margin: "auto" }}
    >
      <div className="new-agentmitra-registration-f-parent">
        <div
          className="new-agentmitra-registration"
          style={{ fontWeight: 500 }}
        >
          Licensed agent profile form
        </div>
        <i className="indicates-mandatory-fields">
          *Indicates mandatory fields
        </i>
        <div
          className="new-agentmitra-registration"
          style={{ fontWeight: 600 }}
        >
          Basic Information
        </div>
      </div>
      <Form
        form={form}
        name="form_item_path"
        layout="vertical"
        className="mb-3"
        onFinish={SubmitLisenceForm}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row
          className="align-item-stretch"
          style={{ marginTop: "24px" }}
          gutter={[16, { xs: 16, sm: 10, md: 16, lg: 16 }]}
        >
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Full Name is required",
                },
                {
                  message: "Only Alphabets are Allowed",
                  pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/),
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter full name"
                name="full_name"
                value={fullName}
                onChange={(e) =>
                  onchangefullName((e))
                }
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Email Address"
              name="emailAddress"
              rules={[
                {
                  required: true,
                  message: "Email is required.",
                },
                {
                  message: "Enter valid email address",
                  pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter email address"
                onChange={(e) =>
                  onchangeEmailAddress((e))
                }
                value={emailAddress}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              label="Home/Business Address"
              name="homeAddress"
              rules={[
                {
                  required: true,
                  message: "Home/Business Address is required.",
                },
              ]}
              
            >
              <Input
                size="large"
                placeholder="Enter last name"
                onChange={(e) =>
                  onchangeHomeAddress((e))
                }
                value={homeAddress}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Landline/Mobile Number"
              name="landLineNumber"
              rules={[
                {
                  required: true,
                  message: "Enter Mobile Number",
                },
                {
                  pattern: new RegExp(/^(0|9)\d{9,11}$/), // Validates 10 to 12 digits starting with 0 or 9.
                  message: "Mobile Number should be 10 to 12 digits and start with 0 or 9 only",
                },
                {
                  validator: (_, value) => {
                    const validPattern = /^[0-9\-]+$/;
                    if (
                      (!validPattern.test(value)) ||
                      (value.startsWith("0") && (value.length < 10 || value.length > 12)) ||
                      (value.startsWith("9") && (value.length < 10 || value.length > 12))
                    ) {
                      return Promise.reject("Invalid mobile number format.");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter"
                onChange={(e) =>
                  onchangeLandLineNumber((e))
                }
                maxLength='10'
                value={landLineNumber}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} style={{position: "relative"}}>
            <Form.Item
              label="Preferred Phillife Sales Office"
              name="Preferred"
              rules={[
                {
                  required: true,
                  message: "Please Phillife sales office",
                },
              ]}
            >
              {/* <Select >
                <Select.Option value="Mumbai">Mumbai</Select.Option>
                <Select.Option value="Chennai">Chennai</Select.Option>
                <Select.Option value="Philipines">Philipines</Select.Option>
              </Select> */}
              <Select
              showSearch
              optionFilterProp="children"
              size="large" placeholder="Select" onChange={(e) => onchangePreferred((e))} value={Preferred}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Name of Recruiter/Unit Manager"
              name="unitManager"
              rules={[
                {
                  required: true,
                  message: "Please Enter Recruiter/Unit Manager",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter"
                suffix={
                  <a
                    style={{
                      letterSpacing: "0.5px",
                      fontWeight: 500,
                      color: "#4ac6bb",
                      cursor: "pointer",
                    }}
                    // onClick={handleVerify}
                  ></a>
                }
                onChange={(e) =>
                  onchangeUnitManager((e))
                }
                value={unitManager}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={24}>
            <div
              className="new-agentmitra-registration-f-parent "
              style={{ fontWeight: 600 }}
            >
              Profile Questions
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              label="Did you pass the Non- Life Licensure Exam given by the Insurance Commission?"
              name="nonLife"
              rules={[
                {
                  required: false,
                  message: "Please Enter Recruiter/Unit Manager",
                },
              ]}
              
            >
              <Radio.Group defaultValue={nonLife} onChange={(e) =>
                  onchangeNonLife((e))
                }
                value={nonLife}
                >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {nonLife === true ? <>
            <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Select",
                },
              ]}
              
            >
              <Select size="large" placeholder="Select"
                onChange={(e) =>
                  onchangeRating((e))
                }
                value={rating}
                ></Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Date of Exam"
              name="dateofExam"
              rules={[
                {
                  required: true,
                  message: "Select",
                },
              ]}
              
            >
              <DatePicker
                size="large"
                placeholder="Select Date"
                style={{ width: "100%" }}
                onChange={(e) =>
                  onchangeDateofExam((e))
                }
                value={dateofExam}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Venue of Exam"
              name="venueofExam"
              rules={[
                {
                  required: true,
                  message: "Enter venue of exam",
                },
              ]}
              
            >
              <Input size="large" placeholder="Enter" onChange={(e) =>
                  onchangeVenueofExam((e))
                }
                value={venueofExam}
                />
            </Form.Item>
          </Col>
          </> : ""}
        
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              label="Do you have other NON- LIFE INSURANCE Company that you represented or are still connected with?"
              name="doyouhave"
              rules={[
                {
                  required: false,
                  message: "Please Enter Recruiter/Unit Manager",
                },
              ]}
              
            >
              <Radio.Group defaultValue={doyouhave} onChange={(e) =>
                  onchangeDoyouhave((e))
                }
                value={doyouhave}
                >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          
          {doyouhave === true ? <>
            <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[
                {
                  required: true,
                  message: "Enter company name",
                },
              ]}
              
            >
              <Input size="large" placeholder="Enter" onChange={(e) =>
                  onchangeCompanyName((e))
                } 
                value={companyName}
                />
            </Form.Item>
          </Col>
          </> : ""}
          

          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              label="Do you have other LIFE INSURANCE Company that you represented or are still connected with?"
              name="oonaInsurance"
              rules={[
                {
                  required: false,
                  message: "Please Enter Recruiter/Unit Manager",
                },
              ]}
              
            >
              <Radio.Group defaultValue={oonaInsurance} onChange={(e) =>
                  onchangeOonaInsurance((e))
                }
                value={oonaInsurance}
                >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {oonaInsurance === true ? <>
            <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Company Name"
              name="companyName1"
              rules={[
                {
                  required: true,
                  message: "Enter company name",
                },
              ]}
              disabled={true}
              
            >
              <Input size="large" placeholder="Enter" onChange={(e) =>
                  onchangeCompanyName1((e))
                }
                value={companyName1}
                />
            </Form.Item>
          </Col>
          </> : ""}
          
          
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              label="Are you related to anybody in Phillife Financial?"
              name="oonaInsuranceAnyBody"
              rules={[
                {
                  required: false,
                  message: "Enter company name",
                },
              ]}
              disabled={true}
              
            >
              <Radio.Group defaultValue={oonaInsuranceAnyBody} onChange={(e) =>
                  onchangeoonaInsuranceAnyBody((e))
                }
                value={oonaInsuranceAnyBody}
                >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          
          {oonaInsuranceAnyBody === true ? <>
            <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Name"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Enter name",
                },
              ]}
              
            >
              <Input size="large" placeholder="Enter" onChange={(e) =>
                  onchangefullName((e))
                }
                value={Name}
                />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Relationship"
              name="Relationship"
              rules={[
                {
                  required: true,
                  message: "Select",
                },
              ]}
              
            >
              <Select size="large" placeholder="Select" onChange={(e) =>
                  onchangeRelationship((e))
                }
                value={Relationship}
                ></Select>
            </Form.Item>
          </Col>
          </> : ""}
          
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              label="Have you been a former agent or an employee of Phillife Financial?"
              name="formeragent"
              rules={[
                {
                  required: false,
                  message: "Enter company name",
                },
              ]}
              disabled={true}
              
            >
              <Radio.Group defaultValue={formeragent} onChange={(e) =>
                  onchangeFormeragent((e))
                }
                value={formeragent}
                >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

        {formeragent === true ? <>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Agent Code/Employee Number"
              name="agentCode"
              rules={[
                {
                  required: true,
                  message: "Enter name",
                },
              ]}
              
            >
              <Input size="large" placeholder="Enter" onChange={(e) =>
                  onchangeAgentCode((e))
                } 
                value={agentCode}
                />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Years Affiliated"
              name="Years"
              rules={[
                {
                  required: true,
                  message: "Select",
                },
              ]}
              
            >
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Select"
                onChange={(e) =>
                  onchangeYears((e))
                }
                value={Years}
              >
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
                <Select.Option value="5">5</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </> : ""}  
        </Row>

        <Col xs={24} sm={24} md={8} lg={4}>
          <div style={{ marginTop: 24 }}>
            <Button
              className="next-button"
              htmlType="submit"
              //  onClick={() => form.submit()}
            >
              Submit
            </Button>
          </div>
        </Col>

      </Form>
    </div>
  );
};

export default AgentProfileForm;
