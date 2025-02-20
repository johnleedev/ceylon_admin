import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_MainSchdulePage from './Sub1_MainSchedulePage';
import ReservePage from './ReservePage/ReservePage';
import Sub2_CustomFeedback from './Sub2_CustomFeedback';

export default function MainScheduleRouter() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_MainSchdulePage/>}/>
        <Route path="/feedback" element={<Sub2_CustomFeedback/>}/>
        <Route path="/reservepage" element={<ReservePage/>}/>
      </Routes>
    </div>
  );
}

