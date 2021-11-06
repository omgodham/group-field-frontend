import { Box, Container, Divider, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'
import AllClasses from './AllClasses';

function AccountDetails() {
    const {user} = useSelector(state => state.user)
     console.log(user)   
    return (
        <Container>
            <Typography variant='h5' color='textPrimary'>Account Details</Typography>
                <Divider />
                <Box display='flex'>
                <Typography variant='h6'>Email: </Typography>
                <Typography variant='h6'>{user.email}</Typography>
                </Box>
                <AllClasses />
        </Container>
    )
}

export default AccountDetails 

