import React,{useState,useEffect} from "react";
import { Grid, Paper, Button, Link, IconButton,Collapse,TextField,Typography, InputLabel, Select, Input, MenuItem, FormControl } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {useDispatch} from 'react-redux'
import { getAvailableChilds, signUpAction } from "./helpers";
import CloseIcon from '@material-ui/icons/Close'
import Alert from '@material-ui/lab/Alert';
import ReactSelect from 'react-select'
import moment from 'moment-timezone';



const useStyles = makeStyles(theme =>({
    root: {
        padding: ('20px 20px 30px'),
        // margin: '50px auto'
    },
    grid: {
        margin: 'auto',
        width: '100%',
        height: '100%'
    },
    tab: {
        margin: '20px',
        width: '400px'
    },
    selectTab:{
      display: 'block',
      border: '1px solid #6b778c',
      borderRadius: '5px',
      padding: '5px',
      width: '400px'
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
    const [confirmPassword,setConfirmPassword] = useState("");
    
    const [values , setValues] = useState({
        name:"",
        email:"",
        password:"",
        role:"STUDENT",
        childs:[],
        learningRate:0,
        phone:'',
        timeZone:''
    })

    const {name,email,password,role,childs,learningRate,phone,timeZone} = values;

    const handleChange = (e) => {
        setValues(prevValues => ({...prevValues , [e.target.name]:e.target.value}))
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
		if (confirmPassword === password) {
			try {
				let user = await signUpAction(values);
				//  console.log(user)
				if (user.error) {
					setMessage(user.error);
					setOpen(true);
					setSuccess(false);
				} else {
					setMessage("Sign Up Successfully");
					setOpen(true);
					setSuccess(true);
					setValues({
						name: "",
						email: "",
						password: "",
					});
				}
			} catch (error) {
				setMessage(error);
				setOpen(true);
				setSuccess(false);
			}
		} else {
      setMessage('Both passwords should be same');
      setOpen(true);
      setSuccess(false);
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
 console.log('timeZones',moment.tz());


  return (
    <Grid>
      <Paper
        style={{ display: "flex",borderRadius:'10px' }}
        className={classes.root}
      >
        <Grid align="center" className={classes.grid}>
          <form onSubmit={handleSubmit}>

            <Typography
              color="textPrimary"
              variant="h6"
              className={classes.typoGraphy}
            >
              Please Enter Required Details
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
            <TextField
              id="outlined-basic"
              label="Confirm Password"
              type="password"
              variant="outlined"
              size="medium"
              type="password"
              name="confirmPassword"
              className={classes.tab}
              style={{ marginBottom: "30px" }}
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            <FormControl variant="outlined" className={[classes.formControl,classes.tab]}>
              <InputLabel id="demo-simple-select-outlined-label">Select Time Zone</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={timeZone}
                onChange={handleChange}
                label="Select Time Zone"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            
            <TextField
              id="outlined-basic"
              label="Phone No."
              variant="outlined"
              size="medium"
              name="phone"
              className={classes.tab}
              value={phone}
              onChange={handleChange}
              type='number'
              style={{ marginBottom: "30px" }}
              InputProps={{ inputProps: { min: 0, max: 10 } }}
            />
            
        
                       {/* <FormControl className={classes.formControl}> */}
             <InputLabel id="demo-dialog-select-label">Select Role For User</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                variant='outlined'
                value={role}
                onChange={(e) => setValues(prevValues => ({...prevValues,role:e.target.value}))}
                input={<Input />}
                className={[classes.tab,classes.selectTab]}
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
              {(role === 'ROLE_STUDENT' ||role === 'ROLE_TEACHER')  && <TextField
              id="outlined-basic"
              label="Per Hour Rate"
              type="number"
              variant="outlined"
              size="medium"
              name="learningRate"
              className={classes.tab}
              style={{ marginBottom: "30px" }}
              value={learningRate}
              onChange={handleChange}
            />}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={classes.tab}
            >
              Sign Up
            </Button>

          </form>
        </Grid>
      </Paper>
    </Grid>
  );
}
