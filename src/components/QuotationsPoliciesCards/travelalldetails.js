import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./AllQuotationDetails.css";
import { Button, Row, Col, Avatar, message } from "antd";
import moment from "moment/moment";
import profile_img from "../../images/Icon/profile-customer.png";
import {
  setQuotationDetails,
  setTravelInfo,
  setTravelPolicyDetails,
  setTravelUserDetails,
} from "../../store/actions/travel";
import * as actions from "../../store/actions/index";
// import img1 from "../../../images/Icon/image-54@2x.png"
import {
  DeleteOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
  SyncOutlined,
  ArrowRightOutlined,
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
  let dataFromBulkHistoryDetails = props?.location?.state?.data;
  let idBulkCard = dataFromBulkHistoryDetails?.quotationRecordId;
  const dispatch = useDispatch();
  const { id } = stoageGetter("user");
  const [loader, setloader] = useState(false);
  const [showproceedbutton, setshowproceedbutton] = useState(false);
  const [travelList, setTravelList] = useState([]);
  const [documentID, setDocumentID] = useState(false);
  const history = useHistory();
  let quotation_updated_id = useSelector(
    (state) => state?.quotationsPolicies?.currentUpdatingQuotationID
  );
  console.log("quotation_updated_id", quotation_updated_id);
  const [perparticulerQuotation, setPerparticulerQuotation] = useState([]);
  console.log("perparticulerQuotation", perparticulerQuotation);
  var documentId = "";

  useEffect(() => {
    getLeadDetails(quotation_updated_id);
    // getDocumentId();
    getTravelList();
  }, []);

  const getTravelList = async () => {
    const res = await axiosRequest.get("user/getTravelList");
    if (res.statusCode === -1) {
      if (res?.data?.data && Array.isArray(res.data.data)) {
        setTravelList(res.data.data);
      } else {
        message.error(res?.data.data.message ?? "Something went Wrong");
      }
    }
  };

  const saveDataToRedux = (data) => {
    const travelInfo = {
      travelProduct: data?.travel_information?.travelData?.travelProduct,
      LOB: data?.travel_information?.travelData?.LOB,
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
      commercialName: data?.travel_information?.branchCodeName,
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

  const getLeadDetails = async () => {
    setloader(true);
    try {
      var idToSend = quotation_updated_id ? quotation_updated_id : idBulkCard;
      var result = await axiosRequest.get(
        `user/getQuotation/${id}?quotationId=${idToSend}`,
        {
          secure: true,
        }
      );
      console.log("Datatat=====>>>", quotation_updated_id, idBulkCard);
      if (result?.statusCode === -1) {
        setloader(false);
        console.log("result----", result.data[0]);
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

  const onchangetoNext = (data) => {
    console.log("Data====>>>>", data);
    saveDataToRedux(data);
    dispatch(actions.currentLobData("TRAVEL"));
    dispatch(actions.hypervergeTravelData({}));
    const documentID = data?.travel_information?.documentId;
    data.oonaQuotationResponse.quotationId = data.quotationId;
    dispatch(
      setQuotationDetails({
        data,
        ...data.oonaQuotationResponse,
        documentId: documentID,
      })
    );

    if (
      data?.oonaQuotationResponse?.paymentBreakdown == null ||
      data?.oonaQuotationResponse?.technicalControls.length > 0
    ) {
      history.push("/travel-quotation-failed");
    } else {
      history.push("/travel/success");
    }
  };

  // const getDocumentId = async () => {
  //   const data = await axiosRequest.get("user/getDocumentId");
  //   if (data.statusCode === -1) {
  //       documentId  =  data?.data?.documentId;
  //       setDocumentID(data?.data?.documentId)
  //   }
  // };

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

  const Coverargetype = (data) => {
    if (data === null || data === undefined || data === "") {
      return "-";
    } else {
      if (data === "I") {
        return "Individual";
      } else {
        return "Family";
      }
    }
  };

  const getUpdatedStatus = async (quatationnumber) => {
    setloader(true);

    let formdata = {
      quotationNumber: quatationnumber,
      type: "C",
    };
    let result = await axiosRequest.get(
      `user/quotation/details?quotationNumber=${quatationnumber}&type=T`,
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
              console.log("cardDataCust", cardDataCust);
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
                                cardDataCust?.travel_information?.policyHolder
                                  ?.firstName +
                                " " +
                                cardDataCust?.travel_information?.policyHolder
                                  ?.lastName
                              )}
                            </Avatar>
                            <div className="profilename--">
                              <h3>
                                {cardDataCust?.travel_information?.policyHolder?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  cardDataCust?.travel_information?.policyHolder?.firstName.slice(
                                    1
                                  ) +
                                  " " +
                                  cardDataCust?.travel_information?.policyHolder?.lastName
                                    .charAt(0)
                                    .toUpperCase() +
                                  cardDataCust?.travel_information?.policyHolder?.lastName.slice(
                                    1
                                  )}
                              </h3>
                              {/* <p>{cardDataCust.profileDescri}</p> */}
                            </div>
                          </div>
                          <div className="button-and-profile1 button-and-all-details">
                            <div className="profile--all">
                              <p>Email Id</p>
                              <h3>
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.policyHolder
                                    ?.emailAddress
                                )}
                              </h3>
                            </div>
                            {/* <div className='profile--all'>
                 <p>Gender</p>
                 <h3>{'-'}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Date of Birth</p>
                 <h3>{checkundefinednull(cardDataCust.CTPL_CustomerInfo_for_Quotation?.birthDate)}</h3>
              </div> */}
                            <div className="profilename--all-class">
                              <p>Quotation Number</p>
                              <h3>
                                {checkundefinednull(
                                  cardDataCust?.oonaQuotationResponse
                                    ?.quotationNumber
                                )}
                              </h3>
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
                              {/* <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaQuotationResponse?.technicalControls)}</text> */}
                            </div>
                          </div>

                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data"></div>
                            <div className="Details-box-data"></div>
                            <div className="Details-box-data"></div>
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
                                Coverage Type
                              </text>
                              <text className="button-and-all-details-h3">
                                {Coverargetype(
                                  cardDataCust?.travel_information?.travelData
                                    ?.coverageType
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Currency
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.currencyName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Expenses Coverage
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.expensesCoverage
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Max Age Limit
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.maxAgeLimit
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            {/* <div className='Details-box-data'>
                                <text className='button-and-all-details-p'>Purpose Trip</text>
                                <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.travel_information?.travelData?.purposeTrip)}</text>
                            </div> */}

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Travel Pack
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.travelPackName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Travel Product
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.travelProductName
                                )}
                              </text>
                            </div>
                            {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? (
                              <div className="Details-box-data">
                                <text className="button-and-all-details-p">
                                  Created By
                                </text>
                                <text className="button-and-all-details-h3">
                                  {checkundefinednull(cardDataCust?.createdBy)}
                                </text>
                              </div>
                            ) : (
                              <div className="Details-box-data"></div>
                            )}

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
                        </div>
                      </div>

                      <div className="btndiv-qu ">
                        <Button className="backbtn" onClick={jumpback}>
                          Back
                        </Button>
                        {checkstatus(
                          cardDataCust?.oonaQuotationResponse?.technicalControls
                        ) === "Active" ? (
                          <Button
                            className="next"
                            onClick={() => onchangetoNext(cardDataCust)}
                            htmlType="submit"
                          >
                            Next <ArrowRightOutlined />
                          </Button>
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
                            {moment(cardDataCust.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </div>

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
                                cardDataCust?.travel_information?.policyHolder
                                  ?.firstName +
                                " " +
                                cardDataCust?.travel_information?.policyHolder
                                  ?.lastName
                              )}
                            </Avatar>
                            <div className="profilename--">
                              <h3>
                                {cardDataCust?.travel_information?.policyHolder?.firstName
                                  .charAt(0)
                                  .toUpperCase() +
                                  cardDataCust?.travel_information?.policyHolder?.firstName.slice(
                                    1
                                  ) +
                                  " " +
                                  cardDataCust?.travel_information?.policyHolder?.lastName
                                    .charAt(0)
                                    .toUpperCase() +
                                  cardDataCust?.travel_information?.policyHolder?.lastName.slice(
                                    1
                                  )}
                              </h3>
                              {/* <p>{cardDataCust.profileDescri}</p> */}
                            </div>
                          </div>

                          {/* <div className='button-and-profile1 button-and-all-details'>
          </div> */}
                          <div className="button-and-profile1-new ">
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
                              {/* <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaQuotationResponse?.technicalControls)}</text> */}
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
                                Email Id
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.policyHolder
                                    ?.emailAddress
                                )}
                              </text>
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
                                Coverage Type
                              </text>
                              <text className="button-and-all-details-h3">
                                {Coverargetype(
                                  cardDataCust?.travel_information?.travelData
                                    ?.coverageType
                                )}
                              </text>
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Currency
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.currencyName
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Expenses Coverage
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.expensesCoverage
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Max Age Limit
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.maxAgeLimit
                                )}
                              </text>
                            </div>
                          </div>
                          <div className="button-and-profile1-new ">
                            {/* <div className='Details-box-data'>
                                <text className='button-and-all-details-p'>Purpose Trip</text>
                                <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.travel_information?.travelData?.purposeTrip)}</text>
                            </div> */}

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Travel Pack
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.travelPackName
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Travel Product
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.travelProductName
                                )}
                              </text>
                            </div>
                          </div>
                          {(designationName === "Agent" && cardDataCust?.createdBy === "Staff") ? <div className="button-and-profile1-new ">
                            {/* <div className='Details-box-data'>
                                <text className='button-and-all-details-p'>Purpose Trip</text>
                                <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.travel_information?.travelData?.purposeTrip)}</text>
                            </div> */}

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Created by
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.createdBy
                                )}
                              </text>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Staff Name
                              </text>
                              <text className="button-and-all-details-h3">
                                {`${cardDataCust?.staff_orAgnet_firstName} ${cardDataCust?.staff_orAgnet_lastName}`}
                              </text>
                            </div>
                          </div> : ''

                          }

                          {/* <div className='button-and-profile1-new '>
                            <div className='Details-box-data'>
                                <text className='button-and-all-details-p'>Travel Product</text>
                                <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.travel_information?.travelData?.travelProductName)}</text>
                            </div>
                            <div className='Details-box-data'>
                            </div>
                        </div>   */}
                        </div>
                      </div>

                      <div className="btndiv-qu ">
                        <Button className="backbtn" onClick={jumpback}>
                          Back
                        </Button>
                        {checkstatus(
                          cardDataCust?.oonaQuotationResponse?.technicalControls
                        ) === "Active" ? (
                          <Button
                            className="next"
                            onClick={() => onchangetoNext(cardDataCust)}
                            htmlType="submit"
                          >
                            Next <ArrowRightOutlined />
                          </Button>
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
