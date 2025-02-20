import React, { useEffect, useRef, useState } from 'react';
import './MainSchedule.scss'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import ModalCheckCounsel from './Modal/zzModalCheckCounsel';
import ModalInputCounsel from './Modal/ModalInputCounsel';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import ModalCheckVisit from './Modal/zzModalCheckVisit';
import ModalInputCompanySchedule from './Modal/ModalInputCompanySchedule';
import ModalCheckCompanySchedule from './Modal/zzModalCheckCompanySchedule';
import { useNavigate } from 'react-router-dom';
import ModalCheckEstimate from './Modal/zzModalCheckEsimate';
import { useRecoilValue } from 'recoil';
import { recoilExchangeRate } from '../../../RecoilStore';
import { isValid, format } from 'date-fns';
import CalendarBoxMonth from './CalendarBoxMonth';
import CalendarBoxWeeks from './CalendarBoxWeeks';


interface EventsProps {
  date: string;
  start: string;
  end: string;
  title: string;
  fontColor: string;
}

export default function MainSchdulePage() {

  let navigate = useNavigate();
  const recoilExchangeRateCopy = useRecoilValue(recoilExchangeRate);

  const [calendarType, setCalendarType] = useState('month');
  const [currentTab, setCurrentTab] = useState('회사일정');
  const [refresh, setRefresh] = useState<boolean>(false);
  const [sort, setSort] = useState('H');
  const [calendarEvents, setCalendarEvents] = useState<EventsProps[]>([]);
  const [currentMonth, setCurrentMonth] = useState('');


  const SelectBox: React.FC<{text: string}> = ({ text }) => (
    <div 
      className="select-box" 
      style={{backgroundColor: currentTab === text ? '#242d3f' : '#fff', 
              color: currentTab === text ? '#fff' : '#242d3f' }}
      onClick={()=>{
        setCalendarEvents([]);
        setCurrentTab(text);
        if (text === '회사일정') {fetchScheduleCoPosts();}
        if (text === 'NewDB') {fetchOnlinePosts();}
        if (text === '방문스케줄') {fetchCounselPosts();}
        if (text === '예약건') {fetchReservePosts();}
        // if (num === 5) {fetchReserveDepartPosts();}
      }}
    >{text}</div>
  )

  // 게시글 가져오기 ------------------------------------------------------

  const fetchScheduleCoPosts = async () => {
    const resScheduleCo = await axios.get(`${MainURL}/adminschedule/getschedulecompany`);
    if (resScheduleCo) {
      setCalendarEvents(resScheduleCo.data);
    }
  };
  const fetchOnlinePosts = async () => {
    const resOnline = await axios.get(`${MainURL}/adminschedule/getonlinelist`);
    if (resOnline.data) {
      setCalendarEvents(resOnline.data);
    }
  };
  const fetchCounselPosts = async () => {
    const resCounsel = await axios.get(`${MainURL}/adminschedule/getcounsellist`)
    if (resCounsel) {
      setCalendarEvents(resCounsel.data);
    }
  };
  const fetchReservePosts = async () => {
    const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
    if (resReserve) {
      const copy = [...resReserve.data];
      setCalendarEvents(copy);
    }
  };
  // const fetchReserveDepartPosts = async () => {
  //   const resReserve = await axios.get(`${MainURL}/adminreserve/getreserve`)
  //   if (resReserve) {
  //     const copy = resReserve.data;
  //     copy.map((item:any, index:any)=>{
  //       item.date = item.tourStartPeriod;
  //     })
  //     setCalendarEvents(copy);
  //   }
  // };

  useEffect(() => {
    fetchScheduleCoPosts();
  }, []);  

 

  // 날짜 선택 --------------------------------------------------------------
  const currentDate = new Date();
  const formattedDate = format(currentDate, 'yyyy-MM-dd h:mm:ss');
  const [selectDate, setSelectDate] = useState(formattedDate);
  const [selectStartDate, setSelectStartDate] = useState(formattedDate);
  const [selectEndDate, setSelectEndDate] = useState(formattedDate);

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
  const [isViewScheduleModal, setIsViewScheduleModal] = useState<boolean>(false);
  const [isViewCounselModal, setIsViewCounselModal] = useState<boolean>(false);

  
  return (
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
          <SelectBox text='회사일정'/>
          <SelectBox text='NewDB'/>
          <SelectBox text='방문스케줄'/>
          <SelectBox text='예약건'/>
          {/* <SelectBox num={5} text='출발건'/> */}
        </div>

        <div className='rowbox' style={{justifyContent:'center'}}>
          <p className={calendarType === 'month' ? 'selected calendar-btn' : 'calendar-btn'}
            onClick={()=>{
              setCalendarType('month');
            }}
          >주</p>
          <p className={calendarType === 'weeks' ? 'selected calendar-btn' : 'calendar-btn'}
            onClick={()=>{
              setCalendarType('weeks');
            }}
          >월</p>
        </div>
        {
          currentTab === '회사일정'
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
      {
        calendarType === 'month' &&
        <CalendarBoxMonth 
          calendarEvents={calendarEvents} currentTab={currentTab} fetchCounselPosts={fetchCounselPosts} fetchScheduleCoPosts={fetchScheduleCoPosts}/>
      }
      {
        calendarType === 'weeks' &&
        <CalendarBoxWeeks 
          calendarEvents={calendarEvents} currentTab={currentTab} fetchCounselPosts={fetchCounselPosts} fetchScheduleCoPosts={fetchScheduleCoPosts}/>
      }
      

      {/* 방문일정등록 모달창 */}
      {
        isViewCounselModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
            <ModalInputCounsel 
              isAddOrRevise="new"
              selectDate={selectDate}
              setIsViewCounselModal={setIsViewCounselModal}
              refresh={refresh}
              setRefresh={setRefresh}
              fetchCounselPosts={fetchCounselPosts}
             />
          </div>
        </div>
      }


      {/* 회사일정 등록 모달창 */}
      {
        isViewScheduleModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
            <ModalInputCompanySchedule
              selectStartDate={selectStartDate} 
              selectEndDate={selectEndDate}
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

