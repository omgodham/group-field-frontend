import { Box, Container, Typography,Divider, CircularProgress } from '@material-ui/core';
import { makeStyles, mergeClasses } from '@material-ui/styles';
import React, { useEffect, useState } from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

const useStyles = makeStyles(theme => ({
    root:{
       padding:'30px'
    },
    topSection:{
        display:'flex',
        alignItems:'center',
        paddingBottom:'20px'
    },
    icon:{
        backgroundColor:'#ffffff',
        borderRadius:'50%',
        height:'100px',
        width:'100px',
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    studentInfo:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        paddingLeft:'20px'
    },
    subjects:{
        display:'flex',
        alignItems:'center'
    }
}))

function EachClass({match}) {
    const classes = useStyles();

    let studentId = match.params.studentId; 
    const [thisLecture, setThisLecture] = useState(null);
    const [user,setUser] = useState(null)


    return (

        <Box className={classes.root}>
            {user ? <>
           <Box className={classes.topSection}>
               <Box className={classes.icon}>
            <AllInclusiveIcon style={{fontSize:'50px',opacity:'0.4'}}/>
            </Box>
            <Box className={classes.studentInfo}>
                <Typography variant='h4' color='primary' style={{fontWeight:'800',textTransform: 'capitalize',paddingBottom:'10px'}}>{user.name}</Typography>
                <Box className={classes.subjects}>
                <Typography variant='body2' style={{backgroundColor:'#ffffff' , padding:'5px 20px',borderRadius:'50px'}}>{user.std + "th " +user.board}</Typography>
                <Typography variant='body2' style={{backgroundColor:'#A180FF' , padding:'5px 20px',margin:'0 15px',borderRadius:'50px',color:'#f4f4f4'}}>New Classroom</Typography>
                    </Box>
                </Box>
            </Box>
            <Divider />
            
        </>:<CircularProgress />}
        <StudentInfo id={studentId} role='ROLE_TEACHER' admin={false} setThisLecture={setThisLecture} setUser={setUser}/>
        </Box>
    )
}

export default EachClass
