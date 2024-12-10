import React, { useCallback, useEffect, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DateBoxNum } from '../../../../boxs/DateBoxNum';
import { formatDate } from 'date-fns';


interface PackageCostProps {
  addtionName: string;
  personCost : string;
  content : string;
};

export default function ModalHotelCost (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const hotelInfoData = props.hotelInfo;
  const hotelCostData = props.hotelCost;
  const isAddOrRevise = props.isAddOrRevise;

  const [isView, setIsView] = useState(isAddOrRevise === 'revise' ? hotelCostData.isView : 'true');
  const [landCompany, setLandCompany] = useState(isAddOrRevise === 'revise' ? hotelCostData.landCompany : "");
  const [applyCurrency, setApplyCurrency] = useState(isAddOrRevise === 'revise' ? hotelCostData?.applyCurrency : '₩');
  const [commission, setCommission] = useState(
    isAddOrRevise === 'revise'
    ? JSON.parse(hotelCostData?.commission)
    : {select:"won", charge:"0"}
  );
  const [notRevervePeriodList, setNotRevervePeriodList] = useState([
    {eventName : "바르셀로나 디그플레이 전시회", period: "24.02.30 ~ 24.02.02", viewTitle:"", notice:"예약불가"},
    {eventName : "바르셀로나 모바일 박람회", period: "24.02.30 ~ 24.02.02", viewTitle:"예약불가", notice:"호텔마감 / 예약불가"},
    {eventName : "바르셀로나 수산물 박람회", period: "24.02.30 ~ 24.02.02", viewTitle:"", notice:"추가요금 발생 / 별도확인 요망"},
  ]);
  const [hotelCost, setHotelCost] = useState(
    isAddOrRevise === 'revise'
    ? JSON.parse(hotelCostData?.hotelCost)
    : [{ period: [{start:"", end:""}], sort:"기본", hotelName:"",
      costByRoomType: [{roomType: "", oneDayCost : "", personCost:"", mealPlan:""}]}]
  );

  // 화폐 적용 함수
  const handleApplyCurrency = (symbol: string) => {
    setApplyCurrency(symbol);
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
  

  const wonOption = [
    { value: '선택', label: '선택' },
    { value: '50,000', label: '50,000' },
    { value: '100,000', label: '100,000' },
    { value: '150,000', label: '150,000' },
    { value: '200,000', label: '200,000' },
    { value: '250,000', label: '250,000' },
    { value: '300,000', label: '300,000' }
  ]

  const euroOption = [
    { value: '선택', label: '선택' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' }
  ]

  const dollarOption = [
    { value: '선택', label: '선택' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' }
  ]


  const handleClose = async () => {
    props.setRefresh(!props.refresh);
    props.setIsViewHotelCostModal(false);
  };



  // 요금 등록 함수 ----------------------------------------------
  const registerHotelCost = async () => {
    const getParams = {
      postId : hotelInfoData.id,
      isView : isView,
      hotelName : hotelInfoData.hotelNameKo,
      landCompany: landCompany,
      applyCurrency: applyCurrency,
      commission: JSON.stringify(commission),
      hotelCost : JSON.stringify(hotelCost)
    }
    axios
      .post(`${MainURL}/tourproducthotel/registerhotelcost`, getParams)
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


  // 일정 정보 수정 함수 ----------------------------------------------
  const reviseHotelCost = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const getParams = {
      postId : hotelInfoData.id,
      isView : isView,
      hotelName : hotelInfoData.hotelNameKo,
      landCompany: landCompany,
      applyCurrency: applyCurrency,
      commission: JSON.stringify(commission),
      hotelCost : JSON.stringify(hotelCost),
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/tourproducthotel/revisehotelcost`, getParams)
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
            <TitleBox width="120px" text='노출여부'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView === 'true'}
                  onChange={()=>{setIsView('true')}}
                />
              </div>
              <p>노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView === 'false'}
                  onChange={()=>{setIsView('false')}}
                />
              </div>
              <p>미노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView === 'product'}
                  onChange={()=>{setIsView('product')}}
                />
              </div>
              <p>상품가연동</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔명'/>
            <p>{hotelInfoData.hotelNameKo}</p>
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
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='수수료'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={commission.select === 'won'}
                  onChange={()=>{
                    const copy = {...commission};
                    copy.select = 'won'
                    setCommission(copy);
                  }}
                />
              </div>
            </div>
            <p style={{margin:'0'}}>₩(원화)</p>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={commission.charge}
              options={wonOption} 
              handleChange={(e)=>{
                const copy = {...commission};
                copy.charge = e.target.value;
                setCommission(copy);
              }}
            />
            <div className='checkInputCover' style={{marginLeft:'20px'}}>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                   checked={commission.select === 'euro'}
                    onChange={()=>{
                      const copy = {...commission};
                      copy.select = 'euro'
                      setCommission(copy);
                  }}
                />
              </div>
            </div>
            <p style={{margin:'0'}}>€(유로)</p>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={commission.charge}
              options={euroOption} 
              handleChange={(e)=>{
                const copy = {...commission};
                copy.charge = e.target.value;
                setCommission(copy);
              }}
            />
            <div className='checkInputCover' style={{marginLeft:'20px'}}>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                   checked={commission.select === 'dollar'}
                    onChange={()=>{
                      const copy = {...commission};
                      copy.select = 'dollar'
                      setCommission(copy);
                  }}
                />
              </div>
            </div>
            <p style={{margin:'0'}}>$(달러)</p>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={commission.charge}
              options={dollarOption} 
              handleChange={(e)=>{
                const copy = {...commission};
                copy.charge = e.target.value;
                setCommission(copy);
              }}
            />
          </div>
        </div>
      </section>

      <div style={{height:30}}></div>
      
      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'30%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'30%'}} ><p>행사명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>표시</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'30%'}} ><p>비고</p></div>
        </div>
        {
          notRevervePeriodList.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'40px'}} >
                  <div style={{width:'30%'}} >
                    <p>{item.eventName}</p>
                  </div>
                  <div style={{width:'30%'}}>
                    <p>{item.period}</p>
                  </div>
                  <div style={{width:'10%'}}>
                    <p>{item.viewTitle}</p>
                  </div>
                  <div style={{width:'30%'}}>
                    <p>{item.notice}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>

      <div style={{height:30}}></div>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'25%'}} ><p>적용기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'7%'}} ><p>구분</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>호텔명</p></div>
          <div className="chart-divider"></div>
          <div style={{width:'48%', display:'flex'}}>
            <div className='chartbox' style={{width:'34%'}} ><p>룸타입</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'22%'}} ><p>1박요금</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'22%'}} ><p>1인요금</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'22%'}} ><p>식사플랜</p></div>
            <div className="chart-divider"></div>
          </div>
          <div className='chartbox' style={{width:'5%'}} ><p></p></div>
        </div>
        {
          hotelCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'25%'}}>
                    {
                      item.period.map((subItem:any, subIndex:any)=>{
                        return (
                          <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}} key={subIndex}>
                            <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.start}
                            setSelectDate={(e:any)=>{ 
                              const copy = [...hotelCost];
                              copy[index].period[subIndex].start = e;
                              copy[index].period[subIndex].end = e;
                              setHotelCost(copy);
                            }} 
                            />
                            <p style={{marginLeft:'5px'}}>~</p>
                            <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                              setSelectDate={(e:any)=>{ 
                                const copy = [...hotelCost];
                                copy[index].period[subIndex].end = e;
                                setHotelCost(copy);
                              }} 
                            />
                            <div className="dayBox">
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...hotelCost];
                                  copy[index].period = [...copy[index].period, {start:"", end:""}];
                                  setHotelCost(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>  
                            <div className="dayBox">
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...hotelCost];
                                  copy[index].period.splice(subIndex, 1);
                                  setHotelCost(copy);
                                }}
                              >
                                <p>-</p>
                              </div>
                            </div>  
                          </div>
                        )
                      })
                    }
                  </div>
                  <div style={{width:'7%'}}>
                   <DropdownBox
                      widthmain='95%'
                      height='35px'
                      selectedValue={item.sort}
                      options={[
                        { value: '기본', label: '기본' },
                        { value: '기본1', label: '기본1' },
                        { value: '기본2', label: '기본2' },
                      ]}    
                      handleChange={(e)=>{
                        const copy = [...hotelCost];
                        copy[index].sort = e.target.value;
                        setHotelCost(copy);
                      }}
                    />  
                  </div>
                  <div style={{width:'15%'}}>
                    <input className="inputdefault" value={item.hotelName} 
                    style={{width:'95%', minHeight:'40px', outline:'none'}} 
                    onChange={(e)=>{
                      const copy = [...hotelCost];
                      copy[index].hotelName = e.target.value;
                      setHotelCost(copy);
                    }}/>
                  </div>
                  <div style={{width:'48%', alignItems:'center'}}>
                  {
                    item.costByRoomType.map((subItem:any, subIndex:any)=>{

                      return (
                        <div key={subIndex} style={{display:'flex'}}>
                          <div style={{width:'34%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.roomType} 
                              style={{width:'70%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelCost];
                                copy[index].costByRoomType[subIndex].roomType = e.target.value;
                                setHotelCost(copy);
                              }}/>
                            <div className="dayBox">
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...hotelCost];
                                  copy[index].costByRoomType.splice(index, 1);
                                  setHotelCost(copy);
                                }}
                              >
                                <p>-</p>
                              </div>
                            </div>  
                            <div className="dayBox">
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...hotelCost];
                                  copy[index].costByRoomType = [...copy[index].costByRoomType, 
                                    {roomType: "", oneDayCost : "", personCost:"", mealPlan:""}];
                                  setHotelCost(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>
                          </div>
                          <div style={{width:'22%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.oneDayCost} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelCost];
                                copy[index].costByRoomType[subIndex].oneDayCost = e.target.value;
                                setHotelCost(copy);
                              }}/>
                          </div>
                          <div style={{width:'22%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.personCost} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelCost];
                                copy[index].costByRoomType[subIndex].personCost = e.target.value;
                                setHotelCost(copy);
                              }}/>
                          </div>
                          <div style={{width:'22%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.mealPlan} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelCost];
                                copy[index].costByRoomType[subIndex].mealPlan = e.target.value;
                                setHotelCost(copy);
                              }}/>
                          </div>
                        </div>
                      )
                    }
                  )}
                  </div>
                  <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...hotelCost, 
                            { period: [{start:"", end:""}], sort:"기본", hotelName:"",
                              costByRoomType: [{roomType: "", oneDayCost : "", personCost:"", mealPlan:""}]}
                          ];
                          setHotelCost(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...hotelCost];
                          copy.splice(index, 1);
                          setHotelCost(copy);
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
            isAddOrRevise === 'revise' 
            ? reviseHotelCost()
            : registerHotelCost();
          }}
        >
          <p>저장</p>
        </div>
      </div>


    </div>     
  )
}

