import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_TourLocation from './Sub1_TourLocation';
import Sub2_HotelRegister from './Sub2_HotelRegister';
import Sub3_Schedule from './Sub3_Schedule';
import Sub4_SelectSchedule from './Sub4_SelectSchedule';


export default function MainProducts () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_TourLocation/>}/>
        <Route path="/hotelregister" element={<Sub2_HotelRegister/>}/>
        <Route path="/schedule" element={<Sub3_Schedule/>}/>
        <Route path="/selectschedule" element={<Sub4_SelectSchedule/>}/>
      </Routes>
    </div>
  );
}

