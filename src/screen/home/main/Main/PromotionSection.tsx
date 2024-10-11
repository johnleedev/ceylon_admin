import PromotionHeader from "./promotion-section/PromotionHeader";
import PromotionCard from "./promotion-section/PromotionCard";
import RecommendCard from "./recommend-section/RecommendCard";
import promotionBgImage from "../../images/promotion_bg.jpg";
import hotel1 from "../../images/resort/hotel_14.png";
import hotel2 from "../../images/resort/hotel_13.png";
import hotel3 from "../../images/resort/hotel_12.png";

export default function PromotionSection() {
  const promotionObjs = [
    {
      id: 0,
      title: "사무이 풀빌라 콜라보",
      subtitle: "풀빌라3박 x 풀빌라 2박",
      price: 1590000,
      priceDesc: "1인 요금",
      dueDate: "2024-12-31",
      imagePath: hotel1,
      location: "푸켓",
      rating: 4.72,
      resort: "반얀트리",
      tourId: 3,
    },
    {
      id: 1,
      title: "사무이 풀빌라 콜라보",
      subtitle: "풀빌라3박 x 풀빌라 2박",
      price: 1590000,
      priceDesc: "1인 요금",
      dueDate: "2024-12-31",
      imagePath: hotel2,
      location: "푸켓",
      rating: 4.72,
      resort: "반얀트리",
      tourId: 3,
    },
    {
      id: 2,
      title: "사무이 풀빌라 콜라보",
      subtitle: "풀빌라3박 x 풀빌라 2박",
      price: 1590000,
      priceDesc: "1인 요금",
      dueDate: "2024-12-31",
      imagePath: hotel3,
      location: "푸켓",
      rating: 4.72,
      resort: "반얀트리",
      tourId: 3,
    },
  ];
  return (
    <section
      className="promotion__section__wrapper"
      style={{ backgroundImage: `url(${promotionBgImage})` }}
    >
      <PromotionHeader
        titles={["Best", "시즌", "추천 프로모션"]}
        descriptions={["실론투어의 여행전문가가", "추천해드리는 상품"]}
        mobileTitle={["올인크루시브", "리조트"]}
      />
      <div className="promotion__cards__wrapper">
        {promotionObjs.map((obj) => (
          <PromotionCard key={obj.id} {...obj} />
        ))}
      </div>
      {/* <MobileCardWrapper>
        {promotionObjs.map((obj) => (
          <div key={obj.id} className="promotion__mobile__card__wrapper">
            <RecommendCard
              location={obj.location}
              rating={obj.rating}
              imagePath={obj.imagePath}
              tourId={obj.tourId}
              title={obj.resort}
            />
          </div>
        ))}
      </MobileCardWrapper> */}
    </section>
  );
}
