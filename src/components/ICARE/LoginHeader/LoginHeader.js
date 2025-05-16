import React, { useState, useEffect } from "react";
import "./LoginHeader.css";
import { Icon, Spin } from "antd";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { WifiOutlined, GlobalOutlined } from "@ant-design/icons";
import logobar from "../../../images/header_img/Kahoona Logo - white.png";
import { useHistory } from "react-router-dom";
import icare from "../../../images/iCare_Official_Logo.png";

const OonaHeader = ({logoutShow}) => {
  const history = useHistory();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);



  const gotohome = () => {
    // history.push("/agent-login");
  };
  const logout = () => {
    history.push("/login");
  };
  return (
    <>
      <div className="header-data">
        <div className="login-icare-header">
        <div className="parent-head">
          <div>
                  <img onClick={gotohome} src={icare} style={{ height: 105, position: "absolute", top: "-38%" }} alt="ICare Logo"/>
          </div>
          <div>
                  {!logoutShow && <p onClick={logout} className="text-style">LOGOUT</p>}
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OonaHeader;
