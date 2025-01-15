import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_ReserveState from './Sub1_ReserveState';
import Sub2_DepartState from './Sub2_DepartState';
import Sub3_Calculate from './Sub3_Calculate';



export default function MainState () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_ReserveState/>}/>
        <Route path="/departstate" element={<Sub2_DepartState/>}/>
        <Route path="/calculate" element={<Sub3_Calculate/>}/>
      </Routes>
    </div>
  );
}

