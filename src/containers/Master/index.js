import React,{useEffect,useState} from 'react';
import './index.css';
import MainTabs from '../../components/MainTabs/MainTabs';
// import LeadCards from '../../components/LeadCards/LeadCards';
import FloatButton from '../../components/FloatButton/FloatButton';
// import * as actions from '../../store/actions/index';
import { Pagination,Button } from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const Master = (props) => {
    //Set current page no of the page
    const [current,setcurrent] = useState(1)
    const dispatch = useDispatch()
    // useEffect(() => {

    //     dispatch(actions.fetchAllLeads('',current))
    // },[dispatch,current]);

    //Accessing LeadCard data  from store
    const leadsData = useSelector((state)=>state.leads.allLeads)
    //Loading leads data
    const leadDataLoading = useSelector((state)=>state.leads.fetch_allLeads_Loading)
    // lead count of the page
    const totalLeads = useSelector((state)=>{
        return state.leads.count
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
            return <a current={current} onClick={onPrev} style={{color:'#1D428A'}}>Prev</a>;
          }
        if (type === 'next') {
          return <a current={current} onClick={onNext}style={{color:'#1D428A'}}>Next</a>;
        }
        return originalElement;
    }

    const handlePageClick = (page)=>{
        setcurrent(page)
    }
    const tabMenu = [
        {
            id:'benefitillustrator',
            value:"benefitillustrator"
        },
        {
            id:'proposalfulfilment',
            value:"proposalfulfilment"
        },
        {
            id:'prepaymentreview',
            value:"prepaymentreview"
        },
        {
            id:'paymentoptions',
            value:"paymentoptions"
        },
        {
            id:'uploaddocuments',
            value:"uploaddocuments"
        },
        {
            id: 'proposalhistory',
            value:"proposalhistory"
        }

    ]

    return (
        <div style={{backgroundColor:'#fafafa', }}>
            <MainTabs
                tabMenu={tabMenu}
                header="Lead"
                current={current}
                />
                <Button type='primary' className="export-btn">Export</Button>
            {/* <div className="export-btn-holder">
            </div> */}
            {/* <LeadCards leads={leadsData} leadDataLoading={leadDataLoading}/> */}
            <div className="page-holder">
                <Pagination
                    responsive
                    current={current}
                    onChange={handlePageClick}
                    total={totalLeads}
                    defaultPageSize={15}
                    itemRender={itemRender} />
            </div>
            {/* <FloatButton/> */}
        </div>
    )
}


export default Master;
