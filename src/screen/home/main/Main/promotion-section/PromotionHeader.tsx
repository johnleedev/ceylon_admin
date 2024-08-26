interface PromitionHeaderProps {
  titles: string[];
  descriptions: string[];
  mobileTitle: string[];
}

export default function PromotionHeader({
  titles,
  descriptions,
  mobileTitle,
}: PromitionHeaderProps) {
  return (
    <div className="promotion__header__wrapper">
      <div className="promotion__title">
        <span className="promotion__top__title">{titles[0]}</span>
        <div className="promotion__main__title">
          <span>{titles[1]}</span>
          <span className="color__orange">{titles[2]}</span>
        </div>
        <div className="promotion__mobile__title">
          <span className="color__orange">{mobileTitle[0]}</span>
          <span>{mobileTitle[1]}</span>
        </div>
      </div>
      <div className="promotion__desc">
        {descriptions.map((description, idx) => (
          <span key={idx}>{description}</span>
        ))}
      </div>
    </div>
  );
}
