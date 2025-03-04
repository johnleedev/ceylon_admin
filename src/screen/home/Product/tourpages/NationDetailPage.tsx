import "./NationDetailPage.scss";
import { useEffect, useState } from "react";
import { FaCheck, FaRegCircle, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import TourImageData from "../../common/ProductImageData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainURL from "../../../../MainURL";
import { MdOutlineCalendarToday } from "react-icons/md";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import AirlineData from "../../../AirlineData";
import locationIcon from "../../images/tourPage/location.png"
import hotelbuildingIcon from "../../images/tourPage/hotelbuilding.png"
import hotelplateIcon from "../../images/tourPage/hotelplate.png"
import RatingBoard from "../../common/RatingBoard";
import { IoMdClose } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";
import ProductImageData from "../../common/ProductImageData";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaChevronRight } from "react-icons/fa6";


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

interface SelectScheduleListProps {
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
  sort: string;
  location: string;
  subLocation : string;
  locationTitle : string;
  locationContent : string;
  locationContentDetail : {name:string; notice:string[]}[];
  postImage : string;
}

export default function NationDetailPage() {
  
  const url = new URL(window.location.href);
  const ID = url.searchParams.get("id");

  let navigate = useNavigate();


  const [isScrollDown, setIsScrollDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isScrollDown && window.scrollY > 800) {
        setIsScrollDown(true);
        console.log('true')
      } else if (isScrollDown && window.scrollY < 700) {
        setIsScrollDown(false);
        console.log('flase')
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrollDown]);


  const [toUser, setToUser] = useState('발리');
  const [categoryMenu, setCategoryMenu] = useState('휴양지추천상품');
  
  const [productInfo, setProductInfo] = useState<any[]>([
    { 
      id: 0,
      productName : "파리 + 스위스",
      period: "5박 7일",
      schedule : "파리2박 + 인터라켄 2박 + 루체른 1박",
      image: ProductImageData.paris, 
      content: ["파리 허니문 스냅촬영", "지상50m 에펠탑1층 레스토랑 런치(3코스)", "1커플 단독 승용차 픽업, 미팅 서비스"],
      cost : "3,200,000",
      isSelected : true
    },
    { 
      id: 1,
      productName : "파리일주",
      period: "6일",
      schedule : "파리2박 + 루체른 1박 + 인터라켄 2박 + 몽트리 2박",
      image: ProductImageData.paris, 
      content: ["체스키크롬로프 포함", "루브르 입장권 제공", "드레스덴투어, 중식3회 포함"],
      cost : "3,200,000",
      isSelected : false
    },
    { 
      id: 2,
      productName : "파리 + 니스 렌트카",
      period: "9일",
      schedule : "파리2박 + 인터라켄 2박 + 루체른 1박",
      image: ProductImageData.paris, 
      content: ["파리 허니문 스냅촬영", "지상50m 에펠탑1층 레스토랑 런치(3코스)", "1커플 단독 승용차 픽업, 미팅 서비스"],
      cost : "3,200,000",
      isSelected : false
    }
  ]);
  

  const [flightType, setFlightType] = useState("직항");
  const [selectedAirlineIndex, setSelectedAirlineIndex] = useState(0);  
  const [directAirline, setDirectAirline] = useState<AirlineProps[]>([]);
  const [viaAirline, setViaAirline] = useState<AirlineProps[]>([]);

  const [isView, setIsView] = useState('');
  const [tourLocation, setTourLocation] = useState('');

  const [tourPeriodNight, setTourPeriodNight] = useState('');
  const [tourPeriodDay, setTourPeriodDay] = useState('');
  const [airlineName, setAirlineName] = useState('');
  const [departAirport, setDepartAirport] = useState('');
  const [departTime, setDepartTime] = useState('');
  const [arriveAirport, setArriveAirport] = useState('');
  const [arriveTime, setArriveTime] = useState('');
  const [airlineNameVia, setAirlineNameVia] = useState('');
  const [departAirportVia, setDepartAirportVia] = useState('');
  const [departTimeVia, setDepartTimeVia] = useState('');
  const [arriveAirportVia, setArriveAirportVia] = useState('');
  const [arriveTimeVia, setArriveTimeVia] = useState('');

  const [landCompany, setLandCompany] = useState('');
  const [productType, setProductType] = useState('');
  const [cautionNote, setCautionNote] = useState('');
  const [includeNote, setIncludeNote] = useState([]);
  const [includeNoteText, setIncludeNoteText] = useState('');
  const [notIncludeNote, setNotIncludeNote] = useState([]);
  const [notIncludeNoteText, setNotIncludeNoteText] = useState('');
  const [scheduleList, setScheduleList] = useState<SelectScheduleListProps[]>([]);
  const [reviseDate, setReviseDate] = useState('');
  
  // 게시글 가져오기
  const fetchPosts = async () => {
    // const resinfo = await axios.get(`${MainURL}/product/getscheduleall`)
    // if (resinfo.data) {
    //   const copy = [...resinfo.data];
    //   const result = copy.map((item: { id: string, tourLocation:string}) =>
    //     ({ 
    //       id: item.id,
    //       name : item.tourLocation,
    //       image: TourImageData.package1, 
    //       packagePeriod: "5박 7일",
    //       title: "선투숙리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
    //     })
    //   );
    //   setProductInfo(result);
    // } 
    const resschedule = await axios.post(`${MainURL}/product/getschedule`, {
      id : ID
    })
    if (resschedule.data) {
      const copy = resschedule.data[0];
      fetchAirplane(copy.nation, copy.tourLocation);
      fetchScheduleDetails(copy.id);
      setFlightType('직항')
      setIsView(copy.isView);
      setTourLocation(copy.tourLocation);
      setLandCompany(copy.landCompany);
      setProductType(copy.productType);
      setCautionNote(copy.cautionNote);
      setIncludeNote(JSON.parse(copy.includeNote));
      setIncludeNoteText(copy.includeNoteText);
      setNotIncludeNote(JSON.parse(copy.notIncludeNote));
      setNotIncludeNoteText(copy.notIncludeNoteText);
      setReviseDate(copy.reviseDate);
    } 
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

  
  const hotelDataSub = {
    id: 0,
    tourId: 0,
    title: "세인트 레지스 호텔",
    subtitle: "Saint Regis Hotel Bali",
    rating: 5,
    imagePath: TourImageData.hotelPageMain,
    mainBgImage: TourImageData.hotelPageMain,
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
      { type: 1, imagePath: TourImageData.hotelDetail1 },
      { type: 2, imagePath: TourImageData.hotelDetail2 },
      { type: 3, imagePath: TourImageData.hotelDetail3 },
      { type: 2, imagePath: TourImageData.hotelDetail3 },
    ],
    // hotelInfoImages: { webImagePath: "", mobileImagePath: mobileImagePath },
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


  const fetchAirplane = async (nation:string, location:string) => {
    const res = await axios.get(`${MainURL}/product/getairplane/${nation}/${location}`)
    if (res.data) {
      const copy = res.data;
      const parsedCopy = copy.map((item:any) => {return {...item, airlineData: JSON.parse(item.airlineData)};});
      const directAirlineCopy = parsedCopy.filter((e:any)=> e.sort === 'direct')
      const viaAirlineCopy = parsedCopy.filter((e:any)=> e.sort === 'via')
      setDirectAirline(directAirlineCopy);
      setViaAirline(viaAirlineCopy);
      setTourPeriodNight(directAirlineCopy[0].tourPeriodNight);
      setTourPeriodDay(directAirlineCopy[0].tourPeriodDay);
      setAirlineName(directAirlineCopy[0].airlineData[0].airlineName);
      setDepartAirport(directAirlineCopy[0].airlineData[0].departAirport);
      setDepartTime(directAirlineCopy[0].airlineData[0].departTime);
      setArriveAirport(directAirlineCopy[0].airlineData[0].arriveAirport);
      setArriveTime(directAirlineCopy[0].airlineData[0].arriveTime);
    } 
  };

  const fetchScheduleDetails = async (postId:any) => {
    const res = await axios.get(`${MainURL}/restproductschedule/getproductscheduledetails/${postId}`)
		if (res.data !== false) {
			const copy = res.data;
			const result = copy.map((item:any) => ({
				...item,
				scheduleDetail: JSON.parse(item.scheduleDetail)
			}));
      setScheduleList(result);
		}
  };


  return (
    <div className="nation_page">

      <div className="nation_detail_search__bar___wrapper">
        <div className="nation_detail_search__box">
          <IoLocationOutline className="nation_detail_search__text"/>
          <select value={toUser} onChange={(e)=>{setToUser(e.target.value)}} className="nation_detail_search__select">
            { ['발리','몰디브','칸쿤','푸켓'].map((option:any, index:any) => (
              <option key={index} value={option.value}>발리</option>
            ))}
          </select>
        </div>
        <div className="nation_detail_search__bar"></div>
        <div className="nation_detail_search__box">
          <select value={toUser} onChange={(e)=>{setToUser(e.target.value)}} className="nation_detail_search__select">
            { ['대서양','인도양','남미'].map((option:any, index:any) => (
              <option key={index} value={option.value}>전체</option>
            ))}
          </select>
        </div>
        <div className="nation_detail_search__bar"></div>
        <div className="nation_detail_search__box">
          <LuCalendarDays className="nation_detail_search__text"/>
          <div className="nation_detail_search__select">

          </div>
        </div>
        <div className="nation_detail_search__bar"></div>
        <div className="nation_detail_search__box">
          <HiOutlineBuildingOffice2 className="nation_detail_search__text"/>
          <select value={toUser} onChange={(e)=>{setToUser(e.target.value)}} className="nation_detail_search__select">
            { ['발리','몰디브','칸쿤','푸켓'].map((option:any, index:any) => (
              <option key={index} value={option.value}>리조트</option>
            ))}
          </select>
        </div>
        <div className="nation_detail_search__box">
          <div className="nation_detail_search__btn">
            찾기
          </div>
        </div>
      </div>

      <div className="nation__header__section__wrapper">
        <img className="bg__image" src={ProductImageData.paris} alt="temp" />
      </div>

      <div className="nation_detail_category__menu__section__wrapper">
        <div className="nation_detail_category__menu__content">
            {
              ["유럽추천상품", "프랑스", "이탈리아", "스위스", "오스트리아", "스페인", "동유럽", "포르투갈", "크로아티아", "산토리니", "북유럽"]
              .map((item:any, index:any)=>{
                return (
                  <div className={`category__menu-item ? ${categoryMenu === item ? 'on' : ''}`} 
                    key={index} onClick={()=>{setCategoryMenu(item);}}
                  >
                    <div className={`category__menu-face ${categoryMenu !== '' ? 'on' : ''}`} >{item}</div>
                    <div className={`category__menu-face2 ${categoryMenu === item ? 'on' : ''}`}> </div>
                  </div>
                )
              })
            }
        </div>
      </div>


      {/* 추천일정 커스텀 메이드 & 커스텀 오더 ------------------------------------------------------------------------- */}
      <div className="nation_detail_selector__productList__wrapper">
        <div className="nation_detail_selector__box">
          <div className={`nation_detail_selector__btn selected`}
            onClick={()=>{
              navigate(`/products/nationcustommade`, {state : scheduleList});
            }}
          >
            <div className="selector__btn__top_area">
              <p>추천 여행일정에서 개인의 취향에 맞는</p>
              <p>일정 및 호텔 변경을 할 수 있습니다.</p>
            </div>
            <div className="selector__btn__bottom_area">
              <h3>추천일정 커스텀 메이드</h3>
              <MdOutlineCalendarToday className="selector__btn__bottom_icon"/>
            </div>
          </div>
          <div className={`nation_detail_selector__btn`}
            onClick={()=>{
              navigate(`/products/nationcustomorder`);
            }}
          >
            <div className="selector__btn__top_area">
              <p>원하는 도시와 버킷리스트, 숙박, 음식 등 개별 요청사항에 맞추어</p>
              <p>한팀만을 위한 맞춤형 여행일정을 제공해 드립니다.</p>
            </div>
            <div className="selector__btn__bottom_area">
              <div style={{display:'flex', alignItems:'center'}}>
                <h3 style={{marginRight:'30px'}}>커스텀 오더</h3>
                <SlArrowRight className="selector__btn__bottom_icon2"/>
              </div>
              <PiPencilSimpleLineDuotone className="selector__btn__bottom_icon"/>
            </div>
          </div>
        </div>
      </div>
      
      {/* 여행상품 ----------------------------------------------------------------------------- */}

      <div className="product__item__list__wrapper resort_page_mx__section">
        <div className="header__title">
          <span>세인트레지스</span>
          <span> 추천 상품</span>
        </div>
        <div className="product__items__wrapper">
          {
            productInfo.map((item:any, index:any) => (
              <div className={`product__item__wrapper ${item.isSelected ? "selectedbox" : ""}`} key={index}
                onClick={()=>{
                  const copy = [...productInfo];
                  const result = copy.map((item, i) => ({
                    ...item,
                    isSelected: i === index ? true : false
                  }));
                  setProductInfo(result);
                }}
              >
                <div className="image__wrapper">
                  <img src={item.image} alt="temp" />
                </div>
                <div className="product__info__wrapper">
                  <div className="product__info__wrapper_left">
                    <div className="info__header">
                      <span className="tour__title">{item.productName}</span>
                      <span className="tour__period">{item.period}</span>
                    </div>
                    <div className="product__schedule">{item.schedule}</div>
                    <div className="product__content">
                      {
                        item.content.map((subItem:any, subIndex:any) => (
                          <div key={subIndex}>
                            <p>- {subItem}</p>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="product__info__wrapper_verticalBar"></div>
                  <div className="product__info__wrapper_right">
                    <div className="product__cost">₩ {item.cost}</div>
                    <p className="product__cost_sub">항공료불포함</p>
                    <div className={`product__cost_selectBtn_box ${item.isSelected ? "selected" : ""}`}>
                      <p>자세히 보기</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
   

      {/* 항공사별 일정표 ---------------------------------------------------------------------------------------------------------------- */}
      <div className="nation_detail_schedule__byairline__wrapper">
        <div className="nation_detail_schedule_header__wrapper">
          <span className="header__main">항공사별 일정표</span>
          <div className={"sidebar__wrapper"}
          >
            <span className={flightType === '직항' ? "selected__sidebar" : ""}
              onClick={() => {
                setFlightType('직항');
                setSelectedAirlineIndex(0);
              }}
            >직항</span>
            <span className={flightType === '경유' ? "selected__sidebar" : ""}
              onClick={() => {
                setFlightType('경유');
                setSelectedAirlineIndex(0);
              }}
            >경유</span>
          </div>
        </div>
        <div className="flight__items__wrapper">
          { flightType === '직항'
            ?
            directAirline.map((item:any, index:any)=>{

              const airlineWord = item.airlineData[0].airlineName.slice(0, 2); 
              const airlineWordCopy = (airlineWord === '5J' || airlineWord === '7C') ?  `A${airlineWord}` : airlineWord;
              const airlineImage = AirlineData[airlineWordCopy as keyof typeof AirlineData];

              return (
                (item.tourPeriodNight !== '' && item.tourPeriodDay !== '')
                ?
                <div className="flight__item__wrapper" key={index}>
                  <div className="airline__wrapper">
                    <img src={airlineImage} alt="temp" />
                    <span>
                      {item.airlineData[0].airlineName}
                    </span>
                  </div>
                  <div className="flight__schedule__wrapper">
                    <div className="flight__schedule_row">
                      <span>{item.airlineData[0].departAirport}</span>
                      <span>출발</span>
                      <span>({item.airlineData[0].departTime})</span>
                      <span>-</span>
                      <span>{item.airlineData[0].arriveAirport}</span>
                      <span>도착</span>
                      <span>({item.airlineData[0].arriveTime})</span>
                    </div>
                    <span>{tourLocation} {item.tourPeriodNight} {item.tourPeriodDay}</span>
                  </div>
                  <div className="flight__select__btn__wrapper "
                    onClick={()=>{
                      setSelectedAirlineIndex(index);
                      setTourPeriodNight(item.tourPeriodNight);
                      setTourPeriodDay(item.tourPeriodDay);
                      setAirlineName(item.airlineData[0].airlineName);
                      setDepartAirport(item.airlineData[0].departAirport);
                      setDepartTime(item.airlineData[0].departTime);
                      setArriveAirport(item.airlineData[0].arriveAirport);
                      setArriveTime(item.airlineData[0].arriveTime);
                    }}
                    >
                    <div className={selectedAirlineIndex === index ? "select__btn__wrapper checked" : "select__btn__wrapper"}>
                      <span>선택</span>
                      <FaCheck />
                    </div>
                  </div>
                </div>
                :
                <div className="flight__item__wrapper" style={{width:'100%', display:'flex', justifyContent:'center'}}>
                  <div style={{}}>직항 항공편이 없습니다.</div>
                </div>
              )
            })
            :
            viaAirline.map((item:any, index:any)=>{

              const airlineWord = item.airlineData[0].airlineName.slice(0, 2); 
              const airlineWordCopy = (airlineWord === '5J' || airlineWord === '7C') ?  `A${airlineWord}` : airlineWord;
              const airlineImage = AirlineData[airlineWordCopy as keyof typeof AirlineData];
              
              return ( 
                (item.tourPeriodNight !== '' && item.tourPeriodDay !== '')
                ?
                <div className="flight__item__wrapper" key={index}>
                  <div className="airline__wrapper">
                    <img src={airlineImage} alt="temp" />
                    <span>
                      {item.airlineData[0].airlineName}
                    </span>
                  </div>
                  <div className="flight__schedule__wrapper">
                    <div className="flight__schedule_row">
                      <div className="flight__schedule">
                        <span>{item.airlineData[0].departAirport}</span>
                        <span>출발</span>
                        <span>({item.airlineData[0].departTime})</span>
                        <span>-</span>
                        <span>{item.airlineData[0].arriveAirport}</span>
                        <span>도착</span>
                        <span>({item.airlineData[0].arriveTime})</span>
                      </div>
                      <div className="flight__schedule">
                        <span>{item.airlineData[1].departAirport}</span>
                        <span>출발</span>
                        <span>({item.airlineData[1].departTime})</span>
                        <span>-</span>
                        <span>{item.airlineData[1].arriveAirport}</span>
                        <span>도착</span>
                        <span>({item.airlineData[1].arriveTime})</span>
                      </div>
                    </div>
                    <span>{tourLocation} {item.tourPeriodNight} {item.tourPeriodDay}</span>
                  </div>
                  <div className="flight__select__btn__wrapper"
                    onClick={()=>{
                      setSelectedAirlineIndex(index);
                      setTourPeriodNight(item.tourPeriodNight);
                      setTourPeriodDay(item.tourPeriodDay);
                      setAirlineName(item.airlineData[0].airlineName);
                      setDepartAirport(item.airlineData[0].departAirport);
                      setDepartTime(item.airlineData[0].departTime);
                      setArriveAirport(item.airlineData[0].arriveAirport);
                      setArriveTime(item.airlineData[0].arriveTime);
                      setAirlineNameVia(item.airlineData[1].airlineName);
                      setDepartAirportVia(item.airlineData[1].departAirport);
                      setDepartTimeVia(item.airlineData[1].departTime);
                      setArriveAirportVia(item.airlineData[1].arriveAirport);
                      setArriveTimeVia(item.airlineData[1].arriveTime);
                    }}
                  >
                    <div className={selectedAirlineIndex === index ? "select__btn__wrapper checked" : "select__btn__wrapper"}>
                      <span>선택</span>
                      <FaCheck />
                    </div>
                  </div>
                </div>
                :
                <div className="flight__item__wrapper" style={{width:'100%', display:'flex', justifyContent:'center'}}>
                  <div style={{}}>경유지 항공편이 없습니다.</div>
                </div>
              )
            })
          }
        </div>
      </div>
    

      {/* 일정표 ---------------------------------------------------------------------------------------------------------------- */}
      <div className="nation_detail_mx__section">
        <div className="nation_detail_schedule_header__wrapper">
          <span className="header__main">일정표</span>
          <span className="header__sub">
            KE 대한항공 인천 오후 출발 (17:40) / {tourLocation} {tourPeriodNight} {tourPeriodDay} (2024.10.16 ~
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
                      <>
                      { flightType === '직항'
                        ?
                        <div className="schedule__element__wrapper">
                          <div className="flight__schedule__board__wrapper">
                            <div className="flight__schedule__board">
                              <div className="flight__info__wrapper">
                                <img src={AirlineData.KE} alt="temp" />
                                <span>{airlineName}</span>
                              </div>
                              <div className="flight__time__wrapper">
                                <span className="flight__time">07시간 30분</span>
                                <div className="depart__info">
                                  <div />
                                  <span className="time__text">{departTime}</span>
                                  <span className="airport__text">{departAirport} 출발</span>
                                </div>
                                <div className="arrive__info">
                                  <div />
                                  <span className="time__text">{arriveTime}</span>
                                  <span className="airport__text">{arriveAirport} 도착</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        :
                        <div className="schedule__element__wrapper">
                          <div className="flight__schedule__board__wrapper">
                            <div className="flight__schedule__board" style={{marginBottom:'50px'}}>
                              <div className="flight__info__wrapper">
                                <img src={AirlineData.KE} alt="temp" />
                                <span>{airlineName}</span>
                              </div>
                              <div className="flight__time__wrapper">
                                <span className="flight__time">07시간 30분</span>
                                <div className="depart__info">
                                  <div />
                                  <span className="time__text">{departTime}</span>
                                  <span className="airport__text">{departAirport} 출발</span>
                                </div>
                                <div className="arrive__info">
                                  <div />
                                  <span className="time__text">{arriveTime}</span>
                                  <span className="airport__text">{arriveAirport} 도착</span>
                                </div>
                              </div>
                            </div>
                            <div className="flight__schedule__board">
                              <div className="flight__info__wrapper">
                                <img src={AirlineData.KE} alt="temp" />
                                <span>{airlineNameVia}</span>
                              </div>
                              <div className="flight__time__wrapper">
                                <span className="flight__time">07시간 30분</span>
                                <div className="depart__info">
                                  <div />
                                  <span className="time__text">{departTimeVia}</span>
                                  <span className="airport__text">{departAirportVia} 출발</span>
                                </div>
                                <div className="arrive__info">
                                  <div />
                                  <span className="time__text">{arriveTimeVia}</span>
                                  <span className="airport__text">{arriveAirportVia} 도착</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      </>
                      
                    }
                    {
                      item.scheduleDetail.map((subItem:any, subIndex:any)=>{

                        return (
                          <div className="schedule__element__wrapper" key={subIndex}>
                            <div className="schedule__element__header__wrapper">
                              {
                                subItem.location !== '' &&
                                <div className="schedule__location__wrapper">
                                  <div className="location__absolute__wrapper">
                                    <img src={locationIcon} style={{width:'46px'}}/>
                                  </div>
                                  <span className="location__text">{subItem.location}</span>
                                </div>
                              }
                            </div>
                            {
                              subItem.locationDetail.map((detailItem:any, detailIndex:number)=>{
                                return (
                                  <div key={detailIndex}>
                                    <div className="schedule__element__header__wrapper">
                                      <div className="schedule__element__header">
                                        <div className="absolute__wrapper">
                                          <div className="dot__icon" />
                                        </div>
                                        <div className="schedule__text__wrapper">
                                          <span>{detailItem.subLocation}</span>
                                        </div>
                                      </div>
                                    </div>
                                    {
                                      detailItem.subLocationDetail.map((subDetailItem:any, subDetailIndex:number)=>{

                                        const postImages = subDetailItem.postImage ? JSON.parse(subDetailItem.postImage) : "";

                                        return (
                                          <div className="schedule__element__main__wrapper" key={subDetailIndex}>
                                            <div className="image__wrapper">
                                              <div className="imagebox">
                                                <img style={{height:'100%', width:'100%'}}
                                                  src={`${MainURL}/images/scheduleboximages/${postImages[0]}`}
                                                />                                                
                                              </div>
                                            </div>
                                            <div className="table__wrapper">
                                              <div className="table__header">
                                                <span>{subDetailItem.locationTitle}</span>
                                              </div>
                                              <div className="table__main">
                                                <span>{subDetailItem.locationContent}</span>
                                              </div>
                                            </div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                )
                              })
                            }
                            </div>
                        )
                      })
                    }
                  </div>

                  <div className="additional__schedule__wrapper">
                    <div className="index__wrapper">
                      <img src={hotelplateIcon} style={{height:'24px'}}/>
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
                      <img src={hotelbuildingIcon} style={{height:'24px'}}/>
                      <span>호텔</span>
                    </div>
                    <div className="additional__info__wrapper">
                      <p>{item.hotel}</p>
                      <div className="additional__rating__wrapper">
                        <RatingBoard rating={parseInt(item.score)} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* 포함/불포함  ----------------------------------------------------------------------------------  */}
      <div className="nation_detail_included__items__section__wrapper nation_detail_mx__section">
        <div className="single__header__main">포함/불포함</div>
        <div className="included__items__wrapper">
          <div className="index__title__wrapper">
            <span className="included__icon"><FaRegCircle size={14}/></span>
            <span>포함사항</span>
          </div>
          <div className="elements__wrapper">
            {
              includeNote.map((item:any, index:any)=>{
                return (
                  <span key={index}>{item}</span>
                )
              })
            }
            <span>- {includeNoteText}</span>
          </div>
          <div className="index__title__wrapper">
            <span className="unincluded__icon"><IoMdClose size={18}/></span>
            <span>불포함사항</span>
          </div>
          <div className="elements__wrapper">
            {
              notIncludeNote.map((item:any, index:any)=>{
                return (
                  <span key={index}>{item}</span>
                )
              })
            }
            <span>- {notIncludeNoteText}</span>
          </div>
        </div>
      </div>

      {
        (cautionNote !== '' && cautionNote !== null) &&
        <div className="nation_detail_must__read__section__wrapper nation_detail_mx__section">
          <div className="single__header__main">필독사항</div>
          <div className="must__read__wrapper">
            {cautionNote}
          </div>
        </div>
      }
      
      {/* 필독사항  ----------------------------------------------------------------------------------  */}
      <div className="nation_detail_must__read__section__wrapper nation_detail_mx__section">
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

      {/* 하단버튼  ----------------------------------------------------------------------------------  */}
      <div className="nation_detail_bottom_btn_cover nation_detail_mx__section">
        <div className="nation_detail_bottom_btn"
          style={{backgroundColor:'#37b0d9', width:'100%'}}
          onClick={()=>{
            window.scrollTo(0, 0);
            navigate(`/products/nationcustommade`, {state : scheduleList});
          }}
        >
          <p style={{color:'#fff'}}>추천일정 커스텀 메이드</p>
        </div>
      </div>
      
      {/* 하단버튼  ----------------------------------------------------------------------------------  */}
      {
        isScrollDown &&
        <div className="nation_detail_bottom_modal_cover">
          <div className="nation_detail_bottom_modal" 
            onClick={()=>{
              window.scrollTo(0, 0);
              navigate(`/products/nationcustommade`, {state : scheduleList});
            }}
          >
            <p style={{color:'#fff'}}>추천일정 커스텀 메이드</p>
            <FaChevronRight className="bottom_modal_icon"/>
          </div>
        </div>
      }

    </div>
  );
}
