import React,{useEffect,useState} from 'react'
import {Card,Avatar,Switch, Col,Row} from 'antd'
import {MoreOutlined } from '@ant-design/icons';
import './Cards.css';
import {useHistory } from 'react-router-dom';
import RenewalDetails from '../RenewalDetails';
const Cards = React.memo((props) => {

    const {user_Id,userStatus,fullName,annualisedPremium,end_date,proposer_ID_refs} = props
  const leadComponent = 
  userStatus === 'Paid'
  ? 
  <p className="user-status-text capitalize open">{userStatus}</p>
  :
  userStatus === 'unPaid'
  ?
  <p className="user-status-text capitalize converted">{userStatus}</p>
  :
  userStatus === 'Lapsed'
  ?
  <p className="user-status-text capitalize failed">{userStatus}</p>
  :
  <p className="user-status-text capitalize">{userStatus}</p>

    let avatar = fullName?.match(/\b(\w)/g)

    const [width, setWidth] = useState(window.innerWidth);
    const breakpoint = 620;
    const history = useHistory()
     useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth)
        window.addEventListener("resize", handleWindowResize);

        // Return a function from the effect that removes the event listener
        return () => window.removeEventListener("resize", handleWindowResize);
    }, [width]);

    const viewDetailsHandler =()=>{
        history.push({pathname:'/renewalMaster/Details',state: { proposer_ID_refs: proposer_ID_refs }})
    }

    // Card for desktop
    let card = 
            <Card
                loading={props.loading}
                className="lead-card-desktop"
                hoverable={true}>
                    <div className="avatar-and-status">
                        <Avatar style={{backgroundColor:'blueviolet'}} size={{xl: 50}}>{avatar}</Avatar>
                        {leadComponent}
                    </div>
                    <div className="content">
                        <div className="content-header">
                            <p className="user-name-text capitalize">
                                {fullName}
                                {/* <span className="user-id uppercase">
                                    {lead_Id}
                                </span> */}
                            </p>
                        </div>
                        <div className="content-body">
                            {/* <Card.Grid  hoverable={false} className="renewal-card "> */}
                                <Row className="renewal-card">
                                    <Col span={12}>
                                    <p className="text-type">Annualised Premium</p>
                                    <p className="text-content">{annualisedPremium}</p>
                                    </Col>
                            {/* </Card.Grid> */}
                            {/* <Card.Grid  hoverable={false} className="renewal-card"> */}
                                <Col span={12}>
                                <p className="text-type">End Date</p>
                                <p className="text-content capitalize">{end_date}</p>
                                </Col>
                            {/* </Card.Grid> */}
                            </Row>
                        </div>
                    </div>
                    <button className="renewal-update-btn" onClick={viewDetailsHandler}>View Details</button>  
            </Card>
    //Card for Mobile
    if(width<breakpoint){
        card = 
        <Card
            className="lead-card-mobile"
            hoverable>
            <Avatar size={{
                    xs: 36,
                    md: 40,
                    xl: 50,
                    }}
                    style={{backgroundColor:'blue'}}>{avatar}</Avatar>
            <div className="card-content-text capitalize">
                <p className="user-name-text">{fullName}</p>
                {/* <p className="user-status-text">{leadStatus}</p> */}
            </div>
            <MoreOutlined  style={{fontSize:'25px',marginLeft:'auto',color:'grey'}}/>
        </Card>
    }
    return (
            <div>{card}</div>

    )
})

export default Cards
