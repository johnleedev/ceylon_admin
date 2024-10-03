import { styled } from "styled-components";
import { HotelObj } from "../utilies";
import { useState } from "react";
import SubCategorySelector from "./SubCategorySelector";
import RecommendCard from "../main/Main/recommend-section/RecommendCard";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  .category__items__wrapper {
    margin: 0 auto;
    display: grid;
    gap: 1vw;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
  }
`;

interface HotelListProps {
  selectedHotelObjs: HotelObj[];
}

export default function HotelList({ selectedHotelObjs }: HotelListProps) {
  const [categoryTitle, setCategoryTitle] = useState("전체");
  const categoryObjs = [
    { idx: 0, title: "전체" },
    { idx: 1, title: "쿠타" },
    { idx: 2, title: "스미낙" },
    { idx: 3, title: "잠바란" },
    { idx: 4, title: "우붓" },
  ];
  const filteringHotelObjs = selectedHotelObjs.filter((hotelObj) => {
    if (categoryTitle === "전체") return true;
    return hotelObj.location === categoryTitle;
  });
  return (
    <Wrapper>
      <SubCategorySelector
        type="sidebar"
        currentTitle={categoryTitle}
        setCurrentTitle={setCategoryTitle}
        categories={categoryObjs}
      />
      <div className="category__items__wrapper">
        {filteringHotelObjs.map((hotelObj) => (
          <a key={hotelObj.id} href={`/ceylon_publicing/hotel/${hotelObj.id}`}>
            <RecommendCard {...hotelObj} />
          </a>
        ))}
      </div>
    </Wrapper>
  );
}
