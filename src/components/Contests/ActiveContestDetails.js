import React,{useState} from 'react';
import './ActiveContestDetails.css';
import {Progress,TabPane,Tabs} from 'antd';

// -- Import Image -- //
import Microwave from '../../images/Microwave.png';
import WashingMachine from '../../images/Washingmachine.jpg';
import Refrigerator from '../../images/Refrigerator.jpg';
import Construction from '../../images/Construction.jpg';


// %%%%%%%--- Modules Creation Start %%%%%%--- //

const ActiveContestDetails=()=>{
    let{innerWidth:width,innerHeight:height}=window;
    const { TabPane } = Tabs;
    const[tabPosition,setTabPosition]=useState(width<="374"?"top":width<="424"?"top":
    width<="767"?"top":width<="1023"?"top":"top");
    const changeTabPosition = e => {
        setTabPosition( e.target.value );
      };
    return(
        <div
        className="ActiveContestDetails1-main"
        >
         <div
         className="ActiveContestDetails1-top-card-style"
         >
             <div
              className="ActiveContestDetails1-top-card-alignment"
             >
             <div
             className="ActiveContestDetails1-top-card-coloured"
             >
<div
 className="ActiveContestDetails1-top-card-content-flex"
>
<div
 className="ActiveContestDetails1-card-rank-title-flex"
>
    <h4 className="ActiveContestDetails1-top-card-title-style"> Rank</h4>
</div>
<div
 className="ActiveContestDetails1-card-name-title-flex"
>
<h4 className="ActiveContestDetails1-top-card-title-style"> Name</h4>
</div>
<div
 className="ActiveContestDetails1-card-score-title-flex"
>
<h4 className="ActiveContestDetails1-top-card-title-style"> Score</h4>
</div>
<div
 className="ActiveContestDetails1-card-stats-title-flex"
>
<h4 className="ActiveContestDetails1-top-card-title-style"> Stats</h4>
</div>
<div
 className="ActiveContestDetails1-card-information-title-flex"
>
<h4 className="ActiveContestDetails1-top-card-title-style"> Information</h4>
</div>
</div>

             </div>
       <div
       className="ActiveContestDetails1-content-area-flex"
       >
           <div
           className="ActiveContestDetails1-content-flex"
           >
           <div
           className="ActiveContestDetails1-card-rank-content-flex"
           >
               <h4
                className="ActiveContestDetails1-card-content-text"
               >1st</h4>
           </div>
            <div
           className="ActiveContestDetails1-card-name-content-flex"
           >
                 <h4
                className="ActiveContestDetails1-card-content-text"
               >Shashank Milttal</h4>
           </div>
            <div
           className="ActiveContestDetails1-card-score-content-flex"
           >
                 <h4
                className="ActiveContestDetails1-card-content-text"
               >1827</h4>
           </div>
            <div
           className="ActiveContestDetails1-card-stats-content-flex"
           >
               <div
               className="ActiveContestDetails1-card-stats-column-flex"
               >
               <Progress percent={80} size="large"
                className="activecontestdetails1-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="activecontestdetails1-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
               </div>
           </div>
            <div
           className="ActiveContestDetails1-card-information-content-flex"
           >
               <div
               className="ActiveContestDetails1-card-information-column-flex"
               >
               <h4
                className="ActiveContestDetails1-card-content-text"
               >Logins:1600</h4>
               <h4
                className="ActiveContestDetails1-card-content-text"
               >Issuance:1534</h4>
               </div>
          </div>
           </div>
       </div>
             </div>
      
         </div>
        <div
        className="activecontestdetails1-tab-flex"
        >
         <Tabs
          tabPosition={tabPosition}
         tabBarGutter={width<="374"?"26vw":"30vw"}
         defaultActiveKey="1" >
    <TabPane tab={<span className="activecontestdetails1-tab-title-text">Prizes</span>} key="1">
<div
className="activecontestdetails1-prizes-tab-flex"
>
   <div
   className="activecontestdetails1-prizes-tab-card-style"
   >
       <div
       className="activecontestdetails1-prizes-tab-card-content">
           <div
           className="activecontestdetails1-prizes-tab-card-coloured"
           >
<h4
className="activecontestdetails1-prizes-tab-card-title"
>
    First Runner Up
</h4>

           </div>
           <img
src={WashingMachine}
className="activecontestdetails1-prizes-tab-washingmachine-style"
/>
<h4
className="activecontestdetails1-prizes-tab-bottom-text-style"
>The winner get IFB Washing Machine worth  ₹ 25,699/-</h4>
       </div>
   </div>
     <div
   className="activecontestdetails1-prizes-tab-card-style"
   >
        <div
       className="activecontestdetails1-prizes-tab-card-content">
           <div
           className="activecontestdetails1-prizes-tab-card-coloured"
           >
<h4
className="activecontestdetails1-prizes-tab-card-title"
>
    Second Runner Up
</h4>

           </div>
           <img
src={Refrigerator}
className="activecontestdetails1-prizes-tab-washingmachine-style"
/>
<h4
className="activecontestdetails1-prizes-tab-bottom-text-style"
>The winner get IFB Refrigerator worth ₹ 20,699/-</h4>
       </div>
   </div>
     <div
   className="activecontestdetails1-prizes-tab-card-style"
   >
        <div
       className="activecontestdetails1-prizes-tab-card-content">
           <div
           className="activecontestdetails1-prizes-tab-card-coloured"
           >
<h4
className="activecontestdetails1-prizes-tab-card-title"
>
    Third Runner Up
</h4>

           </div>
           <img
src={Microwave}
className="activecontestdetails1-prizes-tab-washingmachine-style"
/>
<h4
className="activecontestdetails1-prizes-tab-bottom-text-style"
>The winner get IFB Microwave worth ₹ 5,000/-</h4>
       </div>
   </div>
</div>
    </TabPane>
    <TabPane tab={<span className="activecontestdetails1-tab-title-text">Extras</span>} key="2">
      <div
      className="activecontestdetails1-extras-tab-card-style"
      >
<div
 className="activecontestdetails1-extras-tab-card-content-flex"
>
    <h4
    className="activecontestdetails1-extras-tab-title-text"
    >Extras</h4>
    <h4 className="activecontestdetails1-extras-tab-content-text">A Head to Head between the regions, win the privilege to be the “Pride of Digital East Regions”</h4>
    <h4 className="activecontestdetails1-extras-tab-content-text">And your Rival??? Unlock the secret rival of your region by completing 80% of Sales Assist installation by the SMs of the region</h4>
    <h4 className="activecontestdetails1-extras-tab-content-text">Till you unlock your secret Rival, it’s playing blind!!!</h4>
</div>
      </div>
    </TabPane>
    <TabPane tab={<span className="activecontestdetails1-tab-title-text">Videos</span>} key="3">
      <div
      className="activecontestdetails1-videos-tab-card-style"
      >
<div
className="activecontestdetails1-videos-tab-flex"
>
<div
className="activecontestdetails1-videos-tab-video-flex"
>
    <div
    className="activecontestdetails1-videos-tab-video-column-flex"
    >
        <h5
        className="activecontestdetails1-videos-tab-title-text"
        >Proud Moments Captured</h5>
        
        <img
        src={Construction}
        className="activecontestdetails1-videos-tab-image-style"
      
        />
        <h4
        className="activecontestdetails1-videos-tab-bottom-text"
        >- Robert Howard, Construction Office Engineer</h4>
    </div>
</div>
<div
className="activecontestdetails1-videos-tab-content-flex"
>
    <div
    className="activecontestdetails1-videos-tab-content-column-flex"
    >
        <h4
        className="activecontestdetails1-videos-tab-content-head-text">Amit Kumar, Winner of Digital East, Q1 (2016-17)</h4>
        <h4  className="activecontestdetails1-videos-tab-content-info-text">On an everyday basis, Bluebeam helps create an environment where anything is possible in the creation and modification of PDFs. With the new release of Revu 11, users have even more functionality to work with such as the Format Painter. The capability to copy the formatted appearance from one annotation to another has spedup... Built documentation tremendously. Also, with the creation of Sets and the ability to split documents into multiple sections, Bluebeam has now evolved the process of forming maintenance manuals into a well-oiled machine On an everyday basis, Bluebeam helps create an environment where anything is possible in the creation and modification of PDFs. With the new release of Revu 11, users have even more functionality to work with such as the Format Painter. The capability to copy the formatted appearance from one annotation to another has spedup... Built documentation tremendously. Also, with the creation of Sets and the ability to split documents into multiple sections, Bluebeam has now evolved the process of forming maintenance manuals into a well-oiled machine.</h4>
    </div>
</div>
</div>
      </div>
    </TabPane>
  </Tabs>
  </div>
        </div>
    );
}
export default ActiveContestDetails;