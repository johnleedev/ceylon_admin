import React, { useState } from 'react'
import "./ResortCustomOrder.scss";
import { useNavigate } from 'react-router-dom';

import { FaCheck, FaRegCircle } from "react-icons/fa";
import sampleImage1 from "../../images/hotels/hotel_01.png"
import sampleImage2 from "../../images/hotels/hotel_02.png"
import sampleImage3 from "../../images/hotels/hotel_03.png"
import sampleImage4 from "../../images/hotels/hotel_04.png"
import sampleImage5 from "../../images/hotels/hotel_05.png"
import { IoMdClose } from 'react-icons/io';
import { IoIosArrowBack } from "react-icons/io";
import { DateHomepage } from '../../common/DateHomapage';
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";

export default function ResortCustomOrderMC (props:any) {
  
  let navigate = useNavigate();
  const [tourPeriodStart, setTourPeriodStart] = useState('');
  const [tourPeriodEnd, setTourPeriodEnd] = useState('');
  const [tourPersonNum, setTourPersonNum] = useState(2);
  const [selectHotelType, setSelectHotelType] = useState('선택호텔');

  const [selectHotelRoomType, setSelectHotelRoomType] = useState([
    {image:sampleImage1, roomType:"수성라군", dayNight:0, isSelected:true},
    {image:sampleImage2, roomType:"비치빌라", dayNight:0, isSelected:false},
    {image:sampleImage3, roomType:"가든빌라", dayNight:0, isSelected:false},
    {image:sampleImage1, roomType:"풀빌라", dayNight:0, isSelected:false},
  ]);
  
  const [selectOthersHotel, setSelectOtherHotel] = useState([
    {image:sampleImage1, hotelName:"아냐나 리조트", isSelected:false},
    {image:sampleImage2, hotelName:"캠핀스키", isSelected:false},
    {image:sampleImage3, hotelName:"식스센스", isSelected:false}
  ]);
  
  return (
    <div className='custom-order-cover'>
      
      <div className='menucover'></div>
     
      <div className="inner">
        <section>
          <div className="custom-order-header">
            <IoIosArrowBack className='custom-header-back-icon'
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate(`/products/resortdetail`);
              }}
            />
            <h1>[몰디브/칸쿤] 커스텀 오더</h1>
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

        {/* // 호텔 타입 선택 박스 ---------------------------------------------------- */}

        <section>
          <div className='custom-hotelTypeCover'>
            <div className={`hotelTypeBox ${selectHotelType === '선택호텔' ? "selected" : ""}`}
              onClick={()=>{setSelectHotelType('선택호텔')}}>
              <p>선택호텔</p>  
            </div>
            <div className={`hotelTypeBox ${selectHotelType === '같은가격대호텔' ? "selected" : ""}`}
              onClick={()=>{setSelectHotelType('같은가격대호텔')}}>
              <p>같은 가격대 호텔</p>  
            </div>
            <div className={`hotelTypeBox ${selectHotelType === '기간한정특가럭셔리' ? "selected" : ""}`}
              onClick={()=>{setSelectHotelType('기간한정특가럭셔리')}}>
              <p>기간한정 특가 럭셔리</p>  
            </div>
            <div className={`hotelTypeBox ${selectHotelType === '실론베스트리조트' ? "selected" : ""}`}
              onClick={()=>{setSelectHotelType('실론베스트리조트')}}>
              <p>실론 베스트 리조트</p>  
            </div>
          </div>
        </section>

        <section>
          <div className="custom-toptextrow" style={{alignItems:'start'}}>

            {/* // 선택호텔 ----------------------------------------------- */}
            <div className="left-maintext">선택호텔</div>
            <div className="right-contenttext" style={{flexDirection:'column'}}>
             
              <div className="hotel-detail-cover">
                <div className="hotel-detail-row">
                  <img src={sampleImage4}/>
                  <div className="hotel-detail-textbox">
                    <div className="hotel-detail-textbox-title">
                      아야나 리조트 <span>more</span>
                    </div>
                    <div className="hotel-detail-textbox-notice">
                      <p>-페어먼트 디럭스(5성급) 2박</p>
                      <p>-원베드 풀빌라 2박</p>
                      <p>-전 일정 조식 포함</p>
                      <p>-반얀트리 투숙시 런치 1회 석식 2회 제공</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="middletext-cover">
                <h3>[아야나 리조트] 룸타입별</h3>
              </div>

              <div className="hotelRoomType-cover">
                {
                  selectHotelRoomType.map((item:any, index:any)=>{
                    return (
                      <div className="hotelRoomType-box" key={index}>
                        <img src={item.image}/>
                        <div className='hotelRoomType-textbox'>
                          <h3>{item.roomType}</h3>
                          <div className="hotelRoomType-bottom">
                            <div className="daynight-btn-box">
                              <div className="daynight-btn"
                                onClick={()=>{
                                  const copy = [...selectHotelRoomType];
                                  copy[index].dayNight = copy[index].dayNight - 1;
                                  setSelectHotelRoomType(copy);
                                }}
                              >
                                <p>-</p>                                
                              </div>
                              <div className="daynight-text">
                                <p>{item.dayNight}</p>
                              </div>
                              <div className="daynight-btn"
                                onClick={()=>{
                                  const copy = [...selectHotelRoomType];
                                  copy[index].dayNight = copy[index].dayNight + 1;
                                  setSelectHotelRoomType(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>
                            <div className="select-btn-box">
                              <div className={`select-btn ${item.isSelected ? "selected" : ""}`}
                                 onClick={()=>{
                                  const copy = [...selectHotelRoomType];
                                  const result = copy.map((item, i) => ({
                                    ...item,
                                    isSelected: i === index ? true : false
                                  }));
                                  setSelectHotelRoomType(result);
                                }}
                              >
                                <p>선택</p>
                                <FaCheck className='select-btn-icon'/>
                              </div>
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
        
        </section>

        <section>
          <div style={{width:'100%', height:'1px', backgroundColor:'#ccc'}}></div>
        </section>

        <section>
          <div className="custom-toptextrow" style={{alignItems:'start'}}>

            {/* // 같은 가격대 호텔 ----------------------------------------------- */}
            <div className="left-maintext">같은 가격대 호텔</div>
            <div className="right-contenttext" style={{flexDirection:'column'}}>
             
              <div className="hotelImage-cover">
                {
                  selectOthersHotel.map((item:any, index:any)=>{
                    return (
                      <div className="hotelImage-box" key={index}>
                        <img src={item.image}/>
                        <div className='hotel-checkInputCover'>
                          <div className='checkInputBox'>
                            <input className="checkinput" type="checkbox"
                              checked={item.isSelected}
                              onChange={()=>{
                                const copy = [...selectOthersHotel];
                                const result = copy.map((item, i) => ({
                                  ...item,
                                  isSelected: i === index ? true : false
                                }));
                                setSelectOtherHotel(result);
                              }}
                            />
                            {
                              item.isSelected &&
                              <FaCheck className='hotel-checkIcon'/>
                            }
                          </div>
                          <p>{item.hotelName}</p>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div className="middletext-cover">
                <h3>[아야나 리조트] 룸타입별</h3>
              </div>

              <div className="hotelRoomType-cover">
                {
                  selectHotelRoomType.map((item:any, index:any)=>{
                    return (
                      <div className="hotelRoomType-box" key={index}>
                        <img src={item.image}/>
                        <div className='hotelRoomType-textbox'>
                          <h3>{item.roomType}</h3>
                          <div className="hotelRoomType-bottom">
                            <div className="daynight-btn-box">
                              <div className="daynight-btn"
                                onClick={()=>{
                                  const copy = [...selectHotelRoomType];
                                  copy[index].dayNight = copy[index].dayNight - 1;
                                  setSelectHotelRoomType(copy);
                                }}
                              >
                                <p>-</p>                                
                              </div>
                              <div className="daynight-text">
                                <p>{item.dayNight}</p>
                              </div>
                              <div className="daynight-btn"
                                onClick={()=>{
                                  const copy = [...selectHotelRoomType];
                                  copy[index].dayNight = copy[index].dayNight + 1;
                                  setSelectHotelRoomType(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>
                            <div className="select-btn-box">
                              <div className={`select-btn ${item.isSelected ? "selected" : ""}`}
                                 onClick={()=>{
                                  const copy = [...selectHotelRoomType];
                                  const result = copy.map((item, i) => ({
                                    ...item,
                                    isSelected: i === index ? true : false
                                  }));
                                  setSelectHotelRoomType(result);
                                }}
                              >
                                <p>선택</p>
                                <FaCheck className='select-btn-icon'/>
                              </div>
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
        </section>

        <section>
          <div style={{width:'100%', height:'1px', backgroundColor:'#ccc'}}></div>
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

        {/* // 혜택사항 ----------------------------------------------- */}
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
                  <p><FaCheck className='bottom-box-icon'/>호텔변경에 대한 별도 요금안내는</p>
                  <p>추후에 안내해 드립니다.</p>
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
