import React,{useState} from 'react'
import PropType from 'prop-types'
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from 'moment';

function EmployeeCalendar({ markedDates }) {
  const [date, setDate] = useState(new Date());

  function tileClassName({ date }) {
    const dateString = date.toISOString().slice(0, 10);
   
  
    if (markedDates.includes(dateString)) {
      
      return "bg-sky-500 text-black";
    }else{
      return "bg-white text-black";
    }
    
  }

  const disableClick = (value, event) => {
    // Do nothing
  };

    return (
      <div>
        <Calendar
          tileClassName={tileClassName}
          formatDay={(locale, date) => moment(date).format('D')}
          locale="en-US"
          showNavigation={false}
          onClickDay={disableClick}
          value={date}
          onChange={setDate}
        />
      </div>
    );
  }
  
EmployeeCalendar.propTypes = {
    markedDates: PropType.arrayOf(PropType.string).isRequired,
}

export default EmployeeCalendar;
  