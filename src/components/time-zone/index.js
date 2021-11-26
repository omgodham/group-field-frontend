import React from 'react'



export const ResetPasswordHelper =  (data) => {

    console.log(data);

    return axios
    .post("/auth/reset-password",{"data": data})
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}
