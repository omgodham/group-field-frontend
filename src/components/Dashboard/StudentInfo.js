import { Box, Paper, Table, TableBody, CircularProgress,Typography,TableCell,TableRow, makeStyles, Button, Container } from '@material-ui/core'
import React, { useEffect, useState } from 'react'


import { getUserById } from './helpers';


const useStyles = makeStyles(theme => ({
    button: {
        backgroundColor:theme.palette.success.main,
        borderRadius:'20px',
        color:theme.palette.common.white,
        width: '120px',
        fontSize: '13px'
    },
    category:{
        color:theme.palette.common.black
    },
    paper:{
        padding: '20px 30px 0px 20px',
        margin:theme.spacing(2)
    },
    table:{
      marginTop: '20px'
    },
  }));
  

function StudentInfo({id,role}) {
    
    const classes = useStyles();
    const [currentUser , setCurrentUser] = useState(null);

    function createData(category, className) {
        return { category, className};
      }

      useEffect( async () => {
        try {
         const response = await getUserById(id);
         console.log(response)
         setCurrentUser(response) 
        } catch (error) {
           console.log(error) 
        }
      } , [])
     

    const rows = [
        createData('Now Learning', 'Quadratic Equation'),
        createData('Upcoming Class', 'Quadratic Equation'),
        role === 'ROLE_PARENT' && createData('Fees Due', '$100'),
      ];

    return (
      <>
      { currentUser ?
        <Paper className={classes.paper}>
            <Box flexDirection='column' justifyContent='center'>
                <Typography variant='h6' style={{color: '#000000'}}>{currentUser.name}</Typography>
                <Typography variant='body2' color='textSecondary'>Class {currentUser.std}th, {currentUser.board}</Typography>
            </Box>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row,index) => (
                  <TableRow key={row.category}> 
                    <TableCell align="left" className={classes.category}>
                      {row.category}
                    </TableCell>
                    <TableCell  align="left" style={{color: '#878787' }}>{row.className}</TableCell>
                    {index === 0? <TableCell align="center"><Button variant='contained' className={classes.button}>Syllabus</Button></TableCell>
                    :index === 1 ? <TableCell align="center"><Button  variant='contained'  className={classes.button}>Calender</Button></TableCell>
                    : (role === 'ROLE_PARENT') && <TableCell align="center"><Button variant='contained' className={classes.button}>Fee Payment</Button></TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </Paper> : <CircularProgress /> }
        </>
    )
}

export default StudentInfo
