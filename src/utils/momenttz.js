// import moment from "moment";
import moment from 'moment-timezone';
// import LocalCurrency from 'react-local-currency'
import data from 'currency-codes';
// var data = require('currency-codes/data');
const clm = require('country-locale-map');





export const getLocalTime = (time,timeZone) => {
    let formatedDate = moment(time);
    return formatedDate.tz(timeZone).format('hh:mm a')
}

export const getTimeZone = () => {

    const zz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // let timeZone = moment.tz()
    // console.log('timeZones',moment.tz()._d);
    
    return zz
}


export const localCurrency = () => {
    let currency = clm.getCurrencyByAlpha2(localStorage.getItem('country'));
    console.log('currency',currency);
}