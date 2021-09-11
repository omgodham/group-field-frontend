import React,{useState} from "react";
import { Grid, Paper, Button, Link, IconButton,Collapse,TextField,Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {useDispatch} from 'react-redux'
import { signUpAction } from "./helpers";
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: "60vh",
    width: 350,
    padding: "50px 20px",
    margin: "50px auto",
  },
  grid: {
    margin: "auto",
  },
  tab: {
    margin: "7px auto",
    width: "90%",
  },
  typoGraphy: {
    color: "primary",
    marginBottom: "7px",
  },
  linkCont: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2px 20px",
  },
}));

export default function Form() {
    const classes = useStyles();
    const dispatch = useDispatch();  
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message,setMessage] = useState("");
    

    const [values , setValues] = useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password} = values;

    const handleChange = (e) => {
        setValues(prevValues => ({...prevValues , [e.target.name]:e.target.value}))
    }
  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
       let user = await signUpAction(values);
       console.log(user)
       if(user.error){
        setMessage(user.error)
        setOpen(true)
        setSuccess(false)
       }else{
       setMessage("Sign Up Successfully")
       setOpen(true)
       setSuccess(true)
       setValues({
        name:"",
        email:"",
        password:""
    })
    }
     } catch (error) {
        setMessage(error)
        setOpen(true)
        setSuccess(false)
     }
  };

  return (
    <Grid height="100vh">
      <Paper
        elevation={5}
        justify="center"
        style={{ display: "flex" }}
        className={classes.root}
      >
        <Grid align="center" className={classes.grid}>
          <form onSubmit={handleSubmit}>
            <Typography
              color="textPrimary"
              variant="h5"
              className={classes.typoGraphy}
              style={{ margin: "20px" }}
            >
              Group<span style={{ color: "gray" }}>&</span>Field
            </Typography>

            <Typography
              color="textPrimary"
              variant="h6"
              className={classes.typoGraphy}
            >
              Create Your Account
            </Typography>

            <Typography
              color="textPrimary"
              variant="body2"
              className={classes.typoGraphy}
              style={{ marginBottom: "20px" }}
            >
              Enter your Name, email & password below
            </Typography>

            <Collapse in={open}>
        {success ? <Alert
        severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert> : 
        <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        {message}
      </Alert>
        }
      </Collapse>

            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              size="small"
              name="name"
              className={classes.tab}
              style={{ marginTop: "30px" }}
              value={name}
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              name="email"
              className={classes.tab}
              value={email}
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              size="small"
              type="password"
              name="password"
              className={classes.tab}
              style={{ marginBottom: "30px" }}
              value={password}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.tab}
            >
              Sign Up
            </Button>

            <div className={classes.linkCont}>
              <Typography variant="body2" style={{}}>
                <Link href="#">Already Have Account?</Link>
              </Typography>
            </div>
          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
