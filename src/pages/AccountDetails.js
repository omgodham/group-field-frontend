import { Box, Container, Divider, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'

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
    console.log('USER',user)   

    return (
        <Paper className={classes.root}>
            <Typography variant='h5' color='textPrimary'>Account Details</Typography>
                <Divider />
                <Box display='flex'>
                <Typography variant='h6'>Email: </Typography>
                <Typography variant='h6'>{user.email}</Typography>
                </Box>
        </Paper>
    )
}

export default AccountDetails 

