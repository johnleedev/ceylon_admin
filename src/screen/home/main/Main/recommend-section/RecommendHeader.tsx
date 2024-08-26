interface RecommendHeaderProps {
  title: string[];
  subtitle: string;
}

export default function RecommendHeader({
  title,
  subtitle,
}: RecommendHeaderProps) {
  return (
    <div className="recommend__header__wrapper">
      <div className="recommend__title">
        <span>{title[0]}</span>
        <span className="strong__title">{title[1]}</span>
      </div>
      <span className="recommend__subtitle">{subtitle}</span>
    </div>
  );
}
