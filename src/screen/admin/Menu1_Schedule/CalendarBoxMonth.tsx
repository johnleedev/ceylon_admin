import React, { useState } from "react";
import "./CalendarBox.scss";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  parse,
  differenceInCalendarDays,
} from "date-fns";
import { FaAngleLeft, FaAnglesLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";
import ModalInputCounsel from "./Modal/ModalInputCounsel";
import ModalInputCompanySchedule from "./Modal/ModalInputCompanySchedule";
import { useNavigate } from "react-router-dom";


export default function CalendarBoxMonth (props:any) {
	
  let navigate = useNavigate();

  const calendarEvents = props.calendarEvents;
  const currentTab = props.currentTab;

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const startMonth = startOfMonth(currentMonth);
  const endMonth = endOfMonth(currentMonth);
  const startWeek = startOfWeek(startMonth);
  const endWeek = endOfWeek(endMonth);
  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  const getEventsForDay = (date: Date) => {
    return calendarEvents.flatMap((event: any) => {
      if (!event.scheduleStart || !event.scheduleEnd) {
        console.warn("⛔ 이벤트에 잘못된 날짜 값이 있음:", event);
        return []; // 잘못된 데이터는 건너뜀
      }
      const startDate = parse(event.scheduleStart, "yyyy-MM-dd HH:mm", new Date());
      const endDate = parse(event.scheduleEnd, "yyyy-MM-dd HH:mm", new Date());
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error("⛔ 잘못된 날짜 형식:", event.scheduleStart, event.scheduleEnd);
        return [];
      }
      // 이벤트가 걸쳐지는 모든 날짜 목록 가져오기
      const eventDates = eachDayOfInterval({ start: startDate, end: endDate });
      // 현재 날짜(date)가 이벤트 기간 내에 포함되는지 확인
      if (eventDates.some((d) => isSameDay(d, date))) {
        const duration = differenceInCalendarDays(endDate, startDate) + 1;
        const isMultiDay = duration > 1;
        return {
          ...event,
          eventClass: isMultiDay ? "multi-day" : "single-day",
          displayTime: isSameDay(date, startDate) ? format(startDate, "HH:mm") : ""
        };
      }
      return [];
    });
  };
  
  // 모달 ---------------------------------------------------------
  const [isViewScheduleModal, setIsViewScheduleModal] = useState<boolean>(false);
  const [isViewCounselModal, setIsViewCounselModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState();
    
  return (
    <div className="calendar-container-month">

      {/* // 헤더 */}
      <div className="calendar-header">
        <div className="calendar-header-box">
          <div className="calendar-header-btn"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 12))}
          ><FaAnglesLeft /></div>
          <div className="calendar-header-btn"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          ><FaAngleLeft /></div>
          <p className="calendar-header-btn"
            onClick={() => {
              setCurrentMonth(today);
              setSelectedDate(today);
            }}
          >today</p>
        </div>
        <h2>{format(currentMonth, "yyyy년 MM월")}</h2>
        <div className="calendar-header-box">
          <div className="calendar-header-btn"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          ><FaAngleRight /></div>
          <div className="calendar-header-btn"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 12))}
          ><FaAnglesRight /></div>
        </div>
      </div>

      {/* // 요일 */}
      <div className="calendar-weekdays">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="calendar-weekday">{day}</div>
        ))}
      </div>

      {/* // 달력 */}
      <div className="calendar-grid">
      {
        days.map((day, index) => {

          const dayEvents = getEventsForDay(day);

          return (
            <div key={index}
              className={`calendar-day ${isSameDay(day, selectedDate) ? "selected-day" : ""}`}
              onClick={() => {
                props.setSelectDate(format(day, 'yyyy-MM-dd 12:00'));
                setSelectedDate(day);
              }}
            >
              <div className="date-number">{format(day, "d")}</div>
              {
                dayEvents.map((event: any) => (
                  <div
                    key={event.id}
                    className="eventbox"
                    style={{ 
                      backgroundColor: event.eventClass === "single-day" ? "#fff" : event.fontColor,
                      color : event.eventClass === "single-day" ? event.fontColor : "#fff"
                    }}
                    title={event.scheduleTitle}
                    data-time={event.displayTime}
                  >
                    {
                      event.eventClass === "single-day" &&
                      <div className="titlebox" style={{backgroundColor:event.fontColor}}></div>
                    }
                    <p onClick={()=>{
                        setModalData(event);
                        if (currentTab === '회사일정') { setIsViewScheduleModal(true); }
                        if (currentTab === '방문스케줄') { setIsViewCounselModal(true); } 
                        if (currentTab === '예약건') { navigate('/admin/reserve/reservedetail', {state : event.serialNum});} 
                      }}
                    >{event.eventClass === "single-day" ? `${event.displayTime} ${event.scheduleTitle}` : event.scheduleTitle}</p>
                  </div>
                ))
              }
            </div>
          );
        })
      }
    </div>

    {/* 방문일정 수정 모달창 */}
    {
      isViewCounselModal &&
      <div className='Modal'>
        <div className='modal-backcover'></div>
        <div className='modal-maincover'>
          <ModalInputCounsel
            isAddOrRevise="revise"
            modalData={modalData}
            setIsViewCounselModal={setIsViewCounselModal}
            selectDate={format(selectedDate, 'yyyy-MM-dd HH:mm')}
            fetchCounselPosts={props.fetchCounselPosts}
          />
        </div>
      </div>
    }

    {/* 회사일정 수정 모달창 */}
    {
      isViewScheduleModal &&
      <div className='Modal'>
        <div className='modal-backcover'></div>
        <div className='modal-maincover'>
          <ModalInputCompanySchedule
            isAddOrRevise="revise"
            modalData={modalData}
            setIsViewScheduleModal={setIsViewScheduleModal}
            fetchScheduleCoPosts={props.fetchScheduleCoPosts}
          />
        </div>
      </div>
    } 

    </div>
  );
}
