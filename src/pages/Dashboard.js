import { Container, makeStyles } from '@material-ui/core'
import React from 'react'
import StudentInfo from '../components/Dashboard/StudentInfo'

const useStyles = makeStyles(theme => ({
    root:{
        padding:theme.spacing(2)
    }
}))

function Dashboard() {

const classes = useStyles();

    return (
        <Container maxWidth='false' className={classes.root}>
            <StudentInfo />
            <StudentInfo />
        </Container>
    )
}

export default Dashboard
