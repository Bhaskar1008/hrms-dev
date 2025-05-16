import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Steps, Timeline, Divider, Image, Tabs } from "antd";
import "./History.css";
import "../StatusLead/StatusLead.css";
// import '../LeadDetails/LeadDetailsTab.css'
import MTabs from "../../components/Tab/Tab";
import HistoryTabs from "./HistoryTabs";
// import * as actions from '../../store/actions/index';
import * as actions from "../../store/actions/history";
import _ from "lodash";
import { dataFormatting } from "../../helpers";
import axiosRequest from "../../axios-request/request.methods";

const { Step } = Steps;

// let historyRoute = "/leadmasterpage/leadhistorymaster/leadhistory";
const tabMenu = [
  {
    id: 1,
    value: "Status",
  },
  {
    id: 2,
    value: "Lead Details",
  },
  {
    id: 3,
    value: "History",
  },
];

const History = () => {
  // const storeLeadId = useSelector((state) => state.newLead.leadId);
  const hist = useSelector((state) => state.history);

  const storeUserId = useSelector((state) => state.newLead.userId);
  const leadArrObject = useSelector((state) => state?.history?.leadData);

  const storeLeadId = useSelector((state) => state.leads.currentUpdatingID);
  const appointmentArrObject = useSelector((state) => state.history.appointmentData);
  const proposalArrObject = useSelector((state) => state.history.proposalData);

  const [leadId, setleadId] = useState(storeLeadId);
  const [userId, setuserId] = useState(storeUserId);
  const dispatch = useDispatch();

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

  let leadElement = (
    // {
    // proposalArrObject !== null &&
    <>
      <h2 className="his-title">Lead Data</h2>
      <Timeline className="p4">
        {leadArrObject.map((leadData) => (
          <Timeline.Item color="red">
            <p className="ml10 timeline-title">{leadData.title}</p>
            <Row className="timeline-desc">
              <Col xs={22} sm={22} md={12} className="ml10 desc">
                <p>{leadData.desc}</p>
              </Col>
              <Col xs={22} sm={22} md={11} className="time-content">
                <p>{leadData.owner}</p>
                <p style={{ marginTop: "-12px" }}>{leadData.date}</p>
              </Col>
            </Row>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
    // }
  );

  let appointmentElement = (
    // {
    // proposalArrObject !== null &&
    <>
      <h2 className="his-title">Appointment Data</h2>
      <Timeline className="p4">
        {appointmentArrObject.map((leadData) => (
          <Timeline.Item color="red">
            <p className="ml10 timeline-title">{leadData.title}</p>
            <Row className="timeline-desc">
              <Col xs={22} sm={22} md={12} className="ml10 desc">
                <p>{leadData.desc}</p>
              </Col>
              <Col xs={22} sm={22} md={11} className="time-content">
                <p>{leadData.owner}</p>
                <p style={{ marginTop: "-12px" }}>{leadData.date}</p>
              </Col>
            </Row>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
    // }
  );

  // let proposalElement = (
  //   <>
  //     <h2 className="his-title">Proposal Data</h2>
  //     <Timeline className="p4">
  //       {proposalArrObject.map((leadData) => (
  //         <Timeline.Item color="red">
  //           <p className="ml10 timeline-title">{leadData.title}</p>
  //           <Row className="timeline-desc">
  //             <Col xs={22} sm={22} md={12} className="ml10 desc">
  //               <p>{leadData.desc}</p>
  //             </Col>
  //             <Col xs={22} sm={22} md={11} className="time-content">
  //               <p>{leadData.owner}</p>
  //               <p style={{ marginTop: "-12px" }}>{leadData.date}</p>
  //             </Col>
  //           </Row>
  //         </Timeline.Item>
  //       ))}
  //     </Timeline>
  //   </>
  // );

  useEffect(() => {
    dispatch(actions.fetchHistory(leadId, userId));
  }, [dispatch]);

  // const category_data = async () => {
  //     let data = await axiosRequest.get(`user/leadhistory/${leadId}?user_id=${userId}`, { secure: true })
  //   }

  // useEffect(() =>{
  //     category_data()
  // }, [])

  return (
    <>
      <div className="histab">

        <MTabs
          tabBarGutter={0}
          tabMenu={tabMenu}
          header="New Lead"
          // detailsRouteTab={historyRoute}
          activeKey="3"
        />
      </div>
      <div className="form-container">
        {leadId ? (
          <Row >
            <HistoryTabs />
            <Col
              xs={22}
              sm={22}
              md={18}
              className="form-body his-container historypage_conatainer"

            >
              {leadElement}
              {appointmentElement}
            </Col>
          </Row>
        ) : (
          <Row gutter={["", 20]} justify="center">
            <Col className="form-body" xs={22} sm={24} md={16} lg={16} xl={16}>
              <div className="proposal">
                <div className="bg-norecord"></div>
                <p className="norecord-title">No Records Found</p>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default History;
