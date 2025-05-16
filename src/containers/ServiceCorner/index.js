import React,{useEffect} from 'react'
import './index.css'
import Tab from '../../components/Tab/Tab'
// import LeadCards from '../../components/LeadCards/LeadCards'
import RenewalCards from '../../components/RenewalCollections/Cards/RenewalCards'
import FloatButton from '../../components/FloatButton/FloatButton'
import * as actions from '../../store/actions/index';
import { Pagination } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import ServiceCornerAll from '../../components/ServiceCorner/ServiceAll'
const ServiceCorner = (props) => {
    const tabMenu = [
        {
            id:'allservicecorners',
            value:"allservicecorners"
        },
        {
            id:'forself',
            value:"forself"
        },
        {
            id:'forcustomers',
            value:"forcustomers"
        },
        
    ]

    return (
        <div style={{backgroundColor:'#fafafa'}}>
            <Tab tabMenu={tabMenu} header="Service Corner"/>
            {<ServiceCornerAll tabMenu={tabMenu}></ServiceCornerAll>}
            {/* <RenewalCards renewals={renewalsData} leadDataLoading={leadDataLoading}/> */}
            <FloatButton/>
        </div>
    )
}


export default ServiceCorner;