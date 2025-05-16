import React, { useState, useEffect, useLayoutEffect } from "react";
import "./CoverageQuote.css";
import { useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Checkbox,
  Radio,
  Card,
  Select,
  Option,
  Form,
  Progress,
  Input,
  DatePicker,
  Upload,
  message,
} from "antd";
import _ from "lodash";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
// import AutoSelectCompletion from "../components/AutoSelectCompletion";
import StepTwo from "../components/StepBar/StepTwo/StepTwo";
import QuickQuoteFooter from "../MotorFormFooter/QuickQuoteFooter/QuickQuoteFooter";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../store/actions/index";
import axiosRequest from "../../../../axios-request/request.methods";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import NoDataCard from "../NoDataCard/NoDataCard";
import { buttonBaseClasses } from "@mui/material";
import WithoutApproxFooter from "../MotorFormFooter/QuickQuoteFooter/WithoutApproxFooter";
// import { valueContainerCSS } from "react-select/dist/declarations/src/components/containers";

let payload = {};
let selectedCheckboxValues = [];
const CoverageQuote = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'
  const [openloader, setopenloader] = useState(false);
  const [currentButton, setCurrentButton] = useState(null);
  const [show, setShow] = useState(false);
  const [coverageIndex, setCoverageIndex] = useState(null);

  const [openDropdowns, setOpenDropdowns] = useState({});

  const [currentCheckboxButton, setCurrentCheckboxButton] = useState(null);
  // console.log("currentCheckboxButton", currentCheckboxButton);
  const [showCheckbox, setShowCheckbox] = useState(false);

  const [sumInssuredOption, setSumIssuredOption] = useState(null);

  const [finalPayload, setFinalPayload] = useState(null);

  const [finalPayloadCheckbox, setFinalPayloadCheckbox] = useState([]);

  const [sumIssuredPayload, setSumIssuredPayload] = useState("");
  // console.log("sumIssuredPayload", sumIssuredPayload);

  const [visibleRecalculate, setVisibleRecalculate] = React.useState(false);
  const [visibleNext, setVisibleNext] = React.useState(true);
  const [coverageOptions, setCoverageOptions] = useState([]);

  const [mvFileNumber, setMvFileNumber] = useState("");
  // const [coveragesFormData, setCoveragesFormData] = React.useState("");
  console.log("mvFileNumber", mvFileNumber);
  const confirmTest = useSelector((state) => state);
  // console.log("test2", confirmTest);

  var quotationNumber =
    confirmTest?.motorQuotation?.motorQutotionSucess?.data
      ?.oonaQuotationResponse?.quotationNumber;

  const CoverageQuote = useSelector((state) => state?.motorQuotation?.formData);
  // console.log("CoverageQuote", CoverageQuote);

  const test = useSelector(
    (state) => state?.motorQuotation?.formData?.vehicleData
  );

  const newObj = { ...CoverageQuote };
  delete newObj.nonStandardaccessories;
  delete newObj.isReconditioned;
  delete newObj.datePurchased;
  delete newObj.selectcontractName;
  delete newObj.selectsubContractName;

  // console.log("newObj", newObj);
  // console.log("mainObj", CoverageQuote);
  const nonStandardAccessories = useSelector(
    (state) => state?.motorQuotation?.formData?.nonStandardaccessories
  );

  const dropDownData = useSelector(
    (state) => state?.checkbox?.checkboxStateInfo
  );
  // console.log("dropDownData", dropDownData);

  const fileNumber = useSelector(
    (state) => state?.motorQuotation?.formData?.vehicleData?.fileNumber
  );
  // console.log("fileNumber", fileNumber);

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  useEffect(() => {
    // dispatch(actions.fetchAllGenerateCoverages());
    coverageData(quotationNumber);
  }, [dispatch]);
  const coverageData = async (quotationNo) => {
    setopenloader(true);
    let result = await axiosRequest.post("user/motor/generate-coverage", {
      // quotationNo: "9990000622979",
      quotationNo: quotationNo,
    });

    setopenloader(false);
    if (result?.statusCode === -1) {
      setopenloader(false);
      dispatch(actions.fetchAllGenerateCoverages(result));
      setopenloader(false);
    }
  };

  let coveragesApi = useSelector(
    (state) => state?.motorCoverage?.generateCoverages?.data?.coverages
  );
  // console.log("coveragesApi", coveragesApi);

  // let coverageOptions =
  //   coveragesApi && !_.isEmpty(coveragesApi)
  //     ? coveragesApi?.map((COVERAGES) => {
  //         const label = COVERAGES.coverageName;
  //         const value = COVERAGES.coverage;
  //         // const key = city.COD_LOCALIDAD;
  //         const newCoverages = { ...COVERAGES, label, value };
  //         return newCoverages;
  //       })
  //     : null;

  useEffect(() => {
    if (coveragesApi && !_.isEmpty(coveragesApi)) {
      setCoverageOptions([]);
      const newCoverageOptions = coveragesApi.map((COVERAGES) => {
        const label = COVERAGES.coverageName;
        const value = COVERAGES.coverage;

        return { ...COVERAGES, label, value };
      });
      // console.log("newCoverageOptions: ", newCoverageOptions);
      setCoverageOptions(newCoverageOptions);
    } else {
      setCoverageOptions([]);
    }
  }, [coveragesApi]);

  // console.log("coverageOption", coverageOptions);

  useEffect(() => {
    if (dropDownData) {
      // Get keys with true values
      // const trueKeys = Object.keys(dropDownData).filter(
      //   (key) => dropDownData[key] === true
      // );
      // // Create a new object with only true values
      // const trueValues = {};
      // trueKeys.forEach((key) => {
      //   trueValues[key] = true;
      // });
      // console.log("trueValues", trueValues);
      // setOpenDropdowns(trueValues);
      setOpenDropdowns(dropDownData);
    }
  }, []);

  useEffect(() => {
    if (fileNumber) {
      setMvFileNumber(fileNumber);
    }
  }, []);

  // functions *************

  function changeDropdown() {
    dispatch(actions.setChangeCheckboxState(openDropdowns));
  }

  // changeDropdown();

  function isUnique(coverage, index, self) {
    const stringified = JSON.stringify(coverage);
    return index === self.findIndex((c) => JSON.stringify(c) === stringified);
  }

  const onRecalculateCoverage = async (formdata) => {
    // console.log("formdata", formdata);
    setopenloader(true);

    let coverageInfoPayload = null;

    if (finalPayload && finalPayloadCheckbox.length > 0) {
      // let finalObj = finalPayloadCheckbox.push(finalPayload);
      // console.log("finalObj", finalPayloadCheckbox, finalPayload);
      coverageInfoPayload = {
        // vehicleData: {
        ...newObj,

        vehicleData: {
          ...test,
          fileNumber: mvFileNumber,
        },

        coverages: [finalPayload, ...finalPayloadCheckbox]?.filter(isUnique),

        // },
        // coverages :
      };
    } else if (finalPayload) {
      coverageInfoPayload = {
        // vehicleData: {
        ...newObj,
        vehicleData: {
          ...test,
          fileNumber: mvFileNumber,
        },
        coverages: [finalPayload]?.filter(isUnique),
        // },
        // coverages :
      };
    } else if (finalPayloadCheckbox.length > 0) {
      coverageInfoPayload = {
        // vehicleData: {
        ...newObj,
        vehicleData: {
          ...test,
          fileNumber: mvFileNumber,
        },
        coverages: finalPayloadCheckbox?.filter(isUnique),
        // ? [
        //     finalPayload,
        //     ...(finalPayloadCheckbox ? [finalPayloadCheckbox] : []),
        //   ]
        // : null,
        // },
        // coverages :
      };
    } else {
      coverageInfoPayload = {
        ...newObj,
        vehicleData: {
          ...test,
          fileNumber: mvFileNumber,
        },
        coverages: [],
      };
    }

    // console.log("coverageInfoPayload", coverageInfoPayload);

    let coverageInfoDispatch = {
      // vehicleData: {
      ...CoverageQuote,
      vehicleData: {
        ...test,
        fileNumber: mvFileNumber,
      },
      coverages: [finalPayload, ...finalPayloadCheckbox]?.filter(isUnique),
      // ? [
      //     finalPayload,
      //     ...(finalPayloadCheckbox ? finalPayloadCheckbox : []),
      //   ]
      // : null,
      // },
      // coverages :
    };
    // console.log("coverageInfoDispatch", coverageInfoDispatch);

    // const uniqueCoverages = [finalPayload, ...finalPayloadCheckbox]?.filter(
    //   isUnique
    // );

    // // Print the result
    // console.log(uniqueCoverages, "uniqueCoverages");

    dispatch(
      actions.motorQuotationForm(coverageInfoDispatch, (result) => {
        if (result?.statusCode === -1) {
          setopenloader(false);
        } else {
          setopenloader(false);
        }
      })
    );
    let result = await axiosRequest.post(
      "user/motor-quick-quotation",
      coverageInfoPayload,
      {
        secure: true,
      }
    );
    console.log("result===>", result);
    if (result?.statusCode === -1) {
      setCoverageOptions([]);
      dispatch(actions.createMotorQuotationSuccess(result));

      let newQuotationNumber =
        result?.data?.oonaQuotationResponse?.quotationNumber;
      coverageData(newQuotationNumber);

      // history.push("/policyholder-Quote-info");
      setVisibleRecalculate(false);
      setVisibleNext(true);
      // setVisible1(visible);
      // setopenloader(false);
    } else if (result?.statusCode === 1) {
      dispatch(actions.createMotorQuotationSuccess(result));
      setVisibleRecalculate(true);
      setVisibleNext(false);
      setopenloader(false);
    } else {
      setVisibleRecalculate(true);
      setVisibleNext(false);
      setopenloader(false);
    }

    changeDropdown();
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    if (!nonStandardAccessories) {
      history.push("/vehicle-quote-info");
    } else {
      history.push("/accessory-quote-info");
    }
    // history.goBack();
  };

  const onchangetoNext = () => {
    history.push("/policyholder-Quote-info");
  };
  const labelGetter = (data) => {
    // console.log("data1", data);
    setSumIssuredOption([]);
    data &&
      data?.map((a) => {
        setSumIssuredOption((prev) => [
          ...prev,
          { label: a.name, value: a.capital },
        ]);
      });
  };

  const onSubmitCoveragesButton = (button, index) => {
    // console.log("button.coverageVariables: ", button.coverageVariables);

    // const newCoverageVariable = button.coverageVariables?.map((item) => {
    //   return {
    //     type: item?.type,
    //     value: item?.value,
    //     name: item.name,
    //   };
    // });
    labelGetter(button.sumInsuredOptions);
    // setCurrentButton(button.label);
    // if (currentButton === button.label) {
    // setShow(!show);
    if (coverageIndex === index) {
      setCoverageIndex(null);
      setVisibleRecalculate(false);
      setVisibleNext(true);
    } else if (coverageIndex === null || coverageIndex !== index) {
      setCoverageIndex(index);
      setVisibleRecalculate(true);
      setVisibleNext(false);
    }

    // if (button.isIncluded === true) {
    //   payload = {
    //     coverage: parseInt(button.coverage),
    //     capital: null,
    //     coverageVariables: newCoverageVariable,
    //   };
    // }

    // setFinalPayload(payload);
    // console.log("finalPayloaddropdown", payload);
  };

  const onChangeHandlerCoverageButton = (button, value, name) => {
    let newCoverageVariables = button.coverageVariables || [];

    // Find the index of the coverageVariable with the matching name
    const index = newCoverageVariables.findIndex((item) => item.name === name);

    if (index !== -1) {
      // If a matching coverageVariable is found, update its value
      newCoverageVariables[index] = {
        type: newCoverageVariables[index]?.type,
        value: value,
        name: name,
      };
    }
    // else {
    //   // If no matching coverageVariable is found, create a new one
    //   newCoverageVariables.push({
    //     type: null, // Set the appropriate type value here
    //     value: value,
    //     name: name,
    //   });
    // }

    // payload = null; // Define the payload variable

    if (button.isMandatory === true) {
      payload = {
        coverage: parseInt(button.coverage),
        capital: null, // Set the appropriate capital value here
        coverageVariables: newCoverageVariables,
      };
    }

    setFinalPayload(payload);
    // console.log("finalPayload dropdown", payload);

    setVisibleRecalculate(true);
  };
  const SumIssuredChangeHandlerIncluded = (item, key, button) => {
    // console.log("sumItem", item, key);

    let newCoverageVariables1 = button.coverageVariables || [];
    const sumInsuredVariable = button?.coverageVariables?.find(
      (variable) => variable.name === "SUM INSURED PER PASSENGER"
    );

    // console.log("sumInsuredVariable1", sumInsuredVariable);

    if (
      sumInsuredVariable &&
      sumInsuredVariable.name === "SUM INSURED PER PASSENGER"
    ) {
      let newCoverageVariable = button?.coverageVariables?.filter(
        (item) => item.name === "SUM INSURED PER PASSENGER"
      );

      // console.log("newCoverageValriable: ", newCoverageVariable);
      // Update the value of the variable with the selected value

      newCoverageVariable = newCoverageVariable.map((a) => {
        return {
          type: a.type,
          value: item,
          name: a.name,
        };
      });

      // console.log("newCoverageVariable1", newCoverageVariable);

      let updatePassenger = payload;
      // updatePayload = {
      //   coverage: parseInt(button.coverage),
      //   capital: null,
      //   coverageVariables: newCoverageVariable,
      // };

      updatePassenger.coverageVariables = newCoverageVariable;
      setSumIssuredPayload(item);
      setFinalPayload(updatePassenger);
      // console.log("setFinalPayload", finalPayload);
      setVisibleRecalculate(true);
    } else {
      setSumIssuredPayload(item);
      setVisibleRecalculate(true);

      let updatePayload = payload;
      updatePayload = {
        coverage: parseInt(button.coverage),
        capital: item,
        coverageVariables: newCoverageVariables1,
      };

      // console.log("updatePayload1", updatePayload);
      // updatePayload.capital = item;
      setFinalPayload(updatePayload);

      // console.log("setFinalPayload", finalPayload);
    }
  };

  const onsubmitCoverageCheckbox = (isChecked, button, index) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [button.label]: isChecked,
    }));

    // console.log("button", button.label, isChecked);
    // console.log("index", index);

    if (isChecked) {
      const newCoverageVariable = button.coverageVariables?.map((item) => {
        return {
          type: item?.type,
          value: item?.value,
          name: item.name,
        };
      });

      labelGetter(button.sumInsuredOptions);

      setCurrentCheckboxButton(button.label);

      selectedCheckboxValues = selectedCheckboxValues.filter((item) => {
        return item.label !== button.label;
        // console.log("hey123", item);
      });
      if (button.isMandatory === false) {
        selectedCheckboxValues.push({
          // label: button.label,
          coverage: parseInt(button.coverage),
          capital: null,
          coverageVariables: newCoverageVariable,
        });
        // setShowCheckbox(true);
        setVisibleRecalculate(true);
        setVisibleNext(false);
      }
      // } else {
      //   // setShowCheckbox(false);
      //   // setVisible(false);
      // }

      setFinalPayloadCheckbox(selectedCheckboxValues);
      setVisibleRecalculate(true);
      setVisibleNext(false);
      // setVisible(false);
      // console.log("selectedCheckboxValues", finalPayloadCheckbox);
    } else {
      selectedCheckboxValues?.filter((x, i) =>
        x.coverage == button.coverage
          ? selectedCheckboxValues.splice(i, 1)
          : null
      );

      if (selectedCheckboxValues.length > 0) {
        setVisibleRecalculate(true);
        // setVisibleNext(false);
      } else {
        setVisibleRecalculate(true);
        setVisibleNext(false);
      }
      // setVisibleRecalculate(false);

      // console.log("testing", selectedCheckboxValues);
      setFinalPayloadCheckbox(selectedCheckboxValues);
    }

    // console.log("hey123", finalPayloadCheckbox);
    // setVisible(false);
  };

  const SumIssuredChangeHandlerOptional = (item, key, button) => {
    // console.log("sumItem", item, key, button);
    const sumInsuredVariable = button?.coverageVariables?.find(
      (variable) => variable.name === "SUM INSURED PER PASSENGER"
    );

    // console.log("sumInsuredVariable", sumInsuredVariable);

    if (
      sumInsuredVariable &&
      sumInsuredVariable.name === "SUM INSURED PER PASSENGER"
    ) {
      let newCoverageVariableChanges = button?.coverageVariables?.filter(
        (item) => item.name === "SUM INSURED PER PASSENGER"
      );

      // console.log("newCoverageValriable: ", newCoverageVariableChanges);
      // Update the value of the variable with the selected value

      newCoverageVariableChanges = newCoverageVariableChanges.map((a) => {
        return {
          type: a.type,
          value: item,
          name: a.name,
        };
      });

      // console.log("newCoverageVariable1", newCoverageVariableChanges);

      // console.log("newCoverageVariable123", button.coverageVariables);

      let uploadPassenger = selectedCheckboxValues;

      const existingItemIndex = uploadPassenger.findIndex(
        (a) => a.coverage === parseInt(button.coverage)
      );

      // console.log("hwy123", existingItemIndex);
      if (existingItemIndex !== -1) {
        // Update the existing item
        uploadPassenger[existingItemIndex].coverageVariables =
          newCoverageVariableChanges;
      }

      // else {
      //   // Add a new item
      //   uploadPassenger.push({
      //     coverage: parseInt(button.coverage),
      //     capital: null,
      //     coverageVariables: newCoverageVariableChanges,
      //   });
      // }

      uploadPassenger.coverageVariables = newCoverageVariableChanges;

      // uploadPassenger.push({
      //   coverage: parseInt(button.coverage),
      //   capital: null,
      //   coverageVariables: newCoverageVariableChanges,
      // });
      setSumIssuredPayload(item);
      setFinalPayloadCheckbox(uploadPassenger);
      // setVisible(false);
      setVisibleRecalculate(true);
      setVisibleNext(false);

      // console.log("setFinalPayloadCheckbox", finalPayloadCheckbox);
    } else {
      setSumIssuredPayload(item);
      // setVisible(false);

      let updatePayload = [...selectedCheckboxValues];
      updatePayload.forEach((a) => {
        // console.log("testing", a);
        if (a.coverage == button.coverage) {
          a.capital = item;
        }
      });
      //updatePayload.capital = item;
      // console.log("updatepayload", updatePayload);

      setFinalPayloadCheckbox(updatePayload);
      setVisibleRecalculate(true);
      setVisibleNext(false);
    }
  };

  const onChangeCheckboxInput = (button, value, name) => {
    let newCoverageVariables = button.coverageVariables || [];

    // Find the index of the coverageVariable with the matching name
    const index = newCoverageVariables.findIndex((item) => item.name === name);

    if (index !== -1) {
      // If a matching coverageVariable is found, update its value
      newCoverageVariables[index] = {
        type: newCoverageVariables[index]?.type,
        value: value,
        name: name,
      };
    }
    // console.log("hey", value, name);

    let updatePayload = selectedCheckboxValues;
    updatePayload.forEach((a) => {
      // console.log("hey123", a);
      if (a.coverage == button.coverage) {
        a.coverageVariables.map((item) => {
          if (item.name == name) {
            item.value = value;
          }
        });
      }
    });

    // console.log("updatePayload", updatePayload);

    updatePayload?.forEach((item) => {
      // console.log("item", item);
      if (item.coverage == button.coverage) {
        item.coverageVariables.map((item1) => {
          if (item1.name == name) {
            item.coverageVariables = newCoverageVariables;
          }
        });
      }
    });

    // console.log("updatePayload123", updatePayload);

    // updatePayload.push({
    //   coverage: parseInt(button.coverage),
    //   capital: null,
    //   coverageVariables: newCoverageVariables,
    // });

    setFinalPayloadCheckbox(updatePayload);
    // console.log("updatepayload123", updatePayload);
    setVisibleRecalculate(true);
    setVisibleNext(false);

    // setVisible(false);
  };
  return (
    <>
      <div className="main-class">
        <FullPageLoader fromapploader={openloader}></FullPageLoader>
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

            <StepTwo />
          </Col>
          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              // onFinish={(e) => onSubmitHandler(e)}
              // onFinishFailed={onFinishFailed}
              // autoComplete="off"\
              form={form}
            >
              <div className="right-side">
                <div className="policy-type">
                  <h2>Tell us about the preferred coverage.</h2>
                </div>

                <div className="info-head">
                  <h3>Coverage Information</h3>
                </div>
                <div>
                  <div className="label">
                    <h6>
                      Coverages (Included)<span className="important">*</span>
                    </h6>
                  </div>
                  <Row gutter={16} className="row-bottom-margin">
                    {coverageOptions.length > 0 &&
                      coverageOptions?.map((button, index) => {
                        return (
                          <>
                            {button.isMandatory && (
                              <>
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                  <div
                                    style={{
                                      border:
                                        coverageIndex === index
                                          ? "2px solid #4AC6BB"
                                          : "none",
                                    }}
                                    className="btn_Product"
                                    onClick={() =>
                                      onSubmitCoveragesButton(button, index)
                                    }
                                  >
                                    <button className="loss-damage-button">
                                      {button.label}
                                    </button>

                                    <div className="button-losss">
                                      {coverageIndex === index ? (
                                        <UpOutlined
                                          style={{ color: "#4AC6BB" }}
                                        />
                                      ) : (
                                        <DownOutlined
                                          style={{ color: "#4AC6BB" }}
                                        />
                                      )}
                                    </div>
                                  </div>

                                  <div
                                    className={`${
                                      coverageIndex === index
                                        ? "Coverage-class-var"
                                        : ""
                                    }`}
                                  >
                                    {button.coverageVariables?.map((a, i) => {
                                      // console.log("hey", a);
                                      return (
                                        <>
                                          {coverageIndex === index ? (
                                            // <Row gutter={[16,16]}>
                                            //   <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                            <div>
                                              <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name la"
                                                name={a.name}
                                                label={a.name}
                                                style={{
                                                  display:
                                                    a.name ===
                                                      "NO CLAIM BONUS RATE" ||
                                                    a.name ===
                                                      "OWN DAMAGE DEDUCTIBLE" ||
                                                    a.name ===
                                                      "THEFT DEDUCTIBLE" ||
                                                    a.name ===
                                                      "CH COMMISSION ADJUSTMENT" ||
                                                    a.name ===
                                                      "CH FINAL RATE" ||
                                                    a.name ===
                                                      "SRCC DEDUCTIBLE" ||
                                                    a.name ===
                                                      "AON DEDUCTIBLE" ||
                                                    a.name ===
                                                      "UPPA FINAL RATE" ||
                                                    a.name ===
                                                      "AUTHENTICATION NUMBER" ||
                                                    a.name === "COC NUMBER" ||
                                                    a.name === "MV TYPE" ||
                                                    a.name ===
                                                      "REGISTRATION TYPE" ||
                                                    a.name ===
                                                      "AUTOMATIC AUTHENTICATION"
                                                      ? "none"
                                                      : "",
                                                }}
                                              >
                                                {a.name ===
                                                "SUM INSURED PER PASSENGER" ? (
                                                  <Select
                                                    size="default"
                                                    placeholder="Select"
                                                    options={
                                                      button.coverageVariables
                                                        .find(
                                                          (variable) =>
                                                            variable.name ===
                                                            "SUM INSURED PER PASSENGER"
                                                        )
                                                        ?.options.map(
                                                          (option) => ({
                                                            label:
                                                              option.capital.toString(),
                                                            value:
                                                              option.capital.toString(),
                                                          })
                                                        ) || []
                                                    }
                                                    value={sumIssuredPayload}
                                                    defaultValue={a.value}
                                                    onChange={(item, key) => {
                                                      SumIssuredChangeHandlerIncluded(
                                                        item,
                                                        key,
                                                        button
                                                      );
                                                    }}
                                                  />
                                                ) : (
                                                  <Input
                                                    className="first-name input-box"
                                                    size="default"
                                                    maxLength="30"
                                                    // placeholder={}
                                                    defaultValue={a.value || ""}
                                                    disabled={
                                                      a.name == "FINAL RATE" ||
                                                      a.name ==
                                                        "ADJUSTED COMMISSION RATE" ||
                                                      a.name ==
                                                        "LOSS RATIO SURCHARGE" ||
                                                      a.name ==
                                                        "REGISTRATION TYPE" ||
                                                      a.name == "MV TYPE" ||
                                                      a.name ==
                                                        "UPPA COMMISSION ADJUSTMENT" ||
                                                      a.name ==
                                                        "SUM INSURED PER PASSENGER" ||
                                                      a.name ==
                                                        "AON FINAL RATE" ||
                                                      a.name ==
                                                        "AON COMMISSION ADJUSTMENT" ||
                                                      a.name ==
                                                        "SRCC FINAL RATE" ||
                                                      a.name ==
                                                        "SRCC COMMISSION ADJUSTMENT" ||
                                                      a.name == "FINAL RATE" ||
                                                      a.name ==
                                                        "ADJUSTED COMMISSION RATE" ||
                                                      a.name ==
                                                        "LOSS RATIO SURCHARGE"
                                                        ? false
                                                        : true
                                                    }
                                                    onChange={(e) => {
                                                      if (
                                                        a.value !==
                                                        e.target.value
                                                      ) {
                                                        onChangeHandlerCoverageButton(
                                                          button,
                                                          e.target.value,
                                                          a.name
                                                        );
                                                      }
                                                    }}
                                                  />
                                                )}
                                              </Form.Item>
                                            </div>
                                          ) : null}
                                        </>
                                      );
                                    })}

                                    {coverageIndex === index ? (
                                      <>
                                        {/* <Input
                                          placeholder={button.sumInsured}
                                        />
                                        <Input
                                          placeholder={button.netPremuim}
                                        /> */}
                                        <Row gutter={[16, 16]}>
                                          {button.sumInsuredOptions == null ? (
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                            >
                                              <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name la"
                                                name={"sumInssured" + index}
                                                label="Sum Insured"
                                              >
                                                <Input
                                                  className="first-name input-box"
                                                  size="default"
                                                  maxLength="30"
                                                  // placeholder={}
                                                  // value={button.sumInsured}
                                                  defaultValue={
                                                    button.sumInsured
                                                  }
                                                  disabled={true}
                                                  // onChange={}
                                                  // onChange={(e) => {
                                                  //   form.setFieldsValue(
                                                  //     "sumInssured" + index,
                                                  //     e.target.value
                                                  //   );
                                                  // }}
                                                />
                                              </Form.Item>
                                            </Col>
                                          ) : null}

                                          <Col
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                          >
                                            <Form.Item
                                              {...formItemLayout}
                                              className="form-item-name la"
                                              name={"Premium" + index}
                                              label="Premium"
                                            >
                                              <Input
                                                className="first-name input-box"
                                                size="default"
                                                maxLength="30"
                                                // placeholder={}
                                                // value={button.netPremuim}
                                                defaultValue={button.netPremuim}
                                                disabled={true}
                                              />
                                            </Form.Item>
                                          </Col>
                                          {button.sumInsured != 0 &&
                                          button.sumInsuredOptions != null ? (
                                            <Col
                                              xs={24}
                                              sm={24}
                                              md={12}
                                              lg={12}
                                              xl={12}
                                            >
                                              <Form.Item
                                                {...formItemLayout}
                                                className="form-item-name la formFill"
                                                name={
                                                  "sumInsuredOptions" + index
                                                }
                                                label="Sum Insured"
                                                id={index}
                                              >
                                                <Select
                                                  size="default"
                                                  placeholder="Select"
                                                  options={sumInssuredOption}
                                                  onChange={(item, key) => {
                                                    // console.log(
                                                    //   "itemkey,",
                                                    //   item
                                                    // );

                                                    // setSelectedSubModel(key);
                                                    SumIssuredChangeHandlerIncluded(
                                                      item,
                                                      key,
                                                      button
                                                    );
                                                  }}
                                                  // value={sumIssuredPayload}
                                                  // isDisabled={false}
                                                  defaultValue={
                                                    button.sumInsured
                                                  }
                                                  // autoComplete="on"
                                                />
                                              </Form.Item>
                                            </Col>
                                          ) : null}
                                        </Row>
                                      </>
                                    ) : null}
                                  </div>
                                </Col>
                              </>
                            )}
                          </>
                        );
                      })}
                  </Row>
                </div>

                <div>
                  <div className="label">
                    <h6>
                      Coverages (Optional)<span className="important">*</span>
                    </h6>
                  </div>

                  <Row gutter={16} className="row-bottom-margin">
                    {coverageOptions?.length === 0 ? (
                      <>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <NoDataCard />
                        </Col>
                      </>
                    ) : (
                      <>
                        {coverageOptions.length > 0 &&
                          coverageOptions?.map((button, index) => {
                            return (
                              <>
                                {button.isMandatory === false && (
                                  <>
                                    <Col
                                      xs={24}
                                      sm={24}
                                      md={24}
                                      lg={24}
                                      xl={24}
                                    >
                                      <Form.Item name={button}>
                                        <label
                                          className="btn_Product"
                                          htmlFor={button.value}
                                          style={{
                                            border: openDropdowns[button.label]
                                              ? // currentCheckboxButton ===
                                                //   button.label
                                                "2px solid #4AC6BB"
                                              : "none",
                                          }}
                                        >
                                          <button className="loss-damage-button">
                                            {button.label}
                                          </button>
                                          <div className="button-losss">
                                            <Checkbox
                                              id={button.value}
                                              className="checkbox"
                                              name={button.label}
                                              checked={
                                                openDropdowns[button.label]
                                                  ? true
                                                  : false
                                              }
                                              onClick={(e) => {
                                                onsubmitCoverageCheckbox(
                                                  e.target.checked,
                                                  button,
                                                  index
                                                );
                                              }}
                                              // checked={showSelectetedCheckbox}
                                            ></Checkbox>
                                          </div>
                                        </label>
                                      </Form.Item>
                                      {/* {console.log("test", coverageOptions)} */}

                                      <div>
                                        {button.coverageVariables?.map(
                                          (a, i) => {
                                            return (
                                              <>
                                                {openDropdowns[button.label] ? (
                                                  // currentCheckboxButton ===
                                                  //   button.label &&
                                                  //   ||
                                                  // button.netPremuim !== 0
                                                  <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name la"
                                                    name={a.name}
                                                    label={a.name}
                                                    style={{
                                                      display:
                                                        a.name ===
                                                          "CH COMMISSION ADJUSTMENT" ||
                                                        a.name ===
                                                          "CH FINAL RATE" ||
                                                        a.name ===
                                                          "SRCC DEDUCTIBLE" ||
                                                        a.name ===
                                                          "AON DEDUCTIBLE" ||
                                                        a.name ===
                                                          "UPPA FINAL RATE" ||
                                                        a.name ===
                                                          "AUTHENTICATION NUMBER" ||
                                                        a.name ===
                                                          "COC NUMBER" ||
                                                        a.name === "MV TYPE" ||
                                                        a.name ===
                                                          "REGISTRATION TYPE" ||
                                                        a.name ===
                                                          "AUTOMATIC AUTHENTICATION"
                                                          ? "none"
                                                          : "",
                                                    }}
                                                  >
                                                    {a.name ===
                                                    "SUM INSURED PER PASSENGER" ? (
                                                      <Select
                                                        size="default"
                                                        placeholder="Select"
                                                        options={
                                                          button.coverageVariables
                                                            .find(
                                                              (variable) =>
                                                                variable.name ===
                                                                "SUM INSURED PER PASSENGER"
                                                            )
                                                            ?.options.map(
                                                              (option) => ({
                                                                label:
                                                                  option.capital.toString(),
                                                                value:
                                                                  option.capital.toString(),
                                                              })
                                                            ) || []
                                                        }
                                                        value={
                                                          sumIssuredPayload
                                                        }
                                                        defaultValue={a.value}
                                                        onChange={(
                                                          item,
                                                          key
                                                        ) => {
                                                          SumIssuredChangeHandlerOptional(
                                                            item,
                                                            key,
                                                            button
                                                          );
                                                        }}
                                                      />
                                                    ) : (
                                                      <Input
                                                        className="first-name input-box"
                                                        size="default"
                                                        maxLength="30"
                                                        // placeholder={}
                                                        defaultValue={
                                                          a.value || ""
                                                        }
                                                        disabled={
                                                          a.name ==
                                                            "REGISTRATION TYPE" ||
                                                          a.name == "MV TYPE" ||
                                                          a.name ==
                                                            "UPPA COMMISSION ADJUSTMENT" ||
                                                          a.name ==
                                                            "SUM INSURED PER PASSENGER" ||
                                                          a.name ==
                                                            "AON FINAL RATE" ||
                                                          a.name ==
                                                            "AON COMMISSION ADJUSTMENT" ||
                                                          a.name ==
                                                            "SRCC FINAL RATE" ||
                                                          a.name ==
                                                            "SRCC COMMISSION ADJUSTMENT" ||
                                                          a.name ==
                                                            "FINAL RATE" ||
                                                          a.name ==
                                                            "ADJUSTED COMMISSION RATE" ||
                                                          a.name ==
                                                            "LOSS RATIO SURCHARGE"
                                                            ? false
                                                            : true
                                                        }
                                                        onChange={(e) => {
                                                          // console.log(
                                                          //   "name",
                                                          //   a.name
                                                          // );
                                                          // setCurrentInteraction(a.name)
                                                          if (
                                                            a.value !==
                                                            e.target.value
                                                          ) {
                                                            onChangeCheckboxInput(
                                                              button,
                                                              e.target.value,
                                                              a.name
                                                            );
                                                          }
                                                        }}
                                                      />
                                                    )}
                                                  </Form.Item>
                                                ) : null}
                                              </>
                                            );
                                          }
                                        )}

                                        {
                                          // currentCheckboxButton ===
                                          //   button.label ? (
                                          openDropdowns[button.label] ? (
                                            //   ||
                                            // button.netPremuim !== 0
                                            <div className="Coverage-class-var">
                                              <Row gutter={[16, 16]}>
                                                {button.sumInsured != 0 &&
                                                button.sumInsuredOptions ==
                                                  null ? (
                                                  <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={12}
                                                    lg={12}
                                                    xl={12}
                                                  >
                                                    <Form.Item
                                                      {...formItemLayout}
                                                      className="form-item-name la"
                                                      name={
                                                        "sumInssured" + index
                                                      }
                                                      label="Sum Insured"
                                                    >
                                                      <Input
                                                        className="first-name input-box"
                                                        size="default"
                                                        maxLength="30"
                                                        // placeholder={}
                                                        defaultValue={
                                                          button.sumInsured
                                                        }
                                                        disabled={true}
                                                      />
                                                    </Form.Item>
                                                  </Col>
                                                ) : null}

                                                <Col
                                                  xs={24}
                                                  sm={24}
                                                  md={12}
                                                  lg={12}
                                                  xl={12}
                                                >
                                                  <Form.Item
                                                    {...formItemLayout}
                                                    className="form-item-name la"
                                                    name={"Premium" + index}
                                                    label="Premium"
                                                  >
                                                    <Input
                                                      className="first-name input-box"
                                                      size="default"
                                                      maxLength="30"
                                                      // placeholder={}
                                                      defaultValue={
                                                        button.netPremuim
                                                      }
                                                      disabled={true}
                                                    />
                                                  </Form.Item>
                                                </Col>
                                                {button.sumInsuredOptions !=
                                                null ? (
                                                  <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={12}
                                                    lg={12}
                                                    xl={12}
                                                  >
                                                    <Form.Item
                                                      {...formItemLayout}
                                                      className="form-item-name la formFill"
                                                      name={
                                                        "sumInsuredOptions" +
                                                        index
                                                      }
                                                      label="Sum Insured"
                                                      id={index}
                                                    >
                                                      <Select
                                                        size="default"
                                                        placeholder="Select"
                                                        options={
                                                          sumInssuredOption
                                                        }
                                                        value={
                                                          sumIssuredPayload
                                                        }
                                                        defaultValue={
                                                          button.sumInsured
                                                        }
                                                        onChange={(
                                                          item,
                                                          key
                                                        ) => {
                                                          SumIssuredChangeHandlerOptional(
                                                            item,
                                                            key,
                                                            button
                                                          );
                                                        }}
                                                      />
                                                    </Form.Item>
                                                  </Col>
                                                ) : null}
                                                {button.label ==
                                                "COMP. THIRD PAR. LIAB." ? (
                                                  <Col
                                                    xs={24}
                                                    sm={24}
                                                    md={12}
                                                    lg={12}
                                                    xl={12}
                                                  >
                                                    <Form.Item
                                                      {...formItemLayout}
                                                      className="form-item-name la"
                                                      name="mvFileNumber"
                                                      label="MV File Number"
                                                      rules={[
                                                        {
                                                          required: true,
                                                          message:
                                                            "Please provide MV File Number",
                                                        },
                                                      ]}
                                                    >
                                                      <Input
                                                        className="first-name input-box"
                                                        size="default"
                                                        maxLength="15"
                                                        defaultValue={
                                                          mvFileNumber
                                                        }
                                                        value={mvFileNumber}
                                                        onChange={(e) =>
                                                          setMvFileNumber(
                                                            e.target.value
                                                          )
                                                        }
                                                      />
                                                    </Form.Item>
                                                  </Col>
                                                ) : null}
                                              </Row>
                                            </div>
                                          ) : null
                                        }
                                      </div>
                                    </Col>
                                  </>
                                )}
                              </>
                            );
                          })}
                      </>
                    )}
                  </Row>
                </div>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    className="next-button"
                    size={size}
                    onClick={onRecalculateCoverage}
                    // style={{ display: visible ? "none" : "block" }}
                    //disabled={visible ? true : false}
                    disabled={!visibleRecalculate}
                  >
                    Recalculate
                  </Button>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <div className="button-header">
                    <Button
                      className="prev-button"
                      size={size}
                      onClick={onchangetoBack}
                    >
                      Back
                    </Button>
                    <Button
                      className="next-button"
                      size={size}
                      htmlType="submit"
                      disabled={!visibleNext}
                      // style={{ display: visible ? "none" : "block" }}
                      onClick={onchangetoNext}
                      // onClick={onFinishPolicyGroup}
                    >
                      Next
                      <ArrowRightOutlined />
                    </Button>
                  </div>
                </Col>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <QuickQuoteFooter />
      {/* <WithoutApproxFooter /> */}
    </>
  );
};
export default CoverageQuote;
