import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import './Boxs.scss'

interface DateBoxNumProps {
  date: any;
  func: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
  width?: number,
  subWidth? : number,
  right?: number
}

export const DateBoxNum : React.FC<DateBoxNumProps> = ({date, func, width, subWidth, right }) => (
  <div className='calendarbox' style={{width : width ? `${width}px` : '200px', display:'flex', justifyContent:'center'}}>
    <div className="datebox" style={{width: subWidth ? `${subWidth}px` : '170px'}}>
      <DatePicker
        className="dateinput"
        locale={ko}
        dateFormat='yyyy-MM-dd'
        shouldCloseOnSelect
        minDate={new Date('2012-01-01')}
        selected={date}
        onChange={func}
      />
    </div>
    <FaRegCalendarAlt className='calender-icon' style={{right: right ? `${right}px` : '15px'}}/>
  </div>
)
