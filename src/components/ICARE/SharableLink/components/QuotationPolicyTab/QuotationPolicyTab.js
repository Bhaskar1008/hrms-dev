import React, { useState, useEffect } from "react";
// import Header from "../SampleHeader/Header";
import Header from "../../LoginHeader/LoginHeader";
import "./QuotationPolicyTab.css";
import moment from "moment";
import { Button, Row, Col, Avatar, Tabs, Drawer, message } from "antd";
// import profile_img from "../../../../../images/ABIB_LOGO.jpg";
// import Pagination from "react-js-pagination";
import { Pagination } from "antd";
import CTPL from "../../../../../images/Icon/image-54@2x.png";
import Motor from "../../../../../images/Icon/image-55@2x.png";
import Travel from "../../../../../images/Icon/image-56@2x.png";
import plushIcon from "../../../../../images/Icon/add_circle_outline.png";
import Documnets from "../../../../../images/Icon/document_.png";
import Search_detailes from "../../../../../images/Icon/research_.png";
import { useHistory, useLocation } from "react-router-dom";
import axiosRequest from "../../../../../axios-request/request.methods";
import FullPageLoader from "../../../../FullPageLoader/FullPageLoader";
import { stoageGetter } from "../../../../../helpers";
import { compose } from "redux";
import { setPolicyGeneratedInfo } from "../../../../../store/actions/travel";
import NoRecordsFound from "../../../../NoRcordsFound/NoRecordsFound";

import { useDispatch, useSelector } from "react-redux";

import {
  setQuotationDetails,
  setTravelInfo,
  setTravelPolicyDetails,
  setTravelUserDetails,
  setTravelCustomerInfo,
  setTravelerInfo,
} from "../../../../../store/actions/travel";

import * as actions from "../../../../../store/actions/index";

const QuotationPolicyTab = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let userData = stoageGetter("user");
  let agentCodeUser = userData?.agentCode;

  const { TabPane } = Tabs;
  // const { id } = stoageGetter("user");
  const [quotationArray, setQuotationArray] = useState([]);
  const [policyArray, setPolicyArray] = useState([]);
  console.log("policy", policyArray);
  console.log("quotation", quotationArray);

  const [openloader, setOpenloader] = useState(false);

  const [activeTab, setActiveTab] = useState("Quotations");
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(true);
  const [current, setcurrent] = useState(1);
  const itemsPerPage = 14;
  const itemsPerPage1 = 14;
  const [activePage, setActivePage] = useState(1);
  const [activePage1, setActivePage1] = useState(1);

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const startIndex1 = (activePage1 - 1) * itemsPerPage1;
  const endIndex1 = startIndex1 + itemsPerPage1;

  const currentPageData =
    quotationArray?.length > 0
      ? quotationArray?.[0]?.slice(startIndex, endIndex)
      : [];
  console.log(
    "currentPageData",
    quotationArray.length > 0
      ? quotationArray?.[0]?.slice(startIndex, endIndex)
      : []
  );

  var totalLeadsQuotaion =
    quotationArray?.length > 0 ? quotationArray?.[1]?.count : 1;
  console.log("quotaion1===>", totalLeadsQuotaion);

  var totalLeads = policyArray?.length > 0 ? policyArray?.[1]?.count : 1;
  console.log("policy1", totalLeads);
  let totalcountQuotaon = Math.ceil(totalLeadsQuotaion / 14);
  console.log({ totalcountQuotaon });

  const currentPageDataPolicies =
    policyArray?.length > 0
      ? policyArray?.[0]?.slice(startIndex1, endIndex1)
      : [];

  // const currentPageDataPolicies = policyArray?.slice(startIndex1, endIndex1);

  console.log("hey==>", currentPageDataPolicies);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handlePageChange1 = (pageNumber1) => {
    setActivePage1(pageNumber1);
  };

  const handlePageClick = async (page = 1) => {
    let pageCount = page;

    setcurrent(page);
    if (activeTab === "Quotations") {
      setOpenloader(true);
      let result = await axiosRequest.get(
        `customer/getQuotation?skip=${pageCount}`,
        {
          secure: true,
        }
      );
      setOpenloader(false);
      if (result.statusCode == -1) {
        setQuotationArray(result?.data);
      }
    } else {
      setOpenloader(true);
      let result = await axiosRequest.get(
        `customer/getPolicy?skip=${pageCount}`,
        {
          secure: true,
        }
      );
      setOpenloader(false);
      if (result.statusCode == -1) {
        setPolicyArray(result?.data);
      }
    }
  };

  // const handleTabChange = (key) => {
  //   setActiveTab(key);
  // };
  const handleTabChange = async (key) => {
    setActiveTab(key);
    setOpenloader(true);
    //dispatch(actions.storeQuotationForm(dataInVehicle));

    try {
      const response = await axiosRequest.get("user/getDocumentId");
      console.log("response", response);
      if (response.statusCode === -1) {
        setOpenloader(false);
        const documentId = response?.data?.documentId;
        dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });

      } else {
        message.error(response.data);
        setOpenloader(false);
      }
    } catch (error) {
      setOpenloader(false);
      console.log("error", error);
    }
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleButtonClick = (buttonIndex) => {
    //  console.log("buttonIndex", buttonIndex);
    setActiveButton(buttonIndex);
  };

  const onchangetoNext = () => {
    if (activeButton === false) {
      dispatch(actions.currentLobData("CTPL"));
      history.push("/customer-vehicle-information");
    } else {
      dispatch(actions.currentLobData("TRAVEL"));
      history.push("/customer/travel-info");
    }
  };
  // const changeCancle = () => { };
  useEffect(() => {
    // policyQuotationapiCall()
    handlePageClick();
    dispatch(actions.resetFormData({}));
    dispatch(actions.createCTPLQuotationSuccess({}));
    dispatch(actions.storeQuotationForm({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));
    dispatch(setTravelInfo({}));
    dispatch(setQuotationDetails({}));
    dispatch(setTravelPolicyDetails({}));
    dispatch(setTravelUserDetails({}));
    dispatch(setTravelCustomerInfo({}));
    dispatch(setTravelerInfo({}));

    dispatch(actions.uploadVehicleCertificate([]));
    dispatch(actions.uploadPhotoId([]));
    dispatch(actions.uploadSign([]));
    dispatch(actions.currentLobData("TRAVEL"));

    // hypervers clear
    dispatch(actions.hypervergeMotorData({}));
    dispatch(actions.hypervergeCTPLData({}));
    dispatch(actions.hypervergeTravelData({}));

    if (activeTab === "Quotations") {
      dispatch(actions.resetFormData({}));
      dispatch(actions.createCTPLQuotationSuccess({}));
      dispatch(actions.storeQuotationForm({}));
      dispatch(actions.fetchModelSuccess({}));
      dispatch(actions.createCTPLQuotation({}));
    }
  }, [activeTab]);

  const dataClear = useSelector((state) => state);
  console.log("dataClear", dataClear);

  const policyQuotationapiCall = async () => {
    setOpenloader(true);
    if (activeTab === "Quotations") {
      let result = await axiosRequest.get(`customer/getQuotation`, {
        secure: true,
      });
      setOpenloader(false);
      if (result.statusCode == -1) {
        setQuotationArray(result?.data);
      }
    } else {
      let result = await axiosRequest.get(`customer/getPolicy`, {
        secure: true,
      });
      setOpenloader(false);
      if (result.statusCode == -1) {
        setPolicyArray(result?.data);
      }
    }
  };
  // this for the

  const saveDataToRedux = (data) => {
    const travelInfo = {
      travelProduct: data?.travel_information?.travelData?.travelProduct,
      travelProductName:
        data?.travel_information?.travelData?.travelProductName,
      currency: data?.travel_information?.travelData?.currency,
      currencyName: data?.travel_information?.travelData?.currencyName,
      countries: [
        {
          NOM_PAIS: data?.travel_information?.travelData?.countries[0]?.name,
          COD_PAIS: data?.travel_information?.travelData?.countries[0]?.value,
          NOM_VERNACULO:
            data?.travel_information?.travelData?.countries[0]?.value,
        },
      ],
      travelPack: data?.travel_information?.travelData?.travelPack,
      travelPackName: data?.travel_information?.travelData?.travelPackName,
      travelType: data?.travel_information?.travelData?.travelType,
      travelTypeName: data?.travel_information?.travelData?.travelTypeName,
      withCruise: data?.travel_information?.travelData?.withCruise,
      withCovidCover: data?.travel_information?.travelData?.withCovidCover,
      sportsEquipment: data?.travel_information?.travelData?.sportsEquipment,
      hazardousSports: data?.travel_information?.travelData?.hazardousSports,
      coverageOption: data?.travel_information?.travelData?.coverageOption,
      coverageType: data?.travel_information?.travelData?.coverageType,
      expensesCoverage: data?.travel_information?.travelData?.expensesCoverage,
      effectivityDate: data?.travel_information?.effectivityDate,
      expirationDate: data?.travel_information?.expirationDate,
      tripDuration: data?.travel_information?.travelData?.tripDuration,
      oneTrip: data?.travel_information?.travelData?.oneTrip,
      ageOfEldest: data?.travel_information?.travelData?.maxAgeLimit,
      documentId: data?.travel_information?.documentId,
    };
    console.log("TravelInfooooooooooo: ", travelInfo);
    dispatch(setTravelInfo(travelInfo));

    const travelPolicy = {
      group: data?.travel_information?.policyGroupCodeName,
      subContractNumber: data?.travel_information?.subContractCodeName,
      commercial: data?.travel_information?.branchCode,
      agent: data?.travel_information?.agentCode,
    };
    console.log("TravelPolicyyyyyyy: ", travelPolicy);
    dispatch(setTravelPolicyDetails(travelPolicy));

    const travelPolicyHolder = {
      firstName: data?.travel_information?.policyHolder?.firstName,
      lastName: data?.travel_information?.policyHolder?.lastName,
      mobile: data?.travel_information?.policyHolder?.mobileNumber,
      email: data?.travel_information?.policyHolder?.emailAddress,
    };
    console.log("TravelPolicyHolderrrrrrrr: ", travelPolicyHolder);
    dispatch(setTravelUserDetails(travelPolicyHolder));
  };

  // this is the ref
  const saveDataToReduxM = (data) => {
    console.log("data----", data);
    const motorData = data?.motor_comprehensive;

    const motorVehicle = {
      documentId: data?.documentId,
      coverages: motorData?.coverages,
      branchCode: motorData?.branchCode,
      subContractCode: motorData?.subContractCode,
      paymentPlanCode: motorData?.paymentPlanCode,
      sublineName: motorData?.sublineName,
      policyGroupCode: motorData?.policyGroupCode,
      policyGroupName: motorData?.policyGroupName,
      contractCode: motorData?.contractCode,
      subline: motorData?.subline,
      productTier: motorData?.packageCode,
      productTierName: motorData?.productTierName,
      nonStandardaccessories: motorData?.nonStandardaccessories,
      isReconditioned: motorData?.isReconditioned,
      datePurchased: motorData?.datePurchased,
      policyHolder: null,
      effectivityDate: motorData?.effectivityDate,
      expirationDate: motorData?.expirationDate,
      vehicleData: {
        fileNumber: motorData?.vehicleData?.fileNumber,
        conductionNumber: motorData?.vehicleData?.conductionNumber,
        plateNumber: motorData?.vehicleData?.plateNumber,
        engineNumber: motorData?.vehicleData?.engineNumber,
        chassisNumber: motorData?.vehicleData?.chassisNumber,
        makeCode: motorData?.vehicleData?.makeCode,
        makeName: motorData?.vehicleData?.makeName,
        modelCode: motorData?.vehicleData?.modelCode,
        modelName: motorData?.vehicleData?.modelName,
        vehicleType: motorData?.vehicleData?.vehicleType,
        vehicleTypeName: motorData?.vehicleData?.vehicleTypeName,
        yearModel: motorData?.vehicleData?.yearModel,
        subModelCode: motorData?.vehicleData?.subModelCode,
        subModelName: motorData?.vehicleData?.subModelName,
        areaOfUse: motorData?.vehicleData?.areaOfUse,
        areaOfUseName: motorData?.vehicleData?.areaOfUseName,
        typeOfUse: motorData?.vehicleData?.typeOfUse,
        typeOfUseName: motorData?.vehicleData?.typeOfUseName,
        vehicleValue: motorData?.vehicleData?.vehicleValue,
        transmission: motorData?.vehicleData?.transmission,
      },
    };
    console.log("motorVehicle: ", motorVehicle);

    dispatch(actions.motorQuotationForm(motorVehicle));
    let quotationInfo = {
      errCode: -1,
      errMsg: data?.oonaQuotationResponse,
    };
    console.log("quotationInfo: ", quotationInfo);
    dispatch(actions.createMotorQuotationSuccess(quotationInfo));
  };
  // this is for the download quotation only
  async function downloadQuotePdf(quotainNumber, agencode) {
    setOpenloader(true);
    const formData = {
      agentCode: agencode.toString(),
      agentCopy: true,
      isPayment: false,
      isDownloadable: true,
      quotationNumber: quotainNumber,
    };

    try {
      const res = await axiosRequest.post("customer/printQuote", formData); // Replace with your API endpoint
      if (res.statusCode === -1) {
        var a = document.createElement("a");
        a.href = res?.data?.fileUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setOpenloader(false);
        message.success(res?.data?.message);
      } else {
        setOpenloader(false);
      }
    } catch (error) {
      setOpenloader(false);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  }
  const uploadId = async () => {
    try {
      const response = await axiosRequest.get("customer/getDocumentId");
      console.log("response", response);
      if (response.statusCode === -1) {
        setOpenloader(false);

        const documentId = response?.data?.documentId;
        dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
        // history.push({
        //   pathname: "/vehicle-information",
        // });
      } else {
        message.error(response.data);
        setOpenloader(false);
      }
    } catch (error) {
      setOpenloader(false);
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };
  // this data tranfer
  const onchangetoNext1 = (data) => {
    console.log("data=====>", data);
    if (data?.LOB === "Travel") {
      saveDataToRedux(data);
      dispatch(actions.currentLobData("TRAVEL"));
      dispatch(actions.hypervergeTravelData({}));
      const documentID = data?.travel_information?.documentId; // send to
      dispatch({ data: documentID, type: "CURRENT_DOCUMENTS_ID" });
      data.oonaQuotationResponse.quotationId = data.quotationId;
      dispatch(
        setQuotationDetails({
          ...data,
          ...data.oonaQuotationResponse,
          documentId: documentID,
        })
      );
      // dispatch(setTravelCustomerInfo(formData));

      if (
        data?.oonaQuotationResponse?.paymentBreakdown == null ||
        data?.oonaQuotationResponse?.technicalControls.length > 0
      ) {
        history.push("/customer-travel-quotation-failed");
      } else {
        history.push("/customer/customer-info");
      }
    } else if (data?.LOB === "Motor") {
      let allQuotaioMotor = {
        errCode: -1,
        errMsg: data,
      };
      uploadId();
      dispatch(actions.motorFormalQuotationForm(allQuotaioMotor));
      saveDataToReduxM(allQuotaioMotor?.data);
      dispatch(actions.currentLobData("MOTOR"));
      const documentId = allQuotaioMotor?.data?.documentId;
      dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
      if (
        data?.oonaQuotationResponse?.paymentBreakdown == null ||
        data?.oonaQuotationResponse?.technicalControls.length > 0
      ) {
        history.push("/customer-motor-technical-control");
      } else {
        history.push("/customer-policyholder");
      }
    } else if (data?.LOB === "CTPL") {
      let allQuotaioCTPL = {
        errCode: -1,
        errMsg: data,
      };
      dispatch(actions.currentLobData("CTPL"));
      dispatch(actions.createCTPLQuotation(allQuotaioCTPL));
      if (
        data?.oonaQuotationResponse?.paymentBreakdown == null ||
        data?.oonaQuotationResponse?.technicalControls.length > 0
      ) {
        history.push("/customer-quotation-pending");
      } else {
        history.push("/customer-CTPL/success");
      }
    } else {
      console.log("error");
    }
  };

  // this for the
  const renderContentBasedOnConditions = (quationPolicy) => {
    const responseCode = quationPolicy?.paymentApiResponse?.responseCode;
    const isResponseCodeMA001 = responseCode === "MA001";
    const isApiResponseNull = quationPolicy?.paymentApiResponse == null;
    const isDocumentIdNull = quationPolicy?.documentId === null;
    const paymentfailed = responseCode === "MA003";

    if (!isResponseCodeMA001 && isApiResponseNull && !isDocumentIdNull) {
      // Show the div for Pay Now
      return (
        <div className="delet-sharbleT">
          <p onClick={() => handlePayNow(quationPolicy)}>Pay Now</p>
        </div>
      );
    } else if (!isResponseCodeMA001 && !isApiResponseNull && !isDocumentIdNull) {
      return (
        <div className="delet-sharbleT">
          <p onClick={() => handlePayNow(quationPolicy)}>Pay Now</p>
        </div>
      );
    } else if (isResponseCodeMA001 && !isApiResponseNull && isDocumentIdNull) {
      // Show the div for Document Upload
      return (
        <div className="delet-sharbleT">
          <p onClick={() => handleUploadID()}>Document Upload</p>
        </div>
      );
    } else if (!isResponseCodeMA001 && isApiResponseNull && isDocumentIdNull) {
      // Show the div for Pay Now and Upload ID
      return (
        <>
          <div className="delet-sharble">
            <p onClick={() => handlePayNow(quationPolicy)}>Pay Now</p>
          </div>
          <div className="delet-sharble">
            <p onClick={() => handleUploadID()}>Upload ID</p>
          </div>
        </>
      );
    }

    return null; // render nothing if none of the conditions are satisfied
  };

  const handlePayNow = (data) => {
    if (data?.LOB === "Motor") {
      let allPolicyMotor = {
        errCode: -1,
        errMsg: data,
      };

      dispatch(actions.motorPolicyStore(allPolicyMotor));
      if (data?.oonaPolicyResponse?.paymentBreakdown == null) {
        history.push("/customer-motor-policy-technical-control");
      } else {
        history.push("/customer-motor-payment-pay-now");
      }
    } else if (data?.LOB == "Travel") {
      let res = {
        errCode: -1,
        errMsg: data,
      };

      dispatch(setPolicyGeneratedInfo(res.data));

      if (data?.oonaPolicyResponse?.paymentBreakdown == null) {
        history.push("/customer/travel-technical-control");
      } else {
        // history.push("/motor-payment-pay-now");
        history.push("/customer/travel-policy-sucess");
      }
    } else if (data?.LOB === "CTPL") {
      let allPolicyCTPL = {
        errCode: -1,
        errMsg: data,
      };

      dispatch(actions.createCtplPolicy(allPolicyCTPL));

      if (data?.oonaPolicyResponse?.paymentBreakdown === null) {
        history.push("/customer-CTPL-technical-control");
      } else {
        history.push("/customer-CTPL-policy-sucess");
      }
    } else {
      console.log("error");
    }
  };


  const [imagePath, setImagePath] = useState("");

  const [hyperResult, setHyperResult] = useState("");
  const [validCutomerData, setValidCustomerData] = useState(null);


  const checkDocumentValid = (hyperData) => {
    const customerDOB = moment(validCutomerData?.birthday).format("DD-MM-YYYY");
    const customerGender = validCutomerData?.gender == "0" ? "F" : "M";
    if (hyperData?.firstName && validCutomerData?.firstName && hyperData?.firstName !== validCutomerData?.firstName) {
      return false;
    }
    if (hyperData?.lastName && validCutomerData?.lastName && hyperData?.lastName !== validCutomerData?.lastName) {
      return false;
    }
    if (hyperData?.middleName && validCutomerData?.middleName && hyperData?.middleName !== validCutomerData?.middleName) {
      return false;
    }
    if (hyperData?.dateOfBirth && customerDOB && hyperData?.dateOfBirth !== customerDOB) {
      return false;
    }
    if (hyperData?.gender && hyperData?.gender !== customerGender) {
      return false;
    }
    return true;
  }

  const LaunchSDK = async (KYCResult, Token, transactionId, workflowIDs) => {
    const hyperKycConfigs = new window.HyperKycConfig(
      Token,
      workflowIDs,
      transactionId
    );
    window.HyperKYCModule.launch(hyperKycConfigs, (ResultsHandler) => {


      const isValidDoc = checkDocumentValid(ResultsHandler?.details);


      console.log("Result Hadler ===>>>>>", ResultsHandler);
      setHyperResult(ResultsHandler);
      if (ResultsHandler.status == "auto_approved") {


        console.log("path", ResultsHandler?.details?.imagePath)

      } else {

        setImagePath("");
      }
    }
    );
  };

  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );
  console.log({ documentId })

  const handleUploadID = async (KYCResult) => {

    if (!documentId) {
      message.error("Document id is not available");
      return;
    }

    let API = `user/hyperverge/tokenGeneration?documentId=${documentId}`;
    // let API = `user/hyperverge/tokenGeneration?documentId=${documentId}&documentType=${documentType}&documentCode=${documentCode}`;
    setOpenloader(true);
    let Response = await axiosRequest.get(API);
    setOpenloader(false);

    if (Response.statusCode === -1) {
      let token = Response.data.accessToken;
      let transactionId = Response.data.transactionId;
      let workflowIDs = Response.data.workflow;
      LaunchSDK(KYCResult, token, transactionId, workflowIDs);
    } else {
    }


  };
  // const handleUploadID = () => {
  //   history.push("/");
  // };

  const onchangetoNext2 = (data) => {
    // // return
    // if(data?.LOB === 'CTPL'){
    // }
  };
  // this for the pagination
  function itemRender(cur, type, originalElement) {
    console.log("policy page number", type, originalElement);
    console.log("cur", cur);
    const onPrev = () => {
      setcurrent(current - 1);
    };
    const onNext = () => {
      setcurrent(current + 1);
    };

    if (type === "prev") {
      return (
        <a current={current} onClick={onPrev} style={{ color: "#1D428A" }}>
          Prev
        </a>
      );
    }
    if (type === "next") {
      return (
        <a current={current} onClick={onNext} style={{ color: "#1D428A" }}>
          Next
        </a>
      );
    }
    return originalElement;
  }

  return (
    <>
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <Header />
      <div className="main-containerListing">
        <div className="quation-policy-tabs">
          {/* ===================== Welcome text Start here =======================*/}
          <div className="welcome_quote-andpolicy">
            <h3>Welcome</h3>
          </div>
          {/* ================= Welcome text End here ================== */}

          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Quotations" key="Quotations">
              {/* ===================== Create Quotation Card Start here =======================*/}
              {quotationArray?.length <= 0 && (
                <div className="create_new_quotation_policy">
                  <div className="create-new-myyyyyyy">
                    <img src={Documnets} />
                    <p>
                      Hey! It seems you don't have any quotation to begin with,
                      please TAP here to{" "}
                      <span className="fresh_quotation" onClick={showDrawer}>
                        Create a new quotation.
                      </span>{" "}
                    </p>
                  </div>
                </div>
              )}
              {/* ===================== Create Quotation Card End here =======================*/}

              {/* ===================== Create New Quotation start here =======================*/}
              {quotationArray?.length > 0 && (
                <div className="create-newquotation">
                  <div className="listing_page">
                    <h3>List of quotations</h3>
                  </div>
                  <div className="createeddd" onClick={showDrawer}>
                    <p>
                      <img src={plushIcon} /> Create New Quotation
                    </p>
                  </div>
                </div>
              )}
              {/* ===================== Create New Quotation End here =======================*/}

              {/* ===================== Create All Quotation data Card Start here =======================*/}
              {quotationArray?.length > 0 && (
                <Row gutter={[16, 16]}>
                  {currentPageData.map((quationPolicy, index) => {
                    // console.log("hey==>", quationPolicy?.LOB);
                    return (
                      <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className="customer-card-data-sharbale">
                          <div className="customer-card-details1-sharbale">
                            <div className="button-and-profile1-sharbale">
                              <div className="profile--11">
                                <img
                                  src={
                                    quationPolicy?.LOB === "CTPL"
                                      ? CTPL
                                      : quationPolicy?.LOB === "Travel"
                                        ? Travel
                                        : Motor
                                  }
                                />

                                <div
                                  className="profilename--"
                                  style={{ marginTop: "5px" }}
                                >
                                  <h3>
                                    {quationPolicy?.LOB === "Travel"
                                      ? quationPolicy.travel_information
                                        ?.travelData?.travelType === "D"
                                        ? "DOMESTIC"
                                        : "INTERNATIONAL"
                                      : quationPolicy?.LOB === "Motor"
                                        ? `${quationPolicy.motor_comprehensive
                                          ?.vehicleData?.makeName ?? "-"
                                        }- ${quationPolicy.motor_comprehensive
                                          ?.vehicleData?.modelName ?? "-"
                                        }`
                                        : `${quationPolicy
                                          ?.CTPL_VehicleInfo_for_Quotation
                                          ?.makeName ?? "-"
                                        }- ${quationPolicy
                                          ?.CTPL_VehicleInfo_for_Quotation
                                          ?.modelName ?? "-"
                                        }`}
                                  </h3>
                                  <div className="child">
                                    <p>
                                      {quationPolicy?.LOB === "Travel"
                                        ? `${quationPolicy?.travel_information
                                          ?.policyHolder?.firstName ?? "-"
                                        } ${quationPolicy?.travel_information
                                          ?.policyHolder?.lastName ?? "-"
                                        }`
                                        : quationPolicy?.LOB === "Motor"
                                          ? `${quationPolicy.motor_comprehensive
                                            ?.policyHolder?.firstName ?? "-"
                                          } ${quationPolicy.motor_comprehensive
                                            ?.policyHolder?.lastName ?? "-"
                                          }`
                                          : `${quationPolicy
                                            ?.CTPL_CustomerInfo_for_Quotation
                                            ?.firstName ?? "-"
                                          } ${quationPolicy
                                            ?.CTPL_CustomerInfo_for_Quotation
                                            ?.lastName ?? "-"
                                          }`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="newbutton--"
                                style={{ marginTop: "5px" }}
                              >
                                <Button>{quationPolicy?.LOB}</Button>
                              </div>
                            </div>
                            <hr />

                            <div className="button-and-all-details-sharbale">
                              <div className="profilename--all-sharble">
                                <p>Quotation Number </p>
                                <h3>
                                  {
                                    quationPolicy?.oonaQuotationResponse
                                      ?.quotationNumber
                                  }
                                </h3>
                              </div>
                              <div className="profilename--all-sharble">
                                <p>Premium</p>
                                <h3>
                                  {
                                    quationPolicy.oonaQuotationResponse
                                      ?.paymentBreakdown?.grossPrem
                                  }
                                </h3>
                              </div>
                              <div className="profilename--all-sharble">
                                <p>Expiry</p>
                                <h3>
                                  {quationPolicy?.LOB === "Travel"
                                    ? quationPolicy.travel_information
                                      ?.expirationDate
                                    : quationPolicy?.LOB === "Motor"
                                      ? quationPolicy.motor_comprehensive
                                        ?.expirationDate
                                      : quationPolicy?.LOB === "CTPL"
                                        ? quationPolicy
                                          ?.CTPL_VehicleInfo_for_Quotation
                                          ?.effectivityDate
                                        : "-"}
                                </h3>
                              </div>
                            </div>
                            <div className="background-customer1-sharbale">
                              <div className="delet-sharble">
                                <p
                                  onClick={() =>
                                    downloadQuotePdf(
                                      quationPolicy?.oonaQuotationResponse
                                        ?.quotationNumber,
                                      quationPolicy?.agentCode
                                    )
                                  }
                                >
                                  {"Download Quotation"}
                                </p>
                              </div>
                              <span className="pipe">|</span>
                              <div
                                className="delet-sharble"
                                onClick={() => onchangetoNext1(quationPolicy)}
                              >
                                <p>{"Convert to policy"}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              )}
              {/* ===================== Create All Quotation data Card End here =======================*/}
            </TabPane>

            {/* Policy Tabs start here  */}
            <TabPane tab="Policies" key="Policies">
              {/* ===================== Create Quotation Card Start here =======================*/}
              {policyArray?.lenth <= 0 && (
                <div className="create_new_quotation_policy">
                  <div className="create-new-myyyyyyy">
                    <img src={Search_detailes} />
                    <p>
                      Hey! It seems you don’t have any policy yet, please TAP
                      here to{" "}
                      <span className="fresh_quotation" onClick={showDrawer}>
                        Create a new quotation.
                      </span>{" "}
                    </p>
                  </div>
                </div>
              )}
              {/* ===================== Create Quotation Card End here =======================*/}

              {/* ===================== Create All Policy Data Card Start here =======================*/}
              {policyArray?.length > 0 && (
                <div className="create-newquotation">
                  <div className="listing_page">
                    <h3>List of Policies</h3>
                  </div>
                </div>
              )}
              {policyArray?.length > 0 ? (
                <Row gutter={[16, 16]}>
                  {currentPageDataPolicies.map((quationPolicy, index) => {
                    return (
                      <Col key={index} xs={24} sm={24} md={12} lg={12} xl={12}>
                        <div className="customer-card-data-sharbale">
                          <div className="customer-card-details1-sharbale">
                            <div className="button-and-profile1-sharbale">
                              <div className="profile--11">
                                <img
                                  src={
                                    quationPolicy?.LOB === "CTPL"
                                      ? CTPL
                                      : quationPolicy?.LOB === "Travel"
                                        ? Travel
                                        : Motor
                                  }
                                />

                                <div
                                  className="profilename--"
                                  style={{ marginTop: "5px" }}
                                >
                                  <h3>
                                    {quationPolicy?.LOB === "Travel"
                                      ? quationPolicy.travel_information
                                        ?.travelData?.travelType === "D"
                                        ? "DOMESTIC"
                                        : "INTERNATIONAL"
                                      : quationPolicy?.LOB === "Motor"
                                        ? quationPolicy.motor_comprehensive
                                          ?.vehicleData
                                          ? `${quationPolicy.motor_comprehensive
                                            .vehicleData.makeName
                                            ? quationPolicy
                                              .motor_comprehensive
                                              .vehicleData.makeName
                                            : "-"
                                          } ${quationPolicy.motor_comprehensive
                                            .vehicleData.modelName
                                            ? quationPolicy
                                              .motor_comprehensive
                                              .vehicleData.modelName
                                            : "-"
                                          }` || "-"
                                          : "-"
                                        : quationPolicy?.CTPL_VehicalInfo_for_Policy
                                          ? `${quationPolicy
                                            .CTPL_VehicalInfo_for_Policy
                                            .makeName
                                            ? quationPolicy
                                              .CTPL_VehicalInfo_for_Policy
                                              .makeName
                                            : "-"
                                          } ${quationPolicy
                                            .CTPL_VehicalInfo_for_Policy
                                            .modelName
                                            ? quationPolicy
                                              .CTPL_VehicalInfo_for_Policy
                                              .modelName
                                            : "-"
                                          }` || "-"
                                          : "-"}
                                  </h3>

                                  <div className="child">
                                    <p>
                                      {quationPolicy?.LOB === "Travel"
                                        ? `${quationPolicy?.travel_information
                                          ?.policyHolder?.firstName || "-"
                                        } ${quationPolicy?.travel_information
                                          ?.policyHolder?.lastName || "-"
                                        }`
                                        : quationPolicy?.LOB === "Motor"
                                          ? `${quationPolicy.motor_comprehensive
                                            ?.policyHolder?.firstName || "-"
                                          } ${quationPolicy.motor_comprehensive
                                            ?.policyHolder?.lastName || "-"
                                          }`
                                          : `${quationPolicy
                                            ?.CTPL_CustomerInfo_for_Policy
                                            ?.firstName || "-"
                                          } ${quationPolicy
                                            ?.CTPL_CustomerInfo_for_Policy
                                            ?.lastName || "-"
                                          }`}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="newbutton--"
                                style={{ marginTop: "5px" }}
                              >
                                <Button>{quationPolicy?.LOB}</Button>
                                <Button style={{ backgroundColor: "#4FBF26" }}>
                                  {
                                    quationPolicy?.oonaPolicyResponse
                                      ?.policyStatus
                                  }
                                </Button>
                              </div>
                            </div>
                            <hr />
                            {(quationPolicy?.LOB == "Motor" ||
                              quationPolicy?.LOB == "CTPL") && (
                                <div className="button-and-all-details-sharbale">
                                  {quationPolicy?.LOB == "Motor" ||
                                    quationPolicy?.LOB == "CTPL" ? (
                                    <>
                                      <div className="profilename--all-sharble">
                                        <p>Make</p>
                                        <h3>
                                          {quationPolicy
                                            ?.CTPL_VehicalInfo_for_Policy
                                            ?.makeName
                                            ? quationPolicy
                                              ?.CTPL_VehicalInfo_for_Policy
                                              ?.makeName
                                            : quationPolicy.motor_comprehensive
                                              ?.vehicleData?.makeName
                                              ? quationPolicy.motor_comprehensive
                                                ?.vehicleData?.makeName
                                              : ""}
                                        </h3>
                                      </div>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                  {quationPolicy?.LOB == "Motor" ||
                                    quationPolicy?.LOB == "CTPL" ? (
                                    <>
                                      {quationPolicy && (
                                        <div className="profilename--all-sharble">
                                          <p>Model Year</p>
                                          <h3>
                                            {quationPolicy
                                              ?.CTPL_VehicalInfo_for_Policy
                                              ?.modelYear
                                              ? quationPolicy
                                                ?.CTPL_VehicalInfo_for_Policy
                                                ?.modelYear
                                              : quationPolicy.motor_comprehensive
                                                ?.vehicleData?.yearModel
                                                ? quationPolicy.motor_comprehensive
                                                  ?.vehicleData?.yearModel
                                                : ""}
                                          </h3>
                                        </div>
                                      )}

                                      {quationPolicy?.LOB == "Motor" ||
                                        quationPolicy?.LOB == "CTPL" ? (
                                        <div className="profilename--all-sharble">
                                          <p>Plat Number</p>
                                          <h3>
                                            {quationPolicy
                                              ?.CTPL_VehicalInfo_for_Policy
                                              ?.plateNumber
                                              ? quationPolicy
                                                ?.CTPL_VehicalInfo_for_Policy
                                                ?.plateNumber
                                              : quationPolicy.motor_comprehensive
                                                ?.vehicleData?.plateNumber
                                                ? quationPolicy.motor_comprehensive
                                                  ?.vehicleData?.plateNumber
                                                : ""}
                                          </h3>
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              )}

                            {(quationPolicy?.LOB === "Motor" ||
                              quationPolicy?.LOB === "CTPL") && (
                                <div className="button-and-all-details-sharbale">
                                  <div className="profilename--all-sharble">
                                    {quationPolicy?.LOB === "Motor" ||
                                      quationPolicy?.LOB === "CTPL" ? (
                                      <>
                                        <p>Effective Date</p>
                                        <h3>
                                          {quationPolicy?.LOB === "CTPL"
                                            ? quationPolicy
                                              .CTPL_VehicalInfo_for_Policy
                                              ?.effectivityDate
                                            : quationPolicy?.LOB === "Motor"
                                              ? quationPolicy.motor_comprehensive
                                                ?.effectivityDate
                                              : "-"}
                                        </h3>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="profilename--all-sharble">
                                    {quationPolicy?.LOB === "Motor" ||
                                      quationPolicy?.LOB === "CTPL" ? (
                                      <>
                                        <p>Expiry</p>
                                        <h3>
                                          {quationPolicy?.LOB === "CTPL"
                                            ? quationPolicy
                                              .CTPL_VehicalInfo_for_Policy
                                              ?.expiryDate
                                            : quationPolicy?.LOB === "Motor"
                                              ? quationPolicy.motor_comprehensive
                                                ?.expirationDate
                                              : "-"}
                                        </h3>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="profilename--all-sharble">
                                    {quationPolicy?.LOB === "Motor" ||
                                      quationPolicy?.LOB === "CTPL" ? (
                                      <>
                                        <p>Policy Number</p>
                                        <h3>
                                          {quationPolicy?.LOB === "CTPL"
                                            ? quationPolicy.oonaPolicyResponse
                                              ?.policyNumber
                                            : quationPolicy?.LOB === "Motor"
                                              ? quationPolicy.oonaPolicyResponse
                                                ?.policyNumber
                                              : "-"}
                                        </h3>
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              )}
                            {/* from here travel policy card  start */}
                            {quationPolicy?.LOB === "Travel" && (
                              <div className="button-and-all-details-sharbale">
                                <div className="profilename--all-sharble">
                                  {quationPolicy?.LOB === "Travel" ? (
                                    <>
                                      <>
                                        <p>Policy Number</p>
                                        <h3>
                                          {quationPolicy?.LOB === "Travel"
                                            ? quationPolicy?.policyNumber
                                            : "-"}
                                        </h3>
                                      </>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="profilename--all-sharble">
                                  {quationPolicy?.LOB === "Travel" ? (
                                    <>
                                      <p>Travel Pack</p>
                                      <h3>
                                        {quationPolicy?.LOB === "Travel"
                                          ? quationPolicy?.type == "p"
                                            ? "PHILIPPINES"
                                            : "INTERNATIONAL"
                                          : "-"}
                                      </h3>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="profilename--all-sharble">
                                  {quationPolicy?.LOB === "Travel" ? (
                                    <>
                                      <p>Expiry</p>
                                      <h3>
                                        {quationPolicy?.LOB === "Travel"
                                          ? quationPolicy.travel_information
                                            ?.expirationDate
                                          : "-"}
                                      </h3>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            )}
                            {quationPolicy?.LOB === "Travel" && (
                              <div className="button-and-all-details-sharbale">
                                <div className="profilename--all-sharble">
                                  {quationPolicy?.LOB === "Travel" ? (
                                    <>
                                      <>
                                        <p>Travel Product </p>
                                        <h3>
                                          {quationPolicy?.LOB === "Travel"
                                            ? quationPolicy?.travel_information
                                              ?.travelData?.travelProductName
                                            : "-"}
                                        </h3>
                                      </>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="profilename--all-sharble">
                                  {quationPolicy?.LOB === "Travel" ? (
                                    <>
                                      <p>Premium</p>
                                      <h3>
                                        {quationPolicy?.LOB === "Travel" &&
                                          quationPolicy.travel_information
                                            ?.travelData?.travelType === "D"
                                          ? quationPolicy?.oonaPolicyResponse
                                            ?.paymentBreakdown?.grossPrem
                                          : quationPolicy?.oonaPolicyResponse
                                            ?.paymentBreakdown?.converted
                                            ? quationPolicy?.oonaPolicyResponse
                                              ?.paymentBreakdown?.converted
                                            : "-"}
                                      </h3>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="profilename--all-sharble">
                                  {quationPolicy?.LOB === "Travel" ? (
                                    <>
                                      <p>Status</p>
                                      <h3>
                                        {quationPolicy?.LOB === "Travel"
                                          ? quationPolicy?.oonaPolicyResponse?.policyStatus.charAt(
                                            0
                                          ) +
                                          quationPolicy?.oonaPolicyResponse?.policyStatus
                                            .slice(1)
                                            .toLowerCase()
                                          : "-"}
                                      </h3>
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </div>
                            )}

                            <div className="background-customer1-sharbale">
                              {renderContentBasedOnConditions(quationPolicy)}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className="create_new_quotation_policy">
                  <div className="create-new-myyyyyyy">
                    <img src={Search_detailes} />
                    <p>
                      Hey! It seems you don’t have any policy yet, please TAP
                      here to{" "}
                      <span className="fresh_quotation" onClick={showDrawer}>
                        Create a new quotation.
                      </span>{" "}
                    </p>
                  </div>
                </div>
              )}

              {/* ===================== Create All Policy Data Card End here =======================*/}
            </TabPane>
          </Tabs>
        </div>

        {/* ===================== Pagination Start Here =======================*/}
        {activeTab == "Quotations" ? (
          <>
            {totalLeadsQuotaion > 14 ? (
              <div
                className="page-holder Pagination-Mapbranch"
                style={{ marginBottom: "2rem" }}
              >
                <>
                  <Pagination
                    // activePage={current}
                    // current={current}
                    // defaultPageSize={14}
                    // totalItemsCount={totalLeadsQuotaion}
                    // pageRangeDisplayed={4} // Number of page links to display
                    // onChange={handlePageClick}
                    // itemRender={itemRender}
                    // // prevPageText="Prev"
                    // // nextPageText="Next"
                    // innerClass="pagination"
                    // itemClass="page-item"
                    // linkClass="page-link"
                    responsive
                    current={current}
                    onChange={handlePageClick}
                    total={totalLeadsQuotaion}
                    defaultPageSize={14}
                    itemRender={itemRender}

                  //   current={1}
                  //   // onChange={handlePageClick}
                  //   total={totalLeadsQuotaion}
                  //   defaultPageSize={14}
                  // // itemRender={itemRender}
                  />
                </>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {activeTab == "Policies" ? (
          <>
            <div
              className="page-holder Pagination-Mapbranch"
              style={{ marginBottom: "2rem" }}
            >
              {totalLeads > 14 ? (
                <>
                  <Pagination
                    // activePage={current}
                    // current={current}
                    // defaultPageSize={14}
                    // totalItemsCount={totalLeads}
                    // pageRangeDisplayed={14} // Number of page links to display
                    // onChange={handlePageClick}
                    // itemRender={itemRender}
                    // // prevPageText="Prev"
                    // // nextPageText="Next"
                    // innerClass="pagination"
                    // itemClass="page-item"
                    // linkClass="page-link"

                    responsive
                    current={current}
                    onChange={handlePageClick}
                    total={totalLeads}
                    defaultPageSize={14}
                    itemRender={itemRender}

                  //   current={1}
                  //   // onChange={handlePageClick}
                  //   total={totalLeadsQuotaion}
                  //   defaultPageSize={14}
                  // // itemRender={itemRender}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          ""
        )}
        {/* ===================== Pagination End Here =======================*/}

        {/* ===================== Drawer Start Here =======================*/}
        <Drawer
          title="Select one product to proceed"
          placement="right"
          footer={
            <div className="proceess_cancel">
              <Button
                className="cancle-button"
                // size={size}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="proceedd-button"
                // size={size}
                onClick={onchangetoNext}
              >
                Proceed
              </Button>
            </div>
          }
          onClose={onClose}
          open={open}
          closable={true}
          visible={open}
          // getContainer={false}
          style={{ height: "100%" }}
        >
          <div className="drawer_self">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className="button-prop">
                  <div className=""></div>
                  <Button
                    className={`${activeButton === true
                      ? "activeforMotorButton"
                      : "buttonYesNo"
                      }`}
                    onClick={() => handleButtonClick(true)}
                    icon={<img className="imp_type" src={Travel} />}
                  >
                    Travel
                  </Button>

                  <Button
                    className={`${activeButton === false
                      ? "activeforMotorButton"
                      : "buttonYesNo"
                      }`}
                    onClick={() => handleButtonClick(false)}
                    icon={<img className="imp_type" src={CTPL} />}
                  >
                    CTPL
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Drawer>
        {/* ===================== Drawer End Here =======================*/}
      </div>
    </>
  );
};

export default QuotationPolicyTab;
