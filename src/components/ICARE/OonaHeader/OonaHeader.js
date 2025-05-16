import React, { useState, useRef, useEffect } from "react";
import "./Oona-header.css";
import OfflineMessage from "../../../OfflineMessageU";
import menubar from "../../../images/header_img/menu.png";
import logobar from "../../../assets/ihc_icon/icare_logo.png";
import loginimg from "../../../images/header_img/Ellipse 5.png";
import bell from "../../../images/header_img/bell-outline.png";
import web from "../../../images/header_img/web.png";
import magnify from "../../../images/header_img/magnify.png";
import oona_header from "../../../images/sideBar/oona_side_bar_logo.png";
import img1 from "../../../images/sideBar/copyoona.png"
import { Switch, Route } from "react-router-dom";
import MenuBar from "../MenuBar/MenuBar";
import { WifiOutlined, GlobalOutlined,MenuOutlined, BellOutlined  } from "@ant-design/icons";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Avatar, Icon, Spin, message } from "antd";
import { stoageGetter } from "../../../helpers";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
// import apiConfig from "./config/api.config"
import apiConfig from "../../../config/api.config";

const { ProjectLink } = apiConfig;

const OonaHeader = () => {
  let login_user_data = stoageGetter("user");
  let location = useLocation();

  const history = useHistory();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const logged_in_user =
    login_user_data.firstName + " " + login_user_data.lastName;

  const handleOutsideClick = (event) => {
    if (drawerRef.current && !drawerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const handleclose = () => {
    if (isOpen === true) {
      setIsOpen(!isOpen);
    }
  };

  const getRandomColor = () => {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const nameShorter = (str) => {
    try {
      if (str !== "") {
        str = str.toUpperCase();
        let arr = str.split(" ");
        let fLatter = arr[0].charAt(0);
        let sLatter = arr[1].charAt(0);
        // fLatter = fLatter.charAt(0);
        // sLatter = sLatter.charAt(0);
        str = fLatter + sLatter;
      }
      return str;
    } catch (error) {
      if (error?.response?.data?.statusCode === 1) {
        message.error(error?.response?.data?.data);
      }
    }
  };
  //  offlineMessage
  const [offlineMessagshow, setOfflineMessage] = useState(location.pathname);
  useEffect(() => {
    setOfflineMessage(location.pathname);
    // Your code to be executed on every route change
    console.log("Route has changed:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    //
    document.addEventListener("mousedown", handleOutsideClick);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const loginPage = () => {
    history.push("/loginProfile");
  };

  const notificationData = () => {
    history.push("/icare-notification");
  };

  const gotohome = () => {
    dispatch(actions.resetFormData({}));
    dispatch(actions.createCTPLQuotationSuccess({}));
    // dispatch(actions.fetchModelSuccess({}))

    history.push("/iCare-Dashboard");
  };
  return (
    <>
      {/* {ProjectLink.includes("dev") === true || ProjectLink.includes("uat") === true ? (
        <div className="newFile">
          <OfflineMessage data={offlineMessagshow} />
        </div>
      ) : null} */}
      <div className="newFile">
        <OfflineMessage data={offlineMessagshow} />
      </div>

      <div className={`${isOpen ? "open1" : ""}`}>
        <div
          className={`left-side-drawer ${isOpen ? "open2" : ""}`}
          ref={drawerRef}
        >
          <div className="drawer-content">
            {/* Your drawer content goes here */}
            <div className="drawer-head">
              {/* <img src={oona_header} /> */}
              <img src={logobar}  style={{width:"50%"}}/>
              {/* <h3>Phillife Financial</h3> */}
            </div>
          </div>
          <MenuBar data={handleclose} />
        </div>
      </div>

      <div className="header-data">
        <div className="oona-header">
          <div className="parent-head">
            <div className="logo-head">
              <ul>
                <li
                  className="toggle-button"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <MenuOutlined style={{ fontSize: "20px", color: "#1D428A", cursor: "pointer", marginRight: "16px" }} />
                </li>
                <li onClick={gotohome}>
                  <img src={logobar} style={{ height: 36 }} />{" "}
                </li>
              </ul>
            </div>

            <div className="login-head">
              <ul>
                {/* <li><img src={magnify} /></li> */}
                <li onClick={notificationData}>
                  {/* <span style={{ marginRight: 20 }}>
                    {" "}
                    <Spin
                      indicator={
                        isOnline ? (
                          <WifiOutlined style={{ marginTop: 5 }} />
                        ) : (
                          <WifiOffIcon
                            style={{
                              height: 30,
                              width: 30,
                            }}
                          />
                        )
                      }
                    />
                  </span> */}
                  {/* <img src={bell} /> */}
                  <BellOutlined style={{ fontSize: "20px", color: "#1D428A", cursor: "pointer", marginRight: "16px" }} />
                </li>
                {/* <li><img src={web} /></li> */}
                <li onClick={loginPage}>
                  {/* <img src={loginimg} /> */}
                  <Avatar
                    style={{
                      paddingTop: "-40px",
                      lineHeight: "none",
                      backgroundColor:'#1D428A'
                      // backgroundColor: getRandomColor(),
                    }}
                    size={{ xl: 30 }}
                  >
                    {nameShorter(logged_in_user)}
                  </Avatar>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="containernavdeco1"></div> */}
    </>
  );
};

export default OonaHeader;
