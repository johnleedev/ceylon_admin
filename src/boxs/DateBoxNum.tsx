import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import './Boxs.scss'
import { getMonth, getYear } from "date-fns";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface DateBoxNumProps {
  date: any;
  setSelectDate : any;
  width?: string,
  subWidth? : string,
  right?: number
  marginLeft? : number
}

export const DateBoxNum : React.FC<DateBoxNumProps> = ({date, setSelectDate, width, subWidth, right, marginLeft }) => {

  const handleSelectDateChange = ( event : any) => {
    const copy = event.toLocaleDateString('ko-KR');
    const splitCopy = copy.slice(0, -1).split('. ');
    const splitCopy2Copy = splitCopy[1] < 10 ? `0${splitCopy[1]}` : splitCopy[1];
    const splitCopy3Copy = splitCopy[2] < 10 ? `0${splitCopy[2]}` : splitCopy[2];
    const reformmedText = `${splitCopy[0]}-${splitCopy2Copy}-${splitCopy3Copy}`;
    setSelectDate(reformmedText);
  }

 
  const YEARS = Array.from({ length: 10 }, (_, i) => getYear(new Date()) + i);
  const MONTHS = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <div className='calendarbox' style={{width : width ? `${width}` : '200px', marginLeft: marginLeft ? `${marginLeft}px` : '5px'}}>
      <div className="datebox" style={{width: subWidth ? `${subWidth}` : '170px'}}>
         <DatePicker
          className="calendar_dateinput"
          locale={ko}
          dateFormat='yyyy-MM-dd'
          shouldCloseOnSelect
          minDate={new Date('2012-01-01')}
          selected={date}
          onChange={handleSelectDateChange}
          formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="calendar_customHeaderContainer">
              <select
                value={getYear(date)}
                className="calendar_year"
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option} className="calendar_option">
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={getMonth(date)}
                className="calendar_month"
                onChange={({ target: { value } }) => changeMonth(+value)}
              >
                {MONTHS.map((option, index) => (
                  <option key={index} value={index} className="calendar_option">
                    {option}
                  </option>
                ))}
              </select>
              <div className="calendar_buttonBox">
                <button
                  type='button'
                  onClick={decreaseMonth}
                  className="calendar_monthButton"
                  disabled={prevMonthButtonDisabled}
                >
                  <IoIosArrowBack />
                </button>
                <button
                  type='button'
                  onClick={increaseMonth}
                  className="calendar_monthButton"
                  disabled={nextMonthButtonDisabled}
                >
                  <IoIosArrowForward />
                </button>
              </div>
            </div>
          )}
        />
      </div>
      <FaRegCalendarAlt className='calender-icon' style={{right: right ? `${right}px` : '20px'}}/>
    </div>  
  )
}
  
  
