import Header from "../component/Header";
import "./Product.scss";
import TourMainPage from "./pages/TourMainPage";
import TourDetailPage from "./pages/TourDetailPage";
import HotelPage from "./pages/HotelPage";
import { Route, Routes } from "react-router-dom";
import HotelDetailPage from "./pages/HotelDetailPage";


export default function MainProduct() {



  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<TourMainPage />}/>
        <Route path="/tourdetail" element={<TourDetailPage/>}/>
        <Route path="/hotelresort" element={<HotelPage/>}/>
        <Route path="/hotelresortdetail" element={<HotelDetailPage/>}/>
      </Routes>
    </div>
  );
  
}
