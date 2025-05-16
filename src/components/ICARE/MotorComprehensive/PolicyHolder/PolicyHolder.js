import React, { useEffect, useState, createRef } from "react";
import "./PolicyHolder.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
  FileProtectOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import Validation from "../../../ValidationForm/Validation";
import * as actions from "../../../../store/actions";
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
} from "antd";
import img1 from "../../../../images/button images/MdVerified.png";
import img2 from "../../../../images/button images/upload.png";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import StepTravelTwo from "../../TRAVEL/StepBarTravel/StepTravelTwo/StepTravelTwo";
import PolicyQuoteFooter from "../MotorFormFooter/PolicyQuoteFooter/PolicyQuoteFooter";
import { useDispatch, useSelector } from "react-redux";
import { setMotorConditionalRender } from "../../../../store/actions/make";
import ExistingCustomerValidate from "../../../ExistingCustomerValidation/ExistingCustomerValidate";
import HypervergeSDK from "../../../../HypervergeSDK/HypervergeSDK";
import axiosRequest from "../../../../axios-request/request.methods";
import HypervergeComponent from "../../../../HypervergeSDK/HypervergeComponent";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import StepThree from "../components/StepBar/StepThree/StepThree";
const formRef = createRef();

const code = "";

export default function PolicyHolder() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [showConditionSection, setShowConditionalSection] = useState({
    alternatePolicyHolder: "0",
    owner: "1",
    driver: "1",
    leased: "0",
    assigned: "0",
    mortgaged: "0",
  });

  const showConditionSectionChangeHandler = (evt) => {
    setShowConditionalSection((prev) => {
      prev[evt.target.name] = evt.target.value;
      return { ...prev };
    });
  };

  // form fields data
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthdate] = useState("");
  const [suffix, setSuffix] = useState(null);
  const [gender, setGender] = useState(null);
  const [genderName, setGenderName] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [Addressline1, setAddressline1] = useState("");
  const [Addressline2, setAddressline2] = useState("");
  const [city, setCity] = useState(null);
  const [provinceName, setProvinceName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  // console.log("hey123", zipCode);
  const [citizenship, setCitizenship] = useState("PHL");
  const [birthDateError, setBirthDateError] = useState("");
  // other data
  const [idList, setIdList] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [IdNumber, setIDNumber] = useState("");
  const [hyperStatus, setHyperStatus] = useState("");
  const [hyperData, setHyperData] = useState(null);
  const [isIdAvailable, setIsIdAvailable] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [signatureName, setSignatureName] = useState("");

  const [optionList, setOptionList] = useState({
    province: [],
    city: [],
    zipCode: [],
    citizenship: [],
  });

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // const documentId = async () => {
  //   const data = await axiosRequest.get("user/getDocumentId");
  //   if (data.statusCode === -1) {
  //     return data?.data?.documentId;
  //   }
  // };
  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );

  const STATEEEEEE = useSelector((state) => state);
  // console.log("POLICY STATEEEEEE: ", STATEEEEEE);
  const policyDetailsData = useSelector(
    (state) => state?.motorQuotation?.formData?.policyHolder
  );
  // console.log("policyDetailsData", policyDetailsData);
  const policyHolderQuote = useSelector(
    (state) => state?.motorQuotation?.formData
  );

  const hyperMotorData = useSelector(
    (state) => state?.hyperverge?.hypervergeMotor
  );
  // console.log("hyperMotorData: ", hyperMotorData)

  // functions
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleMiddleNameChange = (e) => {
    setMiddleName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handlePlaceOfBirthChange = (e) => {
    setPlaceOfBirth(e.target.value);
  };
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleEmailAddressChange = (e) => {
    setEmailAddress(e.target.value);
  };
  const handleAddressline1Change = (e) => {
    setAddressline1(e.target.value);
  };
  const handleAddressline2Change = (e) => {
    setAddressline2(e.target.value);
  };
  const onChangeSuffix = (e) => {
    setSuffix(e);
  };
  const onChangeGender = (e) => {
    // console.log("Gender---", e);
    setGender(e);
    setGenderName(e);
  };
  const onChangeProvince = (val, opt) => {
    setProvince(val);
    setProvinceName(opt.label);
    setCityName("");
    setCity(null);
    setZipCode(null);
    setShowScreenLoader(true);
    setOptionList((prev) => {
      prev["city"] = [];
      prev["zipCode"] = [];
      return { ...prev };
    });
    const url = `user/lov?name=City&Province=${val}`;
    // console.log("url====>", url);
    getLovByType(url, "city", "NOM_LOCALIDAD", "COD_LOCALIDAD");
    setShowScreenLoader(false);
  };
  const onChangeCity = async (val, opt) => {
    setShowScreenLoader(true);
    setCity(val);
    setCityName(opt.label);
    // console.log(opt);
    const url = `user/lov?name=Zip&City=${val}&Province=${province}`;
    const zipCode = await getLovByType(
      url,
      "zipCode",
      "COD_POSTAL",
      "COD_POSTAL"
    );
    setShowScreenLoader(false);
    setZipCode(zipCode[0]?.COD_POSTAL);
    form.setFieldsValue({
      zipcode: zipCode[0]?.COD_POSTAL,
    });
  };
  useEffect(() => {
    getIdType();
    const url = `user/lov?name=Province`;
    const url2 = `user/lov?name=Citizenship`;
    getLovByType(url, "province", "NOM_PROV", "COD_PROV");
    getLovByType(url2, "citizenship", "NOM_PAIS", "COD_PAIS");
    dispatch(actions.fetchAllSuffix());
  }, [dispatch]);
  const SuffixOptions = useSelector((state) => state?.make?.suffix);
  // console.log("SuffixOptions", SuffixOptions)

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
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/motor-convert-policy");
  };

  const handleUpload = async (selectFile, name) => {
    if (!documentId) {
      message.error("Document Id is not available.");
      return;
    }

    const file = selectFile?.file;
    const sigName = selectFile?.file?.name;
    setSelectFile([]);
    setSignatureName("");
    if (!sigName) {
      return;
    }
    if (file && file?.size > 2 * 1024 * 1024) {
      message.error("File size should not exceed 2 MB");
    } else if (
      file?.type == "image/png" ||
      file?.type == "image/jpeg" ||
      file?.type == "image/jpg"
    ) {
      setSignatureName(sigName);
      setSelectFile([selectFile?.fileList[selectFile?.fileList?.length - 1]]);
      let data = new FormData();
      let filetype = file?.type?.split("/");
      // console.log("filetype", filetype);
      data.append("file", file);
      data.append("documentId", documentId);
      data.append("documentName", "Signature");
      data.append("fileType", filetype ? filetype[1] : "");
      if (sigName) {
        setShowScreenLoader(true);
        await axiosRequest
          .post("user/document/upload", data)
          .then((res) => {
            // console.log("response", res);
            if (res.statusCode == -1) {
              setShowMsg(true);
              message.success("File uploaded successfully");
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } else {
      message.error("Please Upload PNG ,JPG File type");
      return;
    }
    setShowScreenLoader(false);
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

  const getLovByType = async (url, name, label, value) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(url);
    setShowScreenLoader(false);
    let cityList = [];
    console.log("res: ", res)
    if (res.statusCode === -1) {
      if (res?.data?.lov && Array.isArray(res.data.lov)) {
        setOptionList((prev) => {
          prev[name] = res.data.lov.map((e) => ({
            label: e[label],
            value: e[value],
          }));
          return { ...prev };
        });
        cityList = res.data.lov;
      }
    }
    // else {
    // message.error(res?.data?.data?.message ?? "Something went Wrong");
    // }
    return cityList;
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

  useEffect(() => {
    if (policyDetailsData) {
      if (hyperMotorData?.hypervergeDocName) {
        setFullName(hyperMotorData?.hypervergeDocName);
        form.setFieldsValue({
          fullName: hyperMotorData?.hypervergeDocName,
        });
        setHyperStatus("auto_approved");
      }
      setSignatureName(
        hyperMotorData?.signature?.length > 0
          ? hyperMotorData?.signature[0]?.name
          : null
      );
      setSelectFile(
        hyperMotorData?.signature?.length > 0 ? hyperMotorData?.signature : []
      );
      prepopulateData(policyDetailsData);
    }
  }, [policyDetailsData]);

  const getCustomerDetails = (details) => {
    // console.log("RESS From Exist customer: ", details);
    if (details) {
      // console.log("SSSSS: ", optionList);
      prepopulateData(details);
    } else {
      formRef.current.resetFields();
      const formValues = form.getFieldsValue();
      setFullName("");
      setFirstName("");
      setLastName("");
      setMiddleName("");
      setSuffix(null);
      setGender(null);
      setGenderName("");
      setCitizenship(null);
      setBirthdate("");
      setAddressline1("");
      setAddressline2("");
      setProvinceName("");
      setProvince(null);
      setCityName("");
      setCity(null);
      setZipCode(null);
      setMobileNumber("");
      setEmailAddress("");
      setPlaceOfBirth("");
      setSelectFile([]);
      setSignatureName("");
      setOptionList((prev) => {
        prev["city"] = [];
        prev["zipCode"] = [];
        return { ...prev };
      });
      // console.log("RESET ALL VALUE: ", formValues);
    }
  };

  const getDocumentType = (validId) => {
    // console.log("VALID ID: ", validId);
    setDocumentType(validId);
  };
  const getIdNumber = (IdNumber) => {
    // console.log("idNumber: ", IdNumber);
    setIDNumber(IdNumber);
  };
  const checkIdAvailable = (idStatus) => {
    setIsIdAvailable(idStatus);
  };

  const getHyperDetails = (data) => {
    // console.log("Hyperverge SDK details: ", data);
    setHyperStatus(data?.status);
    if (data?.details) {
      setHyperData(data?.details);
      const selectedName = data?.details?.fullName
        ? data?.details?.fullName
        : `${data?.details?.firstName} ${data?.details?.middleName} ${data?.details?.lastName}`;
      setFullName(selectedName);
      form.setFieldsValue({
        fullName: data?.details?.fullName,
      });
      if (!isIdAvailable) {
        prepopulateData(data?.details);
      }
      message.success(data.status);
    } else {
      setHyperStatus("");
      if (data?.status) {
        message.error(data?.status);
      }
    }
  };
  const prepopulateData = async (details) => {
    let provinceList = null;
    if (optionList?.province?.length === 0) {
      provinceList = await getLovByType(
        "user/lov?name=Province",
        "province",
        "NOM_PROV",
        "COD_PROV"
      );
    } else {
      provinceList = optionList?.province;
    }
    let cityList = null;
    // console.log("DETAILS: ", details);
    let filteredProvince = null;
    const selectedProvince = details?.province || details?.provinceCode;
    if (selectedProvince) {
      filteredProvince = provinceList?.filter(
        (item) =>
          item.COD_PROV === selectedProvince || item.value === selectedProvince
      )[0];
    }

    if (filteredProvince?.COD_PROV || filteredProvince?.value) {
      const url = `user/lov?name=City&Province=${details?.provinceCode}`;
      cityList = await getLovByType(
        url,
        "city",
        "NOM_LOCALIDAD",
        "COD_LOCALIDAD"
      );
    }
    // console.log("CITIES OPTION:", cityList);
    const filteredCity = cityList?.filter(
      (item) =>
        item.COD_LOCALIDAD == details?.cityCode ||
        item.NOM_LOCALIDAD == details?.cityCode
    )[0];

    const filteredGender = GenderOptions.filter(
      (item) => item.id == details?.gender || item.notation == details?.gender
    )[0]?.value;
    let hyperDOB = moment(details?.dateOfBirth, "DD-MM-YYYY").format(
      "MM-DD-YYYY 00:00:00.0"
    );
    const birthDate = details?.birthday
      ? moment(details?.birthday)
      : details?.dateOfBirth
        ? moment(hyperDOB)
        : "";

    // console.log("PROVINCE: ", filteredProvince);
    // console.log("filteredCity: ", filteredCity);
    // console.log("gender: ", filteredGender);
    // console.log("BIRTH: ", birthDate);
    let address1 = "";
    let address2 = "";
    if (
      (details?.address1?.length >= 40 || details?.address?.length >= 40) &&
      !details?.address2
    ) {
      address1 = details?.address1
        ? details?.address1?.slice(0, 40)
        : details?.address
          ? details?.address?.slice(0, 40)
          : "";
      address2 = details?.address1
        ? details?.address1?.slice(40, 80)
        : details?.address
          ? details?.address?.slice(40, 80)
          : "";
    } else {
      address1 = details?.address1 || details?.address || "";
      address2 = details?.address2;
    }

    setFirstName(details?.firstName?.trim());
    setLastName(details?.lastName?.trim());
    setMiddleName(details?.middleName?.trim());
    setSuffix(details?.suffix);
    setGender(filteredGender);
    setGenderName(filteredGender);
    setCitizenship(details?.countryCode || "PHL");
    setBirthdate(birthDate);
    setAddressline1(address1?.trim());
    setAddressline2(address2?.trim());
    setProvinceName(filteredProvince?.NOM_PROV || filteredProvince?.label);
    setProvince(filteredProvince?.COD_PROV || filteredProvince?.value);
    setCityName(filteredCity?.NOM_LOCALIDAD);
    setCity(filteredCity?.COD_LOCALIDAD);
    setZipCode(details?.zipCode);
    setMobileNumber(details?.mobileNumber);
    setEmailAddress(details?.emailAddress);
    setPlaceOfBirth(details?.placeOfBirth);
    setIsDisable(true);

    form.setFieldsValue({
      firstName: details?.firstName?.trim(),
      lastName: details?.lastName?.trim(),
      middleName: details?.middleName?.trim(),
      suffix: details?.suffix,
      gender: filteredGender,
      citizenship: details?.countryCode || "PHL",
      birthDate: birthDate,
      Addressline1: address1?.trim(),
      Addressline2: address2?.trim(),
      cityName: filteredCity?.NOM_LOCALIDAD,
      city: filteredCity?.COD_LOCALIDAD,
      provinceName: filteredProvince?.NOM_PROV || filteredProvince?.label,
      province: filteredProvince?.COD_PROV || filteredProvince?.value,
      zipcode: details?.zipCode,
      placeOfBirth: details?.placeOfBirth,
      mobileNumber: details?.mobileNumber,
      emailAddress: details?.emailAddress,
    });

    setIsDisable({
      firstName: !!details?.firstName,
      lastName: !!details?.lastName,
      middleName: !!details?.middleName,
      gender: filteredGender,
      birthDate: birthDate,
      // suffix: !!details?.suffix,
      // citizenship: !!details?.countryCode,
      // Addressline1: !!address1,
      // Addressline2: !!address2,
      // city: filteredCity?.COD_LOCALIDAD,
      // province: filteredProvince?.COD_PROV || filteredProvince?.value,
      // zipCode: !!details?.zipCode,
      // placeOfBirth: !!details?.placeOfBirth,
      // mobileNumber: !!details?.mobileNumber,
      // emailAddress: !!details?.emailAddress,
    });
    // console.log("DISABLEEEE: ", isDisable);
    const formValues = form.getFieldsValue();
    // console.log("ALL VALUE: ", formValues);
  };

  const finalSubmit = (formData) => {
    // console.log("FORM DATAAAAAA: ", formData);
    if (!documentType) {
      return message.error("Plese enter Valid Id");
    }
    if (!IdNumber) {
      return message.error("Plese enter Id Number");
    }
    // if (hyperStatus !== "auto_approved") {
    //   message.error("Please Upload Document");
    //   return;
    // }
    // if (selectFile.length === 0) {
    //   message.error("Please Upload Signature.");
    //   return;
    // }
    let showCondition = false;
    // for (let key in showConditionSection) {
    //   if (showConditionSection[key] !== "0") {
    //     showCondition = true;
    //     break;
    //   }
    // }
    // if(!showCondition){
    // if (showConditionSection?.driver == "1" && showConditionSection?.owner == "1") {
    //   showCondition = false;
    // } else
    if (
      showConditionSection.alternatePolicyHolder !== "0" ||
      showConditionSection.leased !== "0" ||
      showConditionSection.assigned !== "0" ||
      showConditionSection.mortgaged !== "0" ||
      (showConditionSection?.driver !== "1" &&
        showConditionSection?.owner !== "1")
    ) {
      showCondition = true;
    }
    // }

    formData.gender = GenderOptions.filter(
      (item) => item.value == formData?.gender
    )[0]?.id;
    const citizenshipName = optionList.citizenship.filter((item) => item.value == citizenship)[0]?.label;

    // if (code === "011000") {
    //   history.push("/confirm-details");
    //   return;
    // }
    // console.log("showConditionSection: ", showConditionSection);
    let DateOfBirth = "";
    if (typeof birthDate !== "string") {
      DateOfBirth = moment(birthDate).format("MM/DD/YYYY");
    } else {
      DateOfBirth = birthDate;
    }

    const policyHolderInfo = {
      ...policyHolderQuote,
      policyHolder: {
        documentCode: IdNumber,
        documentType: documentType,
        firstName: formData?.firstName,
        middleName: formData?.middleName,
        lastName: formData?.lastName,
        suffix: formData?.suffix,
        birthday: DateOfBirth,
        gender: formData?.gender,
        genderName: genderName,
        placeOfBirth: formData?.placeOfBirth,
        nationalityCode: formData?.citizenship,
        address1: formData?.Addressline1,
        address2: formData?.Addressline2,
        countryCode: formData?.citizenship,
        provinceCode: formData?.province,
        provinceName: provinceName,
        cityCode: formData?.city,
        citizenshipName,
        cityName: cityName,
        zipCode: formData?.zipCode,
        mobileNumber: formData?.mobileNumber,
        emailAddress: formData?.emailAddress,
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
        signature: selectFile,
        documentUploaded: hyperData?.imagePath ? true : false
      };
    } else {
      hypervergeData = {
        documentType: hyperMotorData?.documentType,
        documentCode: hyperMotorData?.documentCode,
        isExistingCustomer: hyperMotorData?.isExistingCustomer,
        hypervergeDocName: hyperMotorData?.hypervergeDocName,
        hyperDocImg: hyperMotorData?.hyperDocImg,
        signature: selectFile,
        documentUploaded: hyperMotorData?.hyperDocImg ? true : false
      };
    }
    dispatch(actions.hypervergeMotorData(hypervergeData));
    dispatch(setMotorConditionalRender(showConditionSection));
    dispatch(actions.motorQuotationForm(policyHolderInfo));

    dispatch(
      actions.motorQuotationForm({
        secondary: null,
        owner: null,
        driver: null,
        assignee: null,
        mortgagee: null,
      })
    );
    // history.push("/motor-confirm-page");

    if (showCondition) {
      history.push("/alternate-policyholder");
    } else {
      history.push("/motor-confirm-page");
    }
  };
  const onFinishFailed = (errorInfo) => {
    //message.error(errorInfo)
    console.log("Failed:", errorInfo);
  };

  const disableNextBtn = () => {
    return (
      firstName &&
      lastName &&
      birthDate &&
      gender &&
      placeOfBirth &&
      citizenship &&
      mobileNumber &&
      emailAddress &&
      province &&
      city &&
      zipCode &&
      Addressline1
    );
  };
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
      <FullPageLoader spinloader={showScreenLoader} />
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
            We just need to get some customer information.
          </div>
          <div className="headings-container">
            <ul>
              <li>
                {" "}
                <div className="headings">Policy Holder Information</div>
              </li>
            </ul>
          </div>
          <div style={{ margin: "16px 0" }}></div>

          {/* Hyperverge */}
          <HypervergeComponent
            // validIds={idList}
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
            initialValues={{
              remember: true,
            }}
            ref={formRef}
            onFinish={finalSubmit}
            onFinishFailed={onFinishFailed}
            form={form}
            fields={[
              {
                name: ["documentType"],
                value: documentType,
              },
              {
                name: ["documentType"],
                value: documentType,
              },
              {
                name: ["firstName"],
                value: firstName,
              },
              {
                name: ["middleName"],
                value: middleName,
              },
              {
                name: ["lastName"],
                value: lastName,
              },
              // {
              //   name: ["birthDate"],
              //   value: birthDate,
              // },
              {
                name: ["suffix"],
                value: suffix,
              },
              {
                name: ["gender"],
                value: gender,
              },
              {
                name: ["placeOfBirth"],
                value: placeOfBirth,
              },
              {
                name: ["citizenship"],
                value: citizenship,
              },
              {
                name: ["mobileNumber"],
                value: mobileNumber,
              },
              {
                name: ["emailAddress"],
                value: emailAddress,
              },
              {
                name: ["province"],
                value: province,
              },
              {
                name: ["city"],
                value: city,
              },
              {
                name: ["zipCode"],
                value: zipCode,
              },
              {
                name: ["Addressline1"],
                value: Addressline1,
              },
              {
                name: ["Addressline2"],
                value: Addressline2,
              },
            ]}
          >
            <div className="rsRowDiv">
              <Row gutter={16}>
                <Col xs={24}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="fullName"
                    label="Full Name"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Full Name"
                      className="inputboxx"
                      value={fullName}
                      onChange={(e) => {
                        handleFullNameChange(e);
                      }}
                      maxLength={180}
                      onInput={toInputUppercase}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} className="rsfieldsinfo">
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="firstName"
                    label="First Name"
                    rules={[
                      {
                        required: true,
                        message: "First Name is required.",
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
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="First Name"
                      className="inputboxx"
                      value={firstName}
                      onChange={(e) => {
                        handleFirstNameChange(e);
                      }}
                      disabled={isDisable.firstName && isIdAvailable}
                      maxLength={180}
                      onInput={toInputUppercase}
                    />
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
                        message: "please enter your middle name !",
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ ]+$/;

                          if (value && !validPattern.test(value)) {
                            return Promise.reject(
                              "Numeric and Special characters are not allowed."
                            );
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Middle Name"
                      className="inputboxx"
                      value={middleName}
                      onChange={(e) => handleMiddleNameChange(e)}
                      maxLength={180}
                      disabled={isDisable.middleName && isIdAvailable}
                      onInput={toInputUppercase}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="lastName"
                    label="Last Name"
                    rules={[
                      {
                        required: true,
                        message: "Last Name is required",
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
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Last Name"
                      className="inputboxx"
                      value={lastName}
                      onChange={(e) => handleLastNameChange(e)}
                      maxLength={30}
                      disabled={isDisable.lastName && isIdAvailable}
                      onInput={toInputUppercase}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="birthDate"
                    label="Birthdate"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your birthdate",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const birthdate = new Date(value);
                          const currentDate = new Date();
                          const ageDiff =
                            currentDate.getFullYear() - birthdate.getFullYear();

                          if (ageDiff >= 18) {
                            return Promise.resolve();
                          }

                          return Promise.reject(
                            "You must be at least 18 years old."
                          );
                        },
                      }),
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <DatePicker
                      className="first-name input-box"
                      size="large"
                      bordered={true}
                      placeholder="Select Date"
                      style={{ width: "100%" }}
                      value={birthDate}
                      disabled={isDisable.birthDate && isIdAvailable}
                      disabledDate={disabledDate}
                      onChange={onChangeBirthdate}
                      format="MM/DD/YYYY"
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
                    <Select
                      placeholder="Suffix"
                      size="large"
                      value={suffix}
                      onChange={(item) => onChangeSuffix(item)}
                      disabled={isDisable.suffix && isIdAvailable}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {SuffixOptions.length > 0
                        ? SuffixOptions.map((item, index) => (
                          <Option key={index} value={item.TIPO_SUFIJO_NOMBRE}>
                            {item.NOM_VALOR}
                          </Option>
                        ))
                        : ""}
                    </Select>
                  </Form.Item>
                </Col>
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
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="Gender"
                      size="large"
                      value={gender}
                      onChange={(item) => onChangeGender(item)}
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
                    className="form-item-name la"
                    {...formItemLayout}
                    name="placeOfBirth"
                    label="Place of Birth"
                    rules={[
                      {
                        required: true,
                        message: "Place of Birth is required.",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      placeholder="Location"
                      className="inputboxx"
                      value={placeOfBirth}
                      maxLength="15"
                      disabled={isDisable.placeOfBirth && isIdAvailable}
                      onChange={(e) => handlePlaceOfBirthChange(e)}
                      onInput={toInputUppercase}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="citizenship"
                    label="Citizenship"
                    rules={[
                      {
                        required: true,
                        message: "Citizenship is required.",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      placeholder="citizenship"
                      size="large"
                      value={citizenship}
                      onChange={(val) => setCitizenship(val)}
                      disabled={isDisable.citizenship && isIdAvailable}
                      options={optionList.citizenship}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>
              {/*
              <br /> */}
              <Row gutter={16}>
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
                            callback(
                              "Mobile number must be between 10 and 12 digits."
                            );
                          } else {
                            callback();
                          }
                        },
                      },
                      {
                        validator: (_, value) => {
                          const validPattern = /^[0-9]+$/;
                          if (!validPattern.test(value)) {
                            return Promise.reject("Only number allowed.");
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      className="inputboxx"
                      size="default"
                      placeholder="Mobile Number"
                      maxLength={12}
                      value={mobileNumber}
                      disabled={isDisable.mobileNumber && isIdAvailable}
                      onChange={(e) => handleMobileNumberChange(e)}
                      autoComplete="off"
                      onInput={(e) => {
                        if (e.target.value.length > 12) {
                          e.target.value = e.target.value.slice(0, 12);
                        }
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    name="emailAddress"
                    label="Email Address"
                    rules={[
                      {
                        required: true,
                        pattern: new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
                        message: "Please provide a valid email address",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="inputboxx"
                      size="default"
                      placeholder="Email Address"
                      autoComplete="off"
                      value={emailAddress}
                      disabled={isDisable.emailAddress && isIdAvailable}
                      onChange={(e) => handleEmailAddressChange(e)}
                      type="email"
                      maxLength="60"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    // className=""
                    name="province"
                    label="Province"
                    rules={[
                      {
                        required: true,
                        message: "Province is required.",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      size="large"
                      placeholder="Select Province"
                      autoComplete="on"
                      value={province}
                      disabled={isDisable.province && isIdAvailable}
                      options={optionList.province}
                      onChange={onChangeProvince}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: "City is required.",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      size="large"
                      placeholder="Select city"
                      autoComplete="off"
                      value={city}
                      disabled={isDisable.city && isIdAvailable}
                      options={optionList.city}
                      onChange={onChangeCity}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="zipCode"
                    label="Zip Code"
                    rules={[
                      {
                        required: true,
                        message: "Zip Code is required",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      size="large"
                      placeholder="Zip Code"
                      value={zipCode}
                      disabled={isDisable.zipCode && isIdAvailable}
                      options={optionList.zipCode}
                      onChange={(val) => setZipCode(val)}
                    ></Select>
                  </Form.Item>
                </Col>


              </Row>

              <Row gutter={16} className="rsfieldsinfo">
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    className="form-item-name la"
                    {...formItemLayout}
                    // className="form-item-name label-color"
                    name="Addressline1"
                    label="Address Line 1"
                    rules={[
                      {
                        required: true,
                        message: "Address is required",
                      },
                      { max: 40, message: "Max 40 character allowed." },
                    ]}
                  >
                    <Input
                      className="inputboxx"
                      placeholder="Address Line 1"
                      value={Addressline1}
                      disabled={isDisable.Addressline1 && isIdAvailable}
                      onChange={(e) => handleAddressline1Change(e)}
                      maxLength={40}
                      onInput={toInputUppercase}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    // className="form-item-name label-color"
                    name="Addressline2"
                    label="Address Line 2"
                    rules={[
                      // {
                      //   required: false,
                      //   message: "please enter your address line 2",
                      // },
                      { max: 40, message: "Max 40 character allowed." },
                    ]}
                  >
                    <Input
                      className="inputboxx"
                      placeholder="Address Line 2"
                      value={Addressline2}
                      disabled={isDisable.Addressline2 && isIdAvailable}
                      onChange={(e) => handleAddressline2Change(e)}
                      maxLength={40}
                      onInput={toInputUppercase}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Signature */}
            {/* <p style={{ fontWeight: "bold", margin: "14px 0" }}>
              <span style={{ color: "red" }}>*</span>Signature
            </p>
            <div className="browser-box2">
              <div className="doc-box">
                <div
                  className="child11"
                  style={{
                    backgroundColor: "#1D428A",
                    borderColor: "#1D428A",
                    marginRight: "20px",
                  }}
                >
                  <FolderAddOutlined style={{ color: "white" }} />
                </div>
                <div className="doc-text-container">
                  {signatureName && (
                    <p className="doc-text" title={signatureName}>
                      <CloudDownloadOutlined style={{ marginRight: "10px" }} />
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
                selectFile={selectFile}
                onChange={handleUpload}
                showUploadList={false}
                beforeUpload={() => false}
              >
                <Button
                  className={`browse-btn`}
                  style={{ backgroundColor: "#1D428A" }}
                >
                  Browse
                </Button>
              </Upload>
            </div>
            <p className="fw-bold" style={{ marginTop: 10 }}>
              Maximum 2 MB. PNG or JPG files only
            </p> */}

            <div className="rsInfoContainer" style={{ marginTop: "16px" }}>
              <div className="header2">
                Do you have an Alternate Policy Holder?{" "}
              </div>
              <div>
                <Radio.Group
                  onChange={showConditionSectionChangeHandler}
                  value={showConditionSection.alternatePolicyHolder}
                  name="alternatePolicyHolder"
                  className="rsRadio"
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </div>

              <div className="header2">Is the Policy Holder the Owner?</div>
              <div>
                <Radio.Group
                  onChange={showConditionSectionChangeHandler}
                  value={showConditionSection.owner}
                  name="owner"
                  className="rsRadio"
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </div>

              <div className="header2">
                Is the Policy Holder the only Driver?
              </div>

              <div>
                <Radio.Group
                  onChange={showConditionSectionChangeHandler}
                  value={showConditionSection.driver}
                  name="driver"
                  className="rsRadio"
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </div>

              <div className="header2">Is the vehicle being leased?</div>
              <div>
                <Radio.Group
                  onChange={showConditionSectionChangeHandler}
                  value={showConditionSection.leased}
                  // style={{ pointerEvents: "none" }}
                  name="leased"
                  className="rsRadio"
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </div>
              <div className="header2">Is the vehicle being assigned?</div>
              <div>
                <Radio.Group
                  onChange={showConditionSectionChangeHandler}
                  value={showConditionSection.assigned}
                  name="assigned"
                  className="rsRadio"
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </div>
              <div className="header2">Has the vehicle been mortgaged?</div>
              <div>
                <Radio.Group
                  onChange={showConditionSectionChangeHandler}
                  value={showConditionSection.mortgaged}
                  name="mortgaged"
                  className="rsRadio"
                >
                  <Radio value="1">Yes</Radio>
                  <Radio value="0">No</Radio>
                </Radio.Group>
              </div>
            </div>

            <div className="rsRowDiv">
              <div className="rsfieldsinfo">
                <div className="Spverified-container">
                  <Button className="back-btn" onClick={onchangetoBack}>
                    Back
                  </Button>
                  <Button
                    className={`next-btn ${!disableNextBtn() ? "disable-purple-btn" : ""
                      }`}
                    htmlType="submit"
                    isabled={!disableNextBtn()}
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
    </>
  );
}
