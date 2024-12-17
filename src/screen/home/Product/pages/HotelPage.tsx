import "./HotelPage.scss";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import TourImageData from "../../common/TourImageData";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainURL from "../../../../MainURL";


export default function HotelPage() {
 
  let navigate = useNavigate();

  const [scheduleInfo, setScheduleInfo] = useState<any[]>([]);
  
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
  };

  useEffect(() => {
    fetchPosts();
  }, []);  

  const [category, setCategory] = useState('notice');

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


  return (
    <div className="hotel_page">

       <div className="hotel_page__header__section___wrapper">
        <img className="hotel_page_bg__image" src={hotelDataSub.mainBgImage} alt="temp" />
        <div className="hotel_page_header__info">
          <span className="header__subtitle">{hotelDataSub.subtitle}</span>
          <span className="hotel_page_header__title">{hotelDataSub.title}</span>
          <div className="hotel_page_header__loc__rating">
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

      <div className="hotel_page_category__selector__wrapper">
        <div
          className={`category__bar ${
            category === "notice" ? "on" : ""
          }`}
          onClick={() => setCategory("notice")}
        >
          리조트안내
        </div>
        <div
          className={`category__bar ${
            category === "list" ? "on" : ""
          }`}
          onClick={() => setCategory("list")}
        >
          상품보기
        </div>
      </div>

      {
        category === 'notice' &&
        <>
          <div className="hotel_page_image__selector__wrapper">
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

          <div className="hotel_page_info__items__wrapper hotel_page_mx__section">
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
          <div className="hotel_page_hotel__info__image__wrapper">
            <div className="only-web web__image__wrapper hotel_page_mx__section">
              <img alt="temp" />
              
            </div>
          </div>
        </>
      }
      
      <div className="package__item__list__wrapper hotel_page_mx__section">
        <div className="header__title">
          <span>세인트레지스</span>
          <span> 추천 상품</span>
        </div>
        <div className="package__items__wrapper">
          {scheduleInfo.map((item, idx) => (
            <div className="package__item__wrapper"
              onClick={()=>{
                window.scrollTo(0, 0);
                navigate(`/products/hotelresortdetail?id=${item.id}`);
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
    
    </div>
  );
}
