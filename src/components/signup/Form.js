import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Button,
  Link,
  IconButton,
  Collapse,
  TextField,
  Typography,
  InputLabel,
  Select,
  Input,
  MenuItem,
  FormControl,
  Box,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableChilds, signUpAction } from "./helpers";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import ReactSelect from "react-select";
import moment from "moment-timezone";
import "./phone.css";
import PhoneInput from "react-phone-number-input";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "0 auto",
    padding: "20px 20px 30px",
    maxWidth: "500px",
  },
  grid: {
    margin: "auto",
    width: "100%",
    height: "100%",
  },
  tab: {
    margin: "20px",
    width: "400px",
  },
  button: {
    display: "block",
    border: "1px solid #6b778c",
    borderRadius: "5px",
    padding: "5px",
    width: "400px",
  },
  typoGraphy: {
    fontFamily: "Roboto, sans-serif",
    color: "primary",
    marginBottom: "7px",
  },
  headingTitle: {
    fontWeight: 700,
    letterSpacing: "0.1rem",
  },
  linkCont: {
    display: "flex",
    justifyContent: "space-between",
    padding: "2px 20px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  phoneTab: {
    width: "400px",
    height: "60px",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Form() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
    childs: [],
    learningRate: 0,
    std: 1,
    board: "",
  });
  const [phone, setPhone] = useState("");

  const { name, email, password, role, childs, learningRate, std, board } =
    values;

  const handleChange = (e) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword === password) {
      try {
        values.phone = phone;
        let user = await signUpAction(values);
        //  console.log('valuse',values)
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
            phone: "",
          });
          setPhone("");
        }
      } catch (error) {
        setMessage(error);
        setOpen(true);
        setSuccess(false);
      }
    } else {
      setMessage("Both passwords should be same");
      setOpen(true);
      setSuccess(false);
    }
  };
  const [availableChilds, setAvailableChilds] = useState([]);

  useEffect(() => {
    setValues((prevValues) => ({ ...prevValues, childs: [] }));
    if (role === "ROLE_PARENT")
      getAvailableChilds()
        .then((data) => setAvailableChilds(data))
        .catch((error) => console.log(error));
  }, [role]);
  const [updatedChilds, setUpdatedChilds] = useState([]);

  useEffect(() => {
    //  console.log(availableChilds)
    if (availableChilds.length) {
      let temp = availableChilds;
      for (const item of temp) {
        item.value = item._id;
        item.label = item.name;
      }
      setUpdatedChilds(temp);
    }
  }, [availableChilds]);

  const handleSearchChange = (data) => {
    setValues((prevValues) => ({
      ...prevValues,
      childs: data.map((item) => item._id),
    }));
  };
  //  console.log(values);
  //  console.log('timeZones',moment.tz());

  return (
    // <Grid>
    <Paper
      style={{ display: "flex", borderRadius: "10px" }}
      className={classes.root}
    >
      {/* <Grid align="center" className={classes.grid}> */}
      <form onSubmit={handleSubmit} className={classes.formStyle}>
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
          {success ? (
            <Alert
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
            </Alert>
          ) : (
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
          )}
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

        <Box className={classes.phoneTab}>
          <PhoneInput
            placeholder="Enter phone number"
            value={phone}
            onChange={(value) => setPhone(value)}
          />
        </Box>

        <FormControl
          variant="outlined"
          className={[classes.tab, classes.formControl]}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Select Role For User
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined-label"
            value={role}
            onChange={(e) =>
              setValues((prevValues) => ({
                ...prevValues,
                role: e.target.value,
              }))
            }
            label="Select Role For User"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {["STUDENT", "TEACHER"].map((item) => {
              return <MenuItem value={"ROLE_" + item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
        {role === "ROLE_PARENT" && (
          <>
            <InputLabel>Select children of this parent</InputLabel>
            <ReactSelect
              options={updatedChilds}
              isMulti={true}
              onChange={handleSearchChange}
            />
          </>
        )}
        {/* </FormControl> */}
        {(role === "ROLE_STUDENT" || role === "ROLE_TEACHER") && (
          <TextField
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
          />
        )}
        {role === "ROLE_STUDENT" && (
          <TextField
            id="outlined-basic"
            label="Standard"
            type="number"
            variant="outlined"
            size="medium"
            name="std"
            className={classes.tab}
            style={{ marginBottom: "30px" }}
            value={std}
            onChange={handleChange}
          />
        )}
        {role === "ROLE_STUDENT" && (
          <TextField
            id="outlined-basic"
            label="Board"
            type="string"
            variant="outlined"
            size="medium"
            name="board"
            className={classes.tab}
            style={{ marginBottom: "30px" }}
            value={board}
            onChange={handleChange}
          />
        )}

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
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.button}
        >
          Create New User
        </Button>
      </form>
      {/* </Grid> */}
    </Paper>
  );
}
