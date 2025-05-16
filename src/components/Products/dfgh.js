import React, { useState, useEffect } from "react";
import "./LoanProducts.css";
import {
  Row,
  Col,
  Button,
  Card,
  Carousel,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  ShareAltOutlined,
  DownloadOutlined,
  PlusCircleFilled,
  MailOutlined,
  CloseOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Tabs, Alert } from "antd";
// import axios from '../../axios-common';
import { map } from "lodash";
import moment from "moment";
import Brocher from "../../images/brochrewhite.png";
import MTabs from "../../components/Tab/Tab";
import axiosRequest from "../../axios-request/request.methods";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import Pagination from "../Activitity Tracker/Pagenation/Pagenation";
import axios from "axios";
import { stoageGetter } from "../../helpers";
import NoRecordsFound from "../NoRcordsFound/NoRecordsFound";
import shareIt from "../../assets/shareit.png";
import { fontStyle } from "@mui/system";
import browimg from "../../assets/brochrewhite.png";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import apiConfig from "../../config/api.config";

const { baseURL, auth, secure, NODE_ENV } = apiConfig;

const LoanProducts = () => {
  const contentStyle = {
    height: "200px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    // background:'#fff',
    // color:'black'
  };
  const [productData, SetProductData] = useState([]);
  const [productTabs, SetProductTabs] = useState([]);
  const [activeId, SetActiveId] = useState(null);
  const [finaltabdata, setFinalTabData] = useState({});
  const login_user_data = stoageGetter("user");
  const _storeData = useSelector((state) => state?.login?.token);
  // console.warn("_storeData _storeData", _storeData);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.warn("login_user_data___________ login_user_data", login_user_data);
    let _channel = login_user_data.channelCode._id;
    axiosRequest.get(`admin/getprodCategory?filter=23&channel=${_channel}`)
      .then((resp) => {
        console.warn("getprodCategory ____APIIIIII", resp);
          const producttData = resp
          SetProductData(producttData);
          topBtnClickHandler(producttData[0]);
          SetActiveId(producttData[0]?._id);
          console.log("response", resp);
          let finaltab = [];

          for (let i = 0; i < producttData.length; i++) {
            console.log(producttData, "product data----->");
            let objdata = {
              id: producttData[i]._id,
              value: producttData[i].productCategoryName,
            };

            finaltab.push(objdata);
          }
          if(producttData && producttData.length > 0){
            console.log('==her it enter')
            axiosRequest.get(`user/getproduct/?productType=${producttData[0]?._id}&roleCode=SM1`)
      .then((resp) => {
        const productTabs = resp
            SetSdata(productTabs[0].productBrochure);
      }, [])
      .catch((error) => {
        console.log(error);
      });
          }
         
      }, [])
      .catch((error) => {
        SetProductData([]);
        console.log("CATEGORYYYY___ERROR", productData);
      });
      axiosRequest.get(`user/getLead/${login_user_data.id}?leadfilter=all`)
      .then((res) => {
        setBenefitIllustratorArr(res);
      });

    if (productData) {
    }

    
  }, []);

  const { TabPane } = Tabs;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [currentTab, setCurrentTab] = useState("");
  const [sdata, SetSdata] = useState([]);

  const showModal1 = () => {
    setIsModalVisible1(true);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };

  const [benefitIllustratorArr, setBenefitIllustratorArr] = useState([]);
  const topBtnClickHandler = (item) => {
    console.log(item, "item");
    SetActiveId(item._id);
    setCurrentTab(item.productCategoryName);
    axiosRequest.get(`user/getproduct/?productType=${item._id}&roleCode=SM1`)
      .then((resp) => {
        console.log(
          "PRODUCTTTT____APIIIIII =================== ",
          resp[0].productBrochure,
          "---",
          resp
        );
        // SetSdata(resp.data.data[0].productBrochure)

        const productTabs = resp
        SetProductTabs(productTabs);
        if(productTabs[0])  SetSdata(productTabs[0].productBrochure);
       
        
        console.log("sdataaa0000======", productTabs);
      }, [])
      .catch((error) => {
      });
  };

  const getEmbedString = (string) => {
    if(string.split('=').length > 0){
      let arr = string.split('=')
      return arr[arr.length - 1]
    }else {
      let arr = string.split('/')
      return arr[arr.length - 1]
    }
  }

  const [isJoinModalVisible, setIsJoinModalVisible] = useState(false);
  const [isDisplayVisible, setIsDisplayModalVisible] = useState(false);
  const [isPassingData, setIsPassingData] = useState();
  const [benefitillArr, setBIArr] = useState();
  const [buttonValue, setButtonValue] = useState();

  ////---Pagination---start-----------///////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(5);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = benefitIllustratorArr.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  console.log(benefitIllustratorArr.length / postPerPage);
  const paginate = (page) => setCurrentPage(page);
  // const onChange=(page)=> paginate(page);
  /////////-=--------pagination finished-----------/////////////
  const showModal = () => {
    setIsJoinModalVisible(true);
  };
  const SelectedButtonFunc = (value) => {
    setBIArr(value);
    console.log(value);
  };
  const handleOk = () => {
    setIsJoinModalVisible(false);
  };
  const handleCancel = () => {
    setIsJoinModalVisible(false);
  };
  const truncateString = (string, limit) => {
    var dots = "...";
    if (string && string.length > limit) string = string.substring(0, limit) + dots;
    return string;
  };

  let { innerWidth: width, innerHeight: height } = window;
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
  console.log("productData", productData);

  const [data, setData] = useState("");
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    if (data) {
      setList((oldData) => [...oldData, data]);
      setData("");
    } else {
      message.error("Please add an e-mail first");
    }
    e.preventDefault();
  };

  const handleDelete = (id) => {
    setList((oldData) => oldData.filter((elem, index) => index !== id));
  };

  const [selectedData, setSelectedData] = useState([]);
  const selecteDataFun = (value) => {
    
    setSelectedData((res) => {
      const index = res.findIndex((e)=> e._id === value._id)
      if(index  !== -1 ){
        res.splice(index, 1)
        return [...res]
      }else{
        return [...res, value]
      }
    });
  };


  const changeTabfun = (e) => {
    //  sdata
    for (var i = 0; i < productTabs.length; i++) {
      if (e == productTabs[i]._id) {
        SetSdata(productTabs[i].productBrochure);
      }
    }
  };

  console.log(productTabs,'-------her i sproduct')

  const handleOk1 = async () => {
    // setIsModalVisible1(false);
    let dataaa = {
      Product_Brochure_data: selectedData.map((res) => res.location),
      product_name: selectedData.map((res) => res.fileCategory),
      sendto: list,
    };

    if (
      (dataaa.Product_Brochure_data &&
        dataaa.Product_Brochure_data.length == 0) ||
      (dataaa.sendto && dataaa.sendto.length == 0)
    ) {
      message.error("Please, Select a Brochure and add an E-mail");
      return;
    }

    try {
      let res = await axiosRequest.post(`user/send_email_brochure`, dataaa);
      if (res.mailstatus) {
        message.success("Sending Message Thank You");
        setList([])
        setSelectedData([])
        handleCancel1();
      }
    } catch (error) {
    }
  };

  const getCalcVal = (val, num) => {
    if (val.length > num) {
      return val.slice(0, num) + " ...";
    }
    return val;
  };

  return (
    <>
      {/* <div className='product-content'> */}
      <div className="header-loan-prod">
        <Row>
          <Col>
            <p className="product-title-loan">Products</p>
          </Col>
        </Row>
        <div>
          <Row className="tabs-loan primaryBtnLoan">
            {productData?.map((item) => (
              <Col style={{ marginRight: 15 }}>
                <Button
                  size="small"
                  className={`tabButton ${
                    item._id === activeId && "top-tab-header-active-loan"
                  }`}
                  onClick={topBtnClickHandler.bind(this, item)}
                >
                  {item.productCategoryName}
                </Button>

                {/* <div onClick={topBtnClickHandler.bind(this, item)} className={`primaryBtnLoan ${item._id === activeId && "top-tab-header-active-loan"}`}>
                {item.productCategoryName}
                </div> */}
              </Col>
            ))}
          </Row>
        </div>
      </div>
      {/* <div className='product-content'> */}

      {productData.length > 0 ? (
        <div className="loan-product-tabs" data-before-content={currentTab}>
          <Col gutter={{ xs: 24, sm: 24, md: 24, lg: 24 }}>
            <Tabs type="card" tabPosition={tabPosition} onChange={changeTabfun}>

              {productTabs?.map((item, index) => {
                return (
                  <TabPane
                    tab={getCalcVal(item.productName, 30)}
                    key={item._id}
                    className="MainContent"
                  >
                    <Col
                      className="gutter-row first-card"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <div style={{ height: "100%" }}>
                        <div
                          style={{ height: "100%" }}
                          className="main-card2"
                          bordered={false}
                        >
                          <div
                            className="benefit-main"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              height: "70px",
                            }}
                          >
                            <h1
                              style={{
                                color: "#003C64",
                                textTransform: "capitalize",
                              }}
                              className="benefit-head"
                            >
                              {item.productName}
                            </h1>
                            {/* <Button
                              className="benefit-btn"
                              style={{
                                backgroundColor: "transparent",
                                fontWeight: "bold",
                                border: "1px solid #5EA5C0",
                                borderRadius: "10px",
                              }}
                              onClick={showModal}
                            >
                              Benefit Illustration
                            </Button> */}
                            {/* <Modal
                              className="Clubsmaster-modal-style"
                              title="Select the proposer"
                              visible={isJoinModalVisible}
                              onOk={handleOk}
                              footer={[
                                <Button
                                  type="primary"
                                  className="bi-cancelbtn"
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </Button>,
                                <Link
                                  to={{
                                    pathname: "/master/benefitillustrator",
                                    state: { recorddata: benefitIllustratorArr },
                                  }}
                                  className="link-btn"
                                >
                                  Proceed
                                </Link>,
                              ]}
                              width="50%"
                              bodyStyle={{
                                height: "auto",
                              }}
                            >
                              <Form.Item
                                name="username"
                                rules={[
                                  {
                                    required: false,
                                    message: "Please input your username!",
                                  },
                                ]}
                              >
                                <Input type="text" placeholder="Search Here" />
                              </Form.Item>

                              <table className="LoanProducts-Table">
                                <tr>
                                  <th className="table-heading1">Action</th>
                                  <th className="table-heading2">Lead ID</th>
                                  <th className="table-heading2">Name</th>
                                  <th className="table-heading2">Mobile</th>
                                  <th className="table-heading2">Created Date</th>
                                </tr>
                                {currentPost.map((item) => {
                                  return (
                                    <tr
                                      style={{ padding: "10px" }}
                                      className="tableBorder"
                                      key={item._id}
                                    >
                                      <td>
                                        <Button
                                          size="small"
                                          className="select-btn"
                                          onClick={() => SelectedButtonFunc(item)}
                                        >
                                          Select
                                        </Button>
                                      </td>
                                      <td className="table-subdata">
                                        {item.lead_Id}
                                      </td>
                                      <td className="table-subdata">
                                        {item.firstName + " " + item.lastName}
                                      </td>
                                      <td className="table-subdata">
                                        {item.primaryMobile}
                                      </td>
                                      <td className="table-subdata">
                                        {moment(item.created_date).format(
                                          "DD-MM-YYYY"
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })}
                              </table>
                              <Pagination
                                className="Clubsmaster-modal-style-Table-Pagination"
                                defaultCurrent={1}
                                postPerPage={postPerPage}
                                paginate={paginate}
                                total={benefitIllustratorArr.length}
                                totalPost={
                                  benefitIllustratorArr.length / postPerPage
                                }
                              />
                            </Modal> */}
                          </div>
                          <p className="product-para">
                            {item.productDescription}
                          </p>
                          <h4
                            style={{ color: "#003C64" }}
                            className="product_heading"
                          >
                            5 Reasons to buy:
                          </h4>
                          <div
                            className="bullet_points"
                            style={{ marginTop: 10 }}
                          >
                            <p>
                              <span className="slNo circle-point">1</span>
                              <span className="bullet-points">
                                {item.productReasons.reason1}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">2</span>
                              <span className="bullet-points">
                                {item.productReasons.reason2}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">3</span>
                              <span className="bullet-points">
                                {item.productReasons.reason3}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">4</span>
                              <span className="bullet-points">
                                {item.productReasons.reason4}
                              </span>
                            </p>
                            <p>
                              <span className="slNo circle-point">5</span>
                              <span className="bullet-points">
                                {item.productReasons.reason5}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>


                    <Col
                      className="gutter-row  first-card"
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={12}
                    >
                      <div className="main-card3" bordered={false}>
                        <div className="share_button1">
                        <ShareAltOutlined onClick={showModal1} className="share_button" />
                          {/* <img src={shareIt} onClick={showModal1} /> */}
                        </div>
                        <h4
                          style={{
                            textAlign: "center",
                            fontWeight: "bold",
                            textTransform: "capitalize",
                          }}
                        >
                          {item.imageTitle}
                        </h4>

                        {/* <span onClick={showModal} style={{ margin: '150px 150px 0px 0px', borderRadius: '50px', padding: '8px', color: '#00ACC1', cursor: 'pointer' }}><ShareAltOutlined /></span> */}
                        <Carousel
                          dots={true}
                          dotPosition="top"
                          style={{ marginTop: 12 }}
                          autoplay={true}
                        >
                          {item.productVideo.map((item) => {
                            if(!item.active) return;
                            return (
                              <video controls>
                                <source src={item.location} />
                              </video>
                            );
                          })}
                          {item.videoLink && typeof item.videoLink === 'string' && item.videoLink.startsWith('https') && (
                            <iframe width="420" height="200"
                              src={`https://www.youtube.com/embed/${getEmbedString(item.videoLink)}`}>
                            </iframe>
                          )}
                          {item.productImages.map((item) => {
                            if(!item.active) return;
                            return (
                              <div  className="img-container">
                                <img
                                  src={item.location}
                                  style={{ margin: "auto", maxHeight: '100%' }}
                                />
                              </div>
                            );
                          })}
                        </Carousel>
                        <div
                          className="product-brochure"
                          style={{ marginTop: 10 }}
                        >
                          {item.productBrochure.map((item) => {
                            if(!item.active) return;
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  flexDirection: "column",
                                }}
                              >
                                <p
                                  style={{
                                    fontWeight: "bold",
                                    color: "#003C64",
                                    marginBottom: 0,
                                  }}
                                >
                                  {truncateString(
                                    item.fileCategory === ""
                                      ? "-"
                                      : item.fileCategory,
                                    12
                                  )}
                                </p>
                                <img
                                  src={Brocher}
                                  height="100px"
                                  width="90px"
                                ></img>
                                <Button
                                  size="small"
                                  style={{
                                    backgroundColor: "#003C64",
                                    width: "100%",
                                    color: "#fff",
                                    border: "1px solid #5EA5C0",
                                    borderRadius: "20px",
                                  }}
                                >
                                  <a href={item.location} download>
                                    <DownloadOutlined /> {item?.language}
                                  </a>
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </Col>
                  </TabPane>
                );
              })}
            </Tabs>
          </Col>
        </div>
      ) : (
        <NoRecordsFound />
      )}
      <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you wish to send payment link to the customer?</p>
      </Modal>
      {/* </div> */}
      <Modal
        title="Share Product Brochure"
        visible={isModalVisible1}
        // onOk={handleOk1}
        onCancel={() => setIsModalVisible1(false)}
        width={800}
        footer={[
          <Button className="send" type="submit" onClick={handleOk1} key="1">
           <div style={{display: 'flex', alignItems: 'center'}}>
           <MailOutlined style={{marginRight: '10px'}} /> send
           </div>
          </Button>,
          <Button className="cancle" onClick={handleCancel1} key="2">
                  <div style={{display: 'flex', alignItems: 'center'}}> <CloseOutlined /> Cancel</div>
           
          </Button>,
        ]}
        className="modalStyle"
      >
        <form>
          <Row gutter={16}>
            <Col
              style={{
                display: "flex",
              }}
            >
              {sdata?.map((brodata, index) => {
                if(!brodata.active) return;
                return <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    marginRight: "10px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "#454F63",
                      marginBottom: 5,
                    }}
                  >
                    {brodata.fileCategory === "" ? "-" : brodata.fileCategory}
                  </p>
                  <img
                    onClick={() => selecteDataFun(brodata)}
                    src={Brocher}
                    style={{border: `${selectedData ? selectedData.findIndex((e)=> e._id === brodata._id)  !== -1 ? '2px solid #5EA5C0' : '' : ''}`}}
                    height="100px"
                    width="90px"
                    className="broimg"
                  />
                  <p
                    style={{
                      color: "#003C64",
                      width: "100%",
                      fontSize: "16px",
                      fontWeight: "700",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    {brodata.language}
                  </p>
                </div>
})}
            </Col>
          </Row>
          {sdata && sdata?.length > 0 ? (
            <Row gutter={16}>
              <Col>
                <Input
                  className="inp"
                  placeholder="E-Mail ID"
                  value={data}
                  type="email"
                  onChange={(e) => setData(e.target.value)}
                />
              </Col>
              <Col>
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="button_calss"
                >
                 <div style={{display: 'flex', alignItems: 'center'}}>
                 Add <PlusCircleFilled style={{marginLeft: '10px'}} />
                 </div>
                </button>
              </Col>
            </Row>
          ) : (
            <p className="product_data">No Product Brochure Found</p>
          )}

          <Row>
            <div className="disply">
              {list?.map((item, id) => (
                <div key={id} className="listData">
                  <span>{item} </span>{" "}
                  <button
                    className="delet_btn"
                    onClick={() => handleDelete(id)}
                  >
                    X
                  </button>
                </div>
              ))}{" "}
            </div>
          </Row>
        </form>
      </Modal>
    </>
  );
};

export default LoanProducts;
