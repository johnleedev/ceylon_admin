import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveProcess from './Sub1_ReserveProcess';
import Sub2_ReceptionProcess from './Sub2_ReceptionProcess';
import Sub3_CompanyDocument from './Sub3_CompanyDocument';
import Sub4_InternalRule from './Sub4_InternalRule';



export default function MainMenual () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveProcess/>}/>
        <Route path="/receptionprocess" element={<Sub2_ReceptionProcess/>}/>
        <Route path="/companydocument" element={<Sub3_CompanyDocument/>}/>
        <Route path="/internalrule" element={<Sub4_InternalRule/>}/>
      </Routes>
    </div>
  );
}

