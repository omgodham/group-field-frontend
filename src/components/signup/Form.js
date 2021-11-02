import React,{useState,useEffect} from "react";
import { Grid, Paper, Button, Link, IconButton,Collapse,TextField,Typography, InputLabel, Select, Input, MenuItem, FormControl } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {useDispatch} from 'react-redux'
import { getAvailableChilds, signUpAction } from "./helpers";
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';
import ReactSelect from 'react-select'
const useStyles = makeStyles(theme =>({
    root: {
        height: '60vh',
        width: 350,
        padding: ('20px 20px 30px'),
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
        fontFamily: 'Roboto, sans-serif',
        color: 'primary',
        marginBottom: '7px'
    },
    headingTitle: {
        fontWeight: 700,
        letterSpacing: '0.1rem'
    },
    linkCont: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: ('2px 20px'),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
}))

export default function Form() {
    const classes = useStyles();
    const dispatch = useDispatch();  
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message,setMessage] = useState("");
    
    
    const [values , setValues] = useState({
        name:"",
        email:"",
        password:"",
        role:"STUDENT",
        childs:[]
    })

    const {name,email,password,role,childs} = values;

    const handleChange = (e) => {
        setValues(prevValues => ({...prevValues , [e.target.name]:e.target.value}))
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
       let user = await signUpAction(values);
      //  console.log(user)
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
const [availableChilds, setAvailableChilds] = useState([]);

 useEffect(() => {
   setValues(prevValues => ({...prevValues , childs:[]}))
   if(role === 'ROLE_PARENT')
  getAvailableChilds()
  .then(data => setAvailableChilds(data))
  .catch(error => console.log(error))
 },[role])
  const [updatedChilds,setUpdatedChilds] = useState([]);

 useEffect(() => {
  //  console.log(availableChilds)
  if(availableChilds.length){
    let temp = availableChilds;
    for(const item of temp){
      item.value = item._id;
      item.label= item.name
    }
    setUpdatedChilds(temp);
  }
 },[availableChilds])
 

 const handleSearchChange = (data) => {
  setValues(prevValues => ({...prevValues , childs : data.map(item => item._id)}))
 }
 console.log(values);
  return (
    <Grid height="100vh">
      <Paper
        elevation={2}
        justify="center"
        style={{ display: "flex",borderRadius:'10px' }}
        className={classes.root}
      >
        <Grid align="center" className={classes.grid}>
          <form onSubmit={handleSubmit}>
            <Typography
              color="textPrimary"
              variant="h4"
              className={`${classes.typoGraphy} ${classes.headingTitle}`}
              style={{ margin: "20px" }}
            >
              Group<span style={{ color: "gray" }}>&</span>Field
            </Typography>

            <Typography
              color="textPrimary"
              variant="body2"
              className={classes.typoGraphy}
            >
              Create Account For User
            </Typography>

            {/* <Typography
              color="textPrimary"
              variant="body2"
              className={classes.typoGraphy}
              style={{ marginBottom: "20px" }}
            >
              Enter your Name, email & password below
            </Typography> */}

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
              size="medium"
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
              size="medium"
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
              size="medium"
              type="password"
              name="password"
              className={classes.tab}
              style={{ marginBottom: "30px" }}
              value={password}
              onChange={handleChange}
            />
        
                       {/* <FormControl className={classes.formControl}> */}
             <InputLabel id="demo-dialog-select-label">Select Role For User</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={role}
                onChange={(e) => setValues(prevValues => ({...prevValues,role:e.target.value}))}
                input={<Input />}
                className={classes.tab}
              >
                {['STUDENT','TEACHER','PARENT'].map(item => {
                    return  <MenuItem value={'ROLE_' + item}>{item}</MenuItem>
                })}
              </Select>
              {/* {role === 'ROLE_PARENT' && <><InputLabel id="demo-dialog-select-label">Select children of this parent</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={childs}
                onChange={(e) => setValues(prevValues => ({...prevValues,childs:[...childs , e.target.value]}))}
                input={<Input />}
                className={classes.tab}
              >
                {updatedChilds.map(item => {
                    return  <MenuItem value={item._id}>{item.name}</MenuItem>
                })}
              </Select></>} */}
              {role === 'ROLE_PARENT' &&
              <><InputLabel >Select children of this parent</InputLabel>
               <ReactSelect 
              options={updatedChilds}
               isMulti={true}
              onChange={handleSearchChange}
              /></>}
              {/* </FormControl> */}
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
