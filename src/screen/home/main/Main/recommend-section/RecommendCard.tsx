import { styled } from "styled-components";
import RatingBoard from "./RatingBoard";
import { formatKrDate, getTourData } from "../../../utilies";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5vw;
  margin-bottom: 10px;
  .recommend__image__wrapper {
    width: 100%;
    aspect-ratio: 1.1;
    @media (max-width: 1000px) {
      aspect-ratio: 1.05;
    }
    border-radius: 7px;
    overflow: hidden;
    margin-bottom: 1.2vw;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  .recommend__card__title {
    @media (max-width: 1000px) {
      font-size: 20px;
    }
    font-size: 2vw;
    font-weight: 700;
    color: rgba(51, 51, 51, 1);
  }
  .recommend__card__info {
    @media (max-width: 1000px) {
      margin-top: 10px;
    }
    display: flex;
    gap: 1vw;
    span {
      font-size: 1vw;
      @media (max-width: 1000px) {
        font-size: 14px;
      }
      color: rgba(119, 119, 119, 1);
    }
    .recommend__rating__wrapper {
      width: 5vw;
      @media (max-width: 1000px) {
        width: 60px;
        padding-top: 3px;
      }
    }
  }
  .promotion__duedate {
    margin-top: 0.5vw;
    font-size: 1vw;
    @media (max-width: 1000px) {
      font-size: 14px;
    }
    color: rgba(119, 119, 119, 1);
  }
`;

interface RecommendCardProps {
  rating: number;
  title: string;
  imagePath: string;
  location: string;
  promotionDueDate?: string;
  tourId: number;
}

export default function RecommendCard({
  title,
  tourId,
  imagePath,
  location,
  rating,
  promotionDueDate,
}: RecommendCardProps) {
  return (
    <Wrapper>
      <div className="recommend__image__wrapper">
        <img src={imagePath} alt="temp" />
      </div>
      <span className="recommend__card__title">{title}</span>
      <div className="recommend__card__info">
        <span>
          {getTourData(tourId).selectedTour.title}/{location}
        </span>
        <div className="recommend__rating__wrapper">
          <RatingBoard rating={rating} />
        </div>
      </div>
      {promotionDueDate && (
        <span className="promotion__duedate">{`[프로모션 기간 ${formatKrDate(
          promotionDueDate
        )}까지]`}</span>
      )}
    </Wrapper>
  );
}
