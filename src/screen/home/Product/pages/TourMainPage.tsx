import "./TourMainPage.scss";
import mockData from "../../mockData";
import mainImg0 from "../../images/resort/hotel_07.png";
import mainImg1 from "../../images/img_mauritius.jpg";
import mainImg2 from "../../images/resort/hotel_13.png";
import mainImg3 from "../../images/img_bali.jpg";
import { useCallback, useState } from "react";

export default function ResortPage() {

  const tourData = mockData.tour.findMany();
  const hotelObjs = mockData.hotel.findMany().slice(0, 3);

  const [selectId, setSelectId] = useState(0);
  const bgObjs = [
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg0,
    },
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg1,
    },
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg2,
    },
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg3,
    },
  ];

  const handleClickBtn = (dir: "left" | "right") => {
    setSelectId((prev) => {
      if (dir === "left") {
        return selectId === 0 ? bgObjs.length - 1 : --prev;
      } else {
        return selectId + 1 === bgObjs.length ? 0 : ++prev;
      }
    }); 
  }
  const handleClick = (idx: number) => {
    setSelectId(idx);
  };

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

  return (
    <div>

      <div className="resort__search__bar__wrapper">
        
        <div className="search__btn__wrapper">
          <button className="search__btn__wrapper" onClick={() => {}}>
            찾기
          </button>
        </div>
      </div>


      <div className="resort__main__section__wrapper">
        <div
          className="bg__image__wrapper"
          style={{ backgroundImage: `url(${bgObjs[selectId].imagePath})` }}
        />

        <div className="contents__wrapper">
          <div className="bg__contents__wrapper">
            <div className="web__wrapper">
              <span className="web__wrapper_title">{bgObjs[selectId].title}</span>
              <span className="web__wrapper_subtitle">{bgObjs[selectId].subtitle}</span>
            </div>
            <div className="mobile__wrapper">
              <span className="mobile__title">내가 꿈꾸는 허니문</span>
              <span className="mobile__subtitle">실론투어 여행 전문가가 설계해 드리는 상력한 허니문</span>
            </div>
          </div>
          <div className="bg__select__btns__wrapper">
            <div className="select__indicator">
              <span>{selectId + 1}</span>
              <span>/</span>
              <span>{bgObjs.length}</span>
            </div>
            <div className="select__btns">
              <svg
                onClick={() => handleClickBtn("left")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="left__btn"
              >
                <path
                  fillRule="evenodd"
                  d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                  clipRule="evenodd"
                />
              </svg>
              <div />
              <svg
                onClick={() => handleClickBtn("right")}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="right__btn"
              >
                <path
                  fillRule="evenodd"
                  d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg__selector__wrapper">
          {bgObjs.map((bgObj, idx) => (
            <div
              key={bgObj.imagePath}
              className={`${idx === selectId ? "bg__select " : ""}image__wrapper`}
              onClick={() => handleClick(idx)}
            >
              <img src={bgObj.imagePath} />
            </div>
          ))}
        </div>
      </div>


      <div className="resort__tour__section__wrapper">
        <div className="spot__cards">
          {tourData.map((itemObj) => (
            <a key={itemObj.id} href={`tour/${itemObj.id}`}>
              <div
                className="spot__card__wrapper"
                style={{ backgroundImage: `url(${itemObj.imagePath})` }}
              >
                <span className="spot__subtitle">{itemObj.subtitle}</span>
                <span className="spot__title">{itemObj.title}</span>
              </div>
              <span className="font__desc">{itemObj.desc}</span>
            </a>
          ))}
        </div>
      </div>


      <div className="resort__best__section__wrapper">
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
          {hotelObjs.slice(0,3).map((obj) => (
            // <RecommendCard key={obj.id} {...obj} promotionDueDate={undefined} />
            <div className="recommend__card__wrapper">
              <div className="recommend__image__wrapper">
                <img src={obj.thumbnailImagePath} alt="temp" />
              </div>
              <span className="recommend__card__title">{obj.title}</span>
              <div className="recommend__card__info">
                <span>
                  {obj.address.state}/{obj.address.city}
                </span>
                <div className="recommend__rating__wrapper">
                  <div className="rating__board__wrapper">
                  {formatRatingArray(obj.rating).map((value, idx) => (
                    <div className="rating__icon__wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="empty__star"
                      >
                        <path
                          stroke="none"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="filled__star"
                        style={{
                          clipPath: `polygon(0 0, ${value}% 0, ${value}% 100%, 0 100%)`,
                        }}
                      >
                        <path
                          strokeWidth="1.5"
                          stroke="rgba(252, 196, 0, 1)"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
                </div>
              </div>
              {/* {promotionDueDate && (
                <span className="promotion__duedate">{`[프로모션 기간 ${formatKrDate(
                  promotionDueDate
                )}까지]`}</span>
              )} */}
            </div>
          ))}
        </div>
     
      </div>
    </div>
  );
}
