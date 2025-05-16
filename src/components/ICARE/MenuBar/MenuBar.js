import React, { useState, useEffect } from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
//import { useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions/leads";
import { checkAgent, stoageGetter } from "../../../helpers";

const MenuBar = (props) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null); // Clicking on the active dropdown will close it
    } else {
      setActiveDropdown(dropdownName); // Clicking on an inactive dropdown will open it
    }
  };
  const dispatch = useDispatch();

  useEffect((leadInc) => {
    const { id } = stoageGetter("user");

    dispatch(actions.fetchAllLeads(id, leadInc, 1));
  }, []);
  const { id } = stoageGetter("user");

  return (
    <>
      <div className="mainbar">
        <ul className="menuuuu">
          <Link to="/iCare-Dashboard">
            <li className="li--menubar" onClick={props.data}>
              Home
            </li>
          </Link>
          <Link to="/channelPartnerMaster/all">
            {" "}
            <li className="sub-li" onClick={props.data}>
              Channel Partner Recruitment
            </li>{" "}
          </Link>
          <li onClick={() => toggleDropdown("leads")} className={`outerMenuli ${activeDropdown === "leads" ? "active" : ""}`}>
            Leads {activeDropdown === "leads" ? <FaIcons.FaAngleUp style={{ color: "#000", marginLeft: "205px" }} /> : <FaIcons.FaAngleDown style={{ color: "#000", marginLeft: "205px" }} />}
            {activeDropdown === "leads" ? (
              <>
                <ul id="submenu">
                  <Link to="/leadMaster/all_leads">
                    {" "}
                    <li className="sub-li" onClick={props.data}>
                      All
                    </li>
                  </Link>
                  <Link to="/leadMaster/fortoday">
                    {" "}
                    <li
                      className="sub-li"
                      onClick={() => {
                        props.data();
                        dispatch(actions.fetchAllLeads(id, "fortoday", 1));
                        dispatch(actions.setCurrentActiveTab("fortoday"));
                      }}
                    >
                      For Today
                    </li>
                  </Link>
                  <Link to="/leadMaster/openlead">
                    {" "}
                    <li
                      className="sub-li"
                      onClick={() => {
                        props.data();
                        dispatch(actions.fetchAllLeads(id, "open", 1));
                        dispatch(actions.setCurrentActiveTab("open"));
                      }}
                    >
                      Open
                    </li>{" "}
                  </Link>
                </ul>
              </>
            ) : (
              " "
            )}
          </li>
          
          <Link to="/daily-bussienss">
            {" "}
            <li className="sub-li" onClick={props.data}>
              Daily Business
            </li>{" "}
          </Link>
          <Link to="/calendar">
            {" "}
            <li className="sub-li" onClick={props.data}>
              Calendar
            </li>
          </Link>
          <Link to="/todo">
            {" "}
            <li className="sub-li" onClick={props.data}>
              To Do
            </li>
          </Link>
          <li onClick={() => toggleDropdown("sales")} className={`outerMenuli ${activeDropdown === "sales" ? "active" : ""}`}>
            Sales Guide {activeDropdown === "sales" ? <FaIcons.FaAngleUp style={{ color: "#000", marginLeft: "165px" }} /> : <FaIcons.FaAngleDown style={{ color: "#000", marginLeft: "165px" }} />}
            {activeDropdown === "sales" ? (
              <>
                <ul className="submenu">
                  <Link to="/masterpresales/customerdetails/salespitch">
                    {" "}
                    <li className="sub-li" onClick={props.data}>
                      Sales Pitch
                    </li>{" "}
                  </Link>
                  <Link to="/learningcenter">
                    <li className="sub-li" onClick={props.data}>
                      Learning Center
                    </li>{" "}
                  </Link>
                  <Link to="/products">
                    {" "}
                    <li className="sub-li" onClick={props.data}>
                      Product
                    </li>{" "}
                  </Link>
                </ul>
              </>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuBar;
