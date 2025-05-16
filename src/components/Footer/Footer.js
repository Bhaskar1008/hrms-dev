import React, {useEffect} from "react";
import "./Footer.css"

import { useLocation } from "react-router-dom";


const Footer = () => {
  // let location=useLocation()
  // useEffect(()=>{
  // // console.log("location",location)

  // },[])
  // const { pathname } = useLocation();

  // you can check a more conditions here
  // if (pathname === "/login") return null;

  return <div className="footerMain">Powered by Salesdrive<sup>TM</sup></div>;
};
export { Footer };