import moment from "moment";

export const getLocalTime = (time,timeZone) => {
    let formatedDate = moment(time);
    return formatedDate.tz(timeZone).format('hh:mm a')
}