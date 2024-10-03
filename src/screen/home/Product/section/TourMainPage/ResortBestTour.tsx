import { styled } from "styled-components";
import MobileCardWrapper from "../../../common/MobileCardWrapper";

import promotionBgImage from "../../../images/promotion_bg.jpg";
import SectionHeader from "../../../common/SectionHeader";
import { getHotelData } from "../../../utilies";
import RecommendCard from "../../../main/Main/recommend-section/RecommendCard";

const Wrapper = styled.section<{ $imagePath: string }>`
  padding: 5vw 10vw;
  background-color: rgba(248, 248, 248, 1);
  @media (max-width: 1000px) {
    padding: 60px 0;
  }
  .promotion__mobile__card__wrapper {
    margin-right: 20px;
    flex: none;
    width: 282px;
    height: 350px;
    .recommend__image__wrapper {
      width: 282px;
      height: 270px;
    }
    .recommend__card__title {
      margin-top: 10px;
      font-size: 20px;
      color: rgba(255, 255, 255, 1);
    }
    .recommend__card__info {
      margin-top: 15px;
      span {
        font-size: 14px;
        color: rgba(255, 255, 255, 1);
      }
      .recommend__rating__wrapper {
        margin-left: 10px;
        width: 70px;
        padding-top: 2px;
      }
    }
  }
`;

const PromotionCards = styled.div`
  @media (max-width: 1000px) {
    display: none;
  }
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5vw;
`;

export default function ResortBestSection() {
  const hotelObjs = getHotelData(0).slice(0, 3);
  return (
    <Wrapper $imagePath={promotionBgImage}>
      <SectionHeader
        titles={["Best", "시즌", "추천 프로모션"]}
        descriptions={["실론투어의 여행전문가가", "추천해드리는 상품"]}
        mobileTitle={["올인크루시브", "리조트"]}
      />
      <PromotionCards>
        {hotelObjs.map((obj) => (
          <RecommendCard key={obj.id} {...obj} promotionDueDate={undefined} />
        ))}
      </PromotionCards>
      <MobileCardWrapper>
        {hotelObjs.map((obj) => (
          <div key={obj.id} className="promotion__mobile__card__wrapper">
            <RecommendCard {...obj} />
          </div>
        ))}
      </MobileCardWrapper>
    </Wrapper>
  );
}
