import { styled } from "styled-components";

import { TourObj } from "../../../utilies";
import SpotCard from "../../../main/Main/best-section/SpotCard";

interface ResortTourSectionProps {
  itemObjs: TourObj[];
}

const Wrapper = styled.section`
  @media (max-width: 1000px) {
    width: 100%;
    position: relative;
    height: 600px;
    padding: 100px 0;
  }
  @media (min-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
  margin: 0 auto;
  width: 85%;
  padding: 10vw 0;
  .spot__cards {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5vw;
    @media (max-width: 1000px) {
      display: none;
    }
    .font__desc {
      color: rgba(106, 106, 106, 1);
      font-size: 1vw;
      display: inline-block;
      line-height: 1.6;
      margin-top: 1vw;
    }
  }
`;

export default function ResortTourSection({
  itemObjs,
}: ResortTourSectionProps) {
  return (
    <Wrapper>
      <div className="spot__cards">
        {itemObjs.map((itemObj) => (
          <a key={itemObj.id} href={`tour/${itemObj.id}`}>
            <SpotCard {...itemObj} />
            <span className="font__desc">{itemObj.desc}</span>
          </a>
        ))}
      </div>
    </Wrapper>
  );
}
