import React, { useState } from 'react';
import './DiscrepancyDetails.css';

const DiscrepancyDetails = () => {
  const [activeTab, setActiveTab] = useState(1);

  // Sample discrepancy data
  const discrepancies = [
    {
      id: 1,
      documentName: 'Agent contract',
      caseId: '1423',
      dateTime: '12 Jan, 2025 12:54',
      queryDescription: 'Re-upload Valid Agent contract - as image is not clear'
    },
    {
      id: 2,
      documentName: 'Address Proof',
      caseId: '1423',
      dateTime: '10 Jan, 2025 10:30',
      queryDescription: 'Please upload address proof with clear visibility'
    }
  ];

  return (
    <div className="discrepancy-container">
      <div className="discrepancy-header">
        <span>Discrepancy Details</span>
      </div>
      
      <div className="discrepancy-content">
        <div className="discrepancy-tabs">
          <button 
            className={`discrepancy-tab ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Discrepancy 1
          </button>
          <button 
            className={`discrepancy-tab ${activeTab === 2 ? 'active' : ''}`}
            onClick={() => setActiveTab(2)}
          >
            Discrepancy 2
          </button>
        </div>

        <div className="discrepancy-details">
          {discrepancies.map(discrepancy => (
            discrepancy.id === activeTab && (
              <div key={discrepancy.id} className="discrepancy-info">
                <div className="discrepancy-field">
                  <div className="field-label">Document Name</div>
                  <div className="field-value">{discrepancy.documentName}</div>
                </div>
                
                <div className="discrepancy-row">
                  <div className="discrepancy-field half">
                    <div className="field-label">Case ID</div>
                    <div className="field-value">{discrepancy.caseId}</div>
                  </div>
                  
                  <div className="discrepancy-field half">
                    <div className="field-label">Date & Time</div>
                    <div className="field-value">{discrepancy.dateTime}</div>
                  </div>
                </div>
                
                <div className="discrepancy-field">
                  <div className="field-label">Query Description</div>
                  <div className="field-value">{discrepancy.queryDescription}</div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscrepancyDetails; 