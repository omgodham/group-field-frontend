import axios from '../../../axios';

export const signUpAction = async (userData) => {
    try {
       let response = await axios.post('/auth/signup', userData);
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}