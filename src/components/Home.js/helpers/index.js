
import axios from '../../../axios';


export const getAllStudents = async () => {
    try {
       let response = await axios.get('/user/students/all-students', { headers: {Authorization:`${localStorage.getItem('jwt')}`}});
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}

export const getAllStudentsForTeacher = async (teacherId,studentId) => {
    try {
       let response = await axios.get(`/user/students/teacher/${teacherId}/${studentId}`, { headers: {Authorization:`${localStorage.getItem('jwt')}`}});
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}