export interface SearchBtnsProps {
  text: string;
  onClick: () => void;
}

export default function SearchBtn({ text, onClick }: SearchBtnsProps) {
  return (
    <div className="search__btn__wrapper" onClick={onClick}>
      {text}
    </div>
  );
}
