import React from 'react';
import './BulkAction.css';
import { Tabs,Input,Calendar   } from 'antd';
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";

// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

const BulkAction = () => {  
    const { TabPane } = Tabs;

    const { TextArea } = Input;

    const onChange = e => {
    };

    function callback(key) {
    }
    function onPanelChange(value, mode) {
      }
    return (
        <Tabs className='main-content' defaultActiveKey="1" onChange={callback}>
            <TabPane tabBarStyle={{width: '35%'}} className='subtab1' tab="Bulk Action" key="1">
                <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="EMAIL" key="1">
                    Content of EMAIL
                    </TabPane>
                    <TabPane tab="SMS" key="2">
                    <TextArea showCount maxLength={200} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="WHATSAPP" key="3">
                    <TextArea showCount style={{ height: 450 }} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="EVENT" key="4">
                    <Calendar onPanelChange={onPanelChange} />
                    {/* <FullCalendar
                        defaultView="dayGridMonth"
                        header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin]}
                        events={events}
                    /> */}
                    </TabPane>
                </Tabs>
            </TabPane>
            <TabPane tab="Sent" key="2">
            <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="EMAIL" key="1">
                    Content of EMAIL
                    </TabPane>
                    <TabPane tab="SMS" key="2">
                    <TextArea showCount maxLength={200} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="WHATSAPP" key="3">
                    <TextArea showCount style={{ height: 450 }} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="EVENT" key="4">
                    <Calendar onPanelChange={onPanelChange} />
                    </TabPane>
                </Tabs>
            </TabPane>
            <TabPane tab="Draft" key="3">
            <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="EMAIL" key="1">
                    Content of EMAIL
                    </TabPane>
                    <TabPane tab="SMS" key="2">
                    <TextArea showCount maxLength={200} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="WHATSAPP" key="3">
                    <TextArea showCount style={{ height: 450 }} onChange={onChange} />
                    </TabPane>
                    <TabPane tab="EVENT" key="4">
                    <Calendar onPanelChange={onPanelChange} />
                    </TabPane>
                </Tabs>
            </TabPane>
        </Tabs>
    )
}

export default BulkAction