import "./TourDetailPage.scss";
import { useCallback, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import TourImageData from "../../common/TourImageData";
import CommonImageData from "../../common/CommonImageData";
import RatingBoard from "../../common/RatingBoard";
import { useNavigate } from "react-router-dom";

export default function ResortDetailPage() {
  
  let navigate = useNavigate();
  const categoryObjs = [
    { idx: 0, title: "전체" },
    { idx: 1, title: "쿠타" },
    { idx: 2, title: "스미낙" },
    { idx: 3, title: "잠바란" },
    { idx: 4, title: "우붓" },
  ];

  const hotelObjs = [
    { id: 0, title: "콘레드", rating: 3, location: '발리/스미냑', image: CommonImageData.hotel_01 },
    { id: 1, title: "반얀트리", rating: 4, location: '발리/스미냑', image: CommonImageData.hotel_02 },
    { id: 2, title: "세인트레지스", rating: 5, location: '발리/스미냑', image: CommonImageData.hotel_03 },
    { id: 3, title: "르메르디앙", rating: 3, location: '발리/스미냑', image: CommonImageData.hotel_04 },
    { id: 4, title: "노보텔", rating: 4, location: '발리/스미냑', image: CommonImageData.hotel_05 },
    { id: 5, title: "콘래드", rating: 5, location: '발리/스미냑', image: CommonImageData.hotel_06 },
    { id: 6, title: "반얀트리", rating: 4, location: '발리/스미냑', image: CommonImageData.hotel_07 },
    { id: 7, title: "세인트", rating: 3, location: '발리/스미냑', image: CommonImageData.hotel_08 },
  ]



  const formatRatingArray = useCallback((rating: number) => {
    const integerPart = Math.floor(rating);
    const fractionalPart = Math.round((rating - integerPart) * 100);

    return new Array(5).fill(0).map((_, i) => {
      if (i < integerPart) {
        return 100;
      }
      if (i === integerPart) {
        return fractionalPart;
      }
      return 0;
    });
  }, []);

  // -----------------------------------------------------------------------------------------------------------------------
  const [toUser, setToUser] = useState('발리');
  const [category, setCategory] = useState('resortinfo');
  const [categoryBtn, setCategoryBtn] = useState('recommend');
  const [sidebar, setSidebar] = useState('전체');

  return (
    <div className="tour_detail_">

      <div className="tour_detail_search__bar___wrapper">
        <div className="tour_detail_search__box">
          <IoLocationOutline className="tour_detail_search__text"/>
          <select value={toUser} onChange={(e)=>{setToUser(e.target.value)}} className="tour_detail_search__select">
            { ['발리','몰디브','칸쿤','푸켓'].map((option:any, index:any) => (
              <option key={index} value={option.value}>발리</option>
            ))}
          </select>
        </div>
        <div className="tour_detail_search__bar"></div>
        <div className="tour_detail_search__box">
          <select value={toUser} onChange={(e)=>{setToUser(e.target.value)}} className="tour_detail_search__select">
            { ['대서양','인도양','남미'].map((option:any, index:any) => (
              <option key={index} value={option.value}>전체</option>
            ))}
          </select>
        </div>
        <div className="tour_detail_search__bar"></div>
        <div className="tour_detail_search__box">
          <LuCalendarDays className="tour_detail_search__text"/>
          <div className="tour_detail_search__select">

          </div>
        </div>
        <div className="tour_detail_search__bar"></div>
        <div className="tour_detail_search__box">
          <HiOutlineBuildingOffice2 className="tour_detail_search__text"/>
          <select value={toUser} onChange={(e)=>{setToUser(e.target.value)}} className="tour_detail_search__select">
            { ['발리','몰디브','칸쿤','푸켓'].map((option:any, index:any) => (
              <option key={index} value={option.value}>리조트</option>
            ))}
          </select>
        </div>
        <div className="tour_detail_search__box">
          <div className="tour_detail_search__btn">
            찾기
          </div>
        </div>
      </div>

      <div className="tour__header__section__wrapper">
        <img className="bg__image" src={TourImageData.tourDetailMain_bg} alt="temp" />
        <div className="header__info">
          <span className="header__title">몰디브</span>
          <span className="header__subtitle">Maldives</span>
        </div>
      </div>
      
      <div className="tour_detail_category__section__wrapper">
        
        <div className="tour_detail_category__selector__box">
          <div
            className={`tour_detail_category__bar ${
              category === "resortinfo" ? "on" : ""
            }`}
            onClick={() => setCategory("resortinfo")}
          >
            리조트 안내
          </div>
          <div
            className={`tour_detail_category__bar ${
              category === "nationinfo" ? "on" : ""
            }`}
            onClick={() => setCategory("nationinfo")}
          >
            발리 안내
          </div>
          <div
            className={`tour_detail_category__bar ${
              category === "schedule" ? "on" : ""
            }`}
            onClick={() => setCategory("schedule")}
          >
            일정 미리보기
          </div>
        </div>

        <div className="tour_detail_category__selectorBtn__box">
          <div
            className={`tour_detail_category__Btn ${
              categoryBtn === "recommend" ? "on" : ""
            }`}
            onClick={() => setCategoryBtn("recommend")}
          >
            추천 풀빌라
          </div>
          <div
            className={`tour_detail_category__Btn ${
              categoryBtn === "early" ? "on" : ""
            }`}
            onClick={() => setCategoryBtn("early")}
          >
            얼리버드 프로모션
          </div>
          <div
            className={`tour_detail_category__Btn ${
              categoryBtn === "family" ? "on" : ""
            }`}
            onClick={() => setCategoryBtn("family")}
          >
            가족여행 추천 리조트
          </div>
          <div
            className={`tour_detail_category__Btn ${
              categoryBtn === "stay" ? "on" : ""
            }`}
            onClick={() => setCategoryBtn("stay")}
          >
            우붓 스테이
          </div>
        </div>


        <div className="tour_detail_hotel__list__wrapper">

          <div className="tour_detail_pb-2">
            <div className={"tour_detail_sidebar__wrapper"}>
              {categoryObjs.map(({ idx, title }) => (
                <span
                  key={idx}
                  className={sidebar === title ? "selected__sidebar" :  ""}
                  onClick={() => {
                    setSidebar(title)
                  }}
                >
                  {title}
                </span>
              ))}
            </div>
          </div>

          <div className="tour_detail_category__items__wrapper">
            {
              hotelObjs.map((hotelObj:any) => (
                <div key={hotelObj.id}>
                  <div className="tour_detail_card__wrapper"
                    onClick={()=>{
                      window.scrollTo(0, 0);
                      navigate("/products/hotelresort");
                    }}
                  >
                    <div className="tour_detail_image__wrapper">
                      <img src={hotelObj.image} alt="temp" />
                    </div>
                    <span className="tour_detail_card__title">{hotelObj.title}</span>
                    <div className="tour_detail__card__info">
                      <span>
                        {hotelObj.location}
                      </span>
                      <div className="tour_detail__rating__wrapper">
                        <RatingBoard rating={hotelObj.rating} />
                      </div>
                    </div>
                    <span className="tour_detail_promotion__duedate">{`[프로모션 기간 2024년 12월 31일까지]`}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>

    </div>
  );
}
