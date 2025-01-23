import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_LCList from './Sub1_LCList';
import Sub2_ArrangeList from './Sub2_ArrangeList';
import Sub3_ArrangeWaiting from './Sub3_ArrangeWaiting';
import Sub4_CostDeposit from './Sub4_CostDeposit';
import Sub5_Issues from './Sub5_Issues';


export default function MainLandCompany () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_LCList/>}/>
        <Route path="/arrangelist" element={<Sub2_ArrangeList/>}/>
        <Route path="/arrangewaiting" element={<Sub3_ArrangeWaiting/>}/>
        <Route path="/costdeposit" element={<Sub4_CostDeposit/>}/>
        <Route path="/issues" element={<Sub5_Issues/>}/>
      </Routes>
    </div>
  );
}

