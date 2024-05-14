import React, { useState } from 'react'
import './ModalCheck.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';


export default function ModalCheck (props : any) {

  const datecopy = props.checkContent.start;
  const date = format(datecopy, 'yyyy-MM-dd', { locale: ko });
  const time = format(datecopy, 'HH:mm', { locale: ko });
  const propsData = props.checkContent.extendedProps;
  

  return (
    <div className='modal-check'>
      <div className='close'
        onClick={()=>{props.setIsViewCheckModal(false)}}>
        <IoMdClose size={30}/>
      </div>

      <div className="header">
        <h1>{`[${date}] ${time}`}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행형태'/>
            <p>허니문</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='성함'/>
            <p>이실론</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <p>010-0000-0000</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='예식일 / 지역'/>
            <p>2022-11-10(월) / 대구</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            <p>2022-11-10(월) ~ 2022-11-26(화)</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='여행지'/>
            <p>유럽</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='방문경로'/>
            <p>웨딩쿨</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행인원'/>
            <p>2명</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='문의사항' height={100}/>
            <p>고객이 문의하신 내용</p>
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='방문일'/>
            <p>2022-11-10 (월)</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='방문시간'/>
            <p>오후 2~3시</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='담당자'/>
            <p>김철수</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='설명' height={100}/>
            <p>상담한 내용</p>
          </div>
        </div>
      </section>
      
      
    </div>     
  )
}
