import React, { useEffect, useState } from 'react'
import {Container, Paper, Typography} from '@material-ui/core'
import { getAllTeachers } from '../components/Classes/helpers';
function MakePayment() {

const [teachers , setTeachers] = useState([]);
useEffect(() => {
    getAllTeachers()
    .then(data => setTeachers(data))
    .catch(error => console.log(error))
},[])

    return (
        <Container>
           {teachers.map(teacher => {
               return <Paper>
                    <Typography>{teacher.name}</Typography>
                   </Paper>
           })}
        </Container>
    )
}

export default MakePayment
