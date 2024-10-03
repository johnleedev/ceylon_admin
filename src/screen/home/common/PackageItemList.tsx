import { styled } from "styled-components";
import { getPackageByHotelId, getTourData } from "../utilies";

interface PackageItemListProps {
  title: string;
  hotelId: number;
  numberOfPackage?: number;
}

const Wrapper = styled.section`
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  .header__title {
    font-size: 1.3vw;
    color: rgba(0, 0, 0, 1);
    margin-bottom: 1vw;
    span:last-child {
      font-weight: 700;
    }
  }
  .package__items__wrapper {
    display: flex;
    flex-direction: column;
    gap: 1vw;

    .package__item__wrapper {
      border-radius: 7px;
      border: 1px solid rgba(187, 187, 187, 1);
      width: 100%;
      aspect-ratio: 7.5;
      display: flex;
      overflow: hidden;
      cursor: pointer;
      .image__wrapper {
        width: 40%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .package__info__wrapper {
        color: rgba(0, 0, 0, 1);
        display: flex;
        flex-direction: column;
        padding: 0 2vw;
        justify-content: center;
        .info__header {
          margin-bottom: 0.8vw;
          .tour__title {
            font-size: 1.1vw;
            font-weight: 700;
            margin-right: 0.8vw;
          }
          .tour__period {
            font-size: 0.83vw;
            color: rgba(119, 119, 119, 1);
          }
        }
        .package__title {
          font-size: 0.83vw;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
`;

export default function PackageItemList({
  title,
  hotelId,
  numberOfPackage,
}: PackageItemListProps) {
  const packageItems = getPackageByHotelId(hotelId);
  const slicePackageItems = numberOfPackage
    ? packageItems.slice(0, numberOfPackage)
    : packageItems;
  return (
    <Wrapper>
      <div className="header__title">
        <span>{title}</span>
        <span> 추천 상품</span>
      </div>
      <div className="package__items__wrapper">
        {slicePackageItems.map((item) => (
          <a
            href={`/ceylon_publicing/package/${item.id}`}
            className="package__item__wrapper"
          >
            <div className="image__wrapper">
              <img src={item.thumbnail.image} alt="temp" />
            </div>
            <div className="package__info__wrapper">
              <div className="info__header">
                <span className="tour__title">
                  {getTourData(item.tourId).selectedTour.title}
                </span>
                <span className="tour__period">
                  {item.period.night}박 {item.period.days}일
                </span>
              </div>
              <span className="package__title">{item.thumbnail.title}</span>
            </div>
          </a>
        ))}
      </div>
    </Wrapper>
  );
}
