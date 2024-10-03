import { styled } from "styled-components";
import { getTourData } from "../../utilies";
import RatingBoard from "../../main/Main/recommend-section/RatingBoard";

interface HotelHeaderSectionProps {
  title: string;
  subtitle: string;
  mainBgImage: string;
  rating: number;
  location: string;
  tourId: number;
  desc: string;
  type?: "basic" | "mini";
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  letter-spacing: 0.5px;
  justify-content: center;
  color : #fff;
  background-color: rgba(0, 0, 0, 0.3);
  .bg__image {
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .header__info {
    position: absolute;
    width: 80%;
    max-width: 1200px;
    padding-top: 10vw;
    display: flex;
    flex-direction: column;
    .header__title {
      line-height: 1.45;
      letter-spacing: -1px;
      font-size: 2.3vw;
      font-weight: 700;
      margin-bottom: 0.6vw;
    }
    .header__subtitle {
      font-size: 1vw;
    }
    .header__loc__rating {
      display: flex;
      gap: 1vw;
      align-items: center;
      margin-bottom: 1.8vw;
      .header__location {
        font-size: 0.8vw;
      }
      .header__rating {
        width: 5vw;
        height: 1.2vw;
      }
    }
    .header__desc {
      font-size: 0.8vw;
      width: 35%;
      line-height: 1.8;
      word-break: keep-all;
    }
  }
`;

export default function HotelHeaderSection({
  type = "basic",
  title,
  subtitle,
  mainBgImage,
  rating,
  location,
  tourId,
  desc,
}: HotelHeaderSectionProps) {
  return (
    <Wrapper>
      <img className="bg__image" src={mainBgImage} alt="temp" />
      <div className="header__info">
        <span className="header__subtitle">{subtitle}</span>
        <span className="header__title">{title}</span>
        <div className="header__loc__rating">
          <span className="header__location">{`${
            getTourData(tourId).selectedTour.title
          } > ${location}`}</span>
          <div className="header__rating">
            <RatingBoard rating={rating} />
          </div>
        </div>
        {type === "basic" && <span className="header__desc">{desc}</span>}
      </div>
    </Wrapper>
  );
}
