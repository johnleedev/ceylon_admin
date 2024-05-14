import React, { useState } from 'react'
import './ModalReserve.scss'
import axios from 'axios'
import MainURL from "../../MainURL";
import { CiCircleMinus } from "react-icons/ci";
import { TitleBox } from '../../boxs/TitleBox';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DropDowncharger, DropDownVisitPath } from '../DefaultData';


export default function ModalReserveTab1(props:any) {

  const userInfoData = [
    { sort : '성인', nameko: '', nameLast: '', nameFirst: '', birth: '', gender: '', nation: '', passportNum: '', passportDate: '', residentNum : '', phone: ''}
  ]

  interface UserInfoProps {
    sort : string, 
    nameko: string, 
    nameLast: string, 
    nameFirst: string,
    birth: string, 
    gender: string, 
    nation: string, 
    passportNum: string, 
    passportDate: string,
    residentNum : string, 
    phone: string
  }
  const [userInfo, setUserInfo] = useState<UserInfoProps[]>(userInfoData);
  const [reserveLocation, setReserveLocation] = useState('본사');
  const [charger, setcharger] = useState(DropDowncharger[0].value);
  const [accepter, setAccepter] = useState(DropDowncharger[0].value);
  const [visitPath, setVisitPath] = useState(DropDownVisitPath[0].value);
  const [recommender, setRecommender] = useState('');
    
  // 수정저장 함수
  const handleReserveSave = async () => {
  
    await axios
    .post(`${MainURL}/adminreserve/saveuserinfo`, {
      serialNum: props.serialNum,
      inputState : 'save',
      userInfo: userInfo,
      reserveLocation : reserveLocation,
      visitPath: visitPath,
      charger: charger,
      accepter: accepter,
      recommender : recommender
    })
    .then((res)=>{
      if (res.data) {
        alert('입력되었습니다.');
        props.setInputState('save');
        console.log(res.data);
        // props.setIsViewCounselModal(false);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // user row delete
  const userDelete = async (Num :any) => {
    const copy = [...userInfo];
    const filter = copy.filter((e:any)=> e.residentNum !== Num );
    setUserInfo(filter);
  };

  // 생년월일 변경
  const handleBirth = async (e:any, index:number) => {
    const text = e.target.value; 
    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      inputs[index].birth = text.replace(/-/g, ''); 
      setUserInfo(inputs);
    } else {
      if (text.length === 8) {
        const year = text.substring(0, 4);
        const month = text.substring(4, 6);
        const day = text.substring(6, 8);
        const date = `${year}-${month}-${day}`;
        inputs[index].birth = date;
        setUserInfo(inputs);
      } else {
        inputs[index].birth = text;
        setUserInfo(inputs);
      }
    }
  };

  // 만료일 변경
  const handlePassportNum = async (e:any, index:number) => {
    const text = e.target.value; 
    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      inputs[index].passportDate = text.replace(/-/g, ''); 
      setUserInfo(inputs);
    } else {
      if (text.length === 8) {
        const year = text.substring(0, 4);
        const month = text.substring(4, 6);
        const day = text.substring(6, 8);
        const date = `${year}-${month}-${day}`;
        inputs[index].passportDate = date;
        setUserInfo(inputs);
      } else {
        inputs[index].passportDate = text;
        setUserInfo(inputs);
      }
    }
  };

  // 주민번호 변경
  const handleResidentNum = async (e:any, index:number) => {
    const text = e.target.value; 
    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      inputs[index].residentNum = text.replace(/-/g, ''); 
      setUserInfo(inputs);
    } else {
      if (text.length === 13) {
        const num1 = text.substring(0, 6);
        const num2 = text.substring(6, 13);
        const result = `${num1}-${num2}`;
        inputs[index].residentNum = result;
        setUserInfo(inputs);
      } else {
        inputs[index].residentNum = text;
        setUserInfo(inputs);
      }
    }
  };

  // 연락처 변경
  const handlePhone = async (e:any, index:number) => {
    const text = e.target.value; 
    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      inputs[index].phone = text.replace(/-/g, ''); 
      setUserInfo(inputs);
    } else {
      if (text.length === 11) {
        const num1 = text.substring(0, 3);
        const num2 = text.substring(3, 7);
        const num3 = text.substring(7, 13);
        const result = `${num1}-${num2}-${num3}`;
        inputs[index].phone = result;
        setUserInfo(inputs);
      } else {
        inputs[index].phone = text;
        setUserInfo(inputs);
      }
    }
  };

  
  return (
    <div>
      <section className='userInfo'>
          <h1>2. 고객정보</h1>
          <div className="bottombar"></div>
          <div className='content'>
            <div className="coverbox titlerow">
              <TitleBox width='3%' text='NO'/>
              <TitleBox width='5%' text='구분'/>
              <TitleBox width='7%' text='이름'/>
              <TitleBox width='5%' text={`Last.N`}/>
              <TitleBox width='8%' text={`First.N`}/>
              <TitleBox width='10%' text='생년월일'/>
              <TitleBox width='5%' text='성별'/>
              <TitleBox width='7%' text='국적'/>
              <TitleBox width='10%' text='여권번호'/>
              <TitleBox width='10%' text='만료일'/>
              <TitleBox width='12%' text='주민번호'/>
              <TitleBox width='12%' text='연락처'/>
              <TitleBox width='3%' text='삭제'/>
            </div>
            {
              userInfo.map((item:any, index:any)=>{
                return(
                  <div className="coverbox info" key={index}>
                    <p style={{width:'3%'}}>{index+1}</p>
                    <DropdownBox
                      widthmain='5%'
                      height='35px'
                      selectedValue={item.sort}
                      options={[
                        { value: '성인', label: '성인' },
                        { value: '유아', label: '유아' },
                        { value: '소아', label: '소아' },
                      ]}    
                      handleChange={(e)=>{
                        const inputs = [...userInfo]; inputs[index].sort = e.target.value; setUserInfo(inputs);
                      }}
                    />
                    <input style={{width:'7%'}}  value={item.nameko} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = [...userInfo]; inputs[index].nameko = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'5%'}}  value={item.nameLast} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nameLast = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'8%'}}  value={item.nameFirst} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nameFirst = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.birth} className="inputdefault" type="text" placeholder='8자리'
                      onChange={(e)=>{handleBirth(e, index)}} maxLength={8} />
                    <DropdownBox widthmain='5%' height='35px' selectedValue={item.gender}
                      options={[{ value: '남', label: '남' }, { value: '여', label: '여' }]}    
                      handleChange={(e)=>{const inputs = [...userInfo]; inputs[index].gender = e.target.value; setUserInfo(inputs);}}
                    />
                    <input style={{width:'7%'}}  value={item.nation} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nation = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.passportNum} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].passportNum = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.passportDate} className="inputdefault" type="text" placeholder='8자리'
                      onChange={(e)=>{handlePassportNum(e, index)}} />
                    <input style={{width:'12%'}}  value={item.residentNum} className="inputdefault" type="text" placeholder='13자리'
                      onChange={(e)=>{handleResidentNum(e, index)}} maxLength={13} />
                    <input style={{width:'12%'}}  value={item.phone} className="inputdefault" type="text" placeholder='11자리'
                      onChange={(e)=>{handlePhone(e, index)}} />
                    <div style={{width:'3%', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}
                      className='minus-btn-box' onClick={()=>{userDelete(item.residentNum)}} >
                      <CiCircleMinus className='minus-btn'/>
                    </div>
                  </div>
                )
              })
            }
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
              <div className='btn-row' style={{marginRight:'5px'}}
                onClick={()=>{
                  setUserInfo([...userInfo, 
                    { sort : '성인', nameko: '', nameLast: '', nameFirst: '', 
                      birth: '', gender: '', nation: '', passportNum: '', passportDate: '', residentNum : '', phone: ''
                    }]);
                }}
              >
                <p>여행자추가</p>
              </div>
            </div>
          </div>

        </section>

        <section>
          <h1>3. 방문경로</h1>
          <div className="bottombar"></div>

          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width='120px' text='예약지점'/>
              <DropdownBox
                widthmain='30%'
                height='35px'
                selectedValue={reserveLocation}
                options={[
                  { value: '본사', label: '본사' },
                  { value: '지점', label: '지점' },
                ]}    
                handleChange={(e)=>{setReserveLocation(e.target.value)}}
              />
            </div>
            <div className="coverrow half">
              <TitleBox width='120px' text='담당자'/>
              <h3 style={{marginLeft:'10px'}}>계약자</h3>
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={charger}
                options={DropDowncharger}    
                handleChange={(e)=>{setcharger(e.target.value)}}
              />
              <h3 style={{marginLeft:'20px'}}>인수자</h3>
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={accepter}
                options={DropDowncharger}    
                handleChange={(e)=>{setAccepter(e.target.value)}}
              />         
            </div>
          </div>

          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width='120px' text='방문경로'/>
              <DropdownBox
                widthmain='50%'
                height='35px'
                selectedValue={visitPath}
                options={DropDownVisitPath}
                handleChange={(e)=>{setVisitPath(e.target.value)}}
              />
            </div>
            <div className="coverrow half">
              <TitleBox width='120px' text='추천인'/>
              <input className="inputdefault" type="text" style={{width:'60%'}} 
                value={recommender} onChange={(e)=>{setRecommender(e.target.value)}}/>
            </div>
          </div>

        </section>

        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px'}}
              onClick={()=>{
                
              }}
            >
              <p>전체삭제</p>
            </div>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSave}
            >
              <p>저장</p>
            </div>
          </div>

        </section>

    </div>
  )
}
