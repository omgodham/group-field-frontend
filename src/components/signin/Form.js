import React from 'react'
import {Grid,Paper,Button,Link} from '@material-ui/core';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles,useTheme} from '@material-ui/core/styles';
import { useRef } from 'react';
import axios from '../../axios';

const useStyles = makeStyles(theme =>({
    root: {
        height: '50vh',
        width: 350,
        padding: ('50px 20px'),
        margin: '50px auto'
    },
    grid: {
        margin: 'auto'
    },
    tab: {
        margin: '7px auto',
        width: '90%'
    },
    typoGraphy: {
        color: 'primary',
        marginBottom: '7px'
    },
    linkCont: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: ('2px 20px'),
    }
}))

export default function Form() {

    const classes = useStyles();
    const userRef = useRef();
    const passRef = useRef();

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
            const res = await axios.post('/signin',{
                username: userRef.current.value,
                password: passRef.current.value
            })
            alert(res);
        }catch(error){
            alert('something went wrong.')
        }
    }

    return (
        <Grid height='100vh'>
            <Paper elevation='5' justify='center' style={{display: 'flex'}} className={classes.root}>
                <Grid align='center'  className={classes.grid}>
                <form  onSubmit={handleSubmit}>
                    <Typography color='primary'  variant='h5' className={classes.typoGraphy} style={{margin: '20px'}}>Group<span style={{color: 'gray'}}>&</span>Field</Typography>

                    <Typography color='primary' variant='h6' className={classes.typoGraphy}>Log In to Your Account</Typography>

                    <Typography color='primary' variant='p' className={classes.typoGraphy} style={{marginBottom: '20px'}}>Enter your email & password below</Typography>

                    <TextField id="outlined-basic" label="Username" ref={userRef} variant="outlined" size='small'  className={classes.tab} style={{marginTop: '20px'}}/>

                    <TextField id="outlined-basic" label="Password" ref={passRef} variant="outlined" size='small' type='password' className={classes.tab} style={{marginBottom: '30px'}}/>

                    <FormControlLabel
                        control={
                        <Checkbox
                            // checked={state.checkedB}
                            // onChange={handleChange}
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Primary"
                        style={{display: 'flex',marginLeft: '10px'}}
                    />
                    <Button variant="contained" color="primary" type='submit' className={classes.tab}>Log in</Button>

                    <div className={classes.linkCont}>
                        <Typography variant='p' style={{}}><Link href="#">Signup</Link></Typography>
                        <Typography variant='p' ><Link href="#">Forgot password?</Link></Typography>
                    </div>

                </form>
                </Grid>
            </Paper>
        </Grid>
    )
}
