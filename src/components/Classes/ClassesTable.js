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
import { convertMoneyToLocalCurrency, getLocalTime } from '../../utils/momenttz';
import _ from 'lodash' 
import { ExportToExcel } from './ExportToExcel';
import { useDispatch, useSelector } from 'react-redux';
import { setLocalRate } from '../../redux/actions/userActions';
import getSymbolFromCurrency from 'currency-symbol-map'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRows:{
    minHeight:"600px !important",
  }
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
  const { user } = useSelector((state) => state.user);
  const { timeZone ,localCurrency,localLearningRate} = useSelector((state) => state.user);
   const dispatch = useDispatch()
  function createData(date, start, end, topic, hours,paymentStatus,time) {
    return { date, start, end, topic, hours,paymentStatus,time};
  }
  



  const [studentLearningRate,setStudentLearnigRate] = useState(0);
  const [lectures,setLectures] = useState([])
  const [rows ,setRows] = useState([])  
  // const [localLearningRate,setLocalLearningRate] = useState(0);
  useEffect(async () => {
    let tempLectues = [] ;
    if(child && localCurrency){
      console.log(child)
      try {
        
      let value = await convertMoneyToLocalCurrency('USD',localCurrency,child.learningRate);
            // console.log(value)
      setStudentLearnigRate(value);

    } catch (error) {
          console.log(error)
    }
    }
 
    for(const lecture of child.lectures){
    // child.lectures.map(lecture => {
      try {
      let data = await getClassByPublicId(lecture.id); 
        // getClassByPublicId(lecture.id).then(data => {
            data.paid = lecture.due ? 'Unpaid' : 'Paid'
              // console.log(data)
            if(new Date(data.start) < new Date())
            tempLectues.push(data);
        // }).catch(error => console.log(error))
                
      } catch (error) {
       console.log(error)
      }
    }
    // )
    setTimeout(() => {
        setLectures(tempLectues)
        setLectures(_.orderBy(tempLectues, ['start'], ['desc']))
        if(setUnpaidLectures)
        setUnpaidLectures(tempLectues)
    },1500)
  },[child,localCurrency])

const [localValues ,setlocalValues] = useState([]);
  useEffect(() => {
      let tempRows = [];
      // if(lectures.length === child.lectures.length)  
      //    {  
        if(lectures.length)  
        {      
          for(const item of lectures) {

         
              // lectures.forEach(item => {
              
           
                // var startOfWeek = moment().startOf('week').toDate();
                // var endOfWeek   = moment().endOf('week').toDate();
         
                //  console.log(startOfWeek,endOfWeek);
                //  console.log(startOfWeek < new Date(item.start) , item.start);
       
              tempRows.push(
                        // createData(format(new Date(item.start.split('T')[0]),'MM/dd/yyyy'), `${getHours(new Date(item.start))}:00`, `${getHours(new Date(item.end))}:00`,item.title, getHours(new Date(item.end)) - getHours(new Date(item.start)) , item.paid), Change the format of the time in the update
                         createData(format(new Date(item.start.split('T')[0]),'do MMM yyy'),
                          `${getLocalTime(item.start,timeZone ? timeZone : "Asia/Kolkata")}`,
                           `${getLocalTime(item.end,timeZone ? timeZone :"Asia/Kolkata")}`,
                           item.title, 
                           `${parseInt(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60)} hours ${parseInt(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) % 60)} minutes`, 
                           item.paid, 
                           (((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60).toFixed(2))
                  
                        )
              // })
            }
            //  if(tempRows.toString() === lectures.toString()) {
              // setlocalValues([])
              setRows(tempRows)
            //  }
              
           } 
  },[lectures])

// console.log(studentLearningRate);
// useEffect(async () =>{
//   let temp = [];
//   // console.log(rows)
//   // if(rows.length == child.lectures.length - 1){
//     for(const item of rows){
//       let value = await convertMoneyToLocalCurrency('USD',localCurrency,item.time * child.learningRate)
//       // console.log(value)
//       temp.push(value);
//     }
//     setlocalValues(temp)
//   // }
  
// },[rows])


  return (
    <TableContainer component={Paper}>

      <ExportToExcel apiData={rows} fileName={`${new Date() + child.name}`} />
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' className={classes.tableRows} >
      {rows.length ? <Table className={classes.table} aria-label="simple table" >
        <TableHead>
          <TableRow >
            <StyledTableCell align='center'>Date</StyledTableCell>
            <StyledTableCell align='center'>Start Time</StyledTableCell>
            <StyledTableCell align='center'>End Time</StyledTableCell>
            {/* <TableCell align='center'>Topic</TableCell> */}
              {/* In Update hide the class topic from the table  */}
            <StyledTableCell align='center'>Duration</StyledTableCell>
            <StyledTableCell align='center'> {getSymbolFromCurrency(localCurrency)} Rate</StyledTableCell>
            <StyledTableCell align='center'> {getSymbolFromCurrency(localCurrency)} Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {rows.map((row,index) => (
            <StyledTableRow key={row.name} key={index}>
              <StyledTableCell align='center' component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell align='center'>{row.start}</StyledTableCell>
              <StyledTableCell align='center'>{row.end}</StyledTableCell>
              {/* <TableCell align='center'>{row.topic}</TableCell> */}
              <StyledTableCell align='center'>{row.hours}</StyledTableCell>
              {/* <StyledTableCell align='center'>$ {child.learningRate.toFixed(2)}</StyledTableCell> */}
              <StyledTableCell align='center'>{studentLearningRate?.toFixed(2)}</StyledTableCell>
              {/* <StyledTableCell align='center'>$ {(row.time * child.learningRate).toFixed(2)}</StyledTableCell>  */}
              {/* <StyledTableCell align='center'>{localValues[index]?.toFixed(2)}</StyledTableCell>  */}
              <StyledTableCell align='center'>{studentLearningRate ? (row.time * studentLearningRate).toFixed(2) : 0}</StyledTableCell> 
              {/* Changed from payment status to the rate per hour in update */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table> : <CircularProgress />}
      </Box>
    </TableContainer>
  );
}
