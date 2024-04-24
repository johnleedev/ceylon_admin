import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import './Boxs.scss'

interface DateBoxProps {
  date: any;
  func: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
  width?: number,
}

export const DateBox : React.FC<DateBoxProps> = ({date, func, width }) => (
  <div className='calendarbox' style={{width : width ? width : '210px'}}>
    <DatePicker
      className="dateinput"
      locale={ko}
      dateFormat='yyyy년 MM월 dd일 (eee)'
      shouldCloseOnSelect
      minDate={new Date('2012-01-01')}
      selected={date}
      onChange={func}
    />
    <FaRegCalendarAlt className='calender-icon'/>
  </div>
)
