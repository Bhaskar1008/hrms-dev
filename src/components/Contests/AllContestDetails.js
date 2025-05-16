import { Tabs, Input } from 'antd';
import React, { useDebugValue, useState } from 'react';
import './AllContestDetails.css';
const { Search } = Input;

const AllContestDetails = () => {
    let { innerWidth: width, innerHeight: height } = window;
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState(width <= "374" ? "top" : width <= "424" ? "top" :
        width <= "767" ? "top" : width <= "1023" ? "top" : "left");
    const changeTabPosition = e => {
        setTabPosition( e.target.value );
      };
    return(
<div
className="AllContestDetails1-main"
>
    {width<="367"||width<="424"?<tab></tab>:<button>dsd</button>}
<div
className="AllContestDetails1-row-flex"
>
<Tabs tabPosition={tabPosition}
tabBarGutter="5vw"
>
    <TabPane tab="Details" key="1">
<div
className="AllContestDetails1-card-flex"
>
<div
className="AllContestDetails1-details-card-style "
>
<div
className="AllContestDetails1-details-card-content-align"
>
<h4
className="AllContestDetails1-details-card-title-text"
>
Digital East 


</h4>

<div
className="AllContestDetails1-details-card-grey-line"
></div>
<ul
               className="AllContestDetails1-details-list-style"
               >
                   <li>Anytime, Anywhere, Paperless login</li>
                   <li>Ease in customer on-boarding –</li>
             <h4
             className="AllContestDetails1-details-nonlist-text"
             >      Complete the entire customer on-boarding in just few minutes from anywhere, without the need to travel back to office for login completion</h4>
              
              <li>Compatible to any Android device -</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             >       Now use your personal devices like Android mobile or Android tablet.</h4>
            
              <li>Offline Capability –</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             >     After BI generation the entire process can be completed even without internet connectivity</h4>
              <li>CFR notification and upload –</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             >      Check for CFR requirements and upload CFR related documents straight from your device</h4>
              <li>Split payment -</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             > Split the premium into multiple payments of Cheque/DD/Cash</h4>
              <li>Send link to customer –</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             >  Send a link for premium payment to the customer mail ID and the customer can make online payment from his own device</h4>
              <li>Team Login –</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             > Login upto ZM level, select a FLS/Sales Manager/Advisor from the hierarchy and login a case as the selected sales person
             </h4>
              <li>Auto upgrade –</li>
              <h4
             className="AllContestDetails1-details-nonlist-text"
             > Login upto ZM level, select a FLS/Sales Manager/Advisor from the hierarchy and login a case as the selected sales person</h4> 
              
               </ul>
</div>
</div>
</div>
    </TabPane>
    <TabPane tab="Eligibility" key="2">
    <div
className="AllContestDetails1-card-flex"
>
<div className="AllContestDetails1-eligibility-card-style ">
<div
className="AllContestDetails1-details-card-content-align"
>
<h4
className="AllContestDetails1-details-card-title-text"
>
Digital East 


</h4>

<div
className="AllContestDetails1-details-card-grey-line"
></div>
<ul
               className="AllContestDetails1-details-list-style"
               >
                   <li>The challenge is applicable from Sales Managers to the Regional Managers</li>
                   <li>The competition will be within the respective category(SM, BM and RM)</li>
                   <li>Login and Issuance Period – June 1st to Jun 30th</li>
                   </ul>
</div>
</div>

</div>
    </TabPane>
    <TabPane tab="Rules" key="3">
    <div
className="AllContestDetails1-card-flex"
>
<div className="AllContestDetails1-eligibility-card-style ">
<div
className="AllContestDetails1-details-card-content-align"
>
<h4
className="AllContestDetails1-details-card-title-text"
>
Digital East 


</h4>

<div
className="AllContestDetails1-details-card-grey-line"
></div>
<ul
               className="AllContestDetails1-details-list-style"
               >
                   <li>In SM category Top 100 of the Zone will be recognized as “The Stars of Digital East”. Min criteria – 2 NOPs</li>
                   <li>In BM category Top 25 of the Zone will be recognized as “The Stars of Digital East” Min criteria – 10 NOPs and 90% Sales Assist app installation by SMs</li>
                   <li>In RM category Top 10 of the Zone will be recognized as “The Stars of Digital East” Min criteria – 50 NOP and 80% Sales Assist app installation by SMs </li>
                   </ul>
</div>
</div>

</div>
    </TabPane>
    <TabPane tab="Rewards" key="4">
    <div
className="AllContestDetails1-card-flex"
>
<div className="AllContestDetails1-eligibility-card-style ">
<div
className="AllContestDetails1-details-card-content-align"
>
<h4
className="AllContestDetails1-details-card-title-text"
>
Digital East 


</h4>

<div
className="AllContestDetails1-details-card-grey-line"
></div>
<ul
               className="AllContestDetails1-details-list-style"
               >
                   <li>All the Stars of the Digital East to receive an exclusive certificate signed by the Zonal Head and “The Stars of the Digital East” Badge</li>
                   <li>The top 10 SMs, top 5 BMs and top 3 RMS to receive the “The Stars of the Digital East” Trophy along with the certificate and badge</li>
                   <li>The top 5 SMs. Top 2 BMs and the top RM of the Zone to receive the prestigious “The Pride of Digital East” Certificate</li>
                   </ul>
</div>
</div>

</div>
    </TabPane>
    <TabPane tab="Extra" key="5">
    <div
className="AllContestDetails1-card-flex"
>
<div className="AllContestDetails1-eligibility-card-style ">
<div
className="AllContestDetails1-details-card-content-align"
>
<Search placeholder="Search By Name" onSearch={()=>{}} 
enterButton
/>
<h4
className="AllContestDetails1-details-card-title-text"
>
Digital East 


</h4>

<div
className="AllContestDetails1-details-card-grey-line"
></div>
<ul
               className="AllContestDetails1-details-list-style"
               >
                  <h4
             className="AllContestDetails1-details-nonlist-text"
             >A Head to Head between the regions, win the privilege to be the “Pride of Digital East Regions” </h4>
                   <h4
             className="AllContestDetails1-details-nonlist-text"
             > Till you unlock your secret Rival, it’s playing blind!!! </h4>
                   </ul>
</div>
</div>

</div>
    </TabPane>
  </Tabs>
</div>
</div>
    );
}
export default AllContestDetails;