import React, { useState } from 'react'
import  ResourceCard  from "./ResourceCard"
import './ResourcesOona.css'
import { Tabs } from 'antd';
const { TabPane } = Tabs;


const ResourcesOona = () => {
    const [activeTab, setActiveTab] = useState('all');

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const unread = [
        { name: 'You received a commission!', day: '1 day ago' },
        { name: 'CPTL Sale Completed', day: '10 day ago' },
        { name: 'CPTL Sale Completed', day: '10 day ago' },
        { name: 'CPTL Sale Completed', day: '10 day ago' },
    ]

    const read = [
        { name: 'Quick Quote #999XXXXXXX has been sent', day: '12 day ago' },
        { name: 'Formal Quote #9999XXXXXX has been sent', day: '12 day ago' },
    ]
    return (
        <>
            <div className='main-container'>
                <div className='main-heading'>
                    <h2>Resources</h2>
                </div>
                <Tabs activeKey={activeTab} onChange={handleTabChange} >
                    <TabPane tab="All" key="all">
                        <ResourceCard />
                    </TabPane>
                    <TabPane tab="Videos" key="videos">

                    </TabPane>
                    <TabPane tab="Brochures" key="brochures">

                    </TabPane>
                    <TabPane tab="External Links" key="externalinks">

                    </TabPane>

                </Tabs>
            </div>
        </>
    )
}

export default ResourcesOona