import React,{useEffect, useState} from 'react';
import './Achievement.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ProgressBar from 'react-bootstrap/ProgressBar';
import {Button} from 'react-bootstrap';
import { CardHeader,Typography } from '@material-ui/core';
const Achievment = () => {
  
  const[cardClicked,setCardClicked]=useState(false)
  const cardClickFunc=()=>{
    setCardClicked(true)
  }
    return (

        <>
        <div className="mainflex">
<div className="active-card-flex">
  
<Card className={"active-card-description" }>
  <CardContent className="card-content-flex">
<p className="card-content-style">All</p>
  </CardContent>
</Card>
<Card className={"active-card-description" }>
  <CardContent className="card-content-flex">
<p className="card-content-style">Active</p>
  </CardContent>
</Card>
<Card className={"active-card-description" }>
  <CardContent className="card-content-flex">
<p className="card-content-style">Completed</p>
  </CardContent>
</Card>
<Card className={"active-card-description" }>
  <CardContent className="card-content-flex">
<p className="card-content-style">My Overall</p>
<p className="card-content-style">ranking</p>
  </CardContent>
</Card>
</div>
<div className="contest-flex">
<div className="contest-flex-row">
<Card className="contest-card" variant="outlined">

   <CardContent>
     <div className="top-card-content">
       <p className="text-underline">Digital East</p>
    
       <p className="text-date-style">1st Jun to 30th Jun</p>
     </div>
     <div className="bottom-card-content">
       <div className="inner-progress-bar-percentage">
     <ProgressBar
className=" progress-bar-warning"
variant="warning"

now={60} 
style={{width:"44%",height:"20px"}}
/> 
    
          
<p className="progress-percentage-style">60% Achieved</p>
</div>
<div style={{marginBottom:"10px",paddingBottom:"10px"}}>
<button className="button">Details</button>
    </div>
     </div>
     
   </CardContent>
 </Card>
 <Card className="contest-card" variant="outlined">

   <CardContent>
     <div className="top-card-content">
       <p className="text-underline">Contest No:2</p>
    
       <p className="text-date-style">1st Jun to 30th Jun</p>
     </div>
     <div className="bottom-card-content">
       <div className="inner-progress-bar-percentage">
     <ProgressBar
className=" progress-bar-warning"
variant="warning"

now={57} 
style={{width:"44%",height:"20px"}}
/> 
    
          
<p className="progress-percentage-style">57% Achieved</p>
</div>
<div style={{marginBottom:"10px",paddingBottom:"10px"}}>
<button className="button">Details</button>
    </div>
     </div>
     
   </CardContent>
 </Card>
</div>
<div className="contest-flex-row">
<Card className="contest-card" variant="outlined">

   <CardContent>
     <div className="top-card-content">
       <p className="text-underline">Contest No:3</p>
    
       <p className="text-date-style">10th Aug to 15th Aug</p>
     </div>
     <div className="bottom-card-content">
       <div className="inner-progress-bar-percentage">
     <ProgressBar
className=" progress-bar-warning"
variant="warning"

now={72} 
style={{width:"44%",height:"20px"}}
/> 
    
          
<p className="progress-percentage-style">72% Achieved</p>
</div>
<div style={{marginBottom:"10px",paddingBottom:"10px"}}>
<button className="button">Details</button>
    </div>
     </div>
     
   </CardContent>
 </Card>
 <Card className="contest-card" variant="outlined">

   <CardContent>
     <div className="top-card-content">
       <p className="text-underline">Contest No:4</p>
    
       <p className="text-date-style">16th Nov to 18th Nov</p>
     </div>
     <div className="bottom-card-content">
       <div className="inner-progress-bar-percentage">
     <ProgressBar
className=" progress-bar-warning"
variant="warning"

now={35} 
style={{width:"44%",height:"20px"}}
/> 
    
          
<p className="progress-percentage-style">35% Achieved</p>
</div>
<div style={{marginBottom:"10px",paddingBottom:"10px"}}>
<button className="button">Details</button>
    </div>
     </div>
     
   </CardContent>
 </Card>
 </div>
 <div className="contest-flex-row">
 <Card className="contest-card" variant="outlined">

   <CardContent>
     <div className="top-card-content">
       <p className="text-underline">Contest No:5</p>
    
       <p className="text-date-style">8th Dec to 18th Dec</p>
     </div>
     <div className="bottom-card-content">
       <div className="inner-progress-bar-percentage">
     <ProgressBar
className=" progress-bar-warning"
variant="warning"

now={82} 
style={{width:"44%",height:"20px"}}
/> 
    
          
<p className="progress-percentage-style">82% Achieved</p>
</div>
<div style={{marginBottom:"10px",paddingBottom:"10px"}}>
<button className="button">Details</button>
    </div>
     </div>
     
   </CardContent>
 </Card>
 
 
 </div>

  {/* <Card className="contest-card">
    <CardContent className="contest-card-content">
<div className="top-card-style">
  <p>Hello</p>
  <p>Hello</p>
</div>
<div className="bottom-card-style">
  <p>Hello</p>
  <p>Hello</p>
</div>

    </CardContent>
  </Card> */}
{/* <ProgressBar
className=" progress-bar-warning"
variant="warning"

now={60} 
style={{width:"16%",height:"25px"}}
/> */}
<p>Hey</p>
</div>

        </div>

      </>

    
    )
}
export default Achievment;