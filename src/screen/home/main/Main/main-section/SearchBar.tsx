import SearchInput from "./search-bar/SearchInput";
import SearchBtn from "./search-bar/SearchBtn";

export default function SearchBar() {
  return (
    <div className="main__search__bar__wrapper">
      <SearchInput kind="loc" />
      <SearchInput kind="date" />
      <SearchBtn text="찾기" onClick={() => {}} />
    </div>
  );
}
