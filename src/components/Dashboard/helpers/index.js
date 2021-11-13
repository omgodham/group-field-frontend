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

export const updateUser = async (calendarId,id) => {
    try {
       let response = await axios.put(`/user/${id}`,{calendarId:calendarId},{ headers: {Authorization:`${localStorage.getItem('jwt')}`}});
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}

export const makeRequest = async (data) => {
    return axios.post(`/request/make-request/${data.from.id}`,data)
    .then(res => res.data)
    .catch(error => console.log(error))
}