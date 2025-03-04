import "./MainPage.scss";
import { useCallback, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LuCalendarDays } from "react-icons/lu";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import ProductImageData from "../common/ProductImageData";
import CommonImageData from "../common/CommonImageData";
import RatingBoard from "../common/RatingBoard";
import { useNavigate } from "react-router-dom";

export default function TourMainPage() {
  
  let navigate = useNavigate();
  const categoryObjs = [
    { idx: 0, title: "전체" },
    { idx: 1, title: "쿠타" },
    { idx: 2, title: "스미낙" },
    { idx: 3, title: "잠바란" },
    { idx: 4, title: "우붓" },
  ];

  const nationObjs = [
    { id: 0, title: "프랑스", rating: 3, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 1, title: "파리+이태리", rating: 4, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 2, title: "파리+프라하", rating: 5, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 3, title: "파리+스위스", rating: 3, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 4, title: "파리+스위스+이태리", rating: 4, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 5, title: "파리+스페인", rating: 5, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 6, title: "파리+런던", rating: 4, location: '발리/스미냑', image: ProductImageData.paris },
    { id: 7, title: "파리+이태리", rating: 3, location: '발리/스미냑', image: ProductImageData.paris },
  ]

  const hotelObjs22 = [
    { id: 0, title: "파드라 리조트", rating: 3, image: CommonImageData.hotel_01,
      address: { contury: "인도네시아", state: "발리", city: "쿠타", detailAddress: "Sauthon Road"} },
    { id: 1, title: "더 카욘 정글 리조트 우붓", rating: 4, image: CommonImageData.hotel_02,
      address: { contury: "인도네시아", state: "발리", city: "쿠타", detailAddress: "Sauthon Road"} },
    { id: 2, title: "아야나 풀빌라", rating: 5, image: CommonImageData.hotel_03,
      address: { contury: "인도네시아", state: "발리", city: "쿠타", detailAddress: "Sauthon Road"}}
  ]


  // -----------------------------------------------------------------------------------------------------------------------
  const [toUser, setToUser] = useState('발리');
  const [category, setCategory] = useState('resortinfo');
  const [categoryMenu, setCategoryMenu] = useState('휴양지추천상품');
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
        <img className="bg__image" src={ProductImageData.paris} alt="temp" />
      </div>

      <div className="tour_detail_category__menu__section__wrapper">
        <div className="tour_detail_category__menu__content">
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

      {/* 중간 리스트 섹션 -------------------------------------------------------------------------------------------------- */}
      
      <div className="tour_detail_category__section__wrapper">
        
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
              nationObjs.map((hotelObj:any) => (
                <div key={hotelObj.id}>
                  <div className="tour_detail_card__wrapper"
                    onClick={()=>{
                      window.scrollTo(0, 0);
                      navigate(`/products/nationdetail?id=1`);
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

      {/* 하단 리스트 섹션 -------------------------------------------------------------------------------------------------- */}
      <div className="tour_bottom_best__section__wrapper">
        <div className="section__header__wrapper">
          <div className="section__title">
            <span>Best</span>
            <div className="section__main__title">
              <span>실론투어</span>
              <span>휴양지</span>
            </div>
            <div className="section__mobile__title">
              <span>올인크루시브</span>
              <span>리조트</span>
            </div>
          </div>
          <div className="section__desc">
            <span>여행전문가가 추천하는</span>
            <span>최고의 휴식</span>
          </div>
        </div>
        <div className="promotion__cards__wrapper">
          {hotelObjs22.slice(0,3).map((obj) => (
             <div className="recommend__card__wrapper">
              <div className="recommend__image__wrapper">
                <img src={obj.image} alt="temp" />
              </div>
              <span className="recommend__card__title">{obj.title}</span>
              <div className="recommend__card__info">
                <span>
                  {obj.address.state}/{obj.address.city}
                </span>
                <div className="recommend__rating__wrapper">
                  <RatingBoard rating={obj.rating} />
                </div>
              </div>

            </div>
          ))}
        </div>
    
      </div>

    </div>
  );
}
