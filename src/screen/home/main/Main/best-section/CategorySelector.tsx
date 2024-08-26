import { Dispatch } from "react";

type Category = "best" | "europe";

interface CategorySelectorProps {
  category: Category;
  setCategory: Dispatch<React.SetStateAction<"best" | "europe">>;
}

export default function CategorySelector({
  category,
  setCategory,
}: CategorySelectorProps) {
  const handleClick = (category: Category) => {
    setCategory(category);
  };
  return (
    <div className="category__selector__wrapper">
      <div
        className={`category__bar ${
          category === "best" ? "on" : ""
        }`}
        onClick={() => handleClick("best")}
      >
        베스트휴양지
      </div>
      <div
        className={`category__bar ${
          category === "europe" ? "on" : ""
        }`}
        onClick={() => handleClick("europe")}
      >
        유럽
      </div>
    </div>
  );
}
