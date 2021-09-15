import React, { useEffect, useState } from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import moment from 'moment'
import { format } from 'date-fns'

function CurrentCalendar() {

  const [data, setData] = useState([])

    useEffect(() => {
        var calendarEl = document.getElementById('calendar');
     
        let thisCalendar =  new Calendar(calendarEl, {
          eventRenderWait:20,
            plugins: [ dayGridPlugin, timeGridPlugin, listPlugin,googleCalendarPlugin ],
             googleCalendarApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
             initialView: 'dayGridMonth',
             themeSystem:'bootstrap',
             headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek,timeGridDay'
              },
             events: {
                     googleCalendarId: process.env.REACT_APP_CALENDAR_ID,
                     className: 'gcal-event'
                },
                lazyFetching:true,
                eventSourceSuccess:function(content, xhr) {
      
                  setData(content)
                  return content.eventArray;
                }
          });
          thisCalendar.render()   
    },[])

useEffect(() => {
  if(data.length){
    console.log(new Date())
    console.log(data[0].end)
    console.log(format(new Date(data[0].end),'MM/dd/yyyy'))
    console.log(format(new Date(),'MM/dd/yyyy'))
    console.log(format(new Date(data[0].end),'MM/dd/yyyy') < format(new Date(),'MM/dd/yyyy'))
    let a = moment(format(new Date(data[0].end),'MM/dd/yyyy'));
    let b = moment(format(new Date(),'MM/dd/yyyy'));
    console.log(b.diff(a))
  }
},[data])
    

    return (
        <div id='calendar' style={{maxWidth: "900px",margin: "0 auto"}}>
            
        </div>
    )
}

export default CurrentCalendar
