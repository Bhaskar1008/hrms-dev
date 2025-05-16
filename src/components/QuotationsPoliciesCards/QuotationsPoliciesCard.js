import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col, Button } from "antd";
import { MoreOutlined, PhoneOutlined,DeleteOutlined,
  MessageOutlined,
  MailOutlined, } from "@ant-design/icons";
import "./QuotationsPoliciesCard.css";
import * as actions from "../../store/actions/index";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { drop } from "lodash";
import AllocateModal from "../Tab/Allocate";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { checkuserAccess, stoageGetter } from "../../helpers";
import { updateCheckAllocatedLead } from "../../store/actions/leads";
import img1 from "../../images/Icon/image-54@2x.png";


const QuotationsPoliciesCard = React.memo((props) => {
  const dispatch = useDispatch();
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);
  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const unCheckedLead = useSelector((state) => state?.leads?.unCheckedLead);
  const LeadData = useSelector((state) => state?.newLead?.payloadFormData);

  let user = stoageGetter("user");
  const empId = user.employeeCode;
  const reporting_manager_empId = user?.reportingManager?.employeeCode;
  console.log("emply_", empId, reporting_manager_empId);

  const history = useHistory();
  const {
    id,
    LOB,
    createdAt,
    policyForVehical,
    firstName,
    middleName,
    lastName,
    expiryDate,
    documentCode,
    documentType,
    responseMessage,
    email,
    mobileNumber
    // allocatedBy,
    // allocatedTo,
    // appointmentOn,
  } = props;
  console.log("propsPolicy-----", props);
  console.log("Data travel ====>>", props?.createdAt)
  // const leadsData = useSelector((state) => state.quotationsPolicies);
  // console.log("quotationsPoliciesMaster/activepolicy", leadsData);
  const [chkID, setChkId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  function checkboxes(data, e) {
    e.target.checked
      ? dispatch(updateCheckAllocatedLead([...checkedLead, data]))
      : dispatch(
          updateCheckAllocatedLead(
            checkedLead?.filter((a) => a.id !== data.id) || []
          )
        );
    setChkId(data.Id);
  }

  useEffect(() => {
    !checkedLead.length && setChkId("");
  }, [checkedLead]);

  // const leadComponent =
  //   leadStatus === "Converted" ? (
  //     <p className="user-status-text capitalize converted">{leadStatus}</p>
  //   ) : leadStatus === "Failed" ? (
  //     <p className="user-status-text capitalize failed">{leadStatus}</p>
  //   ) : leadStatus === "Closed" ? (
  //     <p className="user-status-text capitalize" style={{ color: "#D04949" }}>
  //       {leadStatus}
  //     </p>
  //   ) : leadStatus === "Discarded" ? (
  //     <p className="user-status-text capitalize open">
  //       Open
  //     </p>) : (
  //     <p className="user-status-text capitalize open">{leadStatus}</p>
  //   );

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
      <Card
        key={id}
        loading={props.loading}
        className="customer-card-details1"
      >
        {allocateBtnStatus && (
          <input
            id="checkbox"
            type="checkbox"
            checked={
              chkID &&
              checkedLead.length &&
              checkedLead?.filter((a) => a.id.includes(chkID))
            }
            onChange={(e) => checkboxes(props, e)}
          ></input>
        )}

      <div className='button-and-daat'>
              <div className='date--'>
                  <p>{createdAt}</p>
              </div>
              <div className='newbutton--'>
                  <Button>{LOB}</Button>
              </div>
          </div>

          <div className='button-and-profile1'>
              <div className='profile--11'>
                  <img src={img1} />
                      <div className='profilename--'>
                        <h3>{policyForVehical ? policyForVehical : '-'}</h3>
                        <div className='child'>
                        <p>{firstName + " " + middleName + " " + lastName }</p>
                        <p style={{marginLeft: '2rem'}}>{"MTO-37269-GH8336"}</p>
                        </div>

                    </div>
              </div>
          </div>
          <hr/>
          <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Response Message</p>
                 <h3>{responseMessage ? responseMessage : '-'}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Document Type</p>
                 <h3>{documentType ? documentType : '-'}</h3>
              </div>
              <div className='profilename--all'>
                  <p>Document Code</p>
                 <h3>{documentCode ? documentCode : "-"}</h3>
              </div>
          </div>

          <div className='button-and-all-details'>
              <div className='profilename--all'>
                  <p>Premium</p>
                 <h3>-</h3>
              </div>
              <div className='profilename--all'>
                  <p>Status</p>
                 <h3>-</h3>
              </div>
              <div className='profilename--all'>
                  <p>Expiry</p>
                 <h3>{expiryDate ? expiryDate : "-"}</h3>
              </div>
          </div>
          {/* <div className='background-customer1'>
            <div>
              <p>hello</p>
            </div>

          </div> */}

          {/* <div className='background-customer1'>
          <div className='delet'>
              <p><DeleteOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>Delete</p>
          </div>
          <div className='delet'>
              <p><MessageOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>Message</p>
          </div>
          <div className='delet'>
              <p><MailOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>Mail</p>
          </div>
          <div className='delet'>
              <p><PhoneOutlined style={{color: "rgb(72 44 119)", marginRight: '5px', fontSize: '20px',
fontWeight: 'bold'}} /></p>
              <p>Phone</p>
          </div>
      </div> */}


        {/* <button className="update-btn" onClick={() => updateHandler(id)}>
            Update
          </button> */}
        {/* {leadsData?.globalTab === "team" || leadStatus === "Converted" ? (
          ""
        ) : (

        )} */}
      </Card>
    </div>
  );
  //Card for Mobile
  // if (width < breakpoint) {
  //   card = (
  //     <Card className="lead-card-mobile" hoverable>
  //       {allocateBtnStatus && (
  //         <input
  //           style={{
  //             marginTop: "-4.5rem",
  //             marginLeft: "-1rem",
  //           }}
  //           id="checkbox"
  //           type="checkbox"
  //           checked={
  //             chkID &&
  //             checkedLead.length &&
  //             checkedLead?.filter((a) => a.id.includes(chkID))
  //           }
  //           onChange={(e) => checkboxes(props, e)}
  //         ></input>
  //       )}
  //       <div style={{ width: "100%" }}>
  //         <div
  //           className="otp-data"
  //           style={{ display: "flex", justifyContent: "flex-end" }}
  //         >
  //           {/* <p className="user-name-text capitalize">OTP - <span style={{color: '#13bb13'}}>Verified</span></p> */}
  //           <p className="capitalize bussiness">{leadType}</p>
  //         </div>
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "row",
  //             alignItems: "center",
  //           }}
  //         >
  //           <Avatar
  //             className="avatar-mobile"
  //             size={{
  //               xs: 50,
  //               md: 40,
  //               xl: 50,
  //             }}
  //             style={{
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "center",
  //               backgroundColor: "#C6C7C9",
  //             }}
  //           >
  //             {nameShorter(leadName)}
  //           </Avatar>

  //           <div className="card-content-text capitalize">
  //             <p className="user-name-text">{leadName}</p>
  //             {leadComponent}
  //             {/* <p className="user-status-text">{leadStatus === "newleadentery" || leadStatus === "contact" ? 'Open' : leadStatus}</p> */}
  //             {/* <PhoneOutlined
  //                   style={{ color: "green", cursor: "pointer" }}
  //                 ></PhoneOutlined> */}
  //           </div>
  //         </div>
  //       </div>

  //       {leadsData?.globalTab === "team" || leadStatus === "Converted" ? "" : <>
  //       <MoreOutlined
  //         style={{ fontSize: "25px", marginLeft: "auto", color: "grey" }}
  //         onClick={handleShow}
  //       />
  //       <Offcanvas show={show} onHide={handleClose} {...props} placement='bottom'>
  //       <Offcanvas.Header closeButton>
  //         <Offcanvas.Title>Update Lead</Offcanvas.Title>
  //       </Offcanvas.Header>
  //       <Offcanvas.Body>
  //         <button className="upadte-btn" onClick={() => updateHandler(id)}>Update</button>
  //       </Offcanvas.Body>
  //     </Offcanvas>
  //       </>}


  //     </Card>
  //   );
  // }
  return <div key={id}>{card}</div>;
});

export default QuotationsPoliciesCard;
