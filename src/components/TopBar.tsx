import React, {  useState, useEffect, useRef } from "react";
import './TopBar.scss'
import { DropdownBox } from "../boxs/DropdownBox";
import { useSetRecoilState } from "recoil";
import { recoilExchangeRate } from "../RecoilStore";


export default function TopBar () {
  
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
        <p>관리자</p> 
        <div className="divider"></div>
        <p>로그아웃</p> 
        <div className="divider"></div>
        <p>사이트메인</p> 
        <div className="divider"></div>
        <p>SMS발송</p> 
       </div>
      </div>
       
    </header>
  );
};

