import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./AllQuotationDetails.css";
import { Button, Row, Col, Avatar, message } from "antd";
import moment from "moment/moment";
import profile_img from "../../images/Icon/profile-customer.png";
import * as actions from "../../store/actions/index";
import axios from "axios";
// import img1 from "../../../images/Icon/image-54@2x.png"
import {
  DeleteOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
  SyncOutlined,
  ArrowRightOutlined,
  CopyOutlined,
} from "@ant-design/icons";

import { Tabs } from "antd";
import { stoageGetter } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
//   import * as actions from "../../store/actions/QuotationsPolicies";
import axiosRequest from "../../axios-request/request.methods";
import FullPageLoader from "../FullPageLoader/FullPageLoader";

const { TabPane } = Tabs;

const AllQuotationDetails = (props) => {
  const designationName = useSelector(
    (state) => state?.login?.user?.designation?.designatioName
  );
  const textRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = stoageGetter("user");
  const [loader, setloader] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showproceedbutton, setshowproceedbutton] = useState(false);
  const history = useHistory();
  let quotation_updated_id = useSelector(
    (state) => state?.quotationsPolicies?.currentUpdatingQuotationID
  );
  let dataFromBulkHistoryDetails = props?.location?.state?.data;
  let idBulkCard = dataFromBulkHistoryDetails?.quotationRecordId;
  const [perparticulerQuotation, setPerparticulerQuotation] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    QC_status: "Dispute Raised",
  });
  const test2 = useSelector((state) => state);
  console.log("tesTTTTTTTTTTTTTTTTTTTTt2", test2);
  const commercialStructure = useSelector(
    (state) => state?.groupPolicy?.commercialStructure?.lov
  );
  const motorQuotationDetails = useSelector(
    (state) => state?.motorQuotation?.formData
  );
  console.log("motorQuotationDetails", motorQuotationDetails);

  useEffect(() => {
    getLeadDetails(quotation_updated_id);
  }, []);

  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    if (isInitialRender && perparticulerQuotation?.length > 0) {
      let getAgentCode = perparticulerQuotation?.[0]?.agentCode;
      let url = `user/lov?name=CommStructure&AgentCode=${getAgentCode}`;
      dispatch(actions.fetchAllCommercialStructure(url));
      if (commercialStructure?.length > 0) {
        let findCummercialStructure = commercialStructure.find(
          (item) =>
            item.COD_NIVEL3 ===
            perparticulerQuotation?.[0]?.motor_comprehensive?.branchCode
        );
        let foundedCommercialStructure = findCummercialStructure
          ? findCummercialStructure?.NOM_NIVEL3
          : null;
        dispatch(actions.GetCommercialValue(foundedCommercialStructure));
      }

      // Update the flag to prevent subsequent renders
      setIsInitialRender(false);
    }
  }, [perparticulerQuotation, commercialStructure, isInitialRender]);

  const getLeadDetails = async () => {
    setloader(true);
    try {
      var idToSend = quotation_updated_id ? quotation_updated_id : idBulkCard;
      let result = await axiosRequest.get(
        `user/getQuotation/${id}?quotationId=${idToSend}`,
        {
          secure: true,
        }
      );
      if (result?.statusCode === -1) {
        setloader(false);
        setPerparticulerQuotation(result.data[0]);
      } else {
        setloader(false);
      }
      /// dispatch(actions.fetchLeadDetailsSuccess(result.data[0]));
    } catch (err) {
      console.log(err);
    }
  };

  //   const CTPLDetails ={
  //     email:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.email,
  //     gender:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.gender,
  //     birthDate:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.birthDate,
  //     quotationNumber:perparticulerQuotation?.oonaQuotationResponse?.quotationNumber,
  //     citizenship:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.citizenship,
  //     provinceName:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.provinceName,
  //     cityName:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.cityName,
  //     addressLine1:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.addressLine1,
  //     zipCode:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.zipCode,
  //     documentCode:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.documentCode,
  //     documentType:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.documentType,
  //     statue:'',
  //     fullname:'',
  //     firstname:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.documentType,
  //     middlename:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.documentType,
  //     lastname:perparticulerQuotation?.CTPL_CustomerInfo_for_Quotation?.documentType,
  //     make:'',
  //     model:'',
  //     modelyear:'',
  //     chassisnumber:'',
  //     cundtionnumber:'',
  //     motornumber:'',
  //     mvfilenumber:'',
  //     plaenumber:'',
  //     sublinename:'',
  //     typeofuse:'',
  //     vehicletype:'',
  //     vehiclevalue:'',
  //     submodel:'',
  //     effectivitydate:'',
  //     xpirydate:'',

  //   }

  //   const MotorDetrails = {

  //   }

  //   const Finalobject =  CTPLDetails

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const nameShorter = (str) => {
    try {
      if (str !== "") {
        str = str.toUpperCase();
        let arr = str.split(" ");
        let fLatter = arr[0].charAt(0);
        let sLatter = arr[1].charAt(0);
        // fLatter = fLatter.charAt(0);
        // sLatter = sLatter.charAt(0);
        str = fLatter + sLatter;
      }
      return str;
    } catch (error) {
      console.log(error);
    }
  };

  const checkundefinednull = (data) => {
    if (data === null || data === undefined || data === "") {
      return "-";
    } else {
      return data;
    }
  };

  const jumpback = () => {
    history.push("/quotationsPoliciesMaster/Quotation");
  };

  // RISK INSPECTION API HITT

  const onchangetoRiskInspection = async () => {
    if (!isClicked) {
      try {
        const response = await axiosRequest.post(
          `user/trigger-RiskInspection/${quotation_updated_id}`,
          updatedData
        );
        if (response.status === 200) {
          console.log("Risk Inspection email will be sent to customer shortly");
          // message.success(response.data.data)
          // Handle success, update state, show notifications, etc.
          // history.push(`/risk-inspection-success/${id}/${type}`);
        } else {
          console.log(
            "Risk Inspection email will be sent to customer shortly failed"
          );
          // Handle failure, show error messages, etc.
        }
      } catch (error) {
        console.error("Error sending Risk Inspection request:", error);
        // Handle error, show error messages, etc.
      }
      getLeadDetails(quotation_updated_id);

      setIsClicked(true);
    }
  };

  const saveDataToRedux = (data) => {
    const motorData = data?.motor_comprehensive;
    console.log("DDDDDDDDDDDDDDDDDDDDD: ", data);
    const motorVehicle = {
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

  const onchangetoNext = (data) => {
    //   const resetHyperData = () =>{
    //     dispatch(actions.hypervergeMotorData({}));
    //     dispatch(actions.hypervergeCTPLData({}));
    //     dispatch(actions.hypervergeTravelData({}));
    //   }
    //   const onChangetoMotor = () => {
    //     dispatch(actions.currentLobData("MOTOR"));
    //     resetHyperData();
    // }
    dispatch(actions.hypervergeMotorData({}));
    dispatch(actions.currentLobData("MOTOR"));

    let allQuotaioMotor = {
      errCode: -1,
      errMsg: data,
    };
    // let MotorAllQuoteQuotationData = {
    //   errCode: -1,
    //   errMsg: data,
    // }
    dispatch(actions.hypervergeMotorData({}));
    dispatch(actions.currentLobData("MOTOR"));
    // console.log("Data====>>>>motor-->", allQuotaioMotor, MotorAllQuoteQuotationData);
    // dispatch(actions.motorQuotationForm(MotorAllQuoteQuotationData));
    dispatch(actions.motorFormalQuotationForm(allQuotaioMotor));
    saveDataToRedux(allQuotaioMotor?.data);

    const documentId = allQuotaioMotor?.data?.documentId;
    dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });

    if (
      data?.oonaQuotationResponse?.paymentBreakdown == null ||
      data?.oonaQuotationResponse?.technicalControls.length > 0
    ) {
      history.push("/motor-technical-control");
    } else {
      history.push("/motor-convert-policy");
      // if (data?.motor_comprehensive?.policyHolder?.documentCode) {
      //   history.push("/motor-confirm-page");
      // } else {
      //   history.push("/motor-convert-policy");
      // }
    }
  };

  const showbutton = false;

  const checkstatus = (data) => {
    console.log("technical controll data", data);

    console.log("Datat===>>", showbutton);
    if (data?.length > 0) {
      // setshowproceedbutton(true)
      return data[0]?.error;
    } else {
      // setshowproceedbutton(false)
      return "Active";
    }
  };

  const getUpdatedStatus = async (quatationnumber) => {
    setloader(true);

    let formdata = {
      quotationNumber: quatationnumber,
      type: "C",
    };
    let result = await axiosRequest.get(
      `user/quotation/details?quotationNumber=${quatationnumber}&type=C`,
      { secure: true }
    );

    if (result?.statusCode === -1) {
      setloader(false);
      console.log("result----", result.data);
      let data = [];
      data.push(result?.data);
      message.success("Details Updated");
      setPerparticulerQuotation(data);
    } else {
      message.error(result?.data);
      setloader(false);
    }
    console.log("Result Datat====>>>>>", result);
  };

  // Function to copy text to clipboard
  const copyToClipboard = () => {
    if (textRef.current) {
      textRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      message.success("URL copied successfully");
    }
  };

  const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "…" : source;
  };

  return (
    <>
      <FullPageLoader fromapploader={loader}></FullPageLoader>
      <div className="main-containerListingAllQuotation">
        <div className="main-heading-customer">
          <h2>Quotation Details</h2>
        </div>

        <div>
          <Row gutter={[16, 16]}>
            {perparticulerQuotation.map((cardDataCust, index) => {
              return (
                <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className="customer-card-data parent-quation-desktop">
                    <div className="customer-card-details">
                      <div className="button-and-daat">
                        <div className="date--">
                          <p>
                            {moment(cardDataCust.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </div>

                        <div className="buttonClassForListing">
                          <div className="newbutton--">
                            <Button>{cardDataCust.LOB}</Button>
                          </div>

                          <div
                            className="refresh-onlyqutaion"
                            onClick={() =>
                              getUpdatedStatus(
                                cardDataCust?.oonaQuotationResponse
                                  ?.quotationNumber
                              )
                            }
                          >
                            <text className="get-status-text">Get Status </text>
                            <SyncOutlined style={{ marginTop: "0px" }} />
                          </div>
                          {/* {cardDataCust?.oonaQuotationResponse?.technicalControls.length > 0 ?
                          <div className="refresh-onlyqutaion"  onClick={()=>getUpdatedStatus(cardDataCust?.oonaQuotationResponse?.quotationNumber)}>
                          <text className="get-status-text">Get Status </text>
                          <SyncOutlined style={{marginTop:"0px"}}/>
                          </div>
                          :null} */}
                        </div>
                      </div>

                      <div>
                        <div
                          className="heading-pro"
                          style={{ marginLeft: "10px" }}
                        >
                          <h2>Customer Details</h2>
                        </div>

                        <div className="Peronal-details-card">
                          <div className="profile--11">
                            {/* <img src={cardDataCust.imgData} /> */}
                            <Avatar
                              style={{
                                paddingTop: "-40px",
                                lineHeight: "none",
                                backgroundColor: getRandomColor(),
                              }}
                              size={{ xl: 40 }}
                            >
                              {nameShorter(
                                cardDataCust.motor_comprehensive?.policyHolder
                                  ?.firstName +
                                " " +
                                cardDataCust?.motor_comprehensive
                                  ?.policyHolder?.lastName
                              )}
                            </Avatar>
                            <div className="profilename--">
                              <h3>
                                {cardDataCust?.motor_comprehensive?.policyHolder?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  cardDataCust?.motor_comprehensive?.policyHolder?.firstName.slice(
                                    1
                                  ) +
                                  " " +
                                  cardDataCust?.motor_comprehensive?.policyHolder?.lastName
                                    .charAt(0)
                                    .toUpperCase() +
                                  cardDataCust?.motor_comprehensive?.policyHolder?.lastName.slice(
                                    1
                                  )}
                              </h3>
                              {/* <p>{cardDataCust.profileDescri}</p> */}
                            </div>
                          </div>
                          {/* <div className='button-and-profile1 button-and-all-details'> */}

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <p className="button-and-all-details-p">
                                Email Id
                              </p>
                              <h3 className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.emailAddress
                                )}
                              </h3>
                            </div>
                            <div className="Details-box-data">
                              <p className="button-and-all-details-p">Gender</p>
                              <h3 className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.genderName
                                )}
                              </h3>
                              {/* <h3 className='button-and-all-details-h3'>{cardDataCust?.motor_comprehensive?.policyHolder?.gender.charAt(0).toUpperCase() + cardDataCust.motor_comprehensive?.policyHolder?.gender.slice(1)}</h3> */}
                            </div>
                            <div className="Details-box-data">
                              <p className="button-and-all-details-p">
                                Date of Birth
                              </p>
                              <h3 className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.birthday
                                )}
                              </h3>
                            </div>
                            <div className="Details-box-data">
                              <p className="button-and-all-details-p">
                                Quotation Number
                              </p>
                              <h3 className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.oonaQuotationResponse
                                    ?.quotationNumber
                                )}
                              </h3>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Citizenship
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.countryCode
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Province
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.provinceName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                City
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.cityName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Address Line 1
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.address1
                                )}
                              </text>
                            </div>
                          </div>

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Zip Code
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.zipCode
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Document Type
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.documentType
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Documnet Code
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.documentCode
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Status
                              </text>
                              {cardDataCust?.oonaQuotationResponse
                                ?.technicalControls.length > 0 ? (
                                cardDataCust?.oonaQuotationResponse?.technicalControls.map(
                                  (data) => (
                                    <text className="button-and-all-details-h3">
                                      {data.error}
                                    </text>
                                  )
                                )
                              ) : (
                                <text className="button-and-all-details-h3">
                                  {checkstatus(
                                    cardDataCust?.oonaQuotationResponse
                                      ?.technicalControls
                                  )}
                                </text>
                              )}
                              {/* <text className="button-and-all-details-h3">
                                {checkstatus(
                                  cardDataCust?.oonaQuotationResponse
                                    ?.technicalControls
                                )}
                              </text> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="heading-pro"
                          style={{ marginLeft: "10px" }}
                        >
                          <h2>Other Details</h2>
                        </div>

                        <div className="Peronal-details-card">
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Make
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.makeName
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Model
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.modelName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Model Year
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.yearModel
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Chasis Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.chassisNumber
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Conduction Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.conductionNumber
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Motor/Engine Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.engineNumber
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                MV File Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.fileNumber
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Plate Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.plateNumber
                                )}
                              </text>
                            </div>
                          </div>

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Subline Name
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.sublineName
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Type of Use
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.typeOfUseName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Vehicle Type
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.vehicleTypeName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Vehicle Value
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.vehicleValue
                                )}
                              </text>
                            </div>
                          </div>

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Sub Model
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.subModelName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Risk Inspection Status
                              </text>
                              {cardDataCust?.QC_status ? (
                                <text
                                  className={`${cardDataCust?.QC_status === "Approved"
                                    ? "RiskInspectionConfirm"
                                    : "RiskInspection1"
                                    }`}
                                >
                                  {cardDataCust?.QC_status}
                                </text>
                              ) : (
                                ""
                              )}
                            </div>

                            <div className="Details-box-data">
                              <input
                                type="text"
                                ref={textRef}
                                value={`https://kahoona-dev.salesdrive.app/risk-inspection/${cardDataCust?.oonaQuotationResponse?.quotationNumber}/${cardDataCust?.quotationId}`} // Replace this with the text you want to copy
                                readOnly
                                style={{
                                  position: "absolute",
                                  left: "-9999px",
                                }}
                              />
                              {cardDataCust?.QC_status === "Required" ||
                                cardDataCust?.QC_status === "Pending" ? (
                                <>
                                  <text className="button-and-all-details-p">
                                    Risk Inspection URL
                                  </text>
                                  <text className="button-and-all-details-h3">
                                    {truncate(
                                      `https://kahoona-dev.salesdrive.app/risk-inspection/${cardDataCust?.oonaQuotationResponse?.quotationNumber}/${cardDataCust?.quotationId}`,
                                      24
                                    )}{" "}
                                    <Button
                                      className="copyUrLButton"
                                      onClick={copyToClipboard}
                                      icon={<CopyOutlined />}
                                    >
                                      Copy URL
                                    </Button>
                                  </text>
                                </>
                              ) : null}
                            </div>
                            {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? (
                              <div className="Details-box-data">
                                <text className="button-and-all-details-p">
                                  Staff Name
                                </text>
                                <text className="button-and-all-details-h3">
                                  {`${cardDataCust?.staff_orAgnet_firstName} ${cardDataCust?.staff_orAgnet_lastName}`}
                                </text>
                              </div>
                            ) : (
                              <div className="Details-box-data"></div>
                            )}
                          </div>
                          {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Created By
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(cardDataCust?.createdBy)}
                              </text>
                            </div>
                            <div className="Details-box-data"></div>

                            <div className="Details-box-data"></div>

                            <div className="Details-box-data">
                              {/* <text className="button-and-all-details-p">
                                  Staff Name
                                </text>
                                <text className="button-and-all-details-h3">
                                  {`${cardDataCust?.staff_orAgnet_firstName} ${cardDataCust?.staff_orAgnet_lastName}`}
                                </text> */}
                            </div>
                          </div> : ''}

                        </div>
                      </div>

                      <div className="btndiv-qu ">
                        <Button className="backbtn" onClick={jumpback}>
                          Back
                        </Button>
                        {(checkstatus(
                          cardDataCust?.oonaQuotationResponse?.technicalControls
                        ) === "Active" &&
                          cardDataCust?.QC_status === "Approved") ||
                          cardDataCust?.QC_status === "Not Required" ? (
                          <Button
                            className="next"
                            onClick={() => onchangetoNext(cardDataCust)}
                            htmlType="submit"
                          >
                            Next <ArrowRightOutlined />
                          </Button>
                        ) : null}
                        {cardDataCust?.QC_status === "Required" ? (
                          <>
                            <Button
                              className="next"
                              onClick={onchangetoRiskInspection}
                              disabled={isClicked}
                            >
                              {isClicked
                                ? "RI Email Sended"
                                : "Risk Inspection"}
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>

        {/* For Mobile */}

        <div>
          <Row gutter={[16, 16]}>
            {perparticulerQuotation.map((cardDataCust, index) => {
              return (
                <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div className="customer-card-data parent-quation-mobile">
                    <div className="customer-card-details">
                      <div className="button-and-daat">
                        <div className="date--">
                          <p>
                            {moment(cardDataCust?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </div>

                        <div className="newbutton--">
                          <Button>{cardDataCust?.LOB}</Button>
                        </div>
                        <div
                          className="refresh-onlyqutaion"
                          onClick={() =>
                            getUpdatedStatus(
                              cardDataCust?.oonaQuotationResponse
                                ?.quotationNumber
                            )
                          }
                        >
                          <text className="get-status-text">Get Status </text>
                          <SyncOutlined style={{ marginTop: "0px" }} />
                        </div>
                        {/* {cardDataCust?.oonaQuotationResponse?.technicalControls.length > 0 ?
                          <div className="refresh-onlyqutaion"  onClick={()=>getUpdatedStatus(cardDataCust?.oonaQuotationResponse?.quotationNumber)}>
                          <text className="get-status-text">Get Status </text>
                          <SyncOutlined style={{marginTop:"0px"}}/>
                          </div>
                          :null} */}
                      </div>
                      <div>
                        <div
                          className="heading-pro"
                          style={{ marginLeft: "10px" }}
                        >
                          <h2>Customer Details</h2>
                        </div>

                        <div className="Peronal-details-card">
                          <div className="profile--11">
                            {/* <img src={cardDataCust.imgData} /> */}
                            <Avatar
                              style={{
                                lineHeight: "none",
                                display: "flex",
                                alignItems: "center",
                                paddingBottom: " 6px",
                                justifyContent: "center",
                                backgroundColor: getRandomColor(),
                              }}
                              size={{ xl: 40 }}
                            >
                              {nameShorter(
                                cardDataCust?.motor_comprehensive?.policyHolder
                                  ?.firstName +
                                " " +
                                cardDataCust.motor_comprehensive?.policyHolder
                                  ?.lastName
                              )}
                            </Avatar>
                            <div className="profilename--">
                              <h3>
                                {cardDataCust?.motor_comprehensive?.policyHolder?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  cardDataCust?.motor_comprehensive?.policyHolder?.firstName.slice(
                                    1
                                  ) +
                                  " " +
                                  cardDataCust?.motor_comprehensive?.policyHolder?.lastName
                                    .charAt(0)
                                    .toUpperCase() +
                                  cardDataCust?.motor_comprehensive?.policyHolder?.lastName.slice(
                                    1
                                  )}
                              </h3>
                              {/* <p>{cardDataCust.profileDescri}</p> */}
                            </div>
                          </div>

                          {/* <div className='button-and-profile1 button-and-all-details'>


        </div>  */}
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Email Id
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.emailAddress
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Gender
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.genderName
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Date of Birth
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.birthday
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Quotation Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.oonaQuotationResponse
                                    ?.quotationNumber
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Citizenship
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.countryCode
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Province
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.provinceName
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                City
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.cityName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Address Line 1
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.address1
                                )}
                              </text>
                            </div>
                          </div>

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Zip Code
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.zipCode
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Document Type
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.documentType
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Documnet Code
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive
                                    ?.policyHolder?.documentCode
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Status
                              </text>
                              {cardDataCust?.oonaQuotationResponse
                                ?.technicalControls.length > 0 ? (
                                cardDataCust?.oonaQuotationResponse?.technicalControls.map(
                                  (data) => (
                                    <text className="button-and-all-details-h3">
                                      {data.error}
                                    </text>
                                  )
                                )
                              ) : (
                                <text className="button-and-all-details-h3">
                                  {checkstatus(
                                    cardDataCust?.oonaQuotationResponse
                                      ?.technicalControls
                                  )}
                                </text>
                              )}
                              {/* <text className="button-and-all-details-h3">
                                {checkstatus(
                                  cardDataCust?.oonaQuotationResponse
                                    ?.technicalControls
                                )}
                              </text> */}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div
                          className="heading-pro"
                          style={{ marginLeft: "10px" }}
                        >
                          <h2>Other Details</h2>
                        </div>

                        <div className="Peronal-details-card">
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Make
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.makeName
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Model
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.modelName
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Model Year
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.yearModel
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Chasis Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.chassisNumber
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Conduction Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.conductionNumber
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Engine Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.engineNumber
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                MV File Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.fileNumber
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Plate Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.plateNumber
                                )}
                              </text>
                            </div>
                          </div>

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Subline Name
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.sublineName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Type of Use
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.typeOfUseName
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Vehicle Type
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.vehicleTypeName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Vehicle Value
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.vehicleValue
                                )}
                              </text>
                            </div>
                          </div>
                          {designationName === "Agent" && cardDataCust?.createdBy === "Staff" ? <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Staff Name
                              </text>
                              <text className="button-and-all-details-h3">
                                {`${cardDataCust?.staff_orAgnet_firstName} ${cardDataCust?.staff_orAgnet_lastName}`}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Created By
                              </text>
                              <text className="button-and-all-details-h3">
                                {`${cardDataCust?.createdBy} `}
                              </text>
                            </div>



                          </div> : ''}

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Sub Model
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.motor_comprehensive?.vehicleData
                                    ?.subModelName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Risk Inspection Status
                              </text>
                              {/* <div className={`${cardDataCust?.QC_status === "Approved" ? 'RiskInspectionConfirm' : 'RiskInspection'}`} > */}

                              {cardDataCust?.QC_status ? (
                                <text
                                  className={`${cardDataCust?.QC_status === "Approved"
                                    ? "RiskInspectionConfirm"
                                    : "RiskInspection1"
                                    }`}
                                >
                                  {cardDataCust?.QC_status}
                                </text>
                              ) : (
                                ""
                              )}

                              {/* </div> */}
                            </div>

                            <div className="Details-box-data">
                              <input
                                type="text"
                                ref={textRef}
                                value={`https://kahoona-dev.salesdrive.app/risk-inspection/${cardDataCust?.oonaQuotationResponse?.quotationNumber}/${cardDataCust?.quotationId}`} // Replace this with the text you want to copy
                                readOnly
                                style={{
                                  position: "absolute",
                                  left: "-9999px",
                                }}
                              />
                              {cardDataCust?.QC_status === "Required" ||
                                cardDataCust?.QC_status === "Pending" ? (
                                <>
                                  <text className="button-and-all-details-p">
                                    Risk Inspection URL
                                  </text>
                                  <text className="button-and-all-details-h3">
                                    {truncate(
                                      `https://kahoona-dev.salesdrive.app/risk-inspection/${cardDataCust?.oonaQuotationResponse?.quotationNumber}/${cardDataCust?.quotationId}`,
                                      24
                                    )}{" "}
                                    <Button
                                      className="copyUrLButton"
                                      onClick={copyToClipboard}
                                      icon={<CopyOutlined />}
                                    >
                                      Copy URL
                                    </Button>
                                  </text>
                                </>
                              ) : null}
                            </div>
                          </div>

                        </div>
                      </div>

                      <div className="btndiv-qu ">
                        <Button className="backbtn" onClick={jumpback}>
                          Back
                        </Button>
                        {(checkstatus(
                          cardDataCust?.oonaQuotationResponse?.technicalControls
                        ) === "Active" &&
                          cardDataCust?.QC_status === "Approved") ||
                          cardDataCust?.QC_status === "Not Required" ? (
                          <Button
                            className="next"
                            onClick={() => onchangetoNext(cardDataCust)}
                            htmlType="submit"
                          >
                            Next <ArrowRightOutlined />
                          </Button>
                        ) : null}
                        {cardDataCust?.QC_status === "Required" ? (
                          <>
                            <Button
                              className="next"
                              onClick={onchangetoRiskInspection}
                              disabled={isClicked}
                            >
                              {isClicked
                                ? "RI Email Sended"
                                : "Risk Inspection"}
                            </Button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </>
  );
};

export default AllQuotationDetails;
