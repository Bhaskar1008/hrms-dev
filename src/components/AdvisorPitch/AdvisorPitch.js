// import { Menu, Switch, Divider, Tabs, Typography, Row, Col } from 'antd';
import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Form,
  Menu,
  Tabs,
  Typography,
  Button,
  Input,
  Radio,
  Select,
  Cascader,
  DatePicker,
  Space,
  Modal,
} from "antd";
import { Divider, Image, Card } from "antd";

import "./AdvisorPitch.css";
import MainTabs from "../../components/MainTabs/MainTabs";
import MTabs from "../../components/Tab/Tab";
import axiosRequest from "../../axios-request/request.methods";

// ---- Import Image ------ //
import amit_img from "../../assets/Amit.jpg";
import deepak_img from "../../assets/Deepak.jpg";
import jagjit_img from "../../assets/Jagjit.jpg";
import chandubhai_img from "../../assets/Chandubhai.jpg";
import sandeep_img from "../../assets/Sandeep.jpg";
import { useSelector } from "react-redux";
import actionNoData from "../../assets/Actionnodata.png";
const tabMenu = [
  {
    id: "customerpitch",
    value: "Customer Pitch",
  },
  {
    id: "advisorpitch",
    value: "Advisor Pitch",
  },
];

const tabsData = [
  { title: "About Us", key: "aboutUs" },
  { title: "Benefits", key: "benefitStory" },
  { title: "Success Story", key: "successStory" },
  // Add more tab objects as needed
];
const { Title } = Typography;

const AdvisorPitch = () => {
  const [resultData, setResultData] = useState([]);
  const [keychange, setKeyChange] = useState("aboutUs");

  const userData = useSelector((state) => state.login.user);
  const currUserChannelCode = userData.channelCode.channelCode;
  const currUserChannelId = userData.channelCode._id;

  let { innerWidth: width, innerHeight: height } = window;
  const { TabPane } = Tabs;
  const [tabPosition, setTabPosition] = useState(
    width <= "374"
      ? "top"
      : width <= "424"
        ? "top"
        : width <= "767"
          ? "top"
          : width <= "1023"
            ? "top"
            : "left"
  );

  useEffect(() => {
    showDatainAdvisorPitch(keychange);
  }, []);

  useEffect(() => {
  }, [resultData]);

  async function showDatainAdvisorPitch(event) {
    const initialresult = await axiosRequest.get(
      `admin/advisorPitch/list/${event}`
    );
    var result = [];
    // for (let i of initialresult.data) {
    result = initialresult.data;
    // }

    setResultData(result);
  }
  function handleTabClick(key) {
    console.log("checkkey",key)
    showDatainAdvisorPitch(key);
    // setKeyChange(key);
    // showDatainAdvisorPitch();
  }
  // useEffect(() => {
  //   showDatainAdvisorPitch();
  // }, [keychange])

  return (
    <>
      <div className="Advisor-main">
        <div className="advisorytab">
          <MTabs
            style
            tabMenu={tabMenu}
            activeKey="advisorpitch"
            header="Presales Tools"
          />
        </div>
        <div className="Advisorpitch-row-flex">
          <Tabs
            tabPosition={tabPosition}
            onTabClick={handleTabClick}
            style={{ fontSize: "12px" }}
            className="AdvisorPitch-Container"
            tabBarGutter={0}
            tabBarStyle={{ overflowX: 'auto' }}
            moreIcon={null}
          >

            {tabsData.map((tab) => (
              <TabPane tab={tab.title} key={tab.key} className="AdvisorPitch">
                <div className="Advisorpitch-details-card-style top-tabs-height ">
                  <div className="Advisorpitch-details-card-content-align">
                    <Col
                      xs={{ order: 3 }}
                      sm={24}
                      md={24}
                      lg={{ order: 3 }}
                      xl={{ order: 3 }}
                      span={22}
                    >
                      {resultData && resultData.length > 0 ? (
                        <Row gutter={["", 24]}>
                          {resultData.map((item) => (
                            <Col
                              className=""
                              xs={22}
                              sm={24}
                              md={24}
                              lg={24}
                              xl={24}
                              span={24}
                              key={item._id}
                            >
                              <h3 className="headingg">{item.title ? item.title :''}</h3>
                              <p className="headingg1">{item.description ? item.description :''}</p>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <Card className="card" style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "column",
                            }}
                          >
                            <img src={actionNoData} alt="No Data" />
                            <p
                              style={{
                                fontWeight: 600,
                                color: "#01b4bb",
                                fontSize: "22px",
                              }}
                            >
                              No Records Found!
                            </p>
                          </div>
                        </Card>
                      )}
                    </Col>
                  </div>
                </div>
              </TabPane>
            ))}



            {/* <TabPane tab="Benefits" key="benefitStory" className="AdvisorPitch">
              <div className="Advisorpitch-details-card-style ">
                <div className="Advisorpitch-details-card-content-align">
                  {resultData &&
                    resultData.length > 0 ? <>
                    <Row gutter={["", 24]}>
                      {
                        resultData.map(item => (
                          <Col
                            className=""
                            xs={22}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            span={24}
                            key={item._id}
                          >

                            <h3 className="headingg">{item.title}</h3>
                            <p className="headingg1">{item.description}</p>
                          </Col>
                        ))
                      }

                    </Row>
                  </> : <>
                    <Card className="card" style={{ width: "100%" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <img src={actionNoData} />
                        <p
                          style={{
                            fontWeight: 600,
                            color: "#01b4bb",
                            fontSize: "22px",
                          }}
                        >
                          No Records Found!
                        </p>
                      </div>
                    </Card>
                  </>}

                </div>
              </div>
            </TabPane>


            <TabPane
              tab="Success Story"
              key="successStory"
              className="AdvisorPitch-Success-Story"
            >
              <div className="success_story">
                {resultData &&
                  resultData.length > 0 ? <>
                  <Row gutter={["", 24]}>
                    {
                      resultData.map(item => (
                        <div>
                          <Col
                            className=""
                            xs={22}
                            sm={24}
                            md={24}
                            lg={24}
                            xl={24}
                            span={24}
                            key={item._id}
                          >

                            <h3 className="headingg">{item.title}</h3>
                            <p className="headingg1">{item.description}</p>
                            <Image
                              src={item.imageUrl}
                              style={{
                                width: "40%",
                                backgroundSize: "40% 40%",
                              }}
                            />
                          </Col>
                        </div>



                      ))
                    }

                  </Row>
                </> : <>
                  <Card className="card" style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img src={actionNoData} />
                      <p
                        style={{
                          fontWeight: 600,
                          color: "#01b4bb",
                          fontSize: "22px",
                        }}
                      >
                        No Records Found!
                      </p>
                    </div>
                  </Card>
                </>}
                <Row gutter={["", 24]}>
                  {
                    resultData.map(item => (
                      <Col
                        className=""
                        xs={22}
                        sm={24}
                        md={24}
                        lg={24}
                        xl={24}
                        span={24}
                        key={item._id}
                      >

                        <h3 className="headingg">{item.title}</h3>
                        <p className="headingg1">{item.description}</p>
                        <Image
                          src={item.imageUrl}
                          style={{
                            width: "40%",
                            backgroundSize: "40% 40%",
                          }}
                        />
                      </Col>


                    ))
                  }

                </Row>
              </div>
            </TabPane> */}

          </Tabs>
        </div>
      </div>
    </>
  );
};
export default AdvisorPitch;
