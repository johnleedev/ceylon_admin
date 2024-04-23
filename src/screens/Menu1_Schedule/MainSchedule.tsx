import React, { useEffect, useRef, useState } from 'react';
import './Menu1Schedule.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import ModalReserve from './ModalReserve';


export default function MainSchdule() {

  const [currentTab, setCurrentTab] = useState(1);
  
  interface SelectBoxProps {
    num: number;
    text: string;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ num, text }) => (
    <div 
      className="select-box" 
      style={{backgroundColor: currentTab === num ? '#242d3f' : '#fff', 
              color: currentTab === num ? '#fff' : '#242d3f' }}
      onClick={()=>{
        setCurrentTab(num);
      }}
    >{text}</div>
  )
  
  // 달력 ---------------------------------------------------------
  const events = [
    { title: 'Meeting', date: '2024-04-01' }
  ]

  function renderEventContent(eventInfo:any) {
    return (
      <div
        onClick={()=>{console.log('sklfjd')}}
        className='dayBox'
      >
        <h2>김철수</h2>
        <p>김철수</p>
        <p>/</p>
        <p>김철수</p>
      </div>
    )
  }

  // 모달 ---------------------------------------------------------
  const [isViewModal, setIsViewModal] = useState<boolean>(false);
  const divAreaRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (divAreaRef.current) {
      const copy = divAreaRef.current.offsetHeight
      setHeight(copy);
    }
  }, [isViewModal]);


  return (
    <div className='Menu1'>

      <div className="top-row">
        <div className="noticebox">
          <p className='text'>월 상담건</p>
          <div className="divider"></div>
          <p className='text blue'>1000</p>
        </div>
        <div className="noticebox">
          <p className='text'>월 예약건</p>
          <div className="divider"></div>
          <p className='text blue'>500</p>
        </div>
        <div className="noticebox">
          <p className='text'>월 출발건</p>
          <div className="divider"></div>
          <p className='text blue'>500</p>
        </div>
      </div>

      <div className="top-row">
        <div className='rowbox'>
          <SelectBox num={1} text='NEW' />
          <SelectBox num={2} text='상담스케줄' />
          <SelectBox num={3} text='예약건' />
          <SelectBox num={4} text='출발건' />
          <SelectBox num={5} text='취소일' />
          <SelectBox num={6} text='회사일정' />
        </div>
        <div className='rowbox'>
          <div 
            className="select-box" 
            style={{backgroundColor: '#242d3f', color: '#fff' }}
            onClick={()=>{setIsViewModal(true);}}
          >예약등록</div>
        </div>
      </div>

      <div className='calendar'>
        <FullCalendar
          locale= "ko"
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          eventContent={renderEventContent}
          headerToolbar={{
            left: 'prevYear prev today',
            center: 'title',
            right: 'next nextYear'
          }}
          titleFormat={{
            year: 'numeric',
            month: 'long'
          }}
          
        />
      </div>

      {/* 예약등록 모달창 */}
      {
        isViewModal &&
        <div className='Modal-Reserve'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalReserve setIsViewModal={setIsViewModal}/>
          </div>
        </div>
      }
    
     
    </div>
  );
}

