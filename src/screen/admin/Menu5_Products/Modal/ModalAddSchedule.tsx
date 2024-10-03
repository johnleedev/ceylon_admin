import React, { useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DropDownAirline, DropDownTourPeriodNightType, DropDownTourPeriodDayType } from '../../../DefaultData';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { ImLocation } from 'react-icons/im';
import { formatDate } from 'date-fns';


export default function ModalAddSchedule (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const scheduleData = isAddOrRevise === 'revise' ? props.scheduleInfo : null;

  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? scheduleData.isView : true);
  const [tourLocation, setTourLocation] = useState(isAddOrRevise === 'revise' ? scheduleData.tourLocation : '');
  const [landCompany, setLandCompany] = useState(isAddOrRevise === 'revise' ? scheduleData.landCompany : '');
  const [productType, setProductType] = useState(isAddOrRevise === 'revise' ? scheduleData.productType : '');
  const [tourPeriodNight, setTourPeriodNight] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriodNight : '');
  const [tourPeriodDay, setTourPeriodDay] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriodDay : '');
  const [departAirport, setDepartAirport] = useState(isAddOrRevise === 'revise' ? scheduleData.departAirport : '');
  const [departFlight, setDepartFlight] = useState(isAddOrRevise === 'revise' ? scheduleData.departFlight : '');
  const [selectedSchedule, setSelectedSchedule] = useState(isAddOrRevise === 'revise' ? scheduleData.selectedSchedule : '');
  const [cautionNote, setCautionNote] = useState(isAddOrRevise === 'revise' ? scheduleData.cautionNote : '');
  const [includeNote, setIncludeNote] = useState(isAddOrRevise === 'revise' ? JSON.parse(scheduleData.includeNote) : '');
  const [includeNoteText, setIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.includeNoteText : '');
  const [notIncludeNote, setNotIncludeNote] = useState(isAddOrRevise === 'revise' ? JSON.parse(scheduleData.notIncludeNote) : '');
  const [notIncludeNoteText, setNotIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.notIncludeNoteText : '');

  const [scheduleList, setScheduleList] = useState(
    isAddOrRevise === 'revise' 
    ? JSON.parse(scheduleData.scheduleList)
    : [
      { day : '1', breakfast :'', lunch:'', dinner :'', hotel:'', score:'', schedule: [{ location:'', title:'', notice:''}]}
      ]
  );

  // 데이 추가
  const handleDayAdd = async () => {
    const lastItem = scheduleList[scheduleList.length - 1]; 
    const newDay = parseInt(lastItem.day) + 1;
    const newItem = {
      day: newDay.toString(),
      breakfast: lastItem.breakfast,
      lunch: lastItem.lunch,
      dinner: lastItem.dinner,
      hotel: lastItem.hotel,
      score: lastItem.score,
      schedule: [{ location:'', title:'', notice:''}]
    };
    setScheduleList([...scheduleList, newItem]);
  };

  // 데이 삭제
  const handleDayDelete = async () => {
    const copy = [...scheduleList];
    copy.pop();
    setScheduleList(copy);
  };

  // 스케줄 추가
  const handleScheduleAdd = async (Idx:any) => {
    const copy = [...scheduleList];
    copy[Idx].schedule = [...copy[Idx].schedule, { location:'', title:'', notice:''  }]
    setScheduleList(copy);
  };

  // 스케줄 삭제
  const handleScheduleDelete = async (Idx:any) => {
    const copy = [...scheduleList];
    const copy2 = [...copy[Idx].schedule];
    copy2.pop(); // copy2 배열에서 마지막 요소를 삭제
    copy[Idx].schedule = copy2;
    setScheduleList(copy);
  };

  // selectbox ----------------------------------------------
  interface SelectBoxProps {
    text : string;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={productType === text}
          onChange={()=>{
            setProductType(text);
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

  interface SelectBoxIncludeNotInclueProps {
    text : string;
    useState: any;
    setUseSate: any;
  }

  const SelectBoxIncludeNotInclue : React.FC<SelectBoxIncludeNotInclueProps> = ({ text, useState, setUseSate }) => (
    <div className='etcCheckInput'>
      <input className="input" type="checkbox"
        checked={useState.includes(text)}
        onChange={()=>{
          const copy = [...useState];
          if (useState.includes(text)) {
            const result = copy.filter(e => e !== text);
            setUseSate(result);
          } else {
            copy.push(text); 
            setUseSate(copy);
          }
        }}
      />
      <p>{text}</p>
    </div>
  )
   
  // 일정 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    const getParams = {
      isView : isView,
      tourLocation: tourLocation,
      landCompany: landCompany,
      productType : productType,
      tourPeriodNight : tourPeriodNight,
      tourPeriodDay : tourPeriodDay,
      departAirport: departAirport,
      departFlight: departFlight,
      selectedSchedule: selectedSchedule,
      cautionNote: cautionNote,
      includeNote: JSON.stringify(includeNote),
      includeNoteText: includeNoteText,
      notIncludeNote: JSON.stringify(notIncludeNote),
      notIncludeNoteText: notIncludeNoteText,
      scheduleList: JSON.stringify(scheduleList)
    }
    axios 
      .post(`${MainURL}/productschedule/registerschedule`, getParams)
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddScheduleModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 일정 수정 함수 ----------------------------------------------
  const reviseSchedule = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const getParams = {
      postId : scheduleData.id,
      isView : isView,
      tourLocation: tourLocation,
      landCompany: landCompany,
      productType : productType,
      tourPeriodNight : tourPeriodNight,
      tourPeriodDay : tourPeriodDay,
      departAirport: departAirport,
      departFlight: departFlight,
      selectedSchedule: selectedSchedule,
      cautionNote: cautionNote,
      includeNote: JSON.stringify(includeNote),
      includeNoteText: includeNoteText,
      notIncludeNote: JSON.stringify(notIncludeNote),
      notIncludeNoteText: notIncludeNoteText,
      scheduleList: JSON.stringify(scheduleList),
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/productschedule/reviseschedule`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddScheduleModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const datmealOptions = [
    { value: '선택', label: '선택' },
    { value: '기내식', label: '기내식' },
    { value: '선택식', label: '선택식' },
    { value: '외부식', label: '외부식' },
    { value: '리조트', label: '리조트' },
    { value: '자유식', label: '자유식' },
    { value: '현지식', label: '현지식' },
    { value: '포함', label: '포함' },
    { value: '불포함', label: '불포함' }
  ]

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddScheduleModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>일정관리</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='노출여부'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView}
                  onChange={()=>{setIsView(true)}}
                />
              </div>
              <p>노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={!isView}
                  onChange={()=>{setIsView(false)}}
                />
              </div>
              <p>미노출</p>
            </div>
          </div>
        </div>
       
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행지'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={tourLocation} onChange={(e)=>{setTourLocation(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드사'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={landCompany} onChange={(e)=>{setLandCompany(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품타입'/>
            <div className='checkInputCover'>
              <SelectBox text='선투숙+풀빌라'/>
              <SelectBox text='경유지+선투숙+풀빌라'/>
              <SelectBox text='같은리조트+풀빌라'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={tourPeriodNight}
              options={DropDownTourPeriodNightType}    
              handleChange={(e)=>{setTourPeriodNight(e.target.value)}}
            />
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={tourPeriodDay}
              options={DropDownTourPeriodDayType}    
              handleChange={(e)=>{setTourPeriodDay(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='적용항공편'/>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={departAirport}
              options={[
                { value: '출발공항', label: '출발공항' },
                { value: '인천', label: '인천' },
                { value: '부산', label: '부산' },
                { value: '대구', label: '대구' }
              ]}    
              handleChange={(e)=>{setDepartAirport(e.target.value)}}
            />
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={departFlight}
              options={DropDownAirline}    
              handleChange={(e)=>{setDepartFlight(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='일정검색'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              placeholder='등록된 일정 가져오기'
              value={selectedSchedule} onChange={(e)=>{setSelectedSchedule(e.target.value)}}/>
          </div>
        </div>
      </section>
        
      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='주의사항' height={200}/>
            <textarea 
              className="textarea"
              value={cautionNote}
              onChange={(e)=>{setCautionNote(e.target.value)}}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
 
          <div className="coverrow hole">
            <TitleBox width="100px" text='포함사항' height={120}/>
            <div style={{width:'50%'}}>
              <SelectBoxIncludeNotInclue text='왕복항공료' useState={includeNote} setUseSate={setIncludeNote}/>
              <SelectBoxIncludeNotInclue text='국내 및 현지 공항세' useState={includeNote} setUseSate={setIncludeNote}/>
              <SelectBoxIncludeNotInclue text='현지 숙박 호텔료, 관광지 입장료, 일정표상 식사' useState={includeNote} setUseSate={setIncludeNote}/>
              <SelectBoxIncludeNotInclue text='여행자보험(해외1억원/국내5천원)' useState={includeNote} setUseSate={setIncludeNote}/>
            </div>
            <textarea 
              style={{minHeight:'100px'}}
              className="textarea"
              value={includeNoteText}
              onChange={(e)=>{setIncludeNoteText(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="100px" text='불포함사항' height={120}/>
            <div style={{width:'50%'}}>
              <SelectBoxIncludeNotInclue text='유류할증료' useState={notIncludeNote} setUseSate={setNotIncludeNote}/>
              <SelectBoxIncludeNotInclue text='가이드, 기사분 팁' useState={notIncludeNote} setUseSate={setNotIncludeNote}/>
              <SelectBoxIncludeNotInclue text='선택관광비용, 에티켓, 개인경비' useState={notIncludeNote} setUseSate={setNotIncludeNote}/>
            </div>
            <textarea 
              style={{minHeight:'100px'}}
              className="textarea"
              value={notIncludeNoteText}
              onChange={(e)=>{setNotIncludeNoteText(e.target.value)}}
            />
          </div>
        </div>
      </section>

      <section>
      {
        scheduleList.map((item:any, index:any)=>{
          return (
            <div className="schedule" key={index}>
              <div className="top-row">
                <div className="daytitle">
                  <h1>{item.day} DAY</h1>
                </div>
                <div className="daymeal">
                  <p>조식</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.breakfast}
                    options={datmealOptions}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].breakfast = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <p>중식</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.lunch}
                    options={datmealOptions}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].lunch = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <p>석식</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.dinner}
                    options={datmealOptions}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].dinner = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <p>호텔</p>
                  <input style={{width:'15%'}} value={item.hotel} className="inputdefault" type="text" 
                      onChange={(e) => {
                        const copy = [...scheduleList];
                        copy[index].hotel = e.target.value;
                        setScheduleList(copy);
                      }}/>
                  <DropdownBox
                    widthmain='10%'
                    height='35px'
                    selectedValue={item.score}
                    options={[
                      { value: '선택', label: '선택' },
                      { value: '5', label: '5' },
                      { value: '4', label: '4' },
                      { value: '3', label: '3' },
                      { value: '2', label: '2' },
                      { value: '1', label: '1' },
                    ]}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].score = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                </div>
              </div>

              <div className="bottom-content">
                {
                  item.schedule.map((subItem:any, subIndex:any)=>{ 
                    return (
                      <div className='day-area'>
                        <div className='left-area'>
                          <ImLocation color='#5fb7ef' size={20}/>                    
                          <input style={{width:'95%'}} value={subItem.location} className="inputdefault" type="text" 
                              onChange={(e) => {
                                const copy = [...scheduleList];
                                copy[index].schedule[subIndex].location = e.target.value;
                                setScheduleList(copy);
                              }}/>
                        </div>
                        <div className='input-area'>
                          <div className="cover" key={subIndex}>
                            <div className='rowbox'>
                              <input style={{width:'95%'}} value={subItem.title} className="inputdefault" type="text" 
                                onChange={(e) => {
                                  const copy = [...scheduleList];
                                  copy[index].schedule[subIndex].title = e.target.value;
                                  setScheduleList(copy);
                                }}/>
                            </div>
                            <div className='rowbox'>
                              <textarea 
                                className="textarea" style={{minHeight:'120px'}}
                                value={subItem.notice}
                                onChange={(e)=>{
                                  const copy = [...scheduleList];
                                  copy[index].schedule[subIndex].notice = e.target.value;
                                  setScheduleList(copy);
                                }}
                              />
                            </div>
                          </div>
                          <div className="btnrow">
                            <div className="btn" style={{backgroundColor:"#EAEAEA"}}
                              onClick={()=>{handleScheduleAdd(index)}}>
                              <p><CiCirclePlus />일정추가</p>
                            </div>
                            <div className="btn" style={{backgroundColor:"#fff"}}
                              onClick={()=>{handleScheduleDelete(index)}}>
                              <p><CiCircleMinus/>일정삭제</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
              <div style={{width:'100%', height:'1px', backgroundColor:'#BDBDBD'}}></div>
            </div>      
          )
        })
      }
            
      </section>

      <section>
        <div className="daybtnrow">
          <div className="daybtn" style={{width:'70%', backgroundColor:"#EAEAEA"}}
              onClick={handleDayAdd}>
            <CiCirclePlus /><p>DAY추가</p>
          </div>
          <div className="daybtn" style={{width:'25%', backgroundColor:"#fff"}}
            onClick={handleDayDelete}>
            <CiCircleMinus /><p>DAY삭제</p>
          </div>
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddScheduleModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={()=>{
              isAddOrRevise === 'add' 
              ? registerPost()
              : reviseSchedule();
            }}
          >
          <p>저장</p>
        </div>
      </div>
      
    </div>     
  )
}
