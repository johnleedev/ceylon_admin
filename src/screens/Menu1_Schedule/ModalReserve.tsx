import React, { useState } from 'react'
import './ModalReserve.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { SelectBox } from '../../boxs/SelectBox';
import { InputBox } from '../../boxs/InputBox';
import { DateBoxKo } from '../../boxs/DateBoxKo';
import { RadioBox } from '../../boxs/RadioBox';

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

export default function ModalReserve (props : any) {

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
    <div className='modal-reserve'>
      <div className='close'
        onClick={()=>{props.setIsViewModal(false)}}>
        <IoMdClose size={30}/>
      </div>

      <section>
        <h1>1. 진행상황</h1>

        <div className='state-row'>
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
            <TitleBox width={30} text='NO'/>
            <TitleBox width={75} text='구분'/>
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
            <TitleBox width={40} text='삭제'/>
          </div>
          {
            userInfo.map((item:any, index:any)=>{
              return(
                <div className="coverbox info" key={index}>
                  <p style={{width:'30px'}}>{item.no}</p>
                  <SelectBox widthmain={80} selectWidth={75} selectTextWidth={70}
                      notice={{ value: '선택', label: '선택' }}
                      data={[ 
                        { value: 'adult', label: '성인' },
                        { value: 'child', label: '소아' },
                        { value: 'infant', label: '유아' }
                      ]} 
                  />
                  <InputBox width={70} value={item.name} 
                    func={(e) => {const inputs = [...userInfo]; inputs[index].name = e.target.value;setUserInfo(inputs);}}/>
                  
                  <InputBox width={70} value={item.lastName} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].lastName = e.target.value; setUserInfo(inputs);}}/>
                  <InputBox width={120} value={item.firstName} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].firstName = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={100} value={item.birth} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].birth = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={50} value={item.male} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].male = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={70} value={item.nation} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].nation = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={120} value={item.passPortNum} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].passPortNum = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={100} value={item.passPortDate} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].passPortDate = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={150} value={item.residentNum} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].residentNum = e.target.value; setUserInfo(inputs);}} />
                  <InputBox width={150} value={item.phone} 
                    func={(e)=>{const inputs = [...userInfo]; inputs[index].phone = e.target.value; setUserInfo(inputs);}} />
                  <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="input" type="checkbox"
                      checked={isChecked}
                      onChange={()=>{setIsChecked(!isChecked);}}
                      style={{width:'20px', height:'20px', backgroundColor:'red'}}
                    />
                  </div>
                </div>
              )
            })
          }
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px'}}
              onClick={()=>{
                setUserInfo([...userInfo, 
                  { no: userInfo.length + 1, sort : '', name: '', lastName: '', firstName: '', 
                    birth: '', male: '', nation: '', passPortNum: '', passPortDate: '', residentNum : '', phone: ''
                   }]);
              }}
            >
              <p>여행자추가</p>
            </div>
            <div className='btn-row'
              onClick={()=>{}}
            >
              <p>저장</p>
            </div>
          </div>
        </div>

      </section>

      <section>
        <h1>3. 방문경로</h1>
        <div className="bottombar"></div>

        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width={120} text='예약지점'/>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'main', label: '본사' },
                { value: 'second', label: '지점' },
              ]} 
            />
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='담당자'/>
            <h3 style={{marginLeft:'10px'}}>계약자</h3>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={150} selectWidth={150} selectTextWidth={140}
              data={[ 
                { value: 'admin1', label: '김철수' },
                { value: 'admin2', label: '이투어' },
              ]} 
            /> 
            <h3>인수자</h3>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={150} selectWidth={150} selectTextWidth={140}
              data={[ 
                { value: 'admin1', label: '김철수' },
                { value: 'admin2', label: '이투어' },
              ]} 
            />            
          </div>
        </div>

        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width={120} text='방문경로'/>
            <InputBox width={500} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='추천인'/>
            <InputBox width={500} value={''} func={(e)=>{}} />
          </div>
        </div>

      </section>

      <section>
        <h1>4. 예약상품</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='상품명'/>
            <InputBox width={1200} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width={120} text='여행지'/>
            <SelectBox 
              notice={{ value: '선택', label: '국가선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '일본' },
                { value: 'n2', label: '중국' },
              ]} 
            />
            <InputBox width={250} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='항공사'/>
            <InputBox width={500} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='여행기간'/>
            <SelectBox 
              notice={{ value: '선택', label: '출발공항' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '인천공항' },
                { value: 'n2', label: '김포공항' },
                { value: 'n3', label: '대구공항' },
              ]} 
            />
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <p>~</p>
            <SelectBox 
              notice={{ value: '선택', label: '도착공항' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '인천공항' },
                { value: 'n2', label: '김포공항' },
                { value: 'n3', label: '대구공항' },
              ]} 
            />
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
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
                <InputBox width={200} value={''} func={(e)=>{}} />
                <p>원</p>
                <SelectBox 
                  notice={{ value: '선택', label: '0' }}
                  widthmain={100} selectWidth={100} selectTextWidth={90}
                  data={[ 
                    { value: 'n1', label: '1' },
                    { value: 'n2', label: '2' },
                    { value: 'n3', label: '3' },
                  ]} 
                />
                <p>명</p>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <h3 style={{margin:'0 10px'}}>소아</h3>
                <InputBox width={200} value={''} func={(e)=>{}} />
                <p>원</p>
                <SelectBox 
                  notice={{ value: '선택', label: '0' }}
                  widthmain={100} selectWidth={100} selectTextWidth={90}
                  data={[ 
                    { value: 'n1', label: '1' },
                    { value: 'n2', label: '2' },
                    { value: 'n3', label: '3' },
                  ]} 
                />
                <p>명</p>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <h3 style={{margin:'0 10px'}}>유아</h3>
                <InputBox width={200} value={''} func={(e)=>{}} />
                <p>원</p>
                <SelectBox 
                  notice={{ value: '선택', label: '0' }}
                  widthmain={100} selectWidth={100} selectTextWidth={90}
                  data={[ 
                    { value: 'n1', label: '1' },
                    { value: 'n2', label: '2' },
                    { value: 'n3', label: '3' },
                  ]} 
                />
                <p>명</p>
              </div>
            </div>
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='전체요금' height={160}/>
            <InputBox width={400} value={''} func={(e)=>{}} />
            <p>원</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='계약당시 환율'/>
            <h3 style={{margin:'0 10px'}}>1USD</h3>
            <InputBox width={200} value={''} func={(e)=>{}} />
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
          <TitleBox width={200} text='날짜'/>
          <TitleBox width={200} text='구간'/>
          <TitleBox width={200} text='항공편'/>
          <TitleBox width={200} text='출발시간'/>
          <TitleBox width={200} text='도착시간'/>
          <TitleBox width={120} text='상태'/>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={120} selectWidth={120} selectTextWidth={110}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' },
              ]} 
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={120} selectWidth={120} selectTextWidth={110}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' }                
              ]} 
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={120} selectWidth={120} selectTextWidth={110}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' }
              ]} 
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={200} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={120} selectWidth={120} selectTextWidth={110}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' }
              ]} 
            />
          </div>
        </div>
        
      </section>

      <section>
        <h1>7. 발권현황</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='항공사'/>
            <InputBox width={200} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='발권처'/>
            <InputBox width={200} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
            <TitleBox width={120} text='날짜'/>
            <DateBoxKo date={startDate} func={handleSelectDateChange} width={220} subWidth={180} right={30}/>
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='상태'/>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' },
              ]} 
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='중간구간1'/>
            <InputBox width={200} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='발권처'/>
            <InputBox width={200} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
            <TitleBox width={120} text='날짜'/>
            <DateBoxKo date={startDate} func={handleSelectDateChange} width={220} subWidth={180} right={30}/>
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='상태'/>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' },
              ]} 
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='중간구간2'/>
            <InputBox width={200} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='발권처'/>
            <InputBox width={200} value={''} func={(e)=>{}} />
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
            <TitleBox width={120} text='날짜'/>
            <DateBoxKo date={startDate} func={handleSelectDateChange} width={220} subWidth={180} right={30}/>
          </div>
          <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
            <TitleBox width={120} text='상태'/>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '예약/대기' },
                { value: 'n2', label: '발권/취소' },
              ]} 
            />
          </div>
        </div>
      </section>
      
      <section>
        <h1>8. 호텔 예약현황</h1>
        <div className="bottombar"></div>
        <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
          <TitleBox width={430} text='날짜'/>
          <TitleBox width={200} text='여행지'/>
          <TitleBox width={300} text='호텔명'/>
          <TitleBox width={200} text='룸타입'/>
          <TitleBox width={100} text='박수'/>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <p>~</p>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={300} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '풀빌라' },
                { value: 'n2', label: '스탠다드' }
              ]} 
            />
            <InputBox width={100} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <p>~</p>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={300} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '풀빌라' },
                { value: 'n2', label: '스탠다드' }
              ]} 
            />
            <InputBox width={100} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <p>~</p>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={300} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '풀빌라' },
                { value: 'n2', label: '스탠다드' }
              ]} 
            />
            <InputBox width={100} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{justifyContent:'space-between'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <p>~</p>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <InputBox width={300} value={''} func={(e)=>{}} />
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={200} selectWidth={200} selectTextWidth={190}
              data={[ 
                { value: 'n1', label: '풀빌라' },
                { value: 'n2', label: '스탠다드' }
              ]} 
            />
            <InputBox width={100} value={''} func={(e)=>{}} />
          </div>
        </div>
      </section>

      <section>
        <h1>9. 현지여행사</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='랜드사'/>
            <div style={{width:'90%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '1' },
                  { value: 'n2', label: '2' }
                ]} 
              />
              <InputBox width={400} value={''} func={(e)=>{}} />
              </div>
              <div style={{width:'200px', display:'flex', justifyContent:'flex-end'}}>
                <div className='btn-row' style={{marginRight:'5px'}}
                  onClick={()=>{
                    
                  }}
                >
                  <p>랜드사추가</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1>10. 여행상품 포함/불포함 사항, 여행자 보험 가입여부</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='포함사항'/>
            <InputBox width={1200} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='불포함사항'/>
            <InputBox width={1200} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width={120} text='여행자보험'/>
            <RadioBox text='포함' width={100} selectedValue={selectedValue} func={()=>{}} />
            <RadioBox text='불포함' width={100} selectedValue={selectedValue} func={()=>{}} />
          </div>
          <div className="coverrow half">
            <TitleBox width={120} text='보험회사'/>
            <InputBox width={520} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='계약금액'/>
            <RadioBox text='해외2억' width={100} selectedValue={selectedValue} func={()=>{}} />
            <RadioBox text='해외1억' width={100} selectedValue={selectedValue} func={()=>{}} />
          </div>
        </div>
      </section>

      <section>
        <h1>11. 입금내역</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width={120} text='계약금액'/>
            <InputBox width={250} value={''} func={(e)=>{}} />
            <p>원</p>
          </div>
          <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h3 style={{marginRight:'20px'}}>추가경비:</h3>
            <h3 style={{fontSize:'20px'}}>0</h3>
          </div>
          <div className="coverrow third" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h3 style={{marginRight:'20px'}}>최종 여행경비:</h3>
            <h3 style={{fontSize:'20px'}}>0</h3>
          </div>
        </div>
        {
          ["계약금", "항공료", "중도금", "잔금", "추가경비"].map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow third rightborder">
                  <TitleBox width={120} text={item}/>
                  <InputBox width={250} value={''} func={(e)=>{}} />
                  <p>원</p>
                </div>
                <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <DateBoxKo date={startDate} func={handleSelectDateChange}/>
                </div>
                <div className="coverrow third" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <SelectBox 
                    notice={{ value: '선택', label: '선택' }}
                    widthmain={150} selectWidth={150} selectTextWidth={140}
                    data={[ 
                      { value: 'n1', label: '현금' },
                      { value: 'n2', label: '카드' }
                    ]} 
                  />
                  <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="input" type="checkbox"
                      checked={isChecked}
                      onChange={()=>{setIsChecked(!isChecked);}}
                      style={{width:'20px', height:'20px', backgroundColor:'red'}}
                    />
                  </div>
                  <p>입금확인</p>
                </div>
              </div>
            )
          })
        }
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width={120} text='환불'/>
            <InputBox width={250} value={''} func={(e)=>{}} />
            <p>원</p>
          </div>
          <div className="coverrow third rightborder" style={{height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width={120} text='밸런스'/>
            <InputBox width={1200} value={''} func={(e)=>{}} />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width={120} text='현금영수증'/>
            <RadioBox text='요청없음' width={100} selectedValue={selectedValue} func={()=>{}} />
            <RadioBox text='발급요청' width={100} selectedValue={selectedValue} func={()=>{}} />
          </div>
          <div className="coverrow" style={{width:'65%'}}>
            <RadioBox text='소득공제' width={100} selectedValue={selectedValue} func={()=>{}} />
            <RadioBox text='지출증빙' width={100} selectedValue={selectedValue} func={()=>{}} />
            <h3 style={{marginLeft:'50px'}}>인증번호</h3>
            <InputBox width={200} value={''} func={(e)=>{}} />
            <h3 style={{marginLeft:'30px'}}>발급일</h3>
            <DateBoxKo date={startDate} func={handleSelectDateChange}/>
          </div>
        </div>
      </section>

      <section>
        <h1>12. OT 및 고객전달 사항</h1>
        <div className="bottombar"></div>
        <div className="coverbox titlerow" style={{backgroundColor:'#E2E2E2' }}>
          <TitleBox width={120} text=''/>
          <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
            <TitleBox width={210} text='요청일'/>
            <TitleBox width={210} text='처리일'/>
            <TitleBox width={250} text='전달방식'/>
            <TitleBox width={250} text='담당자'/>
          </div>
        </div>
        {
          ["e-Ticket", "비자/ESTA", "확정서", "여행준비물", "캐리어사은품", "해피콜", "환불/과입금"].map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole">
                  <TitleBox width={120} text={item}/>
                  <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                    <DateBoxKo date={startDate} func={handleSelectDateChange}/>
                    <DateBoxKo date={startDate} func={handleSelectDateChange}/>
                    <SelectBox 
                      notice={{ value: '선택', label: '선택' }}
                      widthmain={250} selectWidth={250} selectTextWidth={240}
                      data={[ 
                        { value: 'n1', label: '카톡' },
                        { value: 'n2', label: '전화' }
                      ]} 
                    />
                    <SelectBox 
                      notice={{ value: '선택', label: '선택' }}
                      widthmain={250} selectWidth={250} selectTextWidth={240}
                      data={[ 
                        { value: 'n1', label: '카톡' },
                        { value: 'n2', label: '전화' }
                      ]} 
                    />
                  </div>
                </div>
              </div>

            )
          })
        }          
      </section>

    </div>     
  )
}
