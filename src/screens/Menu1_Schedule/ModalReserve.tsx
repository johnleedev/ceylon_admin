import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";
import './ModalReserve.scss'

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

interface TitleBoxProps {
  text: string;
  width : number;
  height? : number
}

const TitleBox : React.FC<TitleBoxProps> = ({text, width, height }) => (
  <div className="title" style={{width:`${width}px`, height: `${height}px` ?? '50px'}}>
    <h3>{text}</h3>
  </div>
)

interface SelectBoxProps {
  widthmain : number;
  notice : { value: string, label: string };
  data : { value: string; label: string; }[];
  selectWidth: number;
  selectTextWidth: number;
}

const SelectBox : React.FC<SelectBoxProps> = ({widthmain, notice, data, selectWidth, selectTextWidth }) => (
  <div className='selectbox' style={{width: `${widthmain}px`}}>
    <Select
      value={notice}
      onChange={(e)=>{}}
      options={data}
      blurInputOnSelect
      styles={{ control: (baseStyles, state) => ({...baseStyles, width: `${selectWidth}px`, height:'30px',}),
        singleValue: (styles, { data }) => ({ ...styles, width: `${selectTextWidth}px`, fontSize:'15px' })}}
    />
  </div>
)

interface InputBoxProps {
  width: number;
  value: any;
  func: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputBox : React.FC<InputBoxProps> = ({width, value, func }) => (
  <input 
    className="input" type="text" 
    style={{width:`${width}px`}} value={value}
    onChange={func}
  />
)

interface DateBoxProps {
  date: any;
  func: (date: Date | null, event: React.SyntheticEvent<any> | undefined) => void;
}

const DateBox : React.FC<DateBoxProps> = ({date, func }) => (
  <div className='calendarbox'>
    <DatePicker
      className="dateinput" 
      locale={ko}
      dateFormat='yyyy년 MM월 dd일 (eee)'
      shouldCloseOnSelect
      minDate={new Date('2012-01-01')}
      selected={date}
      onChange={func}
    />
    <FaRegCalendarAlt className='calender-icon'/>
  </div>
)



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

  return (
    <div className='modal-content'>
      <p className='close'
        onClick={()=>{props.setIsViewModal(false)}}>
        <IoMdClose size={30}/>
      </p>

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
            <h4>계약자</h4>
            <SelectBox 
              notice={{ value: '선택', label: '선택' }}
              widthmain={150} selectWidth={150} selectTextWidth={140}
              data={[ 
                { value: 'admin1', label: '김철수' },
                { value: 'admin2', label: '이투어' },
              ]} 
            /> 
            <h4>인수자</h4>
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
            <InputBox width={1000} value={''} func={(e)=>{}} />
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
            <DateBox date={startDate} func={handleSelectDateChange}/>
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
            <DateBox date={startDate} func={handleSelectDateChange}/>
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
      </section>

      <section>
        <h1>7. 발권현황</h1>
        <div className="bottombar"></div>
      </section>


    </div>     
  )
}
