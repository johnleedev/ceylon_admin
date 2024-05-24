import React, { useState } from 'react';
import './Document.scss';
import logo from '../../images/logobk.png';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DropDownLandCompany } from '../DefaultData';

export default function DocumentArrange() {

  const [selectTab1, setSelectTab1] = useState('selected');
  const [selectTab2, setSelectTab2] = useState('')

  type DTitleProps = {
    width?: number;
    text: string;
  };

  const D_Title: React.FC<DTitleProps> = ({ text, width }) => (
    <div className="d-title" style={{width: width ? `${width}px` : `100px`, padding:'0 10px', boxSizing:'border-box'}}>
      <h3>{text}</h3>
    </div>
  )

  type DInputProps = {
    width: number;
    value: any;
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const D_Input: React.FC<DInputProps> = ({width, value, func}) => (
    <input 
      className="d-input" type="text" 
      style={{width:`${width}px`}} value={value}
      onChange={func}
    />
  )

  type DTextProps = {
    text: string
    width?: number
  }

  const TextBox: React.FC<DTextProps> = ({width, text}) => (
    <div className='textalign' style={{width: width ? `${width}px` : 'auto'}}>
      <p>{text}</p>
    </div>
  )

  const optionsdata = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const [isChecked, setIsChecked] = useState(false);

  
  return (
    <div className='DocumentReserve'>

      <div className="d-cover">

        <div className="d-logo">
          <img src={logo} />
        </div>
        
        <h1 className='d-title'>수배서</h1>
     
        <div className="d-select-row">
          <div className={`d-select-btn ${selectTab1}`}
            onClick={()=>{setSelectTab1('selected'); setSelectTab2('');}}
          >
            <p style={{color: selectTab1 === 'selected' ? '#333' : '#BDBDBD'}}>허니문</p>
          </div>
          <div className={`d-select-btn ${selectTab2}`}
            onClick={()=>{setSelectTab1(''); setSelectTab2('selected')}}
          >
            <p style={{color: selectTab2 === 'selected' ? '#333' : '#BDBDBD'}}>인센티브</p>
          </div>
        </div>

        <div style={{height:'10px'}}></div>

        <p>&#8251; 수배서 내용이 정확하지 않은 경우 계약관리에서 수정하시기 바랍니다.</p>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'10px'}}></div>
        
        <div className="d-textrow">
          <D_Title text='수신' />
          <div style={{flex:1}}>
            <DropdownBox
              widthmain='190px'
              height='35px'
              selectedValue={''}
              options={DropDownLandCompany}
              handleChange={(e)=>{''}}
            />
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='발신'/>
          <h4></h4>
        </div>
        <div className="d-textrow">
          <D_Title text='날짜'/>
          <h4></h4>
        </div>
        <div className="d-textrow">
          <D_Title text='내용'/>
          <h4></h4>
        </div>
        <div className="d-textrow">
          <D_Title text='여행지' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='여행기간' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
        </div>
        
        <div className="d-textrow">
          <D_Title text='여행객' />
          <div style={{flex:1}}>
            <div style={{display:'flex', flex:1}}>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4></h4>
              </div>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4></h4>
              </div>
              <div style={{flex:1}}>
                <h4></h4>
              </div>
            </div>
            <div style={{flex:1, height:'1px', backgroundColor:'#EAEAEA'}}></div>
            <div style={{display:'flex', flex:1}}>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4></h4>
              </div>
              <div style={{flex:1, borderRight:'1px solid #EAEAEA'}}>
                <h4></h4>
              </div>
              <div style={{flex:1}}>
                <h4></h4>
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
          {
            [1,2,3,4].map((item:any, index:any)=>{
              return (
                <div className="box-row" key={index}>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
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
            <p className="box-one">체크인날짜</p>
            <div className="divider"></div>
            <p className="box-one" style={{minWidth:'200px'}}>호텔</p>
            <div className="divider"></div>
            <p className="box-one">객실타입</p>
            <div className="divider"></div>
            <p className="box-one">박수</p>
          </div>
          {
            [1,2,3,4].map((item:any, index:any)=>{
              return (
                <div className="box-row" key={index}>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"  style={{minWidth:'200px'}}></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                </div>
              )
            })
          }
          
        </div>

        <div style={{padding:'10px', textAlign:'center', marginTop:'20px', borderBottom:'1px solid #8C8C8C'}}>
          <p style={{fontSize:'18px', fontWeight:'bold'}}>요청사항</p>
        </div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div style={{height:'200px', border: '1px solid #EAEAEA'}}></div>
          
        </div>
        
      </div>

      
      <div className='d-btn-box2'>
        <div className="d-btn2" style={{backgroundColor:'#b3b3b3'}}>
          <p>취소</p>
        </div>
        <div className="d-btn2" style={{backgroundColor:'#5fb7ef'}}>
          <p>저장</p>
        </div>
      </div>


    </div>
  )
}
