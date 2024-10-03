import { styled } from "styled-components";

interface TourHeaderSectionProps {
  title: string;
  subtitle: string;
  mainBgImage: string;
}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  .bg__image {
    width: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .header__info {
    position: absolute;
    width: 80%;
    max-width: 1200px;
    padding-top: 16vw;
    display: flex;
    flex-direction: column;
    .header__title {
      font-size: 3vw;
      font-weight: 700;
    }
    .header__subtitle {
      font-size: 1.5vw;
    }
  }
`;

export default function TourHeaderSection({
  title,
  subtitle,
  mainBgImage,
}: TourHeaderSectionProps) {
  return (
    <Wrapper>
      <img className="bg__image" src={mainBgImage} alt="temp" />
      <div className="header__info">
        <span className="header__title">{title}</span>
        <span className="header__subtitle">{subtitle}</span>
      </div>
    </Wrapper>
  );
}
