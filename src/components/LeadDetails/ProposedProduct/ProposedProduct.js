import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, Input, Select, Space, DatePicker } from "antd";
import { ArrowLeftOutlined, FileTextOutlined } from "@ant-design/icons";
import Tabs from "../../Tab/Tab";
import LeadDetailsTab from "../LeadDetails/LeadDetailsTab";
import * as actions from "../../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { stoageGetter } from "../../../helpers";
import _, { add } from "lodash";
// import "../../StatusLead/StatusLead.css";
import "./ProposedProduct.css";
import moment from "moment";
const minimumDate = moment().format("MM-DD-YYYY");

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
// this is the Product category for the Defence Options
const productCategoriesDefenceOptions = [
  {
    value: "retirement",
    label: "Retirement",
  },
  {
    value: "traditional",
    label: "Traditional",
  },
];
// this Product category for the Agency
const productCategoriesAgencyOptions = [
  {
    value: "health",
    label: "Health",
  },
  {
    value: "retirement",
    label: "Retirement",
  },
  {
    value: "traditional",
    label: "Traditional",
  },
  {
    value: "ULIP",
    label: "ULIP",
  },
];
// this Product category for the IB Options
const productCategoriesIbOptions = [
  {
    value: "retirement",
    label: "Retirement",
  },
  {
    value: "traditional",
    label: "Traditional",
  },
  {
    value: "ULIP",
    label: "ULIP",
  },
];
// this plane name option for the Agnecy Health
const planNameOptionsAgencyHealth = [
  {
    value: "Cancer+Health Shield",
    label: "Cancer+Health Shield",
  },
];
// this plane name for the the Defence agency and IB
const planNameOptionsRetirement = [
  {
    value: "Saral Pension",
    label: "Saral Pension",
  },
];
// this is Option for the Defence traditional
const planNameOptionDefenceTraditional = [
  {
    value: "Smart Assure",
    label: "Smart Assure",
  },
  {
    value: "Rakshak Smart",
    label: "Rakshak Smart",
  },
  {
    value: "Magnum Assure",
    label: "Magnum Assure",
  },
  {
    value: "Roz Sanchay",
    label: "Roz Sanchay",
  },
  {
    value: "Smart Protect Cash",
    label: "Smart Protect Cash",
  },
  {
    value: "Saral Jivan Bima",
    label: "Saral Jivan Bima",
  },
  {
    value: "Guaranteed Return on Wealth",
    label: "Guaranteed Return on Wealth",
  },
];
// this is option for the Ulip for Agency and IB Only
// Ulip is not for Defence
const planNameOptionUlipAgencyIb = [
  {
    value: "Wealth+Ace",
    label: "Wealth+Ace",
  },
  {
    value: "Smart Wealth+",
    label: "Smart Wealth+",
  },
  {
    value: "Wealth Maximiser",
    label: "Wealth Maximiser",
  },
  {
    value: "Wealth Enhancer",
    label: "Wealth Enhancer",
  },
];
// this plane name for the Agency Traditional and IB Only

const planNameOptionsTradionalAgency = [
  {
    value: "U-Protect",
    label: "U-Protect",
  },
  {
    value: "Smart Income",
    label: "Smart Income",
  },
  {
    value: "Smart Assure",
    label: "Smart Assure",
  },
  {
    value: "Raksha Smart",
    label: "Rakshak Smart",
  },
  {
    value: "Flexi Cash",
    lable: "Flexi Cash",
  },
  {
    value: "Roz Sanchay",
    lable: "Roz Sanchay",
  },
  {
    value: "Smart Protect Cash",
    label: "Smart Protect Cash",
  },
  {
    value: "Trushield",
    label: "Trushield",
  },
  {
    value: "Saral Jivan Bima",
    label: "Saral Jivan Bima",
  },
  {
    value: "Secure Savings Plan",
    lable: "Secure Savings Plan",
  },
  {
    value: "Guaranteed Return on Wealth",
    label: "Guaranteed Return on Wealth",
  },
];
// this is the plane name for the IB Traditional

// let personalRoute = "/leadmasterpage/leaddetails/personallead";

// const productTypeOptions = [
//   { value: "Relience Life", label: "Relience Life" },
//   { value: "HDFC Life", label: "HDFC Life" },
//   { value: "Edwlweiss", label: "Edwlweiss" },
// ];
const ProposedProduct = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let _leadID = useSelector((state) => state.leads.currentUpdatingID);
  let storeFormData = useSelector((state) => state.newLead.formData);
  let user = stoageGetter("user");
  let channelCode = user.channelCode.channelCode;

  // this is for changes in product name

  let bindProductCategory = [];

  let bindPlanName = [];
  if (
   channelCode === "CH1" ||
   channelCode === "CH2" || 
   channelCode === "CH11") {
    // Defebce
    bindProductCategory = productCategoriesDefenceOptions;
  } else if (
   channelCode === "CH3" ||
   channelCode === "CH7" || 
   channelCode === "CH9") {
    // agency
    bindProductCategory = productCategoriesAgencyOptions;
  } else if (
    channelCode === "CH4" || 
    channelCode === "CH5" || 
    channelCode === "CH6" || 
    channelCode === "CH8" || 
    channelCode === "CH10") {
    // IB
    bindProductCategory = productCategoriesIbOptions;
  }

  const address = storeFormData.address[0];
  let leadType = storeFormData.leadType;
  let line1 = "";
  let line2 = "";
  let line3 = "";
  if (address !== undefined) {
    line1 = address.line1;
    line2 = address.line2;
    line3 = address.line3;
  }
  let storeLeadId = useSelector((state) => state.leads.currentUpdatingID);
  const storeLeadId2 = useSelector((state) => state.newLead.leadId);
  // const channelCode = useSelector((state) => state.login.channelCode);

  // const test = useSelector((state) => state);

  const id = useSelector((state) => state?.login?.user?.id);

  const storeProuctValue = storeFormData?.productCategory;

  const storePlanNameValue = storeFormData?.productType;

  const productCategories = useSelector((state) => state);
  // const planOptions = useSelector((state) => state.product.planName);
  const [form] = Form.useForm();

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const [product, setProduct] = useState(
    storeProuctValue ? storeProuctValue : "Select"
  );
  if (
    (channelCode === "CH1" ||
      channelCode === "CH2" ||
      channelCode === "CH3" ||
      channelCode === "CH4" ||
      channelCode === "CH5" ||
      channelCode === "CH6" ||
      channelCode === "CH7" ||
      channelCode === "CH8" ||
      channelCode === "CH9" ||
      channelCode === "CH10" ||
      channelCode === "CH11") &&
    product === "retirement"
  ) {
    bindPlanName = planNameOptionsRetirement;
  } else if (
    (channelCode == "CH1" ||
     channelCode === "CH2" || 
     channelCode === "CH11") &&
    product === "traditional"
  ) {
    bindPlanName = planNameOptionDefenceTraditional;
  } else if (
  (channelCode === "CH3" || 
  channelCode === "CH7" || 
  channelCode === "CH9") && 
  product === "health") {
    bindPlanName = planNameOptionsAgencyHealth;
  } else if (
  (channelCode === "CH3" || 
  channelCode === "CH7" || 
  channelCode === "CH9") && 
  product === "traditional") {
    bindPlanName = planNameOptionsTradionalAgency;
  } else if (
    (channelCode === "CH3" || 
    channelCode === "CH7" || 
    channelCode === "CH9" || 
    channelCode === "CH4" || 
    channelCode === "CH5" || 
    channelCode === "CH6" || 
    channelCode === "CH8" || 
    channelCode === "CH10") &&
    product === "ULIP"
  ) {
    bindPlanName = planNameOptionUlipAgencyIb;
  } else if (
  (channelCode === "CH4" ||
    channelCode === "CH5" ||
    channelCode === "CH6" || 
    channelCode === "CH8" || 
    channelCode === "CH10") && 
    product === "traditional") {
    bindPlanName = planNameOptionsTradionalAgency;
  }

  const [planNameValue, setPlanNameValue] = useState(
    storePlanNameValue ? storePlanNameValue : "Select"
  );

  const [closureDate, setClosureDate] = useState();
  const storeClosureDate = storeFormData.expectedclosureDate;



  const closureDateIn = storeClosureDate ? moment(+storeClosureDate) : "";

  //  const [dob, setDob] = useState(
  // () => storeFormData.dob !== "" && moment(storeFormData.dob)
  // );

  const tabMenu = [
    {
      id: 1,
      value: "Status",
    },
    {
      id: 2,
      value: "Lead Details",
    },

    {
      id: 3,
      value: "History",
    },
  ];
  const tabMenu2 = [
    {
      id: 1,
      value: "Status",
    },
    {
      id: 2,
      value: "Lead Details",
    },
  ];

  const [isNewLead, setIsNewLead] = useState();
  const [expectedMoney, setExpectedMoney] = useState(
    storeFormData.expectedPremium
  );
  const [errorMessage, setErrorMessage] = useState();
  useEffect(() => {
    dispatch(actions.fetchProduct(channelCode));
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  useEffect(() => {
    form.setFieldsValue({
      planName: storePlanNameValue ? storePlanNameValue : "Select",
    });
  }, [product]);
  const productHandler = (value) => {
    // const { _id } = object;
    // dispatch(actions.fetchPlanName(_id));

    setProduct(value);
    storeFormData.productType = "";
  };
  const planNameHandler = (value) => {
    setPlanNameValue(value);
  };
  const closureDateHandler = (date, dateString) => {
    setClosureDate(moment(date).valueOf());
  };
  const expectedMoneyHandler = (e) => {
    setExpectedMoney(e.target.value);
  };
  // let productCategoryOptions =
  //   productCategories && !_.isEmpty(productCategories)
  //     ? productCategories.map((productCategory) => {
  //         const {
  //           productCategoryName,
  //           _id,
  //           // channelCode:{channelCode}
  //         } = productCategory;
  //         const label = productCategoryName;
  //         const value = productCategoryName;
  //         // const chCode = channelCode
  //         const newProductCategories = {
  //           // chCode,
  //           _id,
  //           label,
  //           value,
  //         };
  //         return newProductCategories;
  //       })
  //     : null;

  const formData = {
    ...storeFormData,
    user_id: id,
    line1: line1,
    line2: line2,
    line3: line3,
    lead_Owner_Id: storeFormData.leadOwnerId,
    lead_Creator_Id: storeFormData.leadCreatorId,
    lead_Id: storeFormData.leadId,

    expectedPremium: expectedMoney,
    expectedclosureDate: closureDate,
    productCategory: product,
    productType: planNameValue,
  };
  const failedHandler = (error) => {
    alert(error);
  };

  const prevdHandler = (event) => {
    event.preventDefault();
    dispatch(actions.storeLead(formData));
    history.push("existingLead");
  };
  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
      if (res.type === "EDIT_LEAD_SUCCESS") {
        setErrorMessage();
        setIsNewLead(false);
      } else if (res.type === "EDIT_LEAD_FAIL") {

        failedHandler(res.error);
      }
    });

    dispatch(actions.storeLead(storeFormData));
    history.push("/leadMaster/all_leads");
    // history.push("/leadmasterpage/leadhistory");
  };
  return (
    <>
      <Tabs
        tabMenu={_leadID ? tabMenu : tabMenu2}
        header="New Lead"
        tabBarGutter={0}
        // detailsRouteTab={personalRoute}
        activeKey="2"
      />
      <div className="form-container">
        <Form
          // layout="horizontal"
          // className="contact-detail-form"
          form={form}
          onFinish={submitHandler}
          onFinishFailed={failedHandler}
        >
          <Row gutter={[0, 30]} justify={width > breakpoint ? "" : "center"}>
            <LeadDetailsTab activeKey="5" />
            <Col
              // className="form-body p40 m0a"
              className="form-body  p50 mb-2"
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Proposed Product</p>
              {}
              <Row gutter={16} className="mb-2">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="Product Category"
                    label="Product Category"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select product category",
                      },
                    ]}
                  >
                    <Select
                      bordered={false}
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px rgb(153, 153, 153) solid",
                      }}
                      className="form-input-box"
                      // value={product}
                      options={bindProductCategory}
                      size="large"
                      defaultValue={product}
                      placeholder="Select Product"
                      onChange={productHandler}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="planName"
                    label="Plan Name"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select plan name",
                      },
                    ]}
                  >
                    <Select
                      bordered={false}
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px rgb(153, 153, 153) solid",
                      }}
                      className="form-input-box"
                      options={bindPlanName}
                      size="large"
                      defaultValue={planNameValue}
                      placeholder="Select"
                      onChange={planNameHandler}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="Expected"
                    label="Expected Closure Date"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select Closure Date",
                      },
                    ]}
                    style={{ marginBlock: "1rem" }}
                  >
                    <DatePicker
                    inputReadOnly={true}
                      defaultValue={closureDateIn}
                      onChange={closureDateHandler}
                      size="large"
                      style={{
                        width: "100%",
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px rgb(153, 153, 153) solid",
                        height: "2.7rem",
                      }}
                      placeholder="dd/mm/yyyy"
                      format="YYYY/MM/DD"
                      disabledDate={(d) => !d || d.isBefore(minimumDate)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="Expected Premium"
                    label="Expected Premium"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Select plan name",
                      },
                      {
                        message: "Only number is allowed",
                        pattern: new RegExp(/^[0-9]/),
                      },
                    ]}
                    style={{ marginBlock: "1rem" }}
                  >
                    <Input
                      style={{
                        boxShadow: "none",
                        border: "none",
                        borderBottom: "1px rgb(153, 153, 153) solid",
                        height: "2.7rem",
                      }}
                      defaultValue={expectedMoney}
                      onChange={expectedMoneyHandler}
                      className="first-name input-box"
                      placeholder="Expected Premium Amount1"
                      type="number"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>

            <Col
              className="form-body p300"
              xs={{ order: 5 }}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 6 : 0}
            >
              <div className="child">
                <Button
                  className="last-btn-1"
                  // type="primary"
                  // shape="round"
                  size="large"
                  onClick={prevdHandler}
                  style={{
                    // backgroundColor: "rgb(59, 55, 30)",
                    border: "1",
                    display: "flex",
                    alignItems: "center",
                  }}
                  icon={<ArrowLeftOutlined />}
                >
                  Previous
                </Button>

                <Button
                  type="primary"
                  // shape="round"
                  className="last-btn-1"
                  size="large"
                  style={{
                    backgroundColor: "rgb(59, 55, 30)",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                  }}
                  icon={<FileTextOutlined />}
                  onClick={submitHandler}
                  htmlType="submit"
                >
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ProposedProduct;
