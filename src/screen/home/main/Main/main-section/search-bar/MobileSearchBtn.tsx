import { SearchBtnsProps } from "./SearchBtn";

export default function MobileSearchBtn({ text, onClick }: SearchBtnsProps) {
  return (
    <div className="mobile__search__btn__wapper" onClick={onClick}>
      {text}
    </div>
  );
}
