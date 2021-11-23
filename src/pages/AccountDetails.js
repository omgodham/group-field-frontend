import {
  Box,
  Button,
  Container,
  Divider,
  FilledInput,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AllClasses from "./AllClasses";
import { makeStyles } from "@material-ui/core";
import { getTime } from "date-fns";
import { getClassByPublicId } from "../components/Classes/helpers";
import { makeRequest, updateUser } from "../components/Dashboard/helpers";
import { getTimeZone } from "../utils/momenttz";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    minHeight: "80vh",
    margin: "auto",
    padding: "30px",
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    justifyContent:'center'
  },
  table: {
   maxWidth: 350,
  },
}));

function AccountDetails() {
  const classes = useStyles();
  const [rows,setRows] = useState([])
  const { user,timeZone,localCurrency,localLearningRate } = useSelector((state) => state.user);
  // console.log('USER',user)

  const [unpaidLectures, setUnpaidLectures] = useState([]);
  const [amount, setAmount] = useState(0);
  const [calendarId, setCalendarId] = useState("");
  // console.log(unpaidLectures)
  // const [lectureIds,setLectureIds] = useState([]);
  // let thislectureIds = [];
  useEffect(() => {
    // console.log(user.lectures)
    let hours = 0;
    if (user && user?.lectures.length && user?.role === "ROLE_TEACHER")
      for (const lecture of user.lectures) {
        if (lecture.due) {
          getClassByPublicId(lecture.id)
            .then((item) => {
              // thislectureIds.push(lecture.id);
              if (new Date(item.end) < new Date()) {
                hours =
                  parseFloat(hours) +
                  parseFloat(
                    (getTime(new Date(item.end)) -
                      getTime(new Date(item.start))) /
                      (1000 * 60) /
                      60
                  );
                setAmount(hours * user.learningRate);
              }
            })
            .catch((error) => console.log(error));
        }
      }
    setCalendarId(user?.calendarId);
    // setLectureIds(thislectureIds)
    if(user){

        let properties = [
          {key : 'Name',value:user.name}
          ,{key : 'Email',value:user.email},
          {key : 'Role',value:user.role},
          {key : 'Rate',value:localLearningRate.toFixed(2)},
          {key : 'Phone NUmber',value:user.phone}
          ,{key : 'Time Zone',value:timeZone}
           , {key : 'Currency',value:localCurrency}
          ]
         setRows(properties) 
    }
  }, [user]);


  


  const handleRequestClick = (e) => {
    makeRequest({
      description: `Please make the pending payment of ${amount}`,
      from: { name: user.name, id: user._id },
      amount: amount,
    })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(calendarId);
    updateUser(calendarId, localStorage.getItem("userId"))
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" color="textPrimary">
        Account Details
      </Typography>
      {user?.role === "ROLE_TEACHER" ? (
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" color="textPrimary">
            Amout for classes is unpaid: {amount.toFixed(2)}
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={handleRequestClick}
          >
            Request payment
          </Button>
        </Box>
      ) : (
        ""
      )}
      <Divider />
      <TableContainer component={Paper} className={classes.table}>
      <Table  aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.key}
              </TableCell>
              <TableCell align="right">{row.value ? row.value : '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      {user?.role === "ROLE_TEACHER" && (
        <AllClasses
          setUnpaidLectures={setUnpaidLectures}
          unpaidLectures={unpaidLectures}
        />
      )}
     {user?.role === "ROLE_ADMIN" && <form onSubmit={handleSubmit}>
        <FormControl>
          <TextField
            id="outlined-basic"
            label="Enter Your Calendar Id"
            variant="outlined"
            onChange={(e) => setCalendarId(e.target.value)}
            value={calendarId}
          />
          <Button variant="contained" type="submit" color="primary">
            Submit
          </Button>
        </FormControl>
      </form> }
    </Paper>
  );
}

export default AccountDetails;
