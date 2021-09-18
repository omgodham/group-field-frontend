import React, { useEffect } from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';



function CurrentCalendar() {

    useEffect(() => {
        var calendarEl = document.getElementById('calendar');
     
        let thisCalendar = new Calendar(calendarEl, {
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
               
                     }
          });
        //   thisCalendar.changeView('timeGrid', {
        //     start: '2021-09-12',
        //     end: '2021-09-15'
        //   });

          thisCalendar.render()
    },[])
   

    return (
        <div id='calendar' style={{maxWidth: "900px",margin: "0 auto"}}>
            
        </div>
    )
}

export default CurrentCalendar
