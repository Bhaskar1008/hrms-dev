import React,{useEffect,useState} from 'react'
import './LapsedRenewals.css'
import Tab from '../../components/Tab/Tab'
// import LeadCards from '../../components/LeadCards/LeadCards'
import RenewalCards from '../../components/RenewalCollections/Cards/RenewalCards'
import FloatButton from '../../components/FloatButton/FloatButton'
import * as actions from '../../store/actions/index';
import { Pagination,Col } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const LapsedRenewal = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchLapsedRenewals('',current))
    },[dispatch,current]);

    const lapsedRenewalsData = useSelector((state)=>state.renewals.lapsedRenewals)
    //Loading Renewals data
    const leadDataLoading = useSelector((state)=>state.renewals.fetch_allRenewals_Loading)
    // renewals count of the page
    const totalRenewals = useSelector((state)=>{
        return state.renewals.count
    })

    //Pagination numbers function
    function itemRender(cur, type, originalElement) {
        const onPrev = ()=>{
            setcurrent(current-1)
        }
        const onNext = ()=>{
            setcurrent(current+1)
        }

        if (type === 'prev') {
            return <button current={current} onClick={onPrev}>Prev</button>;
          }
        if (type === 'next') {
          return <button current={current} onClick={onNext}>Next</button>;
        }
        return originalElement;
    }

    const handlePageClick = (page)=>{
        setcurrent(page)
    }
    const tabMenu = [
        {
            id:'allrenewals',
            value:"All"
        },
        {
            id:'paidrenewals',
            value:"Paid"
        },
        {
            id:'unpaidrenewals',
            value:"UnPaid"
        },
        {
            id:'lapsedrenewals',
            value:"Lapsed"
        },
        
    ]

    return (
        <div style={{backgroundColor:'#fafafa'}}>
            <Tab tabMenu={tabMenu} header="My Renewals"/>
            {lapsedRenewalsData ?(<RenewalCards renewals={lapsedRenewalsData} leadDataLoading={leadDataLoading}/>):
            ( <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
            <div className="proposal">
                <div className="bg-norecord">
                </div>
                <p className="norecord-title">No Records Found</p>
            </div>
        </Col>)}
            
            <div className="page-holder">
                <Pagination
                    size="small"
                    current={current}
                    onChange={handlePageClick}
                    total={totalRenewals}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            <FloatButton/>
        </div>
    )
}


export default LapsedRenewal;