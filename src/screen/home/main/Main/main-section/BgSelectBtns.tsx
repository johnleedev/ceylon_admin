import { Dispatch, SetStateAction } from "react";

interface BgSelectBtnsProps {
  selectId: number;
  objsLength: number;
  setSelectId: Dispatch<SetStateAction<number>>;
}

export default function BgSelectBtns({
  selectId,
  objsLength,
  setSelectId,
}: BgSelectBtnsProps) {
  const handleClick = (dir: "left" | "right") => {
    setSelectId((prev) => {
      if (dir === "left") {
        return selectId === 0 ? objsLength - 1 : --prev;
      } else {
        return selectId + 1 === objsLength ? 0 : ++prev;
      }
    });
  };
  return (
    <div className="bg__select__btns__wrapper">
      <div className="select__indicator">
        <span>{selectId + 1}</span>
        <span>/</span>
        <span>{objsLength}</span>
      </div>
      <div className="select__btns">
        <svg
          onClick={() => handleClick("left")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="left__btn"
        >
          <path
            fillRule="evenodd"
            d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
            clipRule="evenodd"
          />
        </svg>
        <div />
        <svg
          onClick={() => handleClick("right")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="right__btn"
        >
          <path
            fillRule="evenodd"
            d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
