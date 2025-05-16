import React, { useState } from 'react';
import "./AllProduct.css";
import OonaHeader from "../OonaHeader/OonaHeader";
import OonaFooter from "../OonaFooter/OonaFooter";
import { Link, useHistory, useLocationistory } from "react-router-dom";
import { Row, Col } from "antd";
import img1 from "../../../images/Icon/image-54@2x.png";
import img2 from "../../../images/Icon/image-55@2x.png";
import img3 from "../../../images/Icon/image-56@2x.png";
import img4 from "../../../images/MotorOptionImg/image 35.png"
import img5 from "../../../images/MotorOptionImg/image 36.png"
import img6 from "../../../images/MotorOptionImg/image 37.png"
import img7 from "../../../images/MotorOptionImg/image 38.png"
import img8 from "../../../images/MotorOptionImg/image 44.png"
import img9 from "../../../images/MotorOptionImg/image 45.png"
import img10 from "../../../images/MotorOptionImg/image 46.png"
import Product from "../Product/Product";
import BottomNavigation from '../bottomNavigation/bottomNavigation';


export default function AllProduct() {
  const [isVisible, setIsVisible] = useState(null);

  const handleClick = (section) => {
    setIsVisible((prevState) => (prevState === section ? null : section));
  };
  const history = useHistory();
  const TravelPage = () => {
    history.push("/quote-code")
  }
  const MotorPage = () => {
    history.push("/motor-info")
  }
  const onclickctpl = () => {
    history.push("/policy-detail")
  }
  const handleOnClick = () => {
    handleClick("travel");
    TravelPage();
  };
  const handleOnMotorClick = () => {
    handleClick("motor");
    MotorPage();
  };
  return (
    <>
      <OonaHeader />
      <div className="Rsmain-container">
        <div className="product-container">
          <div className="heading">All Products</div>
          <div className="subheading">
            You may create quick quotes and policies from here
          </div>
          <div className='product' onClick={onclickctpl}>
           <div className="REparent"  >
        <div className="product-name" >
          CTPL
        
        <div className="Rsproduct-info">
        Compulsory Third Party Liability
        </div>
      </div>
      </div>
      <img src={img1} className="img" />{" "}
        </div>
      

          
          <div className='product' onClick={() => handleOnMotorClick()}>
           <div className="parent">
        <div className="product-name" >
          MOTOR
        
        <div className="Rsproduct-info">
          Various coverage options for your vehicle
        </div>
      </div>
      </div>
      <img src={img2} className="img" />{" "}
        </div>
      {isVisible === "motor" && (
        <div className="visible-div">
          <div className="sub-parent">
            <div className="sub-info">Select a product</div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img4}/>Auto Select</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img5}/>Auto Liability</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img6}/>Auto Comprehensive</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">   <img src={img7}/>Auto Comprehensive Plus</div>
              </div>
            </div>
          </div>
        </div>
      )}
         
           
         <div className='product' onClick={() => handleOnClick()}>
           <div className="parent">
        <div className="product-name"  >
          TRAVEL
        
        <div className="Rsproduct-info">
        Various coverage options for travels
        </div>
      </div>
      </div>
      <img src={img3} className="img" />{" "}
        </div>
      {isVisible === "travel" && (
        <div className="visible-div">
          <div className="sub-parent">
            <div className="sub-info">Select a product</div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img8}/>International Travel Insurance</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img5}/>Domestic Travel Insurance</div>
              </div>
            </div>
            
          </div>
        </div>
      )}


{/* <div className='product'  onClick={() => handleClick("property")}>
           <div className="parent">
        <div className="product-name">
          PROPERTY
        
        <div className="Rsproduct-info">
        Flexible protection to your home & biz
        </div>
      </div>
      </div>
      
      <img src={img9} className="img" />{" "}
   
        </div>
      {isVisible === "property" && (
        <div className="visible-div">
          <div className="sub-parent">
            <div className="sub-info">Select a product</div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img4}/>Firelite</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img5}/>Home Insurance FIRE</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">  <img src={img6}/>Home Insurance EARTH</div>
              </div>
            </div>
            <div className="options">
              <div className="title">
                <div className="title-heading">   <img src={img7}/>Home Insurance WATER</div>
              </div>
            </div>
          </div>
        </div>
      )} */}

        </div>
      </div>
      <div style={{marginTop :'10px'}}><BottomNavigation /></div>

      <OonaFooter />
     
    
    </>
  );
}
