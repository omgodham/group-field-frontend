import { Box, Container, makeStyles, Typography,Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo'
import {useDispatch,useSelector} from 'react-redux' 
import AdminDashboard from '../components/Home.js/AdminDashboard'
import { PayoutHelper } from '../components/payout/helper'
import { getUserById } from '../components/Dashboard/helpers'
import { getAllTeachers } from '../components/Classes/helpers'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root:{
        // width: '95%',
        padding:theme.spacing(3),
        // backgroundColor: '#fff', 
    }
}))

function Payout() {

const classes = useStyles();
const {user} = useSelector(state => state.user)
const [teacher,setTeachers] = useState([]);
const [openDialog,setOpenDialog] = useState(false);
const [responseMsg, setResoponseMsg] = useState('');

useEffect(() => {
    
         getAllTeachers().then(thisData => {
            console.log(thisData);
            setTeachers(thisData);
         }).catch(error => console.log(error))

},[])

const intiatePayment = (data)=>{
    let msg = PayoutHelper(data);
    setResoponseMsg(msg);
    handleClickOpenDialog();
}

const handleClick = (e)=>{

    // const row = e.closest("TableRow");
    
    let row = e.target.parentNode.parentNode;
    let email = row.children[1].innerHTML;
    let amount = row.children[2].innerHTML;

    let data = {'email': email,'amount': amount}

    intiatePayment(data)
}

const handleClickOpenDialog = () => {
    console.log(responseMsg);
    setOpenDialog(true);
};

const handleCloseDialog = () => {
    setOpenDialog(false);
};




    return (
        <Box className={classes.root}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>NAME</TableCell>
                        <TableCell align="right">EMAIL</TableCell>
                        <TableCell align="right">PAYMENT DUE</TableCell>
                        <TableCell align="right">ACTION</TableCell>
                        {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {teacher.map((teacher) => (
                        <TableRow key={teacher.name}>
                        <TableCell component="th" scope="row">
                            {teacher.name}
                        </TableCell>
                        <TableCell align="right" className="email">{teacher.email}</TableCell>
                        <TableCell align="right" value='50'>1</TableCell>
                        <TableCell align="right">
                            <button variant='contained' onClick={(e)=>handleClick(e)}>PAY</button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Payment Successful"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    BatchID - 
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                    OK
                </Button>
                </DialogActions>
            </Dialog>
            {/* <Button variant='contained' onClick={getToken}>send money</Button> */}
        </Box>

    )
}

export default Payout
