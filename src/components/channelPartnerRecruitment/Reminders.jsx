import React from 'react';
import { Checkbox } from 'antd';
import './Reminders.css';

const Reminders = () => {
  // Sample data for reminders
  const reminderItems = [
    {
      id: 1,
      text: 'Need to call Isabella for uploading Additional Document.',
      date: '26-02-2023',
      time: '05:19 PM',
      completed: false
    },
    {
      id: 2,
      text: 'Mail Isabella regarding the Progress tracker',
      date: '26-02-2023',
      time: '05:19 PM',
      completed: false
    }
  ];

  return (
    <div className="reminders-container">
      <div className="reminders-header">
        <span>Reminders</span>
      </div>
      
      <div className="reminders-content">
        {reminderItems.map(reminder => (
          <div key={reminder.id} className="reminder-item">
            <Checkbox className="reminder-checkbox">
              {reminder.text}
            </Checkbox>
            <div className="reminder-date">
              {reminder.date}&nbsp;&bull;&nbsp;{reminder.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reminders; 