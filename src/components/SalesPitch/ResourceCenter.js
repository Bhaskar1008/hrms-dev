import { Tabs, Col, Form, Row, Carousel, Image, Typography, Divider, Descriptions, Modal, Input, message } from "antd";

import { FileDoneOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useDebugValue, useState, useEffect, useRef } from "react";
import { Card, Select } from "antd";
import { Button } from "antd";
import "./ResourceCenter.css";
// import './SalesPitch.css';
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom";
import { Alert } from "antd";
import video from "./video.mp4";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined, MailOutlined, CloseOutlined, ShareAltOutlined, PieChartOutlined, PlusCircleFilled } from "@ant-design/icons";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import VideoPlayer from "react-video-js-player";
import MainTabs from "../../components/MainTabs/MainTabs";
import MTabs from "../../components/Tab/Tab";
import menu from "../../assets/menu-resource.png";
import resourcereset from "../../assets/resourcereset.png";
import content from "../../assets/contentback.png";
import mainimg from "../../assets/1a7da86d83ebe30862d8ea221384817848118054.jpg";
import rightarw from "../../assets/rightarrow.png";
import shareit from "../../assets/shareit.png";
import viewicon from "../../assets/viewicon.png";
import actionNoData from "../../assets/Actionnodata.png";
import axiosRequest from "../../axios-request/request.methods";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { map } from "lodash";
import { getImage } from "@antv/l7plot/dist/lib/core/map/register";
import { error } from "jquery";
const { Meta } = Card;

const tabMenu = [
  { id: "Products & Sales", value: "Products & Sales" },
  { id: "Others", value: "Others" },
];
const { Option } = Select;
const { Text } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
const { Title } = Typography;
const ResourceCenter = () => {
  const dispatch = useDispatch();
  let _store = useSelector((state) => state.login.user);
  console.log("_store", _store.channelCode.channelCode);
  let { innerWidth: width, innerHeight: height } = window;
  const { TabPane } = Tabs;
  const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" : width <= "767" ? "top" : width <= "1023" ? "top" : "left");
  const [tabs, setTabs] = useState([]);
  const [list, setList] = useState([]);
  const [data, setData] = useState("");
  const [showmore, setShowMore] = useState(false);
  const [tabswitch, setTabSwitch] = useState(false);
  const [tagSwitch, setTagSwitch] = useState("Motor");
  const [currentData, setCurrentData] = useState([]);
  console.log("currentData==================>", currentData);
  const [type, setType] = useState("all");
  const [productData, setProductData] = useState([]);
  console.log("productData", productData);
  const [activeId, setActiveId] = useState("");
  const [activeTabName, setActiveTabName] = useState("");
  const [openloader, setOpenloader] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState({
    show: false,
    data: null,
  });
  const [activeTab, setActiveTab] = useState(tabMenu[0].id);
  const [mailSendTo, setMailSendTo] = useState(_store.primaryEmail);
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const videoSrc = video;
  const poster = "video.mp4";

  const videoRef = useRef();
  // const marketingTab = () => {
  // setMarketing(true);
  // setInsurance(false);
  // };

  // const insuranceTab = () => {
  // setInsurance(true);
  // setMarketing(false);
  // };

  // const Video = async () => {
  //   setType("VIDEO");
  //   try {
  //     let res = await axiosRequest.get(
  //       "admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=video&skip=0",
  //       { secure: true }
  //     );
  //   } catch (error) {
  //   }
  // };

  // const Pdf = async () => {
  // setType("PDF");
  // try {
  // let res = await axiosRequest.get(
  // "admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=pdf&skip=0",

  // { secure: true }
  // );
  // } catch (error) {
  // }
  // };

  // const Articles = async () => {
  // setType("ARTICLE");
  // try {
  // let res = await axiosRequest.get(
  // "admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=articles&skip=0",
  // { secure: true }
  // );
  // } catch (error) {
  // }
  // };

  // const Infographic = async () => {
  // setType("INFOGRAPHIC");
  // try {
  // let res = await axiosRequest.get(
  // "admin/fetch_resources?channel_code=CH1&role_code=ZSM03&filter=1&filter_by=5d8f12d819a6cb5e86c6f994&filterByMediaCategory=infographic&skip=0",
  // { secure: true }
  // );
  // } catch (error) {
  // }
  // };

  useEffect(() => {
    typeData();
  }, [type]);

  useEffect(() => {
    // getData();
  }, [activeId]);

  useEffect(() => {
    typeData();
  }, [tagSwitch, tabswitch, activeId]);

  useEffect(() => {
    axiosRequest
      .get(`admin/fetch_resource_category?filter=1&userId=${_store.id}&channel_code=${_store.channelCode.channelCode}&role_code=${_store.userRole[0].roleCode}`, { secure: true })
      .then((res) => {
        console.log("newLead.", res?.data?.[0]?._id);
        if (res.length !== 0) {
          console.log("head", res);
          setProductData(res?.data);
          setActiveId(res?.data?.[0]?._id);
          setActiveTabName(res.data?.[0]?.ResourceCenterName);
        }
      })
      .catch();

    axiosRequest
      .get(`admin/get_all_tags`, { secure: true })
      .then((res) => setTabs(res.data))
      .catch();
  }, []);

  const getData = () => {
    axiosRequest
      .get(`admin/fetch_resources?channel_code=${_store.channelCode.channelCode}&role_code=${_store.userRole[0].roleCode}&filter=1&filter_by=${activeId}&skip=0`, { secure: true })
      .then((res) => {
        console.log("reserrMsg====>", res);
        setCurrentData(res?.data?.[0]);
        resetDataFilter();
      })
      .catch();
  };

  const handleDelete = (id) => {
    setList((oldData) => oldData.filter((elem, index) => index !== id));
  };

  const handleSubmit = (e) => {
    if (data) {
      setList((oldData) => [...oldData, data]);
      setData("");
    } else {
      message.error("Please add an e-mail first");
    }
    e.preventDefault();
  };

  const tagSwitchfun = () => {
    activeId &&
      axiosRequest
        .get(
          `admin/fetch_resources?channel_code=${_store.channelCode.channelCode}&role_code=${_store.userRole[0].roleCode}&filter_by=${activeId}&filter=1&tagName=${tagSwitch}&skip=0`, // filter_by
          { secure: true }
        )
        .then((res) => {
          if (res.statusCode === -1) {
            setCurrentData(res?.data[0]);
          } else {
            setCurrentData([]);
            console.log("fghj");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
  };

  const handleOk1 = async () => {
    setOpenloader(true);
    // console.log(isModalVisible1.data, "---------her eis data");
    if (isModalVisible1.data) {
      if (list.length === 0) {
        message.error("Please,add an E-mail");
        setOpenloader(false);
        return;
      }
      const data = {
        share_resource_data: isModalVisible1.data.mediaFiles.length > 0 ? isModalVisible1.data.mediaFiles[0].location : isModalVisible1.data.thumbnail,
        product_name: isModalVisible1.data.contentCategory,
        sendto: list,
      };
      try {
        let res = await axiosRequest.post(`user/send_share_resource`, data);
        if (res.statusCode === -1) {
          setIsModalVisible1({ show: false, data: null });
          setOpenloader(false);
          setList([]);
          // return message.success("Sending Message Thank You");
        }
      } catch (error) {
        // console.log(error);
        message.error("Something went wrong please try again later");
      }

      setOpenloader(false);
    }
  };

  const typeData = async () => {
    if (type === "all") {
      tagSwitchfun();
    } else {
      activeId &&
        axiosRequest
          .get(`admin/fetch_resources?channel_code=${_store.channelCode.channelCode}&role_code=${_store.userRole[0].roleCode}&filter_by=${activeId}&filter=1&tagName=${tagSwitch}&filterByMediaCategory=${type}&skip=0`, { secure: true })
          .then((res) => {
            if (res.statusCode === -1) {
              setCurrentData(res?.data[0]);
            } else {
              setCurrentData([]);
            }
          })
          .catch((error) => {
            console.log("error===========>", error);
          });
    }
  };

  const resetDataFilter = () => {
    setTagSwitch("Motor");
    setType("all");
  };

  const getImage = (type) => {
    if (type === "articles")
      return {
        backgroundImage: 'url("https://pocbanca.iorta.in/assets/Group19132x.png")',
      };

    if (type === "pdf")
      return {
        backgroundImage: 'url("https://pocbanca.iorta.in/assets/Group19112x.png")',
      };

    if (type === "video")
      return {
        backgroundImage: 'url("https://pocbanca.iorta.in/assets/Group19122x.png")',
      };

    return {
      backgroundImage: 'url("https://pocbanca.iorta.in/assets/Group19142x.png")',
    };
  };

  const [imageModel, setImageModel] = useState(false);
  const [videoModel, setVideoModel] = useState(false);
  const [articleModel, setArticleModel] = useState(false);
  const [currentImageAndData, setCurrentImageAndData] = useState("");

  const setCurrentTriggerData = (data) => {
    console.log("data===============>", data);
    setCurrentImageAndData(data);
    if (data.contentCategory === "infographic") {
      setImageModel(true);
    } else if (data.contentCategory === "videos") {
      setVideoModel(true);
    } else if (data.contentCategory === "articles") {
      setArticleModel(true);
    } else if (data.contentCategory === "pdf" && data?.mediaFiles.length > 0) {
      window.open(data.mediaFiles[0].location, "_blank");
    }
    console.log("data", data);
  };

  useEffect(() => {
    if (videoModel && currentImageAndData?.mediaFiles && currentImageAndData?.mediaFiles[0] && currentImageAndData?.mediaFiles[0]?.location && videoRef.current) {
      videoRef.current.src = currentImageAndData?.mediaFiles[0]?.location;
    } else if (videoModel) {
      if (videoRef.current) {
        videoRef.current.src = "";
      }
    }
  }, [videoModel, currentImageAndData]);
  
  return (
    <>
      <Modal centered visible={videoModel} onOk={() => setVideoModel(false)} onCancel={() => setVideoModel(false)} footer={<div />}>
        <video style={{ marginTop: "15px" }} ref={videoRef} width="100%" height="500px" controls>
          <source src={""} type="video/mp4" />
        </video>
      </Modal>

      <Modal centered visible={imageModel} onOk={() => setImageModel(false)} onCancel={() => setImageModel(false)} footer={<div />}>
        <img width="100%" style={{ marginTop: "25px" }} alt="example" className="card_img" src={currentImageAndData.thumbnail} />
      </Modal>
      <Modal className="article_modal" centered visible={articleModel} onOk={() => setArticleModel(false)} onCancel={() => setArticleModel(false)} footer={<div />}>
        <h4 style={{ fontSize: "large", fontWeight: "600" }}>Article</h4>
        <div className="article_content">
          <img width="100%" alt="example" className="card_img" src={currentImageAndData.thumbnail} />
          <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
            <FileDoneOutlined />
            {" " + moment(currentImageAndData.created_date).format("LLLL")}
          </div>
          <hr />
          <div>{currentImageAndData.content}</div>
          <br />
          <div style={{ marginBottom: "5px" }}>
            <b>Tags</b>
          </div>
          <div>
            {currentImageAndData.tags &&
              currentImageAndData.tags.length > 0 &&
              currentImageAndData.tags.map((res) => (
                <button
                  style={{
                    border: "none",
                    color: "#fff",
                    backgroundColor: "#1fb3ab",
                    outline: "none",
                    marginRight: 10,
                    padding: "1px 8px",
                    borderRadius: "2px",
                  }}
                >
                  {res}
                </button>
              ))}
          </div>
        </div>
      </Modal>

      {width > "600" ? (
        <div className="headerResource">
          <Row>
            <Col>
              <p className="product-title">Learning Center</p>
            </Col>
          </Row>
          <div>
            {/* <Row className="tabsResource resourceCenter primaryBtnResource">
              {tabMenu.map((tab) => (
                <Col key={tab.id} style={{ marginRight: 15 }}>
                  <Button
                    size="small"
                      className={`resourceCenter ${activeTab === tab.id && "top-tab-header-active"}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setActiveTabName(tab.value);
                      }}
                    >
                    {tab.value}
                  </Button>
                </Col>
              ))}
            </Row> */}
            <Tabs
              activeKey={activeTab}
              onChange={(key) => {
                setActiveTab(key);
                const tab = tabMenu.find(item => item.id === key);
                if (tab) setActiveTabName(tab.value);
              }}
            >
            {tabMenu.map((item) => (
              <Tabs.TabPane tab={item.value} key={item.id} />
            ))}
          </Tabs>
          </div>
        </div>
      ) : (
        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key);
            const tab = tabMenu.find(item => item.id === key);
            if (tab) setActiveTabName(tab.value);
          }}
        >
        {tabMenu.map((item) => (
          <Tabs.TabPane tab={item.value} key={item.id} />
        ))}
        </Tabs>
      )}

      <div style={{marginBottom:30}}>
        <Row style={{justifyContent:"space-evenly",marginLeft:10,marginRight:10}}>
          <Col lg={7} md={24} sm={24} xs={24} style={{ backgroundColor: "fff" }}>
            <Card
              className="sideBar"
            >
              <Row>
                <Col span={22}>
                  <p className="tagHeader">
                    #Tags
                  </p>
                </Col>
                <Col span={2}>
                  <img onClick={resetDataFilter} src={resourcereset} style={{ height: 25, width: 25, cursor: "pointer" }} />
                </Col>
              </Row>
              {/* <hr style={{ marginTop: 5, marginBottom: 7 }} /> */}
              <Row>
                {tabs?.map((res) => (
                  <div>
                    <button className="tags"
                      //className={tagSwitch === res.name ? "active-resource" : "inactive"}
                      //className={"inactive"}
                      // onClick={() => setTagSwitch(res.name)}
                      onClick={() => {
                        setTagSwitch(res.name);
                        setType("all");
                      }}
                    >
                      {res.name}
                    </button>
                  </div>
                ))}

                {/* <div>
                  <button
                    style={{
                      borderColor: "#C1C8CC",
                      borderStyle: "solid",
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 3,
                      marginLeft: 10,
                    }}
                    className={
                      tagSwitch === "marketing" ? "active" : "inactive"
                    }
                    onClick={() => setTagSwitch("marketing")}
                  >
                    Marketing
                  </button>
                </div> */}
              </Row>
              <hr style={{ marginTop: 5, marginBottom: 7 }} />
              <div style={{ marginTop: 10, marginBottom: 5, color: "black" }}>
                <p className="contentType">Content Type</p>
              </div>

              <div className="options">
                {["all", "video", "pdf"].map((item) => (
                  <Row key={item}>
                    <button
                      className={type === item ? "tabsactive" : "tabs"}
                      onClick={() => setType(item)}
                    >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </Row>
                ))}
              </div>

              <div className="dropdown">
                <Select
                  defaultValue={type}
                  value={type}
                  onChange={(e) => {
                    console.log("Change event called!", e);
                    setType(e);
                  }}
                  style={{ width: "100% " }}
                >
                  <Option value="all">All</Option>
                  <Option value="video">Videos</Option>
                  <Option value="pdf">PDF</Option>
                  <Option value="article">Articles</Option>
                  <Option value="infographic">Infographic</Option>
                </Select>
              </div>
            </Card>
          </Col>
          <Col lg={16} md={24} sm={24} xs={24}>
            <Card
              className="contentMain"
            >
              <Row
                style={{
                  marginTop: 1,
                  backgroundImage: `url(${content})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <Col span={22}>
                  <p
                    style={{
                      color: "#444444",
                      fontSize: 18,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {activeTabName}
                  </p>
                </Col>
                <Col span={2}>
                  {/* <Row style={{ padding: 5 }}>
                    <p style={{ fontSize: 14, fontWeight: "bold" }}>All</p>
                    <img
                      src={menu}
                      style={{
                        height: 15,
                        width: 15,
                        marginLeft: 5,
                        marginTop: 5,
                      }}
                    />
                  </Row> */}
                </Col>
              </Row>
              <hr />
              <Row style={{ margin: 0 }}>
                {currentData && currentData?.length > 0 ? (
                  <Row
                    className="gutter-row"
                    gutter={8}
                    style={{ width: "100%" }}
                    // gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  >
                    {currentData?.map((res, index) => (
                      <Col key={index} xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 8 }}>
                        <Card
                          hoverable
                          style={{
                            width: "100%",
                            marginBottom: "20px",
                            overflow: "hidden",
                            position: "relative",
                          }}
                          className="card_body"
                          cover={<img alt="example" className="card_img" src={res.thumbnail ? res.thumbnail : mainimg} />}
                        >
                          <span>
                            <ShareAltOutlined onClick={() => setIsModalVisible1({ show: true, data: res })} className="share_button" />
                          </span>
                          <div
                            style={getImage(res.contentCategory)}
                            className="center_icon"
                            onClick={() => {
                              setCurrentTriggerData(res);
                            }}
                          ></div>
                          <div style={{ width: "100%" }}>
                            <div className="Body_text">
                              <p>{res?.title}</p>
                            </div>
                            <div className="Body_text2">
                              <p>{res?.content && res?.content?.length < 150 ? res?.content : `${res?.content?.slice(0, 150)}...`}</p>
                            </div>
                            <div style={{ padding: "6px" }}>
                              {res?.contentCategory !== "pdf" ? (
                                <button onClick={() => setCurrentTriggerData(res)} type="button" className="cardbutton block">
                                  View Now
                                </button>
                              ) : (
                                <button onClick={() => setCurrentTriggerData(res)} type="button" className="cardbutton block">
                                  Download Now
                                </button>
                              )}
                            </div>
                          </div>
                        </Card>
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
                )}
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          title="Share"
          visible={isModalVisible1.show}
          // onOk={handleOk1}
          onCancel={() => setIsModalVisible1({ show: false, data: null })}
          width={800}
          footer={[
            <Button className="send" type="submit" onClick={handleOk1} key="1">
              <div style={{ display: "flex", alignItems: "center" }}>
                <MailOutlined style={{ marginRight: "10px" }} /> send
              </div>
            </Button>,
            <Button className="cancle" onClick={() => setIsModalVisible1({ show: false, data: null })} key="2">
              <div style={{ display: "flex", alignItems: "center" }}>
                {" "}
                <CloseOutlined /> Cancel
              </div>
            </Button>,
          ]}
          className="modalStyle"
        >
          <FullPageLoader fromapploader={openloader}></FullPageLoader>
          <form>
            {
              <Row gutter={16}>
                <Col>
                  <Input className="inp" placeholder="E-Mail ID" value={data} type="email" onChange={(e) => setData(e.target.value)} />
                </Col>
                <Col>
                  <button onClick={(e) => handleSubmit(e)} className="button_calss">
                    <div style={{ display: "flex", alignItems: "center" }}>
                      Add <PlusCircleFilled style={{ marginLeft: "10px" }} />
                    </div>
                  </button>
                </Col>
              </Row>
            }

            <Row>
              <div className="disply">
                {list?.map((item, id) => (
                  <div key={id} className="listData">
                    <span>{item} </span>{" "}
                    <button className="delet_btn" onClick={() => handleDelete(id)}>
                      X
                    </button>
                  </div>
                ))}{" "}
              </div>
            </Row>
          </form>
        </Modal>
      </div>
    </>
  );
};
export default ResourceCenter;
