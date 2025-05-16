import {Button, Typography} from 'antd'
import React,{useState,useEffect} from 'react'
import LeftButton from '../../icons/leftcalenderarrow.png'
import RightButton from '../../icons/rightcalenderarrow.png'
import EventCreateComponent from '../../../Contests/CalendarEvent'
import CalendarMobile from '../../../Contests/CalendarMobile'
import Addactivity from '../../icons/Addactivity.png'
import {stoageGetter} from '../../../../helpers'
import axios from 'axios'
import './EventCreate.css'
import moment from 'moment'
import { useHistory } from "react-router";
import { BsPlusSquare } from "react-icons/bs";


const EventCreate = ({monthData,yearData, getFunc, getdata}) => {

  const history = useHistory();

  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 620;

  const MonthContainer=[
    {'01':'Jan',
     '02':'Feb',
     '03':'Mar',
     '04':'Apr', 
     '05':'May',
     '06':'Jun',
     '07':'Jul',
     '08':'Aug',
     '09':'Sep',
     '10':'Oct',
     '11':'Nov',
     '12':'Dec'}];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleMOB, setIsModalVisibleMOB] = useState(false);


  const showModal = () => {
    // if(windowWidth > breakpoint){
      
    // }else{
    //   history.push({
    //     pathname: '/create-event-mobile',
    //     state: { detail: '' , click : 'data'}
    // });
    // }
    setIsModalVisible(true)
  };

  const _month = moment().format("MM")
  const [month,setMonth]=useState(_month)

  const [year,setYear]=useState(new Date().getFullYear())

  const eventClickBtnDec=()=>{
    let num =  Number(month) - 1
    if(month=='011'||month=='012'){
      let newMonth = num
      setMonth(newMonth)
      getFunc(newMonth)
      getFunc(newMonth,'past')
    }
    else{
      let newMonth = '0' + num
      setMonth(newMonth)
      getFunc(newMonth)
      getFunc(newMonth,'past')
    }
      
      if(month<=1){
        setMonth(12)
        setYear(year-1)
      }
  }
  const eventClickBtnInc= (e,data)=>{
    let num =  Number(month) + 1
    if(month=='09'||month=='010'||month=='011'){
      let newMonth = num
      setMonth(newMonth)
      getFunc(newMonth,'upcoming')
    }
    else{
      let newMonth = '0' + num
      setMonth(newMonth)
      getFunc(newMonth,'upcoming')
    }

    if(month>11){
      setMonth('0'+1);
      setYear(year+1)
    }
  }
  monthData(month);
  yearData(year);

  useEffect(()=>{
 },[isModalVisible]);

  
  return (
        <div className='EventCreate-dateChange'>
          <div className='EventCreate-Right'>
            <img src={LeftButton} 
            style={{backgroundSize:"100% 100%",cursor:"pointer" }} 
            alt="left-side-button"
            onClick={eventClickBtnDec}/>
            <p>
              {MonthContainer[0][month]} - {year}
            </p>
            <img src={RightButton} 
            style={{backgroundSize:"100% 100%",cursor:"pointer"}} 
            alt="right-side-button"
            onClick={eventClickBtnInc}/>
          </div>
          {
              isModalVisible == true ?
              <EventCreateComponent click={'data'} api={getFunc} getdata={getdata} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible}/>
              :""
            }

            {
              isModalVisibleMOB == true ?
              <CalendarMobile click={'data'} api={getFunc} getdata={getdata} isModalVisibleMOB={isModalVisibleMOB} setIsModalVisibleMOB={setIsModalVisibleMOB}/>
              :""
            }
          <div className='EventCreate-btn'>
            <BsPlusSquare
            style={{color: '#00AEC1', cursor:"pointer", marginLeft:'10px', fontSize: '22px', paddingRight:'5px'}} 
            onClick={showModal}/>
            <Typography style={{fontSize: '20px'}}>Event</Typography>
            
            {/* <img src={Addactivity} alt='Addactivity' 
            style={{backgroundSize: '100% 100%',cursor:"pointer"}} 
            onClick={showModal}/> */}
          </div>
            
        </div>
  )
}

export default EventCreate