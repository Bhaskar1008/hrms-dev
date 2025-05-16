import React, { useEffect, useState } from 'react'
import './ProductionYearGraph.css'
import { Column, Line } from '@ant-design/charts'
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col ,Spin,Icon, message} from 'antd'
import { useDispatch, useSelector } from "react-redux";
import axiosRequest from "../../../axios-request/request.methods";
import { checkuserAccess, stoageGetter } from "../../../helpers";
import * as actions from "../../../store/actions/index";
import moment from 'moment';
import FullPageLoader from '../../FullPageLoader/FullPageLoader';
import { borderColor, display } from '@mui/system';



const ProductionYearGraph = () => {

  
  let data = [
    {
      activity: 10,
      amount: 100,
      category: "GPW",
      day: 5,
      month: "Sat, 5",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 5,
      month: "Sat, 5",
      name: "GWP Achieved (in ₹)"
    },

    {
      activity: 0,
      amount: 340,
      category: "GPW",
      day: 6,
      month: "Sat, 6",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 250,
      category: "GPW",
      day: 6,
      month: "Sat, 6",
      name: "GWP Achieved (in ₹)"
    },

    {
      activity: 0,
      amount: 240,
      category: "GPW",
      day: 7,
      month: "Sat, 7",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 7,
      month: "Sat, 7",
      name: "GWP Achieved (in ₹)"
    },

    {
      activity: 0,
      amount: 240,
      category: "GPW",
      day: 8,
      month: "Sat, 8",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 8,
      month: "Sat, 8",
      name: "GWP Achieved (in ₹)"
    },


    {
      activity: 0,
      amount: 240,
      category: "GPW",
      day: 10,
      month: "Sat, 10",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 10,
      month: "Sat, 10",
      name: "GWP Achieved (in ₹)"
    },

    {
      activity: 0,
      amount: 240,
      category: "GPW",
      day: 11,
      month: "Sat, 11",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 11,
      month: "Sat, 11",
      name: "GWP Achieved (in ₹)"
    },

    {
      activity: 0,
      amount: 240,
      category: "GPW",
      day: 12,
      month: "Sat, 12",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 12,
      month: "Sat, 12",
      name: "GWP Achieved (in ₹)"
    },

    {
      activity: 0,
      amount: 240,
      category: "GPW",
      day: 13,
      month: "Sat, 13",
      name: "GWP Commitment (in ₹)"
    },
    {
      activity: 0,
      amount: 150,
      category: "GPW",
      day: 13,
      month: "Sat, 13",
      name: "GWP Achieved (in ₹)"
    },
  ];
  const id = useSelector((state) => state?.login?.user?.id);
  const [GWPData, SetGWPData] = useState([]);
  const [GWPGraph, SetGWPGraph] = useState([]);
  const [finalBudgetConfig, setFinalBudgetConfig] = useState(null);
  const [finalBudgetData, setFinalBudgetData] = useState([]);
  const [currentIDTeam, setCurrentIDTeam] = useState(id);
  const [openloader,setopenloader] = useState(false)


  const loginStatte = useSelector((state) => state?.login);
  
  var Graphdata = null
  // " " + login_user_data.lastName;



  useEffect(() => {
    // GetGraph()
    SetGWPGraph([...data]);
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const budgetConfigDat = [];
      // sentence.toLowerCase()
      setopenloader(true)
      getGraphdata(cb=>{
       let Objectcurrentmontt = cb
       let currentyear = moment().year()
      let preyear = currentyear - 1
      var dynamicData = null
      var dynamicData2 = null

      if (Objectcurrentmontt.hasOwnProperty(currentyear)) {
         dynamicData = Objectcurrentmontt[currentyear];
      }
       if (Objectcurrentmontt.hasOwnProperty(preyear)) {
         dynamicData2 = Objectcurrentmontt[preyear];
        
      }

      let temparray = []
      dynamicData2.forEach((element,index) => {
        temparray.push({
          monthvalue:element,
          Month:monthsdata(index),
          currentYear:preyear,
        })
      });
      dynamicData.forEach((element,index) => {
        temparray.push({
          monthvalue:element,
          Month:monthsdata(index),
          currentYear:currentyear,
        })
      });
            
       temparray?.forEach((item, index) => {
        if (item.currentYear === preyear) {
          budgetConfigDat.push({
            name: item.currentYear.toString(),
            val: parseInt(item.monthvalue),
            day: item.Month,
          });
        } else {
          budgetConfigDat.push({
            name: item.currentYear.toString(),
            val: parseInt(item.monthvalue),
            day: item.Month,
          });
        }
      });
      console.log({budgetConfigDat});
      setFinalBudgetConfig({
        data: budgetConfigDat,
        isGroup: true,
        xField: "day",
        yField: "val",
        seriesField: "name",
        color: ["#4AC6BB", "#6740ae"],
        legend: {
          visible: false,
        },
      });
      setFinalBudgetData(data);
      setopenloader(false)
        
      })
      // GWPGraph?.forEach((item, index) => {
      //   console.log("Item Data",item)
      //   if (item.name == "GWP Commitment (in ₹)") {
      //     budgetConfigDat.push({
      //       name: "Commitment",
      //       val: parseInt(item.amount),
      //       day: item.month,
      //     });
      //   } else {
      //     budgetConfigDat.push({
      //       name: "Achieved",
      //       val: parseInt(item.amount),
      //       day: item.month,
      //     });
      //   }
      // });
    });
  }, [GWPGraph]);


  const monthsdata = (index) =>{ 
    if(index === 0){
      return 'JAN'
    }else if(index === 1){
      return 'FEB'
    }else if(index === 2){
      return 'MAR'
    }else if(index === 3){
      return 'APR'
    }else if(index === 4){
      return 'MAY'
    }else if(index === 5){
      return 'JUN'
    }else if(index === 6){
      return 'JUL'
    }else if(index === 7){
      return 'AUG'
    }else if(index === 8){
      return 'SEP'
    }else if(index === 9){
      return 'OCT'
    }else if(index === 10){
      return 'NOV'
    }else if(index === 11){
      return 'DEC'
    }
  }


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const date = new Date();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  const CurrentDate = `${month}    ${day},  ${year}`
  // const GetGraph = async () => {
  //   try {
  //     let res = await axiosRequest.get(`user/fetch_goals/${currentIDTeam}`, {
  //       secure: true,
  //     });
  //     console.log("jhbjnkm,.", res);
  //     if (res.data.graph_data) {
         // let responseArray = [...res.data.graph_data];
  //       SetGWPGraph([...responseArray]);
  //     }
  //   } catch (error) {
  //     // console.log(error);
  //   }
  // };

  // const sampledata = [
  //   {
  //     type: "Jan",

  //     value: 200
  //   },
  //   {
  //     type: "Feb",
  //     value: 300
  //   },
  //   {
  //     type: "Mar",
  //     value: 100
  //   },
  //   {
  //     type: "Apr",

  //     value: 200
  //   },
  //   {
  //     type: "May",
  //     value: 300
  //   },
  //   {
  //     type: "Jun",
  //     value: 100
  //   },
  //   {
  //     type: "Jul",
  //     value: 230
  //   },
  //   {
  //     type: "Aug",
  //     value: 450
  //   },
  //   {
  //     type: "Sep",
  //     value: 170
  //   },
  //   {
  //     type: "Oct",
  //     value: 150
  //   },
  //   {
  //     type: "Nov",
  //     value: 250
  //   },
  //   {
  //     type: "Dec",
  //     value: 350
  //   }
  // ];

  // const config = {
  //   data,
  //   loading: data.length === 0,
  //   xField: "type",
  //   yField: "value",
  //   isGroup: true,
  //   seriesField: "type",
  //   color: ["#4AC6BB", "#1D428A"],
  //   yAxis: {
  //     label: {
  //       formatter: (v) => v
  //     }
  //   },
  //   xAxis: true,
  //   height: 200,
  //   autoFit: false,
  //   legend: {
  //     position: "top",
  //     flipPage: false
  //   }
  // };
  const sampleData = [
    { month: 'JAN', value: 9, year: '2024' },
    { month: 'JAN', value: 6.5, year: '2025' },
    { month: 'FEB', value: 8.2, year: '2024' },
    { month: 'FEB', value: 3.1, year: '2025' },
    { month: 'MAR', value: 3.8, year: '2024' },
    { month: 'MAR', value: 4.5, year: '2025' },
    { month: 'APR', value: 0.9, year: '2024' },
    { month: 'APR', value: 8.1, year: '2025' },
    { month: 'MAY', value: 5.3, year: '2024' },
    { month: 'MAY', value: 6.1, year: '2025' },
    { month: 'JUN', value: 8.6, year: '2024' },
    { month: 'JUN', value: 8.1, year: '2025' },
    { month: 'JUL', value: 2.7, year: '2024' },
    { month: 'JUL', value: 5.2, year: '2025' },
    { month: 'AUG', value: 4.6, year: '2024' },
    { month: 'AUG', value: 8.4, year: '2025' },
    { month: 'SEP', value: 1.1, year: '2024' },
    { month: 'SEP', value: 2.0, year: '2025' },
    { month: 'OCT', value: 7.3, year: '2024' },
    { month: 'OCT', value: 4.4, year: '2025' },
    { month: 'NOV', value: 2.9, year: '2024' },
    { month: 'NOV', value: 7.5, year: '2025' },
    { month: 'DEC', value: 5.1, year: '2024' },
    { month: 'DEC', value: 9.0, year: '2025' },
  ];
  
  const chartConfig = {
    data: sampleData,
    isGroup: true,
    xField: 'month',
    yField: 'value',
    seriesField: 'year',
    yAxis: {
      label: {
        formatter: (v) => `${v}M`,
      },
    },
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    color: ({ year }) => (year === '2024' ? '#00AEC1' : '#FF6D00'),
    legend: {
      position: 'top-right',
    },
    tooltip: {
      formatter: (datum) => {
        return { name: datum.year, value: `${datum.value}M` };
      },
    },
  };
  

  const getGraphdata = async(cb= null) =>{
    let agentchannel = loginStatte?.user?.channelCode?.channelName.toLowerCase()
    let currentyear = moment().year()
    let preyear = currentyear - 1
    setopenloader(true)
    if(agentchannel === 'agent'){
    let response = await axiosRequest.get(`user/graph/${agentchannel}/ytoy/production?agentCode=${loginStatte?.user?.agentCode}&yearFrom=${preyear}&yearTo=${currentyear}`)

    if(response?.statusCode ===  -1){
      Graphdata = response?.data?.obj
      setopenloader(false)
      cb(Graphdata)
    }else{
      let datasendincallback = {
        [currentyear]:[0,0,0,0,0,0,0,0,0,0,0,0],
        [preyear]:[0,0,0,0,0,0,0,0,0,0,0,0],
    }
    cb(datasendincallback)
    }
  }else{
    let datasendincallback = {
        [currentyear]:[0,0,0,0,0,0,0,0,0,0,0,0],
        [preyear]:[0,0,0,0,0,0,0,0,0,0,0,0],
    }
    cb(datasendincallback)
  }
  }

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 50,
        color:'#472c77',
        fontWeight:700,
      }}
      spin
    />
  );
  const currentYear = new Date().getFullYear();
  const previousYear = new Date().getFullYear() - 1;

  return (
    <>
  {/* <FullPageLoader fromapploader={openloader}></FullPageLoader> */}
      
      <div className='production-graph'>
        {/* <Row>
          <Col
            span={24}
          >
            <div className='agent-data' style={{display:'flex',justifyContent: 'space-between', alignItems: 'baseline'}}>
              <div style={{display:'flex'}}>
                <h4>Agent Production Year on Year</h4>
                <button style={{color:'#00AEC1' ,borderColor:'#00AEC1'}} disabled>Learn More</button>
              </div>
              <div className='agent-data' style={{display:'flex',justifyContent: 'space-between'}}>
                <div className='agent-data' style={{justifyContent: 'space-between', alignItems: 'center', marginRight: '15px'}}>
                  <div className='circle-year' style={{backgroundColor: '#00AEC1'}}></div>
                  <h1 style={{fontSize: '16px',fontWeight:'900'}}>{previousYear}</h1>
                </div>
                <div className='agent-data' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                  <div className='circle-year' style={{backgroundColor: '#FF6D00'}}></div>
                  <h1 style={{fontSize: '16px',fontWeight:'900'}}>{currentYear}</h1>
                </div>
              </div>
            </div>

          </Col>
        </Row> */}
        <Row>
  <Col span={24}>
    <div
      className="agent-data-header"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      {/* Left side: Title + Button */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <h4 style={{ margin: 0 }}>Agent Production Year on Year</h4>
        <button
          style={{
            color: '#00AEC1',
            borderColor: '#00AEC1',
            border: '1px solid',
            borderRadius: '999px', // <-- capsule shape
            padding: '4px 16px',
            background: 'transparent',
            fontSize: '14px',
            height: '32px',
            cursor: 'default',
          }}
          disabled
        >
          Learn More
        </button>

      </div>

      {/* Right side: Year Legends */}
      {/* <div
        className="agent-year-legend"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div
            className="circle-year"
            style={{
              backgroundColor: '#00AEC1',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
            }}
          ></div>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>{previousYear}</span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}
        >
          <div
            className="circle-year"
            style={{
              backgroundColor: '#FF6D00',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
            }}
          ></div>
          <span style={{ fontWeight: 700, fontSize: '14px' }}>{currentYear}</span>
        </div>
      </div> */}
    </div>
  </Col>
</Row>

        {openloader === true ?
        <div style={{display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                    marginTop: '10%'}}>
                <Spin spinning={openloader} indicator={antIcon}></Spin> 
        </div>:
        <>
          {/* {finalBudgetConfig && <Column style={{ height: '260px' }} {...finalBudgetConfig} />} */}
         <Column {...chartConfig} style={{ height: 300 }} />

        </>
        }
        {/* <Column {...config} /> */}
      </div>

    </>
  )
}

export default ProductionYearGraph