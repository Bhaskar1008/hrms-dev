import moment from 'moment'


export const convertToIndianTimezone = (date, startDate) => {
    let convertedDateFromDate = new Date(date)
            convertedDateFromDate.setHours(new Date().getHours(), new Date().getMinutes())
            convertedDateFromDate = moment.utc(convertedDateFromDate).utcOffset(330)
            if(startDate){
                return (convertedDateFromDate.startOf('day').unix()) * 1000
            }else{
                return (convertedDateFromDate.endOf('day').unix()) * 1000
            }
}

export function convertTimeToDecimal(timeStr) {
    const timeComponents = timeStr.split(":");
    const hours = Number(timeComponents[0]);
    const minutes = Number(timeComponents[1].split(" ")[0]);
    const isPM = timeComponents[1].includes("PM");
  
    let decimal = hours + minutes / 60;
  
    if (isPM && hours !== 12) {
      decimal += 12;
    } else if (!isPM && hours === 12) {
      decimal -= 12;
    }
  
    return decimal * 3600000;
  }

  export function convertDecimalTimeToFormat(time){
    return moment.utc(time).utcOffset(330).format('hh:mm')
  }