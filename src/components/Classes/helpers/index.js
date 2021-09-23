import axios from '../../../axios';

export const getClassByPublicId = async (id) => {
    try {
       let response = await axios.get(`/class/${id}`);
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}