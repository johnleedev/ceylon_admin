import { styled } from "styled-components";
import { cls } from "../utilies";

export type Category = {
  idx: number;
  title: string;
};

export interface CategorySelectorProps {
  type: "underbar" | "button";
  categories: Category[];
  currentIdx: number;
  setCurrentIdx: React.Dispatch<React.SetStateAction<number>>;
}

const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
  display: grid;
  .underbar__selector {
    display: flex;
    justify-content: center;
    color: rgba(187, 187, 187, 1);
    border-bottom: 0.2vw solid rgba(187, 187, 187, 1);
    font-size: 1vw;
    padding-bottom: 0.5vw;

    transition: background-color 0.2s ease-in, color 0.2s ease-in;
    @media (max-width: 1000px) {
      font-size: 1.5rem;
      font-weight: 700;
    }
    line-height: 1.6;
  }
  .button__selector {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1vw;
    background-color: rgba(243, 243, 243, 1);
    color: rgba(147, 147, 147, 1);
    height: 3.5vw;
    transition: background-color 0.2s ease-in, color 0.2s ease-in;
  }
  .select__underbar {
    color: rgba(0, 0, 0, 1);
    border-bottom: 0.2vw solid rgba(0, 0, 0, 1);
    font-weight: 700;
  }
  .select__button {
    background-color: rgba(40, 171, 225, 1);
    color: rgba(255, 255, 255, 1);
  }
`;

export default function CategorySelector({
  type,
  categories,
  currentIdx,
  setCurrentIdx,
}: CategorySelectorProps) {
  return (
    <Wrapper
      style={{ gridTemplateColumns: `repeat(${categories.length},1fr)` }}
    >
      {categories.map(({ idx, title }) => (
        <div
          className={cls(
            type === "underbar" ? "underbar__selector" : "button__selector",
            idx === currentIdx
              ? type === "underbar"
                ? "select__underbar"
                : "select__button"
              : ""
          )}
          onClick={() => setCurrentIdx(idx)}
        >
          {title}
        </div>
      ))}
    </Wrapper>
  );
}
