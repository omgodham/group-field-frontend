import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllStudents, getAllStudentsForTeacher } from "./helpers";
import DuoIcon from "@material-ui/icons/Duo";
import StudentInfo from "../Dashboard/StudentInfo";
import ClassroomCard from "./ClassroomCard";
import { useSelector } from "react-redux";
import { getClassByPublicId } from "../Classes/helpers";
import { getTimeZone } from "../../utils/momenttz";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },

  pos: {
    marginBottom: 12,
  },
  lects: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },
});

function AdminDashboard({ _id, role }) {
  const [students, setStudents] = useState([]);
  const classes = useStyles();
  // const {_id,role} = useSelector(state => state.user.user);
  useEffect(() => {
    const getStudents = () => {
      if (role === "ROLE_ADMIN") {
        console.log("one");
        getAllStudents()
          .then((data) => {
            setStudents(data);
          })
          .catch((error) => console.log(error));
      } else if (role === "ROLE_TEACHER") {
        getAllStudents()
          .then(async (data) => {
            for (const item of data) {
              let thisClasses = [];
              for (const lect of item.lectures) {
                let res = await getClassByPublicId(lect.id);
                thisClasses.push(res);
              }
              if (
                thisClasses.length &&
                thisClasses.some((thisClass) => thisClass.teacher == _id)
              )
                setStudents((prevValues) => [...prevValues, item]);
            }
          })
          .catch((error) => console.log(error));
      }
    };

    getStudents();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        color="textPrimary"
        style={{ paddingBottom: "10px" }}
      >
        Classrooms
      </Typography>
      <Divider />
      <Box display='flex' alignItems='center' justifyContent='center'>
        {students.length ? (
          <Box className={classes.lects}>
            {students.map((student, index) => {
              return (
                <ClassroomCard
                  key={index}
                  student={student}
                  students={students}
                />
              );
            })}
          </Box>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
