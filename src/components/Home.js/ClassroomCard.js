import { Box, Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import React, { useState ,useEffect} from 'react'
import StudentInfo from '../Dashboard/StudentInfo';
import DuoIcon from '@material-ui/icons/Duo';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import { getLocalTime } from '../../utils/momenttz';
import { useSelector } from 'react-redux';
const useStyles = makeStyles({
    root: {
      minWidth: 400,
      display:'flex !important',
      transition:'all 250ms linear',
      '&:hover': {
        transform: 'translateY(-10px)'
     },
      
    },
    cardLeft:{
      minWidth:'100px',
      backgroundColor:'#f4f4f4',
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      alignItems:'center',
      padding:'10px 0'

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

function ClassroomCard({student,students}) {
   
    const classes = useStyles();

    const [thisLecture, setThisLecture] = useState(null);
    const { timeZone } = useSelector((state) => state.user);
    console.log(timeZone)


   return (

        <Box>
      
          <Link to={`/students/${student._id}`} style={{textDecoration:'none'}}>
            <Card className={classes.root} key={student._id}>
            <Box className={classes.cardLeft}>
                <AllInclusiveIcon />
                <Typography variant='body2' style={{textTransform: 'capitalize'}}>{student?.name}</Typography>
         </Box>
      <Box>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" variant='h5' gutterBottom style={{textTransform: 'capitalize'}}>
          {student.name}
        </Typography>
        <Typography variant="h6" component="h2">
           {thisLecture?.lecture ? thisLecture.lecture.title : 'No Upcoming Class'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
           {/* {thisLecture?.lecture ? `Next Class at ${thisLecture.lecture.start.split('T')[1].split('+')[0]}` : 'No Class'} */}
           {thisLecture?.lecture ? `Next Class at ${getLocalTime(thisLecture.lecture.start,timeZone ? timeZone : "Asia/Kolkata")}` : 'No Class'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="large" disabled={!thisLecture?.lecture} variant='contained' color='primary' style={{borderRadius:'50px'}}><DuoIcon style={{marginRight:'10px'}}/> Classroom</Button>
      </CardActions>
      </Box>
    </Card>
    </Link>
    <StudentInfo id={student._id} role='ROLE_ADMIN' admin={true} setThisLecture={setThisLecture} />
        </Box>

    )
}

export default ClassroomCard;
