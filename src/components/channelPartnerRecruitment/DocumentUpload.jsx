import React from 'react';
import { Card } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './DocumentUpload.css';

const DocumentUpload = () => {
  const documents = [
    { id: 1, name: 'Agent Contract' },
    { id: 2, name: 'UBP EPAY Card Customer Account Opening Form' },
    { id: 3, name: 'TIN No Certificate' },
    { id: 4, name: 'Valid ID (Government Issued)' },
    { id: 5, name: 'NBI Clearance Certificate' },
    { id: 6, name: 'Photograph' },
  ];
  
  return (
    <div className="document-upload-container">
      <div className="document-upload-header">
        <span>Document Upload</span>
        <FormOutlined className="edit-icon" />
      </div>
      
      <Card className="document-upload-card">
        {documents.map((doc) => (
          <div key={doc.id} className="document-item">
            <div className="document-upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div className="document-details">
              <div className="document-name">{doc.name}</div>
              <div className="document-limit">Only .pdf, .jpg allowed. File limit is 5MB</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default DocumentUpload; 