import { Card, Avatar, Button, Modal } from "antd";
import React, { useState, useEffect } from "react";
import "./Tab.css";
import { getTeamMainTabApi } from "../actions/allleadAction";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/leads";
import axios from "axios";
import person_black from "./../Activitity Tracker/icons/person_black.png";
import person_white from "./../Activitity Tracker/icons/person_white.png";
import axiosRequest from "../../axios-request/request.methods";
import { checkAgent, stoageGetter } from "../../helpers";
import { useLocation } from "react-router-dom";

export const AllocateModal = React.memo((props) => {
  const location = useLocation();
  const history = useHistory();

  const { id } = stoageGetter("user");
  
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const allocateBtnStatus = useSelector((state) => state?.leads?.allocateTab);

  const checkedLead = useSelector((state) => state?.leads?.checkedLead);
  const state = useSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const [viewDetails, setviewDetails] = useState("");
  const [cardData, setCardData] = useState([]);

  const breakpoint = 620;

  const userTreeData = useSelector(
    (state) => state?.home?.user_tree.reporting_users
  );
  const managerName = useSelector(
    (state) => state?.home?.user_tree.reporting_managers
  );
  
  //const userId1 = useSelector((state) => state?.login?.user?.designation);
  var roleName = useSelector(
    (state) => state?.login?.user?.userRole[0]?.roleName
  );
  
    
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    setCardData(userTreeData);
  }, []);

  const handleCloseAllocate = () => {
    setVisible(false);
    dispatch(actions.updateAllocateOfOpportunities(false));
    dispatch(actions.updateCheckAllocatedLead([]));
  };

  // dataForAllocket
  const handleAllocateTo = () => {
    if (allocateBtnStatus && checkedLead?.length > 0) {
      setVisible(true);
    }
  };

  let getMangerName = (findId) => {
    let manager = "";
    managerName.map((res) => {
      if (res._id === findId) {
        manager =
          res.first_name + " " + res.last_name + " (" + res.employeeCode + ") ";
      }
    });
    return manager;
  };

  const handleAllocateLead = () => {
    let payload = {
      userId: id,
      Allocated_user_id: viewDetails._id,
      Lead_Id_List: checkedLead.map((res) => ({ _id: res.id })),
    };

    axiosRequest
      .put(`user/manualAllocation_lead?user_type=user`, payload, {
        secure: true,
      })
      .then((res) => {
        if (res.length !== 0) {
          handleCloseAllocate();
          setviewDetails("");
          // const data = location.path.split('/');
          //dispatch(actions.fetchAllLeads(id, props.tabSelected, 1));

          dispatch(actions.fetchAllLeads(id, "all", 1));
          history.push("/iCare-Dashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleViewDetails = (lead) => {
    
    axiosRequest
      .get(`user/v2/getleads_team_count/${lead._id}`, {
        secure: true,
      })
      .then((res) => {
        setviewDetails({
          ...lead,
          convertedLead: res.data.converted,
          open: res.data.open_lead,
        });
      })
      .catch((err) => console.log(err));
      setviewDetails(lead);
  };

  const modelStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: width <= 750 ? "center" : "start",
    flexDirection: width <= 750 ? "column" : "row",
  };

  return (
    <>
      {allocateBtnStatus && (
        <div
          style={{
            backgroundColor: "rgb(33, 150, 243)",
            position: "fixed",
            left: "50%",
            top: "60px",
            width: "320px",
            color: "white",
            padding: "0px 10px 0px 10px",
            zIndex: 99,
            transform: "translate(-50%,0)",
          }}
        >
          <p style={{ position: "relative", top: "10px" }}>
            {" "}
            You have selected {checkedLead.length} leads{" "}
            {checkedLead.length ? (
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: "190px",
                  marginTop: "-25px",
                  textAlign: "end",
                }}
                onClick={() => dispatch(actions.updateCheckAllocatedLead([]))}
              >
                UNSELECT
              </p>
            ) : (
              <p
                style={{
                  cursor: "pointer",
                  marginLeft: "190px",
                  marginTop: "-25px",
                  textAlign: "end",
                }}
                onClick={() => {
                  handleCloseAllocate();
                }}
              >
                CANCEL{" "}
              </p>
            )}
          </p>
        </div>
      )}

      {roleName === "Agent" ? "" : allocateBtnStatus ? (
        width > breakpoint - 30 ? (
          
          <Button
          key={"allocket active"}
          style={{ color: "#fff" }}
          className="active_tabs_button"
            onClick={handleAllocateTo}
            // key={"allocket"}
          >
            {" "}
            {/* <figcaption className="card-caption"></figcaption>{" "} */}
            <img src={person_white} className="person" alt="person_png" />
            <b>+</b> Allocate To
          </Button>
        ) : (
          <Button
            key={"allocket active"}
            onClick={handleAllocateTo}
            style={{ color: "#fff" }}
            className="active_tabs_button"
          >
            <img src={person_white} className="person" alt="person_png" />
            <b>+</b> Allocate To
          </Button>
        )
      ) : width > breakpoint - 30 ? (
        <Button
          className="tabs_button"
          onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))}
          key={"allocket"}
        >
          {" "}
          {/* <figcaption className="card-caption"></figcaption>{" "} */}
          <img src={person_black} className="person" alt="person_png" />
          <b>+</b> Allocate
        </Button>
      ) : (
        <Button
          key={"allocket"}
          onClick={() => dispatch(actions.updateAllocateOfOpportunities(true))}
          style={{ color: "#000" }}
          className="tabs_button"
        >
          <img src={person_black} className="person" alt="person_png" />
          <b>+</b> Allocate
        </Button>
      )}


      <Modal
        title="Allocate to"
        centered
        visible={visible}
        onOk={handleCloseAllocate}
        onCancel={handleCloseAllocate}
        footer={null}
        width={width <= breakpoint ? "99%" : 880}
        bodyStyle={{ backgroundColor: "rgb(247, 247, 247)" ,overflow: 'auto',
        height: 'auto',padding:'15px'}}
      >
        <div style={modelStyle}>
          <div
            style={{
              height: "350px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              marginBottom: "5px",
              overflowY: "auto",
            }}
          >
            {cardData?.map((item, ind) => {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    backgroundColor: "#fff",
                    width: "auto",
                    marginBottom: "0",
                    padding: 3,
                    alignItems: "center",
                    border: "0.8px solid lightgray",
                    justifyContent: "space-between",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flex: 2,
                    }}
                  >
                    <div>
                      <Avatar style={{ textTransform: "uppercase" }}>
                        {item?.first_name?.charAt(0) + item?.last_name?.charAt(0)}
                      </Avatar>
                    </div>
                    <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          color: "rgb(0, 172, 193)",
                          width: "83px",
                          // marginLeft: "10px",
                          // marginRight: "10px",
                        }}
                      >
                        {item.hierarchyName}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          textTransform: "capitalize",
                          width: "100px",
                        }}
                      >
                        {item.first_name} {item.last_name}
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          marginBottom: 0,
                          fontWeight: "500",
                          color: "#78849E",
                          textTransform: "uppercase",
                          textAlign: "center",
                        }}
                      >
                        {item.lead_Id}
                      </p>
                    </div>
                    <Button
                      size="small"
                      shape="round"
                      style={{
                        backgroundColor: "rgb(0, 172, 193)",
                        color: "#fff",
                      }}
                      // style={{ height: '1.2rem', width: '4rem', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(0, 172, 193)', fontSize: '10px', fontWeight: '400px', position: 'absolute', left: '335px', color: '#ffff' }}
                      onClick={() => handleViewDetails(item)}
                    >
                      View Details
                    </Button>
                  </div>
                  {/* <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flex: 1,
                    }}
                  >
                  
                  </div> */}
                </div>
              );
            })}
          </div>

          <div
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: "#ffff",
              margin: "0 10px",
              border: "0.8px solid lightgray",
            }}
          >
            {viewDetails ? (
              <div>
                <div
                  key={viewDetails.id}
                  style={{
                    backgroundColor: "#F7FBFF",
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        style={{
                          textTransform: "uppercase",
                        }}
                        size={{ xl: 50 }}
                      >
                        {viewDetails.first_name &&
                          viewDetails.first_name.charAt(0)}
                        {""}
                        {viewDetails.last_name &&
                          viewDetails.last_name.charAt(0)}
                      </Avatar>
                      <div style={{ color: "#00acc1", fontWeight: "bolder" }}>
                        {viewDetails.hierarchyName}
                      </div>
                    </div>
                    <div style={{ marginLeft: 10 }}>
                      <p style={{ marginBottom: 0 }}>
                        {viewDetails.first_name + " " + viewDetails.last_name}
                      </p>
                      <p style={{ marginBottom: 0, color: "gray" }}>
                        {viewDetails.employeeCode}
                      </p>
                    </div>
                  </div>
                  <div style={{ marginTop: 10 }}>
                    <p style={{ marginBottom: 0 }}>
                      Reports to :{" "}
                      <span style={{ color: "gray" }}>
                        {getMangerName(viewDetails.reporting_manager)}
                      </span>{" "}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "#F4F6F9",
                    border: "1px solid #D2DDE8",
                    padding: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    marginTop: "15px",
                    height: "2.5rem",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      color: "rgb(0, 172, 193)",
                    }}
                  >
                    Lead
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: "#F4F6F9",
                    border: "1px solid #D2DDE8",
                    padding: "10px",
                    marginLeft: "15px",
                    marginRight: "15px",
                    height: "6rem",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Converted Lead</div>
                    <div style={{ fontWeight: "bold" }}>
                      {viewDetails.convertedLead}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>Open</div>
                    <div style={{ fontWeight: "bold" }}>{viewDetails.open}</div>
                  </div>
                </div>

                <div
                  style={{
                    margin: "15px",
                  }}
                  className="parent_div"
                >
                  <Button
                    style={{ backgroundColor: "#00ACC1", color: "#fff" }}
                    onClick={handleAllocateLead}
                  >
                    Allocate
                  </Button>
                  <Button onClick={handleCloseAllocate}>Cancel</Button>
                </div>

              </div>
            ) : (
              <div
                style={{
                  padding: "150px 0 50px",
                  textAlign: "center",
                  fontSize: "24px",
                  fontFamily: "robotoregular",
                  color: "gray",
                  height: "350px",
                }}
              >
                Please Select the Card!!
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "-5px",
            marginTop: "5px",
          }}
        >
          
        </div>
      </Modal>
    </>
  );
});

function AllocateModalShow({ id, tabSelected }) {
  return (
    <>
      <AllocateModal id={id} tabSelected={tabSelected} />
    </>
  );
}
export default AllocateModalShow;
