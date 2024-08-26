import React, { useEffect, useState } from 'react'
import { TitleBox } from '../../../boxs/TitleBox';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { DropDownAirline, DropDownLandCompany, DropDownNum, DropDownTourLocation } from '../../DefaultData';
import { useRecoilState } from 'recoil';
import { recoilExchangeRate } from '../../../RecoilStore';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { differenceInDays, parseISO } from 'date-fns';

export default function ModalReserveTab2(props:any) {

  const [recoilExchangeRateCopy, setRecoilExchangeRateCopy]  = useRecoilState(recoilExchangeRate);

  const [date, setDate] = useState('');
  const [base, setBase] = useState('USD');
  const [KRW, setKRW] = useState('');
  
  const fetchExchangeRate = async () => {
    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${base}`);
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rate');
      }
      const data = await response.json();
      setDate(data.date);
      setKRW(data.rates.KRW);
      setRecoilExchangeRateCopy([{base:data.base, KRW:data.rates.KRW}]);
    } catch (error) {
      console.error('Error fetching exchange rate:', error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
  }, [base])

  // product 예약상품 ----------------------------------------------------------------------------
  
  const [tourLocation, setTourLocation] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourLocation :DropDownTourLocation[0].value);
  const [tourLocationDetail, setTourLocationDetail] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourLocationDetail :'');
  const [productName, setProductName] = useState(props.modalSort === 'revise' ? props.reserveInfo.productName : '');
  const [tourStartAirport, setTourStartAirport] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourStartAirport :'');
  const [tourStartPeriod, setTourStartPeriod] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourStartPeriod :'');
  const [tourEndAirport, setTourEndAirport] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourEndAirport :'');
  const [tourEndPeriod, setTourEndPeriod] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourEndPeriod :'');
   
  // Airline 현지여행사 ----------------------------------------------------------------------------
  interface AirlineProps {
    airlineName: string;
  }
  const [airline, setAirline] = useState<AirlineProps[]>(
    props.modalSort === 'revise' 
    ? JSON.parse(props.reserveInfo.airline)
    : [{ airlineName:''}]
  )


  // landCompany 현지여행사 ----------------------------------------------------------------------------
  interface LandCompanyProps {
    companyName: string;
    notice : string;
  }
  const [landCompany, setLandCompany] = useState<LandCompanyProps[]>(
    props.modalSort === 'revise' 
    ? JSON.parse(props.reserveInfo.landCompany)
    : [{ companyName:'', notice:'' }]
  )

  // product Cost 여행상품가 ----------------------------------------------------------------------------
  interface ProductCostProps {
    costAdult: string;
    costAdultNum: number;
    costChild: string;
    costChildNum : number;
    costInfant: string;
    costInfantNum: number;
    costAll: string;
    reserveExchangeRate : number;
    isNotice: boolean;
    isClientCheck: boolean;
  }
  const [productCost, setProductCost] = useState<ProductCostProps>(
    props.modalSort === 'revise' 
    ? props.productCost
    : { costAdult: '',
      costAdultNum: 1,
      costChild: '',
      costChildNum : 1,
      costInfant: '',
      costInfantNum: 1,
      costAll: '',
      reserveExchangeRate : recoilExchangeRateCopy[0].KRW,
      isNotice: false,
      isClientCheck: false }
  )

  // 입력된숫자 금액으로 변경
  const handleCostChange = async (e: React.ChangeEvent<HTMLInputElement>, name:string)  => {
    const text = e.target.value;
    if (text === '') {
      setProductCost(prevState => ({
        ...prevState,
        [name]: '',
      }))
    }
    const inputNumber = parseInt(text.replace(/,/g, ''));
    if (isNaN(inputNumber)) {
      return;
    }
    const formattedNumber = inputNumber.toLocaleString('en-US');
    setProductCost(prevState => ({
      ...prevState,
      [name]: formattedNumber,
    }));
  };

  // 인원 변경
  const handlePersonNumChange = async (e:any, name:string) => {
    const text = e.target.value; 
    const num = parseInt(text)
    setProductCost(prev => ({
      ...prev, [name]: num,
    }));
  };
 
  useEffect(() => {
    const costAdultCopy = productCost.costAdult === '' ? 0 : parseInt(productCost.costAdult.replace(/,/g, ''));
    const costChildCopy = productCost.costChild === '' ? 0 : parseInt(productCost.costChild.replace(/,/g, ''));
    const costInfantCopy = productCost.costInfant === '' ? 0 : parseInt(productCost.costInfant.replace(/,/g, ''));
    const allCost = (costAdultCopy * productCost.costAdultNum) + (costChildCopy * productCost.costChildNum) + (costInfantCopy * productCost.costInfantNum);
    const formattedAllCost = allCost.toLocaleString('en-US');
    setProductCost(prevState => ({
      ...prevState,
      costAll: formattedAllCost,
    }));
  }, [productCost.costAdult, productCost.costAdultNum, productCost.costChild, productCost.costChildNum, productCost.costInfant, productCost.costInfantNum]);


  // airport State 항공예약현황 ----------------------------------------------------------------------------
  interface AirportStateProps {
    airportSection : string;
    departAirport : string;
    departDate : string;
    departTime : string;
    arriveAirport : string;
    arriveDate : string;
    arriveTime : string;
  }
  const [airportState, setAirportState] = useState<AirportStateProps[]>(
    props.modalSort === 'revise' 
    ? props.airportState
    : [{ airportSection : '', departAirport : '', departDate: '', departTime : '', arriveAirport:'', arriveDate:'', arriveTime:'' }]
  )

  const handleAirportDepartDateChange = (e:any, index:any) => {
    const inputs = [...airportState];
    inputs[index].departDate = e;
    setAirportState(inputs);
  };

  const handleAirportArriveDateChange = (e:any, index:any) => {
    const inputs = [...airportState];
    inputs[index].arriveDate = e;
    setAirportState(inputs);
  };

  // ticketing State 발권현황 ----------------------------------------------------------------------------
  interface TicketingStateProps {
    company : string;
    ticketBooth : string;
    date : string;
    state : string;
  }
  const [ticketingState, setTicketingState] = useState<TicketingStateProps[]>(
    props.modalSort === 'revise' 
    ? props.ticketingState
    : [{ company: '', ticketBooth: '', date: '', state: '예약/대기' }]
  )

  const handleTicketingDateChange = (e:any, index:any) => {
    const inputs = [...ticketingState];
    inputs[index].date = e;
    setTicketingState(inputs);
  };


  // ticketing State 호텔 예약 현황 ----------------------------------------------------------------------------
  interface HotelReserveStateProps {
    checkIn : string;
    checkOut : string;
    location : string;
    hotelName: string;
    roomType : string;
    days: string;
  }
  const [hotelReserveState, setHotelReserveState] = useState<HotelReserveStateProps[]>(
    props.modalSort === 'revise' 
    ? props.hotelReserveState
    : [{ checkIn : '', checkOut : '', location : '', hotelName: '', roomType : '', days: '' }]
  )

  const handleHotelReserveDate1Change = (e:any, index:any) => {
    const inputs = [...hotelReserveState];
    inputs[index].checkIn = e;
    setHotelReserveState(inputs);
  };
  const handleHotelReserveDate2Change = (e:any, index:any) => {
    const inputs = [...hotelReserveState];
    inputs[index].checkOut = e;
    const date1copy = inputs[index].checkIn;
    const parsedDate1 = parseISO(date1copy);
    const parsedDate2 = parseISO(e);
    const diffInDays = differenceInDays(parsedDate2, parsedDate1);
    inputs[index].days = JSON.stringify(diffInDays);
    setHotelReserveState(inputs)
  };



  // etc State 포함/불포함 사항  ----------------------------------------------------------------------------
  interface EtcStateProps {
    includes : string;
    notIncludes : string;
    freeGift : string;
    freeGiftDetail : string;
    travelInsurance : string;
    insuranceCompany : string;
    insuranceCost : string;
  }
  const [etcState, setEtcState] = useState<EtcStateProps>(
    props.modalSort === 'revise' 
    ? props.etcState
    : { includes : '',
      notIncludes : '',
      freeGift : '',
      freeGiftDetail : '',
      travelInsurance : '',
      insuranceCompany : '동부화재',
      insuranceCost : '' }
  )

  // 수정저장 함수 ----------------------------------------------------------------------------
  const handleReserveSaveTab2 = async () => {

    const data = {
      serialNum : props.serialNum,
      productName : productName,
      tourLocation : tourLocation,
      tourLocationDetail : tourLocationDetail,
      airline : JSON.stringify(airline),
      tourStartAirport : tourStartAirport,
      tourStartPeriod : tourStartPeriod,
      tourEndAirport : tourEndAirport,
      tourEndPeriod : tourEndPeriod,
      productCost : JSON.stringify(productCost),
      airportState : JSON.stringify(airportState),
      ticketingState: JSON.stringify(ticketingState),
      hotelReserveState : JSON.stringify(hotelReserveState),
      landCompany : JSON.stringify(landCompany),
      etcState : JSON.stringify(etcState)
    }

    await axios
      .post(`${MainURL}/adminreserve/reviseproductinfo`, data)
      .then((res)=>{
        if (res.data) {
          alert('저장되었습니다.');
          if ( props.modalSort === 'new' ) {
            props.setInputState('save');
            props.fetchReservePosts();
          }
        }
      })
      .catch((err)=>{
        alert(`다시 시도해주세요 ${err}`)
      })
  };
  

  return (
    <div>

      {
        props.selectTab === 3 &&
        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSaveTab2}
            >
              <p>저장</p>
            </div>
          </div>
        </section>
      }

      <section>
          <h1>4. 예약상품</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='여행지'/>
              <DropdownBox
                widthmain='20%' height='35px' selectedValue={tourLocation}
                options={DropDownTourLocation}    
                handleChange={(e)=>{setTourLocation(e.target.value)}}
              />
              <input style={{width:'40%'}}  value={tourLocationDetail} className="inputdefault" type="text" 
                    onChange={(e) => {setTourLocationDetail(e.target.value)}}/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='여행상품'/>
              <input style={{width:'60%', marginLeft:'5px'}}  value={productName} className="inputdefault" type="text" 
                    onChange={(e) => {setProductName(e.target.value)}}/>
            </div>
          </div>

          {
            airline.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow hole">
                    <TitleBox width="120px" text={airline.length > 1 ? `항공사${index+1}` : '항공사'}/>
                    <DropdownBox
                      widthmain='30%' height='35px' selectedValue={item}
                      options={DropDownAirline}    
                      handleChange={(e)=>{const inputs = [...airline]; inputs[index].airlineName = e.target.value; setAirline(inputs);}}
                    />
                    {
                      airline.length === index+1 &&
                      <div className='addBtn'
                        onClick={()=>{
                          const copy = [...airline, { airlineName:''}];
                          setAirline(copy);
                        }}
                      >
                        항공사추가
                      </div>  
                    }
                  </div>
                </div>
              )
            })
          }
          {       
            landCompany.map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    <TitleBox width="120px" text={landCompany.length > 1 ? `랜드사${index+1}` : '랜드사'}/>
                    <DropdownBox
                      widthmain='30%' height='35px' selectedValue={landCompany[0].companyName}
                      options={DropDownLandCompany}    
                      handleChange={(e)=>{const inputs = [...landCompany]; inputs[0].companyName = e.target.value; setLandCompany(inputs);}}
                    />
                    <input style={{width:'20%', textAlign:'left', marginRight:'5px'}}
                      value={landCompany[0].notice} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = [...landCompany]; inputs[0].notice = e.target.value; setLandCompany(inputs);}}/>      
                    {
                      landCompany.length === index+1 &&
                      <div className='addBtn'
                        onClick={()=>{
                          const copy = [...landCompany, { companyName:'', notice:'' }];
                          setLandCompany(copy);
                        }}
                      >
                        랜드사추가
                      </div>  
                    }  
                  </div>
                </div>
              )
            })
          }
     
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='여행기간'/>
              <DropdownBox
                widthmain='10%' height='35px' selectedValue={tourStartAirport}
                options={[
                  { value: '출발공항', label: '출발공항' },
                  { value: '인천', label: '인천' },
                  { value: '부산', label: '부산' },
                  { value: '대구', label: '대구' },
                ]}    
                handleChange={(e)=>{setTourStartAirport(e.target.value)}}
              />
              <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setTourStartPeriod} date={tourStartPeriod} marginLeft={1}/>
              <p>~</p>
              <DropdownBox
                widthmain='10%' height='35px' selectedValue={tourEndAirport}
                options={[
                  { value: '도착공항', label: '도착공항' },
                  { value: '인천', label: '인천' },
                  { value: '부산', label: '부산' },
                  { value: '대구', label: '대구' },
                ]}    
                handleChange={(e)=>{setTourEndAirport(e.target.value)}}
              />
              <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setTourEndPeriod} date={tourEndPeriod} marginLeft={1}/>
            </div>
          </div>
      </section>

      <section>
        <h1>5. 여행상품가</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='1인요금' height={160}/>
            <div style={{flex:1}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <h3 style={{margin:'0 10px'}}>성인</h3>
                <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={productCost.costAdult} className="inputdefault" type="text" 
                  onChange={(e) => {handleCostChange(e, 'costAdult')}}/>
                <p style={{marginRight:'10px'}}>원</p>
                <DropdownBox
                  widthmain='20%' height='35px' selectedValue={productCost.costAdultNum}
                  options={DropDownNum}    
                  handleChange={(e)=>{handlePersonNumChange(e, 'costAdultNum')}}
                />
                <p>명</p>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <h3 style={{margin:'0 10px'}}>소아</h3>
                <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={productCost.costChild} className="inputdefault" type="text" 
                  onChange={(e) => {handleCostChange(e, 'costChild')}}/>
                <p style={{marginRight:'10px'}}>원</p>
                <DropdownBox
                  widthmain='20%' height='35px' selectedValue={productCost.costChildNum}
                  options={DropDownNum}    
                  handleChange={(e)=>{handlePersonNumChange(e, 'costChildNum')}}
                />
                <p>명</p>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <h3 style={{margin:'0 10px'}}>유아</h3>
                <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={productCost.costInfant} className="inputdefault" type="text" 
                  onChange={(e) => {handleCostChange(e, 'costInfant')}}/>
                <p style={{marginRight:'10px'}}>원</p>
                <DropdownBox
                  widthmain='20%' height='35px' selectedValue={productCost.costInfantNum}
                  options={DropDownNum}    
                  handleChange={(e)=>{handlePersonNumChange(e, 'costInfantNum')}}
                />
                <p>명</p>
              </div>
            </div>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='전체요금' height={160}/>
            <input style={{width:'40%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={productCost.costAll} className="inputdefault" type="text" 
                onChange={(e) => {handleCostChange(e, 'costAll')}}/>
            <p>원</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='계약당시 환율'/>
            <DropdownBox 
              widthmain='10%' height='35px' 
              selectedValue={base}
              options={[
                { value: 'USD', label: '미국 1 USD' },
                { value: 'EUR', label: '유럽 1 EUR' },
                { value: 'JPY', label: '일본 1 JYP' },
                { value: 'THB', label: '태국 1 THB' },
              ]}   
              marginHorisontal={10}
              handleChange={(e)=>{setBase(e.target.value);}}
            />
            <input style={{width:'10%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={recoilExchangeRateCopy[0].KRW} className="inputdefault" type="text" 
                  onChange={()=>{}}/>
            <p style={{marginLeft:'20px'}}># 잔금지불시 변동환율 적용여부 공지</p>
            <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={productCost.isNotice}
                  onChange={()=>{
                    setProductCost(prev => ({
                      ...prev, isNotice : !productCost.isNotice,
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>공지했음</p>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={productCost.isClientCheck}
                  onChange={()=>{
                    setProductCost(prev => ({
                      ...prev, isClientCheck : !productCost.isClientCheck,
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>고객확인</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h1>6. 항공 예약현황</h1>
        <div className="bottombar"></div>
        <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#f6f6f6' }}>
          <TitleBox width="20%" text='항공편'/>
          <TitleBox width="10%" text='출발공항'/>
          <TitleBox width="150px" text='출발일'/>
          <TitleBox width="10%" text='출발시간'/>
          <TitleBox width="10%" text='도착공항'/>
          <TitleBox width="150px" text='도착일'/>
          <TitleBox width="10%" text='도착시간'/>
          <TitleBox width="10%" text=''/>
        </div>
        {
          airportState.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                  <input style={{width:'20%', textAlign:'left'}}
                    value={item.section} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...airportState]; inputs[index].airportSection = e.target.value; setAirportState(inputs);}}/>
                  <DropdownBox
                    widthmain='10%' height='35px' selectedValue={item.departAirport}
                    options={[
                      { value: '출발공항', label: '출발공항' },
                      { value: '인천', label: '인천' },
                      { value: '부산', label: '부산' },
                      { value: '대구', label: '대구' },
                    ]}    
                    handleChange={(e)=>{const inputs = [...airportState]; inputs[index].departAirport = e.target.value; setAirportState(inputs);}}
                  />
                  <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={(e:any) => handleAirportDepartDateChange(e, index)} date={item.departDate} marginLeft={5}/>
                  <input style={{width:'10%', textAlign:'left'}}
                    value={item.departTime} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...airportState]; inputs[index].departTime = e.target.value; setAirportState(inputs);}}/>
                  <DropdownBox
                    widthmain='10%' height='35px' selectedValue={item.arriveAirport}
                    options={[
                      { value: '출발공항', label: '출발공항' },
                      { value: '인천', label: '인천' },
                      { value: '부산', label: '부산' },
                      { value: '대구', label: '대구' },
                    ]}    
                    handleChange={(e)=>{const inputs = [...airportState]; inputs[index].arriveAirport = e.target.value; setAirportState(inputs);}}
                  />
                  <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={(e:any) => handleAirportArriveDateChange(e, index)} date={item.arriveDate} marginLeft={5}/>
                  <input style={{width:'10%', textAlign:'left'}}
                    value={item.arriveTime} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...airportState]; inputs[index].arriveTime = e.target.value; setAirportState(inputs);}}/>
                  <div style={{width:'10%', display:'flex', justifyContent:'center'}}>
                    <p className='addBtn' style={{padding:'0 5px', marginRight:'5px'}}
                      onClick={() => {
                        const inputs = [...airportState];
                        inputs[index].arriveTime = `${inputs[index].arriveTime}+1D`;
                        setAirportState(inputs);
                      }}
                    >+1D</p>
                    <p className='addBtn' style={{padding:'0 5px'}}
                      onClick={() => {
                        const inputs = [...airportState];
                        inputs[index].arriveTime = `${inputs[index].arriveTime}+2D`;
                        setAirportState(inputs);
                      }}
                    >+2D</p>
                  </div>
                </div>
              </div>
            )
          })
        }    
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div className='btn-row' style={{marginRight:'5px'}}
            onClick={()=>{
              setAirportState([...airportState, 
                { airportSection : '', departAirport : '', departDate: '', departTime : '', arriveAirport:'', arriveDate:'', arriveTime:'' }]);
            }}
          >
            <p>+ 추가</p>
          </div>
        </div>
      </section> 

      <section>
        <h1>7. 발권현황</h1>
        <div className="bottombar"></div>
        {
          ticketingState.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                  <TitleBox width="30%" text={`항공사${index+1}`}/>
                  <input style={{width:'68%', textAlign:'center', marginRight:'3px'}}
                    value={item.company} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...ticketingState]; inputs[index].company = e.target.value; setTicketingState(inputs);}}/>
                </div>
                <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                  <TitleBox width="30%" text='발권처'/>
                  <input style={{width:'68%', textAlign:'center', marginRight:'3px'}}
                    value={item.ticketBooth} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...ticketingState]; inputs[index].ticketBooth = e.target.value; setTicketingState(inputs);}}/>
                </div>
                <div className="coverrow quarter" style={{justifyContent:''}} >
                  <TitleBox width="30%" text='날짜'/>
                  <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={(e:any) => handleTicketingDateChange(e, index)} date={item.date} marginLeft={5}/>
                </div>
                <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                  <TitleBox width="30%" text='상태'/>
                  <DropdownBox
                    widthmain='68%' height='35px' selectedValue={item.state}
                    options={[
                      { value: '예약', label: '예약' },
                      { value: '발권', label: '발권' },
                      { value: '취소', label: '취소' },
                      { value: '재발권', label: '재발권' },
                      { value: '고객', label: '고객' },
                      { value: '개별발권', label: '개별발권' },
                    ]}    
                    handleChange={(e)=>{const inputs = [...ticketingState]; inputs[index].state = e.target.value; setTicketingState(inputs);}}
                  />
                </div>
              </div>
            )
          })
        }
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div className='btn-row' style={{marginRight:'5px'}}
            onClick={()=>{
              setTicketingState([...ticketingState, 
                { company: '', ticketBooth: '', date: '', state: '예약' }]);
            }}
          >
            <p>+ 추가</p>
          </div>
        </div>
        
      </section>
        
      <section>
        <h1>8. 호텔 예약현황</h1>
        <div className="bottombar"></div>
        <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#f6f6f6' }}>
          <TitleBox width="3%" text=''/>
          <div style={{display:'flex', alignItems:'center', width:'30%', justifyContent:'center'}}>
            <TitleBox width="150px" text='체크인'/>
            <p style={{width:'20px'}}></p>
            <TitleBox width="150px" text='체크아웃'/>
          </div>
          <TitleBox width="20%" text='여행지'/>
          <TitleBox width="20%" text='호텔명'/>
          <TitleBox width="15%" text='룸타입'/>
          <TitleBox width="10%" text='박수'/>
        </div>
        {
          hotelReserveState.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                  <p style={{width:'3%'}}></p>
                  <div style={{display:'flex', alignItems:'center', width:'30%', justifyContent:'center'}}>
                    <DateBoxNum width='150px' subWidth='130px' right={25}   setSelectDate={(e:any) => handleHotelReserveDate1Change(e, index)} date={item.checkIn} marginLeft={5}/>
                    <p style={{width:'20px'}}>~</p>
                    <DateBoxNum width='150px' subWidth='130px' right={25}   setSelectDate={(e:any) => handleHotelReserveDate2Change(e, index)} date={item.checkOut} marginLeft={5}/>
                  </div>
                  <input style={{width:'20%', textAlign:'center'}}
                    value={item.location} className="inputdefault" type="text"
                    onChange={(e) => {const inputs = [...hotelReserveState]; inputs[index].location = e.target.value; setHotelReserveState(inputs);}}/>
                  <input style={{width:'20%', textAlign:'center'}}
                    value={item.hotelName} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...hotelReserveState]; inputs[index].hotelName = e.target.value; setHotelReserveState(inputs);}}/>
                  <input style={{width:'15%', textAlign:'center'}}
                    value={item.roomType} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = [...hotelReserveState]; inputs[index].roomType = e.target.value; setHotelReserveState(inputs);}}/>
                  <DropdownBox
                    widthmain='10%' height='35px' selectedValue={item.days}
                    options={DropDownNum}    
                    handleChange={(e)=>{const inputs = [...hotelReserveState]; inputs[index].days = e.target.value; setHotelReserveState(inputs);}}
                  />
                </div>
              </div>
            )
          })
        }
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div className='btn-row' style={{marginRight:'5px'}}
            onClick={()=>{
              setHotelReserveState([...hotelReserveState, 
                { checkIn : '', checkOut : '', location : '', hotelName: '', roomType : '', days: '' }]);
            }}
          >
            <p>+ 추가</p>
          </div>
        </div>
      </section>

      <section>
        <h1>9. 여행상품 포함/불포함 사항, 여행자 보험 가입여부</h1>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='포함사항'/>
            <input style={{width:'80%', textAlign:'left', marginLeft:'5px'}}
              value={etcState.includes} className="inputdefault" type="text" 
              onChange={(e) => {const inputs = {...etcState}; inputs.includes = e.target.value; setEtcState(inputs);}}
              />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='불포함사항'/>
            <input style={{width:'80%', textAlign:'left', marginLeft:'5px'}}
              value={etcState.notIncludes} className="inputdefault" type="text" 
              onChange={(e) => {const inputs = {...etcState}; inputs.notIncludes = e.target.value; setEtcState(inputs);}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='사은품'/>
            <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.freeGift=== '박람회사은품'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, freeGift: '박람회사은품'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>박람회사은품</p>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.freeGift=== '룰렛사은품'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, freeGift: '룰렛사은품'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>룰렛사은품</p>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.freeGift=== '특별사은품'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, freeGift: '특별사은품'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>특별사은품</p>
            </div>
            <input style={{width:'40%', textAlign:'left', marginLeft:'15px'}}
              value={etcState.freeGiftDetail} className="inputdefault" type="text" 
              onChange={(e) => {const inputs = {...etcState}; inputs.freeGiftDetail = e.target.value; setEtcState(inputs);}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='여행자보험'/>
            <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.travelInsurance === '포함'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, travelInsurance : '포함'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>포함</p>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.travelInsurance === '불포함'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, travelInsurance : '불포함'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>불포함</p>
            </div>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='보험회사'/>
            <input style={{width:'70%', textAlign:'left', marginLeft:'5px'}}
              value={etcState.insuranceCompany} className="inputdefault" type="text" 
              onChange={(e) => {const inputs = {...etcState}; inputs.insuranceCompany = e.target.value; setEtcState(inputs);}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='계약금액'/>
            <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.insuranceCost === '해외1억'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, insuranceCost : '해외1억'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>해외1억</p>
              <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <input className="input" type="checkbox"
                  checked={etcState.insuranceCost === '해외2억'}
                  onChange={()=>{
                    setEtcState(prev => ({
                      ...prev, insuranceCost : '해외2억'
                    }));
                  }}
                  style={{width:'20px', height:'20px'}}
                />
              </div>
              <p>해외2억</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
            onClick={handleReserveSaveTab2}
          >
            <p>저장</p>
          </div>
        </div>
      </section>

    </div>
  )
}
