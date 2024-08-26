import { Dispatch, SetStateAction } from "react";
import { IBgObj } from "../../Main";

interface MainBgSelectProps {
  selectId: number;
  bgObjs: IBgObj[];
  setSelectId: Dispatch<SetStateAction<number>>;
}

export default function BgSelector({
  selectId,
  bgObjs,
  setSelectId,
}: MainBgSelectProps) {
  const handleClick = (idx: number) => {
    setSelectId(idx);
  };
  return (
    <div className="bg__selector__wrapper">
      {bgObjs.map((bgObj, idx) => (
        <div
          key={bgObj.imagePath}
          className={`${idx === selectId ? "bg__select" : ""}`}
          onClick={() => handleClick(idx)}
        >
          <img src={bgObj.imagePath} />
        </div>
      ))}
    </div>
  );
}
