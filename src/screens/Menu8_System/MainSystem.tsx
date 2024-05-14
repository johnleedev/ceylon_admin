import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_Authority from './Sub1_Authority';
import Sub2_Executive from './Sub2_Executive';
import Sub3_IPList from './Sub3_IPList';
import Sub4_LoginHistory from './Sub4_LoginHostory';


export default function MainSystem () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_Authority/>}/>
        <Route path="/executive" element={<Sub2_Executive/>}/>
        <Route path="/iplist" element={<Sub3_IPList/>}/>
        <Route path="/loginhistory" element={<Sub4_LoginHistory/>}/>
      </Routes>
    </div>
  );
}

