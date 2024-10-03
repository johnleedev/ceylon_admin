import { useState } from "react";
import { styled } from "styled-components";
import CategorySelector from "../../../common/CategorySelector";
import { HotelObj } from "../../../utilies";
import HotelList from "../../../common/HotelList";

interface ResortCategorySectionProps {
  hotelObjs: HotelObj[];
}

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 5vw 0;
  width: 100%;
  .category__items__wrapper {
    margin: 0 auto;
    display: grid;
    gap: 1vw;
    grid-template-columns: repeat(4, 1fr);
    width: 90%;
  }
`;

export default function ResortCategorySection({
  hotelObjs,
}: ResortCategorySectionProps) {
  const [infoIdx, setInfoIdx] = useState(0);
  const [categoryIdx, setCategoryIdx] = useState(0);
  const selectedHotelObjs = hotelObjs.filter(
    (hotelObj) => hotelObj.categoryId === categoryIdx
  );
  const infoObj = [
    { idx: 0, title: "리조트 안내" },
    { idx: 1, title: "발리 안내" },
    { idx: 2, title: "일정 미리보기" },
  ];
  const categoryObj = [
    { idx: 0, title: "추천 풀빌라" },
    { idx: 1, title: "얼리버드 프로모션" },
    { idx: 2, title: "가족여행추천 리조트" },
    { idx: 3, title: "우붓 스테이" },
  ];
  return (
    <Wrapper>
      <CategorySelector
        type="underbar"
        categories={infoObj}
        currentIdx={infoIdx}
        setCurrentIdx={setInfoIdx}
      />
      <CategorySelector
        type="button"
        categories={categoryObj}
        currentIdx={categoryIdx}
        setCurrentIdx={setCategoryIdx}
      />
      {infoIdx === 0 && <HotelList selectedHotelObjs={selectedHotelObjs} />}
    </Wrapper>
  );
}
