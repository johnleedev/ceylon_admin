import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_Online from './Sub1_Online';
import Sub2_EstimateList from './Sub2_EstimateList';
import Sub3_CounselList from './Sub3_CounselList';
import Sub4_SwitchList from './Sub4_SwitchList';
import Sub5_CloseList from './Sub5_CloseList';
import CounselDetail from './CounselDetail';
import EstimateDetail from './EstimateDetail';


export default function MainCounsel() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_Online/>}/>
        <Route path="/estimatelist" element={<Sub2_EstimateList/>}/>
        <Route path="/counsellist" element={<Sub3_CounselList/>}/>
        <Route path="/switchlist" element={<Sub4_SwitchList/>}/>
        <Route path="/closelist" element={<Sub5_CloseList/>}/>
        <Route path="/counseldetail" element={<CounselDetail/>}/>
        <Route path="/estimatedetail" element={<EstimateDetail/>}/>
      </Routes>
    </div>
  );
}

