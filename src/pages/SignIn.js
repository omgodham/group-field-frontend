import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import Form from '../components/signin/Form';
import Topbar from '../components/Topbar';

// import { Divider, Grid, useMediaQuery } from '@material-ui/core';

function SignIn() {
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

export default SignIn
