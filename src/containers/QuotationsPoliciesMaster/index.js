import React, { useState, useEffect } from 'react';
import './index.css';
import QuotationsAndPolicies from '../../components/QuotationsAndPolicies/QuotationsAndPolicies';
import { Plus } from 'lucide-react';
import { Pagination } from 'antd';
import config from '../../config/api.config';
import quotationsPoliciesService from '../../services/quotationsPoliciesService';
import filterIcon from '../../assets/Images/filter.png';

const QuotationsPoliciesMaster = () => {
  const [activeTab, setActiveTab] = useState('quotations');
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState({ quotations: 0, policies: 0 });
  const pageSize = 14;

  const quotationsData = [{"date":"12 June 2023","type":"MOTOR","user":{"avatar":"JD","name":"Juan Dela Cruz","company":"DA ALMENDRAS"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"},{"date":"12 June 2023","type":"MOTOR","user":{"avatar":"JD","name":"Juan Dela Cruz","company":"DA ALMENDRAS"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184"}];

  const policiesData = [{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"},{"date":"12 June 2023","type":"MOTOR","user":{"avatar":"AL","name":"Ana Lopez","company":"DA ALMENDRAS"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"},{"date":"12 June 2023","type":"TRAVEL","user":{"avatar":"MS","name":"Maria Santos","company":"Ketursko Roy"},"quoteType":"Formal","travelPack":"PHILIPPINES","travelProduct":"COMPLETO","premium":"876.64","status":"ACTIVE","expiry":"09/30/2023","quotationNumber":"3802302004184","riskInspectionStatus":"REQUIRED"}];

  useEffect(() => {
    fetchData();
  }, [activeTab, current]);

  const fetchData = async () => {
    if (!config.useMockData) {
      try {
        const params = {
          page: current,
          pageSize: pageSize,
          type: activeTab
        };

        const response = await quotationsPoliciesService.getAll(params);
        setData(response.data);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]);
      }
    } else {
      console.log('Using mock data');
      const mockData = activeTab === 'quotations' ? quotationsData : policiesData;
      setData(mockData);
      console.log('Mock data:', data);
      setTotalCount({
        quotations: quotationsData.length,
        policies: policiesData.length
      });
    }
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
        <h1>Quotations/Policies</h1>
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'quotations' ? 'active' : ''}`}
            onClick={() => setActiveTab('quotations')}
          >
            Quotations ({totalCount.quotations})
          </button>
          <button 
            className={`tab ${activeTab === 'policies' ? 'active' : ''}`}
            onClick={() => setActiveTab('policies')}
          >
            Policies ({totalCount.policies})
          </button>
        </div>
      </div>

      <div className="icare_content">
        <div className="toolbar">
          <h2>List Of {activeTab === 'quotations' ? 'Quotations' : 'Policies'}</h2>
          <button className="filter-button">
            <img src={filterIcon} alt="Filter" className="filter-icon" />
            Filter
          </button>

        </div>
        
        <QuotationsAndPolicies data={data} />

        <div className="page-holder">
          <Pagination
            responsive
            current={current}
            onChange={handlePageChange}
            total={totalCount[activeTab]}
            pageSize={pageSize}
            itemRender={itemRender}
          />
        </div>
      </div>

      <button className="fab">
        <Plus size={24} />
      </button>
    </div>
  );
};

export default QuotationsPoliciesMaster;