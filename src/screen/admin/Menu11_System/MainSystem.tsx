import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_Authority from './Sub1_Authority';
import Sub2_Infomation from './Sub2_Infomation';
import Sub3_LoginHistory from './Sub3_LoginHostory';
import Sub4_IPList from './Sub4_IPList';



export default function MainSystem () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_Authority/>}/>
        <Route path="/infomation" element={<Sub2_Infomation/>}/>
        <Route path="/loginhistory" element={<Sub3_LoginHistory/>}/>
        <Route path="/iplist" element={<Sub4_IPList/>}/>
      </Routes>
    </div>
  );
}

