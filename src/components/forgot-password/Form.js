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
import { ForgotPasswordHelper } from "./helper";


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
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const history = useHistory();

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('in form',email)
		ForgotPasswordHelper(email)
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
								Please enter your email ID
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


							<TextField
								className={classes.margin}
								id="input-with-icon-textfield"
								variant="outlined"	
								label="Email"
								size="medium"
								type="email"
								name="email"
								className={classes.tab}
								style={{ marginTop: "20px"}}
								required={true}
								value={email}
								onChange={handleChange}
							/>


							<Button
								variant="contained"
								color="primary"
								type="submit"
								className={classes.tab}
							>
								Reset Password
							</Button>
						</form>
					</Grid>
				</Box>
			</Grid>
		</Grid>
	);
}
