import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo'
import {useDispatch,useSelector} from 'react-redux' 

const useStyles = makeStyles(theme => ({
    root:{
        padding:theme.spacing(2)
    }
}))

function Dashboard() {

const classes = useStyles();
const {user} = useSelector(state => state.user)

    return (
        <Container className={classes.root}>
            { user && user.role === 'ROLE_PARENT' &&
            <> {user.childs.map((childId,index) => {
                   return <StudentInfo id={childId} role='ROLE_PARENT' key={index}/>
               })}  
            </>}
            { user && user.role === 'ROLE_STUDENT' &&
            <StudentInfo id={user._id} role='ROLE_STUDENT'/>
            }
            {user && (user.role === 'ROLE_TEACHER' || user.role === 'ROLE_ADMIN')  && 
            <Typography variant='h6'>Not Available for teacher and admin yet</Typography>
            }
        </Container>

    )
}

export default Dashboard
