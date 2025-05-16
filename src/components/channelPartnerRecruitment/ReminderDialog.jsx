import React, { useEffect } from 'react';
import { Button, Input, DatePicker, TimePicker } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './ReminderDialog.css';

const { TextArea } = Input;

const ReminderDialog = ({ visible, onClose }) => {
  useEffect(() => {
    console.log('ReminderDialog rendered with visible:', visible);
  }, [visible]);

  if (!visible) return null;
  
  const handleSubmit = () => {
    console.log('Reminder submitted');
    onClose();
  };
  
  return (
    <div className="reminder-dialog-overlay">
      <div className="reminder-dialog">
        <div className="reminder-dialog-header">
          <span>Add Reminder</span>
          <CloseOutlined onClick={onClose} className="dialog-close-icon" />
        </div>
        
        <div className="reminder-dialog-content">
          <div className="reminder-form-row">
            <div className="reminder-form-column">
              <label>Date</label>
              <DatePicker
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                className="date-picker"
              />
            </div>
            <div className="reminder-form-column">
              <label>Time</label>
              <TimePicker
                format="hh:mm A"
                use12Hours
                placeholder="hh:mm AM/PM"
                className="time-picker"
              />
            </div>
          </div>
          
          <div className="reminder-form-section">
            <label>Message</label>
            <TextArea 
              placeholder="Enter message" 
              className="reminder-message"
              autoSize={{ minRows: 4 }}
            />
          </div>
        </div>
        
        <div className="reminder-dialog-footer">
          <Button className="cancel-btn" onClick={onClose}>Cancel</Button>
          <Button type="primary" className="submit-btn" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default ReminderDialog; 