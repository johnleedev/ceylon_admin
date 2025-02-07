import "./ResortPage.scss";
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

export default function HotelPage() {
  
  const url = new URL(window.location.href);
  const ID = url.searchParams.get("id");

  let navigate = useNavigate();
  const [category, setCategory] = useState('notice');
  const [productTypeSelectedBtn, setProductTypeSelectedBtn] = useState('기본일정');
  const [productListSelectedBtn, setProductListSelectedBtn] = useState(0);

  const [scheduleInfo, setScheduleInfo] = useState<any[]>([]);
  const [categoryBtn, setCategoryBtn] = useState('1');

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
    const resinfo = await axios.get(`${MainURL}/product/getscheduleall`)
    if (resinfo.data) {
      const copy = [...resinfo.data];
      const result = copy.map((item: { id: string, tourLocation:string}) =>
        ({ 
          id: item.id,
          name : item.tourLocation,
          image: TourImageData.package1, 
          packagePeriod: "5박 7일",
          title: "선투숙리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
        })
      );
      setScheduleInfo(result);
    } 
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

  const resortListData = [
    {productName:"하퍼꾸따 2박 + 세인트레지스 가든1뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박", 
      period:"5박 7일", keyword:["#얼리버드","#추천풀빌라"]},
    {productName:"하퍼꾸따 2박 + 세인트레지스 원베드 풀빌라 2박 + 세인트레지스 오션뷰 풀빌라 2박", 
      period:"6박 8일", keyword:["#얼리버드","#추천풀빌라"]},
    {productName:"포포인트츠 바이 2박 + 세인트레지스 오션뷰 풀빌라 3박", 
      period:"6박 8일", keyword:["#얼리버드","#추천풀빌라"]},
  ]


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
    <div className="resort_page">

       <div className="resort_page__header__section___wrapper">
        <img className="resort_page_bg__image" src={hotelDataSub.mainBgImage} alt="temp" />
        <div className="resort_page_header__info">
          <span className="header__subtitle">{hotelDataSub.subtitle}</span>
          <span className="resort_page_header__title">{hotelDataSub.title}</span>
          <div className="resort_page_header__loc__rating">
            <span className="header__location">발리 {'>'} 꾸따</span>
            <div className="header__rating">
               <FaStar />
               <FaStar />
               <FaStar />
            </div>
          </div>
          <span className="header__desc">{hotelDataSub.description}</span>
        </div>
      </div>

      <div className="resort_page_category__selector__wrapper">
        <div
          className={`category__bar ${
            category === "notice" ? "on" : ""
          }`}
          onClick={() => {
            setCategory("notice");
            setProductTypeSelectedBtn('기본일정');
          }}
        >
          리조트안내
        </div>
        <div
          className={`category__bar ${
            category === "product" ? "on" : ""
          }`}
          onClick={() => setCategory("product")}
        >
          상품보기
        </div>
      </div>

      {/* 리조트 상품보기 상단 -------------------------------------------------------------------------------- */}
      
      {
        category === "product" && 
        <>
          <div className="resort_detail_selector__productList__wrapper">
            <div className="resort_detail_selector__box">
              <div className={`resort_detail_selector__btn ${productTypeSelectedBtn === '기본일정' ? "selected" : ""}`}
                onClick={()=>{
                  setProductTypeSelectedBtn('기본일정');
                }}
              >
                <div className="selector__btn__top_area">
                  <p>여행의 에센셜로 가득한</p>
                  <p>베스트 일정</p>
                </div>
                <div className="selector__btn__bottom_area">
                  <h3>기본일정</h3>
                  <MdOutlineCalendarToday className="selector__btn__bottom_icon"/>
                </div>
              </div>
              <div className={`resort_detail_selector__btn ${productTypeSelectedBtn === '커스텀오더' ? "selected" : ""}`}
                onClick={()=>{
                  setProductTypeSelectedBtn('커스텀오더');
                }}
              >
                <div className="selector__btn__top_area">
                  <p>내가 원하는대로 일정을 변경하고 직접 만들 수 있는 맞춤여행</p>
                  <p>#호텔변경 #일정변경 #VIP서비스 추가 등</p>
                </div>
                <div className="selector__btn__bottom_area">
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{marginRight:'30px'}}>커스텀오더</h3>
                    <SlArrowRight className="selector__btn__bottom_icon2"/>
                  </div>
                  <PiPencilSimpleLineDuotone className="selector__btn__bottom_icon"/>
                </div>
              </div>
            </div>

            {
              productTypeSelectedBtn === '기본일정' &&
              <div className="resort_detail_productList__box">
              {
                resortListData.map((item:any, index:any)=>{
                  return (
                    <div className={`resort_detail_productList_textRow ${productListSelectedBtn === index ? "selected" : ""}`} key={index} >
                      <div className="resort_detail_productList_text_left">
                        <h3>{item.productName}</h3>
                        <h3>{item.period}</h3>
                      </div>
                      <div className="resort_detail_productList_text_middle">
                        {
                          item.keyword.map((subItem:any, subIndex:any)=>(
                            <p key={subIndex}>{subItem}</p>
                          ))
                        }
                      </div>
                      <div className="resort_detail_productList_text_right">
                        <div className="productList_text_btn"
                          onClick={()=>{
                            setProductListSelectedBtn(index);
                          }}
                        >
                          <p>자세히보기</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            }
          </div>
         
          {
            productTypeSelectedBtn === '기본일정' &&
            <>
              <div className="resort_detail_acommodation__selector__wrapper">
                <span className="sub__text">인천출발 / 발리 5박 7일</span>
                <div className="selected__item__wrapper">
                  <span className="selected__item">
                    [꾸따] 포 포인츠 바이 쉐라톤 디럭스 라군 2박 + [누사두아]
                    세인트레지스 풀빌라 2박
                  </span>
                </div>
              </div>

              <div className="resort_detail_roomtype__selector__wrapper">
                <div className="resort__selector__wrapper">
                  <div className={`resort__selector__Btn ${categoryBtn === "1" ? "selected" : ""}`}
                    onClick={()=>{setCategoryBtn('1')}}
                  >
                    <p>포 포인츠 바이 쉐리톤</p>
                  </div>
                  <div className={`resort__selector__Btn ${categoryBtn === "2" ? "selected" : ""}`}
                    onClick={()=>{setCategoryBtn('2')}}
                  >
                    <p>세인트레지스 풀빌라</p>
                  </div>
                </div>
              </div>
            </>
          }
        </>
      }
      
      {
        productTypeSelectedBtn === '기본일정' &&
        <>
          {/* 호텔 이미지 박스 ------------------------------------------------------------------------------------------------------------------------ */}
          <div className="resort_page_image__selector__wrapper">
            <div className="images__grid__wrapper">
              {
              hotelDataSub.hotelImages.map((image, idx) => {
                
                return (
                  <div key={idx}>
                    <img src={image.imagePath} alt="temp" />
                    {idx === 3 && (
                      <div
                        className="mobile__show__all__btn"
                        onClick={() => {}}
                      >
                        <span>사진 모두 보기</span>
                        {/* <span>{`+${hotelDataSub.hotelImages.length}`}</span> */}
                      </div>
                    )}
                  </div>
                )
              })
              }
            </div>
          </div>
          
          {/* 호텔 정보 박스 ------------------------------------------------------------------------------------------------------------------------ */}
          <div className="resort_page_info__items__wrapper resort_page_mx__section">
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
                  <li key={idx} className="item__title_text">- {item}</li>
                ))}
              </ul>
            </div>
            <div className={"only-web"}>
              <span className="item__title">호텔 위치</span>
              <ul>
                <li key="address" className="item__title_text">{`주소 : ${hotelDataSub.address.state} ${hotelDataSub.address.city} ${hotelDataSub.address.detailAddress}`}</li>
                {hotelDataSub.nearby.map(({ distance, name }, idx) => (
                  <li key={idx} className="item__title_text">{`${distance} - ${name}`}</li>
                ))}
                <div className="map__view__btn">
                  <FaLocationDot />
                  <span>호텔 위치 보기</span>
                </div>
              </ul>
            </div>
          </div>
        </>
      }

      {/* 호텔 상세이미지 박스 ------------------------------------------------------------------------------------------------------------------------ */}
      {
        (category === 'notice' && productTypeSelectedBtn === '기본일정') &&
        <div className="resort_page_resort__info__image__wrapper">
          <div className="only-web web__image__wrapper resort_page_mx__section">
            <img alt="temp" src={`${MainURL}/images/hoteldetailimages/test.jpg`} />
          </div>
        </div>
      }
      
      {/* 호텔 상품 박스 ------------------------------------------------------------------------------------------------------------------------ */}
      {
        (category === 'notice' && productTypeSelectedBtn === '기본일정') &&
        <div className="package__item__list__wrapper resort_page_mx__section">
          <div className="header__title">
            <span>세인트레지스</span>
            <span> 추천 상품</span>
          </div>
          <div className="package__items__wrapper">
            {scheduleInfo.map((item, idx) => (
              <div className="package__item__wrapper"
                onClick={()=>{
                  window.scrollTo(0, 0);
                  navigate(`/products/resortdetail?id=${item.id}`);
                }}
              >
                <div className="image__wrapper">
                  <img src={item.image} alt="temp" />
                </div>
                <div className="package__info__wrapper">
                  <div className="info__header">
                    <span className="tour__title">{item.name}</span>
                    <span className="tour__period">{item.packagePeriod}</span>
                  </div>
                  <span className="package__title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }

      {
        (category === 'product' && productTypeSelectedBtn === '기본일정') &&
        <>
       
       {/* 항공사별 일정표 ---------------------------------------------------------------------------------------------------------------- */}
        <div className="resort_detail_schedule__byairline__wrapper">
          <div className="resort_detail_schedule_header__wrapper">
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
        <div className="resort_detail_mx__section">
          <div className="resort_detail_schedule_header__wrapper">
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
        <div className="resort_detail_included__items__section__wrapper resort_detail_mx__section">
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
          <div className="resort_detail_must__read__section__wrapper resort_detail_mx__section">
            <div className="single__header__main">필독사항</div>
            <div className="must__read__wrapper">
              {cautionNote}
            </div>
          </div>
        }
        
        {/* 필독사항  ----------------------------------------------------------------------------------  */}
        <div className="resort_detail_must__read__section__wrapper resort_detail_mx__section">
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
        <div className="resort_detail_bottom_btn_cover resort_detail_mx__section">
          <div className="resort_detail_bottom_btn"
            style={{border:'1px solid #37b0d9'}}
          >
            <p style={{color:'#37b0d9'}}>찜하기</p>
          </div>
          <div className="resort_detail_bottom_btn"
            style={{border:'1px solid #37b0d9'}}
          >
            <p style={{color:'#37b0d9'}}>상담요청</p>
          </div>
          <div className="resort_detail_bottom_btn"
            style={{backgroundColor:'#37b0d9'}}
          >
            <p style={{color:'#fff'}}>일정변경요청하기</p>
          </div>
          <div className="resort_detail_bottom_btn"
            style={{backgroundColor:'#172aba'}}
          >
            <p style={{color:'#fff'}}>예약요청하기</p>
          </div>
        </div>


        </>
      }

      {/* 커스텀오더 메인 박스 ------------------------------------------------------------------------------------  */}
      {
                
        (category === 'product' && productTypeSelectedBtn === '커스텀오더') &&
        <>
        <div className="resort_page_resort__info__image__wrapper">
          <div className="only-web web__image__wrapper resort_page_mx__section">
            <img alt="temp" src={ProductImageData.cutomMainImage} />
          </div>
        </div>

        <div className="resort_custom_bottom__content__wrapper">
          <div className="resort_custom_bottom__box">
            <div className="resort_custom_bottom__leftbox">
              <div className="custom_bottom__box__top_area">
                <h3>나에게 딱 맞는 여행!</h3>
              </div>
              <div className="custom_bottom__box__middle_area">
                <p>#호텔변경</p>
                <p>#일정변경</p>
                <p>#요금할인</p>
                <p>#VIP서비스받기</p>
                <p>#맛집</p>
                <p>#핫스팟</p>
              </div>
              <div className="custom_bottom__box__bottom_area">
                <p>추천 여행일정에서 개인의 취향에 맞게 일정변경 및 요청사항을 신청할 수 있으며 
                   처음부터 내가 원하는 일정만으로 선택해서 떠날수 있고 여행기간 내 고객 케어를 받으며
                  한층 업그레이드된 안전하고 편안한 자유여행을 즐길 수 있습니다.</p>
              </div>
            </div>
            <div className="resort_custom_bottom__rightbox">
              <div className="custom_bottom__box_btn"
                onClick={()=>{
                  navigate(`/products/resortcustomorder`);
                  window.scrollTo(0, 0);
                }}
              >
                <p>(휴양지) 시작하기</p>
              </div>
              <div className="custom_bottom__box_btn"
                onClick={()=>{
                  navigate(`/products/resortcustomordermc`);
                  window.scrollTo(0, 0);
                }}
              >
                <p>(몰디브/칸쿤) 시작하기</p>
              </div>
            </div>
          </div>
        </div>
        </>
      }


    </div>
  );
}
