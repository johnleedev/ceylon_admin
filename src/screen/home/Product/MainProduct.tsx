import Header from "../component/Header";
import { Route, Routes } from "react-router-dom";
import RestMainPage from "./RestMainPage";
import TourMainPage from "./TourMainPage";
import ResortDetailPage from "./restpages/ResortDetailPage";
import ResortCustomOrder from "./restpages/ResortCustomOrder";
import ResortCustomOrderMC from "./restpages/ResortCustomOrderMC";
import NationDetailPage from "./tourpages/NationDetailPage";
import NationCustomMade from "./tourpages/NationCustomMade";
import NationCustomOrder from "./tourpages/NationCustomOrder";


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
        <Route path="/nationdetail" element={<NationDetailPage />}/>
        <Route path="/nationcustommade" element={<NationCustomMade/>}/>
        <Route path="/nationcustomorder" element={<NationCustomOrder/>}/>
      </Routes>
    </div>
  );
  
}
