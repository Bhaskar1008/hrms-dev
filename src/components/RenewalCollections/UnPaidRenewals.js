import React,{useEffect,useState} from 'react'
import './UnPaidRenewals.css'
import Tab from '../../components/Tab/Tab'
// import LeadCards from '../../components/LeadCards/LeadCards'
import RenewalCards from '../../components/RenewalCollections/Cards/RenewalCards'
import FloatButton from '../../components/FloatButton/FloatButton'
import * as actions from '../../store/actions/index';
import { Pagination,Row,Col } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const PaidRenewal = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.fetchUnPaidRenewals('',current))
    },[dispatch,current]);

    const unPaidRenewalsData = useSelector((state)=>state.renewals.unPaidRenewals)
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
            {unPaidRenewalsData?(<>
                <RenewalCards renewals={unPaidRenewalsData} leadDataLoading={leadDataLoading}/>
            <div className="page-holder">
                <Pagination
                    size="small"
                    current={current}
                    onChange={handlePageClick}
                    total={totalRenewals}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            </>):<>
            <Row gutter={['', 20]} justify="center">
                    <Col className="form-body m0a" xs={22} sm={24} md={16} lg={16} xl={16} >
                        <div className="proposal">
                            <div className="bg-norecord">
                            </div>
                            <p className="norecord-title">No Records Found</p>
                        </div>
                    </Col> 
                </Row>
            </>}
           
            <FloatButton/>
        </div>
    )
}


export default PaidRenewal;