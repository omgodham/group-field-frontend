import { Box, Container, makeStyles, Typography,Button } from '@material-ui/core'
import React from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo'
import {useDispatch,useSelector} from 'react-redux' 
import AdminDashboard from '../components/Home.js/AdminDashboard'
import { Payout } from '../components/payout/helper'

const useStyles = makeStyles(theme => ({
    root:{
        // width: '95%',
        padding:theme.spacing(3),
        // backgroundColor: '#fff', 
    }
}))

function Dashboard() {

const classes = useStyles();
const {user} = useSelector(state => state.user)

const getToken = ()=>{
    let email = 'sb-t8fjd7703249@personal.example.com';
    Payout(email);
}

    return (
        <Box className={classes.root}>
            { user && user.role === 'ROLE_PARENT' &&
            <> {user.childs.map((childId,index) => {
                // if(index === 0)
                   return <StudentInfo id={childId} role='ROLE_PARENT' key={index}/>
               })}  
            </>}
            { user && user.role === 'ROLE_STUDENT' &&
            <StudentInfo id={user._id} role='ROLE_STUDENT'/>
            }
            {user && (user.role === 'ROLE_TEACHER' || user.role === 'ROLE_ADMIN') &&
            <AdminDashboard _id={user._id} role={user.role}/> 
            }
            <Button variant='contained' onClick={getToken}>send money</Button>
        </Box>

    )
}

export default Dashboard
