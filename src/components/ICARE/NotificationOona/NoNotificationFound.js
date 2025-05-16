import React from 'react';
import './NoNotificationCard.css'; // Import CSS file
import notificationIcon from '../../../assets/Images/no_notification-2.png'

const NoNotificationCard = () => {
  return (
    <div className="no-notification-card">
      <img src={notificationIcon} alt="Notification Icon" className="notification-icon" />
      <p className="no-notification-text">No notifications found</p>
    </div>
  );
};

export default NoNotificationCard;
