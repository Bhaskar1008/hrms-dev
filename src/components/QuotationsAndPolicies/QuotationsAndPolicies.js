import React from 'react';
import CardComponent from '../CardComponent/CardComponent';
import './QuotationsAndPolicies.css';

const QuotationsAndPolicies = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">?</div>
        <h3>No Records Found</h3>
        <p>There are no items to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="quotations-policies">
      {data.map((item, index) => (
        <CardComponent key={index} data={item} />
      ))}
    </div>
  );
};

export default QuotationsAndPolicies;