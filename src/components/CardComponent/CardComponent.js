import React from 'react';
import './CardComponent.css';
import carImage from '../../assets/Images/car.png';
import travelImage from '../../assets/Images/travel.png';

const CardComponent = ({ data }) => {
  const {
    date,
    type,
    user,
    quoteType,
    travelPack,
    travelProduct,
    premium,
    status,
    expiry,
    quotationNumber,
    riskInspectionStatus
  } = data;

  const getTypeImage = () => {
    return type === 'MOTOR' 
      ? carImage
      : travelImage;
  }

  return (
    <div className="card">
      <div className="card-header">
        <div className="date">{date}</div>
        <div className={`tag ${type.toLowerCase()}`}>{type}</div>
      </div>
      
      <div className="user-info">
        <img 
          src={getTypeImage()} 
          alt={type} 
          className="avatar"
          style={{ objectFit: 'contain' }}
        />
        <div className="details">
          <div className="name">{user.name}</div>
          <div className="company">{user.company}</div>
        </div>
      </div>

      <div className="card-grid">
        <div className="info-group">
          <div className="label">Quote Type</div>
          <div className="value">{quoteType}</div>
        </div>
        
        <div className="info-group">
          <div className="label">Travel Pack</div>
          <div className="value">{travelPack}</div>
        </div>
        
        <div className="info-group">
          <div className="label">Travel Product</div>
          <div className="value">{travelProduct}</div>
        </div>
        
        <div className="info-group">
          <div className="label">Premium</div>
          <div className="value">{premium}</div>
        </div>
        
        <div className="info-group">
          <div className="label">Status</div>
          <div className={`value status ${status.toLowerCase()}`}>{status}</div>
        </div>
        
        <div className="info-group">
          <div className="label">Expiry</div>
          <div className="value">{expiry}</div>
        </div>
        
        <div className="info-group">
          <div className="label">Quotation Number</div>
          <div className="value">{quotationNumber}</div>
        </div>

        {riskInspectionStatus && (
          <div className="info-group">
            <div className="label">Risk Inspection Status</div>
            <div className={`value status ${riskInspectionStatus.toLowerCase()}`}>
              {riskInspectionStatus}
            </div>
          </div>
        )}
      </div>

      <button className="view-details">VIEW DETAILS</button>
    </div>
  );
};

export default CardComponent;