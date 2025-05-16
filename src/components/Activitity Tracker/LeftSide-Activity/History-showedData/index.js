import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import "./index.css";
import commentIcon from "../../icons/comment.png";
import EventCreateButton from "../EventCreateButton/EventCreateButton";
import EventCreateComponent from "../../../Contests/CalendarEvent";
import "../DataField/DataField.css";
import { Col, Row } from "antd";
import { FormOutlined, MessageOutlined } from "@ant-design/icons";
import { checkAgent, stoageGetter } from "../../../../helpers";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AiFillInfoCircle } from "react-icons/ai";

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

let { id } = stoageGetter("user");
const login_user_data = stoageGetter("user");

let emp_code = login_user_data?.employeeCode;

const Index = ({ Remove, CurentOrPast, pastData, teamPast, pastDataln, teampastData, getFunc }) => {
  const history = useHistory();
  const [Self, setSelf] = useState(true);
  const [Teamdata, setTeamData] = useState(true);
  const [Team, setTeam] = useState(true);
  CurentOrPast(Self);

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

  // const employee_code = useSelector((state) => state.login.hierarchy.channelCode.channelCode)
  // const channel_ID = useSelector((state) => state.login.hierarchy[0].channelCode._id)

  const [isModalVisible, setIsModalVisible] = useState(false);
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

  useEffect(() => {
    if (Remove == false) {
      setTeam(false);
    }
  }, [Remove]);

  const dateFun = (time) => {
    let finalTimeobj = timeList.filter((item) => {
      return item.value == time;
    });
    let finalTime = finalTimeobj[0]?.dispValue;
    return finalTime;
  };

  const historyEvent = "All past events for the month";
  return (
    <div>
      <div className="PastFuture">
        {Self ? (
          <div className="pastEvent">
            <AiFillInfoCircle style={{ fontSize: "20px" }} />
            <span style={{ paddingLeft: "5px" }}>
              {pastData?.length == 0 ? "0" : teampastData?.length == 0 ? "0" : pastDataln ? pastDataln : teamPast}
              <span className="pastEventChange">Events From Past</span>
            </span>
          </div>
        ) : (
          <Typography>{historyEvent}</Typography>
        )}

        <div className="pastEvent">
          {pastData?.length == 0 || teampastData?.length == 0 ? (
            ""
          ) : Team ? (
            Self ? (
              
              <span
                className="pastEventChange"
                style={{ fontSize: "14px", marginRight: "7px", marginTop: 5, cursor: "pointer" }}
                onClick={(e) => {
                  setSelf(false);
                }}
              >
                SHOW
              </span>
            ) : (
              <span
                className="pastEventChange"
                style={{ fontSize: "14px", marginRight: "7px", marginTop: 5, cursor: "pointer" }}
                onClick={(e) => {
                  setSelf(true);
                }}
              >
                HIDE
              </span>
            )
          ) : (
            ""
          )}
        </div>

        <div className="pastEvent">
          {pastData?.length == 0 || teampastData?.length == 0 ? (
            ""
          ) : Team == false ? (
            Teamdata ? (
              <span
                className="pastEventChange"
                style={{ fontSize: "14px", marginRight: "7px", marginTop: 5, cursor: "pointer" }}
                onClick={(e) => {
                  setSelf(false);
                }}
              >
                SHOW
              </span>
            ) : (
              <span
                className="pastEventChange"
                style={{ fontSize: "14px", marginRight: "7px", marginTop: 5, cursor: "pointer" }}
                onClick={(e) => {
                  setSelf(true);
                }}
              >
                HIDE
              </span>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        {Self == false ? (
          <div className="dataField">
            {windowWidth > breakpoint && pastData?.length > 0 ? (
              pastData?.map((element, index) => {
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
                        <div className="bodyData-Date pastEventsDates">
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
                                    <b>Remark</b>
                                    <span>{element.statusReason}</span>
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
                      </div>
                    </div>
                  </div>
                );
              })
            ) : windowWidth < breakpoint && pastData?.length > 0 ? (
              pastData?.map((element, index) => {
                {
                  /* MOBILE VERSION */
                }

                return (
                  <div className="dataField-Card-mbl" key={index}>
                    <Row>
                      <Col sm={22} xs={22} md={22}>
                        <div className="TimeToEnd-mbl">
                          <Row>
                            {element.durationType == "allday" ? (
                              <Typography className="dataField-Card-allday-mbl">All day</Typography>
                            ) : (
                              <>
                                <Typography>{dateFun(element.start_time)}</Typography>
                                <Typography style={{ padding: "0 5px" }}>To</Typography>
                                <Typography>{dateFun(element.end_time)}</Typography>
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
                      <Col sm={2} xs={2} md={2}>
                        {element.statusType == "cancelled" ? (
                          <></>
                        ) : emp_code === element?.userId?.employeeCode ? (
                          <FormOutlined onClick={() => showModal(element)} />
                        ) : (
                          <span className="Invited-ForWidth">
                            {" "}
                            <Typography className="Invited-Red">Invited</Typography>
                            {element?.userId?.first_name ? (
                              <Typography className="Invited-Body">
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
                      <Col sm={7} xs={7} md={7}>
                        <div className="bodyData-Date pastEventsDates" style={{ paddingTop: 15, paddingBottom: 15 }}>
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
                      <Col sm={17} xs={17} md={17}>
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
                              // element.remarkHistory.map((element, index)=>{
                              // return (
                              <div className="footerRemark" key={index}>
                                <b>Remark</b>
                                <span>{element.statusReason}</span>
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
          </div>
        ) : (
          ""
        )}

        {Teamdata == false ? (
          <div className="dataField">
            {windowWidth > breakpoint && teampastData?.length > 0 ? (
              teampastData?.map((element, index) => {
                {
                  /* DESKTOP VERSION */
                }

                return (
                  <div className="dataField-Card" key={index}>
                    <div className="dataContainer dataField-Card">
                      <div className="AppointmentWith">
                        <Typography>
                          {/* {element.appointment_type} */}
                          {element.followup_1 == true && element.is_main_Event == false ? " : Follow Up 1" : element.followup_2 == true && element.is_main_Event == false ? " : Follow Up 2" : ""}
                        </Typography>
                      </div>
                      <div className="bodyData">
                        <div className="bodyData-Date pastEventsDates">
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
                                    <b>Remark</b>
                                    <span>{element.statusReason}</span>
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
                      </div>
                    </div>
                  </div>
                );
              })
            ) : windowWidth < breakpoint && teampastData?.length > 0 ? (
              teampastData?.map((element, index) => {
                {
                  /* MOBILE VERSION */
                }

                return (
                  <div className="dataField-Card-mbl" key={index}>
                    <Row>
                      <Col span={22}>
                        <div className="TimeToEnd-mbl">
                          {element.durationType === "allday" ? (
                            <Typography className="dataField-Card-allday-mbl">All day</Typography>
                          ) : (
                            <div className="d-flex flex-column">
                              <Typography>{dateFun(element.start_time)}</Typography>
                              <Typography>To</Typography>
                              <Typography>{dateFun(element.end_time)}</Typography>
                            </div>
                          )}
                        </div>
                        <div className="AppointmentWith">
                          <Typography>{element.followup_1 && !element.is_main_Event ? ": Follow Up 1" : element.followup_2 && !element.is_main_Event ? ": Follow Up 2" : ""}</Typography>
                        </div>
                      </Col>
                      <Col span={2} className="text-right">
                        {element.statusType !== "cancelled" &&
                          (emp_code === element?.userId?.employeeCode ? (
                            <FormOutlined onClick={() => showModal(element)} />
                          ) : (
                            <div className="Invited-ForWidth">
                              <Typography className="Invited-Red">Invited</Typography>
                              {element?.userId?.first_name && (
                                <Typography className="Invited-Body">
                                  by {element?.userId?.first_name} {element?.userId?.last_name}
                                </Typography>
                              )}
                            </div>
                          ))}
                      </Col>
                    </Row>

                    <Row gutter={[16, 16]}>
                      <Col span={7} className="bodyData-Date pastEventsDates" style={{ padding: "15px 0" }}>
                        <p>
                          {new Date(element.start_time_MS).getDate()}
                          {["st", "nd", "rd"][((((new Date(element.start_time_MS).getDate() + 90) % 100) - 10) % 10) - 1] || "th"}
                          <span>
                            &nbsp;
                            {new Date(element.start_time_MS).toLocaleString("en-US", { month: "short" })}
                          </span>
                        </p>
                        <p>{new Date(element.start_time_MS).toLocaleString("en-US", { weekday: "short" })}</p>
                      </Col>
                      <Col span={17}>
                        <Row>
                          <Col span={17}>
                            <Typography className="font-bold">Event Type</Typography>
                            <Typography className="text-muted">{element.event_type}</Typography>
                            <Typography className="font-bold">Event With</Typography>
                            <Typography className="text-muted">{element.appointment_type}</Typography>
                          </Col>
                          <Col span={7} className="bodyData-side">
                            <Typography className={`closeOpen ${element.statusType === "open" ? "Open" : element.statusType === "closed" ? "Close" : element.statusType === "cancelled" ? "Cancel" : ""}`}>{element.statusType}</Typography>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={22}>
                            {element.leadId ? (
                              <>
                                <Typography className="font-bold">Event Description</Typography>
                                <Typography className="Capitalize_First_Letter text-muted">
                                  {element.event_name} with {element.leadId.firstName} {element.leadId.lastName}
                                </Typography>
                              </>
                            ) : (
                              <>
                                <Typography className="font-bold">{element.appointment_type === "Worksite" ? "Unit Name" : "Event Name"}</Typography>
                                <Typography className="Capitalize_First_Letter text-muted">{element.eventHeldUnitName || "-"}</Typography>
                              </>
                            )}
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    {element.remarkHistory?.length > 0 && (
                      <Row>
                        <Col span={24}>
                          <div className="footerRemark">
                            <Typography>
                              <b>Remark:</b> {element.statusReason}
                            </Typography>
                          </div>
                        </Col>
                      </Row>
                    )}
                  </div>
                );
              })
            ) : (
              <EventCreateButton api={"getFunc"} />
            )}
            {isModalVisible == true ? <EventCreateComponent click={"UPDATE EVENT"} Data={editData} api={getFunc} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} /> : ""}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Index;
