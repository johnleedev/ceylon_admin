import React, { useState } from 'react'
import "./NationCustom.scss";
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { DateHomepage } from '../../common/DateHomapage';
import { CiCalendar } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { useEffect } from 'react';


interface ListProps {
  id: string;
  isView : string;
  sort : string;
  continent: string;
  nationKo : string;
  nationEn: string;
  visa: string;
  timeDiff: string;
  language: string;
  currency : string;
  voltage: string;
  plugType: string;
  caution : string;
  taxFreeLimit : string;
  inputImage : string;
  cities : CityesProps[];
}

interface CityesProps {
  id: string;
  isView : string;
  sort : string;
  continent: string;
  nation : string;
  cityKo: string;
}


export default function NationCustomOrder (props:any) {
  
  let navigate = useNavigate();
  const location = useLocation();

  const [tourPeriodStart, setTourPeriodStart] = useState('');
  const [tourPeriodEnd, setTourPeriodEnd] = useState('');
  const [tourPersonNum, setTourPersonNum] = useState(2);
  const [citylist, setCityList] = useState<ListProps[]>([]);
  
  const [selectCities, setSelectCities] =  useState<string[]>([]);	
  const [ticketing, setTicketing] = useState('발권대행');
  const [airlinePath, setAirlinePath] = useState('직행');
  const [seatSort, setSeatSort] = useState('일반석');
  const [request, setRequest] = useState([
    {hotelName:"파리", content:""},
    {hotelName:"그란덴발트", content:""},
    {hotelName:"로마", content:""},
    {hotelName:"아말피", content:""},
  ]);
  const [bucketList, setBucketList] = useState([
    {hotelName:"파리", content:""},
    {hotelName:"그란덴발트", content:""},
    {hotelName:"로마", content:""},
    {hotelName:"아말피", content:""},
  ]);
  const [etcRequest, setEtcRequest] = useState('');

  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/tournationcity/getnationcity`)
    if (res.data !== false) {
			const copy = [...res.data];
			copy.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setCityList(copy);
    } else {
			setCityList([])
		}
  };

	useEffect(() => {
		fetchPosts();
	}, []);  

   
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
            <h1>커스텀 오더</h1>
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

        
        {/* // 원하는 방문 도시 ---------------------------------------------------- */}
        
        <section>
          <div className="custom-order-title">
            <h3>원하는 방문 도시</h3>
            {
              selectCities?.map((text:any, index:any)=>(
                <p key={index}>{text}</p>
              ))
            }
          </div>
          <div className="bottombar"></div>
          <div className="custom-order-locationcity-cover">
            {
              citylist.map((item:any, index:any)=>{
                return (
                  <div key={index} className='custom-order-locationcity'>
                    <p className='custom-order-locationcity-title'>{item.nationKo}</p>
                    <div className='custom-order-locationcity-sub'>
                      {
                        item.cities.map((subItem:any, subIndex:any)=>{
                          return (
                            <div key={subIndex} className='custom-order-locationcity-sub-city'>
                              <div className='checkInputBox'>
                                <input className="checkinput" type="checkbox"
                                  checked={selectCities.includes(subItem.cityKo)}
                                  onChange={()=>{
                                    const copy = [...selectCities];
                                    if (selectCities.includes(subItem.cityKo)) {
                                      const result = copy.filter(e => e !== subItem.cityKo);
                                      setSelectCities(result);
                                    } else {
                                      copy.push(subItem.cityKo); 
                                      setSelectCities(copy);
                                    }
                                  }}
                                />
                              </div>
                              <p>{subItem.cityKo}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>

        {/* // 항공권 구매 ---------------------------------------------------- */}

        <section>
          <div className="custom-order-title">
            <h3>항공권 구매</h3>
          </div>
          <div className="bottombar"></div>
          <div className="custom-order-textbox-row">
            <div className="custom-order-textbox-left">
              <p className="custom-order-textbox-left-title">발권</p>
            </div>
            <div className="custom-order-textbox-right">
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={ticketing === '발권대행'}
                  onChange={()=>{
                    setTicketing('발권대행');
                  }}
                />
                <span className='check-text'>발권 대행</span>
              </div>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={ticketing === '직접발권'}
                  onChange={()=>{
                    setTicketing('직접발권');
                  }}
                />
                <span className='check-text'>직접 발권</span>
              </div>
            </div>
          </div>
          <div className="custom-order-textbox-row">
            <div className="custom-order-textbox-left">
              <p className="custom-order-textbox-left-title">경로</p>
            </div>
            <div className="custom-order-textbox-right">
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={airlinePath === '직행'}
                  onChange={()=>{
                    setAirlinePath('직행');
                  }}
                />
                <span className='check-text'>직행</span>
              </div>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={airlinePath === '경유'}
                  onChange={()=>{
                    setAirlinePath('경유');
                  }}
                />
                <span className='check-text'>경유</span>
              </div>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={airlinePath === '상관없음'}
                  onChange={()=>{
                    setAirlinePath('상관없음');
                  }}
                />
                <span className='check-text'>상관없음</span>
              </div>
            </div>
          </div>
          <div className="custom-order-textbox-row">
            <div className="custom-order-textbox-left">
              <p className="custom-order-textbox-left-title">좌석</p>
            </div>
            <div className="custom-order-textbox-right">
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={seatSort === '일반석'}
                  onChange={()=>{
                    setSeatSort('일반석');
                  }}
                />
                <span className='check-text'>일반석</span>
              </div>
              <div className='checkInputBox'>
                <input className="checkinput" type="checkbox"
                  checked={seatSort === '비지니스석'}
                  onChange={()=>{
                    setSeatSort('비지니스석');
                  }}
                />
                <span className='check-text'>비지니스석</span>
              </div>
            </div>
          </div>
        </section>


        <section>
          <div className="custom-order-title">
            <h3>호텔 등급 및 위치 요청사항</h3>
          </div>
          <div className="bottombar"></div>
          {
            request.map((item:any, index:any)=>{
              return (
                <div className="custom-order-textbox-row" key={index}>
                  <div className="custom-order-textbox-left">
                    <p className="custom-order-textbox-left-title">{item.hotelName}</p>
                  </div>
                  <div className="custom-order-textbox-right">
                    <input className="custom-order-inputdefault" type="text"
                      value={item.content} onChange={(e)=>{
                        const copy = [...request];
                        copy[index].content = e.target.value;
                        setRequest(copy);
                      }}/>
                  </div>
                </div>
              )
            })
          }
        </section>

        <section>
          <div className="custom-order-title">
            <h3>도시별 버킷리스트</h3>
          </div>
          <div className="bottombar"></div>
          {
            bucketList.map((item:any, index:any)=>{
              return (
                <div className="custom-order-textbox-row" key={index}>
                  <div className="custom-order-textbox-left">
                    <p className="custom-order-textbox-left-title">{item.hotelName}</p>
                  </div>
                  <div className="custom-order-textbox-right">
                    <input className="custom-order-inputdefault" type="text"
                      value={item.content} onChange={(e)=>{
                        const copy = [...bucketList];
                        copy[index].content = e.target.value;
                        setBucketList(copy);
                      }}/>
                  </div>
                </div>
              )
            })
          }
        </section>

        <section>
          <div className="custom-order-title">
            <h3>기타 요청사항</h3>
          </div>
          <div className="bottombar"></div>
          <div className="custom-order-requestBox-cover">
            <textarea 
              className="custom-order-textarea"
              value={etcRequest}
              onChange={(e)=>{
                setEtcRequest(e.target.value);
              }}
            />
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
              <h5>변경 요청 하기</h5>
            </div>
        </div>


      </div>
    </div>
  )
}
