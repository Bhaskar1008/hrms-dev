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
import _ from "lodash";
import React from "react";
import { useState, useEffect } from "react";
import * as actions from "../../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux"
import moment from "moment";
import axios from "axios";
import apiConfig from "../../../../config/api.config";
import { checkuserAccess, stoageGetter, stoageSetter } from "../../../../helpers";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";

const AgentProfileForm = ({messageData, setClose}) => {
  const { baseURL } = apiConfig;
  let accountFormProps = messageData 
  console.log("accountFormProps", accountFormProps);
  const [form] = Form.useForm();
  let login_user_data = stoageGetter("user");
  const dispatch = useDispatch();
  const emailBind = useSelector((state) => state?.agentOnBoardingRegister?.formData?.email);
  const mobileNumberBind = useSelector((state) => state?.agentOnBoardingRegister?.formData?.mobileNumber);
  const affiliateLicensecFormText = useSelector((state) => state?.agentOnBoardingRegister?.liaffiStore);
  const fullNameFrom = useSelector((state) => state?.agentOnBoardingRegister?.formData);

  let firstName = fullNameFrom?.firstName
  let lastName = fullNameFrom?.lastName
  let middleName = fullNameFrom?.middleName

  let FirstFullName = firstName + " " + lastName
  let seconstFullName = firstName + " " + middleName + " " + lastName

  let FullNameBind = ""
  if (middleName === "") {
    FullNameBind = FirstFullName
  }else{
    FullNameBind = seconstFullName
  }

  const logged_in_user = login_user_data?.firstName + " " + login_user_data?.lastName;

  const [loader, setLoader] = useState(false)
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState(emailBind !== undefined ? emailBind : ""); 
  const [homeAddress, setHomeAddress] = useState("");
  const [landLineNumber, setLandLineNumber] = useState("");
  const [Preferred, setPreferred] = useState("");
  const [PreferredName, setPreferredName] = useState("");
  const [PreferredNameSignUpa, setPreferredNameSignUpa] = useState("HEAD OFFICE DIRECT OFFICE")
  const [unitManager, setUnitManager] = useState("")
  const [nonLife, setNonLife] = useState(true)
  const [rating, setRating] = useState("")
  const [dateofExam, setDateofExam] = useState("")
  const [venueofExam, setVenueofExam] = useState("")
  const [doyouhave, setDoyouhave] = useState(true)
  const [companyName, setCompanyName] = useState("")  
  const [companyName1, setCompanyName1] = useState("")
  const [oonaInsurance, setOonaInsurance] = useState(true)
  const [oonaInsuranceAnyBody, setOonaInsuranceAnyBody] = useState(true)
  const [relatedAgentName, setRelatedAgentName]  = useState("")
  const [Relationship, setRelationship]= useState("")
  const [formeragent, setFormeragent] = useState(true)
  const [agentCode, setAgentCode] = useState("")
  const [Years, setYears]= useState("")
  const [salesOfficeData, setSalesOfficeData] = useState([])

  const agentCodelisting = useSelector((state) => state?.agentOnBoardingRegister?.formData?.referedAgentCode);
  const agentCodelistingAgain = useSelector((state) => state?.cipherStore?.SaveCipherTEXT?.formData?.data?.agentCode);

  
  
  // lisense data====
  const AllFormLicenseData = useSelector((state) => state?.AOBLicenceAffiliat?.formData);
  const AllFormLicenseDataQC = useSelector((state) => state?.AOBLicenceAffiliat?.formData?.agentData);
  
  var licenseForm = "" 
   if (AllFormLicenseDataQC !== undefined && AllFormLicenseDataQC?.length > 0 && AllFormLicenseDataQC[0]?.adminAction_OnAppliction === "Returned") {
     licenseForm = AllFormLicenseDataQC[0]?.licensedAgentProfileForm
   } else {
    licenseForm = AllFormLicenseData?.licensedAgentProfileForm 
   }

  var DisableFilesData = ""
  if (AllFormLicenseDataQC !== undefined && AllFormLicenseDataQC[0]?.latest_RaisedQC !== undefined) {
    DisableFilesData = AllFormLicenseDataQC[0]?.latest_RaisedQC
  }else{
    DisableFilesData = AllFormLicenseDataQC !== undefined ? AllFormLicenseDataQC[0]?.QC_Discrepancy : ""
  }

  const checkFormDisable=(formValue)=>{
    const index = AllFormLicenseDataQC !== undefined && DisableFilesData?.findIndex((x)=>x.title === formValue)
    if(index === -1){
      // setDisanleFiled(true)
      return true}
    else{
      // setDisanleFiled(true)
      return false
    }
  }
  // const licenseForm = ;
  console.log("licenseForm-------------------", licenseForm);
  // aafililate  data ====
  
  const AllFormAafililateData = useSelector((state) => state?.AOBLicenceAffiliat?.formData);
  const AllFormAafililateDataQC = useSelector((state) => state?.AOBLicenceAffiliat?.formData?.agentData);

  var AfilicateForm = "" 
   if (AllFormAafililateDataQC !== undefined && AllFormAafililateDataQC?.length > 0 && AllFormAafililateDataQC[0]?.adminAction_OnAppliction === "Returned") {
     AfilicateForm = AllFormAafililateDataQC[0]?.AffiliatesAgentProfileForm
  } else {
    AfilicateForm = AllFormAafililateData?.AffiliatesAgentProfileForm
  }

  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  const cypherAgentKey = useSelector((state) => state?.GetAgentCypherStore?.registerKey);
  useEffect(() => {
    // salesOfficeFunction()

    // if (AfilicateForm === undefined && licenseForm === undefined) {
    // setFullName("");
    // setEmailAddress(emailBind ? emailBind : "");
    // setHomeAddress("");
    // setLandLineNumber( "");
    // setPreferred([]);
    // setUnitManager("");
    // setNonLife(true); // boolean
    // setRating("");
    // setDateofExam("");
    // setVenueofExam("");
    // setDoyouhave(true);
    // setCompanyName("");
    // // setCompanyName1(licenseForm?.fullName);
    // setOonaInsurance(true);
    // // setOonaInsuranceAnyBody(licenseForm?.fullName);
    // setRelatedAgentName("");
    // setRelationship("");
    // setFormeragent(true);
    // setAgentCode( "");
    // setYears( "");

    // form.setFieldsValue({
    //   fullName: "",
    //   emailAddress: emailBind ? emailBind : "",
    //   homeAddress: "",
    //   landLineNumber: "",
    //   Preferred:  "",
    //   unitManager: "",
    //   nonLife:  true,
    //   rating: "",
    //   dateofExam: "",
    //   venueofExam: "",
    //   doyouhave: true,
    //   companyName: "",
    //   // companyName1: licenseForm?.fullName,
    //   oonaInsurance: true,
    //   // oonaInsuranceAnyBody: licenseForm?.fullName,
    //   relatedAgentName: "",
    //   Relationship: "",
    //   formeragent: true,
    //   agentCode:  "",
    //   Years:  ""
    // })

    
    // }
    
    if (accountFormProps === 'licenced') {
    form.setFieldsValue({
      PreferredNameSignUpa:"HEAD OFFICE DIRECT OFFICE",
      fullName: licenseForm?.fullName !== undefined ? licenseForm?.fullName : FullNameBind,
      emailAddress: emailBind !== undefined ? emailBind : licenseForm?.email,
      homeAddress: licenseForm?.homeorBusinessAddress ? licenseForm?.homeorBusinessAddress : "",
      landLineNumber: mobileNumberBind !== undefined ? mobileNumberBind : licenseForm?.landlineorMobileNumber,
      Preferred: licenseForm?.preferredOonaSalesOffice ? licenseForm?.preferredOonaSalesOffice : "",
      PreferredName: licenseForm?.preferredOonaSalesOfficeName ? licenseForm?.preferredOonaSalesOfficeName : "",
      unitManager: licenseForm?.nameofRecruiterorUnitManager !== undefined ? licenseForm?.nameofRecruiterorUnitManager : logged_in_user,
      nonLife: licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission : true,
      rating: licenseForm?.rating ? licenseForm?.rating : "",
      dateofExam: licenseForm?.dateofExam ? moment(licenseForm?.dateofExam, "MM/DD/YYYY") : null,
      venueofExam: licenseForm?.venueofExam ? licenseForm?.venueofExam : "",
      doyouhave: licenseForm?.NON_Life_InsuranceCompanyStillConnected ? licenseForm?.NON_Life_InsuranceCompanyStillConnected : true ,
      companyName: licenseForm?.IfYesCompanyName ? licenseForm?.IfYesCompanyName : "",
      
      oonaInsurance: licenseForm?.life_InsuranceCompanyStillConnected ? licenseForm?.life_InsuranceCompanyStillConnected : true ,
      companyName1: licenseForm?.IfYesCompanyNameLife ? licenseForm?.IfYesCompanyNameLife : "",

      oonaInsuranceAnyBody: licenseForm?.isAgent_related_to_OonaInsurance ? licenseForm?.isAgent_related_to_OonaInsurance : true,
      relatedAgentName: licenseForm?.relatedAgentName ? licenseForm?.relatedAgentName : "",
      Relationship: licenseForm?.relationWithAgent ? licenseForm?.relationWithAgent : "",
      formeragent: licenseForm?.formerAgent_or_OonaEmploye ? licenseForm?.formerAgent_or_OonaEmploye :  true,

      agentCode: licenseForm?.priviouseAgentCodeorEmployeeNumber ? licenseForm?.priviouseAgentCodeorEmployeeNumber : "",
      Years: licenseForm?.numberOfYearsAffiliated ? licenseForm?.numberOfYearsAffiliated : ""
    })
    

    setPreferredNameSignUpa("HEAD OFFICE DIRECT OFFICE")
    setFullName(licenseForm?.fullName !== undefined ? licenseForm?.fullName : FullNameBind);
    setEmailAddress(emailBind !== undefined ? emailBind : licenseForm?.email);
    setHomeAddress(licenseForm?.homeorBusinessAddress ? licenseForm?.homeorBusinessAddress : "");
    setLandLineNumber(mobileNumberBind !== undefined ? mobileNumberBind : licenseForm?.landlineorMobileNumber);
    setPreferred(licenseForm?.preferredOonaSalesOffice ? licenseForm?.preferredOonaSalesOffice : "");
    setPreferredName(licenseForm?.preferredOonaSalesOfficeName ? licenseForm?.preferredOonaSalesOfficeName : "");
    setUnitManager(licenseForm?.nameofRecruiterorUnitManager !== undefined ? licenseForm?.nameofRecruiterorUnitManager :  logged_in_user);
    setNonLife(licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? licenseForm?.pass_NonLifeLicensureExam_byInsuranceCommission : true ); // boolean
    setRating(licenseForm?.rating ? licenseForm?.rating : "");
    setDateofExam(licenseForm?.dateofExam ? moment(licenseForm?.dateofExam, "MM/DD/YYYY") : null);
    setVenueofExam(licenseForm?.venueofExam ? licenseForm?.venueofExam : "");
    setDoyouhave(licenseForm?.NON_Life_InsuranceCompanyStillConnected ? licenseForm?.NON_Life_InsuranceCompanyStillConnected : true);
    setCompanyName(licenseForm?.IfYesCompanyName ? licenseForm?.IfYesCompanyName : "");
    
    setOonaInsurance(licenseForm?.life_InsuranceCompanyStillConnected ? licenseForm?.life_InsuranceCompanyStillConnected : true );
    setCompanyName1(licenseForm?.IfYesCompanyNameLife ? licenseForm?.IfYesCompanyNameLife : "");

    setOonaInsuranceAnyBody(licenseForm?.isAgent_related_to_OonaInsurance ? licenseForm?.isAgent_related_to_OonaInsurance : true);
    setRelatedAgentName(licenseForm?.relatedAgentName ? licenseForm?.relatedAgentName : "");
    setRelationship(licenseForm?.relationWithAgent ? licenseForm?.relationWithAgent : "");
    setFormeragent(licenseForm?.formerAgent_or_OonaEmploye ? licenseForm?.formerAgent_or_OonaEmploye : true);
    setAgentCode(licenseForm?.priviouseAgentCodeorEmployeeNumber ? licenseForm?.priviouseAgentCodeorEmployeeNumber : "");
    setYears(licenseForm?.numberOfYearsAffiliated ? licenseForm?.numberOfYearsAffiliated : "");


  }else{
    
    form.setFieldsValue({
      PreferredNameSignUpa:"HEAD OFFICE DIRECT OFFICE",
      fullName: AfilicateForm?.fullName !== undefined ? AfilicateForm?.fullName : FullNameBind,
      emailAddress: emailBind !== undefined ? emailBind : AfilicateForm?.email,
      homeAddress: AfilicateForm?.homeorBusinessAddress ? AfilicateForm?.homeorBusinessAddress : "",
      landLineNumber: mobileNumberBind !== undefined ? mobileNumberBind : AfilicateForm?.landlineorMobileNumber,
      Preferred: AfilicateForm?.preferredOonaSalesOffice ? AfilicateForm?.preferredOonaSalesOffice : "",
      PreferredName: AfilicateForm?.preferredOonaSalesOfficeName ? AfilicateForm?.preferredOonaSalesOfficeName : "",
      unitManager: AfilicateForm?.nameofRecruiterorUnitManager !== undefined ? AfilicateForm?.nameofRecruiterorUnitManager : logged_in_user,
      nonLife: AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission : true ,
      rating: AfilicateForm?.rating ? AfilicateForm?.rating : "",
      dateofExam: AfilicateForm?.dateofExam ? moment(AfilicateForm?.dateofExam, "MM/DD/YYYY") : null,
      venueofExam: AfilicateForm?.venueofExam ? AfilicateForm?.venueofExam : "",

      doyouhave: AfilicateForm?.NON_Life_InsuranceCompanyStillConnected ? AfilicateForm?.NON_Life_InsuranceCompanyStillConnected : true ,
      companyName: AfilicateForm?.IfYesCompanyName ? AfilicateForm?.IfYesCompanyName : "",
      
      oonaInsurance: AfilicateForm?.life_InsuranceCompanyStillConnected ? AfilicateForm?.life_InsuranceCompanyStillConnected : true ,
      companyName1: AfilicateForm?.IfYesCompanyNameLife ? AfilicateForm?.IfYesCompanyNameLife : "",

      oonaInsuranceAnyBody: AfilicateForm?.isAgent_related_to_OonaInsurance ? AfilicateForm?.isAgent_related_to_OonaInsurance : true,
      relatedAgentName: AfilicateForm?.relatedAgentName ? AfilicateForm?.relatedAgentName : "",
      Relationship: AfilicateForm?.relationWithAgent ? AfilicateForm?.relationWithAgent : "",
      formeragent: AfilicateForm?.formerAgent_or_OonaEmploye ? AfilicateForm?.formerAgent_or_OonaEmploye  : true,
      agentCode: AfilicateForm?.priviouseAgentCodeorEmployeeNumber ? AfilicateForm?.priviouseAgentCodeorEmployeeNumber : "",
      Years: AfilicateForm?.numberOfYearsAffiliated ? AfilicateForm?.numberOfYearsAffiliated : ""
    })
    setPreferredNameSignUpa("HEAD OFFICE DIRECT OFFICE")
    setFullName(AfilicateForm?.fullName !== undefined ? AfilicateForm?.fullName : FullNameBind);
    setEmailAddress(emailBind !== undefined ? emailBind : AfilicateForm?.email);
    setHomeAddress(AfilicateForm?.homeorBusinessAddress ? AfilicateForm?.homeorBusinessAddress : "");
    setLandLineNumber(mobileNumberBind !== undefined ? mobileNumberBind : AfilicateForm?.landlineorMobileNumber);
    setPreferred(AfilicateForm?.preferredOonaSalesOffice ? AfilicateForm?.preferredOonaSalesOffice : "");
    setPreferredName(AfilicateForm?.preferredOonaSalesOfficeName ? AfilicateForm?.preferredOonaSalesOfficeName : "");
    setUnitManager(AfilicateForm?.nameofRecruiterorUnitManager !== undefined ? AfilicateForm?.nameofRecruiterorUnitManager : logged_in_user);
    setNonLife(AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission ? AfilicateForm?.pass_NonLifeLicensureExam_byInsuranceCommission : true ); // boolean
    setRating(AfilicateForm?.rating ? AfilicateForm?.rating : "");
    setDateofExam(AfilicateForm?.dateofExam ? moment(AfilicateForm?.dateofExam, "MM/DD/YYYY") : null);
    setVenueofExam(AfilicateForm?.venueofExam ? AfilicateForm?.venueofExam : "");
    setDoyouhave(AfilicateForm?.NON_Life_InsuranceCompanyStillConnected ? AfilicateForm?.NON_Life_InsuranceCompanyStillConnected : true );
    setCompanyName(AfilicateForm?.IfYesCompanyName ? AfilicateForm?.IfYesCompanyName : "");
    
    setOonaInsurance(AfilicateForm?.life_InsuranceCompanyStillConnected ? AfilicateForm?.life_InsuranceCompanyStillConnected : true);
    setCompanyName1(AfilicateForm?.IfYesCompanyNameLife ? AfilicateForm?.IfYesCompanyNameLife : "");

    setOonaInsuranceAnyBody(AfilicateForm?.isAgent_related_to_OonaInsurance ? AfilicateForm?.isAgent_related_to_OonaInsurance : true);
    setRelatedAgentName(AfilicateForm?.relatedAgentName ? AfilicateForm?.relatedAgentName : "");
    setRelationship(AfilicateForm?.relationWithAgent ? AfilicateForm?.relationWithAgent : "");
    setFormeragent(AfilicateForm?.formerAgent_or_OonaEmploye ? AfilicateForm?.formerAgent_or_OonaEmploye  : true);
    setAgentCode(AfilicateForm?.priviouseAgentCodeorEmployeeNumber ? AfilicateForm?.priviouseAgentCodeorEmployeeNumber : "");
    setYears(AfilicateForm?.numberOfYearsAffiliated ? AfilicateForm?.numberOfYearsAffiliated : "");

  }

  }, [])
  

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
  const onchangePreferred = (e, key) =>{
    setPreferred(e.value)
    setPreferredName(e.key)
  }
  const onchangeUnitManager = (e) =>{
    setUnitManager(e.target.value)
  }
  const onchangeNonLife = (e) =>{
    setNonLife(e.target.value)

    if (e.target.value === false) {
      form.setFieldsValue({
        rating: "",
        venueofExam: "",
        dateofExam: null
      });

      setRating("");
      setVenueofExam("")
      setDateofExam(null)

    }
  }
  const onchangeRating = (e) =>{
    setRating(e.target.value)
  }
  const onchangeDateofExam = (date, dateString) =>{
    console.log(dateString, date, "datstring");
    const dateFormat = "MM/DD/YYYY"; // Date format
    const formattedDate = moment(date).format(dateFormat);
    setDateofExam(formattedDate)
  }
  const onchangeVenueofExam = (e) =>{
    setVenueofExam(e.target.value)
  }
  const onchangeDoyouhave = (e) =>{
    setDoyouhave(e.target.value)
    if (e.target.value === false) {
      form.setFieldsValue({
        companyName: ""
      })
      setCompanyName("")
    }
  }
  const onchangeCompanyName = (e) =>{
    setCompanyName(e.target.value)
  }
  const onchangeCompanyName1 = (e) =>{
    setCompanyName1(e.target.value)
  }
  
  const onchangeOonaInsurance = (e) =>{
    setOonaInsurance(e.target.value)
    if (e.target.value === false) {
      form.setFieldsValue({
        companyName1: ""
      })
      setCompanyName1("")
    }
  }

  
  const onchangeoonaInsuranceAnyBody = (e) =>{
    setOonaInsuranceAnyBody(e.target.value)
    if (e.target.value === false) {
      form.setFieldsValue({
        relatedAgentName: "",
        Relationship: ""
      })
      setRelatedAgentName("")
      setRelationship("")
    }

  }
  const onchangeRelatedAgentNamee = (e) =>{
    setRelatedAgentName(e.target.value)
  }
  const onchangeRelationship = (e) =>{
    setRelationship(e.target.value)
  }


  const onchangeFormeragent = (e) =>{
    setFormeragent(e.target.value)
    if (e.target.value === false) {
      form.setFieldsValue({
        Years: "",
        agentCode: ""
      })
      setYears("")
      setAgentCode("")
    }

  }

  const onchangeAgentCode = (e) =>{
    setAgentCode(e.target.value)
  }
  const onchangeYears = (e) =>{
    setYears(e.target.value)
  }

  const onFinishFailed = () => {
    if (accountFormProps === 'licenced') {
      message.error('Please Fill Mandtory Form!');
    }else{
      message.error('Please Fill Mandtory Form!');
    }
  };

  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  // let agentCodeData = ""
  // if (cypherAgentKey === true) {
  //    agentCodeData = "1101"
  // }else{
  //    agentCodeData = agentCodelisting ? agentCodelisting : agentCodelistingAgain
  // }

  let allUrl = ""
  if (cypherAgentKey === "") {
    allUrl = `${baseURL}auth/agent/get/commercial-structure?name=CommStructure`;
  }else{
    allUrl = `${baseURL}auth/agent/get/commercial-structure?name=CommStructure&AgentCode=${agentCodelisting ? agentCodelisting : agentCodelistingAgain}`;
  }

  const salesOfficeFunction = async () => {
    setLoader(true);
    try {
      // setLoader(true);
      const Url = allUrl
      const headers = {
        ciphertext: cypherStore,
        authorization: null,
        "Content-Type": "application/json",
      };
      const response = await axios.get(Url, { headers });
      // setLoader(false);
      console.log("response", response);
      if (response?.status === 200) {
        setLoader(false);
        if (response?.data?.statusCode === -1) {
          setLoader(false);
          console.log("gfdfghjk", response?.data?.data?.data);
          if (response?.data?.data?.data !== undefined) {
            setSalesOfficeData(response?.data?.data?.data)
          }else{
            setLoader(false);
            setSalesOfficeData(response?.data?.data?.lov)
          }
        }
      } else {
        setLoader(false);
      }
      
    } catch (error) {
      setLoader(false);
      if (error?.response?.data?.statusCode === 1) {
        setLoader(false);
        message.error(error?.response?.data?.data);
      }
    }
  };

  

  // sales office option 
  let SalesOfficeOption =
  salesOfficeData ? salesOfficeData.map((salesOffice_data) => {
        const label = salesOffice_data.NOM_NIVEL3 ? salesOffice_data.NOM_NIVEL3 : salesOffice_data.branchName;
        const value = salesOffice_data.COD_NIVEL3 ? salesOffice_data.COD_NIVEL3 : salesOffice_data.branchCode;
        const key = salesOffice_data.NOM_NIVEL3 ? salesOffice_data.NOM_NIVEL3 : salesOffice_data.branchName;
        const newSales = { ...salesOffice_data, label, value, key };
        return newSales;
      })
      : null;

console.log("SalesOfficeOption", SalesOfficeOption);

const SubmitLisenceForm = (formData) =>{
  
  if (accountFormProps === 'licenced') {
    
    formData = {
      licensedAgentProfileForm: {
        fullName: fullName,
        email: emailAddress,
        homeorBusinessAddress: homeAddress, //string
        landlineorMobileNumber: landLineNumber, //string
        preferredOonaSalesOffice: cypherAgentKey === "" ? "1101" : Preferred, //string
        preferredOonaSalesOfficeName: cypherAgentKey === "" ? "HEAD OFFICE DIRECT OFFICE" : PreferredName,
        nameofRecruiterorUnitManager: unitManager, // string
        
        pass_NonLifeLicensureExam_byInsuranceCommission: nonLife, //Must Be Bolean
        rating: rating.toString(), //Must Be Number
        dateofExam: dateofExam, //String
        venueofExam: venueofExam, //String

        NON_Life_InsuranceCompanyStillConnected: doyouhave, //Boolean
        IfYesCompanyName: companyName, //String

        life_InsuranceCompanyStillConnected: oonaInsurance, //Boolean
        IfYesCompanyNameLife: companyName1, //String

        isAgent_related_to_OonaInsurance: oonaInsuranceAnyBody, //Boolean
        relatedAgentName: relatedAgentName, //String

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
        preferredOonaSalesOffice: cypherAgentKey === "" ? "1101" :  Preferred, //string
        preferredOonaSalesOfficeName: cypherAgentKey === "" ? "HEAD OFFICE DIRECT OFFICE" : PreferredName,
        nameofRecruiterorUnitManager: unitManager, // string
        pass_NonLifeLicensureExam_byInsuranceCommission: nonLife, //Must Be Bolean
        rating: rating.toString(), //Must Be Number
        dateofExam: dateofExam, //String
        venueofExam: venueofExam, //String

        NON_Life_InsuranceCompanyStillConnected: doyouhave, //Boolean
        IfYesCompanyName: companyName, //String
        
        life_InsuranceCompanyStillConnected: oonaInsurance, //Boolean
        IfYesCompanyNameLife: companyName1, //String

        isAgent_related_to_OonaInsurance: oonaInsuranceAnyBody,  //Boolean
        relatedAgentName: relatedAgentName, //String

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

const disabledDate = (current) => {
  // Disable dates after today
  return current && current > Date.now();
};

  

  return (
    <>
    <FullPageLoader spinloader={loader} />
    <div
      className="agent_profile_form"
      style={{ maxWidth: 730, margin: "auto" }}
    >
      <div className="new-agentmitra-registration-f-parent">
        <div
          className="new-agentmitra-registration"
          style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
        >
          {/* {affiliateLicensecFormText === "Affiliates" ? "Affiliate" : "Licensed"} */}
           New agent profile form
        </div>
        <i className="indicates-mandatory-fields">
          *Indicates mandatory fields
        </i>
        <div
          className="new-agentmitra-registration"
          style={{ fontWeight: "bold" }}
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
                  pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ .'-]+$/),
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter full name"
                name="FullNameBind"
                value={fullName !== undefined ? fullName : FullNameBind}
                defaultValue={fullName !== undefined ? fullName : FullNameBind}
                // disabled={FullNameBind !== undefined ? true : false}
                onInput={toInputUppercase}
                onChange={(e) =>
                  onchangefullName((e))
                }
                disabled={checkFormDisable("Full Name")}
                maxLength='50'
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
                  // pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                  pattern: new RegExp(/^[a-zA-Z0-9._áéíóúüñÁÉÍÓÚÜÑ+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter email address"
                onChange={(e) =>
                  onchangeEmailAddress((e))
                }
                defaultValue={emailBind !== undefined ? emailBind : emailAddress}
                maxLength='50'
                value={emailBind !== undefined ? emailBind : emailAddress}
                // disabled={emailBind !== undefined ? true :  false}
                disabled={checkFormDisable("Email")}                
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
                placeholder="Enter Home/Business Address"
                onChange={(e) =>
                  onchangeHomeAddress((e))
                }
                onInput={toInputUppercase}
                value={homeAddress}
                maxLength='200'
                disabled={checkFormDisable("Address")}  
                
              />
            </Form.Item>
          </Col>


          <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Mobile Number"
              name="landLineNumber"
              rules={[
                {
                  required: true,
                  message: "Enter Mobile Number",
                },
                {
                  pattern: new RegExp(/^[06789]\d{9,13}$/), // 10-14 digits, starting with 0,6,7,8,9
                  message: "Mobile Number should be 10 to 14 digits and start with 0, 6, 7, 8, or 9",
                },
                {
                  validator: (_, value) => {
                    const validPattern = /^[06789]\d{9,13}$/;
                    if (!value || !validPattern.test(value)) {
                      return Promise.reject("Invalid mobile number format.");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter Mobile Number"
                onChange={(e) => onchangeLandLineNumber(e)}
                onInput={toInputUppercase}
                maxLength={14} // Updated to allow up to 14 digits
                value={mobileNumberBind ? mobileNumberBind : landLineNumber}
                defaultValue={mobileNumberBind ? mobileNumberBind : landLineNumber}
                disabled={checkFormDisable("Mobile Number")}
                onKeyDown={(evt) => {
                  if (!/[0-9]/.test(evt.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
                    evt.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>


          {/* {cypherAgentKey === "" ? <>
            <Col xs={24} sm={24} md={12} lg={12} style={{position: "relative"}}>
            <Form.Item
              label="Preferred Oona Sales Office"
              name="PreferredNameSignUpa"
              rules={[
                {
                  required: false,
                  message: "Please Oona sales office",
                },
              ]}
            >
              <Input size="large"  
                defaultValue={{PreferredNameSignUpa}}
                value={PreferredNameSignUpa}
                disabled
                />
            </Form.Item>
          </Col>
          </> : <>
          <Col xs={24} sm={24} md={12} lg={12} style={{position: "relative"}}>
            <Form.Item
              label="Preferred Oona Sales Office"
              name="Preferred"
              rules={[
                {
                  required: true,
                  message: "Please Oona sales office",
                },
              ]}
            >
              <Select
              getPopupContainer={(trigger) => trigger.parentElement}
              showSearch
              optionFilterProp="children"
              size="large" 
              placeholder="Please Select Oona sales office"
              onChange={(e, key) => onchangePreferred((e, key))}
              value={Preferred}
              options={SalesOfficeOption}
              
            />
            </Form.Item>
          </Col>
          </>} */}
          

{cypherAgentKey === "shareLogin" ? <>
  <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Name of Recruiter/Unit Manager"
              name="unitManager"
              rules={[
                {
                  required: true,
                  message: "Please Enter Recruiter/Unit Manager",
                },
                {
                  message: "Only Alphabets are Allowed",
                  pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ .'-]+$/),
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Please Enter Recruiter/Unit Manager"
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
                onInput={toInputUppercase}
                value={unitManager !== undefined ? unitManager : logged_in_user }
                defaultValue={unitManager !== undefined ? unitManager : logged_in_user}
                maxLength='60'
              />
            </Form.Item>
          </Col>
</> : <></>}
          

          <Col xs={24} sm={24} md={12} lg={24}>
            <div
              className="new-agentmitra-registration-f-parent "
              style={{ fontWeight: 'bold' }}
            >
              Profile Questions
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              // label="Did you pass the Non- Life Licensure Exam given by the Insurance Commission?"
              label ="Did you pass the Life Insurance Exam given by the Insurance Commission?"
              name="nonLife"
              rules={[
                {
                  required: false,
                  message: "Please Enter ife Licensure Exam",
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
                  message: "Enter Rating",
                },
                {
                  message: "Only Numbers are Allowed",
                  pattern: new RegExp(/^[0-9]+$/),
                }
              ]}
              
            >
              
                <Input size="large" placeholder="Enter Rating" onChange={(e) =>
                  onchangeRating((e))
                } 
                onInput={toInputUppercase}
                value={rating}
                maxLength='50'
                type="number"                />
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
                onChange={onchangeDateofExam}
                value={dateofExam}
                format="MM-DD-YYYY"
                disabledDate={disabledDate}
                getPopupContainer={(trigger) => trigger.parentElement} // Fixed width and height
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
                {
                  message: "Only Letters are Allowed",
                  pattern: new RegExp(/^[A-Za-z]+$/),
                }
              ]}
              
            >
              <Input size="large" placeholder="Enter Venue of exam" onChange={(e) =>
                  onchangeVenueofExam((e))
                }
                onInput={toInputUppercase}
                value={venueofExam}
                maxLength='100'
                />
            </Form.Item>
          </Col>
          </> : ""}
        
          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              // label="Do you have other NON- LIFE INSURANCE Company that you represented or are still connected with?"
              label="Do you have a LIFE INSURANCE Company that you represent or are still connected with?"
              name="doyouhave"
              rules={[
                {
                  required: false,
                  message: "Please Enter  LIFE INSURANCE Company",
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
                {
                  message: "Alphanumeric and special characters are allowed",
                  pattern: new RegExp(/^[\s\S]+$/),
                }
              ]}
              
            >
              <Input size="large" placeholder="Enter company name" onChange={(e) =>
                  onchangeCompanyName((e))
                } 
                value={companyName}
                onInput={toInputUppercase}
                maxLength='200'
                />
            </Form.Item>
          </Col>
          </> : ""}
          

          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              // label="Do you have other LIFE INSURANCE Company that you represented or are still connected with?"
              label="Do you have a NON- LIFE INSURANCE Company that you represent or are still connected with? "
              name="oonaInsurance"
              rules={[
                {
                  required: false,
                  message: "Please Enter NON- LIFE INSURANCE Company",
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
                {
                  message: "Alphanumeric and special characters are allowed",
                  pattern: new RegExp(/^[\s\S]+$/),
                }
              ]}
              disabled={true}
              
            >
              <Input size="large" placeholder="Enter company name" onChange={(e) =>
                  onchangeCompanyName1((e))
                }
                onInput={toInputUppercase}
                value={companyName1}
                maxLength='200'
                />
            </Form.Item>
          </Col>
          </> : ""}

          <Col xs={24} sm={24} md={12} lg={24}>
            <Form.Item
              // label="Have you been a former agent or an employee of Phillife Financial?"
              label="Do you have a Variable INSURANCE Company that you represent or are still connected with?"
              name="formeragent"
              rules={[
                {
                  required: false,
                  message: "Enter variable insurance company",
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
              label="Variable insurance company name"
              name="agentCode"
              rules={[
                {
                  required: true,
                  message: "Enter company Name",
                },
                {
                  message: "Alphanumeric and special characters are allowed",
                  pattern: new RegExp(/^[\s\S]+$/),
                }
              ]}
              
            >
              <Input size="large" placeholder="Enter company Name" onChange={(e) =>
                  onchangeAgentCode((e))
                } 
                onInput={toInputUppercase}
                value={agentCode}
                maxLength='200'
                />
            </Form.Item>
          </Col>

          {/* <Col xs={24} sm={24} md={12} lg={12}>
            <Form.Item
              label="Years Affiliated"
              name="Years"
              rules={[
                {
                  required: true,
                  message: "Enter Years Affiliated",
                },
                {
                  message: "Only Numbers are Allowed",
                  pattern: new RegExp(/^[0-9]+$/),
                },
              ]}
              
            >
              
              <Input size="large" placeholder="Enter Years Affiliated" onChange={(e) =>
                  onchangeYears((e))
                } 
                value={Years}
                />
            </Form.Item>
          </Col> */}
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
              name="relatedAgentName"
              rules={[
                {
                  required: true,
                  message: "Enter Name",
                },
                {
                  message: "Only Letters and Spaces are Allowed",
                  pattern: new RegExp(/^[A-Za-z\s]+$/),
                }
              ]}
              
            >
              <Input size="large" placeholder="Enter Name" onChange={(e) =>
                  onchangeRelatedAgentNamee((e))
                }
                onInput={toInputUppercase}
                value={relatedAgentName}
                maxLength="200"
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
                  message: "Enter Relationship",
                },
                {
                  message: "Only Letters, Spaces, and Special Characters are Allowed",
                  pattern: new RegExp(/^[A-Za-z\s\p{P}\p{S}]+$/u),
                }
              ]}
              
            >
              <Input size="large" placeholder="Enter Relationship" onChange={(e) =>
                  onchangeRelationship((e))
                }
                onInput={toInputUppercase}
                value={Relationship}
                maxLength='50'
                ></Input>
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
    </>
    
    
  );
};

export default AgentProfileForm;
