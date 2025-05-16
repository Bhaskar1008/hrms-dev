import React from "react";
import "./Product.css";
import img8 from "../../../images/MotorOptionImg/image 39.png";
import img9 from "../../../images/MotorOptionImg/image 40.png";
import img10 from "../../../images/MotorOptionImg/image 41.png";
import img11 from "../../../images/MotorOptionImg/image 42.png";
import img12 from "../../../images/MotorOptionImg/image 43.png";
export default function Product() {
  return (
    <div className="parent">
      <div className="container">
        <div>
         
          <img src={img9} />
          <p className="text">Home</p>
        </div>
        <div>
         
          <img src={img8} /> <p>PERFORMANCE</p>
        </div>
        <div>
        
          <img src={img11} /> <p>LEADS</p>
        </div>
        <div>
          <img src={img12} /> <p>CUSTOMERS</p>
        </div>
        <div>
          <img src={img10} /> <p>RESOURCES</p>
        </div>
      </div>
    </div>
  );
}
