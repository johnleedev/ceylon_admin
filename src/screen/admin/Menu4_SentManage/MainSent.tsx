import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_SentList from './Sub1_SentList';
import Sub2_NoticeComfirm from './Sub2_NoticeConfirm';
import Sub3_TourInsurance from './Sub3_TourInsurance';
import Sub4_CostWithdrawal from './Sub4_CostWithdrawal';
import Sub5_UserLocalCall from './Sub5_UserLocalCall';



export default function MainSent () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_SentList/>}/>
        <Route path="/noticeconfirm" element={<Sub2_NoticeComfirm/>}/>
        <Route path="/tourinsurance" element={<Sub3_TourInsurance/>}/>
        <Route path="/costwithdrawal" element={<Sub4_CostWithdrawal/>}/>
        <Route path="/userlocalcall" element={<Sub5_UserLocalCall/>}/>
      </Routes>
    </div>
  );
}