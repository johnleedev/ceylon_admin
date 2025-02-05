import React, { useState } from 'react';
import './Document.scss';
import logo from '../../images/logobk.png';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDownLandCompany } from '../../../DefaultData';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useLocation, useNavigate } from 'react-router-dom';


export default function DocumentArrange() {
  
  let navigate = useNavigate();
  const adminUserName = sessionStorage.getItem('userName');
  const newDate = new Date();
  const currentDate = format(newDate, 'yyyy년 MM월 dd일', { locale: ko });

  const location = useLocation();
  const userInfo = location.state.userInfo;
  const productInfo = location.state.productInfo;

 
  const reserveInfo = location.state.reserveInfo;
  const airportState = location.state.airportState;
  const hotelReserveState = location.state.hotelReserveState;

  const [selectTab, setSelectTab] = useState('허니문');

  const [addLandCompany, setAddLandCompany] = useState('');
  const [request, setRequest] = useState('');


  type DTitleProps = {
    width?: number;
    text: string;
  };

  const D_Title: React.FC<DTitleProps> = ({ text, width }) => (
    <div className="d-title" style={{width: width ? `${width}px` : `100px`, padding:'0 10px', boxSizing:'border-box'}}>
      <h3>{text}</h3>
    </div>
  )
  
  return (
    <div className='DocumentReserve'>

      <div className="d-cover">

        <div className="d-logo">
          <img src={logo} />
        </div>
        
        <h1 className='d-title'>수배서</h1>
     
        <div className="d-select-row">
          <div className={selectTab === '허니문' ? 'd-select-btn selected' : 'd-select-btn'}
            onClick={()=>{setSelectTab('허니문');}}
          >
            <p style={{color: selectTab === '허니문' ? '#333' : '#BDBDBD'}}>허니문</p>
          </div>
          <div className={selectTab === 'FIT/GROUP' ? 'd-select-btn selected' : 'd-select-btn'}
            onClick={()=>{setSelectTab('FIT/GROUP');}}
          >
            <p style={{color: selectTab === 'FIT/GROUP' ? '#333' : '#BDBDBD'}}>FIT/GROUP</p>
          </div>
        </div>

        <div style={{height:'10px'}}></div>

        <p>&#8251; 정확한 수배서 생성을 위해서는 정확한 예약상세등록이 필요합니다.</p>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'10px'}}></div>
        
        <div className="d-textrow">
          <D_Title text='수신' />
          <DropdownBox
            widthmain='190px'
            height='35px'
            selectedValue={''}
            options={DropDownLandCompany}
            handleChange={(e)=>{''}}
          />
          <input 
            className="d-input-input" type="text" 
            style={{width:`300px`}} value={addLandCompany}
            onChange={(e)=>{setAddLandCompany(e.target.value)}}
          />
        </div>
        <div className="d-textrow">
          <D_Title text='발신'/>
          <div style={{flex:1}}>
            <h4>(주)실론투어</h4>
          </div>
          <D_Title text='담당자'/>
          <div style={{flex:1}}>
            <h4>{adminUserName}</h4>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='날짜'/>
          <h4>{currentDate}</h4>
        </div>
        <div className="d-textrow">
          <D_Title text='내용'/>
          <h4></h4>
        </div>
        <div className="d-textrow">
          <D_Title text='여행지' />
          <div style={{flex:1}}>
            <h4>{productInfo.tourLocation}</h4>
          </div>
          <D_Title text='여행기간' />
          <div style={{flex:1}}>
            <h4>{productInfo.tourStartPeriod} ~ {productInfo.tourEndPeriod}</h4>
          </div>
        </div>
        
        <div className="d-textrow">
          <D_Title text='여행객' />
          <div style={{flex:1}}>
            <div style={{display:'flex', flex:1}}>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4>{userInfo[0].nameKo}</h4>
              </div>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4>{userInfo[0].nameLast} {userInfo[0].nameFirst}</h4>
              </div>
              <div style={{flex:1}}>
                <h4>{userInfo[0].phone}</h4>
              </div>
            </div>
            <div style={{flex:1, height:'1px', backgroundColor:'#EAEAEA'}}></div>
            <div style={{display:'flex', flex:1}}>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4>{userInfo[1].nameKo}</h4>
              </div>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4>{userInfo[1].nameLast} {userInfo[1].nameFirst}</h4>
              </div>
              <div style={{flex:1}}>
                <h4>{userInfo[1].phone}</h4>
              </div>
            </div>
          </div>
        </div>

        <div style={{padding:'10px', textAlign:'center', marginTop:'20px', borderBottom:'1px solid #8C8C8C'}}>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>항공스케줄</p>
        </div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div className="box-row" style={{backgroundColor:'#EAEAEA'}}>
            <p className="box-one">날짜</p>
            <div className="divider"></div>
            <p className="box-one">구간</p>
            <div className="divider"></div>
            <p className="box-one">항공편명</p>
            <div className="divider"></div>
            <p className="box-one">출발시간</p>
            <div className="divider"></div>
            <p className="box-one">도착시간</p>
          </div>
          {/* {
            airportState.map((item:any, index:any)=>{
              return (
                <div className="box-row" key={index}>
                  <p className="box-one">{item.date}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.section}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.airport}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.timeDepart}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.timeArrive}</p>
                </div>
              )
            })
          } */}
          
        </div>

        <div style={{padding:'10px', textAlign:'center', marginTop:'20px', borderBottom:'1px solid #8C8C8C'}}>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>호텔</p>
        </div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div className="box-row" style={{backgroundColor:'#EAEAEA'}}>
            <p className="box-one">체크인날짜</p>
            <div className="divider"></div>
            <p className="box-one" style={{minWidth:'200px'}}>호텔</p>
            <div className="divider"></div>
            <p className="box-one">객실타입</p>
            <div className="divider"></div>
            <p className="box-one">박수</p>
          </div>
          {
            hotelReserveState.map((item:any, index:any)=>{
              return (
                <div className="box-row" key={index}>
                  <p className="box-one">{item.date1}</p>
                  <div className="divider"></div>
                  <p className="box-one"  style={{minWidth:'200px'}}>{item.hotelName}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.roomType}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.days}</p>
                </div>
              )
            })
          }
          
        </div>

        <div style={{padding:'10px', textAlign:'center', marginTop:'20px', borderBottom:'1px solid #8C8C8C'}}>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>요청사항</p>
        </div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <textarea 
              className="textarea"
              value={request}
              onChange={(e)=>{setRequest(e.target.value)}}
            />
        </div>
        
      </div>

      
      <div className='btn-box'>
        <div className="btn" style={{backgroundColor:'#b3b3b3'}}
          onClick={()=>{
            navigate(-1);
          }}
        >
          <p>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
        >
          <p>저장</p>
        </div>
      </div>


    </div>
  )
}
