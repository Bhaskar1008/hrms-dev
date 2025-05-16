import React from 'react';
import './CompletedContest.css';
import { useHistory } from 'react-router-dom';
const CompletedContest=()=>{
    let history=useHistory();
    const CompletedContestDetailsRoute=()=>{
        history.push("/rewardscorner/contests/completeddetails")
    }
    return(
        <div
        className="completedcontest1-main"
        >
            <div
            className="completedcontest1-row-flex"
            >
               
<div
 className="completedcontest1-card-style"
>
<div
 className="completedcontest1-card-flex"
>
<h4
className="completedcontest1-card-title-text"
>All Completed Contests</h4>
<div
className="completedcontest1-card-coloured-line"
></div>
<div
className="completedcontest1-card-row-flex"
>
    <div
    className="completedcontest1-card-column-flex"
    >
    <h4
    className="completedcontest1-card-bottom-text"
    >Contest Number 2 ( 20th May to 20th June )</h4>
    <h4
    className="completedcontest1-card-bottom-text"
    >Results announced: 25/06/2016</h4>
    </div>
 
    <button
    className="completedcontest1-card-bottom-button-style"
    onClick={CompletedContestDetailsRoute}
    >View Details</button>
</div>
</div>
</div>
<div
 className="completedcontest1-card-style"
>
<div
 className="completedcontest1-card-flex"
>
<h4
className="completedcontest1-card-title-text"
>All Completed Contests</h4>
<div
className="completedcontest1-card-coloured-line"
></div>
<div
className="completedcontest1-card-row-flex"
>
    <div
    className="completedcontest1-card-column-flex"
    >
    <h4
    className="completedcontest1-card-bottom-text"
    >Contest Number 3 ( 20th May to 20th June )</h4>
    <h4
    className="completedcontest1-card-bottom-text"
    >Results announced: 25/06/2016</h4>
    </div>
 
    <button
    className="completedcontest1-card-bottom-button-style"
    onClick={CompletedContestDetailsRoute}
    >View Details</button>
</div>
</div>
</div>


            </div>
            
        </div>
    );
}
export default CompletedContest;