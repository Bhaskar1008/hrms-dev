import React from "react";
import { Carousel } from "antd";
import "./OonaCarousel.css";
import img1 from "../../../images/carousel_img/image 40.png";
import img2 from "../../../images/carousel_img/image 38.png";
import iCare_life_carousel_1 from "../../../assets/ihc_icon/Building and Logo Banner.png";
import iCare_life_carousel_2 from "../../../assets/ihc_icon/Business Banner.png";
import iCare_life_carousel_3 from "../../../assets/ihc_icon/Family Banner.png";
import iCare_life_carousel_4 from "../../../assets/ihc_icon/Sales Agent Banner.png";

const OonaCarousel = () => {
  return (
    <>
      <Carousel autoplay>
        {[iCare_life_carousel_1, iCare_life_carousel_2, iCare_life_carousel_3, iCare_life_carousel_4].map((imageSrc, index) => (
          <div className="carousel-img" key={index}>
            <img src={imageSrc} alt={`Phil Life Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default OonaCarousel;
