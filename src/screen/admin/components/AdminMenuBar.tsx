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
import icon9 from '../images/menu/icon9.png'
import icon10 from '../images/menu/icon10.png'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from "recoil";
import { recoilExchangeRate } from "../../../RecoilStore";
import { DropdownBox } from "../../../boxs/DropdownBox";


export default function AdminMenuBar () {
  
  let navigate = useNavigate();

  const [currentTab, setCurrentTab] = useState(0);
  const [subCurrentTab, setSubCurrentTab] = useState(1);

  const [date, setDate] = useState('');
  const [base, setBase] = useState('USD');
  const [KRW, setKRW] = useState('');
  const setRecoilExchangeRateCopy = useSetRecoilState(recoilExchangeRate);

  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      const data = await response.json();
      setDate(data.date);
      setKRW(data.rates.KRW);
      setRecoilExchangeRateCopy([{base:data.base, KRW:data.rates.KRW}]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [base])

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
          {
            currentTab === 1 &&
            <div className="sub-box">
              <RowBox num={1} text='스케줄관리' link="/admin/schedule"/>
              <RowBox num={2} text='고객피드백 리스트' link="/admin/schedule/feedback"/>
            </div>
          }

          <MenuBox num={2} text='상담/견적관리' icon={icon2} link="/admin/counsel"/>
          {
            currentTab === 2 &&
            <div className="sub-box">
              <RowBox num={1} text='New DB' link="/admin/counsel"/>
              <RowBox num={2} text='견적 DB' link="/admin/counsel/estimatelist"/>
              <RowBox num={3} text='방문 DB' link="/admin/counsel/counsellist"/>
              <RowBox num={4} text='예약전환 DB' link="/admin/counsel/switchlist"/>
              <RowBox num={5} text='상담종료 DB' link="/admin/counsel/closelist"/>
            </div>
          }

          <MenuBox num={3} text='예약진행관리' icon={icon3} link="/admin/reserve"/>
          {
            currentTab === 3 &&
            <div className="sub-box">
              <RowBox num={1} text='예약리스트' link="/admin/reserve"/>
              <RowBox num={2} text='수배현황' link="/admin/reserve/arrangestate"/>
              <RowBox num={3} text='수배대기현황' link="/admin/reserve/arrangewaiting"/>
              <RowBox num={4} text='고객입금내역' link="/admin/reserve/depositlist"/>
              <RowBox num={5} text='취소환불현황' link="/admin/reserve/cancelrefund"/>
            </div>
          }

          <MenuBox num={4} text='송출관리' icon={icon4} link="/admin/sent"/>
          {
            currentTab === 4 &&
            <div className="sub-box">
              <RowBox num={1} text='송출리스트' link="/admin/sent"/>
              <RowBox num={2} text='안내문발송확인' link="/admin/sent/noticeconfirm"/>
              <RowBox num={3} text='여행자보험발송' link="/admin/sent/tourinsurance"/>
              <RowBox num={4} text='지상비출금내역' link="/admin/sent/costwithdrawal"/>
              <RowBox num={5} text='고객현지콜내역' link="/admin/sent/userlocalcall"/>
            </div>
          }
          <MenuBox num={5} text='회원관리' icon={icon5} link="/admin/user"/>
          {
            currentTab === 5 &&
            <div className="sub-box">
              <RowBox num={1} text='신규회원' link="/admin/user"/>
              <RowBox num={2} text='실버' link="/admin/user/silveruser"/>
              <RowBox num={3} text='골드' link="/admin/user/golduser"/>
              <RowBox num={4} text='VIP' link="/admin/user/vipuser"/>
              <RowBox num={5} text='VVIP' link="/admin/user/vvipuser"/>
              <RowBox num={6} text='탈퇴회원' link="/admin/user/leaveuser"/>
              <RowBox num={7} text='적립금/혜택관리' link="/admin/user/benefit"/>
              <RowBox num={8} text='선물관리' link="/admin/user/gift"/>
              <RowBox num={9} text='공지사항발송' link="/admin/user/notification"/>
            </div>
          }

          <MenuBox num={6} text='휴양지상품' icon={icon6} link="/admin/productsrest"/>
          {
            currentTab === 6 &&
            <div className="sub-box">
              <RowBox num={1} text='도시&항공관리' link="/admin/productsrest"/>
              <RowBox num={2} text='호텔&요금관리' link="/admin/productsrest/hotelregister"/>
              <RowBox num={3} text='일정표관리' link="/admin/productsrest/schedule"/>
              <RowBox num={4} text='세부일정관리' link="/admin/productsrest/detailschedule"/>
              <RowBox num={5} text='고객발송일정표' link="/admin/productsrest/usersentschedule"/>
              {/* <RowBox num={5} text='일정박스관리' link="/admin/productsrest/schedulebox"/> */}
            </div>
          }

          <MenuBox num={7} text='관광지상품' icon={icon7} link="/admin/productstour"/>
          {
            currentTab === 7 &&
            <div className="sub-box">
              <RowBox num={1} text='도시&항공&교통관리' link="/admin/productstour"/>
              <RowBox num={2} text='여행일정관리' link="/admin/productstour/tourschedule"/>
              <RowBox num={3} text='호텔관리' link="/admin/productstour/tourhotelregister"/>
              <RowBox num={4} text='선택일정/상품관리' link="/admin/productstour/detailschedule"/>
              <RowBox num={5} text='고객발송일정표' link="/admin/productstour/usersentschedule"/>
              {/* <RowBox num={5} text='일정박스관리' link="/admin/productstour/schedulebox"/> */}
            </div>
          }

          <MenuBox num={8} text='랜드사관리' icon={icon8} link="/admin/landcompany"/>
          {
            currentTab === 8 &&
            <div className="sub-box">
              <RowBox num={1} text='랜드사리스트' link="/admin/landcompany"/>
              <RowBox num={2} text='수배리스트' link="/admin/landcompany/arrangelist"/>
              <RowBox num={3} text='수배대기리스트' link="/admin/landcompany/arrangewaiting"/>
              <RowBox num={4} text='지상비 입금내역' link="/admin/landcompany/costdeposit"/>
              <RowBox num={5} text='이슈관리' link="/admin/landcompany/issues"/>
            </div>
          }

          <MenuBox num={9} text='업무메뉴얼' icon={icon8} link="/admin/menual"/>
          {
            currentTab === 9 &&
            <div className="sub-box">
              <RowBox num={1} text='출퇴근/근태 관리' link="/admin/menual"/>
              <RowBox num={2} text='직원간 메뉴얼' link="/admin/menual/staffmenual"/>
              <RowBox num={3} text='고객응대 메뉴얼' link="/admin/menual/costomerreception"/>
              <RowBox num={4} text='업체응대 메뉴얼' link="/admin/menual/companyreception"/>
              <RowBox num={5} text='사내문서' link="/admin/menual/internaldocument"/>
            </div>
          }

          <MenuBox num={10} text='운영현황' icon={icon9} link="/admin/manage"/>
          {
            currentTab === 10 &&
            <div className="sub-box">
              <RowBox num={1} text='예약-지사/직원' link="/admin/manage"/>
              <RowBox num={2} text='예약-예약경로' link="/admin/manage/reservepath"/>
              <RowBox num={3} text='예약-예약분석' link="/admin/manage/reservecalculate"/>
              <RowBox num={4} text='예약-송출현황' link="/admin/manage/reservesents"/>
              <RowBox num={5} text='정산-지사/직원' link="/admin/manage/adjuststaff"/>
              <RowBox num={6} text='정산-예약경로' link="/admin/manage/adjustpath"/>
              <RowBox num={7} text='정산-랜드사정산' link="/admin/manage/adjustlc"/>
              <RowBox num={8} text='업체 리베이트' link="/admin/manage/rebate"/>
              <RowBox num={9} text='인센관리' link="/admin/manage/incentive"/>
            </div>
          }

          <MenuBox num={11} text='시스템관리' icon={icon10} link="/admin/system"/>
          {
            currentTab === 11 &&
            <div className="sub-box">
              <RowBox num={1} text='권한관리' link="/admin/system"/>
              <RowBox num={2} text='정보관리' link="/admin/system/infomation"/>
              <RowBox num={3} text='로그인내역' link="/admin/system/loginhistory"/>
              <RowBox num={4} text='IP관리' link="/admin/system/iplist"/>
            </div>
          }


   
        </div>
      </div>

      <div className="exchange-rate">
        <div className="exchange-rate-box">
          <DropdownBox
            widthmain='60%' height='35px' 
            selectedValue={base}
            options={[
              { value: 'USD', label: '미국 1 USD' },
              { value: 'EUR', label: '유럽 1 EUR' },
              { value: 'JPY', label: '일본 1 JYP' },
              { value: 'THB', label: '태국 1 THB' },
            ]}   
            marginHorisontal={10}
            handleChange={(e)=>{setBase(e.target.value);}}
          />
          <div className="bottom-krwbox">
            <p>= {KRW}원</p>
          </div>
        </div>
      </div>
       
    </header>
    
  );
};

