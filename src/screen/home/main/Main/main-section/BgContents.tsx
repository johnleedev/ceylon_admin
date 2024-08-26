interface BgContentsProps {
  title: string;
  subtitle: string;
  mobileTitle: string;
  mobileSubtitle: string;
}

export default function BgContents({
  title,
  subtitle,
  mobileTitle,
  mobileSubtitle,
}: BgContentsProps) {
  return (
    <div className="main__bg__contents__wrapper">
      <div className="web__wrapper">
        <span className="web__wrapper__title">{title}</span>
        <span className="web__wrapper__subtitle">{subtitle}</span>
      </div>
      <div className="mobile__wrapper">
        <span className="mobile__title">{mobileTitle}</span>
        <span className="mobile__subtitle">{mobileSubtitle}</span>
      </div>
    </div>
  );
}
