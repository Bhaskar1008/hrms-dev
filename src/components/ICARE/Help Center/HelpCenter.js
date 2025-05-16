import React, { useState, useEffect } from "react";
import "./HelpCenter.css";
import img1 from "../../../images/helpdesk/whatsapp.png";
import img2 from "../../../images/helpdesk/chat.png";
import img3 from "../../../images/helpdesk/email.png";
import img4 from "../../../images/helpdesk/call.png";
import OonaHeader from "../OonaHeader/OonaHeader";
import OonaFooter from "../OonaFooter/OonaFooter";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import BottomNavigation from "../bottomNavigation/bottomNavigation";
import { red } from "@mui/material/colors";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import axios from "axios";
import { message, Card } from "antd";
import { Collapse } from "antd";
import "antd/dist/antd.css";
// import actionNoData from "../../../assets/Actionnodata.png";
import actionNoData from "../../../assets/Actionnodata.png";
import axiosRequest from "../../../axios-request/request.methods";
export default function HelpCenter() {
  const [activeIndex, setActiveIndex] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const [faqData, setFaqData] = useState([]);

  const [loading, setLoading] = useState(false);
  
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const sendEmail = () => {
    window.open("mailto:agencysupport@oona-insurance.com.ph");
  };
  const fetchFaq = async () => {
    setLoading(true);

    try {
      const response = await axiosRequest.get(`user/oona/faq`);

      const faqItems = response?.data?.data;

      setFaqData(faqItems);
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  return (
    <>
      <div className="bacColor">
        {isOpen && (
          <>
            <div className="popup">
              <div className="popup_header">
                <h2>Mobile Numbers</h2>
                <hr />
              </div>

              <div className="popup_body">
                <p>Globe: +63 9178276001</p>
                <p>Landline: +63 88764444 loc 2507</p>
              </div>
              <div className="popup_footer">
                <Button
                  className="delete-button"
                  icon={<CloseOutlined />}
                  onClick={togglePopup}
                />
              </div>
            </div>
          </>
        )}

        <OonaHeader />
        <div
          style={{
            background: `${isOpen === true ? "rgb(196 194 192 / 28%)" : ""}`,
          }}
          className="HelpCentermain-container"
        >
          <div
            style={{
              background: `${isOpen === true ? "rgb(196 194 192 / 28%)" : ""}`,
            }}
            className="HelpCentercontainers"
          >
            <h1 className="heading">Help Center</h1>
            <div className="HelpCentercontainersChatData">
              <div className="icon-container">
                <div>
                  <a
                    lassName="text"
                    target="_blank"
                    href="https://wa.me/639190766164"
                    title="Share on whatsapp"
                  >
                    <img src={img1} className="icon" />
                    <p className="text">whatsapp</p>
                  </a>
                </div>
                <div className="vertical-line"></div>
                {/* <div> 
                <img src={img2} className='icon'/>
                <p className='text'>chat</p>
              </div> */}
                {/* <div className='vertical-line'></div> */}
                <div onClick={sendEmail}>
                  <img src={img3} className="icon" />
                  <p className="text">Email</p>
                </div>
                <div className="vertical-line"></div>
                <div onClick={togglePopup}>
                  <img src={img4} className="icon" />
                  <p className="text">phone</p>
                </div>
              </div>
            </div>
          </div>

          <div className="faq">FAQ</div>

          <div style={{ width: "100%" }}>
            {loading ? (
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
            ) : (
              <div className="accordion-container">
                <Collapse accordion expandIconPosition="right">
                  {faqData.map((faqItem, index) => (
                    <Collapse.Panel
                      key={index}
                      // {faqItem.Heading}
                      header= {faqItem.question}
                      className="faqheading"
                    >
                     
                      <p className="faqans">{faqItem.ans1}</p>
                      {faqItem.ansImgLink && (
                        <img
                          src={faqItem.ansImgLink}
                          alt={faqItem.Heading}
                          className="faqimg"
                        />
                      )}
                    </Collapse.Panel>
                  ))}
                </Collapse>
              </div>
            )}
          </div>
        </div>
        <BottomNavigation />
        <OonaFooter />
      </div>
    </>
  );
}
