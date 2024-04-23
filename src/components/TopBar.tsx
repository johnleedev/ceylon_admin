import React, {  useState, useEffect, useRef } from "react";
import './TopBar.scss'
import { FaAngleDown } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


export default function TopBar () {
  
  let navigate = useNavigate();

  return (
    <header className="topbar">

      <div className="exchange-rate">
       <div className="exchange-rate-box">
        <p>미국 1USD = 1,284.30원</p>
        <FaAngleDown />
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

