import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_CityAirplaneTraffic from './Sub1_CityAirplaneTraffic';
import Sub2_TourSchedule from './Sub2_TourSchedule';
import Sub3_TourHotelRegister from './Sub3_TourHotelRegister';
import Sub4_DetailSchedule from './Sub4_DetailSchedule';
import Sub5_UserSentSchedule from './Sub5_UserSentSchedule';

export default function MainProductsTour () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_CityAirplaneTraffic/>}/>
        <Route path="/tourschedule" element={<Sub2_TourSchedule/>}/>
        <Route path="/tourhotelregister" element={<Sub3_TourHotelRegister/>}/>
        <Route path="/detailschedule" element={<Sub4_DetailSchedule/>}/>
        <Route path="/usersentschedule" element={<Sub5_UserSentSchedule/>}/>
      </Routes>
    </div>
  );
}

