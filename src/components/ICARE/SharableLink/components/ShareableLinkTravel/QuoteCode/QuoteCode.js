import React, { useEffect, useState } from "react";
import "./QuoteCode.css";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Radio,
  Form,
  Input,
  Select,
  message,
  Image,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import FullPageLoader from "../../../../../FullPageLoader/FullPageLoader";
import PolicySelection from "../../../components/ShareableLinkTravel/PolicySelection/PolicySelection";
import axiosRequest from "../../../../../../axios-request/request.methods";
import StepTravelOne from "../StepBarTravel/StepTravelOne/StepTravelOne";
import { useDispatch } from "react-redux";
import { stoageGetter } from "../../../../../../helpers";
import {
  setTravelInfo,
  setTravelPolicyDetails,
  setTravelUserDetails,
  setQuotationDetails,
} from "../../../../../../store/actions/travel";
import img1 from "../../../../../../images/sideBar/tap 1.png";
import { DrawerFunction } from "../../../../../../components/ICARE/MotorComprehensive/MotorPolicyPage/MotorPolicyPage";
import Header from "../../SampleHeader/Header";

export default function QuoteCode() {
  let  login_user_data = stoageGetter("user")

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const { id  } = stoageGetter("user");
  let loginUserID = id;
  console.log(login_user_data,"login_user_data----->>>>")
  var channelCode = login_user_data.channelCode.channelCode

  const [value, setValue] = useState("yes");
  const [documentCode, setDocumentCode] = useState("");
  const [travelType, setTravelType] = useState("");
  const [policyTypeList, setPolicyTypeList] = useState([]);
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );
  const [openloader, setOpenloader] = useState(false);
  const [quotNumErr, setQuotNumError] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const onChangetoDashboard = () => {
    history.push("/quotation-policy-tabs");
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

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
            data?.travel_information?.travelData?.countries[0]?.type,
        },
      ],
      travelPack: data?.travel_information?.travelData?.travelPack,
      travelPackName: data?.travel_information?.travelData?.travelPackName,
      travelType: data?.travel_information?.travelData?.travelType,
      // travelTypeName: data?.travel_information?.travelData?.travelTypeName,
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
      itenerary: data?.travel_information?.travelData?.itenerary,
    };
    dispatch(setTravelInfo(travelInfo));

    const travelPolicy = {
      group: data?.travel_information?.policyGroupCodeName,
      subContractNumber: data?.travel_information?.subContractCodeName,
      commercial: data?.travel_information?.branchCode,
      agent: data?.travel_information?.agentCode,
    };
    dispatch(setTravelPolicyDetails(travelPolicy));

    const travelPolicyHolder = {
      firstName: data?.travel_information?.policyHolder?.firstName,
      lastName: data?.travel_information?.policyHolder?.lastName,
      mobile: data?.travel_information?.policyHolder?.mobileNumber,
      email: data?.travel_information?.policyHolder?.emailAddress,
    };
    dispatch(setTravelUserDetails(travelPolicyHolder));
  };

  const QuoteNext = async () => {
    if (value === "no") {
      if (travelType === "Group") {
        history.push("customer/travel-bulkUpload");
        return;
      } else if (travelType === "Individual") {
        history.push("customer/travel-info");
        return;
      }
    } else {
      const regex2 = /^[0-9]+$/;
      if (!documentCode || documentCode === "") {
        setQuotNumError("Quotation Number is required.");
        return;
      } else if (!regex2.test(documentCode)) {
        setQuotNumError("Only number allowed.");
        return;
      } else {
        setQuotNumError("");
      }

      setOpenloader(true);
      let result = await axiosRequest.get(
        `user/getQuotation/${loginUserID}?quotationNumber=${documentCode}`,
        { secure: true }
      );
      setOpenloader(false);

      if (
        result.statusCode === -1 &&
        result?.data[0][0]?.oonaQuotationResponse
      ) {
        if (
          result?.data[0][0].oonaQuotationResponse.technicalControls.length >
          0
        ) {
          history.push("customer/travel-quotation-failed");
          return;
        }
        dispatch(
          setQuotationDetails({
            ...result?.data[0][0]?.oonaQuotationResponse,
            quotationId: result?.data[0][0]?.quotationId,
          })
        );
        saveDataToRedux(result?.data[0][0]);
        history.push("/customer/travel/success");
        // } else if (result?.statusCode !== -1 && result?.data[0][0]?.message) {
        //   message.error(result?.data[0][0]?.message);
      } else {
        // message.error(result?.data[0][0]?.message);
        message.error("No formal quotation found with the given ID.");
      }

      //   if(result?.statusCode === -1){
      //   setOpenloader(false);
      //   history.push("./customer-detail");
      // }else {
      //     setOpenloader(false);
      //     // message.error("Something Went ");
      //   }
    }
  };
  const handleButtonClick = () => {
    setValue("yes");
  };
  const handleNoClick = () => {
    setValue("no");
  };

  const getProductList = async () => {
    setOpenloader(true);
    const res = await axiosRequest.get("user/productList?product=TRAVEL");
    setOpenloader(false);
    if (res.statusCode === -1) {
      if (res?.data?.data) {
        setPolicyTypeList(res.data.data);
      }
    } else {
      message.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     // Check if the screen is in portrait or landscape mode
  //     const newIsPortrait = window.innerHeight > window.innerWidth;
  //     setIsPortrait(newIsPortrait);
  //   };

  //   // Add a 'resize' event listener to track screen dimension changes
  //   window.addEventListener('resize', handleResize);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  const onClose = () => {
    setShowDrawer(false);
  };
  const handledrawerOpen = () => {
    setShowDrawer(true);
  };

  return (
    <>
      <Header />
      <FullPageLoader fromapploader={openloader}></FullPageLoader>
      <div className="main-classes">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Home{" "}
              </Button>
            </div>
            <div className="rstravelcondition">
              <StepTravelOne />
            </div>
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="right-sides">
              {/* <div className="policy">
                <h2>Let’s get started with some important details</h2>
              </div> */}
              <div className="questionDiv">
                <ul>
                  <li>
                    <h3>Do you have an existing quotation? </h3>
                    {/* <Radio.Group  onChange={onChange} value={value}>
                      <Radio className="radioValues" value="yes">
                        Yes
                      </Radio >
                      <Radio className="radioValues" value="no">
                        No
                      </Radio>
                    </Radio.Group> */}
                  </li>
                </ul>
              </div>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Button
                    className={`yes ${value === "yes" ? "yes-active" : ""}`}
                    onClick={handleButtonClick}
                  >
                    {" "}
                    <CheckIcon
                      style={{ color: "#5BA46A", marginRight: "1rem" }}
                    />
                    Yes
                  </Button>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Button
                    className={`yes ${value === "no" ? "yes-active" : ""}`}
                    onClick={handleNoClick}
                  >
                    {" "}
                    <CloseIcon
                      style={{ color: "#BB251A", marginRight: "1rem" }}
                    />
                    No
                  </Button>
                </Col>
              </Row>
              {value === "yes" ? (
                <>
                  <Row style={{ marginTop: "20px" }}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="Document Code"
                        label="Quotation Number"
                        value={documentCode}
                        rules={[
                          {
                            required: true,
                            message: "Quotation Number is required",
                          },
                        ]}
                        onChange={(e) => {
                          setDocumentCode(e.target.value);
                          const inputValue = e.target.value;
                          const regex2 = /^[0-9]+$/;
                          if (!inputValue) {
                            setQuotNumError("Quotation Number is required.");
                          } else if (!regex2.test(inputValue)) {
                            setQuotNumError("Only number allowed.");
                          } else {
                            setQuotNumError("");
                          }
                        }}
                      >
                        <Input
                          className="input"
                          size="default"
                          placeholder="Quotation Number"
                        />
                        {quotNumErr && (
                          <div
                            className="error-message"
                            style={{ color: "red" }}
                          >
                            {quotNumErr}
                          </div>
                        )}
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : (
                <PolicySelection
                  policyTypeList={policyTypeList}
                  setTravelType={setTravelType}
                  travelType={travelType}
                  QuoteNext={QuoteNext}
                />
              )}
              <Row>
              {/* <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                  <div
                    className="product1-tap1-container"
                    onClick={handledrawerOpen}
                  >
                    <div>
                      <p>Send this link if your client wants to fill out the form</p>
                      <span>{`Please tap here to `}</span>
                      <b>view shareable links</b>
                      <span> as per your commercial structure</span>
                    </div>
                    <div className="circleforpan1">
                      <img className="product1-icon-img1" alt="" src={img1} />
                    </div>
                  </div>
                </Col> */}
                {/* <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                  <div className="product1-or-text123">OR</div>
                </Col> */}
              
               
                <DrawerFunction onClose={onClose} showDrawer={showDrawer} />
              </Row>
              <Button className="nxt-btn" onClick={QuoteNext}>
                Proceed <ArrowRightOutlined />
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
