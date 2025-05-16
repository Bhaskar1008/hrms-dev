import React, { useState, useEffect } from "react";
import "./OonaDashboard.css";
import OonaCarousel from "../Carousel/OonaCarousel";
import UserInformation from "../UserInformation";
import ProductInformtion from "../ProductInformation/ProductInformtion";
import BusinessInformation from "../BusinessInformation/BusinessInformation";
import OonaFooter from "../OonaFooter/OonaFooter";
import ForeignExchange from "../Exchange/ForeignExchange";
import ProductionYearGraph from "../ProductionYearGraph/ProductionYearGraph";
// import OonaHeader from "../OonaHeader/OonaHeader";
import BottomNavigation from "../bottomNavigation/bottomNavigation";
import ActivityTracker from "../ActivityTracker/ActivityTracker";
import FloatButton from "../../FloatButton/FloatButton";
import { Card, Button, message } from "antd";
import "antd/dist/antd.css";
import * as actions from "../../../store/actions/index";
import * as leadActions from "../../../store/actions/leads";
import { useDispatch, useSelector } from "react-redux";
import Moment from "moment";
import moment from "moment";
import _ from "lodash";
import { Link, useHistory } from "react-router-dom";
import { Column } from "@ant-design/charts";
//import axiosRequest from "../../axios-request/request.methods";
import axiosRequest from "../../../axios-request/request.methods";
import { checkuserAccess, stoageGetter } from "../../../helpers";
import apiConfig from "../../../config/api.config";

import { ConsoleSqlOutlined, FormOutlined, ShopOutlined } from "@ant-design/icons";

const { ProjectLink } = apiConfig;

const OonaDashboard = (getFunc, getdata) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const CurrentDate = `${month}    ${day},  ${year}`;

  const dispatch = useDispatch();
  const history = useHistory();
  const user_data = stoageGetter("user");
  let loginUserID = user_data.id;
  const userName = user_data.firstName;
  const checkValidity = (data) => {
    try {
      if (data === "" || data === null || data === undefined || data === "undefined" || data === "-" || data === Infinity) {
        return 0;
      } else {
        return data;
      }
    } catch (err) {
      if (err?.response?.data?.statusCode === 1) {
        message.error(err?.response?.data?.data);
      }
    }
  };

  const login_user_data = stoageGetter("user");

  const Graphdata = null;
  const test = useSelector((state) => state);
  console.log("test==", test);
  const agent_id = login_user_data.agentId;
  // const logged_in_user = useSelector((state) => state.login.user_name)
  const logged_in_user = login_user_data.firstName + " " + login_user_data.lastName;
  // const id = useSelector((state) => state.login.id)
  const id = login_user_data.id;
  // const userId = useSelector((state) => state.login?.user?.id)
  const userId = login_user_data.id;
  // const channelCode = useSelector((state) => state.login?.user?.channelCode)
  const channelCode = login_user_data.channelCode;
  let _storeData = useSelector((state) => state);

  useEffect(() => {
    if (id) dispatch(actions.activities(id, agent_id));
    if (id) dispatch(actions.todoGetData(id));
    dispatch(actions.getUserTreeAPI(userId));
    // dispatch(actions.getBusinessCardAPI(userId,channelCode));
    dispatch(leadActions.updateTabOfDashboard("self"));

    // userId && dispatch(actions.fetchUserDetails(userId))
    channelCode && dispatch(actions.fetchHierarchy(userId, channelCode));
    if (agent_id) dispatch(actions.home(agent_id, userId));

    dispatch(actions.createCTPLQuotationSuccess({}));
    dispatch(actions.storeQuotationForm({}));
    dispatch(actions.fetchModelSuccess({}));
    dispatch(actions.fetchVehicleTypeSuccess({}));
    dispatch(actions.fetchModelYearSuccess({}));
    dispatch(actions.fetchSubModelSuccess({}));
    dispatch(actions.fetchTypeOfUseSuccess({}));
    dispatch(actions.fetchPolicyTermSuccess({}));
    dispatch(actions.fetchSublineSuccess({}));
    dispatch(actions.fetchAreaOfUsageSuccess({}));

    // getTodoData(0);
    // getDailyBusiness();
    // getOpportunities();
    // getKpiData(userId, channelCode);
  }, []);

  // let activities_data_store = [];

  const home_data = useSelector((state) => state.home.home_obj);
  let activities_data = null;

  function add3Dots(string, limit) {
    var dots = "...";
    if (string.length > limit) {
      string = string.substring(0, limit) + dots;
    }
    return string;
  }

  const [idLead, setidLead] = useState();
  // this is for the add button
  const [showButton, setShowButton] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [windowWidth, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    activities_data.map((item) => {
      if (item.leadId !== undefined && item.leadId !== null) {
        let id = item.leadId._id;
        setidLead(id);
      }
    });
  }, []);
  // this useEffect for the add buton
  useEffect(() => {
    // Function to handle window resize

    const handleResize = () => {
      setWidth(window.innerWidth);
      // if (!localStorage.getItem('appInstalled') && !window.matchMedia('(display-mode: standalone)').matches) {
      //   console.log("hello")
      //   setShowButton(true);
      // } else {
      //   console.log("hello2")
      //   setShowButton(false);
      // }
    };

    // Event listener for window resize
    window.addEventListener("resize", handleResize);
    if (window.localStorage.getItem("appInstalled")) {
      setShowButton(false); // App is installed, hide the button
    }
    // Check if the app is already installed
    const mediaQueryList = window.matchMedia("(display-mode: standalone)");
    if (mediaQueryList.matches) {
      setShowButton(false);
    }
    // setShowButton(!mediaQueryList.matches);
    // console.log("hey34", window.location.href)
    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (event) => {
      // console.log("hey35", window.location.href)
      // Prevent the default browser prompt
      event.preventDefault();

      // Store the event for later use
      setDeferredPrompt(event);

      // Show the "Add to Home Screen" button
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);
  // this the hanlde click button
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the installation prompt
      deferredPrompt.prompt();

      // Wait for the user to respond
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        // The user accepted the installation
        window.localStorage.setItem("appInstalled", "true");

        // console.log('App installed successfully');
        // Hide the button after installation
        setShowButton(false);
      } else {
        // console.log('App installation cancelled');
      }
    }
  };

  if (activities_data !== undefined && activities_data !== null) {
    if (activities_data.length != 0) {
      activities_data = activities_data.filter((item) => {
        return item.statusType == "open";
      });
    }
  } else {
    activities_data = [];
  }
  // console.log("hey1", showButton)
  // console.log("hey2", windowWidth)
  // console.log("hey3", deferredPrompt)
  const buttonStyle = {
    borderRadius: 8,
    borderColor: "white",
    backgroundColor: "#000080",
    color: "white",
  };

  return (
    <>
      {/* <OonaHeader /> */}
      <div className="main-container">
        <OonaCarousel />
        <hr className="har" />
        <div className="user-informtion">
          <div className="user-parent">
            <div className="user-child">
              {/* {ProjectLink.includes("dev") === true || ProjectLink.includes("uat") === true ?
                <>
                  {(showButton && windowWidth <= 842 && deferredPrompt !== null) ? <Card className="addButtonCard1" style={{ height: 70 }} >
                    <div className="addButton" >
                      <p style={{ fontSize: 12 }}>
                        <span style={{ whiteSpace: 'nowrap' }}>Take Kahoona</span><br />
                        everywhere you go!
                      </p>
                      <p>
                        <Button onClick={handleInstallClick} style={buttonStyle}>INSTALL APP</Button>
                      </p>
                    </div>
                  </Card> : ''

                  }
                </>
                : null} */}
              <>
                {showButton && windowWidth <= 842 && deferredPrompt !== null ? (
                  <Card className="addButtonCard1" style={{ height: 70 }}>
                    <div className="addButton">
                      <p style={{ fontSize: 12 }}>
                        <span style={{ whiteSpace: "nowrap" }}>Take Salesdrive</span>
                        <br />
                        everywhere you go!
                      </p>
                      <p>
                        <Button onClick={handleInstallClick} style={buttonStyle}>
                          INSTALL APP
                        </Button>
                      </p>
                    </div>
                  </Card>
                ) : (
                  ""
                )}
              </>
              <h2 style={{ color: "#FF6D00" }}>Hi {userName}!</h2>
            </div>
            <div className="user-child-p">
              <p>Good day! It is {CurrentDate}.</p>
            </div>
          </div>
        </div>
        <ProductionYearGraph />
        <UserInformation />
        <ProductInformtion />
        <BusinessInformation />
        <ActivityTracker />
        {/* <div className="for-data">
          <ForeignExchange />
        </div> */}
        <FloatButton />
      </div>
      {/* <BottomNavigation />
      <OonaFooter /> */}
    </>
  );
};

export default OonaDashboard;
