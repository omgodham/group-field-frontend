import axios from "../../axios";

export const getAllNotifications = async () => {
    try {
       let response = await axios.get('/request/get-all-requests', { headers: {Authorization:`${localStorage.getItem('jwt')}`}});
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
}

export const deleteNotification = async (id) => {
    try {
       let response = await axios.delete(`/request/delete-request/${id}`, { headers: {Authorization:`${localStorage.getItem('jwt')}`}});
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
}