import React, { useEffect, useState } from 'react'
import { getUserById } from '../Dashboard/helpers'
import {useSelector} from 'react-redux'
import CurrentCalendar from '../calendar/CurrentCalendar'
import { createClass, getAllAvailableClasses, getAllTeachers } from './helpers'
import { Button, CircularProgress, FormControl, Input, InputLabel, MenuItem, Select,Box, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexDirection:'column',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    closeIcon:{
      position:'absolute',
      right:'0',
      top:'0',
      cursor:'pointer'
    }
  }));

function ClassAssign({id,setOpen,setReload,reload}) {

    const classes = useStyles();

 const [selectedChild , setSelectedChild] = useState(null)
   const {allClasses} = useSelector(state => state.classes) 
   const {user} = useSelector(state => state.user) 
    const [classesToShow , setClassesToShow] = useState([]);
    const [thisClasses , setThisClasses] = useState([]);
    const [teachers , setTeachers] = useState([])

    // const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

  const handleChangeClass = (event) => {
    setSelectedClass(event.target.value);
  };

  
  const handleChangeTeacher = (event) => {
    setSelectedTeacher(event.target.value);
  };


    useEffect(() => {
        getUserById(id).then(data => {
            setSelectedChild(data)
            getAllAvailableClasses().then(res => {
             setThisClasses(res)
             getAllTeachers().then(thisData => {
                setTeachers(thisData);
             }).catch(error => console.log(error))
            }).catch(error => console.log(error))
        }).catch(error => console.log(error) )

    },[])

//TODO:Logged In teacher should be preseleceted
// useEffect(() => {
//     setSelectedTeacher(user)
// },[ user])
    useEffect(() =>{
        // console.log(thisClasses,allClasses);
        let da = [];
     if(thisClasses.length && allClasses.length){
        allClasses.forEach(thisEvent => {
            if(!thisClasses.some(item => item.id === thisEvent.id)){
                da.push(thisEvent);
            } 
     })
     setTimeout(() => {
       setClassesToShow(da)
     }, 1000);
    }
    },[allClasses,thisClasses])
    


    const handleAssignClass = (e) => {
        e.preventDefault();
        selectedClass.teacher = selectedTeacher._id
        createClass(selectedClass , id).then(data => {
            console.log(data)
            setOpen(false);
            setReload(!reload)
        }).catch(error => console.log(error))
    }

  
    return (
        <div style={{position:'relative'}} >
          <CloseIcon className={classes.closeIcon} onClick={() => setOpen(false)}/>
            {/* {(classesToShow.length && teachers.length) ? */}
            <>
            {selectedChild && <CurrentCalendar selectedChild={selectedChild} admin={true}/>}
            <Typography variant='h6' color='primary' style={{marginTop:'50px'}}>Create Class</Typography>
            <Divider />
                        {/* {id}  */}
                        <form className={classes.container}>
                          <Box style={{display:'flex',flexDirection:'column' , minWidth:'300px'}}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-dialog-native">Select Class</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedClass?.name}
                onChange={handleChangeClass}
                input={<Input />}
              >
                {classesToShow?.map(item => {
                    return  <MenuItem value={item}>{item.title}</MenuItem>
                })}
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-dialog-select-label">Select Teacher</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedTeacher?.name}
                onChange={handleChangeTeacher}
                input={<Input />}
              >
                {teachers?.map(item => {
                    return  <MenuItem value={item}>{item.name}</MenuItem>
                })}
              </Select>
          
            </FormControl>
            </Box>
            <Button color='primary' onClick={handleAssignClass} variant='contained' style={{marginTop:'20px'}}>ASSIGN LESSON</Button>
          </form>     
      
          </> 
          {/* : 
          <CircularProgress />
          } */}
        </div>
    )
}

export default ClassAssign
