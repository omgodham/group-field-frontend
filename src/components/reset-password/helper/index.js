import React from 'react'

import axios from "../../../axios";


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
