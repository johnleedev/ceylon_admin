import { cls, getTourData } from "../../../utilies";
import RatingBoard from "./RatingBoard";

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

export default function HeaderSection({
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
    <div
      className={cls(
        type === "mini" ? "mini" : "",
        "hotel__header__section__wrapper"
      )}
    >
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
    </div>
  );
}
