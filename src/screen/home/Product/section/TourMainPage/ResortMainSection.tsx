import { useState } from "react";
import styled from "styled-components";
import mainImg0 from "../../../images/resort/hotel_07.png";
import mainImg1 from "../../../images/img_mauritius.jpg";
import mainImg2 from "../../../images/resort/hotel_13.png";
import mainImg3 from "../../../images/img_bali.jpg";
import BgContents from "../../../main/Main/main-section/BgContents";
import BgSelectBtns from "../../../main/Main/main-section/BgSelectBtns";
import BgSelector from "../../../main/Main/main-section/BgSelector";

const Wrapper = styled.section`
  width: 100%;
  @media (max-width: 1000px) {
    height: 100vh;
    overflow: hidden;
  }
  aspect-ratio: 16/9;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BgImage = styled.div<{ $imagePath: string }>`
  width: 100%;
  height: 100%;
  @media (max-width: 1000px) {
    width: 1240px;
    height: 55vh;
    top: -18px;
  }
  background-image: url(${({ $imagePath }) => $imagePath});
  position: absolute;
  background-size: cover;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;

const Contents = styled.div`
  @media (max-width: 1000px) {
    width: 90%;
  }
  position: absolute;
  width: 80%;
  height: 100%;
  max-width: 1200px;
`;

export default function ResortMainSection() {
  const [selectId, setSelectId] = useState(0);
  const bgObjs = [
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg0,
    },
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg1,
    },
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg2,
    },
    {
      title: "발리 풀빌라 프로모션",
      subtitle: "특별한 가격으로 만나는 완벽한 풀빌라",
      imagePath: mainImg3,
    },
  ];
  return (
    <Wrapper>
      <BgImage $imagePath={bgObjs[selectId].imagePath} />
      <Contents>
        <BgContents
          title={bgObjs[selectId].title}
          subtitle={bgObjs[selectId].subtitle}
          mobileTitle="내가 꿈꾸는 허니문"
          mobileSubtitle="실론투어 여행 전문가가 설계해 드리는 상력한 허니문"
        />
        {/* <BgSelectBtns
          selectId={selectId}
          objsLength={bgObjs.length}
          setSelectId={setSelectId}
        /> */}
      </Contents>
      <BgSelector
        selectId={selectId}
        bgObjs={bgObjs}
        setSelectId={setSelectId}
      />
    </Wrapper>
  );
}
