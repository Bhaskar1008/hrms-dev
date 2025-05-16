import React from 'react'
import { Row, Col, Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'
import './ProposalDetails.css'
import Tabs from '../../components/Tab/Tab'
import { Link } from 'react-router-dom'

let proposalRoute = "/leadmasterpage/proposal"
const tabMenu = [
    {
        id: 1,
        value: "Status",
    },
    // {
    //     id: 2,
    //     value: "Lead Details"
    // },
    // {
    //     id: 3,
    //     value: "Proposal Details"
    // },
    // {
    //     id: 4,
    //     value: "Documents Upload"
    // },
    {
        id: 2,
        value: "History"
    },

]

const ProposalDetails = () => {
    return (
        <>
            <Tabs
                tabMenu={tabMenu}
                header="New Lead"
                detailsRouteTab={proposalRoute}
                activeKey="3"

            />
            <div className="form-container ">
                <Row gutter={['', 24]}>
                    <Col className="form-body m0c" xs={22} sm={24} md={16} lg={16} xl={16} >
                        <div className="proposal">
                            <p className="proposal-title">Proposal Not Created Yet</p>
                            <div className="bg-proposal">
                            </div>
                            <Link to="/productmaster/protection"><Button type="primary" className="product-btn" size="large" icon={<PlusCircleOutlined size="large" />}>Go To Product</Button></Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default ProposalDetails
