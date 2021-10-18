import { Box, Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo'
import {useDispatch,useSelector} from 'react-redux' 
import AdminDashboard from '../components/Home.js/AdminDashboard'

const useStyles = makeStyles(theme => ({
    root:{
        padding:theme.spacing(2)
    }
}))

function Dashboard() {

const classes = useStyles();
const {user} = useSelector(state => state.user)

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
            <AdminDashboard /> 
            }
        </Box>

    )
}

export default Dashboard
