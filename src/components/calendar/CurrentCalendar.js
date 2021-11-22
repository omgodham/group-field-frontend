import React, { useEffect, useState } from 'react'
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import moment from 'moment'
import { format } from 'date-fns'
import { Box, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setAllClasses } from '../../redux/actions/classActions';
import { classReducer } from '../../redux/reducers/classReduer';
import './calendar.css'

function CurrentCalendar({selectedChild,admin}) {
// console.log(selectedChild,admin)
      const dispatch = useDispatch()
  const [data, setData] = useState([])
  const [rendered , setIsRendered] = useState(false);
  const [calendarElement,setCalendarElement] = useState(null);


    useEffect(() => {

     const setTheCalendar = () => {
      setIsRendered(false)
      let tempEvents = [];
        var calendarEl = document.getElementById('calendar');

        let thisCalendar =  new Calendar(calendarEl, {
          // eventRenderWait:20,
            plugins: [ dayGridPlugin, timeGridPlugin, listPlugin,googleCalendarPlugin ],
             googleCalendarApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
             initialView: 'listMonth',
             themeSystem:'bootstrap',
             headerToolbar: {
                left:'listMonth',
                center: 'title',
                right: 'listWeek,timeGridDay'
              },
             events: {
                     googleCalendarId: process.env.REACT_APP_CALENDAR_ID,
                     className: 'gcal-event'
                },
                eventSourceSuccess:function(content, xhr) {
                  // console.log(content)
           
                  // console.log(JSON.stringify(content[0]))
                  tempEvents = content;


                  return content.eventArray;
                },

    
                
          });
          
    
         
          //beacause the rendering take some time we have to wait for few seconds to access thisCalendar
          setTimeout(function(){ 
            //we can remove our events from here which we want
            // let newLectures = [];
         
            if(admin)  
            dispatch(setAllClasses(tempEvents))
          
            // console.log(tempEvents);
            // let count = 0;
            setData(tempEvents);
            tempEvents.forEach(thisEvent => {
             if(!selectedChild.lectures.some(item => item.id === thisEvent.id)){
              // console.log(++count);
              let event = thisCalendar.getEventById(thisEvent.id)
       
              // newLectures.push(thisEvent);

              event.remove();

             } 

           })
          //  console.log(newLectures)
          // console.log("asd");
           }, 1000);

     

           setTimeout(function(){ 
            setIsRendered(true);
            // console.log("admin")
            if(!admin){         
              thisCalendar.render() 
              setCalendarElement(thisCalendar)
            }
            
       
            document.querySelector('.fc-listMonth-button').innerText = 'Month'
            // document.querySelector('.fc-listWeek-button').innerText = 'Week'
            // document.querySelector('.fc-timeGridDay-button').innerText = 'Day'
       
          }, 2000);

       

      }
      
  
        return setTheCalendar()

    },[selectedChild])

// console.log(calendarElement)

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
    
let flag = true;




    return (
      <>
     <Box display='flex' alignItems='center' justifyContent='center' >
      {(!rendered && !admin) && <CircularProgress />}
      </Box>
        <div id='calendar' style={{display:'flex',width:'100%',justifyContent:'center' , display:!rendered ? 'none' : ''}}>
       
        </div>
        </>
    
        
    )
}

export default CurrentCalendar
