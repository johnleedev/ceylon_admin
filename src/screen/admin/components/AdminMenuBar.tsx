import React, {  useState, useEffect, useRef } from "react";
import './AdminMenuBar.scss'
import logo from '../images/logo.png'
import icon1 from '../images/menu/icon1.png'
import icon2 from '../images/menu/icon2.png'
import icon3 from '../images/menu/icon3.png'
import icon4 from '../images/menu/icon4.png'
import icon5 from '../images/menu/icon5.png'
import icon6 from '../images/menu/icon6.png'
import icon7 from '../images/menu/icon7.png'
import icon8 from '../images/menu/icon8.png'
import { useNavigate } from 'react-router-dom';


export default function AdminMenuBar () {
  
  let navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);
  const [subCurrentTab, setSubCurrentTab] = useState(1);

  interface MenuBoxProps {
    num: number;
    text: string;
    icon : string;
    link : string
  }

  const MenuBox: React.FC<MenuBoxProps> = ({ num, text, icon, link }) => (
    <div 
      className="box" 
      style={{backgroundColor : currentTab === num ? '#3cb2ef' : ''}}
      onClick={()=>{
        const copy = sessionStorage.getItem('userName');
        if (copy === null || copy === undefined) {
          alert('로그인이 필요합니다.')
        } else {
          setCurrentTab(num); 
          setSubCurrentTab(1);
          navigate(`${link}`);
          window.scrollTo(0, 0);
        }
        
      }}
    >
      <img src={icon} />
      <p>{text}</p>
    </div>
  )

  interface RowBoxProps {
    num: number;
    text: string;
    link : string
  }
  
  const RowBox: React.FC<RowBoxProps> = ({ num, text, link }) => (
    <div className="box-row"
      onClick={()=>{
        setSubCurrentTab(num);
        navigate(`${link}`);
        window.scrollTo(0, 0);
      }}
    >
      <div className="selectrow" 
        style={{backgroundColor : subCurrentTab === num ? '#3cb2ef' : ''}}
      ></div>
      <p style={{color: subCurrentTab === num ? '#fff' : '#BDBDBD'}}>{text}</p>
    </div>
  )

 

  return (
    
    <header className="menubar">

      <div className="mainmenu">
        <div className="inner">
        
          <div className="mainbox"
            onClick={()=>{
              navigate('/admin');
            }}
          >
            <img src={logo} />
          </div>
          
          <MenuBox num={1} text='스케줄관리' icon={icon1} link="/admin/schedule"/>

          <MenuBox num={2} text='상담/견적관리' icon={icon2} link="/admin/counsel"/>
          {
            currentTab === 2 &&
            <div className="sub-box">
              <RowBox num={1} text='온라인DB' link="/admin/counsel"/>
              <RowBox num={2} text='상담리스트' link="/admin/counsel/counsellist"/>
              <RowBox num={3} text='견적리스트' link="/admin/counsel/estimatelist"/>
              <RowBox num={4} text='상담종료' link="/admin/counsel/closelist"/>
              <RowBox num={5} text='예약전환' link="/admin/counsel/switch"/>
              <RowBox num={6} text='전체리스트' link="/admin/counsel/allList"/>
            </div>
          }

          <MenuBox num={3} text='예약진행관리' icon={icon3} link="/admin/reserve"/>
          {
            currentTab === 3 &&
            <div className="sub-box">
              <RowBox num={1} text='예약리스트' link="/admin/reserve"/>
              <RowBox num={2} text='수배현황' link="/admin/reserve/arrange"/>
              <RowBox num={3} text='입출금현황' link="/admin/reserve/moneystate"/>
              <RowBox num={4} text='취소환불현황' link="/admin/reserve/cancelrefund"/>
              <RowBox num={5} text='공지사항 발송' link="/admin/reserve/notification"/>
            </div>
          }

          <MenuBox num={4} text='회원관리' icon={icon4} link="/admin/user"/>
          {
            currentTab === 4 &&
            <div className="sub-box">
              <RowBox num={1} text='전체회원' link="/admin/user"/>
              <RowBox num={2} text='신규회원' link="/admin/user/newuser"/>
              <RowBox num={3} text='실버' link="/admin/user/silveruser"/>
              <RowBox num={4} text='골드' link="/admin/user/golduser"/>
              <RowBox num={5} text='VIP' link="/admin/user/vipuser"/>
              <RowBox num={6} text='VVIP' link="/admin/user/vvipuser"/>
              <RowBox num={7} text='탈퇴회원' link="/admin/user/leaveuser"/>
              <RowBox num={8} text='혜택관리' link="/admin/user/benefit"/>
              <RowBox num={9} text='공지사항발송' link="/admin/user/notification"/>
            </div>
          }

          <MenuBox num={5} text='상품관리' icon={icon5} link="/admin/products"/>
          {
            currentTab === 5 &&
            <div className="sub-box">
              <RowBox num={1} text='여행지등록' link="/admin/products"/>
              <RowBox num={2} text='호텔관리' link="/admin/products/hotelregister"/>
              <RowBox num={3} text='일정관리' link="/admin/products/schedule"/>
              <RowBox num={4} text='선택일정관리' link="/admin/products/selectschedule"/>
              <RowBox num={5} text='랜드사관리' link="/admin/products/landcompany"/>
            </div>
          }

          <MenuBox num={6} text='업무메뉴얼' icon={icon6} link="/admin/menual"/>
          {
            currentTab === 6 &&
            <div className="sub-box">
              <RowBox num={1} text='예약진행프로세스' link="/admin/menual"/>
              <RowBox num={2} text='고객응대프로세스' link="/admin/menual/receptionprocess"/>
              <RowBox num={3} text='사내문서' link="/admin/menual/companydocument"/>
              <RowBox num={4} text='내규' link="/admin/menual/internalrule"/>
            </div>
          }

          <MenuBox num={7} text='운영현황' icon={icon7} link="/admin/state"/>
          {
            currentTab === 7 &&
            <div className="sub-box">
              <RowBox num={1} text='예약현황' link="/admin/state"/>
              <RowBox num={2} text='출발현황' link="/admin/state/departstate"/>
              <RowBox num={3} text='정산' link="/admin/state/calculate"/>
            </div>
          }

          <MenuBox num={8} text='시스템관리' icon={icon8} link="/admin/system"/>
          {
            currentTab === 8 &&
            <div className="sub-box">
              <RowBox num={1} text='권한관리' link="/admin/system"/>
              <RowBox num={2} text='임직원관리' link="/admin/system/executive"/>
              <RowBox num={3} text='IP관리' link="/admin/system/iplist"/>
              <RowBox num={4} text='로그인내역' link="/admin/system/loginhistory"/>
            </div>
          }


   
        </div>
      </div>
       
    </header>
    
  );
};
