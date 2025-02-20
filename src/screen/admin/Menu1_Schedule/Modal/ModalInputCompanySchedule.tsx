import React, { useState } from 'react'
import './ModalInput.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import axios from 'axios'
import MainURL from "../../../../MainURL";
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDowncharger, DropDownNum, DropDownTime, DropDownVisitPath } from '../../../DefaultData';
import { DateBoxSingleTime } from '../../../../boxs/DateBoxSingleTime';
import { format } from 'date-fns';


export default function ModalInputCompanySchedule(props:any) {

  const isAddOrRevise = props.isAddOrRevise;
  const scheduleData = isAddOrRevise === 'revise' ? props.modalData : null;

  const [scheduleStart, setScheduleStart] = useState<Date | null>(isAddOrRevise === 'revise' ? new Date(scheduleData.scheduleStart): null);
  const [scheduleEnd, setScheduleEnd] = useState<Date | null>(isAddOrRevise === 'revise' ? new Date(scheduleData.scheduleEnd) : null);
  const [fontColor, setFontColor] = useState(isAddOrRevise === 'revise' ? scheduleData.fontColor : '');
  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? scheduleData.sort : '');
  const [title, setTitle] = useState(isAddOrRevise === 'revise' ? scheduleData.title : '');
  const [writer, setWriter] = useState(isAddOrRevise === 'revise' ? scheduleData.writer : '');
  const [sharer, setSharer] = useState(isAddOrRevise === 'revise' ? scheduleData.sharer : '');
  const [notice, setNotice] = useState(isAddOrRevise === 'revise' ? scheduleData.notice : '');
 
  interface CheckBoxProps {
    title: string;
    sortInput : string;
    fontColor : string;
  }

  const CheckBox: React.FC<CheckBoxProps> = ({ title, sortInput, fontColor }) => (
    <div className='checkInputCover'>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={sort === `${sortInput}`}
          onChange={()=>{
            setSort(sortInput);
            setFontColor(fontColor);
          }}
        />
      </div>
      <p style={{borderBottom:`3px solid ${fontColor}`}}>{title}</p>
    </div>
  )

  // 저장 함수
  const handleCounselSave = async () => {
  
    await axios
    .post(`${MainURL}/adminschedule/saveschedulecompany`, {
      scheduleStart: scheduleStart,
      scheduleEnd : scheduleEnd,
      scheduleTitle : title,
      fontColor: fontColor,
      title : title,
      sort : sort,
      writer : writer,
      sharer : sharer,
      notice : notice,
    })
    .then((res)=>{
      if (res.data) {
        props.setRefresh(!props.refresh);
        alert('입력되었습니다.');
        props.setIsViewScheduleModal(false);
        props.fetchScheduleCoPosts();
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // 수정 함수
  const handleCounselRevise = async () => {
  
    await axios
    .post(`${MainURL}/adminschedule/reviseschedulecompany`, {
      postId : scheduleData.id,
      scheduleStart: scheduleStart ? format(scheduleStart, 'yyyy-MM-dd HH:mm') : '',
      scheduleEnd : scheduleEnd ? format(scheduleEnd, 'yyyy-MM-dd HH:mm') : '',
      scheduleTitle : title,
      fontColor: fontColor,
      sort : sort,
      title : title,
      writer : writer,
      sharer : sharer,
      notice : notice,
    })
    .then((res)=>{
      if (res.data) {
        alert('수정되었습니다.');
        props.fetchScheduleCoPosts();
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };


  return (
    <div className='modal-counsel'>
      <div className='close'
        onClick={()=>{props.setIsViewScheduleModal(false)}}>
        <IoMdClose size={30}/>
      </div>
      
      <div className="modal-header">
        <h1>일정등록</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행형태'/>
            <div style={{marginLeft: '10px', display:'flex', alignItems:'center'}}>
              <CheckBox title='박람회' sortInput='박람회' fontColor='#F15F5F'/>
              <CheckBox title='출장' sortInput='출장' fontColor='#F29661'/>
              <CheckBox title='교육' sortInput='교육' fontColor='#F2CB61'/>
              <CheckBox title='워크샵' sortInput='워크샵' fontColor='#86E57F'/>
              <CheckBox title='휴가' sortInput='휴가' fontColor='#6799FF'/>
              <CheckBox title='기타' sortInput='기타' fontColor='#A566FF'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='타이틀'/>
            <input className="inputdefault" type="text" style={{width:'60%'}} 
              value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='기간'/>
            <DateBoxSingleTime setSelectDate={setScheduleStart} date={scheduleStart}/>
            <p>~</p>
            <DateBoxSingleTime setSelectDate={setScheduleEnd} date={scheduleEnd}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='작성자'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={writer}
              options={DropDowncharger}
              handleChange={(e)=>{setWriter(e.target.value)}}
            />
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='공유자'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={sharer}
              options={DropDowncharger}
              handleChange={(e)=>{setSharer(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='설명' height={200}/>
            <textarea 
              className="textarea"
              value={notice}
              onChange={(e)=>{setNotice(e.target.value)}}
            />
          </div>
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" style={{backgroundColor:'#b3b3b3'}}
          onClick={()=>{props.setIsViewScheduleModal(false)}}
        >
          <p>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            isAddOrRevise === 'revise'
            ? handleCounselRevise()
            : handleCounselSave();
          }}
        >
          <p>저장</p>
        </div>
      </div>
     
    </div>     
  )
}
