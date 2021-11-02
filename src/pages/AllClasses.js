import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserById } from '../components/Dashboard/helpers';
import {Typography , Box,Paper,Button, makeStyles, Container, CircularProgress, Select, FormControl, InputLabel} from '@material-ui/core'
import ClassesTable from '../components/Classes/ClassesTable';

const useStyles = makeStyles(theme => ({
    paper:{
        display:'flex',
        // justifyContent:'space-between',
        alignItems:'center',
        margin:theme.spacing(2),
        padding:theme.spacing(2),
        // borderBottom:'1px solid gray'
    },
    button:{
        width: '100px',
        backgroundColor:theme.palette.text.secondary,
        borderRadius:'20px',
        color:"black",
        marginRight: '30px'
    }
}))




function Classes() {

    const {user} = useSelector(state => state.user)
    const [childs ,setChilds] = useState([]);
    const [selectedChild , setSelectedChild] = useState(null);

     const classes = useStyles();   
    useEffect(() => {
        let tempChilds = [];
        if(user && user?.role === 'ROLE_PARENT'){
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
        } else if(user?.role === 'ROLE_STUDENT'){
            setSelectedChild(user)
        }
       
      } , [user])

      const handleChange = (e)=>{
        // setSelectedChild(e.target.value)
        console.log('ITEM',e.target.value);
      }

    //   console.log(selectedChild);

    return (
        <Container>
        
        <Box >
        <Box className={classes.paper}>
        {  childs.length ? childs.map((item,index) => {
            return (
                <Box key={index}>
                    {/* <Typography >{item.name}</Typography>
                    <Typography color='textSecondary'>This Month</Typography>
                    <Typography color='textSecondary'>Start Date</Typography>
                    <Typography color='textSecondary'>End Date</Typography> */}
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => {setSelectedChild(item)
                        console.log(item)}
                    }>{item.name}</Button>
                    {/* <Typography> */}
                    {/* </Typography> */}


                    {/* <FormControl className={classes.formControl} variant="outlined">
                        <InputLabel htmlFor="outlined-age-native-simple">Childrens</InputLabel>
                        <Select
                            native
                            value={selectedChild}
                            // value='select'
                            onChange={handleChange}
                            label="Childrens"
                            inputProps={{
                            name: 'Childrens',
                            id: 'outlined-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {childs.length && childs.map((child,index) => {
                                return <option value={child} key={index}>{child.name}</option>
                            })}

                        </Select>
                    </FormControl> */}
                </Box>
            )

        }) : ''}
        </Box>

        

        <Box  display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            {selectedChild ? <ClassesTable child={selectedChild}/> : <CircularProgress />}
        </Box>

        </Box>

        </Container>
    )
}

export default Classes
