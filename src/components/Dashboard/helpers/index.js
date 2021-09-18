import axios from '../../../axios';

export const getUserById = async (id) => {
    try {
       let response = await axios.get(`/user/${id}`);
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}