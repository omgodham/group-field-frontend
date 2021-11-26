import { Box, Container, Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import Form from '../components/signup/Form'
import { Divide } from 'react-feather'

const useStyles = makeStyles((theme) => ({

    root:{
        width: '90%',
        minHeight: '80vh',
        margin: 'auto',
        padding: '30px',
    }

}))


function SignUp() {

    const classes = useStyles();

    const {user} = useSelector(state => state.user)
    console.log('USER',user)   

    return (
        <Paper className={classes.root}>
            <Typography variant='h5' color='textPrimary'>CREATE NEW USER</Typography>
            <Divider />
            <Form />
        </Paper>
    )
}

export default SignUp 

