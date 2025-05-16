import React, { useState } from "react";
import "./CustomerDetail.css";
import { useHistory } from "react-router-dom";
import { Row, Col, Modal, message, Spin } from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axiosRequest from "../../../../../../axios-request/request.methods";
import { Button } from "antd";
import StepTravelOne from "../StepBarTravel/StepTravelOne/StepTravelOne";
import { useDispatch, useSelector } from "react-redux";
import { stoageGetter } from "../../../../../../helpers";
import { setQuotationDetails } from "../../../../../../store/actions/travel";
import TravelFooter from "../TravelFooter/TravelFooter";
import moment from "moment";
import { useEffect } from "react";
import Header from "../../SampleHeader/Header";


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default function CustomerDetail() {
  let login_user_data = stoageGetter("user");
  const sampletripData = useSelector((state) => state?.JWTDecrypt?.JWTDecryptData?.formData?.userData);
  const Tokendata = useSelector((state) => state?.JWTDecrypt?.JWTDecryptData?.formData?.tokenData);
  console.log(Tokendata,sampletripData,"sampletripData")
  const getAgentCode = sampletripData?.agentCode;
  const getchannelCode = sampletripData?.channelCode?.channelCode;
  const userID = Tokendata.userId

  const TEST = useSelector((state) => state);
  const tripData = useSelector((state) => state?.trip);
  const documentId = tripData?.tripInfo?.documentId;

  const dispatch = useDispatch();

  const [showScreenLoader, setShowScreenLoader] = useState(false);
  const [subAgentName, setSubAgentName] = useState("");

  const JWPDecryption = useSelector((state) => state);
  const GetAgentCodeFromJWT = JWPDecryption?.JWTDecrypt?.JWTDecryptData?.formData
  const commercialStructure = GetAgentCodeFromJWT?.tokenData?.commercialStructureCode;
  console.log("commercialStructure---", commercialStructure);

  const history = useHistory();
  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  const onClickBackbtn = () => {
    history.push("/customer/travel-policy-holder");
  };
  // const getDocumentId = async () => {
  //   const data = await axiosRequest.get("user/getDocumentId");
  //   if (data.statusCode === -1) {
  //     return data?.data?.documentId;
  //   }
  // };

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

  const onClickConfirm = async () => {
    setShowScreenLoader(true);
    const url = `user/travel-quotation`;
    // const documentId = await getDocumentId();
    if (!documentId) {
      message.error("Unable to generate document Id");
      return;
    }
    const productCode = await getProductCode(tripData?.tripInfo?.travelPackName, tripData?.tripInfo?.currency, tripData?.tripInfo?.travelProductName, tripData?.tripInfo?.expensesCoverage)
    if (!productCode) {
      setShowScreenLoader(false);
      return message.error('Unable to generate product code')
    }
    const formData = {
      travel_information: {
        effectivityDate: tripData?.tripInfo?.effectivityDate, // effectivityDate More Tha Expiray date //departrue
        // effectivityDate: "12/10/2023",
        expirationDate: tripData?.tripInfo?.expirationDate, //arrival
        // expirationDate: "12/20/2023",
        paymentPlanCode: "1", //Always Send "1" Hardoded
        policyGroupCodeName: tripData?.travelPolicyData?.group?.label ?? "",
        documentId: documentId,
        contractCodeName: tripData?.travelPolicyData?.contractNumber?.label || '',
        policyGroupCode: tripData?.travelPolicyData?.group?.value || "", // ======================> SEND "" / null   Don't send other value  it is OPTIONAL Field
        contractCode: tripData?.travelPolicyData?.contractNumber?.value || null, // ======================> Send  ====> 0 / null   Don't send other value it is OPTIONAL Field
        subContractCode: tripData?.travelPolicyData?.subContractNumber?.value || null, // ======================> Send  ====> 0 / null   Don't send other value it is OPTIONAL Field
        subContractCodeName:
          tripData?.travelPolicyData?.subContractNumber?.label ?? "",
        agentCode: Number(
          getchannelCode === "CH1"
            ? tripData?.travelPolicyData.agent
              ? tripData?.travelPolicyData.agent
              : getAgentCode
            : getAgentCode
        ),
        subAgents: tripData?.travelPolicyData?.subAgents,
        // agentCode: 0,
        branchCode:commercialStructure, // ===================>          SEND====> 0 / null   Don't send other value it is OPTIONAL Field
        userCode: login_user_data?.employeeCode, // =======================>          SEND====> "" / null   Don't send other value it is OPTIONAL Field
        // userCode: "APIXUSR",
        timestamp: moment().format("MM/DD/YYYY"),
        // ===========================>         Required/*IMPORATANT
        //  timestamp: "07/10/2023",
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
          purposeTrip: "", //Required/*IMPORATANT
          othersDescription: "",
          oneTrip: tripData?.tripInfo?.oneTrip,
          withCruise: tripData?.tripInfo?.withCruise,
          withCovidCover: tripData?.tripInfo?.withCovidCover,
          sportsEquipment: tripData?.tripInfo?.sportsEquipment,
          hazardousSports: tripData?.tripInfo?.hazardousSports,
          coverageOption: tripData?.tripInfo?.coverageOption, //Required/*IMPORATANT    SEND PRODUCT CODE AS DISCUSSED
          coverageOptionName: tripData?.tripInfo?.coverageOptionName,
          expensesCoverage: tripData?.tripInfo?.expensesCoverage, //Required/*IMPORATANT
          coverageType: tripData?.tripInfo?.coverageType, //Required/*IMPORATANT
          // maxAgeLimit:  tripData?.tripInfo?.ageOfEldest, //Required/*IMPORATANT
        //   maxAgeLimit: tripData?.tripInfo?.ageOfEldest || "",
          maxAgeLimit: tripData?.tripInfo?.ageOfEldest?.max ? tripData?.tripInfo?.ageOfEldest?.max : tripData?.tripInfo?.ageOfEldest,
          beneficiaries: [],
          tripDuration: tripData?.tripInfo?.tripDuration,
          documentId: documentId,
          itenerary: tripData?.tripInfo?.itenerary,
        },
        policyHolder: {
          firstName: tripData?.travelUserInfo?.firstName,
          mobileNumber: tripData?.travelUserInfo?.mobile,
          lastName: tripData?.travelUserInfo?.lastName,
          emailAddress: tripData?.travelUserInfo?.email,
        },
      },
      leadId: login_user_data?.id,
      userId: userID,
    };

    console.log("commercialStructureCode", formData);
 
    const res = await axiosRequest.post(url, formData);
    setShowScreenLoader(false);
    if (res.statusCode === -1 && res?.data?.oonaQuotationResponse) {
      let storeAllRes = res?.data
      if (res.data.oonaQuotationResponse.technicalControls.length > 0) {
        dispatch(
          setQuotationDetails({
            storeAllRes,
          })
        );
        history.push('/customer/travel-quotation-failed')
        return;
      }
      // dispatch(setQuotationDetails({...res.data.oonaQuotationResponse, documentId, quotationId : res.data.quotationId}))
      dispatch(
        setQuotationDetails({
          storeAllRes,
          ...res.data.oonaQuotationResponse,
          quotationId: res.data.quotationId,
        })
      );
      history.push("/customer/travel/success");
    } else if (res?.statusCode !== -1 && res?.data?.message) {
      message.error(res?.data?.message);
    } else {
      message.error(res?.data?.message);
      // message.error("something went wrong");
    }
    setShowScreenLoader(false);
  };
  // const onModalYesClick = () => {
  //   setIsDetailsSubmitted(true);
  //   setIsModalOpen(false);

  // };
  useEffect(() =>{
    getSubAgentName();
  }, [])
  const getSubAgentName = async () => {
    if(tripData?.travelPolicyData?.subAgents?.length > 0){
      let login_user_data = stoageGetter("user");
      // const channelCode = login_user_data?.channelCode;
      let agentCode = null;
      if(getchannelCode !== "CH1"){
        agentCode = getAgentCode;
      } else {
        agentCode = tripData?.travelPolicyData?.agent
      }
      const subAgentId = tripData?.travelPolicyData?.subAgents[0]?.thirdPartyData?.documentCode;
      setShowScreenLoader(true)
      const url = `user/get/subagent-list?agentCode=${getAgentCode}`;
      const res = await axiosRequest.get(url);
      if (res.statusCode === -1) {
        const selectedSubAgent = res?.data?.filter((item) => item.documentCode == subAgentId)
        if (res?.data && Array.isArray(res.data && selectedSubAgent)) {
          setSubAgentName(selectedSubAgent[0]?.name);
        }
      }
      setShowScreenLoader(false)
    }
    };


  return (
    <>
    <Header/>
      <div className="parent-element">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div className="left-side">
              <Button
                type="dashed"
                onClick={onChangetoDashboard}
                className="dashbtn"
              >
                <ArrowLeftOutlined />
                Back to Home
              </Button>
              <StepTravelOne />
            </div>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18} xl={18}>
            <div className="right-side">
              <div className="right-container">
                <h2 className="RsInfo">
                  One last look! Did we get everything right?
                </h2>
                <div className="travel-info">
                  <h2 className="travel-heading">Travel Information</h2>
                  <div className="data-container">
                    <Row className="traveler data1Travel" style={{ rowGap: "15px" }}>
                      {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Destination</div>
                    <div className="subheading">
                      {tripData?.tripInfo?.countries.map((e) => e.NOM_PAIS)}

                    </div>
                  </div>
                </Col> */}
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Destination</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.countries.map((e, index) => (
                              <React.Fragment key={index}>
                                {e.NOM_PAIS}
                                {index !==
                                  tripData.tripInfo.countries.length - 1 &&
                                  ", "}
                              </React.Fragment>
                            ))}
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
                          <div className="heading">Sum insured</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.expensesCoverage}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading"> Departure Date</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.effectivityDate}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <Row className="traveler data2Travel" style={{ rowGap: "15px" }}>

                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading"> Arrival Date</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.expirationDate}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Trip Duration</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.tripDuration} days
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">One Way Trip</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.oneTrip ? "Yes" : "No"}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">COVID-19 Coverage</div>
                          <div className="subheading">
                            {tripData?.tripInfo?.withCovidCover == "false" ? "No" : "Yes"}
                          </div>
                        </div>
                      </Col>
                      {tripData?.tripInfo?.travelType !== "D" && (
                        <>
                          <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                            <div>
                              <div className="heading">Cruise</div>
                              <div className="subheading">
                                {tripData?.tripInfo?.withCruise == "false" ? "No" : "Yes"}
                              </div>
                            </div>
                          </Col>
                        </>
                      )}
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Hazardous Sports</div>
                          <div className="subheading" style={{ width: '100%' }}>{tripData?.tripInfo?.hazardousSports !== "false" ? tripData?.tripInfo?.hazardousSports : "No"}</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Sports Equipment</div>
                          <div className="subheading" style={{ width: '100%' }}>{tripData?.tripInfo?.sportsEquipment !== "false" ? tripData?.tripInfo?.sportsEquipment : "No"}</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">
                      Age Range of Eldest Insured Traveler
                    </div>
                    <div className="subheading">{ tripData?.tripInfo?.agerange}</div>
                  </div>
                </Col>
                    </Row>

                    {/* <Row className="traveler">
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Cruise</div>
                    <div className="subheading">Yes</div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">COVID-19 Coverage</div>
                    <div className="subheading">Yes</div>
                  </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Coverage</div>
                    <div className="subheading">Individual</div>
                  </div>
                </Col>
             
              </Row> */}
                  </div>
                </div>
                {tripData?.tripInfo?.travelProductName ? (
                  <>
                    <h6 className="travel-heading ">Product </h6>

                    <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Button className="travel">
                        {tripData?.tripInfo?.travelProductName}
                      </Button>
                    </Col>
                  </>
                ) : (
                  ""
                )}
                <div className="travel-info">
                  <h2 className="travel-heading">Policy Holder Information</h2>
                  <div className="data-container">
                    <Row className="traveler" style={{ rowGap: "15px" }}>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">First Name</div>
                          <div className="subheading">
                            {tripData?.travelUserInfo?.firstName}
                          </div>
                        </div>
                      </Col>
                      {/* <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Middle Name</div>
                    <div className="subheading">{tripData?.travelUserInfo?.lastName}</div>
                  </div>
                </Col> */}
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Last Name</div>
                          <div className="subheading">
                            {tripData?.travelUserInfo?.lastName}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Mobile Number</div>
                          <div className="subheading">
                            {tripData?.travelUserInfo?.mobile}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                        <div>
                          <div className="heading">Email Address</div>
                          <div className="subheading">
                            {tripData?.travelUserInfo?.email}
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    </Row>
                  </div>
                </div>
              {/* <div className="travel-info">
                <h2 className="travel-heading">Travel Policy Data</h2>
                <div className="data-container">
                    <Row className="traveler" style={{ rowGap: "15px" }}>
                    {
                      tripData?.travelPolicyData?.commercial?.label && 
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Commercial</div>
                    <div className="subheading">
                    {tripData?.travelPolicyData?.commercial?.label}
                    </div>
                  </div>
                </Col>
                }
                    {
                      tripData?.travelPolicyData?.agentName && 
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Agent</div>
                    <div className="subheading">
                    {tripData?.travelPolicyData?.agentName}
                    </div>
                  </div>
                </Col>
                }
                                {
                  subAgentName && 
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Sub Agent</div>
                    <div className="subheading">
                    {subAgentName}
                    </div>
                  </div>
                </Col>
                }
                    {
                      tripData?.travelPolicyData?.group?.label && 
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Policy Group</div>
                    <div className="subheading">
                    {tripData?.travelPolicyData?.group?.label}
                    </div>
                  </div>
                </Col>
                }
                
                {
                  tripData?.travelPolicyData?.contractNumber?.label && 
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Contract Number</div>
                    <div className="subheading">
                    {tripData?.travelPolicyData?.contractNumber?.label}
                    </div>
                  </div>
                </Col>
                }
                {
                  tripData?.travelPolicyData?.subContractNumber?.label && 
                <Col xs={12} sm={12} md={4} lg={4} xl={4}>
                  <div>
                    <div className="heading">Sub-Contract Number</div>
                    <div className="subheading">
                    {tripData?.travelPolicyData?.subContractNumber?.label}
                    </div>
                  </div>
                </Col>
                }
                </Row>
                </div>
            </div> */}
                {/* <div className="btn">
            {isDetailsSubmitted ? (
              <>
                 <Button className="prev-btn">Print</Button>
                <Button className="nextbutton" onClick={onClickFormalQuote}>
                  Make Formal Quote <ArrowRightOutlined />
                </Button>
                <Button className="prev-btn">
                  Buy Policy <ArrowRightOutlined />
                </Button>


              </>
            ) : (
              <div className="btn">
                <Button className="prev-btn">Edit Info</Button>
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
                    <h6>A quick quotation will be on its way to your inbox</h6>
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
                <Button className="confirm_btn" onClick={onClickConfirm}>
                    Confirm Details <ArrowRightOutlined />
                  </Button>
                  <Button className="back_btn" onClick={onClickBackbtn}>
                    Back
                  </Button>
                  
                </div>
              </div>
            </div>
          </Col>
        </Row>
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
