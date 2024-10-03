import { cls } from "../../home/utilies";

export default function SelectBtn({ checked = false }: { checked?: boolean }) {
  return (
    <div className={cls(checked ? "checked" : "", "select__btn__wrapper")}>
      <span>선택</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>
    </div>
  );
}
