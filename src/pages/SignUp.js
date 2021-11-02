import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import Form from '../components/signup/Form';
import Topbar from '../components/Topbar';

function SignUp() {

    const history = useHistory()
    useEffect(() => {
        // if(localStorage.getItem('jwt'))
        //     history.push('/dashboard')
    } , [])

    return (
        <>
        <Topbar />
        <Form />
        </>
    )
}

export default SignUp;
