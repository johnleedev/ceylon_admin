import './App.scss';
import { Routes, Route } from 'react-router-dom';
import AdminMenuBar from './screen/admin/components/AdminMenuBar';
import AdminTopBar from './screen/admin/components/AdminTopBar';
import MainAdmin from './screen/admin/MainAdmin';
import MainSchdule from './screen/admin/Menu1_Schedule/MainSchedule';
import MainCounsel from './screen/admin/Menu2_Counsel/MainCounsel';
import ManinReserve from './screen/admin/Menu3_Reserve/MainReserve';
import MainUser from './screen/admin/Menu4_User/MainUser';
import MainProductsRest from './screen/admin/Menu5_ProductsRest/MainProductsRest';
import MainMenual from './screen/admin/Menu7_Menual/MainMenual';
import MainState from './screen/admin/Menu8_State/MainState';
import MainSystem from './screen/admin/Menu9_System/MainSystem';
import Main from './screen/home/main/Main';
import Footer from './screen/home/component/Footer';
import MainProduct from './screen/home/Product/MainProduct';
import MainProductsTour from './screen/admin/Menu6_ProductsTour/MainProductsTour';


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
                <Route path="/productsrest/*" element={<MainProductsRest/>}/>
                <Route path="/productstour/*" element={<MainProductsTour/>}/>
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