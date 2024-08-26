import MobileSearchBtn from "./search-bar/MobileSearchBtn";
import MobileSearchInput from "./search-bar/MobileSearchInput";

export default function MobileSearchBar() {
  return (
    <div className="mobile__search__bar__wrapper">
      <div className="mobile__search__bar__title">
        <div>
          <span>where</span> do you
        </div>
        <div>
          want to<span> go</span>?
        </div>
      </div>
      <div className="mobile__search__input__container">
        <MobileSearchInput kind="loc" />
        <MobileSearchInput kind="date" />
        <MobileSearchBtn text="Let's go" onClick={() => {}} />
      </div>
    </div>
  );
}
