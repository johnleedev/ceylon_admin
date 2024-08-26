import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveList from './Sub1_ReserveList';
import Sub2_Arrange from './Sub2_Arrange';
import Sub3_MoneyState from './Sub3_MoneyState';
import Sub4_CancelRefund from './Sub4_CancelRefund';
import Sub5_Notification from './Sub5_Notification';
import ReserveDetail from './Detail/ReserveDetail';
import DocumentReserve from './Document/DocumentReserve';
import DocumentArrange from './Document/DocumentArrange';
import DocumentCalculate from './Document/DocumentCalculate';

export default function ManinReserve() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveList/>}/>
        <Route path="/arrange" element={<Sub2_Arrange/>}/>
        <Route path="/moneystate" element={<Sub3_MoneyState/>}/>
        <Route path="/cancelrefund" element={<Sub4_CancelRefund/>}/>
        <Route path="/notification" element={<Sub5_Notification/>}/>
        <Route path="/reservedetail" element={<ReserveDetail/>}/>
        <Route path="/documentreserve" element={<DocumentReserve/>}/>
        <Route path="/documentarrange" element={<DocumentArrange/>}/>
        <Route path="/documentcalculate" element={<DocumentCalculate/>}/>
      </Routes>
    </div>
  );
}

