import axios from "../../../axios";


export const updateLectures = (data,userId) => {
    console.log(userId)
    return axios.put(`/user/lectures/update-lectures/${userId}`,data).then(res => {
        return res.data
    }).catch(err => console.log(err))
}