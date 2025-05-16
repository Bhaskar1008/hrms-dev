import React, { useState, useEffect } from 'react';
import './NotificationOona.css';
import { useSelector } from 'react-redux';
import axiosRequest from '../../../axios-request/request.methods';  
import FullPageLoader from '../../FullPageLoader/FullPageLoader';
import NoNotificationCard from './NoNotificationFound';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const NotificationOona = () => {
    const userId = useSelector(state => state.login.userId);
    const [activeTab, setActiveTab] = useState('all');
    const [_notify, set_Notify] = useState([]);
    const [loader, setLoader] = useState(false);
    const [totalCount, setTotalCount] = useState("");
    const [dynamicSkip, setDynamicSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const fetchData = async (skip = 0) => {
        if (!hasMore || loadingMore) return;
        setLoader(true);
        setLoadingMore(true);

        try {
            const result = await axiosRequest.get(
                `user/getnotification?notification_type=alerts&readStatus=0&skip=${skip}`
            );

            if (result?.statusCode === -1) {
                const newNotifications = result.data[0] || [];
                if (newNotifications.length === 0) {
                    setHasMore(false);
                } else {
                    set_Notify(prev => [...prev, ...newNotifications]);
                    setTotalCount(result?.data?.[1]?.[0]?.Notifycount[0]?.count || 0);
                    setDynamicSkip(skip + 15);
                }
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        } finally {
            setLoader(false);
            setLoadingMore(false);
        }
    };

    const clearAllNotifications = () => {
        set_Notify([]); // Assuming _notify is a state variable managed with useState
    };

    useEffect(() => {
        fetchData(0);
    }, [userId]);

    const handleScroll = () => {
        if (!hasMore || loadingMore) return;

        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50) {
            if(totalCount > dynamicSkip){
            fetchData(dynamicSkip);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore, dynamicSkip, loadingMore]);

    return (
        <>
            <FullPageLoader fromapploader={loader} />
            <div className='main-container' style={{ marginBottom: '15px' }}>
                    <Tabs activeKey={activeTab} onChange={handleTabChange} style={{ marginTop: '15px' }}>
                        <TabPane tab={`All (${totalCount || '0'})`} key="all">
                        {/* <div className='main-heading' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2>Notifications</h2>
                            {_notify.length > 0 && (
                                <button className='clear-all-btn' onClick={clearAllNotifications} style={{ background: '#1D428A', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' ,fontSize:'11px'}}>
                                    Clear All
                                </button>
                            )}
                        </div> */}
                            {_notify.length > 0 ? (
                                
                                
                                _notify.map(item => (
                                    <div key={item.userId} className='notification-card'>
                                        <div className='notification-parent'>
                                            <div className='notifi-child'>
                                                <h3>{item.title}</h3>
                                                <p>{item.body}</p>
                                            </div>
                                            <div className='notifi-child-cir'>
                                                <div className='circle1'></div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div style={{ marginBottom: '20px' }}>
                                    <NoNotificationCard />
                                </div>
                            )}
                        </TabPane>
                    </Tabs>
                </div>

        </>
    );
};

export default NotificationOona;