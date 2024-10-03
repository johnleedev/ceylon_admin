import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1vw;
  .review__title {
    display: flex;
    gap: 1vw;
    font-size: 3vw;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 1);
    letter-spacing: -3px;
    @media (max-width: 1000px) {
      font-size: 29px;
    }
  }
  .review__subtitle {
    @media (max-width: 1000px) {
      font-size: 14px;
      letter-spacing: 0;
    }
    font-size: 1.2vw;
    color: rgba(119, 119, 119, 1);
  }
`;

interface RecommendHeaderProps {
  title: string;
  subtitle: string;
}

export default function ReviewHeader({
  title,
  subtitle,
}: RecommendHeaderProps) {
  return (
    <Wrapper>
      <span className="review__title">{title}</span>
      <span className="review__subtitle">{subtitle}</span>
    </Wrapper>
  );
}
