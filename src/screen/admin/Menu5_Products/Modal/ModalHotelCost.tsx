import React, { useCallback, useEffect, useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import Loading from '../../components/Loading';
import PreHotelCost from './ModalHotelCostComponent/PreHotelCost';
import FullVillaCost from './ModalHotelCostComponent/FullVillaCost';


export default function ModalHotelCost (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const hotelInfoData = props.hotelInfo;

  const [locationDetail, setLocationDetail] = useState(hotelInfoData.locationDetail);
  const [landCompany, setLandCompany] = useState(hotelInfoData.landCompany);
  const [selectCostType, setSelectCostType] = useState(hotelInfoData.selectCostType);
  const [hotelCostData, setHotelCostData] = useState();

  const fetchPost = async () => {
    const res = await axios.get(`${MainURL}/producthotel/gethotelcost/${hotelInfoData.id}`)
    if (res.data !== false) {
      const copy = res.data;
      const result = copy.map((item: any) => {
        return {
         reservePeriod : JSON.parse(item.reservePeriod),
         inputDefault : JSON.parse(item.inputDefault),
         inputSeason : JSON.parse(item.inputSeason),
         saleDefaultCost: JSON.parse(item.saleDefaultCost),
         saleSeasonCost: JSON.parse(item.saleSeasonCost)
        };
      });
      setHotelCostData(result);
    }
  };

  useEffect(() => {
    if (hotelInfoData.isCostInput === 'true') {
      fetchPost();
    }
  }, []);


  const handleClose = async () => {
    const res = await axios.get(`${MainURL}/producthotel/getcostinputstate/${hotelInfoData.id}`)
    if (res.data !== false) {
      const copy = res.data[0];
      if (copy.isCostInput === 'false' || copy.isCostInput === '' ) {
        handleSaveAlert();
      } else {
        props.setRefresh(!props.refresh);
        props.setIsViewHotelCostModal(false);
      }
    }
  };

  const handleSaveAlert = () => {
    const costConfirmed = window.confirm("저장되지 않았습니다. 요금표 작성을 취소하시겠습니까?");
      if (costConfirmed) {
        inputContentDelete();
    } else {
      return
    }
  };
 
  const inputContentDelete = async () => {
    axios
      .post(`${MainURL}/producthotel/hotelcostcreatingdelete`, {
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
              hotelInfoData.isCostInput === 'true' 
              ?
              <p>{hotelInfoData.selectCostType}</p>
              :
              <div className='checkInputCover'>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '선투숙'}
                    onChange={()=>{setSelectCostType('선투숙')}}
                  />
                </div>
                <p>선투숙리조트</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '후투숙'}
                    onChange={()=>{setSelectCostType('후투숙')}}
                  />
                </div>
                <p>후투숙리조트</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '경유지'}
                    onChange={()=>{setSelectCostType('경유지')}}
                  />
                </div>
                <p>경유호텔</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '풀빌라'}
                    onChange={()=>{setSelectCostType('풀빌라')}}
                  />
                </div>
                <p>풀빌라</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '리조트'}
                    onChange={()=>{setSelectCostType('리조트')}}
                  />
                </div>
                <p>리조트</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostType === '호텔'}
                    onChange={()=>{setSelectCostType('호텔')}}
                  />
                </div>
                <p>호텔</p>
              </div>
            }
          </div>
        </div>
      </section>

      <div style={{height:50}}></div>
      {
        (selectCostType !== '' && selectCostType !== null) &&
        <>
          {
            ( selectCostType === '선투숙') 
            ?
            <PreHotelCost hotelCostData={hotelCostData} handleClose={handleClose} locationDetail={locationDetail} landCompany={landCompany} selectCostType={selectCostType}
              hotelInfoData={hotelInfoData} setIsViewHotelCostModal={props.setIsViewHotelCostModal} refresh={props.refresh} setRefresh={props.setRefresh}
            />
            :
            <FullVillaCost hotelCostData={hotelCostData} handleClose={handleClose} locationDetail={locationDetail} landCompany={landCompany} selectCostType={selectCostType}
              hotelInfoData={hotelInfoData} setIsViewHotelCostModal={props.setIsViewHotelCostModal} refresh={props.refresh} setRefresh={props.setRefresh}
            />
          }
        </>
      }
            
    </div>     
  )
}

