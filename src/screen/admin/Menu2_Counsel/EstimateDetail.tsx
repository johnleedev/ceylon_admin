import React, { useEffect, useRef, useState } from 'react'
import './EstimateDetail.scss'
import { TitleBox } from '../../../boxs/TitleBox';
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { useNavigate, useLocation } from 'react-router-dom';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDownNum, DropDownTourLocation, DropDownVisitPath } from '../../DefaultData';
import { ImLocation } from "react-icons/im";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

export default function EstimateDetail (props : any) {

  let navigate = useNavigate();
  

  // 오른쪽바 데이터 입력 ------------------------------------------------------------------------------------------------------
  const [testDate, setTestDate] = useState('');


  const [scheduleList, setScheduleList] = useState([
    { day : 1, breakfast :'', lunch:'', dinner :'', hotel:'', schedule: [{ text1:'', text2:'', text3:''}]}
  ]);

  // 데이 추가
  const handleDayAdd = async () => {
    const copy = [...scheduleList, { day : scheduleList.length+1, breakfast :'', lunch:'', dinner :'', hotel:'', schedule: [{ text1:'', text2:'', text3:''}]}];
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

  return (
    <div className='estimatedetail'>
      
      <div className='title-box'>
        <h1>견적서</h1>
      </div>

      <div className="estimatecover">
        
        {/* 왼쪽 데이터 입력 ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className='left-cover'>

          <div style={{width:'100%', height:'1px', backgroundColor:'#6d6d6d'}}></div>
          <section>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='유입경로'/>
                <DropdownBox
                  widthmain='50%' height='35px' selectedValue={''}
                  options={DropDownVisitPath}    
                  handleChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='이름'/>
                <input style={{width:'60%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='여행인원'/>
                <DropdownBox
                  widthmain='50%' height='35px' selectedValue={''}
                  options={DropDownNum}    
                  handleChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='연락처'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행상품'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행지'/>
                <DropdownBox
                  widthmain='50%' height='35px' selectedValue={''}
                  options={DropDownTourLocation}    
                  handleChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행기간'/>
                <div style={{paddingLeft:'5px', display:'flex', alignItems:'center'}}>
                  <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setTestDate} date={testDate}  marginLeft={1}/>
                  <p>~</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setTestDate} date={testDate}  marginLeft={1}/>
                </div>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='1인요금' height={160}/>
                <div style={{flex:1}}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>성인</h3>
                    <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {}}/>
                    <p style={{marginRight:'10px'}}>원</p>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={''}
                      options={DropDownNum}    
                      handleChange={(e)=>{}}
                    />
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>소아</h3>
                    <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {}}/>
                    <p style={{marginRight:'10px'}}>원</p>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={''}
                      options={DropDownNum}    
                      handleChange={(e)=>{}}
                    />
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>유아</h3>
                    <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {}}/>
                    <p style={{marginRight:'10px'}}>원</p>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={''}
                      options={DropDownNum}    
                      handleChange={(e)=>{}}
                    />
                    <p>명</p>
                  </div>
                </div>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='전체요금' height={160}/>
                <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={''} className="inputdefault" type="text" 
                    onChange={(e) => {}}/>
                <p>원</p>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='요청사항답변' height={120}/>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='계약자혜택' height={120}/>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='견적유효기간'/>
                <div style={{paddingLeft:'5px', display:'flex', alignItems:'center'}}>
                  <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setTestDate} date={testDate}  marginLeft={1}/>
                  <p>까지</p>
                </div>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='주의사항' height={120}/>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
          </section>

          <div className='btn-box'>
            <div className="btn" 
              onClick={()=>{
                
              }}
            >
              <p>저장</p>
            </div>
          </div>

          <div style={{width:'100%', height:'1px', backgroundColor:'#6d6d6d'}}></div>

          <section>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='리조트보기'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='문의일정표'/>
                <input style={{width:'50%', marginLeft:'5px'}}  value={''} className="inputdefault" type="text" 
                      onChange={(e) => {''}}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole" >
                <div style={{padding:'10px'}}>
                  <p>KE 인천 오후출발/직항 4박6일 (2024.06.30~2024.07.05)</p>
                </div>
              </div>
            </div>

          </section>

          <div style={{width:'100%', height:'1px', backgroundColor:'#6d6d6d'}}></div>
          <section>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='포함사항' height={120}/>
                <div style={{width:'50%'}}>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>왕복항공료</p>
                  </div>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>국내 및 현지 공항세</p>
                  </div>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>현지 숙박 호텔료, 관광지 입장료, 일정표상 식사</p>
                  </div>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>왕복항공료</p>
                  </div>
                </div>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole bigHeight">
                <TitleBox width="100px" text='불포함사항' height={120}/>
                <div style={{width:'50%'}}>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>유류할증료</p>
                  </div>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>가이드, 기사분 팁</p>
                  </div>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={true}
                      onChange={()=>{}}
                    />
                    <p>선택관광비용, 에티켓, 개인경비</p>
                  </div>
                </div>
                <textarea 
                  className="textarea"
                  value={''}
                  onChange={(e)=>{}}
                />
              </div>
            </div>
          </section>

          <div style={{width:'100%', height:'1px', backgroundColor:'#6d6d6d'}}></div>
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
                            onChange={(e) => {}}/>
                        <p>중식</p>
                        <input style={{width:'15%'}} value={item.lunch} className="inputdefault" type="text" 
                            onChange={(e) => {}}/>
                        <p>석식</p>
                        <input style={{width:'15%'}} value={item.dinner} className="inputdefault" type="text" 
                            onChange={(e) => {}}/>
                        <p>호텔</p>
                        <input style={{width:'15%'}} value={''} className="inputdefault" type="text" 
                            onChange={(e) => {}}/>
                      </div>
                    </div>
                    <div className="bottom-content">
                      <div className='left-area'>
                      </div>
                      <div className='input-area'>
                        {
                          item.schedule.map((subItem:any, subIndex:any)=>{ 
                            return (
                              <div className="cover" key={subIndex}>
                                <div className='rowbox'>
                                  <ImLocation color='#5fb7ef' size={20}/>                    
                                  <input style={{width:'70%'}} value={subItem.text1} className="inputdefault" type="text" 
                                    onChange={(e) => {}}/>
                                  <input style={{width:'30%'}} value={subItem.text2} className="inputdefault" type="text" 
                                    onChange={(e) => {}}/>
                                </div>
                                <div className='rowbox'>
                                  <textarea 
                                    className="textarea"
                                    value={subItem.text3}
                                    onChange={(e)=>{}}
                                  />
                                </div>
                              </div>
                            )
                          })
                        }
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
        </div>
        
        {/* 오른쪽 바 데이터 입력 ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className='right-cover'>
         <div className="content">
            
            <section>
              <h1>온라인 계약서 (전자서명, 동의서)</h1>
              <div className="bottombar"></div>
              <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#f6f6f6'}}>
                <TitleBox width="130px" text='날짜'/>
                <TitleBox width="20%" text='경로'/>
                <TitleBox width="20%" text='상태'/>
                <TitleBox width="25%" text='보기'/>
              </div>
              <div className="coverbox">
                <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                  <DateBoxNum width='130px' subWidth='110px' right={25}   setSelectDate={setTestDate} date={testDate} marginLeft={5}/>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={''}
                    options={[
                      { value: '이메일', label: '이메일' },
                      { value: '이메일', label: '이메일' }
                    ]}    
                    handleChange={(e:any)=>{}}
                  />
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={''}
                    options={[
                      { value: '대기', label: '대기' },
                      { value: '전달', label: '전달' }
                    ]}    
                    handleChange={(e:any)=>{}}
                  />
                  <input style={{width:'25%', textAlign:'center'}}
                    value={''} className="inputdefault" type="text" 
                    onChange={(e) => {}}/>
                </div>
              </div>
            </section>

            

          </div>
        </div>

      </div>

      <div className='btn-box'>
        <div className="btn" style={{backgroundColor:'#5fb7ef', width:'100px'}}
          onClick={()=>{}}
        >
          <p>저장</p>
        </div>
        <div className="btn" style={{backgroundColor:'#BDBDBD'}}
          onClick={()=>{}}
        >
          <p>삭제</p>
        </div>
        <div className="btn" style={{backgroundColor:'#333', width:'100px'}}
          onClick={()=>{}}
        >
          <p>견적서발송</p>
        </div>
        
        
      </div>

    </div>
  )
}
