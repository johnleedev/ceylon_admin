
import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { FaEuroSign } from "react-icons/fa";

export default function ModalCondition (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const cityData = isAddOrRevise === 'revise' ? props.cityData : null;
  const cityList = props.nationData ? props.nationData.cities : '';
  const cityListCopy = props.nationData ? cityList.map((e:any)=>e.cityKo) : '';

 
  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? cityData.isView : true);
  const [sort, setSort] = useState('');
  const [continent, setContinent] = useState('');
  const [nation, setNation] = useState('');
  const [cityKo, setCityKo] = useState(isAddOrRevise === 'revise' ? cityData.cityKo :'');
  const [cityEn, setCityEn] = useState(isAddOrRevise === 'revise' ? cityData.cityEn : '');
  const [weather, setWeather] = useState(isAddOrRevise === 'revise' ? cityData.weather : '');
  const [tourNotice, setTourNotice] = useState(isAddOrRevise === 'revise' ? cityData.tourNotice : '');
  const [applyCurrency, setApplyCurrency] = useState(isAddOrRevise === 'revise' ? cityData.applyCurrency : '₩');


  // 화폐 적용 함수
  const handleApplyCurrency = (symbol: string) => {
    // setApplyCurrency(symbol);
    // const sesaoncopy = [...seasonCost];
    // const updatedsesaonCostCopy = sesaoncopy.map(cost => ({
    //   ...cost, currency: symbol
    // }));
    // setSeasonCost(updatedsesaonCostCopy)
    // const copy = [...inputCost];
    // const updatedinputCost = copy.map(cost => ({
    //   ...cost,
    //   inputDefault: cost.inputDefault.map(def => ({
    //     ...def,
    //     costByRoomType: def.costByRoomType.map(roomType => ({
    //       ...roomType,
    //       currency: symbol
    //     }))
    //   }))
    // }));
    // setInputCost(updatedinputCost);
  };
  

  // 저장 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const registerCity = async () => {
    const getParams = {
      isView : isView,
      sort : sort,
      continent : continent,
      nation : nation,
      cityKo : cityKo,
      cityEn : cityEn,
      weather : weather,
      tourNotice : tourNotice,
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
      postId : cityData.id,
      isView : isView,
      sort : sort,
      continent : continent,
      nation : nation,
      cityKo : cityKo,
      cityEn : cityEn,
      weather : weather,
      tourNotice : tourNotice
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

  
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddConditionModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      {/* 도시 생성 --------------------------------------------------------------------------------------------------------------- */}
      
      <div className="modal-header">
        <h1>요금조건표</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='노출여부'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView}
                  onChange={()=>{setIsView(true)}}
                />
              </div>
              <p>노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={!isView}
                  onChange={()=>{setIsView(false)}}
                />
              </div>
              <p>미노출</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품 판매기간'/>
            <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={nation}
                options={[
                  { value: '선택', label: '선택' }

                ]}    
                handleChange={(e)=>{
                  
                }}
              />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='기본네고'/>
            <input className="inputdefault" type="text" style={{width:'30%', marginLeft:'5px'}} 
              value={cityKo} onChange={(e)=>{

                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='특별네고'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={cityKo} onChange={(e)=>{

                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='적용기간'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={cityEn} onChange={(e)=>{

              }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='기본수수료'/>
            <input className="inputdefault" type="text" style={{width:'30%', marginLeft:'5px'}} 
              value={cityKo} onChange={(e)=>{

                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='적용화폐'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '₩'}
                  onChange={()=>{handleApplyCurrency('₩')}}
                />
              </div>
              <p>₩(원화)</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '€'}
                  onChange={()=>{handleApplyCurrency('€')}}
                />
              </div>
              <p>€(유로)</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '$'}
                  onChange={()=>{handleApplyCurrency('$')}}
                />
              </div>
              <p>$(달러)</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{height:'50px'}}></div>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'20%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'30%'}} ><p>행사명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'20%'}} ><p>표시</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'30%'}} ><p>비고</p></div>
        </div>
        {
          [1,2,3,4].map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={{width:'90%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCostAll} onChange={(e)=>{
                      
                      }}/>
                  </div>
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={{width:'90%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCostAll} onChange={(e)=>{
                      
                      }}/>
                  </div>
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={{width:'90%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCostAll} onChange={(e)=>{
                      
                      }}/>
                  </div>
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" style={{width:'90%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCostAll} onChange={(e)=>{
                      
                      }}/>
                  </div>
                  {/* <div className="dayBox">
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...seasonCost, 
                          {seasonName: "", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""}];
                        setSeasonCost(copy);
                      }}
                    >
                      <p>+</p>
                    </div>
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...seasonCost];
                        copy.splice(index, 1);
                        setSeasonCost(copy);
                      }}
                    >
                      <p>-</p>
                    </div>
                  </div>       */}
                </div>
              </div>
            )
          })
        }
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddConditionModal(false);
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
