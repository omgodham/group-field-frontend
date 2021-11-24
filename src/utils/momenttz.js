// import moment from "moment";
import moment from "moment-timezone";
// import LocalCurrency from 'react-local-currency'
import data from "currency-codes";
import axios from "axios";
// var data = require('currency-codes/data');
const clm = require("country-locale-map");

export const getLocalTime = (time, timeZone) => {
  let formatedDate = moment(time);
  return formatedDate.tz(timeZone).format("hh:mm a");
};

export const getTimeZone = () => {
  let timeZone = moment.tz();
  // console.log('timeZones',moment.tz());

  return fetch("https://worldtimeapi.org/api/ip")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.timezone,data.datetime,data.dst)
      return data.timezone;
    });

  // // return timeZone

  // const zz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // // let timeZone = moment.tz()
  // // console.log('timeZones',moment.tz()._d);

  // return zz
};

export const getLocalCurrency = async () => {
 return await axios.get("https://ipinfo.io?token=43876bc6547234").then((response) => {
    //  localStorage.setItem('country',response.data.country)
    //  console.log(response)
  
    // axios.get("https://api.exchangerate.host/convert?from=USD&to=INR&amount=12").
    // then((response) => {
    //   // console.log(response)
    // })
    let currency = clm.getCurrencyByAlpha2(response.data.country);
    // console.log('currency',currency);
    return currency;
  }).catch(err => console.log(err));
};

export const convertMoneyToLocalCurrency= async (from,to,amount) => {
     return await axios.get(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`).
     then((response) => response.data.result)
     .then(data => data)
 };