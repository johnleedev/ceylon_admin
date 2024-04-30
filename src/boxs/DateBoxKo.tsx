import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { FaRegCalendarAlt } from "react-icons/fa";
import './Boxs.scss'

interface DateBoxKoProps {
  date: any;
  func: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
  width?: number,
  subWidth? : number,
  right?: number
}

export const DateBoxKo : React.FC<DateBoxKoProps> = ({date, func, width, subWidth, right }) => (
  <div className='calendarbox' style={{width : width ? `${width}px` : '210px'}}>
    <div className="inputbox" style={{width: subWidth ? `${subWidth}px` : '180px'}}>
      <DatePicker
        className="dateinput"
        locale={ko}
        dateFormat='yyyy년 MM월 dd일 (eee)'
        shouldCloseOnSelect
        minDate={new Date('2012-01-01')}
        selected={date}
        onChange={func}
      />
    </div>
    <FaRegCalendarAlt className='calender-icon' style={{right: right ? `${right}px` : '22px'}}/>
  </div>
)
