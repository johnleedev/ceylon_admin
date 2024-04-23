import React, {  useState, useEffect, useRef } from "react";
import './MenuBar.scss'
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


export default function MenuBar () {
  
  let navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(1);
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
        setCurrentTab(num); 
        setSubCurrentTab(1);
        navigate(`${link}`);
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
              navigate('/');
            }}
          >
            <img src={logo} />
          </div>
          
          <MenuBox num={1} text='스케줄관리' icon={icon1} link="/schedule"/>

          <MenuBox num={2} text='상담/견적관리' icon={icon2} link="/counsel"/>
          {
            currentTab === 2 &&
            <div className="sub-box">
              <RowBox num={1} text='온라인문의' link="/counsel"/>
              <RowBox num={2} text='상담리스트' link="/counsel/counsellist"/>
              <RowBox num={3} text='견적리스트' link="/counsel/estimatelist"/>
              <RowBox num={4} text='상담종료' link="/counsel/closelist"/>
              <RowBox num={5} text='예약전환' link="/counsel/switch"/>
              <RowBox num={6} text='전체리스트' link="/counsel/allList"/>
            </div>
          }

          <MenuBox num={3} text='예약진행관리' icon={icon3} link="/reserve"/>
          {
            currentTab === 3 &&
            <div className="sub-box">
              <RowBox num={1} text='예약리스트' link="/reserve"/>
              <RowBox num={2} text='수배현황' link="/reserve/arrange"/>
              <RowBox num={3} text='입출금현황' link="/reserve/moneystate"/>
              <RowBox num={4} text='공지사항 발송' link="/reserve/notification"/>
              <RowBox num={5} text='취소환불현황' link="/reserve/cancelrefund"/>
            </div>
          }

          <MenuBox num={4} text='회원관리' icon={icon4} link="/user"/>
          {
            currentTab === 4 &&
            <div className="sub-box">
              <RowBox num={1} text='전체회원' link="/user"/>
              <RowBox num={2} text='신규화원' link="/user/newuser"/>
              <RowBox num={3} text='실버' link="/user/silveruser"/>
              <RowBox num={4} text='골드' link="/user/golduser"/>
              <RowBox num={5} text='VIP' link="/user/vipuser"/>
              <RowBox num={6} text='VVIP' link="/user/vvipuser"/>
              <RowBox num={7} text='탈퇴회원' link="/user/leaveuser"/>
              <RowBox num={8} text='혜택관리' link="/user/benefit"/>
              <RowBox num={9} text='공지사항발송' link="/user/notification"/>
            </div>
          }

          <MenuBox num={5} text='상품관리' icon={icon5} link="javascript:void(0)"/>
          {
            currentTab === 5 &&
            <div className="sub-box">
              <RowBox num={1} text='여행지등록' link="javascript:void(0)"/>
              <RowBox num={2} text='호텔등록' link="javascript:void(0)"/>
              <RowBox num={3} text='요금등록' link="javascript:void(0)"/>
              <RowBox num={4} text='일정등록' link="javascript:void(0)"/>
            </div>
          }

          <MenuBox num={6} text='업무메뉴얼' icon={icon6} link="javascript:void(0)"/>
          {
            currentTab === 6 &&
            <div className="sub-box">
              <RowBox num={1} text='예약진행프로세스' link="javascript:void(0)"/>
              <RowBox num={2} text='고객응대프로세스' link="javascript:void(0)"/>
              <RowBox num={3} text='사내문서' link="javascript:void(0)"/>
              <RowBox num={4} text='내규' link="javascript:void(0)"/>
            </div>
          }

          <MenuBox num={7} text='운영현황' icon={icon7} link="javascript:void(0)"/>
          {
            currentTab === 7 &&
            <div className="sub-box">
              <RowBox num={1} text='예약현황' link="javascript:void(0)"/>
              <RowBox num={2} text='출발현황' link="javascript:void(0)"/>
              <RowBox num={3} text='정산' link="javascript:void(0)"/>
            </div>
          }

          <MenuBox num={8} text='시스템관리' icon={icon8} link="javascript:void(0)"/>
          {
            currentTab === 8 &&
            <div className="sub-box">
              <RowBox num={1} text='권한관리' link="javascript:void(0)"/>
              <RowBox num={2} text='임직원관리' link="javascript:void(0)"/>
              <RowBox num={3} text='IP관리' link="javascript:void(0)"/>
              <RowBox num={4} text='로그인내역' link="javascript:void(0)"/>
            </div>
          }


   
        </div>
      </div>
       
    </header>
    
  );
};

