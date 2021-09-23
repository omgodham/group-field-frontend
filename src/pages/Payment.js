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

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    padding: "30px",
    margin: "50px auto",
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
    width: "96%",
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
}));

export default function Payment() {
  const classes = useStyles();
  const [showPaypal, setShowPaypal] = useState(false);
  const [amount, setAmount] = useState(0);
  const { childs } = useSelector((state) => state.user);
  const [rows, setRows] = useState([]);
  

  useEffect(() => {
   

      const setValues = () => {
        if (childs.length) {
        let tempRows = [];
        childs.map((thisChild) => {
          let hours = 0;
          thisChild.lectures.map((lecture) => {
            if(lecture.due){
              getClassByPublicId(lecture.id)
              .then((item) => {
                hours = hours +(getHours(new Date(item.end)) - getHours(new Date(item.start)));
              })
              .catch((error) => console.log(error));
            }
          });
          setTimeout(() => {
            // console.log(hours);
            tempRows.push(
              createData(thisChild.name, hours, thisChild.learningRate)
            );
          }, 500);
        });
        setTimeout(() => {
          if (childs.length === tempRows.length) setRows(tempRows);
        }, 1500);
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
     })  
     setTimeout(() => {
      setAmount(tempAmt)
     },500)
    }
       
  },[rows])

  function createData(child, hours, rateperhour) {
    return { child, hours, rateperhour };
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  };


  const handleOpen = () => {
    setShowPaypal(true);
  };

  return (
    <>
      {rows.length ? (
        <Paper className={classes.paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeading}>Child</TableCell>
                <TableCell align="center" className={classes.tableHeading}>
                  Hours
                </TableCell>
                <TableCell align="center" className={classes.tableHeading}>
                  Rate/Hour
                </TableCell>
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
                    {row.hours}
                  </TableCell>
                  <TableCell align="center" className={classes.tableValues}>
                    ${row.rateperhour}
                  </TableCell>
                  <TableCell align="center" className={classes.tableValues}>
                    ${row.hours * row.rateperhour}
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
                value={amount}
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
                <Paypal amount={amount} />
              </Box>
            ) : (
              <Button
                type="button"
                onClick={handleOpen}
                variant="contained"
                className={classes.button}
                disabled={!amount}
              >
                Pay With Paypal
              </Button>
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
