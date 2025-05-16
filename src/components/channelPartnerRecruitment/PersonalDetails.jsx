import React from 'react';
import { Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './PersonalDetails.css';

const PersonalDetails = () => {
  // Sample data for personal details
  const details = [
    { label: 'Address Line 1', value: '-' },
    { label: 'Address Line 2', value: '-' },
    { label: 'State', value: '-' },
    { label: 'City', value: '-' },
    { label: 'Pincode', value: '-' },
    { label: 'TIN No', value: '-' },
    { label: 'Mobile No', value: '-' },
    { label: 'Email ID', value: '-' },
    { label: 'Date Of Birth', value: '-' },
    { label: 'Gender', value: '-' },
    { label: 'Marital Status', value: '-' },
    { label: 'Telephone No', value: '-' }
  ];

  return (
    <div className="personal-details-container">
      <div className="personal-details-header">
        <span>Personal Details</span>
        <Button 
          type="text" 
          icon={<FormOutlined />} 
          className="edit-button"
        />
      </div>
      
      <div className="personal-details-content">
        <div className="details-grid">
          {details.map((detail, index) => (
            <div key={index} className="detail-row">
              <div className="detail-label">{detail.label}</div>
              <div className="detail-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails; 