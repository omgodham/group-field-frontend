// import moment from "moment";
import moment from 'moment-timezone';


export const getLocalTime = (time,timeZone) => {
    let formatedDate = moment(time);
    return formatedDate.tz(timeZone).format('hh:mm a')
}

export const getTimeZone = () => {
    let timeZone = moment.tz()
    console.log('timeZones',moment.tz());
    
    return timeZone
}