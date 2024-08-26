import RatingBoard from "./RatingBoard";

interface RecommendCardProps {
  rating: number;
  resort: string;
  imagePath: string;
  location: string;
}

export default function RecommendCard({
  resort,
  imagePath,
  location,
  rating,
}: RecommendCardProps) {
  return (
    <div className="recommend__card__wrapper">
      <div className="recommend__image__wrapper">
        <img src={imagePath} />
      </div>
      <span className="recommend__card__title">{resort}</span>
      <div className="recommend__card__info">
        <span>{location}</span>
        <div className="recommend__rating__wrapper">
          <RatingBoard rating={rating} />
        </div>
      </div>
    </div>
  );
}
