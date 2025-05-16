import React from 'react'
import Cards from './Cards'
import './RenewalCards.css'
import { Row, Col,Card } from 'antd'
import _ from "lodash";
import NoRecordsFound from '../../NoRcordsFound/NoRecordsFound';

const RenewalCards = (props)=> {
    let card = [];
    if(_.isEmpty(props.renewals)){return <NoRecordsFound/>    }
    if(props.renewals && !_.isEmpty(props.renewals)){
        card = _.map(props.renewals, (user, index) => {
       return ( <>
            {user == 'N'?'':<Col sm={18}  md={18} lg={11} xl={10}>
            <Cards 
                key={user._id}
                user_Id={user.proposer_ID}
                userStatus={user.policy_status}
                fullName={user.proposerName}
                annualisedPremium={user.PremiumOneYear}
                end_date={user.policyEndDate}
                proposer_ID_refs={user.proposer_ID_refs}
                loading={props.renewalsDataLoading}
            />
            </Col>}
           
        </>
       )
        })
    }
    return (
            <div className="cards-container">
                <Row justify="center" gutter={[18,{ xs: 8, sm: 10, md: 10, lg:18 }]}>
              {card}
              <Col sm={18}  md={18} lg={11} xl={10}>
                    </Col>
              </Row>
            </div>
    )
}

export default RenewalCards
