import { Card, Progress } from 'antd';
import React from 'react';
import './AllContest.css';
import {useHistory} from 'react-router-dom';
const AllContest=()=>{
    let history=useHistory();
    let{innerWidth:width,innerHeight:height}=window;
const AllContestDetailsRoute=()=>{
history.push("/rewardscorner/contests/allcontestdetails")
}
    return(
        <div className="contestall-main-style">


<div className="contestall-two-cards-row-flex">

         <div className="contestall-card-style">
             <div  className="contestall-topcard-row-flex">
                 <div>
                 <h5 className="contestall-topcard-underline-text">Digital East</h5>
              
                 </div>
               
                 <h4 className="contestall-topcard-date-text">1st Jun to 30th Jun</h4>
             </div>
              <div className="contestall-bottomcard-flex">
<div className="contestall-bottomcard-progressbar-row-flex">
<Progress percent={80} size="large" 
className="contestall-bottomcard-progressbar-style"
       
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"15px":width<="424"?"15.4px":width<="767"?"19px":"25.5px"}
    //    {width<="374"?"10px":width<="424"?"12px":width<="767"?"15px":width<="1023"?"20px":"23px"}
       strokeLinecap="square"
       />
       <p  className="contestall-bottomcard-progressbar-text"
    
     
       >80% Achieved</p>
    
</div>


<button className="contestall-bottomcard-button-style"
onClick={AllContestDetailsRoute}
>
Details
</button>
             </div>
        
         </div>
       
       



         <div className="contestall-card-style">

<div  className="contestall-topcard-row-flex">
    <div>
    <h5 className="contestall-topcard-underline-text">Contest No:2</h5>
 
    </div>
  
    <h4 className="contestall-topcard-date-text">1st Jun to 30th Jun</h4>
</div>
 <div className="contestall-bottomcard-flex">
<div className="contestall-bottomcard-progressbar-row-flex">
<Progress percent={57} size="large" 
className="contestall-bottomcard-progressbar-style"

strokeColor="#ffcc00"
type="line"
strokeWidth={width<="374"?"15px":width<="424"?"15.4px":width<="767"?"19px":"25.5px"}
//    {width<="374"?"10px":width<="424"?"12px":width<="767"?"15px":width<="1023"?"20px":"23px"}
strokeLinecap="square"
/>
<p  className="contestall-bottomcard-progressbar-text"


>57% Achieved</p>

</div>


<button className="contestall-bottomcard-button-style"
onClick={AllContestDetailsRoute}
>
Details
</button>
</div>

</div>

       
       </div>
       
       
       <div className="contestall-two-cards-row-flex">

       <div className="contestall-card-style">

<div  className="contestall-topcard-row-flex">
    <div>
    <h5 className="contestall-topcard-underline-text">Contest No:3</h5>
 
    </div>
  
    <h4 className="contestall-topcard-date-text">10th Aug to 15th Aug</h4>
</div>
 <div className="contestall-bottomcard-flex">
<div className="contestall-bottomcard-progressbar-row-flex">
<Progress percent={72} size="large" 
className="contestall-bottomcard-progressbar-style"

strokeColor="#ffcc00"
type="line"
strokeWidth={width<="374"?"15px":width<="424"?"15.4px":width<="767"?"19px":"25.5px"}
//    {width<="374"?"10px":width<="424"?"12px":width<="767"?"15px":width<="1023"?"20px":"23px"}
strokeLinecap="square"
/>
<p  className="contestall-bottomcard-progressbar-text"


>72% Achieved</p>

</div>


<button className="contestall-bottomcard-button-style"
onClick={AllContestDetailsRoute}>
Details
</button>
</div>

</div>





<div className="contestall-card-style">

<div  className="contestall-topcard-row-flex">
<div>
<h5 className="contestall-topcard-underline-text">Contest No:4</h5>

</div>

<h4 className="contestall-topcard-date-text">16th Nov to 18th Nov</h4>
</div>
<div className="contestall-bottomcard-flex">
<div className="contestall-bottomcard-progressbar-row-flex">
<Progress percent={35} size="large" 
className="contestall-bottomcard-progressbar-style"

strokeColor="#ffcc00"
type="line"
strokeWidth={width<="374"?"15px":width<="424"?"15.4px":width<="767"?"19px":"25.5px"}
//    {width<="374"?"10px":width<="424"?"12px":width<="767"?"15px":width<="1023"?"20px":"23px"}
strokeLinecap="square"
/>
<p  className="contestall-bottomcard-progressbar-text"


>35% Achieved</p>

</div>


<button className="contestall-bottomcard-button-style"
onClick={AllContestDetailsRoute}
>
Details
</button>
</div>

</div>


       </div>
       
       
       
       <div className="contestall-card-style">

<div  className="contestall-topcard-row-flex">
<div>
<h5 className="contestall-topcard-underline-text">Contest No:5</h5>

</div>

<h4 className="contestall-topcard-date-text">8th Dec to 18th Dec</h4>
</div>
<div className="contestall-bottomcard-flex">
<div className="contestall-bottomcard-progressbar-row-flex">
<Progress percent={82} size="large" 
className="contestall-bottomcard-progressbar-style"

strokeColor="#ffcc00"
type="line"
strokeWidth={width<="374"?"15px":width<="424"?"15.4px":width<="767"?"19px":"25.5px"}
//    {width<="374"?"10px":width<="424"?"12px":width<="767"?"15px":width<="1023"?"20px":"23px"}
strokeLinecap="square"
/>
<p  className="contestall-bottomcard-progressbar-text"


>82% Achieved</p>

</div>


<button className="contestall-bottomcard-button-style"
onClick={AllContestDetailsRoute}
>
Details
</button>
</div>
</div>
       
      
       
        </div>
    );
}
export default AllContest;