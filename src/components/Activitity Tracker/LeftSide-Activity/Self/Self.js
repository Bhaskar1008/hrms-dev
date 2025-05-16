import React,{useState,useEffect, useRef} from 'react'
import {Typography} from 'antd'
import './Self.css'
import PastFutureData from '../History-showedData'
import DataField from '../DataField/DataField'
import EventCreate from '../EventCreate/EventCreate'
import axiosRequest from '../../../../axios-request/request.methods'
import {stoageGetter} from '../../../../helpers'
import moment from 'moment'

const Self = () => {
  const _date = new Date();
  const thisMonth = moment().format('MM');
  const [loader, setLoader] = useState(false)

  let currentMonth = _date.getMonth()+1;
  let num =  currentMonth.toString()
    let addMonth = '0' + num
    let CPaddMonth = '0' + num
  let currentyear = _date.getFullYear();
  const [month,setMonth]=useState(addMonth)
  const [CPmonth,setCPMonth]=useState(CPaddMonth)
  const [year,setyear]=useState(currentyear)
  const [PastDataContainer,setPastDataContainer]=useState();
  const [CurentOrPast,setCurentOrPast]=useState()
  const [pastEventLenght,setPastEventLength]=useState();
  const [getshow, setGetShow] = useState();
  const [currentpastdata, setCurrentPastData] = useState();
  const [currentpastdataln, setCurrentPastDataLn] = useState();
  const [pastdata, setPastData] = useState();
  const [pastdataln, setPastDataLn] = useState();
  const [DataContainer, setDataContainer] = useState();
  const [selectedmonth , setSelectedmonth] = useState(thisMonth);
  let getdata = false;
  const RemoveData=false; 

  let {id}=stoageGetter('user');
  const api = async (upcomingdate,upcoming)=>{
    // return
    let monthpass = thisMonth
    if(thisMonth === upcomingdate ){
      monthpass = thisMonth
      setSelectedmonth(monthpass)
    }else{
      monthpass = upcomingdate
      setSelectedmonth(monthpass)
    }
    console.log("Im Callleds forward",selectedmonth,thisMonth,upcoming)
    setLoader(true)
    let data = await axiosRequest.get(`user/fetch_appointments?teamdata=0&filter=${monthpass}/${year}&category=upcoming`);
    console.log("data API call ",data)
    if (data.statusCode === -1) {
      setLoader(false)
      setCurrentPastData(data.data);
      setPastDataContainer(data.data);

       setDataContainer(data.data)
       setCurrentPastDataLn(data?.data?.length)
    } else {
      // console.log("im api call else")
      // let datacheck = []
      // setPastDataContainer(datacheck);
      // setDataContainer(datacheck)
      setLoader(false)
    }
    
  }

  const currentpastapi = async (pastdate)=>{  
    let monthpass = thisMonth
    if(thisMonth === pastdate ){
      monthpass = thisMonth
      setSelectedmonth(monthpass)
    }else{
      monthpass = pastdate
      setSelectedmonth(monthpass)
    }
    console.log("Im Callleds backword",pastdate,thisMonth)
    setLoader(true)
    let data = await axiosRequest.get(`user/fetch_appointments?teamdata=0&filter=${monthpass}/${year}&category=past`);
    if (data.statusCode === -1) {
      setLoader(false)
      setPastData(data.data);
       setPastDataLn(data?.data?.length)
    } else {
      setLoader(false)
    }
    
  }

  useEffect(()=>{
    if(PastDataContainer){
      for(let i = 0; i < PastDataContainer?.length; i++){
        let a = 1+new Date(PastDataContainer[i].start_time_MS).getMonth();
        let b = 1+ new Date().getMonth();
        if(a==b){
          const filterCurrentData = PastDataContainer?.filter((element,index,arr)=>((1 + new Date(element?.start_time_MS).getDate()) <= (1 + new Date().getDate())))
          if(filterCurrentData){
            setPastEventLength(filterCurrentData?.length);
          }
        }
      }
    } 
  },[PastDataContainer])

  useEffect(()=>{
    // if(CPmonth.toString().length > 1){
      // setCPMonth(CPmonth)
       api(thisMonth);
      //}
  },[]);

  useEffect(()=>{
  //  if(CPmonth.toString().length >1){
    // setCPMonth(CPmonth)
    currentpastapi(thisMonth);
  //  }
  },[])
 
  return (
    <div className='Self-Container'>
      <EventCreate monthData={setCPMonth} yearData={setyear}  getFunc = {api}  getdata = {setGetShow} />
        <div className='eventChange'>
   

            {
              // PastDataContainer?.length >0 && 
              (CPmonth == 1+new Date().getMonth() && year == new Date().getFullYear())
              ?
              <PastFutureData Remove={RemoveData} CurentOrPast={setCurentOrPast} pastData={pastdata} teamPast= {pastdataln} teampastData = {pastdata}/>
              :""
            }
        </div>
        <div className='upcoming'>
          {
              (CPmonth == (1+new Date().getMonth()) && year == (new Date().getFullYear()))
              ?
              <p>Upcoming Events</p>
              :
              (CPmonth >= (1+new Date().getMonth()) && year >= (new Date().getFullYear())) ||
              (CPmonth < (1+ new Date().getMonth()) && year > (new Date().getFullYear()))
              ?
                <p>Upcoming Events</p>
                :
                <p>PAST</p>
          }
        </div>
        <DataField SelfMonthYear = {selectedmonth +'/'+ year}
          history={CurentOrPast}
          SelfHere='self'
          // ref={childRef}
          currentmonth={selectedmonth}
          getFunc={api}
          getdata = {getshow}
          Dataupdate={DataContainer}
        />
    </div>
  )
}

export default Self;