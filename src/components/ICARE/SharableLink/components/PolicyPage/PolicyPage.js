import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./PolicyPage.css";

import axiosRequest from "../../../../../axios-request/request.methods";
import {
  Row,
  Col,
  Button,
  Select,
  Form,
  message,
  Upload,
  Drawer,
  Image,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import _ from "lodash";

import group_img from "../../../../../images/Icon/Group.png";
import indivi from "../../../../../images/Icon/indivi.png";

import img1 from "../../../../../images/sideBar/tap 1.png";

const PolicyPage = () => {
  const dispatch = useDispatch();
  const checkstate = useSelector((state) => state);

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

  const policyTypeOnChange = (e) => {};

  const handleButtonClick = () => {
    setActiveButton();
  };

  const handleProceed = (val) => {
    console.log("gcvhbjnk", val);
    setTravelType(val);

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

  return (
    <>
     
      <Drawer
        title="Motor Policy Page"
        placement="bottom"
        closable={true}
        // onClose={() => history.push("/iCare-Dashboard")}
        visible={true}
        width={500}
        height={500}
      >
        <div className="main-classinfo">
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            form={form}
          >
            <div className="policyHeading">
              <h3>I need to issue a policy for</h3>

              <Row gutter={16}>
                {policyTypeList &&
                  Array.isArray(policyTypeList) &&
                  policyTypeList.map((e, index) => {
                    return (
                      <Col xs={24} sm={24} md={24} lg={24} xl={24} key={index}>
                        <Button
                          className="button-Motor"
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
              </Row>
              <div className="shareDiv">
                <p>
                  Please tap here to view shareable links as per your commercial
                  structure
                </p>
                <Image
                  preview={false}
                  alt="share-logo"
                  src={img1}
                  className="img"
                />
              </div>
              <p>OR</p>
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
      </Drawer>
    </>
  );
};

export default PolicyPage;
