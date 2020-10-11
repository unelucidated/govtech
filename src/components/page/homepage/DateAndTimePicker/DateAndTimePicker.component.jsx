import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


const DateAndTimePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={date => setStartDate(date)}
        timeInputLabel="Time:"
        dateFormat="MM/dd/yyyy h:mm aa"
        showTimeSelect
        showYearDropdown
        scrollableMonthYearDropdown
        maxDate={new Date()}
      />
    );
  };

export default DateAndTimePicker;