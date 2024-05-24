import React, { useState } from 'react'
import './CounselDetail.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropDownNum, DropDownTime, DropDownVisitPath, DropDowncharger } from '../DefaultData';
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { DropdownBox } from '../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../MainURL';



export default function CounselDetail (props : any) {
	
  let navigate = useNavigate();
  const location = useLocation(); 
  const propsData = location.state.data;
  const pathType = location.state.pathType;

  const [sort, setSort] = useState('honeymoon');
  const [name, setName] = useState(propsData.name);
  const [phone, setPhone] = useState(propsData.phone);
  const [dateCeremony, setDateCeremony] = useState(propsData.dateCeremony);
  const [dateStart, setDateStart] = useState(pathType === 'revise' ? propsData.dateStart : '');
  const [dateEnd, setDateEnd] = useState(pathType === 'revise' ? propsData.dateEnd : '');
  const [tourLocation, setTourLocation] = useState(propsData.tourLocation);
  const [tourPersonNum, setTourPersonNum] = useState(pathType === 'revise' ? propsData.tourPersonNum : DropDownNum[0].value);
  const [requestion, setRequestion] = useState(propsData.requestion);
  const [visitPath, setVisitPath] = useState(propsData.visitPath);
  const [visitDate, setVisitDate] = useState(propsData.date);
  const [visitTime, setVisitTime] = useState(pathType === 'revise' ? propsData.visitTime : DropDownTime[0].value);
  const [charger, setcharger] = useState(pathType === 'revise' ? propsData.charger : DropDowncharger[0].value);
  const [accepter, setAccepter] = useState(pathType === 'revise' ? propsData.accepter : '');
  const [notice, setNotice] = useState(pathType === 'revise' ? propsData.notice : '');

  // 수정저장 함수
  const handleCounselSave = async () => {
    await axios
    .post(`${MainURL}/adminschedule/savecounsel`, {
      onlinelistid : propsData.id,
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
        navigate('/counsel');
        window.scrollTo(0, 0);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // 수정저장 함수
  const handleCounselRevise = async () => {
    await axios
    .post(`${MainURL}/adminschedule/revisecounsel`, {
      id : propsData.id,
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
        alert('수정되었습니다.');
        navigate('/counsel/counsellist');
        window.scrollTo(0, 0);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // 수정저장 함수
  const handleCounselDelete = async () => {
    await axios
    .post(`${MainURL}/adminschedule/deletecounsel`, {
      id : propsData.id,
    })
    .then((res)=>{
      if (res.data) {
        alert('삭제되었습니다.');
        navigate('/counsel/counsellist');
        window.scrollTo(0, 0);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  return (
    <div className='counsel-detail'>
      
      <h1>상담접수</h1>

      <div className="header">
        <h1>[{propsData.date}]</h1>
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
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={name} onChange={(e)=>{setName(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
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
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={tourLocation} onChange={(e)=>{setTourLocation(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='방문경로'/>
            <p>{propsData.visitPath}</p>
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
            <p>{propsData.requestion}</p>
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
        <div className="btn" 
          onClick={()=>{
            if (pathType === 'new') {
              navigate('/counsel');
              window.scrollTo(0, 0);
            } else {
              navigate('/counsel/counsellist');
              window.scrollTo(0, 0);
            }
          }}
        >
          <p style={{color:'#333'}}>목록</p>
        </div>
        {
          pathType === 'new'
          ?
          <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={handleCounselSave}
          >
            <p>저장</p>
          </div>
          :
          <>
            <div className="btn" style={{backgroundColor:'#b3b3b3'}}
              onClick={handleCounselDelete}
            >
              <p>삭제</p>
            </div>
            <div className="btn" style={{backgroundColor:'#b8d257'}}
              onClick={handleCounselRevise}
            >
              <p>수정</p>
            </div>
            <div className="btn" style={{backgroundColor:'#333'}}>
              <p>계약진행</p>
            </div>
          </>
        }
        
        
      </div>

      
      
      
    </div>     
  )
}
