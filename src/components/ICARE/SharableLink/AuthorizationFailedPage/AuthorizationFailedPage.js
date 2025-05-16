// SessionExpire.js
import React from 'react';
import './AuthorizationFailedPage.css';
import sessionExpireImage from '../../../../assets/Images/sessionexpirepage.png'; // Replace with your image file path

const SessionExpire = () => {
  return (
    <div className="session-expire-container">
      <img src={sessionExpireImage} alt="Session Expired" />
      {/* <h1>Session Expired</h1> */}
      <p>Your session has expired. Please log in again.</p>
      {/* Add your login link/button here */}
    </div>
  );
};

export default SessionExpire;
