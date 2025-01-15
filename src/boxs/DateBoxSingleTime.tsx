import DatePicker, { CalendarContainer } from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import './Boxs.scss'
import { useState } from "react";
import { format, setHours, setMinutes } from "date-fns";


interface DateBoxDoubleProps {
  date : any;
  setSelectDate : any;
  marginLeft? : number
}

export const DateBoxSingleTime : React.FC<DateBoxDoubleProps> = ({date, setSelectDate, marginLeft }) => {

  const [startDate, setStartDate] = useState(date);

  const handleSelectDateChange = ( event : any) => {
    setStartDate(event);
    if (event){
      const date = new Date(event);
      const formattedDate = format(date, 'yyyy-MM-dd h:mm:ss')
      setSelectDate(formattedDate);
    }
  }

  return (
    <div className='calendarbox calendarSingleTime' style={{marginLeft: marginLeft ? `${marginLeft}px` : '5px'}}>
      <div className="datebox dateboxSingleTime">
         <DatePicker
          locale={ko}
          shouldCloseOnSelect // 날짜 선택시 달력 닫힘
          minDate={new Date('2023-01-01')} // 선택 가능한 최소 날짜
          selected={date}
          isClearable // 선택한 날짜를 초기화할 수 있는 버튼(클리어 버튼)을 활성화합니다.
          onChange={handleSelectDateChange}
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
          showYearDropdown // 연도 선택 드롭다운을 활성화합니다
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="time"
          dateFormat="yyyy년 MM월 dd일 aa hh:mm"
        />
      </div>
      <FaRegCalendarAlt className='calender-icon' style={{right: '10px'}}/>
    </div>  
  )
}
  
  
