import axios from "../../../axios";
import qs from 'qs';


export const Payout =  (email) => {

    // let data = email;

    return axios
    .post("/payment/payout",{"email":email})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}
