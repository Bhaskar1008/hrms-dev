
import { Button, Card,Progress} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import './ActiveContest.css';
import {useHistory} from 'react-router-dom';


const ActiveContest=()=>{
    let{innerWidth:width,innerHeight:height}=window;
let history=useHistory()
const ActiveContestRoute=()=>{
  history.push("/rewardscorner/contests/activecontestdetails")
}
    return( 
 
        <div 
        className="active-contest-main-class"
        >
 <Card 
 className="contest1-card-style"
 
 
bordered="true"
bodyStyle={{backgroundColor:"white",
marginLeft:width<="374"?"-25px":width<="424"?"-25px":width<="767"?"-16px":"0px",
marginRight:width<="374"?"-23px":width<="424"?"-18px":width<="767"?"-16px":"0px",
}}
>
       <div className="contest1-card-content">
           <div className="contest1-card-row">
           <p className="text-underline-contest1">Contest No: 1</p>
        
       <Progress percent={80} size="large"
       className="contest1-single-progress-bar"
       
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"15px":width<="1023"?"20px":"23px"}
       strokeLinecap="square"
       />
       <p
       className="progressbar-contest1-percentage-text"
     
       >80%</p>
           </div>
      
       <p className="text-date-style">20th May to 30th Jun</p>
     </div>
     <p
     className="myProgress-text"
     >My Progress</p>
     <Progress percent={80} size="large"
     className="contest1-double-progress-bar-1"
    
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"20px":width<="424"?"20px":width<="767"?"22px":width<="1023"?"27px":"34px"}
       strokeLinecap="square"
       />
       <Progress percent={40} size="large"
          className="contest1-double-progress-bar-2"
    
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"20px":width<="424"?"20px":width<="767"?"22px":width<="1023"?"27px":"34px"}
       strokeLinecap="square"
       />
       <div className="leaderboard-style">
           <p className="leaderboard-text">Leaderboard</p>
       </div>
       <div className="leaderboard-colouredpart">
         <div className="leaderboard-header">
         <p className="leaderboard-title-text">Position</p>
           <p className="leaderboard-title-text">Name</p>
           <p className="leaderboard-title-text">Score</p>
           <p className="leaderboard-title-text">Stats</p>
           <p className="leaderboard-title-text">Information</p>
           <p className="leaderboard-title-text">Actions</p>

         </div>
          
           
         
         
       </div>
       <div>
       <div className="leaderboard-content">
           <div className="leaderboard-content-flex">
           <div 
           className="leaderboard-srno-row-flex"
         
          >
            <div 
            className="leaderboard-srno-alignment"
            
            >
            <p className="leaderboard-content-text">1st</p>
            </div>
             
               </div>
               <div
               className="leaderboard-name-row-flex"
               
           
             >
               
               <p 
             className="leaderboard-content-name "
               >Sagar Sonawane</p>
             
               </div>
               <div
               className="leaderboard-score-row-flex"
       
             >
              
               <p
     className="leaderboard-content-score"
     >1827</p>
    
               </div>
               <div 
               className="leaderboard-progress-row-flex"
            
             >
                <div className="stats-flex-column">
                <Progress percent={80} size="large"
                className="leaderboard-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
            <Progress percent={80} size="large"
             className="leaderboard-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
                </div>
            
               </div>
               <div 
               className="leaderboard-information-row-flex"
          
             >
                 <div
                 className="leaderboard-information-column"
                
                  >
                 <p className="leaderboard-content-text-login">Logins:1600</p>
            <p className="leaderboard-content-text-insurance">Insurance:1534</p>
            </div>
               </div>
               <div 
               className="leaderboard-button-row-flex"
           
             >
               <div
               className="leaderboard-button-alignment-style"
         
               >
                 <button
                  className="leaderboard-button-style"
                  onClick={ActiveContestRoute}
                 >View Details</button>
                
         </div>
               </div>   
           </div> 
           
         </div>
        
         <div className="leaderboard-content">
           <div className="leaderboard-content-flex">
           <div 
           className="leaderboard-srno-row-flex"
         
          >
            <div 
            className="leaderboard-srno-alignment"
            
            >
            <p className="leaderboard-content-text">2nd</p>
            </div>
             
               </div>
               <div
               className="leaderboard-name-row-flex"
               
           
             >
               
               <p 
             className="leaderboard-content-name "
               >Gaurav Sane</p>
             
               </div>
               <div
               className="leaderboard-score-row-flex"
       
             >
              
               <p
     className="leaderboard-content-score"
     >1827</p>
    
               </div>
               <div 
               className="leaderboard-progress-row-flex"
            
             >
                <div className="stats-flex-column">
                <Progress percent={80} size="large"
                className="leaderboard-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
            <Progress percent={80} size="large"
             className="leaderboard-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
                </div>
            
               </div>
               <div 
               className="leaderboard-information-row-flex"
          
             >
                 <div
                 className="leaderboard-information-column"
                
                  >
                 <p className="leaderboard-content-text-login">Logins:1600</p>
            <p className="leaderboard-content-text-insurance">Insurance:1534</p>
            </div>
               </div>
               <div 
               className="leaderboard-button-row-flex"
           
             >
               <div
               className="leaderboard-button-alignment-style"
         
               >
                 <button
                  className="leaderboard-button-style"
                  onClick={ActiveContestRoute}
                 >View Details</button>
                
         </div>
               </div>   
           </div> 
           
         </div>
         <div className="leaderboard-content">
           <div className="leaderboard-content-flex">
           <div 
           className="leaderboard-srno-row-flex"
         
          >
            <div 
            className="leaderboard-srno-alignment"
            
            >
            <p className="leaderboard-content-text">3rd</p>
            </div>
             
               </div>
               <div
               className="leaderboard-name-row-flex"
               
           
             >
               
               <p 
             className="leaderboard-content-name "
               >Praful Shinde</p>
             
               </div>
               <div
               className="leaderboard-score-row-flex"
       
             >
              
               <p
     className="leaderboard-content-score"
     >1827</p>
    
               </div>
               <div 
               className="leaderboard-progress-row-flex"
            
             >
                <div className="stats-flex-column">
                <Progress percent={80} size="large"
                className="leaderboard-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
            <Progress percent={80} size="large"
             className="leaderboard-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
                </div>
            
               </div>
               <div 
               className="leaderboard-information-row-flex"
          
             >
                 <div
                 className="leaderboard-information-column"
                
                  >
                 <p className="leaderboard-content-text-login">Logins:1600</p>
            <p className="leaderboard-content-text-insurance">Insurance:1534</p>
            </div>
               </div>
               <div 
               className="leaderboard-button-row-flex"
           
             >
               <div
               className="leaderboard-button-alignment-style"
         
               >
                 <button
                  className="leaderboard-button-style"
                  onClick={ActiveContestRoute}
                 >View Details</button>
                
         </div>
               </div>   
           </div> 
           
         </div>
         <div className="leaderboard-content">
           <div className="leaderboard-content-flex">
           <div 
           className="leaderboard-srno-row-flex"
         
          >
            <div 
            className="leaderboard-srno-alignment"
            
            >
            <p className="leaderboard-content-text">4th</p>
            </div>
             
               </div>
               <div
               className="leaderboard-name-row-flex"
               
           
             >
               
               <p 
             className="leaderboard-content-name "
               >Abhang Pathak</p>
             
               </div>
               <div
               className="leaderboard-score-row-flex"
       
             >
              
               <p
     className="leaderboard-content-score"
     >1827</p>
    
               </div>
               <div 
               className="leaderboard-progress-row-flex"
            
             >
                <div className="stats-flex-column">
                <Progress percent={80} size="large"
                className="leaderboard-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
            <Progress percent={80} size="large"
             className="leaderboard-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
                </div>
            
               </div>
               <div 
               className="leaderboard-information-row-flex"
          
             >
                 <div
                 className="leaderboard-information-column"
                
                  >
                 <p className="leaderboard-content-text-login">Logins:1600</p>
            <p className="leaderboard-content-text-insurance">Insurance:1534</p>
            </div>
               </div>
               <div 
               className="leaderboard-button-row-flex"
           
             >
               <div
               className="leaderboard-button-alignment-style"
         
               >
                 <button
                  className="leaderboard-button-style"
                  onClick={ActiveContestRoute}
                 >View Details</button>
                
         </div>
               </div>   
           </div> 
           
         </div>
         <div className="leaderboard-content">
           <div className="leaderboard-content-flex">
           <div 
           className="leaderboard-srno-row-flex"
         
          >
            <div 
            className="leaderboard-srno-alignment"
            
            >
            <p className="leaderboard-content-text">5th</p>
            </div>
             
               </div>
               <div
               className="leaderboard-name-row-flex"
               
           
             >
               
               <p 
             className="leaderboard-content-name "
               >Jagdish Sisode</p>
             
               </div>
               <div
               className="leaderboard-score-row-flex"
       
             >
              
               <p
     className="leaderboard-content-score"
     >1827</p>
    
               </div>
               <div 
               className="leaderboard-progress-row-flex"
            
             >
                <div className="stats-flex-column">
                <Progress percent={80} size="large"
                className="leaderboard-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
            <Progress percent={80} size="large"
             className="leaderboard-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"10px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
                </div>
            
               </div>
               <div 
               className="leaderboard-information-row-flex"
          
             >
                 <div
                 className="leaderboard-information-column"
                
                  >
                 <p className="leaderboard-content-text-login">Logins:1600</p>
            <p className="leaderboard-content-text-insurance">Insurance:1534</p>
            </div>
               </div>
               <div 
               className="leaderboard-button-row-flex"
           
             >
               <div
               className="leaderboard-button-alignment-style"
         
               >
                 <button
                  className="leaderboard-button-style"
                  onClick={ActiveContestRoute}
                 >View Details</button>
                
         </div>
               </div>   
           </div> 
           
         </div>
        
          
       </div>
      
       
</Card>
<div
className="contest-info-card-alignment"

>
<Card 
className="contest-info-card-style"

bordered="true"
bodyStyle={{backgroundColor:"white",
marginLeft:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
marginRight:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
}}
>
<div className="contest1-card-content">
           <div className="contest1-card-row">
           <p className="text-underline">Contest No: 2</p>
        
       <Progress percent={30} size="large"
       className="contest-info-progressbar-style"
        strokeColor="#ffcc00"
       type="line"

       strokeWidth={
        width<="374"?"12px":width<="424"?"12.5px":width<="767"?"16px":width<="1023"?"17px":"23px"
    }
       strokeLinecap="square"
       />
        <p
       className="progressbar-percentage-text"
     
       >30%</p>
           </div>
      
       <p className="text-date-style">1st Jun to 30th Jun</p>
     </div>
     </Card>

</div>
<div
className="contest-info-card-alignment"

>
<Card 
className="contest-info-card-style"

bordered="true"
bodyStyle={{backgroundColor:"white",
marginLeft:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
marginRight:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
}}
>
<div className="contest1-card-content">
           <div className="contest1-card-row">
           <p className="text-underline">Contest No: 3</p>
        
       <Progress percent={50} size="large"
       className="contest-info-progressbar-style"
        strokeColor="#ffcc00"
       type="line"

       strokeWidth={
        width<="374"?"12px":width<="424"?"12.5px":width<="767"?"16px":width<="1023"?"17px":"23px"
    }
       strokeLinecap="square"
       />
        <p
       className="progressbar-percentage-text"
     
       >50%</p>
           </div>
      
       <p className="text-date-style">10th Aug to 15th Aug</p>
     </div>
     </Card>

</div>
<div
className="contest-info-card-alignment"

>
<Card 
className="contest-info-card-style"

bordered="true"
bodyStyle={{backgroundColor:"white",
marginLeft:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
marginRight:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
}}
>
<div className="contest1-card-content">
           <div className="contest1-card-row">
           <p className="text-underline">Contest No: 4</p>
        
       <Progress percent={40} size="large"
       className="contest-info-progressbar-style"
        strokeColor="#ffcc00"
       type="line"

       strokeWidth={
        width<="374"?"12px":width<="424"?"12.5px":width<="767"?"16px":width<="1023"?"17px":"23px"
    }
       strokeLinecap="square"
       />
        <p
       className="progressbar-percentage-text"
     
       >40%</p>
           </div>
      
       <p className="text-date-style">16th Nov to 18th Nov</p>
     </div>
     </Card>

</div>
</div>






































/* <div
className="contest-info-card-alignment"

>
<Card 
className="contest-info-card-style"

bordered="true"
bodyStyle={{backgroundColor:"white",
marginLeft:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
marginRight:width<="374"?"-20px":width<="424"?"-10px":width<="767"?"-16px":"0px",
}}
>
<div className="contest1-card-content">
           <div className="contest1-card-row">
           <p className="text-underline">Contest No: 4</p>
        
       <Progress percent={40} size="large"
       className="contest-info-progressbar-style"
        strokeColor="#ffcc00"
       type="line"

       strokeWidth={
        width<="374"?"12px":width<="424"?"12.5px":width<="767"?"16px":width<="1023"?"17px":"23px"
    }
       strokeLinecap="square"
       />
        <p
       className="progressbar-percentage-text"
     
       >40%</p>
           </div>
      
       <p className="text-date-style">16th Nov to 18th Nov</p>
     </div>
     </Card>

</div> */














//         <div style={{display:"flex",
//         flexDirection:"column",
//         // height:"100vh",
        
//         marginTop:"50px",marginLeft:"50px"
//         }}>
        
//   <div>
// <Card style={{width:"95%",height:"800px",borderRadius:"10px",borderTopRightWidth:"2px"
//  ,borderWidth:"1px",
//  boxShadow:"0px 0px 0px 0px",
//  overflow:"hidden",
//  flex: 1,
//  flexDirection: "column",
//  /* margin-top: 20px;
//  margin-right: 30px; */
//  display: "flex"
// //  display:"flex",
// //  flexDirection:"column",
 
// }}
// bordered="true"
// bodyStyle={{backgroundColor:"white"}}
// >
//        <div className="contest1-card-content">
//            <div className="contest1-card-row">
//            <p className="text-underline">Contest No: 1</p>
        
//        <Progress percent={80} size="large"
//        style={{
//            width:"170px",
//            fontSize:"0px",
//            fontWeight:"bold",
//            marginLeft:"30px",
//            color:"#545A5E",
//            marginTop:"3px"
//           //  backgroundColor:"#545A5E"
//        }}
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//        <p
//        className="progressbar-percentage-text"
     
//        >80%</p>
//            </div>
      
//        <p className="text-date-style">20th May to 30th Jun</p>
//      </div>
//      <p
//      className="myProgress-text"
//      >My Progress</p>
//      <Progress percent={80} size="large"
//        style={{
//            width:"670px",
//            fontSize:"0px",
//            fontWeight:"bold",
          
          
//        }}
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="34px"
//        strokeLinecap="square"
//        />
//        <Progress percent={40} size="large"
//        style={{
//            width:"670px",
//            fontSize:"0px",
//            fontWeight:"bold",
//            marginTop:"15px"
          
          
//        }}
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="34px"
//        strokeLinecap="square"
//        />
//        <div className="leaderboard-style">
//            <p className="leaderboard-text">Leaderboard</p>
//        </div>
//        <div className="leaderboard-colouredpart">
//          <div className="leaderboard-header">
//          <p className="leaderboard-title-text">Position</p>
//            <p className="leaderboard-title-text">Name</p>
//            <p className="leaderboard-title-text">Score</p>
//            <p className="leaderboard-title-text">Stats</p>
//            <p className="leaderboard-title-text">Information</p>
//            <p className="leaderboard-title-text">Actions</p>

//          </div>
          
           
         
         
//        </div>
//        <div>
//        <div className="leaderboard-content">
//            <div className="leaderboard-content-flex">
//            <div 
//            className="leaderboard-srno-row-flex"
         
//           >
//             <div 
//             className="leaderboard-srno-alignment"
//             // style={{
//             //   paddingLeft:"8px"
//             // }}
//             >
//             <p className="leaderboard-content-text">1st</p>
//             </div>
             
//                </div>
//                <div
//                className="leaderboard-name-row-flex"
               
           
//              >
               
//                <p 
//              className="leaderboard-content-name "
//                >Sagar Sonawane</p>
             
//                </div>
//                <div
//                className="leaderboard-score-row-flex"
       
//              >
              
//                <p
//      className="leaderboard-content-score"
//      >1827</p>
    
//                </div>
//                <div 
//                className="leaderboard-progress-row-flex"
            
//              >
//                 <div className="stats-flex-column">
//                 <Progress percent={80} size="large"
//                 className="leaderboard-progressbar-top-style"
//              strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//             <Progress percent={80} size="large"
//              className="leaderboard-progressbar-bottom-style"
    
  
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//                 </div>
            
//                </div>
//                <div 
//                className="leaderboard-information-row-flex"
          
//              >
//                  <div
//                  className="leaderboard-information-column"
                
//                   >
//                  <p className="leaderboard-content-text">Logins:1600</p>
//             <p className="leaderboard-content-text">Insurance:1534</p>
//             </div>
//                </div>
//                <div 
//                className="leaderboard-button-row-flex"
           
//              >
//                <div
//                className="leaderboard-button-alignment-style"
         
//                >
//                 <Button

//                 className="leaderboard-button-style"
        
//       size="medium"
//          >View Details</Button>
//          </div>
//                </div>   
//            </div> 
//          </div>
//          <div className="leaderboard-content">
//            <div className="leaderboard-content-flex">
//            <div 
//            className="leaderboard-srno-row-flex"
         
//           >
//               <div 
//             className="leaderboard-srno-alignment">

// <p className="leaderboard-content-text">2nd</p>
//             </div>
               
//                </div>
//                <div
//                className="leaderboard-name-row-flex"
               
           
//              >
               
//                <p 
//              className="leaderboard-content-name "
//                >Gaurav Sane</p>
             
//                </div>
//                <div
//                className="leaderboard-score-row-flex"
       
//              >
              
//                <p
//      className="leaderboard-content-score"
//      >1827</p>
    
//                </div>
//                <div 
//                className="leaderboard-progress-row-flex"
            
//              >
//                 <div className="stats-flex-column">
//                 <Progress percent={30} size="large"
//                 className="leaderboard-progressbar-top-style"
//              strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//             <Progress percent={60} size="large"
//              className="leaderboard-progressbar-bottom-style"
    
  
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//                 </div>
            
//                </div>
//                <div 
//                className="leaderboard-information-row-flex"
          
//              >
//                  <div
//                  className="leaderboard-information-column"
                
//                   >
//                  <p className="leaderboard-content-text">Logins:1600</p>
//             <p className="leaderboard-content-text">Insurance:1534</p>
//             </div>
//                </div>
//                <div 
//                className="leaderboard-button-row-flex"
           
//              >
//                <div
//                className="leaderboard-button-alignment-style"
         
//                >
//                 <Button

//                 className="leaderboard-button-style"
        
//       size="medium"
//          >View Details</Button>
//          </div>
//                </div>   
//            </div> 
//          </div>
//          <div className="leaderboard-content">
//            <div className="leaderboard-content-flex">
//            <div 
//            className="leaderboard-srno-row-flex"
         
//           >
//                <div 
//             className="leaderboard-srno-alignment">

//                 <p className="leaderboard-content-text">3rd</p>
//                 </div>
//                </div>
//                <div
//                className="leaderboard-name-row-flex"
               
           
//              >
               
//                <p 
//              className="leaderboard-content-name "
//                >Praful Shinde</p>
             
//                </div>
//                <div
//                className="leaderboard-score-row-flex"
       
//              >
              
//                <p
//      className="leaderboard-content-score"
//      >1827</p>
    
//                </div>
//                <div 
//                className="leaderboard-progress-row-flex"
            
//              >
//                 <div className="stats-flex-column">
//                 <Progress percent={35} size="large"
//                 className="leaderboard-progressbar-top-style"
//              strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//             <Progress percent={65} size="large"
//              className="leaderboard-progressbar-bottom-style"
    
  
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//                 </div>
            
//                </div>
//                <div 
//                className="leaderboard-information-row-flex"
          
//              >
//                  <div
//                  className="leaderboard-information-column"
                
//                   >
//                  <p className="leaderboard-content-text">Logins:1600</p>
//             <p className="leaderboard-content-text">Insurance:1534</p>
//             </div>
//                </div>
//                <div 
//                className="leaderboard-button-row-flex"
           
//              >
//                <div
//                className="leaderboard-button-alignment-style"
         
//                >
//                 <Button

//                 className="leaderboard-button-style"
        
//       size="medium"
//          >View Details</Button>
//          </div>
//                </div>   
//            </div> 
//          </div>
//          <div className="leaderboard-content">
//            <div className="leaderboard-content-flex">
//            <div 
//            className="leaderboard-srno-row-flex"
         
//           >
//    <div 
//             className="leaderboard-srno-alignment">

//                 <p className="leaderboard-content-text">4th</p>
//               </div>
//                </div>
//                <div
//                className="leaderboard-name-row-flex"
               
           
//              >
               
//                <p 
//              className="leaderboard-content-name "
//                >Abhang Pathak</p>
             
//                </div>
//                <div
//                className="leaderboard-score-row-flex"
       
//              >
              
//                <p
//      className="leaderboard-content-score"
//      >1827</p>
    
//                </div>
//                <div 
//                className="leaderboard-progress-row-flex"
            
//              >
//                 <div className="stats-flex-column">
//                 <Progress percent={78} size="large"
//                 className="leaderboard-progressbar-top-style"
//              strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//             <Progress percent={42} size="large"
//              className="leaderboard-progressbar-bottom-style"
    
  
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//                 </div>
            
//                </div>
//                <div 
//                className="leaderboard-information-row-flex"
          
//              >
//                  <div
//                  className="leaderboard-information-column"
                
//                   >
//                  <p className="leaderboard-content-text">Logins:1600</p>
//             <p className="leaderboard-content-text">Insurance:1534</p>
//             </div>
//                </div>
//                <div 
//                className="leaderboard-button-row-flex"
           
//              >
//                <div
//                className="leaderboard-button-alignment-style"
         
//                >
//                 <Button

//                 className="leaderboard-button-style"
        
//       size="medium"
//          >View Details</Button>
//          </div>
//                </div>   
//            </div> 
//          </div>
     
//          <div className="leaderboard-content">
//            <div className="leaderboard-content-flex">
//            <div 
//            className="leaderboard-srno-row-flex"
         
//           >
//                <div 
//             className="leaderboard-srno-alignment">

//                 <p className="leaderboard-content-text">5th</p>
// </div>
//                </div>
//                <div
//                className="leaderboard-name-row-flex"
               
           
//              >
               
//                <p 
//              className="leaderboard-content-name "
//                >Jagdish Sisode</p>
             
//                </div>
//                <div
//                className="leaderboard-score-row-flex"
       
//              >
              
//                <p
//      className="leaderboard-content-score"
//      >1827</p>
    
//                </div>
//                <div 
//                className="leaderboard-progress-row-flex"
            
//              >
//                 <div className="stats-flex-column">
//                 <Progress percent={78} size="large"
//                 className="leaderboard-progressbar-top-style"
//              strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//             <Progress percent={42} size="large"
//              className="leaderboard-progressbar-bottom-style"
    
  
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//                 </div>
            
//                </div>
//                <div 
//                className="leaderboard-information-row-flex"
          
//              >
//                  <div
//                  className="leaderboard-information-column"
                
//                   >
//                  <p className="leaderboard-content-text">Logins:1600</p>
//             <p className="leaderboard-content-text">Insurance:1534</p>
//             </div>
//                </div>
//                <div 
//                className="leaderboard-button-row-flex"
           
//              >
//                <div
//                className="leaderboard-button-alignment-style"
         
//                >
//                 <Button

//                 className="leaderboard-button-style"
        
//       size="medium"
//          >View Details</Button>
//          </div>
//                </div>   
//            </div> 
//          </div>
       
//        </div>
      
       
// </Card>
// <div
// className="contest-info-card-alignment"
// >
// <Card 
// className="contest-info-card-style"

// bordered="true"
// bodyStyle={{backgroundColor:"white"}}
// >
// <div className="contest1-card-content">
//            <div className="contest1-card-row">
//            <p className="text-underline">Contest No: 2</p>
        
//        <Progress percent={30} size="large"
//        style={{
//            width:"170px",
//            fontSize:"0px",
//            marginLeft:"30px",
//            marginTop:"3px",
           
//            color:"#545A5E",
//           //  backgroundColor:"#545A5E"
//        }}
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//          <p
//        className="progressbar-percentage-text"
     
//        >30%</p>
//            </div>
      
//        <p className="text-date-style">20th May to 30th Jun</p>
//      </div>
//      </Card>

// </div>
// <div
// className="contest-info-card-alignment"

// >
// <Card 
// className="contest-info-card-style"

// bordered="true"
// bodyStyle={{backgroundColor:"white"}}
// >
// <div className="contest1-card-content">
//            <div className="contest1-card-row">
//            <p className="text-underline">Contest No: 3</p>
        
//        <Progress percent={50} size="large"
//        style={{
//            width:"170px",
//            fontSize:"0px",
//            marginLeft:"30px",
//            marginTop:"3px",
           
//            color:"#545A5E",
//           //  backgroundColor:"#545A5E"
//        }}
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//          <p
//        className="progressbar-percentage-text"
     
//        >50%</p>
//            </div>
      
//        <p className="text-date-style">10th Aug to 15th Aug</p>
//      </div>
//      </Card>

// </div>

// <div
// className="contest-info-card-alignment"

// >
// <Card 
// className="contest-info-card-style"

// bordered="true"
// bodyStyle={{backgroundColor:"white"}}
// >
// <div className="contest1-card-content">
//            <div className="contest1-card-row">
//            <p className="text-underline">Contest No: 4</p>
        
//        <Progress percent={40} size="large"
//        style={{
//            width:"170px",
//            fontSize:"0px",
//           //  fontWeight:"bold",
//            marginLeft:"30px",
//            marginTop:"3px",
           
//            color:"#545A5E",
//           //  backgroundColor:"#545A5E"
//        }}
//         strokeColor="#ffcc00"
//        type="line"
//        strokeWidth="23px"
//        strokeLinecap="square"
//        />
//         <p
//        className="progressbar-percentage-text"
     
//        >40%</p>
//            </div>
      
//        <p className="text-date-style">16th Nov to 18th Nov</p>
//      </div>
//      </Card>

// </div>
//   </div>
  
//   </div>
        
    )
}
export default ActiveContest;