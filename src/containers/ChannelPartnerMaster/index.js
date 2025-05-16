import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './index.css';
import ChannelPartnerList from '../../components/ChannelPartnerList/ChannelPartnerList';
import { Plus } from 'lucide-react';
import { Pagination } from 'antd';
import { CHANNEL_PARTNER_CONFIG } from '../../config/channelPartnerConfig';
import person_black from "../../components/Activitity Tracker/icons/person_black.png";
import person_white from "../../components/Activitity Tracker/icons/person_white.png";
import group_white from "../../components/Activitity Tracker/icons/group_white.png";
import group_black from "../../components/Activitity Tracker/icons/group_black.png";
import filterIcon from "../../assets/Images/filter.png"

const ChannelPartnerMaster = () => {
  const [activeTab, setActiveTab] = useState('quotations');
  const { channelPartnerType = 'all' } = useParams();
  const history = useHistory();
  const [current, setCurrent] = useState(1);
  const [activeType, setActiveType] = useState('self');
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(
    CHANNEL_PARTNER_CONFIG.tabs.reduce((acc, tab) => ({
      ...acc,
      [tab.id]: tab.count
    }), {})
  );
  const pageSize = 14;

  const fetchData = useCallback(() => {
    setData(CHANNEL_PARTNER_CONFIG.mockData[channelPartnerType] || []);
  }, [channelPartnerType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleTabChange = (type) => {
    history.push(`/channelPartnerMaster/${type}`);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Prev</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handlePageChange = (page) => {
    setCurrent(page);
  };

  return (
    <div className="dashboard">
      <div className="icare_header">
        <h1>Channel Partner Recruitment</h1>
        <div className="tabs">
          {CHANNEL_PARTNER_CONFIG.tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab ${channelPartnerType === tab.id ? 'active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="icare_content">
        <div className="toolbar">
          <div className="toolbar-left">
            <button 
              className={`type-button ${activeType === 'self' ? 'active' : ''}`}
              onClick={() => setActiveType('self')}
            >
              <img 
                src={activeType === 'self' ? person_white : person_black} 
                alt="Self"
                className="type-icon"
              />
              Self
            </button>
            <button 
              className={`type-button ${activeType === 'team' ? 'active' : ''}`}
              onClick={() => setActiveType('team')}
            >
              <img 
                src={activeType === 'team' ? group_white : group_black} 
                alt="Team"
                className="type-icon"
              />
              Team
            </button>
            <select className="select-dropdown">
              {CHANNEL_PARTNER_CONFIG.dropdownOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button className="filter-button">
            <img src={filterIcon} alt="Filter" className="filter-icon" />
            Filter
          </button>
        </div>
        
        <ChannelPartnerList 
          data={data} 
          config={CHANNEL_PARTNER_CONFIG.cardConfig}
        />

        <div className="page-holder custom-pagination">
          <Pagination
            responsive
            current={current}
            onChange={handlePageChange}
            total={totalCount[activeTab]}
            pageSize={pageSize}
            itemRender={itemRender}
            showSizeChanger={false}
          />
        </div>

      </div>

      <button className="fab">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default ChannelPartnerMaster;