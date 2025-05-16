import React, { useEffect, useState } from "react";
import { Avatar, Button } from "antd";
import { MailFilled, PlusCircleOutlined } from "@ant-design/icons";
import "./MyTeams.css";

import MyTeamsFloatButton from "./MyTeamsFloatButton";
import axios from "axios";

const UserList = ["U", "Lucy", "Tom", "Edward"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const GapList = [4, 3, 2, 1];
const MyTeams = () => {
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);
  let { innerWidth: width, innerHeight: height } = window;
  const [tabChange, setTabChange] = useState({
    active: true,
    inactive: false,
  });
  const [teamAllCount, setTeamAllCount] = useState();
  const [teamActiveCount, setTeamActiveCount] = useState();
  const [teamInactiveCount, setTeamInactiveCount] = useState();

  useEffect(() => {
    axios
      .get(
        "https://sdrestnode.iorta.in/auth/sd/user/getteamAuto/5df77d17009e273b39cae811?sortBy=604800000&skip=0"
      )
      .then((res) => {
      })
      .catch((err) => {
      });
  }, []);
  //   const TabAllChange = () => {
  //     setTabChange({
  //       all: true,
  //       active: false,
  //       inactive: false,
  //     });
  //   };

  const TabActiveChange = () => {
    setTabChange({
      //   all: false,
      active: true,
      inactive: false,
    });
  };

  const TabInactiveChange = () => {
    setTabChange({
      //   all: false,
      active: false,
      inactive: true,
    });
  };
  const changeUser = () => {
    const index = UserList.indexOf(user);
    setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    setColor(
      index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]
    );
  };
  const changeGap = () => {
    const index = GapList.indexOf(gap);
    setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
  };
  return (
    <div className="myteam-main-class">
      <div className="myteam-tab-card-flex">
        {/* <div
          className={
            tabChange.all
              ? "myteam-tab-active-card-style"
              : "myteam-tab-card-style"
          }
          onClick={TabAllChange}
          value={tabChange.all}
        >
          <div className="myteam-array-count-circle-flex">
            <div className="myteam-array-count-circle-style">
              <p>3</p>
            </div>
          </div>
          <div className="myteam-tab-text-column-flex">
            <div className="myteam-tab-text-row-flex">
              <p
                className={
                  tabChange.all
                    ? "myteam-tab-active-text-style"
                    : "myteam-tab-text-style"
                }
              >
                All
              </p>
            </div>
          </div>
        </div> */}

        <div
          className={
            tabChange.active
              ? "myteam-tab-active-card-style"
              : "myteam-tab-card-style"
          }
          onClick={TabActiveChange}
          value={tabChange.active}
        >
          <div className="myteam-array-count-circle-flex">
            <div className="myteam-array-count-circle-style">
              <p>3</p>
            </div>
          </div>
          <div className="myteam-tab-text-column-flex">
            <div className="myteam-tab-text-row-flex">
              <p
                className={
                  tabChange.active
                    ? "myteam-tab-active-text-style"
                    : "myteam-tab-text-style"
                }
              >
                Active
              </p>
            </div>
          </div>
        </div>

        <div
          className={
            tabChange.inactive
              ? "myteam-tab-active-card-style"
              : "myteam-tab-card-style"
          }
          onClick={TabInactiveChange}
          value={tabChange.inactive}
        >
          <div className="myteam-array-count-circle-flex">
            <div className="myteam-array-count-circle-style">
              <p>3</p>
            </div>
          </div>
          <div className="myteam-tab-text-column-flex">
            <div className="myteam-tab-text-row-flex">
              <p
                className={
                  tabChange.inactive
                    ? "myteam-tab-active-text-style"
                    : "myteam-tab-text-style"
                }
              >
                Inactive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card UI */}
      <div className="myteam-card-flex">
        <div className="myteam-card-main-style">
          <div className="myteam-card-avatar-flex">
            <Avatar
              style={{
                backgroundColor: "rgb(105, 55, 151)",
                verticalAlign: "middle",
              }}
              size="large"
              gap={gap}
            ></Avatar>
            {width > "767" ? (
              <p className="myteam-card-avatar-text">Active</p>
            ) : null}
          </div>
          <div className="myteam-card-content-flex">
            <div className="myteam-card-content-top-flex">
              <div className="myteam-card-name-id-flex">
                <p>Siddhesh</p>
                {width > "767" ? (
                  <p className="myteam-card-id-text-style">ANDH 01</p>
                ) : (
                  <p className="myteam-card-avatar-text">Active</p>
                )}
              </div>
              {width > "767" ? (
                <MailFilled
                  style={{
                    fontSize: "22px",
                    color: "grey",
                  }}
                />
              ) : null}
            </div>
            {width > "767" ? (
              <div className="myteam-card-horizontal-line-style"></div>
            ) : null}

            <div className="myteam-card-content-bottom-flex">
              {width > "767" ? (
                <div className="myteam-card-bottom-header-row-flex">
                  <div className="myteam-card-bottom-header-row-email-area-flex">
                    <p className="myteam-card-bottom-header-text-style">
                      Email
                    </p>
                    <p className="myteam-card-bottom-email-text-style">
                      abhishek@grr.la
                    </p>
                  </div>
                  <div className="myteam-card-bottom-header-row-mobileno-area-flex">
                    <p className="myteam-card-bottom-header-text-style">
                      Mobile No
                    </p>
                    <p className="myteam-card-bottom-email-text-style">
                      99898789897
                    </p>
                  </div>

                  <div className="myteam-card-bottom-header-row-openleads-area-flex">
                    <p className="myteam-card-bottom-header-text-style">
                      Open Leads
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="myteam-card-bottom-header-row-flex">
                {width > "767" ? (
                  <p className="myteam-card-bottom-header-text-style">
                    Open appointments
                  </p>
                ) : null}

                <div className="myteam-card-bottom-button-row-flex">
                  <button className="myteam-card-bottom-button-style">
                    View Details
                  </button>
                  <button className="myteam-card-bottom-button-style">
                    Login As
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Floater Button UI*/}
      <div className="myteam-floatbutton-flex">
        <MyTeamsFloatButton />
      </div>
    </div>
  );
};
export default MyTeams;
