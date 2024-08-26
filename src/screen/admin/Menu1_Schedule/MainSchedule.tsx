import React, { useEffect, useRef, useState } from 'react';
import './MainSchedule.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import ModalReserve from '../ModalReserve/ModalReserve';
import ModalCheckCounsel from './ModalCheck/ModalCheckCounsel';
import ModalInputCounsel from './ModalInputCounsel';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import ModalCheckVisit from './ModalCheck/ModalCheckVisit';
import ModalInputCompanySchedule from './ModalInputCompanySchedule';
import ModalCheckCompanySchedule from './ModalCheck/ModalCheckCompanySchedule';
import { useNavigate } from 'react-router-dom';
import ModalCheckEstimate from './ModalCheck/ModalCheckEsimate';
import Loading from '../components/Loading';
import { useRecoilValue } from 'recoil';
import { recoilExchangeRate } from '../../../RecoilStore';
import { format } from 'date-fns';

export default function MainSchdule() {

  let navigate = useNavigate();
  const recoilExchangeRateCopy = useRecoilValue(recoilExchangeRate);

  const [currentTab, setCurrentTab] = useState(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState('H');
  const [serialNum, setSerialNum] = useState('');
  const [events, setEvents] = useState<EventsProps[]>([]);
  const [modalSort, setModalSort] = useState('new');
  const [currentMonth, setCurrentMonth] = useState('');


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
        setEvents([]);
        setCurrentTab(num);
        if (num === 1) {fetchOnlinePosts();}
        if (num === 2) {fetchCounselPosts();}
        if (num === 3) {fetchReservePosts();}
        if (num === 4) {fetchReserveDepartPosts();}
        if (num === 6) {fetchScheduleCoPosts();}
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

  const fetchOnlinePosts = async () => {
    const resOnline = await axios.get(`${MainURL}/adminschedule/getonlinelist/all`)
    if (resOnline) {
      setEvents(resOnline.data)
    }
  };

  const fetchCounselPosts = async () => {
    const resCounsel = await axios.get(`${MainURL}/adminschedule/getcounsellist`)
    if (resCounsel) {
      setEvents(resCounsel.data);
    }
  };
  const fetchReservePosts = async () => {
    const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
    if (resReserve) {
      setEvents(resReserve.data);
    }
  };
  const fetchReserveDepartPosts = async () => {
    const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
    if (resReserve) {
      const copy = resReserve.data;
      copy.map((item:any, index:any)=>{
        item.date = item.tourStartPeriod;
      })
      setEvents(copy);
    }
  };
  const fetchScheduleCoPosts = async () => {
    const resScheduleCo = await axios.get(`${MainURL}/adminschedule/getschedulecompany`)
    if (resScheduleCo) {
      setEvents(resScheduleCo.data);
    }
  };

  useEffect(() => {
    fetchOnlinePosts();
  }, []);  


  // 달력 ---------------------------------------------------------------------------------------------
  const [checkContent, setCheckContent] = useState();
  const [which_Visit_Counsel, setWhich_Visit_Counsel] = useState(1);

  // 현재 월 데이터 가져오기
  const handleDatesSet = (dateInfo:any) => {
    const calendarApi = dateInfo.view.calendar;
    const startDate = calendarApi.getDate();
    const month = startDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더합니다.
    setCurrentMonth(month);
  };


  function renderEventContent(eventInfo:any) {

    return (
      <div
        onClick={()=>{
          if (currentTab === 3) {
            navigate(`/admin/reserve/reservedetail`, {state : eventInfo.event.extendedProps.serialNum});
          } else {
            if (currentTab === 1) {
              eventInfo.event.extendedProps.sort === '상담' ? setWhich_Visit_Counsel(1) : setWhich_Visit_Counsel(2);
            }
            setIsViewCheckModal(true);
            setCheckContent(eventInfo.event);
          }
        }}
        className='dayBox'
        style={{border: currentTab === 6 ? `1px solid ${eventInfo.event.extendedProps.fontColor}` : 'none'}}
      >
        { currentTab === 1 && <>
          <div style={{padding:'1px 3px', border:'1px solid #BDBDBD', borderRadius:'3px', marginRight:'3px', 
                      backgroundColor:eventInfo.event.extendedProps.sort === '상담' ? '#3a9fe5' : '#b8d257'}}>
            <p style={{color:'#fff'}}>{eventInfo.event.extendedProps.sort}신청</p>
          </div>
          <p>{eventInfo.event.extendedProps.name}</p>
        </>}
        { currentTab === 2 &&<>
          <h2>{eventInfo.event.extendedProps.charger}</h2>
          <p>{eventInfo.event.extendedProps.name}</p>
        </>}
        { currentTab === 3 &&<>
          <h2>{eventInfo.event.extendedProps.charger}</h2>
          <p>{eventInfo.event.extendedProps.name}</p>
        </>}
        { currentTab === 4 &&<>
          <h2>{eventInfo.event.extendedProps.charger}</h2>
          <p>{eventInfo.event.extendedProps.name}</p>
        </>}
        { currentTab === 6 && <>
          <div style={{backgroundColor:`${eventInfo.event.extendedProps.fontColor}`, padding:'2px 5px',
                      borderRadius:'3px', marginRight:'5px'}}>
            <p style={{color:'#fff'}}>{eventInfo.event.extendedProps.sort}</p>
          </div>
          <h3 style={{color: `${eventInfo.event.extendedProps.fontColor}`}}>{eventInfo.event.title}</h3>
        </>}
      </div>
    )
  }

  // 날짜 선택 --------------------------------------------------------------
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd');
  const [selectDate, setSelectDate] = useState(formattedDate);
  const handleSelectDate = (e:any) => {
    const year = e.date.getFullYear();
    const month = e.date.getMonth() < 10 ? `0${e.date.getMonth()+1}` : e.date.getMonth();
    const day = e.date.getDate() < 10 ? `0${e.date.getDate()}` : e.date.getDate();
    const result = `${year}-${month}-${day}` 
    setSelectDate(result);
  }

  // 예약 등록 함수 --------------------------------------------------------------------------------------------
  // alert
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
  // function
  const handleReserveMain = async () => {
    await axios
    .post(`${MainURL}/adminreserve/savemain`, {
      sort: sort,
      date : selectDate,
      exchangeRate : recoilExchangeRateCopy[0].KRW
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
  const [isViewScheduleModal, setIsViewScheduleModal] = useState<boolean>(false);
  const divAreaRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (divAreaRef.current) {
      const copy = divAreaRef.current.offsetHeight
      setHeight(copy);
    }
  }, [isViewReserveModal]);

  return (
    // events.length === 0 
    // ?
    // <Loading />
    // :
    <div className='Menu1'>

      <div className="top-row">
        <div className="noticebox">
          <p className='text'>{currentMonth}월 문의건</p>
          <div className="divider"></div>
          <p className='text blue'>1000</p>
        </div>
        <div className="noticebox">
          <p className='text'>{currentMonth}월 예약건</p>
          <div className="divider"></div>
          <p className='text blue'>500</p>
        </div>
        <div className="noticebox">
          <p className='text'>{currentMonth}월 미처리건</p>
          <div className="divider"></div>
          <p className='text blue'>500</p>
        </div>
      </div>

      <div className="top-row">
        <div className='rowbox'>
          <SelectBox num={1} text='온라인DB'/>
          <SelectBox num={2} text='상담스케줄'/>
          <SelectBox num={3} text='예약건'/>
          <SelectBox num={4} text='출발건'/>
          {/* <SelectBox num={5} text='취소일'/> */}
          <SelectBox num={6} text='회사일정'/>
        </div>
        {
          currentTab === 6 
          ?
          <div className='rowbox'>
            <div 
              className="select-box" 
              style={{backgroundColor: '#3a9fe5', color: '#fff' }}
              onClick={()=>{setIsViewScheduleModal(true)}}
            >일정등록</div>
          </div>
          :
          <div className='rowbox'>
            <p>{selectDate}</p>
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
            <div 
              className="select-box" 
              style={{backgroundColor: '#5fb7df', color: '#fff' }}
              onClick={()=>{
                setIsViewCounselModal(true);
              }}
            >상담등록</div>
            <div 
              className="select-box" 
              style={{backgroundColor: '#242d3f', color: '#fff' }}
              onClick={isReserve}
            >예약등록</div>
          </div>
        }
      </div>

      {/* 달력 -------------------------------------------------------------------------------------- */}
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
          datesSet={handleDatesSet}
        />
        {/* 확인 모달창 */}
        { 
          isViewCheckModal &&
          <div className="modalcheck-cover">
            <div className="modalcheck-backcover"
              onClick={()=>{setIsViewCheckModal(false);}}
            ></div>
            { currentTab === 1 && 
              ( which_Visit_Counsel === 1 
                ? <ModalCheckVisit setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>
                : <ModalCheckEstimate setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>
              )
            }
            { currentTab === 2 && <ModalCheckCounsel setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>}
            { currentTab === 6 && <ModalCheckCompanySchedule setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>}
          </div>
        }
      </div>

      {/* 상담등록 모달창 */}
      {
        isViewCounselModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
            <ModalInputCounsel 
              selectDate={selectDate}
              setIsViewCounselModal={setIsViewCounselModal}
              refresh={refresh}
              setRefresh={setRefresh}
              fetchCounselPosts={fetchCounselPosts}
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
              sort={sort === 'H' ? '허니문' : '일반'}
              serialNum={serialNum}
              setIsViewModal={setIsViewReserveModal}
              refresh={refresh}
              setRefresh={setRefresh}
              modalSort={modalSort}
              fetchReservePosts={fetchReservePosts}
             />
          </div>
        </div>
      }

      {/* 회사일정 등록 모달창 */}
      {
        isViewScheduleModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
            <ModalInputCompanySchedule
              selectDate={selectDate}
              setIsViewScheduleModal={setIsViewScheduleModal}
              refresh={refresh}
              setRefresh={setRefresh}
              fetchScheduleCoPosts={fetchScheduleCoPosts}
             />
          </div>
        </div>
      } 

    </div>
  );
}

