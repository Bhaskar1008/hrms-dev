import React from "react";
import "./Performance.css";
import OonaHeader from "./../OonaHeader/OonaHeader";
import { Row, Col, Button, Radio, Icon, Select, Option, Form, Progress, Input, DatePicker, Upload, message } from "antd";
import UserInformation from "../UserInformation";
import TopPerformers from "../TopPerformers/TopPerformers";
import RecentActivity from "../RecentActivity/RecentActivity";
import BottomNavigation from "../bottomNavigation/bottomNavigation";
import OonaFooter from "../OonaFooter/OonaFooter";
import axiosRequest from "../../../axios-request/request.methods";
// import ProductionGraph from '../ProductionYearGraph/ProductionGraph';
import ProductionGraph from "../ProductionYearGraph/ProductionYearGraph";

const Performance = () => {
  const formItemLayout = {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  };

  const handleGenerateReport = async () => {
    let res = await axiosRequest.get(`user/staff/reports/data`);
    if (res.statusCode === -1) {
      var a = document.createElement("a");
      a.href = res?.data?.File;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      message.success("Staff report generated successfully");
    } else {
      console.log("error to download");
    }
  };

  return (
    <>
      <div className="main-containerPerformance">
        <OonaHeader />
        <div style={{ display: "flex" }}>
          <div className="h2performance">
            <h2 className="myPerformance">My Performance</h2>
          </div>
          <div className="reportGenerate">
            <Button className="generateReportButton" onClick={handleGenerateReport}>
              Generate Staff Report
            </Button>
          </div>
        </div>

        <br />
        <div>
          <ProductionGraph />
        </div>
        <hr style={{ width: "100%", height: 1 }} />
        <br />
        <UserInformation />
        <br />

        <hr style={{ width: "100%", height: 1 }} />

        <TopPerformers />
        {/* <RecentActivity /> */}
      </div>
      {/* <BottomNavigation />
            <OonaFooter /> */}
    </>
  );
};

export default Performance;
