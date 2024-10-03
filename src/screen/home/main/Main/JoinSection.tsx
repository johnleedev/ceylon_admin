import memberImg from "../../images/member.jpg";

export default function JoinSection() {
  return (
    <section className="join__section__wrapper">
      <div className="join__image__wrapper">
        <img src={memberImg} />
      </div>
      <div className="join__info__wrapper">
        <div className="join__info">
          <span>실론투어 멤버가 되다</span>
          <p>
            회원들께는 할인된 회원 요금, 현금화해서 사용가능한 포인트 적리브
            무료숙박 같은 다양한 외원 혜택을 누릴 수 있습니다.
          </p>
          <button className="detail__btn">
            자세히 보기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
