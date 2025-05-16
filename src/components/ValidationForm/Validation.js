
// AGE VALIDATION 

const validateAge = (selectedDate) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const ageDiff = currentDate.getFullYear() - selectedDateObj.getFullYear();
  
    if (ageDiff < 18) {
      return false;
    }
  
    if (ageDiff === 18) {
      const currentMonth = currentDate.getMonth();
      const selectedMonth = selectedDateObj.getMonth();
  
      if (selectedMonth > currentMonth) {
        return false;
      }
  
      if (selectedMonth === currentMonth) {
        const currentDay = currentDate.getDate();
        const selectedDay = selectedDateObj.getDate();
  
        if (selectedDay > currentDay) {
          return false;
        }
      }
    }
  
    return true;
  };
  export default validateAge;