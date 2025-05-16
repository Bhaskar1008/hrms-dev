import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Pagination from 'react-js-pagination';
import './AllQuotationDetails.css'
import { Button, Row, Col, Avatar, message } from 'antd';
import moment from "moment/moment";
import profile_img from '../../images/Icon/profile-customer.png'
import * as actions from "../../store/actions/index";
// import img1 from "../../../images/Icon/image-54@2x.png"
import {
  DeleteOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
  SyncOutlined,
  ArrowRightOutlined
} from "@ant-design/icons";
import { Tabs } from 'antd';
import { stoageGetter } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
//   import * as actions from "../../store/actions/QuotationsPolicies";
import axiosRequest from "../../axios-request/request.methods";
import FullPageLoader from '../FullPageLoader/FullPageLoader';

const { TabPane } = Tabs;

const AllQuotationDetails = (props) => {
  const designationName = useSelector(
    (state) => state?.login?.user?.designation?.designatioName
  );
  console.log("hey======", designationName)
  const dispatch = useDispatch();
  const { id } = stoageGetter("user");
  const [loader, setloader] = useState(false)
  const [showproceedbutton, setshowproceedbutton] = useState(false)
  const history = useHistory();
  let quotation_updated_id = useSelector((state) => state?.quotationsPolicies?.currentUpdatingQuotationID);
  let dataFromBulkHistoryDetails = props?.location?.state?.data
  let indexFileId = props?.location?.state?.data?.indexFileId
  console.log(dataFromBulkHistoryDetails, "dataFromBulkHistoryDetails")
  let idBulkCard = dataFromBulkHistoryDetails?.quotationRecordId;

  const [perparticulerQuotation, setPerparticulerQuotation] = useState([])



  useEffect(() => {
    getLeadDetails(quotation_updated_id)
  }, [])


  const getLeadDetails = async (quotation_updated_id) => {
    setloader(true)
    try {
      var idToSend = quotation_updated_id ? quotation_updated_id : idBulkCard;
      let API = "user/policy/getPolicy/" + id + "?policyId=" + idToSend
      let result = await axiosRequest.get(API, {
        secure: true,
      });
      if (result?.statusCode === -1) {
        setloader(false)
        setPerparticulerQuotation(result.data[0])
      } else {
        setloader(false)
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
    if (data === null || data === undefined || data === '') {
      return "-"
    } else {
      return data
    }

  }

  const jumpback = () => {
    history.push("/quotationsPoliciesMaster/Quotation");
  };

  const onchangetoNext = (data) => {
    let allPolicyMotor = {
      errCode: -1,
      errMsg: data
    }

    dispatch(actions.motorPolicyStore(allPolicyMotor));
    if (data?.oonaPolicyResponse?.paymentBreakdown == null) {
      history.push("/motor-policy-technical-control");
    } else {
      history.push("/motor-payment-pay-now");
    }
    // // return
    // if(data?.LOB === 'CTPL'){

    // }
  }

  const CheckCOCstatus = (data, alldata) => {
    console.log("technical controll data", data)

    console.log("Datat===>>", showbutton)
    if (data?.length > 0) {
      if (data?.length > 1) {
        // setshowproceedbutton(true)
        return data[0]?.error
      } else {
        if (data[0].code === 1626) {
          if (alldata?.paymentApiResponse !== null) {

            return data[0]?.error
          } else {
            return 'Active'
          }
        }
      }

    } else {
      // setshowproceedbutton(false)
      return 'Active'

    }



  }

  const showbutton = false

  const checkstatus = (data) => {

    if (data?.length > 0) {
      // setshowproceedbutton(true)
      return data[0]?.error

    } else {
      // setshowproceedbutton(false)
      return 'Active'

    }
  }

  const checkActivePolicy = (data) => {
    if (data?.paymentApiResponse?.responseCode === "MA001") {
      return 'ACTIVE'
    } else {
      return 'PROVISIONAL'
    }

  }

  const getUpdatedStatus = async (quatationnumber) => {
    setloader(true)

    let formdata = {
      policyNumber: quatationnumber,
      type: 'C'

    }
    let result = await axiosRequest.get(`user/policy/details?policyNumber=${quatationnumber}&type=C`, { secure: true, });

    if (result?.statusCode === -1) {
      setloader(false)
      let data = []
      data.push(result?.data)
      message.success("Details Updated");
      setPerparticulerQuotation(data)
    } else {
      message.error(result?.data);
      setloader(false)
    }

  }

  const pdfDownload = async (data) => {

    let formdata = {
      agentCode: data?.motor_comprehensive?.agentCode,
      policyNumber: data?.oonaPolicyResponse?.policyNumber,
      agentCopy: true,
      isPayment: false,
      isDownloadable: true,
    }
    setloader(true);
    try {
      const res = await axiosRequest.post("user/printQuote", formdata); // api call
      // setPostData(res?.data);

      if (res.statusCode === -1) {
        var a = document.createElement('a');
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
      <div className='main-containerListingAllQuotation'>
        <div className="main-heading-customer">
          <h2>Policy Details</h2>
        </div>

        <div>
          <Row gutter={[16, 16]}>
            {perparticulerQuotation.map((cardDataCust, index) => {
              return <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className='customer-card-data parent-quation-desktop'>
                  <div className='customer-card-details'>
                    <div className='button-and-daat'>
                      <div className='date--'>
                        <p>{moment(cardDataCust.createdAt).format('DD/MM/YYYY')}</p>
                      </div>

                      <div className='buttonClassForListing'>
                        <div className='newbutton--'>
                          <Button>{cardDataCust.LOB}</Button>
                        </div>
                        {cardDataCust?.paymentMethod === "Credit Terms" ? <>
                          <div className='unpaid--'>
                            <Button>Unpaid</Button>
                          </div>
                        </> : null}

                        {checkActivePolicy(cardDataCust) !== "ACTIVE" ?
                          <div className="refresh-onlyqutaion" onClick={() => getUpdatedStatus(cardDataCust?.oonaPolicyResponse?.policyNumber)}>
                            <text className="get-status-text">Get Status </text>
                            <SyncOutlined style={{ marginTop: "0px" }} />
                          </div>
                          // <>
                          // {cardDataCust?.oonaPolicyResponse?.technicalControls.length > 0 ?
                          //   <div className="refresh-onlyqutaion"  onClick={()=>getUpdatedStatus(cardDataCust?.oonaPolicyResponse?.policyNumber)}>
                          //   <text className="get-status-text">Get Status </text>
                          //   <SyncOutlined style={{marginTop:"0px"}}/>
                          //   </div>
                          //   :null}
                          //   </>
                          : <div className="ActivePolicy-onlyqutaion">
                            <text className="get-status-text">{checkActivePolicy(cardDataCust) + " " + 'POLICY'}</text>
                          </div>}
                      </div>

                    </div>
                    <div>
                      <div className='heading-pro' style={{ marginLeft: '10px' }}>
                        <h2>Customer Details</h2>
                      </div>
                      {/* <hr /> */}

                      <div className='Peronal-details-card'>
                        <div className='profile--11'>
                          {/* <img src={cardDataCust.imgData} /> */}
                          <Avatar
                            style={{
                              paddingTop: "-40px",
                              lineHeight: "none",
                              backgroundColor: getRandomColor(),

                            }}
                            size={{ xl: 40 }}
                          >
                            {nameShorter(cardDataCust?.motor_comprehensive?.policyHolder?.firstName + " " + cardDataCust?.motor_comprehensive?.policyHolder?.lastName)}
                          </Avatar>
                          <div className='profilename--'>
                            <h3>{cardDataCust?.motor_comprehensive?.policyHolder?.firstName.charAt(0).toUpperCase() + cardDataCust?.motor_comprehensive?.policyHolder?.firstName.slice(1) + " " + cardDataCust?.motor_comprehensive?.policyHolder?.lastName.charAt(0).toUpperCase() + cardDataCust?.motor_comprehensive?.policyHolder?.lastName.slice(1)}</h3>
                            {/* <p>{cardDataCust.profileDescri}</p> */}
                          </div>
                        </div>

                        {/* <div className='button-and-profile1 button-and-all-details'> */}


                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Email Id</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.emailAddress)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Gender</text>
                            <text className='button-and-all-details-h3'>{cardDataCust?.motor_comprehensive?.policyHolder?.gender === '1' ? 'Male' : 'Female'}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Date of Birth</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.birthday)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Policy Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.oonaPolicyResponse?.policyNumber)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Citizenship</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.countryCode)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Province</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.provinceName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>City</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.cityName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Address Line 1</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.address1)}</text>
                          </div>
                        </div>

                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Zip Code</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.zipCode)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Document Type</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.documentType)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Documnet Code</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.documentCode)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Status</text>
                            {cardDataCust?.oonaPolicyResponse?.technicalControls.length > 0 ?
                              cardDataCust?.oonaPolicyResponse?.technicalControls.map((data) =>
                                <text className='button-and-all-details-h3'>{data.error}</text>
                              )

                              :
                              <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls)}</text>
                            }
                            {/* <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls)}</text> */}
                          </div>

                        </div>


                      </div>

                    </div>

                    <div>
                      <div className='heading-pro' style={{ marginLeft: '10px' }}>
                        <h2>Other Details</h2>
                      </div>

                      {/* <hr /> */}
                      <div className='Peronal-details-card'>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Make</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.makeName)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Model</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.modelName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Model Year</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.yearModel)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Chasis Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.chassisNumber)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Conduction Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.conductionNumber)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Engine Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.engineNumber)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>MV File Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.fileNumber)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Plate Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.plateNumber)}</text>
                          </div>
                        </div>

                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Subline Name</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.sublineName)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Type of Use</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.typeOfUseName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Vehicle Type</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.vehicleTypeName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Vehicle Value</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.vehicleValue)}</text>
                          </div>

                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Sub Model</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.subModelName)}</text>
                          </div>

                          {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Staff Name</text>
                            <text className='button-and-all-details-h3'>{`${cardDataCust?.staff_orAgnet_firstName} ${cardDataCust?.staff_orAgnet_lastName}`}</text>
                          </div> : <div className='Details-box-data'>
                            {/* <text className='button-and-all-details-p'>Expiry Date</text>
                  <text className='button-and-all-details-h3'>{cardDataCust?.motor_comprehensive?.vehicleData?.expiryDate}</text> */}
                          </div>}
                          {(cardDataCust?.linkShared_To_CustomerBy === "Staff" && cardDataCust?.createdBy === "customer") || cardDataCust?.createdBy === "Staff" ? <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Created By</text>
                            <text className='button-and-all-details-h3'>{cardDataCust?.createdBy}</text>
                          </div> : <div className='Details-box-data'>
                          </div>
                          }

                          <div className='Details-box-data'>
                            {checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls) === 'Active' && checkActivePolicy(cardDataCust) === "ACTIVE" ?
                              <>
                                <text className='button-and-all-details-p'>Download PDF</text>
                                <div className='DownloadPDFButton--'>
                                  <Button onClick={() => pdfDownload(cardDataCust)}>Download</Button>
                                </div>
                              </>
                              : null}
                          </div>

                        </div>


                      </div>
                    </div>



                    <div className="btndiv-qu ">
                      <Button className="backbtn" onClick={jumpback}>
                        Back
                      </Button>
                      {CheckCOCstatus(cardDataCust?.oonaPolicyResponse?.technicalControls, cardDataCust) === 'Active' && checkActivePolicy(cardDataCust) !== "ACTIVE" ?
                        <Button className="next" onClick={() => onchangetoNext(cardDataCust)} htmlType="submit">
                          Next <ArrowRightOutlined />
                        </Button>
                        : <>
                          {cardDataCust?.paymentMethod === "Credit Terms" ?
                            <Button className="next" onClick={() => onchangetoNext(cardDataCust)} htmlType="submit">
                              Pay Now <ArrowRightOutlined />
                            </Button>
                            : null}
                        </>}
                    </div>
                  </div>
                </div>
              </Col>
            })}
          </Row>
        </div>




        {/* For Mobile */}

        <div>
          <Row gutter={[16, 16]}>
            {perparticulerQuotation.map((cardDataCust, index) => {
              return <Col key={index} xs={24} sm={24} md={24} lg={24} xl={24}>
                <div className='customer-card-data parent-quation-mobile'>
                  <div className='customer-card-details'>
                    <div className='button-and-daat'>
                      <div className='date--'>
                        <p>{moment(cardDataCust.createdAt).format('DD/MM/YYYY')}</p>
                      </div>

                      <div className='newbutton--'>
                        <Button>{cardDataCust.LOB}</Button>
                      </div>
                      {checkActivePolicy(cardDataCust) !== "ACTIVE" ?
                        <div className="refresh-onlyqutaion" onClick={() => getUpdatedStatus(cardDataCust?.oonaPolicyResponse?.policyNumber)}>
                          <text className="get-status-text">Get Status </text>
                          <SyncOutlined style={{ marginTop: "0px" }} />
                        </div>
                        // <>
                        // {cardDataCust?.oonaPolicyResponse?.technicalControls.length > 0 ?
                        //   <div className="refresh-onlyqutaion"  onClick={()=>getUpdatedStatus(cardDataCust?.oonaPolicyResponse?.policyNumber)}>
                        //   <text className="get-status-text">Get Status </text>
                        //   <SyncOutlined style={{marginTop:"0px"}}/>
                        //   </div>
                        //   :null}
                        //   </>
                        : <div className="ActivePolicy-onlyqutaion">
                          <text className="get-status-text">{checkActivePolicy(cardDataCust) + " " + 'POLICY'}</text>
                        </div>}

                    </div>
                    <div>
                      <div className='heading-pro' style={{ marginLeft: '10px' }}>
                        <h2>Customer Details</h2>
                      </div>
                      <hr />
                      <div className='Peronal-details-card'>
                        <div className='profile--11'>
                          {/* <img src={cardDataCust.imgData} /> */}
                          <Avatar
                            style={{
                              lineHeight: "none",
                              display: 'flex',
                              alignItems: 'center',
                              paddingBottom: ' 6px',
                              justifyContent: 'center',
                              backgroundColor: getRandomColor(),

                            }}
                            size={{ xl: 40 }}
                          >
                            {nameShorter(cardDataCust?.motor_comprehensive?.policyHolder?.firstName + " " + cardDataCust?.motor_comprehensive?.policyHolder?.lastName)}
                          </Avatar>
                          <div className='profilename--'>
                            <h3>{cardDataCust?.motor_comprehensive?.policyHolder?.firstName.charAt(0).toUpperCase() + cardDataCust?.motor_comprehensive?.policyHolder?.firstName.slice(1) + " " + cardDataCust?.motor_comprehensive?.policyHolder?.lastName.charAt(0).toUpperCase() + cardDataCust?.motor_comprehensive?.policyHolder?.lastName.slice(1)}</h3>
                            {/* <p>{cardDataCust.profileDescri}</p> */}
                          </div>
                        </div>

                        {/* <div className='button-and-profile1 button-and-all-details'>


        </div>  */}
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Email Id</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust.motor_comprehensive?.policyHolder?.emailAddress)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Gender</text>
                            <text className='button-and-all-details-h3'>{cardDataCust?.motor_comprehensive?.policyHolder?.gender === '1' ? 'Male' : 'Female'}</text>
                            {/* <text className='button-and-all-details-h3'>{cardDataCust.motor_comprehensive?.policyHolder?.gender.charAt(0).toUpperCase() + cardDataCust.motor_comprehensive?.policyHolder?.gender.slice(1)}</text> */}
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Date of Birth</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust.motor_comprehensive?.policyHolder?.birthday)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Policy Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.oonaPolicyResponse?.policyNumber)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Citizenship</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.countryCode)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Province</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.provinceName)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>City</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.cityName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Address Line 1</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.address1)}</text>
                          </div>
                        </div>

                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Zip Code</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.zipCode)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Document Type</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.documentType)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Documnet Code</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.policyHolder?.documentCode)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Status</text>
                            {cardDataCust?.oonaPolicyResponse?.technicalControls.length > 0 ?
                              cardDataCust?.oonaPolicyResponse?.technicalControls.map((data) =>
                                <text className='button-and-all-details-h3'>{data.error}</text>
                              )

                              :
                              <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls)}</text>
                            }
                            {/* <text className='button-and-all-details-h3'>{checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls)}</text> */}
                          </div>

                        </div>


                      </div>

                    </div>


                    <div>
                      <div className='heading-pro' style={{ marginLeft: '10px' }}>
                        <h2>Other Details</h2>
                      </div>


                      <div className='Peronal-details-card'>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Make</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.makeName)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Model</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.modelName)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Model Year</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.yearModel)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Chasis Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.chassisNumber)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Conduction Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.conductionNumber)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Engine Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.engineNumber)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>MV File Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.fileNumber)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Plate Number</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.plateNumber)}</text>
                          </div>
                        </div>

                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Subline Name</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.sublineName)}</text>
                          </div>

                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Type of Use</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.typeOfUseName)}</text>
                          </div>
                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Vehicle Type</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.vehicleTypeName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Vehicle Value</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.vehicleValue)}</text>
                          </div>

                        </div>
                        <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Sub Model</text>
                            <text className='button-and-all-details-h3'>{checkundefinednull(cardDataCust?.motor_comprehensive?.vehicleData?.subModelName)}</text>
                          </div>
                          <div className='Details-box-data'>
                            {checkstatus(cardDataCust?.oonaPolicyResponse?.technicalControls) === 'Active' && checkActivePolicy(cardDataCust) === "ACTIVE" ?
                              <>
                                <text className='button-and-all-details-p'>Download PDF</text>
                                <div className='DownloadPDFButton--'>
                                  <Button onClick={() => pdfDownload(cardDataCust)}>Download</Button>
                                </div>
                              </>
                              : null}
                          </div>

                        </div>
                        {designationName === "Agent" && cardDataCust?.createdBy === "Staff" ? <div className='button-and-profile1-new '>
                          <div className='Details-box-data'>
                            <text className='button-and-all-details-p'>Staff Name</text>
                            <text className='button-and-all-details-h3'>{`${cardDataCust?.staff_orAgnet_firstName} ${cardDataCust?.staff_orAgnet_lastName}`}</text>
                          </div>
                          <div className='Details-box-data'>

                            <text className='button-and-all-details-p'>Created By</text>
                            <text className='button-and-all-details-h3'>{cardDataCust?.createdBy}</text>

                          </div>

                        </div> : ''}



                      </div>
                    </div>



                    <div className="btndiv-qu ">
                      <Button className="backbtn" onClick={jumpback}>
                        Back
                      </Button>

                      {CheckCOCstatus(cardDataCust?.oonaPolicyResponse?.technicalControls, cardDataCust) === 'Active' && checkActivePolicy(cardDataCust) !== "ACTIVE" ?
                        <Button className="next" onClick={() => onchangetoNext(cardDataCust)} htmlType="submit">
                          Next <ArrowRightOutlined />
                        </Button>
                        :
                        <>
                          {cardDataCust?.paymentMethod === "Credit Terms" ?
                            <Button className="next" onClick={() => onchangetoNext(cardDataCust)} htmlType="submit">
                              Pay Now<ArrowRightOutlined />
                            </Button>
                            : null}
                        </>
                      }
                    </div>
                  </div>
                </div>
              </Col>
            })}
          </Row>
        </div>


      </div>
    </>
  );
};

export default AllQuotationDetails;
