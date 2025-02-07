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
  const airlineReserveState = location.state.airlineReserveState;
  const hotelReserveState = location.state.hotelReserveState;
  
  const [selectTab, setSelectTab] = useState('허니문');
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
          <div style={{flex:1}}>
            <h4>{productInfo.landCompany[0].companyName}</h4>
          </div>
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
          <D_Title text='여행상품' />
          <div style={{flex:1}}>
            <h4>{productInfo.productName}</h4>
          </div>
          <D_Title text='일정표' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
        </div>
        
        <div className="d-textrow">
          <D_Title text='여행객' />
          <div style={{flex:1}}>
            {
              userInfo.map((item:any, index:any)=>{
                return (
                  <div style={{width:'100%'}} key={index}>
                    <div style={{display:'flex', flex:1}}>
                      <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                        <h4>{item.nameKo}</h4>
                      </div>
                      <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                        <h4>{item.nameLast} {item.nameFirst}</h4>
                      </div>
                      <div style={{flex:1}}>
                        <h4>{item.phone}</h4>
                      </div>
                    </div>
                    <div style={{flex:1, height:'1px', backgroundColor:'#EAEAEA'}}></div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div style={{padding:'10px', textAlign:'center', marginTop:'20px', borderBottom:'1px solid #8C8C8C'}}>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>항공스케줄</p>
        </div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div className="box-row" style={{backgroundColor:'#EAEAEA'}}>
            <p className="box-one">날짜</p>
            <div className="divider"></div>
            <p className="box-one">항공편</p>
            <div className="divider"></div>
            <p className="box-one">구간</p>
            <div className="divider"></div>
            <p className="box-one">시간</p>
            <div className="divider"></div>
            <p className="box-one"></p>
          </div>
          {
            airlineReserveState.airlineState.map((item:any, index:any)=>{
              return (
                <div className="box-row" key={index}>
                  <div className="box-one">
                    <p>{item.departDate}</p>
                    <p>~ {item.arriveDate}</p>
                  </div>
                  <div className="divider"></div>
                  <p className="box-one">{item.airlineName}</p>
                  <div className="divider"></div>
                  <p className="box-one">{item.airport}</p>
                  <div className="divider"></div>
                  <div className="box-one">
                    <p>{item.departTime}</p>
                    <p>~ {item.arriveTime}</p>
                  </div>
                  <div className="divider"></div>
                  <p className="box-one">{item.timeArrive}</p>
                </div>
              )
            })
          }
        </div>

        <div style={{padding:'10px', textAlign:'center', marginTop:'20px', borderBottom:'1px solid #8C8C8C'}}>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>호텔</p>
        </div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div className="box-row" style={{backgroundColor:'#EAEAEA'}}>
            <p className="box-one">체크인</p>
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
                  <p className="box-one">{item.checkIn}</p>
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
