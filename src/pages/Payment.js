import { Box, Paper, Table, TableBody, Typography,TableHead ,TableCell,TableRow, makeStyles, Button,Modal } from '@material-ui/core'
import React, { useState } from "react";
import ReactDOM from "react-dom"
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { createTheme } from '@material-ui/core/styles'
import Paypal from '../components/payment/Paypal';

const useStyles = makeStyles(theme => ({
    
    paper: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        padding: '30px',
        margin: '50px auto',
    },
    table: {
    //   width: '80%',
      color: 'black'
    },
    paymentWrap: {
      width: 300,
      margin: '30px 0 30px auto',

    },
    button: {
        width: '100%',
        marginTop: '10px',
        backgroundColor: theme.palette.success.main,
    },
    paymentPopup: {
        width: '96%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        padding: theme.spacing(1),
        marginTop: '10px',
        boxShadow: theme.shadows[5],
    },
    amount: {
      backgroundColor: 'white',
    },
    tableHeading: {
      color: 'black'
    },
    tableValues: {
      color: '#2b2d2f'
    }
}));
  

function createData(child, hours, rateperhour) {
    return { child, hours, rateperhour };
}


const rows = [
    createData('Ross', 11, 10),
    createData('John', 17, 10),
    createData('Chandler', 20, 10),
];

export default function Payment() {
  
    const classes = useStyles();
    const [showPaypal, setShowPaypal] = useState(false);
    const [amount,setAmount] = useState(480);
    
    

    const handleChange = (e) => {
      setAmount(e.target.value);
    };


    function createData(category, className) {
        return { category, className};
    }

    const handleOpen = () => {
        setShowPaypal(true);
    };
    

    return (
    <>

        <Paper className={classes.paper} >   
        <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeading}>Child</TableCell>
            <TableCell align="center" className={classes.tableHeading}>Hours</TableCell>
            <TableCell align="center" className={classes.tableHeading}>Rate/Hour</TableCell>
            <TableCell align="center" className={classes.tableHeading}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.child}>
              <TableCell component="th" scope="row" className={classes.tableValues}>
                {row.child}
              </TableCell>
              <TableCell align="center" className={classes.tableValues}>{row.hours}</TableCell>
              <TableCell align="center" className={classes.tableValues}>${row.rateperhour}</TableCell>
              <TableCell align="center" className={classes.tableValues}>${row.hours * row.rateperhour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box className={classes.paymentWrap}>
        <FormControl fullWidth  variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Total Amount</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={amount}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            className={classes.amount}
          />
        </FormControl>
        {showPaypal ? 
          (<Box  className={classes.paymentPopup}>

            <Paypal amount={amount}/>

          </Box>
          )
         : 
          (<Button type='button' onClick={handleOpen} variant="contained" className={classes.button}>
            Pay With Paypal
          </Button>
          )
        }
      </Box>
    </Paper>
    </>
  );
}
