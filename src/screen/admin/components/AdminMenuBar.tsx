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
              <RowBox num={2} text='고객입금내역' link="/admin/reserve/depositlist"/>
              <RowBox num={3} text='수배현황' link="/admin/reserve/arrangestate"/>
              <RowBox num={4} text='지상비출금현황' link="/admin/reserve/withdrawstate"/>
              {/* <RowBox num={5} text='고객안내문 발송' link="/admin/reserve/notification"/> */}
              <RowBox num={5} text='취소환불현황' link="/admin/reserve/cancelrefund"/>
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

          <MenuBox num={5} text='휴양지관리' icon={icon5} link="/admin/productsrest"/>
          {
            currentTab === 5 &&
            <div className="sub-box">
              <RowBox num={1} text='도시&항공관리' link="/admin/productsrest"/>
              <RowBox num={2} text='호텔&요금관리' link="/admin/productsrest/hotelregister"/>
              <RowBox num={3} text='여행일정관리' link="/admin/productsrest/schedule"/>
              <RowBox num={4} text='여행지상품관리' link="/admin/productsrest/tourproduct"/>
              <RowBox num={5} text='일정박스관리' link="/admin/productsrest/schedulebox"/>
              <RowBox num={6} text='랜드사관리' link="/admin/productsrest/landcompany"/>
            </div>
          }

          <MenuBox num={6} text='관광지관리' icon={icon5} link="/admin/productstour"/>
          {
            currentTab === 6 &&
            <div className="sub-box">
              <RowBox num={1} text='도시&항공&교통관리' link="/admin/productstour"/>
              <RowBox num={2} text='여행일정관리' link="/admin/productstour/tourschedule"/>
              <RowBox num={3} text='호텔관리' link="/admin/productstour/tourhotelregister"/>
              <RowBox num={4} text='선택일정관리' link="/admin/productstour/selectschedule"/>
              <RowBox num={5} text='일정박스관리' link="/admin/productstour/schedulebox"/>
              <RowBox num={6} text='랜드사관리' link="/admin/productstour/landcompany"/>
            </div>
          }

          <MenuBox num={7} text='업무메뉴얼' icon={icon6} link="/admin/menual"/>
          {
            currentTab === 7 &&
            <div className="sub-box">
              <RowBox num={1} text='예약진행프로세스' link="/admin/menual"/>
              <RowBox num={2} text='고객응대프로세스' link="/admin/menual/receptionprocess"/>
              <RowBox num={3} text='사내문서' link="/admin/menual/companydocument"/>
              <RowBox num={4} text='내규' link="/admin/menual/internalrule"/>
            </div>
          }

          <MenuBox num={8} text='운영현황' icon={icon7} link="/admin/state"/>
          {
            currentTab === 8 &&
            <div className="sub-box">
              <RowBox num={1} text='예약현황' link="/admin/state"/>
              <RowBox num={2} text='출발현황' link="/admin/state/departstate"/>
              <RowBox num={3} text='정산' link="/admin/state/calculate"/>
            </div>
          }

          <MenuBox num={9} text='시스템관리' icon={icon8} link="/admin/system"/>
          {
            currentTab === 9 &&
            <div className="sub-box">
              <RowBox num={1} text='권한관리' link="/admin/system"/>
              <RowBox num={2} text='임직원관리' link="/admin/system/executive"/>
              <RowBox num={3} text='IP관리' link="/admin/system/iplist"/>
              <RowBox num={4} text='로그인내역' link="/admin/system/loginhistory"/>
            </div>
          }


   
        </div>
      </div>

      <div className="exchange-rate">
        <div className="exchange-rate-box">
          <div className="top-datebox">
            <p>{date} 기준:</p>
          </div>
          <DropdownBox
            widthmain='100%' height='35px' 
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
            <p>= KRW {KRW} 원</p>
          </div>
        </div>
      </div>
       
    </header>
    
  );
};

