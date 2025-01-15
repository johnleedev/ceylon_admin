
import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { FaEuroSign } from "react-icons/fa";


interface HotelReviseProps {
  hotelName: string;
  hotelLevel: string;
  roomType: string; 
  breakfast: string;
  location: string;
  costOneDay: string;
  costPersonal: string
};


export default function ModalHotelRevise (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;

 

  const [reviseHotelData, setReviseHotelData] = useState<HotelReviseProps[]>([
    {hotelName:"", hotelLevel:"", roomType:"", breakfast:"true", location:"", costOneDay:"", costPersonal:""}
  ]);
  const [defaultCost, setDefaultCost] = useState('');
  const [reviseCost, setReviseCost] = useState('');


  // 저장 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const registerCity = async () => {
    const getParams = {
          
    }
    axios 
      .post(`${MainURL}/tournationcity/registercities`, getParams)
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };



  // 수정 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const reviseCity = async () => {
    const getParams = {
      
    }
    axios 
      .post(`${MainURL}/tournationcity/revisecities`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const stylecopy = {width:'90%', marginLeft:'5px', minHeight:'40px', outline:'none'}
  
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewHotelReviseModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      {/* 도시 생성 --------------------------------------------------------------------------------------------------------------- */}
      
      <div className="modal-header">
        <h1>호텔변경</h1>

      </div>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'15%'}} ><p>호텔명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>성급</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>룸타입</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'13%'}} ><p>조식</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>지역</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>1박요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'12%'}} ><p>1인요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'5%'}} ><p></p></div>
        </div>
        {
          reviseHotelData.map((item:any, index:any)=>{

            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={stylecopy} 
                      value={item.hotelName} onChange={(e)=>{
                        const copy = [...reviseHotelData];
                        copy[index].hotelName = e.target.value;
                        setReviseHotelData(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={stylecopy}
                    value={item.hotelLevel} onChange={(e)=>{
                        const copy = [...reviseHotelData];
                        copy[index].hotelLevel = e.target.value;
                        setReviseHotelData(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={stylecopy}
                       value={item.roomType} onChange={(e)=>{
                        const copy = [...reviseHotelData];
                        copy[index].roomType = e.target.value;
                        setReviseHotelData(copy);
                      }}/>
                  </div>
                  <div style={{width:'13%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className='checkInputCover'>
                      <div className='checkInput'>
                        <input className="input" type="checkbox"
                          checked={item.breakfast === 'true'}
                          onChange={()=>{
                            const copy = [...reviseHotelData];
                            copy[index].breakfast = 'true';
                            setReviseHotelData(copy);
                          }}
                        />
                      </div>
                      <p>포함</p>
                      <div className='checkInput'>
                        <input className="input" type="checkbox"
                          checked={item.breakfast === 'false'}
                          onChange={()=>{
                            const copy = [...reviseHotelData];
                            copy[index].breakfast = 'false';
                            setReviseHotelData(copy);
                          }}
                        />
                      </div>
                      <p>불포함</p>
                    </div>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={stylecopy}
                      value={item.location} onChange={(e)=>{
                        const copy = [...reviseHotelData];
                        copy[index].location = e.target.value;
                        setReviseHotelData(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={stylecopy}
                      value={item.costOneDay} onChange={(e)=>{
                        const copy = [...reviseHotelData];
                        copy[index].costOneDay = e.target.value;
                        setReviseHotelData(copy);
                      }}/>
                  </div>
                  <div style={{width:'12%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={stylecopy}
                      value={item.costPersonal} onChange={(e)=>{
                        const copy = [...reviseHotelData];
                        copy[index].costPersonal = e.target.value;
                        setReviseHotelData(copy);
                      }}/>
                  </div>
                  <div style={{width:'5%', display:'flex'}} >
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...reviseHotelData, {hotelName:"", hotelLevel:"", roomType:"", breakfast:"true", location:"", costOneDay:"", costPersonal:""}];
                          setReviseHotelData(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...reviseHotelData,];
                          copy.splice(index, 1);
                          setReviseHotelData(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>

      <div style={{height:'50px'}}></div>

      <div className="modal-header">
        <h1>요금변동</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='기존 상품가'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={defaultCost} onChange={(e)=>{
                  setDefaultCost(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔 변경시'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={reviseCost} onChange={(e)=>{
                setReviseCost(e.target.value);
              }}/>
          </div>
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewHotelReviseModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            
          }}
        >
          <p>저장</p>
        </div>
       
      </div>



      
      
    </div>     
  )
}
