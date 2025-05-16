import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Switch, Row, Col, Button, Space, Select } from "antd";
import {
  MoreOutlined,
  DeleteOutlined,
  MessageOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import img1 from "../../../../src/images/Icon/image-54@2x.png";
import img2 from "../../../../src/images/Icon/image-55@2x.png";
import img3 from "../../../../src/images/Icon/image-56@2x.png";
import img4 from "../../../../src/images/Icon/image-57@2x.png";
import img5 from "../../../../src/images/Icon/Filled.png";

// import img2 from "../../../src/images/Icon/image-55@2x.png"
// import img3 from "../../../src/images/Icon/image-56@2x.png"
// import img4 from "../../../src/images/Icon/image-57@2x.png"

import "./ResourceCard.css";
const { Option } = Select;

const ResourceCard = () => {
  const handleSearch = (value) => {
    console.log("Searched:", value);
    // Perform search logic here
  };
  const cardData = [
    { id: 1, title: 'Card 1', content: 'Content for Card 1' },
    { id: 2, title: 'Card 2', content: 'Content for Card 2' },
    { id: 3, title: 'Card 2', content: 'Content for Card 2' },
    { id: 4, title: 'Card 2', content: 'Content for Card 2' },
    { id: 5, title: 'Card 2', content: 'Content for Card 2' },
    // Add more card data objects as needed
  ];

  return (
    //     <Card
    //   title="Card Title"
    //   extra={<Button type="link">More</Button>}
    //   style={{ width: 300 }}
    // >
    //   <p>Card content</p>
    //   <p>Card content</p>
    //   <p>Card content</p>

    // </Card>

    <div>

      <div className="card-container">

      {cardData.map((card) => (
        <Card key={card.id}  >

        <div className="oonaLeadCard">
          <div>
            {/* <Row className="oonaFisrt">
              <Card.Grid hoverable={false} className="grid-style">
                <p className="oonaText">05-06-2023</p>
              </Card.Grid>
              <Card.Grid hoverable={false} className="grid-style oonaMotor">
                <p className="textMotor">MOTOR</p>
              </Card.Grid>
            </Row> */}
            <Row className="oonaFisrt" gutter={8}>
              <Col xl={6} md={6} sm={6} xs={6}>
                <div className="logoResource">
                  <img className="image-54-icon" alt="" src={img5} />
                </div>
              </Col>

              <Col xl={18} md={18} sm={18} xs={18}>
                <p className="textAuto">PhilLife - Who We Are</p>
                <Row className="oonaFisrt">
                  <Col>
                    <span className="textAutot">Watch Time - 1:00</span>
                  </Col>
                  <Col>
                    <Button className="video-button">
                        Video
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>





          </div>
        </div>
      </Card>

      ))}
      </div>

    </div>
  );
};
export default ResourceCard;
