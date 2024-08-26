import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import './Boxs.scss'


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

  return (
    <div className='calendarbox' style={{width : width ? `${width}` : '200px', marginLeft: marginLeft ? `${marginLeft}px` : '5px'}}>
      <div className="datebox" style={{width: subWidth ? `${subWidth}` : '170px'}}>
        <DatePicker
          className="dateinput"
          locale={ko}
          dateFormat='yyyy-MM-dd'
          shouldCloseOnSelect
          minDate={new Date('2012-01-01')}
          selected={date}
          onChange={handleSelectDateChange}
        />
      </div>
      <FaRegCalendarAlt className='calender-icon' style={{right: right ? `${right}px` : '20px'}}/>
    </div>  
  )
}
  
  
