import React from 'react';
import './footer.scss'
import logo_white from '../images/logo_white.png'
import { useNavigate } from 'react-router-dom';

export default function Footer (props:any) {
  
  let navigate = useNavigate();

  return (
    <footer className='footer'>
        <div className="inner">
          
          <ul className='footer__top-box'>
            <a href='#' target='_blank'>
              <li className='footer__link'>회사소개</li>
            </a>
            <div className='footer__divider'></div>
            <a href='#' target='_blank'>
              <li className='footer__link'>오시는길</li>
            </a>
            <div className='footer__divider'></div>
            <a href='#'>
              <li className='footer__link'>개인정보취급방침</li>
            </a>
            <div className='footer__divider'></div>
            <a href='#'>
              <li className='footer__link'>여행자 약관</li>
            </a>
            {/* <div className='footer__divider'></div>
            <a href='#'>
              <li className='footer__link'>입금안내</li>
            </a> */}
            <div className='footer__divider'></div>
            <div onClick={()=>{
              navigate('/admin');
            }}>
              <li className='footer__link'>관리자</li>
            </div>
          </ul>

          <div className="footer__bottom-box">
            <div className="footer__imagebox">
              <img src={logo_white} />
            </div>
            <div className="footer__textbox">
              <ul>
                <li className='footer__text'>대구 중구 동덕로 36-19 송죽웨딩 4층 실론투어</li>
              </ul>

              <ul>
                <li className='footer__text'>대표전화 : 1522-0047</li>
                <li className='footer__text'>팩스 : 053-428-2214</li>
              </ul>

              <ul className='footer__vertical'>
                <li className='footer__text'>대표: 조동희, 관리책임자: 조수환</li>
                <li className='footer__text'>사업자등록번호: 504-81-67308</li>
              </ul>

              <ul className='footer__vertical'>
                <li className='footer__text'>통신판매업신고번호: 2008-대구중구-1577호</li>
                <li className='footer__text'>COPYRIGHT©Ceylontour. All rights reserved.</li>
              </ul>
            </div>
          </div>

        </div>
     
    </footer>
      
  );
}

 

