import {
  Box,
  Paper,
  Table,
  TableBody,
  Typography,
  TableHead,
  TableCell,
  TableRow,
  makeStyles,
  Button,
  Modal,
  CircularProgress,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import { createTheme } from "@material-ui/core/styles";
import Paypal from "../components/payment/Paypal";
import { useSelector } from "react-redux";
import { getClassByPublicId } from "../components/Classes/helpers";
import { format, getHours } from "date-fns";
import {useHistory} from 'react-router-dom'

import {getTime} from 'date-fns'
import { updateLectures } from "../components/payment/helpers";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    padding: "30px",
    margin: "auto",
    minHeight:'500px',
  },
  table: {
    //   width: '80%',
    color: "black",
  },
  paymentWrap: {
    width: 300,
    margin: "30px 0 30px auto",
  },
  button: {
    width: "100%",
    marginTop: "10px",
    backgroundColor: theme.palette.success.main,
  },
  paymentPopup: {
    display:'flex',
    flexDirection:'column',
    // width: "96%",
    backgroundColor: theme.palette.background.paper,
    borderRadius: "10px",
    padding: theme.spacing(1),
    marginTop: "10px",
    boxShadow: theme.shadows[5],

  },
  amount: {
    backgroundColor: "white",
  },
  tableHeading: {
    color: "black",
  },
  tableValues: {
    color: "#2b2d2f",
  },
  cancelBtn:{
    border:'solid 1px #f44336',
    color: '#f44336',
    width:'70px',
    margin:'auto', 
    // marginLeft: 'auto',
  }
}));

export default function Payment() {
  const classes = useStyles();
  const [showPaypal, setShowPaypal] = useState(false);
  const [amount, setAmount] = useState(0);
  const { user  } = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  const history = useHistory()

  const [childs , setChilds ] = useState([]);


  useEffect(() => {
    if(user && !(user?.role == 'ROLE_PARENT' || user?.role == 'ROLE_STUDENT')){
      return history.push('/dashboard')
    }
    if(user)
    setChilds([user])
  },[user])

  const [lectureIds , setLecturesIds] = useState([]);
  const [childIds,setChildIds] = useState([]);

  useEffect(() => {

      const setValues = () => {
        if (childs.length) {
        let tempRows = [];
        let thislectureIds = [];
        let thisChilds = [];
        childs.map((thisChild) => {
          // setChildIds(childIds => [...childIds , thisChild._id])
          thisChilds.push(thisChild._id)
          let hours = 0;
          thisChild.lectures.map((lecture) => {
            if(lecture.due){
              getClassByPublicId(lecture.id)
              .then((item) => {
                if(new Date(item.end) < new Date()){
                  //  console.log(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60)
                  // setLecturesIds(prevValues => [...prevValues , lecture.id])
                  thislectureIds.push(lecture.id);
                  hours = parseFloat(hours) + parseFloat(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60);
                }
               
              })
              .catch((error) => console.log(error));
            }
          });
          setTimeout(() => {
            // console.log(hours);
            tempRows.push(
              createData(thisChild.name, hours, thisChild.learningRate)
            );
          }, 1000);
        });
        setTimeout(() => {
          if (childs.length === tempRows.length) setRows(tempRows);
          setLecturesIds(thislectureIds)
          setChildIds(thisChilds)
        }, 2000);
      }
    }
    return setValues();
  
    // console.log(childs);
  }, [childs]);

  useEffect(() => {
    if(rows.length === childs.length){
      let tempAmt = 0;
      rows.map(row => {
        tempAmt = tempAmt + (row.hours * row.rateperhour)
        setAmount(tempAmt);
     })  
    }    
  },[rows])

  function createData(child, hours, rateperhour,lectureId) {
    return { child, hours, rateperhour,lectureId };
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  };


  const handleOpen = () => {
    setShowPaypal(true);
  };
  const handleClick = () => {

    childs.map(child => {
      updateLectures({lectureIds},child._id)
      .then(data => {
        console.log(data)
  }).catch(err => console.log(err))
    })
 
  }

  return (
    <>
      {rows.length ? (
        <Paper className={classes.paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeading}>Student</TableCell>
                <TableCell align="center" className={classes.tableHeading}>
                  Hours
                </TableCell>
                {/* <TableCell align="center" className={classes.tableHeading}>
                  Rate/Hour
                </TableCell> */}
                <TableCell align="center" className={classes.tableHeading}>
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.child}>
                  <TableCell
                    component="th"
                    scope="row"
                    className={classes.tableValues}
                  >
                    {row.child}
                  </TableCell>
                  <TableCell align="center" className={classes.tableValues}>
                    {(row.hours).toFixed(2)}
                  </TableCell>
                  {/* <TableCell align="center" className={classes.tableValues}>
                    ${row.rateperhour}
                  // </TableCell> */}
                   {/* Hide in the update part */}
                  <TableCell align="center" className={classes.tableValues}>
                    ${(row.hours * row.rateperhour).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box className={classes.paymentWrap}>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">
                Total Amount
              </InputLabel>
              <FilledInput
                id="filled-adornment-amount"
                value={amount.toFixed(2)}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                className={classes.amount}
                disabled={true}
              />
            </FormControl>
            {showPaypal ? (
              <Box className={classes.paymentPopup}>
                <Paypal amount={amount.toFixed(2)} lectureIds={lectureIds} childIds={childIds} setShowPaypal={setShowPaypal}/>
                <Button variant="outlined" className={classes.cancelBtn} onClick={()=>setShowPaypal(false)}>CANCLE</Button>
              </Box>
            ) : (
              <>
              <Button
                type="button"
                onClick={handleOpen}
                variant="contained"
                className={classes.button}
                disabled={!amount}
              >
                Pay With Paypal
              </Button>
                {/* <Button onClick={handleClick}>Thisi s</Button> */}
                </>
            )}
          </Box>
        </Paper>
      ) : (
        <Box display='flex' alignItems='center' justifyContent='center'>
        <CircularProgress />
        </Box>
      )}
    </>
  );
}
