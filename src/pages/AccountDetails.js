import { Box, Container, Divider, Typography } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux'

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
        </Container>
    )
}

export default AccountDetails 

