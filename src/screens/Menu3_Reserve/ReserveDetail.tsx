import React, { useState } from 'react'
import './ReserveDetail.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { SelectBox } from '../../boxs/SelectBox';
import { InputBox } from '../../boxs/InputBox';
import { DateBoxKo } from '../../boxs/DateBoxKo';
import { RadioBox } from '../../boxs/RadioBox';
import { TextBoxPL10 } from '../../boxs/TextBoxPL10';
import { DateBoxNum } from '../../boxs/DateBoxNum';


const userInfoData = [
  {no:1, sort : '성인', name: '김실론', lastName: 'KIM', firstName: 'CEYLON',
   birth: '1988-02-01', male: '남', nation: '대한민국', 
   passPortNum: 'M35623397', passPortDate: '2024-02-01',
   residentNum : '880201-1110113', phone: '010-9324-1891'
  },
  {no:2, sort : '성인', name: '김실론', lastName: 'KIM', firstName: 'CEYLON',
   birth: '1988-02-01', male: '여', nation: '대한민국', 
   passPortNum: 'M35623397', passPortDate: '2024-02-01',
   residentNum : '880201-1110113', phone: '010-9324-1891'
  }
]

export default function ReserveDetail (props : any) {

  const [currentState, setCurrentState] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  interface UserInfoProps {
    no: number, 
    sort : string, 
    name: string, 
    lastName: string, 
    firstName: string,
    birth: string, 
    male: string, 
    nation: string, 
    passPortNum: string, 
    passPortDate: string,
    residentNum : string, 
    phone: string
  }
  const [userInfo, setUserInfo] = useState<UserInfoProps[]>(userInfoData);
  const [selectedSortOption, setSelectedSortOption] = useState({ value: '선택', label: '선택' });

  const handleSelectSortChange = ( event : any, index:number) => {
    setSelectedSortOption(event);
    const inputs = [...userInfo]; 
    inputs[index].sort = event.value; 
    setUserInfo(inputs);
  }

  // 날짜 선택 ----------------------------------------------
  const [startDate, setStartDate] = useState();
  const handleSelectDateChange = ( event : any) => {
    setStartDate(event);
    const day = format(event, 'EEE', { locale: ko });
    const copy = event.toLocaleDateString('ko-KR');
    const splitCopy = copy.split('. ');
    const thirdText = splitCopy[2].slice(0, -1);
    const reformmedTextko = `${splitCopy[0]}년 ${splitCopy[1]}월 ${thirdText}일 (${day})`
    const splitCopy2Copy = splitCopy[1] < 10 ? `0${splitCopy[1]}` : splitCopy[1];
    const splitCopy3Copy = splitCopy[2] < 10 ? `0${splitCopy[2]}` : splitCopy[2];
    const reformmedText = `${splitCopy[0]}.${splitCopy2Copy}.${splitCopy3Copy}`;
  //  setDate(reformmedTextko);
  //  setDateOrigin(reformmedText);
  }

  const [selectedValue, setSelectedValue] = useState('');


  return (
    <div className='reservedetail'>

      <div className='left-cover'>
        
        <section>
          <h1>1. 진행상황</h1>

          <div className='state-row' style={{width:'100%'}}>
            <div className='textbox'>
              <p>계약완료</p>
            </div>
            <div className='rotatebox'></div>
            <div className='textbox'>
              <p>발권완료</p>
            </div>
            <div className='rotatebox'></div>
            <div className='textbox'>
              <p>예약확정</p>
            </div>
            <div className='rotatebox'></div>
            <div className='textbox'>
              <p>출발준비</p>
            </div>
          </div>
          
        </section>

        <section className='userInfo'>
          <h1>2. 고객정보</h1>
          <div className="bottombar"></div>
          <div className='content'>
            <div className="coverbox titlerow">
              <TitleBox width={50} text='구분'/>
              <TitleBox width={70} text='이름'/>
              <TitleBox width={70} text={`Last.N`}/>
              <TitleBox width={120} text={`First.N`}/>
              <TitleBox width={100} text='생년월일'/>
              <TitleBox width={50} text='성별'/>
              <TitleBox width={70} text='국적'/>
              <TitleBox width={120} text='여권번호'/>
              <TitleBox width={100} text='만료일'/>
              <TitleBox width={150} text='주민번호'/>
              <TitleBox width={150} text='연락처'/>
            </div>
            {
              userInfo.map((item:any, index:any)=>{
                return(
                  <div className="coverbox info" key={index}>
                    <p style={{width:'50px'}}>{item.sort}</p>
                    <p style={{width:'70px'}}>{item.name}</p>
                    <p style={{width:'70px'}}>{item.lastName}</p>
                    <p style={{width:'120px'}}>{item.firstName}</p>
                    <p style={{width:'100px'}}>{item.birth}</p>
                    <p style={{width:'50px'}}>{item.male}</p>
                    <p style={{width:'70px'}}>{item.nation}</p>
                    <p style={{width:'120px'}}>{item.passPortNum}</p>
                    <p style={{width:'100px'}}>{item.passPortDate}</p>
                    <p style={{width:'150px'}}>{item.residentNum}</p>
                    <p style={{width:'150px'}}>{item.phone}</p>
                  </div>
                )
              })
            }
          </div>

        </section>

        <section>
          <h1>3. 방문경로</h1>
          <div className="bottombar"></div>

          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width={120} text='예약지점'/>
              <TextBoxPL10 width={200} text='________________' />
            </div>
            <div className="coverrow half">
              <TitleBox width={120} text='담당자'/>
              <h3 style={{marginLeft:'10px'}}>계약자</h3>
              <TextBoxPL10 width={150} text='________________' />
            </div>
          </div>

          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width={120} text='방문경로'/>
              <TextBoxPL10 width={300} text='________________' />
            </div>
            <div className="coverrow half">
              <TitleBox width={120} text='추천인'/>
              <TextBoxPL10 width={300} text='________________' />
            </div>
          </div>

        </section>

        <section>
          <h1>4. 예약상품</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='상품명'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width={120} text='여행지'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
            <div className="coverrow half">
              <TitleBox width={120} text='항공사'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='여행기간'/>
              <TextBoxPL10 width={500} text='________________________________'/>
            </div>
          </div>
        </section>

        <section>
          <h1>5. 여행상품가</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width={120} text='1인요금' height={160}/>
              <div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>성인</h3>
                  <TextBoxPL10 width={100} text='________________' justify='flex-end'/>
                  <p>원</p>
                  <TextBoxPL10 width={50} text='______' justify='flex-end'/>
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>소아</h3>
                  <TextBoxPL10 width={100} text='________________' justify='flex-end'/>
                  <p>원</p>
                  <TextBoxPL10 width={50} text='______' justify='flex-end'/>
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>유아</h3>
                  <TextBoxPL10 width={100} text='________________' justify='flex-end'/>
                  <p>원</p>
                  <TextBoxPL10 width={50} text='______' justify='flex-end'/>
                  <p>명</p>
                </div>
              </div>
            </div>
            <div className="coverrow half">
              <TitleBox width={120} text='전체요금' height={160}/>
              <TextBoxPL10 width={400} text='________________________________' justify='flex-end'/>
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='계약당시 환율'/>
              <h3 style={{margin:'0 10px'}}>1USD</h3>
              <TextBoxPL10 width={200} text='________________' justify='center'/>
              <p># 잔금지불시 변동환율 적용여부 공지</p>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={isChecked}
                    onChange={()=>{setIsChecked(!isChecked);}}
                    style={{width:'20px', height:'20px', backgroundColor:'red'}}
                  />
                </div>
                <p>공지했음</p>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={isChecked}
                    onChange={()=>{setIsChecked(!isChecked);}}
                    style={{width:'20px', height:'20px', backgroundColor:'red'}}
                  />
                </div>
                <p>고객확인</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h1>6. 항공 예약현황</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
            <TitleBox width={210} text='날짜'/>
            <TitleBox width={200} text='구간'/>
            <TitleBox width={200} text='항공편'/>
            <TitleBox width={200} text='출발시간'/>
            <TitleBox width={200} text='도착시간'/>
            <TitleBox width={120} text='상태'/>
          </div>
          {
            [1,2,3,4].map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                    <TextBoxPL10 width={210} text='________________' justify='center'/>
                    <TextBoxPL10 width={200} text='________________' justify='center'/>
                    <TextBoxPL10 width={200} text='________________' justify='center'/>
                    <TextBoxPL10 width={200} text='________________' justify='center'/>
                    <TextBoxPL10 width={200} text='________________' justify='center'/>
                    <TextBoxPL10 width={120} text='________________' justify='center'/>
                  </div>
                </div>
              )
            })
          }
          
        </section>

        <section>
          <h1>7. 발권현황</h1>
          <div className="bottombar"></div>
          {
            [1,2].map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                    <TitleBox width={120} text='항공사'/>
                    <TextBoxPL10 width={200} text='________________' />
                  </div>
                  <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                    <TitleBox width={120} text='발권처'/>
                    <TextBoxPL10 width={200} text='________________' />
                  </div>
                  <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
                    <TitleBox width={120} text='날짜'/>
                    <TextBoxPL10 width={200} text='________________' />
                  </div>
                  <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                    <TitleBox width={120} text='상태'/>
                    <TextBoxPL10 width={200} text='________________' />
                  </div>
                </div>
              )
            })
          }
        </section>
        
        <section>
          <h1>8. 호텔 예약현황</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
            <TitleBox width={300} text='체크인'/>
            <TitleBox width={200} text='여행지'/>
            <TitleBox width={300} text='호텔명'/>
            <TitleBox width={200} text='룸타입'/>
            <TitleBox width={100} text='박수'/>
          </div>
          {
            [1,2].map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                    <TextBoxPL10 width={300} text='________________' justify='center'/>
                    <TextBoxPL10 width={200} text='________________' justify='center'/>
                    <TextBoxPL10 width={300} text='________________' justify='center'/>
                    <TextBoxPL10 width={200} text='________________' justify='center'/>
                    <TextBoxPL10 width={100} text='_________' justify='center'/>
                  </div>
                </div>
              )
            })
          }

        </section>

        <section>
          <h1>9. 여행상품 포함/불포함 사항, 여행자 보험 가입여부</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='포함사항'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='불포함사항'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width={120} text='여행자보험'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
            <div className="coverrow half">
              <TitleBox width={120} text='보험회사'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='계약금액'/>
              <TextBoxPL10 width={300} text='________________'/>
            </div>
          </div>
        </section>

        <section>
          <h1>10. 입금내역</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width={120} text='계약금액'/>
              <TextBoxPL10 width={150} text='________________' justify='flex-end'/>
              <p>원</p>
            </div>
            <div className="coverrow" style={{width:'66%', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <h3 style={{marginRight:'20px'}}>최종 여행 경비:</h3>
              <TextBoxPL10 width={150} text='________________' justify='center'/>
              <p>원</p>
            </div>
          </div>
          {
            ["계약금", "항공료", "중도금", "잔금", "추가경비"].map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width={120} text={item}/>
                    <TextBoxPL10 width={150} text='________________' justify='flex-end'/>
                    <p>원</p>
                  </div>
                  <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <TextBoxPL10 width={150} text='________________' justify='center'/>
                  </div>
                  <div className="coverrow third" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="half rightborder">
                      <TextBoxPL10 width={150} text='________________' justify='center'/>
                    </div>
                    <div className="half">
                      <TextBoxPL10 width={150} text='________________' justify='center'/>
                    </div>
                  </div>
                </div>
              )
            })
          }
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='환불'/>
              <TextBoxPL10 width={200} text='________________' justify='flex-end'/>
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='밸런스'/>
              <TextBoxPL10 width={200} text='________________' justify='flex-end'/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width={120} text='현금영수증'/>
              <TextBoxPL10 width={200} text='________________' justify='flex-end'/>
            </div>
          </div>
        </section>

        <section>
          <h1>11. OT 및 고객전달 사항</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{backgroundColor:'#E2E2E2' }}>
            <TitleBox width={120} text=''/>
            <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
              <TitleBox width={210} text='요청일'/>
              <TitleBox width={210} text='처리일'/>
              <TitleBox width={150} text='전달방식'/>
              <TitleBox width={150} text='담당자'/>
            </div>
          </div>
          {
            ["e-Ticket", "비자/ESTA", "확정서", "여행준비물", "캐리어사은품", "해피콜", "환불/과입금"].map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    <TitleBox width={120} text={item}/>
                    <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                      <TextBoxPL10 width={210} text='________________' justify='center'/>
                      <TextBoxPL10 width={210} text='________________' justify='center'/>
                      <TextBoxPL10 width={150} text='________________' justify='center'/>
                      <TextBoxPL10 width={150} text='________________' justify='center'/>
                    </div>
                  </div>
                </div>

              )
            })
          }          
        </section>
      </div>
      
      <div className='right-cover'>
        <div className="content">
          
          <section>
            <h1>온라인 계약서 (전자서명, 동의서)</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#E2E2E2'}}>
              <TitleBox width={120} text='날짜'/>
              <TitleBox width={120} text='경로'/>
              <TitleBox width={120} text='상태'/>
              <TitleBox width={150} text='보기'/>
            </div>
            <div className="coverbox">
              <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                <DateBoxNum date={startDate} func={handleSelectDateChange} width={120} subWidth={120} right={7}/>
                <SelectBox 
                  notice={{ value: '선택', label: '선택' }}
                  widthmain={120} selectWidth={120} selectTextWidth={90}
                  data={[ 
                    { value: 'n1', label: '이메일' },
                    { value: 'n2', label: '이메일' },
                  ]} 
                />
                <SelectBox 
                  notice={{ value: '선택', label: '선택' }}
                  widthmain={120} selectWidth={120} selectTextWidth={90}
                  data={[ 
                    { value: 'n1', label: '전달' },
                    { value: 'n2', label: '전달' },
                  ]} 
                />
                <InputBox width={150} value={''} func={(e)=>{}} />
              </div>
            </div>
          </section>

          <section>
            <h1>수배 확정 내역</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#E2E2E2'}}>
              <TitleBox width={120} text='날짜'/>
              <TitleBox width={120} text='경로'/>
              <TitleBox width={120} text='상태'/>
              <TitleBox width={150} text='보기'/>
            </div>
            {
              [1,2,3].map((item:any, index:any)=>{
                return (
                  <div className="coverbox">
                    <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                      <DateBoxNum date={startDate} func={handleSelectDateChange} width={120} subWidth={120} right={7}/>
                      <SelectBox 
                        notice={{ value: '선택', label: '선택' }}
                        widthmain={120} selectWidth={120} selectTextWidth={90}
                        data={[ 
                          { value: 'n1', label: '이메일' },
                          { value: 'n2', label: '이메일' },
                        ]} 
                      />
                      <SelectBox 
                        notice={{ value: '선택', label: '선택' }}
                        widthmain={120} selectWidth={120} selectTextWidth={90}
                        data={[ 
                          { value: 'n1', label: '전달' },
                          { value: 'n2', label: '전달' },
                        ]} 
                      />
                      <InputBox width={150} value={''} func={(e)=>{}} />
                    </div>
                 </div>
                )
              })
            }
          </section>

          <section>
            <h1>고객 관리 내역</h1>
            <textarea 
              className="textarea"
              value={''}
              onChange={()=>{}}
            />
            <div className='btn-box'>
              <div className="btn" style={{backgroundColor: '#5fb7ef'}}>
                <p>등록</p>
              </div>
            </div>
          </section>

          <section>
          {
            [1,2,3].map((item:any, index:any)=>{
              return (
                <div className="inputcontentbox">
                  <div className="date-name">
                    <p className="date">2022.11.10 (14:51)</p>
                    <p className="name">김철수</p>
                  </div>
                  <div className="inputcontent">
                    <p>항공권 신한카드 발권 3개월 결제 - 신부님 카드</p>
                    <div className='btn-box'>
                      <div className="btn" style={{backgroundColor: '#BDBDBD'}}>
                        <p>삭제</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
          </section>

        </div>
      </div>

    </div>     
  )
}
