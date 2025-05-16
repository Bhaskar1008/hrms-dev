import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col, Button } from "antd";
import { MoreOutlined, PhoneOutlined } from "@ant-design/icons";
import "./LeadCard.css";
import * as actions from "../../store/actions/index";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { drop } from "lodash";
import AllocateModal from "../Tab/Allocate";
import Offcanvas from "react-bootstrap/Offcanvas";
import { checkuserAccess, stoageGetter } from "../../helpers";
import { updateCheckAllocatedLead } from "../../store/actions/leads";
import BottomNavigation from "../ICARE/bottomNavigation/bottomNavigation";

const LeadCard = React.memo((props) => {
  const dispatch = useDispatch();
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const unCheckedLead = useSelector((state) => state?.leads?.unCheckedLead);
  const LeadData = useSelector((state) => state?.newLead?.payloadFormData);

  let user = stoageGetter("user");
  const empId = user.employeeCode;
  const reporting_manager_empId = user?.reportingManager?.employeeCode;

  const history = useHistory();
  const {
    id,
    lead_Id,
    leadStatus,
    // firstName,
    // lastName,
    leadName,
    leadType,
    created_date,
    allocatedDate,
    primaryMobile,
    allocatedBy,
    allocatedTo,
    appointmentOn,
  } = props;
  const leadsData = useSelector((state) => state.leads);
  const [chkID, setChkId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function checkboxes(data, e) {
    e.target.checked ? dispatch(updateCheckAllocatedLead([...checkedLead, data])) : dispatch(updateCheckAllocatedLead(checkedLead?.filter((a) => a.id !== data.id) || []));
    setChkId(data.Id);
  }

  useEffect(() => {
    !checkedLead.length && setChkId("");
  }, [checkedLead]);

  const leadComponent =
    leadStatus === "Converted" ? (
      <p className="user-status-text capitalize converted">{leadStatus}</p>
    ) : leadStatus === "Failed" ? (
      <p className="user-status-text capitalize failed">{leadStatus}</p>
    ) : leadStatus === "Closed" ? (
      <p className="user-status-text capitalize" style={{ color: "#D04949" }}>
        {leadStatus}
      </p>
    ) : leadStatus === "Discarded" ? (
      <p className="user-status-text capitalize open">Open</p>
    ) : (
      <p className="user-status-text capitalize open">{leadStatus}</p>
    );

  // let avatar = leadName

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  const updateHandler = (id) => {
    // dispatch(actions.fetchLeadDetails(id));
    // let _data = actions.fetchLeadDetails(id);
    // LeadData._id === id && history.push("/leadmasterpage/statuslead");
    dispatch({ data: id, type: "CURRENT_UPDATING_ID" });
    history.push("/leadmasterpage/statuslead", { leadID: id });
  };
  let statusColors = {
    closed: "#D04949",
    open: "#e0cb0d",
    PendingProposals: "#b50e21",
    Converted: "#159e0e",
    statusStyle: "",
    bgColor: "",
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
      console.log(error);
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
  // Card for desktop

  let card = (
    <div className="LeadCard-Main-Page-Container">
      <Card key={id} loading={props.loading} className="customer-card-details1" hoverable={false}>
        {allocateBtnStatus && <input id="checkbox" type="checkbox" checked={chkID && checkedLead.length && checkedLead?.filter((a) => a.id.includes(chkID))} onChange={(e) => checkboxes(props, e)}></input>}
        <div className="button-and-daat">
          <div className="date--">
            <div className="avtar--">
              <Avatar
                style={{
                  paddingTop: "-40px",
                  lineHeight: "none",
                  backgroundColor: getRandomColor(),
                  fontSize: "18px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
                size={{ xl: 45 }}
              >
                {nameShorter(leadName)}
              </Avatar>
            </div>
            <div className="lead---and--name">
              <h3>{leadName}</h3>
              <p>{lead_Id}</p>
            </div>
          </div>
          <div className="newbutton--lead">
            <p className="user-name-text capitalize"> {leadComponent} </p>
            <p className="capitalize bussiness">{leadType}</p>
          </div>
        </div>

        <div className="content">
          <div className="content-header1">
            <div className="avtar-data">
              <div className="otp-data">
                <a href={`tel:${primaryMobile}`}></a>
                {/* <PhoneOutlined className="phoneicon"></PhoneOutlined> */}
              </div>
            </div>
          </div>
          <hr />
          <div className="content-body Datainfo-Main-Container">
            <div className="Dateinfo-Container">
              <Card.Grid hoverable={false} className="grid-style">
                <p className="text-type">Created on</p>
                <p className="text-content">{created_date}</p>
              </Card.Grid>
              <Card.Grid hoverable={false} className="grid-style AllocatedBy-Heading">
                <p className="text-type">Allocated on</p>
                <p className="text-content">{allocatedDate}</p>
              </Card.Grid>
              <Card.Grid hoverable={false} className="grid-style Appoinment-Heading">
                <p className="text-type">Appointment on</p>
                <p className="text-content">{appointmentOn}</p>
              </Card.Grid>
              <Card.Grid hoverable={false} className="grid-style">
                <p className="text-type">Mobile No.</p>
                {/* <p className="text-content">{empId === '70008906'|| reporting_manager_empId === '70066108' ? primaryMobile : "xxxxxxxxx"}</p> */}
                <p className="text-content">{primaryMobile}</p>
              </Card.Grid>
              <Card.Grid hoverable={false} className="grid-style AllocatedBy-Heading">
                <p className="text-type">Allocated by</p>
                <p className="text-content capitalize" style={{ width: "100px" }}>
                  {allocatedBy}
                </p>
              </Card.Grid>
              <Card.Grid hoverable={false} className="grid-style Appoinment-Heading">
                <p className="text-type">Allocated to</p>
                <p className="text-content capitalize" style={{ width: "100px" }}>
                  {allocatedTo}
                </p>
              </Card.Grid>
            </div>
          </div>
          <div className="background-customer2">
            {leadsData?.globalTab === "team" || leadStatus === "Converted" ? (
              ""
            ) : (
              <div onClick={() => updateHandler(id)} className="button-view-detils--lead">
                <text className="button-vie-details-text--lead">Update</text>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <>
      <div key={id}>{card}</div>
      <br />
      {/* <BottomNavigation /> */}
    </>
  );
});

export default LeadCard;
