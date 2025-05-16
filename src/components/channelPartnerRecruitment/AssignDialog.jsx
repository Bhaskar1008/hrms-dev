import React, { useEffect } from 'react';
import { Button, Input, Select } from 'antd';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import './AssignDialog.css';

const AssignDialog = ({ visible, onClose }) => {
  useEffect(() => {
    console.log('AssignDialog rendered with visible:', visible);
  }, [visible]);

  if (!visible) return null;
  
  const handleAssign = () => {
    console.log('Lead assigned');
    onClose();
  };
  
  return (
    <div className="assign-dialog-overlay">
      <div className="assign-dialog">
        <div className="assign-dialog-header">
          <span>Assign Lead</span>
          <CloseOutlined onClick={onClose} className="dialog-close-icon" />
        </div>
        
        <div className="assign-dialog-content">
          <div className="assign-form-section">
            <label>Hierarchy</label>
            <Select
              placeholder="Select"
              className="hierarchy-select"
              options={[
                { value: 'team1', label: 'Team 1' },
                { value: 'team2', label: 'Team 2' },
                { value: 'team3', label: 'Team 3' }
              ]}
            />
          </div>
          
          <div className="assign-form-section">
            <label>Add Team Members</label>
            <div className="search-members">
              <Input 
                placeholder="Search Members" 
                prefix={<SearchOutlined />}
                className="members-search-input"
              />
            </div>
          </div>
        </div>
        
        <div className="assign-dialog-footer">
          <Button className="cancel-btn" onClick={onClose}>Cancel</Button>
          <Button type="primary" className="assign-btn" onClick={handleAssign}>Assign</Button>
        </div>
      </div>
    </div>
  );
};

export default AssignDialog; 