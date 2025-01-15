import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MainSchdulePage from './MainSchedulePage';
import ReservePage from './ModalReserve/ReservePage';



export default function MainScheduleRouter() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<MainSchdulePage/>}/>
        <Route path="/reservepage" element={<ReservePage/>}/>
      </Routes>
    </div>
  );
}

