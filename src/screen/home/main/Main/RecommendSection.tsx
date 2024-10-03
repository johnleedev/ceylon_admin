import RecommendHeader from "./recommend-section/RecommendHeader";
import RecommendCard from "./recommend-section/RecommendCard";
import hotel1 from "../../images/resort/hotel_12.png";

export default function RecommendSection() {
  const recommendObjs = [
    {
      id: 0,
      title: "반얀트리",
      location: "푸켓",
      tourId: 3,
      rating: 4.76,
      imagePath: hotel1,
    },
    {
      id: 1,
      title: "반얀트리",
      location: "푸켓",
      tourId: 3,
      rating: 3.24,
      imagePath: hotel1,
    },
    {
      id: 2,
      title: "반얀트리",
      location: "푸켓",
      tourId: 3,
      rating: 4.33,
      imagePath: hotel1,
    },
    {
      id: 3,
      title: "반얀트리",
      location: "푸켓",
      tourId: 3,
      rating: 2.51,
      imagePath: hotel1,
    },
  ];
  return (
    <section className="recommend__section__wrapper">
      <RecommendHeader
        title={["3-4인 가족", "추천여행지"]}
        subtitle="여행전문가가 추천하는 여행지"
      />
      <div className="recommend__cards__wrapper">
        {recommendObjs.map((obj) => (
          <RecommendCard key={obj.id} {...obj} />
        ))}
      </div>
    </section>
  );
}
