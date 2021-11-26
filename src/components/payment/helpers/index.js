import axios from "../../../axios";


export const updateLectures = (data,userId) => {
    return axios.put(`/user/lectures/update-lectures/${userId}`,{lectureIds:data}).then(res => {
        return res.data
    }).catch(err => console.log(err))
}