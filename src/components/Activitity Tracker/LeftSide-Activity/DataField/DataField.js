import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { Typography } from "antd";
import { FormOutlined, MessageOutlined } from "@ant-design/icons";
import EventCreateButton from "../EventCreateButton/EventCreateButton";
import EventCreateComponent from "../../../Contests/CalendarEvent";
import axios from "axios";
import axiosRequest from "../../../../axios-request/request.methods";
import { checkAgent, stoageGetter } from "../../../../helpers";
import commentIcon from "../../icons/comment.png";
import "./DataField.css";
import { Col, Row } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CalendarMobile from "../../../Contests/CalendarMobile";
import FullPageLoader from "../../../FullPageLoader/FullPageLoader";

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

const DataField = ({ SelfMonthYear, HierarchyID, TeamData, TeamHere, getFunc, getdata, SelfHere, Dataupdate }) => {
  let history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleMOB, setIsModalVisibleMOB] = useState(false);
  const [loader, setLoader] = useState(false);

  const [editData, setEditData] = useState({});

  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 840;

  const showModal = (e) => {
    // if(windowWidth > breakpoint){

    // }else{
    //   setEditData(e)
    //   history.push({
    //     pathname: '/create-event-mobile',
    //     state: { detail: e , click : 'UPDATE EVENT'}
    // });
    // }
    setIsModalVisible(true);
    setEditData(e);
  };

  const [timeList, setTimeList] = useState([
    {
      dispValue: "8:00 AM",
      value: "28800000",
    },
    {
      dispValue: "8:30 AM",
      value: "30600000",
    },
    {
      dispValue: "9:00 AM",
      value: "32400000",
    },
    {
      dispValue: "9:30 AM",
      value: "34200000",
    },
    {
      dispValue: "10:00 AM",
      value: "36000000",
    },
    {
      dispValue: "10:30 AM",
      value: "37800000",
    },
    {
      dispValue: "11:00 AM",
      value: "39600000",
    },
    {
      dispValue: "11:30 AM",
      value: "41400000",
    },
    {
      dispValue: "12:00 PM",
      value: "43200000",
    },
    {
      dispValue: "12:30 PM",
      value: "45000000",
    },
    {
      dispValue: "1:00 PM",
      value: "46800000",
    },
    {
      dispValue: "1:30 PM",
      value: "48600000",
    },
    {
      dispValue: "2:00 PM",
      value: "50400000",
    },
    {
      dispValue: "2:30 PM",
      value: "52200000",
    },
    {
      dispValue: "3:00 PM",
      value: "54000000",
    },
    {
      dispValue: "3:30 PM",
      value: "55800000",
    },
    {
      dispValue: "4:00 PM",
      value: "57600000",
    },
    {
      dispValue: "4:30 PM",
      value: "59400000",
    },
    {
      dispValue: "5:00 PM",
      value: "61200000",
    },
    {
      dispValue: "5:30 PM",
      value: "63000000",
    },
    {
      dispValue: "6:00 PM",
      value: "64800000",
    },
    {
      dispValue: "6:30 PM",
      value: "66600000",
    },
    {
      dispValue: "7:00 PM",
      value: "68400000",
    },
    {
      dispValue: "7:30 PM",
      value: "70200000",
    },
    {
      dispValue: "8:00 PM",
      value: "72000000",
    },
    {
      dispValue: "8:30 PM",
      value: "73800000",
    },
    {
      dispValue: "9:00 PM",
      value: "75600000",
    },
    {
      dispValue: "9:30 PM",
      value: "77400000",
    },
  ]);
  const [DataContainer, setDataContainer] = useState();

  //const activities_data_store = useSelector((state) => state.activities.activities_obj);

  // const employee_code = useSelector((state) => state.login.hierarchy.channelCode.channelCode)
  // const hierarchy_name = useSelector((state) => state.login.hierarchy.channelCode.channelName)
  // const channel_ID = useSelector((state) => state.login.hierarchy.channelCode._id)

  let { id } = stoageGetter("user");
  const login_user_data = stoageGetter("user");

  let emp_code = login_user_data?.employeeCode;

  const agent_id = login_user_data?.agentId;

  const api = async (date) => {
    console.log("date Selected ===>");
    setLoader(true);
    if (SelfHere == "self") {
      setLoader(false);
      var dS = SelfMonthYear.split("/");
      var d1 = new Date(dS[1], +dS[0]);
      var today = new Date();
      if (d1 >= today) {
        setLoader(false);
        let result = await axiosRequest.get(`user/fetch_appointments?teamdata=0&filter=${SelfMonthYear}&category=upcoming`);
        setDataContainer(result.data);
      } else {
        setLoader(false);
        let result = await axiosRequest.get(`user/fetch_appointments?teamdata=0&filter=${SelfMonthYear}&category=past`);
        setDataContainer(result.data);
      }
    }

    if (TeamHere == true || TeamData != undefined) {
      setLoader(false);
      var dS = TeamData.split("/");
      var d1 = new Date(dS[1], +dS[0]);
      var today = new Date();
      if (HierarchyID != undefined) {
        setLoader(false);
        if (d1 >= today) {
          setLoader(false);
          let result = await axiosRequest.get(`user/fetch_appointments?user_id=${id}&teamdata=1&filter=${TeamData}&category=upcoming`);
          setDataContainer(result.data);
        } else {
          setLoader(false);
          let result = await axiosRequest.get(`user/fetch_appointments?user_id=${id}&teamdata=1&filter=${TeamData}&category==past`);
          setDataContainer(result.data);
        }
      }
      if (HierarchyID == undefined) {
        setLoader(false);
        if (d1 >= today) {
          setLoader(false);
          let result = await axiosRequest.get(`user/fetch_appointments?user_id=${id}&teamdata=0&filter=${TeamData}&category=upcoming`);
          setDataContainer(result.data);
        } else {
          setLoader(false);
          let result = await axiosRequest.get(`user/fetch_appointments?user_id=${id}&teamdata=0&filter=${TeamData}&category=past`);
          setDataContainer(result.data);
        }
      }
    }
  };

  useEffect(() => {
    api();
    if (Dataupdate != undefined && Dataupdate.length != 0) {
      setDataContainer(Dataupdate);
    }
  }, [SelfMonthYear, TeamData, getdata, isModalVisible, Dataupdate, HierarchyID]);

  const dateFun = (time) => {
    let finalTimeobj = timeList.filter((item) => {
      return item.value == time;
    });
    if (finalTimeobj.length > 0) {
      let finalTime = finalTimeobj[0].dispValue;
      return finalTime;
    } else {
      return "";
    }
  };

  return (
    <>
      <FullPageLoader spinloader={loader} />
      <div className="dataField">
        {windowWidth > breakpoint && DataContainer?.length > 0 ? (
          DataContainer?.map((element, index) => {
            {
              /* DESKTOP VERSION */
            }

            return (
              <div className="dataField-Card" key={index}>
                <div className="dataContainer">
                  <div className="AppointmentWith">
                    <Typography>
                      {/* {element.appointment_type} */}
                      {element.followup_1 == true && element.is_main_Event == false ? " : Follow Up 1" : element.followup_2 == true && element.is_main_Event == false ? " : Follow Up 2" : ""}
                    </Typography>
                  </div>
                  <div className="bodyData">
                    <div className="bodyData-Date">
                      <p>
                        {new Date(element.start_time_MS).getDate() == 1 || new Date(element.start_time_MS).getDate() == 21 || new Date(element.start_time_MS).getDate() == 31
                          ? new Date(element.start_time_MS).getDate() + "st"
                          : new Date(element.start_time_MS).getDate() == 2 || new Date(element.start_time_MS).getDate() == 22
                          ? new Date(element.start_time_MS).getDate() + "nd"
                          : new Date(element.start_time_MS).getDate() == 3 || new Date(element.start_time_MS).getDate() == 23
                          ? new Date(element.start_time_MS).getDate() + "rd"
                          : new Date(element.start_time_MS).getDate() + "th"}
                        <span><br/>{[{ 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }][0][1 + new Date(element.start_time_MS).getMonth()]}</span>
                      </p>
                      <p>
                        {
                          [
                            {
                              1: "Sunday",
                              2: "Monday",
                              3: "Tuesday",
                              4: "Wednesday",
                              5: "Thursday",
                              6: "Friday",
                              7: "Saturday",
                            },
                          ][0][1 + new Date(element.start_time_MS).getDay()]
                        }
                      </p>
                    </div>

                    <div className="TimeToEnd" style={{ fontWeight: "bold" }}>
                      {element.durationType == "allday" ? (
                        <Typography className="dataField-Card-allday">All day</Typography>
                      ) : (
                        <>
                          <Typography>{dateFun(element.start_time)}</Typography>
                          <Typography style={{ padding: "0" }}>To</Typography>
                          <Typography>{dateFun(element.end_time)}</Typography>
                        </>
                      )}
                      <div className="bodyData-side2">
                        <Typography
                          className={`closeOpen ${element.statusType == "open" ? "Open" : element.statusType == "closed" ? "Close" : element.statusType == "cancelled" ? "Cancel" : ""}
                                    `}
                        >
                          {element.statusType}
                        </Typography>
                      </div>
                    </div>
                    <div className="bodyData-centerContent">
                      <div className="Event-CenterBody">
                        <div className="Event-Type-Name">
                          <div className="EventType">
                            <Typography>Event Type</Typography>
                            <Typography>{element.event_type}</Typography>
                          </div>
                          <div className="EventType">
                            <Typography>Event With</Typography>
                            <Typography>{element.appointment_type}</Typography>
                          </div>
                          <div className="EventType">
                            {element.leadId !== undefined && element.leadId !== null ? (
                              <>
                                <Typography>Event Description</Typography>
                                <Typography className="Capitalize_First_Letter">
                                  {element.event_name} with {element.leadId.firstName} {element.leadId.lastName}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography>{element.appointment_type == "Worksite" ? "Unit Name" : "Event Name"}</Typography>
                                <Typography className="Capitalize_First_Letter">{element.eventHeldUnitName == "" ? "-" : element.eventHeldUnitName}</Typography>
                              </>
                            )}
                          </div>
                          {element.is_main_Event == false && element.leadId == null ? (
                            <div className="EventType">
                              <Typography>Main Event Date</Typography>
                              <Typography>
                                {new Date(element.mainEventID.start_time_MS).getDate() == 1 || new Date(element.mainEventID.start_time_MS).getDate() == 21 || new Date(element.mainEventID.start_time_MS).getDate() == 31
                                  ? new Date(element.mainEventID.start_time_MS).getDate() + "st"
                                  : new Date(element.mainEventID.start_time_MS).getDate() == 2 || new Date(element.mainEventID.start_time_MS).getDate() == 22
                                  ? new Date(element.mainEventID.start_time_MS).getDate() + "nd"
                                  : new Date(element.mainEventID.start_time_MS).getDate() == 3 || new Date(element.mainEventID.start_time_MS).getDate() == 23
                                  ? new Date(element.mainEventID.start_time_MS).getDate() + "rd"
                                  : new Date(element.mainEventID.start_time_MS).getDate() + "th"}
                                <span>
                                  &nbsp;
                                  {[{ 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }][0][1 + new Date(element.start_date).getMonth()]}
                                  &nbsp;
                                </span>
                                <span>{new Date(element.start_date).getFullYear()}</span>
                              </Typography>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                      <div className="footer">
                        {element.remarkHistory?.length > 0 ? (
                          <Typography>
                            {
                              // element.remarkHistory.map((element, index)=>{
                              // return (
                              <div className="footerRemark" key={index}>
                                {/* <b>Remark</b> */}
                                <span className="remark-font">Remark : </span>
                                <span style={{ fontSize: "13px" }}>{element.statusReason}</span>
                              </div>
                              // )
                              // })
                            }
                          </Typography>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="bodyData-side">
                      {element.statusType == "cancelled" ? (
                        <></>
                      ) : TeamHere == true ? (
                        <></>
                      ) : emp_code === element?.userId?.employeeCode ? (
                        <FormOutlined onClick={() => showModal(element)} />
                      ) : (
                        <>
                          {" "}
                          <Typography style={{ width: "85px" }} className="Invited-Red">
                            Invited
                          </Typography>
                          {element?.userId?.first_name ? (
                            <Typography style={{ width: "100px" }} className="Invited-Body">
                              by {element?.userId?.first_name} {element?.userId?.last_name}
                            </Typography>
                          ) : (
                            ""
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : windowWidth < breakpoint && DataContainer?.length > 0 ? (
          DataContainer?.map((element, index) => {
            {
              /* MOBILE VERSION */
            }

            return (
              <div className="dataField-Card-mbl" key={index}>
                <Row>
                  <Col sm={20} xs={20} md={20}>
                    <div className="TimeToEnd-mbl">
                      <Row style={windowWidth > 300 && windowWidth < 600 ? { display: "flex", justifyContent: "space-between" } : {}}>
                        {element.durationType == "allday" ? (
                          <Typography className="dataField-Card-allday-mbl">All day</Typography>
                        ) : (
                          <>
                            <div className="TimeToEnd-mbl-date">
                              <Typography>{dateFun(element.start_time)}</Typography>
                              <Typography style={{ padding: "0 5px" }}>To</Typography>
                              <Typography>{dateFun(element.end_time)}</Typography>
                            </div>
                          </>
                        )}
                      </Row>
                    </div>
                    <div className="AppointmentWith">
                      <Typography>
                        {/* {element.appointment_type} */}
                        {element.followup_1 == true && element.is_main_Event == false ? " : Follow Up 1" : element.followup_2 == true && element.is_main_Event == false ? " : Follow Up 2" : ""}
                      </Typography>
                    </div>
                  </Col>
                  <Col sm={4} xs={4} md={4}>
                    {element.statusType == "cancelled" ? (
                      <></>
                    ) : TeamHere == true ? (
                      <></>
                    ) : emp_code === element?.userId?.employeeCode ? (
                      <FormOutlined onClick={() => showModal(element)} />
                    ) : (
                      <span className="Invited-ForWidth">
                        {" "}
                        <Typography style={{ width: "85px" }} className="Invited-Red">
                          Invited
                        </Typography>
                        {element?.userId?.first_name ? (
                          <Typography style={{ width: "100px", fontSize: "12px !important" }} className="Invited-Body">
                            by {element?.userId?.first_name} {element?.userId?.last_name}
                          </Typography>
                        ) : (
                          ""
                        )}
                      </span>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col sm={9} xs={9} md={9}>
                    <div className="bodyData-Date" style={{ paddingTop: 15, paddingBottom: 15 }}>
                      <p>
                        {new Date(element.start_time_MS).getDate() == 1 || new Date(element.start_time_MS).getDate() == 21 || new Date(element.start_time_MS).getDate() == 31
                          ? new Date(element.start_time_MS).getDate() + "st"
                          : new Date(element.start_time_MS).getDate() == 2 || new Date(element.start_time_MS).getDate() == 22
                          ? new Date(element.start_time_MS).getDate() + "nd"
                          : new Date(element.start_time_MS).getDate() == 3 || new Date(element.start_time_MS).getDate() == 23
                          ? new Date(element.start_time_MS).getDate() + "rd"
                          : new Date(element.start_time_MS).getDate() + "th"}
                        <span>{[{ 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }][0][1 + new Date(element.start_time_MS).getMonth()]}</span>
                      </p>
                      <p>
                        {
                          [
                            {
                              1: "Sun",
                              2: "Mon",
                              3: "Tue",
                              4: "Wed",
                              5: "Thu",
                              6: "Fri",
                              7: "Sat",
                            },
                          ][0][1 + new Date(element.start_time_MS).getDay()]
                        }
                      </p>
                    </div>
                  </Col>
                  <Col sm={15} xs={15} md={15}>
                    <Row>
                      <Col sm={15} xs={15} md={15}>
                        <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>Event Type</Typography>
                        <Typography style={{ fontSize: "12px", color: "rgb(150, 153, 153)" }}>{element.event_type}</Typography>

                        <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>Event With</Typography>
                        <Typography style={{ fontSize: "12px", color: "rgb(150, 153, 153)" }}>{element.appointment_type}</Typography>
                      </Col>
                      <Col sm={9} xs={9} md={9}>
                        <div className="bodyData-side">
                          <Typography
                            style={{ fontSize: 12, fontWeight: "bold" }}
                            className={`closeOpen ${element.statusType == "open" ? "Open" : element.statusType == "closed" ? "Close" : element.statusType == "cancelled" ? "Cancel" : ""}
                                    `}
                          >
                            {element.statusType}
                          </Typography>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={22} xs={22} md={22}>
                        {element.leadId !== undefined && element.leadId !== null ? (
                          <>
                            <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>Event Description</Typography>
                            <Typography className="Capitalize_First_Letter" style={{ color: "rgb(150, 153, 153)", fontSize: "12px" }}>
                              {element.event_name} with {element.leadId.firstName} {element.leadId.lastName}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>{element.appointment_type == "Worksite" ? "Unit Name" : "Event Name"}</Typography>
                            <Typography className="Capitalize_First_Letter" style={{ color: "rgb(150, 153, 153)", fontSize: "12px" }}>
                              {element.eventHeldUnitName == "" ? "-" : element.eventHeldUnitName}
                            </Typography>
                            {element.is_main_Event == false && element.leadId == null ? (
                              <>
                                <Typography style={{ fontSize: "12px", fontWeight: "bold" }}>Main Event Date</Typography>
                                <Typography style={{ fontSize: "12px", color: "rgb(150, 153, 153)" }}>
                                  {new Date(element.mainEventID.start_time_MS).getDate() == 1 || new Date(element.mainEventID.start_time_MS).getDate() == 21 || new Date(element.mainEventID.start_time_MS).getDate() == 31
                                    ? new Date(element.mainEventID.start_time_MS).getDate() + "st"
                                    : new Date(element.mainEventID.start_time_MS).getDate() == 2 || new Date(element.mainEventID.start_time_MS).getDate() == 22
                                    ? new Date(element.mainEventID.start_time_MS).getDate() + "nd"
                                    : new Date(element.mainEventID.start_time_MS).getDate() == 3 || new Date(element.mainEventID.start_time_MS).getDate() == 23
                                    ? new Date(element.mainEventID.start_time_MS).getDate() + "rd"
                                    : new Date(element.mainEventID.start_time_MS).getDate() + "th"}
                                  <span>
                                    &nbsp;
                                    {[{ 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec" }][0][1 + new Date(element.start_date).getMonth()]}
                                    &nbsp;
                                  </span>
                                  <span>{new Date(element.start_date).getFullYear()}</span>
                                </Typography>
                              </>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <div className="footer">
                    {element.remarkHistory?.length > 0 ? (
                      <Typography>
                        {
                          // element.remarkHistory.map((element,index)=>{
                          // return (
                          <div className="footerRemark" key={index}>
                            {/* <b>Remark</b> */}
                            <span className="remark-font">Remark : </span>
                            <span style={{ fontSize: "13px" }}>{element.statusReason}</span>
                          </div>
                          // )
                          // })
                        }
                      </Typography>
                    ) : (
                      ""
                    )}
                  </div>
                </Row>
                {/* <hr style={{marginTop : 10, marginBottom : 10}}/> */}
              </div>
            );
          })
        ) : (
          <EventCreateButton api={"getFunc"} />
        )}

        {isModalVisible == true ? <EventCreateComponent click={"UPDATE EVENT"} Data={editData} api={getFunc} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> : ""}
        {isModalVisibleMOB == true ? <CalendarMobile click={"UPDATE EVENT"} Data={editData} api={getFunc} isModalVisibleMOB={isModalVisibleMOB} setIsModalVisibleMOB={setIsModalVisibleMOB} /> : ""}
      </div>
    </>
  );
};

export default DataField;
