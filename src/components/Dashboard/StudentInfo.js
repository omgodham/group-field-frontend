import { Box, Paper, Table, TableBody, CircularProgress,Typography,TableCell,TableRow, makeStyles, Button, Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

import { getUserById } from './helpers';
import {useSelector} from 'react-redux'
import { getClassByPublicId } from '../Classes/helpers';
import moment from 'moment';
import { format, getHours } from "date-fns";
import _ from 'lodash'
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
  }));
  

function StudentInfo({id,role}) {
    
    const classes = useStyles();
    const [currentUser , setCurrentUser] = useState(null);
    const childs = useSelector(state => state.user)
    
    function createData(category, className) {
        return { category, className};
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

          }

      },[lectures])

   

      useEffect(() => {
        console.log(currentLecture,upcomingLecture)
        console.log(lectures)
        if(currentLecture && upcomingLecture){
         return setRows([...rows , createData('Now Learning', currentLecture.title) ,createData('Upcoming Class', upcomingLecture.title),role === 'ROLE_PARENT' && createData('Fees Due', hours * currentUser.learningRate)])
        } else if(currentLecture || upcomingLecture){
          setRows([...rows , createData('Now Learning', currentLecture ? currentLecture.title : 'No current Lecture' ) ,createData('Upcoming Class', upcomingLecture ? upcomingLecture.title : 'No Upcoming Lecture'),role === 'ROLE_PARENT' && createData('Fees Due', hours * currentUser.learningRate)])
        }

      },[currentLecture , upcomingLecture,hours])

    

    return (
      <>
      { (rows.length) ?
        <Paper className={classes.paper}>
            <Box flexDirection='column' justifyContent='center'>
                <Typography variant='h6' style={{color: '#000000'}}>{currentUser.name}</Typography>
                <Typography variant='body2' color='textSecondary'>Class {currentUser.std}th, {currentUser.board}</Typography>
            </Box>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row,index) => (
                  <TableRow key={row.category} key={index}> 
                    <TableCell align="left" className={classes.category}>
                      {row.category}
                    </TableCell>
                    <TableCell  align="left" style={{color: '#878787' }}>{row.className}</TableCell>
                    {index === 0? <TableCell align="center"><Button variant='contained' className={classes.button}>Syllabus</Button></TableCell>
                    :index === 1 ? <TableCell align="center"><Link to='/calendar' style={{textDecoration:'none'}}><Button  variant='contained'  className={classes.button}>Calender</Button></Link></TableCell>
                    : (role === 'ROLE_PARENT') && <TableCell align="center"><Link to='/payment' style={{textDecoration:'none'}}><Button variant='contained' className={classes.button}>Fee Payment</Button></Link></TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Paper> : <CircularProgress /> }
        </>
    )
}

export default StudentInfo
