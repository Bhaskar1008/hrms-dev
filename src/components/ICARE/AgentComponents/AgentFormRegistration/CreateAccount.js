import React, { useEffect, useState } from "react";
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

const CreateAccount = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { baseURL } = apiConfig;
  const cypherStore = useSelector((state) => state?.GetAgentCypherStore?.Agent_Cypher);
  const agentIdFromRegister = useSelector((state) => state?.agentOnBoardingRegister?.formData?.agentId);
  const agentFullNameFromRegister = useSelector((state) => state?.agentOnBoardingRegister?.formData?.agentFullName);
  
  // license store 
  const AllFormLicenseData = useSelector((state) => state?.agentOnBoardingRegister?.LisenceForm);
  const licenseForm = AllFormLicenseData?.licensedAgentProfileForm

  // affiliate store form
  const AllFormAffiliatesData = useSelector((state) => state?.agentOnBoardingRegister?.LisenceForm);
  const AffiliatesForm = AllFormAffiliatesData?.AffiliatesAgentProfileForm

  const getResult = useSelector((state) => state?.agentOnBoardingRegister?.allApplicationForm?.result);

  const DocumententsBind = useSelector((state) => state?.agentOnBoardingRegister);
  console.log("getResult", DocumententsBind);
  const stateData = useSelector((state) => state);
  console.log("stateData", stateData);
  

  const uploadURL = `${baseURL}secure/agent/document/upload`
  const headerObject = {
    ciphertext: cypherStore,
    authorization: null,
    "Content-Type": "application/json",
  };

  const history = useHistory();
  const [open, setOpen] = useState();
  const [value, setValue] = useState(1);
  const [affiliated, setAffiliated] = useState("licenced");
  const [loader, setLoader] = useState(false)

  // ========= affiliated Hooks start ===========
  const [TinId, setTinId] = useState("");
  const [proofOfBank, setProofOfBank] = useState("")
  const [errorData, setErrorData] = useState(false)
  const [errorDataForBank, setErrorDataForBank] = useState(false)
  const [payloadAffiliatBankProof, setPayloadAffiliatBankProof] = useState("")
  const [affiliatTINID, setAffiliatTINID] = useState("") 
  // ========= affiliated Hooks End ===========

  // ========= licensed Hooks start ===========
  const [BPIaccountopeningLicensed, setBPIaccountopeningLicensed] = useState("")
  console.log("BPIaccountopeningLicensed", BPIaccountopeningLicensed);
  const [errorDataBPIaccountopeningLicensed, setErrorDataBPIaccountopeningLicensed] = useState(false)
  const [TINIDLicensed, setTINIDLicensed] = useState("")
  const [errorDataTINIDLicensed, setErrorDataTINIDLicensed] = useState(false)
  const [SSDIDLicensed, setSSDIDLicensed] = useState("")
  const [errorDataSSDIDLicensed, setErrorDataSSDIDLicensed] = useState(false)
  const [CAFORMLicensed, setCAFORMLicensed] = useState("")
  const [errorDataCAFORMLicensed, setErrorDataCAFORMLicensed] = useState(false)
  const [PAYMENTLICENSEFEELicensed, setPAYMENTLICENSEFEELicensed] = useState("")
  const [errorDataPAYMENTLICENSEFEELicensed, setErrorDataPAYMENTLICENSEFEELicensed] = useState(false)
  const [ClearanceFormLicensed, setClearanceFormLicensed] = useState("")
  const [errorDataClearanceFormLicensed, setErrorDataClearanceFormLicensed] = useState(false)
  const [PHOTOLicensed, setPHOTOLicensed] = useState("")
  const [errorDataPHOTOLicensed, setErrorDataPHOTOLicensed] = useState(false)
  const [BIR2303Licensed, setBIR2303Licensed] = useState("")
  const [errorDataBIR2303Licensed, setErrorDataBIR2303Licensed] = useState(false)
  const [BIR1921Licensed, setBIR1921Licensed] = useState("")
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
  const [messageApi, contextHolder] = message.useMessage();
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

  // console.log("selectFile===", selectedPhoto);

  useEffect(() => {
    window.scrollTo(0, 0);

    // form binding 
    setAffiliated(getResult?.applicantType ? getResult?.applicantType : "licenced")
    form.setFieldsValue({
      affiliated: getResult?.applicantType ? getResult?.applicantType : "licenced"
    })

  }, []);

  const onChange = (e) => {
    // dispatch(actions.resetFormAgentONBoardData({}));
    // dispatch(actions.storeAgentONBoardLisenceForm({}));
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
    setAffiliated(e.target.value);

    /// licenced error data clear 
    if (e.target.value === 'licenced') {
      setBPIaccountopeningLicensed("")
      setErrorDataBPIaccountopeningLicensed(false)
      setTINIDLicensed("")
      setErrorDataTINIDLicensed(false)
      setSSDIDLicensed("")
      setErrorDataSSDIDLicensed(false)
      setCAFORMLicensed("")
      setErrorDataCAFORMLicensed(false)
      setPAYMENTLICENSEFEELicensed("")
      setErrorDataPAYMENTLICENSEFEELicensed(false)
      setClearanceFormLicensed("")
      setErrorDataClearanceFormLicensed(false)
      setPHOTOLicensed("")
      setErrorDataPHOTOLicensed(false)
      setBIR2303Licensed("")
      setErrorDataBIR2303Licensed(false)
      setBIR1921Licensed("")
      setErrorDataBIR1921Licensed(false)
    }else{
      setTinId("")
      setProofOfBank("")
      setErrorData(false)
      setErrorDataForBank(false)
    }

  };

  const accountForm = affiliated

  const submitHandler = (licencedFormData) => {
    console.log("licencedFormData==", licencedFormData);
  };

  const nextdHandler = () => {
    submitHandler(licencedFormData);
    history.push("/verify-deatils");
  };
  const backdHandler = () => {
    history.push("/agent-form");
  };

  // for 3 dots ... 
  function truncate(source, size) {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  }
  
  // =================  account form submit ===============
  const licenData = licenseForm;
  console.log("Lincense data",licenData)
  const affiliatedData = AffiliatesForm;

  const AccountFormSubmit = async () =>{
    if (affiliated === "licenced") {

      if (licenData === null || licenData === undefined) {
        return message.error("Please fill the Licensed form and submit")
      }
      // BPI 
      if (BPIaccountopeningLicensed === "") {
        setErrorDataBPIaccountopeningLicensed(true)
        return message.error("Please Upload BPI Account Opening Form")
      }else{
        setErrorDataBPIaccountopeningLicensed(false)
      }

      // tin ID
      if (TINIDLicensed === "") {
        setErrorDataTINIDLicensed(true)
        return message.error("Please Upload TIN ID")
      }else{
        setErrorDataTINIDLicensed(false)
      }

       // SSDIDLicensed ID
       if (SSDIDLicensed === "") {
        setErrorDataSSDIDLicensed(true)
        return message.error("Please Upload SSD ID")
      }else{
        setErrorDataSSDIDLicensed(false)
      }

      // CAFORMLicensed ID
      if (CAFORMLicensed === "") {
        setErrorDataCAFORMLicensed(true)
        return message.error("Please Upload CA Form")
      }else{
        setErrorDataCAFORMLicensed(false)
      }

      //PAYMENTLICENSEFEELicensed
      if (PAYMENTLICENSEFEELicensed === "") {
        setErrorDataPAYMENTLICENSEFEELicensed(true)
        return message.error("Please Upload Proof Of Payment License Fee")
      }else{
        setErrorDataPAYMENTLICENSEFEELicensed(false)
      }

      // ClearanceFormLicensed
      if (ClearanceFormLicensed === "") {
        setErrorDataClearanceFormLicensed(true)
        return message.error("Please Upload Exam Result Or Clearance Form")
      }else{
        setErrorDataClearanceFormLicensed(false)
      }

      // PHOTOLicensed
      if (PHOTOLicensed === "") {
        setErrorDataPHOTOLicensed(true)
        return message.error("Please Upload 2*2 Size Photo")
      }else{
        setErrorDataPHOTOLicensed(false)
      }
    }else{
      if (affiliatedData === null || affiliatedData === undefined) {
        return message.error("Please fill the Affiliates form and submit")
      }
      if (TinId === "") {
        setErrorData(true)
        return message.error("Please Upload TIN ID")
      }else{
        setErrorData(false)
      }
    }
    
    try {
      setLoader(true);
      const Url = `${baseURL}secure/agent/submitApplication`;
      const requestBody = {

        applicantType: affiliated,
        agentId: agentIdFromRegister,
        licensedAgentProfileForm: affiliated === "licenced" ? licenData : null,
        AffiliatesAgentProfileForm: affiliated !== "licenced" ? affiliatedData : null,
        documnetSubmitted_Types: affiliated === "licenced" ? [payloadBPIAccountOpen, payloadTINID, payloadSSDID, payloadCAFORM, payloadPAYMENTLICENSEFEE, payloadClearanceFormLicensed, payloadPHOTOLicensed, payloadBIR2303Licensed, payloadBIR1921Licensed] : [affiliatTINID, payloadAffiliatBankProof]
          
      };
      const headers = headerObject
      const response = await axios.post(Url, requestBody, { headers });
      if (response?.data?.statusCode === -1) {
        const allApplicationStatus = response?.data?.data
        setLoader(false);
        message.success(response?.data?.data?.message);
        history.push("/verify-details")
        dispatch(actions.storeAgentAllApplicationForm(allApplicationStatus));
      }
    } catch (error) {
      setLoader(false);
      console.error("Error calling API:", error);
    }
  }

  const validationImgFunction = (file) =>{
    const allowedFileTypes = [
      'image/gif',
      'image/jpeg',
      'image/png',
    ];
    if (
      file &&
      (!allowedFileTypes.includes(file.type) )
    ) {
      message.error("Please Upload PNG or JPG files only");
      return;
    }
  }

  // ********************* Affiliates ************** start 
  // ---- file upload first file For TIN ID Upload
  const handleUploadTinId = async ({ file, onError }) => {
    
    validationImgFunction(file)
    setTinId(file?.name)
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorData(true)
     return message.error("File size should not exceed 2 MB");
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
      onError();
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
    validationImgFunction(file)
    if (file && file.size > 2 * 1024 * 1024) {
      setErrorDataForBank(true)
     return message.error("File size should not exceed 2 MB");
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
      onError();
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
  console.log("file---", file.name);
  validationImgFunction(file)
  setBPIaccountopeningLicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataBPIaccountopeningLicensed(true)
   return message.error("File size should not exceed 2 MB");
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
      console.log("response---", response?.data?.data?.data?.documentUploadResult);
      setPayloadBPIAccountOpen(response?.data?.data?.data?.documentUploadResult?.documentType)
      message.success(response?.data?.data?.message);
    }
    
  } catch (error) {
    setLoader(false);
    console.error("Error calling API:", error);
    onError();
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
  setTINIDLicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataTINIDLicensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
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
  setSSDIDLicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataSSDIDLicensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
  }

};
// delete SSD ID for unlisence
const onChangeDeleteSSDIDLicensed = () =>{
  setErrorDataSSDIDLicensed(false)
  setSSDIDLicensed("") 
} 

// CA FORM
const handleUploadCAFORMLicense = async ({ file, onError }) => {
  validationImgFunction(file)
  setCAFORMLicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataCAFORMLicensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
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
  setPAYMENTLICENSEFEELicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataPAYMENTLICENSEFEELicensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
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
  setClearanceFormLicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataClearanceFormLicensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
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
  setPHOTOLicensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataPHOTOLicensed(true)
   return message.error("File size should not exceed 2 MB");
  }else{
    setErrorDataPHOTOLicensed(false)
  }

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
    onError();
  }
};

// delete PHOTO lisence
const onChangeDeletePHOTOLicensed = () =>{
  setErrorDataPHOTOLicensed(false)
  setPHOTOLicensed("") 
} 

// BIR2303 size
const handleUploadBIR2303License = async ({ file, onError }) => {
  validationImgFunction(file)
  setBIR2303Licensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataBIR2303Licensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
  }
};

// delete BIR2303 lisence
const onChangeDeleteBIR2303Licensed = () =>{
  setErrorDataBIR2303Licensed(false)
  setBIR2303Licensed("") 
} 

// BIR1921 size
const handleUploadBIR1921License = async ({ file, onError }) => {
  validationImgFunction(file)
  setBIR1921Licensed(file?.name)
  if (file && file.size > 2 * 1024 * 1024) {
    setErrorDataBIR1921Licensed(true)
   return message.error("File size should not exceed 2 MB");
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
    onError();
  }
};

// delete BIR2303 lisence
const onChangeDeleteBIR1921Licensed = () =>{
  setErrorDataBIR1921Licensed(false)
  setBIR1921Licensed("") 
}
  // ************************* Licensed end *************************

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
                    <div className="account_form_header">CREATE ACCOUNT</div>
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
                        <div className="applicant-account-form">
                          Applicant account form
                        </div>
                        <Radio.Group onChange={onChange} value={affiliated}>
                          <div className="radio-filled-parent">
                            <div className="radio-filled">
                              <Radio value="licenced">Licensed</Radio>
                            </div>
                            <div
                              className="radio-unfilled"
                              id="radioUnfilledContainer"
                            >
                              <Radio value="Affiliates">Affiliates</Radio>
                            </div>
                          </div>
                        </Radio.Group>
                      </div>
                    </Col>
                    <Col>
                      <div className="download-form">Download form</div>
                    </Col>
                  </Row>
                  {/* affiliated start */}
                  <Row gutter={[16, { xs: 16, sm: 16, md: 16, lg: 16 }]}>
                    {affiliated === "Affiliates" ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="click-here-to-open-the-form-li-parent">
                            <div className="click-here-to">
                              Click here to open the form link, fill it out and
                              submit.
                            </div>
                            <div className="licensed-agent-profile-form-parent">
                              <div className="licensed-agent-profile">
                                Affiliate online application form <span style={{color: 'red'}}>*</span>
                              </div>
                              {/* {affiliatedData === null || affiliatedData === undefined ? <>
                              
                              </> : ""} */}

                              <div className="click-to-open-wrapper" onClick={() => setOpen(true)}>
                                <div className="click-to-open">
                                  Click to open{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="id-proof">ID proof</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                        <div class="ssid-proof-parent">
                            <div class="uploader">
                              <div class="label-parent">
                                <div class="label">
                                  <div class="label-text">TIN ID<sup className="supscript">*</sup></div>
                                </div>
                                <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
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
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                              </div>
                              {errorData == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                              
                            </div>
                          </div>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="id-proof-parent">
                            <div class="uploader">
                              <div class="label-parent">
                                <div class="label">
                                  <div class="label-text">
                                    Proof of bank account number ownership
                                  </div>
                                </div>
                                <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
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
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                              </div>
                              {errorDataForBank == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>
                      </>
                    ) : (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="click-here-to-open-the-form-li-parent">
                            <div className="click-here-to">
                              Click here to open the form link, fill it out and
                              submit.
                            </div>
                            <div className="licensed-agent-profile-form-parent">
                              <div className="licensed-agent-profile">
                                Licensed agent profile form{" "}<span style={{color: 'red'}}>*</span>
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
                        <Col xs={24} sm={24} md={24} lg={24}>
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
                                <div className="click-to-open">Download</div>
                              </div>
                            </div>
                          </div>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div className="uploader-wrapper">
                            <div className="uploader">
                              <div className="label-parent">
                                <div className="label2">
                                  <div className="label-text">
                                    BPI account opening form <sup className="supscript">*</sup>
                                  </div>
                                </div>
                              
                                <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
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
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                              </div>
                              {errorDataBPIaccountopeningLicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="id-proof">ID proof</div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="id-proof-parent">
                            <div class="uploader">
                              <div class="label-parent">
                                <div class="label">
                                  <div class="label-text">TIN ID <sup className="supscript">*</sup></div>
                                </div>
                                <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(TINIDLicensed, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(TINIDLicensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteTINIDLicensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadTINIDLicense}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                              </div>
                              {errorDataTINIDLicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="ssid-proof-parent">
                            <div class="uploader">
                              <div class="label-parent">
                                <div class="label">
                                  <div class="label-text">SSS ID <sup className="supscript">*</sup></div>
                                </div>
                                <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(SSDIDLicensed, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(SSDIDLicensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteSSDIDLicensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadSSDIDLicense}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                              </div>
                              {errorDataSSDIDLicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                            </div>
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="id-proof">Other Documents</div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="uploader">
                            <div class="label-parent">
                              <div class="label">
                                <div class="label-text">CA Form <sup className="supscript">*</sup></div>
                              </div>
                              <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(CAFORMLicensed, 14)  && (
                                      <div className="d-flex">
                                        <div>{truncate(CAFORMLicensed, 14) }</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteCAFORMLicensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadCAFORMLicense}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                            </div>
                            {errorDataCAFORMLicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                          </div>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="uploader">
                            <div class="label-parent">
                              <div class="label">
                                <div class="label-text">
                                  Proof of Payment License Fee <sup className="supscript">*</sup>
                                </div>
                              </div>
                              <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(PAYMENTLICENSEFEELicensed, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(PAYMENTLICENSEFEELicensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeletePAYMENTLICENSEFEELicensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadPAYMENTLICENSEFEELicense}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                            </div>
                            {errorDataPAYMENTLICENSEFEELicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                          </div>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="uploader">
                            <div class="label-parent">
                              <div class="label">
                                <div class="label-text">
                                  Exam Result Or Clearance Form <sup className="supscript">*</sup>
                                </div>
                              </div>
                              <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(ClearanceFormLicensed, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(ClearanceFormLicensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeleteClearanceFormLicensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadClearanceFormLicense}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                            </div>
                            {errorDataClearanceFormLicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                          </div>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="uploader">
                            <div class="label-parent">
                              <div class="label">
                                <div class="label-text">2*2 Size Photo <sup className="supscript">*</sup></div>
                              </div>
                              <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
                                      }}
                                    >
                                      <FolderAddOutlined
                                        style={{ color: "white" }}
                                      />
                                    </div>
                                    {truncate(PHOTOLicensed, 14) && (
                                      <div className="d-flex">
                                        <div>{truncate(PHOTOLicensed, 14)}</div>
                                        <DeleteOutlined
                                          onClick={onChangeDeletePHOTOLicensed}
                                          className="doc-delete-icon"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <Upload
                                    // selectFile={licencedFormData.tinId}
                                    onChange={handleUploadPHOTOLicense}
                                    showUploadList={false}
                                    beforeUpload={() => false}
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                            </div>
                            {errorDataPHOTOLicensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Size : 2*2 inch. Maximum 2 MB. PNG or JPG files
                              only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                              Size : 2*2 inch. Maximum 2 MB. PNG or JPG files
                              only
                              </div>
                              </>}
                            <div class="maximum-2-mb">
                              
                            </div>
                          </div>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="uploader">
                            <div class="label-parent">
                              <div class="label">
                                <div class="label-text">
                                  BIR 2303 (Optional)
                                </div>
                              </div>
                              <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
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
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>
                            </div>
                            {errorDataBIR2303Licensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                          </div>
                        </Col>


                        <Col xs={24} sm={24} md={24} lg={24}>
                          <div class="uploader">
                            <div class="label-parent">
                              <div class="label">
                                <div class="label-text">
                                  BIR 1921 (Optional)
                                </div>
                              </div>
                              <div className="browser_wrapper">
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
                                        backgroundColor: "#1D428A",
                                        borderColor: "#1D428A",
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
                                  >
                                    <Button
                                      className={`browse-btn`}
                                      style={{
                                        backgroundColor: "#1D428A",
                                        marginLeft: "auto",
                                        border:"none",
                                      }}
                                    >
                                      Browse
                                    </Button>
                                  </Upload>
                                </div>

                            </div>
                            {errorDataBIR1921Licensed == true ? <>
                                <div class="maximum-2-mb" style={{color: 'red'}}>
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </> : <>
                              <div class="maximum-2-mb">
                                Maximum 2 MB. PNG or JPG files only
                              </div>
                              </>}
                          </div>
                        </Col>
                      </>
                    )}
                    <Col
                      // className="form-body"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={4}
                    >
                      <Button
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
                          color: "#1D428A",
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
                      </Button>
                    </Col>
                    <Col
                      // className="form-body"
                      xs={24}
                      sm={24}
                      md={24}
                      lg={4}
                    >
                      <Button
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
                          background: "#1D428A",
                          border: "none",
                          color: "#fff",
                          width: "100%",
                          height: "48px",
                          padding: "0px 20px",
                          // marginBottom: "18px",
                        }}
                      >
                        Next <ArrowRightOutlined style={{ paddingLeft: 10 }} />
                      </Button>
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
        title="LICENSED AGENT PROFILE FORM"
        width="100%"
        style={{
          top: 0,
        }}
        mask={false}
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
        closable={() => setOpen(false)}
      >
        <AgentProfileForm messageData={accountForm} setClose={() => setOpen(false)} />
        
      </Modal>
    </>
  );
};

export default CreateAccount;
