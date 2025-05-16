import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./MotorPolicyPage.css";
import * as actions from "../../../../store/actions";
import axiosRequest from "../../../../axios-request/request.methods";
import { Row, Col, Button, Select, Form, message, Upload, Drawer } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";
import group_img from "../../../../images/Icon/Group.png";
import indivi from "../../../../images/Icon/indivi.png";
import img3 from "../../../../images/policyGroup/copy.png";
import MessageEmail from "../../../ICARE/SharableLink/components/messageEmail";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
import apiConfig from "../../../../config/api.config";
// this is this is my function
export const DrawerFunction = ({ onClose, showDrawer }) => {
  const { baseURL } = apiConfig;

  const [bacoAgent, setBacoAgent] = useState(false);
  const [lasAgent, setLasAgent] = useState(false);
  const [mboAgent, setMboAgent] = useState(false);

  const handleDrawerClose = () => {
    setBacoAgent(false);
    setLasAgent(false);
    setMboAgent(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={handleDrawerClose}
      visible={showDrawer}
    >
      <div
        className="dr-main-commercial1"
        style={{ overflowY: "auto", height: "100%" }}
      >
        <div className="dr-agent-info-container1">
          <div className="dr-flex-container">
            <div className="dr-bold-text1">Commercial Structure</div>
            <div className="dr-share-instruction-text1">
              <span>{`Please click on your agent type to `}</span>
              <b>share link with your customer</b>
              <span>.</span>
            </div>
          </div>
          <div className="dr-agent-type-container1">
            <div className="dr-agent-type">
              <div className="dr-agent-title">
                <div className="dr-bold-text1">BACOLOD AGENTS</div>
              </div>
              <div
                className="dr-share-link-container1"
                onClick={() => setBacoAgent(true)}
              >
                <div className="dr-flex-container1">
                  <div className="dr-flex-item">
                    Tap here to share link with customer
                  </div>
                </div>
                <div className="dr-share-link-icon">
                  <img className="dr-image-style" alt="sharlink" src={img3} />
                </div>
              </div>
            </div>

            {bacoAgent && <MessageEmail />}

            <div className="dr-agent-type">
              <div className="dr-agent-title">
                <div className="dr-bold-text1">LAS PINAS AGENTS</div>
              </div>
              <div
                className="dr-share-link-container1"
                onClick={() => setLasAgent(true)}
              >
                <div className="dr-flex-container1">
                  <div className="dr-flex-item">
                    Tap here to share link with customer
                  </div>
                </div>
                <div className="dr-share-link-icon">
                  <img className="dr-image-style" alt="sharlink" src={img3} />
                </div>
              </div>
            </div>
            {lasAgent && <MessageEmail />}
            <div className="dr-agent-type">
              <div className="dr-agent-title">
                <div className="dr-bold-text1">MBO AGENTS</div>
              </div>
              <div
                className="dr-share-link-container1"
                onClick={() => setMboAgent(true)}
              >
                <div className="dr-flex-container1">
                  <div className="dr-flex-item">
                    Tap here to share link with customer
                  </div>
                </div>
                <div className="dr-share-link-icon">
                  <img className="dr-image-style" alt="sharlink" src={img3} />
                </div>
              </div>
            </div>
            {mboAgent && <MessageEmail />}
          </div>
        </div>
      </div>

    </Drawer>
  );
};

const MotorPolicyPage = () => {
  const dispatch = useDispatch();

  const checkstate = useSelector((state) => state);

  console.log("checkstate->", checkstate);

  useEffect(() => {
    dispatch(actions.fetchAllVehicleCategory());
  }, [dispatch]);

  const [form] = Form.useForm();
  const history = useHistory();
  const { Option } = Select;
  const [size, setSize] = useState("default"); // default is 'middle'

  const [activeButton, setActiveButton] = useState(null);
  const [travelType, setTravelType] = useState("");
  const [policyTypeList, setPolicyTypeList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  let vehicelCategoryApi = useSelector((state) => state?.make?.vehiclecategory);

  const onChangetoDashboard = () => {
    history.push("/iCare-Dashboard");
  };

  const PolicyOptionOnchangeVehical = (e) => {
    console.log("Event-->", e);

    dispatch(actions.vehicalinformationHandler(e));
  };

  const policyTypeOnChange = (e) => { };

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
    const res = await axiosRequest.get("user/productList?product=MOTOR");
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

  const onchangetoNext = async () => {
    if (travelType === "Fleet" || travelType === "Bulk") {
      history.push({
        pathname: "/motor-bulk",
        data: { selectedButton },
      });

      // history.push("/motor-bulk");
    } else {
      if (!selectedButton) {
        return message.error("Please select a policy type.");
      }
      setLoader(true);
      try {
        const response = await axiosRequest.get("user/getDocumentId");
        console.log("response", response);
        if (response.statusCode === -1) {
          setLoader(false);
          const documentId = response?.data?.documentId;
          dispatch({ data: documentId, type: "CURRENT_DOCUMENTS_ID" });
          history.push({
            pathname: "/price-check-info",
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
  // this for the testing
  const [showDrawer, setShowDrawer] = useState(false);
  const onClose = () => {
    setShowDrawer(false);
  };
  const handledrawerOpen = () => {
    setShowDrawer(true);
  };

  return (
    <>
      <FullPageLoader fromapploader={loader} />
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
                    <Col xs={24} sm={24} md={12} lg={12} xl={12} key={index}>
                      <Button
                        className={`${activeButton === e.name
                          ? "activeforMotorButtonMotorInfo"
                          : "button-Motor "
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
                          <span className="second-span-ctpl">{e.sublabel}</span>
                        </div>
                      </Button>
                    </Col>
                  );
                })}
              {/* <Col xs={24} sm={24} md={12} lg={24} xl={24} >
                <div className="product1-tap-container" onClick={handledrawerOpen}>
                  <div className="custom-flex-1">
                    <span>{`Please tap here to `}</span>
                    <b>view shareable links</b>
                    <span> as per your commercial structure</span>
                  </div>
                  <div className="circleforpan">
                    <img
                      className="product1-icon-img"
                      alt=""
                      src={img4}
                    />
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={24} xl={24} >
                <div className="product1-or-text12">
                  OR

                </div>
              </Col> */}
            </Row>
            <div>
              <DrawerFunction showDrawer={showDrawer} onClose={onClose} />
            </div>

            <div className="btndiv">
              <Button
                className="next"
                onClick={onchangetoNext}
                htmlType="submit"
              >
                Proceed <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
};
export default MotorPolicyPage;
