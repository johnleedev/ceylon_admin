import { useParams } from "react-router-dom";
import { getHotelData, getTourData } from "../../utilies";
import ResortSearchBar from "../section/common/ResortSearchBar";
import TourHeaderSection from "../section/TourDetailPage/TourHeaderSection";
import ResortCategorySection from "../section/TourDetailPage/ResortCategorySection";


export default function TourDetailPage() {
  const { tourId } = useParams();
  const id = 1;
  const { tourObjs, selectedTour } = getTourData(id);
  const hotelObjs = getHotelData(id);

  return (
    <div>
      <ResortSearchBar itemObjs={tourObjs} />
      <TourHeaderSection {...selectedTour} />
      <ResortCategorySection hotelObjs={hotelObjs} />
    </div>
  );
}
