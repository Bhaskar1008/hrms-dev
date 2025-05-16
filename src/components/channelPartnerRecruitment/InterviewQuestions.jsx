import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import './InterviewQuestions.css';
import RejectionModal from './RejectionModal';

const InterviewQuestions = () => {
  const [rejectionModalVisible, setRejectionModalVisible] = useState(false);
  
  // Sample questions
  const questions = [
    "Do you have prior experience in selling financial products (loans, insurance, investments, etc.)?",
    "How do you plan to generate leads for loan Applications?",
    "Are you currently associated with any other financial institutions or lending companies?",
    "What is your expected monthly loan disbursement target?",
    "Are you willing to undergo basic Training, Product & Sales Orientation on our loan products and sales processes?"
  ];

  const handleRejectClick = () => {
    setRejectionModalVisible(true);
  };

  const handleModalClose = () => {
    setRejectionModalVisible(false);
  };

  return (
    <div className="interview-container">
      <div className="interview-header">
        <span>Interview Questions</span>
        <ExportOutlined className="export-icon" />
      </div>
      
      <div className="interview-content">
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <div className="question-text">{question}</div>
            <Input 
              placeholder="Enter Name" 
              className="question-input" 
            />
          </div>
        ))}
        
        <div className="interview-actions">
          <Button 
            className="reject-button" 
            onClick={handleRejectClick}
          >
            Reject
          </Button>
          <Button type="primary" className="approve-button">Approve</Button>
        </div>
      </div>

      <RejectionModal 
        visible={rejectionModalVisible}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default InterviewQuestions; 