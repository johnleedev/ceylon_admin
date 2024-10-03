import { getTourData } from "../../utilies";
import ResortSearchBar from "../section/common/ResortSearchBar";
import ResortBestSection from "../section/TourMainPage/ResortBestTour";
import ResortMainSection from "../section/TourMainPage/ResortMainSection";
import ResortTourSection from "../section/TourMainPage/ResortTourSection";

export default function TourMainPage() {
  const { tourObjs } = getTourData();
  return (
    <div>
      <ResortSearchBar itemObjs={tourObjs} />
      <ResortMainSection />
      <ResortTourSection itemObjs={tourObjs} />
      <ResortBestSection />
    </div>
  );
}
