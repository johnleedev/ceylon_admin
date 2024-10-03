import { styled } from "styled-components";
import { Category } from "./CategorySelector";

const Wrapper = styled.div`
  .sidebar__wrapper {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    color: rgba(51, 51, 51, 1);
    font-size: 1vw;
    margin-bottom: 1vw;
    span {
      line-height: 1;
      border-right: 1px solid rgba(148, 148, 148, 1);
      padding: 0 0.5vw;
      &.selected__sidebar {
        font-weight: 700;
        color: rgba(11, 11, 11, 1);
      }
      &:last-child {
        border-right: none;
      }
    }
  }
  .button__wrapper {
    color: rgba(146, 146, 146, 1);
    font-size: 0.8vw;
    font-weight: 500;
    display: flex;
    gap: 0.5vw;
    margin-bottom: 1vw;
    span {
      line-height: 1;
      padding: 7px 17px;
      border: 1px solid rgba(187, 187, 187, 1);
      border-radius: 4px;
      transition: color 0.2s ease-in, background-color 0.2s ease-in;
      &.selected__button {
        border: none;
        background-color: rgba(36, 167, 212, 1);
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .sidebar__wrapper:hover {
    cursor: pointer;
  }
`;

interface SubCategorySelectorProps {
  type: "sidebar" | "button";
  categories: Category[];
  currentTitle: string;
  setCurrentTitle: React.Dispatch<React.SetStateAction<string>>;
}

export default function SubCategorySelector({
  type,
  categories,
  currentTitle,
  setCurrentTitle,
}: SubCategorySelectorProps) {
  return (
    <Wrapper>
      <div
        className={type === "sidebar" ? "sidebar__wrapper" : "button__wrapper"}
      >
        {categories.map(({ idx, title }) => (
          <span
            key={idx}
            className={
              currentTitle === title
                ? type === "sidebar"
                  ? "selected__sidebar"
                  : "selected__button"
                : ""
            }
            onClick={() => setCurrentTitle(title)}
          >
            {title}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}
