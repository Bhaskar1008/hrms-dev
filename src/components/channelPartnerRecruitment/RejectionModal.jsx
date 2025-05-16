import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './RejectionModal.css';

const { TextArea } = Input;

const RejectionModal = ({ visible, onClose, leadName = "Isabella Mendoza" }) => {
  const [remarks, setRemarks] = useState('');
  
  const handleCancel = () => {
    setRemarks('');
    onClose();
  };
  
  const handleReject = () => {
    // In a real implementation, this would send the rejection with remarks
    console.log('Rejected with remarks:', remarks);
    // Clear the remarks
    setRemarks('');
    // Close the modal and go back to main screen
    onClose();
  };
  
  return (
    <Modal
      title={null}
      open={visible}
      footer={null}
      closable={false}
      centered
      className="rejection-modal"
      width={450}
      maskClosable={false}
    >
      <div className="rejection-modal-header">
        <div className="rejection-modal-title">Reject PCP - {leadName}</div>
        <Button 
          type="text" 
          icon={<CloseOutlined />} 
          onClick={handleCancel}
          className="rejection-modal-close"
        />
      </div>
      
      <div className="rejection-modal-content">
        <div className="rejection-field">
          <label className="rejection-label">
            Rejection Remarks<span className="required">*</span>
          </label>
          <TextArea
            placeholder="Enter Remarks"
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="rejection-textarea"
          />
        </div>
        
        <div className="rejection-actions">
          <Button 
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </Button>
          <Button 
            type="primary" 
            onClick={handleReject}
            className="confirm-reject-button"
          >
            Reject
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectionModal; 