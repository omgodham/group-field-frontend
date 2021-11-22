import { Box, Container, makeStyles, Typography,Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo'
import {useDispatch,useSelector} from 'react-redux' 
import AdminDashboard from '../components/Home.js/AdminDashboard'
import { PayoutHelper } from '../components/payout/helper'
import { getUserById } from '../components/Dashboard/helpers'
import { getAllTeachers, getClassByPublicId } from '../components/Classes/helpers'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { updateLectures } from '../components/payment/helpers'
import {getTime} from 'date-fns'
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
            // console.log(thisData);
            setTeachers(thisData);
         }).catch(error => console.log(error))

},[])

const intiatePayment = (data)=>{
    let msg = PayoutHelper(data);
    setResoponseMsg(msg);
    handleClickOpenDialog();
}

const handleClick = (e,id,lectureIds)=>{

    // // const row = e.closest("TableRow");
    
    // let row = e.target.parentNode.parentNode;
    // let email = row.children[1].innerHTML;
    // let amount = row.children[2].innerHTML;

    // let data = {'email': email,'amount': amount}

    // intiatePayment(data)
    // console.log(id,lectureIdss)
    console.log(lectureIds)
    updateLectures(lectureIds,id).then(data => {
        console.log(data)
}).catch(err => console.log(err))
}

const handleClickOpenDialog = () => {
    console.log(responseMsg);
    setOpenDialog(true);
};

const handleCloseDialog = () => {
    setOpenDialog(false);
};


const [teacherValues,setTeacherValues] = useState({
    totalHours:[],
    lectureIds:[]
});

const {totalHours,lectureIds} = teacherValues;
useEffect(() => {
    console.log(teacher)
    if(teacher.length){
      
        for(const teach of teacher){
            getRate(teach);
        }
    }
},[teacher])
const getRate = async (thisTeacher) => {
    // console.log('time')
    let hours = 0;
    // let tempTeachers = teacher;
    // console.log(thisTeacher)
    // let particularTeacher = tempTeachers.find(teac => teac._id == thisTeacher._id);
    // particularTeacher.lectureIds = [];
    // setTeacherValues(prevValues => [...prevValues , [teacher._id].lectureIds = []]);
    let thisLectureIds = [];
        if(thisTeacher.lectures.length && thisTeacher.role === 'ROLE_TEACHER'){

        for(const lecture of thisTeacher.lectures){
          if(lecture.due){
            let item = await getClassByPublicId(lecture.id);
            // .then((item) => {
                thisLectureIds.push(lecture.id);
              if(new Date(item.end) < new Date()){
                hours = hours + parseFloat(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60);
                // hours = hours * thisTeacher.learningRate;
                // setTeacherValues(prevValues => ({...prevValues ,totalHours:[...totalHours,hours]}))
                // setTeacherValues(prevValues => ({...prevValues , lectureIds:[...lectureIds,lecture.id]}));
                // particularTeacher.rate = hours * thisTeacher.learningRate; 
                // particularTeacher.lectureIds = [...particularTeacher.lectureIds,lecture.id]    
            }
             
            // })
            // .catch((error) => console.log(error));
          }

        }

        let tempHours = totalHours;
        tempHours.push({id:thisTeacher._id,hours:hours});
        let tempLectureIds = lectureIds;
        tempLectureIds.push({id:thisTeacher._id,currentlectureIds:thisLectureIds});
        setTeacherValues(prevValues => ({totalHours:tempHours,lectureIds:tempLectureIds}))
        // console.log(thisTeacher.name,hours * thisTeacher.learningRate)
                    
    }
        // setTimeout(() => {
        //     console.log(hours);
        // },1000)
    

}


// console.log(teacherValues);

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
                    {teacher.length && teacher.map((teacher,index) => (
                        <TableRow key={teacher.name} key={teacher._id}>
                        <TableCell component="th" scope="row">
                            {teacher.name}
                        </TableCell>
                        <TableCell align="right" className="email">{teacher.email}</TableCell>
                        <TableCell align="right" value='50'>{totalHours.length ? (totalHours.find(item => item.id === teacher._id)?.hours * teacher.learningRate)?.toFixed(2) : 0}</TableCell>
                        <TableCell align="right">
                            <Button variant='contained' onClick={(e)=>handleClick(e,teacher._id,lectureIds.find(item => item.id === teacher._id)?.currentlectureIds)} color='primary'>MARK PAYMENT COMPLETION</Button>
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
