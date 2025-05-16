import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./VehicalInformationPage1.css";
import * as actions from "../../../../store/actions";
import axiosRequest from "../../../../axios-request/request.methods";
import { Row, Col, Button, Select, Form, message, Upload, Drawer } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import group_img from "../../../../images/Icon/Group.png";
import indivi from "../../../../images/Icon/indivi.png";
import img3 from "../../../../images/policyGroup/copy.png";
import img4 from "../../../../images/sharableLinkd_img/tap .png";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import { DrawerFunction } from "../../../ICARE/MotorComprehensive/MotorPolicyPage/MotorPolicyPage";

const VehicalInformationPage1 = () => {
  // console.log("vech", props);
  // console.log("vechtype", props.selectData);
  const dispatch = useDispatch();
  const location = useLocation();
  // hooks ***************
  // const ctplStore = useSelector(
  //   (state) => state?.ctplqoutation?.formData?.CTPL_Quotation_info
  // );

  const checkstate = useSelector((state) => state);

  console.log("checkstate->", checkstate);

  useEffect(() => {
    dispatch(actions.fetchAllVehicleCategory());
  }, [dispatch]);

  const [form] = Form.useForm();
  const history = useHistory();
  const { Option } = Select;
  const [size, setSize] = useState("default"); // default is 'middle'
  // const [policyTypeD, setPolicyTypeD] = useState("fullpolicy");
  const [activeButton, setActiveButton] = useState(null);
  const [travelType, setTravelType] = useState("");
  const [policyTypeList, setPolicyTypeList] = useState([]);
  const [loader, setLoader] = useState(false);

  // const [policyTypeD2, setPolicyTypeD2] = useState(
  //   ctplStore?.policyType ? ctplStore?.policyType : ""
  // );
  // const [policyTypeDVehical, setPolicyTypeDVehical] = useState(
  //   ctplStore?.policyForVehical ? ctplStore?.policyForVehical : ""
  // );
  // const [policyTypeData, setpolicyTypeData] = useState(
  //   ctplStore?.accountType ? ctplStore?.accountType : ""
  // );

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };
  // const dataInVehicle = {
  //   CTPL_Quotation_info: {
  //     issueType: policyTypeD,
  //     accountType: null,
  //     policyType: policyTypeD2,
  //     policyForVehical: policyTypeDVehical,
  //   },
  // };

  let vehicelCategoryApi = useSelector((state) => state?.make?.vehiclecategory);
  // Dropdown

  // functions *************
  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const onchangetoNext = async () => {
    if (travelType === "Fleet" || travelType === "Bulk") {
      history.push({
        pathname: "/ctpl-bulk-upload",
        data: { selectedButton },
      });

      // history.push({ pathname: "/ctpl-bulk-upload", data={ selectedButton } })
    } else {
      if (!selectedButton) {
        return message.error("Please select a policy type.");
      }

      setLoader(true);
      //dispatch(actions.storeQuotationForm(dataInVehicle));

      try {
        const response = await axiosRequest.get("user/getDocumentId");
        console.log("response", response);
        if (response.statusCode === -1) {
          setLoader(false);
          const documentId = response?.data?.documentId;
          dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
          history.push({
            pathname: "/vehicle-information",
          });
        } else {
          message.error(response.data);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        if (error?.response?.data?.statusCode === 1) {
          message.error(error?.response?.data?.data);
        }
      }
    }
  };

  const PolicyOptionOnchangeVehical = (e) => {
    console.log("Event-->", e);
    // setPolicyTypeDVehical(e);
    dispatch(actions.vehicalinformationHandler(e));
    // props.setSelectData(e);

    // console.log("setoptions", e);
  };

  const policyTypeOnChange = (e) => {
    // setpolicyTypeData(e);
  };

  const handleButtonClick = () => {
    // console.log("", );
    setActiveButton();
  };

  const handleProceed = (val) => {
    console.log("gcvhbjnk", val);
    setTravelType(val);
    // console.log("buttonIndex", buttonIndex);
    setActiveButton(val);
  };

  const getProductList = async () => {
    setLoader(true);
    const res = await axiosRequest.get("user/productList?product=CTPL");
    if (res.statusCode === -1) {
      setLoader(false);
      if (res?.data?.data) {
        setPolicyTypeList(res.data.data);
      }
    } else {
      setLoader(false);
      console.log("Not Found");
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  const [selectedButton, setSelectedButton] = useState(null);
  // this for the testign

  // this for the testing
  const [showDrawer, setShowDrawer] = useState(false);
  const handledraweOpenMobile = () => {
    history.push("/links");
  };
  const onClose = () => {
    setShowDrawer(false);
  };
  const handledrawerOpen = () => {
    setShowDrawer(true);
  };
  // this is for the tesing purpose
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  const handleDrawerClose = () => {
    setVisible(false);
  };

  return (
    <>
      <FullPageLoader fromapploader={loader} />
      {width > breakpoint && (
        <div className="main-classinfo">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            form={form}
          >
            <div className="">
              <div className="CTPLfirst-info">
                <h3>I need to issue a policy for</h3>
              </div>

              <Row gutter={16}>
                {policyTypeList &&
                  Array.isArray(policyTypeList) &&
                  policyTypeList.map((e, index) => {
                    return (
                      <Col xs={24} sm={24} md={24} lg={12} xl={12} key={index}>
                        {/* <Button
                   className={`${activeButton === e.name ? 'activeforMotorButtonPrice' : 'button-ctpl '}`}
                  //  className={`'button-ctp' ${e.name === activeButton ? 'activeforMotorButtonPrice' : 'button-ctp'}`}
                  onClick={() =>

                  handleProceed(e.name)}> */}
                        <Button
                          className={`${activeButton === e.name
                              ? "activeforMotorButtonPriceMotorInfo"
                              : "button-ctpl "
                            }`}
                          onClick={() => {
                            setSelectedButton(e.name);
                            handleProceed(e.name);
                          }}
                        >
                          <img
                            src={e.name === "Individual" ? indivi : group_img}
                          />
                          <div className="ctplfleet-span">
                            <span>{e.name}</span>
                            <span className="second-span-ctpl">
                              {e.sublabel}
                            </span>
                          </div>    
                        </Button>
                      </Col>
                    );
                  })}
                  <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                  <div className="product1-or-text1234inSharable">OR</div>
                </Col>
                <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                  <div
                    className="product1-tap1-container"
                    onClick={handledrawerOpen}
                  >
                    <div>
                      <span>{`Please tap here to `}</span>
                      <b>view shareable links</b>
                      <span> as per your commercial structure</span>
                    </div>
                    <div className="circleforpan1">
                      <img className="product1-icon-img1" alt="" src={img4} />
                    </div>
                  </div>
                </Col>
                
              </Row>

              <DrawerFunction onClose={onClose} showDrawer={showDrawer} />
            </div>
          </Form>
        </div>
      )}
      {width < breakpoint && (
        <Drawer
          placement="bottom"
          closable={false}
          onClose={handleDrawerClose}
          visible={visible}
          height="90%"
        >
          <div className="main-classinfo">
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              form={form}
            >
              <div className="">
                <div className="CTPLfirst-info">
                  <h3>I need to issue a policy for</h3>
                </div>

                <Row gutter={16}>
                  {policyTypeList &&
                    Array.isArray(policyTypeList) &&
                    policyTypeList.map((e, index) => {
                      return (
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          lg={12}
                          xl={12}
                          key={index}
                        >
                          {/* <Button
             className={`${activeButton === e.name ? 'activeforMotorButtonPrice' : 'button-ctpl '}`}
            //  className={`'button-ctp' ${e.name === activeButton ? 'activeforMotorButtonPrice' : 'button-ctp'}`}
            onClick={() =>

            handleProceed(e.name)}> */}
                          <Button
                            className={`${activeButton === e.name
                                ? "activeforMotorButtonPriceMotorInfo"
                                : "button-ctpl "
                              }`}
                            onClick={() => {
                              setSelectedButton(e.name);
                              handleProceed(e.name);
                            }}
                          >
                            <img
                              src={e.name === "Individual" ? indivi : group_img}
                            />
                            <div className="ctplfleet-span">
                              <span>{e.name}</span>
                              <span className="second-span-ctpl">
                                {e.sublabel}
                              </span>
                            </div>
                          </Button>
                        </Col>
                      );
                    })}
                    <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                    <div className="product1-or-text1234inSharable">OR</div>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={24} xl={24}>
                    <div
                      className="product1-tap1-container"
                      onClick={handledraweOpenMobile}
                    >
                      <div>
                        <span>{`Please tap here to `}</span>
                        <b>view shareable links</b>
                        <span> as per your commercial structure</span>
                      </div>
                      <div className="circleforpan1">
                        <img className="product1-icon-img1" alt="" src={img4} />
                      </div>
                    </div>
                  </Col>
                  
                </Row>
            

              </div>
            </Form>
          </div>
        </Drawer>
      )}
    </>
  );
};
export default VehicalInformationPage1;
