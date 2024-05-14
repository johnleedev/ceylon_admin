import React, { useState } from 'react'
import './CounselDetail.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { InputBox } from '../../boxs/InputBox';


export default function CounselDetail (props : any) {
	
  let navigate = useNavigate();
  const location = useLocation(); 

  const propsData = location.state;
  

  return (
    <div className='counsel-detail'>
      
      <h1>상담접수</h1>

      <div className="header">
        <h1>{`[${propsData.requestDate}]`}</h1>
      </div>

      {/* <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='상태'/>
            <p>상담</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='여행형태'/>
            <p>허니문</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width={120} text='성함'/>
            <p>이실론</p>
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='연락처'/>
            <p>010-0000-0000</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='예식일 / 지역'/>
            <p>2022-11-10(월) / 대구</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='여행기간'/>
            <p>2022-11-10(월) ~ 2022-11-26(화)</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width={120} text='여행지'/>
            <p>유럽</p>
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='방문경로'/>
            <p>웨딩쿨</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='여행인원'/>
            <p>2명</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width={120} text='문의사항' height={200}/>
            <p>고객이 문의하신 내용</p>
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='방문일'/>
            <p>2022-11-10 (월)</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='방문시간'/>
            <p>오후 2~3시</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='담당자'/>
            <p>김철수</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width={120} text='설명' height={200}/>
            <textarea 
              className="textarea"
              value={''}
              onChange={()=>{}}
            />
          </div>
        </div>
      </section> */}

      <div className='btn-box'>
        <div className="btn" >
          <p style={{color:'#333'}}>목록</p>
        </div>
        <div className="btn" style={{backgroundColor:'#b3b3b3'}}>
          <p>삭제</p>
        </div>
        <div className="btn" style={{backgroundColor:'#b8d257'}}>
          <p>수정</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}>
          <p>저장</p>
        </div>
        <div className="btn" style={{backgroundColor:'#333'}}>
          <p>계약진행</p>
        </div>
      </div>

      
      
      
    </div>     
  )
}
