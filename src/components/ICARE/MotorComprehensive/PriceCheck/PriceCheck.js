import React, { useState, useEffect } from "react";
import "./PriceCheck.css";
import { useHistory, useLocation } from "react-router-dom";

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
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions";
import StepOne from "../components/StepBar/StepOne/StepOne";
// import AutoSelectCompletion from "../components/AutoSelectCompletion";
import MotorFormFooter from "../MotorFormFooter/MotorFormFooter";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import NoDataCard from "../NoDataCard/NoDataCard";

// import CustomInput from "../components/CustomInput";

const PriceCheck = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const motorVehicleStore = useSelector(
    (state) => state?.motorQuotation?.formData?.vehicleData
  );
  // console.log("moto==>", motorVehicleStore);

  const sublineStore = useSelector(
    (state) => state?.motorQuotation?.formData?.subline
  );
  // console.log("sublineStore", sublineStore);
  const sublineStoreName = useSelector(
    (state) => state?.motorQuotation?.formData?.sublineName
  );
  const productTypeButton = useSelector(
    (state) => state?.motorQuotation?.formData?.productTier
  );

  const test = useSelector((state) => state);
  console.log("test", test);
  const selectProduct = useSelector((state) => state?.motorQuotation?.formData);
  // console.log("selectProduct==>", selectProduct);
  const [activeButton, setActiveButton] = useState(null);
  const [productErr, setProductErr] = useState("");

  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedMake, setSelectedMake] = useState("");
  const [productCode, setProductCode] = useState("");

  const [productName, setProductName] = useState("");
  const [loader, setLoader] = useState(false);
  const [autoSetLoader, setAutoSetLoader] = useState(false);
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedModelYear, setSelectedModelYear] = useState("");
  const [selectedSubModel, setSelectedSubModel] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState("");

  const [selectedSubline, setSelectedSubline] = useState("");
  const [selectedTypeOfUse, setSelectedTypeOfUse] = useState("");
  const [selectedVehicleValue, setSelectedVehicleValue] = useState("");
  const [selectedAreaOfUsage, setSelectedAreaOfUsage] = useState("");
  const [vehicleInfo, setVehicleInfo] = useState({
    make: null,
    model: null,
    vehicleType: null,
    modelYear: null,
    vehicleValue: null,
    subModel: null,
    transmission: null,
    typeOfUse: null,
    subline: null,
    areaOfUsage: null,
  });
  // console.log("new==>", vehicleInfo);

  useEffect(() => {
    dispatch(actions.fetchAllMake());
  }, [dispatch]);

  const getMotorInfo = (formData) => {
    if(!productCode){
      setProductErr("Product is required");
      return;
    } else {
      setProductErr("");
    }
    const motorVehicle = {
      sublineName: selectedSubline,
      // policyGroupCode: null,
      // policyGroupName: null,
      // contractCode: null,
      subline: formData?.subline,
      productTier: productCode,
      productTierName: productName,
      vehicleData: {
        fileNumber: motorVehicleStore?.fileNumber || null,
        conductionNumber: motorVehicleStore?.conductionNumber || null,
        plateNumber: motorVehicleStore?.plateNumber || null,
        engineNumber: motorVehicleStore?.engineNumber || null,
        chassisNumber: motorVehicleStore?.chassisNumber || null,
        makeName: selectedMake,
        makeCode: formData.make,
        modelCode: formData.modal,
        modelName: selectedModel,
        vehicleType: formData.vehicletype,
        vehicleTypeName: selectedVehicleType,
        yearModel: formData.modelyear,
        subModelCode: formData.submodel,
        subModelName: selectedSubModel,
        areaOfUse: formData.areaofusage,
        areaOfUseName: selectedAreaOfUsage,
        typeOfUse: formData.typeofuse,
        typeOfUseName: selectedTypeOfUse,
        vehicleValue: formData.vehicleValue,
        transmission: vehicleInfo?.transmission,
      },
    };

    dispatch(actions.motorQuotationForm(motorVehicle));
    if (productName) {
      history.push("/policy-group-info");
    } else {
      message.error("Please Select Product");
      return;
    }
  };

  const failedSubmit = (err) =>{
    if(!productCode){
      setProductErr("Product is required");
      return;
    } else {
      setProductErr("");
    }
  }

  let makeApi = useSelector((state) => state?.make?.make);
  let modalApi = useSelector((state) => state?.make?.modal?.lov);
  let vehicleApi = useSelector((state) => state?.make?.vehicletype?.lov);
  let modelyearApi = useSelector((state) => state?.make?.modelyear?.lov);
  let submodelApi = useSelector((state) => state?.make?.submodel?.lov);
  let typeofuseApi = useSelector((state) => state?.make?.typeofuse?.lov);
  let vehicleValueApi = useSelector((state) => state?.make?.vehicleValue);

  let sublineApi = useSelector((state) => state?.make?.subline);

  const sublineEffectiveDate = sublineApi?.[0]?.effectivityDate;

  let areaofusageApi = useSelector((state) => state?.make?.areaofusage?.lov);

  let motorProductTierApi = useSelector(
    (state) => state?.make?.motorproducttier?.lov
  );

  useEffect(() => {
    // console.log("Datat=  in USe Effect  ========>>>>", motorVehicleStore);
    if (motorVehicleStore === undefined || motorVehicleStore === null) {
      clearallfield();
    } else {
      prepopulateData();
    }
    // dispatch(actions.fetchAllVehicleValue());
  }, []);

  const prepopulateData = async () =>{
    setAutoSetLoader(true);
    setVehicleInfo({
      make: motorVehicleStore?.makeName ? motorVehicleStore?.makeName : null,
      model: motorVehicleStore?.modelCode ? motorVehicleStore?.modelCode : null,
      vehicleType: motorVehicleStore?.vehicleType
        ? motorVehicleStore?.vehicleType
        : null,
      modelYear: motorVehicleStore?.yearModel
        ? motorVehicleStore?.yearModel
        : null,
      vehicleValue: motorVehicleStore?.vehicleValue
        ? motorVehicleStore?.vehicleValue
        : null,
      subModel: motorVehicleStore?.subModelCode
        ? motorVehicleStore?.subModelCode
        : null,
      transmission: motorVehicleStore?.transmission
        ? motorVehicleStore?.transmission
        : null,
      typeOfUse: motorVehicleStore?.typeOfUse
        ? motorVehicleStore?.typeOfUse
        : null,

      areaOfUsage: motorVehicleStore?.areaOfUse
        ? motorVehicleStore?.areaOfUse
        : null,
      subline: sublineStore ? sublineStore : null,
    });
    if(motorVehicleStore?.makeCode && !modalOptions){
      await dispatch(
        actions.fetchAllModal(motorVehicleStore?.makeCode, (result) => {
          if (result?.statusCode === -1) {
            setLoader(false);
          } else {
            setLoader(false);
          }
        })
        );
      }
      if(motorVehicleStore?.makeCode && !vehicleTypeOptions){
        await dispatch(
          actions.fetchAllVehicleType(
            motorVehicleStore?.modelCode,
            motorVehicleStore?.makeCode,
            (result) => {
              if (result?.statusCode === -1) {
                setLoader(false);
              } else {
                setLoader(false);
              }
            }
          )
        );
      }
      if(!ModelYearOptions){
        await dispatch(
          actions.fetchAllModelYear(
          motorVehicleStore?.vehicleType,
          motorVehicleStore?.modelCode,
          motorVehicleStore?.makeCode,
          (result) => {
            if (result?.statusCode === -1) {
              setLoader(false);
            } else {
              setLoader(false);
            }
          }
          )
          );
        }
      if(motorVehicleStore?.yearModel && motorVehicleStore?.vehicleType && !SubModelOptions){
        await dispatch(
          actions.fetchAllSubModel(
            motorVehicleStore?.yearModel,
            motorVehicleStore?.vehicleType,
            motorVehicleStore?.modelCode,
            motorVehicleStore?.makeCode,
            (result) => {
              if (result?.statusCode === -1) {
                setLoader(false);
              } else {
                setLoader(false);
              }
            }
          )
        );
      }
      if(!TypeOfUseOptions){
        await dispatch(
          actions.fetchAllTypeOfUse(
            motorVehicleStore?.subModelCode,
            motorVehicleStore?.yearModel,
            motorVehicleStore?.vehicleType,
            motorVehicleStore?.modelCode,
            motorVehicleStore?.makeCode,
            (result) => {
              if (result?.statusCode === -1) {
                setLoader(false);
              } else {
                setLoader(false);
              }
            }
            )
            );
          }
          if(!SublineOptions){

            await dispatch(
              actions.fetchAllSubline(
          motorVehicleStore?.vehicleType,
          motorVehicleStore?.typeOfUse,
          (result) => {
            if (result?.statusCode === -1) {
              setLoader(false);
            } else {
              setLoader(false);
            }
          }
          )
          );
        }
        if(!AreaOfUsageOptions){

          await dispatch(
            actions.fetchAllAreaOfUsage(sublineStore, (result) => {
              if (result?.statusCode === -1) {
                setLoader(false);
          } else {
            setLoader(false);
          }
        })
        );
      }
      if(!motorProductTierOptions || motorProductTierOptions?.length === 0){
        await dispatch(
          actions.fetchAllMotorProductTier(sublineStore, (result) => {
            if (result?.statusCode === -1) {
              setLoader(false);
            } else {
              setLoader(false);
            }
          })
          );
        }
      setSelectedAreaOfUsage(motorVehicleStore?.areaOfUseName || null);
      setSelectedMake(motorVehicleStore?.makeName || null);
      setSelectedModel(motorVehicleStore?.modelName || null);
    setSelectedSubModel(motorVehicleStore?.subModelName || null);
    setSelectedTypeOfUse(motorVehicleStore?.typeOfUseName || null);
    setSelectedVehicleType(motorVehicleStore?.vehicleTypeName || null);

    setProductName(selectProduct?.productTierName || null);
    setSelectedSubline(sublineStoreName ? sublineStoreName : null);

    setProductCode(
      selectProduct?.productTier ? selectProduct?.productTier : productCode
      );

    setActiveButton(productTypeButton);

    form.setFieldsValue({
      make: motorVehicleStore?.makeCode ? motorVehicleStore?.makeCode : null,
      modal: motorVehicleStore?.modelCode ? motorVehicleStore?.modelCode : null,
      vehicletype: motorVehicleStore?.vehicleType
        ? motorVehicleStore?.vehicleType
        : null,
      modelyear: motorVehicleStore?.yearModel
        ? motorVehicleStore?.yearModel
        : null,
      vehicleValue: motorVehicleStore?.vehicleValue
        ? motorVehicleStore?.vehicleValue
        : null,
      submodel: motorVehicleStore?.subModelCode
        ? motorVehicleStore?.subModelCode
        : null,
      // selectedTransmission: motorVehicleStore?.transmission
      //   ? motorVehicleStore?.transmission
      //   : null,
      typeofuse: motorVehicleStore?.typeOfUse
        ? motorVehicleStore?.typeOfUse
        : null,
      subline: sublineStore ? sublineStore : null,
      areaofusage: motorVehicleStore?.areaOfUse
        ? motorVehicleStore?.areaOfUse
        : null,

      productCode: selectProduct?.productTier
        ? selectProduct?.productTier
        : productCode,
    });
    setAutoSetLoader(false)
  }

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
      ? modalApi?.map((MODAL) => {
          const label = MODAL.NOM_MODELO;
          const value = MODAL.COD_MODELO;
          const key = MODAL.COD_MODELO;
          const newModal = { ...MODAL, label, value, key };
          return newModal;
        })
      : null;

  let vehicleTypeOptions =
    vehicleApi && !_.isEmpty(vehicleApi)
      ? vehicleApi?.map((VEHILETYPE) => {
          const label = VEHILETYPE.NOM_TIP_VEHI;
          const value = VEHILETYPE.COD_TIP_VEHI;
          const key = VEHILETYPE.COD_TIP_VEHI;
          const newVehicleType = { ...VEHILETYPE, label, value, key };

          return newVehicleType;
        })
      : null;

  let ModelYearOptions =
    modelyearApi && !_.isEmpty(modelyearApi)
      ? modelyearApi?.map((MODELYEAR) => {
          const label = MODELYEAR.ANIO_SUB_MODELO;
          const value = MODELYEAR.ANIO_SUB_MODELO;
          const key = MODELYEAR.ANIO_SUB_MODELO;
          const newModelYear = { ...MODELYEAR, label, value, key };

          return newModelYear;
        })
      : null;

  let SubModelOptions =
    submodelApi && !_.isEmpty(submodelApi)
      ? submodelApi?.map((SUBMODEL) => {
          const label =
            SUBMODEL.NOM_SUB_MODELO + " - " + SUBMODEL.TIP_CAJA_CAMBIO;
          const value = SUBMODEL.COD_SUB_MODELO;
          const key = SUBMODEL.COD_SUB_MODELO;
          const transmission = SUBMODEL.TIP_CAJA_CAMBIO;
          const newSubModel = { ...SUBMODEL, label, value, key, transmission };

          return newSubModel;
        })
      : null;

  let TypeOfUseOptions =
    typeofuseApi && !_.isEmpty(typeofuseApi)
      ? typeofuseApi?.map((TYPEOFUSE) => {
          const label = TYPEOFUSE.NOM_USO_VEHI;
          const value = TYPEOFUSE.COD_USO_VEHI;
          const key = TYPEOFUSE.COD_USO_VEHI;

          const newTypeOfUse = { ...TYPEOFUSE, label, value, key };

          return newTypeOfUse;
        })
      : null;

  // const VehicleValueOptions = [
  //   {
  //     label: vehicleValueApi?.vehicleValue,
  //     value: vehicleValueApi?.vehicleValue,
  //   },
  // ];

  let SublineOptions =
    sublineApi && !_.isEmpty(sublineApi)
      ? sublineApi?.map((SUBLINE) => {
          const label = SUBLINE.name;
          const value = SUBLINE.subline;
          const key = SUBLINE.subline;
          const newSubline = { ...SUBLINE, label, value, key };

          return newSubline;
        })
      : null;

  let AreaOfUsageOptions =
    areaofusageApi && !_.isEmpty(areaofusageApi)
      ? areaofusageApi?.map((AREAOFUSAGE) => {
          const label = AREAOFUSAGE.NOM_VALOR;
          const value = AREAOFUSAGE.COD_VALOR;
          const key = AREAOFUSAGE.COD_VALOR;
          const newAreaOfUsage = { ...AREAOFUSAGE, label, value, key };

          return newAreaOfUsage;
        })
      : null;
  let motorProductTierOptions = [];
  if (motorProductTierApi !== undefined) {
    motorProductTierOptions =
      motorProductTierApi && !_.isEmpty(motorProductTierApi)
        ? motorProductTierApi?.map((MOTORPRODUCTTIER) => {
            const label = MOTORPRODUCTTIER.NOM_MODALIDAD;
            const value = MOTORPRODUCTTIER.COD_MODALIDAD;
            // const key = city.COD_LOCALIDAD;
            const newMotorProductTier = { ...MOTORPRODUCTTIER, label, value };
            return newMotorProductTier;
          })
        : null;
  }

  // Dropdown onChange Handler
  const productClick = (item) => {
    if (!item.label && !item.value) {
      setProductErr("Product is required");
      setActiveButton(null);
      setProductCode("");
      setProductName("");
    } else {
      setProductErr("");
      setActiveButton(item.value);
      setProductCode(item.value);
      setProductName(item.label);
    }
  };

  const clearallfield = () => {
    setVehicleInfo({
      modal: null,
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      transmission: null,
      typeOfUse: null,
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      modal: null,
      vehicletype: null,
      modelyear: null,
      vehicleValue: null,
      submodel: null,
      transmission: null,
      typeofuse: null,
      subline: null,
      areaofusage: null,
    });
    setLoader(false);

    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));
  };

  const makeSelectHandler = (value, key) => {
    setLoader(true);

    setVehicleInfo({
      modal: null,
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      transmission: null,
      typeOfUse: null,
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      modal: null,
      vehicletype: null,
      modelyear: null,
      vehicleValue: null,
      submodel: null,
      transmission: null,
      typeofuse: null,
      subline: null,
      areaofusage: null,
    });

    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));

    setSelectedMake(key.NOM_MARCA);
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

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const changeHandelerClear = () => {
    // setLoader(true);
  };

  const onchangeVehicleValue = (e) => {
    setVehicleInfo((prevState) => ({
      ...prevState,
      vehicleValue: e.target.value,
    }));
  };

  const modalChangeHandler = (value, key) => {
    setLoader(true);

    setVehicleInfo({
      vehicleType: null,
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      transmission: null,
      typeOfUse: null,
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      vehicletype: null,
      modelyear: null,
      vehicleValue: null,
      submodel: null,
      transmission: null,
      typeofuse: null,
      subline: null,
      areaofusage: null,
    });

    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));

    setSelectedModel(key?.NOM_MODELO);
    //modalMake(key.COD_MODELO);
    setVehicleInfo({ model: value, make: vehicleInfo?.make });
    dispatch(
      actions.fetchAllVehicleType(
        key.COD_MODELO,
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

  const vehicleTypeChangeHandler = (value, key) => {
    setLoader(true);
    setVehicleInfo({
      modelYear: null,
      vehicleValue: null,
      subModel: null,
      transmission: null,
      typeOfUse: null,
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      modelyear: null,
      vehicleValue: null,
      submodel: null,
      transmission: null,
      typeofuse: null,
      subline: null,
      areaofusage: null,
    });

    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));

    setSelectedVehicleType(key.NOM_TIP_VEHI);

    setVehicleInfo({
      vehicleType: value,
      model: vehicleInfo?.model,
      make: vehicleInfo?.make,
    });
    // console.log("vehicleInfoMotor===>", vehicleInfo);
    dispatch(
      actions.fetchAllModelYear(
        key.COD_TIP_VEHI,
        vehicleInfo?.model,
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

  const modelYearChangeHandler = (value, key) => {
    setVehicleInfo({
      vehicleValue: null,
      subModel: null,
      transmission: null,
      typeOfUse: null,
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      vehicleValue: null,
      submodel: null,
      transmission: null,
      typeofuse: null,
      subline: null,
      areaofusage: null,
    });

    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));
    setLoader(true);
    setSelectedModelYear(key.ANIO_SUB_MODELO);
    // setVehicalModelYear(key.ANIO_SUB_MODELO);
    // modalVehical(key.COD_TIP_VEHI);
    setVehicleInfo({
      modelYear: value,
      vehicleType: vehicleInfo?.vehicleType,
      model: vehicleInfo?.model,
      make: vehicleInfo?.make,
    });

    dispatch(
      actions.fetchAllSubModel(
        key.ANIO_SUB_MODELO,
        vehicleInfo?.vehicleType,
        vehicleInfo?.model,
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

  const SubModelChangeHandler = (value, key) => {
    setLoader(true);
    setVehicleInfo({
      vehicleValue: null,
      transmission: null,
      typeOfUse: null,
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      vehicleValue: null,
      transmission: null,
      typeofuse: null,
      subline: null,
      areaofusage: null,
    });

    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));

    // console.log("key==>1", key);
    // setSelectedSubModel(key.NOM_USO_VEHI);
    // setModelYearSubModel(key.NOM_USO_VEHI);
    setSelectedSubModel(key.NOM_SUB_MODELO);
    // setSelectedTransmission(key.transmission);

    // console.log("SubModelChangeHandlervalue", value);
    // console.log("SubModelChangeHandlerkey", key);
    setVehicleInfo({
      subModel: value,
      modelYear: vehicleInfo?.modelYear,
      vehicleType: vehicleInfo?.vehicleType,
      model: vehicleInfo?.model,
      make: vehicleInfo?.make,
      transmission: key.transmission,
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
    dispatch(
      actions.fetchAllVehicleValue(
        vehicleInfo.make,
        vehicleInfo.model,
        key.COD_SUB_MODELO,
        vehicleInfo.modelYear,
        (result) => {
          if (result?.statusCode === -1) {
            if (result?.data?.vehicleValue) {
              setVehicleInfo((prevState) => ({
                ...prevState,
                vehicleValue: result?.data?.vehicleValue,
              }));
              form.setFieldsValue({
                vehicleValue: result?.data?.vehicleValue || null,
              });
            }
            setLoader(false);
          } else {
            setLoader(false);
          }
        }
      )
    );
  };

  const getValues = (value) => {
    // console.log("value", value);
    if (value == "A") {
      return "Automatic";
    } else if (value == "M") {
      return "Manual";
    }
  };
  const TypeOfUseChangeHandler = (value, key) => {
    setLoader(true);
    setVehicleInfo({
      subline: null,
      areaOfUsage: null,
    });
    form.setFieldsValue({
      subline: null,
      areaofusage: null,
    });

    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));

    setSelectedTypeOfUse(key.NOM_USO_VEHI);

    setVehicleInfo({
      typeOfUse: value,
      subModel: vehicleInfo?.subModel,
      modelYear: vehicleInfo?.modelYear,
      vehicleType: vehicleInfo?.vehicleType,
      model: vehicleInfo?.model,
      make: vehicleInfo?.make,
      transmission: vehicleInfo?.transmission,
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
    setVehicleInfo({
      areaOfUsage: null,
    });
    form.setFieldsValue({
      areaofusage: null,
    });
    // setSelectedSubModel(key.NOM_USO_VEHI);
    setSelectedSubline(key.name);

    dispatch(actions.fetchAreaOfUsageSuccess({}));
    // setSelectedsubline(key.COD_TIP_VEHI);
    // setSubline(value);
    // console.log("SublineChangeHandler", value);

    setVehicleInfo({
      subline: value,
      vehicleType: vehicleInfo.vehicleType,
      typeOfUse: vehicleInfo.typeOfUse,
      transmission: vehicleInfo.transmission,
      make: vehicleInfo?.make,
      model: vehicleInfo?.model,
    });

    dispatch(
      actions.fetchAllMotorProductTier(value, (result) => {
        if (result?.statusCode === -1) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
    );
    dispatch(
      actions.fetchAllAreaOfUsage(value, (result) => {
        if (result?.statusCode === -1) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
    );
  };

  const AreaOfUsageChangeHandler = (value, key) => {
    setSelectedAreaOfUsage(key.NOM_VALOR);

    setVehicleInfo({
      areaofusage: value,
      subModel: vehicleInfo.subModel,
      modelYear: vehicleInfo.modelYear,
      vehicleType: vehicleInfo.vehicleType,
      model: vehicleInfo.model,
      make: vehicleInfo.make,
      transmission: vehicleInfo.transmission,
    });
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/motor-info");

    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));
  };

  // const onchangetoNext = () => {

  //   // history.push("/policy-group-info");
  // };

  return (
    <>
      <FullPageLoader spinloader={loader} />
      <FullPageLoader spinloader={autoSetLoader} />
      <div className="main-class">
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
                Back to Dashboard{" "}
              </Button>
            </div>
            {/* <div className="mobile--data">
              <h2>Let's get started with some important details.</h2> */}
            <StepOne />
            {/* </div> */}
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
              onFinish={getMotorInfo}
              onFinishFailed={failedSubmit}
              form={form}
              fields={[
                {
                  name: ["selectedTransmission"],
                  value: getValues(vehicleInfo?.transmission),
                },
                // {
                //   name: ["vehicleValue"],
                //   value: vehicleInfo?.vehicleValue
                //     ? vehicleInfo?.vehicleValue
                //     : vehicleValueApi?.vehicleValue,
                // },
              ]}
            >
              <div className="right-side">
                <div className="policy-type">
                  <h2>Let’s get started with some important details.</h2>
                </div>
                <div className="main-class1">
                  <div className="info-head">
                    <h3>Vehicle Information</h3>
                  </div>
                  <div>
                    <Row gutter={16} className="row-bottom-margin">
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
                            onSearch={onSearch}
                            size="large"
                            onSelect={(item, key) => {
                              makeSelectHandler(item, key);
                            }}
                            value={vehicleInfo?.make}
                            placeholder="Select Make"
                            onChange={changeHandelerClear}
                            options={makeOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Model"
                          name="modal"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Model",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={vehicleInfo?.model}
                            placeholder="Select Model"
                            onChange={(item, key) => {
                              modalChangeHandler(item, key);
                            }}
                            options={modalOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Vehicle Type"
                          name="vehicletype"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Vehicle Type",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={vehicleInfo?.vehicleType}
                            placeholder="Select Vehicle Type"
                            onChange={(item, key) => {
                              vehicleTypeChangeHandler(item, key);
                            }}
                            options={vehicleTypeOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Model Year"
                          name="modelyear"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Model Year",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={vehicleInfo?.modelYear}
                            placeholder="Select Model Year"
                            onChange={(item, key) => {
                              modelYearChangeHandler(item, key);
                            }}
                            options={ModelYearOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Sub Model"
                          name="submodel"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Sub Model",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={vehicleInfo?.subModel}
                            placeholder="Select Sub Model"
                            onChange={(item, key) => {
                              SubModelChangeHandler(item, key);
                            }}
                            options={SubModelOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          name="selectedTransmission"
                          label="Transmission"
                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Please Select Transmission",
                          //   },
                          // ]}
                        >
                          <Select
                            size="large"
                            placeholder="Transmission"
                            value={vehicleInfo?.transmission}
                            defaultValue={vehicleInfo?.transmission}
                            disabled
                            // autoComplete="on"
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="vehicleValue"
                          label="Vehicle Value"

                          // rules={[
                          //   {
                          //     required: true,
                          //     message: "Enter Vehicle Value",
                          //   },
                          // ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="30"
                            placeholder="Vehicle Value"
                            value={vehicleInfo?.vehicleValue}
                            // defaultValue={vehicleValueApi?.vehicleValue}
                            // onChange={(item) => onChangePlateNumber(item)}
                            // onInput={toInputUppercase}
                            autoComplete="off"
                            onChange={onchangeVehicleValue}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Type of Use"
                          name="typeofuse"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Type of Use",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={vehicleInfo?.typeOfUse}
                            placeholder="Select Type of Use"
                            onChange={(item, key) => {
                              TypeOfUseChangeHandler(item, key);
                            }}
                            options={TypeOfUseOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Subline"
                          name="subline"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Subline",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            value={vehicleInfo?.subline}
                            placeholder="Subline"
                            onChange={(item, key) => {
                              SublineChangeHandler(item, key);
                            }}
                            options={SublineOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>

                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          label="Area of Usage"
                          name="areaofusage"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Area of Usage",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            onSearch={onSearch}
                            style={{ width: "100%" }}
                            size="large"
                            placeholder="Area of Usage"
                            onChange={(item, key) => {
                              AreaOfUsageChangeHandler(item, key);
                            }}
                            options={AreaOfUsageOptions}
                            filterOption={filterOption}
                            optionFilterProp="children"
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>

                  <div className="mobile-desktop">
                    <div className="info-head">
                      <h3><span style={{color: 'red'}}>*</span> Product</h3>
                    </div>
                    <Row gutter={16} className="row-bottom-margin">
                      {motorProductTierOptions?.length === 0 ? (
                        <>
                          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <NoDataCard />
                          </Col>
                        </>
                      ) : (
                        <>
                          {motorProductTierOptions &&
                            motorProductTierOptions?.map((button, index) => (
                              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                <Button
                                  className={
                                    button.value === activeButton
                                      ? "activeforMotorButtonPrice"
                                      : "forMotorButtonPrice"
                                  }
                                  key={index}
                                  type={button.type}
                                  onClick={() => {
                                    productClick(button);
                                  }}
                                >
                                  {button.label}
                                </Button>
                              </Col>
                            ))}
                        </>
                      )}

                      {/* <Col xs={24} sm={24} md={12} lg={12} xl={12}> */}
                      {/* {motorProductTierOptions &&
                          motorProductTierOptions.map((button, index) => {
                            return (
                              <>
                                {button.value == "10023" && (
                                  <Button
                                    className="btn_Product"
                                    key={index}
                                    type={button.type}
                                    onClick={button.onClick}
                                  >
                                    {button.label}
                                  </Button>
                                )}
                              </>
                            );
                          })} */}
                      {/* </Col> */}
                    </Row>
                    {productErr && (
                          <div className="error-message" style={{ color: 'red' }}>{productErr}</div>
                        )}
                  </div>

                  <div className="next-button-header">
                    <Button className="prev-button" onClick={onchangetoBack}>
                      Back
                    </Button>

                    <Button
                      className="next-button"
                      htmlType="submit"
                      // onClick={onchangetoNext}
                    >
                      Next
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <div style={{marginTop:"30px"}}>
      <MotorFormFooter />
      </div>
    </>
  );
};

export default PriceCheck;
