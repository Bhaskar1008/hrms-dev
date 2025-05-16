import React, { useEffect, useState } from "react";
import * as actions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import "./DailyBussiness.css";
import { Row, Col, Typography, Input, Radio, Divider } from "antd";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import ads_click from "./../Activitity Tracker/icons/ads_click.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import person_blue from "./../Activitity Tracker/icons/person_blue.png";
import xls_image from "./../Activitity Tracker/icons/xls.png"
import axiosRequest from "../../axios-request/request.methods";
import group_white from "../../assets/MaterialUiIcons/group_white_192x192.png";
import group_black from "../../assets/MaterialUiIcons/group_black_192x192.png";
import group_blue from "./../Activitity Tracker/icons/group_blue.png";
import file_export from "./../Activitity Tracker/icons/file_export.png"
import { Button, Modal, Form ,} from "antd";
import { message,DatePicker } from "antd";
import dayjs from "dayjs";

import {
  TeamOutlined,
  UserOutlined,
  AimOutlined,
  CalendarOutlined,
  ConsoleSqlOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space } from "antd";
import { Select } from "antd";
import { Column } from "@ant-design/charts";
import { checkAgent, stoageGetter } from "../../helpers";
import Tabs from "../Tab/Tab";
import { Avatar } from "antd";
import { fontWeight } from "@mui/system";
import { useSyncExternalStore } from "react";
const { RangePicker } = DatePicker;

const DailyBussiness = () => {
  const dispatch = useDispatch();

  dispatch(actions.headerName("Business"));
  let data = [];
  const id = useSelector((state) => state?.login?.user?.id);
  const [form] = Form.useForm();
  const [GWPData, SetGWPData] = useState([]);
  console.log("GWPData===========", GWPData);
  const [GWPGraph, SetGWPGraph] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todayGoalCreated, setTodayGoalCreated] = useState({});
  const [currentIDTeam, setCurrentIDTeam] = useState(id);
  const [selectDays, setSelectDays] = useState({
    value: "7",
    label: "Last 7 Days",
  });
  const [dateRange, setDateRange] = useState([null, null]);

  const [reporting_hierarchies, setReporting_hierarchies] = useState([]);
  const [reporting_users, setReporting_users] = useState([]);
  const [showAreYouSure, setShowAreYouSure] = useState(false);
  const [areYouSure, setAreYouSure] = useState(false);
  const [user, setUser] = useState("");
  console.log("user--------", user);
  const { Text, Link } = Typography;

  const [currentTabValue, SetCurrentTabValue] = useState("Self");

  const kpi_data = useSelector((state) => state.kpiDashboard.kpi_data);
  const employee_data = kpi_data;

  const [finalBudgetData, setFinalBudgetData] = useState([]);
  const [finalBudgetConfig, setFinalBudgetConfig] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;
  const [flag, setFlag] = useState("");
  const [showExportBtn, setShowExportBtn] = useState(true);
  const userTreeData = useSelector((state) => state?.home?.user_tree);

  const showModal = async () => {
    form.resetFields();
    setShowAreYouSure(false);
    setAreYouSure(false);

    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${currentIDTeam}?today_goal=true`,
        { secure: true }
      );
      setTodayGoalCreated(res.data);
    } catch (error) {
      // console.log(error);
    }

    setIsModalOpen(true);
  };
const onDateRangeChange = async (dates, dateStrings) => {
  setDateRange(dates);
  if (dates && dates[0] && dates[1]) {
    try {
      // Format dates as needed (e.g., 'YYYY-MM-DD')
      const from = dateStrings[0];
      const to = dateStrings[1];
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${id}?from=${from}&to=${to}`,
        { secure: true }
      );
      if (res.data[0]) {
        SetGWPData(res.data[0]);
      }
    } catch (error) {
      // Handle error
    }
  }
};

  const getUserData = async () => {
    try {
      let res = await axiosRequest.get(`user/fetch_goals?team=enable`, {
        secure: true,
      });
      console.log("USer data==>",res)
      setUser(res?.data);
    } catch (error) {
      // console.log("error API " + error);
    }
  };

  const changeDays = async (value) => {
    if (value == 7) setSelectDays({ value: "7", label: "Last 7 Days" });
    else setSelectDays({ value: "30", label: "Last 30 Days" });

    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${id}?option=${value}`,
        { secure: true }
      );
      if (res.data[0]) {
        SetGWPData(res.data[0]);
      }
    } catch (error) {
      // console.log("error API " + error);
    }
  };

  const GetGraph = async (id) => {
    try {
      let res = await axiosRequest.get(`user/fetch_goals/${id}`, {
        secure: true,
      });
      if (res.data.graph_data) {
        let responseArray = [...res.data.graph_data];
        SetGWPGraph([...responseArray]);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const isFloat = (n) => {
    try {
      return Number(n) === n && n % 1 !== 0;
    } catch (err) {
      // console.log(err, "72b52752-02a7-4b70-b910-69810435b32b");
    }
  };

  const getPercenTage = (x, y) => {
    let val = isNaN(y / x) * 100 ? 0 : checkValidity((y / x) * 100);
    return isFloat(val) ? parseInt(val).toPrecision(3) : parseInt(val);
  };

  const checkValidity = (data) => {
    try {
      if (
        data === "" ||
        data === null ||
        data === undefined ||
        data === "undefined" ||
        data === "-" ||
        data === Infinity
      ) {
        return 0;
      } else {
        return data;
      }
    } catch (err) {}
  };

  const onFinish = async (values) => {
    if (showAreYouSure && areYouSure) {
      let payload = {};

      if (todayGoalCreated?._id) {
        payload = {
          csmId: currentIDTeam,
          gpwAchived: values.gpwCommitment, // achieved
          goal_id: todayGoalCreated?._id ? todayGoalCreated?._id : "",
        };
      } else {
        payload = {
          csmId: currentIDTeam,
          gpwCommitment: values.gpwCommitment,
        };
      }
      let updateAPIcall = null
      let APIcall = null

      try {
        todayGoalCreated?._id
          ? updateAPIcall= await axiosRequest.put(`user/update_your_goal`, payload, {
              secure: true,
            })
            
          : APIcall =  await axiosRequest.post(`user/set_goal`, payload, { secure: true });
          console.log("API CALL",APIcall)
            if(updateAPIcall){
              if(updateAPIcall?.statusCode === -1){
                message.success("Goal updated successfully");
              }
            }else if (APIcall){
              if(APIcall?.statusCode === -1){
                message.success("Goal created successfully");
                
              }
            }
          
          
        // GetGraph();
        GetGraphParams(id)
        getUserDataParams(id)
        setIsModalOpen(false);
        changeDays(7);
        // getUserData();
        form.resetFields();
      } catch (error) {
        // console.log(error);
        alert(error);
      }
    } else {
      setShowAreYouSure(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  const onChangeAreYouSure = (e) => {
    setAreYouSure(e.target.value);
  };

  // const { Text, Link } = Typography;

  useEffect(() => {
    const { id, channelCode } = stoageGetter("user");
    console.log("id----------", id);
    getUserDataParams(id);
    changeDays(7);
    GetGraph(id);
    setReporting_hierarchies(userTreeData?.reporting_hierarchies);
  }, []);

  const changeTab = (event) => {
    // setShowExportBtn()
    // event === "Self" ? SetCurrentTabValue("Team") : SetCurrentTabValue("Self");
    if (event === "Team") {
      SetCurrentTabValue("Team");
      gethirarchyData(id);
      setCurrentIDTeam(id);
      setShowExportBtn(false);
    } else {
      const { id, channelCode } = stoageGetter("user");
      SetCurrentTabValue("Self");
      setReporting_users([]);
      setShowExportBtn(true);
      GetGraph(id);
      getUserDataParams(id);
      changeDays(7);
      setReporting_hierarchies(userTreeData?.reporting_hierarchies);
      
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const budgetConfigDat = [];
  
      GWPGraph?.forEach((item) => {
        if (item.name === "GWP Commitment (in ₹)") {
          budgetConfigDat.push({
            name: "COMMITMENT",
            val: parseInt(item.amount),
            day: item.month,
          });
        } else {
          budgetConfigDat.push({
            name: "Achieved",
            val: parseInt(item.amount),
            day: item.month,
          });
        }
      });
  
      setFinalBudgetConfig({
        data: budgetConfigDat,
        isGroup: true,
        xField: "day",
        yField: "val",
        seriesField: "name",
  
        // 🎨 Gradient Colors
        color: ({ name }) => {
          if (name === "COMMITMENT") {
            return "l(270) 0:#00AEC1 1:#B2EBF2";
          }
          return "l(270) 0:#FF6D00 1:#FFD180";
        },
  
        // 📊 Rounded Bars (small radius)
        columnStyle: {
          radius: [4, 4, 0, 0],
        },
  
        // 📍 Legend Configuration
        legend: {
          position: "bottom",
          marker: {
            symbol: "circle",
          },
        },
  
        // 📅 X-Axis: Label + Title
        xAxis: {
          label: {
            autoHide: false,
            autoRotate: true,
          },
          title: {
            text: "Months",
            style: {
              fontWeight: 500,
              fill: "#666",
            },
          },
        },
  
        // 📈 Y-Axis: Percentage + Title
        yAxis: {
          label: {
            formatter: (val) => `${val}%`,
          },
          title: {
            text: "Score in %",
            style: {
              fontWeight: 500,
              fill: "#666",
            },
          },
          grid: {
            line: {
              style: {
                stroke: "#e0e0e0",
                lineDash: [4, 4],
              },
            },
          },
        },
      });
  
      setFinalBudgetData(budgetConfigDat);
    });
  }, [GWPGraph]);
  

  const { Option } = Select;

  const getReportingUsers = (e) => {
    // console.log(e);
    let _teamData = userTreeData.reporting_users.filter(
      (el) =>
        //  {
        //   if(el.designation === e && el.active === 1) return el
        // }
        el.hierarchy_id === e
    );
    setReporting_users(_teamData);
    setShowExportBtn(false);
  };

  const changeDaysParams = async (value, currentId) => {
    if (value == 7) setSelectDays({ value: "7", label: "Last 7 Days" });
    else setSelectDays({ value: "30", label: "Last 30 Days" });

    try {
      let res = await axiosRequest.get(
        `user/fetch_daily_activity/${currentId}?option=${value}`,
        { secure: true }
      );
      if (res.data[0]) {
        SetGWPData(res.data[0]);
      }
    } catch (error) {
      // console.log("error API " + error);
    }
  };

  const getUserDataParams = async (currrentID) => {
    try {
      let res = await axiosRequest.get(`user/fetch_goals/${currrentID}?team=enable`, {
        secure: true,
      });
      console.log("USer data==>",res)
      setUser(res.data);
    } catch (error) {
      // console.log("error API " + error);
    }
  };

  const GetGraphParams = async (currentId) => {
    try {
      let res = await axiosRequest.get(`user/fetch_goals/${currentId}`, {
        secure: true,
      });
      if (res.data.graph_data) {
        let responseArray = [...res.data.graph_data];
        SetGWPGraph([...responseArray]);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const gethirarchyData = (currentId) => {
    // setSelectValue("Select")
    getUserDataParams(currentId);
    setCurrentIDTeam(currentId);
    changeDaysParams(7, currentId);
    GetGraphParams(currentId);
    setFlag(currentId);
    setShowExportBtn(true);
  };

  const exportButtonGet = async () => {
    let _userID = currentTabValue === "Self" ? id : flag;
    let resExportButton = await axiosRequest.get(
      `user/commitment-report?userId=${_userID}`,
      {
        secure: true,
      }
    );

    if(resExportButton?.statusCode === -1){
      downloadFile(resExportButton?.data, 'DailybusinessCommitment')
    }else if (resExportButton === 'No data found') {
      message.info(resExportButton);
    }
    console.log("check download API",resExportButton)
  };

  function downloadFile(url, fileName) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || 'download';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

  return (
    <>
      <Modal
        title="GOAL PLANNING"
        centered
        visible={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        className="GoalModal"
      >
        <div className="modal-body">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid #dbdbdb",
              paddingBottom: "10px",
              marginBottom: "10px",
            }}
          >
            <CalendarOutlined
              style={{
                fontSize: "19px",
                color: "#00acc1",
              }}
            />{" "}
            <div>
              Activity Goals for{" "}
              <span
                style={{
                  color: "#00acc1",
                  fontWeight: "bolder",
                }}
              >
                {Moment().format("MMM DD YYYY")}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              fontWeight: "bolder",
            }}
          >
            <div>GWP</div>
            <div>
              {todayGoalCreated?._id
                ? `Commitment : ${todayGoalCreated?.am?.gpwCommitment}`
                : ""}
            </div>
          </div>

          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="gpwCommitment"
              rules={[
                {
                  required: true,
                  message: "The Field is Required",
                },
                {
                  pattern: new RegExp("^[0-9]*$"),
                  message: "The Fields Should be numbers",
                },
              ]}
            >
              <Input maxLength={10}
              placeholder= {todayGoalCreated?._id ? 'Enter Achievement':'Enter Commitment'} />
            </Form.Item>
            {showAreYouSure && (
              <Form.Item
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#00acc0",
                }}
              >
                Are you sure
                <Radio.Group
                  style={{ marginLeft: "10px" }}
                  onChange={onChangeAreYouSure}
                  value={areYouSure}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </Radio.Group>
              </Form.Item>
            )}
            <Form.Item
              style={{
                marginBottom: 0,
              }}
            >
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  margin: "0 auto",
                  padding: "8px 35px",
                  background: "#e46a25",
                  border: "1px solid #e46a25",
                  boxShadow: "0px 5px 7px #00000029",
                }}
                type="primary"
                htmlType="submit"
              >
                {todayGoalCreated?._id ? "Update" : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
      <div className="dailHeader">
        <Tabs tabMenu={[]} header="Business" activeKey="1" />
      </div>

      <div style={{ padding: "0 3%", paddingBottom: "20px" }}>
        <Row className="tabs">
          {checkAgent() === false && (
            <>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                style={{ marginTop: "10px", padding: "0 5px" }}
              >
                <Button
                  className={
                    currentTabValue === "Self" ? "primaryBtn" : "secondaryBtn"
                  }
                  onClick={() => changeTab("Self")}
                >
                  <img
                    src={
                      currentTabValue === "Self" ? person_white : person_blue
                    }
                    className={
                      currentTabValue === "Self" ? "person person_icon" : "person self_icon" 
                    }
                    alt="person_png"
                  />
                  {"   "}
                  Self
                </Button>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={2}
                xl={2}
                style={{ marginTop: "10px", padding: "0 5px" }}
              >
                <Button
                  className={
                    currentTabValue === "Team" ? "primaryBtn" : "secondaryBtn"
                  }
                  onClick={() => changeTab("Team")}
                >
                  <img
                    src={currentTabValue === "Team" ? group_white : group_blue}
                    className={
                      currentTabValue === "Team" ? "person person_icon" : "person group_icon" 
                    }
                    alt="person_png"
                  />
                  {"   "}
                  Team
                </Button>
              </Col>
            </>
          )}

          {currentTabValue === "Team" && (
            <>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={3}
                xl={3}
                className="selectionPeroson"
                style={{ marginTop: "10px", padding: "0 5px" }}
              >
                <Select
                  defaultValue={{ value: "", label: "Select" }}
                  size="medium"
                  style={{
                    width: "100%",
                    // border: "1px solid rgba(0,0,0,0.2)",
                  }}
                  onChange={getReportingUsers}
                >
                  {reporting_hierarchies?.map((res, index) => (
                    <Option key={index} value={res.value}>
                      {res.dispValue}
                    </Option>
                  ))}
                </Select>
              </Col>
              {/* <Col
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={3}
            className="selectionPeroson"
            style={{ marginTop: "10px", padding: "0 5px" }}
          >
            <Button
              className={ "primaryBtn" }
              onClick={ exportButtonGet } >
              Export
            </Button>
          </Col> */}
            </>
          )}
          {currentTabValue === "Team" &&
            reporting_users &&
            reporting_users.length > 0 && (
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={3}
                xl={3}
                className="selectionPeroson"
                style={{ marginTop: "10px", padding: "0 5px" }}
              >
                <Select
                  defaultValue={{ value: "", label: "Select" }}
                  size="medium"
                  onChange={gethirarchyData}
                  style={{
                    width: "100%",
                    // border: "1px solid rgba(0,0,0,0.2)",
                  }}
                >
                  {reporting_users?.map((res, index) => (
                    <Option key={index} value={res._id}>
                      {res.first_name} {res.last_name}
                    </Option>
                  ))}
                </Select>
              </Col>
            )}

            {showExportBtn && (
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={3}
              xl={3}
              className="selectionPeroson export-btn-col"
              style={{ marginTop: "10px", padding: "0 5px" }}
            >
            <Button className="secondaryBtn1 " onClick={exportButtonGet}>
              <img
                  src={file_export}
                  className="file_export_icon"
                  alt="file_export_png"
              />
              {"   "}
              Export
            </Button>

          </Col>
        )}

        </Row>

        {/* {checkAgent() === false && <hr style={{ marginBottom: "20px" }} />} */}
        {currentTabValue === "Self" ? (
          <div className="Self">
            <Row
              justify="space-around dailyExportTab"
              style={{ marginTop: "10px" }}
              gutter={16}
            >
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                className=""
                style={{ padding: "14px", textTransform: "capitalize" }}
              >
                <Row justify="start">
                  <Avatar
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#FF6D0024",
                      verticalAlign: "middle",
                      textTransform: "uppercase",
                      color: "#FF6D00",
                    }}
                    size="large"
                    gap={1}
                  >
                    {user?.csm_details?.first_name?.charAt(0)}
                    {user?.csm_details?.last_name?.charAt(0)}
                  </Avatar>
                  <Row style={{ flexDirection: "column", marginLeft: "10px", marginTop:"8px" }}>
                    <Text strong>
                      {/* {user?.csm_details?.first_name}{" "}
                      {user?.csm_details?.last_name} */}
                      CSM ID
                      {" "}
                      {user?.csm_details?.agent_id}
                    </Text>
                    {/* <Row>
                      <Text strong type="secondary">
                        CSM ID
                      </Text>
                      <Text style={{ marginLeft: "10px" }} type="secondary">
                        {" "}
                        {user?.csm_details?.agent_id}
                      </Text>
                    </Row> */}
                  </Row>
                </Row>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                style={{ padding: "14px" }}
              >
                <Row
                  style={{
                    justifyContent:
                      width <= breakpoint ? "space-between" : "end",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text strong className="dateRange">
                    Date range :
                  </Text>
                  <div
                    className="goalCalendar"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RangePicker
                      value={dateRange}
                      onChange={onDateRangeChange}
                      format="YYYY-MM-DD"
                      allowClear
                      style={{ width: "100%", minWidth: 180 ,color: "#00AEC1"}}
                      popupClassName="responsive-range-picker"
                    />
                    <CalendarOutlined
                      style={{
                        fontSize: "23px",
                        color: "#00AEC1",
                        margin: "0 5px",
                      }}
                    />
                  </div>
                  {currentTabValue === "Self" ? (
                    <Button
                      className="goalButton"
                      type="primary"
                      size="large"
                      onClick={showModal}
                      // icon={<AimOutlined style={{ fontSize: "17px" }} />}
                    >
                      <img 
                        src={ads_click}
                        alt="goal-icon"
                        className="goal-icon"
                        //style={{ fontSize: "17px", marginRight: "8px" }}
                      />
                      Add Daily Goal
                    </Button>
                  ) : (
                    <></>
                  )}
                </Row>
              </Col>
            </Row>
            <Row
              justify="space-around graph"
              style={{ marginTop: "10px" }}
              gutter={36}
            >
              <Col
                style={{
                  padding: 0,
                }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="gwp-chart-container">
                  <Row>
                    <Col
                      span={24}
                      style={{
                        padding: "14px",
                        color: "#FF6D00",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid lightgray"
                      }}
                    >
                      <span>GWP (COMMITMENT VS. ACHIEVED)</span>
                      <Select
                        defaultValue={{ value: "6", label: "Last 6 Months" }}
                        size="small"
                        style={{
                          width: "150px",
                          color: "#666666"
                        }}
                      >
                        <Option value="6">Last 6 Months</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="graph_exporter">
                      <p>Showing GWP (COMMITMENT VS. ACHIEVED)</p>
                      <Button className="export-icon-btn">
                        <img src={xls_image} alt="export" />
                      </Button>
                    </Col>
                  </Row>
                  <div className="budgeData_bussiness">
                    {finalBudgetConfig && <Column {...finalBudgetConfig} />}
                  </div>
                </div>
              </Col>
              <Col
                style={{ padding: 0 }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="gwp-table-container">
                  <div className="gwp-header-row">
                    <div className="gwp-header-cell">Date</div>
                    <Divider type="vertical" className="header-divider" />
                    <div className="gwp-header-cell">GWP (in ₱)</div>
                  </div>
                  <div className="gwp-table-content">
                    <table className="gwp-table">
                      <colgroup>
                        <col style={{width: "120px"}} />
                        <col style={{width: "40%"}} />
                        <col style={{width: "auto"}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th></th>
                          <th className="commitment-header">
                            COMMITMENT
                            <Divider type="vertical" className="header-column-divider" />
                          </th>
                          <th>ACHIEVED</th>
                        </tr>
                      </thead>
                      <tbody>
                        {GWPData?.map((res, index) => (
                          <tr key={index}>
                            <td className="date-column">{Moment(res.goal_date).format("MM/DD/YYYY")}</td>
                            <td>₱ {checkValidity(res.am.gpwCommitment)}</td>
                            <td>₱ {checkValidity(res.pm.gpwAchived)} ({getPercenTage(
                              checkValidity(res.am.gpwCommitment),
                              checkValidity(res.pm.gpwAchived)
                            )}%)</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="Team">
            <Row
              justify="space-around dailyExportTab"
              style={{ marginTop: "10px" }}
              gutter={16}
            >
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                className=""
                style={{ padding: "14px", textTransform: "capitalize" }}
              >
                <Row justify="start">
                  <Avatar
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      backgroundColor: "#FF6D0024",
                      verticalAlign: "middle",
                      textTransform: "uppercase",
                      color: "#FF6D00",
                    }}
                    size="large"
                    gap={1}
                  >
                    {user?.csm_details?.first_name?.charAt(0)}
                    {user?.csm_details?.last_name?.charAt(0)}
                  </Avatar>
                  <Row style={{ flexDirection: "column", marginLeft: "10px", marginTop:"8px" }}>
                    <Text strong>
                      {/* {user?.csm_details?.first_name}{" "}
                      {user?.csm_details?.last_name} */}
                       CSM ID
                      {" "}
                      {user?.csm_details?.agent_id}
                    </Text>
                    {/* <Row>
                      <Text strong type="secondary">
                        CSM ID
                      </Text>
                      <Text style={{ marginLeft: "10px" }} type="secondary">
                        {" "}
                        {user?.csm_details?.agent_id}
                      </Text>
                    </Row> */}
                  </Row>
                </Row>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
                style={{ padding: "14px" }}
              >
                <Row
                  style={{
                    justifyContent:
                      width <= breakpoint ? "space-between" : "end",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text strong className="dateRange">
                    Date range :
                  </Text>
                  <div
                    className="goalCalendar"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <RangePicker
                      value={dateRange}
                      onChange={onDateRangeChange}
                      format="YYYY-MM-DD"
                      allowClear
                      style={{ width: "100%", minWidth: 180 ,color: "#00AEC1"}}
                      popupClassName="responsive-range-picker"
                    />
                    <CalendarOutlined
                      style={{
                        fontSize: "23px",
                        color: "#00AEC1",
                        margin: "0 5px",
                      }}
                    />
                  </div>
                  {!(currentTabValue === "Team") && (
                    <Button
                      className="goalButton"
                      type="primary"
                      size="large"
                      onClick={showModal}
                      // icon={<AimOutlined style={{ fontSize: "17px" }} />}
                    >
                      <img 
                        src=""
                        alt="goal-icon"
                        style={{ fontSize: "17px", marginRight: "8px" }}
                      />
                      Add Daily Goal
                    </Button>
                  )}
                </Row>
              </Col>
            </Row>
            <Row
              justify="space-around graph"
              style={{ marginTop: "10px" }}
              gutter={36}
            >
              <Col
                style={{
                  padding: 0,
                }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="gwp-chart-container">
                  <Row>
                    <Col
                      span={24}
                      style={{
                        padding: "14px",
                        color: "#FF6D00",
                        fontWeight: "bold",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "1px solid lightgray",
                        paddingLeft:"2px",
                      }}
                    >
                      <span>GWP (COMMITMENT VS. ACHIEVED)</span>
                      <Select
                        defaultValue={{ value: "6", label: "Last 6 Months" }}
                        size="small"
                        style={{
                          width: "150px",
                          color: "#666666"
                        }}
                      >
                        <Option value="6">Last 6 Months</Option>
                      </Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="graph_exporter">
                      <p>Showing GWP (COMMITMENT VS. ACHIEVED)</p>
                      <Button className="export-icon-btn">
                        <img src={xls_image} alt="export" />
                      </Button>
                    </Col>
                  </Row>
                  <div className="budgeData_bussiness">
                    {finalBudgetConfig && <Column {...finalBudgetConfig} />}
                  </div>
                </div>
              </Col>
              <Col
                style={{ padding: 0 }}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={12}
              >
                <div className="gwp-table-container">
                  <div className="gwp-header-row">
                    <div className="gwp-header-cell">Date</div>
                    <Divider type="vertical" className="header-divider" />
                    <div className="gwp-header-cell">GWP (in ₱)</div>
                  </div>
                  <div className="gwp-table-content">
                    <table className="gwp-table">
                      <colgroup>
                        <col style={{width: "120px"}} />
                        <col style={{width: "40%"}} />
                        <col style={{width: "auto"}} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th></th>
                          <th className="commitment-header">
                            COMMITMENT
                            <Divider type="vertical" className="header-column-divider" />
                          </th>
                          <th>ACHIEVED</th>
                        </tr>
                      </thead>
                      <tbody>
                        {GWPData?.map((res, index) => (
                          <tr key={index}>
                            <td className="date-column">{Moment(res.goal_date).format("MM/DD/YYYY")}</td>
                            <td>₱ {checkValidity(res.am.gpwCommitment)}</td>
                            <td>₱ {checkValidity(res.pm.gpwAchived)} ({getPercenTage(
                              checkValidity(res.am.gpwCommitment),
                              checkValidity(res.pm.gpwAchived)
                            )}%)</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default DailyBussiness;
