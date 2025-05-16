import { Typography } from "antd";
import React, { useState, useEffect, useRef } from "react";
import "./ActivityTracker.css";
import next from "../../../images/Icon/next.png";
import prev from "../../../images/Icon/pre.png";
import calender from "../../../images/Icon/image@2x.png";
import calender1 from "../../../images/Icon/tracker_img.png";
import { LoadingOutlined,WarningOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { checkAgent, checkuserAccess, stoageGetter } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axiosRequest from "../../../axios-request/request.methods";
import EventCreateComponent from "../../Contests/CalendarEvent";
import { message } from "antd";

import {
  PlusSquareOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { HEADER_NAME } from "../../../store/actions/actionTypes";

const ActivityTracker = ({ monthData, yearData, getFunc, getdata }) => {
  const todayDate = moment().format("ddd MMM DD YYYY");
  let { id } = stoageGetter("user");
  const [dates, setDates] = useState([])

  const history = useHistory();
  const [DataContainer, setDataContainer] = useState();
  const _month = moment().format("MM");
  const [month, setMonth] = useState(_month);
  const [selectedCurrDate, setSelectedCurrDate] = useState(null);



  const [year, setYear] = useState(new Date().getFullYear());
  const [openloader, setopenloader] = useState(false);
  // const MonthContainer = [
  //   {
  //     "01": "Jan",
  //     "02": "Feb",
  //     "03": "Mar",
  //     "04": "Apr",
  //     "05": "May",
  //     "06": "Jun",
  //     "07": "Jul",
  //     "08": "Aug",
  //     "09": "Sep",
  //     "10": "Oct",
  //     "11": "Nov",
  //     "12": "Dec",
  //   },
  // ];
  const [currentM, setCurrentM] = useState(new Date().getMonth());

  function getMonthName(monthId) {
    const months = [
      'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
      'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
    ];

    if (monthId >= 0 && monthId < months.length) {
      return months[monthId];
    } else {
      return 'Invalid Month ID';
    }
  }


  const eventClickBtnDec = async () => {
    if (new Date().getFullYear() === year && new Date().getMonth() === currentM - 1) {
      setActiveDate(new Date().getDate())

    } else {
      setActiveDate(1);
    }
    setSelectedCurrDate(null)
    let num = Number(month) - 1;
    if (month == "011" || month == "012") {
      let newMonth = num;
      setMonth(newMonth);
    } else {
      let newMonth = "0" + num;
      setMonth(newMonth);
    }
    let currentYear = year
    if (month <= 1) {
      setMonth(12);
      setYear(year - 1);
      currentYear--
    }
    function addOneAndWrap(num) {
      // Increment the number by 1
      num = +num - 1;

      // Wrap around if the number is greater than or equal to 12
      if (num > 12) {
        num = 1;
      }

      // Pad single-digit numbers with leading zero
      return num.toString().padStart(2, "0");
    }
    let vale = addOneAndWrap(month);
    if (currentM === 0) {
      getCurrentMonthDates(11, currentYear);
      setCurrentM(11)
    } else {
      getCurrentMonthDates(currentM - 1, currentYear);
      setCurrentM(currentM - 1)
    }

    let newData = "01" + "/" + vale + "/" + year;
    let result = await axiosRequest.get(
      `user/fetch_appointments?teamdata=0&filter=${newData}&isDayFilter=true&category=past`
    );
    setDataContainer(result);
  };
  const eventClickBtnInc = async (e, data) => {

    if (new Date().getFullYear() === year && new Date().getMonth() === currentM + 1) {
      setActiveDate(new Date().getDate())

    } else {
      setActiveDate(1);
    }
    setSelectedCurrDate(null)
    // setCurrentM(10);
    let num = Number(month) + 1;
    if (month == "09" || month == "010" || month == "011") {
      let newMonth = num;
      setMonth(newMonth);
    } else {
      let newMonth = "0" + num;
      setMonth(newMonth);
    }
    let currentYear = year
    if (month > 11) {
      setMonth("0" + 1);
      setYear(year + 1);
      currentYear++
    }
    function addOneAndWrap(num) {
      // Increment the number by 1
      num = +num + 1;

      // Wrap around if the number is greater than or equal to 12
      if (num > 12) {
        num = 1;
      }

      // Pad single-digit numbers with leading zero
      return num.toString().padStart(2, "0");
    }
    let vale = addOneAndWrap(month);

    if (currentM < 11) {
      getCurrentMonthDates(currentM + 1, currentYear);
      setCurrentM(currentM + 1)
    } else {
      getCurrentMonthDates(0, currentYear);
      setCurrentM(0)
    }
    let newData = "01" + "/" + vale + "/" + year;
    let result = await axiosRequest.get(
      `user/fetch_appointments?teamdata=0&filter=${newData}&isDayFilter=true&category=upcoming`
    );

    setDataContainer(result);
  };
  const _date = new Date();
  let currentyear = _date.getFullYear();

  let filterDate = month + "/" + year;
  var dS = filterDate.split("/");
  var d1 = new Date(dS[1], +dS[0]);
  var today = new Date().setHours(0, 0, 0, 0)

  let currentMonth = _date.getMonth() + 1;

  // monthData(month);
  // yearData(year);
  const api = async () => {

    dateClick(new Date());
    // if (d1 >= today) {
    //   let result = await axiosRequest.get(
    //     `user/fetch_appointments?teamdata=0&filter=${filterDate}&category=upcoming`
    //   );
    //   setDataContainer(result);
    // } else {
    //   let result = await axiosRequest.get(
    //     `user/fetch_appointments?teamdata=0&filter=${filterDate}&category=past`
    //   );
    //   setDataContainer(result);
    // }
  };

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color: "#FFFFFF",
        fontWeight: 700,
      }}
      spin
    />
  );

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
  let _storeData = useSelector((state) => state);

  // console.log("_storeData---", _storeData);

  const _accessActivityTracker = checkuserAccess("myEvents", _storeData.login); //Activity Tracker
  // show models

  const [showActivityTracker, setShowActivityTracker] = useState(
    _accessActivityTracker?.props?.read === true ? true : false
  );


  const [windowWidth, setWidth] = useState(window.innerWidth);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const breakpoint = 840;
  const currentDateRef = useRef(null);
  const createEvnetPage = () => {
    if (showActivityTracker) {
      // if (windowWidth > breakpoint) {
      //   setIsModalVisible(true);
      // } else {
      //   history.push("/create-event-mobile");
      // }
      setIsModalVisible(true);
    } else {
      message.info("This feature is currently not accessible");
    }
  };
  const scrollToCurrentDate = async () => {

    // console.log("hey", currentDateRef.current)
    if (currentDateRef.current) {

      currentDateRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  };
  // useEffect(() => {
  //   api();
  //   getCurrentMonthDates(currentM)
  //   currentDateRef.current.scrollIntoView({
  //     behavior: "smooth",
  //     block: "nearest",
  //   });
  // }, []);
  useEffect(() => {
    api();
    // Call getCurrentMonthDates here with the currentM value
    getCurrentMonthDates(currentM);

    // Scroll into view logic here
    // if (currentDateRef.current) {
    //   currentDateRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'nearest',
    //   });
    // }
    scrollToCurrentDate()
  }, []);

  const activityTracHome = () => {
    history.push("/calendar");
  };
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

  const getCurrentMonthDates = (selectedMonth, selectedYear) => {
    const currentYear = selectedYear ? selectedYear : new Date().getFullYear();

    let currentMonthIndex = null
    if (selectedMonth !== 0) {
      currentMonthIndex = selectedMonth ? selectedMonth : new Date().getMonth();
    } else {
      currentMonthIndex = selectedMonth
    }

    const firstDayOfMonth = new Date(currentYear, currentMonthIndex, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonthIndex + 1, 0);

    const newDates = [];
    for (
      let date = firstDayOfMonth;
      date <= lastDayOfMonth;
      date.setDate(date.getDate() + 1)
    ) {
      newDates.push(new Date(date));
    }

    setDates(newDates);
  };




  function formatDate(date) {
    const options = { weekday: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const [activeDate, setActiveDate] = useState(new Date());

  const dateClick = async (date) => {
    // console.log("date", date)
    setSelectedCurrDate(date?.getDate())
    setActiveDate(null)
    setopenloader(true);
    const formattedDate = date.getDate().toString().padStart(2, "0");
    let newDate = formattedDate + "/" + filterDate;
    if (date >= today) {
      let result = await axiosRequest.get(
        `user/fetch_appointments?teamdata=0&filter=${newDate}&isDayFilter=true&category=upcoming`
      );
      if (result?.statusCode === -1) {
        setDataContainer(result);
        setopenloader(false);
      } else {
        setopenloader(false);
        setDataContainer(result);
      }
    } else {
      let result = await axiosRequest.get(
        `user/fetch_appointments?teamdata=0&filter=${newDate}&isDayFilter=true&category=past`
      );
      if (result?.statusCode === -1) {
        setDataContainer(result);
        setopenloader(false);
      } else {
        setDataContainer(result);
        setopenloader(false);
      }
    }
    let dateforScroll = date.setHours(0, 0, 0, 0)
    if (dateforScroll == today) {

      scrollToCurrentDate()
    }
  };

  const myFunction = async () => {

    dateClick(new Date());
    // if (d1 >= today) {
    //   let result = await axiosRequest.get(
    //     `user/fetch_appointments?teamdata=0&filter=${filterDate}&category=upcoming`
    //   );
    //   setDataContainer(result);
    // } else {
    //   let result = await axiosRequest.get(
    //     `user/fetch_appointments?teamdata=0&filter=${filterDate}&category=past`
    //   );
    //   setDataContainer(result);
    // }
  };
  // const createEvnetPage = () => {
  //   setIsModalVisible(true)
  //   history.push("/calendar");
  // };
  // this is store

  const restoreMonthData = async () => {
    if (d1 >= today) {
      let result = await axiosRequest.get(
        `user/fetch_appointments?teamdata=0&filter=${filterDate}&category=upcoming`
      );
      setDataContainer(result);
    } else {
      let result = await axiosRequest.get(
        `user/fetch_appointments?teamdata=0&filter=${filterDate}&category=past`
      );
      setDataContainer(result);
    }
  };
  let activities_data_store = useSelector(
    (state) => state?.activities?.activities_obj?.data
  );
  const IconButton = ({ icon, backgroundColor }) => {
    return (
      <div style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {icon}
      </div>
    );
  };


  return (
    <>
      <div className="activity-tracker">
        <div className="activity-tracker1">
          <div className="plusIcon">
            <div className="widget_header">Activity Tracker </div>
            <div>
              {" "}
              <Button
                style={{
                  backgroundColor: "#00AEC1",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={createEvnetPage}
              >
                <span style={{ color: "white" }}>Create an Event</span>{" "}
                <PlusSquareOutlined style={{ color: "white", fontSize: 26 }} />
              </Button>
            </div>
          </div>

          <div
            className="calendar-nav"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Button
              style={{ backgroundColor: "#00AEC1", border: "none" }}
              icon={<LeftOutlined style={{ color: "white", fontSize: 15 }} />}
              onClick={eventClickBtnDec}
            ></Button>
            <a className="year-placeholder-buttom">
              {" "}
              {/* <p>
                {MonthContainer[0][month]} - {year}
              </p> */}
              <p>{getMonthName(currentM)} - {year}</p>
            </a>
            <Button
              style={{ backgroundColor: "#00AEC1", border: "none" }}
              icon={<RightOutlined style={{ color: "white", fontSize: 15 }} />}
              onClick={eventClickBtnInc}
            ></Button>
          </div>
          {isModalVisible == true ? (
            <EventCreateComponent
              click={"data"}
              api={getFunc}
              getdata={getdata}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              myFunction={myFunction}
            />
          ) : (
            ""
          )}
          <div className="calendar-days-scroll">
            {dates?.map((date, index) => (

              <p
                key={index}
                ref={
                  date.getDate() === new Date().getDate() && new Date().getMonth() === date.getMonth()
                    ? currentDateRef
                    : null
                }
                style={{ cursor: "pointer" }}
                // className={` ${(date?.getDate() === new Date().getDate() && new Date().getFullYear() === year && new Date().getMonth() === date.getMonth()) || activeDate === date?.getDate() || selectedCurrDate === date.getDate()
                //   ? "active-day"
                //   : "day1"
                //   }`} this is  the main class
                className={` ${((activeDate === date.getDate() || selectedCurrDate === date.getDate()) ||
                  (date?.getDate() === new Date().getDate() &&
                    new Date().getFullYear() === year &&
                    new Date().getMonth() === date.getMonth() &&
                    activeDate == null &&
                    selectedCurrDate == null))
                  ? "active-day"
                  : "day1"
                  }`}
                onClick={() => dateClick(date)}
              >
                <div className="day">
                  {date
                    .toLocaleDateString("en-US", { weekday: "short" })
                    .toLowerCase()}{" "}
                </div>
                <div className="date">{date.getDate()}</div>
              </p>
            ))}
          </div>

          {/*
          <div className="calendar-days-scroll" >
            <a className="active-day">
              <div className="day">Mon</div>
              <div className="date">21</div>
            </a>
            <a className="day1">
              <div className="day">tue</div>
              <div className="date">22</div>
            </a>
            <a className="day1">
              <div className="day">wed</div>
              <div className="date">22</div>
            </a>
            <a className="day1">
              <div className="day">thu</div>
              <div className="date">22</div>
            </a>
            <a className="day1">
              <div className="day">fri</div>
              <div className="date">22</div>
            </a>
            <a className="day1">
              <div className="day">sat</div>
              <div className="date">22</div>
            </a>
          </div> */}
          <>
            {openloader === true ? (
              <div className="loadermiddle">
                <Spin spinning={openloader} indicator={antIcon}></Spin>
              </div>
            ) : (
              <div className="activity-card-scroll" id="card_scroller">
                <div className="card-group">
                  {/* <div className="activity-card-1">
                          <div className="time-type">
                            <div className="am">8:30 AM</div>
                            <div className="global-table-tag">
                              <div className="tag">
                                <div className="taglabel3">APPOINTMENT</div>
                              </div>
                            </div>
                          </div>

                          <div className="containerarticle">
                            <img className="image-icon" alt="" src={calender} />

                            <div className="description">
                              <div className="text12">
                                longer description - start showing ellipsis when 2rd line
                                is reached loorem ipsum dolar set
                              </div>
                            </div>
                          </div>
                        </div> */}

                  {DataContainer?.data?.length >= 0
                    ? DataContainer?.data?.map((data) => {
                      return (
                        <>
                          <div className="activity-card-1">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                              }}
                            >
                              <div>

                                {moment(data?.start_time_MS).format(
                                  "Do [,] dddd"
                                )}
                              </div>
                              <div className="taglabel3 tag">
                                {data?.appointment_type}
                              </div>
                            </div>
                            <div className="time-type">
                              {data?.durationType == "allday" ? (
                                <div>All Day</div>
                              ) : (
                                <div className="am">
                                  {" "}
                                  {dateFun(data?.start_time)} to{" "}
                                  {dateFun(data?.end_time)}
                                </div>
                              )}
                              <div className="global-table-tag">
                                {/* <div className="tag">

                                  </div> */}
                              </div>
                            </div>
                            <div className="containerarticle">
                              <img
                                className="image-icon"
                                alt=""
                                src={calender}
                              />

                              <div className="description">
                                <div className="text12">
                                  <p>
                                    Event Type:{data?.event_type}
                                    <br></br>
                                    {data?.statusReason
                                      ? data?.statusReason
                                      : ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })
                    : ""}

                  {/* {
                          DataContainer?.data?.length > 10 ? (
                            <div className="shormoreButton" onClick={activityTracHome} >
                              Show More
                            </div>

                          )
                            : ''
                        } */}

                  {/* <div className="activity-card-1">
                          <div className="time-type">
                            <div className="am">8:30 AM</div>
                            <div className="global-table-tag">
                              <div className="tag">
                                <div className="taglabel3">APPOINTMENT</div>
                              </div>
                            </div>
                          </div>
                          <div className="containerarticle">
                            <img className="image-icon" alt="" src={calender} />

                            <div className="description">
                              <div className="text12">
                                longer description - start showing ellipsis when 2rd line
                                is reached loorem ipsum dolar set
                              </div>
                            </div>
                          </div>
                        </div> */}
                </div>
                {DataContainer?.length === 0 && (
                  <div className="card-group" style={{ width: "100%" }}>
                    <div className="activity-card-1">
                      <div className="time-type">
                        {/* <div className="am"></div>
                                <div className="global-table-tag"></div> */}
                      </div>
                      <div
                        className="containerarticle"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ marginBottom: "20px" }}>
                            {/* <img
                              className="image-icon"
                              alt=""
                              src={calender1}
                            /> */}
                            <IconButton icon={<WarningOutlined style={{ fontSize: "24px", color: "#FFFFFF" }} />} backgroundColor="#4A5F98" />
                          </div>

                          <div className="description">
                            <div className="noRecordText">
                              Sorry, No Activity Found
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ActivityTracker;
