import React, { useState ,useEffect} from 'react'
import CurrentCalendar from '../components/calendar/CurrentCalendar'
import {useDispatch,useSelector} from 'react-redux' 
import { FormControl, InputLabel, makeStyles, Select, Typography } from '@material-ui/core'

import { getUserById } from '../components/Dashboard/helpers';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
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
        <div>
          {(user?.role === 'ROLE_PARENT') && <>
              <Typography variant='h5'>Select Your Child</Typography>   
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor="age-native-simple">Age</InputLabel>
        <Select
          native
          value={childId}
          onChange={handleChange}
        >
             <option aria-label="None" value="" />
            {childs.length && childs.map((child,index) => {
                return <option value={child._id} key={index}>{child.name}</option>
            })}

        </Select>
         </FormControl>
         </>}
  
           {(user?.role === 'ROLE_PARENT') && childs.length && < CurrentCalendar selectedChild={selectedChild ? selectedChild : childs[0] } />}
           {(user?.role === 'ROLE_STUDENT') && < CurrentCalendar selectedChild={user} />}

        </div>
    )
}

export default Calendar
