import React, { useState } from 'react'
import "./NationCustom.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaRegCircle } from "react-icons/fa";
import sampleImage1 from "../../images/hotels/hotel_01.png"
import sampleImage2 from "../../images/hotels/hotel_02.png"
import sampleImage4 from "../../images/hotels/hotel_04.png"
import { IoIosArrowBack } from "react-icons/io";
import { DateHomepage } from '../../common/DateHomapage';
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { DropdownHomepage } from '../../common/DropdownHomepage';
import RecommendSchedule from '../CommonCustomTemplate/RecommendSchedule';
import MadeMySchedule from '../CommonCustomTemplate/MadeMySchedule';
import ProductImageData from "../../common/ProductImageData";

interface ScheduleProps {
  id : string;
  day : string;
  breakfast :string;
  lunch:string;
  dinner :string;
  hotel:string;
  score:string;
  scheduleDetail: ScheduleDetailProps[];
}

interface ScheduleDetailProps {
  id : string;
  isViaSort: string;
  sort: string;
  nation : string;
  city : string;
  location: string;
  locationDetail : {
    subLocation : string;
    subLocationDetail : {
      locationTitle : string;
      locationContent : string;
      postImage : string;
    }[]
  }[]
}

export default function NationCustomMade (props:any) {
  
  let navigate = useNavigate();
  const location = useLocation();
  const scheduleList = location.state;

  const [tourPeriodStart, setTourPeriodStart] = useState('');
  const [tourPeriodEnd, setTourPeriodEnd] = useState('');
  const [tourPersonNum, setTourPersonNum] = useState(2);

  const [selecCustom, setSelecCustom] = useState('일정변경');

  // 호텔커스텀 -------------------------------------------------------------------------------------------------------
  const [selectOthersHotel, setSelectOtherHotel] = useState([
    {
      nation : '파리', dayNight:"1박", subMenu: ["기본셋팅", "에펠뷰", "상제리제거리"], isSelectSubMenu: "기본셋팅",
      content : [{image:ProductImageData.prijieng, hotelName:"파리지엥 쉐라톤", isSelected:false },
        {image:ProductImageData.prijieng1, hotelName:"파드마 리조트", isSelected:false },
        {image:ProductImageData.prijieng2, hotelName:"아리아 리조트", isSelected:false }]
    },
    {
      nation : '로마', dayNight:"1박", subMenu: ["기본셋팅", "시내중심", "바티칸주변"], isSelectSubMenu: "기본셋팅",
      content : [{image:ProductImageData.prijieng1, hotelName:"보나셀라", isSelected:false },
        {image:ProductImageData.prijieng2, hotelName:"파드마 리조트", isSelected:false },
        {image:ProductImageData.prijieng, hotelName:"아리아 리조트", isSelected:false }]
    },
    {
      nation : '베니스', dayNight:"1박", subMenu: ["기본셋팅", "중심부", "광장부근"], isSelectSubMenu: "기본셋팅",
      content : [{image:ProductImageData.prijieng2, hotelName:"본조르노", isSelected:false },
        {image:ProductImageData.prijieng, hotelName:"파드마 리조트", isSelected:false },
        {image:ProductImageData.prijieng1, hotelName:"아리아 리조트", isSelected:false }]
    }    
  ]);

  // 일정커스텀 -------------------------------------------------------------------------------------------------------
  const [selectScheduleType, setSelectScheduleType] = useState('추천일정');
  const [selectScheduleDay, setSelectScheduleDay] = useState(1);
  const [selectScheduleDayBtnList, setSelectScheduleDayBtnList] = useState<{ day: number; isSelected: boolean }[]>(
    scheduleList.map((_:any, index:any) => ({ day: index + 1 }))
  );

  // 오른쪽 커스텀 박스 ------------------------------------------------------------------------------------------------------
  const [selectCustomType, setSelectCustomType] = useState('차량/가이드');
  const [selectCustomContent, setSelectCustomContent] = useState([
    {image:sampleImage1, customName:"스쿠버다이빙", isSelected:false, cost: "50,000", personNum:1 },
    {image:sampleImage2, customName:"스쿠버다이빙", isSelected:false, cost: "50,000", personNum:1 },
    {image:sampleImage4, customName:"스쿠버다이빙", isSelected:false, cost: "50,000", personNum:1 },
  ]);
   
  return (
    <div className='nation-custom-order-cover'>
      
      <div className='menucover'></div>
     
      <div className="inner">
        <section>
          <div className="custom-order-header">
            <IoIosArrowBack className='custom-header-back-icon'
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate(`/products/nationdetail`);
              }}
            />
            <h1>추천일정 커스텀 메이드</h1>
          </div>
          <div className="bottombar"></div>
        </section>

        {/* // 달력 인원 박스 ---------------------------------------------------- */}

        <section>
          <div className="custom-order-date-cover">
            <div className="custom-order-date-box">
              <div className="date-box-left-icon">
                <CiCalendar className='calender-icon'/>
              </div>
              <div className="date-box-right-content">
                <div className="main-text">여행예정일</div>
                <div className="date-box">
                  <DateHomepage
                    dateStart={tourPeriodStart} dateEnd={tourPeriodEnd}
                    setSelectStartDate={(e:any)=>{ 
                      setTourPeriodStart(e);
                      setTourPeriodEnd(e);
                    }} 
                    setSelectEndDate={(e:any)=>{ 
                      setTourPeriodStart(e);
                      setTourPeriodEnd(e);
                    }} 
                  />
                </div>
              </div>
            </div>
            <div className="custom-order-date-box">
              <div className="date-box-left-icon">
                <GoPerson className='calender-icon'/>
              </div>
              <div className="date-box-right-content">
                <div className="main-text">인원</div>
                <div className="person-box">
                  <h3>성인</h3>
                  <h5>{tourPersonNum}명</h5>
                  <div className="person-control-btn"
                    onClick={()=>{setTourPersonNum(tourPersonNum+1)}}
                  >
                    <p>+</p>
                  </div>
                  <div className="person-control-btn"
                    onClick={()=>{setTourPersonNum(tourPersonNum-1)}}
                  >
                    <p>-</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* // 호텔 커스텀 선택 박스 ---------------------------------------------------- */}
              
        <section>
          <div className="hotelCustom-select-row">
            <div className={`hotelCustomselect-btn ${selecCustom === '일정변경' ? 'selected' : ""}`}
              onClick={()=>{setSelecCustom('일정변경');}}
            >
              <p style={{color: selecCustom === '일정변경' ? '#333' : '#BDBDBD'}}>일정변경</p>
            </div>
            <div className={`hotelCustomselect-btn ${selecCustom === '호텔변경' ? 'selected' : ""}`}
              onClick={()=>{setSelecCustom('호텔변경');}}
            >
              <p style={{color: selecCustom === '호텔변경' ? '#333' : '#BDBDBD'}}>호텔변경</p>
            </div>
          </div>
        </section>

        
        { selecCustom === '일정변경' &&
          <>

            {/* // 일정 커스텀 선택 박스 ---------------------------------------------------- */}
            <section style={{marginBottom:'30px'}}>
              <div className="custom-scheduleTypeBtnCover-row">
                <div className='custom-scheduleTypeBtnCover'>
                  <div className={`scheduleTypeBox ${selectScheduleType === '추천일정' ? "selected" : ""}`}
                    onClick={()=>{setSelectScheduleType('추천일정')}}>
                    <p>추천일정에서 변경</p>  
                  </div>
                  <div className={`scheduleTypeBox ${selectScheduleType === '나만의일정' ? "selected" : ""}`}
                    onClick={()=>{setSelectScheduleType('나만의일정')}}>
                    <p>나만의일정 만들기</p>  
                  </div>
                </div>
                <div className="custom-scheduleDayBtnCover">
                  {
                    selectScheduleDayBtnList.map((item:any, index:any)=>{

                      return (
                        <div className={`scheduleBtnBox ${selectScheduleDay === index+1 ? "selected" : ""}`}
                          onClick={()=>{
                            setSelectScheduleDay(item.day);
                          }}>
                          <p>{item.day}day</p>  
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </section>
            
            <div className="custom-scheduleContent-Cover">
              <div className="custom-scheduleContent-leftBox">
              { // 추천일정에서 변경
                selectScheduleType === '추천일정' &&
                <RecommendSchedule scheduleList={scheduleList} selectScheduleDay={selectScheduleDay}/>
              }
              { // 나만의 일정 만들기
                selectScheduleType === '나만의일정' &&
                <MadeMySchedule />
              }
              </div>


              <div className="custom-scheduleContent-rightBox">
                
                <div className='custom-customTypeBtnCover'>
                  <div className={`customTypeBox ${selectCustomType === '차량/가이드' ? "selected" : ""}`}
                      onClick={()=>{setSelectCustomType('차량/가이드')}}>
                    <p>차량/가이드</p>  
                  </div>
                  <div className={`customTypeBox ${selectCustomType === '호캉스즐기기' ? "selected" : ""}`}
                      onClick={()=>{setSelectCustomType('호캉스즐기기')}}>
                    <p>호캉스즐기기</p>  
                  </div>
                  <div className={`customTypeBox ${selectCustomType === '익스커션' ? "selected" : ""}`}
                      onClick={()=>{setSelectCustomType('익스커션')}}>
                    <p>익스커션</p>  
                  </div>
                  <div className={`customTypeBox ${selectCustomType === 'VIP서비스' ? "selected" : ""}`}
                      onClick={()=>{setSelectCustomType('VIP서비스')}}>
                    <p>VIP서비스</p>  
                  </div>
                </div>

                <div className="custom-customImageBox">
                  {
                    selectCustomContent.map((item:any, index:any)=>{
                      return (
                        <div key={index} className='custom-customImage'>
                          <img src={item.image}/>
                          <div className='custom-customImage-title-row'>
                            <div className="custom-customImage-title">
                              <p>{item.customName}</p>
                              <span>more</span>
                            </div>
                            <div className="custom-customImage-check">
                              <div className='checkInputBox'>
                                <input className="checkinput" type="checkbox"
                                  checked={item.isSelected}
                                  onChange={()=>{
                                    const copy = [...selectCustomContent];
                                    const result = copy.map((item, i) => ({
                                      ...item,
                                      isSelected: i === index ? true : false
                                    }));
                                    setSelectCustomContent(result);
                                  }}
                                />
                                {
                                  item.isSelected &&
                                  <FaCheck className='hotel-checkIcon'/>
                                }
                              </div>
                            </div>
                          </div>
                          <div className="custom-customImage-cost-row">
                            <div className="custom-cost-text">
                              <p>₩ {item.cost} / 1인</p>
                            </div>
                            <div className="custom-cost-btn-box">
                              <div className="custom-cost-btn"
                                onClick={()=>{
                                  const copy = [...selectCustomContent];
                                  copy[index].personNum = copy[index].personNum - 1;
                                  setSelectCustomContent(copy);
                                }}
                              >
                                <p>-</p>                                
                              </div>
                              <div className="custom-cost-personNum">
                                <p>{item.personNum}</p>
                              </div>
                              <div className="custom-cost-btn"
                                onClick={()=>{
                                  const copy = [...selectCustomContent];
                                  copy[index].personNum = copy[index].personNum + 1;
                                  setSelectCustomContent(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

              </div>
              
            </div>
          </>
        }

        { selecCustom === '호텔변경' &&
          <>
            {/* // 호텔 변경 박스 ---------------------------------------------------- */}

            <section>
            {
              selectOthersHotel.map((item:any, index:any)=>{
                return (
                  <div className="custom-toptextrow" style={{alignItems:'start'}} key={index}>

                    <div className="left-maintext">
                      <p className="maintext_title">{item.nation}</p>
                      <DropdownHomepage 
                        widthmain='60%'
                        height='30px'
                        selectedValue={item.dayNight}
                        options={[
                          { value: '1박', label: '1박' },
                          { value: '2박', label: '2박' },
                          { value: '3박', label: '3박' },
                          { value: '4박', label: '4박' },
                          { value: '5박', label: '5박' },
                        ]}
                        handleChange={(e)=>{
                          const copy = [...selectOthersHotel];
                          copy[index].dayNight = e.target.value;
                          setSelectOtherHotel(copy);
                        }}
                      />
                    </div>
                    <div className="right-contenttext" style={{flexDirection:'column'}}>
                      <div className="subMenu_box">
                        {
                          item.subMenu.map((menuItem:any, menuIndex:any)=>(
                            <div key={menuIndex} className={`subMenu ${item.isSelectSubMenu === menuItem ? "selectedSubMenu" : ""}`}
                              onClick={()=>{
                                const copy = [...selectOthersHotel];
                                copy[index].isSelectSubMenu = menuItem;
                                setSelectOtherHotel(copy);
                              }}
                            >
                              <p>{menuItem}</p>
                            </div>
                          ))
                        }
                      </div>
                      <div className="hotelImage-cover">
                        {
                          item.content.map((subItem:any, subIndex:any)=>{
                            return (
                              <div className="hotelImage-box" key={subIndex}>
                                <img src={subItem.image}/>
                                <div className='hotel-checkInputCover'>
                                  <div className='checkInputBox'>
                                    <input className="checkinput" type="checkbox"
                                      checked={subItem.isSelected}
                                      onChange={()=>{
                                        const copy = [...selectOthersHotel];
                                        copy[index].content = copy[index].content.map((def: any, i: number) => ({
                                          ...def,
                                          isSelected: i === subIndex ? !def.isSelected : false,
                                        }));
                                        setSelectOtherHotel(copy);
                                      }}
                                    />
                                    {
                                      subItem.isSelected &&
                                      <FaCheck className='hotel-checkIcon'/>
                                    }
                                  </div>
                                  <p>{subItem.hotelName}</p>
                                  <span>more</span>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </section>


            {/* // 혜택사항 ----------------------------------------------- */}
            <section>
              <div className="custom-toptextrow" style={{alignItems:'start'}}>
                <div className="left-maintext">혜택사항</div>
                <div className="right-contenttext" style={{flexDirection:'column'}}>
                  <div className="notice-textbox">
                    <p>-페어먼트 디럭스(5성급) 2박</p>
                    <p>-원베드 풀빌라 2박</p>
                    <p>-전 일정 조식 포함</p>
                    <p>-반얀트리 투숙시 런치 1회 석식 2회 제공</p>
                  </div>
                </div>
              </div>
            </section>
          </>
        }

        {/* // 총요금 ----------------------------------------------- */}
        <section>
          <div className="custom-toptextrow" style={{alignItems:'start'}}>
            <div className="left-maintext">총금액</div>
            <div className="right-contenttext" style={{flexDirection:'column'}}>
              <div className="custom-bottom-cost-cover">
                <div className="custom-bottom-cost-top-box">
                  <h3>포포인츠 리조트 3박 + 아야나 리조트 풀빌라 2박</h3>
                </div>
                <div className="custom-bottom-cost-middle-box">
                  <h3>4박 6일 일정</h3>
                  <div className='middle-box-right'>
                    <p>성인 {tourPersonNum}</p>
                  </div>
                </div>
                <div className="custom-bottom-cost-bottom-box">
                  <div className='bottom-cost-left-box'>
                    <h2>₩ 650,000<span>/ 1인</span></h2>
                  </div>
                  <div className='bottom-cost-right-box'>
                    <h1>Total <span>3,000,000</span>원</h1>
                    <p>항공료불포함</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="custom-bottom-btn-cover">
          <div className="custom-bottom-btn-Btnbox"
              style={{background:'#fff', color:'#007BFF', border:'1px solid #10a5d8'}}
            >
              <h5>장바구니 담기</h5>
            </div>
            <div className="custom-bottom-btn-Btnbox"
              style={{background:'#10a5d8', color:'#FFF'}}
            >
              <h5>견적 받기</h5>
            </div>
        </div>


      </div>
    </div>
  )
}
