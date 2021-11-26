import axios from "../../../axios";


export const ForgotPasswordHelper =  (email) => {

    let data = email;

    return axios
    .post("/auth/forgot-password",{"data": data})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}
