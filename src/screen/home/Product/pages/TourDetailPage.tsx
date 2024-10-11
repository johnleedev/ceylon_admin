import "./TourDetailPage.scss";
import { useParams } from "react-router-dom";
import mockData from "../../mockData";
import { useCallback, useState } from "react";


export default function ResortDetailPage() {
  const { tourId } = useParams();
  const id = 1;
  const tourData = mockData.tour.findDataById(id)!;
  const tourDatas = mockData.tour.findMany();
  const hotelObjs = mockData.hotel.findMany();
  const [infoIdx, setInfoIdx] = useState(0);
  const [categoryIdx, setCategoryIdx] = useState(0);
  const infoObj = [
    { idx: 0, title: "리조트 안내" },
    { idx: 1, title: "발리 안내" },
    { idx: 2, title: "일정 미리보기" },
  ];
  const categoryObj = [
    { idx: 0, title: "추천 풀빌라" },
    { idx: 1, title: "얼리버드 프로모션" },
    { idx: 2, title: "가족여행추천 리조트" },
    { idx: 3, title: "우붓 스테이" },
  ];


  const [categoryTitle, setCategoryTitle] = useState("전체");
  const categoryObjs = [
    { idx: 0, title: "전체" },
    { idx: 1, title: "쿠타" },
    { idx: 2, title: "스미낙" },
    { idx: 3, title: "잠바란" },
    { idx: 4, title: "우붓" },
  ];
  const filteringHotelObjs = hotelObjs.filter((hotelObj) => {
    if (categoryTitle === "전체") return true;
    return hotelObj.address.city === categoryTitle;
  });

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

      <div className="tour__header__section__wrapper">
        <img className="bg__image" src={tourData?.mainBgImage} alt="temp" />
        <div className="header__info">
          <span className="header__title">{tourData?.title}</span>
          <span className="header__subtitle">{tourData?.subtitle}</span>
        </div>
      </div>
      
      <div className="resort__category__section__wrapper">
        <div className="mx__section gap-3">
          {/* <CategorySelector
            type="underbar"
            categories={infoObj}
            currentIdx={infoIdx}
            setCurrentIdx={setInfoIdx}
          />
          <CategorySelector
            type="button"
            categories={categoryObj}
            currentIdx={categoryIdx}
            setCurrentIdx={setCategoryIdx}
          /> */}
        </div>

        <div className="hotel__list__wrapper">
          <div className="pb-2">
            <div
                className={"sidebar__wrapper"}
              >
                {categoryObjs.map(({ idx, title }) => (
                  <span
                    key={idx}
                    className={"selected__sidebar"}
                    onClick={() => {}}
                  >
                    {title}
                  </span>
                ))}
              </div>
          </div>
          <div className="category__items__wrapper">
            {filteringHotelObjs.map((hotelObj) => (
              <a key={hotelObj.id} href={`/hotel/${hotelObj.id}`}>
                <div className="recommend__card__wrapper">
                  <div className="recommend__image__wrapper">
                    <img src={hotelObj.thumbnailImagePath} alt="temp" />
                  </div>
                  <span className="recommend__card__title">{hotelObj.title}</span>
                  <div className="recommend__card__info">
                    <span>
                      {hotelObj.address.state}/{hotelObj.address.city}
                    </span>
                    <div className="recommend__rating__wrapper">
                      <div className="rating__board__wrapper">
                      {formatRatingArray(hotelObj.rating).map((value, idx) => (
                        <div className="rating__icon__wrapper" key={idx} >
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
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
