import React, { useEffect, useState } from 'react';
import { Button, Input, Tag } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './EmailDialog.css';

const { TextArea } = Input;

const EmailDialog = ({ visible, onClose, recipientName, recipientEmail }) => {
  const [email, setEmail] = useState(recipientEmail || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    console.log('EmailDialog rendered with visible:', visible);
  }, [visible]);

  if (!visible) return null;
  
  const handleSubmit = () => {
    console.log('Email submitted with data:', { email, subject, message });
    onClose();
  };
  
  return (
    <div className="email-dialog-overlay">
      <div className="email-dialog">
        <div className="email-dialog-header">
          <span>Compose Email</span>
          <CloseOutlined onClick={onClose} className="dialog-close-icon" />
        </div>
        
        <div className="email-dialog-content">
          <div className="email-form-item">
            <label>Send To *</label>
            <div className="recipient-input">
              <Tag className="recipient-tag" closable={false}>
                <span className="recipient-name">{recipientName || 'Isabella Mendoza'}</span>
              </Tag>
              <Input 
                placeholder="Enter Mail ID" 
                className="mail-id-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          
          <div className="email-form-item">
            <label>Subject</label>
            <Input 
              placeholder="Enter Subject" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          
          <div className="email-form-item">
            <label>Message</label>
            <TextArea 
              placeholder="Enter message" 
              autoSize={{ minRows: 5 }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>
        
        <div className="email-dialog-footer">
          <Button className="cancel-btn" onClick={onClose}>Cancel</Button>
          <Button type="primary" className="submit-btn" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default EmailDialog; 