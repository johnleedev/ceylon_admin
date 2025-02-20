import React, { useEffect, useRef, useState } from 'react';
import './MainSchedule.scss'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ModalCheckCounsel from './Modal/zzModalCheckCounsel';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import ModalCheckVisit from './Modal/zzModalCheckVisit';
import ModalCheckCompanySchedule from './Modal/zzModalCheckCompanySchedule';
import { useNavigate } from 'react-router-dom';
import ModalCheckEstimate from './Modal/zzModalCheckEsimate';
import { useRecoilValue } from 'recoil';
import { recoilExchangeRate } from '../../../RecoilStore';
import { isValid, format } from 'date-fns';


interface EventsProps {
  date: string;
  charger: string;
  name: string;
  visitTime : string;
}

interface SelectBoxProps {
  num: number;
  text: string;
}


export default function MainSchdulePage() {

  let navigate = useNavigate();
  const recoilExchangeRateCopy = useRecoilValue(recoilExchangeRate);

  const [calendarType, setCalendarType] = useState('timeGridWeek');
  const [currentTab, setCurrentTab] = useState(1);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState('H');
  const [events, setEvents] = useState<EventsProps[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');


  const SelectBox: React.FC<SelectBoxProps> = ({ num, text }) => (
    <div 
      className="select-box" 
      style={{backgroundColor: currentTab === num ? '#242d3f' : '#fff', 
              color: currentTab === num ? '#fff' : '#242d3f' }}
      onClick={()=>{
        setEvents([]);
        setCurrentTab(num);
        if (num === 1) {fetchScheduleCoPosts();}
        // if (num === 2) {fetchOnlinePosts();}
        // if (num === 3) {fetchCounselPosts();}
        // if (num === 4) {fetchReservePosts();}
        // if (num === 5) {fetchReserveDepartPosts();}
      }}
    >{text}</div>
  )

  // 게시글 가져오기 ------------------------------------------------------


  const fetchScheduleCoPosts = async () => {
    const resScheduleCo = await axios.get(`${MainURL}/adminschedule/getschedulecompany`);
    if (resScheduleCo) {
      const formattedEvents = resScheduleCo.data.map((event: any) => {
        let eventDate = new Date(event.date);
        // 유효하지 않은 날짜인지 확인
        if (!isValid(eventDate)) {
          console.warn(`⚠️ 잘못된 날짜 값: ${event.date}`);  // 콘솔에서 확인
          eventDate = new Date();  // 현재 날짜를 기본값으로 설정
        }
        return {
          ...event,
          date: format(eventDate, 'yyyy-MM-dd HH:mm:ss'),  // ✅ 변환 후 저장
        };
      });
      setEvents(formattedEvents);
      console.log(formattedEvents);
    }
  };

  
  const fetchOnlinePosts = async () => {
    const resOnline = await axios.get(`${MainURL}/adminschedule/getonlinelist`);
    if (resOnline.data) {
      const formattedEvents = resOnline.data.map((event: any) => ({
        ...event,
        date: format(new Date(event.date), 'yyyy-MM-dd HH:mm:ss'),
      }));
      setEvents(formattedEvents);
    }
  };
  

  // const fetchCounselPosts = async () => {
  //   const resCounsel = await axios.get(`${MainURL}/adminschedule/getcounsellist`)
  //   if (resCounsel) {
  //     setEvents(resCounsel.data);
  //   }
  // };
  // const fetchReservePosts = async () => {
  //   const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
  //   if (resReserve) {
  //     const copy = [...resReserve.data];
  //     const result = copy.map((item) => ({
  //       ...item,
  //       userInfo: JSON.parse(item.userInfo).map((user:any) => user.nameKo).join('/')
  //     }));
  //     setEvents(result);
  //   }
  // };
  // const fetchReserveDepartPosts = async () => {
  //   const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
  //   if (resReserve) {
  //     const copy = resReserve.data;
  //     copy.map((item:any, index:any)=>{
  //       item.date = item.tourStartPeriod;
  //     })
  //     setEvents(copy);
  //   }
  // };

  useEffect(() => {
    fetchScheduleCoPosts();
  }, []);  


  // 달력 ---------------------------------------------------------------------------------------------
  const [checkContent, setCheckContent] = useState();
  const [which_Visit_Counsel, setWhich_Visit_Counsel] = useState(1);

  // 현재 월 데이터 가져오기
  const handleDatesSet = (dateInfo:any) => {
    const calendarApi = dateInfo.view.calendar;
    const startDate = calendarApi.getDate();
    const month = startDate.getMonth() + 1; 
    setCurrentMonth(month);
  };


  function renderEventContent(eventInfo:any) {
    const start = format(new Date(eventInfo.event.start), 'yyyy-MM-dd HH:mm:ss');  // ✅ 문자열 변환
    const end = format(new Date(eventInfo.event.end), 'yyyy-MM-dd HH:mm:ss');      // ✅ 문자열 변환
  
    return (
      <div
        onClick={()=>{
          if (currentTab === 4) {
            navigate(`/admin/reserve/reservedetail`, {state : eventInfo.event.extendedProps.serialNum});
          } else {
            if (currentTab === 2) {
              eventInfo.event.extendedProps.sort === '상담' ? setWhich_Visit_Counsel(1) : setWhich_Visit_Counsel(2);
            }
            setIsViewCheckModal(true);
            setCheckContent(eventInfo.event);
          }
        }}
        className='dayBox'
        style={{border: currentTab === 1 ? `1px solid ${eventInfo.event.extendedProps.fontColor}` : 'none'}}
      >
        {currentTab === 1 && <>
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
  const formattedDate = format(currentDate, 'yyyy-MM-dd h:mm:ss');
  const [selectDate, setSelectDate] = useState(formattedDate);
  const [selectStartDate, setSelectStartDate] = useState(formattedDate);
  const [selectEndDate, setSelectEndDate] = useState(formattedDate);
  const handleSelectDate = (e:any) => {
    setSelectDate(e.date);
    setSelectStartDate(e.date);
  }

  const handleSelect = (selectInfo:any) => {
    const start = format(selectInfo.start, 'yyyy-MM-dd HH:mm:ss');  
    const end = format(selectInfo.end, 'yyyy-MM-dd HH:mm:ss');      
    setSelectStartDate(start);
    setSelectEndDate(end);
  };
  

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
    const formattedDate = format(currentDate, 'yyyyMMdd');
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    for (let i = 0; i < 2; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const uniqueNum = `${sort}${formattedDate.substring(2)}${result}`;
    navigate('/admin/schedule/reservepage', {state : {serialNum: uniqueNum, modalSort:'new' } });
  };


  // 모달 ---------------------------------------------------------
  const [isViewCounselModal, setIsViewCounselModal] = useState<boolean>(false);
  // const [isViewReserveModal, setIsViewReserveModal] = useState<boolean>(false);
  const [isViewCheckModal, setIsViewCheckModal] = useState<boolean>(false);
  const [isViewScheduleModal, setIsViewScheduleModal] = useState<boolean>(false);
  
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
        <div className='rowbox' style={{justifyContent:'flex-start'}}>
          <SelectBox num={1} text='회사일정'/>
          <SelectBox num={2} text='New DB'/>
          <SelectBox num={3} text='방문스케줄'/>
          <SelectBox num={4} text='예약건'/>
          <SelectBox num={5} text='출발건'/>
        </div>

        <div className='rowbox' style={{justifyContent:'center'}}>
          <p className={calendarType === 'timeGridWeek' ? 'selected calendar-btn' : 'calendar-btn'}
            onClick={()=>{
              setCalendarType('timeGridWeek');
            }}
          >주</p>
          <p className={calendarType === 'dayGridMonth' ? 'selected calendar-btn' : 'calendar-btn'}
            onClick={()=>{
              setCalendarType('dayGridMonth');
            }}
          >월</p>
        </div>
        {
          currentTab === 1
          ?
          <div className='rowbox' style={{justifyContent:'flex-end'}}>
            <div 
              className="select-box" 
              style={{backgroundColor: '#3a9fe5', color: '#fff' }}
              onClick={()=>{setIsViewScheduleModal(true)}}
            >일정등록</div>
          </div>
          :
          <div className='rowbox' style={{justifyContent:'flex-end'}}>
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
            >방문등록</div>
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
        {
          calendarType === 'timeGridWeek' &&
          <FullCalendar
            locale= "ko"
            plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
            initialView='timeGridWeek'
            events={events}
            eventContent={renderEventContent}
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'timeGridWeek,timeGridDay'
            }}
            titleFormat={{
              year: 'numeric',
              month: 'long'
            }}
            selectable={true}
            dateClick={(e)=>{handleSelectDate(e)}}
            datesSet={handleDatesSet}
            editable={true}
            nowIndicator={true}
            select={handleSelect} 
            slotMinTime="09:00:00"
            slotMaxTime="24:00:00"
          />
        }
         {
          calendarType === 'dayGridMonth' &&
          <FullCalendar
            locale= "ko"
            plugins={[interactionPlugin, dayGridPlugin, timeGridPlugin]}
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
        }
       
        {/* 확인 모달창 */}
        { 
          isViewCheckModal &&
          <div className="modalcheck-cover">
            <div className="modalcheck-backcover"
              onClick={()=>{setIsViewCheckModal(false);}}
            ></div>
            { currentTab === 1 && 
              <ModalCheckCompanySchedule selectStartDate={selectStartDate} selectEndDate={selectEndDate} setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>
            }
            { currentTab === 2 && 
              ( which_Visit_Counsel === 2
                ? <ModalCheckVisit setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>
                : <ModalCheckEstimate setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>
              )
            }
            { currentTab === 3 && <ModalCheckCounsel setIsViewCheckModal={setIsViewCheckModal} checkContent={checkContent}/>}
          </div>
        }
      </div>

      {/* 방문등록 모달창 */}
      {
        isViewCounselModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
            {/* <ModalInputCounsel 
              selectDate={selectDate}
              setIsViewCounselModal={setIsViewCounselModal}
              refresh={refresh}
              setRefresh={setRefresh}
              // fetchCounselPosts={fetchCounselPosts}
             /> */}
          </div>
        </div>
      }

      {/* 예약등록 모달창 */}
      {/* {
        isViewReserveModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalReserve 
              // serialNum={serialNum}
              // setIsViewModal={setIsViewReserveModal}
              // refresh={refresh}
              // setRefresh={setRefresh}
              // modalSort={modalSort}
              // setModalSort={setModalSort}
              fetchReservePosts={fetchReservePosts}
             />
          </div>
        </div>
      } */}

      {/* 회사일정 등록 모달창 */}
      {
        isViewScheduleModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
            {/* <ModalInputCompanySchedule
              selectStartDate={selectStartDate} 
              selectEndDate={selectEndDate}
              setIsViewScheduleModal={setIsViewScheduleModal}
              refresh={refresh}
              setRefresh={setRefresh}
              fetchScheduleCoPosts={fetchScheduleCoPosts}
             /> */}
          </div>
        </div>
      } 

    </div>
  );
}

