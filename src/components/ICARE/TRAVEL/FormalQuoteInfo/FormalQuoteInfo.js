import React, { useState } from "react";
import "./FormalQuoteInfo.css";
import { useHistory } from "react-router-dom";
import { Row, Col, Modal, message, Spin } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axiosRequest from "../../../../axios-request/request.methods";
import axios from "axios";
import { Button } from "antd";
import StepTravelThree from "../StepBarTravel/StepTravelThree/StepTravelThree";
import { useDispatch, useSelector } from "react-redux";
import { setPolicyGeneratedInfo, setQuotationDetails, setTravelInfo } from "../../../../store/actions/travel";
import { getCoverageTypeApi } from "../../../../services/travel";
import moment from "moment";
import { stoageGetter } from "../../../../helpers";
import PolicyFooter from "../TravelFooter/PolicyFooter/PolicyFooter";
import { useEffect } from "react";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


export default function FormalQuoteInfo() {
  let login_user_data = stoageGetter("user");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);
  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [relationList, setRelationList] = useState([]);
  const [numberOfTravelerList, setNumberOfTravelerList] = useState([]);
  const tripData = useSelector((state) => state?.trip);
  console.log(tripData?.travelUserDetailedInfo.suffix,"tripData")
  const suffixInSummary = tripData?.travelUserDetailedInfo?.suffixName;
  console.log("suffix",suffixInSummary)
  const documentId = tripData?.tripInfo?.documentId;
  const [subAgentName, setSubAgentName] = useState("");
  const dispatch = useDispatch();

  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const onClickBack = () => {
    history.push("/traveler-details");
  };

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
  const setCoverageTypeFn = async () => {
    const data = await getCoverageTypeApi();
    if (data) {
      setNumberOfTravelerList(
        data.map((e) => ({ label: e.text, value: e.value }))
      );
    }
  };

  useEffect(() => {
 
  }, []);


  useEffect(() => {
    // getRelationList();
    setCoverageTypeFn();
  }, []);

  const setRelation = (val) => {
    if (val == "P") {
      return "PRIMARY";
    } else if (val == "C") {
      return "CHILD / CHILDREN";
    } else if (val == "S") {
      return "SPOUSE";
    }
    return "";
    // let label = ""
    // label = relationList?.filter((item) => item?.value == val)[0]?.label;
    // return label
  };
  const setCoverage = (val) => {
    let label = "";
    label = numberOfTravelerList?.filter((item) => item.value == val)[0]?.label;
    return label;
  };

  const proceedPolicy = async () => {
    setShowScreenLoader(true);

    const productCode = await getProductCode(
      tripData?.tripInfo?.travelPackName,
      tripData?.tripInfo?.currency,
      tripData?.tripInfo?.travelProductName,
      tripData?.tripInfo?.expensesCoverage
    );
    if (!productCode) {
      setShowScreenLoader(false);
      return message.error("Unable to generate product code");
    }
    const formData = {
      travel_information: {
        agentCode: Number(
          login_user_data?.channelCode?.channelCode === "CH1"
            ? tripData?.travelPolicyData?.agent
              ? tripData?.travelPolicyData?.agent
              : login_user_data?.agentCode
            : login_user_data?.agentCode
        ),
        type: "p",
        quotationNumber: tripData?.travelQuotationDetails?.quotationNumber,
        documentUploaded:tripData?.travelUserDetailedInfo?.documentUploaded,
        quotationId: tripData?.travelQuotationDetails?.quotationId,
        effectivityDate: tripData?.tripInfo?.effectivityDate,
        // effectivityDate: "12/10/2023",
        expirationDate: tripData?.tripInfo?.expirationDate,
        // expirationDate: "12/20/2023",
        paymentPlanCode: "1",
        policyGroupCodeName: tripData?.travelPolicyData?.group?.label || "",
        contractCodeName:
          tripData?.travelPolicyData?.contractNumber?.label || null,
        policyGroupCode: tripData?.travelPolicyData?.group?.value || "",
        contractCode: tripData?.travelPolicyData?.contractNumber?.value || null,
        subContractCode:
          tripData?.travelPolicyData?.subContractNumber?.value || null,
        subContractCodeName:
          tripData?.travelPolicyData?.subContractNumber?.label || null,
        
        subAgents: tripData?.travelPolicyData?.subAgents,
        // agentCode: 0,
        branchCode: tripData?.travelPolicyData?.commercial?.value
          ? tripData?.travelPolicyData?.commercial?.value
          : tripData?.travelPolicyData?.commercial,
          branchCodeName: tripData?.travelPolicyData?.commercial?.label
          ? tripData?.travelPolicyData?.commercial?.label
          : tripData?.travelPolicyData?.commercial,
        
        userCode: login_user_data?.employeeCode,
        // userCode: "APIXUSR",
        timestamp: moment().format("MM/DD/YYYY"),
        designation: null,
        travelData: {
          travelProduct: productCode,
          travelProductName: tripData?.tripInfo?.travelProductName,
          currency: tripData?.tripInfo?.currency, // ===============================>  Required/*IMPORATANT
          currencyName: tripData?.tripInfo?.currencyName,
          travelPackName: tripData?.tripInfo?.travelPackName,
          countries: tripData?.tripInfo?.countries.map((e) => ({
            name: e.NOM_PAIS,
            value: e.COD_PAIS,
            type: e.NOM_VERNACULO,
          })),
          travelPack: tripData?.tripInfo?.travelPack, //Required/*IMPORATANT
          travelType: tripData?.tripInfo?.travelType, //Required/*IMPORATANT
          documentId: documentId,
          itenerary: tripData?.tripInfo?.itenerary,
          purposeTrip: "", //Required/*IMPORATANT
          othersDescription: "",
          withCruise: tripData?.tripInfo?.withCruise,
          withCovidCover: tripData?.tripInfo?.withCovidCover,
          sportsEquipment: tripData?.tripInfo?.sportsEquipment,
          hazardousSports: tripData?.tripInfo?.hazardousSports,
          coverageOption: tripData?.tripInfo?.coverageOption
            ? tripData?.tripInfo?.coverageOption
            : tripData?.tripInfo?.travelProduct, //Required/*IMPORATANT    SEND PRODUCT CODE AS DISCUSSED
          expensesCoverage: tripData?.tripInfo?.expensesCoverage, //Required/*IMPORATANT
          coverageType:
            (tripData?.tripInfo?.coverageOptionName
              ? tripData?.tripInfo?.coverageOptionName[0].label
              : tripData?.tripInfo?.coverageOptionName) ||
            tripData?.tripInfo?.coverageType, //Required/*IMPORATANT
          maxAgeLimit: tripData?.tripInfo?.ageOfEldest, //Required/*IMPORATANT
          beneficiaries: [],
          travelers: tripData?.travelersInfo?.formValues
            ? tripData?.travelersInfo?.formValues.map((e) => ({
                completeName: e.completeName,
                birthDate: moment(e.birthdate).format("MM/DD/YYYY"),
                passportNumber: e.passportNumber,
                physicianName: e.completeName,
                relationship: e.relationship,
              }))
            : [],
        },
        policyHolder: {
          parentId: null,
          documentCode: tripData?.travelUserDetailedInfo?.IdNumber,
          documentName: tripData?.travelUserDetailedInfo?.documentTypeName,
          documentType: tripData?.travelUserDetailedInfo?.documentType,
          documentTypeName: tripData?.travelUserDetailedInfo?.documentTypeName,
          firstName: tripData?.travelUserDetailedInfo?.firstName,
          middleName: tripData?.travelUserDetailedInfo?.middleName,
          lastName: tripData?.travelUserDetailedInfo?.lastName,
          suffix: tripData?.travelUserDetailedInfo?.suffix,
          birthday: moment(tripData?.travelUserDetailedInfo?.birthDate).format(
            "MM/DD/YYYY"
          ),
          gender: tripData?.travelUserDetailedInfo?.Gender,
          placeOfBirth: tripData?.travelUserDetailedInfo?.placeOfBirth,
          nationalityCode: "",
          address1: tripData?.travelUserDetailedInfo?.address1,
          address2: tripData?.travelUserDetailedInfo?.address2,
          address3: null,
          countryCode: tripData?.travelUserDetailedInfo?.citizenship,
          regionCode: "",
          provinceCode: tripData?.travelUserDetailedInfo?.province,
          cityCode: tripData?.travelUserDetailedInfo?.city,
          zipCode: tripData?.travelUserDetailedInfo?.zipCode,
          mobileNumber: tripData?.travelUserDetailedInfo?.mobileNumber,
          emailAddress: tripData?.travelUserDetailedInfo?.emailAddress,
        },
      },
      leadId: "",
      userId: login_user_data?.id,
     

      
    };
    console.log(formData?.policyHolder?.suffix,"suffix")

    let url = "user/add/travelPolicy";
    const res = await axiosRequest.post(url, formData);

    setShowScreenLoader(false);
    if (res.statusCode === -1) {
      setShowScreenLoader(false);
      if (res?.data.oonaPolicyResponse?.technicalControls &&
        res?.data.oonaPolicyResponse?.technicalControls?.length > 0) {
        const paymentRequiredError = res.data.oonaPolicyResponse.technicalControls.find(
           (control) => control.code === 1624 && control.error === "Payment is required"
         );  
         if (paymentRequiredError) {
           // Route to payment page
           history.push("/travel-policy-sucess");
         } else {
           // Route to travel-technical-control page
           history.push("/travel-technical-control");
         }
     }
      dispatch(setPolicyGeneratedInfo(res.data));
      dispatch(
        setQuotationDetails({
          ...res.data.oonaQuotationResponse,
          quotationId: res.data.quotationId,
          documentUploaded:res?.data?.documentUploaded,
        })
      );
      history.push("/travel-policy-sucess");
    } else if (res.statusCode === 4) {
      setShowScreenLoader(false);
      // message.warning("Uh-oh! We've tripped over a digital glitch. Please try again later.");
    } else {
      setShowScreenLoader(false);
      // message.error(res.data.message);
    }
    setShowScreenLoader(false);
  };

  useEffect(() => {
    getSubAgentName();
  }, []);
  const getSubAgentName = async () => {
    if (tripData?.travelPolicyData?.subAgents?.length > 0) {
      let login_user_data = stoageGetter("user");
      const channelCode = login_user_data?.channelCode;
      let agentCode = null;
      if (channelCode.channelCode !== "CH1") {
        agentCode = login_user_data?.agentCode;
      } else {
        agentCode = tripData?.travelPolicyData?.agent;
      }
      const subAgentId =
        tripData?.travelPolicyData?.subAgents[0]?.thirdPartyData?.documentCode;
      setShowScreenLoader(true);
      const url = `user/get/subagent-list?agentCode=${agentCode}`;
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {
        const selectedSubAgent = res?.data?.filter(
          (item) => item.documentCode == subAgentId
        );
        if (res?.data && Array.isArray(res.data && selectedSubAgent)) {
          setSubAgentName(selectedSubAgent[0]?.name);
        }
      }
      setShowScreenLoader(false);
    }
  };

  return (
    <>
      <div className="parent-element">
        <div className="left-side">
          <Button
            type="dashed"
            onClick={onChangetoDashboard}
            className="dashbtn"
          >
            <ArrowLeftOutlined />
            Back to dashboard
          </Button>
          <StepTravelThree />
        </div>
        <div className="rsright-side">
          <div className="right-container">
            <h2 className="heading1">
              One last look! Did we get everything right?
            </h2>

            <div className="travel-info">
              <h2 className="travel-heading">Travel Information</h2>
              <div className="data-container">
                <div className="rsRowgap">
                  <Row className="traveler" style={{ rowGap: "15px" }}>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Destination</div>
                        <div className="subheading">
                          {" "}
                          {tripData?.tripInfo?.countries.map((e) => (
                            <p style={{ marginBottom: "2px" }}>{e.NOM_PAIS}</p>
                          ))}
                          {/* {tripData?.tripInfo?.countries.map((e) => e.NOM_PAIS).join(",")} */}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Travel Package</div>
                        <div className="subheading">
                          {tripData?.tripInfo?.travelPackName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Currency</div>
                        <div className="subheading">
                          {tripData?.tripInfo?.currencyName}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Sum Insured</div>
                        <div className="subheading">
                          {" "}
                          {tripData?.tripInfo?.expensesCoverage}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading"> Departure Date</div>
                        <div className="subheading">
                          {" "}
                          {tripData?.tripInfo?.effectivityDate}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>

                <Row className="traveler" style={{ rowGap: "12px" }}>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Arrival Date</div>
                      <div className="subheading">
                        {" "}
                        {tripData?.tripInfo?.expirationDate}
                      </div>
                    </div>
                  </Col>

                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Trip Duration</div>
                      <div className="subheading">
                        {" "}
                        {tripData?.tripInfo?.tripDuration} days
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Itinerary</div>
                      <div className="subheading">
                        {tripData?.tripInfo?.itenerary}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">One Way Trip</div>
                      <div className="subheading">
                        {" "}
                        {tripData?.tripInfo?.oneTrip ? "Yes" : "No"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">COVID-19 Coverage</div>
                      <div className="subheading">
                        {tripData?.tripInfo?.withCovidCover == "false"
                          ? "No"
                          : "Yes"}
                      </div>
                    </div>
                  </Col>

                  {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Specify</div>
                    <div className="subheading">Reason</div>
                  </div>
                </Col> */}
                  {tripData?.tripInfo?.travelType !== "D" && (
                    <>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Cruise</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.withCruise == "false"
                              ? "No"
                              : "Yes"}
                          </div>
                        </div>
                      </Col>
                    </>
                  )}
                </Row>

                <Row className="traveler" style={{ rowGap: "15px" }}>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Coverage</div>
                      <div className="subheading">
                        {setCoverage(tripData?.tripInfo?.coverageType)}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Hazardous Sports</div>
                      <div
                        className="subheading"
                        style={{ width: "100%", whiteSpace: "break-spaces" }}
                      >
                        {tripData?.tripInfo?.hazardousSports == "false"
                          ? "No"
                          : tripData?.tripInfo?.hazardousSports}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Sports Equipment</div>
                      <div
                        className="subheading"
                        style={{ width: "100%", whiteSpace: "break-spaces" }}
                      >
                        {tripData?.tripInfo?.sportsEquipment == "false"
                          ? "No"
                          : tripData?.tripInfo?.sportsEquipment}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>

            {/* <div>
            <h6 className="travel-heading ">Product </h6>
          </div>
          <div>


                    {tripData?.tripInfo?.travelProductName && (
    <Button className="travel">
      {tripData.tripInfo.travelProductName}
    </Button>
  )}
          </div> */}
            <div>
              {tripData?.tripInfo?.travelProductName && (
                <>
                  <h6 className="travel-heading">Product</h6>

                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Button className="travel">
                      {tripData.tripInfo.travelProductName}
                    </Button>
                  </Col>
                </>
              )}
            </div>

            <div className="travel-info">
              <h2 className="travel-heading">Policy Holder Information</h2>
              <Row className="traveler" style={{ rowGap: "15px" }}>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">First Name</div>
                    <div className="subheading">
                      {tripData?.travelUserDetailedInfo?.firstName}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Middle Name</div>
                    <div className="subheading">
                      {tripData?.travelUserDetailedInfo?.middleName}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Last Name</div>
                    <div className="subheading">
                      {tripData?.travelUserDetailedInfo?.lastName}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Mobile Number</div>
                    <div className="subheading">
                      {tripData?.travelUserDetailedInfo?.mobileNumber}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Email Address</div>
                    <div className="subheading">
                      {tripData?.travelUserDetailedInfo?.emailAddress}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Birthdate</div>
                    <div className="subheading">
                      {moment(
                        tripData?.travelUserDetailedInfo?.birthDate
                      ).format("MM/DD/YYYY")}
                    </div>
                  </div>
                </Col>
                {suffixInSummary ? (
                  <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                    <div>
                      <div className="heading">Suffix</div>
                      <div className="subheading">
                        {suffixInSummary}
                      </div>
                    </div>
                  </Col>
                ) : null}
              </Row>
              <Row className="traveler" style={{ rowGap: "15px" }}>
                
               
                

                {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Gender</div>
                    <div className="subheading">
                     {tripData?.travelUserDetailedInfo?.Gender}
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Place of Birth</div>
                    <div className="subheading">
                     
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Citizenship</div>
                    <div className="subheading">
                     {tripData?.travelUserDetailedInfo?.citizenship}
                    </div>
                  </div>
                </Col>  */}
              </Row>
              {/* <Row  className="traveler" style={{ rowGap: "15px" }}>
              <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Province</div>
                    <div className="subheading">
                     {tripData?.travelUserDetailedInfo?.province}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">City</div>
                    <div className="subheading">
                     {tripData?.travelUserDetailedInfo?.city}
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Zip Code</div>
                    <div className="subheading">
                     
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Address Line 1</div>
                    <div className="subheading">
                     
                    </div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Address Line 2</div>
                    <div className="subheading">
                     
                    </div>
                  </div>
                </Col>
              </Row>  */}
            </div>
            <div className="travel-info">
              <h2 className="travel-heading">Traveler Information</h2>

              {tripData?.travelersInfo?.formValues?.map((e, i) => (
                <>
                  <h6 key={`${i}travelermap`} className="travelerNo">
                    Traveler {i + 1}
                  </h6>

                  <Row
                    kye={`${i}travelreinfomap`}
                    className="traveler"
                    style={{ rowGap: "15px" }}
                  >
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Complete Name</div>
                        <div className="subheading">{e.completeName}</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Birthdate</div>
                        <div className="subheading">
                          {moment(e.birthdate).format("MM/DD/YYYY")}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Passport Number</div>
                        <div className="subheading">{e.passportNumber}</div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Relationship</div>
                        <div className="subheading">
                          {setRelation(e.relationship)}
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Policy Holder</div>
                        <div className="subheading">
                          {i === 0 &&
                          tripData.travelersInfo.isPolicyHolder === "yes"
                            ? "Yes"
                            : "No"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </>
              ))}
            </div>
            <div className="travel-info">
              <h2 className="travel-heading">Travel Policy Data</h2>
              <div className="data-container">
                <Row className="traveler" style={{ rowGap: "15px" }}>
                  {tripData?.travelPolicyData?.commercial?.label && (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Commercial</div>
                        <div className="subheading">
                          {tripData?.travelPolicyData?.commercial?.label}
                        </div>
                      </div>
                    </Col>
                  )}
                  {tripData?.travelPolicyData?.agentName && (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Agent</div>
                        <div className="subheading">
                          {tripData?.travelPolicyData?.agentName}
                        </div>
                      </div>
                    </Col>
                  )}
                  {subAgentName && (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Sub Agent</div>
                        <div className="subheading">{subAgentName}</div>
                      </div>
                    </Col>
                  )}
                  {tripData?.travelPolicyData?.group?.label && (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Policy Group</div>
                        <div className="subheading">
                          {tripData?.travelPolicyData?.group?.label}
                        </div>
                      </div>
                    </Col>
                  )}
                  {tripData?.travelPolicyData?.contractNumber?.label && (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Contract Number</div>
                        <div className="subheading">
                          {tripData?.travelPolicyData?.contractNumber?.label}
                        </div>
                      </div>
                    </Col>
                  )}
                  {tripData?.travelPolicyData?.subContractNumber?.label && (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <div>
                        <div className="heading">Sub-Contract Number</div>
                        <div className="subheading">
                          {tripData?.travelPolicyData?.subContractNumber?.label}
                        </div>
                      </div>
                    </Col>
                  )}
                </Row>
              </div>
            </div>
            {/* <div className="btn">
            {isDetailsSubmitted ? (
              <>
                <Button className="prev-btn">Print</Button>
                <Button className="prev-btn" onClick={onClickFormalQuote}>
                  Make Formal Quote
                </Button>
                <Button className="nextbutton">
                  Buy Policy <ArrowRightOutlined />
                </Button>
              </>
            ) : (
              <div className="btn">
                <Button className="prev-btn">Edit Quote</Button>
                <Button className="nextbutton" onClick={showModal}>
                  Send Formal Quote
                  <ArrowRightOutlined />
                </Button>
                <Modal
                  className="modal-footer-content"
                  title=""
                  visible={isModalOpen}
                >
                  <div className="modal-title row-bottom-margin">
                    <h6>A formal quotation will be on its way to your inbox</h6>
                  </div>
                  <div className="modal-title2  row-bottom-margin">
                    Do you want to proceed with the provided details?
                  </div>
                  <div className="btn-popup">
                    <Button className="prev-btn">Edit Details</Button>
                    <Button className="nextbutton" onClick={onModalYesClick}>
                      Yes <ArrowRightOutlined />
                    </Button>
                  </div>
                </Modal>
              </div>
            )}
          </div> */}
            <div className="btnParentDiv">
              <Button className="back_btn" onClick={onClickBack}>
                Back
              </Button>
              <Button onClick={proceedPolicy} className="confirm_btn">
                Proceed <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "3rem" }}>
        <PolicyFooter />
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
