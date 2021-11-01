import React, { useState } from "react";
import {
	Grid,
	Paper,
	Button,
	Link,
	IconButton,
	Collapse,
	Box,
	FormControl,
	InputLabel,
	OutlinedInput,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { SignInAction } from "../../redux/actions/authActions";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import theme from "../../theme";
import signinImg from "../../images/signinImg.png";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputAdornment from "@material-ui/core/InputAdornment";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ResetPasswordHelper } from "./helper";
import { useLocation } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
	root: {
		width: 400,
		padding: "10px 20px 30px",
		margin: "50px auto",
		border: "0",
	},
	grid: {
		height: "100vh",
	},
	tab: {
		margin: "20px auto",
		width: "90%",
	},
	typoGraphy: {
		fontFamily: "Roboto ,sans-serif",
		marginBottom: "30px",
		// fontWeight: 300,
		// fontSize: '10px'
	},
	headingTitle: {
		fontWeight: 700,
		letterSpacing: "0.05rem",
		margin: "0",
	},
	linkCont: {
		display: "flex",
		justifyContent: "space-between",
		padding: "2px 20px",
	},
	and: {
		color: theme.palette.text.secondary,
		margin: "5px",
	},
	signinImg: {
		width: "600px",
	},
}));

export default function Form() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [openSuccess, setOpenSuccess] = useState(false);
	const [openFail, setOpenFail] = useState(false);

  
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		password: "",
		confirmPass: "",
	});
	const history = useHistory();
	const location = useLocation();

	const { confirmPass, password } = values;

	const handleChange = (e) => {
		setValues((prevValues) => ({
			...prevValues,
			[e.target.name]: e.target.value,
		}));
	};


	
	const handleCloseSuccess = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenSuccess(false);
	};

	const handleCloseFail = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpenFail(false);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('COMPARE',password,confirmPass);
		

		if(password === confirmPass){

			const userData = { id: location.pathname.split('/')[2],token: location.pathname.split('/')[3], password: password}

			ResetPasswordHelper(userData)
			.then(res=>{
				setOpenSuccess(true);
				setTimeout(function(){ window.location.replace('/login'); }, 3000);

			})
			.catch(error=>{
				setOpenFail(true);
				setTimeout(function(){ window.location.replace('/forgot-password'); }, 3000);
			})

		}
		else{

			setMessage('Both passwords should be same');
			setOpen(true);
			setSuccess(false);

		}
	};

	const handleClickShowPassword = () => {
		setShowPassword(true);
	};

	const handleMouseDownPassword = (event) => {
		setShowPassword(false);
	};

	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			className={classes.grid}
		>
			<Grid item xs>
				<Box justify="center" className={classes.root}>
					<Grid align="center">
						<form onSubmit={handleSubmit}>
							<Typography
								fontStyle="Roboto, sans-serif"
								fontWeight="700"
								color="textPrimary"
								variant="h4"
								className={`${classes.typoGraphy} ${classes.headingTitle}`}
								style={{ margin: "20px auto 5px" }}
							>
								WELCOME
								{/* Group<span className={classes.and}>&</span>Field */}
							</Typography>

							<Typography
								fontStyle="Roboto, sans-serif"
								fontWeight="300"
								color="textSecondary"
								variant="body2"
								className={classes.typoGraphy}
							>
								Enter your new password
							</Typography>

							{!success && (
								<Collapse in={open}>
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
								</Collapse>
							)}

                            <FormControl variant="outlined" className={classes.tab}>
                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                            <OutlinedInput
                                className={classes.margin}
                                id="outlined-adornment-password"
                                size="medium"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required={true}
                                value={password}
                                onChange={handleChange}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                labelWidth={70}
                            />
                            </FormControl>


							<FormControl variant="outlined" className={classes.tab}>
							<InputLabel htmlFor="outlined-adornment-password">Confirm New Password</InputLabel>
							<OutlinedInput
								error
								className={classes.margin}
								id="outlined-adornment-password"
								size="medium"
								type={showPassword ? 'text' : 'password'}
								name="confirmPass"
								required={true}
								value={confirmPass}
								onChange={handleChange}
								helperText="Incorrect entry."
								endAdornment={
								<InputAdornment position="end">
									<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
									>
									{showPassword ? <Visibility /> : <VisibilityOff />}
									</IconButton>
								</InputAdornment>
								}
								labelWidth={70}
							/>
							</FormControl>

                            
							<Button
								variant="contained"
								color="primary"
								type="submit"
								className={classes.tab}
							>
								Reset Password
							</Button>
						</form>
						<Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleCloseSuccess}>
							<Alert onClose={handleCloseSuccess} severity="success">
								Password Reset Successfully
							</Alert>
						</Snackbar>
						<Snackbar open={openFail} autoHideDuration={6000} onClose={handleCloseFail}>
							<Alert onClose={handleCloseFail} severity="error">
								Please try again.
							</Alert>
						</Snackbar>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}
