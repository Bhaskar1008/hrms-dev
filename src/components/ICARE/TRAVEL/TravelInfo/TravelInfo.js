
import React, { useEffect, useState } from "react";
import "./TravelInfo.css";
import { useHistory } from "react-router-dom";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import img3 from "../../../../images/button images/image 41.png";
import img4 from "../../../../images/button images/image 42.png";
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
  message,
  Spin,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../axios-request/request.methods";

import { setTravelInfo } from "../../../../store/actions/travel";
import StepTravelOne from "../StepBarTravel/StepTravelOne/StepTravelOne";
import {
  getAgeRangeApi,
  getCoverageTypeApi,
} from "../../../../services/travel";
import TravelFooter from "../TravelFooter/TravelFooter";
import moment, { isMoment } from "moment";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function TravelInfo() {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [policyTypeD2, setPolicyTypeD2] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [travelForm, setTravelForm] = useState({
    destination: "",
    country: [],
    package: { label: "", value: "" },
    startDate: null,
    endDate: null,
    tripDuration: null,
    product: { label: "", value: "" },
    sumInsured: null,
    currency: null,
    oneTrip: false,
    covidCovered: "false",
    sportsParticipation: "false",
    sportEquipment: "false",
    cruise: "false",
    typeOfCoverage: "",
    ageOfEldest: null,
  });
  const [isSportsEquipment, setIsSportsEquipment] = useState(false);
  const [isHazardousSports, setIsHazardousSports] = useState(false);
  const [sumInsured, setSumInsured] = useState([]);
  const [sumInsuredVal, setSumInsuredVal] = useState(null);
  const [internationalPersist, setInternationalPersist] = useState({
    country: [],
    package: { label: "", value: "" },
  });

  const [domesticPackage, setDomesticPackage] = useState(null);
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [currencyPersist, setCurrencyPersist] = useState({ D: null, I: null });

  const [travelList, setTravelList] = useState([]);
  // console.log("travel",travelList)
  const [countryList, setCountryList] = useState(null);
  const [coverageList, setCoverageList] = useState({ D: [], I: [] });
  const [numberOfTravelerList, setNumberOfTravelerList] = useState([]);
  const [currencyList, setCurrencyList] = useState({ D: [], I: [] });
  const [ageRangeList, setAgeRangeList] = useState([]);
  const [destinationErrMsg, setDestinationErrMsg] = useState("");
  const [currencyErrMsg, setCurrencyErrMsg] = useState("");
  const [productErr, setProductErr] = useState("");
  const [oneTripErr, setOneTripErr] = useState("");
  const [sumInsuredErr, setSumInsuredErr] = useState("");
  const dispatch = useDispatch();
  const tripInfo = useSelector((state) => state?.trip?.tripInfo);
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const PolicyOptionType2 = [
    { label: "Individual", value: "Individual" },
    { label: "Group", value: "Group" },
  ];
  const PolicyOptionOnchange = (e) => {
    console.log("EEE---------->",e)
    setTravelFormVal("typeOfCoverage", e);
  };
  const setOneWayTrip = (e) => {
    setTravelFormVal("oneTrip", e.target.value);
  };
  const getDocumentId = async () => {
    const data = await axiosRequest.get("user/getDocumentId");
    if (data.statusCode === -1) {
      return data?.data?.documentId;
    }
  };
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const onClickBack = () => {
    history.push("/quote-code");
    // history.goBack();
  };

  const checkValidation = () => {
    let hasError = false;
    if (travelForm?.country?.length > 0) {
      setDestinationErrMsg("");
    } else {
      setDestinationErrMsg("Destination is required.");
      hasError = true;
    }
    if (travelForm?.currency?.length > 0) {
      setCurrencyErrMsg("");
    } else {
      setCurrencyErrMsg("Currency is required");
      hasError = true;
    }
    if (sumInsuredVal) {
      setSumInsuredErr("");
    } else {
      setSumInsuredErr("Please select Sum Insured");
      hasError = true;
    }
    if (travelForm?.product?.label) {
      setProductErr("");
    } else {
      setProductErr("Product is required");
      hasError = true;
    }
    if (travelForm.oneTrip == null) {
      setOneTripErr("Please select a trip");
      hasError = true;
    } else {
      setOneTripErr("");
    }
    return hasError;
  };

  const onFailed = (err) => {
    const hasError = checkValidation();
    if (hasError) {
      return;
    }
  };

  const onClickNext = async () => {
    
    const hasError = checkValidation();
    if (hasError) {
      return;
    }
    const documentId = await getDocumentId();
    let currencyName = null;
    const index = currencyList[travelForm?.destination]?.findIndex(
      (e) => travelForm?.currency === e.value
    );
    let selectedCountryList = countryList[travelForm?.destination]?.filter((e) =>
      travelForm?.country?.includes(e.NOM_PAIS)
    );
    selectedCountryList = selectedCountryList.map((item) => item?.NOM_PAIS);
    const selectedMaxAge = ageRangeList?.filter(
      (item) => item.value == travelForm?.ageOfEldest
    )[0];
    if (index !== -1)
      currencyName = currencyList[travelForm?.destination][index]?.label;
    setShowScreenLoader(true);
    const data = await getProductCode(
      travelForm?.package?.label,
      travelForm?.currency,
      travelForm?.product?.label,
      sumInsuredVal
    );
    let startDate = null;
    let endDate = null;
    if (travelForm?.startDate && travelForm?.endDate) {
      startDate =
        typeof travelForm.startDate == "string"
          ? travelForm.startDate
          : moment(travelForm?.startDate).format("MM/DD/YYYY");
      endDate =
        typeof travelForm.endDate == "string"
          ? travelForm.endDate
          : moment(travelForm?.endDate).format("MM/DD/YYYY");
    }

    console.log("Datatatatatattatatat=====>>",travelForm)

    const formData = {
      travelProduct: travelForm?.product?.value,
      travelProductName: travelForm?.product?.label,
      currency: travelForm?.currency,
      currencyName: currencyName,
      countries: countryList[travelForm?.destination].filter((e) =>
        travelForm?.country?.includes(e.NOM_PAIS)
      ),
      travelPack: travelForm?.package?.value,
      travelPackName: travelForm?.package?.label,
      travelType: travelForm?.destination,
      travelTypeName: travelList?.filter(
        (e) => e.code === travelForm?.destination
      ),
      withCruise: travelForm?.destination == "D" ? "false" : travelForm?.cruise,
      withCovidCover: travelForm?.covidCovered,
      sportsEquipment: isSportsEquipment ? travelForm?.sportEquipment : "false",
      hazardousSports: isHazardousSports ? travelForm?.sportsParticipation : "false",
      coverageOption: travelForm?.product?.value,
      coverageOptionName: travelForm?.product?.label,
      // coverageOptionName: numberOfTravelerList.filter(
      //   (e) => e.value === travelForm.typeOfCoverage
      //   ),
      coverageType: travelForm?.typeOfCoverage,
      expensesCoverage: sumInsuredVal,
      effectivityDate: startDate,
      expirationDate: endDate,
      tripDuration: travelForm?.tripDuration,
      oneTrip: travelForm?.oneTrip,
      agerange:travelForm?.ageOfEldest,
      ageOfEldest: selectedMaxAge?.payloadData,
      productCode: data,
      documentId,
      itenerary: `PHILIPPINES-${selectedCountryList.join("-")}-PHILIPPINES`,
    };
    setShowScreenLoader(false);
    dispatch(setTravelInfo(formData));
    history.push("/travel-policygroup");
  };

  const getTravelList = async () => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get("user/getTravelList");
    if (res.statusCode === -1) {
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setTravelList(res.data.data);
      } else {
        message.error(res?.data.data.message ?? "Something went Wrong");
      }
    }
    setShowScreenLoader(false);
  };

  const setTravelFormVal = (name, value) => {
    setTravelForm((prev) => {
      return { ...prev, [name]: value };
    });
    if (name == "currency" && !value) {
      setCurrencyErrMsg("Currency is required");
    } else {
      setCurrencyErrMsg("");
    }
    if (name == "product" && !value.label && !value.value) {
      setProductErr("Product is required");
    } else {
      setProductErr("");
    }
  };

  useEffect(() => {
    if (tripInfo) {
      prepopulateData(tripInfo);
    }
  }, []);

  console.log(travelForm.ageOfEldest,"<<<<<<<<<<<<<<<<<<<,")

  const prepopulateData = async (data) => {
    if (tripInfo) {
      handleDestinationChange(data?.travelType);
      console.log("Inside Trip Infor",data)
      
      setSumInsuredVal(data?.expensesCoverage)
      getCurrencyFn(data?.travelType, data?.travelPack);
      if (data?.travelPack) {
        const data2 = await getCoverageOptions(data?.travelPack?.toLowerCase());
        if (data?.travelPack !== "W") {
          setCoverageList((prev) => {
            prev.D = data2;
            return { ...prev };
          });
        } else {
          setCoverageList((prev) => {
            prev.I = data2;
            return { ...prev };
          });
        }
        const selectedCoverage = data2?.filter(
          (item) => item.COVERAGE_OPTIONS === data?.coverageOption
        )[0];
        setTravelFormVal("product", {
          label: selectedCoverage?.NOM_VALOR,
          value: selectedCoverage?.COVERAGE_OPTIONS,
        });
      }
      setTravelFormVal("oneTrip", data?.oneTrip);
      setTravelForm((prev) => {
        return {
          ...prev,
          startDate: moment(data?.effectivityDate, "MM/DD/YYYY"),
          endDate: moment(data?.expirationDate, "MM/DD/YYYY"),
          tripDuration: data?.tripDuration,
        };
      });
      form.setFieldsValue({
        startDate: moment(data?.effectivityDate, "MM/DD/YYYY"),
        endDate: moment(data?.expirationDate, "MM/DD/YYYY"),
      });
      setTravelFormVal("covidCovered", data?.withCovidCover);
      if (data?.hazardousSports == "false" || data?.hazardousSports == "") {
        setIsHazardousSports(false);
      } else {
        setIsHazardousSports(true);
      }
      if (data?.sportsEquipment == "false" || data?.sportsEquipment == "") {
        setIsSportsEquipment(false);
      } else {
        setIsSportsEquipment(true);
      }
      setTravelFormVal("sportEquipment", data?.sportsEquipment);
      setTravelFormVal("sportsParticipation", data?.hazardousSports);
      setTravelFormVal("typeOfCoverage", data?.coverageType);
      setTravelFormVal("cruise", data?.withCruise);
      if (data?.travelType && data?.travelPack && ageRangeList.length === 0) {
        setShowScreenLoader(true);
        const resp = await getAgeRangeApi(data?.travelType, data?.travelPack);
        setShowScreenLoader(false);
        let ageRange = [];
        if (resp) {
          ageRange = resp.map((e) => ({
            label: `${e.min}-${e.max}`,
            value: `${e.min}-${e.max}`,
            payloadData: { min: e.min, max: e.max },
          }));
          setAgeRangeList(ageRange);
          
        }
        console.log("SELECAGE RANGE---====>>>",ageRange,data?.ageOfEldest)
        const selectedMaxAge = ageRange?.filter(
          (item) => item.payloadData.max == data?.ageOfEldest
        )[0];
        console.log("selectedMaxAge=====", selectedMaxAge);
        setTravelFormVal("ageOfEldest", data?.agerange ? data?.agerange : selectedMaxAge?.value);


        form.setFieldsValue({
          sportsParticipation: data?.hazardousSports,
          sportEquipment: data?.sportsEquipment,
          typeOfCoverage: data?.coverageType,
          ageOfEldest: selectedMaxAge?.value,
        });
      }


      if (data?.travelType == "I") {
        const countryList = data?.countries?.map((item) => item.NOM_PAIS);
        setTravelForm((prev) => {
          return {
            ...prev,
            country: countryList,
            package: { label: data?.travelPackName, value: data?.travelPack },
            currency: data?.currency,
          };
        });
        form.setFieldsValue({
          country: countryList,
          currency: data?.currency,
        });
      }
      if (data?.currency && data?.travelPack) {
        setShowScreenLoader(true)
        const res = await axiosRequest.get(
          `user/lov?name=sumAssured&DestinationCodeNumber=${data?.currency}&TravelPack=${data?.travelPack}`
        );
        if (res.statusCode === -1) {
          setShowScreenLoader(false)
          if (res?.data?.lov && Array.isArray(res?.data?.lov)) {
            const options = res.data.lov.map((e) => {
              return { label: e.VAL_CAMPO2, value: e.VAL_CAMPO1 };
            });
            setSumInsured(options);
            console.log("data?.expensesCoverage.", data?.expensesCoverage);
            setSumInsuredVal(data?.expensesCoverage);
          }
        }else{
          setShowScreenLoader(false)
        }
      
      }
    }
  };

  const getCountryList = async (val) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(`user/destination?travelType=${val}`);
    if (res.statusCode === -1) {
      if (
        res?.data?.data &&
        Array.isArray(res.data.data) &&
        res.data.data.length > 0
      ) {
        if (val === "D") {
          setTravelFormVal("country", [res.data.data[0].NOM_PAIS]);
          let string = res.data.data[0].COD_VERNACULO.toLowerCase();
          const data = await getPackageApi(string, val);
          const data2 = await getCoverageOptions(
            data.packageCode.toLowerCase()
          );
          setCoverageList((prev) => {
            prev.D = data2;
            return { ...prev };
          });
          setDomesticPackage({
            label: data.packageName,
            value: data.packageCode,
          });
          setTravelFormVal("package", {
            label: data.packageName,
            value: data.packageCode,
          });
          setTravelFormVal("product", {
            label: data2[0]?.NOM_VALOR,
            value: data2[0]?.COVERAGE_OPTIONS,
          });
        } else {
          setTravelFormVal("country", internationalPersist.country);
          setTravelFormVal("package", internationalPersist.package);
        }
        setCountryList((prev) => {
          if (prev) {
            return { ...prev, [val]: res.data.data };
          } else {
            return { [val]: res.data.data };
          }
        });
        setTravelFormVal("destination", val);
      } else {
        message.error(res?.data.data.message ?? "Something went Wrong");
      }
    }
    setShowScreenLoader(false);
  };

  const handleDestinationChange = async (val) => {
    console.log("im handle desigantion====>>>",val,selectedDestination)
    if (selectedDestination !== val) {
      setDestinationErrMsg("");
      setCurrencyErrMsg("");
      setSumInsuredErr("");
      setProductErr("");

      setSelectedDestination(val);
      form.resetFields();
      setCountryList(null);
      setCoverageList((prev) => {
        prev.I = [];
        return { ...prev };
      });
      setTravelFormVal("country", []);
      setInternationalPersist({
        country: [],
        package: {
          label: "",
          value: "",
        },
      });
      setTravelFormVal("currency", null);
      setTravelFormVal("tripDuration", null);
      // setTravelFormVal("oneTrip", null);
      setTravelFormVal("covidCovered", "false");
      setTravelFormVal("sportsParticipation", "false");
      setTravelFormVal("sportEquipment", "false");
      setTravelFormVal("cruise", "false");
      setSumInsuredVal(null);
      setSumInsured(null);

      setTravelFormVal("package", {
        label: "",
        value: "",
      });
      setTravelFormVal("product", {
        label: "",
        value: "",
      });
      setIsHazardousSports(false);
      setIsSportsEquipment(false);

      // if (countryList && countryList[val] && countryList[val].length > 0) {
      //   if (val === "D") {
      //     setTravelFormVal("country", [countryList[val][0].NOM_PAIS]);
      //     setTravelFormVal("package", {
      //       label: domesticPackage.label,
      //       value: domesticPackage.value,
      //     });
      //     setTravelFormVal("currency", currencyPersist[val]);
      //   } else {
      //     setTravelFormVal("package", internationalPersist.package);
      //     setTravelFormVal("country", internationalPersist.country);
      //     setTravelFormVal("currency", currencyPersist[val]);
      //   }
      //   setTravelFormVal("destination", val);
      // } else {
      getCountryList(val);
      // }
      // setSumInsuredVal(null);
    }
  };

  const getCoverageOptions = async (val) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(
      `user/coverageOptions?options=${val.toUpperCase()}`
    );
    if (res.statusCode === -1) {
      if (res?.data?.data && Array.isArray(res?.data?.data)) {
        return res.data.data;
      }
    }
    setShowScreenLoader(false);
  };

  const getPackageApi = async (val, _destination) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(`user/travelPackage?packages=${val}`);
    if (res.statusCode === -1) {
      if (res?.data?.data) {
        getCurrencyFn(_destination, res.data.data.packageCode);
        return res.data.data;
      }
    }
    setShowScreenLoader(false);
  };

  const getCurrencyFn = async (_dest, _package) => {
    setShowScreenLoader(true);
    const res = await axiosRequest.get(
      `user/lov?name=Currency&Destination=${_dest}&travelPack_Currency=${_package}`
    );
    if (res.statusCode === -1) {
      if (res?.data?.lov && Array.isArray(res?.data?.lov)) {
        setCurrencyList((prev) => {
          prev[_dest] = res.data.lov.map((e) => ({
            label: e.COD_MON_ISO,
            value: e.COD_MON,
          }));
          return { ...prev };
        });

        setTravelFormVal("currency", res.data.lov[0].COD_MON);
        setCurrencyPersist((prev) => {
          prev[_dest] = res.data.lov[0].COD_MON;
          return { ...prev };
        });
        getSumInsuredFn(res.data.lov[0].COD_MON, _package.toUpperCase());
      }
    }
    setShowScreenLoader(false);
  };

  const getSumInsuredFn = async (_currency, _package) => {
    // setSumInsuredVal(null);
    setShowScreenLoader(true);
    if (_currency && _package) {
      const res = await axiosRequest.get(
        `user/lov?name=sumAssured&DestinationCodeNumber=${_currency.toUpperCase()}&TravelPack=${_package.toUpperCase()}`
      );
      if (res.statusCode === -1) {
        if (res?.data?.lov && Array.isArray(res?.data?.lov)) {
          const options = res.data.lov.map((e) => {
            return { label: e.VAL_CAMPO2, value: e.VAL_CAMPO1 };
          });
          setSumInsured(options);
        }
      }
    }
    setShowScreenLoader(false);
  };

  const countryOnChangeHandler = async (val) => {
    form.resetFields(["ageOfEldest"]);
    setTravelFormVal("ageOfEldest", "");
    if (val.length === 0) {
      setCoverageList((prev) => {
        prev.I = [];
        return { ...prev };
      });
      setTravelFormVal("country", []);
      setInternationalPersist({
        country: [],
        package: {
          label: "",
          value: "",
        },
      });
      setTravelFormVal("package", {
        label: "",
        value: "",
      });
    } else {
      let string = "";
      for (let country of countryList[travelForm.destination]) {
        if (val.includes(country.NOM_PAIS)) {
          string = string.concat(`${country.COD_VERNACULO.toLowerCase()},`);
        }
      }
      string = string.slice(0, string.length - 1);
      const data = await getPackageApi(string, travelForm.destination);
      const data2 = await getCoverageOptions(data.packageCode.toLowerCase());
      setCoverageList((prev) => {
        prev.I = data2;
        return { ...prev };
      });
      setTravelFormVal("country", val);
      setInternationalPersist({
        country: val,
        package: {
          label: data.packageName,
          value: data.packageCode,
        },
      });
      setTravelFormVal("package", {
        label: data.packageName,
        value: data.packageCode,
      });
    }
    if (val?.length > 0) {
      setDestinationErrMsg("");
    } else {
      setDestinationErrMsg("Destination is required.");
    }
  };

  const datePickerHandler = (date, string, name) => {
    const arr = string.split("-");
    const newDateFormat = `${arr[1]}/${arr[2]}/${arr[0]}`;
    setTravelFormVal(name, newDateFormat);
  };

  const getTripDuration = async () => {
    let startDate = null;
    let endDate = null;
    if (travelForm.startDate && travelForm.endDate) {
      startDate =
        typeof travelForm.startDate == "string"
          ? travelForm.startDate
          : moment(travelForm?.startDate).format("MM/DD/YYYY");
      endDate =
        typeof travelForm.endDate == "string"
          ? travelForm.endDate
          : moment(travelForm?.endDate).format("MM/DD/YYYY");
    }
    if (startDate && endDate) {
      setShowScreenLoader(true);
      const res = await axiosRequest.get(
        `user/tripDuration?departureDate=${startDate}&arrivalDate=${endDate}`
      );
      setShowScreenLoader(false);
      if (res.statusCode === -1) {
        if (res?.data?.data) {
          setTravelFormVal("tripDuration", res?.data?.data?.tripDuration);
          if (
            selectedDestination == "I" &&
            res?.data?.data?.tripDuration <= 180
          ) {
            setTravelFormVal("oneTrip", true);
          } else if (
            selectedDestination == "D" &&
            res?.data?.data?.tripDuration <= 90
          ) {
            setTravelFormVal("oneTrip", true);
          } else {
            setTravelFormVal("oneTrip", false);
          }
        }
      }
    }
  };

  const settravelfrom =(val)=>{
    console.log("Data======>>>",val)
    setTravelFormVal("ageOfEldest", val)
  }

  const getOneDayTrip = async () => {
    setShowScreenLoader(true);
    if (travelForm.startDate && travelForm.endDate) {
      const res = await axiosRequest.get(
        `user/oneTrip?departureDate=${travelForm.startDate}&arrivalDate=${travelForm.endDate}&currency=${travelForm.currency}`
      );
      if (res.statusCode === -1) {
        if (res?.data?.data) {
          // setTravelFormVal("oneTrip", res.data.data.oneTripOnly);
        }
      }
    }
    setShowScreenLoader(false);
  };

  const getCurrencyLabelByValue = () => {
    const index = currencyList[travelForm.destination].findIndex(
      (e) => travelForm.currency === e.value
    );
    if (index !== -1) return currencyList[travelForm.destination][index].label;
    return "Select currency";
  };

  const setCoverageTypeFn = async () => {
    const data = await getCoverageTypeApi();
    if (data) {
      setNumberOfTravelerList(
        data.map((e) => ({ label: e.text, value: e.value }))
      );
    }
  };

  const setAgeList = async () => {
    setShowScreenLoader(true);
    if (travelForm.destination && travelForm.package.value) {
      const data = await getAgeRangeApi(
        travelForm.destination,
        travelForm.package.value
      );
      if (data) {
        setAgeRangeList(
          data.map((e) => ({
            label: `${e.min}-${e.max}`,
            value: `${e.min}-${e.max}`,
            payloadData:  e.max,
            minvalue:e.min,
          }))
        );
      }
    }
    setShowScreenLoader(false);
  };

  const disabledDate = (current) => {
    // Disable dates before today
    return current && current < moment().startOf("day");
  };

  const disabledDateBeforeSpecificDate = (current) => {
    // Replace '08/28/2023' with your specific date in YYYY-MM-DD format
    if (travelForm.startDate) {
      return current && current < moment(travelForm.startDate, "MM/DD/YYYY");
    } else {
      return current && current < moment().startOf("day");
    }
  };

  const disabledDateAfterSpecificDate = (current) => {
    if (travelForm.endDate) {
      return (
        current &&
        (current > moment(travelForm.endDate, "MM/DD/YYYY").add(1, "days") ||
          current < moment().startOf("day"))
      );
    } else {
      return current && current < moment().startOf("day");
    }
  };

   const  setdatainsumassured = (val) =>{

      setSumInsuredVal(val);
      if (val) {
        setSumInsuredErr("");
      } else {
        setSumInsuredErr("Please select Insured");
      }

      console.log("Value when data chnage",val)
  }

  const getProductCode = async (
    packageName,
    currencyCode,
    coverageOption,
    sumAssured
  ) => {
    const data = await axiosRequest.get(
      `user/travel/productCode?packageName=${packageName}&currencyCode=${currencyCode}&coverageOption=${coverageOption}&sumAssurd=${sumAssured}`
    );
    if (data.statusCode === -1) {
      return data?.data?.data?.productCode;
    } else {
      return null;
    }
  };

  useEffect(() => {
    getTripDuration();
    getOneDayTrip();
    
  }, [travelForm.startDate, travelForm.endDate]);

  useEffect(() => {
    if (ageRangeList.length === 0) {
      setAgeList();
    }
  }, [travelForm.typeOfCoverage]);

  useEffect(() => {
    getTravelList();
    setCoverageTypeFn();
    // setSumInsuredVal("sumInsured", travelForm.sumInsured);
  }, []);

  return (
    <>
      <div className="rsmain-class">
        <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div className="leftsides ">
              <Button onClick={onChangetoDashboard} className="dashbtn">
                <ArrowLeftOutlined />
                Back to dashboard
              </Button>
              <StepTravelOne />
            </div>
          </Col>

          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="rsrightsides">
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                
                onFinish={onClickNext}
                onFinishFailed={onFailed}
                form={form}

                fields={[
                  {
                    name: ["sumInsuredVal"],
                    value: sumInsuredVal,
                  },
                ]}
              >
                <div className="headers">
                  Let's get started with some important details.
                </div>
                <div className="travelinfo">Travel Information</div>
                <div className="rsDestinationDiv">
                  <div className="destination">Select Destination </div>
                  <div className="destination-btnContainer">
                    <Row gutter={16}>
                      {travelList.map((item, i) => {
                        return (
                          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            {" "}
                            <Button
                              onClick={() => handleDestinationChange(item.code)}
                              className={`destination-btn ${
                                travelForm.destination === item.code
                                  ? "destination-btn-active"
                                  : ""
                              }`}
                              style={{ margin: "8px" }}
                            >
                              {/* {" "} */}
                              {item.text === "DOMESTIC" ? (
                                <img src={img3} alt="img" />
                              ) : null}
                              {item.text === "INTERNATIONAL" ? (
                                <img src={img4} alt="img4" />
                              ) : null}
                              {item.text}
                            </Button>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="country"
                      // label="Destination"
                      label={
                        <>
                          <span className="mandatory-icon">*</span>
                          Destination
                        </>
                      }
                      // rules={[
                      //   {
                      //     required: !travelForm.country,
                      //     message: "Please fill this filed",
                      //   },
                      // ]}

                      style={{ marginBottom: "1rem" }}
                    >
                      <span style={{ display: "none" }}>
                        {travelForm.country}
                      </span>
                      {travelForm.destination === "D" ? (
                        <Select
                          key={"select-disabled"}
                          showSearch
                          size="large"
                          // style={{ width: "100%" }}
                          value={travelForm.country}
                          options={
                            countryList && countryList[travelForm.destination]
                              ? countryList[travelForm.destination].map((e) => {
                                  return {
                                    label: e.NOM_PAIS,
                                    value: e.NOM_PAIS,
                                  };
                                })
                              : []
                          }
                          placeholder="Country"

                          // disabled
                        />
                      ) : (
                        <Select
                          key={"selet-not-disabled"}
                          showSearch
                          size="large"
                          mode="multiple"
                          style={{ width: "100%" }}
                          options={
                            countryList && countryList[travelForm.destination]
                              ? countryList[travelForm.destination].map((e) => {
                                  return {
                                    label: e.NOM_PAIS,
                                    value: e.NOM_PAIS,
                                  };
                                })
                              : []
                          }
                          value={travelForm.country}
                          placeholder={"Country"}
                          onChange={countryOnChangeHandler}
                        />
                      )}
                      {destinationErrMsg && (
                        <div className="error-message" style={{ color: "red" }}>
                          {destinationErrMsg}
                        </div>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="Travel package"
                      label={
                        <span>
                          <span className="RsSpan">*</span>{" "}
                          <span className="RsList">Travel package</span>
                        </span>
                      }
                      rules={[
                        {
                          required: false,
                          message: "Please fill this filed",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        showSearch
                        size="large"
                        // style={{ width: "100%" }}
                        optionFilterProp="children"
                        placeholder={
                          travelForm.package?.label
                            ? travelForm.package?.label
                            : "Select"
                        }
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        disabled
                      ></Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="Currency"
                      // label=""
                      label={
                        <>
                          {<span className="mandatory-icon">*</span>}
                          Currency
                        </>
                      }
                      // rules={[
                      //   {
                      //     required: !travelForm.currency,
                      //     message: "Please fill this filed",
                      //   },
                      // ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <span style={{ display: "none" }}>
                        {travelForm.currency}
                      </span>
                      <Select
                        showSearch
                        size="large"
                        //   className="inputbox"
                        // bordered={false}

                        // style={{ width: "100%" }}
                        placeholder={
                          currencyList[travelForm.destination] &&
                          currencyList[travelForm.destination].length < 2
                            ? getCurrencyLabelByValue()
                            : "Select currency"
                        }
                        value={travelForm.currency}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        options={currencyList[travelForm.destination] ?? []}
                        onChange={(val) => {
                          setTravelFormVal("currency", val);
                          getSumInsuredFn(
                            val,
                            travelForm.package.value.toUpperCase()
                          );
                        }}
                        disabled={
                          currencyList[travelForm.destination] &&
                          currencyList[travelForm.destination].length < 2
                        }
                      ></Select>
                      {currencyErrMsg && (
                        <div className="error-message" style={{ color: "red" }}>
                          {currencyErrMsg}
                        </div>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                {coverageList[travelForm.destination] &&
                  coverageList[travelForm.destination].length > 0 && (
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la formFill"
                        name="Product"
                        // label="Product"
                        label={
                          <>
                            {<span className="mandatory-icon">*</span>}
                            Product
                          </>
                        }
                        // rules={[
                        //   {
                        //     required:!travelForm.product.value,
                        //     message: "Please select this filed",
                        //   },
                        // ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Row gutter={16}>
                          <div className="btn_parent">
                            {coverageList[travelForm.destination] &&
                              coverageList[travelForm.destination].length > 0 &&
                              coverageList[travelForm.destination].map((e) => {
                                return (
                                  <div>
                                    <Col
                                      xs={24}
                                      sm={24}
                                      md={12}
                                      lg={12}
                                      xl={12}
                                    >
                                      <Button
                                        style={{
                                          border:
                                            travelForm.product.value ===
                                            e.COVERAGE_OPTIONS
                                              ? "2px solid #1D428A"
                                              : "",
                                        }}
                                        onClick={() =>
                                          setTravelFormVal("product", {
                                            label: e.NOM_VALOR,
                                            value: e.COVERAGE_OPTIONS,
                                          })
                                        }
                                        className="travelloption"
                                      >
                                        {e.NOM_VALOR}
                                      </Button>
                                    </Col>
                                  </div>
                                );
                              })}
                          </div>
                        </Row>
                        {productErr && (
                          <div
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            {productErr}
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  )}
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="sumInsuredVal"
                      // label="Sum Insured"
                      label={
                        <>
                          {<span className="mandatory-icon">*</span>}
                          Sum Insured
                        </>
                      }
                      // rules={[
                      //   {
                      //     required: !sumInsuredVal || sumInsuredVal === null,
                      //     message: "Please fill this filed",
                      //   },
                      // ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <span style={{ display: "none" }}>{sumInsuredVal}</span>
                      <Select
                        showSearch
                        size="large"
                        // className="inputbox"
                        // // bordered={false}
                        // style={{ width: "100%" }}
                        placeholder="Select Sum Insured"
                        optionFilterProp="children"
                        options={sumInsured}
                        value={sumInsuredVal}
                        filterOption={(input, option) =>
                          option.props.children
                            ?.toLowerCase()
                            ?.indexOf(input?.toLowerCase()) >= 0
                        }
                        onChange={(val) => {
                          setdatainsumassured(val)
                        }}
                      ></Select>
                      {sumInsuredErr && (
                        <div className="error-message" style={{ color: "red" }}>
                          {sumInsuredErr}
                        </div>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} style={{ width: "100%" }}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="startDate"
                      label="Departure Date"
                      rules={[
                        {
                          required: true,
                          message: "Please fill this filed",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <DatePicker
                        onChange={(date, string) =>
                          datePickerHandler(date, string, "startDate")
                        }
                        disabledDate={disabledDateAfterSpecificDate}
                        size="large"
                        bordered={true}
                        style={{ width: "100%" }}
                        disabled={!travelForm.currency}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la"
                      name="endDate"
                      label="Arrival Date"
                      rules={[
                        {
                          required: true,
                          message: "Please fill this filed",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <DatePicker
                        onChange={(date, string) =>
                          datePickerHandler(date, string, "endDate")
                        }
                        disabledDate={disabledDateBeforeSpecificDate}
                        disabled={!travelForm.currency}
                        size="large"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="Trip Duration"
                      label="Trip Duration"
                      rules={[
                        {
                          required: false,
                          message: "Make",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        showSearch
                        size="large"
                        // style={{ width: "100%" }}
                        placeholder={
                          travelForm.tripDuration
                            ? travelForm.tripDuration
                            : "Days"
                        }
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        disabled
                        value={
                          travelForm.tripDuration
                            ? travelForm.tripDuration + " Days"
                            : null
                        }
                      ></Select>
                      <div style={{ color: "#818F99", fontsize: "12px" }}>
                        Trip Duration will automatically be updated for you.
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <div className="header2">
                    <span className="mandatory-icon">*</span> Is this a one way
                    trip?
                  </div>

                  <div>
                    <Form.Item
                      name="oneTrip"
                      // rules={[
                      //   {
                      //     required: travelForm.oneTrip === null,
                      //     message: "Please select a trip",
                      //   },
                      // ]}
                    >
                      <Radio.Group
                        value={travelForm.oneTrip}
                        // disabled
                        style={{ pointerEvents: "none" }}
                        className="rsRadio"
                        onChange={(val) => {
                          setOneWayTrip(val);
                          if (val) {
                            setOneTripErr("");
                          } else {
                            setOneTripErr("Please select a trip");
                          }
                        }}
                      >
                        <Radio value={true}>Yes</Radio>
                        <Radio value={false}>No</Radio>
                      </Radio.Group>{" "}
                      {oneTripErr && (
                        <div className="error-message" style={{ color: "red" }}>
                          {oneTripErr}
                        </div>
                      )}
                    </Form.Item>
                  </div>
                </div>
                <div className="rsInfoContainer">
                  <div className="header2">
                    Do you want to be covered for COVID-19?{" "}
                  </div>
                  <div>
                    <Radio.Group
                      value={travelForm.covidCovered}
                      onChange={(e) =>
                        setTravelFormVal("covidCovered", e.target.value)
                      }
                      className="rsRadio"
                    >
                      <Radio value="true">Yes</Radio>
                      <Radio value="false">No</Radio>
                    </Radio.Group>
                  </div>

                  <div className="header2">
                    Will traveler/s be participating in hazardous sports?
                  </div>
                  <div>
                    <Radio.Group
                      value={isHazardousSports}
                      onChange={(e) => setIsHazardousSports(e.target.value)}
                      className="rsRadio"
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </div>
                  {isHazardousSports && (
                    <Row style={{ width: "100%" }}>
                      <Col xs={24}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          name="sportsParticipation"
                          label="Hazardous sports"
                          rules={[
                            {
                              required: true,
                              message: "Please fill the input",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            placeholder="Hazardous sports"
                            className="inputboxx"
                            maxLength={80}
                            onChange={(e) =>
                              setTravelFormVal(
                                "sportsParticipation",
                                e.target.value
                              )
                            }
                            value={travelForm.sportsParticipation}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  )}

                  <div className="header2">
                    Will traveler/s be bringing sports equipment?
                  </div>

                  <div>
                    <Radio.Group
                      value={isSportsEquipment}
                      onChange={(e) => setIsSportsEquipment(e.target.value)}
                      className="rsRadio"
                    >
                      <Radio value={true}>Yes</Radio>
                      <Radio value={false}>No</Radio>
                    </Radio.Group>
                  </div>
                  {isSportsEquipment && (
                    <Row style={{ width: "100%" }}>
                      <Col xs={24}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la formFill"
                          name="sportEquipment"
                          label="Type of Equipment"
                          rules={[
                            {
                              required: true,
                              message: "Please fill the input",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          <Input
                            placeholder="Type of Equipment"
                            className="inputboxx"
                            maxLength={80}
                            value={travelForm.sportEquipment}
                            onChange={(e) =>
                              setTravelFormVal("sportEquipment", e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  )}

                  {/* <input
            placeholder="Type of Equipment"
            type="text"
            className="textinput"
          /> */}
                  {travelForm.destination !== "D" && (
                    <>
                      <div className="header2">
                        Will traveler/s be going on a cruise?
                      </div>
                      <div>
                        <Radio.Group
                          value={travelForm.cruise}
                          onChange={(e) =>
                            setTravelFormVal("cruise", e.target.value)
                          }
                          className="rsRadio"
                        >
                          <Radio value="true">Yes</Radio>
                          <Radio value="false">No</Radio>
                        </Radio.Group>
                      </div>
                    </>
                  )}
                </div>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="typeOfCoverage"
                      label="Type of Coverage"
                      rules={[
                        {
                          required: true,
                          message: "Please fill coverage",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Select
                        showSearch
                        size="large"
                        // className="inputbox"
                        // bordered={false}
                        // style={{ width: "100%" }}
                        placeholder="Individual or Family "
                        optionFilterProp="children"
                        options={numberOfTravelerList}
                        onChange={PolicyOptionOnchange}
                        value={travelForm.typeOfCoverage}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {PolicyOptionType2.map((item, index) => (
                          <Option key={index} value={item.value}>
                            {item.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name la formFill"
                      name="ageOfEldest"
                      label={<><span style={{fontSize: '18px', color: "red", marginRight: "3px"}} >{travelForm.ageOfEldest ? "*" : ''}</span><span>Age Range of Eldest Insured Traveler</span></>}
                      rules={[
                        {
                          required: travelForm.ageOfEldest ? false : true,
                          message: "Please fill age range ",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <div style={{position: 'relative'}}>
                      <Select
                        showSearch
                        size="large"
                        // className="inputbox"
                        // bordered={false}
                        // style={{ width: "100%" }}
                        placeholder="Age Range"
                        optionFilterProp="children"
                        options={ageRangeList}
                        value={travelForm.ageOfEldest}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={(val) => settravelfrom(val) }
                      ></Select>
                        <div style={{position: 'absolute', top: '5px', zIndex: -1}}>{travelForm.ageOfEldest}</div>
                        </div>
                    </Form.Item>
                  </Col>
                </Row>
                <div className="btndiv">
                  <Button className="backbtn" onClick={onClickBack}>
                    Back
                  </Button>
                  <Button className="next" type="submit" htmlType="submit">
                    Next
                    <ArrowRightOutlined />
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>

        {/* <div className="line"></div> */}
      </div>
      <div style={{ marginTop: "2rem" }}>
        <TravelFooter />
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