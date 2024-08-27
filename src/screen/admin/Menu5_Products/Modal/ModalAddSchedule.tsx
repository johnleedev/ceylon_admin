import React, { useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DropDownAirline } from '../../../DefaultData';
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
  const [productType, setProductType] = useState(isAddOrRevise === 'revise' ? scheduleData.productType : '');
  const [tourPeriodNight, setTourPeriodNight] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriodNight : '');
  const [tourPeriodDay, setTourPeriodDay] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriodDay : '');
  const [departAirport, setDepartAirport] = useState(isAddOrRevise === 'revise' ? scheduleData.departAirport : '');
  const [departFlight, setDepartFlight] = useState(isAddOrRevise === 'revise' ? scheduleData.departFlight : '');
  const [selectedSchedule, setSelectedSchedule] = useState(isAddOrRevise === 'revise' ? scheduleData.selectedSchedule : '');
  const [cautionNote, setCautionNote] = useState(isAddOrRevise === 'revise' ? scheduleData.cautionNote : '');
  const [includeNote, setIncludeNote] = useState(isAddOrRevise === 'revise' ? scheduleData.includeNote : '');
  const [includeNoteText, setIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.includeNoteText : '');
  const [notIncludeNote, setNotIncludeNote] = useState(isAddOrRevise === 'revise' ? scheduleData.notIncludeNote : '');
  const [notIncludeNoteText, setNotIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.notIncludeNoteText : '');

  const [scheduleList, setScheduleList] = useState(
    isAddOrRevise === 'revise' 
    ? JSON.parse(scheduleData.scheduleList)
    : [
      { day : 1, breakfast :'', lunch:'', dinner :'', hotel:'', score:'', schedule: [{ text1:'', text2:'', text3:''}]}
      ]
  );

  // 데이 추가
  const handleDayAdd = async () => {
    const copy = [...scheduleList, { day : scheduleList.length+1, breakfast :'', lunch:'', dinner :'', hotel:'', score:'', schedule: [{ text1:'', text2:'', text3:''}]}];
    setScheduleList(copy);
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
    copy[Idx].schedule = [...copy[Idx].schedule, { text1:'', text2:'', text3:''  }]
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
      productType : productType,
      tourPeriodNight : tourPeriodNight,
      tourPeriodDay: tourPeriodDay,
      departAirport: departAirport,
      departFlight: departFlight,
      selectedSchedule: selectedSchedule,
      cautionNote: cautionNote,
      includeNote: includeNote,
      includeNoteText: includeNoteText,
      notIncludeNote: notIncludeNote,
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
      productType : productType,
      tourPeriodNight : tourPeriodNight,
      tourPeriodDay: tourPeriodDay,
      departAirport: departAirport,
      departFlight: departFlight,
      selectedSchedule: selectedSchedule,
      cautionNote: cautionNote,
      includeNote: includeNote,
      includeNoteText: includeNoteText,
      notIncludeNote: notIncludeNote,
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
              options={[
                { value: '선택', label: '선택' },
                { value: '1박', label: '1박' },
                { value: '2박', label: '2박' },
                { value: '3박', label: '3박' },
                { value: '4박', label: '4박' },
                { value: '5박', label: '5박' },
                { value: '6박', label: '6박' },
                { value: '7박', label: '7박' },
                { value: '8박', label: '8박' },
                { value: '9박', label: '9박' },
                { value: '10박', label: '10박' }
              ]}    
              handleChange={(e)=>{setTourPeriodNight(e.target.value)}}
            />
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={tourPeriodDay}
              options={[
                { value: '선택', label: '선택' },
                { value: '1일', label: '1일' },
                { value: '2일', label: '2일' },
                { value: '3일', label: '3일' },
                { value: '4일', label: '4일' },
                { value: '5일', label: '5일' },
                { value: '6일', label: '6일' },
                { value: '7일', label: '7일' },
                { value: '8일', label: '8일' },
                { value: '9일', label: '9일' },
                { value: '10일', label: '10일' }
              ]}    
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
                  <input style={{width:'15%'}} value={item.breakfast} className="inputdefault" type="text" 
                      onChange={(e) => {
                        const copy = [...scheduleList];
                        copy[index].breakfast = e.target.value;
                        setScheduleList(copy);
                      }}/>
                  <p>중식</p>
                  <input style={{width:'15%'}} value={item.lunch} className="inputdefault" type="text" 
                      onChange={(e) => {
                        const copy = [...scheduleList];
                        copy[index].lunch = e.target.value;
                        setScheduleList(copy);
                      }}/>
                  <p>석식</p>
                  <input style={{width:'15%'}} value={item.dinner} className="inputdefault" type="text" 
                      onChange={(e) => {
                        const copy = [...scheduleList];
                        copy[index].dinner = e.target.value;
                        setScheduleList(copy);
                      }}/>
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
                      { value: '★★★★★', label: '★★★★★' },
                      { value: '★★★★', label: '★★★★' },
                      { value: '★★★', label: '★★★' },
                      { value: '★★', label: '★★' },
                      { value: '★', label: '★' },
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
                          <input style={{width:'95%'}} value={subItem.text1} className="inputdefault" type="text" 
                              onChange={(e) => {
                                const copy = [...scheduleList];
                                copy[index].schedule[subIndex].text1 = e.target.value;
                                setScheduleList(copy);
                              }}/>
                        </div>
                        <div className='input-area'>
                          <div className="cover" key={subIndex}>
                            <div className='rowbox'>
                              <ImLocation color='#5fb7ef' size={20}/>                    
                              <input style={{width:'95%'}} value={subItem.text2} className="inputdefault" type="text" 
                                onChange={(e) => {
                                  const copy = [...scheduleList];
                                  copy[index].schedule[subIndex].text2 = e.target.value;
                                  setScheduleList(copy);
                                }}/>
                            </div>
                            <div className='rowbox'>
                              <textarea 
                                className="textarea"
                                value={subItem.text3}
                                onChange={(e)=>{
                                  const copy = [...scheduleList];
                                  copy[index].schedule[subIndex].text3 = e.target.value;
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