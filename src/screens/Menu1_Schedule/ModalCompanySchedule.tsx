import React, { useState } from 'react'
import './ModalCounsel.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../boxs/TitleBox';
import axios from 'axios'
import MainURL from "../../MainURL";
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DropDowncharger, DropDownNum, DropDownTime, DropDownVisitPath } from '../DefaultData';


export default function ModalCompanySchedule(props:any) {

  const [sort, setSort] = useState('honeymoon');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateCeremony, setDateCeremony] = useState();
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [tourLocation, setTourLocation] = useState('');
  const [tourPersonNum, setTourPersonNum] = useState(DropDownNum[0].value);
  const [requestion, setRequestion] = useState('');
  const [visitPath, setVisitPath] = useState(DropDownVisitPath[0].value);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState(DropDownTime[0].value);
  const [charger, setcharger] = useState(DropDowncharger[0].value);
  const [accepter, setAccepter] = useState('');
  const [notice, setNotice] = useState('');


  // 수정저장 함수
  const handleCounselSave = async () => {
  
    await axios
    .post(`${MainURL}/adminschedule/save`, {
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
      visitDate: visitDate,
      visitTime: visitTime,
      charger: charger,
      accepter: accepter,
      notice: notice
    })
    .then((res)=>{
      if (res.data) {
        alert('입력되었습니다.');
        props.setIsViewCounselModal(false);
        props.setRefrsh(!props.refresh);
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
      
      <div className="header">
        <h1>[{props.selectDate}]</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행형태'/>
            <div style={{marginLeft: '10px', display:'flex', alignItems:'center'}}>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={sort === 'honeymoon'}
                  onChange={()=>{setSort('honeymoon')}}
                  style={{width:'20px', height:'20px', backgroundColor:'red'}}
                />
              </div>
              <p>허니문</p>
              <div style={{marginLeft: '20px', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center'}}>
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
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setDateCeremony} date={dateCeremony}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setDateStart} date={dateStart}/>
            <p style={{marginRight:'10px'}}>~</p>
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setDateEnd} date={dateEnd}/>
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
            <TitleBox width="120px" text='방문일'/>
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setVisitDate} date={visitDate}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='방문시간'/>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={visitTime}
              options={DropDownTime}   
              handleChange={(e)=>{setVisitTime(e.target.value)}}
            />
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
        <div className="btn" style={{backgroundColor:'#b8d257'}}>
          <p>수정</p>
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
