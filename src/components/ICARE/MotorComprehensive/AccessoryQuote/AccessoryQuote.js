import React, { useState, useEffect } from "react";
import "./AccessoryQuote.css";
import { useHistory, useLocation } from "react-router-dom";
import {
  Row,
  Col,
  Button,
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
  InputNumber,
  Space,
} from "antd";
import _ from "lodash";
import moment, { now } from "moment";
import {
  CloseCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
// import AutoSelectCompletion from "../components/AutoSelectCompletion";
import StepTwo from "../components/StepBar/StepTwo/StepTwo";
import * as actions from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { checkAgent, stoageGetter } from "../../../../helpers";
import QuickQuoteFooter from "../MotorFormFooter/QuickQuoteFooter/QuickQuoteFooter";
import WithoutApproxFooter from "../MotorFormFooter/QuickQuoteFooter/WithoutApproxFooter";
let login_user_data = stoageGetter("user");

const obj = [];
// var TempObjectforStoring = null
const accessoriesindex = 0;

const AccessoryQuote = () => {
  const getAgentCode = login_user_data?.agentCode;
  // console.log("agent_id", getAgentCode);

  const [form] = Form.useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const data = location.state;
  // console.log("data", data);
  const [size, setSize] = useState("default"); // default is 'middle'

  let initialaccessoriesstate = [
    {
      accessoryCode: "",
      accessoryName: "",
      price: "",
      description: "",
      accesoriestype: "",
      // index:0
    },
  ];
  const [TempObjectforStoring, setTempObjectforStoring] = useState(
    initialaccessoriesstate
  );
  // const [accessoryListOptions, setaccessoryListOptions] = useState([]); // default is 'middle'

  const [visible, setVisible] = React.useState(true);
  const [addAccessoryList, setAddAccessoryList] = React.useState([0, 1]);
  const [Fieldsofaaccesorie, setFieldsofaaccesorie] = useState([
    {
      id: 1,
      accessoryCode: null,
      accessoryName: "",
      accesoriestype: "",
      price: "",
      description: "",
      disablefield: true,
    },
  ]);
  const [nextId, setNextId] = useState(Date.now());
  const subline = useSelector(
    (state) => state?.motorQuotation?.formData?.subline
  );

  const confirmTest = useSelector((state) => state);
  // console.log("test2", confirmTest);

  useEffect(() => {
    if (
      confirmTest?.motorQuotation?.formData?.hasOwnProperty("accessories") ===
      true
    ) {
      const AccesoriesListingData =
        confirmTest?.motorQuotation?.formData?.accessories;
      setFieldsofaaccesorie(AccesoriesListingData);
    }
  }, []);

  // console.log("After Pushing Data =====>>>",TempObjectforStoring)

  let sublineApi = useSelector((state) => state?.make?.subline);
  // console.log("sublime filter=>>",sublineApi)
  const sublineEffectiveDate1 = sublineApi?.filter((item) => {
    if (subline === item.subline) {
      return item.effectivityDate;
    }
  });

  const sublineEffectiveDate = sublineEffectiveDate1[0]?.effectivityDate;

  // Parse the original date using the source format "DDMMYYYY"
  const formattedEffectiveDate = moment(
    sublineEffectiveDate,
    "MMDDYYYY"
  ).format("DDMMYYYY");

  // console.log("formattedEffectiveDate", formattedEffectiveDate);

  const accessoryQuote = useSelector(
    (state) => state?.motorQuotation?.formData
  );
  // console.log("accessoryQuote", accessoryQuote);

  const vehicleType =
    confirmTest?.motorQuotation?.formData?.vehicleData?.vehicleType;

  const [btnIndex, setBtnIndex] = React.useState(0);

  const [items, setItems] = useState([]);
  useEffect(() => {
    // console.log("addAccessoryList: ", addAccessoryList);
  }, [addAccessoryList]);
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  useEffect(() => {
    // dispatch(actions.fetchAllAccessoryList("1", "01052014"));

    dispatch(
      actions.fetchAllAccessoryList(vehicleType, formattedEffectiveDate)
    );
  }, [dispatch]);

  let AccessoryListApi = useSelector(
    (state) => state?.groupPolicy?.accessoryList?.lov
  );

  let accessoryListOptions =
    AccessoryListApi && !_.isEmpty(AccessoryListApi)
      ? AccessoryListApi.map((ACCESSORYLIST) => {
          const label =
            ACCESSORYLIST.NOM_ACCESORIO +
            "-" +
            ACCESSORYLIST.ABR_AGRUP_ACCESORIO;
          const value = ACCESSORYLIST.COD_ACCESORIO;
          const type = ACCESSORYLIST.ABR_AGRUP_ACCESORIO;
          const price = ACCESSORYLIST.IMP_ACCESORIO;
          const description = "";
          const newAccessoryList = {
            ...ACCESSORYLIST,
            label,
            value,
            type,
            price,
            description,
          };
          return newAccessoryList;
        })
      : null;

  // console.log("Accesories LIS DATA ",accessoryListOptions)
  // console.log("AccessoryListApi", AccessoryListApi);

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const getValues = (key) => {
    // console.log("Key values =============",key)
    if (key == "A") {
      // console.log("im in addition");
      return "Additional";
    } else if (key == "B") {
      return "Built In";
    } else if (key == "F") {
      return "Free";
    }
  };

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoBack = () => {
    history.push("/vehicle-Quote-info");
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleAddField = () => {
    const newField = {
      id: nextId,
      accessoryCode: null,
      accessoryName: "",
      accesoriestype: "",
      price: "",
      description: "",
      disablefield: true,
    };
    setFieldsofaaccesorie([...Fieldsofaaccesorie, newField]);
    setNextId(nextId + 1);
  };

  const handleDeleteField = (id, index) => {
    const updatedFields = Fieldsofaaccesorie.filter(
      (field, inde) => index !== inde
    );
    setFieldsofaaccesorie(updatedFields);
    // console.log("After DeletingArray =====>>",updatedFields)
  };

  function onFinish(values) {
    let accessoryInfo = {
      ...accessoryQuote,
      accessories: Fieldsofaaccesorie,
    };

    // console.log("test On Click on Click", accessoryInfo);
    // return;
    dispatch(actions.motorQuotationForm(accessoryInfo));

    history.push("/coverage-Quote-info");
  }

  const addedselecteddropdownvalues = (field, key, index) => {
    // console.log("acessorylistkey", field,key,index);

    // console.log("After Updatingdata ==== >>>",Fieldsofaaccesorie)

    var tempdata = null;
    tempdata = Fieldsofaaccesorie.some((object2) => {
      if (object2.accessoryCode === key.value) {
        // console.log("Im Already There",key.value )
        message.warning("Option already selected in another dropdown!");
        setVisible(false);
        return "Im Already There";
      }
    });

    // console.log("after checking======>>>>",tempdata)
    if (tempdata === false) {
      const newField = {
        id: field.id,
        accessoryCode: key.value,
        accessoryName: key.label,
        accesoriestype: getValues(key.type),
        price: key.price,
        description: "",
        disablefield: false,
      };
      const updatedFieldsofaaccesorie = Fieldsofaaccesorie.map(
        (oldField, currentIndex) => {
          if (currentIndex === index) {
            return newField;
          } else {
            return oldField;
          }
        }
      );
      setFieldsofaaccesorie(updatedFieldsofaaccesorie);
      setVisible(true);
      // console.log("After Update Accesories ======>>>>",updatedFieldsofaaccesorie)
    } else {
      const newField = {
        id: field.id,
        accessoryCode: null,
        accessoryName: "",
        accesoriestype: "",
        price: "",
        description: "",
        disablefield: true,
      };
      const updatedFieldsofaaccesorie = Fieldsofaaccesorie.map(
        (oldField, currentIndex) => {
          if (currentIndex === index) {
            return newField;
          } else {
            return oldField;
          }
        }
      );

      setFieldsofaaccesorie(updatedFieldsofaaccesorie);
    }
  };

  const checkwhenpricechanges = (event, index, field) => {
    // console.log("price after click",field)
    // Fieldsofaaccesorie[index].price = event.target.value
    const newField = {
      id: field.id,
      accessoryCode: field.accessoryCode,
      accessoryName: field.accessoryName,
      accesoriestype: field.accesoriestype,
      price: event.target.value,
      description: field.description,
      disablefield: false,
    };
    const updatedFieldsofaaccesorie = Fieldsofaaccesorie.map(
      (oldField, currentIndex) => {
        if (currentIndex === index) {
          return newField;
        } else {
          return oldField;
        }
      }
    );
    setFieldsofaaccesorie(updatedFieldsofaaccesorie);
  };

  const descrptionvalues = (events, index, field) => {
    // console.log("Description Change Values",events.target.value)
    // Fieldsofaaccesorie[index].description = events.target.value
    const newFieldf = {
      id: field.id,
      accessoryCode: field.accessoryCode,
      accessoryName: field.accessoryName,
      accesoriestype: field.accesoriestype,
      description: events.target.value,
      price: field.price,
      disablefield: false,
    };
    const updatedFieldsofaaccesorie = Fieldsofaaccesorie.map(
      (oldField, currentIndex) => {
        if (currentIndex === index) {
          return newFieldf;
        } else {
          return oldField;
        }
      }
    );
    setFieldsofaaccesorie(updatedFieldsofaaccesorie);
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

            <StepTwo />
          </Col>

          <Col xs={24} sm={24} md={14} lg={14} xl={14}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              form={form}
              // onFinish={onAccessorySubmit}
            >
              <div className="right-side">
                <div className="policy-type">
                  <h2>Let's get to know more about the vehicle.</h2>
                </div>
                <div>
                  <div className="info-head">
                    <h3>Accessory Information</h3>
                  </div>
                  {/* {formbuilderdata} */}
                  <div className="all-accessory-bg">
                    <Form
                      form={form}
                      name="dynamic_form_nest_item"
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      {/* {console.log("Form Values In DOM", Fieldsofaaccesorie)} */}
                      {Fieldsofaaccesorie.map((field, index) => (
                        <Row gutter={16} className="row-bottom-margin">
                          {/* {console.log("Single Fields=======>>>>", field)} */}
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              className="form-item-name la formFill"
                              label="Accessory Category"
                              name={[
                                field.id,
                                field.accessoryCode,
                                "accessoryCode",
                              ]}
                              fieldKey={[
                                field.id,
                                field.accessoryCode,
                                "accessoryCode",
                              ]}
                              initialValue={field.accessoryCode}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Select Accessory List",
                                },
                              ]}
                            >
                              <Select
                                showSearch
                                onSearch={onSearch}
                                style={{ width: "100%" }}
                                size="large"
                                placeholder="Accessory Category"
                                onChange={(item, key) => {
                                  addedselecteddropdownvalues(
                                    field,
                                    key,
                                    index
                                  );
                                }}
                                value={[field.id, field.accessoryCode]}
                                options={accessoryListOptions}
                                filterOption={filterOption}
                                optionFilterProp="children"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              label="Accessory Type"
                              name={[
                                field.id,
                                field.accesoriestype,
                                "accesoriestype",
                              ]}
                              fieldKey={[
                                field.id,
                                field.accesoriestype,
                                "accesoriestype",
                              ]}
                              initialValue={field.accesoriestype}
                              rules={[
                                {
                                  required: true,
                                  message: "Accessory Type is Mandatory",
                                },
                              ]}
                            >
                              <Input
                                className="first-name input-box"
                                placeholder="Accessory Type"
                                value={[field.id, field.accesoriestype]}
                                size="large"
                                disabled={true}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              label="Price"
                              name={[field.id, field.price, "price"]}
                              fieldKey={[field.id, field.price, "price"]}
                              initialValue={field.price}
                              className="form-item-name la"
                              rules={[
                                {
                                  required: true,
                                  message: "Price is Mandatory",
                                },
                              ]}
                            >
                              <Input
                                size="large"
                                disabled={field.disablefield}
                                placeholder="PHP 0"
                                value={[field.id, field.price]}
                                onBlur={(event) => {
                                  checkwhenpricechanges(event, index, field);
                                }}
                                className="first-name input-box"
                                type="number"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                            <Form.Item
                              {...formItemLayout}
                              label="Description"
                              name={[
                                field.id,
                                field.description,
                                "description",
                              ]}
                              fieldKey={[
                                field.id,
                                field.description,
                                "description",
                              ]}
                              className="form-item-name la"
                              initialValue={field.description}
                            >
                              <Input
                               maxLength='30'
                                size="large"
                                disabled={field.disablefield}
                                placeholder="Enter the Description"
                                value={[field.id, field.description]}
                                onBlur={(eventd) => {
                                  descrptionvalues(eventd, index, field);
                                }}
                                className="first-name input-box"
                              />
                            </Form.Item>
                          </Col>
                          {Fieldsofaaccesorie.length > 1 && (
                            <div>
                              <div
                                style={{
                                  cursor: "pointer",
                                  marginLeft: "10px",
                                }}
                                className="btn_Accessory-delete"
                                onClick={(e) => {
                                  handleDeleteField(field.id, index);
                                }}
                              >
                                Delete Accessory
                              </div>
                            </div>
                          )}
                        </Row>
                      ))}
                      <Form.Item>
                        <Button
                          className="btn_Accessory-add"
                          onClick={handleAddField}
                        >
                          Add Another Accessory
                        </Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
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
                    style={{ display: visible ? "block" : "none" }}
                  >
                    Next
                    <ArrowRightOutlined />
                  </Button>
                </div>
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
export default AccessoryQuote;
