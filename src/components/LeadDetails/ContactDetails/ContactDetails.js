import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Typography,
  Cascader,
  Button,
  Input,
  Switch,
  Select,
} from "antd";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/index";
import _, { add } from "lodash";
import Tabs from "../../Tab/Tab";
import { Link, useHistory } from "react-router-dom";
import LeadDetailsTab from "../LeadDetails/LeadDetailsTab";
// import "../../StatusLead/StatusLead.css";
import "./ContactDetails.css";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};

// let personalRoute = "/leadmasterpage/leaddetails/personallead";

const ContactDetails = React.memo(() => {
  const storeFormData = useSelector((state) => state.newLead.formData);

  const secondMailaddress = useSelector(
    (state) => state.newLead.formData.mailingAddressSecond
  );
  let myObj = null;
  if (typeof secondMailaddress === "string") {
    myObj = JSON.parse(secondMailaddress);
  } else {
    myObj = secondMailaddress;
  }

  // const ;

  const line1 = myObj.mailingaddress.line1;
  const line2 = myObj.mailingaddress.line2;
  const line3 = myObj.mailingaddress.line3;

  const { city, state } = myObj;
  // const secPincode = useSelector(
  //   (state) => state.newLead.formData.mailingAddressSecond.pincode
  // );
  const secPincode = myObj.pincode;

  const testing = useSelector((state) => state.newLead.formData.address);
  let sampleAddress = null;
  const result = Array.isArray(testing);
  if (result) {
    sampleAddress = testing[0];
  } else {
    sampleAddress = testing;
  }

  const address = useSelector((state) => state.newLead.formData.address);

  const successMsg = useSelector((state) => state.newLead.successMsg);
  const id = useSelector((state) => state.login.user.id);
  let storeCode = useSelector((state) => state.newLead.formData.state);

  // if (states !== undefined) {
  //   states?.sort(function (a, b) {
  //     const stateName1 = a.doc.name.toUpperCase();
  //     const stateName2 = b.doc.name.toUpperCase();
  //     if (stateName1 < stateName2) {
  //       return -1;
  //     }
  //     if (stateName1 > stateName2) {
  //       return 1;
  //     }
  //   });
  // }
  const states = useSelector((state) => state?.address?.states);
  console.log("State==>",states)

  // let cities = useSelector((state) => state.address.cities);
  // let resultCity = cities;
  // if (cities.length > 0) {
  //   cities = resultCity.reduce((finalArray, current) => {
  //     let obj = finalArray.find((item) => item.code === current.code);
  //     if (obj) {
  //       return finalArray;
  //     }
  //     return finalArray.concat([current]);
  //   }, []);
  // }

  // if (cities.length > 0) {
  //   cities?.sort(function (a, b) {
  //     const cityName1 = a.name.toUpperCase();
  //     const cityName2 = b.name.toUpperCase();
  //     if (cityName1 > cityName2) {
  //       return 1;
  //     }
  //     if (cityName1 < cityName2) {
  //       return -1;
  //     }
  //   });
  // }
  let cities = useSelector((state) => state?.address?.cities?.lov);
  console.log("cities====>", cities);


  const storeSecondaryMobile = useSelector(
    (state) => state?.newLead?.formData?.secondaryMobile
  );
  const storeLandLine = useSelector(
    (state) => state.newLead.formData.landlineNo
  );
  const storeMailingAddressStatus = useSelector(
    (state) => state.newLead.formData.mailingAddressStatus
  );

  const mailingaddress = useSelector((state) => state.newLead);

  // const {
  //   mailingaddress: { secline1, secline2, secline3 },
  // } = useSelector((state) => state.newLead.formData.mailingAddressSecond);
  let storeLeadId = useSelector((state) => state.leads.currentUpdatingID);

  const storeLeadId2 = useSelector((state) => state.newLead.leadId);

  const [form] = Form.useForm();
  const [width, setWidth] = useState(window.innerWidth);
  const [addressLine1, setAddressLine1] = useState(
    sampleAddress.line1 ? sampleAddress.line1 : ""
  );

  const [addressLine2, setAddressLine2] = useState(
    sampleAddress.line2 ? sampleAddress.line2 : ""
  );
  const [addressLine3, setAddressLine3] = useState(
    sampleAddress.line3 ? sampleAddress.line3 : ""
  );
  const [stateProvince, setStateProvince] = useState(
    storeFormData?.state ? storeFormData?.state : ""
  );
  const [cityProvince, setCityProvince] = useState(
    storeFormData?.city ? storeFormData?.city : ""
  );

  const [stateProvince2, setStateProvince2] = useState(
    storeFormData?.cityStateData?.StateId
      ? storeFormData?.cityStateData?.StateId
      : ""
  );
  const [cityProvince2, setCityProvince2] = useState(
    storeFormData?.cityStateData?.CityID
      ? storeFormData?.cityStateData?.CityID
      : ""
  );
  const [pincode, setPinCode] = useState(
    storeFormData?.pincode ? storeFormData?.pincode : ""
  );
  const [isPincodeValid, setIsPinCodeValid] = useState();
  const [primaryMobile, setPrimaryMobile] = useState(
    storeFormData?.primaryMobile
  );
  const [secondaryMobile, setSecondaryMobile] = useState( storeSecondaryMobile
  );
  const [landlineNo, setLandlineNo] = useState(storeLandLine);
  const [code, setCode] = useState(storeCode);


  // const [aadharNo, setAadharNo] = useState(storeAadharNo);
  const [email, setEmailAddress] = useState(storeFormData.email);
  const [isSameAddress, setIsSameAddress] = useState(storeMailingAddressStatus);
  // const [isSameAddress, setIsSameAddress] = useState(true);
  const [leadIdData, setLeadIdData] = useState("");
  const [secaddressLine1, setSecAddressLine1] = useState(line1 ? line1 : "");
  const [secaddressLine2, setSecAddressLine2] = useState(line2 ? line2 : "");
  const [secaddressLine3, setSecAddressLine3] = useState(line3 ? line3 : "");
  const [secstateProvince, setSecStateProvince] = useState(state ? state : "");
  const [seccityProvince, setSecCityProvince] = useState(city ? city : "");
  const [isSecPincodeValid, setIsSecPinCodeValid] = useState();
  const [secpinCode, setSecPinCode] = useState(secPincode ? secPincode : "");
  const [isFormValid, setIsFormValid] = useState();
  const [isNewLead, setIsNewLead] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [stateProvinceName, setStateProvinceName] = useState("");
  const [cityProvinceName, setCityProvinceName] = useState("");

  const breakpoint = 620;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (storeLeadId !== "") {
      setIsNewLead(false);
    }
    dispatch(actions.fetchAllState());
  }, [dispatch]);

  useEffect(() => {
    setCode(storeCode);
  }, [storeCode]);
  useEffect(() => {
    dispatch(actions.fetchAllCities(code));
  }, [code, dispatch]);

  let _leadID = useSelector((state) => state.leads.currentUpdatingID);
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

  useEffect(() => {
    if (storeLeadId !== "") {
      setIsNewLead(false);
    }
    form.setFieldsValue({
      line1: addressLine1,
      line2: addressLine2,
      line3: addressLine3,
      // country: "India",
      state: stateProvince,
      // city: cityProvince,
      cityStateData: {
        StateId: stateProvince2,
        CityID: cityProvince2,
      },
      pincode: pincode,
      primaryNo: primaryMobile,
      secondaryNo: secondaryMobile,
      landlineNo: landlineNo,

      email: email,
      addStatus: isSameAddress,
      secAddLine1: secaddressLine1,
      secAddLine2: secaddressLine2,
      secAddLine3: secaddressLine3,
      // secAddCountry: "India",
      secAddState: secstateProvince,
      secAddCity: seccityProvince,
      secAddPin: secpinCode,
    });
  }, [
    addressLine1,
    addressLine2,
    addressLine3,
    // "India",
    stateProvince,
    cityProvince,
    pincode,
    primaryMobile,
    secondaryMobile,
    landlineNo,
    email,
    isSameAddress,
    secaddressLine1,
    secaddressLine2,
    secaddressLine3,
    // "India",
    secstateProvince,
    seccityProvince,
    secpinCode,
    form,
  ]);

  let stateOptions =
    states && !_.isEmpty(states)
      ? states.map((state) => {
        const label = state.NOM_PROV;
        const value = state.COD_PROV;
        const key = state.COD_PROV;
        const newState = { ...state, label, value, key };
        // state.push(label)
        return newState;
      })
      : null;


  let citiesOptions =
    cities && !_.isEmpty(cities)
      ? cities.map((city) => {
        const label = city.NOM_LOCALIDAD;
        const value = city.COD_LOCALIDAD;
        const key = city.COD_LOCALIDAD;
        const newCities = { ...city, label, value, key };
        return newCities;
      })
      : null;

  const addLine1Handler = (event) => {
    setAddressLine1(event.target.value);
  };
  const addLine2Handler = (event) => {
    setAddressLine2(event.target.value);
  };
  const addLine3Handler = (event) => {
    setAddressLine3(event.target.value);
  };
  const pincodeHandler = (event) => {
    let value = event.target.value;
    if (value.trim() !== "" && value.length === 6) {
      setIsPinCodeValid(true);
      setPinCode(event.target.value);
    }
  };
  const primaryNoHandler = (event) => {
    setPrimaryMobile(event.target.value);
  };
  const secondaryNoHandler = (event) => {
    setSecondaryMobile(event.target.value);
  };
  const landlineNoHandler = (event) => {
    setLandlineNo(event.target.value);
  };
  // const aadharNoHandler = (event) => {
  //   setAadharNo(event.target.value);
  // };
  const emailAddressHandler = (event) => {
    setEmailAddress(event.target.value);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const stateSelectHandler = (value, key) => {
    setCode(key.COD_PROV);
    dispatch(actions.fetchAllCities(key.COD_PROV))
  };

  const stateChangedHandler = (value, key) => {
    // setStateProvince(value);

    setStateProvince(key.value);
    setStateProvince2(key.key);
    setCityProvince("");
  };

  const cityChangedHandler = (value, key) => {
    // setCityProvince(value);
    setCityProvince(key.name);
    setCityProvince2(key.key);
  };

  // Permanent Address Same as Mailing Address
  const CheckMailingAddSameAsPermanentAdd = () => {
    setIsSameAddress(!isSameAddress);
  };

  const secAddLine1Handler = (event) => {
    setSecAddressLine1(event.target.value);
  };
  const secAddLine2Handler = (event) => {
    setSecAddressLine2(event.target.value);
  };
  const secAddLine3Handler = (event) => {
    setSecAddressLine3(event.target.value);
  };
  const secPincodeHandler = (event) => {
    let value = event.target.value;
    if (value.trim() !== "" && value.length === 6) {
      setIsSecPinCodeValid(true);
      setSecPinCode(value);
    }
  };

  const secStateSelectHandler = (value, key) => {
    dispatch(actions.fetchAllCities(key.doc.id));
  };
  const secStateChangedHandler = (value) => {
    setSecStateProvince(value);
    setSecCityProvince("");
  };
  const prevdHandler = (event) => {
    event.preventDefault();

    dispatch(actions.storeLead(formData));
    history.push("personallead");
  };

  const secCityChangedHandler = (value) => {
    setSecCityProvince(value);
  };
  // var formData = null;
  const mailingAddress2 = {
    mailingaddress: {
      line1: secaddressLine1,
      line2: secaddressLine2,
      line3: secaddressLine3,
    },
    state: stateProvince,
    city: cityProvince,

    cityCode: cityProvinceName, //city code has to be passed
    stateCode: stateProvinceName,
    // country: "India",
    pincode: secpinCode,
  };

  var formData = {
    ...storeFormData,

    line1: addressLine1,
    line2: addressLine2,
    line3: addressLine3,
    lead_Owner_Id: storeFormData.leadOwnerId,
    lead_Creator_Id: storeFormData.leadCreatorId,
    lead_Id: storeFormData.leadId,
    user_id: id,

    // user_id: id,
    // lead_Creator_Id: id,
    // lead_Owner_Id: id,
    // line2: addressLine2,
    // line3: addressLine3,
    // address: [
    //   { line1: addressLine1, line2: addressLine2, line3: addressLine3 },
    // ],
    // country: "India",
    state: stateProvinceName,
    city: cityProvinceName,
    pincode: pincode,
    cityCode: cityProvince, //city code has to be passed
    stateCode: stateProvince,
    // primaryMobile: primaryMobile,
    secondaryMobile: secondaryMobile,
    landlineNo: landlineNo,
    // socialSecurityAdharNo: aadharNo,
    email: email,
    mailingAddressSecond: JSON.stringify(mailingAddress2),
  };

  let formIsValid = false;
  const failedHandler = (error) => {
    alert(error);
  };

  const submitHandler = (event) => {
    if (!storeLeadId) {
      dispatch(actions.storeLead(formData));
    } else {
      dispatch(actions.editLead(formData, storeLeadId)).then((res) => {
        if (res.type === "EDIT_LEAD_SUCCESS") {
          setErrorMessage();
          setIsNewLead(false);
        } else if (res.type === "EDIT_LEAD_FAIL") {

          failedHandler(res.error);
        }
      });

      // alert(" Lead Updated Successfully");
      // history.push("professionallead");
    }
    // if (isSameAddress) {

    //     // formIsValid = isPincodeValid
    //     if (!formIsValid) {
    //         return;
    //     } else {
    //         // dispatch(actions.storeLead(formData))
    //         // history.push('professionallead')
    //     }
    // }
    // else {
    //     // const formIsValid = isPincodeValid && isSecPincodeValid
    //     if (!formIsValid) {
    //         return;
    //     } else {
    //         if(isNewLead){
    //             dispatch(actions.storeLead(formData))

    //             alert('New Lead Updated Successfully')
    //             history.push('professionallead')

    //             setIsNewLead(false)
    //         }else{

    //             dispatch(actions.editLead(formData, storeLeadId))
    //             alert(' Lead Updated Successfully')
    //             history.push('professionallead')

    //         }
    //         // dispatch(actions.storeLead(formData))
    //         // history.push('professionallead')
    //     }
    // }
  };
  // const submitHandler = event => {
  //     event.preventDefault();

  // setErrorMessage('Form submitted successfully')
  // setIsNewLead(false)
  // setErrorMessage( res.data.data)

  // resetFirstName();
  // resetLastName();
  // resetEmail();
  // };
  const updateHandler = (event) => {
    event.preventDefault();
    dispatch(actions.editLead(formData, storeLeadId));
    history.push("professionallead");

    // if (!formIsValid) {
    //   return;
    // }else{
    // }

    // setErrorMessage('Form submitted successfully')
    // setIsNewLead(false)
    // setErrorMessage( res.data.data)

    // resetFirstName();
    // resetLastName();
    // resetEmail();
  };
  const proceedHandler = (event) => {
    event.preventDefault();
    let _lead_id = storeLeadId !== undefined ? storeLeadId : leadIdData;

    dispatch(actions.editLead(formData, _lead_id)).then((res) => {
      if (res?.type === "EDIT_LEAD_SUCCESS") {
        setErrorMessage(successMsg);
        setIsNewLead(false);
      } else if (res?.type === "EDIT_LEAD_FAIL") {

        failedHandler(res.error);
      }
    });

    dispatch(actions.storeLead(storeFormData));
    history.push("professionallead");
  };
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  //autoComplete
  const stateChangetHandler = (event, key) => {
    setStateProvince(key.COD_PROV);
    setStateProvinceName(key.NOM_PROV)
    // setStateProvince2(key.key);
    //cityProvince = "";
    setCityProvince("");
  };

  const cityChangeHandler = (value, key) => {
    setCityProvinceName(key.NOM_LOCALIDAD)
    setCityProvince(key.COD_LOCALIDAD);
    // setCityProvince2(key.key);
  };
  return (
    <>
      <div className="leadtabct">
        <Tabs
          tabMenu={_leadID ? tabMenu : tabMenu2}
          tabBarGutter={0}
          header="New Lead"
          // detailsRouteTab={personalRoute}
          activeKey="2"
        />
      </div>
      <div className="form-container3">
        <Form
          // layout="horizontal"
          // className="contact-detail-form"
          initialValues={{
            // addline1: addressLine1,
            // addline2: addressLine2,
            // addline3: addressLine3,
            addline1: addressLine1,
            addline2: addressLine2,
            addline3: addressLine3,
            // country: "India",
            state: stateProvince,
            // city: cityProvince === "" ? "select" : cityProvince,
            pincode: pincode,
            primaryNo: primaryMobile,
            secondaryNo: secondaryMobile,
            landlineNo: landlineNo,
            // aadharNo: aadharNo,
            email: email,
            addStatus: isSameAddress,
            secAddLine1: secaddressLine1,
            secAddLine2: secaddressLine2,
            secAddLine3: secaddressLine3,
            // secAddCountry: "India",
            secAddState: secstateProvince,
            secAddCity: seccityProvince,
            secAddPin: secpinCode,
          }}
          fields={[
            {
              name: ["city"],
              value: cityProvince,
            },
            {
              name: ["secAddCity"],
              value: seccityProvince,
            },
          ]}
          onFinish={submitHandler}
          onFinishFailed={failedHandler}
        >
          <Row gutter={[0, 30]} justify={width > breakpoint ? "" : "center"}>
            <LeadDetailsTab activeKey="2" />
            <Col
              className="form-body  p50 mb-2"
              // style={{
              //   marginTop: -290,
              //   marginLeft: 150,
              //   backgroundColor: "white",
              // }}
              sm={24}
              md={16}
              lg={15}
              xl={15}
              span={23}
              offset={width > breakpoint ? 2 : 0}
            >
              <p className="form-title">Contact Details</p>
              <p className="form-title">Mailing Address</p>
              <Row gutter={16} className="mb2 statsLead">
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="addline1"
                    label="Address line 1"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Address line 1"
                      onChange={addLine1Handler}
                      value={addressLine1}
                      maxLength={35}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="addline2"
                    label="Address line 2"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Address line 2"
                      onChange={addLine2Handler}
                      value={addressLine2}
                      maxLength={35}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="addline3"
                    label="Landmark"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Landmark"
                      onChange={addLine3Handler}
                      value={addressLine2}
                      maxLength={35}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="country"
                    label="Country"
                    hasFeedback
                    rules={[
                      {
                        required: false,
                        message: "Please select your Country!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      bordered={false}
                      style={{ marginTop: "-10px" }}
                      className="select-box"
                      size="large"
                      placeholder="India"
                      value="India"
                    ></Select>
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="state"
                    label="Province"

                    rules={[
                      {
                        required: false,
                        message: "Select your Province!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      bordered={false}
                      className="select-box"
                      // size="default"
                      placeholder="Select Your Province"
                      options={stateOptions}
                      onSelect={(e, data) => stateSelectHandler(e, data)}
                      value={stateProvince}
                      autoComplete="on"
                      // defaultValue={storeStateValue}
                      onChange={(item, key) => stateChangetHandler(item, key)}
                      // onChange={stateChangetHandler}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: false,
                        message: "Please select your city!",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Select
                      showSearch
                      bordered={false}
                      className="select-box"
                      size="default"
                      placeholder="Select a city"
                      options={citiesOptions}
                      autoComplete="off"
                      value={cityProvince}
                      // defaultValue={storeCityValue}
                      onChange={(item, key) => cityChangeHandler(item, key)}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="pincode"
                    label="Zipcode"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        pattern: new RegExp(/^[0-9]{4}$/), // Ensures it has 4 digits
                        message: "Zipcode must be of 4 digits",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter zipcode"
                      value={pincode}
                      onChange={pincodeHandler}
                      maxLength={4}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="primaryNo"
                    label="Primary Mobile No"
                    rules={[
                      {
                        required: true,
                        message: "Mobile No is required",
                      },
                      {
                        pattern: new RegExp(/^[06789][0-9]{9,13}$/), // Starts with 0,6,7,8,9 and has 10 to 14 digits
                        message: "Mobile No must be 10 to 14 digits and start with 0, 6, 7, 8, or 9",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Primary Mobile No"
                      onChange={primaryNoHandler}
                      maxLength={14} // Supports up to 14 digits
                      disabled={true}
                      onKeyDown={(evt) => {
                        if (!/[0-9]/.test(evt.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
                          evt.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>





                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...formItemLayout}
                      className="form-item-name label-color"
                      name="secondaryNo"
                      label="Alternate Mobile No"
                      rules={[
                        {
                          required: false,
                        },
                        {
                          pattern: new RegExp(/^[06789][0-9]{9,13}$/), // Ensures it starts with 0,6,7,8,9 and has 10 to 14 digits
                          message: "Number must be 10 to 14 digits and start with 0, 6, 7, 8, or 9",
                        },
                      ]}
                      style={{ marginBottom: "1rem" }}
                    >
                      <Input
                        className="first-name input-box"
                        placeholder="Enter Alternate Mobile No"
                        onChange={secondaryNoHandler}
                        maxLength={14} // Updated max length to 14
                        autoComplete="off"
                        onKeyDown={(evt) => {
                          if (!/[0-9]/.test(evt.key) && !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(evt.key)) {
                            evt.preventDefault();
                          }
                        }}
                      />
                    </Form.Item>
                  </Col>

                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="landlineNo"
                    label="Landline No"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        min: 10,
                        max: 10,
                        pattern: "^([-]?[1-9][0-9]*|0)$",
                        message:
                          "Landline number must be 10 digit and numbers only",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Landline No"
                      onChange={landlineNoHandler}
                      maxLength={10}
                      autoComplete="off"
                    // type="number"
                    />
                  </Form.Item>
                </Col>
                {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="aadharNo"
                    label="Social Security (Aadhaar No.)"
                    rules={[
                      {
                        required: false,
                      },
                      {
                        min: 12,
                        max: 12,
                        pattern: "^([-]?[1-9][0-9]*|0)$",
                        message: "Aadhar No must be of 12 characters",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Your Aadhaar No"
                      onChange={aadharNoHandler}
                    />
                  </Form.Item>
                </Col> */}

                <Col xs={24} sm={12} md={24} lg={25} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name label-color"
                    name="email"
                    label="Email Address"
                    rules={[
                      {
                        type: "email",
                        required: false,
                        message: "Please provide valid email",
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Input
                      className="first-name input-box"
                      placeholder="Enter Your Email Address"
                      onChange={emailAddressHandler}
                      autoComplete="off"
                      maxLength="60"
                    />
                  </Form.Item>
                </Col>
                <br></br>
                <Col xs={24} sm={12} md={24} lg={24} xl={24}>
                  <Form.Item
                    className="form-item-name label-color"
                    name="addStatus"
                    label="Is the mailing address the same as the permanent address?"
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                    style={{ marginBottom: "1rem" }}
                  >
                    <Switch
                      size="large"
                      checkedChildren="Yes"
                      unCheckedChildren="No"
                      defaultChecked={true}
                      onChange={CheckMailingAddSameAsPermanentAdd}
                    />
                  </Form.Item>
                </Col>
                {!isSameAddress && (
                  // <Form layout="horizontal" className="contact-detail-form">
                  <>
                    <Col
                      xs={24}
                      sm={24}
                      md={24}
                      lg={24}
                      xl={24}
                      className="form-title"
                    >
                      <Title level={5} style={{ marginTop: "1rem" }}>
                        Permanent Address
                      </Title>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="secAddLine1"
                        label="Address line 1"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Input
                          className="first-name input-box"
                          placeholder="Enter Address line 1"
                          onChange={secAddLine1Handler}
                          value={secaddressLine1}
                          maxLength={35}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="secAddLine2"
                        label="Address line 2"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Input
                          className="first-name input-box"
                          placeholder="Enter Address line 2"
                          onChange={secAddLine2Handler}
                          value={secaddressLine2}
                          maxLength={35}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="secAddLine3"
                        label="Landmark"
                        rules={[
                          {
                            required: false,
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Input
                          className="first-name input-box"
                          placeholder="Enter Landmark"
                          onChange={secAddLine3Handler}
                          value={secaddressLine3}
                          maxLength={35}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                    {/* <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="secAddCountry"
                        label="Country"
                        hasFeedback
                        rules={[
                          {
                            required: false,
                            message: "Please select your city!",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          bordered={false}
                          style={{
                            width: "100%",
                            boxShadow: "none",
                            borderBottom: "rgb(153, 153, 153) 1px solid",
                            height: "2.5rem",
                            marginTop: "-10px",
                          }}
                          size="large"
                          placeholder="Select Your Country"
                        ></Select>
                      </Form.Item>
                    </Col> */}
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      {/* <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="secAddState"
                        label="State"
                        hasFeedback
                        rules={[
                          {
                            required: false,
                            message: "Select your State!",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          showSearch
                          style={{ marginTop: "-10px" }}
                          bordered={false}
                          className="select-box"
                          size="large"
                          defaultValue="Select"
                          placeholder="Select Your State"
                          options={stateOptions}
                          onSelect={secStateSelectHandler}
                          onChange={secStateChangedHandler}
                        ></Select>
                      </Form.Item> */}
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="state"
                        label="Province"

                        rules={[
                          {
                            required: false,
                            message: "Select your Province!",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          showSearch
                          bordered={false}
                          className="select-box"
                          // size="default"
                          placeholder="Select Your Province"
                          options={stateOptions}
                          onSelect={(e, data) => stateSelectHandler(e, data)}
                          value={stateProvince}
                          autoComplete="on"
                          // defaultValue={storeStateValue}
                          onChange={(item, key) => stateChangetHandler(item, key)}
                        // onChange={stateChangetHandler}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="city"
                        label="City"
                        rules={[
                          {
                            required: false,
                            message: "Please select your city!",
                          },
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Select
                          showSearch
                          bordered={false}
                          className="select-box"
                          size="default"
                          placeholder="Select a city"
                          options={citiesOptions}
                          autoComplete="off"
                          value={cityProvince}
                          // defaultValue={storeCityValue}
                          onChange={(item, key) => cityChangeHandler(item, key)}
                        ></Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        className="form-item-name label-color"
                        name="secAddPin"
                        label="Zipcode"
                        rules={[
                          {
                            required: false,
                          },
                          {
                          pattern: new RegExp(/^[0-9]{4}$/), // Ensures it has 4 digits
                          message: "Zipcode must be of 4 digits",
                          }
                        ]}
                        style={{ marginBottom: "1rem" }}
                      >
                        <Input
                          className="first-name input-box"
                          placeholder="Enter Zipcode"
                          onChange={secPincodeHandler}
                          maxLength={4}
                          autoComplete="off"
                        />
                      </Form.Item>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
            <div className="contactfooter">
              <Col
                className="form-body  p2300"
                xs={{ order: 5 }}
                sm={24}
                md={16}
                lg={15}
                xl={15}
                span={24}
                offset={width > breakpoint ? 6 : 0}
              >
                <div className="child">
                  <Button
                    className="last-btn-1"
                    // shape="round"
                    onClick={prevdHandler}
                    // size="large"
                    style={{
                      border: "1",
                      display: "flex",
                      alignItems: "center",
                    }}
                    icon={<ArrowLeftOutlined />}
                  >
                    Previous
                  </Button>
                  <Button
                    className="last-btn-1"
                    type="primary"
                    // shape="round"
                    // size="large"
                    style={{
                      backgroundColor: "#1D428A",
                      border: "none",
                      alignItems: "center",
                      display: "flex",
                      // marginLeft: 144,
                    }}

                    htmlType="submit"
                    onClick={proceedHandler}
                  >
                    Next  <ArrowRightOutlined />
                  </Button>
                </div>

                {/* <Col xs={11} sm={12} md={4}>
                    <Form.Item>
                      <Button
                        className="last-ss-btn-2"
                        type="primary"
                        // shape="round"
                        size="large"
                        style={{
                          backgroundColor: "rgb(59, 55, 30)",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                        }}
                        icon={<FileTextOutlined />}
                        htmlType="submit"
                        // disabled={!formIsValid}
                        // onClick={updateHandler}
                      >
                        Update
                      </Button>
                    </Form.Item>
                  </Col> */}
                <Col xs={11} sm={12} md={4}>
                  <Form.Item></Form.Item>
                </Col>
              </Col>
            </div>
          </Row>
        </Form>
      </div>
    </>
  );
});

export default ContactDetails;
