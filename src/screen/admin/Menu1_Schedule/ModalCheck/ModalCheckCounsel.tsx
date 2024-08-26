import React, { useState } from 'react'
import './ModalCheck.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';


export default function ModalCheckCounsel (props : any) {

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
        <h1>{`[${date}] ${propsData.visitTime}`}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행형태'/>
            <p>{propsData.sort === "honeymoon" ? "허니문" : "일반"}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='성함'/>
            <p>{propsData.name}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <p>{propsData.phone}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='예식일'/>
            <p>{propsData.dateCeremony}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            <p>{propsData.dateStart} ~ {propsData.dateEnd}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='여행지'/>
            <p>{propsData.tourLocation}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='방문경로'/>
            <p>{propsData.visitPath}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행인원'/>
            <p>{propsData.tourPersonNum}명</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='문의사항' height={100}/>
            <p>{propsData.requestion}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='방문일'/>
            <p>{date}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='방문시간'/>
            <p>{propsData.visitTime}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='담당자'/>
            <p>{propsData.charger}</p>
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
