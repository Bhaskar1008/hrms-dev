import React, { useState, useEffect, createRef } from "react";
import "./CustomerInformation.css";
import { useHistory, useLocation } from "react-router-dom";
import axiosRequest from "../../../../axios-request/request.methods";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import ExistingCustomerValidate from "../../../ExistingCustomerValidation/ExistingCustomerValidate";
import HypervergeSDK from "../../../../HypervergeSDK/HypervergeSDK";
import HypervergeComponent from "../../../../HypervergeSDK/HypervergeComponent";

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
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import * as actions from "../../../../store/actions";
import StepTwo from "../../StepBar/StepTwo/StepTwo";
import moment from "moment";
import _ from "lodash";
import AllFormFooter from "../../AllFormFooter/AllFormFooter";
import { Code } from "@material-ui/icons";
import { Key, Mail } from "@mui/icons-material";
import Validation from "../../../../components/ValidationForm/Validation";

const dateFormat = "MM/DD/YYYY";

const CustomerInformation = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [showMsg, setShowMsg] = useState(false);
  const [setSeletfile1, setSelectFile1] = useState(false);
  const [setSeletfile2, setSelectFile2] = useState(false);
  const [signatureName, setSignatureName] = useState("");
  const [showScreenLoader, setShowScreenLoader] = useState(false);

  const test = useSelector((state) => state);
  const photoIdArray = useSelector((state) => state?.uploadDocument?.photID);

  const signArray = useSelector((state) => state?.uploadDocument?.Sign);
  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );
  const hyperCtplData = useSelector((state) => state?.hyperverge?.hypervergeCtpl);

  // hooks ***************
  const customerStore = useSelector(
    (state) => state?.ctplqoutation.formData?.CTPL_CustomerInfo_for_Quotation
  );
  const zipAPI = useSelector((state) => state?.address?.zipcode);
  const Addresss = useSelector((state) => state?.address);
  let zipcode1 = []
  if (zipAPI !== undefined) {
    if (Object.keys(zipAPI).length !== 0) {
      zipcode1 = zipAPI?.lov
    }
  }


  const location = useLocation();
  const data = location.state;

  const { Option } = Select;
  const history = useHistory();
  const [size, setSize] = useState("default"); // default is 'middle'
  const [votarId, setVotarId] = useState("");
  // photoId and Sign hook
  const [selectedPhoto, setSelectedPhoto] = useState([...photoIdArray]);
  const [selectedSign, setSelectedSign] = useState([...signArray]);

  const [selectFileList, setSelectFileList] = useState(false);
  const [selectFile, setSelectFile] = useState([]);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [fullName, setFullName] = useState("");
  const [hyperStatus, setHyperStatus] = useState("");
  const [hyperData, setHyperData] = useState(null);
  const [suffix, setSuffix] = useState("");
  // loader
  const [loader, setLoader] = useState(false);

  const [gender, setGender] = useState("");
  const [genderName, setGenderName] = useState("");
  const [citizenship, setCitizenship] = useState("PHL");
  const [citizenshipName, setCitizenshipName] = useState("Philippines");

  const [birthDate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [address1, setAddress1] = useState("");
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState(null);
  const [province, setProvince] = useState("");
  const [provinceName, setProvinceName] = useState("");
  const [code, setCode] = useState("");
  const [cityCode, setCityCode] = useState("");
  const [zipcode, setZipcode] = useState(null);
  // zipcode1?.COD_POSTAL
  const [mobile, setMobile] = useState("");
  const [birthPlace, setBirthplace] = useState("");
  const [email, setEmail] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [IdNumber, setIDNumber] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [zipcodeOptions, setZipcodeOptions] = useState([]);
  const [suffixName, setSuffixName] = useState("")

  const formRef = createRef();
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  // Dropdown start here


  const GenderOptions = [
    { label: "Male", value: "Male", id: "1", notation: "M" },
    { label: "Female", value: "Female", id: "0", notation: "F" },
    // { label: "Others", value: "Others", id: "3", notation: "O" },
  ];

  let documentTypeApi = useSelector(
    (state) => state?.groupPolicy?.documentType?.lovOptions
  );

  const states = useSelector((state) => state?.address?.states);

  const citizenshipApi = useSelector(
    (state) => state?.address?.citizenship?.lov
  );


  if (
    states !== undefined && states?.length === 0 &&
    Object.keys(states).length !== 0
  ) {
    states?.sort(function (a, b) {
      const stateName1 = a.NOM_PROV?.toUpperCase();
      const stateName2 = b.NOM_PROV?.toUpperCase();
      if (stateName1 < stateName2) {
        return -1;
      }
      if (stateName1 > stateName2) {
        return 1;
      }
    });
  }

  let stateOptions =
    states && !_.isEmpty(states)
      ? states?.map((state) => {
        const label = state.NOM_PROV;
        const value = state.NOM_PROV;
        const key = state.COD_PROV;
        const newState = { ...state, label, value, key };
        // state.push(label)
        return newState;
      })
      : null;

  let cities = useSelector((state) => state?.address?.cities?.lov);

  let citiesOptions = cities && !_.isEmpty(cities)
    ? cities?.map((city) => {
      const label = city.NOM_LOCALIDAD;
      const value = city.NOM_LOCALIDAD;
      const key = city.COD_LOCALIDAD;
      const newCities = { ...city, label, value, key };
      return newCities;
    })
    : null;

  //  if (cities === undefined) {
  //   console.log("No data found");
  //  }else{
  //   citiesOptions 
  //  }


  // citizenshipApi
  let citizenshipOptions =
    citizenshipApi && !_.isEmpty(citizenshipApi)
      ? citizenshipApi?.map((state) => {
        const label = state.NOM_PAIS;
        const value = state.COD_PAIS;
        const key = state.COD_PAIS;
        const newState = { ...state, label, value, key };
        // state.push(label)
        return newState;
      })
      : null;

  // zipcode option zipcode1
  // let zipcodeOptions = zipcode1 && !_.isEmpty(zipcode1)
  // ? zipcode1?.map((state) => {
  //   const label = state.COD_POSTAL;
  //   const value = state.COD_POSTAL;
  //   const key = state.COD_POSTAL;
  //   const newState = { ...state, label, value, key };
  //   // state.push(label)
  //   return newState;
  // })
  // : null; 


  const onSearch = (value) => {
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  if (documentTypeApi !== undefined && documentTypeApi?.length !== 0) {
    documentTypeApi?.sort(function (a, b) {
      // console.log("a", a)
      // console.log("b", b)
      const stateName1 = a.NOM_VALOR?.toUpperCase();
      const stateName2 = b.NOM_VALOR?.toUpperCase();
      if (stateName1 < stateName2) {
        return -1;
      }
      if (stateName1 > stateName2) {
        return 1;
      }
    });
  }


  let documentTypeOptions =
    documentTypeApi && !_.isEmpty(documentTypeApi)
      ? documentTypeApi.map((DOCUMENTTYPE) => {
        const label = DOCUMENTTYPE.NOM_VALOR;
        const value = DOCUMENTTYPE.ADQC_ID;
        // const key = city.COD_LOCALIDAD;
        const newDocumentType = { ...DOCUMENTTYPE, label, value };
        return newDocumentType;
      })
      : null;

  useEffect(() => {
    dispatch(actions.fetchAllState());
    dispatch(actions.fetchAllDocumentType());
    dispatch(actions.fetchAllCitizenship());
    dispatch(actions.fetchAllSuffix());
  }, []);

  const SuffixOptions = useSelector((state) => state?.make?.suffix);

  let modalOptions = [];
  if (typeof SuffixOptions !== "string") {
    modalOptions =
      SuffixOptions && !_.isEmpty(SuffixOptions)
        ? SuffixOptions.map((SUFFIX) => {
          const label = SUFFIX?.NOM_VALOR;
          const value = SUFFIX?.TIPO_SUFIJO_NOMBRE;
          const newSuffix = { ...SUFFIX, label, value };
          return newSuffix;
        })
        : null;
  }

  // useEffect(() => {
  //   console.log("zipcode1", zipcode1);
  //   console.log("zipcode1?.COD_POSTAL", zipcode1?.COD_POSTAL);
  //   setZipcode(zipcode1[0]?.COD_POSTAL);
  // }, [zipcode1]);

  useEffect(() => {
    // setIDNumber(customerStore?.documentCode ? customerStore?.documentCode : "");
    // setDocumentType(
    //   customerStore?.documentType ? customerStore?.documentType : ""
    // );
    if (hyperCtplData) {
      checkIdAvailable(hyperCtplData?.isExistingCustomer)
    }
    if(hyperCtplData?.hypervergeDocName){
      setHyperStatus("auto_approved")
    }
    const filteredGender = GenderOptions.filter(
      (item) => item.id == customerStore?.gender || item.notation == customerStore?.gender
    )[0];
    setFirstName(customerStore?.firstName ? customerStore?.firstName : "");
    setLastName(customerStore?.lastName ? customerStore?.lastName : "");
    setMiddleName(customerStore?.middleName ? customerStore?.middleName : "");
    setSuffix(customerStore?.suffix ? customerStore?.suffix : null);
    setGender(filteredGender);
    setGenderName(filteredGender?.label ? filteredGender?.label : "")
    setCitizenship(
      customerStore?.citizenship ? customerStore?.citizenship : "PHL"
    );
    setBirthdate(
      customerStore?.birthDate
        ? moment(customerStore?.birthDate).format("MM/DD/YYYY")
        : ""
    );
    setAddress(customerStore?.addressLine1 ? customerStore?.addressLine1 : "");
    setAddress1(customerStore?.addressLine2 ? customerStore?.addressLine2 : "");
    setCity(customerStore?.city ? customerStore?.city : null);
    setCityName(customerStore?.cityName ? customerStore?.cityName : null);
    setProvince(customerStore?.province ? customerStore?.province : null);
    setProvinceName(
      customerStore?.provinceName ? customerStore?.provinceName : null
    );
    getZipCodeList(customerStore?.province ? customerStore?.province : null, customerStore?.city ? customerStore?.city : null, customerStore?.zipCode ? customerStore?.zipCode : "");
    setZipcode(customerStore?.zipCode ? customerStore?.zipCode : "");
    setMobile(customerStore?.mobileNumber ? customerStore?.mobileNumber : "");
    setBirthplace(
      customerStore?.placeOfBirth ? customerStore?.placeOfBirth : ""
    );
    setEmail(customerStore?.email ? customerStore?.email : "");
    setSignatureName(hyperCtplData?.signature?.length > 0 ? hyperCtplData?.signature[0]?.name : null);
    setSelectFile(hyperCtplData?.signature?.length > 0 ? hyperCtplData?.signature : []);
    setFullName(hyperCtplData?.hypervergeDocName);

    form.setFieldsValue({
      IdNumber: customerStore?.documentCode ? customerStore?.documentCode : "",
      documentType: customerStore?.documentType
        ? customerStore?.documentType
        : "",
      firstName: customerStore?.firstName ? customerStore?.firstName : "",
      lastName: customerStore?.lastName ? customerStore?.lastName : "",
      middleName: customerStore?.middleName ? customerStore?.middleName : "",
      suffix: customerStore?.suffix ? customerStore?.suffix : null,
      gender: filteredGender,
      genderName: filteredGender?.label ? filteredGender?.label : "",
      citizenship: customerStore?.citizenship
        ? customerStore?.citizenship
        : "PHL",
      birthDate: customerStore?.birthDate
        ? moment(customerStore?.birthDate)
        : "",
      addressLine1: customerStore?.addressLine1 ? customerStore?.addressLine1 : "",
      addressLine2: customerStore?.addressLine2 ? customerStore?.addressLine2 : "",
      city: customerStore?.city ? customerStore?.city : null,
      province: customerStore?.province ? customerStore?.province : null,
      zipcode: customerStore?.zipCode ? customerStore?.zipCode : "",
      mobile: customerStore?.mobileNumber ? customerStore?.mobileNumber : "",
      birthPlace: customerStore?.placeOfBirth
        ? customerStore?.placeOfBirth
        : "",
      email: customerStore?.email ? customerStore?.email : "",
      provinceName: customerStore?.provinceName ? customerStore?.provinceName : null,
      cityName: customerStore?.cityName ? customerStore?.cityName : null

    });
    setIsDisable({
      firstName: !!customerStore?.firstName,
      lastName: !!customerStore?.lastName,
      middleName: !!customerStore?.middleName,
      gender: !!customerStore?.gender,
      birthDate: !!customerStore?.birthDate,
      // suffix: !!customerStore?.suffix,
      // citizenship: !!customerStore?.citizenship,
      // address: !!customerStore?.addressLine1,
      // address1: !!customerStore?.addressLine2,
      // cityName: customerStore?.cityName,
      // provinceName: customerStore?.provinceName,
      // zipcode: !!customerStore?.zipCode,
      // birthPlace: !!customerStore?.placeOfBirth,
      // mobile: !!customerStore?.mobileNumber,
      // email: !!customerStore?.email,
    });
  }, []);

  const DocumentTypeHandler = (value, key) => {
    // setSelectedMake(key.COD_MARCA);
    setDocumentType(key.ADQC_ID);

    // dispatch(actions.fetchAllDocumentType(key.ADQC_ID));
  };
  // functions
  const OnchangeOvater = (e) => {
    setVotarId(e);
  };
  const onChangeIDNumber = (e) => {
    setIDNumber(e.target.value);
  };
  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
    disableNextBtn();
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
    disableNextBtn();
  };
  const onChangeMiddleName = (e) => {
    setMiddleName(e.target.value);
    disableNextBtn();
  };
  const onChangeSuffix = (item, key) => {
    setSuffixName(key.NOM_VALOR)
    setSuffix(key.TIPO_SUFIJO_NOMBRE);
    disableNextBtn();
  };
  const onChangeGender = (e) => {
    setGender(e);
    setGenderName(e)
    disableNextBtn();
  };
  // const onChangeCitizenship = (e) => {
  //   setCitizenship(e.target.value);
  // };
  const onChangeBirthPlace = (e) => {
    setBirthplace(e.target.value);
    disableNextBtn();
  };
  const onChangeAddresse1 = (e) => {
    setAddress1(e.target.value);
    disableNextBtn();
  };
  const onChangeAddresse = (e) => {
    setAddress(e.target.value);
    disableNextBtn();
  };
  const onChangeCity = (value, key) => {
    setLoader(true)
    setCityName(key.NOM_LOCALIDAD);
    setCity(key.COD_LOCALIDAD);
    setCityCode(key.COD_LOCALIDAD);
    setZipcodeOptions([]);
    setZipcode(null);
    form.setFieldsValue({
      zipcode: null,
    })
    getZipCodeList(code, key.COD_LOCALIDAD);
    // // fetchAllZipCode 
    // dispatch(actions.fetchAllZipCode(key.COD_LOCALIDAD, code, result => {
    //   if (result?.statusCode === -1) {
    //     setLoader(false)
    //   } else {
    //     setLoader(false)
    //   }
    // }));
    disableNextBtn();
  };

  const onChangeProvince = (event, key) => {
    setProvince(key.COD_PROV);
    // setStateProvince(key.value);
    setProvinceName(key.NOM_PROV);
    
    setCityName(null);
    setZipcode(null);
    form.setFieldsValue({
      cityName: null,
      zipcode: null,
    })
    // setCityProvince("");
    disableNextBtn();
  };

  const stateSelectHandler = (value, key) => {
    setLoader(true)
    setCode(key.COD_PROV);
    setZipcodeOptions([]);
    // dispatch(actions.fetchAllZipCode(null));
    setCityName(null);
    setZipcode(null);
    form.setFieldsValue({
      cityName: null,
      zipcode: null,
    })
    dispatch(actions.fetchAllCities(key.COD_PROV, result => {
      if (result?.statusCode === -1) {
        setLoader(false)
      } else {
        setLoader(false)
      }
    }));
  };
  const citizenshipSelectHandler = (value, key) => {
    setCitizenship(key.COD_PAIS);
    setCitizenshipName(key.NOM_PAIS)
    disableNextBtn();
  };
  // const citySelectHandler = (value, key) => {
  //   setCode(key.COD_PROV);
  //   // dispatch(actions.fetchAllCities(key.COD_PROV));
  // };
  const onChangeZipcode = (value, key) => { 
    setZipcode(key.COD_POSTAL);
  };

  const onChangeMobile = (e) => {
    setMobile(e.target.value);
    disableNextBtn();
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    disableNextBtn();
  };

  const onChangeBirthdate = (birthdate, dateString) => {
    let newDate = moment(birthdate).valueOf();
    const dateFormat = "MM/DD/YYYY"; // Date format
    const formattedDate = moment(newDate).format(dateFormat);
    const date = formattedDate;
    if (Validation(date)) {
      setBirthdate(formattedDate);
    } else {
      message.error("Age must be at least 18 years old.");
    }
    disableNextBtn();
  };

  const onChangetoDashboard = () => {
    dispatch(actions.resetFormData({}));
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/policy-group");
  };
  const onFinishCustomer = (formData) => {
    
    if (!documentType) {
      return message.error("Plese enter ID Type");
    }
    // Check hyperverge document uploaded ?
   
    if (!IdNumber) {
      return message.error("Plese enter ID Number");
    }
    // if (selectFile?.length === 0) {
    //   message.error("Please Upload Signature file");
    //   return;
    // }



    formData.birthDate = moment(formData.birthDate).format("MM/DD/YYYY");
    if (!formData.gender.id && formData.gender) {
      formData.gender = GenderOptions.filter(
        (item) => item.label == formData.gender
      )[0]?.id;
    } else {
      formData.gender = formData.gender.id;
    }
    
    const customerInfoRequestBody = {
      
      CTPL_CustomerInfo_for_Quotation: {
        documentType: documentType,
        documentCode: IdNumber,
        firstName: formData.firstName?.trim(),
        middleName: formData.middleName?.trim(),
        lastName: formData.lastName?.trim(),
        suffix: formData.suffix,
        suffixName: suffixName,
        birthDate: formData.birthDate,
        placeOfBirth: birthPlace,
        gender: formData.gender,
        genderName: genderName,
        citizenship: formData.citizenship,
        citizenshipName: citizenshipName,
        province: province,
        provinceName,
        city: city,
        cityName,
        zipCode: zipcode,
        addressLine1: formData?.addressLine1?.trim(),
        addressLine2: formData?.addressLine2?.trim(),
        uploadID: null,
        mobileNumber: formData.mobileNumber,
        email: email,
        expiringPolicyNumber: null,
      },
    };
    let hypervergeData = {};
    if (hyperData) {
      hypervergeData = {
        documentType: documentType,
        documentCode: IdNumber,
        isExistingCustomer: isIdAvailable,
        hypervergeDocName: fullName,
        hyperDocImg: hyperData?.imagePath,
        signature: selectFile
      }
    } else {
      hypervergeData = {
        documentType: hyperCtplData?.documentType,
        documentCode: hyperCtplData?.documentCode,
        isExistingCustomer: hyperCtplData?.isExistingCustomer,
        hypervergeDocName: hyperCtplData?.hypervergeDocName,
        hyperDocImg: hyperCtplData?.hyperDocImg,
        signature: selectFile
      }
    }
    
    dispatch(actions.hypervergeCTPLData(hypervergeData));
    // dispatch(actions.ctplStoreform(customerInfoRequestBody));
    dispatch(actions.storeQuotationForm(customerInfoRequestBody));
    history.push("/confirm-details");
  };

  const onFinishFailed = (errorInfo) => {
    //message.error(errorInfo);
  };

  //   UPPARCASE DATA ///
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  // const uploadProps = {
  //   name: "file",
  //   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   beforeUpload: (file) => {
  //     const isPNG = file.type === "image/png/jpeg";
  //     if (!isPNG) {
  //       console.log("it is not a png file");
  //       message.error(`${file.name} is not a png file`);
  //     }
  //     return isPNG || Upload.LIST_IGNORE;
  //   },
  //   onChangeforUpload: (info) => {
  //     console.log(info.fileList);
  //   },
  // };uploadPhotoId
  const propsPhoto = {
    defaultFileList: selectedPhoto,
  };
  const propsSign = {
    defaultFileList: selectedSign,
  };

  const getZipCodeList = async(provinceId, cityId, selectedZipCode) =>{
    setLoader(true)
    const url = `user/lov?name=Zip&City=${cityId}&Province=${provinceId}`;
    await axiosRequest.get(url).then((resp) =>{
    setLoader(false);
      const data = resp?.data?.lov?.map((state) => {
        const label = state.COD_POSTAL;
        const value = state.COD_POSTAL;
        const key = state.COD_POSTAL;
        const newState = { ...state, label, value, key };
        // state.push(label)
        return newState;
      })
      setZipcodeOptions(data);
      if(!selectedZipCode){
        setZipcode(data[0]?.value);
        form.setFieldsValue({
          zipcode: data[0]?.value,
        })
      }
    }).catch((err) =>{
    setLoader(false);
    });
    setLoader(false);
  }

  const handleUpload = async (selectFile, name) => {
    if (!documentId) {
      message.error("Document Id is not available.");
      return;
    }

    const file = selectFile?.file;
    const sigName = selectFile?.file?.name;
    setSelectFile([]);
    setSelectedPhoto([]);
    dispatch(actions.uploadPhotoId(""));
    setSignatureName("")
    if(!sigName){
      return;
    }
    if (file && file?.size > 2 * 1024 * 1024) {
      message.error("File size should not exceed 2 MB");
      return;
    }
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (
      file &&
      (!allowedFileTypes.includes(file.type))
    ) {
      message.error("Please Upload PNG, JPG file type");
      return;
    }
    let data = new FormData();
    let filetype = file?.type?.split("/");
    data.append("file", file);
    data.append("documentId", documentId);
    data.append("documentName", "Signature");
    
    if (sigName) {
      setSignatureName(sigName);
      setSelectFile([selectFile?.fileList[selectFile?.fileList?.length - 1]]);
      setSelectedPhoto([selectFile?.fileList[selectFile?.fileList?.length - 1]]);
      dispatch(actions.uploadPhotoId([selectFile?.fileList[selectFile?.fileList?.length - 1]]));
      setLoader(true);
      await axiosRequest
        .post("user/document/upload", data)
        .then((res) => {
          setLoader(false);
          if (res.statusCode == -1) {
            setShowMsg(true);
            message.success("File uploaded successfully");
          }
        })
        .catch((err) => {
          setLoader(false);
        });
    }
    setLoader(false);
  };

  const prepopulateData = async (details) => {
    const filteredProvince = stateOptions?.filter(
      (item) =>
        item.COD_PROV == details?.provinceCode ||
        item.NOM_PROV == details?.provinceCode
    )[0];
    let filteredCity = null;
    if(filteredProvince?.COD_PROV || filteredProvince?.value){
      const url = `user/lov?name=City&Province=${filteredProvince?.COD_PROV || filteredProvince?.value}`;
      const resp = await axiosRequest.get(url);
      if(resp?.statusCode === -1 && resp?.data?.lov?.length > 0){
        filteredCity = resp?.data?.lov?.filter(
          (item) => item.COD_LOCALIDAD === details?.cityCode || item.COD_LOCALIDAD === details?.city || item.NOM_LOCALIDAD === details?.cityCode
          )[0];
        getZipCodeList(filteredCity?.COD_LOCALIDAD, filteredProvince?.COD_PROV || filteredProvince?.value, details?.zipCode );
      }
    }


    const filteredGender = GenderOptions.filter(
      (item) => item.id == details?.gender || item.notation == details?.gender
    )[0];
    let hyperDOB = moment(details?.dateOfBirth, "DD-MM-YYYY").format(
      "MM-DD-YYYY 00:00:00.0"
    );

    const birthDate = details?.birthday
      ? moment(details?.birthday)
      : details?.dateOfBirth
        ? moment(hyperDOB)
        : "";
    let address1 = "";
    let address2 = "";
    if (((details?.address1?.length >= 40) || (details?.address?.length >= 40)) && !details?.address2) {
      address1 = details?.address1 ? details?.address1?.slice(0, 40) : details?.address ? details?.address?.slice(0, 40) : "";
      address2 = details?.address1 ? details?.address1?.slice(40, 80) : details?.address ? details?.address?.slice(40, 80) : "";
    } else {
      address1 = details?.address1 || details?.address || "";
      address2 = details?.address2;
    }
    setFirstName(details?.firstName?.trim());
    setLastName(details?.lastName?.trim());
    setMiddleName(details?.middleName?.trim());
    setSuffix(details?.suffix);
    setGender(filteredGender);
    setGenderName(filteredGender?.label);
    setCitizenship(details?.countryCode || "PHL");
    setBirthdate(birthDate);
    setBirthplace(details?.placeOfBirth);
    setAddress(address1);
    setAddress1(address2);
    setProvinceName(filteredProvince?.NOM_PROV);
    setProvince(filteredProvince?.COD_PROV);
    setCityName(filteredCity?.NOM_LOCALIDAD);
    setCity(filteredCity?.COD_LOCALIDAD);

    setZipcode(details?.zipCode);
    setMobile(details?.mobileNumber);
    setEmail(details?.emailAddress);
    setIsDisable(true);

    form.setFieldsValue({
      firstName: details?.firstName?.trim(),
      lastName: details?.lastName?.trim(),
      middleName: details?.middleName?.trim(),
      suffix: details?.suffix,
      gender: filteredGender,
      genderName: filteredGender?.label,
      citizenship: details?.countryCode || "PHL",
      birthDate: birthDate,
      addressLine1: address1,
      addressLine2: address2,
      cityName: filteredCity?.NOM_LOCALIDAD,
      city: filteredCity?.COD_LOCALIDAD,
      // city: details?.cityCode,
      provinceName: filteredProvince?.NOM_PROV,
      province: filteredProvince?.COD_PROV,
      zipcode: details?.zipCode,
      birthPlace: details?.placeOfBirth,
      // mobile: details?.mobileNumber,
      email: details?.emailAddress,
    });

    setIsDisable({
      firstName: !!details?.firstName,
      lastName: !!details?.lastName,
      middleName: !!details?.middleName,
      gender: filteredGender,
      birthDate: birthDate,
      // suffix: !!details?.suffix,
      // citizenship: !!details?.countryCode,
      // address: !!address1,
      // address1: !!address2,
      // cityName: filteredCity?.NOM_LOCALIDAD,
      // provinceName: filteredProvince,
      // zipcode: !!details?.zipCode,
      // birthPlace: !!details?.placeOfBirth,
      // mobile: !!details?.mobileNumber,
      // email: !!details?.emailAddress,
    });
    const formValues = form.getFieldsValue();
  };

  // ExistingCustomerValidate Props response
  const getCustomerDetails = (details) => {
    if (details) {
      prepopulateData(details);
    } else {
      formRef.current.resetFields();
      setAddress("");
      setAddress1("");
      setIsDisable(false);
      setProvinceName("");
      setCityName("");
      setCity("");
      setZipcode(null);
      setMobile("");
      setFullName("");
      setIsDisable("");
      setCitizenship(null);
      setSelectFile([]);
      setSignatureName("");
      setSuffix(null);
      form.setFieldsValue({
        citizenship: null,
      });
      setFullName("");
      dispatch(actions.fetchAllCities(null));
      // dispatch(actions.fetchAllZipCode(null));
      setZipcodeOptions([]);
    }
  };
  const getDocumentType = (validId) => {
    setDocumentType(validId);
  };
  const getIdNumber = (idNumber) => {
    setIDNumber(idNumber);
  };
  const checkIdAvailable = (idStatus) => {
    setIsIdAvailable(idStatus);
  };
  /* HypervergeSDK Details */
  const getHyperDetails = (data) => {
    setHyperStatus(data?.status);
    if (data?.details) {
      setHyperData(data?.details);
      const selectedName = data?.details?.fullName
        ? data?.details?.fullName
        : `${data?.details?.firstName} ${data?.details?.middleName} ${data?.details?.lastName}`;
      setFullName(selectedName);
      message.success(data.status);
      if (!isIdAvailable) {
        prepopulateData(data?.details);
      }
    } else {
    setHyperStatus("");
    if(data?.statu){
      message.error(data?.status);
    }
    }
  };

  const disableNextBtn = () => {
    return (
      firstName &&
      lastName &&
      gender &&
      citizenship &&
      birthDate &&
      birthPlace &&
      address &&
      provinceName &&
      cityName &&
      zipcode &&
      mobile &&
      email
    );
  };
  // this is for birthate age
  const eighteenYearsAgo = moment().subtract(18, 'years');

  // Function to disable dates less than 18 years from today
  const disabledDate = current => {
    return current && current > eighteenYearsAgo;
  };
  return (
    <>
      <FullPageLoader spinloader={loader} />
      <div className="main-class">
        <Row gutter={16}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6} className="topheading">
            <div className="policy-header">
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                // onChange={onChangetoDashboard}
                onClick={onChangetoDashboard}

              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>

            <StepTwo />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14} className="ctplRight">
            <div className="main-head">
              <h2>We just need to get some customer information. </h2>
            </div>

            <div className="info-head">
              <h4>Policy Holder Information</h4>
            </div>

            <HypervergeComponent
              // validIds={documentTypeOptions}
              handleCustomerDetails={getCustomerDetails}
              handleDocType={getDocumentType}
              handleIdNumber={getIdNumber}
              checkIdAvailable={checkIdAvailable}
              hintText="Maximum 2 MB. PNG or JPG files only"
              handleHyperResponse={getHyperDetails}
              documentId={documentId}
            />

            <Form
              name="basic"
              ref={formRef}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinishCustomer}
              onFinishFailed={onFinishFailed}
              // autoComplete="off"\
              form={form}
              fields={[
                {
                  name: ["suffix"],
                  value: suffix,
                },
                //   {
                //     name: ["gender"],
                //     value: gender,
                //   },
                //   {
                //     name: ["citizenship"],
                //     value: citizenship,
                //   },

                {
                  name: ["addressLine1"],
                  value: address,
                },
                {
                  name: ["AddressLine2"],
                  value: address1,
                },
                {
                  name: ["province"],
                  value: provinceName,
                },
                {
                  name: ["city"],
                  value: cityName,
                },
                {
                  name: ["zipcode"],
                  value: zipcode,
                },
                {
                  name: ["mobileNumber"],
                  value: mobile,
                },
                {
                  name: ["mail"],
                  value: email,
                },
                // {
                //   name: ["birthDate"],
                //   value: birthDate,
                // },
              ]}
            >
              <div style={{ marginTop: '16px' }}></div>

              {(fullName) && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p
                    style={{
                      fontWeight: "900",
                      fontSize: "15px",
                      marginTop: 13,
                      marginRight: "5px",
                      color: "#1D428A",
                    }}
                  >
                    Full Name from OCR:{" "}
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#1D428A",
                        fontWeight: "700",
                      }}
                    >
                      {" "}
                      {fullName}
                    </span>
                  </p>
                  {/* <Button
                    shape="round"
                    size="small"
                    ghost
                    style={{
                      background: "#1D428A",
                      color: "white",
                      fontSize: "12px",
                      height: "21px",
                    }}
                    onClick={copyFullname}
                  >
                    Copy
                  </Button> */}
                </div>
              )}

              {/* <div className="information">
                <h3>Personal Information</h3>
              </div> */}
              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="firstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required",
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;

                          if (!validPattern.test(value)) {
                            return Promise.reject(
                              " Numeric and Special characters are not allowed."
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="180"
                      placeholder="Enter Customer's First Name"
                      value={firstName}
                      disabled={isDisable.firstName && isIdAvailable}
                      // defaultValue={FirstName}
                      onInput={toInputUppercase}
                      onChange={(item) => onChangeFirstName(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="middleName"
                    label="Middle Name"
                  // rules={[
                  // {
                  //   required: false,
                  //   message: "Middle Name",
                  // },

                  // {
                  //   validator: (_, value) => {
                  //     const validPattern = /^[a-zA-Z]+$/;
                  //     if (!validPattern.test(value)) {
                  //       return Promise.reject(" Numeric and Special characters are not allowed.");
                  //     }
                  //     return Promise.resolve();
                  //   },
                  // }

                  // ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="180"
                      placeholder="Enter Customer's Middle Name"
                      value={middleName}
                      disabled={isDisable.middleName && isIdAvailable}
                      // defaultValue={MiddleName}
                      onInput={toInputUppercase}
                      onChange={(item) => onChangeMiddleName(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "LastName is required",
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;

                          if (!validPattern.test(value)) {
                            return Promise.reject(
                              " Numeric and Special characters are not allowed."
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="30"
                      placeholder="Enter Customer's Last Name"
                      value={lastName}
                      // defaultValue={LastName}
                      onInput={toInputUppercase}
                      disabled={isDisable.lastName && isIdAvailable}
                      onChange={(item) => onChangeLastName(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="suffix"
                    label="Suffix"
                  >
                    {/* <Select
                      showSearch
                      placeholder="Select Suffix"
                      size="large"
                      onChange={(item) => onChangeSuffix(item)}
                      value={suffix}
                      disabled={isDisable.suffix && isIdAvailable}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {SuffixOptions.map((item, index) => (
                        <Option key={index} value={item.NOM_VALOR}>
                          {item.NOM_VALOR}
                        </Option>
                      ))}
                    </Select> */}

                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Suffix"
                      size="large"
                      options={modalOptions}
                      value={suffix}
                      optionFilterProp="children"
                      autoComplete="on"
                      onChange={(item, key) => {
                        onChangeSuffix(item, key);
                      }}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    >

                    </Select>

                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="gender"
                    label="Gender"
                    rules={[
                      {
                        required: true,
                        message: "Gender is required.",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      placeholder="Select Gender"
                      size="large"
                      onChange={onChangeGender}
                      value={gender}
                      disabled={isDisable.gender && isIdAvailable}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {GenderOptions.map((item, index) => (
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
                    name="citizenship"
                    label="Citizenship"
                    rules={[
                      {
                        required: true,
                        message: "Citizenship is required.",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      size="large"
                      bordered={false}
                      style={{ backgroundColor: "#fff" }}
                      // size="default"
                      placeholder="Select Citizenship"
                      options={citizenshipOptions}
                      onSelect={(e, data) => citizenshipSelectHandler(e, data)}
                      value={citizenship}
                      disabled={isDisable.citizenship && isIdAvailable}
                      defaultValue="PHL"
                      autoComplete="on"
                      onSearch={onSearch}
                      filterOption={filterOption}

                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="birthDate"
                    label="BirthDate"
                    rules={[
                      {
                        required: true,
                        message: "Please Select Birthdate",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const birthdate = new Date(value);
                          const currentDate = new Date();
                          const ageDiff = currentDate.getFullYear() - birthdate.getFullYear();

                          if (ageDiff >= 18) {
                            return Promise.resolve();
                          }

                          return Promise.reject("You must be at least 18 years old.");
                        },
                      }),
                    ]}

                  >
                    <DatePicker
                      onChange={onChangeBirthdate}
                      className="first-name input-box"
                      size="large"
                      placeholder="Select Date"
                      format="MM/DD/YYYY"
                      value={birthDate}
                      disabled={isDisable.birthDate && isIdAvailable}
                      disabledDate={disabledDate}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="birthPlace"
                    label="Place of Birth"
                    rules={[
                      {
                        required: true,
                        message: "Place of birth is required.",
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="15"
                      placeholder="Enter Place of Birth"
                      value={birthPlace}
                      disabled={isDisable.birthPlace && isIdAvailable}
                      // defaultValue={birthPlace}
                      onInput={toInputUppercase}
                      onChange={(item) => onChangeBirthPlace(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="mobileNumber"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Enter Mobile Number",
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[0-9]+$/;
                          if (
                            !validPattern.test(value) ||
                            value.length < 10 ||
                            value.length > 12
                          ) {
                            return Promise.reject(
                              "Mobile number must be between 10 and 12 digits and contain only numbers."
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="12"
                      placeholder="Enter Mobile Number"
                      value={mobile}
                      minLength={10}
                      disabled={isDisable.mobile && isIdAvailable}
                      // defaultValue={mobile}
                      onChange={(item) => onChangeMobile(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="mobileNumber"
                    label="Mobile Number"
                    rules={[
                      {
                        required: true,
                        message: "Mobile Number is required.",
                      },
                      {
                        validator: (rule, value, callback) => {
                          if (value.length < 10 || value.length > 12) {
                            callback("Mobile number must be between 10 and 12 digits.");
                          } else {
                            callback();
                          }
                        },
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[0-9]+$/;
                          if (!validPattern.test(value)) {
                            return Promise.reject(
                              "Only number allowed."
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength={12}
                      // addonBefore="+63"
                      placeholder="Enter Mobile Number"
                      value={mobile}
                      disabled={isDisable.mobile && isIdAvailable}
                      onChange={onChangeMobile}
                      onInput={(e) => {
                        if (e.target.value.length > 12) {
                          e.target.value = e.target.value.slice(0, 12);
                        }
                      }}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="email"
                    label="Email Address"
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
                      className="first-name input-box"
                      size="large"
                      maxLength="60"
                      placeholder=" Email Address"
                      value={email}
                      disabled={isDisable.email && isIdAvailable}
                      // defaultValue={email}
                      onChange={(item) => onChangeEmail(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={16}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="provinceName"
                    label="Province"
                    rules={[
                      {
                        required: true,
                        message: "Province is required.",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      bordered={false}
                      style={{ backgroundColor: "#fff" }}
                      size="large"
                      placeholder="Select Province"
                      options={stateOptions}
                      onSelect={(e, data) => stateSelectHandler(e, data)}
                      value={provinceName}
                      disabled={isDisable.provinceName && isIdAvailable}
                      autoComplete="on"
                      onChange={(item, key) => onChangeProvince(item, key)}
                      onSearch={onSearch}
                      filterOption={filterOption}

                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="cityName"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "City is required.",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      bordered={false}
                      style={{ backgroundColor: "#fff" }}
                      size="large"
                      placeholder="Select City"
                      // onSelect={(e, data) => citySelectHandler(e, data)}
                      options={citiesOptions}
                      autoComplete="off"
                      value={cityName}
                      disabled={isDisable.cityName && isIdAvailable}
                      // defaultValue={storeCityValue}
                      onChange={(item, key) => onChangeCity(item, key)}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="zipcode"
                    label="Zip Code"
                    rules={[
                      {
                        required: true,
                        message: "Zipcode is require",
                      },
                    ]}
                  >
                      <Select
                      size="large"
                      placeholder="Zip Code"
                      value={zipcode}
                      disabled={isDisable.zipcode && isIdAvailable}
                      options={zipcodeOptions}
                      onSelect={(e, data) => onChangeZipcode(e, data)}
                    ></Select>
                    {/* <Input
                      className="first-name input-box"
                      size="large"
                      // maxLength="30"
                      placeholder=" Zip Code"
                      style={{ backgroundColor: "#fff" }}
                      value={zipcode}
                      disabled={isDisable.zipcode && isIdAvailable}
                      // defaultValue={zipcode}
                      // onChange={(item) => onChangeZipcode(item)}
                      autoComplete="off"
                    /> */}
                    {/* <Select
                      showSearch
                      bordered={false}
                      size="large"
                      placeholder="Select Citizenship"
                      options={zipcodeOptions}
                      onSelect={(e, data) => onChangeZipcode(e, data)}
                      value={zipcode}
                      autoComplete="on"
                    // defaultValue={storeStateValue}
                    // onChange={(item, key) => onChangeProvince(item, key)}
                    // onChange={stateChangetHandler}
                    /> */}
                  </Form.Item>
                </Col>
              </Row>


              <Row gutter={16}>
                {/* <div className="information" style={{ paddingLeft: "8px" }}>
                  <h3>Contact Information</h3>
                </div> */}
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="addressLine1"
                    label="Address 1"
                    rules={[
                      {
                        required: true,
                        message: "Address is required.",
                      },
                      { max: 40, message: "Max 40 character allowed." },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="40"
                      placeholder="Enter Address"
                      value={address}
                      disabled={isDisable.address && isIdAvailable}
                      onInput={toInputUppercase}
                      // defaultValue={address}
                      onChange={(item) => onChangeAddresse(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="addressLine2"
                    label="Address 2"
                    rules={[
                      { max: 40, message: "Max 40 character allowed." },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      size="large"
                      maxLength="40"
                      placeholder="Enter Address"
                      value={address1}
                      disabled={isDisable.address1 && isIdAvailable}
                      // defaultValue={address1}
                      onInput={toInputUppercase}
                      onChange={(item) => onChangeAddresse1(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>


              </Row>

            
              {/* <p style={{ fontWeight: "bold" }}>
                <span style={{ color: "red" }}>*</span> Please Upload Signature
              </p>
              <div className="browser-box">
                <div className="doc-box">
                  <div
                    className="child11"
                    style={{
                      backgroundColor: "#1D428A",
                      borderColor: "#1D428A",
                      marginRight: "15px",
                    }}
                  >
                    <FolderAddOutlined style={{ color: "white" }} />
                  </div>
                  <div className="doc-text-container">
                    {signatureName && (
                      <p className="doc-text" title={signatureName}>
                        <CloudDownloadOutlined
                          style={{ marginRight: "10px" }}
                        />
                        <span className="signature-name" title={signatureName}>
                          {signatureName}
                        </span>
                        <DeleteOutlined
                          className="doc-delete-icon"
                          onClick={handleUpload}
                        />
                      </p>
                    )}
                  </div>
                </div>
                <Upload
                  accept=".jpg,.jpeg,.png"
                  selectFile={selectedPhoto}
                  onChange={handleUpload}
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <Button
                    className={`browse-btn`}
                    style={{ backgroundColor: "#1D428A", marginLeft: "auto" }}
                  >
                    Browse
                  </Button>
                </Upload>
              </div>
              <p style={{ fontWeight: "bold",color: '#000', marginTop: 10 }}>
                Maximum 2 MB. PNG or JPG files only
              </p> */}

              <div className="next-button-header" style={{ paddingLeft: 0 }}>
                
                <Button
                  className={`next-button ${!disableNextBtn() ? "disable-purple-btn" : ""
                    }`}
                  size={size}
                  //onClick={PolicyGroupChange}
                  disabled={!disableNextBtn()}
                  htmlType="submit"
                  style={{color: 'white'}}
                >
                  Next
                  <ArrowRightOutlined style={{color: 'white'}}/>
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
          </Col>
        </Row>
      </div>
      <AllFormFooter />
    </>
  );
};

export default CustomerInformation;
