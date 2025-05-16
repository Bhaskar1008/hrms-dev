import React from 'react'
import { useState } from 'react'
import './AllEventTypes.css'

const AllEventTypes = () => {

    const [allEventTypesList, setAllEventTypesList] = useState([
        {
          dispValue: "Business Planning",
          value: "Business Planning"
        },
        {
          dispValue: "Business Review",
          value: "Business Review"
        },
        {
          dispValue: "Relationship Call",
          value: "Relationship Call"
        },
        {
          dispValue: "Training",
          value: "Training"
        },
        {
          dispValue: "Lead Generation",
          value: "Lead Generation"
        },
        {
          dispValue: "Servicing",
          value: "Servicing"
        },
        {
          dispValue: "Events",
          value: "Events"
        },
        {
          dispValue: "Customer Meeting",
          value: "Customer Meeting"
        },
        {
          dispValue: "Product Launch",
          value: "Product Launch"
        },
        {
          dispValue: "Joint Field Visit",
          value: "Joint Field Visit"
        },
        {
          dispValue: "Marketing Activities",
          value: "Marketing Activities"
        },
        {
          dispValue: "Quote & Policy Generation",
          value: "Quote & Policy Generation"
        },
        {
          dispValue: "Renewal",
          value: "Renewal"
        },
        {
          dispValue: "MIS Support",
          value: "MIS Support"
        },
        {
          dispValue: "Sales Call",
          value: "Sales Call"
        },
        {
          dispValue: "Self",
          value: "Self"
        },
        {
          dispValue: "Advisor",
          value: "Advisor"
        },
        {
          dispValue: "Customer",
          value: "Customer"
        },
        {
          dispValue: "Pratner",
          value: "Pratner"
        },
        {
          dispValue: "Unit Presentation",
          value: "Unit Presentation"
        },
      ])
  const [allEventTypesSelect, setAllEventTypesSelect]=useState("")

  const AllEventTypesChangeFunc=(e)=>{
    setAllEventTypesSelect(e.target.value)
  }

  return (
                  <div className="Input-date">
                    <div className="CalendarEvent-Modal-Card-vertical-line"></div>
                    <h4
                className="CalendarEvent-Modal-Card-header-type"
                >Event Type</h4>
                  <select
                   value={allEventTypesSelect}
                   onChange={AllEventTypesChangeFunc}
                   className="CalendarEvent-Modal-TimePicker-style"
                   > 
                     <option value="" >All</option>

               {allEventTypesList.map((time, index)=>{
                 return(
                   <option key={index} value={time.value}>{time.dispValue}</option>
                 )
               })}
                  </select>
                  <div className="CalendarEvent-Modal-Card-vertical-line"></div>

                </div>
  )
}

export default AllEventTypes