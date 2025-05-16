import React, { useEffect, useState } from "react";
import { Card, Col, Row,DatePicker, Form } from "antd";
import { DownOutlined } from '@ant-design/icons'
import Self from "./LeftSide-Activity/Self/Self";
import Team from "./LeftSide-Activity/Team/Team";
import Todo from "./RightSide-Todo/Todo";
import person_black from "./icons/person_black.png";
import person_white from "./icons/person_white.png";
import group_white from "./icons/group_white.png";
import group_black from "./icons/group_black.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import headerTabs from "./icons/header-tabs.png";
import "./ActivityCalender.css";
import Tabs from "../../components/Tab/Tab";
import { checkAgent ,checkuserAccess} from "../../helpers";

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
var tabMenu = [
];
// var Headername =''
// var Activetab =''
var showheadertab = true
var bothtabMenu = [
  {
    id: "calendar",
    value: "Calendar",
  },
  {
    id: "todo",
    value: "To Do",
  },
];
const onlycalender = [{
  id: "calendar",
value: "Calendar",
}]
const onlytodo =[
  {
    id: "todo",
    value: "To Do",
  },
]

const App = () => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [TeamSelf, setTeamSelf] = useState(true);
  const [width, height] = useWidowsSize();
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  
  let _storeData = useSelector((state) => state);
  
  const _accessTodo = checkuserAccess("todoTask", _storeData.login); // for Todo
  const _accessActivityTracker = checkuserAccess("myEvents", _storeData.login); //Activity Tracker
  const [showTodo, setShowTodo] = useState(
    _accessTodo.props.read === true ? true : false
  );
  const [showActivityTracker, setShowActivityTracker] = useState(
    _accessActivityTracker.props.read === true ? true : false
  );

  if(showTodo === true && showActivityTracker === false){
    tabMenu = onlytodo
    // Headername ='To Do'
    // Activetab ='todo'
    // showheadertab = false
  }else if(showActivityTracker === true && showTodo === false){
    tabMenu = onlycalender
    // Headername ='Calendar'
    // Activetab ='calendar'
    // showheadertab =false
  }else if (showTodo ===true && showActivityTracker === true){
    tabMenu = bothtabMenu
    // Headername ='Calendar'
    // Activetab ='calendar'
    showheadertab =true
  }

  return (
    <div className="ActivityCalender-container main-containerListing">
      <Tabs tabMenu={tabMenu} header='Calendar' activeKey='calendar' />
      {showActivityTracker && (
          <Card bordered={false} className="Activity-Right-Card">
            {checkAgent() === false && 
            <div className="card-body-container">
              <div className="team-self-buttons">
                <button
                  className={`toggle-button ${TeamSelf ? 'active' : ''}`}
                  onClick={() => setTeamSelf(true)}
                >
                  <img src={TeamSelf ? person_white : person_black} alt="person" className="icon" />
                  Self
                </button>
                <button
                  className={`toggle-button ${!TeamSelf ? 'active' : ''}`}
                  onClick={() => setTeamSelf(false)}
                >
                  <img src={!TeamSelf ? group_white : group_black} alt="group" className="icon" />
                  Team
                </button>
              </div>
            
              <div className="date-picker-container">
                <Form.Item
                  name="fromDate"
                  className="form-item-name label-color"
                  rules={[{ required: false, message: 'Please select From Date' }]}
                >
                  <DatePicker
                    value={fromDate}
                    onChange={(date) => setFromDate(date)}
                    placeholder="From Date"
                    format="MM/DD/YYYY"
                    suffixIcon={<DownOutlined style={{ color: '#22c55e'}}/>}
                    className="custom-ant-picker"
                  />
                </Form.Item>

                <Form.Item
                  name="toDate"
                  className="form-item-name label-color"
                  rules={[{ required: false, message: 'Please select To Date' }]}
                >
                  <DatePicker
                    value={toDate}
                    onChange={(date) => setToDate(date)}
                    placeholder="To Date"
                    format="MM/DD/YYYY"
                    suffixIcon={<DownOutlined style={{ color: '#22c55e'}} />}
                    className="custom-ant-picker"
                  />
                </Form.Item>
              </div>
            </div>
            }
            {TeamSelf ? <Self /> : <Team />}
          </Card>)}
        {/* </Col> */}
        
    </div>
  );
};
export default App;
