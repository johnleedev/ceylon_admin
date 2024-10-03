import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_CityAirplane from './Sub1_CityAirplane';
import Sub2_HotelRegister from './Sub2_HotelRegister';
import Sub3_Schedule from './Sub3_Schedule';
import Sub5_SelectSchedule from './Sub5_SelectSchedule';
import Sub6_LandCompany from './Sub6_LandCompany';
import Sub4_TourLocation from './Sub4_TourLocation';


export default function MainProducts () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_CityAirplane/>}/>
        <Route path="/hotelregister" element={<Sub2_HotelRegister/>}/>
        <Route path="/schedule" element={<Sub3_Schedule/>}/>
        <Route path="/tourlocation" element={<Sub4_TourLocation/>}/>
        <Route path="/selectschedule" element={<Sub5_SelectSchedule/>}/>
        <Route path="/landcompany" element={<Sub6_LandCompany/>}/>
      </Routes>
    </div>
  );
}

