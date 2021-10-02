import { Box, Paper, Table, TableBody, CircularProgress,Typography,TableCell,TableRow, makeStyles, Button, Container, ListItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import { getUserById } from './helpers';
import {useSelector} from 'react-redux'
import { getClassByPublicId } from '../Classes/helpers';
import moment from 'moment';
import { format, getDate, getHours } from "date-fns";
import _ from 'lodash'
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';



const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor:theme.palette.success.main,
        borderRadius:'20px',
        color:theme.palette.common.white,
        width: '120px',
        fontSize: '13px'
    },
    category:{
        color:theme.palette.common.black
    },
    paper:{
        padding: '20px 30px 0px 20px',
        margin:theme.spacing(2)
    },
    table:{
      marginTop: '20px'
    },
    weeklyTable:{
 
      display:'flex',
      alignItems:'center',
      justifyContent:'left',
      flexWrap:'wrap'
    },
    weekLecture:{
      padding:theme.spacing(2),
      margin:'20px',
    }
  }));
  

function StudentInfo({id,role}) {
    
    const classes = useStyles();
    const [currentUser , setCurrentUser] = useState(null);
    const {user} = useSelector(state => state.user)
    
    function createData(category, className,url) {
        return { category, className,url};
      }

      useEffect( async () => {
        try {
         const response = await getUserById(id);
        //  console.log(response)
         setCurrentUser(response) 
        } catch (error) {
           console.log(error) 
        }
      } , [])
     const [currentLecture , setCurrentLecture] = useState(null)
     const [upcomingLecture , setUpcomingLecture] = useState(null)
     const [lectures , setLectures] = useState([]);
     const [flag , setFlag] = useState(false)
     const [rows , setRows] = useState([]);
     const [hours , setHours] = useState(0);
     const [weekLectures ,setWeekLectures] = useState([]);

      useEffect(() => {
        // console.log(format(new Date("2021-09-16T10:00:00+05:30"),'MM/dd/yyyy'));
        // console.log(format(new Date(),'MM/dd/yyyy'));
        // console.log(format(new Date(),'MM/dd/yyyy') < format(new Date("2021-09-16T10:00:00+05:30"),'MM/dd/yyyy') )
        if(currentUser){

          let tempHours = 0; 

   
          let tempLectures = [];

          currentUser.lectures.forEach(lecture => {
            getClassByPublicId(lecture.id).then(data => {
              // console.log(data)
              tempLectures.push(data);

              if(lecture.due)
              tempHours = tempHours +(getHours(new Date(data.end)) - getHours(new Date(data.start)));

              // setLectures(tempLectures);
              
          if(currentUser.lectures.length === tempLectures.length){
         
            setFlag(true)
            setLectures(tempLectures)
            setHours(tempHours)
          }
            })
            .catch(error => console.log(error))
          })

      }
   
      },[currentUser])

      useEffect(() => {
   
          if(flag){
            // console.log(lectures);
          let previousLectures =  lectures.filter(lecture => (format(new Date(lecture.start),'yyyy-MM-dd[T]HH:mm:ss') < format(new Date(),'yyyy-MM-dd[T]HH:mm:ss')))
            let nextLectures = lectures.filter(lecture => (format(new Date(lecture.start),'yyyy-MM-dd[T]HH:mm:ss') > format(new Date(),'yyyy-MM-dd[T]HH:mm:ss')))

            previousLectures = _.orderBy(previousLectures, ['start'],['desc'])
            nextLectures = _.orderBy(nextLectures, ['start'])
            
            console.log(previousLectures , nextLectures)
            setCurrentLecture(previousLectures[0])
            setUpcomingLecture(nextLectures[0])

            var startOfWeek = moment().startOf('week').toDate();
            var endOfWeek   = moment().endOf('week').toDate();
         
            //get lectures of this week only in update this is addition
            const thisLectures = lectures.filter(lect => (startOfWeek < new Date(lect.start) && endOfWeek > new Date(lect.start)) )
            console.log(thisLectures)
            setWeekLectures(thisLectures);

          }

      },[lectures])

   

      useEffect(() => {
        // console.log(currentLecture,upcomingLecture)
        // console.log(lectures)
        if(currentLecture && upcomingLecture){
         return setRows([...rows , createData('Now Learning', currentLecture.title,currentLecture?.url) ,createData('Upcoming Class', upcomingLecture.title,upcomingLecture?.url),role === 'ROLE_PARENT' && createData('Fees Due', hours * currentUser.learningRate)])
        } else if(currentLecture || upcomingLecture){
          setRows([...rows , createData('Now Learning', currentLecture ? currentLecture.title : 'No current Lecture',currentLecture?.url ) ,createData('Upcoming Class', upcomingLecture ? upcomingLecture.title : 'No Upcoming Lecture',upcomingLecture?.url),role === 'ROLE_PARENT' && createData('Fees Due', hours * currentUser.learningRate)])
        }

      },[currentLecture , upcomingLecture,hours])

    console.log(rows)

    return (
      <>
      { (rows.length) ?
      <>
      {weekLectures.length && (user?.role === 'ROLE_PARENT' || user?.role === 'ROLE_STUDENT') ?  <>
      <Paper>
        <Box display='flex' justifyContent='left' alignItems='center'>
        <AccessTimeIcon />
      <Typography variant='h6'>
      Weekly Schedule
        </Typography>
        </Box>
      <Box className={classes.weeklyTable}>
      { weekLectures.map(lect =>  <Paper className={classes.weekLecture} index={lect._id}>

        <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Typography>{format(new Date(lect.start) ,'ccc')}</Typography>
          <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
          <Typography>{lect.start.split('T')[1].split('+')[0]}</Typography>
          <Typography>-</Typography>
          <Typography>{lect.end.split('T')[1].split('+')[0]}</Typography>
            </Box>
          </Box>
          {/* <Typography variant='h5'>{lect.title}</Typography>
          <Typography variant='body2'>{lect.description}</Typography>
          <Typography variant='body2'>On:{format(new Date(lect.start) ,'MM/dd/yyyy')}</Typography>
          <Typography variant='body2'>Starts At:{lect.start.split('T')[1].split('+')[0]}</Typography>
          <Typography variant='body2'>Ends At:{lect.end.split('T')[1].split('+')[0]}</Typography> */}
        
        
          </Paper>) }
      </Box> 
      </Paper>
      </>: "" }

        <Paper className={classes.paper}>
           {role === 'ROLE_PARENT' && <Box flexDirection='column' justifyContent='center'>
                <Typography variant='h6' style={{color: '#000000'}}>{currentUser.name}</Typography>
                <Typography variant='body2' color='textSecondary'>Class {currentUser.std}th, {currentUser.board}</Typography>
            </Box>}
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row,index) => {
                  
                  if(index !== 0)  //In Updation hide the now learning part
                 return <TableRow key={index}> 
                    <TableCell align="left" className={classes.category}>
                      {row.category}
                    </TableCell>
                    <TableCell  align="left" style={{color: '#878787' }}>{row.className}</TableCell>
                    {index === 0? <TableCell align="center"><Button variant='contained' className={classes.button}>Syllabus</Button></TableCell>
                    :index === 1 ? <TableCell align="center"><a href={row.url}  style={{textDecoration:'none'}}><Button  variant='contained'  className={classes.button}>Join Lesson</Button></a></TableCell>
                    : (role === 'ROLE_PARENT') && <TableCell align="center"><Link to='/payment' style={{textDecoration:'none'}}><Button variant='contained' className={classes.button}>Fee Payment</Button></Link></TableCell>}
                  </TableRow>
})}
              </TableBody>
            </Table>
        </Paper>
        
        </> : <CircularProgress /> }
        </>
    )
}

export default StudentInfo
