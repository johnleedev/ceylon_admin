import "./HotelDetailPage.scss";
import { useParams } from "react-router-dom";
import { getHotelDataById, getPackageById } from "../../utilies";
import { useEffect, useState } from "react";
import KEAir from "../../images/airline/korea.jpg";
import JAAir from "../../images/airline/garuda.jpg";
import axios from "axios";
import MainURL from "../../../../MainURL";
import hotelbuilding from "../../images/hotel/hotelbuilding.png"
import hotelplate from "../../images/hotel/hotelplate.png"
import location from "../../images/hotel/location.png"

import hotelImagePath1 from "../../images/resort/hotel_01.png";
import headerBgImage from "../../images/hotel/main-bg-0.jpg";
import detailImagePath0 from "../../images/hotel/detail-0.jpg";
import detailImagePath1 from "../../images/hotel/detail-1.jpg";
import detailImagePath2 from "../../images/hotel/detail-2.jpg";
import detailImagePath3 from "../../images/hotel/detail-1.jpg";
import detailImagePath4 from "../../images/hotel/detail-2.jpg";
import mobileImagePath from "../../images/hotel/mobile-info.jpg";

export default function PackagePage() {

  const { packageId } = useParams();
  const id = 1;
  const packageData = getPackageById(id);
  const hotelData = getHotelDataById(packageData.hotelId);

  const [onModal, setOnModal] = useState(false);


  const hotelDataSub = {
    id: 0,
    tourId: 0,
    title: "세인트 레지스 호텔",
    subtitle: "Saint Regis Hotel Bali",
    rating: 5,
    headerBgImage: headerBgImage,
    thumbnailImagePath: hotelImagePath1,
    description:
      "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
    benefit: [
      "매일 2~6인 조식",
      "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
      "투숙기간중 1회 치킨 & 생맥주 2잔",
      "방콕시내 호텔간 왕복셔틀버스 제공",
    ],
    roomtype: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
    hotelImages: [
      { type: 1, imagePath: detailImagePath0 },
      { type: 2, imagePath: detailImagePath1 },
      { type: 3, imagePath: detailImagePath2 },
      { type: 2, imagePath: detailImagePath3 },
      { type: 3, imagePath: detailImagePath4 },
    ],
    hotelInfoImages: { webImagePath: "", mobileImagePath: mobileImagePath },
    address: {
      contury: "인도네시아",
      state: "발리",
      city: "쿠타",
      detailAddress: "Sauthon Road",
    },
    nearby: [
      { distance: "28km", name: "발리국제공항" },
      { distance: "20km", name: "사원" },
    ],
  }
  
  // 이요한 작업 -------------------------------------------------------------------------------------------------------------------------------------

  interface SelectScheduleListProps {
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    hotel: string;
    score: string;
    schedule: {
      text1: string;
      text2: string;
      text3: string;
    }[]
  }

  interface SelectScheduleProps {
    isView : string;
    tourLocation : string;
    landCompany : string;
    productType : string;
    tourPeriodNight : string;
    tourPeriodDay : string;
    departAirport : string;
    departFlight : string;
    selectedSchedule : string;
    cautionNote : string;
    includeNote : string;
    includeNoteText : string;
    notIncludeNote : string;
    notIncludeNoteText : string;
    scheduleList : SelectScheduleListProps[];
    reviseDate : string;
  }
  
  
  const [scheduleAll, setScheduleAll] = useState([]);
  const [tourLocationSelected, setTourLocationSelected] = useState('');
  const [scheduleSelected, setScheduleSelected] = useState<SelectScheduleProps>();
  const [flightType, setFlightType] = useState("직항");
  const [periodSelected, setPeriodSelected] = useState('4박 6일');
  
  const fetchPosts = async () => {
    const resschedule = await axios.get(`${MainURL}/product/getschedule`)
    if (resschedule.data) {
      setScheduleAll(resschedule.data);
    } 
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

  interface AirlineSubProps {
    sort : string;
    airlineName: string;
    departDate: string[];
    planeName: string;
    departAirport: string;
    departTime: string;
    arriveAirport: string;
    arriveTime: string;
  }
  interface AirlineProps {
    tourPeriod: string;
    departAirportMain : string;
    airlineData: AirlineSubProps[];
  }   
  const [directAirline, setDirectAirline] = useState<AirlineProps[]>([]);
  const [viaAirline, setViaAirline] = useState<AirlineProps[]>([]);
  
  const fetchAirplane = async () => {
    const res = await axios.get(`${MainURL}/product/getairplane/${tourLocationSelected}`)
    if (res.data) {
      const copy = res.data[0];
      const directAirlineCopy = copy.directAirline ? JSON.parse(copy.directAirline) : [];
      const viaAirlineCopy = copy.viaAirline ? JSON.parse(copy.viaAirline) : [];
      setDirectAirline(directAirlineCopy);
      setViaAirline(viaAirlineCopy);
    } 
  };

  useEffect(() => {
    fetchAirplane();
  }, [tourLocationSelected]);  


  const [isView, setIsView] = useState('');
  const [tourLocation, setTourLocation] = useState('');
  const [landCompany, setLandCompany] = useState('');
  const [productType, setProductType] = useState('');
  const [tourPeriodNight, setTourPeriodNight] = useState('');
  const [tourPeriodDay, setTourPeriodDay] = useState('');
  const [departAirport, setDepartAirport] = useState('');
  const [departFlight, setDepartFlight] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState('');
  const [cautionNote, setCautionNote] = useState('');
  const [includeNote, setIncludeNote] = useState([]);
  const [includeNoteText, setIncludeNoteText] = useState('');
  const [notIncludeNote, setNotIncludeNote] = useState([]);
  const [notIncludeNoteText, setNotIncludeNoteText] = useState('');
  const [scheduleList, setScheduleList] = useState<SelectScheduleListProps[]>([]);
  const [reviseDate, setReviseDate] = useState('');
  

  return (
    <div>
      <div
        className={"mini hotel__header__section__wrapper"}
      >
        <img className="bg__image" src={hotelData.mainBgImage} alt="temp" />
        <div className="header__info">
          <span className="header__subtitle">{hotelData.subtitle}</span>
          <span className="header__title">{hotelData.title}</span>
          <div className="header__loc__rating">
            <span className="header__location">{`${location}`}</span>
            <div className="header__rating">
              {/* <RatingBoard rating={rating} /> */}
            </div>
          </div>
          <span className="header__desc">{hotelData.desc}</span>
        </div>
      </div>
      <div className="acommodation__selector__wrapper">
        <span className="sub__text">인천출발 / 발리 5박 7일</span>
        <div className="selected__item__wrapper">
          <span className="selected__item">
            [꾸따] 포 포인츠 바이 쉐라톤 디럭스 라군 2박 + [누사두아]
            세인트레지스 풀빌라 2박
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="extension__btn"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div className="hotel__selector__wrapper">
          <span>포 포인츠 바이 쉐리톤</span>
          <span className="selected">세인트레지스 풀빌라</span>
        </div>
      </div>
  
      <div className="image__selector__wrapper">
        <div className="images__grid__wrapper">
          {
          hotelDataSub.hotelImages.slice(0, 4).map((image, idx) => (
            <div key={idx}>
              <img src={image.imagePath} alt="temp" />
              {idx === 3 && (
                <div
                  className="mobile__show__all__btn"
                  onClick={() => setOnModal(true)}
                >
                  <span>사진 모두 보기</span>
                  <span>{`+${hotelDataSub.hotelImages.length}`}</span>
                </div>
              )}
            </div>
          ))
          }
        </div>
        <div className="show__all__btn" onClick={() => setOnModal(true)}>
          <span>호텔 사진 모두 보기</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="info__items__wrapper mx__section">
        <div className={"only-web"}>
          <span className="item__title">룸타입</span>
          <ul>
            {hotelDataSub.roomtype.map((item, idx) => (
              <li key={idx}>
                <label htmlFor={item}>
                  <input type="radio" id={item} checked={idx === 0} />
                  <span className={idx === 0 ? "select__room__type" : ""}>
                    {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className={"only-web"}>
          <span className="item__title">고객 베네핏</span>
          <ul>
            {hotelDataSub.benefit.map((item, idx) => (
              <li key={idx}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className={"only-web"}>
          <span className="item__title">호텔 위치</span>
          <ul>
            <li key="address">{`주소 : ${hotelDataSub.address.state} ${hotelDataSub.address.city} ${hotelDataSub.address.detailAddress}`}</li>
            {hotelDataSub.nearby.map(({ distance, name }, idx) => (
              <li key={idx}>{`${distance} - ${name}`}</li>
            ))}
            <div className="map__view__btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  clipRule="evenodd"
                />
              </svg>
              <span>호텔 위치 보기</span>
            </div>
          </ul>
        </div>
      </div>

      <div className="select__package__byroom__wrapper">
        <div className="header__wrapper">
          <span className="header__main">룸타입별 선택상품</span>
          <span className="header__sub">
            상품기간 : 2024.01.05 ~ 2024.12.20
          </span>
        </div>
        <div className="package__item__wrapper">
          <div className="image__wrapper">
            <img src={hotelData.info.images.roomImage[0].image} alt="temp" />
          </div>
          <div className="padding__wrapper">
            <div className="package__info__wrapper">
              <div className="info__wrapper">
                <span className="info__title">클리프 오션뷰 풀빌라</span>
                <span className="info__subtitle">
                  선투숙리조트 2박 + 반엔트리 원베드 풀빌라 2박
                </span>
                <span className="info__subtitle">4박 6일 일정</span>
                <div className="info__detail__wrapper">
                  <span>-페어먼트 디럭스(5성급) 2박</span>
                  <span>-원베드 풀빌라 2박</span>
                  <span>-전 일정 조식 포함</span>
                  <span>-반얀트리 투숙시 런치 1회 석식 2회 제공</span>
                </div>
              </div>
            </div>
            <div className="package__price__wrapper">
              <div className="mb">
                <div className="price__wrapper">
                  <span className="price__main">₩ 3,500,000</span>
                  <span className="price__sub">/ 1인</span>
                </div>
                <span className="price__sub">항공료 불포함</span>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>

      {/* selected TourLocation ------------------------------------------------------------------------------------------------------------------------- */}
      <div className="selectedScheduleBox" style={{display:'flex', justifyContent:'center'}}>
        {
          scheduleAll?.map((item:any, index:any)=>{

            return (
              <div  className="selectedScheduleBtn" key={index}
                    onClick={()=>{
                      setFlightType('직항')
                      setScheduleSelected(item); 
                      setTourLocationSelected(item.tourLocation)
                      setIsView(item.isView);
                      setTourLocation(item.tourLocation);
                      setLandCompany(item.landCompany);
                      setProductType(item.productType);
                      setTourPeriodNight(item.tourPeriodNight);
                      setTourPeriodDay(item.tourPeriodDay);
                      setDepartAirport(item.departAirport);
                      setDepartFlight(item.departFlight);
                      setSelectedSchedule(item.selectedSchedule);
                      setCautionNote(item.cautionNote);
                      setIncludeNote(JSON.parse(item.includeNote));
                      setIncludeNoteText(item.includeNoteText);
                      setNotIncludeNote(JSON.parse(item.notIncludeNote));
                      setNotIncludeNoteText(item.notIncludeNoteText);
                      setScheduleList(JSON.parse(item.scheduleList));
                      setReviseDate(item.reviseDate);
                    }}
                    style={{width:'100px', height:'50px', border:'1px solid #333', display:'flex', alignItems:'center', justifyContent:'center',
                            backgroundColor: tourLocationSelected ===  item.tourLocation ? '#333' : '#fff',
                            color: tourLocationSelected ===  item.tourLocation ? '#fff' : '#333'}} >
                {item.tourLocation}
              </div>
            )
          })
        }
      </div>


      <div className="schedule__byairline__wrapper">
        <div className="header__wrapper">
          <span className="header__main">항공사별 일정표</span>
          <div className={"sidebar__wrapper"}
          >
            <span className={"selected__sidebar"}
              onClick={() => {}}
            >직항</span>
            <span className={"selected__sidebar"}
              onClick={() => {}}
            >경유</span>
          </div>
        </div>
        <div className="flight__items__wrapper">
          { flightType === '직항'
            ?
            directAirline.map((item:any, index:any)=>{
              return (
                <div className="flight__item__wrapper" key={index}>
                  <div className="airline__wrapper">
                    {/* <img src={''} alt="temp" /> */}
                    <span>
                      {item.airlineData[0].airlineName}
                    </span>
                  </div>
                  <div className="flight__schedule__wrapper">
                    <div className="flight__schedule">
                      <span>{item.airlineData[0].departAirport}</span>
                      <span>출발</span>
                      <span>({item.airlineData[0].departTime})</span>
                      <span>-</span>
                      <span>{item.airlineData[0].arriveAirport}</span>
                      <span>도착</span>
                      <span>({item.airlineData[0].arriveTime})</span>
                    </div>
                    <span>{tourLocationSelected} {item.tourPeriod}</span>
                  </div>
                  <div className="flight__select__btn__wrapper"
                    onClick={()=>{

                    }}
                  >
                    {/* <SelectBtn checked={true} /> */}
                  </div>
                </div>
              )
            })
            :
            viaAirline.map((item:any, index:any)=>{
              return (
                <div className="flight__item__wrapper" key={index}>
                  <div className="airline__wrapper">
                    {/* <img src={''} alt="temp" /> */}
                    <span>
                      {item.airlineData[0].airlineName}
                    </span>
                  </div>
                  <div className="flight__schedule__wrapper">
                    <div className="flight__schedule">
                      <span>{item.airlineData[0].departAirport}</span>
                      <span>출발</span>
                      <span>({item.airlineData[0].departTime})</span>
                      <span>-</span>
                      <span>{item.airlineData[0].arriveAirport}</span>
                      <span>도착</span>
                      <span>({item.airlineData[0].arriveTime})</span>
                    </div>
                    <span>{tourLocationSelected} {item.tourPeriod}</span>
                  </div>
                  <div className="flight__select__btn__wrapper"
                    onClick={()=>{

                    }}
                  >
                    {/* <SelectBtn checked={true} /> */}
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="included__items__section__wrapper mx__section">
        <div className="single__header__main">포함/불포함</div>
        <div className="included__items__wrapper">
          <div className="index__title__wrapper">
            <span className="included__icon">O</span>
            <span>포함사항</span>
          </div>
          <div className="elements__wrapper">
            {
              includeNote.map((item:any, index:any)=>{
                return (
                  <span key={index}>- {item}</span>
                )
              })
            }
            <span>- {includeNoteText}</span>
          </div>
          <div className="index__title__wrapper">
            <span className="unincluded__icon">X</span>
            <span>불포함사항</span>
          </div>
          <div className="elements__wrapper">
            {
              notIncludeNote.map((item:any, index:any)=>{
                return (
                  <span key={index}>- {item}</span>
                )
              })
            }
            <span>- {notIncludeNoteText}</span>
          </div>
        </div>
      </div>

      
      <div className="must__read__section__wrapper mx__section">
        <div className="single__header__main">필독사항</div>
        <div className="must__read__wrapper">
          <span>
            - 상기일정은 항공 및 현지사정으로 인하여 변경될 수 있습니다.
          </span>
          <span>- 환율변동에 의해 요금이 가/감 될 수 있습니다.</span>
          <span>
            - 취소시 항공 및 호텔(리조트, 풀빌라 등)의 취소 수수료가 발생하는
            상품입니다.
          </span>
          <span>
            - 예약시 여권상의 정확한 영문이름으로 예약하셔야 하며 여권
            유효기간은 출발일 기준 6개월 이상 남아있어야 합니다.
          </span>
          <span>
            - 외국/이중 국적자의 해외여행은 도착지국가의 출입국 정책이
            상이하므로, 반드시 여행자 본인이 해당국의 대사관에 확인하셔야
            합니다.
          </span>
        </div>
      </div>


      {/* 일정표 ---------------------------------------------------------------------------------------------------------------- */}

      <div className="mx__section">
        <div className="header__wrapper">
          <span className="header__main">일정표</span>
          <span className="header__sub">
            KE 대한항공 인천 오후 출발 (17:40) / 발리 5박 7일 (2024.10.16 ~
            2024.10.23)
          </span>
        </div>

        <div className="schedule__tables__wrapper">
          {
            scheduleList.map((item:any, index:any)=>{


              return (
                <div className="schedule__table__wrapper" key={index}>
                  <div className="schedule__header">
                    <span className="main__text">{index+1} DAY</span>
                    <span className="sub__text">2024-10-16(토)</span>
                  </div>
                  <div className="schedule__main__wrapper">
                    {
                      index === 0 &&
                      <div className="schedule__element__wrapper">
                        <div className="flight__schedule__board__wrapper">
                          <div className="flight__schedule__board">
                            <div className="flight__info__wrapper">
                              <img src={KEAir} alt="temp" />
                              <span>대한항공 KE0188</span>
                            </div>
                            <div className="flight__time__wrapper">
                              <span className="flight__time">07시간 30분</span>
                              <div className="depart__info">
                                <div />
                                <span className="time__text">15:30</span>
                                <span className="airport__text">인천(INC) 출발</span>
                              </div>
                              <div className="arrive__info">
                                <div />
                                <span className="time__text">19:50</span>
                                <span className="airport__text">발리(BAL) 도착</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      item.schedule.map((subItem:any, subIndex:any)=>{
                        
                        return (
                          <div className="schedule__element__wrapper" key={subIndex}>
                            <div className="schedule__element__header__wrapper">
                              {
                                subItem.location &&
                                <div className="schedule__location__wrapper">
                                  <div className="location__absolute__wrapper">
                                    <img src={location} style={{width:'46px'}}/>
                                  </div>
                                  <span className="location__text">{subItem.location}</span>
                                </div>
                              }
                              <div className="schedule__element__header">
                                <div className="absolute__wrapper">
                                  <div className="dot__icon" />
                                </div>
                                <div className="schedule__text__wrapper">
                                  <span>{subItem.title}</span>
                                </div>
                              </div>
                            </div>
                            <div className="schedule__element__main__wrapper">
                              <div className="table__wrapper">
                                <div className="table__header">
                                  <span>{subItem.notice}</span>
                                </div>
                                <div className="table__main">
                                  <span></span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>

                  <div className="additional__schedule__wrapper">
                    <div className="index__wrapper">
                      <img src={hotelplate} style={{height:'24px'}}/>
                      <span>식사</span>
                    </div>
                    <div className="meal__info__wrapper">
                      <span>[조식] {item.breakfast ? item.breakfast : "없음"}</span>
                      <span>[중식] {item.lunch ? item.lunch : "없음"}</span>
                      <span>[석식] {item.dinner ? item.dinner : "없음"}</span>
                    </div>
                  </div>
                  <div className="additional__schedule__wrapper">
                    <div className="index__wrapper">
                      <img src={hotelbuilding} style={{height:'24px'}}/>
                      <span>호텔</span>
                    </div>
                    <div className="hotel__info__wrapper">
                      <span>{item.hotel}</span>
                      <div>
                        {/* <RatingBoard rating={parseInt(item.score)} /> */}
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
  );
}
