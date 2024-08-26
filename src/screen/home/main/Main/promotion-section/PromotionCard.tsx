import DueDateBox from "./DueDateBox";

interface PromotionCardProps {
  imagePath: string;
  title: string;
  subtitle: string;
  price: number;
  priceDesc: string;
  dueDate: string;
}

export default function PromotionCard({
  imagePath,
  title,
  subtitle,
  price,
  priceDesc,
  dueDate,
}: PromotionCardProps) {
  const formatPriceWon = (price: number) => {
    return `₩${price.toLocaleString("ko-KR")}`;
  };
  const formatKrDate = (date: string) => {
    const dateParts = date.split("-");
    if (dateParts.length !== 3) {
      throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
    }
    const year = dateParts[0];
    const month = +dateParts[1];
    const day = +dateParts[2];
    return `${year}년 ${month}월 ${day}일`;
  };
  return (
    <div className="promotion__card__container">
      <div className="promotion__image__wrapper">
        <img src={imagePath} />
      </div>
      <div className="promotion__info__wrapper">
        <div className="promotion__info">
          <span className="promotion__info__title">{title}</span>
          <span className="promotion__info__subtitle">{subtitle}</span>
          <div className="promotion__price__wrapper">
            <span className="promotion__info__title">{formatPriceWon(price)}</span>
            <span className="promotion__info__subtitle">{priceDesc}</span>
          </div>
          <span className="promotion__duedate subtitle">
            {`[프로모션 기간 ${formatKrDate(dueDate)}까지]`}
          </span>
        </div>
        <DueDateBox dueDate={dueDate} />
      </div>
    </div>
  );
}
