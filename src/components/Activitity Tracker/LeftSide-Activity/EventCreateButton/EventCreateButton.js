import { Button, Typography } from 'antd'
import React,{useState} from 'react'
import { useHistory } from 'react-router-dom'
import EventCreateComponent from '../../../Contests/CalendarEvent'
import './EventCreateButton.css'

const EventCreateButton = () => {

  const history=useHistory()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [windowWidth, setWidth] = useState(window.innerWidth);
  const breakpoint = 840;

  const showModal = () => {
    // if(windowWidth > breakpoint){
      
    // }else{
    //   history.push("/create-event-mobile");
    // }
    setIsModalVisible(true)
  };
  return (
    <div className='EventCreateButton'>
        <div className='newEventTag'>
            <img src='https://pocbanca.iorta.in/assets/dashboard/Group115.png'/>
            <Typography >No Event Exist</Typography>
            <button onClick={(e)=>showModal(e)}>Create an Event</button>
            
        </div>
        {
          isModalVisible == true ?
            <EventCreateComponent click={'data'} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible}/>
          :""
        }
    </div>
  )

}

export default EventCreateButton