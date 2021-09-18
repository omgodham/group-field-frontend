import React, { useEffect, useState } from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import moment from 'moment'
import { format } from 'date-fns'
import { Box, CircularProgress } from '@material-ui/core';

function CurrentCalendar({selectedChild}) {
// console.log(selectedChild)
  const [data, setData] = useState([])
  const [rendered , setIsRendered] = useState(false);
    useEffect(() => {
      setIsRendered(false)
      let tempEvents = [];
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
                eventSourceSuccess:function(content, xhr) {
                  // console.log(content)
                  // console.log(JSON.stringify(content[0]))
                  tempEvents = content;
                  setData(content)
                  return content.eventArray;
                },
                
          });
          
    
         
          //beacause the rendering take some time we have to wait for few seconds to access thisCalendar
          setTimeout(function(){ 
            //we can remove our events from here which we want

            tempEvents.forEach(thisEvent => {
             if(!selectedChild.lectures.some(item => item.id === thisEvent.id)){
              let event = thisCalendar.getEventById(thisEvent.id)
              event.remove();
             }
           })
           }, 1000);

           setTimeout(function(){ 
            setIsRendered(true);
            thisCalendar.render() 
           }, 1200);

        

    },[selectedChild])




useEffect(() => {
  if(data.length){
    // console.log(new Date())
    // console.log(data[0].end)
    // console.log(format(new Date(data[0].end),'MM/dd/yyyy'))
    // console.log(format(new Date(),'MM/dd/yyyy'))
    // console.log(format(new Date(data[0].end),'MM/dd/yyyy') < format(new Date(),'MM/dd/yyyy'))
    // let a = moment(format(new Date(data[0].end),'MM/dd/yyyy'));
    // let b = moment(format(new Date(),'MM/dd/yyyy'));
    // console.log(b.diff(a))
    // let event = thisCalendar.getEventById('4ag3cujp6rp62420nelo9ihhfh')
    // event.remove()
  }
  
},[data])
    

    return (
      <>
     <Box display='flex' alignItems='center' justifyContent='center' >
      {!rendered && <CircularProgress />}
      </Box>
        <div id='calendar' style={{maxWidth: "900px",margin: "0 auto" , display:!rendered ? 'none' : ''}}>
       
        </div>
        </>
    
        
    )
}

export default CurrentCalendar
