import ReviewHeader from "./review-section/ReviewHeader";
import ReviewCard from "./review-section/ReviewCard";
import reviewImg1 from "../../images/review/pic_01.png";

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
    <section className="review__section__wrapper">
      <ReviewHeader
        title="review"
        subtitle="실론투어와 함께 행복한 추억나누기"
      />
      <div className="review__cards__wrapper">
        {reviewObjs.map((obj) => (
          <ReviewCard key={obj.id} {...obj} />
        ))}
      </div>
    </section>
  );
}
