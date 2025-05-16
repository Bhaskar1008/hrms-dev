import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Row,
  Col,
  Select,
  message,
  DatePicker,
} from "antd";
import { CaretDownOutlined, CloudUploadOutlined } from "@ant-design/icons";
import DataField from "../DataField/DataField";
import "./Team.css";
import EventCreate from "../EventCreate/EventCreate";
import HistoryTab from "../History-showedData/index";
import axios from "axios";
import { stoageGetter } from "../../../../helpers";
import axiosRequest from "../../../../axios-request/request.methods";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { convertToIndianTimezone } from "../../../../helper/utils";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";
const { Option } = Select;
const useWidowsSize = () => {
  const [size, setSize] = useState([window.Width, window.height]);

  useEffect(() => {
    const handleChangeSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", handleChangeSize);
  }, []);
  return size;
};

const Team = () => {
  const thisMonth = moment().format('MM');

  const _date = new Date();
  let currentMonth = _date.getMonth() + 1;
  let num = currentMonth.toString();
  let addMonth = "0" + num;
  let CPaddMonth = "0" + num;

  let currentyear = _date.getFullYear();
  const [month, setMonth] = useState(addMonth);
  const [CPmonth, setCPMonth] = useState(CPaddMonth);
  const [year, setyear] = useState(currentyear);

  const [HierarchyID, setHierarchyID] = useState();
  const [isActive, setActive] = useState(false);
  const [isActive1, setActive1] = useState(false);
  const [finalhierarchy, setFinalHierarchy] = useState();
  const [selected, setSelected] = useState("");
  const [selectedvalue, setSelectedValue] = useState("");
  const [selected1, setSelected1] = useState("");
  const [users, setUsers] = useState("");
  const [selectedvalue1, setSelectedValue1] = useState("");
  const [CurentOrPast, setCurentOrPast] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentpastdata, setCurrentPastData] = useState();
  const [currentpastdataln, setCurrentPastDataLn] = useState();
  const [DataContainer, setDataContainer] = useState();
  const [loader, setLoader] = useState(false)

  const breakpoint = 620;
  const RemoveData = false;

  const _dataStore = useSelector((state) => state?.home?.user_tree);

  let { id } = stoageGetter("user");
  const login_user_data = stoageGetter("user");
  const agent_id = login_user_data.agentId;

  const currentpastapi = async () => {
    setLoader(true)
    if (HierarchyID != undefined) {
      setLoader(false)
      let data = await axiosRequest.get(`user/fetch_appointments?user_id=${id}&teamdata=1&filter=${thisMonth}/${year}&category=past`);
      setCurrentPastData(data.data);
      setCurrentPastDataLn(data?.data?.length)
      setDataContainer(data.data)
    } else {
      setLoader(false)
    }

    if (HierarchyID == undefined) {
      setLoader(false)
      let data = await axiosRequest.get(`user/fetch_appointments?user_id=${id}&teamdata=1&filter=${thisMonth}/${year}&category=past`);
      setCurrentPastData(data.data);
      setCurrentPastDataLn(data?.data?.length)
      setDataContainer(data.data)
    } else {
      setLoader(false)
    }
  };

  useEffect(() => {
    // if( (month == 1+new Date().getMonth() && year == new Date().getFullYear())){
    currentpastapi();
    //    }
    if (CPmonth.toString().length > 1) {
      setMonth(CPmonth);
    }
  }, [CPmonth, year, HierarchyID]);
  useEffect(() => {
    setLoader(true)
    try {
      let reportingHierarchies = _dataStore.reporting_hierarchies;
      let hiererchyusers = _dataStore.reporting_users;
      if (reportingHierarchies != undefined) {
        let all = [{ value: "All", dispValue: "All" }];
        let final = [...all, ...reportingHierarchies];
        setFinalHierarchy(final);
        setSelected(final[0].value);
        setSelectedValue(final[0].dispValue);
        setUsers(hiererchyusers);
        setSelected1();
        setLoader(false)
      } else {
        let all = [{ value: "All", dispValue: "All" }];
        let final = [...all];
        setFinalHierarchy(final);
        setSelected(final[0].value);
        setSelectedValue(final[0].dispValue);
        setUsers(hiererchyusers);
        setLoader(false)
      }
    } catch (err) {
      console.log("Err");
      setLoader(false)
    }
  }, []);

  const hierarchyOnchange = (element, i) => {
    setSelected(element);
    // setSelectedValue(element.dispValue)
    setActive(false);
    let filterdata = _dataStore.reporting_users.filter(
      (data, index, arr) => data.hierarchy_id == element
    );
    let all = [{ full_name: "Select", hierarchy_id: "Select" }];
    let final = [...all, ...filterdata];
    setUsers(final);
    setSelectedValue1("Select");
    setSelected1("Select");
    if (filterdata?.length <= 1) {
      setHierarchyID(filterdata[0]?._id);
    }
  };

  const userOnchange = (element) => {
    setSelected1(element);
    // setSelectedValue(element.dispValue)
    setActive1(false);
    if (users?.length > 1 || users == []) {
      setHierarchyID();
      if (element) {
        setHierarchyID(users[element]?._id);
      }
    }
  };

  const minimumDate = moment().format("MM-DD-YYYY");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  console.log({ fromDate })

  const fromDateFunc = (e) => setFromDate(moment(e).format("MM-DD-YYYY"));
  const toDateFunc = (e) => setToDate(moment(e).format("MM-DD-YYYY"));
  const disabledDateBeforeSpecificDate = (current) => {

    // Replace '08/28/2023' with your specific date in YYYY-MM-DD format
    if (fromDate) {
      return current && current < moment(fromDate, "MM-DD-YYYY");
    } else {
      return current && current < moment().startOf("day");
    }
  };

  const userIdfetched = stoageGetter("user").id;

  const exportTeamFunc = async () => {

    const fdate = convertToIndianTimezone(fromDate, false);
    const tdate = convertToIndianTimezone(toDate, true);

    if (fromDate == "") {
      message.warning("From Date is Mandatory");
    } else if (toDate == "") {
      message.warning("To Date is Mandatory");
    } else {
      let exportResult = await axiosRequest.get(
        `user/ExportEvents/${userIdfetched}?from_date=${fdate}&to_date=${tdate}`
      );
    }
  };

  return (
    <>
      <FullPageLoader spinloader={loader} />
      <div className="Team">

        {/* <div className="Team-Calender">
          {windowWidth > breakpoint && (
            <Row className="Team-Calender-row">
              <Col span={9}>
                <Typography>From Date</Typography>
                <DatePicker
                  inputReadOnly={true}
                  className="Team-Modal-picker-style"
                  onChange={fromDateFunc}
                />
              </Col>
              <Col span={9} offset={1}>
                <Typography>To Date</Typography>
                <DatePicker
                  inputReadOnly={true}
                  className="Team-Modal-picker-style"
                  onChange={toDateFunc}
                  disabledDate={disabledDateBeforeSpecificDate}
                />
              </Col>
              <Col span={2} offset={1} className="Team-Calender-Export">
                <Button onClick={exportTeamFunc}>
                  {" "}
                  <CloudUploadOutlined /> Export
                </Button>
              </Col>
            </Row>
          )}
          {windowWidth < breakpoint && (
            <div>
              <Row className="Team-Calender-row">
                <Col span={11} className="Team-Calender-first">
                  <Typography>From Date</Typography>
                  <DatePicker
                    inputReadOnly={true}
                    className="Team-Modal-picker-style"
                    onChange={fromDateFunc}
                  />
                </Col>
                <Col span={11} offset={1} className="Team-Calender-second">
                  <Typography>To Date</Typography>
                  <DatePicker
                    inputReadOnly={true}
                    className="Team-Modal-picker-style"
                    onChange={toDateFunc}
                    disabledDate={disabledDateBeforeSpecificDate}
                  />
                </Col>
              </Row>
              <Row className="Team-Calender-row">
                <Col span={3} offset={16} className="Team-Calender-Export">
                  <Button onClick={exportTeamFunc}>
                    {" "}
                    <CloudUploadOutlined /> Export
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </div> */}
        <hr />
        <div className="Team-Calender">
          {windowWidth > breakpoint && (
            <Row>
              {/* <Col md={9} lg={9} xl={9}>
                <Typography>Hierarchy</Typography>
                <div >
                  <Select
                    style={{ width: "96%" }}
                    className="Team-Modal-picker-style"
                    value={selected}
                    onChange={hierarchyOnchange}
                  >
                    {finalhierarchy?.map((element, index) => {
                      return (
                        <Option
                          inputReadOnly={true}
                          value={element.value}
                          key={index}
                        >
                          {element.dispValue}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </Col> */}
              <Col md={9} lg={9} xl={9} offset={1}>
                {selected != "All" && selected.length > 1 ? (
                  <div>
                    <Typography>Circle Manager</Typography>
                    <div >
                      <Select
                        style={{ width: "96%" }}
                        className="Team-Modal-picker-style"
                        value={selected1}
                        onChange={userOnchange}
                      >
                        {users?.map((element, index) => {
                          return (
                            <Option
                              inputReadOnly={true}
                              value={element.value}
                              key={index}
                            >
                              {element.full_name}
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                ) : null}
              </Col>
            </Row>
          )}
          {windowWidth < breakpoint && (
            <div>
              <Typography>Hierarchy</Typography>
              <div >
                <Select
                  className="Team-Width-Hierarchy"
                  value={selected}
                  onChange={hierarchyOnchange}
                >
                  {finalhierarchy?.map((element, index) => {
                    return (
                      <Option
                        inputReadOnly={true}
                        value={element.value}
                        key={index}
                      >
                        {element.dispValue}
                      </Option>
                    );
                  })}
                </Select>
              </div>

              {selected != "All" && selected.length > 1 ? (
                <div >
                  <Typography>Circle Manager</Typography>
                  <div >
                    <Select
                      className="Team-Width-Hierarchy"
                      value={selected1}
                      onChange={userOnchange}
                    >
                      {users?.map((element, index) => {
                        return (
                          <Option
                            inputReadOnly={true}
                            value={element.value}
                            key={index}
                          >
                            {element.full_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* <EventCreate monthData={setMonth} yearData={setyear} /> */}
        <div className="eventChange">
          {month == 1 + new Date().getMonth() &&
            year == new Date().getFullYear() ? (
            <HistoryTab
              Remove={RemoveData}
              CurentOrPast={setCurentOrPast}
              teamPast={currentpastdataln}
              teampastData={currentpastdata}
            />
          ) : (
            ""
          )}
        </div>
        <div className="upcoming">
          {month == 1 + new Date().getMonth() &&
            year == new Date().getFullYear() ? (
            <p>Upcoming Events</p>
          ) : (month >= 1 + new Date().getMonth() &&
            year >= new Date().getFullYear()) ||
            (month < 1 + new Date().getMonth() &&
              year > new Date().getFullYear()) ? (
            <p>Upcoming Events</p>
          ) : (
            <p>PAST</p>
          )}
        </div>

        <div className="Team-Information">
          <DataField
            TeamData={thisMonth + "/" + year}
            HierarchyID={HierarchyID}
            TeamHere={
              month == 1 + new Date().getMonth() &&
              year == new Date().getFullYear()
            }
            Dataupdate={DataContainer}
          />
        </div>
      </div>
    </>
  );
};

export default Team;
