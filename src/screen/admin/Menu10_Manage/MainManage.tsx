import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveStaff from './Sub1_ReserveStaff';
import Sub2_ReservePath from './Sub2_ReservePath';


import Sub3_ReserveCalculate from './Sub3_ReserveCalculate';
import Sub4_ReserveSents from './Sub4_ReserveSents';
import Sub5_AdjustStaff from './Sub5_AdjustStaff';
import Sub6_AdjustPath from './Sub6_AdjustPath';
import Sub7_AdjustLC from './Sub7_AdjustLC';
import Sub8_Rebate from './Sub8_Rebate';
import Sub9_Incentive from './Sub9_Incentive';



export default function MainManage () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveStaff/>}/>
        <Route path="/reservepath" element={<Sub2_ReservePath/>}/>
        <Route path="/reservecalculate" element={<Sub3_ReserveCalculate/>}/>
        <Route path="/reservesents" element={<Sub4_ReserveSents/>}/>
        <Route path="/adjuststaff" element={<Sub5_AdjustStaff/>}/>
        <Route path="/adjustpath" element={<Sub6_AdjustPath/>}/>
        <Route path="/adjustlc" element={<Sub7_AdjustLC/>}/>
        <Route path="/rebate" element={<Sub8_Rebate/>}/>
        <Route path="/incentive" element={<Sub9_Incentive/>}/>
      </Routes>
    </div>
  );
}

