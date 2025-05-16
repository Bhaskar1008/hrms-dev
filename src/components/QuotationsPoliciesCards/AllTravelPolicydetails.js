import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./AllQuotationDetails.css";
import { Button, Row, Col, Avatar, message } from "antd";
import moment from "moment/moment";
import profile_img from "../../images/Icon/profile-customer.png";
import * as actions from "../../store/actions/index";
// import { setPolicyGeneratedInfo } from "../../../../store/actions/travel";
import { setPolicyGeneratedInfo } from "../../store/actions/travel";
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
import { setTravelPolicyDetails } from "../../store/actions/travel";
const { TabPane } = Tabs;

const AllQuotationDetails = (props) => {
  const dispatch = useDispatch();
  const { id } = stoageGetter("user");
  const designationName = useSelector(
    (state) => state?.login?.user?.designation?.designatioName
  );

  const [loader, setloader] = useState(false);
  const [showproceedbutton, setshowproceedbutton] = useState(false);
  const [documentID, setDocumentID] = useState(false);
  const history = useHistory();
  let quotation_updated_id = useSelector(
    (state) => state?.quotationsPolicies?.currentUpdatingQuotationID
  );
  let dataFromBulkHistoryDetails = props?.location?.state?.data
  let indexFileId = props?.location?.state?.data?.indexFileId
  console.log(dataFromBulkHistoryDetails, "dataFromBulkHistoryDetails")
  let idBulkCard = dataFromBulkHistoryDetails?.quotationRecordId;


  const [perparticulerQuotation, setPerparticulerQuotation] = useState([]);

  const [openloader, setopenloader] = useState(false);

  // const policyNumber = perparticulerQuotation?.policyNumber
  // const AgentCode = perparticulerQuotation?.agentCode

  useEffect(() => {
    getLeadDetails(quotation_updated_id);
  }, []);

  const getLeadDetails = async (quotation_updated_id) => {
    setloader(true);
    try {
      var idToSend = quotation_updated_id ? quotation_updated_id : idBulkCard;

      let API =
        "user/policy/getPolicy/" + id + "?policyId=" + idToSend;
      let result = await axiosRequest.get(API, {
        secure: true,
      });
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
  //     policyNumber:perparticulerQuotation?.oonaPolicyResponse?.policyNumber,
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

  const checkActivePolicy = (data) => {
    console.log("Check Active Policy", data);
    if (data?.paymentApiResponse?.responseCode === "MA001") {
      return "ACTIVE";
    } else {
      return "PROVISIONAL";
    }
  };

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

  const CheckCOCstatus = (data, alldata) => {
    console.log("technical controll data", data);

    console.log("Datat===>>", showbutton);
    if (data?.length > 0) {
      if (data?.length > 1) {
        // setshowproceedbutton(true)
        return data[0]?.error;
      } else {
        if (data[0].code === 1626) {
          if (alldata?.paymentApiResponse !== null) {
            return data[0]?.error;
          } else {
            return "Active";
          }
        }
      }
    } else {
      // setshowproceedbutton(false)
      return "Active";
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
    let res = {
      errCode: -1,
      errMsg: data,
    };
    // console.log("Data====>>>>travel======>",res)
    // saveDataToRedux(data);
    // data.travelPolicyQuotationData.oonaPolicyResponse.policyNumber = data.policyNumber
    // dispatch(setTravelPolicyDetails(data))
    // if (res.statusCode === -1) {
    // setShowScreenLoader(false);
    dispatch(setPolicyGeneratedInfo(res.data));

    if (data?.oonaPolicyResponse?.paymentBreakdown == null) {
      history.push("/travel-technical-control");
    } else {
      // history.push("/motor-payment-pay-now");
      history.push("/travel-policy-sucess");
    }
    //}
  };

  const showbutton = false;

  const checkstatus = (data) => {
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
      policyNumber: quatationnumber,
      type: "C",
    };
    let result = await axiosRequest.get(
      `user/policy/details?policyNumber=${quatationnumber}&type=T`,
      { secure: true }
    );

    if (result?.statusCode === -1) {
      setloader(false);
      let data = [];
      data.push(result?.data);
      message.success("Details Updated");
      setPerparticulerQuotation(data);
    } else {
      message.error(result?.data);
      setloader(false);
    }
  };

  const pdfDownload = async (data) => {
    let formdata = {
      agentCode: data?.travel_information?.agentCode,
      policyNumber: data?.policyNumber,
      agentCopy: true,
      isPayment: false,
      isDownloadable: true,
    };
    setloader(true);
    try {
      const res = await axiosRequest.post("user/printQuote", formdata); // api call
      // setPostData(res?.data);

      if (res.statusCode === -1) {
        var a = document.createElement("a");
        a.href = res?.data?.fileUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setloader(false);
        message.success(res?.data?.message);
      } else {
        setloader(false);
      }
    } catch (error) {
      setloader(false);
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <FullPageLoader fromapploader={loader}></FullPageLoader>
      <div className="main-containerListingAllQuotation">
        <div className="main-heading-customer">
          <h2>Policy Details</h2>
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
                          {cardDataCust?.paymentMethod === "Credit Terms" ? (
                            <>
                              <div className="unpaid--">
                                <Button>Unpaid</Button>
                              </div>
                            </>
                          ) : null}
                          {checkActivePolicy(cardDataCust) !== "ACTIVE" ? (
                            <div
                              className="refresh-onlyqutaion"
                              onClick={() =>
                                getUpdatedStatus(
                                  cardDataCust?.oonaPolicyResponse?.policyNumber
                                )
                              }
                            >
                              <text className="get-status-text">
                                Get Status{" "}
                              </text>
                              <SyncOutlined style={{ marginTop: "0px" }} />
                            </div>
                          ) : (
                            // <>
                            // {cardDataCust?.oonaPolicyResponse?.technicalControls.length > 0 ?
                            //   <div className="refresh-onlyqutaion"  onClick={()=>getUpdatedStatus(cardDataCust?.oonaPolicyResponse?.policyNumber)}>
                            //   <text className="get-status-text">Get Status </text>
                            //   <SyncOutlined style={{marginTop:"0px"}}/>
                            //   </div>
                            //   :null}
                            //   </>
                            <div className="ActivePolicy-onlyqutaion">
                              <text className="get-status-text">
                                {checkActivePolicy(cardDataCust) +
                                  " " +
                                  "POLICY"}
                              </text>
                            </div>
                          )}
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
                                  cardDataCust?.travel_information?.policyHolder?.middleName
                                    .charAt(0)
                                    .toUpperCase() +
                                  cardDataCust?.travel_information?.policyHolder?.middleName.slice(
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
                              <p>Policy Number</p>
                              <h3>
                                {checkundefinednull(
                                  cardDataCust?.oonaPolicyResponse?.policyNumber
                                )}
                              </h3>
                            </div>
                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Status
                              </text>
                              {cardDataCust?.oonaPolicyResponse
                                ?.technicalControls.length > 0 ? (
                                cardDataCust?.oonaPolicyResponse?.technicalControls.map(
                                  (data) => (
                                    <text className="button-and-all-details-h3">
                                      {data.error}
                                    </text>
                                  )
                                )
                              ) : (
                                <text className="button-and-all-details-h3">
                                  {checkstatus(
                                    cardDataCust?.oonaPolicyResponse
                                      ?.technicalControls
                                  )}
                                </text>
                              )}

                              {/* <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls)}</text> */}
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
                            {/* <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Purpose Trip
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.purposeTrip
                                )}
                              </text>
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
                            <div className="Details-box-data">
                              {checkstatus(
                                cardDataCust?.oonaPolicyResponse
                                  ?.technicalControls
                              ) === "Active" &&
                                checkActivePolicy(cardDataCust) === "ACTIVE" ? (
                                <>
                                  <text className="button-and-all-details-p">
                                    Download PDF
                                  </text>
                                  <div className="DownloadPDFButton--">
                                    <Button
                                      onClick={() => pdfDownload(cardDataCust)}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          </div>
                          {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? (
                            <div className="button-and-profile1-new ">
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
                                  {checkundefinednull(cardDataCust?.createdBy)}
                                </text>
                              </div>
                              <div className="Details-box-data"></div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="btndiv-qu ">
                        <Button className="backbtn" onClick={jumpback}>
                          Back
                        </Button>
                        {CheckCOCstatus(
                          cardDataCust?.oonaPolicyResponse?.technicalControls,
                          cardDataCust
                        ) === "Active" &&
                          checkActivePolicy(cardDataCust) !== "ACTIVE" ? (
                          <Button
                            className="next"
                            onClick={() => onchangetoNext(cardDataCust)}
                            htmlType="submit"
                          >
                            Next <ArrowRightOutlined />
                          </Button>
                        ) : (
                          <>
                            {cardDataCust?.paymentMethod === "Credit Terms" ? (
                              <Button
                                className="next"
                                onClick={() => onchangetoNext(cardDataCust)}
                                htmlType="submit"
                              >
                                Pay Now <ArrowRightOutlined />
                              </Button>
                            ) : null}
                          </>
                        )}
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
                        {checkActivePolicy(cardDataCust) !== "ACTIVE" ? (
                          <div
                            className="refresh-onlyqutaion"
                            onClick={() =>
                              getUpdatedStatus(
                                cardDataCust?.oonaQuotationResponse
                                  ?.policyNumber
                              )
                            }
                          >
                            <text className="get-status-text">Get Status </text>
                            <SyncOutlined style={{ marginTop: "0px" }} />
                          </div>
                        ) : (
                          // <>
                          //     {cardDataCust?.oonaPolicyResponse?.technicalControls.length > 0 ?
                          //       <div className="refresh-onlyqutaion"  onClick={()=>getUpdatedStatus(cardDataCust?.oonaPolicyResponse?.policyNumber)}>
                          //       <text className="get-status-text">Get Status </text>
                          //       <SyncOutlined style={{marginTop:"0px"}}/>
                          //       </div>
                          //       :null}
                          //       </>
                          <div className="ActivePolicy-onlyqutaion">
                            <text className="get-status-text">
                              {checkActivePolicy(cardDataCust) + " " + "POLICY"}
                            </text>
                          </div>
                        )}
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
                                  cardDataCust?.travel_information?.policyHolder?.middleName
                                    .charAt(0)
                                    .toUpperCase() +
                                  cardDataCust?.travel_information?.policyHolder?.middleName.slice(
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
                              {cardDataCust?.oonaPolicyResponse
                                ?.technicalControls.length > 0 ? (
                                cardDataCust?.oonaPolicyResponse?.technicalControls.map(
                                  (data) => (
                                    <text className="button-and-all-details-h3">
                                      {data.error}
                                    </text>
                                  )
                                )
                              ) : (
                                <text className="button-and-all-details-h3">
                                  {checkstatus(
                                    cardDataCust?.oonaPolicyResponse
                                      ?.technicalControls
                                  )}
                                </text>
                              )}
                              {/* <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls)}</text> */}
                            </div>

                            <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Policy Number
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.oonaPolicyResponse?.policyNumber
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
                            {/* <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Purpose Trip
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.purposeTrip
                                )}
                              </text>
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
                          <div className="button-and-profile1-new ">
                            {/* <div className="Details-box-data">
                              <text className="button-and-all-details-p">
                                Travel Product
                              </text>
                              <text className="button-and-all-details-h3">
                                {checkundefinednull(
                                  cardDataCust?.travel_information?.travelData
                                    ?.travelProductName
                                )}
                              </text>
                            </div> */}
                            <div className="Details-box-data">
                              {checkstatus(
                                cardDataCust?.oonaPolicyResponse
                                  ?.technicalControls
                              ) === "Active" &&
                                checkActivePolicy(cardDataCust) === "ACTIVE" ? (
                                <>
                                  <text className="button-and-all-details-p">
                                    Download PDF
                                  </text>
                                  <div className="DownloadPDFButton--">
                                    <Button
                                      onClick={() => pdfDownload(cardDataCust)}
                                    >
                                      Download
                                    </Button>
                                  </div>
                                </>
                              ) : null}
                            </div>
                            <div className="Details-box-data"></div>
                          </div>
                          {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? (
                            <div className="button-and-profile1-new ">
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
                                  {cardDataCust?.createdBy}
                                </text>
                              </div>

                              <div className="Details-box-data"></div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <div className="btndiv-qu ">
                        <Button className="backbtn" onClick={jumpback}>
                          Back
                        </Button>
                        {CheckCOCstatus(
                          cardDataCust?.oonaPolicyResponse?.technicalControls,
                          cardDataCust
                        ) === "Active" &&
                          checkActivePolicy(cardDataCust) !== "ACTIVE" ? (
                          <Button
                            className="next"
                            onClick={() => onchangetoNext(cardDataCust)}
                            htmlType="submit"
                          >
                            Next <ArrowRightOutlined />
                          </Button>
                        ) : (
                          <>
                            {cardDataCust?.paymentMethod === "Credit Terms" ? (
                              <Button
                                className="next"
                                onClick={() => onchangetoNext(cardDataCust)}
                                htmlType="submit"
                              >
                                Pay Now <ArrowRightOutlined />
                              </Button>
                            ) : null}
                          </>
                        )}
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
