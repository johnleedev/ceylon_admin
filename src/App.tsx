import './App.scss';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MenuBar from './components/MenuBar';
import TopBar from './components/TopBar';
import MainAdmin from './screens/MainAdmin';
import MainSchdule from './screens/Menu1_Schedule/MainSchedule';
import MainCounsel from './screens/Menu2_Counsel/MainCounsel';
import ManinReserve from './screens/Menu3_Reserve/MainReserve';
import MainUser from './screens/Menu4_User/MainUser';
import MainProducts from './screens/Menu5_Products/MainProducts';
import MainMenual from './screens/Menu6_Menual/MainMenual';
import MainState from './screens/Menu7_State/MainState';
import MainSystem from './screens/Menu8_System/MainSystem';

function App() {

  return (
    <div className="App">
      
      <div className='menu'>
        <MenuBar/>
      </div>
      <div className='main'>
        <TopBar />
        <div className='mainarea'>
          <Routes>
            <Route path="/" element={<MainAdmin/>}/>
            <Route path="/schedule/*" element={<MainSchdule/>}/>
            <Route path="/counsel/*" element={<MainCounsel/>}/>
            <Route path="/reserve/*" element={<ManinReserve/>}/>
            <Route path="/user/*" element={<MainUser/>}/>
            <Route path="/products/*" element={<MainProducts/>}/>
            <Route path="/menual/*" element={<MainMenual/>}/>
            <Route path="/state/*" element={<MainState/>}/>
            <Route path="/system/*" element={<MainSystem/>}/>
          </Routes>
        </div>
      </div>
      
      
    </div>
  );
}

export default App;