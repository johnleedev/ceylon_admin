import './App.scss';
import { Routes, Route } from 'react-router-dom';
import AdminMenuBar from './screen/admin/components/AdminMenuBar';
import AdminTopBar from './screen/admin/components/AdminTopBar';
import MainAdmin from './screen/admin/MainAdmin';
import MainScheduleRouter from './screen/admin/Menu1_Schedule/MainScheduleRouter';
import MainCounsel from './screen/admin/Menu2_Counsel/MainCounsel';
import MainReserve from './screen/admin/Menu3_Reserve/MainReserve';
import MainUser from './screen/admin/Menu5_User/MainUser';
import MainProductsRest from './screen/admin/Menu6_ProductsRest/MainProductsRest';
import MainMenual from './screen/admin/Menu9_Menual/MainMenual';
import MainManage from './screen/admin/Menu10_Manage/MainManage';
import MainSystem from './screen/admin/Menu11_System/MainSystem';
import Main from './screen/home/main/Main';
import Footer from './screen/home/component/Footer';
import MainProduct from './screen/home/Product/MainProduct';
import MainProductsTour from './screen/admin/Menu7_ProductsTour/MainProductsTour';
import MainEstimate from './screen/home/estimate/MainEstimate';
import MainUserPage from './screen/home/user/MainUserPage';
import MainSent from './screen/admin/Menu4_SentManage/MainSent';
import MainLandCompany from './screen/admin/Menu8_LandCompany/MainLandCompany';


function App() {

  return (
    <div className="App">
      <Routes>
      <Route path="/*" element={
        <>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/products/*" element={<MainProduct/>}/>
          <Route path="/estimate" element={<MainEstimate/>}/>
          <Route path="/user" element={<MainUserPage/>}/>
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
                <Route path="/schedule/*" element={<MainScheduleRouter/>}/>
                <Route path="/counsel/*" element={<MainCounsel/>}/>
                <Route path="/reserve/*" element={<MainReserve/>}/>
                <Route path="/sent/*" element={<MainSent/>}/>
                <Route path="/user/*" element={<MainUser/>}/>
                <Route path="/productsrest/*" element={<MainProductsRest/>}/>
                <Route path="/productstour/*" element={<MainProductsTour/>}/>
                <Route path="/landcompany/*" element={<MainLandCompany/>}/>
                <Route path="/menual/*" element={<MainMenual/>}/>
                <Route path="/manage/*" element={<MainManage/>}/>
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