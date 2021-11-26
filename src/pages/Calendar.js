import React, { useState ,useEffect} from 'react'
import CurrentCalendar from '../components/calendar/CurrentCalendar'
import {useDispatch,useSelector} from 'react-redux' 
import { Box, FormControl, InputLabel, makeStyles, Select, Typography, Divider } from '@material-ui/core'

import { getUserById } from '../components/Dashboard/helpers';
// import './calendar.css'


const useStyles = makeStyles((theme) => ({
    calendarWrapper: {
      display: 'flex',
      width: '90%',
      backgroundColor: 'white',
      flexDirection: 'column',
      margin: 'auto',
      padding: '20px 30px'

    },
    selectChildCont: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'left',
      paddingBottom:'10px',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    formBox: {
      width: '100%',
      margin: '20px auto'
    }
  }));

function Calendar() {

    const {user} = useSelector(state => state.user)

    const classes = useStyles();
    const [childId, setChildId] = useState("");
    const [childs ,setChilds] = useState([]);
    const [selectedChild , setSelectedChild] = useState(null);

    useEffect(() => {
        let tempChilds = [];
        if(user){
            user.childs.forEach(async (element) => {
                try {
                    const response = await getUserById(element);
                    console.log(response)
                    tempChilds.push(response)
                
                   } catch (error) {
                      console.log(error) 
                   }
            });

            setTimeout(() => {
                setChilds(tempChilds)
            },1000)
          
        }
      } , [user])

    const handleChange = (event) => {
        setChildId(event.target.value);
        childs.forEach(child => {
            if(child._id == event.target.value)
            setSelectedChild(child)
        })
       
      };
      // console.log(childs)
    return (
        <div className={classes.calendarWrapper}>
          <Box className={classes.selectChildCont}>
          {(user?.role === 'ROLE_PARENT') && <>
              <Typography variant='h6'>SELECT YOUR CHILD</Typography>   
              <FormControl className={classes.formControl} variant="outlined">
                {/* <InputLabel htmlFor="age-native-simple">Age</InputLabel> */}
                <InputLabel htmlFor="outlined-age-native-simple">Childrens</InputLabel>
                <Select
                  native
                  value={childId}
                  onChange={handleChange}
                  label="Childrens"
                  size='sm'
                  inputProps={{
                    name: 'Childrens',
                    id: 'outlined-age-native-simple',
                  }}
                >
                    <option aria-label="None" value="" />
                    {childs.length && childs.map((child,index) => {
                        return <option value={child._id} key={index}>{child.name}</option>
                    })}

                </Select>
              </FormControl>
         </>}
          </Box>

          <Divider />

          <Box className={classes.formBox} boxShadow='2'>
           {(user?.role === 'ROLE_PARENT') && childs.length && < CurrentCalendar selectedChild={selectedChild ? selectedChild : childs[0] } />}
           {(user?.role === 'ROLE_STUDENT') && < CurrentCalendar selectedChild={user} />}
          </Box>

        </div>
    )
}

export default Calendar
