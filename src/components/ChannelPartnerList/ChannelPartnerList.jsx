import React from 'react';
import ChannelPartnerCard from '../ChannelPartnerCard/ChannelPartnerCard';
import './ChannelPartnerList.css';

const ChannelPartnerList = ({ data = [] }) => {
  if (!data.length) {
    return (
      <div className="empty-state">
        <div className="empty-icon">?</div>
        <h3>No Records Found</h3>
        <p>There are no channel partners to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="channel-partner-list">
      {data.map((item, index) => (
        <ChannelPartnerCard key={index} data={item} />
      ))}
    </div>
  );
};

export default ChannelPartnerList;