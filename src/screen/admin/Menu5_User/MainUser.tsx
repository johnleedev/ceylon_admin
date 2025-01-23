import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Sub1_NewUser from './Sub1_NewUser';
import Sub2_SilverUser from './Sub2_SilverUser';
import Sub3_GoldUser from './Sub3_GoldUser';
import Sub4_VipUser from './Sub4_VipUser';
import Sub5_VvipUser from './Sub5_VvipUser';
import Sub6_LeaveUser from './Sub6_LeaveUser';
import Sub7_Benefit from './Sub7_Benefit';
import Sub8_Gift from './Sub8_Gift';
import Sub9_Notification from './Sub9_Notification';


export default function MainUser () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_NewUser/>}/>
        <Route path="/silveruser" element={<Sub2_SilverUser/>}/>
        <Route path="/golduser" element={<Sub3_GoldUser/>}/>
        <Route path="/vipuser" element={<Sub4_VipUser/>}/>
        <Route path="/vvipuser" element={<Sub5_VvipUser/>}/>
        <Route path="/leaveuser" element={<Sub6_LeaveUser/>}/>
        <Route path="/benefit" element={<Sub7_Benefit/>}/>
        <Route path="/gift" element={<Sub8_Gift/>}/>
        <Route path="/notification" element={<Sub9_Notification/>}/>
      </Routes>
    </div>
  );
}

