import React from 'react';
import './NoDataCard.css'; // You'll need to create this CSS file for styling.
import { Card } from 'antd';
import actionNoData from "../../../../../../assets/Actionnodata.png";

function NoDataCard() {
  return (
    <div className="no-data-card">
      {/* <div className="no-data-content">
        <p>No data found.</p>
      </div> */}
      <Card className="card" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={actionNoData} />
          <p
            style={{
              fontWeight: 600,
              color: "#01b4bb",
              fontSize: "22px",
            }}
          >
            No Records Found!
          </p>
        </div>
      </Card>
    </div>
  );
}

export default NoDataCard;
