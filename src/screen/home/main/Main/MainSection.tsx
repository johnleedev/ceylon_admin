import { useState } from "react";
import BgSelector from "./main-section/BgSelector";
import BgContents from "./main-section/BgContents";
import SearchBar from "./main-section/SearchBar";
import BgSelectBtns from "./main-section/BgSelectBtns";
import MobileSearchBar from "./main-section/MobileSearchBar";
import mainImg from "./images/main_img.jpg";

export default function MainSection() {
  const [selectId, setSelectId] = useState(0);
  const bgObjs = [
    {
      title: "사무이 럭셔리 콜라보",
      subtitle: "콘래드2박 + 반얀트리2박",
      imagePath: mainImg,
    },
    {
      title: "사무이 럭셔리 콜라보",
      subtitle: "콘래드2박 + 반얀트리2박",
      imagePath: mainImg,
    },
    {
      title: "사무이 럭셔리 콜라보",
      subtitle: "콘래드2박 + 반얀트리2박",
      imagePath: mainImg,
    },
    {
      title: "사무이 럭셔리 콜라보",
      subtitle: "콘래드2박 + 반얀트리2박",
      imagePath: mainImg,
    },
  ];
  return (
    <section className="main__section__wrapper">
      <div
        className="main__bg__image"
        style={{ backgroundImage: `url(${bgObjs[selectId].imagePath})` }}
      />
      <div className="main__contents__wrapper">
        <SearchBar />
        <BgContents
          title={bgObjs[selectId].title}
          subtitle={bgObjs[selectId].subtitle}
          mobileTitle="내가 꿈꾸는 허니문"
          mobileSubtitle="실론투어 여행 전문가가 설계해 드리는 상력한 허니문"
        />
        <BgSelectBtns
          selectId={selectId}
          objsLength={bgObjs.length}
          setSelectId={setSelectId}
        />
      </div>
      <BgSelector
        selectId={selectId}
        bgObjs={bgObjs}
        setSelectId={setSelectId}
      />
      <MobileSearchBar />
    </section>
  );
}
