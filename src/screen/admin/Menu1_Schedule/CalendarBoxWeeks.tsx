import React, { useState } from "react";
import "./CalendarBox.scss";
import {
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameDay,
  parse,
  differenceInCalendarDays,
  setHours,
  setMinutes,
  setSeconds,
  isWithinInterval,
} from "date-fns";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import ModalInputCounsel from "./Modal/ModalInputCounsel";
import ModalInputCompanySchedule from "./Modal/ModalInputCompanySchedule";
import { useNavigate } from "react-router-dom";

export default function CalendarBoxWeeks (props:any) {
  
  let navigate = useNavigate();

  const calendarEvents = props.calendarEvents;
  const currentTab = props.currentTab;

  const today = new Date();
  const [currentWeek, setCurrentWeek] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedHour, setSelectedHour] = useState<any>();

  const startWeek = startOfWeek(currentWeek);
  const endWeek = endOfWeek(currentWeek);
  const days = eachDayOfInterval({ start: startWeek, end: endWeek });
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const allDayEvents = calendarEvents.filter((event:any) => {
    if (!event.scheduleStart || !event.scheduleEnd) return false;
    const startDate = parse(event.scheduleStart, "yyyy-MM-dd HH:mm", new Date());
    const endDate = parse(event.scheduleEnd, "yyyy-MM-dd HH:mm", new Date());
    
    // 종일 일정은 2일 이상 지속되는 이벤트만 포함
    return differenceInCalendarDays(endDate, startDate) >= 1;
  });
  
  const filteredAllDayEvents = days.map(day => {
    return allDayEvents.filter((event:any) => {
      const startDate = parse(event.scheduleStart, "yyyy-MM-dd HH:mm", new Date());
      const endDate = parse(event.scheduleEnd, "yyyy-MM-dd HH:mm", new Date());
  
      // 시작일, 종료일 포함 + 해당 날짜가 이벤트 기간 내에 있는지 체크
      return (
        isSameDay(day, startDate) || 
        isSameDay(day, endDate) || 
        isWithinInterval(day, { start: startDate, end: endDate })
      );
    });
  });
  
  const getEventsForTimeSlot = (date: any, hour: any) => {
    return calendarEvents.filter((event:any) => {
      if (!event.scheduleStart || !event.scheduleEnd) return false;
      const startDate = parse(event.scheduleStart, "yyyy-MM-dd HH:mm", new Date());
      const endDate = parse(event.scheduleEnd, "yyyy-MM-dd HH:mm", new Date());
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return false;
  
      // 하루 미만 일정만 시간 스케줄에 포함
      if (differenceInCalendarDays(endDate, startDate) >= 1) return false;
  
      const slotStart = setHours(setMinutes(setSeconds(date, 0), 0), hour);
      return isWithinInterval(slotStart, { start: startDate, end: endDate });
    });
  };
  
  // 모달 ---------------------------------------------------------
  const [isViewScheduleModal, setIsViewScheduleModal] = useState<boolean>(false);
  const [isViewCounselModal, setIsViewCounselModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState();


  return (
    <div className="calendar-container-weeks">
      
      <div className="calendar-header">
        <div className="calendar-header-box">
          <div className="calendar-header-btn" onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}>
            <FaAngleLeft />
          </div>
          <p className="calendar-header-btn" onClick={() => setCurrentWeek(today)}>today</p>
        </div>
        <h2>{`${format(startWeek, "yyyy년 MM월 dd일")} ~ ${format(endWeek, "yyyy년 MM월 dd일")}`}</h2>
        <div className="calendar-header-box">
          <div className="calendar-header-btn" onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
            <FaAngleRight />
          </div>
        </div>
      </div>
      
      {/* // 요일 */}
      <div className="week-days-grid">
        <div className="time-area">
        </div>
        {days.map((day, index) => (
          <div key={index} className="day-header">{format(day, "EEE dd")}</div>
        ))}
      </div>
      
      {/* 종일 일정 */}
      <div className="all-day-events-grid">
        <div className="time-area">
          <h3>종일 일정</h3>
        </div>
        {
          days.map((day, index) => (
            <div key={index} className="all-day-column">
              {filteredAllDayEvents[index].map((event:any) => (
                <div key={event.id} className="all-day-event" style={{ backgroundColor: event.fontColor, color: "#fff" }}>
                  <p onClick={()=>{
                      setModalData(event);
                      if (currentTab === '회사일정') { setIsViewScheduleModal(true); }
                      if (currentTab === '방문스케줄') { setIsViewCounselModal(true); } 
                    }}
                  >{event.notice || event.scheduleTitle}</p>
                </div>
              ))}
            </div>
          )) 
        }
      </div>

      <div className="calendar-grid">
        <div className="time-column">
          {hours.map((hour) => (
            <div key={hour} className="time-slot">{`${hour}:00`}</div>
          ))}
        </div>
        {days.map((day, index) => (
          <div key={index} className="calendar-day-column">
            {hours.map((hour:any) => (
              <div key={hour} className={`time-slot ${(format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') && selectedHour === hour) ? "selected-day-hour" : ""}`}
                onClick={() => {
                   props.setSelectDate(format(day, `yyyy-MM-dd ${hour < 10 ? `0${hour}` : hour}:00`));
                  setSelectedDate(day);
                  setSelectedHour(hour);
                }}
              >
                {(() => {
                  const events = getEventsForTimeSlot(day, hour); // 해당 시간대의 모든 이벤트 가져오기
                  return events.map((event:any) => {
                    const eventStartHour = parse(event.scheduleStart, "yyyy-MM-dd HH:mm", new Date()).getHours(); // 이벤트 시작 시간

                    return (
                      <div
                        key={event.id}
                        className="eventbox"
                        style={{ backgroundColor: event.fontColor, color: "#fff", position: "relative" }}
                      >
                        {hour === eventStartHour && ( // 이벤트 시작 시간과 현재 hour가 같을 때만 텍스트 표시
                          <p onClick={()=>{
                            setModalData(event);
                            if (currentTab === '회사일정') { setIsViewScheduleModal(true); }
                            if (currentTab === '방문스케줄') { setIsViewCounselModal(true); } 
                            if (currentTab === '예약건') { navigate('/admin/reserve/reservedetail', {state : event.serialNum});} 
                          }}
                          >{`${format(parse(event.scheduleStart, "yyyy-MM-dd HH:mm", new Date()), "HH:mm")} - ${event.scheduleTitle}`}</p>
                        )}
                      </div>
                    );
                  });
                })()}
              </div>
            ))}
          </div>
        ))}
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
