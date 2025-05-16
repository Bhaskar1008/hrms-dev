import React,{useEffect, useState} from 'react';
import { Card, Col, Row } from 'antd';
import Todo from './RightSide-Todo/Todo';
import './ActivityCalender.css'
import Tabs from '../../components/Tab/Tab'
import { checkAgent ,checkuserAccess} from "../../helpers";
import { useDispatch, useSelector } from "react-redux";

const useWidowsSize=()=>{
    const [size,setSize]=useState([window.Width,window.height]);

    useEffect(() => {
      const handleChangeSize=()=>{
        setSize([window.innerWidth,window.innerHeight]);
      }
      window.addEventListener('resize',handleChangeSize);
    },[])
    return size;
}
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
    const [TeamSelf,setTeamSelf]=useState(true);
    const [width,height]=useWidowsSize();
    const [windowWidth, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;


    let _storeData = useSelector((state) => state);
    
    const _accessTodo = checkuserAccess("todoTask", _storeData.login); // TODO
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
  
    return(

        <div className="ActivityCalender-container main-containerListing">
            {/* { windowWidth < breakpoint && */}
                <Tabs tabMenu={tabMenu} header='To Do'  style={{ color: "#FF6D00" }} activeKey='todo' />
            {/* } */}
            {/* <Row style={{color:"#f7f7f7",marginTop:'20px'}} justify="center">
                <Col xl={14} md={14} sm={23} xs={23}>
                    
                </Col>
            </Row> */}
            <Card>
                        <Todo/>
                    </Card>
        </div>
    );
}
export default App;