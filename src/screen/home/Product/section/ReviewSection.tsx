import { styled } from "styled-components";
import ReviewHeader from "./review-section/ReviewHeader";
import ReviewCard from "./review-section/ReviewCard";
import reviewImg1 from "../../images/review/pic_01.png";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  padding: 8vw 10vw;
  width: 100%;
  aspect-ratio: 1.6;
  @media (max-width: 1000px) {
    padding: 100px 40px;
  }
`;

const ReviewCards = styled.div`
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    transition: none;
    margin-top: 30px;
  }

  @media (min-width: 1000px) {
    grid-template:
      "a c e" 0.4fr
      "a d e" 0.2fr
      "b d f" 0.4fr;
    margin-top: 5vw;
    display: grid;
    height: 100%;
    gap: 0.5vw;
    .grid__item {
      display: flex;
      width: 100%;
      height: 100%;
      padding: 1.5vw;
      align-items: flex-end;
      transition: transform 0.2s ease-in-out;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .grid__item:nth-child(1) {
    grid-area: a;
  }
  .grid__item:nth-child(2) {
    grid-area: b;
  }
  .grid__item:nth-child(3) {
    grid-area: c;
  }
  .grid__item:nth-child(4) {
    grid-area: d;
  }
  .grid__item:nth-child(5) {
    grid-area: e;
  }
  .grid__item:nth-child(6) {
    grid-area: f;
  }
`;

export default function ReviewSection() {
  const reviewObjs = [
    {
      id: 0,
      imagePath: reviewImg1,
      title: "행복했던 하와이 허니문",
      description:
        "너무 좋았던  허니문을 실론투어에서 다녀왔어요 잊을 수 없는 여행... ",
      username: "홍*동",
    },
    {
      id: 1,
      imagePath: reviewImg1,
      title: "행복했던 하와이 허니문",
      description:
        "너무 좋았던  허니문을 실론투어에서 다녀왔어요 잊을 수 없는 여행... ",
      username: "홍*동",
    },
    {
      id: 2,
      imagePath: reviewImg1,
      title: "행복했던 하와이 허니문",
      description:
        "너무 좋았던  허니문을 실론투어에서 다녀왔어요 잊을 수 없는 여행... ",
      username: "홍*동",
    },
    {
      id: 3,
      imagePath: reviewImg1,
      title: "행복했던 하와이 허니문",
      description:
        "너무 좋았던  허니문을 실론투어에서 다녀왔어요 잊을 수 없는 여행... ",
      username: "홍*동",
    },
    {
      id: 4,
      imagePath: reviewImg1,
      title: "행복했던 하와이 허니문",
      description:
        "너무 좋았던  허니문을 실론투어에서 다녀왔어요 잊을 수 없는 여행... ",
      username: "홍*동",
    },
    {
      id: 5,
      imagePath: reviewImg1,
      title: "행복했던 하와이 허니문",
      description:
        "너무 좋았던  허니문을 실론투어에서 다녀왔어요 잊을 수 없는 여행... ",
      username: "홍*동",
    },
  ];
  return (
    <Wrapper>
      <ReviewHeader
        title="review"
        subtitle="실론투어와 함께 행복한 추억나누기"
      />
      <ReviewCards>
        {reviewObjs.map((obj) => (
          <ReviewCard key={obj.id} {...obj} />
        ))}
      </ReviewCards>
    </Wrapper>
  );
}
