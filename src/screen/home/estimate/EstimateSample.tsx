import React, { useState } from 'react'
import "./EstimateSample.scss";
import { DateBoxDouble } from '../../../boxs/DateBoxDouble';
import { FaCheck, FaRegCircle } from "react-icons/fa";
import sampleImage1 from "../images/hotels/hotel_01.png"
import sampleImage2 from "../images/hotels/hotel_02.png"
import sampleImage3 from "../images/hotels/hotel_03.png"
import sampleImage4 from "../images/hotels/hotel_04.png"
import sampleImage5 from "../images/hotels/hotel_05.png"
import { IoMdClose } from 'react-icons/io';


export default function EstimateSample (props:any) {
  
  const [tourPeriodStart, setTourPeriodStart] = useState('');
  const [tourPeriodEnd, setTourPeriodEnd] = useState('');
  const [tourPersonNum, setTourPersonNum] = useState(2);
  const [preSelectHotel, setPreSelectHotel] = useState('');
  const [imageSelectHotel, setImageSelectHotel] = useState('');
  const [detailSelectHotel, setDetailSelectHotel] = useState('');
  
  return (
    <div className='sample-estimate-cover'>

      <section>
        <div className="estimate-header">
          <h1>[발리] 리조트3박 + 풀빌라2박</h1>
          <h3>5박 7일</h3>
        </div>
        <div className="bottombar"></div>
      </section>

      <section>
        <div className="estimate-toptextrow">
          <div className="left-maintext">이름</div>
          <div className="right-contenttext">홍길동</div>
        </div>
        <div className="estimate-toptextrow">
          <div className="left-maintext">여행예정일</div>
          <div className="right-contenttext">
            <DateBoxDouble dateStart={tourPeriodStart} dateEnd={tourPeriodEnd}
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
        <div className="estimate-toptextrow">
          <div className="left-maintext">여행인원</div>
          <div className="right-contenttext">
            <div className="numBtnBox"
              onClick={()=>{setTourPersonNum(tourPersonNum-1)}}
            >-</div>
            <div className="numBtnBox" style={{fontSize:'16px'}}>{tourPersonNum}</div>
            <div className="numBtnBox"
              onClick={()=>{setTourPersonNum(tourPersonNum+1)}}
            >+</div>
          </div>
        </div>
        <div className="estimate-toptextrow">
          <div className="left-maintext">선투숙호텔선택</div>
          <div className="right-contenttext">
            <div className='estimate-checkInputCover'>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={preSelectHotel === '노출'}
                  onChange={()=>{setPreSelectHotel('노출')}}
                />
                {
                  preSelectHotel === '노출' &&
                  <FaCheck className='estimate-checkIcon'/>
                }
              </div>
              <p>포포츠 쉐라톤</p>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={preSelectHotel === '비노출'}
                  onChange={()=>{setPreSelectHotel('비노출')}}
                />
                {
                  preSelectHotel === '비노출' &&
                  <FaCheck className='estimate-checkIcon'/>
                }
              </div>
              <p>파드마 리조트</p>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={preSelectHotel === '상품가연동'}
                  onChange={()=>{setPreSelectHotel('상품가연동')}}
                />
                {
                  preSelectHotel === '상품가연동' &&
                  <FaCheck className='estimate-checkIcon'/>
                }
              </div>
              <p>상품가연동</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="estimate-toptextrow" style={{alignItems:'start'}}>
          <div className="left-maintext">메인호텔선택</div>
          <div className="right-contenttext" style={{flexDirection:'column'}}>

            <div className="hotelImage-cover">
              <div className="hotelImage-box">
                <img src={sampleImage1}/>
                <div className='estimate-checkInputCover'>
                  <div className='checkInputBox'>
                    <input className="checkinput" type="checkbox"
                      checked={imageSelectHotel === '1'}
                      onChange={()=>{setImageSelectHotel('1')}}
                    />
                    {
                      imageSelectHotel === '1' &&
                      <FaCheck className='estimate-checkIcon'/>
                    }
                  </div>
                  <p>아야나 리조트</p>
                </div>
              </div>
              <div className="hotelImage-box">
                <img src={sampleImage2}/>
                <div className='estimate-checkInputCover'>
                  <div className='checkInputBox'>
                    <input className="checkinput" type="checkbox"
                      checked={imageSelectHotel === '2'}
                      onChange={()=>{setImageSelectHotel('2')}}
                    />
                    {
                      imageSelectHotel === '2' &&
                      <FaCheck className='estimate-checkIcon'/>
                    }
                  </div>
                  <p>캠핀스키</p>
                </div>
              </div>
              <div className="hotelImage-box">
                <img src={sampleImage3}/>
                <div className='estimate-checkInputCover'>
                  <div className='checkInputBox'>
                    <input className="checkinput" type="checkbox"
                      checked={imageSelectHotel === '3'}
                      onChange={()=>{setImageSelectHotel('3')}}
                    />
                    {
                      imageSelectHotel === '3' &&
                      <FaCheck className='estimate-checkIcon'/>
                    }
                  </div>
                  <p>식스센스</p>
                </div>
              </div>
            </div>
            
            <div className="middletext-cover">
              <h3>[아야나 리조트] 룸타입별</h3>
              <h5>[리조트 상세보기]</h5>
            </div>

            <div className="hotel-detail-cover">
              <div className="hotel-detail-row">
                <img src={sampleImage4}/>
                <div className="hotel-detail-textbox">
                  <div className="hotel-detail-textbox-title">
                    리조트뷰 빌라 _2박 <span>포함상품</span>
                  </div>
                  <div className="hotel-detail-textbox-notice">
                    <p>-페어먼트 디럭스(5성급) 2박</p>
                    <p>-원베드 풀빌라 2박</p>
                    <p>-전 일정 조식 포함</p>
                    <p>-반얀트리 투숙시 런치 1회 석식 2회 제공</p>
                  </div>
                </div>
                <div className="hotel-detail-costbox">
                  <h3>(1박요금 / 1인 ₩210,000)</h3>
                  <h1>₩ 630,000 <span>2박/1인</span></h1>
                  <p>일정포함, 항공료 불포함</p>
                </div>
                <div className="hotel-detail-checkbox">
                  <div className='estimate-checkInputCover'>
                    <div className='checkInputBox'>
                      <input className="checkinput" type="checkbox"
                        checked={detailSelectHotel === '1'}
                        onChange={()=>{setDetailSelectHotel('1')}}
                      />
                      {
                        detailSelectHotel === '1' &&
                        <FaCheck className='estimate-checkIcon'/>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="hotel-detail-row">
                <img src={sampleImage4}/>
                <div className="hotel-detail-textbox">
                  <div className="hotel-detail-textbox-title">
                    리조트뷰 빌라 _2박 <span>포함상품</span>
                  </div>
                  <div className="hotel-detail-textbox-notice">
                    <p>-페어먼트 디럭스(5성급) 2박</p>
                    <p>-원베드 풀빌라 2박</p>
                    <p>-전 일정 조식 포함</p>
                    <p>-반얀트리 투숙시 런치 1회 석식 2회 제공</p>
                  </div>
                </div>
                <div className="hotel-detail-costbox">
                  <h3>(1박요금 / 1인 ₩210,000)</h3>
                  <h1>₩ 630,000 <span>2박/1인</span></h1>
                  <p>일정포함, 항공료 불포함</p>
                </div>
                <div className="hotel-detail-checkbox">
                  <div className='estimate-checkInputCover'>
                    <div className='checkInputBox'>
                      <input className="checkinput" type="checkbox"
                        checked={detailSelectHotel === '2'}
                        onChange={()=>{setDetailSelectHotel('2')}}
                      />
                      {
                        detailSelectHotel === '2' &&
                        <FaCheck className='estimate-checkIcon'/>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bottomtext-cover">
              <h3>2024년 10월 01일 ~ 11월 30일</h3>
              <h5>(10월 이전 예약조건)</h5>
            </div>

          </div>
        </div>
       
      </section>

      <section>
        <div className="estimate-toptextrow" style={{alignItems:'start'}}>
          <div className="left-maintext">커스텀 오더</div>
          <div className="right-contenttext" style={{flexDirection:'column'}}>
            <div className="custom-detail-cover">
              <div className="custom-detail-row">
                <img src={sampleImage4}/>
                <div className="custom-detail-textbox">
                  <div className="custom-detail-textbox-title">
                    스쿠버 다이빙
                  </div>
                  <div className="custom-detail-textbox-notice">
                    <p>발리 앞바다의 아름다운 바다환경을 체험할 수 있습니다.</p>
                    <p>발리 앞바다의 아름다운 바다환경을 체험할 수 있습니다.</p>
                  </div>
                  <div className="custom-detail-textbox-cost">
                    <h3>₩ 60,000 <span>/1인</span></h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-detail-cover">
              <div className="custom-detail-row">
                <img src={sampleImage4}/>
                <div className="custom-detail-textbox">
                  <div className="custom-detail-textbox-title">
                    스카이 다이빙
                  </div>
                  <div className="custom-detail-textbox-notice">
                    <p>발리 앞바다의 아름다운 바다환경을 체험할 수 있습니다.</p>
                    <p>발리 앞바다의 아름다운 바다환경을 체험할 수 있습니다.</p>
                  </div>
                  <div className="custom-detail-textbox-cost">
                    <h3>₩ 50,000 <span>/1인</span></h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-detail-cover">
              <div className="custom-detail-row">
                <img src={sampleImage4}/>
                <div className="custom-detail-textbox">
                  <div className="custom-detail-textbox-title">
                    ATM 체험
                  </div>
                  <div className="custom-detail-textbox-notice">
                    <p>발리 앞바다의 아름다운 바다환경을 체험할 수 있습니다.</p>
                    <p>발리 앞바다의 아름다운 바다환경을 체험할 수 있습니다.</p>
                  </div>
                  <div className="custom-detail-textbox-cost">
                    <h3>₩ 60,000 <span>/1인</span></h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="estimate-notice-cover">
          <div className="estimate-notice-row">
            <div className="estimate-notice-left-textbox">
              <FaCheck className='estimate-notice-icon' style={{color:'#007BFF', fontSize:'16px'}}/>
              <p>실론투어 특전</p>
            </div>
            <div className="estimate-notice-right-textbox">
              <p>-허니문 침대 장식 1회 제공</p>
              <p>-와인 1병과 과일 플래터 1회 제공</p>
              <p>-허니문 침대 장식 1회 제공</p>
              <p>-와인 1병과 과일 플래터 1회 제공</p>
              <p>-허니문 침대 장식 1회 제공</p>
              <p>-와인 1병과 과일 플래터 1회 제공</p>
            </div>
          </div>
          <div className="estimate-notice-row">
            <div className="estimate-notice-left-textbox">
              <FaRegCircle className='estimate-notice-icon' style={{color:'#007BFF', fontSize:'14px'}}/>
              <p>포함사항</p>
            </div>
            <div className="estimate-notice-right-textbox">
              <p>-허니문 침대 장식 1회 제공</p>
              <p>-와인 1병과 과일 플래터 1회 제공</p>
              <p>-허니문 침대 장식 1회 제공</p>
              <p>-와인 1병과 과일 플래터 1회 제공</p>
            </div>
          </div>
          <div className="estimate-notice-row">
            <div className="estimate-notice-left-textbox">
              <IoMdClose className='estimate-notice-icon' style={{color:'#e03131', fontSize:'18px'}}/>
              <p>불포함사항</p>
            </div>
            <div className="estimate-notice-right-textbox">
              <p>-허니문 침대 장식 1회 제공</p>
              <p>-와인 1병과 과일 플래터 1회 제공</p>
            </div>
          </div>
        </div>
        <div className='estimate-notice-btn-box'>
          <div className="estimate-notice-btn" 
            onClick={()=>{
            
            }}
          >
            <p>일정표 보기</p>
          </div>
        </div>
      </section>

      <section>
        <div className="estimate-bottom-cost-cover">
          <div className="estimate-bottom-cost-left-box">
            <h3>포포인츠 리조트 3박 + 아야나 리조트 풀빌라 2박</h3>
            <p>1인 요금 1,500,000원</p>
            <h1>총요금 <span>3,000,000</span>원</h1>
          </div>
          <div className="estimate-bottom-cost-right-box">
            <div className="estimate-bottom-cost-Btnbox"
              style={{background:'#fff', color:'#007BFF'}}
            >
              <h5>상담하기</h5>
            </div>
            <div className="estimate-bottom-cost-Btnbox"
              style={{background:'#10a5d8', color:'#FFF'}}
            >
              <h5>예약하기</h5>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
