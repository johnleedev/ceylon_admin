interface SpotCardProps {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
}

export default function SpotCard({
  title,
  subtitle,
  imagePath,
}: SpotCardProps) {
  return (
    <div
      className="spot__card__wrapper"
      style={{
        backgroundImage: `url(${imagePath}),
    linear-gradient(to top, rgba(0, 0, 0, 0.56), rgba(9, 9, 9, 0))`,
      }}
    >
      <span className="spot__subtitle">{subtitle}</span>
      <span className="spot__title">{title}</span>
    </div>
  );
}
