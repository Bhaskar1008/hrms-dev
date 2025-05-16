import React from 'react'
import './Header.css'
import logobar from '../../../../../images/header_img/Kahoona Logo - white.png'
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const backtoDashboard = () =>{
    history.push("/quotation-policy-tabs")
  }
  return (
    <>
      <div className='sharable_link_header'>
        <img src={logobar} alt="Website Logo" className="logo" onClick={backtoDashboard} />
      </div>
      <div class="containernavdeco2"></div>
    </>
  );
}

export default Header