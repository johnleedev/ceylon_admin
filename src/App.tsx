import './App.scss';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AdminMenuBar from './screen/admin/components/AdminMenuBar';
import AdminTopBar from './screen/admin/components/AdminTopBar';
import MainAdmin from './screen/admin/MainAdmin';
import MainSchdule from './screen/admin/Menu1_Schedule/MainSchedule';
import MainCounsel from './screen/admin/Menu2_Counsel/MainCounsel';
import ManinReserve from './screen/admin/Menu3_Reserve/MainReserve';
import MainUser from './screen/admin/Menu4_User/MainUser';
import MainProducts from './screen/admin/Menu5_Products/MainProducts';
import MainMenual from './screen/admin/Menu6_Menual/MainMenual';
import MainState from './screen/admin/Menu7_State/MainState';
import MainSystem from './screen/admin/Menu8_System/MainSystem';
import Main from './screen/home/main/Main';
import Header from './screen/home/component/Header';
import Footer from './screen/home/component/Footer';
import MainProduct from './screen/home/Product/MainProduct';
import HotelPage from './screen/home/Product/pages/HotelPage';

function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/*" element={
        <>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/products/*" element={<MainProduct/>}/>
        </Routes>
        <Footer/>
        </>
      }/>

      <Route path="/admin/*" element={
        <div className='adminCover'>
          <div className='adminmenu'>
            <AdminMenuBar/>
          </div>
          <div className='adminmain'>
            <AdminTopBar />
            <div className='adminmainarea'>
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
      }/>
      </Routes>
    </div>
  );
}

export default App;