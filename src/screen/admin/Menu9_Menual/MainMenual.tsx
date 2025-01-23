import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_Commute from './Sub1_Commute';
import Sub2_StaffMenual from './Sub2_StaffMenual';
import Sub3_CostomerReception from './Sub3_CostomerReception';
import Sub4_CompanyReception from './Sub4_CompanyReception';
import Sub5_InternalDocument from './Sub5_InternalDocument';



export default function MainMenual () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_Commute/>}/>
        <Route path="/staffmenual" element={<Sub2_StaffMenual/>}/>
        <Route path="/costomerreception" element={<Sub3_CostomerReception/>}/>
        <Route path="/companyreception" element={<Sub4_CompanyReception/>}/>
        <Route path="/internaldocument" element={<Sub5_InternalDocument/>}/>
      </Routes>
    </div>
  );
}

