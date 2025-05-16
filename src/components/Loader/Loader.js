import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import loader from "../../assets/Images/Loder.gif"
import "./Loader.css";
import { useEffect, useState } from "react";
// import loaderImg from "Loader.gif"


const Loader = ({formloader}) => {

  const [width, setWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleWindowResize = () => setWidth(window.innerWidth);
  window.addEventListener("resize", handleWindowResize);
  return () => window.removeEventListener("resize", handleWindowResize);
}, [width]);

const breakpoint = 620;

  return (
    <>
    {
        formloader ? <div className="wrapper_loader">
        <img src={loader}
          style={{
            // fontSize: 50,
            height:"80px",
            width:"80px",
            marginLeft: width > breakpoint ? "45%" : "38%",
            marginTop: width > breakpoint ? "18%" : "75%",
            color:"red !important",
            zIndex:"1000"
          }}
        />
      </div> : null
    }
      
    </>
  );
};

export default Loader;
