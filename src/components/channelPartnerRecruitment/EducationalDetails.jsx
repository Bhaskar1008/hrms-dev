import React from 'react';
import { Card } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './PersonalDetails.css';

const EducationalDetails = () => {
  const details = [
    { label: 'High School Graduate', value: '-' },
    { label: 'College Graduate', value: '-' }
  ];

  return (
    <div className="personal-details-container">
      <div className="personal-details-header" style={{ color: '#FF8C00' }}>
        <span>Educational Details</span>
        <FormOutlined className="edit-icon" />
      </div>
      <Card className="personal-details-card">
        <div className="details-grid">
          {details.map((detail, index) => (
            <div key={index} className="detail-row">
              <div className="detail-label">{detail.label}</div>
              <div className="detail-value">{detail.value}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EducationalDetails; 