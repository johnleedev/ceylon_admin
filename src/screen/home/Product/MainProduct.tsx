import Header from "../component/Header";
import { Route, Routes } from "react-router-dom";
import RestMainPage from "./RestMainPage";
import TourMainPage from "./TourMainPage";
import ResortDetailPage from "./restpages/ResortDetailPage";
import ResortCustomOrder from "./restpages/ResortCustomOrder";
import ResortCustomOrderMC from "./restpages/ResortCustomOrderMC";


export default function MainProduct() {
  return (
    <div>
      <Header />
      <Routes >
          <Route path="/restmain" element={<RestMainPage />}/>
          <Route path="/resortdetail" element={<ResortDetailPage/>}/>
          <Route path="/resortcustomorder" element={<ResortCustomOrder/>}/>
          <Route path="/resortcustomordermc" element={<ResortCustomOrderMC/>}/>

          <Route path="/tourmain" element={<TourMainPage />}/>
          

        </Routes>
    </div>
  );
  
}
