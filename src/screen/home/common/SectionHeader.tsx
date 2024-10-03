import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2vw;
  @media (max-width: 1000px) {
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;
  }
  .section__title {
    color: rgba(0, 0, 0, 1);
    font-size: 3vw;
    font-weight: 700;
    @media (max-width: 1000px) {
      font-size: 2rem;
    }
    .section__main__title {
      @media (max-width: 1000px) {
        display: none;
      }
      display: flex;
      gap: 1vw;
    }
    .section__mobile__title {
      @media (min-width: 1000px) {
        display: none;
      }
      display: flex;
      gap: 5px;
    }
  }
  .section__desc {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    line-height: 1.6;
    margin-bottom: 5px;
    font-size: 1.2vw;
    letter-spacing: 0;
    color: rgba(119, 119, 119, 1);
    @media (max-width: 1000px) {
      font-size: 1rem;
    }
    @media (max-width: 500px) {
      align-items: flex-start;
    }
  }
`;

interface SectionHeaderProps {
  titles: string[];
  descriptions: string[];
  mobileTitle: string[];
}

export default function SectionHeader({
  titles,
  descriptions,
  mobileTitle,
}: SectionHeaderProps) {
  return (
    <Wrapper>
      <div className="section__title">
        <span>{titles[0]}</span>
        <div className="section__main__title">
          <span>{titles[1]}</span>
          <span>{titles[2]}</span>
        </div>
        <div className="section__mobile__title">
          <span>{mobileTitle[0]}</span>
          <span>{mobileTitle[1]}</span>
        </div>
      </div>
      <div className="section__desc">
        {descriptions.map((description, idx) => (
          <span key={idx}>{description}</span>
        ))}
      </div>
    </Wrapper>
  );
}
