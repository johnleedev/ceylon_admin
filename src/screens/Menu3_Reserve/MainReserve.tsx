import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveList from './Sub1_ReserveList';
import Sub2_Arrange from './Sub2_Arrange';
import Sub3_MoneyState from './Sub3_MoneyState';
import Sub4_Notification from './Sub4_Notification';
import Sub5_CancelRefund from './Sub5_CancelRefund';

export default function ManinReserve() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveList/>}/>
        <Route path="/arrange" element={<Sub2_Arrange/>}/>
        <Route path="/moneystate" element={<Sub3_MoneyState/>}/>
        <Route path="/notification" element={<Sub4_Notification/>}/>
        <Route path="/cancelrefund" element={<Sub5_CancelRefund/>}/>
      </Routes>
    </div>
  );
}

