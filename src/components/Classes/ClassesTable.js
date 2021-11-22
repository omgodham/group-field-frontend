import React, { useEffect, useState } from 'react';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getClassByPublicId } from './helpers';
import {format , getHours, getTime, getWeek, parseJSON} from 'date-fns'
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import moment from 'moment'
import { getLocalTime } from '../../utils/momenttz';

import { ExportToExcel } from './ExportToExcel';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ClassesTable({child,setUnpaidLectures}) {
  const classes = useStyles();


  function createData(date, start, end, topic, hours,paymentStatus,time) {
    return { date, start, end, topic, hours,paymentStatus,time};
  }
  




  const [lectures,setLectures] = useState([])
  const [rows ,setRows] = useState([])  
  useEffect(() => {
    let tempLectues = [] ;
    child.lectures.map(lecture => {
        getClassByPublicId(lecture.id).then(data => {
            data.paid = lecture.due ? 'Unpaid' : 'Paid'
              // console.log(data)
            if(new Date(data.start) < new Date())
            tempLectues.push(data);
        }).catch(error => console.log(error))
    })
    setTimeout(() => {
        setLectures(tempLectues)
        if(setUnpaidLectures)
        setUnpaidLectures(tempLectues)
    },1500)
  },[child])
// console.log(lectures);

  useEffect(() => {
      let tempRows = [];
      // if(lectures.length === child.lectures.length)  
      //    {  
        if(lectures.length)  
        {      
              lectures.forEach(item => {
              
           
                // var startOfWeek = moment().startOf('week').toDate();
                // var endOfWeek   = moment().endOf('week').toDate();
         
                //  console.log(startOfWeek,endOfWeek);
                //  console.log(startOfWeek < new Date(item.start) , item.start);
       
              tempRows.push(
                        // createData(format(new Date(item.start.split('T')[0]),'MM/dd/yyyy'), `${getHours(new Date(item.start))}:00`, `${getHours(new Date(item.end))}:00`,item.title, getHours(new Date(item.end)) - getHours(new Date(item.start)) , item.paid), Change the format of the time in the update
                         createData(format(new Date(item.start.split('T')[0]),'do MMM yyy'), `${getLocalTime(item.start,"Asia/Kolkata")}`, `${getLocalTime(item.end,"Asia/Kolkata")}`,item.title, `${parseInt(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60)} hours ${parseInt(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) % 60)} minutes`, item.paid, (((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60).toFixed(2))
                  
                        )
              })
             if(tempRows.toString() === lectures.toString()) 
                setRows(tempRows)
           } 
  },[lectures])

  useEffect(() => {
    console.log(rows);
  },[rows])

  
  // console.log(rows);
  return (
    <TableContainer component={Paper}>

      <ExportToExcel apiData={rows} fileName={`${new Date() + child.name}`} />
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      {rows.length ? <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow >
            <StyledTableCell align='center'>Date</StyledTableCell>
            <StyledTableCell align='center'>Start Time</StyledTableCell>
            <StyledTableCell align='center'>End Time</StyledTableCell>
            {/* <TableCell align='center'>Topic</TableCell> */}
              {/* In Update hide the class topic from the table  */}
            <StyledTableCell align='center'>Duration</StyledTableCell>
            <StyledTableCell align='center'>Rate</StyledTableCell>
            <StyledTableCell align='center'>Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <StyledTableRow key={row.name} key={index}>
              <StyledTableCell align='center' component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.start}</StyledTableCell>
              <StyledTableCell align='center'>{row.end}</StyledTableCell>
              {/* <TableCell align='center'>{row.topic}</TableCell> */}
              <StyledTableCell align='center'>{row.hours}</StyledTableCell>
              <StyledTableCell align='center'>$ {child.learningRate.toFixed(2)}</StyledTableCell>
              <StyledTableCell align='center'>$ {(row.time * child.learningRate).toFixed(2)}</StyledTableCell> 
              {/* Changed from payment status to the rate per hour in update */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table> : <Typography>No past classes are available</Typography>}
      </Box>
    </TableContainer>
  );
}
