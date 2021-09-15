import { Box, Paper, Table, TableBody, Typography,TableCell,TableRow, makeStyles, Button } from '@material-ui/core'
import React from 'react'

import { borders } from '@material-ui/system';

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
  

function StudentInfo() {
    
    const classes = useStyles();

    function createData(category, className) {
        return { category, className};
      }

      
    const rows = [
        createData('Now Learning', 'Quadratic Equation'),
        createData('Upcoming Class', 'Quadratic Equation'),
        createData('Fees Due', '$100'),
      ];
    
    return (
        <Paper className={classes.paper}>
            <Box flexDirection='column' justifyContent='center'>
                <Typography variant='h6' style={{color: '#000000'}}>Khushi</Typography>
                <Typography variant='body2' color='textSecondary'>Class 6th, ICSE</Typography>
            </Box>
            <Table className={classes.table} aria-label="simple table">
              <TableBody>
                {rows.map((row,index) => (
                  <TableRow key={row.category}> 
                    <TableCell align="left" className={classes.category}>
                      {row.category}
                    </TableCell>
                    <TableCell  align="left" style={{color: '#878787'}}>{row.className}</TableCell>
                    {index === 0? <TableCell align="center"><Button variant='contained' className={classes.button}>Syllabus</Button></TableCell>
                    :index === 1 ? <TableCell align="center"><Button  variant='contained'  className={classes.button}>Calender</Button></TableCell>
                    :<TableCell align="center"><Button variant='contained' className={classes.button}>Fee Payment</Button></TableCell>}
                  </TableRow>
                ))}
              </TableBody>
            </Table>

        </Paper>
    )
}

export default StudentInfo
