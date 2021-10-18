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

export const getAllAvailableClasses = async (id) => {
    try {
       let response = await axios.get(`/class/classes/all-classes`);
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}

export const getAllTeachers = async (id) => {
    try {
       let response = await axios.get(`/user/teachers/all-teachers`);
       return response.data;    
    } catch (error) {
        if(error.response.data.error)
        return error.response.data;
        else
        return error.message
    }
    
}

export const createClass = async (data, id) => {
  try {
    let response = await axios.post(`/class/${id}`, data, {
      headers: {
        Authorization: `${localStorage.getItem("jwt")}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response.data.error) return error.response.data;
    else return error.message;
  }
};