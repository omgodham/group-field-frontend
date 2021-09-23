import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getClassByPublicId } from './helpers';
import {format , getHours} from 'date-fns'
import { Box, CircularProgress } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



export default function ClassesTable({child}) {
  const classes = useStyles();


  function createData(date, start, end, topic, hours,paymentStatus) {
    return { date, start, end, topic, hours,paymentStatus};
  }
  
 

  const [lectures,setLectures] = useState([])
  const [rows ,setRows] = useState([])  
  useEffect(() => {
    let tempLectues = [] ;
    child.lectures.map(lecture => {
        getClassByPublicId(lecture.id).then(data => {
            data.paid = lecture.due ? 'Unpaid' : 'Paid'
            // setLectures([...lectures , data])
            tempLectues.push(data);
        }).catch(error => console.log(error))
    })
    setTimeout(() => {
        setLectures(tempLectues)
    },1500)
  },[child])
// console.log(lectures);

  useEffect(() => {
      let tempRows = [];
      if(lectures.length === child.lectures.length)  
         {    
              lectures.forEach(item => {
                    tempRows.push(
                        createData(format(new Date(item.start.split('T')[0]),'MM/dd/yyyy'), `${getHours(new Date(item.start))}:00`, `${getHours(new Date(item.end))}:00`,item.title, getHours(new Date(item.end)) - getHours(new Date(item.start)) , item.paid),
                    )
              })
             if(tempRows.toString() === lectures.toString()) 
                setRows(tempRows)
           } 
  },[lectures])

  return (
    <TableContainer component={Paper}>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      {rows.length === child.lectures.length ? <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Date</TableCell>
            <TableCell align='center'>Start Time</TableCell>
            <TableCell align='center'>End Time</TableCell>
            <TableCell align='center'>Topic</TableCell>
            <TableCell align='center'>Hours</TableCell>
            <TableCell align='center'>Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <TableRow key={row.name} key={index}>
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align='center'>{row.start}</TableCell>
              <TableCell align='center'>{row.end}</TableCell>
              <TableCell align='center'>{row.topic}</TableCell>
              <TableCell align='center'>{row.hours}</TableCell>
              <TableCell align='center'>{row.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> : <CircularProgress />}
      </Box>
    </TableContainer>
  );
}
