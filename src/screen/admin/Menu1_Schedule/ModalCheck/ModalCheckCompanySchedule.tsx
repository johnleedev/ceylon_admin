import React, { useState } from 'react'
import './ModalCheck.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';
import { DateBoxSingleTime } from '../../../../boxs/DateBoxSingleTime';


export default function ModalCheckCompanySchedule (props : any) {

  const [dateStart, setDateStart] = useState(props.checkContent.start);
  const [dateEnd, setDateEnd] = useState(props.checkContent.end);
  
  const propsData = props.checkContent.extendedProps;
  

  return (
    <div className='modal-check'>
      <div className='close'
        onClick={()=>{props.setIsViewCheckModal(false)}}>
        <IoMdClose size={30}/>
      </div>

      <div className="modal-header">
        <h1>{props.checkContent.title}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='유형'/>
            <p style={{borderBottom:`3px solid ${propsData.fontColor}`}}>{propsData.sort}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='기간'/>
            <DateBoxSingleTime setSelectDate={setDateStart} date={dateStart}/>
            <p>~</p>
            <DateBoxSingleTime setSelectDate={setDateEnd} date={dateEnd}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='작성자'/>
            <p>{propsData.writer}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='공유자'/>
            <p>{propsData.sharer}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='설명' height={100}/>
            <p>{propsData.notice}</p>
          </div>
        </div>
      </section>

    </div>     
  )
}
