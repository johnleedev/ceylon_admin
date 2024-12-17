import Header from "../component/Header";
import { Route, Routes } from "react-router-dom";
import EstimateMade from "./EstimateMade";
import EstimateCustomer from "../user/EstimateCustomer";



export default function MainEstimate() {


  return (
    <div>
      <Header />
      <Routes >
        <Route path="/" element={<EstimateMade />}/>
        <Route path="/customer" element={<EstimateCustomer />}/>
      </Routes>
    </div>
  );
  
}
