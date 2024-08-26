import React, {  useState, useEffect, useRef } from "react";
import './AdminTopBar.scss'
import { DropdownBox } from "../../../boxs/DropdownBox";
import { useSetRecoilState } from "recoil";
import { recoilExchangeRate } from "../../../RecoilStore";
import { useNavigate } from "react-router-dom";


export default function AdminTopBar () {

  let navigate = useNavigate();
  
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

  const handleLogout = async () => {
    navigate('/');
    alert('로그아웃 되었습니다.')
    sessionStorage.clear();
  };


  return (
    <header className="topbar">

      <div className="exchange-rate">
        <div className="exchange-rate-box">
          <div style={{width:'35%'}}>
            <p>{date} 기준:</p>
          </div>
          <DropdownBox 
            widthmain='30%' height='35px' 
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
          <div style={{width:'35%'}}>
            <p>= KRW {KRW} 원</p>
          </div>
        </div>
      </div>

      <div className="menubtn-box">
       <div className="menubtn">
        <p onClick={()=>{navigate('/admin');}}
        >관리자</p> 
        <div className="divider"></div>
        {
          (sessionStorage.getItem('userName') === null || sessionStorage.getItem('userName') === undefined)
          ? <p>로그인</p> 
          : <p onClick={handleLogout}>로그아웃</p> 
        }
        
        <div className="divider"></div>
        <p onClick={()=>{navigate('/');}}
        >사이트메인</p> 
       </div>
      </div>
       
    </header>
  );
};

