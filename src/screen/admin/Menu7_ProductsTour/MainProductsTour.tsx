import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_CityAirplaneTraffic from './Sub1_CityAirplaneTraffic';
import Sub2_TourSchedule from './Sub2_TourSchedule';
import Sub3_TourHotelRegister from './Sub3_TourHotelRegister';
import Sub4_SelectSchedule from './Sub4_SelectSchedule';
import Sub5_ScheduleBox from './Sub5_ScheduleBox';
import Sub6_UserSentSchedule from './Sub6_UserSentSchedule';

export default function MainProductsTour () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_CityAirplaneTraffic/>}/>
        <Route path="/tourschedule" element={<Sub2_TourSchedule/>}/>
        <Route path="/tourhotelregister" element={<Sub3_TourHotelRegister/>}/>
        <Route path="/selectschedule" element={<Sub4_SelectSchedule/>}/>
        <Route path="/schedulebox" element={<Sub5_ScheduleBox/>}/>
        <Route path="/usersentschedule" element={<Sub6_UserSentSchedule/>}/>
      </Routes>
    </div>
  );
}

