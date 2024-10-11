import "./HotelPage.scss";
import { Outlet, useParams } from "react-router-dom";
import { getHotelDataById, getPackageById } from "../../utilies";
import { useEffect, useState } from "react";
import axios from "axios";
import MainURL from "../../../../MainURL";
import mockData from "../../mockData";

import hotelImagePath1 from "../../images/resort/hotel_01.png";
import headerBgImage from "../../images/hotel/main-bg-0.jpg";
import detailImagePath0 from "../../images/hotel/detail-0.jpg";
import detailImagePath1 from "../../images/hotel/detail-1.jpg";
import detailImagePath2 from "../../images/hotel/detail-2.jpg";
import detailImagePath3 from "../../images/hotel/detail-1.jpg";
import detailImagePath4 from "../../images/hotel/detail-2.jpg";
import package0 from "../../images/hotel/package-0.jpg";
import package1 from "../../images/hotel/package-1.jpg";
import mobileImagePath from "../../images/hotel/mobile-info.jpg";


export default function HotelPage() {
 
  const [hotelInfo, setHotelInfo] = useState([]);
  const [hotelCost, setHotelCost] = useState([]);
  const [tourLocation, setTourLocation] = useState([]);

  // 게시글 가져오기
  const fetchPosts = async () => {
    const resinfo = await axios.get(`${MainURL}/product/getproduct/77`)
    if (resinfo.data) {
      console.log(resinfo.data);
      setHotelInfo(resinfo.data);
    } 
    const rescost = await axios.get(`${MainURL}/product/getproductcost/77`)
    if (rescost.data) {
      console.log(rescost.data);
      setHotelCost(rescost.data);
    } 
    const resschedule = await axios.get(`${MainURL}/product/getschedule/발리`)
    if (resschedule.data) {
      console.log(resschedule.data);
      setTourLocation(resschedule.data);
    } 
  };

  useEffect(() => {
    // fetchPosts();
  }, []);  


  const { hotelId } = useParams();
  const packageData = getPackageById(1);
  const hotelData = getHotelDataById(packageData.hotelId);
  const [onModal, setOnModal] = useState(false);
  
  const categoryObjs = [
    { idx: 0, title: "리조트 정보", href: "info" },
    { idx: 1, title: "상품 보기", href: "packages" },
  ];

  const packages = [
    {
      thumbnailImagePath: package0,
      packagePeriod: "5박 7일",
      title:
        "선투숙리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
    },
    {
      thumbnailImagePath: package1,
      packagePeriod: "5박 7일",
      title:
        "선투숙리조트 2박 + 원베드 풀빌라 2박 + 세인트레지스 오션뷰 풀빌라 2박",
    },
  ];


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

  const [category, setCategory] = useState('notice');

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
            <span className="header__location"></span>
            <div className="header__rating">
              {/* <RatingBoard rating={rating} /> */}
            </div>
          </div>
          <span className="header__desc">{hotelData.desc}</span>
        </div>
      </div>

      <div className="category__selector__wrapper">
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
          <div className="hotel__info__image__wrapper">
            <div className="only-web web__image__wrapper mx__section">
              <img alt="temp" />
              
            </div>
          </div>
        </>
      }
      
      <div className="package__item__list__wrapper mx__section">
        <div className="header__title">
          <span>세인트레지스</span>
          <span> 추천 상품</span>
        </div>
        <div className="package__items__wrapper">
          {packages.map((item, idx) => (
            <a
              href={`/hotel/${hotelId}/packages/detail/${idx}`}
              className="package__item__wrapper"
            >
              <div className="image__wrapper">
                <img src={item.thumbnailImagePath} alt="temp" />
              </div>
              <div className="package__info__wrapper">
                <div className="info__header">
                  <span className="tour__title">발리</span>
                  <span className="tour__period">{item.packagePeriod}</span>
                </div>
                <span className="package__title">{item.title}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    
    </div>
  );
}
