import React, { useState } from 'react'
import './ModalInput.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import axios from 'axios'
import MainURL from "../../../../MainURL";
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';
import { DateBoxSingle } from '../../../../boxs/DateBoxSingle';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDowncharger, DropDownNum, DropDownTime, DropDownVisitPath } from '../../../DefaultData';
import { DateBoxSingleTime } from '../../../../boxs/DateBoxSingleTime';
import { format } from 'date-fns';



export default function ModalInputCounsel(props:any) {

  const isAddOrRevise = props.isAddOrRevise;
  const counselData = isAddOrRevise === 'revise' ? props.modalData : null;

  const [scheduleStart, setScheduleStart] = useState<Date | null>(isAddOrRevise === 'revise' ? new Date(counselData.scheduleStart): null);
  const [scheduleEnd, setScheduleEnd] = useState<Date | null>(isAddOrRevise === 'revise' ? new Date(counselData.scheduleEnd) : null);
  const [fontColor, setFontColor] = useState(isAddOrRevise === 'revise' ? counselData.fontColor : '');
  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? counselData.sort : 'honeymoon');
  const [name, setName] = useState(isAddOrRevise === 'revise' ? counselData.name : '');
  const [phone, setPhone] = useState(isAddOrRevise === 'revise' ? counselData.phone : '');
  const [dateCeremony, setDateCeremony] = useState(isAddOrRevise === 'revise' ? counselData.dateCeremony : '');
  const [dateStart, setDateStart] = useState(isAddOrRevise === 'revise' ? counselData.dateStart : '');
  const [dateEnd, setDateEnd] = useState(isAddOrRevise === 'revise' ? counselData.dateEnd : '');
  const [tourLocation, setTourLocation] = useState(isAddOrRevise === 'revise' ? counselData.tourLocation : '');
  const [tourPersonNum, setTourPersonNum] = useState(isAddOrRevise === 'revise' ? counselData.tourPersonNum : DropDownNum[0].value);
  const [requestion, setRequestion] = useState(isAddOrRevise === 'revise' ? counselData.requestion : '');
  const [visitPath, setVisitPath] = useState(isAddOrRevise === 'revise' ? counselData.visitPath : DropDownVisitPath[0].value);
  const [charger, setcharger] = useState(isAddOrRevise === 'revise' ? counselData.charger : DropDowncharger[0].value);
  const [accepter, setAccepter] = useState(isAddOrRevise === 'revise' ? counselData.accepter : '');
  const [notice, setNotice] = useState(isAddOrRevise === 'revise' ? counselData.notice : '');

  // 저장 함수
  const handleCounselSave = async () => {
  
    await axios
    .post(`${MainURL}/adminschedule/savecounsel`, {
      scheduleStart: scheduleStart,
      scheduleEnd : scheduleEnd,
      scheduleTitle : name,
      fontColor: fontColor,
      sort : sort,
      name : name,
      phone: phone,
      dateCeremony : dateCeremony,
      dateStart: dateStart,
      dateEnd : dateEnd,
      tourLocation: tourLocation,
      tourPersonNum: tourPersonNum,
      requestion: requestion,
      visitPath: visitPath,
      charger: charger,
      accepter: accepter,
      notice: notice
    })
    .then((res)=>{
      if (res.data) {
        props.setRefresh(!props.refresh);
        alert('입력되었습니다.');
        props.setIsViewCounselModal(false);
        props.fetchCounselPosts();
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // 수정 함수
  const handleCounselRevise = async () => {
  
    await axios
    .post(`${MainURL}/adminschedule/revisecounsel`, {
      postId: counselData.id,
      scheduleStart: scheduleStart ? format(scheduleStart, 'yyyy-MM-dd HH:mm') : '',
      scheduleEnd : scheduleEnd ? format(scheduleEnd, 'yyyy-MM-dd HH:mm') : '',
      scheduleTitle : name,
      fontColor: fontColor,
      sort : sort,
      name : name,
      phone: phone,
      dateCeremony : dateCeremony,
      dateStart: dateStart,
      dateEnd : dateEnd,
      tourLocation: tourLocation,
      tourPersonNum: tourPersonNum,
      requestion: requestion,
      visitPath: visitPath,
      charger: charger,
      accepter: accepter,
      notice: notice
    })
    .then((res)=>{
      if (res.data) {
        alert('수정되었습니다.');
        props.fetchCounselPosts();
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  interface ColorCheckBoxProps {
    fontColorCopy : string;
  }

  const ColorCheckBox: React.FC<ColorCheckBoxProps> = ({ fontColorCopy }) => (
    <div className='checkInputCover' style={{margin:'0'}}>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={fontColor === fontColorCopy}
          style={{backgroundColor:fontColorCopy}}
          onChange={()=>{
            setFontColor(fontColorCopy);
          }}
        />
      </div>
      <p style={{backgroundColor:fontColorCopy, fontSize:'14px'}}>{fontColorCopy}</p>
    </div>
  )

  return (
    <div className='modal-counsel'>
      <div className='close'
        onClick={()=>{props.setIsViewCounselModal(false)}}>
        <IoMdClose size={30}/>
      </div>
      
      <div className="modal-header">
        {
          isAddOrRevise === 'revise' 
          ? <h1>[{scheduleStart && format(scheduleStart, 'yyyy-MM-dd HH:mm')}]</h1>
          : <h1>[{props.selectDate && format(props.selectDate, 'yyyy-MM-dd')}]</h1>
        }
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행형태'/>
            <div style={{marginLeft: '10px', display:'flex', alignItems:'center'}}>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={sort === 'honeymoon'}
                  onChange={()=>{setSort('honeymoon')}}
                  style={{width:'20px', height:'20px', backgroundColor:'red'}}
                />
              </div>
              <p>허니문</p>
              <div className='checkInput' style={{marginLeft:'10px'}}>
                <input className="input" type="checkbox"
                  checked={sort === 'general'}
                  onChange={()=>{setSort('general')}}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>일반여행</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='성함'/>
            <input className="inputdefault" type="text" style={{width:'60%'}} 
              value={name} onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <input className="inputdefault" type="text" style={{width:'60%'}} 
              value={phone} onChange={(e)=>{setPhone(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='예식일'/>
            <DateBoxSingle setSelectDate={setDateCeremony} date={dateCeremony}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            <DateBoxDouble setSelectStartDate={setDateStart} setSelectEndDate={setDateEnd} dateStart={dateStart} dateEnd={dateEnd}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='여행지'/>
            <input className="inputdefault" type="text" style={{width:'60%'}} 
              value={tourLocation} onChange={(e)=>{setTourLocation(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='방문경로'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={visitPath}
              options={DropDownVisitPath}
              handleChange={(e)=>{setVisitPath(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행인원'/>
            <DropdownBox
              widthmain='10%'
              height='35px'
              selectedValue={tourPersonNum}
              options={DropDownNum}    
              handleChange={(e)=>{setTourPersonNum(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='요청사항' height={200}/>
            <textarea 
              className="textarea"
              value={requestion}
              onChange={(e)=>{setRequestion(e.target.value)}}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='방문일시'/>
            <DateBoxSingleTime setSelectDate={setScheduleStart} date={scheduleStart}/>
            <p>~</p>
            <DateBoxSingleTime setSelectDate={setScheduleEnd} date={scheduleEnd}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='일정색상'/>
            <div style={{marginLeft: '10px', display:'flex', alignItems:'center'}}>
              <ColorCheckBox fontColorCopy='#F15F5F'/>
              <ColorCheckBox fontColorCopy='#F29661'/>
              <ColorCheckBox fontColorCopy='#F2CB61'/>
              <ColorCheckBox fontColorCopy='#86E57F'/>
              <ColorCheckBox fontColorCopy='#6799FF'/>
              <ColorCheckBox fontColorCopy='#A566FF'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='담당자'/>
            <DropdownBox
              widthmain='30%'
              height='35px'
              selectedValue={charger}
              options={DropDowncharger}   
              handleChange={(e)=>{setcharger(e.target.value)}}
            />
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='인수자'/>
            <DropdownBox
              widthmain='30%'
              height='35px'
              selectedValue={accepter}
              options={DropDowncharger}   
              handleChange={(e)=>{setAccepter(e.target.value)}}
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
          onClick={()=>{
            isAddOrRevise === 'revise'
            ? handleCounselRevise()
            : handleCounselSave()
          }}
        >
          <p>저장</p>
        </div>
      </div>
     
    </div>     
  )
}
