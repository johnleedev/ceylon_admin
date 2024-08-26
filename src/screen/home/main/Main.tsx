import BestSection from "./Main/BestSection";
import JoinSection from "./Main/JoinSection";
import MainSection from "./Main/MainSection";
import PromotionSection from "./Main/PromotionSection";
import RecommendSection from "./Main/RecommendSection";
import ReviewSection from "./Main/ReviewSection";
import "./Main.scss";
import Header from "../component/Header";

export interface IBgObj {
  title: string;
  subtitle: string;
  imagePath: string;
}

export default function MainPage() {
  return (
    <div>
      <Header />
      <MainSection />
      <BestSection />
      <PromotionSection />
      <RecommendSection />
      <JoinSection />
      <ReviewSection />
    </div>
  );
}
