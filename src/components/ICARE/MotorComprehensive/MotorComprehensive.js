import React, { useState, useEffect } from "react";
import "./MotorComprehensive.css";
import { Row, Col, Button, Radio, Form, Input, message } from "antd";
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import StepOne from "./components/StepBar/StepOne/StepOne";
//import { CloseIcon, CheckIcon } from '@ant-design/icons';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import FullPageLoader from "../../FullPageLoader/FullPageLoader";
import axiosRequest from "../../../axios-request/request.methods";
import { stoageGetter } from "../../../helpers";
// import PolicyDetails from "./components/PolicyDetails";
// import PaymentDetails from "./components/PaymentDetails";
// import CustomerDetails from "./components/CustomerDetails";
//import * as actions from "../../../../store/actions";
// import PolicyDetails from './PolicyDetails';
import MotorPolicyPage from "../../ICARE/MotorComprehensive/MotorPolicyPage/motorlandingpage";
const MotorComprehensive = (props) => {
  // hooks ***************
  const { id } = stoageGetter("user");
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [size, setSize] = useState("default"); // default is 'middle'
  const [value1, setValue1] = useState("yes");
  const [quotationNum, setQuotationNum] = useState("");
  const [travelType, setTravelType] = useState("");
  const [selectedButton, setSelectedButton] = useState(null);
  const [policyTypeList, setPolicyTypeList] = useState([]);
  const [activeButton, setActiveButton] = useState(true);
  const [openloader, setOpenloader] = useState(false);
  // console.log("activeButton", activeButton);
  const [loader, setLoader] = useState(false);
  const [quotNumErr, setQuotNumError] = useState("");

  const handleButtonClick = (buttonIndex) => {
    // console.log("buttonIndex", buttonIndex);
    setActiveButton(buttonIndex);
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };
  const onChange1 = (e) => {
    setValue1(e.target.value);
  };

  useEffect(() => {
    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));
  }, []);

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  const test2 = useSelector((state) => state);
  console.log("tesTTTTTTTTTTTTTTTTTTTTt2", test2);

  // function
  const backButtonFunction = () => {
    setValue1("no");
  };
  const onChangeQuotationNum = (e) => {
    // console.log("new", e.target.value);
    setQuotationNum(e.target.value);
  };

  const saveDataToRedux = (data) =>{
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
  }


  const onchangetoNext = async () => {
    if (activeButton == false) {
      history.push("/price-check-info");
    } else {
      // if (!quotationNum || quotationNum === "")
      //   return message.error("Please Enter the document code");
      const regex2 = /^[0-9]+$/;
      if (!quotationNum || quotationNum === "") {
        setQuotNumError("Quotation Number is required.");
        return;
      } else if (!regex2.test(quotationNum)) {
        setQuotNumError("Only number allowed.");
        return;
      } else {
        setQuotNumError("");
      }

      setLoader(true);

      let result = await axiosRequest.get(
        `user/getQuotation/${id}?quotationNumber=${quotationNum}&LOB=Motor`,
        { secure: true }
      );
      setLoader(false);
      console.log("result", result);
      if(!result?.data || result?.statusCode !== -1){
        message.error("No Quotation found")
        return;
      }

      // console.log(
      //   "hey123",
      //   result?.data[0][0]?.motor_comprehensive?.policyHolder?.documentCode
      // );
      let allQuotaioMotor = {
        errCode: -1,
        errMsg: result.data[0][0],
      };

      dispatch(actions.motorFormalQuotationForm(allQuotaioMotor));
      saveDataToRedux(allQuotaioMotor?.data);
      const documentId = allQuotaioMotor?.data?.documentId;
      dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
  
  // return;
      if (result?.statusCode === -1) {
        if (
          result?.data[0][0].oonaQuotationResponse.technicalControls.length >
          0
        ) {
          history.push("/motor-technical-control");
          setLoader(false);
        } else if (
          !result?.data[0][0].QC_status === "Not Required" &&
          !result?.data[0][0].QC_status === "Approved"
        ) {
          history.push("/risk-inspection-required");
          // history.push("/motor-convert-policy");
          setLoader(false);
        } else {
          if (
            result?.data[0][0]?.motor_comprehensive?.policyHolder
              ?.documentCode
          ) {
            history.push("/motor-confirm-page");
            setLoader(false);
          } else {
            history.push("/motor-convert-policy");
            setLoader(false);
          }
        }

        // else {
        //   history.push("/risk-inspection-required");
        //   setLoader(false);
        // }
      } else {
        message.error("No formal quotation found with the given ID");
        setLoader(false);
      }
    }
  };

  return (
    <>
      <div className="main-class">
        <Row gutter={16} className="policy-header">
          <Col xs={24} sm={24} md={6} lg={6} xl={6}>
            <div>
              <Button
                className="dashboard-button"
                icon={<ArrowLeftOutlined />}
                size={size}
                onClick={onChangetoDashboard}
              >
                {" "}
                Back to Dashboard{" "}
              </Button>
            </div>
            <div className="mobileStep">
              <StepOne />
            </div>
          </Col>

          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <div className="right-side">
              <div className="policy-type">
                <h2>Do you have an existing quotation?</h2>
              </div>

              <div className="button-prop">
                <div className=""></div>
                <Button
                  className={`${
                    activeButton === true
                      ? "activeforMotorButton"
                      : "buttonYesNo"
                  }`}
                  onClick={() => handleButtonClick(true)}
                  icon={
                    <CheckIcon
                      style={{ color: "#5BA46A", marginRight: "1rem" }}
                    />
                  }
                >
                  Yes
                </Button>
                {/* <Button type="primary" className={`button ${activeButton === 1 ? 'active' : ''}`}
                    onClick={() => handleButtonClick(1)} icon={<DownloadOutlined />} >
                      Download
                      </Button> */}
                <Button
                  className={`${
                    activeButton === false
                      ? "activeforMotorButton"
                      : "buttonYesNo"
                  }`}
                  onClick={() => handleButtonClick(false)}
                  icon={
                    <CloseIcon
                      style={{ color: "#BB251A", marginRight: "1rem" }}
                    />
                  }
                >
                  No
                </Button>
              </div>
              <div>
                {activeButton === true ? (
                  <>
                    <Row gutter={16} style={{ marginTop: "15px" }}>
                      <Col xs={24} sm={24} md={12} lg={10} xl={10}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          name="quotationNumber"
                          label="Quotation Number"
                          rules={[
                            {
                              required: true,
                              message: "Quotation Number is required",
                            },
                          ]}
                        >
                          <Input
                            className="first-name input-box"
                            size="large"
                            maxLength="20"
                            placeholder="Enter Quotation Number"
                            value={quotationNum}
                            // defaultValue="YHTH686HB7BN"
                            onChange={(e) => {
                              onChangeQuotationNum(e);
                              const inputValue = e.target.value;
                              const regex2 = /^[0-9]+$/;
                              if (!inputValue) {
                                setQuotNumError(
                                  "Quotation Number is required."
                                );
                              } else if (!regex2.test(inputValue)) {
                                setQuotNumError("Only number allowed.");
                              } else {
                                setQuotNumError("");
                              }
                            }}
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
                  <div style={{ marginTop: "10px" }}>
                    <MotorPolicyPage />
                  </div>
                )}
              </div>
              {activeButton === true ? (
                <>
                  <div className="button-header">
                    <Button
                      className="next-button"
                      size={size}
                      onClick={onchangetoNext}
                    >
                      Proceed <ArrowRightOutlined />
                    </Button>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
        <FullPageLoader fromapploader={loader} />
      </div>
    </>
  );
};

export default MotorComprehensive;
