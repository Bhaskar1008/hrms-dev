import React, { useState, useEffect } from "react";
import "./PolicySelection.css";
import { Button, Row, Col, Drawer } from "antd";
import { useHistory } from "react-router-dom";
import img1 from "../../../../../../images/policyGroup/individual.png";
import img2 from "../../../../../../images/policyGroup/Group.png";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import img3 from "../../../../../../images/policyGroup/copy.png";
import img4 from "../../../../../../images/sharableLinkd_img/tap .png";
import { DrawerFunction } from "../../../../../ICARE/MotorComprehensive/MotorPolicyPage/MotorPolicyPage"

export default function PolicySelection({ policyTypeList, setTravelType, travelType, QuoteNext }) {


  const history = useHistory();

  const handleProceed = (val) => {
    setTravelType(val)
  }
  const [showDrawer, setShowDrawer] = useState(false);
  const onClose = () => {
    setShowDrawer(false);
  };
  const handledrawerOpen = () => {
    setShowDrawer(true);
  };
  // this for the the sharlink
  const handledraweOpenMobile = () => {
    history.push("/links");

  }
  const [visible, setVisible] = useState(true);
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 620
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  const showDrawer1 = () => {
    setVisible(true);
  };

  const handleDrawerClose = () => {
    setVisible(false);
  };

  return (
    <>

      {width > breakpoint && <div>
        <div className="subheadings">I need to issue a policy for</div>
        <Row gutter={16}>
          {policyTypeList && Array.isArray(policyTypeList) && policyTypeList.map((e) => {
            return <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Button className={`yes ${e.name === travelType ? 'yes-active' : ''}`} onClick={() => handleProceed(e.name)}>
                {/* <img src={img1} /> */}
                <img
                  src={e.name === "Individual" ? img1 : img2}
                />
                <div className="travel-span">
                  <span> {e.name}</span>
                  <span className="rsSublabel">{e.sublabel}</span>
                </div>
              </Button>
            </Col>;
          })}
          <Col xs={24} sm={24} md={12} lg={24} xl={24} >
            <div className="product1-tap-container" onClick={handledrawerOpen}>
              <div >
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
          </Col>
        </Row>
        <DrawerFunction
          showDrawer={showDrawer}
          onClose={onClose}
        />
        {/* <div className="msg-div">
          <div className="Rsmessage">
            Send this link if your client wants to fill out the form
          </div>
          <div className="Rslinkbox">
            https://oo.na/agent/83dcg <img src={img3} className="copy" />
          </div>
        </div> */}
      </div>
      }

      {
        width < breakpoint && <Drawer

          placement="bottom"
          closable={false}
          onClose={handleDrawerClose}
          visible={visible}
          height="90%"
        >
          <div>
            <div className="subheadings">I need to issue a policy for</div>
            <Row gutter={16}>
              {policyTypeList && Array.isArray(policyTypeList) && policyTypeList.map((e) => {
                return <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Button className={`yes ${e.name === travelType ? 'yes-active' : ''}`} onClick={() => handleProceed(e.name)}>
                    {/* <img src={img1} /> */}
                    <img
                      src={e.name === "Individual" ? img1 : img2}
                    />
                    <div className="travel-span">
                      <span> {e.name}</span>
                      <span className="rsSublabel">{e.sublabel}</span>
                    </div>
                  </Button>
                </Col>;
              })}
              {/* <Col xs={24} sm={24} md={12} lg={24} xl={24} >
                <div className="product1-tap-container" onClick={handledraweOpenMobile}>
                  <div >
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
            <Button className="nxt-btn" onClick={QuoteNext}>
              Proceed <ArrowRightOutlined />
            </Button>
            {/* <div className="msg-div">
          <div className="Rsmessage">
            Send this link if your client wants to fill out the form
          </div>
          <div className="Rslinkbox">
            https://oo.na/agent/83dcg <img src={img3} className="copy" />
          </div>
        </div> */}
          </div>
        </Drawer>
      }

    </>
  );
}
