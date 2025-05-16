import React, { useState, useMemo, useEffect } from "react";
import "./OonaLogin.css";
import profile_img from "../../../images/Icon/Ellipse 5.png";
import {
  Button,
  Tag,
  Input,
  Typography,
  Avatar,
  Modal,
  Row,
  Col,
  Form,
  Select,
  message,
} from "antd";
import {
  CheckSquareOutlined,
  LogoutOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import UserInformation from "../UserInformation";
import rightarr from "../../../images/Icon/Feather.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkuserAccess, stoageGetter, stoageSetter } from "../../../helpers";
import * as actions from "../../../store/actions/index";
import axiosRequest from "../../../axios-request/request.methods";
import img1 from "../../../images/helpdesk/logout.png";
import shareicon from "../../../assets/sharebro.png";
import { DrawerFunction } from "../MotorComprehensive/MotorPolicyPage/MotorPolicyPage";

//import CustomToast from '../CustomTost/SuccessTost/SucessTost'
import _ from "lodash";
import OonaFooter from "../OonaFooter/OonaFooter";

import BottomNavigation from "../bottomNavigation/bottomNavigation";
import AgentShareLink from "../AgentComponents/AgentShareLink/AgentShareLink";

const { Paragraph } = Typography;

const OonaLogin = () => {
  let login_user_data = stoageGetter("user");

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  console.log("said", login_user_data);
  const states = useSelector((state) => state?.address?.states);
  // const statesNew = useSelector((state) => state?.address?.states);
  // console.log("statesNew", statesNew);
  let cities = useSelector((state) => state?.address?.cities?.lov);
  console.log("cities", cities);
  const logged_in_user =
    login_user_data.firstName + " " + login_user_data.lastName;

  let avatar = logged_in_user?.match(/\b(\w)/g);
  const mobileNumber = login_user_data.mobileNo;
  const emailAddress = login_user_data.primaryEmail;
  const province = login_user_data.state;
  const city = login_user_data.city;
  const bankNumberData = login_user_data.accountNo;
  const EmployeeCode = login_user_data?.employeeCode;

  let _storeData = useSelector((state) => state);
  const location = useLocation();
  const userId = useSelector((state) => state.login.userId);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showCustomToast, setShowCustomToast] = useState(false);

  const [form] = Form.useForm();
  const [showMsg, setShowMsg] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [MobileNumber, setMobileNumber] = useState(mobileNumber);
  const [Email, setEmail] = useState(emailAddress);
  const [stateProvince, setStateProvince] = useState("");
  const [StateProvinceName, setStateProvinceName] = useState(province);

  const [Code, setCode] = useState("");
  const [cityProvince, setCityProvince] = useState(" ");
  const [cityProvinceName, setCityProvinceName] = useState(city);
  const [showDrawer, setShowDrawer] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleSaveForm = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handledraweOpenMobile = () => {
    history.push("/links");
  };
  const onClose = () => {
    setShowDrawer(false);
  };
  const handledrawerOpen = () => {
    setShowDrawer(true);
  };
  // const handleDrawerClose = () => {
  //   setVisible(false);
  // };

  const handleShowToast = () => {
    setShowCustomToast(true);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    dispatch(
      actions.fetchAllState((restult) => {
        if (restult.statusCode === -1) {
          console.log("Logs");
        } else {
          console.log("out");
        }
      })
    );
    dispatch(actions.fetchAllCities());
    setEmail(login_user_data.primaryEmail);
    form.setFieldsValue({
      Email: login_user_data.primaryEmail,
    });

    setMobileNumber(login_user_data.mobileNo);
    form.setFieldsValue({
      MobileNumber: login_user_data.mobileNo,
    });
    setStateProvinceName(login_user_data.state);
    form.setFieldsValue({
      StateProvinceName: login_user_data.state,
    });

    setCityProvinceName(login_user_data.city);
    form.setFieldsValue({
      cityProvinceName: login_user_data.city,
    });
  }, [dispatch]);

  // useEffect(()=>{
  //   setPutTrigger(true)
  //   if ( putTrigger ) {}
  // },[putTrigger])

  const nameShorter = (str) => {
    try {
      if (str !== "") {
        str = str.toUpperCase();
        let arr = str.split(" ");
        let fLatter = arr[0].charAt(0);
        let sLatter = arr[1].charAt(0);
        // fLatter = fLatter.charAt(0);
        // sLatter = sLatter.charAt(0);
        str = fLatter + sLatter;
      }
      return str;
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };

  const stateSelectHandler = (value, key) => {
    console.log("value---->", value, "Key---->state--->", key);
    setCode(key.COD_PROV);
    dispatch(actions.fetchAllCities(key.COD_PROV));
  };

  const stateChangetHandler = (event, key) => {
    setStateProvince(key.COD_PROV);
    setStateProvinceName(key.NOM_PROV);
    // setStateProvince2(key.key);
    //cityProvince = "";
    setCityProvince("");
  };
  const cityChangeHandler = (value, key) => {
    setCityProvinceName(key.NOM_LOCALIDAD);
    setCityProvince(key.COD_LOCALIDAD);
    // setCityProvince2(key.key);
  };

  // province city api

  // if (statesNew === "Error") {
  //   message.error("Server Error")
  // }else{

  // }

  if (
    states !== undefined &&
    states !== null &&
    Object.keys(states).length !== 0
  ) {
    states?.sort(function (a, b) {
      const stateName1 = a.NOM_PROV?.toUpperCase();
      const stateName2 = b.NOM_PROV?.toUpperCase();
      if (stateName1 < stateName2) {
        return -1;
      }
      if (stateName1 > stateName2) {
        return 1;
      }
    });
  }

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
  console.log("stateOptions", stateOptions);

  let citiesOptions = [];
  if (cities?.message === "No data found") {
  } else {
    citiesOptions =
      cities && !_.isEmpty(cities)
        ? cities.map((city) => {
            const label = city.NOM_LOCALIDAD;
            const value = city.COD_LOCALIDAD;
            const key = city.COD_LOCALIDAD;
            const newCities = { ...city, label, value, key };
            return newCities;
          })
        : null;
  }

  // const agent_id = useSelector((state) => state.login.agent_id)
  let user = stoageGetter("user");
  const empId = user.employeeCode;

  const onLogout = () => {
    window.localStorage.clear();
    dispatch(actions.logout());
    history.push("/login");
  };
  var channelCode = login_user_data.channelCode.channelCode;

  const submitHandler = (formData) => {
    let editInfo = {
      primary_email: Email,
      mobile_no: MobileNumber,
      state: StateProvinceName,
      stateCode: stateProvince,
      city: cityProvinceName,
      cityCode: cityProvince,
    };

    console.log(editInfo, "editInfo");
    console.log("test", login_user_data.id);
    axiosRequest
      .put(`user/updateAgent/${login_user_data.id}`, editInfo)
      .then((res) => {
        console.log(res, "res");
        //  if (res.statusCode == -1) {
        // login_user_data.primaryEmail = res.data.primaryEmail;
        stoageSetter("user", editInfo);
        login_user_data = stoageGetter("user");
        console.log("said", login_user_data);

        // stoageSetter("mobileNo", res.data.mobile_no);
        // stoageSetter("state", res.data.state);
        // stoageSetter("city", res.data.city);

        setEmail(login_user_data?.primaryEmail);
        setMobileNumber(login_user_data?.mobileNo);
        setStateProvinceName(login_user_data?.state);
        setCityProvinceName(login_user_data.city);

        // emailAddress = res.data.primaryEmail;
        // setEmail(res.data.primaryEmail);
        // setMobileNumber(res.data.mobileNo);
        // setStateProvinceName(res.data.state);
        // setCityProvinceName(res.data.city);

        // if (res.statusCode == 1) {
        //   setShowMsg(true);
        //   message.success("Details are updated successfully");
        // }
      });
  };

  return (
    <>
      <div className="main-container">
        <div className="login-card-oona" style={{ marginBottom: "15px" }}>
          <div className="main-parent">
            <div className="parent">
              <div className="profile-img">
                {/* <img src={profile_img} /> */}
                <Avatar
                  style={{
                    paddingTop: "-40px",
                    lineHeight: "none",
                    // backgroundColor: getRandomColor(),
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "45px",
                    width: "45px",
                  }}
                  size={{ xl: 45 }}
                >
                  {nameShorter(logged_in_user)}
                </Avatar>
              </div>
              <div className="page-title">
                <h3>{logged_in_user}</h3>
                <p>
                  EmployeeCode -{" "}
                  <span style={{ color: "#1D428A", fontWeight: "600" }}>
                    {EmployeeCode}
                  </span>{" "}
                  - Icare agent since Feb 2025
                </p>
                <Tag>
                  TIER 1{" "}
                  <span style={{ margintop: "0px" }}>
                    {" "}
                    <CheckCircleFilled />
                  </span>
                </Tag>
              </div>
              
            </div>
            

            {/* <div className='card-data-profile'>
                    <div className='card-data-name'>
                        <p>Bonus Balance</p>
                        <h4>620</h4>
                    </div>
                    <div className='card-data-name'>
                        <p>Oona Points</p>
                        <h4>6200</h4>
                    </div>
                </div> */}
          </div>
          {/* <div className="copy-agent-onboarding">
                <AgentShareLink />
              </div> */}
        </div>

        {/* components */}
        <UserInformation />

        <div className="profile-information">
          {/* <Button
            type="primary"
            onClick={showModal}
            style={{ background: "#1D428A", borderRadius: '12px', border: 'none' }}
          >
            Edit Profile
          </Button> */}
          <Modal
            title="Edit Profile"
            visible={isModalOpen}
            onCancel={handleCancel}
            // okText='Submit Details'
            width={800}
            footer={null}
            mask={true}
            maskStyle={{ backgroundColor: "rgb(0, 0, 0, 0.5)" }}
            // bodyStyle={{ overflowX: "scroll", height: "calc(100vh - 200px)" }}
          >
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              // onFinish={onFinish}
              // onFinishFailed={onFinishFailed}
              onFinish={submitHandler}
              // autoComplete="off"\
              form={form}
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Email"
                    label="Email"
                  >
                    <Input
                      className="first-name input-box"
                      size="default"
                      maxLength="30"
                      placeholder="Email"
                      value={Email}
                      defaultValue={Email}
                      onChange={(item) => onChangeEmail(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
                    name="Mobile"
                    label="Mobile"
                  >
                    <Input
                      className="first-name input-box"
                      size="default"
                      maxLength="30"
                      placeholder="Mobile"
                      value={MobileNumber}
                      defaultValue={MobileNumber}
                      onChange={(item) => onChangeMobileNumber(item)}
                      autoComplete="off"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    className="form-item-name la"
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
                      className="select-box"
                      // size="default"
                      placeholder="Select Your Province"
                      options={stateOptions}
                      onSelect={(e, data) => stateSelectHandler(e, data)}
                      value={StateProvinceName}
                      defaultValue={StateProvinceName}
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
                    className="form-item-name la"
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
                      className="select-box"
                      size="default"
                      placeholder="Select a city"
                      options={citiesOptions}
                      autoComplete="off"
                      value={cityProvinceName}
                      defaultValue={cityProvinceName}
                      onChange={(item, key) => cityChangeHandler(item, key)}
                      onSearch={onSearch}
                      filterOption={filterOption}
                    ></Select>
                  </Form.Item>
                </Col>
              </Row>

              <Button
                htmlType="submit"
                onClick={handleSaveForm}
                className="button-details"
              >
                Submit Details{" "}
              </Button>
            </Form>
          </Modal>
          <div className="email-name">
            <div className="inner-info">
              <p>Email</p>
              <h4>{Email}</h4>
            </div>
            <hr />
            <div className="inner-info">
              <p>Phone</p>
              <h4>{MobileNumber}</h4>
            </div>
            <hr />

            <div className="inner-info">
              <p>Address</p>
              <h4 style={{ marginLeft: "6px" }}>
                {StateProvinceName},{cityProvinceName}
              </h4>
            </div>
            <hr />
            <div className="inner-info">
              <p>Bank</p>
              <h4>{bankNumberData ? bankNumberData : "-"}</h4>
            </div>
            <hr />
          </div>
        </div>
        {/* ghb */}
        {/* agent onboarding butto start here */}
        {/* <AgentShareLink /> */}
        {/* agent onboarding butto end here */}
        
        {/*  */}

        {/* {channelCode === "CH2" ? (
          <DrawerFunction onClose={onClose} isfromprofile={true} showDrawer={showDrawer} />
          
          // <div className="sharelinkdiv">
          //   <p className="ptagprofile">
          //     Please click on your agent type to share link with your customer.
          //   </p>
          //   <span>
          //     <svg
          //       xmlns="http://www.w3.org/2000/svg"
          //       width="20"
          //       height="20"
          //       viewBox="0 0 20 20"
          //       fill="none"
          //       onClick={handledrawerOpen}
          //     >
          //       <g clip-path="url(#clip0_1546_1518)">
          //         <path
          //           d="M15 13.3998C14.3667 13.3998 13.8 13.6498 13.3667 14.0415L7.425 10.5832C7.46667 10.3915 7.5 10.1998 7.5 9.99984C7.5 9.79984 7.46667 9.60817 7.425 9.4165L13.3 5.9915C13.75 6.40817 14.3417 6.6665 15 6.6665C16.3833 6.6665 17.5 5.54984 17.5 4.1665C17.5 2.78317 16.3833 1.6665 15 1.6665C13.6167 1.6665 12.5 2.78317 12.5 4.1665C12.5 4.3665 12.5333 4.55817 12.575 4.74984L6.7 8.17484C6.25 7.75817 5.65833 7.49984 5 7.49984C3.61667 7.49984 2.5 8.6165 2.5 9.99984C2.5 11.3832 3.61667 12.4998 5 12.4998C5.65833 12.4998 6.25 12.2415 6.7 11.8248L12.6333 15.2915C12.5917 15.4665 12.5667 15.6498 12.5667 15.8332C12.5667 17.1748 13.6583 18.2665 15 18.2665C16.3417 18.2665 17.4333 17.1748 17.4333 15.8332C17.4333 14.4915 16.3417 13.3998 15 13.3998ZM15 3.33317C15.4583 3.33317 15.8333 3.70817 15.8333 4.1665C15.8333 4.62484 15.4583 4.99984 15 4.99984C14.5417 4.99984 14.1667 4.62484 14.1667 4.1665C14.1667 3.70817 14.5417 3.33317 15 3.33317ZM5 10.8332C4.54167 10.8332 4.16667 10.4582 4.16667 9.99984C4.16667 9.5415 4.54167 9.1665 5 9.1665C5.45833 9.1665 5.83333 9.5415 5.83333 9.99984C5.83333 10.4582 5.45833 10.8332 5 10.8332ZM15 16.6832C14.5417 16.6832 14.1667 16.3082 14.1667 15.8498C14.1667 15.3915 14.5417 15.0165 15 15.0165C15.4583 15.0165 15.8333 15.3915 15.8333 15.8498C15.8333 16.3082 15.4583 16.6832 15 16.6832Z"
          //           fill="#1D428A"
          //         />
          //       </g>
          //       <defs>
          //         <clipPath id="clip0_1546_1518"  >
          //           <rect width="20" height="20" fill="white" />
          //         </clipPath>
          //       </defs>
          //     </svg>
          //   </span>
          // </div>
        ) : null} */}

        {/* <div className="logout-button"> */}
          <div className="logout-button-css">
          
          <Button onClick={onLogout}>
            <span style={{ color: "#fff", marginRight: "10px" }}>
              {/* <LogoutOutlined /> */}
              <img src={img1} />
            </span>
            Log Out
          </Button>
          </div>
        {/* </div> */}
      </div>

      {/* <div style={{ marginTop: "75px" }}>
        <BottomNavigation />
        <OonaFooter />
      </div> */}
    </>
  );
};

export default OonaLogin;
