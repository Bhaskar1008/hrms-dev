import React, { useState, useEffect } from 'react';
import { Button, Tag, Avatar } from 'antd';
import { PhoneOutlined, MailOutlined, UserAddOutlined, DeleteOutlined, BellOutlined, CloseOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import './LeadDetails.css';
import EmailDialog from './EmailDialog';
import AssignDialog from './AssignDialog';
import ReminderDialog from './ReminderDialog';
import ProgressTracking from './ProgressTracking';
import PersonalDetails from './PersonalDetails';
import History from './History';
import DocumentUpload from './DocumentUpload';
import EducationalDetails from './EducationalDetails';
import BankAccountDetails from './BankAccountDetails';
import PreviousExperience from './PreviousExperience';
import Reminders from './Reminders';
import DiscrepancyDetails from './DiscrepancyDetails';
import InterviewQuestions from './InterviewQuestions';
import how_to_reg from "./../Activitity Tracker/icons/how_to_reg.png";
import phone_in_talk from "./../Activitity Tracker/icons/phone_in_talk.png";
import archive from "./../Activitity Tracker/icons/archive.png";



const ChannelPartnerRecruitment = () => {
  const history = useHistory();
  const [emailDialogVisible, setEmailDialogVisible] = useState(false);
  const [assignDialogVisible, setAssignDialogVisible] = useState(false);
  const [reminderDialogVisible, setReminderDialogVisible] = useState(false);

  useEffect(() => {
    console.log('Component mounted');
    console.log('EmailDialog imported:', !!EmailDialog);
    console.log('AssignDialog imported:', !!AssignDialog);
    console.log('ReminderDialog imported:', !!ReminderDialog);
  }, []);

  const onClose = () => {
    // Navigate to phil-Dashboard
    console.log('Navigating to phil-Dashboard');
    history.push('/channelPartnerMaster/all');
  };

  const handleEmailClick = () => {
    console.log('Email button clicked');
    setEmailDialogVisible(true);
    console.log('Email dialog state set to:', true);
  };

  const closeEmailDialog = () => {
    console.log('Closing email dialog');
    setEmailDialogVisible(false);
  };

  const handleAssignClick = () => {
    console.log('Assign button clicked');
    setAssignDialogVisible(true);
    console.log('Assign dialog state set to:', true);
  };

  const closeAssignDialog = () => {
    console.log('Closing assign dialog');
    setAssignDialogVisible(false);
  };

  const handleReminderClick = () => {
    console.log('Reminder button clicked');
    setReminderDialogVisible(true);
    console.log('Reminder dialog state set to:', true);
  };

  const closeReminderDialog = () => {
    console.log('Closing reminder dialog');
    setReminderDialogVisible(false);
  };

  return (
    <div className="lead-details-modal">
      <div className="lead-details-header">
        <span>Lead Details</span>
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={onClose} 
          className="close-button"
        />
      </div>
      
      <div className="lead-content">
        <div className="lead-profile-container">
          <div className="lead-profile">
            <Avatar
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                backgroundColor: "#FF6D0024",
                verticalAlign: "middle",
                textTransform: "uppercase",
                color: "#FF6D00",
                width: "80px",
                height: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              size={80}
              gap={1}
              className="lead-avatar"
            >
              IM
            </Avatar>
            <div className="lead-info">
              <div className="lead-name-tag">
                <h3 className="lead-name">Isabella Mendoza</h3>
                <Tag className="agent-tag">AGENT</Tag>
              </div>
              <p className="lead-app-id">APP ID: E112233445</p>
            </div>
          </div>
          
          <div className="lead-actions">
            <Button 
              type="text" 
              className="action-button call-button"
            >
              <img 
                src={phone_in_talk} 
                alt="Phone" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  marginBottom: '6px',
                  objectFit: 'contain'
                }} 
              />
              <span className="action-text">CALL</span>
            </Button>
            <Button 
              type="text" 
              icon={<MailOutlined />} 
              className="action-button email-button"
              onClick={handleEmailClick}
            >
              <span className="action-text">EMAIL</span>
            </Button>
            <Button 
              type="text" 
              className="action-button assign-button"
              onClick={handleAssignClick}
            >
              <img 
                src={how_to_reg} 
                alt="Assign" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  marginBottom: '6px',
                  objectFit: 'contain'
                }} 
              />
              <span className="action-text">ASSIGN TO</span>
            </Button>
            <Button type="text"
              className="action-button archive-button"
            >
              <img 
                src={archive} 
                alt="Archive" 
                style={{ 
                  width: '28px', 
                  height: '28px', 
                  marginBottom: '6px',
                  objectFit: 'contain'
                }} 
              />
              <span className="action-text">ARCHIVE</span>
            </Button>
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              className="action-button reminder-button"
              onClick={handleReminderClick}
            >
              <span className="action-text">ADD REMINDER</span>
            </Button>
          </div>
        </div>
        
        {/* Cards Layout Section */}
        <div className="cards-container">
          <div>
            <ProgressTracking />
          </div>
          <div> 
            <PersonalDetails />
            <DocumentUpload />
            <EducationalDetails />
            <BankAccountDetails />
            <PreviousExperience />
          </div>
          <div> 
          <Reminders />
          <DiscrepancyDetails />
          <InterviewQuestions />
          <History />
          </div>
        </div>
        
        {/* Additional content will be added here based on future Figma images */}
      </div>

      <EmailDialog 
        visible={emailDialogVisible} 
        onClose={closeEmailDialog} 
        recipientName="Isabella Mendoza"
        recipientEmail="isabella.mendoza@example.com"
      />
      
      <AssignDialog
        visible={assignDialogVisible}
        onClose={closeAssignDialog}
      />
      
      <ReminderDialog
        visible={reminderDialogVisible}
        onClose={closeReminderDialog}
      />
    </div>
  );
};

export default ChannelPartnerRecruitment;
