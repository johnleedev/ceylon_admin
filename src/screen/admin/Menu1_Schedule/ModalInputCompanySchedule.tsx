import React, { useState } from 'react'
import './ModalInput.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../boxs/TitleBox';
import axios from 'axios'
import MainURL from "../../../MainURL";
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDowncharger, DropDownNum, DropDownTime, DropDownVisitPath } from '../../DefaultData';


export default function ModalCompanySchedule(props:any) {

  const [sort, setSort] = useState('');
  const [color, setColor] = useState('');
  const [title, setTitle] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [writer, setWriter] = useState('');
  const [sharer, setSharer] = useState('');
  const [notice, setNotice] = useState('');
 

  interface CheckBoxProps {
    title: string;
    sortInput : string;
    color : string;
  }

  const CheckBox: React.FC<CheckBoxProps> = ({ title, sortInput, color }) => (
    <div className='checkInputCover'>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={sort === `${sortInput}`}
          onChange={()=>{
            setSort(sortInput);
            setColor(color);
          }}
        />
      </div>
      <p style={{borderBottom:`3px solid ${color}`}}>{title}</p>
    </div>
  )

  // 수정 저장 함수
  const handleCounselSave = async () => {
  
    await axios
    .post(`${MainURL}/adminschedule/saveschedulecompany`, {
      sort : sort,
      title : title,
      dateStart: dateStart,
      dateEnd : dateEnd,
      writer : writer,
      sharer : sharer,
      notice : notice,
      color: color
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
              <CheckBox title='박람회' sortInput='박람회' color='#F15F5F'/>
              <CheckBox title='출장' sortInput='출장' color='#F29661'/>
              <CheckBox title='교육' sortInput='교육' color='#F2CB61'/>
              <CheckBox title='워크샵' sortInput='워크샵' color='#86E57F'/>
              <CheckBox title='휴가' sortInput='휴가' color='#6799FF'/>
              <CheckBox title='기타' sortInput='기타' color='#A566FF'/>
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
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setDateStart} date={dateStart}/>
            <p style={{marginRight:'10px'}}>~</p>
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setDateEnd} date={dateEnd}/>
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
          onClick={()=>{props.setIsViewCounselModal(false)}}
        >
          <p>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={handleCounselSave}
        >
          <p>저장</p>
        </div>
      </div>
     
    </div>     
  )
}
