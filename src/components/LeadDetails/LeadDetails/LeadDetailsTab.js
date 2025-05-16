import React, { useState, useEffect } from "react";
import { Row, Col, Tabs } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./LeadDetailsTab.css";
const style = {
  color: "yellow",
  background: "#fff",
  borderWidth: 1,
  // borderStyle: "solid",
  borderColor: "black",
};

const LeadDetailsTab = (props) => {
  const { TabPane } = Tabs;
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  let storeFormData = useSelector((state) => state.newLead.formData);
  let leadType = storeFormData.leadType;
  //laRecruitment
  // let leadType = "Sales";

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  // Active state on tabclick
  const [activeKey, setactiveKey] = useState("1");

  let history = useHistory();
  const tabClick = (key) => {
    setactiveKey(key);
    switch (key) {
      case "1":
        return history.push("/leadmasterpage/leaddetails/personallead");
      case "2":
        return history.push("/leadmasterpage/leaddetails/contactlead");
      case "3":
        return history.push("/leadmasterpage/leaddetails/professionallead");
      // case "4":
      //   return history.push("/leadmasterpage/leaddetails/existinglead");
      // case "5":
      //   return history.push("/leadmasterpage/leaddetails/productlead");
      default:
        return history.push("/leadmasterpage/leaddetails/personallead");
    }


  };

  return (
    <>
      <Col
        className="internal-tab"
        xs={24}
        sm={24}
        md={6}
        lg={6}
        xl={6}
        offset={1}
      >
        <Tabs
          style={{ fontSize: "12px", marginTop: "26px" }}
          className="AdvisorPitch-Container-pr"
          tabPosition={width > breakpoint ? "right" : "top"}
          size={width > breakpoint ? "large" : "small"}
          tabBarStyle={style}
          onTabClick={tabClick}
          activeKey={props.activeKey}
        >
          <TabPane
            className="AdvisorPitch-pr"
            key="1"
            tab="Personal Details"
          ></TabPane>
          <TabPane key="2" tab="Contact Details"></TabPane>
          <TabPane key="3" tab="Professional Details"></TabPane>
          {leadType === "LA Recruitment" || leadType === "OP Recruitment" ? (
            ""
          ) : (
            <>
              {/* <TabPane key="4" tab="Existing Insurance"></TabPane>
              <TabPane key="5" tab="Proposed Product"></TabPane> */}
            </>
          )}
        </Tabs>
      </Col>
    </>
  );
};

export default LeadDetailsTab;
