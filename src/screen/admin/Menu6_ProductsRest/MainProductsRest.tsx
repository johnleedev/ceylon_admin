import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_CityAirplane from './Sub1_CityAirplane';
import Sub2_HotelRegister from './Sub2_HotelRegister';
import Sub3_Schedule from './Sub3_Schedule';
import Sub5_ScheduleBox from './Sub5_ScheduleBox';
import Sub4_TourProduct from './Sub4_TourProduct';
import Sub6_LandCompany from './Sub6_LandCompany';



export default function MainProductsRest () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_CityAirplane/>}/>
        <Route path="/hotelregister" element={<Sub2_HotelRegister/>}/>
        <Route path="/schedule" element={<Sub3_Schedule/>}/>
        <Route path="/tourproduct" element={<Sub4_TourProduct/>}/>
        <Route path="/schedulebox" element={<Sub5_ScheduleBox/>}/>
        <Route path="/landcompany" element={<Sub6_LandCompany/>}/>
      </Routes>
    </div>
  );
}

