import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserById } from '../components/Dashboard/helpers';
import {Typography , Box,Paper,Button, makeStyles, Container, CircularProgress} from '@material-ui/core'
import ClassesTable from '../components/Classes/ClassesTable';

const useStyles = makeStyles(theme => ({
    paper:{
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center',
        margin:theme.spacing(2),
        padding:theme.spacing(2),
        borderBottom:'1px solid gray'
    },
    button:{
        backgroundColor:theme.palette.success.main,
        borderRadius:'20px',
        color:"black"
    }
}))
function Classes() {

    const {user} = useSelector(state => state.user)
    const [childs ,setChilds] = useState([]);
    const [selectedChild , setSelectedChild] = useState(null);

     const classes = useStyles();   
    useEffect(() => {
        let tempChilds = [];
        if(user){
            const getChilds = () => {
            user.childs.forEach(async (element) => {
                try {
                    const response = await getUserById(element);
                    // console.log(response)
                    tempChilds.push(response)
                
                   } catch (error) {
                      console.log(error) 
                   }
            });

            setTimeout(() => {
                setSelectedChild(tempChilds[0])
                setChilds(tempChilds)
            },1000)
        }
        return getChilds()
        }
       
      } , [user])

    //   console.log(selectedChild);

    return (
        <Container>
            <Box >
{  childs && childs.map((item,index) => {
    return <Box className={classes.paper} key={index}>
        <Typography >{item.name}</Typography>
        <Typography color='textSecondary'>This Month</Typography>
        <Typography color='textSecondary'>Start Date</Typography>
        <Typography color='textSecondary'>End Date</Typography>
        <Typography><Button className={classes.button} onClick={() => setSelectedChild(item)}>Show</Button></Typography>
        </Box>

}) }
        <Box  display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        {selectedChild ? <ClassesTable child={selectedChild}/> : <CircularProgress />}
        </Box>
            </Box>
        </Container>
    )
}

export default Classes
