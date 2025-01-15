import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveList from './Sub1_ReserveList';

import Sub2_ArrangeState from './Sub2_ArrangeState';
import Sub3_ArrangeWaiting from './Sub3_ArrangeWaiting';
import Sub4_DepositList from './Sub4_DepositList';
import Sub5_CancelRefund from './Sub5_CancelRefund';

import ReserveDetail from './Detail/ReserveDetail';
import DocumentReserve from './Document/DocumentReserve';
import DocumentArrange from './Document/DocumentArrange';
import DocumentCalculate from './Document/DocumentCalculate';


export default function ManinReserve() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveList/>}/>
        <Route path="/arrangestate" element={<Sub2_ArrangeState/>}/>
        <Route path="/arrangewaiting" element={<Sub3_ArrangeWaiting/>}/>
        <Route path="/depositlist" element={<Sub4_DepositList/>}/>
        <Route path="/cancelrefund" element={<Sub5_CancelRefund/>}/>

        <Route path="/reservedetail" element={<ReserveDetail/>}/>
        <Route path="/documentreserve" element={<DocumentReserve/>}/>
        <Route path="/documentarrange" element={<DocumentArrange/>}/>
        <Route path="/documentcalculate" element={<DocumentCalculate/>}/>
      </Routes>
    </div>
  );
}

