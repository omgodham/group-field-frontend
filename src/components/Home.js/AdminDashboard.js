import { Box, Button, Card, CardActions, CardContent, CircularProgress, Divider, makeStyles, Typography } from '@material-ui/core';
import React,{useEffect,useState} from 'react'
import { getAllStudents } from './helpers';
import DuoIcon from '@material-ui/icons/Duo';
import StudentInfo from '../Dashboard/StudentInfo';
import ClassroomCard from './ClassroomCard';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
 
  pos: {
    marginBottom: 12,
  },
  lects:{
    display:"flex",
    flexWrap:'wrap',
    gap:'20px',
    marginTop:'20px'
  }
});

function AdminDashboard() {

  const [students , setStudents] = useState([]);
  const classes = useStyles();
  
    useEffect(() => {
      const getStudents = () => {
        getAllStudents().then(data =>{
          //  console.log(data)
            setStudents(data)
          })
        .catch(error => console.log(error))
      }
        return getStudents();

    }, [])

   


    // console.log(currentStudentLectures);

    return (
      <Box>
       <Typography  variant="h4" color='textPrimary' style={{paddingBottom:'10px'}}>
          Classrooms
        </Typography>
      <Divider />
        <div className={classes.lects}>
          {students.length ? 
          students.map(student => {
      
          return  <ClassroomCard key={student._id} student={student} students={students}/>
             {/* <Card className={classes.root} key={student._id}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" variant='h4' gutterBottom style={{textTransform: 'capitalize'}}>
          {student.name}
        </Typography>
        <Typography variant="h6" component="h2">
          Mathematics 
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Next Lesson at 5:00
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large"><DuoIcon /> Classroom</Button>
      </CardActions>
    </Card>
    <StudentInfo id={student._id} role='ROLE_STUDENT' admin={true} currentStudentLectures={currentStudentLectures} setCurentStudentLectures={setCurentStudentLectures}/> */}
  }) : <CircularProgress />}
        </div>
       
        </Box>
    )
}

export default AdminDashboard
