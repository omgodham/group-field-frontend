import axios from "../../../axios";
import qs from 'qs';


export const PayoutHelper =  (data) => {

    axios
    .post("/payment/payout",data)
    .then((response) => {
      console.log(response)
      return(response)
    })
    .catch((error) => {
      console.log(error);
      return(error)
    });
}
