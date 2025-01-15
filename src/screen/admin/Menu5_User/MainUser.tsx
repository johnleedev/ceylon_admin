import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sub1_AllUser from './Sub1_AllUser';
import Sub2_NewUser from './Sub2_NewUser';
import Sub3_SilverUser from './Sub3_SilverUser';
import Sub4_GoldUser from './Sub4_GoldUser';
import Sub5_VipUser from './Sub5_VipUser';
import Sub6_VvipUser from './Sub6_VvipUser';
import Sub7_LeaveUser from './Sub7_LeaveUser';
import Sub8_Benefit from './Sub8_Benefit';
import Sub9_Notification from './Sub9_Notification';


export default function MainUser () {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Sub1_AllUser/>}/>
        <Route path="/newuser" element={<Sub2_NewUser/>}/>
        <Route path="/silveruser" element={<Sub3_SilverUser/>}/>
        <Route path="/golduser" element={<Sub4_GoldUser/>}/>
        <Route path="/vipuser" element={<Sub5_VipUser/>}/>
        <Route path="/vvipuser" element={<Sub6_VvipUser/>}/>
        <Route path="/leaveuser" element={<Sub7_LeaveUser/>}/>
        <Route path="/benefit" element={<Sub8_Benefit/>}/>
        <Route path="/notification" element={<Sub9_Notification/>}/>
      </Routes>
    </div>
  );
}

