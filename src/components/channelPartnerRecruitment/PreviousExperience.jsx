import React from 'react';
import { Card } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './PersonalDetails.css';

const PreviousExperience = () => (
  <div className="personal-details-container">
    <div className="personal-details-header">
      <span>Previous Experience</span>
      <FormOutlined className="edit-icon" />
    </div>
    <Card className="personal-details-card">
      <div className="details-grid" style={{ display: 'block', padding: '12px 8px' }}>
        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Work Experience 2</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Company Name</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>From - To</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>&nbsp;</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Job Title</div>
          </div>
        </div>

        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Work Experience 1</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Company Name</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>From - To</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>&nbsp;</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Job Title</div>
          </div>
        </div>

        <div style={{ display: 'flex', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Selling Experience</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Selling Experience</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>&nbsp;</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Type Of Products Sold</div>
          </div>
        </div>

        <div style={{ marginTop: '8px' }}>
          <div style={{ color: '#00AEC1', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Declarations</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Have You Been An Agent Of Any HMO, Life, Non-Life, Pre-Need Company Before?</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>-</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Are You Still Connected With The Said Company</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>-</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Has There Been Any Civil Or Criminal Filed Or Pending Case Against You?</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>-</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Have You Ever Been Discharged Or Terminated From Any Employment?</div>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>-</div>
        </div>
      </div>
    </Card>
  </div>
);

export default PreviousExperience; 