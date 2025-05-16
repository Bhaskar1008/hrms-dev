import { Tabs, Col, Form, Row, Carousel, Image, Typography, Divider, Descriptions } from "antd";
import React, { useDebugValue, useEffect, useRef, useState } from "react";
import { Card } from "antd";
import { Button } from "antd";
import "./SalesPitch.css";
import { HashRouter as Router, Route, Switch, Link, withRouter } from "react-router-dom";
import { Alert } from "antd";
import video from "./video.mp4";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import VideoPlayer from "react-video-js-player";
import MainTabs from "../../components/MainTabs/MainTabs";
import MTabs from "../../components/Tab/Tab";
import axiosRequest from "../../axios-request/request.methods";
import { useSelector } from "react-redux";
import { RiContactsBookLine } from "react-icons/ri";
import actionNoData from "../../assets/Actionnodata.png";
import NOIMG from "../../assets/300x150.jpg";
import NOTIMG from "../../assets/600x400.jpg";
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
const SalesPitch = () => {
  let { innerWidth: width, innerHeight: height } = window;
  const { TabPane } = Tabs;
  const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" : width <= "767" ? "top" : width <= "1023" ? "top" : "left");
  const [showmore, setShowMore] = useState(false);
  const [showmore1, setShowMore1] = useState(false);
  const [showmore2, setShowMore2] = useState(false);
  const [showmore3, setShowMore3] = useState(false);
  const [showmore4, setShowMore4] = useState(false);
  const [showmore5, setShowMore5] = useState(false);
  const [showmore6, setShowMore6] = useState(false);
  const [showmore7, setShowMore7] = useState(false);
  const [showmore8, setShowMore8] = useState(false);
  const [showmore9, setShowMore9] = useState(false);
  const [showmore10, setShowMore10] = useState(false);
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };

  const videoSrc = video;
  const poster = "video.mp4";
  const [primaryData, setPrimaryData] = useState({});
  console.log("primaryData--------------->", primaryData);
  const [resultData, setResultData] = useState([]);
  const videoRef = useRef();
  const [presentationPrimaryData, setPresentationPrimaryData] = useState({});
  const [presentationResultData, setPresentationResultData] = useState([]);

  const userData = useSelector((state) => state.login.user);
  const currUserChannelCode = userData.channelCode.channelCode;
  const currUserChannelId = userData.channelCode._id;
  console.log("current user is ", currUserChannelCode);

  async function handleTestimonilClick() {
    const initialresult = await axiosRequest.get(`admin/fetch_sales_pitch?type=testimonial&publshedStatus=1`);

    console.log("initialresult", initialresult);
    const result = [];
    // console.log("Testimonial click result is ",initialresult);
    // console.log("Testimonial result length is ",result.length);

    console.log(" Logged in userData data====>", currUserChannelCode);
    for (let i in initialresult?.data) {
      if (initialresult?.data[i].channelCode.includes(currUserChannelCode)) {
        if (initialresult?.data[i].status == 1) {
          if (initialresult?.data[i].filePath.length != 0) {
            result.push(initialresult?.data[i]);
          }
        }
      }
    }

    setPrimaryData(result[0]);
    console.log("Testimonial result is ", result);
    setResultData(result);
  }

  useEffect(() => {}, presentationResultData);

  function handleTestimonilItemClick(id) {
    var element = {};
    for (const i of resultData) {
      if (i._id === id) {
        element = i;
      }
    }
    setPrimaryData(element);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can also use "auto" or "instant" for the scroll behavior
    });
  }

  useEffect(() => {}, [resultData]);

  useEffect(() => {
    if (primaryData?.filePath && primaryData.filePath.length > 0) {
      videoRef.current?.load();
    }
  }, [primaryData]);

  async function handlePresentationClick() {
    // http://localhost:5032/sdx-api/secure/admin/fetch_sales_pitch?type=presentation
    const initialresult = await axiosRequest.get(`admin/fetch_sales_pitch?type=presentation&publshedStatus=1`);

    console.log("checking ", initialresult);
    const result = [];
    for (let i in initialresult.data) {
      if (initialresult.data[i].channelCode.includes(currUserChannelCode)) {
        let activeImage = [];
        for (let j of initialresult.data[i].filePath) {
          if (j.active == "1") {
            activeImage.push(j);
          }
        }
        initialresult.data[i].filePath = activeImage;
        if (initialresult.data[i].status == "1") {
          if (activeImage.length > 0) {
            result.push(initialresult.data[i]);
          }
        }
      }
    }
    setPresentationResultData(result);
    setPresentationPrimaryData(result[0]);
  }

  async function handlePresentationOnClick(id) {
    var element = {};
    for (const i of presentationResultData) {
      if (i._id == id) {
        element = i;
      }
    }
    setPresentationPrimaryData(element);
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can also use "auto" or "instant" for the scroll behavior
    });
  }

  async function handleProductClick() {
    const initialresult = await axiosRequest.get(`admin/getProductsAll`);

    const result = [];
    for (let curr of initialresult.data[0]) {
      // console.log("channel code is",(initialresult[i]));
      if (curr.channelCode.includes(currUserChannelId)) {
        result.push(curr);
      }
    }
    setResultData(result);

    // console.log("Product click",result);
  }

  function handleTabClick(key) {
    if (key === "1") {
      handlePresentationClick();
    } else if (key === "2") {
      handleTestimonilClick();
    } else if (key === "3") {
      handleProductClick();
    }
  }

  useEffect(() => {
    handlePresentationClick();
    // handleTestimonilClick();
    // handleProductClick();
  }, []);
  const AutoImageSlider = ({ images }) => {
    console.log("Images===>>",images)
    const [current, setCurrent] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 3000); // rotate every 3 seconds
  
      return () => clearInterval(interval);
    }, [images.length]);
  
    if (!images || images.length === 0) {
      return (
        <div className="c1">
          <Image src={NOIMG} alt="No Image" />
        </div>
      );
    }
  
    return (
      <div className="c1">
        <img
          src={images[current]?.fileType === 'mp4' ? NOIMG : images[current]?.location}
          alt={`Slide ${current + 1}`}
          style={{
            width: '80%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      </div>
    );
  };

  return (
    <div className="todoheader">
      {width <= "375" ? (
        <MTabs tabMenu={tabMenu} activeKey="customerpitch" header="Presales Tools" />
      ) : (
        <div>
          {width <= "375" ? (
            <MTabs tabMenu={tabMenu} activeKey="customerpitch" header="Presales Tools" />
          ) : (
            <div>
              <MTabs tabMenu={tabMenu} activeKey="customerpitch" header="Presales Tools" />
            </div>
          )}
          <div className="Salespitch-main salesCard salesPitchStyle">
            <div className="Salespitch-row-flex">
              <Tabs tabPosition={tabPosition} className="SalesPitch-sider" onTabClick={handleTabClick}>
                <TabPane tab="Presentation" key="1">
                  <div className="Salespitch-details-card-style">
                    <div className="Salespitch-details-card-content-align">
                      <Row gutter={[16, 16]} justify="center">
                        {/* Primary Content (Carousel) */}
                        <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                          <Row gutter={[0, 24]}>
                            <Col className="Salespitch-img1" style={{marginRight:'10px'}} xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                              <div>
                                <Card>
                                  {/* <Carousel autoplay>
                                    {presentationPrimaryData?.filePath && presentationPrimaryData?.filePath.length > 0 ? (
                                      presentationPrimaryData?.filePath?.map((item, index) => (
                                        <div className="c1" >
                                          <img src={item.location}  />
                                        </div>
                                      ))
                                    ) : (
                                      <div className="c1">
                                        <Image src={NOIMG} alt="No Image" />
                                      </div>
                                    )}
                                  </Carousel> */}
                                  {presentationPrimaryData?.filePath && presentationPrimaryData?.filePath.length > 0 ? (
                                   <AutoImageSlider images={presentationPrimaryData?.filePath || []} />
                                  ):(
                                    <div className="c1">
                                    <Image src={NOIMG} alt="No Image" />
                                  </div>
                                  )}
                                </Card>
                              </div>
                            </Col>
                          </Row>
                        </Col>

                        {/* Secondary Content (Vertical Thumbnails) */}
                        <Col className="test" xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                          <Row>
                            <Col className="Salespitch-img2" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                              <Card>
                                {presentationPrimaryData?.filePath && presentationPrimaryData?.filePath.length > 0 ? (
                                  presentationPrimaryData?.filePath?.map((item, index) => (
                                    console.log("Presented Data==>",item),
                                    <div className="c2 margin-bottom" key={index}>
                                      <Image
                                        src={item?.fileType === 'mp4'? NOIMG :item?.location}
                                        style={{
                                          borderRadius: "5px 0",
                                          width: "20vw",
                                          height: "29vh",
                                        }}
                                        alt={`Thumbnail ${index + 1}`}
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="c2">
                                    <Image
                                      src={NOIMG}
                                      style={{
                                        borderRadius: "5px 0",
                                        width: "20vw",
                                        height: "29vh",
                                      }}
                                      alt="No Image"
                                    />
                                  </div>
                                )}
                              </Card>
                            </Col>
                          </Row>
                        </Col>

                        {/* Details Section */}
                        <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                          {presentationPrimaryData ? (
                            <Row gutter={[0, 24]}>
                              <Col className="presentation-img" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                <h1 className="headingg">{presentationPrimaryData?.title}</h1>
                                <p className="headingg1">{presentationPrimaryData?.description}</p>
                                <h2 className="headingg2">{`Uploaded By: ${presentationPrimaryData?.createdBy?.first_name} ${presentationPrimaryData?.createdBy?.last_name}`}</h2>
                                <h3 className="headingg3">Upload Date: {presentationPrimaryData?.createdDate ? new Date(presentationPrimaryData.createdDate).toLocaleDateString() : ""}</h3>
                              </Col>
                            </Row>
                          ) : null}
                        </Col>

                        {/* Thumbnails Grid */}
                        <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22} className="thumbnails-grid">
                          <Row gutter={[16, 16]}>
                            {presentationResultData?.map((item) => (
                              console.log("file data",item),
                              <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24} key={item._id}>
                                <div>
                                  <Card bordered={true}>
                                    
                                    {item?.filePath && item.filePath.length > 0 ? (

                                      console.log("item--->>>",item),
                                      <div className="i1">
                                        <Image
                                          src={item.filePath[0].fileType === 'mp4'? NOIMG : item.filePath[0].location}
                                          style={{
                                            width: "100%",
                                            height: "26vh",
                                          }}
                                          alt={item?.title}
                                        />
                                      </div>
                                    ) : (
                                      <div className="i1">
                                        <Image
                                          src={NOIMG}
                                          style={{
                                            width: "100%",
                                            height: "26vh",
                                          }}
                                          alt="No Image"
                                        />
                                      </div>
                                    )}
                                    <div className="demo-nav">
                                      <div onClick={() => handlePresentationOnClick(item._id)} style={{ cursor: "pointer" }}>
                                        {item?.title}
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
                

                <TabPane tab="Testimonials" key="2">
                  <div className="Salespitch-details-card-style">
                    <div className="Salespitch-details-card-content-align">
                      <Row gutter={[16, 16]} justify="center">
                        {/* Primary Content (Video) */}
                        <Col xs={{ order: 1 }} sm={16} md={16} lg={{ order: 1 }} xl={{ order: 1 }} span={22}>
                          <Row gutter={["", 24]}>
                            <Col className="Salespitch-img1 sales-primary-video" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                              <div>
                                <Card>
                                  {primaryData?.filePath && primaryData.filePath.length > 0 ? (
                                    <video className="Testimonials-Video" controls ref={videoRef}>
                                      <source src={primaryData?.filePath[0]?.location} type="video/mp4" />
                                    </video>
                                  ) : (
                                    <div className="c1">
                                      <Image src={NOIMG} alt="No Video" />
                                    </div>
                                  )}
                                </Card>
                              </div>
                            </Col>
                          </Row>
                        </Col>

                        {/* Secondary Content (Vertical Thumbnails) */}
                        <Col className="test " xs={{ order: 2 }} sm={8} md={8} lg={{ order: 2 }} xl={{ order: 2 }} span={22}>
                          <Row>
                            <Col className="Salespitch-img2" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                              <Card>
                                {primaryData?.filePath && primaryData.filePath.length > 0 ? (
                                  <div className="c2">
                                    <Image
                                      src={primaryData?.thumbnail ? primaryData.thumbnail : NOIMG}
                                      style={{
                                        borderRadius: "5px 0",
                                        width: "20vw",
                                        height: "29vh",
                                      }}
                                      alt={`Thumbnail `}
                                    />
                                  </div>
                                ) : (
                                  <div className="c2">
                                    <Image
                                      src={NOIMG}
                                      style={{
                                        borderRadius: "5px 0",
                                        width: "20vw",
                                        height: "29vh",
                                      }}
                                      alt="No Image"
                                    />
                                  </div>
                                )}
                              </Card>
                            </Col>
                          </Row>
                        </Col>

                        {/* Details Section */}
                        <Col xs={{ order: 3 }} sm={24} md={24} lg={{ order: 3 }} xl={{ order: 3 }} span={22}>
                          {primaryData ? (
                            <Row gutter={["", 24]}>
                              <Col className="presentation-img" xs={24} sm={24} md={24} lg={24} xl={24} span={24}>
                                <h1 className="headingg">{primaryData?.title}</h1>
                                <p className="headingg1">{primaryData?.description}</p>
                                <h2 className="headingg2">{`Uploaded By: ${primaryData?.createdBy?.first_name} ${primaryData?.createdBy?.last_name}`}</h2>
                                <h3 className="headingg3">Upload Date: {primaryData?.createdDate ? new Date(primaryData.createdDate).toLocaleDateString() : ""}</h3>
                              </Col>
                            </Row>
                          ) : null}
                        </Col>

                        {/* Thumbnails Grid */}
                        <Col xs={{ order: 4 }} sm={24} md={24} lg={{ order: 4 }} xl={{ order: 4 }} span={22} className="thumbnails-grid">
                          <Row gutter={[16, 16]}>
                            {resultData?.map((item, index) => (
                              console.log("Checking data ===>",item),
                              <Col xs={24} sm={12} md={8} lg={8} xl={8} span={24} key={item?._id}>
                                <div>
                                  <Card bordered={true}>
                                    {/* {item?.filePath && item.filePath.length > 0 ? ( */}
                                      {item?.thumbnail ?(
                                      <div className="i1">
                                        <Image
                                          src={item?.thumbnail}
                                          style={{
                                            width: "100%",
                                            height: "26vh",
                                          }}
                                          alt={item?.title}
                                        />
                                      </div>
                                    ) : (
                                      <div className="i1">
                                        <Image
                                          src={NOIMG}
                                          style={{
                                            width: "100%",
                                            height: "26vh",
                                          }}
                                          alt="No Image"
                                        />
                                      </div>
                                    )}
                                    <div className="demo-nav">
                                      <div onClick={() => handleTestimonilItemClick(item._id)} style={{ cursor: "pointer" }}>
                                        {item?.title}
                                      </div>
                                    </div>
                                  </Card>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SalesPitch;
