import { styled } from "styled-components";
import SearchSelectInput from "./SearchSelectInput";

import { TourObj } from "../../../utilies";
import SearchBtn from "../../../main/Main/main-section/search-bar/SearchBtn";

interface ResortSearchBarProps {
  itemObjs: TourObj[];
}

const Wrapper = styled.form`
  @media (max-width: 1000px) {
    display: none;
  }
  width: 80%;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  left: 0;
  right: 0;
  z-index: 10;
  background-color: white;
  border-radius: 11px;
  padding: 0.8vw 1.5vw;
  max-width: 1200px;
  justify-content: space-between;
  margin: 9vw auto 0 auto;
  border: 0.5px solid rgba(99, 99, 99, 1);
  color: rgba(0, 0, 0, 1);
  div:nth-child(4) {
    border: none;
  }
  .search__btn__wrapper {
    padding: 0 1vw;
  }
`;

export default function ResortSearchBar({ itemObjs }: ResortSearchBarProps) {
  return (
    <Wrapper>
      <SearchSelectInput kind="loc" items={itemObjs} />
      <SearchSelectInput kind="category" />
      <SearchSelectInput kind="date" />
      <SearchSelectInput kind="resort" items={itemObjs} />
      <div className="search__btn__wrapper">
        <SearchBtn text="찾기" onClick={() => {}} />
      </div>
    </Wrapper>
  );
}
