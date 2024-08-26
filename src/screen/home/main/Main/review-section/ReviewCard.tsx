interface ReviewCardProps {
  imagePath: string;
  username: string;
  description: string;
  title: string;
}

export default function ReviewCard({
  imagePath,
  username,
  description,
  title,
}: ReviewCardProps) {
  return (
    <div className="grid__item review__card__wrapper">
      <div className="review__bg__image">
        <img src={imagePath} />
      </div>
      <div className="review__info__container">
        <span className="review__title">{title}</span>
        <div className="review__info__wrapper">
          <span className="review__info__desc">{description}</span>
          <span className="review__info__username">{username}</span>
        </div>
      </div>
      <div className="review__image__wrapper">
        <img src={imagePath} />
      </div>
    </div>
  );
}
