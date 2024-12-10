import React, { useCallback, useEffect, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import Loading from '../../components/Loading';
import PreHotelCost from './ModalHotelCostComponent/PreHotelCost';
import FullVillaCost from './ModalHotelCostComponent/FullVillaCost';
import PerDayCost from './ModalHotelCostComponent/PerDayCost';


export default function ModalHotelCost (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const hotelInfoData = props.hotelInfo;
  const hotelCostInfoData = props.hotelCostInfo;
  const hotelCostInputDefaultData = props.hotelCostInputDefault;
  const isAddOrRevise = props.isAddOrRevise;

  const [locationDetail, setLocationDetail] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData.locationDetail : "");
  const [landCompany, setLandCompany] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData.landCompany : "");
  const [selectCostType, setSelectCostType] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData.selectCostType : "");

  const handleClose = async () => {
    const infores = await axios.get(`${MainURL}/restproducthotel/getinfoinputstate/${hotelInfoData.id}`)
    if (infores.data !== false) {
      const infocopy = infores.data[0];
      if (infocopy.isInfoInput === 'false' || infocopy.isInfoInput === '' ) {
        handleSaveAlert('요금표정보');
      } else {
        props.setRefresh(!props.refresh);
        props.setIsViewHotelCostModal(false);
      }
    }
  };

  const handleSaveAlert = (text:string) => {
    const costConfirmed = window.confirm(`${text}가 저장되지 않았습니다. 요금표 작성을 취소하시겠습니까?`);
    if (costConfirmed) {
      inputContentDelete();
    } else {
      return
    }
  };
 
  const inputContentDelete = async () => {
    axios
      .post(`${MainURL}/restproducthotel/hotelcostcreatingdelete`, {
        postId : hotelInfoData.id
      })
      .then((res) => {
        if (res.data) {
          props.setRefresh(!props.refresh);
          props.setIsViewHotelCostModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };
  
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={handleClose} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>요금표</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행지'/>
            <p>{hotelInfoData.nation} {hotelInfoData.city}</p>
            <input className="inputdefault" type="text" style={{width:'40%', marginLeft:'15px'}} 
              value={locationDetail} onChange={(e)=>{setLocationDetail(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드사'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={landCompany} onChange={(e)=>{setLandCompany(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='요금표선택'/>
            {
              hotelInfoData.isInfoInput === 'true' 
              ?
              <p>{hotelCostInfoData.selectCostType}</p>
              :
              <div className='checkInputCover'>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '선투숙/후투숙'}
                    onChange={()=>{setSelectCostType('선투숙/후투숙')}}
                  />
                </div>
                <p>선투숙/후투숙</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '팩요금'}
                    onChange={()=>{setSelectCostType('팩요금')}}
                  />
                </div>
                <p>팩요금</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '박당/경유지'}
                    onChange={()=>{setSelectCostType('박당/경유지')}}
                  />
                </div>
                <p>박당/경유지</p>
              </div>
            }
          </div>
        </div>
      </section>

      <div style={{height:50}}></div>
      {
        (selectCostType !== '' && selectCostType !== null) &&
        <>
          { selectCostType === '선투숙/후투숙' &&
            <PreHotelCost isAddOrRevise={isAddOrRevise} 
              hotelInfoData={hotelInfoData} hotelCostInfoData={hotelCostInfoData} hotelCostInputDefaultData={hotelCostInputDefaultData}
              handleClose={handleClose} locationDetail={locationDetail} landCompany={landCompany} selectCostType={selectCostType}
              setIsViewHotelCostModal={props.setIsViewHotelCostModal} refresh={props.refresh} setRefresh={props.setRefresh} />}
          { selectCostType === '팩요금' &&
            <FullVillaCost isAddOrRevise={isAddOrRevise} 
              hotelInfoData={hotelInfoData} hotelCostInfoData={hotelCostInfoData} hotelCostInputDefaultData={hotelCostInputDefaultData}
              handleClose={handleClose} locationDetail={locationDetail} landCompany={landCompany} selectCostType={selectCostType}
              setIsViewHotelCostModal={props.setIsViewHotelCostModal} refresh={props.refresh} setRefresh={props.setRefresh} />}
          { selectCostType === '박당/경유지' &&
            <PerDayCost isAddOrRevise={isAddOrRevise} 
              hotelInfoData={hotelInfoData} hotelCostInfoData={hotelCostInfoData} hotelCostInputDefaultData={hotelCostInputDefaultData}
              handleClose={handleClose} locationDetail={locationDetail} landCompany={landCompany} selectCostType={selectCostType}
              setIsViewHotelCostModal={props.setIsViewHotelCostModal} refresh={props.refresh} setRefresh={props.setRefresh} />}
        </>
      }
    </div>     
  )
}

