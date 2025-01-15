import React, {  useState, useEffect, useRef } from "react";
import './AdminTopBar.scss'
import { DropdownBox } from "../../../boxs/DropdownBox";
import { useSetRecoilState } from "recoil";
import { recoilExchangeRate } from "../../../RecoilStore";
import { useNavigate } from "react-router-dom";


export default function AdminTopBar () {

  let navigate = useNavigate();
  
  const handleLogout = async () => {
    navigate('/');
    alert('로그아웃 되었습니다.')
    sessionStorage.clear();
  };

  const notices = [
    '1. 새로운 업데이트가 적용되었습니다.',
    '2. 점검 일정이 변경되었습니다.',
    '3. 이벤트 참여 안내',
  ];

  const [currentNotice, setCurrentNotice] = useState(0);
  const [fade, setFade] = useState(true); // 애니메이션 상태

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // 사라지는 애니메이션 시작
      setTimeout(() => {
        setCurrentNotice((prev) => (prev + 1) % notices.length);
        setFade(true); // 나타나는 애니메이션 시작
      }, 500); // 애니메이션 지속 시간 (500ms와 동일)
    }, 3000); // 3초마다 공지 변경
    return () => clearInterval(interval);
  }, [notices.length]);


  return (
    <header className="topbar">

      <div className="notice-box">
        <p>공지사항</p>
        <div className="notice-veticalbar"></div>
        <div className={`notice ${fade ? 'slide-in' : 'slide-out'}`}>
          {notices[currentNotice]}
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

