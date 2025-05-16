import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import './History.css';

const History = () => {
  // Sample data for history events
  const historyEvents = [
    {
      id: 1,
      text: 'PCP Added and link shared',
      by: 'System',
      date: '05/03/2025'
    }
  ];

  return (
    <div className="history-container">
      <div className="history-header">
        <span>History</span>
        <ClockCircleOutlined className="clock-icon" />
      </div>
      
      <div className="history-content">
        {historyEvents.map(event => (
          <div key={event.id} className="history-item">
            <div className="history-marker">
              <div className="history-marker-dot"></div>
            </div>
            <div className="history-card">
              <div className="history-text">{event.text}</div>
              <div className="history-meta">
                <div className="history-by">By {event.by}</div>
                <div className="history-date">Updated On {event.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History; 