import React from 'react';
import { Progress } from 'antd';
import { ShareAltOutlined, CopyOutlined, CheckCircleFilled } from '@ant-design/icons';
import './ProgressTracking.css';

const ProgressTracking = () => {
  // Sample data for the progress steps
  const steps = [
    { 
      id: 1, 
      title: 'Agency program presentation', 
      status: 'completed', 
      statusText: 'Completed',
      hasShare: true,
      hasCopy: true 
    },
    { 
      id: 2, 
      title: 'Registration', 
      status: 'shared', 
      statusText: 'Link Shared',
      hasShare: true,
      hasCopy: false 
    },
    { 
      id: 3, 
      title: 'Pre-screening by Channel Development', 
      status: 'pending', 
      statusText: 'Pending',
      hasShare: false,
      hasCopy: false 
    },
    { 
      id: 4, 
      title: 'Interview with Channel Partner - Agent', 
      status: 'pending', 
      statusText: 'Pending',
      hasShare: false,
      hasCopy: false 
    },
    { 
      id: 5, 
      title: 'Training, Product & Sales Orientation', 
      status: 'pending', 
      statusText: 'Pending',
      hasShare: false,
      hasCopy: false 
    },
    { 
      id: 6, 
      title: 'Payment Link', 
      status: 'pending', 
      statusText: 'Pending',
      hasShare: false,
      hasCopy: false 
    }
  ];

  // Fixed progress percent at 2%
  const progressPercent = 2;

  return (
    <div className="progress-tracking-container">
      <div className="progress-tracking-header">
        <span>Progress Tracking</span>
      </div>
      
      <div className="progress-tracking-content">
        <div className="status-row">
          <span className="status-label">Current Status</span>
          <span className="status-value in-progress">In-Progress</span>
        </div>
        
        <div className="nested-card">
          <div className="stages-header">
            <span>Below is the stage-wise accreditation update</span>
          </div>
          
          <div className="progress-bar-container">
            <div className="progress-with-label">
              <div className="progress-percent-label">
                <span>{progressPercent}%</span>
              </div>
              <Progress 
                percent={progressPercent} 
                showInfo={false}
                strokeColor="#FF9F1C"
                trailColor="#e0e0e0"
                className="accreditation-progress"
              />
            </div>
          </div>
          
          <div className="progress-steps">
            {steps.map(step => (
              <div key={step.id} className={`step-item ${step.status}`}>
                <div className="step-marker"></div>
                <div className="step-content">
                  <div className="step-title">{step.title}</div>
                  <div className={`step-status ${step.status}`}>
                    {step.status === 'completed' && <CheckCircleFilled className="check-icon" />}
                    {step.statusText}
                  </div>
                </div>
                <div className="step-actions">
                  {step.hasShare && <ShareAltOutlined className="action-icon share-icon" />}
                  {step.hasCopy && <CopyOutlined className="action-icon copy-icon" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking; 