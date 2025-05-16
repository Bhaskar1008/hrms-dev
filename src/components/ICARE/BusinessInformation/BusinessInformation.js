import React, { useEffect } from "react";
import "./BusinessInformation.css";
import { Row, Col } from "antd";
import layer1 from "../../../images/Icon/Layer_1.png";
import layer2 from "../../../images/Icon/Frame.png";
import layer3 from "../../../images/Icon/Frame (1).png";
import layer4 from "../../../images/Icon/Frame (2).png";
import layer5 from "../../../images/Icon/image 33.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetfilterQuotationData } from "../../../store/actions/getFiltersdata";
import learning_center_img from "../../../assets/ihc_icon/learning.png";
import all_products_img from "../../../assets/ihc_icon/sales_pitch.png";
import product_img from "../../../assets/ihc_icon/product.png";
import helpcenter_img from "../../../assets/ihc_icon/helpcenter.png";


const BusinessInformation = () => {
  const dispatch = useDispatch();
  // 28 Quotations/Policies 2 courses in-progress
  const businessInfo = [
    // { name: "Quotations/Policies", busImg: layer1, lable: "", path: "/quotationsPoliciesMaster/Quotation" },
    { name: "Sales Pitch", busImg: layer2, lable: "", path: "/products", image: all_products_img },
    { name: "Learning Center", busImg: layer3, lable: "", path: "/learningcenter", image: learning_center_img },
    { name: "Products", busImg: layer3, lable: "", path: "/learningcenter", image: product_img },
    { name: "Help Center", busImg: layer3, lable: "", path: "/learningcenter", image: helpcenter_img },

    // { name: "Help Center", busImg: layer4, lable: "", path: "/help-desk" },
  ];
  useEffect(() => {
    dispatch(
      GetfilterQuotationData({
        productName: "",
        quotationStatus: "",
        documentStatus: "",
        policyholder: "",
        quotationPolicyNumber: "",
        dateCreated: "",
        effectivityfromDate: "",
        effectivitytoDate: "",
        expirytoDate: "",
        expiryToDate: "",
        quotationOrPolicy: "",
      })
    );
  }, []);

  return (
    <>
      <div className="business-card">
        <Row gutter={[16, 16]}>
          {businessInfo.map((BusinessCardInfo, index) => {
            return (
              <Col key={index} xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className="business-card-informtion">
                  <Link to={BusinessCardInfo.path}>
                    <div className="parent-bussiness">
                      <div className="lead-child">
                        <h4 className={`${BusinessCardInfo.name === "Quotations/Policies" ? "destop" : ""}`}>
                          <strong>{BusinessCardInfo.name}</strong>
                        </h4>
                      </div>
                      <div className="img-child">
                        <img src={BusinessCardInfo.image} />
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {/* {BusinessCardInfo.name == 'Help Center' || BusinessCardInfo.name == 'All Products'  ? "" : <span className='circle-dot'></span> } */}
                      <p>{BusinessCardInfo.lable}</p>
                    </div>
                  </Link>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* <Row gutter={16}>
            <Col xs={24}
                    sm={24}
                    md={24}
                    lg={24}
                    xl={24}>
                <div className='coming-soon'>
                    <div className='parent'>
                            <div className='lead-child comming'>
                                <h4>Coming Soon!</h4>
                            </div>
                            <div className='img-child'>
                                <img src={layer5} />
                            </div>
                        </div>
                </div>

            </Col>
            </Row> */}
      </div>
    </>
  );
};

export default BusinessInformation;
