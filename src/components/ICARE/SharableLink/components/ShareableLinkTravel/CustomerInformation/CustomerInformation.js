import React, { useEffect, useState, createRef } from "react";
import "./CustomerInformation.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
  FolderAddOutlined,
  CloudDownloadOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Validation from "../../../../../../components/ValidationForm/Validation";
import * as actions from "../../../../../../store/actions";
import HypervergeComponent from "../../../../../../HypervergeSDKCustomer/HypervergeComponent";

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
  Upload,
  message,
  DatePicker,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import axiosRequest from "../../../../../../axios-request/request.methods";
import StepTravelTwo from "../StepBarTravel/StepTravelTwo/StepTravelTwo";
import PolicyFooter from "../TravelFooter/PolicyFooter/PolicyFooter";
import { setTravelCustomerInfo } from "../../../../../../store/actions/travel";
import Header from "../../SampleHeader/Header";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function CustomerInformation() {
  const tripData = useSelector((state) => state?.trip);
  const travelUserDetailedInfo = useSelector((state) => state?.trip?.travelUserDetailedInfo);

  // const [policyTypeD2, setPolicyTypeD2] = useState("");
  // const [showTraveler2Fields, setShowTraveler2Fields] = useState(false);
  // const [showTraveler3Fields, setShowTraveler3Fields] = useState(false);

  // const [showTraveler4Fields, setShowTraveler4Fields] = useState(false);
  const { Option } = Select;
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [middleNameError, setMiddleNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [address1Error, setAddress1Error] = useState('');
  const [address2Error, setAddress2Error] = useState('');
  const [hyperData, setHyperData] = useState(null);

  const dispatch = useDispatch();
  const formRef = createRef();
  const [form] = Form.useForm();

  const initialFormValues = {
    policyTypeD2: "",
    selectFile: [],
    showMsg: false,
    documentType: "",
    IdNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    suffix: null,
    Gender: null,
    placeOfBirth: "",
    citizenship: "PHL",
    mobileNumber: "",
    emailAddress: "",
    province: null,
    city: null,
    zipCode: null,
    address1: "",
    address2: "",
  };
  const [formValues, setFormValues] = useState(initialFormValues);

  const customerNumber = useSelector((state) => state?.GetCustomerMobileNumber);
  console.log("customer---Mobile", customerNumber);
  const otpLoginMobileNumber = customerNumber?.customer_mobile
  const [mobile, setMobile] = useState(otpLoginMobileNumber);
  const [hyperStatus, setHyperStatus] = useState("");
  const [fullName, setFullName] = useState("");
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [birthDate, setBirthdate] = useState("");
  const [suffix, setSuffix] = useState("");
  const [suffixName, setSuffixName] = useState("");
  const [gender, setGender] = useState("");
  const [details, setDetails] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [IdNumber, setIDNumber] = useState("");
  const [isDisable, setIsDisable] = useState("");
  const [signatureName, setSignatureName] = useState("");

  const [optionList, setOptionList] = useState({
    province: [],
    city: [],
    zipCode: [],
    citizenship: [],
  });
  const onChangeSuffix = (e) => {
    setSuffix(e);
  };
  const onChangeGender = (e) => {
    setGender(e);
  };
  const handleFormChange = (field, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
    form.setFieldsValue({
      [field]: value,
    });
    if (field == "suffix") {

      const suffixName = modalOptions.filter((item) =>
        item.value == value
      )[0]?.label

      setSuffixName(suffixName)
    }

  };


  // c
  const [idList, setIdList] = useState([]);
  const [isExistingCustomer, setIsExistingCustomer] = useState(false);
  const [selectFile, setSelectFile] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  // const [fileList, setFileList] = useState([...vehicleCertificateArray])
  // const st = useSelector((state) => state);
  // const vehicleCertificateArray = useSelector((state) => state?.uploadDocument?.vehicleCertificate);
  // const documentId = useSelector(
  //   (state) => state?.quotationsPolicies?.currentDocumentID
  // );
  // const PolicyOptionOnchange = (e) => {
  //   setPolicyTypeD2(e);
  // };

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };

  let documentTypeApi = useSelector(
    (state) => state?.groupPolicy?.documentType?.lov
  );
  const hyperTravelData = useSelector((state) => state?.hyperverge?.hypervergeTravel);

  let documentTypeOptions =
    documentTypeApi && !_.isEmpty(documentTypeApi)
      ? documentTypeApi.map((DOCUMENTTYPE) => {
        const label = DOCUMENTTYPE.NOM_DOCUM;
        const value = DOCUMENTTYPE.TIP_DOCUM;
        // const key = city.COD_LOCALIDAD;
        const newDocumentType = { ...DOCUMENTTYPE, label, value };
        return newDocumentType;
      })
      : null;


  const handleUpload = async (selectFile, name) => {
    const documentId = tripData?.tripInfo?.documentId;
    if (!documentId) {
      message.error("Document Id is not available.");
      return;
    }
    const file = selectFile?.file;
    const sigName = selectFile?.file?.name
    setSelectFile([]);
    setFormValues((prevValues) => ({
      ...prevValues,
      [selectFile]: [],
    }));
    setSignatureName("");
    if (!sigName) {
      return
    }
    if (file && file?.size > 2 * 1024 * 1024) {
      message.error("File size should not exceed 2 MB");
    } else if (
      file?.type == "image/png" ||
      file?.type == "image/jpeg" ||
      file?.type == "image/jpg"
    ) {
      setSignatureName(sigName)
      setSelectFile([selectFile?.fileList[selectFile?.fileList?.length - 1]]);
      formValues?.selectFile.push(selectFile?.fileList[selectFile?.fileList?.length - 1])
      let data = new FormData();
      let filetype = file?.type?.split("/");
      data.append("file", file);
      data.append("documentId", documentId);
      data.append("documentName", "Signature");
      data.append("fileType", filetype ? filetype[1] : "");
      setShowScreenLoader(true);
      await axiosRequest
        .post("user/document/upload", data)
        .then((res) => {
          setShowScreenLoader(false);
          if (res?.statusCode == -1) {
            setShowMsg(true);
            message.success("File uploaded successfully");
          }
        })
        .catch((err) => {
          setShowScreenLoader(false);
        });
    } else {
      setShowScreenLoader(false);
      message.error("Please Upload PNG ,JPG File type");
    }
    setShowScreenLoader(false);
  };


  const prepopulateData = async (details) => {
    let provinceList = null;
    if (optionList?.province?.length === 0) {
      provinceList = await getLovByType('user/lov?name=Province', "province", "NOM_PROV", "COD_PROV");
    } else {
      provinceList = optionList?.province;
    }

    let filteredProvince = null;
    const selectedProvince = details?.province || details?.provinceCode;
    if (selectedProvince) {
      filteredProvince = provinceList?.filter(
        (item) =>
          item.COD_PROV === selectedProvince ||
          item.value === selectedProvince
      )[0];
    }
    const filteredGender = GenderOptions.filter(
      (item) => item.id == details?.gender || item.notation == details?.gender || item.id == details?.Gender
    )[0]?.value;

    let hyperDOB = moment(details?.dateOfBirth, "DD-MM-YYYY").format(
      "MM-DD-YYYY 00:00:00.0"
    );
    const birthdate = details?.birthday
      ? moment(details?.birthday) : details?.birthDate ? moment(details?.birthDate)
        : details?.dateOfBirth
          ? moment(hyperDOB)
          : "";
    let filteredCity = null;
    if (filteredProvince?.COD_PROV || filteredProvince?.value) {
      const url = `user/lov?name=City&Province=${filteredProvince?.COD_PROV || filteredProvince?.value}`;
      const cityList = await getLovByType(url, "city", "NOM_LOCALIDAD", "COD_LOCALIDAD");
      filteredCity = cityList.filter(
        (item) => item.COD_LOCALIDAD === details?.cityCode || item.COD_LOCALIDAD === details?.city || item.NOM_LOCALIDAD === details?.cityCode
      )[0];
    }
    let address1 = "";
    let address2 = "";
    if (((details?.address1?.length >= 40) || (details?.address?.length >= 40)) && !details?.address2) {
      address1 = details?.address1 ? details?.address1?.slice(0, 40) : details?.address ? details?.address?.slice(0, 40) : "";
      address2 = details?.address1 ? details?.address1?.slice(40, 80) : details?.address ? details?.address?.slice(40, 80) : "";
    } else {
      address1 = details?.address1 || details?.address || "";
      address2 = details?.address2;
    }
    const mainDetails = {
      documentType: details?.documentType || "",
      IdNumber: details?.documentCode || "",
      firstName: details?.firstName?.trim() || "",
      lastName: details?.lastName?.trim() || "",
      middleName: details?.middleName?.trim() || "",
      suffix: details?.suffix || null,
      Gender: filteredGender || null,
      citizenship: details?.countryCode || "PHL",
      birthDate: birthdate || "",
      address1: address1?.trim(),
      address2: address2?.trim(),
      city: filteredCity?.COD_LOCALIDAD || null,
      province: filteredProvince?.COD_PROV || filteredProvince?.value || null,
      zipCode: details?.zipCode || null,
      placeOfBirth: details?.placeOfBirth || "",
      mobileNumber: otpLoginMobileNumber,
      emailAddress: details?.emailAddress || "",
    };
    form.setFieldsValue({
      firstName: mainDetails?.firstName?.trim(),
      middleName: mainDetails?.middleName?.trim(),
      lastName: mainDetails?.lastName?.trim(),
      birthDate: mainDetails?.birthDate,
      suffix: mainDetails?.suffix,
      Gender: mainDetails?.Gender,
      placeOfBirth: mainDetails?.placeOfBirth,
      mobileNumber: mainDetails?.mobileNumber,
      emailAddress: mainDetails?.emailAddress,
      province: mainDetails?.province,
      city: mainDetails?.city,
      address1: mainDetails?.address1?.trim(),
      address2: mainDetails?.address2?.trim(),
      zipCode: mainDetails?.zipCode,
      citizenship: mainDetails?.citizenship
    })

    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        ...mainDetails,
      };
    });

    setIsDisable({
      // documentType: !!details?.documentType,
      // IdNumber: !!details?.documentCode,
      firstName: !!details?.firstName,
      lastName: !!details?.lastName,
      middleName: !!details?.middleName,
      Gender: filteredGender,
      // suffix: !!details?.suffix,
      // citizenship: !!details?.countryCode,
      birthDate: birthdate,
      // address1: !!address1,
      // address2: !!address2,
      // city: filteredCity?.NOM_LOCALIDAD,
      // province: filteredProvince?.COD_PROV || filteredProvince?.value,
      // zipCode: !!details?.zipCode,
      // placeOfBirth: !!details?.placeOfBirth,
      // mobileNumber: !!details?.mobileNumber,
      // emailAddress: !!details?.emailAddress,
    });

  };

  const onFinishCustomerInfo = (formdata) => {
    formValues.documentType = documentType;
    formValues.IdNumber = IdNumber;
    if (!formValues.documentType) {
      return message.error("Plese enter Valid Id");
    }
    if (!formValues.IdNumber) {
      return message.error("Plese enter Id Number");
    }
    // if (hyperStatus !== "auto_approved") {  // OLD Code
    //   message.error("Please Upload Document");
    //   return;
    // }
    // if (selectFile?.length === 0) {
    //   message.error("Please Upload Signature");
    //   return;
    // }
    const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
    if (!formdata?.firstName) {
      setLastNameError('First Name is required.');
    } else if (!regex.test(formdata?.firstName)) {
      setLastNameError('Numeric and Special characters are not allowed.');
    } else {
      setLastNameError('');
    }
    if (!formdata?.lastName) {
      setLastNameError('Last Name is required.');
    } else if (!regex.test(formdata?.lastName)) {
      setLastNameError('Numeric and Special characters are not allowed.');
    } else {
      setLastNameError('');
    }
    const regex2 = /^[0-9]+$/;
    if (!formValues.mobileNumber) {
      setMobileNumberError("Mobile Number is required.")
    } else if (!regex2.test(formValues.mobileNumber)) {
      setMobileNumberError('Special characters are not allowed.');
    } else if (formValues.mobileNumber.length < 10 || formValues.mobileNumber.length > 12) {
      setMobileNumberError('Mobile number must be between 10 and 12 digits');
    } else {
      setMobileNumberError('');
    }
    if (firstNameError || lastNameError || mobileNumberError || emailError) {
      return;
    }
    if (!formValues.firstName || !formValues.lastName || !formValues.mobileNumber || !formValues.emailAddress) {
      return;
    }
    formValues.Gender = GenderOptions.filter(
      (item) => item.value == formValues.Gender)[0]?.id;
    const formData = formValues;
    formData.suffixName = suffixName
    const index = idList.findIndex((e) => e.value === formValues.documentType);
    if (index !== -1) {
      formData.documentTypeName = idList[index].label;
    }

    let hypervergeData = {};
    // if (hyperData || (documentType && IdNumber)) {
    if (hyperData) {
      hypervergeData = {
        documentType: formValues.documentType,
        documentCode: formValues.IdNumber,
        isExistingCustomer: isIdAvailable,
        hypervergeDocName: fullName,
        hyperDocImg: hyperData?.imagePath,
        signature: selectFile
      }
    } else {
      hypervergeData = {
        documentType: hyperTravelData?.documentType,
        documentCode: hyperTravelData?.documentCode,
        isExistingCustomer: hyperTravelData?.isExistingCustomer,
        hypervergeDocName: hyperTravelData?.hypervergeDocName,
        hyperDocImg: hyperTravelData?.hyperDocImg,
        signature: selectFile
      }
    }
    dispatch(actions.hypervergeTravelData(hypervergeData));

    dispatch(setTravelCustomerInfo(formData));
    history.push("/customer/traveler-details");
  };
  const onClickback = () => {
    history.push("/quotation-policy-tabs");
  };


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

  const handleExistingCustomer = (val) => {
    setIsExistingCustomer(val);
  };

  const getLovByType = async (url, name, label, value) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(url);
    let cityList = [];
    if (res.statusCode === -1) {
      if (res?.data?.lov && Array.isArray(res.data.lov)) {
        setOptionList((prev) => {
          prev[name] = res.data.lov.map((e) => ({
            label: e[label],
            value: e[value],
          }));
          return { ...prev };
        });
        cityList = res.data.lov
      }
    } else {
      message.error(res?.data?.data?.message ?? "Something went Wrong");
    }
    setShowScreenLoader(false);
    return cityList;
  };

  const provinceHandleChange = (val) => {
    setOptionList((prev) => {
      prev["city"] = [];
      prev["zipCode"] = [];
      return { ...prev };
    });
    handleFormChange("city", null);
    handleFormChange("zipCode", null);
    handleFormChange("province", val);
    const url = `user/lov?name=City&Province=${val}`;
    getLovByType(url, "city", "NOM_LOCALIDAD", "COD_LOCALIDAD");
  };

  const cityHandleChange = async (val) => {
    setOptionList((prev) => {
      prev["zipCode"] = [];
      return { ...prev };
    });
    handleFormChange("zipCode", null);
    handleFormChange("city", val);
    const url = `user/lov?name=Zip&City=${val}&Province=${formValues.province}`;
    const zipCode = await getLovByType(url, "zipCode", "COD_POSTAL", "COD_POSTAL");
    // setFormValues formValues.zipCode(zipCodes);
    setFormValues((prevFormValues) => {
      return {
        ...prevFormValues,
        zipCode: zipCode[0]?.COD_POSTAL,
      };
    });
  };

  const onSearch = (value) => {
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


  useEffect(() => {
    getIdType();
    const url = `user/lov?name=Province`;
    const url2 = `user/lov?name=Citizenship`;
    getLovByType(url, "province", "NOM_PROV", "COD_PROV");
    getLovByType(url2, "citizenship", "NOM_PAIS", "COD_PAIS");
    dispatch(actions.fetchAllSuffix());
  }, [dispatch]);

  const SuffixOptions = useSelector((state) => state?.make?.suffix)

  let modalOptions =
    SuffixOptions && !_.isEmpty(SuffixOptions)
      ? SuffixOptions.map((SUFFIX) => {
        const label = SUFFIX.NOM_VALOR;
        const value = SUFFIX.TIPO_SUFIJO_NOMBRE;
        const newSuffix = { ...SUFFIX, label, value };
        return newSuffix;
      })
      : null;

  // const SuffixOptions = [
  //   { label: "Mr.", value: "mr" },
  //   { label: "Mrs.", value: "mrs" },
  //   { label: "Ms.", value: "ms" },
  //   { label: "Mx.", value: "mx" },
  // ];
  const GenderOptions = [
    { label: "Male", value: "male", id: "1", notation: "M" },
    { label: "Female", value: "female", id: "0", notation: "F" },
    // { label: "Others", value: "others", id: "3", notation: "O" },
  ];
  const clearAllFields = () => {
    setFormValues((prevValues) => ({
      ...prevValues,
      documentType: undefined,
      IdNumber: "",
    }));
  };
  const onChangeBirthdate = (birthdate, dateString) => {
    let newDate = moment(birthdate).valueOf();
    const dateFormat = "MM/DD/YYYY"; // Date format
    const formattedDate = moment(newDate).format(dateFormat);
    const date = formattedDate;
    if (Validation(date)) {
      setBirthdate(formattedDate);
      handleFormChange("birthDate", birthdate);
    } else {
      message.error("Age must be at least 18 years old.");
    }
  };

  // Prepopulate Data
  useEffect(() => {
    if (travelUserDetailedInfo) {
      if (hyperTravelData?.hypervergeDocName) {
        setFullName(hyperTravelData?.hypervergeDocName);
        form.setFieldsValue({
          fullName: hyperTravelData?.hypervergeDocName,
        });
        setHyperStatus("auto_approved")
      }
      setSignatureName(hyperTravelData?.signature?.length > 0 ? hyperTravelData?.signature[0]?.name : null);
      setSelectFile(hyperTravelData?.signature?.length > 0 ? hyperTravelData?.signature : []);
      prepopulateData(travelUserDetailedInfo)
    }
  }, [travelUserDetailedInfo])

  // ExistingCustomerValidate Props response
  const getCustomerDetails = (details) => {
    if (details) {
      prepopulateData(details);
    } else {
      setFormValues(initialFormValues);
      setSignatureName("");
      setIsDisable(false);
      setOptionList((prev) => {
        prev["city"] = [];
        prev["zipCode"] = [];
        return { ...prev };
      });
    }
  };

  // Hyperverge SDK
  const getHyperDetails = (data) => {
    setHyperStatus(data?.status);
    if (data?.details) {
      setHyperData(data?.details);
      const selectedName = data?.details?.fullName
        ? data?.details?.fullName
        : `${data?.details?.firstName} ${data?.details?.middleName} ${data?.details?.lastName}`;
      setFullName(selectedName);
      if (!isIdAvailable) {
        prepopulateData(data?.details);
      }
      message.success(data.status);
    } else {
      setFullName("");
      form.setFieldsValue({
        fullName: "",
      });
      if (data?.status) {
        message.error(data?.status);
      }
    }
  };

  const getDocumentType = (validId) => {
    setDocumentType(validId);
  };
  const getIdNumber = (IdNumber) => {
    setIDNumber(IdNumber);
  };
  const checkIdAvailable = (idStatus) => {
    setIsIdAvailable(idStatus);
  };

  const onChangeMobile = () => {
    disableNextBtn();
  };

  const disableNextBtn = () => {
    return (
      formValues.firstName &&
      formValues.lastName &&
      formValues.birthDate &&
      formValues.Gender &&
      formValues.placeOfBirth &&
      formValues.citizenship &&
      formValues.mobileNumber &&
      formValues.emailAddress &&
      formValues.province &&
      formValues.city &&
      formValues.zipCode &&
      formValues.address1 &&
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !middleNameError &&
      !address1Error &&
      !address2Error &&
      !mobileNumberError
      // formValues.address2
    );
  };

  const onFinishFailed = (error) => {
  }
  // this is for birthate age
  const eighteenYearsAgo = moment().subtract(18, 'years');

  // Function to disable dates less than 18 years from today
  const disabledDate = current => {
    return current && current > eighteenYearsAgo;
  };
   //   UPPARCASE DATA ///
   const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
  return (
    <>
      <Header />
      <div className="parent-customer">
        <div className="left-side">
          <Button
            type="dashed"
            onClick={onChangetoDashboard}
            className="dashbtn"
          >
            <ArrowLeftOutlined />
            Back to Home
          </Button>
          <StepTravelTwo />
        </div>
        <div className="rightsides">
          <div className="rsTag">
            We just need to get some customer information.
          </div>

          <div className="headings-container">
            <ul style={{ paddingLeft: "23px" }}>
              <li>
                {" "}
                <div className="headings" style={{ marginTop: "0" }}>
                  Policy Holder Information
                </div>
              </li>
            </ul>
          </div>

          {/* HYperverge */}
          <HypervergeComponent
            // validIds={idList}
            handleCustomerDetails={getCustomerDetails}
            handleDocType={getDocumentType}
            handleIdNumber={getIdNumber}
            checkIdAvailable={checkIdAvailable}
            hintText="Maximum 2 MB. PNG or JPG files only"
            handleHyperResponse={getHyperDetails}
            documentId={tripData?.tripInfo?.documentId}
          />
          <div style={{ marginBottom: "16px" }}></div>

          {fullName && (
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
            </div>
          )}

          <Form
            name="basic"
            ref={formRef}
            initialValues={{
              remember: true,
            }}
            form={form}
            onFinish={onFinishCustomerInfo}
            onFinishFailed={onFinishFailed}
          >

            {/* ******************************************* */}
            <div className="rsRowDiv">
              <Row gutter={16} className="rsfieldsinfo">
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
                      // {
                      //   message: "Only Alphabets are Allowed",
                      //   pattern: new RegExp(/^[a-zA-Z][a-zA-Z ]*$/),
                      // },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.firstName}
                    </span>
                    <Input
                      placeholder="First Name"
                      className="inputboxx"
                      value={formValues.firstName}
                      onChange={(e) => {
                        handleFormChange("firstName", e.target.value);
                        const inputValue = e.target.value;
                        const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
                        if (!inputValue) {
                          setFirstNameError('First Name is required.');
                        } else if (!regex.test(inputValue)) {
                          setFirstNameError('Numeric and Special characters are not allowed.');
                        } else {
                          setFirstNameError('');
                        }
                      }}
                      disabled={isDisable.firstName && isIdAvailable}
                      maxLength={180}
                      onInput={toInputUppercase}
                    />
                    {firstNameError && (
                      <div className="error-message" style={{ color: 'red' }}>{firstNameError}</div>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="middleName"
                    label="Middle Name"

                    rules={[
                      {
                        required: false,
                        message: "Middle Name is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.middleName}
                    </span>
                    <Input
                      placeholder="Middle Name"
                      className="inputboxx"
                      value={formValues.middleName}
                      onChange={(e) => {
                        handleFormChange("middleName", e.target.value)
                        const inputValue = e.target.value;
                        const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
                        if (!inputValue) {
                          setMiddleNameError('');
                        } else if (!regex.test(inputValue)) {
                          setMiddleNameError('Numeric and Special characters are not allowed.');
                        } else {
                          setMiddleNameError('');
                        }
                      }}
                      disabled={isDisable.middleName && isIdAvailable}
                      maxLength={180}
                      onInput={toInputUppercase}
                    />
                    {middleNameError && (
                      <div className="error-message" style={{ color: 'red' }}>{middleNameError}</div>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="lastName"
                    label="Last Name"
                    // label={
                    //   <span>
                    //     <span className="RsSpan">*</span> <span className="RsList">Last Name</span>
                    //   </span>
                    // }
                    // rules={[
                    //   {
                    //     required: formValues.lastName === "",
                    //     message: "please enter your name !",
                    //   },
                    //   {
                    //     validator: (_, value) => {
                    //       const validPattern = /^[a-zA-Z]+$/;

                    //       if (!validPattern.test(value)) {
                    //         return Promise.reject(
                    //           " Numeric and Special characters are not allowed."
                    //         );
                    //       }

                    //       return Promise.resolve();
                    //     },
                    //   },
                    // ]}
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
                      },
                      {
                        message: "Only Alphabets are Allowed",
                        pattern: new RegExp(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/),
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.lastName}
                    </span>
                    <Input
                      placeholder="Last Name"
                      className="inputboxx"
                      value={formValues.lastName}
                      onInput={toInputUppercase}
                      onChange={(e) => {
                        handleFormChange("lastName", e.target.value);
                        const inputValue = e.target.value;
                        const regex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;
                        if (!inputValue) {
                          setLastNameError('Last Name is required.');
                        } else if (!regex.test(inputValue)) {
                          setLastNameError('Numeric and Special characters are not allowed.');
                        } else {
                          setLastNameError('');
                        }
                      }}
                      disabled={isDisable.lastName && isIdAvailable}
                      maxLength={30}
                    />
                    {lastNameError && (
                      <div className="error-message" style={{ color: 'red' }}>{lastNameError}</div>
                    )}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="birthDate"
                    label="Birthdate"
                    // label={
                    //   <span>
                    //     <span className="RsSpan">*</span> <span className="RsList">Birthdate</span>
                    //   </span>
                    // }
                    rules={[
                      {
                        required: true,
                        message: "Birthdate is required",
                      },

                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.birthDate
                        ? moment(formValues.birthDate)?.format("MM/DD/YYYY")
                        : ""}
                    </span>
                    <DatePicker
                      size="large"
                      bordered={true}
                      style={{ width: "95%" }}
                      value={formValues.birthDate}
                      onChange={onChangeBirthdate}
                      format="MM/DD/YYYY"
                      disabled={isDisable.birthDate && isIdAvailable}
                      disabledDate={disabledDate}

                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="suffix"
                    label="Suffix"
                    rules={[
                      {
                        required: false,
                        message: "",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>{formValues.suffix}</span>

                    <Select
                      style={{ width: "95%" }}
                      placeholder="Suffix"
                      size="large"
                      options={modalOptions}
                      value={formValues.suffix}
                      // defaultValue={vehicleInfo?.model}
                      disabled={isDisable.suffix && isIdAvailable}
                      optionFilterProp="children"
                      onChange={(item) => {
                        handleFormChange("suffix", item);
                      }}

                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >

                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Gender"
                    label="Gender"
                    // label={
                    //   <span>
                    //     <span className="RsSpan">*</span> <span className="RsList">Gender</span>
                    //   </span>
                    // }
                    rules={[
                      {
                        required: true,
                        message: "Please select gender",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>{formValues.Gender}</span>
                    <Select
                      style={{ width: "95%" }}
                      placeholder="Gender"
                      size="large"
                      value={formValues.Gender}
                      disabled={isDisable.Gender && isIdAvailable}
                      onChange={(item) => handleFormChange("Gender", item)}
                      // onChange={(e) => handleFormChange("gender", e.target.value)}
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
                    className="form-item-name la"
                    {...formItemLayout}
                    name="placeOfBirth"
                    label="Place of Birth"
                    // label={
                    //   <span>
                    //     <span className="RsSpan">*</span> <span className="RsList">Place of Birth</span>
                    //   </span>
                    // }
                    rules={[
                      {
                        required: true,
                        message: "Please enter place of birth",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.placeOfBirth}
                    </span>
                    <Input
                    onInput={toInputUppercase}
                      placeholder="Location"
                      className="inputboxx"
                      maxLength="15"
                      value={formValues.placeOfBirth}
                      disabled={isDisable.placeOfBirth && isIdAvailable}
                      onChange={(e) =>
                        handleFormChange("placeOfBirth", e.target.value)
                      }
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="citizenship"

                    label={
                      <span>
                        <span className="RsSpan">*</span> <span className="RsList">Citizenship</span>
                      </span>
                    }
                    rules={[
                      {
                        required: formValues.citizenship === "",
                        message: "citizenship is required",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.citizenship}
                    </span>
                    <Select
                      showSearch
                      placeholder="citizenship"
                      style={{ width: "95%" }}
                      size="large"
                      value={formValues.citizenship}
                      disabled={isDisable.citizenship && isIdAvailable}
                      onChange={(val) => handleFormChange("citizenship", val)}
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={optionList.citizenship}
                    ></Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="otpLoginMobileNumber"
                    label="Mobile Number"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter your mobile number",
                    //   },
                    // ]}
                    required
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.mobileNumber}
                    </span>
                    <Input
                      className="inputboxx"
                      size="default"
                      placeholder=" Mobile Number"
                      maxLength={12}
                      minLength={10}
                      value={otpLoginMobileNumber}
                      onChange={onChangeMobile}
                      defaultValue={otpLoginMobileNumber}
                      disabled
                      // disabled={isDisable.mobileNumber && isIdAvailable}
                      // onInput={(e) => {
                      //   if (e.target.value.length > 12) {
                      //     e.target.value = e.target.value.slice(0, 12);
                      //   }
                      // }}
                      // onChange={(e) => {
                      //   const inputValue = e.target.value;
                      //   if (inputValue.length <= 12) {
                      //     handleFormChange("mobileNumber", inputValue);
                      //   }
                      //   const regex2 = /^[0-9]+$/;
                      //   if (!inputValue) {
                      //     setMobileNumberError("Mobile Number is required.")
                      //   } else if (!regex2.test(inputValue)) {
                      //     setMobileNumberError('Only number allowed.');
                      //   } else if (inputValue.length < 10 || inputValue.length > 12) {
                      //     setMobileNumberError('Mobile number must be between 10 and 12 digits');
                      //   } else {
                      //     setMobileNumberError('');
                      //   }
                      // }}
                      autoComplete="off"
                    />
                    {/* {mobileNumberError && (
                      <div className="error-message" style={{ color: 'red' }}>{mobileNumberError}</div>
                    )} */}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="emailAddress"
                    label="Email Address"
                    // label={
                    //   <span>
                    //     <span className="RsSpan">*</span> <span className="RsList">Email Address</span>
                    //   </span>
                    // }
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        message: "Please provide a valid email address",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.emailAddress}
                    </span>
                    <Input
                      className="inputboxx"
                      maxLength="60"
                      size="default"
                      placeholder=" Email Address"
                      autoComplete="off"
                      value={formValues.emailAddress}
                      disabled={isDisable.emailAddress && isIdAvailable}
                      onChange={(e) => {
                        handleFormChange("emailAddress", e.target.value);
                        const inputValue = e.target.value;
                        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                        if (!inputValue) {
                          setEmailError('Email is required.');
                        } else if (!regex.test(inputValue)) {
                          setEmailError('Please provide a valid email address.');
                        } else {
                          setEmailError('');
                        }
                      }}
                    />
                    {emailError && (
                      <div className="error-message" style={{ color: 'red' }}>{emailError}</div>
                    )}
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    // className=""
                    name="province"

                    label={
                      <span>
                        <span className="RsSpan">*</span> <span className="RsList">Province</span>
                      </span>
                    }
                    rules={[
                      {
                        required: formValues.province === "",
                        message: "Select  Province!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.province}
                    </span>
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "95%" }}
                      placeholder=" Select Province"
                      autoComplete="on"
                      value={formValues.province}
                      disabled={isDisable.province && isIdAvailable}
                      options={optionList.province}
                      onChange={provinceHandleChange}
                      onSearch={onSearch}
                      filterOption={filterOption}

                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="city"

                    label={
                      <span>
                        <span className="RsSpan">*</span> <span className="RsList">City</span>
                      </span>
                    }
                    rules={[
                      {
                        required: formValues.city === "",
                        message: "Please select your city!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>{formValues.city}</span>
                    <Select
                      showSearch
                      size="large"
                      style={{ width: "95%" }}
                      placeholder="Select  city"
                      autoComplete="off"
                      value={formValues.city}
                      options={optionList.city}
                      disabled={isDisable.city && isIdAvailable}
                      onChange={cityHandleChange}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="zipCode"
                    // label="Zip Code"
                    label={
                      <span>
                        <span className="RsSpan">*</span> <span className="RsList">Zip Code</span>
                      </span>
                    }
                    rules={[
                      {
                        required: formValues.zipCode === "",
                        message: "Please select your Zip Code",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.zipCode}
                    </span>
                    <Select
                      size="large"
                      style={{ width: "95%" }}
                      placeholder="Zip Code"
                      value={formValues.zipCode}
                      options={optionList.zipCode}
                      disabled={isDisable.zipCode && isIdAvailable}
                      onChange={(val) => handleFormChange("zipCode", val)}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    // className="form-item-name label-color"
                    name="address1"
                    label="Address Line 1"
                    // label={
                    //   <span>
                    //     <span className="RsSpan">*</span> <span className="RsList">Address line 1</span>
                    //   </span>
                    // }
                    rules={[
                      {
                        required: true,
                        message: "please enter your address line 1",
                      },
                      { max: 40, message: "Max 40 character allowed." },
                    ]}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.address1}
                    </span>
                    <Input
                      className="inputboxx"
                      placeholder="Line 1"
                      value={formValues.address1}
                      disabled={isDisable.address1 && isIdAvailable}
                      onChange={(e) => {
                        handleFormChange("address1", e.target.value)
                        const inputVal = e.target.value;
                        if (inputVal.length > 40) {
                          setAddress1Error("Max 40 character allowed.")
                        } else {
                          setAddress1Error("")
                        }
                      }}
                      maxLength={40}
                      onInput={toInputUppercase}
                    />
                    {address1Error && (
                      <div className="error-message" style={{ color: 'red' }}>{address1Error}</div>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row
                gutter={16}
                className="rsfieldsinfo"
                style={{ marginBottom: "10px" }}
              >
                <Col xs={24}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    // className="form-item-name label-color"
                    name="address2"

                    label="Address line 2"
                    rules={[
                      {
                        required: false,
                        message: "please enter your address line 2",
                      },
                    ]}
                  >
                    <span style={{ display: "none" }}>
                      {formValues.address2}
                    </span>
                    <Input
                      className="inputboxx"
                      placeholder=" Line 2"
                      value={formValues.address2}
                      disabled={isDisable.address2 && isIdAvailable}
                      onChange={(e) => {
                        handleFormChange("address2", e.target.value)
                        const inputVal = e.target.value;
                        if (inputVal.length > 40) {
                          setAddress1Error("Max 40 character allowed.")
                        } else {
                          setAddress1Error("")
                        }
                      }
                      }
                      maxLength={40}
                      onInput={toInputUppercase}
                    />
                    {address2Error && (
                      <div className="error-message" style={{ color: 'red' }}>{address2Error}</div>
                    )}
                    
                  </Form.Item>
                </Col>
              </Row>
            </div>
            {/* Signature */}

            {/* <p style={{ fontWeight: "bold", margin: "14px 0" }}><span style={{ color: 'red' }}>*</span> Signature</p>

            <div className="browser-box">
              <div className="doc-box">
                <div className="child11" style={{ backgroundColor: '#1D428A', borderColor: '#1D428A', marginRight: '15px' }}>
                  <FolderAddOutlined style={{ color: 'white' }} />
                </div>
                <div className="doc-text-container">
                  {signatureName && (
                    <p className="doc-text" title={signatureName}>
                      <CloudDownloadOutlined style={{ marginRight: '10px' }} />
                      <span className="signature-name" title={signatureName}>
                        {signatureName}
                      </span>
                      <DeleteOutlined className="doc-delete-icon" onClick={handleUpload} />
                    </p>
                  )}
                </div>
              </div>
              <Upload
                accept=".jpg,.jpeg,.png"
                selectFile={formValues.selectFile}
                onChange={handleUpload}
                showUploadList={false}
                beforeUpload={() => false}
              >
                <Button
                  className={`browse-btn`}
                  style={{ backgroundColor: '#1D428A', marginLeft: 'auto' }}
                >
                  Browse
                </Button>
              </Upload>
            </div>
            <p style={{ fontWeight: "600", color: '#000', marginTop: 10 }}>
              Maximum 2 MB. PNG or JPG files only
            </p> */}
            <div className="rsRowDiv" style={{ marginBottom: '16px' }}>
              <div className="rsfieldsinfo">
                <div className="rsverified-container">
                  <Button className="back-btn" onClick={onClickback}>
                    Back
                  </Button>
                  <Button className={`next-btn ${!disableNextBtn() ? "disable-purple-btn" : ""
                    }`} htmlType="submit" isabled={!disableNextBtn()}>
                    Next <ArrowRightOutlined />
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <PolicyFooter />
      </div>
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
