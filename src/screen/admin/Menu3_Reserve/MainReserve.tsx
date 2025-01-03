import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveList from './Sub1_ReserveList';
import Sub2_DepositList from './Sub2_DepositList';
import Sub3_ArrangeState from './Sub3_ArrangeState';
import Sub4_WithdrawState from './Sub4_WithdrawState';
import Sub5_Notification from './Sub5_Notification';
import Sub6_CancelRefund from './Sub6_CancelRefund';
import ReserveDetail from './Detail/ReserveDetail';
import DocumentReserve from './Document/DocumentReserve';
import DocumentArrange from './Document/DocumentArrange';
import DocumentCalculate from './Document/DocumentCalculate';


export default function ManinReserve() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveList/>}/>
        <Route path="/depositlist" element={<Sub2_DepositList/>}/>
        <Route path="/arrangestate" element={<Sub3_ArrangeState/>}/>
        <Route path="/withdrawstate" element={<Sub4_WithdrawState/>}/>
        <Route path="/notification" element={<Sub5_Notification/>}/>
        <Route path="/cancelrefund" element={<Sub6_CancelRefund/>}/>
        <Route path="/reservedetail" element={<ReserveDetail/>}/>
        <Route path="/documentreserve" element={<DocumentReserve/>}/>
        <Route path="/documentarrange" element={<DocumentArrange/>}/>
        <Route path="/documentcalculate" element={<DocumentCalculate/>}/>
      </Routes>
    </div>
  );
}

