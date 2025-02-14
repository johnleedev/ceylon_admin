import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_CityAirplane from './Sub1_CityAirplane';
import Sub2_HotelRegister from './Sub2_HotelRegister';
import Sub3_Schedule from './Sub3_Schedule';
import Sub4_DetailSchedule from './Sub4_DetailSchedule';
import Sub5_UserSentSchedule from './Sub5_UserSentSchedule';

export default function MainProductsRest () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_CityAirplane/>}/>
        <Route path="/hotelregister" element={<Sub2_HotelRegister/>}/>
        <Route path="/schedule" element={<Sub3_Schedule/>}/>
        <Route path="/detailschedule" element={<Sub4_DetailSchedule/>}/>
        <Route path="/usersentschedule" element={<Sub5_UserSentSchedule/>}/>
        {/* <Route path="/schedulebox" element={<Sub5_ScheduleBox/>}/> */}
      </Routes>
    </div>
  );
}

