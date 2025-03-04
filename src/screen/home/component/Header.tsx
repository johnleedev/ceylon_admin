import React, { useState, useEffect } from 'react';
import './Header.scss';
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import logo_white from '../images/logo_white.png'
import logo_blue from '../images/logo_blue.png'
import person from '../images/person.png'

const Header: React.FC = () => {
  
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const menus = [
    { title: "휴양지", url:"/products/restmain", links: [] },
    { title: "유럽", url:"/products/tourmain", links: [] },
    { title: "여행지 미리가기", url:"/", links: [] },
    { title: "여행후기", url:"/", links: [] },
    // { title: "견적서만들기", url:"/estimate", links: [] },
    // { title: "견적서고객용", url:"/user", links: [] },
    { title: "관리자", url: (sessionStorage.getItem('userName') === null || sessionStorage.getItem('userName') === undefined) ? "/admin" : "/admin/schedule", links: [] }
  ];

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<{ [key: number]: boolean }>({});
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  const toggleMobileMenu = (index: number) => {
      setMobileMenuOpen((prevState) => ({
          ...prevState,
          [index]: !prevState[index],
      }));
  };

  useEffect(() => {
		const copy = sessionStorage.getItem('userName');
    if (copy !== null && copy !== undefined) {
      setIsLogin(true);
    }
	}, []);  

  const handleLogout = async () => {
    sessionStorage.clear();
    alert('로그아웃 되었습니다.')
    navigate('/');
    window.location.reload();
  };

  

  return (
    <div className={`header ${activeIndex !== null ? 'on' : ''}`}>
      <div className="header-content">
        <div className="container header-content-container">
            
            <div className={`header-hamburger_menu ${menuOpen ? 'header-hamburger_menu--open' : ''}`}>
              <div className="header-hamburger_icon" onClick={toggleMenu}></div>
              <div className="header-mobile_menu">
                  <div className="mobile_menu-inner">
                      {
                        isLogin 
                        ?
                        <div className="mobile_menu-top">
                          <span className="mobile_menu-announce">{sessionStorage.getItem('userName')}님 환영합니다.</span>
                          <div className="mobile_menu-button_wrap">
                              <div className="header-button" onClick={handleLogout}>로그아웃</div>
                              <div className="header-button" onClick={()=>{navigate("/mypage"); toggleMenu();}}>마이페이지</div>
                          </div>
                        </div>
                        :
                        <div className="mobile_menu-top">
                          <span className="mobile_menu-announce">로그인해 주세요</span>
                          <div className="mobile_menu-button_wrap">
                              {/* <div className="header-button" onClick={()=>{navigate("/login"); toggleMenu();}}>로그인</div>
                              <div className="header-button" onClick={()=>{navigate("/logister"); toggleMenu();}}>회원가입</div> */}
                          </div>
                        </div>
                      }
                      
                      <div className="mobile_menu-list">
                          {
                            menus.map((item:any, index:any) => (
                              <div className={`mobile_menu-item ${mobileMenuOpen[index] ? 'mobile_menu-item--open' : ''}`} 
                                key={index} 
                                onClick={() => toggleMobileMenu(index)}
                                >
                                  <div className="mobile_menu-item_inner">
                                      <div className={`mobile_menu-face ${mobileMenuOpen[index] ? 'mobile_menu-face--open' : ''}`}>
                                          <div className="mobile_menu-face_text" onClick={()=>{navigate(item.url); toggleMenu();}}>{item.title}</div>
                                          <div className="mobile_menu-face_icon"></div>
                                      </div>
                                      {/* <div className="mobile_menu-body">
                                          {
                                            item.links.map((subItem:any, subIndex:any) => (
                                              <div className="mobile_menu-part" onClick={()=>{navigate(subItem.subUrl); toggleMenu();}} key={subIndex}>{subItem.title}</div>
                                          ))}
                                      </div> */}
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
            </div>

            <div className="header-logo" 
              onClick={()=>{navigate('/')}}
            >
              <img src={activeIndex !== null ? logo_blue : logo_white} />
            </div>

            <div className="header-menu">
              {
                menus.map((item:any, index:any) => (
                  <div className={`menu-item ${activeIndex === index ? 'on' : ''}`} key={index}
                    onMouseEnter={()=>{setActiveIndex(index)}}
                    onMouseLeave={()=>{setActiveIndex(null)}}
                  >
                      <div className={`menu-face ${activeIndex !== null ? 'on' : ''}`} onClick={()=>{navigate(item.url)}}>{item.title}</div>
                      <div className={`menu-face2 ${activeIndex === index ? 'on' : ''}`}> </div>
                  </div>
                ))
              }
              <div style={{width:'2px', height:'15px', margin:'0 15px', backgroundColor: activeIndex !== null ? '#333' : '#fff'}}></div>
              {
                  isLogin 
                  ?
                  <div className={`header-button_wrap ${activeIndex !== null ? 'on' : ''}`}>
                    <div className="header-button"
                      // onClick={handleLogout}
                    >로그아웃</div>
                    <div className="header-button"
                      // onClick={()=>{
                      //   stOrFa === 'student' 
                      //   ? navigate('/mypage')
                      //   : navigate('/mypage/faculty')
                      // }}
                    >마이페이지</div>
                  </div>
                  :
                  <div className={`header-button_wrap ${activeIndex !== null ? 'on' : ''}`}>
                    <div className="header-button"
                      // onClick={()=>{navigate('/login');}}
                    >로그인</div>
                    <div className="header-button" 
                      // onClick={()=>{navigate('/logister');}}
                    >회원가입</div>
                  </div>
                }
            </div>

            <div className={`header-hamburger_menu ${menuOpen ? 'header-hamburger_menu--open' : ''}`}>
              <div className="header-person_icon" onClick={toggleMenu}>
                <img src={person} />
              </div>
              <div className="header-mobile_menu">
                  <div className="mobile_menu-inner">
                      {
                        isLogin 
                        ?
                        <div className="mobile_menu-top">
                          <span className="mobile_menu-announce">{sessionStorage.getItem('userName')}님 환영합니다.</span>
                          <div className="mobile_menu-button_wrap">
                              <div className="header-button" onClick={handleLogout}>로그아웃</div>
                              <div className="header-button" onClick={()=>{navigate("/mypage"); toggleMenu();}}>마이페이지</div>
                          </div>
                        </div>
                        :
                        <div className="mobile_menu-top">
                          <span className="mobile_menu-announce">로그인해 주세요</span>
                          <div className="mobile_menu-button_wrap">
                              {/* <div className="header-button" onClick={()=>{navigate("/login"); toggleMenu();}}>로그인</div>
                              <div className="header-button" onClick={()=>{navigate("/logister"); toggleMenu();}}>회원가입</div> */}
                          </div>
                        </div>
                      }
                      
                      <div className="mobile_menu-list">
                          {
                            menus.map((item:any, index:any) => (
                              <div className={`mobile_menu-item ${mobileMenuOpen[index] ? 'mobile_menu-item--open' : ''}`} 
                                key={index} onClick={() => toggleMobileMenu(index)}>
                                  <div className="mobile_menu-item_inner">
                                      <div className={`mobile_menu-face ${mobileMenuOpen[index] ? 'mobile_menu-face--open' : ''}`}>
                                          <div className="mobile_menu-face_text" onClick={()=>{navigate(item.url); toggleMenu();}}>{item.title}</div>
                                          <div className="mobile_menu-face_icon"></div>
                                      </div>
                                      <div className="mobile_menu-body">
                                          {
                                            item.links.map((subItem:any, subIndex:any) => (
                                              <div className="mobile_menu-part" onClick={()=>{
                                                navigate(subItem.subUrl); toggleMenu();
                                              }} key={subIndex}>{subItem.title}</div>
                                          ))}
                                      </div>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
