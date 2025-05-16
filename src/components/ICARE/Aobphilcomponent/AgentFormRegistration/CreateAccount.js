import React, { useEffect, useState, useCallback } from "react";
import "./AgentForm.css";
import "./CreateAccount.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  Button,
  Row,
  Col,
  Radio,
  Upload,
  message,
  Progress,
  Modal,
  Form
} from "antd";
import {
  FolderAddOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import LoginHeader from "../../../ICARE/LoginHeader/LoginHeader";
import ProgressLine from "./ProgressLine";
import AgentProfileForm from "./AgentProfileForm";
import apiConfig from "../../../../config/api.config";
import * as actions from "../../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
// import LicencedCreateAccount from "../AgentFormRegistration/LicencedCreateAccount";
import {PostsizePhotoApi} from '../AllLicenceFormUploadApi/index'
import downlaodFile from '../../../../assets/downloadFile/BPI-Bank-Account-Opening-and-Enrollment-Form.pdf'
import pdfDownloadCA from '../../../../assets/downloadFile/3)-CA-FORM-(APPLICATION-FOR-INSURANCE-AGENT’S-LICENSE-2023-4.pdf'
import Agent_Recruitment from '../../../../images/Aobforms/Agent_Recruitment.pdf'
import FC_Contract from '../../../../images/Aobforms/FC_Contract.pdf'
import New_loyalty from '../../../../images/Aobforms/New_loyalty.pdf'
import Accomplished_IC from '../../../../images/Aobforms/Accomplished_IC.pdf'
  import styled from 'styled-components';

  const CustomButton = styled(Button)`
  border-radius: 12px;
    padding: 0px 20px;
    color: #fff;
    height: 48px;
    width: 116px; 
`;

const CreateAccount = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { baseURL } = apiConfig;
  const [disanleFiled, setDisanleFiled] = useState(false);

  const [formSubmit, setFormSubmit] = useState(false)
  const liceandAffiliatData = props?.location?.state?.data1;
  const liceandAffiliat = props?.location?.state?.data1?.agentData[0]?.applicantType;
  

  const allAgentRegisterData = props?.location?.state?.data;
  console.log("All Agent",props)
  const licenceandaffiliateForm = props?.location?.state?.data;
  const [messageSubmit, setMessageSubmit] = useState('');

  useEffect(() => {
        const foundTINID = allAgentRegisterData !== undefined && allAgentRegisterData.some(item => item.title === "Full Name" || item.title === "Email" || item.title === "Mobile Number" || item.title === "Address");
        if (foundTINID) {
          setMessageSubmit("QC");
         } 
        //else {
        //   setMessageSubmit("QC");
        // }
    }, [allAgentRegisterData]);

  const checkFormDisable=(formValue)=>{
    const index = allAgentRegisterData?.findIndex((x)=>x.title === formValue)
    if(index === -1){
      return true}
    else{
      return false
    }
  }

  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  const agentIdFromRegister = useSelector((state) => state?.agentOnBoardingRegister?.formData?.agentId);
  const agentFullNameFromRegister = useSelector((state) => state?.agentOnBoardingRegister?.formData?.agentFullName);
  const affiliateLicensecFormText = useSelector((state) => state?.agentOnBoardingRegister?.liaffiStore);
  // license store 
  const AllFormLicenseData = useSelector((state) => state?.AOBLicenceAffiliat?.formData);
  const AllFormLicenseDataNOQC = useSelector((state) => state?.AOBLicenceAffiliat?.formData?.agentData);
  const checkstore = useSelector((state) => state)
  console.log("Check store",checkstore)

  var licenseForm = ""
  if (messageSubmit === "QC") {
    licenseForm = licenceandaffiliateForm?.licensedAgentProfileForm
  }else if(AllFormLicenseDataNOQC !== undefined){
    licenseForm = AllFormLicenseDataNOQC[0]?.licensedAgentProfileForm
  }else{
    licenseForm = AllFormLicenseData?.licensedAgentProfileForm
  }

  console.log("checking Console",messageSubmit,AllFormLicenseDataNOQC)

  // affiliate store form
  const AllFormAffiliatesData = useSelector((state) => state?.AOBLicenceAffiliat?.formData);
  const AllFormAffiliatesDataNOQC = useSelector((state) => state?.AOBLicenceAffiliat?.formData?.agentData);

  // var AffiliatesForm = ""
  // if (AllFormAffiliatesDataNOQC !== undefined && messageSubmit === "QC") {
  //   AffiliatesForm = AllFormAffiliatesData[0]?.AffiliatesAgentProfileForm
  // }else {
  //   AffiliatesForm = AllFormAffiliatesData?.AffiliatesAgentProfileForm
  // }

  var AffiliatesForm = ""
  if (messageSubmit === "QC") {
    AffiliatesForm = licenceandaffiliateForm?.AffiliatesAgentProfileForm
  }else if(AllFormAffiliatesDataNOQC !== undefined){
    AffiliatesForm = AllFormAffiliatesDataNOQC[0]?.AffiliatesAgentProfileForm
  }else{
    AffiliatesForm = AllFormAffiliatesData?.AffiliatesAgentProfileForm
  }
   
  const getResult = useSelector((state) => state?.agentOnBoardingRegister?.allApplicationForm?.result);
  const DocumententsBind = useSelector((state) => state?.agentOnBoardingRegister);
  
    const downloadPDF = () => {
      // const link = document.createElement('a');
      // link.href = process.env.PUBLIC_URL + downlaodFile;
      // link.download = downlaodFile;
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    };
  

  const uploadURL = `${baseURL}secure/agent/document/upload`
  const headerObject = {
    ciphertext: cypherStore,
    authorization: null,
    "Content-Type": "application/json",
  };

  const history = useHistory();
  const [open, setOpen] = useState();
  const [value, setValue] = useState(1);
  const [affiliated, setAffiliated] = useState(liceandAffiliat ==! undefined ? liceandAffiliat : "licenced");
  const [loader, setLoader] = useState(false)
  const [FormClear, setFormClear] = useState(false)

  // ========= affiliated Hooks start ===========
  const [TinId, setTinId] = useState("");
  const [TinFileSize, setTinFileSize] = useState("")
  const [proofOfBank, setProofOfBank] = useState("")
  const [proofOfBankFileSize, setProofOfBankFileSize] = useState("")

  const [errorData, setErrorData] = useState(false)
  const [errorDataForBank, setErrorDataForBank] = useState(false)
  const [payloadAffiliatBankProof, setPayloadAffiliatBankProof] = useState("")
  const [affiliatTINID, setAffiliatTINID] = useState("") 
  // ========= affiliated Hooks End ===========

  // ========= licensed Hooks start ===========
  const [BPIaccountopeningLicensed, setBPIaccountopeningLicensed] = useState("")
  const [BPIaccountopeningLicensedFileSize, setBPIaccountopeningLicensedFileSize] = useState("")
  const [errorDataBPIaccountopeningLicensed, setErrorDataBPIaccountopeningLicensed] = useState(false)

  const [TINIDLicensed, setTINIDLicensed] = useState("")
  const [TINIDLicensedFileSize, setTINIDLicensedFileSize] = useState("")
  const [errorDataTINIDLicensed, setErrorDataTINIDLicensed] = useState(false)


  const [SSDIDLicensed, setSSDIDLicensed] = useState("")
  const [SSDIDLicensedFileSize, setSSDIDLicensedFileSize] = useState("")
  const [errorDataSSDIDLicensed, setErrorDataSSDIDLicensed] = useState(false)


  const [CAFORMLicensed, setCAFORMLicensed] = useState("")
  const [CAFORMLicensedFileSize, setCAFORMLicensedFileSize] = useState("")
  const [errorDataCAFORMLicensed, setErrorDataCAFORMLicensed] = useState(false)


  const [PAYMENTLICENSEFEELicensed, setPAYMENTLICENSEFEELicensed] = useState("")
  const [PAYMENTLICENSEFEELicensedFileSize, setPAYMENTLICENSEFEELicensedFileSize] = useState("")
  const [errorDataPAYMENTLICENSEFEELicensed, setErrorDataPAYMENTLICENSEFEELicensed] = useState(false)


  const [ClearanceFormLicensed, setClearanceFormLicensed] = useState("")
  const [ClearanceFormLicensedFileSize, setClearanceFormLicensedFileSize] = useState("")
  const [errorDataClearanceFormLicensed, setErrorDataClearanceFormLicensed] = useState(false)


  const [PHOTOLicensed, setPHOTOLicensed] = useState("")
  const [PHOTOLicensedFileSize, setPHOTOLicensedFileSize] = useState("")
  const [errorDataPHOTOLicensed, setErrorDataPHOTOLicensed] = useState(false)


  const [BIR2303Licensed, setBIR2303Licensed] = useState("")
  const [BIR2303LicensedFileSize, setBIR2303LicensedFileSize] = useState("")
  const [errorDataBIR2303Licensed, setErrorDataBIR2303Licensed] = useState(false)


  const [BIR1921Licensed, setBIR1921Licensed] = useState("")
  const [BIR1921LicensedFileSize, setBIR1921LicensedFileSize] = useState("")
  const [errorDataBIR1921Licensed, setErrorDataBIR1921Licensed] = useState(false)
  // ========= licensed Hooks end ===========

  // ===================  new hook for set file data filetype start here ========================
  const [payloadBPIAccountOpen, setPayloadBPIAccountOpen] = useState("")
  const [payloadTINID, setPayloadTINID] = useState("")
  const [payloadSSDID, setPayloadSSDID] = useState("")
  const [payloadCAFORM, setPayloadCAFORM] = useState("")
  const [payloadPAYMENTLICENSEFEE, setPayloadPAYMENTLICENSEFEE] = useState("")
  const [payloadClearanceFormLicensed, setPayloadClearanceFormLicensed] = useState("")
  const [payloadPHOTOLicensed, setPayloadPHOTOLicensed] = useState("")
  const [payloadBIR2303Licensed, setPayloadBIR2303Licensed] = useState("")
  const [payloadBIR1921Licensed, setPayloadBIR1921Licensed] = useState("")

  // ===================  new hook for set file data filetype end here ========================

  const [BMIAccountForm, setBMIAccountFor] = useState("");
  const [licencedFormData, setLicencedFormData] = useState({
    tinId: "",
    bpiAccountForm: "",
    sss_id: "",
    ca_form: "",
    proof_of_pay_licence_fee: "",
    exam_or_clearence_form: "",
    photo: "",
    b_i_r_2023: "",
    b_i_r_1921: "",
  });

// ======================= Data Setting ===============
const [examResultICorIIAP, setExamResultICorIIAP] = useState("")
const [iCApplication, setICApplication] = useState("")
const [sSDIDSSForm, setSSDIDSSForm] = useState("")
const [TINnumber, setTINnumber] = useState("")
const [ITRPreviousYear, setITRPreviousYear] = useState("")
const [FeeReceipt , setFeeReceipt] = useState("")
const [GovtIDs, setGovtIDs] = useState("")
const [ARSP, setARSP] = useState("")
const [AgentLoyaltyPlan, setAgentLoyaltyPlan] = useState("")
const [FCContract, setFCContract] = useState("")
const [TrainingCertificate, setTrainingCertificate] = useState("")
const [SizePicture, setSizePicture] = useState("")

// =======================For Errors===================
const [errorexamResultICorIIAP, setErrorExamResultICorIIAP] = useState(false)
const [erroriCApplication, setErrorICApplication] = useState(false)
const [errorsSDIDSSForm, setErrorSSDIDSSForm] = useState(false)
const [errorTINnumber, setErrorTINnumber] = useState(false)
const [errorITRPreviousYear, setErrorITRPreviousYear] = useState(false)
const [errorFeeReceipt , setErrorFeeReceipt] = useState(false)
const [errorGovtIDs, setErrorGovtIDs] = useState(false)
const [errorARSP, setErrorARSP] = useState(false)
const [errorAgentLoyaltyPlan, setErrorAgentLoyaltyPlan] = useState(false)
const [errorFCContract, setErrorFCContract] = useState(false)
const [errorTrainingCertificate, setErrorTrainingCertificate] = useState(false)
const [errorSizePicture, setErrorSizePicture] = useState(false)

// =======================file Name Storing ============
const [filenameexamResultICorIIAP, setFilenameExamResultICorIIAP] = useState("")
const [filenameiCApplication, setFilenameICApplication] = useState("")
const [filenamesSDIDSSForm, setFilenameSSDIDSSForm] = useState("")
const [filenameTINnumber, setFilenameTINnumber] = useState("")
const [filenameITRPreviousYear, setFilenameITRPreviousYear] = useState("")
const [filenameFeeReceipt , setFilenameFeeReceipt] = useState("")
const [filenameGovtIDs, setFilenameGovtIDs] = useState("")
const [filenameARSP, setFilenameARSP] = useState("")
const [filenameAgentLoyaltyPlan, setFilenameAgentLoyaltyPlan] = useState("")
const [filenameFCContract, setFilenameFCContract] = useState("")
const [filenameTrainingCertificate, setFilenameTrainingCertificate] = useState("")
const [filenameSizePicture, setFilenameSizePicture] = useState("")

//  ====================== File Size ===================
const [sizeexamResultICorIIAP, setSizeExamResultICorIIAP] = useState("")
const [sizeiCApplication, setSizeICApplication] = useState("")
const [sizesSDIDSSForm, setSizeSSDIDSSForm] = useState("")
const [sizeTINnumber, setSizeTINnumber] = useState("")
const [sizeITRPreviousYear, setSizeITRPreviousYear] = useState("")
const [sizeFeeReceipt , setSizeFeeReceipt] = useState("")
const [sizeGovtIDs, setSizeGovtIDs] = useState("")
const [sizeARSP, setSizeARSP] = useState("")
const [sizeAgentLoyaltyPlan, setSizeAgentLoyaltyPlan] = useState("")
const [sizeFCContract, setSizeFCContract] = useState("")
const [sizeTrainingCertificate, setSizeTrainingCertificate] = useState("")
const [sizeSizePicture, setSizeSizePicture] = useState("")



  useEffect(() => {
    window.scrollTo(0, 0);

    // form binding 
    setAffiliated(getResult?.applicantType ? getResult?.applicantType : liceandAffiliat ? liceandAffiliat : "licenced")
    form.setFieldsValue({
      affiliated: getResult?.applicantType ? getResult?.applicantType : liceandAffiliat ? liceandAffiliat : "licenced"
    })

  }, []);

  const onChangeRadioButton = (e) => {
    form.resetFields();
    // Your function logic
    setFormClear(true)
    // dispatch(actions.storeAgentONBoardLisenceForm({}));
    dispatch(actions.resetLicencseAfiliateForm({}));
    
    if (AffiliatesForm === undefined && licenseForm === undefined) {
      form.resetFields()
    }
    setValue(e.target.value);
    setAffiliated(e.target.value);
    dispatch(actions.StoreLiAff(e.target.value))

    /// licenced error data clear 
    // if (e.target.value === 'licenced') {
      
    //   setBPIaccountopeningLicensed("")
    //   setErrorDataBPIaccountopeningLicensed(false)
    //   setTINIDLicensed("")
    //   setErrorDataTINIDLicensed(false)
    //   setSSDIDLicensed("")
    //   setErrorDataSSDIDLicensed(false)
    //   setCAFORMLicensed("")
    //   setErrorDataCAFORMLicensed(false)
    //   setPAYMENTLICENSEFEELicensed("")
    //   setErrorDataPAYMENTLICENSEFEELicensed(false)
    //   setClearanceFormLicensed("")
    //   setErrorDataClearanceFormLicensed(false)
    //   setPHOTOLicensed("")
    //   setErrorDataPHOTOLicensed(false)
    //   setBIR2303Licensed("")
    //   setErrorDataBIR2303Licensed(false)
    //   setBIR1921Licensed("")
    //   setErrorDataBIR1921Licensed(false)
    // }else{
    //   setTinId("")
    //   setProofOfBank("")
    //   setErrorData(false)
    //   setErrorDataForBank(false)
    // }
  }; // Specify dependencies as an empty array if you don't want any re-renders


  // const onChangeRadioButton = (e) => {
    
  // };

 

  const accountForm = affiliated

  const submitHandler = (licencedFormData) => {
  };

  const nextdHandler = () => {
    submitHandler(licencedFormData);
    history.push("/verify-deatils");
  };
  const backdHandler = () => {
    if (allAgentRegisterData?.length > 0) {
      history.push("/application-status");
    } else {
      history.push("/agent-form");
    }
  };

  // for 3 dots ... 
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  
  // =================  account form submit ===============
  const licenData = licenseForm;
  const affiliatedData = AffiliatesForm;
  console.log("Lincense data",licenData)
  const AccountFormSubmit = async () =>{
    // if (affiliated === "licenced") {

      if (messageSubmit === 'QC') {
        return message.error("Please fill QC in the Licensed form and submit")
      }else if(licenData === null || licenData === undefined){
        return message.error("Please fill the Licensed form and submit")
      }

      // BPI 
      if (checkFormDisable("Exam Result (IC or IIAP)") === false) {
        if (filenameexamResultICorIIAP === "" || sizeexamResultICorIIAP && sizeexamResultICorIIAP > 5 * 1024 * 1024) {
          setErrorExamResultICorIIAP(true)
          return message.error("Please Upload Exam Result (IC or IIAP) and File size exceeds the maximum limit.")
        }else{
          setErrorExamResultICorIIAP(false)
        }
      }
      
// BPI FORM
      // tin ID
      //  ? 'browser_wrapperDisable' : 'browser_wrapper'}
      if (checkFormDisable("IC Application") === false) {
        if (filenameiCApplication === "" || sizeiCApplication && sizeiCApplication > 5 * 1024 * 1024) {
          setErrorICApplication(true)
          return message.error("Please Upload IC Application and File size exceeds the maximum limit.")
        }else{
          setErrorICApplication(false)
        }
      }
      

      
       // SSDIDLicensed ID
       if (checkFormDisable("SSD ID/ SSS Form") === false) {
        if (filenamesSDIDSSForm === "" || sizesSDIDSSForm && sizesSDIDSSForm > 5 * 1024 * 1024) {
          setErrorSSDIDSSForm(true)
          return message.error("Please Upload SSD ID/ SSS Form and File size exceeds the maximum limit.")
        }else{
          setErrorSSDIDSSForm(false)
        }
       }
       

      // CAFORMLicensed ID
      if (checkFormDisable("TIN") === false) {
        if (filenameTINnumber === "" || sizeTINnumber && sizeTINnumber > 5 * 1024 * 1024) {
          setErrorTINnumber(true)
          return message.error("Please Upload TIN and File size exceeds the maximum limit.")
        }else{
          setErrorTINnumber(false)
        }
      }
      

      //PAYMENTLICENSEFEELicensed
      if (checkFormDisable("ITR (Previous Year)") === false) {
        if (sizeITRPreviousYear && sizeITRPreviousYear > 5 * 1024 * 1024) {
          setErrorITRPreviousYear(true)
          return message.error("File size exceeds the maximum limit.")
        }else{
          setErrorITRPreviousYear(false)
        }
      }
      

      // ClearanceFormLicensed
      if (checkFormDisable("Fee Receipt") === false) {
        if (filenameFeeReceipt === "" || sizeFeeReceipt && sizeFeeReceipt > 5 * 1024 * 1024) {
          setErrorFeeReceipt(true)
          return message.error("Please Upload Fee Receipt and File size exceeds the maximum limit.")
        }else{
          setErrorFeeReceipt(false)
        }
      }
      

      // PHOTOLicensed
      if (checkFormDisable("Govt. IDs") === false) {
        if (filenameGovtIDs === "" || sizeGovtIDs && sizeGovtIDs > 5 * 1024 * 1024) {
          setErrorGovtIDs(true)
          return message.error("Please Upload Govt. IDs and File size exceeds the maximum limit.")
        }else{
          setErrorGovtIDs(false)
        }
      }


      if (checkFormDisable("ARSP") === false) {
        if (filenameARSP === "" || sizeARSP && sizeARSP > 5 * 1024 * 1024) {
          setErrorARSP(true)
          return message.error("Please Upload ARSP and File size exceeds the maximum limit.")
        }else{
          setErrorARSP(false)
        }
      }


      if (checkFormDisable("New Agent’s Loyalty Plan (for Group Insurance).") === false) {
        if (filenameAgentLoyaltyPlan === "" || sizeAgentLoyaltyPlan && sizeAgentLoyaltyPlan > 5 * 1024 * 1024) {
          setErrorAgentLoyaltyPlan(true)
          return message.error("Please Upload New Agent’s Loyalty Plan (for Group Insurance) and File size exceeds the maximum limit.")
        }else{
          setErrorAgentLoyaltyPlan(false)
        }
      }


      if (checkFormDisable("FC’s Contract.") === false) {
        if (filenameFCContract === "" || sizeFCContract && sizeFCContract > 5 * 1024 * 1024) {
          setErrorFCContract(true)
          return message.error("Please Upload FC’s Contract and File size exceeds the maximum limit.")
        }else{
          setErrorFCContract(false)
        }
      }


      if (checkFormDisable("Training Certificate") === false) {
        if (filenameTrainingCertificate === "" || sizeTrainingCertificate && sizeTrainingCertificate > 5 * 1024 * 1024) {
          setErrorTrainingCertificate(true)
          return message.error("Please Upload Training Certificate and File size exceeds the maximum limit.")
        }else{
          setErrorTrainingCertificate(false)
        }
      }


      if (checkFormDisable("2x2 Size Picture") === false) {
        if (filenameSizePicture === "" || sizeSizePicture && sizeSizePicture > 5 * 1024 * 1024) {
          setErrorSizePicture(true)
          return message.error("Please Upload 2x2 Size Picture and File size exceeds the maximum limit.")
        }else{
          setErrorSizePicture(false)
        }
      }
      
    // }
    // else{
    //   if (messageSubmit === 'QC') {
    //     return message.error("Please fill QC in the Affiliates form and submit")
    //   }else if(affiliatedData === null || affiliatedData === undefined){
    //     return message.error("Please fill Affiliates form and submit")
    //   }

    //   if (checkFormDisable("TIN ID") === false) {
    //     if (TinId === "" || TinFileSize && TinFileSize > 5 * 1024 * 1024) {
    //       setErrorData(true)
    //       return message.error("Please Upload TIN ID and File size exceeds the maximum limit.")
    //     }else{
    //       setErrorData(false)
    //     }
    //   }

    //   // BANK ACCOUNT NUMBER
    //   // account form 
    //   if (checkFormDisable("BANK ACCOUNT NUMBER") === false) {
    //     if (proofOfBank === "" || proofOfBankFileSize && proofOfBankFileSize > 5 * 1024 * 1024) {
    //       setErrorDataForBank(true)
    //       return message.error("Please Upload Proof Of Bank Account Number Ownership")
    //     }else{
    //       setErrorDataForBank(false)
    //     }
    //   }
    // }
    
    try {
      
      setLoader(true);
      const Url = `${baseURL}secure/agent/submitApplication`;
      const requestBody = {

        applicantType: affiliated,
        agentId: agentIdFromRegister,
        licensedAgentProfileForm: affiliated === "licenced" ? licenData : null,
        AffiliatesAgentProfileForm: affiliated !== "licenced" ? affiliatedData : null,
        // documnetSubmitted_Types: affiliated === "licenced" ? [payloadBPIAccountOpen, payloadTINID, payloadSSDID, payloadCAFORM, payloadPAYMENTLICENSEFEE, payloadClearanceFormLicensed, payloadPHOTOLicensed, payloadBIR2303Licensed, payloadBIR1921Licensed] : [affiliatTINID, payloadAffiliatBankProof],
        documnetSubmitted_Types: [examResultICorIIAP, iCApplication, sSDIDSSForm, TINnumber, ITRPreviousYear, FeeReceipt, GovtIDs, ARSP,AgentLoyaltyPlan,FCContract,TrainingCertificate,SizePicture],
        isResubmittingForm: allAgentRegisterData?.length > 0 ? true : false

        
          
      };
      const headers = headerObject

      console.log("Request Body",requestBody)
      // return
      const response = await axios.post(Url, requestBody, { headers });
      if (response?.data?.statusCode === -1) {
        const allApplicationStatus = response?.data?.data;
        setLoader(false);
        message.success(response?.data?.data?.message);
        history.push("/verify-details")
        dispatch(actions.storeAgentAllApplicationForm(allApplicationStatus));
      }
      if (response?.data?.statusCode === 4) {
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error calling API:", error);
    }
  }

  const validationPDFFunction = (file) =>{
    const allowedFileTypes = [
      'application/pdf',
    ];
    if (
      file &&
      (!allowedFileTypes.includes(file.type) )
    ) {
      message.error("File not supported. Please upload the file in correct format.");
      return;
    }
  }

  const validationImgFunction = (file) =>{
    const allowedFileTypes = [
      'image/png', 'image/jpeg', 'image/jpg',
    ];
    if (
      file &&
      (!allowedFileTypes.includes(file.type) )
    ) {
      message.error("File not supported. Please upload the file in correct format.");
      return;
    }
  }
  // mage/png', 'image/jpeg', 'image/jpg'

  // ********************* Affiliates ************** start 
  // ---- file upload first file For TIN ID Upload
  const handleUploadTinId = async ({ file, onError }) => {
    
    validationImgFunction(file)
    setTinId(file?.name)
    setTinFileSize(file?.size)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorData(true)
     return message.error("File size exceeds the maximum limit.");
    }else{
      setErrorData(false)
    }
    try {
      setLoader(true);
      const Url = uploadURL;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("agentId", agentIdFromRegister);
      formData.append("documentType", "TIN ID");
      formData.append("agentFullName", agentFullNameFromRegister);
      const headers = headerObject
      const response = await axios.post(Url, formData, { headers });
      setLoader(false);
      if (response?.data?.statusCode === -1) {
        setAffiliatTINID(response?.data?.data?.data?.documentUploadResult?.documentType)
        message.success(response?.data?.data?.message);
      }
    } catch (error) {
      setLoader(false);
      console.error("Error calling API:", error);
    }

  };
// delet tin id for unlisence
  const onChangeDeleteTIN = () =>{
    setErrorData(false)
    setTinId("")
  }  

   // file upload first file For Proof Of Bank Upload
   const handleUploadProofOfBank = async ({ file, onError }) => {
    setProofOfBank(file?.name)
    setProofOfBankFileSize(file?.size)
    validationImgFunction(file)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorDataForBank(true)
     return message.error("File size exceeds the maximum limit.");
    }else{
      setErrorDataForBank(false)
    }
    try {
      setLoader(true);
      const Url = uploadURL;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("agentId", agentIdFromRegister);
      formData.append("documentType", "BANK ACCOUNT NUMBER");
      formData.append("agentFullName", agentFullNameFromRegister);

      const headers = headerObject
      const response = await axios.post(Url, formData, { headers });
      setLoader(false);
      if (response?.data?.statusCode === -1) {
        setPayloadAffiliatBankProof(response?.data?.data?.data?.documentUploadResult?.documentType)
        message.success(response?.data?.data?.message);
      }
      
    } catch (error) {
      setLoader(false);
      console.error("Error calling API:", error);
      
    }

  };
// delete Proof Of Bank for unlisence
  const onChangeDeleteTINProofOfBank = () =>{
    setProofOfBank("")
    setErrorDataForBank(false)
  }

  // ************************* Affiliates end *************************

  // ************************* Licensed start *************************
 // ---- file upload first file For BPI account opening Upload
 const handleUploadBPIaccountopening = async ({ file, onError }) => {
  validationPDFFunction(file)
  if (file?.type === 'application/pdf') {
    setBPIaccountopeningLicensed(file?.name)
  setBPIaccountopeningLicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataBPIaccountopeningLicensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataBPIaccountopeningLicensed(false)
  }
  try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "BPI FORM");
    formData.append("agentFullName", agentFullNameFromRegister);

    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadBPIAccountOpen(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
    
  }
  }
  

};
// delete BPI account opening for unlisence
const onChangeDeleteBPIaccountopeningLicensed = () =>{
  setErrorDataBPIaccountopeningLicensed(false)
  setBPIaccountopeningLicensed("")
}  

// ---- file upload first file For TIN ID Upload
const handleUploadTINIDLicense = async ({ file, onError }) => {
  validationImgFunction(file)
  if (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg' || file?.type === 'application/pdf') {
    setTINIDLicensed(file?.name)
    setTINIDLicensedFileSize(file?.size)
    if (file && file.size > 5 * 1024 * 1024) {
      setErrorDataTINIDLicensed(true)
     return message.error("File size exceeds the maximum limit.");
    }else{
      setErrorDataTINIDLicensed(false)
    }
    try {
      setLoader(true);
      const Url = uploadURL;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("agentId", agentIdFromRegister);
      formData.append("documentType", "TIN ID");
      formData.append("agentFullName", agentFullNameFromRegister);
  
      const headers = headerObject
      const response = await axios.post(Url, formData, { headers });
      setLoader(false);
      if (response?.data?.statusCode === -1) {
        setPayloadTINID(response?.data?.data?.data?.documentUploadResult?.documentType)
        message.success(response?.data?.data?.message);
      }
      
    } catch (error) {
      setLoader(false);
      console.error("Error calling API:", error);
      
    }  
  }
  

};

const functiontosetfilenameandsize =(file,filetype)=>{
  console.log("Uploaded file==>>",file?.name ,file?.size , filetype)
  if(filetype === "Exam Result (IC or IIAP)"){
    setFilenameExamResultICorIIAP(file?.name)
    setSizeExamResultICorIIAP(file?.size)
  }else if(filetype === "IC Application"){
    setFilenameICApplication(file?.name)
    setSizeICApplication(file?.size)
  }else if(filetype === "SSD ID/ SSS Form"){
    setFilenameSSDIDSSForm(file?.name)
    setSizeSSDIDSSForm(file?.size)
  }else if(filetype === "TIN"){
    setFilenameTINnumber(file?.name)
    setSizeTINnumber(file?.size)
  }else if(filetype === "ITR (Previous Year)"){
    setFilenameITRPreviousYear(file?.name)
    setSizeITRPreviousYear(file?.size)
  }else if(filetype === "Fee Receipt"){
    setFilenameFeeReceipt(file?.name)
    setSizeFeeReceipt(file?.size)
  }else if(filetype === "Govt. IDs"){
    setFilenameGovtIDs(file?.name)
    setSizeGovtIDs(file?.size)
  }else if(filetype === "ARSP"){
    setFilenameARSP(file?.name)
    setSizeARSP(file?.size)
  }else if(filetype === "New Agent’s Loyalty Plan (for Group Insurance)."){
    setFilenameAgentLoyaltyPlan(file?.name)
    setSizeAgentLoyaltyPlan(file?.size)
  }else if(filetype === "FC’s Contract."){
    setFilenameFCContract(file?.name)
    setSizeFCContract(file?.size)
  }else if(filetype === "Training Certificate"){
    setFilenameTrainingCertificate(file?.name)
    setSizeTrainingCertificate(file?.size)
  }else if(filetype === "2x2 Size Picture"){
    setFilenameSizePicture(file?.name)
    setSizeSizePicture(file?.size)
  }

}

const functiontoseterror =(boolean,filetype)=>{
  if(filetype === "Exam Result (IC or IIAP)"){
    setErrorExamResultICorIIAP(boolean)
  }else if(filetype === "IC Application"){
    setErrorICApplication(boolean)
  }else if(filetype === "SSD ID/ SSS Form"){
    setErrorSSDIDSSForm(boolean)
  }else if(filetype === "TIN"){
    setErrorTINnumber(boolean)
  }else if(filetype === "ITR (Previous Year)"){
    setErrorITRPreviousYear(boolean)
  }else if(filetype === "Fee Receipt"){
    setErrorFeeReceipt(boolean)
  }else if(filetype === "Govt. IDs"){
    setErrorGovtIDs(boolean)
  }else if(filetype === "ARSP"){
    setErrorARSP(boolean)
  }else if(filetype === "New Agent’s Loyalty Plan (for Group Insurance)."){
    setErrorAgentLoyaltyPlan(boolean)
  }else if(filetype === "FC’s Contract."){
    setErrorFCContract(boolean)
  }else if(filetype === "Training Certificate"){
    setErrorTrainingCertificate(boolean)
  }else if(filetype === "2x2 Size Picture"){
    setErrorSizePicture(boolean)
  }
}

const functiontonforsetdata =(documnetType)=>{
  if(documnetType === "Exam Result (IC or IIAP)"){
    setExamResultICorIIAP(documnetType)
  }else if(documnetType === "IC Application"){
    setICApplication(documnetType)
  }else if(documnetType === "SSD ID/ SSS Form"){
    setSSDIDSSForm(documnetType)
  }else if(documnetType === "TIN"){
    setTINnumber(documnetType)
  }else if(documnetType === "ITR (Previous Year)"){
    setITRPreviousYear(documnetType)
  }else if(documnetType === "Fee Receipt"){
    setFeeReceipt(documnetType)
  }else if(documnetType === "Govt. IDs"){
    setGovtIDs(documnetType)
  }else if(documnetType === "ARSP"){
    setARSP(documnetType)
  }else if(documnetType === "New Agent’s Loyalty Plan (for Group Insurance)."){
    setAgentLoyaltyPlan(documnetType)
  }else if(documnetType === "FC’s Contract."){
    setFCContract(documnetType)
  }else if(documnetType === "Training Certificate"){
    setTrainingCertificate(documnetType)
  }else if(documnetType === "2x2 Size Picture"){
    setSizePicture(documnetType)
  }


}

const deleteDataFortype = (filetype) =>{

    if(filetype === "Exam Result (IC or IIAP)"){
      setFilenameExamResultICorIIAP("")
      setSizeExamResultICorIIAP("")
      setErrorExamResultICorIIAP(false)
      setExamResultICorIIAP("")
    }else if(filetype === "IC Application"){
      setFilenameICApplication("")
      setSizeICApplication("")
      setErrorExamResultICorIIAP(false)
      setExamResultICorIIAP("")
    }else if(filetype === "SSD ID/ SSS Form"){
      setFilenameSSDIDSSForm("")
      setSizeSSDIDSSForm("")
      setErrorSSDIDSSForm(false)
      setSSDIDSSForm("")
    }else if(filetype === "TIN"){
      setFilenameTINnumber("")
      setSizeTINnumber("")
      setErrorTINnumber(false)
      setTINnumber("")
    }else if(filetype === "ITR (Previous Year)"){
      setFilenameITRPreviousYear("")
      setSizeITRPreviousYear("")
      setErrorITRPreviousYear(false)
      setITRPreviousYear("")
    }else if(filetype === "Fee Receipt"){
      setFilenameFeeReceipt("")
      setSizeFeeReceipt("")
      setErrorFeeReceipt(false)
      setFeeReceipt("")
    }else if(filetype === "Govt. IDs"){
      setFilenameGovtIDs("")
      setSizeGovtIDs("")
      setErrorGovtIDs(false)
      setGovtIDs("")
    }else if(filetype === "ARSP"){
      setFilenameARSP("")
      setSizeARSP("")
      setErrorARSP(false)
      setARSP("")
    }else if(filetype === "New Agent’s Loyalty Plan (for Group Insurance)."){
      setFilenameAgentLoyaltyPlan("")
      setSizeAgentLoyaltyPlan("")
      setErrorAgentLoyaltyPlan(false)
      setAgentLoyaltyPlan("")
    }else if(filetype === "FC’s Contract."){
      setFilenameFCContract("")
      setSizeFCContract("")
      setErrorFCContract(Error)
      setFCContract("")
    }else if(filetype === "Training Certificate"){
      setFilenameTrainingCertificate("")
      setSizeTrainingCertificate("")
      setErrorTrainingCertificate(false)
      setTrainingCertificate("")
    }else if(filetype === "2x2 Size Picture"){
      setFilenameSizePicture("")
      setSizeSizePicture("")
      setErrorSizePicture(false)
      setSizePicture("")
    }
}
// const onChangeDeleteTINIDLicensed = () =>{
//   setErrorDataTINIDLicensed(false)
//   setTINIDLicensed("") 
// } 


const HandleallDocumnetUpload = async ({ file, onError },filetype) => {
  console.log("data====>",file,filetype)
  // validationImgFunction(file)
  if (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg' || file?.type === 'application/pdf') {
    // setTINIDLicensed(file?.name)
    functiontosetfilenameandsize(file,filetype)
    
    // setTINIDLicensedFileSize(file?.size)
    if (file && file.size > 5 * 1024 * 1024) {
      // setErrorDataTINIDLicensed(true)
      functiontoseterror(true,filetype)
     return message.error("File size exceeds the maximum limit.");
    }else{
      functiontoseterror(false,filetype)
      // setErrorDataTINIDLicensed(false)
    }
    try {
      setLoader(true);
      const Url = uploadURL;
      const formData = new FormData();
      formData.append("file", file);
      formData.append("agentId", agentIdFromRegister);
      formData.append("documentType", filetype);
      formData.append("agentFullName", agentFullNameFromRegister);
  
      const headers = headerObject
      const response = await axios.post(Url, formData, { headers });
      setLoader(false);
      if (response?.data?.statusCode === -1) {
        functiontonforsetdata(response?.data?.data?.data?.documentUploadResult?.documentType)
        // setPayloadTINID(response?.data?.data?.data?.documentUploadResult?.documentType)
        message.success(response?.data?.data?.message);
      }
      
    } catch (error) {
      setLoader(false);
      console.error("Error calling API:", error);
      
    }  
  }
  

};

// delete TIN ID for unlisence
const onChangeDeleteTINIDLicensed = () =>{
  setErrorDataTINIDLicensed(false)
  setTINIDLicensed("") 
} 

// ---- file upload first file For SSD ID Upload
const handleUploadSSDIDLicense = async ({ file, onError }) => {
  validationImgFunction(file)
  if(file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg'){
  setSSDIDLicensed(file?.name)
  setSSDIDLicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataSSDIDLicensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataSSDIDLicensed(false)
  }
  try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "SSD ID");
    formData.append("agentFullName", agentFullNameFromRegister);

    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadSSDID(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
    
  }
}
};
// delete SSD ID for unlisence
const onChangeDeleteSSDIDLicensed = () =>{
  setErrorDataSSDIDLicensed(false)
  setSSDIDLicensed("") 
} 

// CA FORM
const handleUploadCAFORMLicense = async ({ file, onError }) => {
  validationPDFFunction(file)
  if(file?.type === 'application/pdf'){
  setCAFORMLicensed(file?.name)
  setCAFORMLicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataCAFORMLicensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataCAFORMLicensed(false)
  }
  try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "CA FORM");
    formData.append("agentFullName", agentFullNameFromRegister);
    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadCAFORM(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
    
  }
  }
};
// delete CA FORM lisence
const onChangeDeleteCAFORMLicensed = () =>{
  setErrorDataCAFORMLicensed(false)
  setCAFORMLicensed("") 
} 

// PAYMENTLICENSEFEE 
const handleUploadPAYMENTLICENSEFEELicense = async ({ file, onError }) => {
  validationImgFunction(file)
  if (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg') {
  setPAYMENTLICENSEFEELicensed(file?.name)
  setPAYMENTLICENSEFEELicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataPAYMENTLICENSEFEELicensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataPAYMENTLICENSEFEELicensed(false)
  }
  try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "PAYMENT LICENSE FEE");
    formData.append("agentFullName", agentFullNameFromRegister);

    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadPAYMENTLICENSEFEE(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
    
  }
  }
};
// delete PAYMENTLICENSEFEE for lisence
const onChangeDeletePAYMENTLICENSEFEELicensed = () =>{
  setErrorDataPAYMENTLICENSEFEELicensed(false)
  setPAYMENTLICENSEFEELicensed("") 
} 

// ClearanceForm 
const handleUploadClearanceFormLicense = async ({ file, onError }) => {
  validationImgFunction(file)
  if (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg') {
  setClearanceFormLicensed(file?.name)
  setClearanceFormLicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataClearanceFormLicensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataClearanceFormLicensed(false)
  }

  try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "EXAM RESULT");
    formData.append("agentFullName", agentFullNameFromRegister);

    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadClearanceFormLicensed(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
    
  }
  }
};
// delete ClearanceForm lisence
const onChangeDeleteClearanceFormLicensed = () =>{
  setErrorDataClearanceFormLicensed(false)
  setClearanceFormLicensed("") 
} 

// PHOTOs size
const handleUploadPHOTOLicense = async ({ file, onError }) => {

  validationImgFunction(file)
  if (file?.type === 'image/png' || file?.type === 'image/jpeg' || file?.type === 'image/jpg') {
  setPHOTOLicensed(file?.name)
  setPHOTOLicensedFileSize(file?.size)

  // if (file && file.size > 5 * 1024 * 1024) {
  //   setErrorDataPHOTOLicensed(true)
  //  return message.error("File size exceeds the maximum limit.");
  // }else{
  //   setErrorDataPHOTOLicensed(false)
  // }
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
      message.error('Please select a JPG or PNG image file.');
      return false;
  }

  // Check file size
  const maxSizeMB = 5; // 2 MB
  if (file.size > maxSizeMB * 1024 * 1024) {
      message.error('Maximum file size allowed is 5 MB.');
      return false;
  }

  // Check image dimensions
  const img = new Image();
  img.onload = async function() {
      const widthInches = this.width / 96; // Convert width to inches (assuming 96 DPI)
      const heightInches = this.height / 96; // Convert height to inches (assuming 96 DPI)
      if (widthInches === heightInches) {
          try {
            setLoader(true);
            const Url = uploadURL;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("agentId", agentIdFromRegister);
            formData.append("documentType", "PHOTO");
            formData.append("agentFullName", agentFullNameFromRegister);
        
            const headers = headerObject
            const response = await axios.post(Url, formData, { headers });
            setLoader(false);
            if (response?.data?.statusCode === -1) {
              setPayloadPHOTOLicensed(response?.data?.data?.data?.documentUploadResult?.documentType)
              message.success(response?.data?.data?.message);
            }
            
          } catch (error) {
            setLoader(false);
            console.error("Error calling API:", error);
            
          }
          return false;
      }else{
        message.error('Image dimensions must be approximately 2 x 2 inches.');
      }

      // If everything is valid, you can proceed with uploading
      return true;
  };
  img.src = URL.createObjectURL(file);
  return false;
}
};

// delete PHOTO lisence
const onChangeDeletePHOTOLicensed = () =>{
  setErrorDataPHOTOLicensed(false)
  setPHOTOLicensed("") 
} 

// BIR2303 size
const handleUploadBIR2303License = async ({ file, onError }) => {
  validationPDFFunction(file)
  if(file?.type === 'application/pdf'){
  setBIR2303Licensed(file?.name)
  setBIR2303LicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataBIR2303Licensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataBIR2303Licensed(false)
  }

 try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "BIR2303");
    formData.append("agentFullName", agentFullNameFromRegister);

    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadBIR2303Licensed(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
  }
}
};

// delete BIR2303 lisence
const onChangeDeleteBIR2303Licensed = () =>{
  setErrorDataBIR2303Licensed(false)
  setBIR2303Licensed("") 
} 

// BIR1921 size
const handleUploadBIR1921License = async ({ file, onError }) => {
  validationPDFFunction(file)
  if(file?.type === 'application/pdf'){
  setBIR1921Licensed(file?.name)
  setBIR1921LicensedFileSize(file?.size)
  if (file && file.size > 5 * 1024 * 1024) {
    setErrorDataBIR1921Licensed(true)
   return message.error("File size exceeds the maximum limit.");
  }else{
    setErrorDataBIR1921Licensed(false)
  }

 try {
    setLoader(true);
    const Url = uploadURL;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("agentId", agentIdFromRegister);
    formData.append("documentType", "BIR1921");
    formData.append("agentFullName", agentFullNameFromRegister);

    const headers = headerObject
    const response = await axios.post(Url, formData, { headers });
    setLoader(false);
    if (response?.data?.statusCode === -1) {
      setPayloadBIR1921Licensed(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
  }
}
};

// delete BIR2303 lisence
const onChangeDeleteBIR1921Licensed = () =>{
  setErrorDataBIR1921Licensed(false)
  setBIR1921Licensed("") 
}
  // ************************* Licensed end *************************

  const closeModal = () =>{
    // dispatch(actions.resetLicencseAfiliateForm({}));
    setOpen(false)
    setMessageSubmit("")
  } 

  return (
    <>
      <LoginHeader />
      <FullPageLoader spinloader={loader} />
      <Row className="m-auto">
        <Col className="m-auto" xs={24} sm={24} md={24} lg={22} xl={22}>
          <div className="main_container">
            <div className="agent_login" style={{ marginBottom: 166 }}>
              <div className="title_wrapper">
                <div className="subheader d-block d-md-none">
                  <div className="register-yourself">Create Account</div>
                </div>
                <ProgressLine width={13} percent={65} />

                <div className="component-29">
                  <div className="ellipse-parent">
                    <div className="frame-child"></div>
                    <div className="div">1</div>
                  </div>
                  <div className="ellipse-parent">
                    <div className="frame-item2"></div>
                    <div className="div">2</div>
                  </div>
                  <div className="mobile-verification d-block d-md-none">
                    ACCOUNT FORM
                  </div>

                  <div className="ellipse-parent">
                    <div className="frame-item"></div>
                    <div className="div">3</div>
                  </div>
                </div>
                <div className="desktop-verification d-none d-md-block">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "40px",
                    }}
                  >
                    <div className="account_form_header">Registration form</div>
                    <div className="account_form_header">ACCOUNT FORM</div>
                    <div className="account_form_header">
                      APPLICATION STATUS
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form_wrapper">
              <div className="licenced_account_create">
                <Row gutter={[16, 16]} style={{ margin: 0 }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={24} md={24} lg={24}>
                      <div className="applicant-account-form-parent">
                      <div className="applicant-account-form--create">
                          Create Account
                        </div>
                        <div className="applicant-account-form">
                          Applicant account form
                        </div>
                        {/* <Radio.Group onChange={onChangeRadioButton} value={affiliated}>
                          <div className="radio-filled-parent">
                            <div className="radio-filled">
                              <Radio disabled={liceandAffiliat === "Affiliates" ? true : false} value="licenced">Licensed</Radio>
                            </div>
                            <div
                              className="radio-unfilled"
                              id="radioUnfilledContainer"
                            >
                              <Radio disabled={liceandAffiliat === "licenced" ? true : false} value="Affiliates">Affiliates</Radio>
                            </div>
                          </div>
                        </Radio.Group> */}
                      </div>
                    </Col>
                    {/* <Col>
                      <div className="download-form"> Download form</div>
                    </Col> */}
                  </Row>
                  {/* affiliated start */}
                  <Row gutter={[16, { xs: 16, sm: 16, md: 16, lg: 16 }]}>
                    {/* {affiliated === "Affiliates" ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="click-here-to-open-the-form-li-parent">
                            <div className="click-here-to">
                              Click here to open the form link, fill it out and
                              submit.
                            </div>
                            <div className="licensed-agent-profile-form-parent">
                              <div className="licensed-agent-profile">
                                New Agent profile form <span style={{color: 'red'}}>*</span>
                              </div>

                              <div className="click-to-open-wrapper" onClick={() => setOpen(true)}>
                                <div className="click-to-open">
                                  Click to open{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof">ID proof</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                        <div className="ssid-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">Valid Government ID<sup className="supscript">*</sup></div>
                                </div>
                                <div className={checkFormDisable("TIN ID") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(TinId, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(TinId, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteTIN}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={selectedPhoto}
                                    onChange={handleUploadTinId}
                                    showUploadList={false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    beforeUpload={() => false}
                                    disabled={checkFormDisable("TIN ID")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("TIN ID") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorData == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                              
                            </div>
                          </div>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">
                                    Proof of bank account number ownership <sup className="supscript">*</sup>
                                  </div>
                                </div>
                                <div className={checkFormDisable("BANK ACCOUNT NUMBER") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(proofOfBank, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(proofOfBank, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteTINProofOfBank}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={selectedPhoto}
                                    onChange={handleUploadProofOfBank}
                                    showUploadList={false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    beforeUpload={() => false}
                                    disabled={checkFormDisable("BANK ACCOUNT NUMBER")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("BANK ACCOUNT NUMBER") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorDataForBank == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>
                      </>
                    ) : (
                      <> */}
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="click-here-to-open-the-form-li-parent">
                            <div className="click-here-to">
                              Click here to open the form link, fill it out and
                              submit.
                            </div>
                            <div className="licensed-agent-profile-form-parent">
                              <div className="licensed-agent-profile">
                                {"New Agent profile form"}
                                {/* {affiliateLicensecFormText === "Affiliates" ? "Affiliate" : "Licensed"} agent profile form{" "}<span style={{color: 'red'}}>*</span> */}
                              </div>
                              <a onClick={() => setOpen(true)}>
                                <div className="click-to-open-wrapper">
                                  <div className="click-to-open">
                                    Click to open{" "}
                                  </div>
                                </div>
                              </a>
                            </div>
                          </div>
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="please-download-form-from-belo-parent">
                            <div className="please-download-form">
                              Please download form from below to fill them out.
                              You will require scanned copy to upload.
                            </div>
                            <div className="licensed-agent-profile-form-parent">
                              <div className="licensed-agent-profile">
                                BPI account opening form{" "} 
                              </div>
                              <div className="click-to-open-wrapper">
                                <div className="click-to-open" onClick={downloadPDF}>Download</div>
                              </div>
                            </div>
                          </div>
                        </Col> */}


                        {/* <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader-wrapper">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label2">
                                  <div className="label-text">
                                    BPI account opening form <sup className="supscript">*</sup>
                                  </div>
                                </div>
                              
                                <div className={checkFormDisable("BPI FORM") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(BPIaccountopeningLicensed, 14) && (
                                    <div className="d-flex">
                                      <div>
                                        {truncate(BPIaccountopeningLicensed, 14)}
                                      </div>
                                      <DeleteOutlined
                                        onClick={onChangeDeleteBPIaccountopeningLicensed}
                                        className="doc-delete-icon"
                                      />
                                    </div>
                                  )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.bpiAccountForm}
                                    onChange={handleUploadBPIaccountopening}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".pdf"
                                    disabled={checkFormDisable("BPI FORM")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("BPI FORM") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorDataBPIaccountopeningLicensed == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col> */}

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof">NEW AGENT: TO OBTAIN IC CERTIFICATE OF AUTHORITY (CA)</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">Examination Result (IC or IIAP) (1 page)<sup className="supscript">*</sup></div>
                                </div>

                                <div className={checkFormDisable("Exam Result (IC or IIAP)") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        
                                        backgroundColor: '#1d428a',
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameexamResultICorIIAP, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameexamResultICorIIAP, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("Exam Result (IC or IIAP)")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"Exam Result (IC or IIAP)") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("Exam Result (IC or IIAP)")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("Exam Result (IC or IIAP)") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorexamResultICorIIAP == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">Accomplished IC Application (4 pages)<sup className="supscript">*</sup></div>
                                </div>

                                <div className={checkFormDisable("IC Application") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        
                                        backgroundColor: '#1d428a',
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameiCApplication, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameiCApplication, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("IC Application")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"IC Application") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("IC Application")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("IC Application") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              <div className="ca-form-parent">
                                <div className="child-ca">
                                {erroriCApplication == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                                </div>
                                <div className="cas-child-2">
                                  <a href={Accomplished_IC} download="Accomplished_IC_Application.pdf">Download form here</a>
                                </div>
                            </div>
                              {/* {erroriCApplication == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>} */}
                            </div>
                          </div>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="ssid-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">SSS ID or any SSS Form reflecting name and number. (1 page) <sup className="supscript">*</sup></div>
                                </div>
                                <div className={checkFormDisable("SSD ID/ SSS Form") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenamesSDIDSSForm, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenamesSDIDSSForm, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("SSD ID/ SSS Form")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"SSD ID/ SSS Form") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("SSD ID/ SSS Form")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("SSD ID/ SSS Form") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorsSDIDSSForm == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">TIN ID or TIN Verification. (1 page)<sup className="supscript">*</sup></div>
                                </div>

                                <div className={checkFormDisable("TIN") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        
                                        backgroundColor: '#1d428a',
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameTINnumber, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameTINnumber, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("TIN")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"TIN") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("TIN")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("TIN") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorTINnumber == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">ITR in the year immediately prior to joining PhilLife</div>
                                </div>

                                <div className={checkFormDisable("ITR (Previous Year)") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        
                                        backgroundColor: '#1d428a',
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameITRPreviousYear, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameITRPreviousYear, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("ITR (Previous Year)")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"ITR (Previous Year)") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("ITR (Previous Year)")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("ITR (Previous Year)") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorITRPreviousYear == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">Filing Fee - P 1,645.00 Invoice (Official Receipt).<sup className="supscript">*</sup></div>
                                </div>

                                <div className={checkFormDisable("Fee Receipt") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        
                                        backgroundColor: '#1d428a',
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameFeeReceipt, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameFeeReceipt, 14)}</div>
                                        <DeleteOutlined
                                         onClick={()=>deleteDataFortype("Fee Receipt")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"Fee Receipt") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("Fee Receipt")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("Fee Receipt") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorFeeReceipt == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof-parent">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label">
                                  <div className="label-text">2 other valid government-issued IDs, if SSD ID card or TIN card does have embedded pictures.<sup className="supscript">*</sup></div>
                                </div>

                                <div className={checkFormDisable("Govt. IDs") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        
                                        backgroundColor: '#1d428a',
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameGovtIDs, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameGovtIDs, 14)}</div>
                                        <DeleteOutlined
                                         onClick={()=>deleteDataFortype("Govt. IDs")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"Govt. IDs") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("Govt. IDs")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("Govt. IDs") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                              </div>
                              {errorGovtIDs == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>

                        

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="id-proof">TO OBTAIN FINANCIAL CONSULTANT (FC) CODE</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">Agent’s Recruitment &amp; Selection Profile (ARSP) <sup className="supscript">*</sup></div>
                              </div>
                              <div className={checkFormDisable("ARSP") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameARSP, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameARSP, 14) }</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("ARSP")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"ARSP") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("ARSP")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("ARSP") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                            </div>
                            <div className="ca-form-parent">
                                <div className="child-ca">
                                {errorARSP == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                                </div>
                                <div className="cas-child-2">
                                  <a href={Agent_Recruitment} download="Agent_Recruitment_and_selection.pdf">Download form here</a>
                                </div>
                            </div>
                            
                          </div>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">
                                New Agent’s Loyalty Plan (for Group Insurance) <sup className="supscript">*</sup>
                                </div>
                              </div>
                              <div className={checkFormDisable("New Agent’s Loyalty Plan (for Group Insurance).") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameAgentLoyaltyPlan, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameAgentLoyaltyPlan, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("New Agent’s Loyalty Plan (for Group Insurance).")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"New Agent’s Loyalty Plan (for Group Insurance).") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("New Agent’s Loyalty Plan (for Group Insurance).")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("New Agent’s Loyalty Plan (for Group Insurance).") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                            </div>

                            <div className="ca-form-parent">
                                <div className="child-ca">
                                {errorAgentLoyaltyPlan == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                                </div>
                                <div className="cas-child-2">
                                  <a href={New_loyalty} download="New_loyalty_plan_Application.pdf">Download form here</a>
                                </div>
                            </div>
                            {/* {errorAgentLoyaltyPlan == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>} */}
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">
                                FC’s Contract <sup className="supscript">*</sup>
                                </div>
                              </div>
                              <div className={checkFormDisable("FC’s Contract.") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameFCContract, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameFCContract, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("FC’s Contract.")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"FC’s Contract.") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("FC’s Contract.")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("FC’s Contract.") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                            </div>

                            <div className="ca-form-parent">
                                <div className="child-ca">
                                {errorFCContract == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                                </div>
                                <div className="cas-child-2">
                                  <a href={FC_Contract} download="FC_Contract.pdf">Download form here</a>
                                </div>
                            </div>
                            {/* {errorFCContract == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>} */}
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">
                                Certification of completion of Agent’s Training <sup className="supscript">*</sup>
                                </div>
                              </div>
                              <div className={checkFormDisable("Training Certificate") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameTrainingCertificate, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameTrainingCertificate, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("Training Certificate")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"Training Certificate") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("Training Certificate")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("Training Certificate") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                            </div>
                            {errorTrainingCertificate == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF,PNG or JPG files
                              </div>
                              </>}
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">1-piece 2x2 picture. Colored. Attire: Dark colors, corporate. White background<sup className="supscript">*</sup></div>
                              </div>
                              <div className={checkFormDisable("2x2 Size Picture") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(filenameSizePicture, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(filenameSizePicture, 14)}</div>
                                        <DeleteOutlined
                                          onClick={()=>deleteDataFortype("2x2 Size Picture")}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={(event)=>HandleallDocumnetUpload(event,"2x2 Size Picture") }
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".png, .jpg, .jpeg, .pdf"
                                    disabled={checkFormDisable("2x2 Size Picture")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("2x2 Size Picture") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                            </div>
                            {errorSizePicture == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Size : 2*2 inch. Maximum 5 MB. PDF,PNG or JPG files
                              only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                              Size : 2*2 inch. Maximum 5 MB. PDF,PNG or JPG files
                              only
                              </div>
                              </>}
                            <div className="maximum-2-mb">
                              
                            </div>
                          </div>
                        </Col>


                        {/* <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">
                                  BIR 2303 (Optional)
                                </div>
                              </div>
                              <div className={checkFormDisable("BIR2303") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(BIR2303Licensed, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(BIR2303Licensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteBIR2303Licensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadBIR2303License}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".pdf"
                                    disabled={checkFormDisable("BIR2303")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("BIR2303") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>
                            </div>
                            {errorDataBIR2303Licensed == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                          </div>
                        </Col> */}


                        {/* <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader">
                            <div className="label-parent">
                              <div className="label">
                                <div className="label-text">
                                  BIR 1921 (Optional)
                                </div>
                              </div>
                              <div className={checkFormDisable("BIR1921") === true ? 'browser_wrapperDisable' : 'browser_wrapper'}>
                                  <div
                                    className="doc-box"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-start",
                                    }}
                                  >
                                    <div
                                      className="child11"
                                      style={{
                                        backgroundColor: "#1d428a",
                                        borderColor: "#1d428a",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(BIR1921Licensed, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(BIR1921Licensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteBIR1921Licensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadBIR1921License}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                    accept=".pdf"
                                    disabled={checkFormDisable("BIR1921")}
                                  >
                                    <CustomButton
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1d428a",
                                        marginLeft: "auto",
                                        border:"none",
                                        cursor: checkFormDisable("BIR1921") === true ? 'not-allowed' : 'pointer'
                                      }}
                                    >
                                      Browse
                                    </CustomButton>
                                  </Upload>
                                </div>

                            </div>
                            {errorDataBIR1921Licensed == true ? <>
                                <div className="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 5 MB. PDF file only
                              </div>
                              </> : <>
                              <div className="maximum-2-mb">
                                Maximum 5 MB. PDF file only
                              </div>
                              </>}
                          </div>
                        </Col> */}
                      {/* </>
                    )} */}
                    <Col
                      // className="form-body"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={4}
                    >
                      <CustomButton
                        onClick={backdHandler}
                        type="primary"
                        // shape="round"
                        // className="last-btn-1"
                        // size="large"
                        style={{
                          borderRadius: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "0.625rem",
                          background: "#fff",
                          border: "none",
                          color: "#1d428a",
                          width: "100%",
                          height: "48px",
                          padding: "0px 20px",
                          // marginBottom: "18px",
                        }}
                        // icon={<FileTextOutlined />}
                        // onClick={submitHandler}
                        htmlType="submit"
                      >
                        Back
                      </CustomButton>
                    </Col>
                    <Col
                      // className="form-body"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={4}
                    >
                      <CustomButton
                        // onClick={() => history.push("/application-status")}
                        // className="last-btn-1"
                        // type="primary"
                        // shape="round"

                        // size="large"
                         onClick={AccountFormSubmit}
                        style={{
                          borderRadius: "12px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "0.625rem",
                          background: "#1d428a",
                          border: "none",
                          color: "#fff",
                          width: "100%",
                          height: "48px",
                          padding: "0px 20px",
                          // marginBottom: "18px",
                        }}
                      >
                        Next <ArrowRightOutlined style={{ paddingLeft: 10 }} />
                      </CustomButton>
                    </Col>
                  </Row>

                  {/* affiliated end */}
                </Row>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <Modal
        className="profile_form"
        // ${affiliateLicensecFormText === "Affiliates" ? "Affiliate" : affiliateLicensecFormText}
        title={`NEW AGENT PROFILE FORM`}
        width="100%"
        style={{
          top: 0,
        }}
        mask={false}
        footer={null}
        open={open}
        onCancel={closeModal}
        closable={closeModal}
      >
        <AgentProfileForm messageData={accountForm} setClose={closeModal} />
        
      </Modal>
    </>
  );
};

export default CreateAccount;
