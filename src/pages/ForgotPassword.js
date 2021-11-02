import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import Form from '../components/forgot-password/Form';
import Topbar from '../components/Topbar';

// import { Divider, Grid, useMediaQuery } from '@material-ui/core';

function ForgotPassword() {
    const history = useHistory()
    useEffect(() => {
        if(localStorage.getItem('jwt'))
            history.push('/dashboard')
    } , [])

    return (
        <>
        <Topbar />
        <Form />
        </>
    )
}

export default ForgotPassword
