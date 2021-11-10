import { Box, Button, Container, Divider, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AllClasses from './AllClasses';
import { makeStyles } from '@material-ui/core'
import {getTime} from 'date-fns'
import { getClassByPublicId } from '../components/Classes/helpers';
import { makeRequest } from '../components/Dashboard/helpers';
const useStyles = makeStyles((theme) => ({

    root:{
        width: '90%',
        minHeight: '80vh',
        margin: 'auto',
        padding: '30px',
    }

}))


function AccountDetails() {

    const classes = useStyles();

    const {user} = useSelector(state => state.user)
    // console.log('USER',user)   

    const [unpaidLectures,setUnpaidLectures] = useState([]);
    const [amount,setAmount] = useState(0);

    // console.log(unpaidLectures)
    // const [lectureIds,setLectureIds] = useState([]);
    // let thislectureIds = [];
    useEffect(() => {
        // console.log(user.lectures)
        let hours = 0;
        if(user.lectures.length && user.role === 'ROLE_TEACHER')
        for(const lecture of user.lectures){
          if(lecture.due){
            getClassByPublicId(lecture.id)
            .then((item) => {
                // thislectureIds.push(lecture.id);
              if(new Date(item.end) < new Date()){
                hours = parseFloat(hours) + parseFloat(((getTime(new Date(item.end)) - getTime(new Date(item.start)))/(1000 * 60 )) / 60);
                setAmount(hours * user.learningRate);
            }
             
            })
            .catch((error) => console.log(error));
          }
        }
        // setLectureIds(thislectureIds)

    },[user])

    
const handleRequestClick = (e) => {
    makeRequest({description:`Please make the pending payment of ${amount}`,from:{name:user.name,id:user._id},amount:amount})
    .then(data => console.log(data))
    .catch(error => console.log(error))
}
    return (
        <Paper className={classes.root}>
            <Typography variant='h5' color='textPrimary'>Account Details</Typography>
            {user?.role === 'ROLE_TEACHER' ? <Box display='flex'  justifyContent='space-between'>
         <Typography variant='h5' color='textPrimary'>Amout for lectures is unpaid: {amount.toFixed(2)}</Typography>
               <Button color='primary' variant='contained' onClick={handleRequestClick}>Request payment</Button> 
               </Box> : ''}
                <Divider />
                <Box display='flex'>
                <Typography variant='h6'>Email: </Typography>
                <Typography variant='h6'>{user.email}</Typography>
                </Box>
                <AllClasses setUnpaidLectures={setUnpaidLectures} unpaidLectures={unpaidLectures}/>

        </Paper>
    )
}

export default AccountDetails 

