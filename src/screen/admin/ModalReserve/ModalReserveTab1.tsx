import React, { useState } from 'react'
import './ModalReserve.scss'
import axios from 'axios'
import MainURL from "../../../MainURL";
import { CiCircleMinus } from "react-icons/ci";
import { TitleBox } from '../../../boxs/TitleBox';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDowncharger, DropDownVisitPath } from '../../DefaultData';
import { FaPlus } from "react-icons/fa";

export default function ModalReserveTab1(props:any) {

  const userInfoData = [
    { userNum: 1, sort : '성인', nameKo: '', nameLast: '', nameFirst: '', birth: '', gender: '남', nation: '한국', passportNum: '', passportDate: '', residentNum : '', phone: ''},
    { userNum: 2, sort : '성인', nameKo: '', nameLast: '', nameFirst: '', birth: '', gender: '남', nation: '한국', passportNum: '', passportDate: '', residentNum : '', phone: ''}
  ]

  interface UserInfoProps {
    userNum : number;
    sort : string, 
    nameKo: string, 
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
  const [userInfo, setUserInfo] = useState<UserInfoProps[]>(props.modalSort === 'revise' ? props.userInfo : userInfoData );
  const [reserveLocation, setReserveLocation] = useState(props.modalSort === 'revise' ? props.reserveInfo.reserveLocation : '본사');
  const [charger, setcharger] = useState(props.modalSort === 'revise' ? props.reserveInfo.charger : DropDowncharger[0].value);
  const [accepter, setAccepter] = useState(props.modalSort === 'revise' ? props.reserveInfo.accepter : DropDowncharger[0].value);
  const [visitPath, setVisitPath] = useState(props.modalSort === 'revise' ? props.reserveInfo.visitPath : '협력업체');
  const [visitPathDetail, setVisitPathDetail] = useState(props.modalSort === 'revise' ? props.reserveInfo.visitPathDetail : '');
  const [recommender, setRecommender] = useState(props.modalSort === 'revise' ? props.reserveInfo.recommender : '');
    
  // 수정저장 함수
  const handleReserveSaveTab1 = async () => {
    if (userInfo[0].nameKo === userInfo[1].nameKo) {
      alert('고객 정보에 동일한 이름이 있습니다.')
    } else {
      const data = {
        serialNum: props.serialNum,
        inputState : 'save',
        userInfo: userInfo,
        reserveLocation : reserveLocation,
        visitPath: visitPath,
        visitPathDetail: visitPathDetail,
        charger: charger,
        accepter: accepter,
        recommender : recommender
      }
      
      await axios
        .post(`${MainURL}/adminreserve/reviseuserinfo`, data)
        .then((res)=>{
          if (res.data) {
            alert('저장되었습니다.');
            if ( props.modalSort === 'new' ) {
              props.setInputState('save');
              props.fetchReservePosts();
            }
          }
        })
        .catch((err)=>{
          console.log(err);
          alert('다시 시도해주세요. fdklg')
        })
    }
    
   
  };

  // user row add
  const userAdd = async () => {
    const result = window.confirm(`정말 고객을 추가하겠습니까?`);
    if (result) {
      await axios
      .post(`${MainURL}/adminreserve/reviseuserinfoadd`, {
        serialNum: props.serialNum,
        userNum : userInfo.length +1 
      })
      .then((res)=>{
        if (res.data) {
          alert('추가되었습니다.')
          setUserInfo([...userInfo, 
            { userNum: userInfo.length+1, sort : '성인', nameKo: '', nameLast: '', nameFirst: '', 
              birth: '', gender: '남', nation: '한국', passportNum: '', passportDate: '', residentNum : '', phone: ''
            }]);
        }
      })
      .catch((err)=>{
        console.log(err);
        alert('다시 시도해주세요. fdklg')
      })
    } else {
      return
    }
  };

  // user row delete
  const userDelete = async (Num :any) => {
    const result = window.confirm(`NO.${Num}님을 정말 삭제하시겠습니까?`);
    if (result) {
      await axios
      .post(`${MainURL}/adminreserve/reviseuserinfodelete`, {
        serialNum: props.serialNum,
        userNum : Num
      })
      .then((res)=>{
        if (res.data) {
          alert('삭제되었습니다.')
          const copy = [...userInfo];
          const filter = copy.filter((e:any)=> e.userNum !== Num );
          setUserInfo(filter);  
        }
      })
      .catch((err)=>{
        console.log(err);
        alert('다시 시도해주세요. fdklg')
      })
      
    } else {
      return
    }
  };

  // 생년월일 변경
  const handleBirth = async (e:any, index:number) => {
    const text = e.target.value; 

    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      inputs[index].birth = text.replace(/-/g, ''); 
      setUserInfo(inputs);
    } else {
      if (isNaN(text)) {
        alert('숫자만 입력가능합니다.')
        return;
      }
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

  // // 만료일 변경
  // const handlePassportNum = async (e:any, index:number) => {
  //   const text = e.target.value; 
  //   const inputs = [...userInfo]; 
  //   if (text.includes('-')) {
  //     inputs[index].passportDate = text.replace(/-/g, ''); 
  //     setUserInfo(inputs);
  //   } else {
  //     if (isNaN(text)) {
  //       alert('숫자만 입력가능합니다.')
  //       return;
  //     }
  //     if (text.length === 8) {
  //       const year = text.substring(0, 4);
  //       const month = text.substring(4, 6);
  //       const day = text.substring(6, 8);
  //       const date = `${year}-${month}-${day}`;
  //       inputs[index].passportDate = date;
  //       setUserInfo(inputs);
  //     } else {
  //       inputs[index].passportDate = text;
  //       setUserInfo(inputs);
  //     }
  //   }
  // };

  // 주민번호 변경
  const handleResidentNum = async (e:any, index:number) => {
    const text = e.target.value; 
    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      inputs[index].residentNum = text.replace(/-/g, ''); 
      setUserInfo(inputs);
    } else {
      if (isNaN(text)) {
        alert('숫자만 입력가능합니다.')
        return;
      }
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
      if (isNaN(text)) {
        alert('숫자만 입력가능합니다.')
        return;
      }
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
      {
        props.selectTab === 2 &&
        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSaveTab1}
            >
              <p>저장</p>
            </div>
          </div>
        </section>
      }
      
      <section className='userInfo'>
          <div style={{width:'100%', display:'flex'}}>
            <h1>2. 고객정보</h1>
            <div  className='plusBtnBox'
              onClick={userAdd}
            >
              <FaPlus />
            </div>  
          </div>
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
                    <p style={{width:'3%'}}>{item.userNum}</p>
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
                      marginHorisontal={1}
                    />
                    <input style={{width:'7%'}}  value={item.nameKo} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = [...userInfo]; inputs[index].nameKo = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'5%'}}  value={item.nameLast} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nameLast = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'8%'}}  value={item.nameFirst} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nameFirst = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.birth} className="inputdefault" type="text" placeholder='8자리'
                      onChange={(e)=>{handleBirth(e, index)}} maxLength={8} />
                    <DropdownBox widthmain='5%' height='35px' selectedValue={item.gender}
                      options={[{ value: '남', label: '남' }, { value: '여', label: '여' }]}   marginHorisontal={1}
                      handleChange={(e)=>{const inputs = [...userInfo]; inputs[index].gender = e.target.value; setUserInfo(inputs);}}
                    />
                    <input style={{width:'7%'}}  value={item.nation} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nation = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.passportNum} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].passportNum = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.passportDate} className="inputdefault" type="text"
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].passportDate = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'12%'}}  value={item.residentNum} className="inputdefault" type="text" placeholder='13자리'
                      onChange={(e)=>{handleResidentNum(e, index)}} maxLength={13} />
                    <input style={{width:'12%'}}  value={item.phone} className="inputdefault" type="text" placeholder='11자리'
                      onChange={(e)=>{handlePhone(e, index)}} maxLength={11}/>
                    <div style={{width:'3%', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}
                      className='minus-btn-box' onClick={()=>{userDelete(item.userNum)}} >
                      <CiCircleMinus className='minus-btn'/>
                    </div>
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
              <TitleBox width='120px' text='예약지점'/>
              <DropdownBox
                widthmain='30%'
                height='35px'
                selectedValue={reserveLocation}
                options={[
                  { value: '대구', label: '대구' },
                  { value: '창원', label: '창원' },
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
                widthmain='30%'
                height='35px'
                selectedValue={visitPath}
                options={[
                  { value: '협력업체', label: '협력업체' },
                  { value: '다이렉트', label: '다이렉트' },
                ]}
                handleChange={(e)=>{setVisitPath(e.target.value)}}
              />
               <DropdownBox
                widthmain='30%'
                height='35px'
                selectedValue={visitPathDetail}
                options={
                  visitPath === '협력업체'
                  ?
                  [
                    { value: '선택', label: '선택' },
                    { value: '웨딩쿨', label: '웨딩쿨' },
                    { value: '웨딩세이', label: '웨딩세이' }
                  ]
                  :
                  [
                    { value: '선택', label: '선택' },
                    { value: '온라인', label: '온라인' },
                    { value: '박람회', label: '박람회' }
                  ]
                }
                handleChange={(e)=>{setVisitPathDetail(e.target.value)}}
              />
            </div>
            <div className="coverrow half">
              <TitleBox width='120px' text='추천인'/>
              <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
                value={recommender} onChange={(e)=>{setRecommender(e.target.value)}}/>
            </div>
          </div>

        </section>

        {
          props.selectTab === 1 &&
          <section>
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
              <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
                onClick={handleReserveSaveTab1}
              >
                <p>저장</p>
              </div>
            </div>
          </section>
        }
        

    </div>
  )
}
