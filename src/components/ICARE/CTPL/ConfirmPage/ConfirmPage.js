import React, { useState, useEffect } from "react";
import "./ConfirmPage.css";
import { Row, Col, Button, message } from "antd";
import { ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import StepTwo from "../../MotorComprehensive/components/StepBar/StepThree/StepThree";
import img1 from "../../../../images/copy-img/copy.png";
import axiosRequest from "../../../../axios-request/request.methods";
import AllFormFooter from "../../AllFormFooter/AllFormFooter";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions/index";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import moment from "moment";
import StepThree from "../../StepBar/StepThree/StepThree";
import { checkAgent, stoageGetter } from "../../../../helpers";

export default function ConfirmPage() {

  let login_user_data = stoageGetter("user");
  const channelCode = login_user_data?.channelCode;

  const dispatch = useDispatch();
  const [confirmed, setConfirmed] = useState(false);
  const [populateData, setPopulateData] = useState("");
  const history = useHistory();
  const [isCopied, setIsCopied] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [patmentType, setPaymentTypye] = useState([]);
  const linkText = "https://oo.na/agent/83dcgfg";
  const [openloader, setopenloader] = useState(false);
  const [subAgentName, setSubAgentName] = useState("");

  // const result = useSelector((state) => state?.ctplpolicy?.formData?.statusCode);

  const onChangetoDashboard = () => {
    dispatch(actions.resetFormData({}));

    history.push("/iCare-Dashboard");
  };
  const goBack = () => {
    history.push("/customer-information");
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };
  const confirmTest = useSelector((state) => state);
  console.log("test2", confirmTest);

  //const qoutationFormDataerrMsg = useSelector(state => (state?.ctplqoutation?.formData?.data))
  // const qoutationFormData = useSelector(
  //   (state) => state?.ctplqoutation?.formData?.data
  // );
  const getleadId = useSelector((state) => state?.ctplqoutation?.formData);
  console.log("final-result", getleadId);
  let LeadId = getleadId?.data?.leadId;
  console.log("Lead Id====>>>", LeadId);

  const documentId = useSelector(
    (state) => state?.quotationsPolicies?.currentDocumentID
  );
  
  const quatationData = useSelector((state) => state?.ctplqoutation?.formData);
  console.log("quatationData", quatationData);

  useEffect(() =>{
    getSubAgentName();
  }, [])

  // let DateOfBirt = moment(quatationData?.CTPL_CustomerInfo_for_Quotation?.birthDate).format('DD/MM/YYYY')
  // console.log("DateOfBirt",DateOfBirt);

  //   var ctplCustomer = {
  //     documentCode: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.documentCode,
  //     firstName: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.firstName,
  //     middleName: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.middleName,
  //     lastName: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.lastName,
  //     suffix: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.suffix,
  //     birthDate: DateOfBirt,
  //     placeOfBirth: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.placeOfBirth,
  //     gender: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.gender,
  //     citizenship: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.citizenship,
  //     province: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.province,
  //     provinceName: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.provinceName,
  //     city: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.city,
  //     cityName: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.cityName,
  //     zipCode: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.zipCode,
  //     addressLine1: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.addressLine1,
  //     addressLine2: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.addressLine2,
  //     uploadID: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.uploadID,
  //     mobileNumber: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.mobileNumber,
  //     email: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.email,
  //     expiringPolicyNumber: quatationData?.CTPL_CustomerInfo_for_QuotationObj?.expiringPolicyNumber
  // }
  // console.log("ctplCustomer",ctplCustomer);

  let CTPL_CustomerInfo_for_QuotationObj =
    quatationData?.CTPL_CustomerInfo_for_Quotation;
  // let CTPL_Quotation_infoObj = quatationData?.CTPL_Quotation_info;
  let CTPL_VehicleInfo_for_QuotationObj =
    quatationData?.CTPL_VehicleInfo_for_Quotation;
  //let dateOfbirt = CTPL_CustomerInfo_for_QuotationObj.birthDate
  let quotation_group_infoObj = quatationData?.quotation_group_info;
  
  let createFormData = {
    // CTPL_CustomerInfo_for_Quotation: ctplCustomer,
    ...quatationData,
    documentId: documentId,
    // agentCode: channelCode?.channelCode !== "CH1" ? login_user_data?.agentCode : quatationData?.agentCode
     
  };

  const confrimPageData = async () => {

    setopenloader(true);
    let result = await axiosRequest.post("user/ctpl-quotation", createFormData, { secure: true, });

    //  if (result?.statusCode === 4) {
    //   message.warning(result?.data.commonMessage)
    // }

    // dispatch(actions.createCtplPolicy(createFormData))
    if (result?.statusCode === -1) {
      dispatch(actions.createCTPLQuotation(result));
      if (
        result?.data?.oonaQuotationResponse?.technicalControls.length > 0
      ) {
        history.push("/quotation-pending");
      } else {
        history.push("/CTPL/success");
      }
      setopenloader(false);
    } else if (result?.statusCode === 1) {
      dispatch(actions.createCTPLQuotation(result));
      // history.push("/quotation-pending");
      setopenloader(false);
    } else {
      setopenloader(false);
    }

    // if (result?.statusCode === -1) {
    //   setopenloader(false)
    //   dispatch(actions.createCtplPolicy(result))
    //   // when policy payment came technical control --
    //   if (result?.data?.ctplResponse?.allowPayment === false) {
    //     history.push("/technical-control")
    //     // success when done -- payment
    //     // failed when done -- payment
    //   } else if (result?.data?.ctplResponse?.referenceNumber === null) {
    //     history.push("/technical-control")
    //   } else {
    //     history.push("thankyou")
    //   }
    // } else {
    //   setopenloader(false)
    // }
  };

  const showGenderName = (genderId) => {
    if (genderId == "1") {
      return "Male";
    } else if (genderId == "0") {
      return "Female";
    }
    // else if (genderId == "3") {
    //   return "Others"
    // }
    return "";
  };

  const getSubAgentName = async () => {
    if(quatationData?.subAgents?.length > 0){
      let agentCode = null;
      if(channelCode.channelCode !== "CH1"){
        agentCode = login_user_data?.agentCode;
      } else {
        agentCode = quatationData?.quotation_group_info?.agentCode
      }
      const subAgentId = quatationData?.subAgents[0]?.thirdPartyData?.documentCode;
      setopenloader(true)
      const url = `user/get/subagent-list?agentCode=${agentCode}`;
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {
        const selectedSubAgent = res?.data?.filter((item) => item.documentCode == subAgentId)
        if (res?.data && Array.isArray(res.data && selectedSubAgent)) {
          setSubAgentName(selectedSubAgent[0]?.name);
        }
      }
      setopenloader(false)
    }
    };
    

  return (
    <>
      <div className="parent-element">
        <FullPageLoader fromapploader={openloader}></FullPageLoader>

        <Row gutter={16} style={{ marginTop: "15px" }}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div className="left-side">
              <Button className="dashed" onClick={onChangetoDashboard}>
                <ArrowLeftOutlined />
                Back to dashboard
              </Button>
              <StepThree />
            </div>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className="right-side">
              <div className="step-heading">
                <div className="laststep">
                  One last look! Did we get everything right?
                </div>
                {/* <div className="quotationNumber">
                  <h2>Quotation Id: {newquotationId}</h2>
                </div> */}
              </div>
              <div className="destop--dta">
                <div className="Information">
                  <h2>Vehicle Information</h2>
                  <hr />
                </div>
                <Row gutter={16} className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Make</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.makeName
                          ? CTPL_VehicleInfo_for_QuotationObj?.makeName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Subline</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.sublineName
                          ? CTPL_VehicleInfo_for_QuotationObj?.sublineName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Model</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.modelName
                          ? CTPL_VehicleInfo_for_QuotationObj?.modelName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Plate Number</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.plateNumber
                          ? CTPL_VehicleInfo_for_QuotationObj?.plateNumber
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Vehicle Type</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.vehicleTypeName
                          ? CTPL_VehicleInfo_for_QuotationObj?.vehicleTypeName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Chassis/Serial No.</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.chasisNumber
                          ? CTPL_VehicleInfo_for_QuotationObj?.chasisNumber
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row gutter={16} className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Model year</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.modelYear
                          ? CTPL_VehicleInfo_for_QuotationObj?.modelYear
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Motor/Engine No.</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.motorNumber
                          ? CTPL_VehicleInfo_for_QuotationObj?.motorNumber
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Sub Model</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.subModelName
                          ? CTPL_VehicleInfo_for_QuotationObj?.subModelName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">MV File No.</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.mvFileNumber
                          ? CTPL_VehicleInfo_for_QuotationObj?.mvFileNumber
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Type of Use</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.typeOfUseName
                          ? CTPL_VehicleInfo_for_QuotationObj?.typeOfUseName
                          : "-"}
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Effective Date</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.effectivityDate
                          ? CTPL_VehicleInfo_for_QuotationObj?.effectivityDate
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row gutter={16} className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Expiry Date</div>
                      <div className="subheading">
                        {CTPL_VehicleInfo_for_QuotationObj?.expiryDate
                          ? CTPL_VehicleInfo_for_QuotationObj?.expiryDate
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="Information">
                  <h2>Policy Holder Information</h2>
                  <hr />
                </div>

                <Row gutter={16} className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">First Name</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.firstName
                          ? CTPL_CustomerInfo_for_QuotationObj?.firstName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Middle Name</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.middleName
                          ? CTPL_CustomerInfo_for_QuotationObj?.middleName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Last Name</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.lastName
                          ? CTPL_CustomerInfo_for_QuotationObj?.lastName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Email Address</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.email
                          ? CTPL_CustomerInfo_for_QuotationObj?.email
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Gender</div>
                      <div className="subheading">
                        {showGenderName(
                          CTPL_CustomerInfo_for_QuotationObj?.gender
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Address</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.addressLine1
                          ? CTPL_CustomerInfo_for_QuotationObj?.addressLine1
                          : "-"}
                        {CTPL_CustomerInfo_for_QuotationObj?.addressLine2 ||
                          CTPL_CustomerInfo_for_QuotationObj?.addressLine2 ==
                          undefined
                          ? CTPL_CustomerInfo_for_QuotationObj?.addressLine2
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row gutter={16} className="row-bottom-margin">
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Citizenship</div>
                      <div className="subheading">

                        {CTPL_CustomerInfo_for_QuotationObj?.citizenshipName
                          ? CTPL_CustomerInfo_for_QuotationObj?.citizenshipName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">City</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.cityName
                          ? CTPL_CustomerInfo_for_QuotationObj?.cityName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Province</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.provinceName
                          ? CTPL_CustomerInfo_for_QuotationObj?.provinceName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Birthdate</div>
                      <div className="subheading">
                        {/*
                        {moment(CTPL_CustomerInfo_for_QuotationObj?.birthDate, "DD/MM/YY")} */}
                        {CTPL_CustomerInfo_for_QuotationObj?.birthDate
                          ? moment(
                            CTPL_CustomerInfo_for_QuotationObj?.birthDate
                          ).format("DD/MM/YYYY")
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Mobile Number</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.mobileNumber
                          ? CTPL_CustomerInfo_for_QuotationObj?.mobileNumber
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Zip Code</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.zipCode
                          ? CTPL_CustomerInfo_for_QuotationObj?.zipCode
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Place Of Birth</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.placeOfBirth
                          ? CTPL_CustomerInfo_for_QuotationObj?.placeOfBirth
                          : "-"}
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Suffix</div>
                      <div className="subheading">
                        {CTPL_CustomerInfo_for_QuotationObj?.suffixName
                          ? CTPL_CustomerInfo_for_QuotationObj?.suffixName
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </Row>

              </div>

              {/*  form mobile */}
              <div className="shubhammobile-data">
                <div className="info-for-mobile">
                  <h2>Vehical Information</h2>
                  <hr />
                </div>
                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Make</h1>
                    </td>
                    <td>
                      <h1>Subline</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.makeName
                          ? CTPL_VehicleInfo_for_QuotationObj?.makeName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.sublineName
                          ? CTPL_VehicleInfo_for_QuotationObj?.sublineName
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Model</h1>
                    </td>
                    <td>
                      <h1>Plate Number</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.modelName
                          ? CTPL_VehicleInfo_for_QuotationObj?.modelName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.plateNumber}</p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Vehicle Type</h1>
                    </td>
                    <td>
                      <h1>Chassis/Serial No.</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.vehicleTypeName
                          ? CTPL_VehicleInfo_for_QuotationObj?.vehicleTypeName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.chasisNumber}</p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Model year</h1>
                    </td>
                    <td>
                      <h1>Motor/Engine No.</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.modelYear}</p>
                    </td>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.motorNumber}</p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Sub Model</h1>
                    </td>
                    <td>
                      <h1>MV File No.</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.subModelName
                          ? CTPL_VehicleInfo_for_QuotationObj?.subModelName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.mvFileNumber}</p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Type of Use</h1>
                    </td>
                    <td>
                      <h1>Vehicale Value</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.typeOfUseName
                          ? CTPL_VehicleInfo_for_QuotationObj?.typeOfUseName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.vehicleValue}</p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Effective Date</h1>
                    </td>
                    <td>
                      <h1>Expiry Date</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_VehicleInfo_for_QuotationObj?.effectivityDate}
                      </p>
                    </td>
                    <td>
                      <p>{CTPL_VehicleInfo_for_QuotationObj?.expiryDate}</p>
                    </td>
                  </tr>
                </table>

                <div className="Information">
                  <h2>Policy Holder Information</h2>
                  <hr />
                </div>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>First Name</h1>
                    </td>
                    <td>
                      <h1>Middle Name</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.firstName
                          ? CTPL_CustomerInfo_for_QuotationObj?.firstName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.middleName
                          ? CTPL_CustomerInfo_for_QuotationObj?.middleName
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </table>
                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Last Name</h1>
                    </td>
                    <td>
                      <h1>Email Address</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.lastName
                          ? CTPL_CustomerInfo_for_QuotationObj?.lastName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.email
                          ? CTPL_CustomerInfo_for_QuotationObj?.email
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Gender</h1>
                    </td>
                    <td>
                      <h1>Address</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.genderName
                          ? CTPL_CustomerInfo_for_QuotationObj?.genderName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.addressLine1
                          ? CTPL_CustomerInfo_for_QuotationObj?.addressLine1
                          : "-"}{" "}
                        {CTPL_CustomerInfo_for_QuotationObj?.addressLine2
                          ? CTPL_CustomerInfo_for_QuotationObj?.addressLine2
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Citizenship</h1>
                    </td>
                    <td>
                      <h1>City</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.citizenshipName
                          ? CTPL_CustomerInfo_for_QuotationObj?.citizenshipName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.cityName
                          ? CTPL_CustomerInfo_for_QuotationObj?.cityName
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Province</h1>
                    </td>
                    <td>
                      <h1>Birthdate</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.provinceName
                          ? CTPL_CustomerInfo_for_QuotationObj?.provinceName
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.birthDate
                          ? CTPL_CustomerInfo_for_QuotationObj?.birthDate
                          : "-"}
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Mobile Number</h1>
                    </td>
                    <td>
                      <h1>Zip Code</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.mobileNumber
                          ? CTPL_CustomerInfo_for_QuotationObj?.mobileNumber
                          : "-"}
                      </p>
                    </td>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.zipCode
                          ? CTPL_CustomerInfo_for_QuotationObj?.zipCode
                          : "-"}{" "}
                      </p>
                    </td>
                  </tr>
                </table>

                <table
                  className="shubham-mobile-child"
                  style={{ width: "100%", marginTop: "15px" }}
                >
                  <tr>
                    <td style={{ width: "50%" }}>
                      <h1>Place Of Birth</h1>
                    </td>
                    <td style={{ width: "50%" }}>
                      <h1>Suffix</h1>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.placeOfBirth
                          ? CTPL_CustomerInfo_for_QuotationObj?.placeOfBirth
                          : "-"}
                      </p>
                    </td>
                    
                    <td>
                      <p>
                        {CTPL_CustomerInfo_for_QuotationObj?.suffixName
                          ? CTPL_CustomerInfo_for_QuotationObj?.suffixName
                          : "-"}
                      </p>
                    </td>

                  </tr>
                </table>
              </div>

              <div className="Information">
                <h2>Policy Group Information</h2>
                <hr />
              </div>

              <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div>
                    <div className="heading">Commercial Structure</div>
                    <div className="subheading">
                      {quotation_group_infoObj?.commercial_structure_name ||
                        quotation_group_infoObj?.commercial_structure_name ===
                        undefined
                        ? quotation_group_infoObj?.commercial_structure_name
                        : "-"}
                    </div>
                  </div>
                </Col>
                {channelCode?.channelCode === 'CH1' ? <>
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div>
                    <div className="heading">Agent</div>
                    <div className="subheading">
                      {quotation_group_infoObj?.agentCodeName ? quotation_group_infoObj?.agentCodeName : "-"}
                    </div>
                  </div>
                </Col>
                </> :""}
                <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div>
                    <div className="heading">Sub Agent</div>
                    <div className="subheading">
                      {subAgentName}
                    </div>
                  </div>
                </Col>
                {quotation_group_infoObj?.policy_group_name ? <>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Policy group</div>
                      <div className="subheading">
                        {quotation_group_infoObj?.policy_group_name
                          ? quotation_group_infoObj?.policy_group_name
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </> : null}

                {quotation_group_infoObj?.contract_Num_name ? <>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Contract</div>
                      <div className="subheading">
                        {" "}
                        {quotation_group_infoObj?.contract_Num_name
                          ? quotation_group_infoObj?.contract_Num_name
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </> : null}

                {quotation_group_infoObj?.sub_contract_Num_name ? <>
                  <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                    <div>
                      <div className="heading">Sub Contract</div>
                      <div className="subheading">
                        {" "}
                        {quotation_group_infoObj?.sub_contract_Num_name
                          ? quotation_group_infoObj?.sub_contract_Num_name
                          : "-"}
                      </div>
                    </div>
                  </Col>
                </> : null}

              </Row>

              <div className="btn-box">
              <Button className="confirm" onClick={confrimPageData}>
                  Confirm Details <ArrowRightOutlined />
                </Button>
                
                <Button className="back" onClick={goBack}>
                  Back
                </Button>
               
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <AllFormFooter />
    </>
  );
}
