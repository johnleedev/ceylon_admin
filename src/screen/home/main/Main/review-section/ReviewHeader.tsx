interface RecommendHeaderProps {
  title: string;
  subtitle: string;
}

export default function ReviewHeader({
  title,
  subtitle,
}: RecommendHeaderProps) {
  return (
    <div className="review__header__wrapper">
      <span className="review__title">{title}</span>
      <span className="review__subtitle">{subtitle}</span>
    </div>
  );
}
