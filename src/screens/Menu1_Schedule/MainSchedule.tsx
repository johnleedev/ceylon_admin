import React, { useEffect, useRef, useState } from 'react';
import './MainSchedule.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import ModalReserve from './ModalReserve';
import ModalCheck from './ModalCheck';
import ModalCounsel from './ModalCounsel';
import axios from 'axios';
import MainURL from '../../MainURL';
import { DropdownBox } from '../../boxs/DropdownBox';


export default function MainSchdule() {

  const [currentTab, setCurrentTab] = useState(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState('H');
  const [serialNum, setSerialNum] = useState('');
  const [events, setEvents] = useState<EventsProps[]>([]);

  interface SelectBoxProps {
    num: number;
    text: string;
    content : any;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ num, text, content }) => (
    <div 
      className="select-box" 
      style={{backgroundColor: currentTab === num ? '#242d3f' : '#fff', 
              color: currentTab === num ? '#fff' : '#242d3f' }}
      onClick={()=>{
        setCurrentTab(num);
        setEvents(content);
      }}
    >{text}</div>
  )


  // 게시글 가져오기 ------------------------------------------------------
  interface EventsProps {
    date: string;
    charger: string;
    name: string;
    visitTime : string;
  }
  
  const [counsels, setCounsels] = useState<EventsProps[]>([]);
  const [reserves, setReserves] = useState<EventsProps[]>([]);

  const fetchPosts = async () => {
    const resCounsel = await axios.get(`${MainURL}/admincounsel/getlist`)
    if (resCounsel) {
      setCounsels(resCounsel.data);
    }
    const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
    if (resReserve) {
      setReserves(resReserve.data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]);  
  
 
  // 달력 ---------------------------------------------------------
  const [checkContent, setCheckContent] = useState();
  const companySchedule = [
    {
      title: 'schedule', start: '2024-05-23', end: '2024-05-25', content : "테스트일정", color: '#333'
    },
  ]

  function renderEventContent(eventInfo:any) {
    return (
      <div
        onClick={()=>{
          setIsViewCheckModal(true);
          setCheckContent(eventInfo.event);
        }}
        className='dayBox'
        style={{border: `2px solid ${currentTab === 6 ? eventInfo.event.extendedProps.color : '#fff'}`}}
      >
        { currentTab === 2 &&
        <>
          <p style={{marginRight:'5px'}}>{eventInfo.event.extendedProps.visitTime}</p>
          <h2>{eventInfo.event.extendedProps.charger}</h2>
          <p>{eventInfo.event.extendedProps.name}</p>
        </>
        }
         { currentTab === 3 &&
          <>
            <h2>{eventInfo.event.extendedProps.charger}</h2>
            <p>{eventInfo.event.extendedProps.name}</p>
          </>
        }
        { currentTab === 6 && <h2>{eventInfo.event.extendedProps.content}</h2> }
      </div>
    )
  }
  const [selectDate, setSelectDate] = useState('');
  const handleSelectDate = (e:any) => {
    const year = e.date.getFullYear();
    const month = e.date.getMonth() < 10 ? `0${e.date.getMonth()+1}` : e.date.getMonth();
    const day = e.date.getDate() < 10 ? `0${e.date.getDate()}` : e.date.getDate();
    const result = `${year}-${month}-${day}` 
    setSelectDate(result);
  }

  // 예액등록 함수 ---------------------------------------------------------
  const isReserve = async () => {
    if (selectDate === '') {
      alert('날짜를 선택해주세요')
    } else {
      const result = window.confirm(`${sort === 'H' ? '허니문' : '일반'} 예약을 ${selectDate} 날짜로 등록하시겠습니까?`);
      if (result) {
        handleReserveMain();
      } else {
        alert('취소되었습니다.')
      }
    }
  };

  const handleReserveMain = async () => {
    await axios
    .post(`${MainURL}/adminreserve/savemain`, {
      sort: sort,
      date : selectDate
    })
    .then((res)=>{
      if (res.data.result) {
        setSerialNum(res.data.serialNum);
        setIsViewReserveModal(true);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };


  // 모달 ---------------------------------------------------------
  const [isViewCounselModal, setIsViewCounselModal] = useState<boolean>(false);
  const [isViewReserveModal, setIsViewReserveModal] = useState<boolean>(false);
  const [isViewCheckModal, setIsViewCheckModal] = useState<boolean>(false);
  const divAreaRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (divAreaRef.current) {
      const copy = divAreaRef.current.offsetHeight
      setHeight(copy);
    }
  }, [isViewReserveModal]);


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
          <SelectBox num={1} text='온라인문의' content={events}/>
          <SelectBox num={2} text='상담스케줄' content={counsels}/>
          <SelectBox num={3} text='예약건' content={reserves}/>
          <SelectBox num={4} text='출발건' content={events}/>
          <SelectBox num={5} text='취소일' content={events}/>
          <SelectBox num={6} text='회사일정' content={companySchedule}/>
        </div>
        <div className='rowbox'>
          <p>{selectDate}</p>
          {
            currentTab === 2 
            ?
            <div 
              className="select-box" 
              style={{backgroundColor: '#5fb7df', color: '#fff' }}
              onClick={()=>{
                if (selectDate === '') {
                  alert('날짜를 선택해주세요')
                } else {
                  setIsViewCounselModal(true);
                }
              }}
            >상담등록</div>
            :
            <DropdownBox
              widthmain='70px'
              height='35px'
              selectedValue={sort}
              options={[
                { value: 'H', label: '허니문' },
                { value: 'G', label: '일반' },
              ]}    
              handleChange={(e)=>{setSort(e.target.value)}}
            />
          }
          <div 
            className="select-box" 
            style={{backgroundColor: '#242d3f', color: '#fff' }}
            onClick={isReserve}
          >예약등록</div>
        </div>
      </div>

      <div className='calendar'>
        <FullCalendar
          locale= "ko"
          plugins={[interactionPlugin, dayGridPlugin]}
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
          selectable={true}
          dateClick={(e)=>{handleSelectDate(e)}}
        />
        {/* 확인 모달창 */}
        {
          isViewCheckModal &&
          <div className="modalcheck-cover">
            <div className="modalcheck-backcover"
              onClick={()=>{setIsViewCheckModal(false);}}
            ></div>
            <ModalCheck setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>
          </div>
        }
      </div>

      {/* 상담등록 모달창 */}
      {
        isViewCounselModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
            <ModalCounsel 
              selectDate={selectDate}
              setIsViewCounselModal={setIsViewCounselModal}
              refresh={refresh}
              setRefresh={setRefresh}
             />
          </div>
        </div>
      }

      {/* 예약등록 모달창 */}
      {
        isViewReserveModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalReserve 
              serialNum={serialNum}
              setIsViewModal={setIsViewReserveModal}
              refresh={refresh}
              setRefresh={setRefresh}
             />
          </div>
        </div>
      }

      
    
     
    </div>
  );
}

