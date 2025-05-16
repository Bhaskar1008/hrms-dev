import React from 'react';
import './CompletedContestDetails.css';
import {Progress} from 'antd';
import { useHistory } from 'react-router';
const CompletedContestDetails=()=>{
    let{innerWidth:width,innerHeight:height}=window;
let history=useHistory();
const CompletedContestDetailsRoute=()=>{
    history.push("/rewardscorner/contests/activecontestdetails");
}
    return(
        <div
        className="completedcontestdetails-main"
        >
<div
className="completedcontestdetails-card-style"
>
<div
className="completedcontestdetails-card-top-flex"
>
<div
className="completedcontestdetails-card-coloured-style"
>
    <div
    className="completedcontestdetails-card-coloured-content-style"
    >
<div
className="completedcontestdetails-title-position-flex"
>
<h4
className="completedcontestdetails-title-text"
>Position</h4>


</div>
<div
className="completedcontestdetails-title-name-flex"
>
<h4
className="completedcontestdetails-title-text"
>Name</h4>
</div>
<div
className="completedcontestdetails-title-score-flex"
>
<h4
className="completedcontestdetails-title-text"
>Score</h4>
</div>
<div
className="completedcontestdetails-title-stats-flex"
>
<h4
className="completedcontestdetails-title-text"
>Stats</h4>
</div>
<div
className="completedcontestdetails-title-information-flex"
>
<h4
className="completedcontestdetails-title-text"
>Information</h4>
</div>
<div
className="completedcontestdetails-title-action-flex"
>
<h4
className="completedcontestdetails-title-text"
>Actions</h4>
</div>

    </div>
    </div>

</div>
<div
className="completedcontestdetails-card-bottom-flex"
>

      <div
      className="completedcontestdetails-card-bottom-contentalign-flex"
      >
      <div
className="completedcontestdetails-content-position-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1st
</h4>


</div> 
<div
className="completedcontestdetails-content-name-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Shashank Milttal
</h4>
</div>
<div
className="completedcontestdetails-content-score-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1827
</h4>
</div>
<div
className="completedcontestdetails-content-stats-flex"
>
<div
className="completedcontestdetails-content-progressbar-flex"
>
<Progress percent={80} size="large"
                className="completedcontestdetails-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="completedcontestdetails-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>

</div>
<div
className="completedcontestdetails-content-information-flex"
>
<div
className="completedcontestdetails-content-information-column-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Logins:1600
</h4><h4
className="completedcontestdetails-content-text"
>
Issuance:1534
</h4>
</div>

</div>
<div
className="completedcontestdetails-content-action-flex"
>

    <button
    className="completedcontestdetails-content-action-button-style"
    onClick={CompletedContestDetailsRoute}
    >
        Details
    </button>
</div>
      </div>
      <div
      className="completedcontestdetails-card-bottom-contentalign-flex"
      >
      <div
className="completedcontestdetails-content-position-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1st
</h4>


</div> 
<div
className="completedcontestdetails-content-name-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Shashank Milttal
</h4>
</div>
<div
className="completedcontestdetails-content-score-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1827
</h4>
</div>
<div
className="completedcontestdetails-content-stats-flex"
>
<div
className="completedcontestdetails-content-progressbar-flex"
>
<Progress percent={80} size="large"
                className="completedcontestdetails-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="completedcontestdetails-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>

</div>
<div
className="completedcontestdetails-content-information-flex"
>
<div
className="completedcontestdetails-content-information-column-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Logins:1600
</h4><h4
className="completedcontestdetails-content-text"
>
Issuance:1534
</h4>
</div>

</div>
<div
className="completedcontestdetails-content-action-flex"
>

    <button
    className="completedcontestdetails-content-action-button-style"
    onClick={CompletedContestDetailsRoute}
    >
        Details
    </button>
</div>
      </div>
      <div
      className="completedcontestdetails-card-bottom-contentalign-flex"
      >
      <div
className="completedcontestdetails-content-position-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1st
</h4>


</div> 
<div
className="completedcontestdetails-content-name-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Shashank Milttal
</h4>
</div>
<div
className="completedcontestdetails-content-score-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1827
</h4>
</div>
<div
className="completedcontestdetails-content-stats-flex"
>
<div
className="completedcontestdetails-content-progressbar-flex"
>
<Progress percent={80} size="large"
                className="completedcontestdetails-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="completedcontestdetails-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>

</div>
<div
className="completedcontestdetails-content-information-flex"
>
<div
className="completedcontestdetails-content-information-column-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Logins:1600
</h4><h4
className="completedcontestdetails-content-text"
>
Issuance:1534
</h4>
</div>

</div>
<div
className="completedcontestdetails-content-action-flex"
>

    <button
    className="completedcontestdetails-content-action-button-style"
    onClick={CompletedContestDetailsRoute}
    >
        Details
    </button>
</div>
      </div>
      <div
      className="completedcontestdetails-card-bottom-contentalign-flex"
      >
      <div
className="completedcontestdetails-content-position-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1st
</h4>


</div> 
<div
className="completedcontestdetails-content-name-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Shashank Milttal
</h4>
</div>
<div
className="completedcontestdetails-content-score-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1827
</h4>
</div>
<div
className="completedcontestdetails-content-stats-flex"
>
<div
className="completedcontestdetails-content-progressbar-flex"
>
<Progress percent={80} size="large"
                className="completedcontestdetails-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="completedcontestdetails-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>

</div>
<div
className="completedcontestdetails-content-information-flex"
>
<div
className="completedcontestdetails-content-information-column-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Logins:1600
</h4><h4
className="completedcontestdetails-content-text"
>
Issuance:1534
</h4>
</div>

</div>
<div
className="completedcontestdetails-content-action-flex"
>

    <button
    className="completedcontestdetails-content-action-button-style"
    onClick={CompletedContestDetailsRoute}
   >
        Details
    </button>
</div>
      </div>
      <div
      className="completedcontestdetails-card-bottom-contentalign-flex"
      >
      <div
className="completedcontestdetails-content-position-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1st
</h4>


</div> 
<div
className="completedcontestdetails-content-name-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Shashank Milttal
</h4>
</div>
<div
className="completedcontestdetails-content-score-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1827
</h4>
</div>
<div
className="completedcontestdetails-content-stats-flex"
>
<div
className="completedcontestdetails-content-progressbar-flex"
>
<Progress percent={80} size="large"
                className="completedcontestdetails-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="completedcontestdetails-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>

</div>
<div
className="completedcontestdetails-content-information-flex"
>
<div
className="completedcontestdetails-content-information-column-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Logins:1600
</h4><h4
className="completedcontestdetails-content-text"
>
Issuance:1534
</h4>
</div>

</div>
<div
className="completedcontestdetails-content-action-flex"
>

    <button
    className="completedcontestdetails-content-action-button-style"
    onClick={CompletedContestDetailsRoute}
   >
        Details
    </button>
</div>
      </div>
      <div
      className="completedcontestdetails-card-bottom-contentalign-flex"
      >
      <div
className="completedcontestdetails-content-position-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1st
</h4>


</div> 
<div
className="completedcontestdetails-content-name-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Shashank Milttal
</h4>
</div>
<div
className="completedcontestdetails-content-score-flex"
>
<h4
className="completedcontestdetails-content-text"
>
1827
</h4>
</div>
<div
className="completedcontestdetails-content-stats-flex"
>
<div
className="completedcontestdetails-content-progressbar-flex"
>
<Progress percent={80} size="large"
                className="completedcontestdetails-progressbar-top-style"
             strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
    
            <Progress percent={80} size="large"
             className="completedcontestdetails-progressbar-bottom-style"
    
  
        strokeColor="#ffcc00"
       type="line"
       strokeWidth={width<="374"?"12px":width<="424"?"12px":width<="767"?"14px":width<="1023"?"18px":"23px"}
       strokeLinecap="square"
       />
</div>

</div>
<div
className="completedcontestdetails-content-information-flex"
>
<div
className="completedcontestdetails-content-information-column-flex"
>
<h4
className="completedcontestdetails-content-text"
>
Logins:1600
</h4><h4
className="completedcontestdetails-content-text"
>
Issuance:1534
</h4>
</div>

</div>
<div
className="completedcontestdetails-content-action-flex"
>

    <button
    className="completedcontestdetails-content-action-button-style"
    onClick={CompletedContestDetailsRoute}
   >
        Details
    </button>
</div>
      </div>
   


</div>

</div>
        </div>
    )
}
export default CompletedContestDetails;