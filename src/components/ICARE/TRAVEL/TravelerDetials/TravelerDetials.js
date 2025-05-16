import React, { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, Radio, Select, DatePicker, message } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import "./TravelerDetials.css";
import { useHistory } from "react-router-dom";
import StepTravelTwo from "../StepBarTravel/StepTravelTwo/StepTravelTwo";
import PolicyFooter from "../TravelFooter/PolicyFooter/PolicyFooter";
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../../axios-request/request.methods";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import * as moment from "moment";
import { setTravelerInfo } from "../../../../store/actions/travel";
const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

export default function TravelerInformation() {
  const [form] = Form.useForm();
  const travelUserInfo = useSelector((state) => state?.trip?.travelUserInfo);
  const coverageType = useSelector((state) => state?.trip?.tripInfo?.coverageType);
  const travelUserDetailedInfo = useSelector(
    (state) => state?.trip?.travelUserDetailedInfo
  );

  console.log("travelUserDetailedInfo",travelUserDetailedInfo)
  const travelType = useSelector((state) => state?.trip?.tripInfo?.travelType);
  const tripInfo = useSelector((state) => state?.trip?.tripInfo);
  const travelersInfo = useSelector((state)=>state?.trip?.travelersInfo)

  const [formValue, setFormValues] = useState([
    { completeName: "", birthdate: "", passportNumber: "", relationship: null, policyHolderBDay: null },
  ]);

  const [isPolicyHolder, setIsPolicyHolder] = useState("yes");
  const [relationList, setRelationList] = useState([]);

  const [loader, setLoader] = useState(false);
  const [userCompleteName, setUserCompleteName] = useState("");
  const [userBirthDate, setUserBirthDate] = useState("");
  console.log("USeerBirthDate===>",userBirthDate)
  const dispatch = useDispatch();

  const handleTravelerChange = (name, value, index) => {
    setFormValues((prev) => {
      prev[index][name] = value;
      return [...prev];
    });
    form.setFieldsValue({
      [name+index] : value
    })
    if(name == "relationship"){
      getRelationList();
    }
  };

  const history = useHistory();
  const onFailed = (err) =>{
  }
  const onFinishTravelerinfo = (formdata) => {
    if (coverageType == "F" && formValue.length < 2) {
      message.error("Traveler must be min 2")
      return;
    }
    // formValue[0].relationship = "P";
    const formValues = formValue?.map((item) => {
      return {
        ...item,
        relationship: item.relationship.charAt(0)
      }
    })
    const formData = { formValues, isPolicyHolder };
    dispatch(setTravelerInfo(formData));
    history.push("/formal-quote-info");
  };

  const onClickBackbtn = () => {
    history.push("/customer-info");
  };
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onChangefortravelers = () => {
    if(travelersInfo?.formValues){
      setFormValues(travelersInfo?.formValues)
      const payload = {}
      let index = 0
      for(let data of travelersInfo.formValues){
        for(let key in data){
          payload[`${key}${index}`] = data[key]
        }
        index++
      }
      console.log(payload,'<<<<<<<<<<<<<<<<<<')
      form.setFieldsValue(payload)
    }
  }
  useEffect(() =>{
    onChangefortravelers()
    setUserCompleteName(`${travelUserDetailedInfo?.firstName} ${travelUserDetailedInfo?.lastName}`);
    const bday = travelUserDetailedInfo?.birthDate;
    setUserBirthDate(bday);
    setFormValues((prev) => {
      prev[0].completeName = `${travelUserDetailedInfo?.firstName} ${travelUserDetailedInfo?.lastName}`;
      prev[0].birthdate = travelUserDetailedInfo?.birthDate;
      prev[0].policyHolderBDay = travelUserDetailedInfo?.birthDate;
      return [...prev];
    });
    form.setFieldsValue({
      'completeName0' : `${travelUserDetailedInfo?.firstName} ${travelUserDetailedInfo?.lastName}`,
      'birthdate0' : moment(travelUserDetailedInfo?.birthDate,"MM-DD-YYYY") === " " ? " " : moment(travelUserDetailedInfo?.birthDate,"MM-DD-YYYY")
    })


    formValue[0].relationship = "P";
    getRelationList();
    if (travelUserDetailedInfo?.documentType == "PAS") {
      formValue[0].passportNumber = travelUserDetailedInfo?.IdNumber;
    }
  }, [])

  const handleIsPolicyTraveler = (e) => {
    if (e.target.value === "yes") {
      setUserCompleteName(`${travelUserDetailedInfo?.firstName} ${travelUserDetailedInfo?.lastName}`);
      const bday = travelUserDetailedInfo?.birthDate;
      setUserBirthDate(bday);
      setFormValues((prev) => {
        prev[0].completeName = `${travelUserDetailedInfo?.firstName} ${travelUserDetailedInfo?.lastName}`;
        prev[0].birthdate = travelUserDetailedInfo?.birthDate;
        prev[0].policyHolderBDay = travelUserDetailedInfo?.birthDate;
        return [...prev];
      });
      form.setFieldsValue({
        'completeName0' : `${travelUserDetailedInfo.firstName} ${travelUserDetailedInfo.lastName}`,
        'birthdate0' : moment(travelUserDetailedInfo?.birthDate,"MM-DD-YYYY") === " " ? " " : moment(travelUserDetailedInfo?.birthDate,"MM-DD-YYYY")
      })
      if (travelUserDetailedInfo?.documentType == "PAS") {
        formValue[0].passportNumber = travelUserDetailedInfo?.IdNumber;
      }
    } else {
      setUserCompleteName("");
      setUserBirthDate("");
      setFormValues((prev) => {
        prev[0].completeName = ``;
        prev[0].passportNumber = "";
        prev[0].birthdate = "";
        prev[0].policyHolderBDay = null;
        return [...prev];
      });
      form.setFieldsValue({
        'completeName0' : "",
        'birthdate0' : "",
      })
    }
    setIsPolicyHolder(e.target.value);
  };

  const handleAddTraveler = () => {
    setFormValues((prev) => {
      if (prev.length < 6) {
        const newFormValue = {
          completeName: "",
          birthdate: "",
          passportNumber: "",
          relationship: null,
        };
        return [...prev, newFormValue];
      }
      return prev;
    });
  };
  
const disabledFutureDate = current => {
  // Disable dates after today
  return current && current > moment().endOf('day');
};
  

  const handleDeleteTraveler = (index) => {
    setFormValues((prev) => {
      prev.splice(index, 1);
      return [...prev];
    });
    form.setFieldsValue({
      ["relationship"+index] : null,
      ["birthdate"+index] : "",
      ["completeName"+index] : ""
    })
    if(formValue.length < 6){
      getRelationList();
    }
  };

  const getRelationList = async () => {
    const consumed = formValue.filter(item => item?.relationship).map(item => item.relationship.charAt(0)).join(',');
      setLoader(true);
    const res = await axiosRequest.get(
      `user/travelRelationship?consumed=${consumed}&travelPackage=F`
    );
    setLoader(false);
    if (res.statusCode === -1) {
      setRelationList(
        res?.data?.data?.list?.map((e) => ({
          label: e.NOM_VALOR,
          value: e.NOM_VALOR,
          payload: e.COD_VALOR,
        }))
      );
    }
  };

  const changeLabel = (relationlist) =>{
    console.log("relationList",relationlist);

    relationList?.filter((item)=> {
      console.log("Item rel-->",item)
      if(item.value === relationlist){
        return item.label
      }
    })
  }

  //   UPPARCASE DATA ///
  const toInputUppercase = (e) => {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  return (
    <>
      <FullPageLoader spinloader={loader} />
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
          <StepTravelTwo />
        </div>
        <div className="rsright-side">
          <Form
          key={formValue.length}
            name="basic"
            initialValues={{
              remember: true,
            }}
            form = {form}
            onFinish={onFinishTravelerinfo}
            onFinishFailed={onFailed}
          >
            <div className="Travelerheading_1">
              We just need to know more about the travelers.
            </div>
            <div className="policy">
              <ul>
                <li>
                  <div className="policyHolder">Traveler Information</div>
                </li>
              </ul>
            </div>

            {/* Traveler 1 */}
            {formValue.map((e, i) => {
              console.log("itemFormVal",e,i)
              return (
                <div key={`asdfsakj${i}`}>
                  <div
                    className="traveler-btn-container"
                    key={`traveler-btn-container${i}`}
                  >
                    <Button className="rstraveller">Traveler {i + 1}</Button>
                    { (tripInfo?.coverageType == "F" ? i > 1 : i > 0) ? (
                      <Button
                        className="rsDeletebtn"
                        onClick={() => handleDeleteTraveler(i)}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                  {i === 0 ? (
                    <>
                      <div className="rsheader">
                        Is the policy holder a traveler?{" "}
                      </div>
                      <div>
                        <Radio.Group
                          onChange={handleIsPolicyTraveler}
                          style={{ marginTop: "5px" }}
                          value={isPolicyHolder}
                        >
                          <Radio value="yes">Yes</Radio>
                          <Radio value="no">No</Radio>
                        </Radio.Group>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  <Row gutter={16} key={`rowofcompletenamecustomer ${i}`}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name={`completeName${i}`}
                        label="Complete Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your complete name!",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        {/* <span style={{ display: "none" }}>
                          {formValue[i].completeName}
                        </span> */}
                        <Input
                          placeholder="Customer Name"
                          className="inputboxx"
                          value={formValue[i].completeName}
                          disabled={isPolicyHolder === 'yes' && formValue[i].completeName === userCompleteName}
                          onChange={(e) =>
                            handleTravelerChange(
                              "completeName",
                              e.target.value,
                              i
                            )
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name={`birthdate${i}`}
                        label="Birthdate"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your birthdate",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        {/* <span style={{ display: "none" }}>
                          {formValue[i]?.birthdate?.toString()}
                        </span> */}
                        {console.log("userBirthDateuserBirthDate",userBirthDate)}
                        <DatePicker
                          size="large"
                          bordered={true}
                          style={{ width: "100%" }}
                          format="MM-DD-YYYY"
                          disabled={isPolicyHolder && formValue[i].policyHolderBDay === userBirthDate}
                          value={formValue[i].birthdate?moment(formValue[i].birthdate,"MM-DD-YYYY"):""}
                          disabledDate={disabledFutureDate}
                          onChange={(date, dateString) =>
                            handleTravelerChange("birthdate", date, i)
                          }
                          initialValues={formValue[i].birthdate?moment(formValue[i].birthdate,"MM-DD-YYYY"):""}
                        
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name la"
                        name="Passport Number"
                        // label="Passport Number"
                        label={
                          <>
                            {travelType == "I" && formValue[i].passportNumber && (
                              <span className="mandatory-icon">*</span>
                            )}
                            Passport Number
                          </>
                        }
                        rules={[
                          {
                            required: travelType == "I" ? !formValue[i].passportNumber : false,
                            message: "Please enter your Passport Number!",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <span style={{ display: "none" }}>
                          {formValue[i].passportNumber}
                        </span>

                        <Input
                          placeholder="Passport Number"
                          className="inputboxx"
                          value={formValue[i].passportNumber}
                          disabled={travelUserDetailedInfo?.documentType == "PAS" && formValue[i].passportNumber == travelUserDetailedInfo?.IdNumber && formValue[i].relationship == "P" && isPolicyHolder}
                          onChange={(e) =>
                            handleTravelerChange(
                              "passportNumber",
                              e.target.value,
                              i
                            )
                          }
                          onInput={toInputUppercase}
                        />
                      </Form.Item>
                    </Col>
                    {console.log("relationList",relationList)}
                    {i !== 0 ? (
                      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                        <Form.Item
                          {...formItemLayout}
                          className="form-item-name la"
                          // name="Relationship"
                          name={`relationship${i}`}
                          label="Relationship"
                          rules={[
                            {
                              required: true,
                              message: "Relationship is required",
                            },
                          ]}
                          style={{ marginBottom: "1rem" }}
                        >
                          {/* <span style={{ display: "none" }}>
                            {formValue[i].relationship}
                          </span> */}
                          <Select
                            showSearch
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select Relationship"
                            value={changeLabel(formValue[i].relationship)}
                            options={relationList}
                            onChange={(value) =>
                              handleTravelerChange("relationship", value, i)
                            }
                          ></Select>
                        </Form.Item>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </div>
              );
            })}
            {
              (coverageType == "F" && formValue.length < 6) &&
              <Button className="rsAddTraveler" onClick={handleAddTraveler}>
                Add Another Traveler
              </Button>
            }

            <div className="btnParentDiv">
              <Button className="rsback_btn" onClick={onClickBackbtn}>
                Back
              </Button>
              <Button className="rsconfirm_btn" htmlType="submit">
                Next
                <ArrowRightOutlined />
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div style={{ marginTop: "3rem" }}>
        <PolicyFooter />
      </div>
    </>
  );
}
