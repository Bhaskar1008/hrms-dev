import React, { useState, useEffect } from "react";
import "./VehicalInformation.css";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
// import { stoageGetter } from "../../../../../../helpers";
import axiosRequest from "../../../../../../axios-request/request.methods";
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
  Spin,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import _, { result } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../../../store/actions";
import StepOne from "../../../../StepBar/StepOne/StepOne";
import AllFormFooter from "../../../../AllFormFooter/AllFormFooter";
import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import Header from "../../SampleHeader/Header";

const VehicalInformation = () => {
  // const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  const photoIdArray = useSelector(
    (state) => state?.uploadDocument?.vehicleCertificate
  );
  // console.log("photoIdArray: ", photoIdArray);
  const signArray = useSelector((state) => state?.uploadDocument?.Sign);

  const [fileContent, setFileContent] = useState(null);
  const [loader, setLoader] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [form] = Form.useForm();
  const location = useLocation();
  const data = location.state;
  const [selectFileList, setSelectFileList] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState([...photoIdArray]);
  const [selectedSign, setSelectedSign] = useState([...signArray]);
  const [signatureName, setSignatureName] = useState("");

  const st = useSelector((state) => state);
  const vehicleCertificateArray = useSelector(
    (state) => state?.uploadDocument?.vehicleCertificate
  );

  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );
  const vehicleStore = useSelector(
    (state) => state?.ctplqoutation.formData?.CTPL_VehicleInfo_for_Quotation
  );

  // hooks ***************
  const { Option } = Select;
  const history = useHistory();
  const dispatch = useDispatch();
  const [size, setSize] = useState("default"); // default is 'middle'

  const [fileList, setFileList] = useState([...vehicleCertificateArray]);
 
  const [selectFile, setSelectFile] = useState([]);
  const test = useSelector((state) => state);

  const [vehicleInfo, setVehicleInfo] = useState({
    make: vehicleStore?.make ? vehicleStore?.make : null,
    model: vehicleStore?.model ? vehicleStore?.model : null,
    vehicleType: vehicleStore?.vehicleType ? vehicleStore?.vehicleType : null,
    modelYear: vehicleStore?.modelYear ? vehicleStore?.modelYear : null,
    vehicleValue: vehicleStore?.vehicleValue
      ? vehicleStore?.vehicleValue
      : null,
    subModel: vehicleStore?.subModel ? vehicleStore?.subModel : null,
    typeOfUse: vehicleStore?.typeOfUse ? vehicleStore?.typeOfUse : null,
    subline: vehicleStore?.subline ? vehicleStore?.subline : null,
  });
  
  let policyTerm = useSelector((state) => state?.make?.policyTerm);
  // console.log("police", policyTerm);

  const [selectedMake, setSelectedMake] = useState("");
  // console.log("selectedMake", selectedMake);

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedvehicleType, setSelectedvehicleType] = useState("");
  const [selectedsubModel, setSelectedsubModel] = useState("");
  const [selectedsubline, setSelectedsubline] = useState("");
  const [SubModelTypeOfUse, setSubModelTypeOfUse] = useState("");

  // const [policyTypeData, setpolicyTypeData] = useState(data?.policyTypeData);
  // Input
  const [conductionNum, setConductionNum] = useState("");
  const [plateNumber, setPlateNumber] = useState(
    vehicleStore?.plateNumber ? vehicleStore?.plateNumber : ""
  );
  // console.log("plateNumber", plateNumber);
  const [chassisNumber, setChassisNumber] = useState(
    vehicleStore?.chasisNumber ? vehicleStore?.chasisNumber : ""
  );
  const [motorNumber, setMotorNumber] = useState(
    vehicleStore?.motorNumber ? vehicleStore?.motorNumber : ""
  );
  const [mvFileNumber, setMVFileNumber] = useState(
    vehicleStore?.mvFileNumber ? vehicleStore?.mvFileNumber : ""
  );
  
  const [value1, setValue1] = useState(true);
  // Date
  const [effectivityDate, setEffectivityDate] = useState("");
  const [expiredDate, setExpiredDate] = useState("");

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const uploadId = async () =>{
    try {
      const response = await axiosRequest.get("customer/getDocumentId");
      // console.log("response", response);
      if (response.statusCode === -1) {
        setLoader(false);
        const documentId = response?.data?.documentId;
        dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
        // history.push({
        //   pathname: "/vehicle-information",
        // });
      } else {
        message.error(response.data);
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log("error", error);
    }
  }

  useEffect(() => {
    setLoader(true);
    dispatch(actions.fetchAllMake());
    setLoader(false);
    if (photoIdArray?.length > 0) {
      setSignatureName(photoIdArray[0]?.name);
    }
    uploadId()
  }, [dispatch]);

  useEffect(() => {
    // console.log("useEffectplate", plateNumber);
    if (plateNumber !== "") {
      setLoader(true);
      dispatch(
        actions.fetchAllPolicyTermValue(plateNumber, value1, (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
            message.error(result.data);
          }
        })
      );
    }
  }, [value1, dispatch]);

  useEffect(() => {
    if (policyTerm?.month !== undefined) {

      const expiredDate = moment(`${policyTerm?.month}/${policyTerm?.day}/${policyTerm?.expiryYear}`, 'MM/DD/YYYY')

      setExpiredDate(expiredDate);

      const effectiveDate = moment(`${policyTerm?.month}/${policyTerm?.day}/${policyTerm?.effectiveYear}`, 'MM/DD/YYYY')
      // console.log("effectiveDate", effectiveDate);

      setEffectivityDate(effectiveDate);
    }
  }, [policyTerm]);

  useEffect(() => {
    // console.log("Datat=  in USe Effect  ========>>>>", vehicleStore);
    if (vehicleStore === undefined || vehicleStore === null) {
      clearalldropdownvalues()

      setEffectivityDate("")
      setExpiredDate("")

      form.setFieldValue({
        effectivityDate: "",
        expiredDate: ""
      })


    }
    setVehicleInfo({
      make: vehicleStore?.make ? vehicleStore?.make : null,

      model: vehicleStore?.model ? vehicleStore?.model : null,
      vehicleType: vehicleStore?.vehicleType ? vehicleStore?.vehicleType : null,
      modelYear: vehicleStore?.modelYear ? vehicleStore?.modelYear : null,
      vehicleValue: vehicleStore?.vehicleValue
        ? vehicleStore?.vehicleValue
        : null,
      subModel: vehicleStore?.subModel ? vehicleStore?.subModel : null,
      typeOfUse: vehicleStore?.typeOfUse ? vehicleStore?.typeOfUse : null,
      subline: vehicleStore?.subline ? vehicleStore?.subline : null,
    });

    setConductionNum(
      vehicleStore?.conductionNumber ? vehicleStore?.conductionNumber : ""
    );

    setSelectedMake(vehicleStore?.makeName ? vehicleStore?.makeName : "");
    setSelectedModel(vehicleStore?.modelName ? vehicleStore?.modelName : "");
    setSelectedsubModel(
      vehicleStore?.subModelName ? vehicleStore?.subModelName : ""
    );
    setSelectedsubline(
      vehicleStore?.sublineName ? vehicleStore?.sublineName : ""
    );
    setSubModelTypeOfUse(
      vehicleStore?.typeOfUseName ? vehicleStore?.typeOfUseName : ""
    );
    setSelectedvehicleType(
      vehicleStore?.vehicleTypeName ? vehicleStore?.vehicleTypeName : ""
    );
    setValue1(vehicleStore?.value1 ? vehicleStore?.value1 : false);

    form.setFieldsValue({
      make: vehicleStore?.make ? vehicleStore?.make : null,
      model: vehicleStore?.model ? vehicleStore?.model : null,
      vehicleType: vehicleStore?.vehicleType ? vehicleStore?.vehicleType : null,
      modelYear: vehicleStore?.modelYear ? vehicleStore?.modelYear : null,
      vehicleValue: vehicleStore?.vehicleValue
        ? vehicleStore?.vehicleValue
        : null,
      subModel: vehicleStore?.subModel ? vehicleStore?.subModel : null,
      typeOfUse: vehicleStore?.typeOfUse ? vehicleStore?.typeOfUse : null,
      subline: vehicleStore?.subline ? vehicleStore?.subline : null,
      conductionNum: vehicleStore?.conductionNumber
        ? vehicleStore?.conductionNumber
        : "",

      selectedMake: vehicleStore?.makeName ? vehicleStore?.makeName : "",
      setSelectedModel: vehicleStore?.modelName ? vehicleStore?.modelName : "",
      selectedvehicleType: vehicleStore?.vehicleTypeName
        ? vehicleStore?.vehicleTypeName
        : "",
      selectedsubModel: vehicleStore?.subModelName
        ? vehicleStore?.subModelName
        : "",
      selectedsubline: vehicleStore?.sublineName
        ? vehicleStore?.sublineName
        : "",
      SubModelTypeOfUse: vehicleStore?.typeOfUseName
        ? vehicleStore?.typeOfUseName
        : "",
      value1: vehicleStore?.value1 ? vehicleStore?.value1 : false,
    });
  }, [vehicleStore]);

  // Dropdown Get API

  let makeApi = useSelector((state) => state?.make?.make);

  let modalApi = useSelector((state) => state?.make?.modal?.lov);
  console.log("modalApi===>", modalApi);
  let vehicleApi = useSelector((state) => state?.make?.vehicletype?.lov);
  let modelyearApi = useSelector((state) => state?.make?.modelyear?.lov);
  let submodelApi = useSelector((state) => state?.make?.submodel?.lov);

  let typeofuseApi = useSelector((state) => state?.make?.typeofuse?.lov);

  console.log("typeofuseApi", typeofuseApi);
  let vehicleValueApi = useSelector((state) => state?.make?.vehicleValue);
  let sublineApi = useSelector((state) => state?.make?.subline);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  let makeOptions =
    makeApi && !_.isEmpty(makeApi)
      ? makeApi?.map((MAKE) => {
          const label = MAKE.NOM_MARCA;
          const value = MAKE.COD_MARCA;
          // const key = city.COD_LOCALIDAD;
          const newMakes = { ...MAKE, label, value };
          return newMakes;
        })
      : null;

  let modalOptions =
    modalApi && !_.isEmpty(modalApi)
      ? modalApi.map((MODAL) => {
          const label = MODAL.NOM_MODELO;
          const value = MODAL.COD_MODELO;
          const key = MODAL.COD_MODELO;
          const newModal = { ...MODAL, label, value, key };
          return newModal;
        })
      : null;

  console.log("modalOptions==>", modalOptions);

  let vehicleTypeOptions =
    vehicleApi && !_.isEmpty(vehicleApi)
      ? vehicleApi.map((VEHILETYPE) => {
          const label = VEHILETYPE.NOM_TIP_VEHI;
          const value = VEHILETYPE.COD_TIP_VEHI;
          const key = VEHILETYPE.COD_TIP_VEHI;
          const newVehicleType = { ...VEHILETYPE, label, value, key };

          return newVehicleType;
        })
      : null;

  console.log("vehicleTypeOptions", vehicleTypeOptions);

  let ModelYearOptions =
    modelyearApi && !_.isEmpty(modelyearApi)
      ? modelyearApi.map((MODELYEAR) => {
          const label = MODELYEAR.ANIO_SUB_MODELO;
          const value = MODELYEAR.ANIO_SUB_MODELO;
          const key = MODELYEAR.ANIO_SUB_MODELO;
          const newModelYear = { ...MODELYEAR, label, value, key };

          return newModelYear;
        })
      : null;

  let SubModelOptions =
    submodelApi && !_.isEmpty(submodelApi)
      ? submodelApi.map((SUBMODEL) => {
          const label = SUBMODEL.NOM_SUB_MODELO;
          const value = SUBMODEL.COD_SUB_MODELO;
          const key = SUBMODEL.COD_SUB_MODELO;
          const newSubModel = { ...SUBMODEL, label, value, key };

          return newSubModel;
        })
      : null;

  let TypeOfUseOptions =
    typeofuseApi && !_.isEmpty(typeofuseApi)
      ? typeofuseApi.map((TYPEOFUSE) => {
          const label = TYPEOFUSE.NOM_USO_VEHI;
          const value = TYPEOFUSE.COD_USO_VEHI;
          const key = TYPEOFUSE.COD_USO_VEHI;
          const newTypeOfUse = { ...TYPEOFUSE, label, value, key };
          return newTypeOfUse;
        })
      : null;

  console.log("TypeOfUseOptions", TypeOfUseOptions);

  const VehicleValueOptions = [
    {
      label: vehicleValueApi?.vehicleValue,
      value: vehicleValueApi?.vehicleValue,
    },
  ];

  let SublineOptions =
    sublineApi && !_.isEmpty(sublineApi)
      ? sublineApi.map((SUBLINE) => {
          const label = SUBLINE.name;
          const value = SUBLINE.subline;
          const key = SUBLINE.subline;
          const newSubline = { ...SUBLINE, label, value, key };

          return newSubline;
        })
      : null;

  // Dropdown
  const PolicyOption = [{ label: "Full Policy", value: "fullpolicy" }];

  const PolicyOptionType2 = [
    { label: "Individual", value: "Individual" },
    { label: "Group", value: "Group" },
  ];

  const PolicyOptionVehical = [
    { label: "Motorcycle/Tricycle", value: "MotorcycleTricycle" },
    { label: "Private Cars/SUV", value: "PrivateCarsSUV" },
    { label: "Light/ Medium Trucks", value: "LightMediumTrucks" },
    { label: "Taxi, PUJ, & Minibus", value: "TaxiPUJMinibus" },
    { label: "Heavy Truck/Private Bus", value: "HeavyTruck/PrivateBus" },
    { label: "PUB / Tourist Bus", value: "PUBTouristBus" },
  ];

  const PolicyTypeDataOption = [
    { label: "Fleet", value: "Fleet" },
    { label: "Bulk", value: "Bulk" },
  ];

  // functions *************
  const onChangetoDashboard = () => {
    dispatch(actions.resetFormData({}));
    history.push("/quotation-policy-tabs");
  };

  const onchangetoBack = () => {
    history.push("/quotation-policy-tabs");
    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
  };

  const onchangenextForfileValidation = () => {
    if (selectFile == "") {
      message.error("Please Upload PNG ,JPG File type");
    }
    console.log("Please Upload PNG ,JPG File type");
  };

  const onChangePlateNumber = (e) => {
    setPlateNumber(e.target.value);
  };

  const onChangePlateNumberKeyDow = (e) => {
    console.log("plateNumber onfoucer", e.target.value);
    if (plateNumber !== "") {
      // Make your API call here
      dispatch(
        actions.fetchAllPolicyTermValue(plateNumber, value1, (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
            message.error(result.data);
          }
        })
      );
    }
  };
  const conductionHandler = (e) => {
    setConductionNum(e.target.value);
  };

  const onChangeChassisNumber = (e) => {
    setChassisNumber(e.target.value);
  };

  const onChangeMotorNumber = (e) => {
    setMotorNumber(e.target.value);
  };

  const onChangeMVFileNumber = (e) => {
    setMVFileNumber(e.target.value);
  };

  const onChange1 = (e) => {
    setValue1(e.target.value);
  };

  const onChangeDate = (date, dateString) => {
    let newDate = moment(date).valueOf();
    const dateFormat = "MM/DD/YYYY"; // Date format
    const formattedDate = moment(newDate).format(dateFormat);
    console.log("dateFormat", formattedDate, date, dateString);

    setEffectivityDate(date);
    var currentDate = new Date(formattedDate);
    // Add one year
    currentDate.setFullYear(currentDate.getFullYear() + 1);
    // Format the date (if needed)
    var formattedDate1 = moment(
      currentDate.getMonth() +
        1 +
        "/" +
        currentDate.getDate() +
        "/" +
        currentDate.getFullYear(),
      "MM/DD/YYYY"
    );

    console.log(formattedDate1, "formattedDate1");
    setExpiredDate(formattedDate1);
  };

  const onChangeDate2 = (date, dateString) => {
    let newDate = moment(date).valueOf();
    const dateFormat = "MM/DD/YYYY"; // Date format
    const formattedDate = moment(newDate).format(dateFormat);
    console.log("dateFormat", formattedDate, date, dateString);
    setExpiredDate(date)

      var currentDate = new Date(formattedDate);
    // Add one year
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      // Format the date (if needed)
      var formattedDate1 = moment((currentDate.getMonth() + 1) + '/' + currentDate.getDate() + '/' + currentDate.getFullYear(), 'MM/DD/YYYY');

      console.log(formattedDate1, "formattedDate1");
      setEffectivityDate(formattedDate1)
    // setExpiredDate(formattedDate1);
  };

  const clearalldropdownvalues = () => {
    setVehicleInfo({
      model: null,
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });
    form.setFieldsValue({
      model: null,
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });

    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
  };

  // Dropdown onChange Handler

  const makeSelectHandler = (value, key) => {
    setLoader(true);
    // console.log("value---->", value, "Key---->make--->", key);

    setVehicleInfo({
      model: null,
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });
    form.setFieldsValue({
      model: null,
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });

    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));

    setSelectedMake(key?.NOM_MARCA);

    setVehicleInfo({ make: value });
    dispatch(
      actions.fetchAllModal(key.COD_MARCA, (result) => {
        if (result?.statusCode === -1) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
    );
  };

  const onchangeMakeVehical = () => {};

  const modalChangeHandler = (value, key) => {
    setLoader(true);

    setVehicleInfo({
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });
    form.setFieldsValue({
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });

    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));

    setSelectedModel(key.NOM_MODELO);
    setVehicleInfo({ model: value, make: vehicleInfo?.make });

    console.log("vehicleInfo?.make", vehicleInfo);

    dispatch(
      actions.fetchAllVehicleType(
        key?.COD_MODELO,
        vehicleInfo?.make,
        (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
  };

  const vehicleTypeChangeHandler = (value, key) => {
    setLoader(true);

    setVehicleInfo({
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });
    form.setFieldsValue({
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });

    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));

    setSelectedvehicleType(key.NOM_TIP_VEHI);
    setVehicleInfo({
      vehicleType: value,
      model: vehicleInfo.model,
      make: vehicleInfo.make,
    });

    dispatch(
      actions.fetchAllModelYear(
        key.COD_TIP_VEHI,
        vehicleInfo.model,
        vehicleInfo.make,
        (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
    // .then((res)=>{console.log("res")})
  };

  const modelYearChangeHandler = (value, key) => {
    setLoader(true);
    setVehicleInfo({
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });
    form.setFieldsValue({
      vehicleValue: null,
      subModel: null,
      typeOfUse: null,
      subline: null,
    });

    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));

    setVehicleInfo({
      modelYear: value,
      vehicleType: vehicleInfo.vehicleType,
      model: vehicleInfo.model,
      make: vehicleInfo.make,
    });

    dispatch(
      actions.fetchAllSubModel(
        key.ANIO_SUB_MODELO,
        vehicleInfo.vehicleType,
        vehicleInfo.model,
        vehicleInfo.make,
        (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
  };

  const SubModelChangeHandler = (value, key) => {
    setLoader(true);

    setVehicleInfo({
      typeOfUse: null,
      subline: null,
    });
    form.setFieldsValue({
      typeOfUse: null,
      subline: null,
    });

    setSelectedsubModel(key.NOM_SUB_MODELO);

    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));

    setVehicleInfo({
      subModel: value,
      modelYear: vehicleInfo.modelYear,
      vehicleType: vehicleInfo.vehicleType,
      model: vehicleInfo.model,
      make: vehicleInfo.make,
    });
    dispatch(
      actions.fetchAllTypeOfUse(
        key.COD_SUB_MODELO,
        vehicleInfo.modelYear,
        vehicleInfo.vehicleType,
        vehicleInfo.model,
        vehicleInfo.make,
        (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
  };

  const TypeOfUseChangeHandler = (value, key) => {
    setLoader(true);
    setVehicleInfo({
      subline: null,
    });
    form.setFieldsValue({
      subline: null,
    });

    setSubModelTypeOfUse(key.NOM_USO_VEHI);

    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));

    setVehicleInfo({
      typeOfUse: value,
      subModel: vehicleInfo.subModel,
      modelYear: vehicleInfo.modelYear,
      vehicleType: vehicleInfo.vehicleType,
      model: vehicleInfo.model,
      make: vehicleInfo.make,
    });

    dispatch(
      actions.fetchAllSubline(
        vehicleInfo.vehicleType,
        key.COD_USO_VEHI,
        (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
  };

  const SublineChangeHandler = (value, key) => {
    setLoader(true);
    // setSelectedSubModel(key.NOM_USO_VEHI);
    setSelectedsubline(key?.name);

    // dispatch(actions.fetchPolicyTermSuccess({}))

    setVehicleInfo({
      vehicleType: vehicleInfo?.vehicleType,
      typeOfUse: vehicleInfo?.typeOfUse,
      model: vehicleInfo.model,
      make: vehicleInfo.make,
    });

    dispatch(
      actions.fetchAllVehicleValue(
        vehicleInfo?.make,
        vehicleInfo?.model,
        vehicleInfo?.subModel,
        vehicleInfo?.modelYear,
        (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
  };

  const VehicleValueChangeHandler = (value, key) => {

    setVehicleInfo({
      make: vehicleInfo.make,
      model: vehicleInfo.model,
      modelYear: vehicleInfo.modelYear,
      subModel: vehicleInfo.subModel,
    });
  };

  
  const props2 = {
    defaultFileList: fileList,
  };

  const getVehicleInfo = (formData) => {

    let vehicleInfo = {
      CTPL_VehicleInfo_for_Quotation: {
        make: formData.make,
        makeName: selectedMake,
        model: formData.model,
        modelName: selectedModel,
        vehicleType: formData.vehicleType,
        vehicleTypeName: selectedvehicleType,
        modelYear: formData.modelYear,
        subModel: formData.subModel,
        subModelName: selectedsubModel,
        typeOfUse: formData.typeOfUse,
        typeOfUseName: SubModelTypeOfUse,
        subline: formData.subline,
        sublineName: selectedsubline,
        plateNumber: formData.plateNumber,
        chasisNumber: formData.chassisNumber,
        motorNumber: formData.motorNumber,
        mvFileNumber: formData.mvFileNumber,
        vehicleValue: formData.vehicleValue,
        effectivityDate: moment(effectivityDate).format("MM/DD/YYYY"),
        conductionNumber: formData.conductionNum,
        expiryDate: moment(expiredDate).format("MM/DD/YYYY"),
        value1: value1,
      },
    };

    console.log("vehicleInfoRequestBody", vehicleInfo);
    dispatch(actions.storeQuotationForm(vehicleInfo));

    if (!signatureName) {
      message.error("Please Upload PNG ,JPG File type");
      return;
    }

    history.push("/customer-sharableLink-information");
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleUpload = async (selectFile, name) => {
    setLoader(true);

    if (!documentId) {
      message.error("Document Id is not available.");
      setLoader(false);
      return;
    }

    const file = selectFile?.file;
    const sigName = selectFile?.file?.name;

    let isDeleteFile = "";
    if (sigName) {
      isDeleteFile = false;
      // setSelectFile(selectFile?.fileList);
      setSelectedPhoto(selectFile?.fileList);
      dispatch(actions.uploadVehicleCertificate(selectFile?.fileList));
    } else {
      // setSelectFile([]);
      setSelectedPhoto([]);
      dispatch(actions.uploadVehicleCertificate([]));
      isDeleteFile = true;
      setLoader(false);
    }

    if (file && file?.size > 2 * 1024 * 1024) {
      setLoader(false);
      message.error("File size should not exceed 2 MB");
      return;
    }

    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (
      file &&
      (!allowedFileTypes.includes(file.type) ||
        (selectFile?.cancelable && isDeleteFile))
    ) {
      setLoader(false);
      message.error("Please Upload PNG, JPG file type");
      return;
    }
    setSignatureName(sigName);
    let data = new FormData();
    let filetype = file?.type?.split("/");
    data.append("file", file);
    data.append("documentId", documentId);
    data.append("documentName", "VehicleCertificate");

    if (sigName) {
      await axiosRequest
        .post("user/document/upload", data)
        .then((res) => {
          console.log("response", res);
          setLoader(false);
          if (res.statusCode == -1) {
            setShowMsg(true);
            message.success("File uploaded successfully");
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log("err", err);
        });
    }
  };

  //   UPPARCASE DATA ///
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  return (
    <>
    <Header />
      <FullPageLoader spinloader={loader}></FullPageLoader>

      <div className="main-class1">
        <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div className="policy-header">
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Home{" "}
              </Button>
            </div>

            <StepOne />
          </Col>

          <Col
            xs={24}
            sm={24}
            md={14}
            lg={14}
            xl={14}
            style={{ marginTop: "12px" }}
          >
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              onFinish={getVehicleInfo}
              // autoComplete="off"\
              form={form}
              fields={[
                {
                  name: ["plateNumber"],
                  value: plateNumber,
                },
                {
                  name: ["chassisNumber"],
                  value: chassisNumber,
                },
                {
                  name: ["mvFileNumber"],
                  value: mvFileNumber,
                },
                {
                  name: ["motorNumber"],
                  value: motorNumber,
                },
                {
                  name: ["conductionNum"],
                  value: conductionNum,
                },

                {
                  name: ["expiryDate"],
                  value: expiredDate,
                },
                {
                  name: ["effectivityDate"],
                  value: effectivityDate,
                },
              ]}
            >
              <div className="right-side">
                <div className="CTPLpolicy-type">
                  <h2>Let’s get started with some important details.</h2>
                </div>

                <div className="info-head">
                  <h3>Vehicle Information</h3>
                </div>
                <p style={{ fontWeight: "600" }}>
                  <span className="RsSpanCtpl">*</span> Official / Certificate
                  Receipt (OR/CR) or Sales Invoice
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
                          <span
                            className="signature-name"
                            title={signatureName}
                          >
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
                <p className="mbMessage">
                  Maximum 2 MB. PNG or JPG files only.
                  {/* <a href="#" className="guide-link">
                    View our guide.
                  </a> */}
                </p>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="make"
                      label="Make"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Make",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        bordered="false"
                        onSearch={onSearch}
                        size="large"
                        placeholder="Select Make"
                        options={makeOptions}
                        optionFilterProp="children"
                        value={vehicleInfo?.make}
                        onSelect={(item, key) => {
                          makeSelectHandler(item, key);
                        }}
                        autoComplete="on"
                        onChange={onchangeMakeVehical}
                        filterOption={filterOption}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="model"
                      label="Model"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Model",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Select Model"
                        size="large"
                        options={modalOptions}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        value={vehicleInfo?.model}
                        // defaultValue={vehicleInfo?.model}
                        optionFilterProp="children"
                        onChange={(item, key) => {
                          // setSelectedModel(key);
                          modalChangeHandler(item, key);
                        }}
                        // disabled={vehicleInfo?.model ? true : false}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="vehicleType"
                      label="Vehicle Type"
                      rules={[
                        {
                          required: true,
                          message: "Please Select Vehicle Type",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Select Vehicle Type"
                        optionFilterProp="children"
                        value={vehicleInfo?.vehicleType}
                        onChange={(item, key) => {
                          vehicleTypeChangeHandler(item, key);
                        }}
                        
                        options={vehicleTypeOptions}
                        onSearch={onSearch}
                        filterOption={filterOption}
                      >
                        
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="modelYear"
                      label="Model Year"
                      rules={[
                        {
                          required: true,
                          message: "Please select Model Year",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Select Model Year"
                        optionFilterProp="children"
                        onChange={(item, key) => {
                          modelYearChangeHandler(item, key);
                        }}
                        value={vehicleInfo?.modelYear}
                        options={ModelYearOptions}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        //disabled={vehicleInfo?.modelYear ? false : true}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="subModel"
                      label="Sub Model"
                      rules={[
                        {
                          required: true,
                          message: "Please select Sub Model",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Select Sub Model"
                        optionFilterProp="children"
                        value={vehicleInfo?.subModel}
                        onChange={(item, key) => {
                          // setSelectedSubModel(key);
                          SubModelChangeHandler(item, key);
                        }}
                        options={SubModelOptions}
                        // value={modelYearSubModel}
                        onSearch={onSearch}
                        filterOption={filterOption}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="typeOfUse"
                      label="Type of Use"
                      rules={[
                        {
                          required: true,
                          message: "Please select Type of Use",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Select Type of Use"
                        optionFilterProp="children"
                        value={vehicleInfo?.typeOfUse}
                        onChange={(item, key) => {
                          // setSelectedTypeOfUse(key);
                          TypeOfUseChangeHandler(item, key);
                        }}
                        options={TypeOfUseOptions}
                        // value={subModelTypeOfUse}
                        onSearch={onSearch}
                        filterOption={filterOption}
                      ></Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="subline"
                      label="Subline "
                      rules={[
                        {
                          required: true,
                          message: "Please select Subline",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Select Subline"
                        optionFilterProp="children"
                        onChange={(item, key) => {
                          // setSelectedModelYear(key);
                          SublineChangeHandler(item, key);
                        }}
                        value={vehicleInfo?.subline}
                        options={SublineOptions}
                        onSearch={onSearch}
                        filterOption={filterOption}
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la"
                      name="plateNumber"
                      label="Plate Number"
                      
                      rules={[
                        {
                          required: true,
                          message: "Enter Plate Number",
                        },
                       
                        {
                          max: 11,
                          message: "Maximum of 11 alphanumeric characters",
                        },
                        {
                          validator: (_, value) => {
                            const validPattern = /^[a-zA-Z0-9_]+$/;

                            if (!validPattern.test(value)) {
                              return Promise.reject(
                                "Special characters are not allowed."
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
                        maxLength="11"
                        placeholder="Enter Plate Number"
                        value={plateNumber}
                        defaultValue={plateNumber}
                        onChange={(item) => onChangePlateNumber(item)}
                        onInput={toInputUppercase}
                        autoComplete="off"
                        onBlur={onChangePlateNumberKeyDow}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la"
                      name="chassisNumber"
                      label="Chassis/Serial Number"
                     
                      rules={[
                        {
                          required: true,
                          message: "Enter Chassis/Serial Number",
                        },
                        {
                          max: 30,
                          message: "Minimum 5 characters and maximum 30",
                          min: 5,
                        },
                        {
                          validator: (_, value) => {
                            const validPattern = /^[a-zA-Z0-9_]+$/;

                            if (!validPattern.test(value)) {
                              return Promise.reject(
                                "Special characters are not allowed."
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
                        minLength="15"
                        placeholder="Enter Chassis/Serial Number"
                        value={chassisNumber}
                        defaultValue={chassisNumber}
                        onChange={(item) => onChangeChassisNumber(item)}
                        onInput={toInputUppercase}
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la"
                      name="motorNumber"
                      label="Motor/Engine Number"
                      rules={[
                        {
                          required: true,
                          message: "Enter Motor/Engine Number",
                        },
                        {
                          max: 30,
                          message: "Minimum 5 characters and maximum 30",
                          min: 5,
                        },
                        {
                          validator: (_, value) => {
                            const validPattern = /^[a-zA-Z0-9_]+$/;

                            if (!validPattern.test(value)) {
                              return Promise.reject(
                                "Special characters are not allowed."
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
                        minLength="15"
                        placeholder="Enter Motor/Engine Number"
                        value={motorNumber}
                        defaultValue={motorNumber}
                        onChange={(item) => onChangeMotorNumber(item)}
                        onInput={toInputUppercase}
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la"
                      name="mvFileNumber"
                      label="MV File Number"
                      
                      rules={[
                        {
                          required: true,
                          message: "Enter MV File Number",
                        },
                        {
                          message: "Only 15 Digits Allowed ",
                          min: 15,
                          max: 15,
                        },

                        {
                          validator: (_, value) => {
                            const validPattern = /^[0-9]+$/;
                            if (!validPattern.test(value)) {
                              return Promise.reject(
                                "Only numbers are allowed."
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
                        maxLength="15"
                        minLength="15"
                        placeholder="MV File Number"
                        value={mvFileNumber}
                        defaultValue={mvFileNumber}
                        onChange={(item) => onChangeMVFileNumber(item)}
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la"
                      name="conductionNum"
                      label="Conduction Number"
                     
                      rules={[
                        {
                          required: false,
                          whitespace: true, // Trim whitespace before validation
                        },
                        {
                          validator: (_, value) => {
                            // If the value is empty, it's considered valid
                            if (!value) {
                              return Promise.resolve();
                            }

                            // Use a regular expression to validate the format
                            const validPattern = /^[a-zA-Z0-9]+$/;

                            if (!validPattern.test(value)) {
                              return Promise.reject(
                                "Please enter a valid Conduction Number"
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
                        maxLength="20"
                        placeholder="Enter Conduction Number"
                        value={conductionNum}
                        defaultValue={conductionNum}
                        onChange={(item) => conductionHandler(item)}
                        onInput={toInputUppercase}
                        autoComplete="off"
                      />
                    </Form.Item>
                  </Col>

                  
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <div className="register-head">
                      {/* <h3>Registration Information</h3> */}
                      <div className="policy-typeradiao">
                        <span className="RsSpanCtpl">*</span> Is this for late
                        registration?
                      </div>

                      <Radio.Group
                        onChange={onChange1}
                        value={value1}
                        style={{ marginTop: "5px", marginLeft: "7px" }}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>
                    </div>
                  </Col>

                  <Row gutter={16} style={{ width: "100%", marginLeft: "1px" }}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="effectivityDate"
                        label="Effective Date"
                        rules={[
                          {
                            required: true,
                            message: "Select Effective Date",
                          },
                        ]}
                      >
                        <DatePicker
                          onChange={onChangeDate}
                          className="first-name input-box"
                          size="large"
                          value={effectivityDate}
                          placeholder="Select Date"
                          format="MM/DD/YYYY"
                          allowClear={false}
                          style={{ width: "100%" }}
                          picker="year"
                        />
                       
                      </Form.Item>
                    </Col>

                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="expiryDate"
                        label="Expiry Date"
                        rules={[
                          {
                            required: true,
                            message: "Select Expiry Date",
                          },
                        ]}
                      >
                        <DatePicker
                          onChange={onChangeDate2}
                          className="first-name input-box"
                          size="large"
                          value={expiredDate}
                          placeholder="Select Date"
                          format="MM/DD/YYYY"
                          allowClear={false}
                          style={{ width: "100%" }}
                          picker="year"
                        />

                      </Form.Item>
                    </Col>
                  </Row>
                </Row>

                <div className="next-button-header">
                  <Button
                    className="next-button"
                    htmlType="submit"
                  >
                    Next
                    <ArrowRightOutlined />
                  </Button>

                  <Button className="prev-button" onClick={onchangetoBack}>
                    Back
                  </Button>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <AllFormFooter />
    </>
  );
};

export default VehicalInformation;
