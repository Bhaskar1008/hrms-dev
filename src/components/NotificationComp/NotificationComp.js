import React, {useState, useEffect} from 'react'
import { Row, Col } from 'antd'
import './Notification.css'
import { Link,useHistory } from 'react-router-dom';
import moment from 'moment'
import axiosRequest from '../../axios-request/request.methods'  
import { useSelector ,useDispatch} from "react-redux";
import Tabs from "../../components/Tab/Tab";

const NotificationComp = () => {
    const userId = useSelector(state => state.login.userId)
    const history = useHistory();
    const MAX_ITEMS = 7;
    const [isOpen, setIsOpen] = useState(false)
    // api integation 
    const [_notify, set_Notify] = useState([]) 
    const [isShown, setIsShown] = useState(true);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    
    useEffect(() => {
        // simple using fetch  
        const fetchData = async () => {
          try {
            let data = await axiosRequest.get(`user/getnotification?notification_type=alerts&readStatus=0`)
                let res = data
                set_Notify(res[0]);
          } catch (error) {
            console.log("error", error);
          }
        };
    
        fetchData()

    }, [])

    
    function toggle(){
        setLoading(true);
        setTimeout(() => {
            setIsOpen(!isOpen)
            setIsShown(current => !current);
            setLoading(false);
        }, 2000);
        
    }

    function gotoviewdetaild(data){
            if(data.leadId === null || data.leadId === undefined || data.leadId === ""){
                history.push('/todo')
            }else{
                // history.push('/leadmasterpage/statuslead')
                let id = data.leadId 
                dispatch({ data: id, type: "CURRENT_UPDATING_ID" });
                history.push("/leadmasterpage/statuslead", { leadID: id });
            }
            
    }

    function getRenderedItems() {
        if (isOpen) {
          return _notify;
        }
        return _notify.slice(0, MAX_ITEMS);
      }

  return (
    <>
        {/* <div className="header">
            <Row >
                <Col><p className="product-title">Notification</p></Col>
            </Row>
        </div> */}
        <Tabs tabMenu={[]} header="Notification" activeKey="1" />
        
       {/* Start the node data */}

        {
            _notify?.length && _notify?.length > 0 ? <div className='mainTab'>
            <div className="stepper d-flex flex-column mt-2 ml-2">
                <div className="d-flex mb-1">
                    <div className="d-flex flex-column pr-4 align-items-center">
                    <div className='startNode'></div>
                        <div className="line h-100"></div>
                    </div>
                    <div>
                        <div className='notifyHead'>
                            <h4>Alert</h4>
                        </div>
                    </div>
                </div>

                {
                   Array.isArray(getRenderedItems()) ?
                   getRenderedItems().map((notify, index) => {
                        return <div key={index} className="d-flex mb-1 ml-4">
                        <div className="d-flex flex-column pr-4 align-items-center">
                            <div className='steps'></div>
                            <div className="line h-100"></div>
                        </div>
                        <div className='responsive_panel'>
                            <div className='box-data1'>
                                <div className='notification_data1'>
                                    <div className='list_data1'>
                                        <h4>{notify.title}</h4>
                                        <p>{notify.body}</p>
                                    </div>
                                    <div className='date1'>
                                        <p>{moment(notify.created_date).format('DD-MM-YYYY')} {moment(notify.created_date).format('LT')}</p>
                                        <button onClick={() => { gotoviewdetaild(notify) }}>{notify.details ? notify.details : 'View Details'}</button>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                 </div>
                    }): null
                }
            </div>


            {/* load more button */}
            
            <div className='loadMore'>
            {loading ? <button>Loading..</button> :  
                <button onClick={toggle} style={{display: isShown ? '-webkit-inline-box' : 'none', textAlign: 'center'}}>
                     {isOpen ? 'Load Less' : 'Load More'}
                </button>
            }
               
            </div>
            
            
        </div> : <div className='no_agent'>
            <p>No Notification by Agent</p>
        </div>
        }
        
    </>
  )
}

export default NotificationComp