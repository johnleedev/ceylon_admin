import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_Online from './Sub1_Online';
import Sub2_CounselList from './Sub2_CounselList';
import Sub3_EstimateList from './Sub3_EstimateList';
import Sub4_CloseList from './Sub4_CloseList';
import Sub5_Switch from './Sub5_Switch';
import Sub6_AllList from './Sub6_AllList';
import CounselDetail from './CounselDetail';
import EstimateDetail from './EstimateDetail';


export default function MainCounsel() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_Online/>}/>
        <Route path="/counsellist" element={<Sub2_CounselList/>}/>
        <Route path="/estimatelist" element={<Sub3_EstimateList/>}/>
        <Route path="/closelist" element={<Sub4_CloseList/>}/>
        <Route path="/switch" element={<Sub5_Switch/>}/>
        <Route path="/alllist" element={<Sub6_AllList/>}/>
        <Route path="/counseldetail" element={<CounselDetail/>}/>
        <Route path="/estimatedetail" element={<EstimateDetail/>}/>
      </Routes>
    </div>
  );
}

