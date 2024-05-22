import React, { useEffect, useState } from 'react'
import './ReserveDetail.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { SelectBox } from '../../boxs/SelectBox';
import { InputBox } from '../../boxs/InputBox';
import { DateBoxKo } from '../../boxs/DateBoxKo';
import { RadioBox } from '../../boxs/RadioBox';
import { TextBoxPL10 } from '../../boxs/TextBoxPL10';
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';
import { AirportStateProps, DepositCostProps, EtcStateProps, HotelReserveStateProps, RefundCostProps, ReserveInfoProps, 
        TicketingStateProps, UserInfoProps, productCostProps } from './InterfaceData';
import Loading from '../../components/Loading';


export default function ReserveDetail (props : any) {

  let navigate = useNavigate();
  const location = useLocation();
  const serialNum = location.state;

  const [userInfo, setUserInfo] = useState<UserInfoProps[]>([]);
  const [reserveInfo, setReserveInfo] = useState<ReserveInfoProps>();
  const [productCost, setProductCost] = useState<productCostProps>();
  const [airportState, setAirportState] = useState<AirportStateProps[]>([]);
  const [ticketingState, setTicketingState] = useState<TicketingStateProps[]>([]);
  const [hotelReserveState, setHotelReserveState] = useState<HotelReserveStateProps[]>([]);
  const [etcState, setEtcState] = useState<EtcStateProps>();
  const [contractCost, setContractCost] = useState<DepositCostProps>();
  const [airportCost, setAirportCost] = useState<DepositCostProps>();
  const [middleCost, setMiddleCost] = useState<DepositCostProps>();
  const [restCost, setRestCost] = useState<DepositCostProps>();
  const [additionCost, setAdditionCost] = useState<DepositCostProps>();
  const [refundCost, setRefundCost] = useState<RefundCostProps>();
  
	const fetchPosts = async () => {
		const resuser = await axios.get(`${MainURL}/adminreserve/getreserveuser/${serialNum}`)
		if (resuser) {
			setUserInfo(resuser.data);
		}
    const resinfo = await axios.get(`${MainURL}/adminreserve/getreserveinfo/${serialNum}`)
    if (resinfo) {
			setReserveInfo(resinfo.data[0]);
      setProductCost(JSON.parse(resinfo.data[0].productCost));
      setAirportState(JSON.parse(resinfo.data[0].airportState));
      setTicketingState(JSON.parse(resinfo.data[0].ticketingState));
      setHotelReserveState(JSON.parse(resinfo.data[0].hotelReserveState));
      setEtcState(JSON.parse(resinfo.data[0].etcState));
      setContractCost(JSON.parse(resinfo.data[0].contractCost));
      setAirportCost(JSON.parse(resinfo.data[0].airportCost));
      setMiddleCost(JSON.parse(resinfo.data[0].middleCost));
      setRestCost(JSON.parse(resinfo.data[0].restCost));
      setAdditionCost(JSON.parse(resinfo.data[0].additionCost));
      setRefundCost(JSON.parse(resinfo.data[0].refundCost));

      // const deliveryList = [
      //   JSON.parse(resinfo.data[0].eTicket),
      //   JSON.parse(resinfo.data[0].visaEsta),
      //   JSON.parse(resinfo.data[0].decideDoc),
      //   JSON.parse(resinfo.data[0].prepare),
      //   JSON.parse(resinfo.data[0].freeGift),
      //   JSON.parse(resinfo.data[0].happyCall),
      //   JSON.parse(resinfo.data[0].refund)
      // ];
      
      console.log(JSON.parse(resinfo.data[0].eTicket));

		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  

  // const [currentState, setCurrentState] = useState(1);
  // const [isChecked, setIsChecked] = useState(false);


  // const [selectedSortOption, setSelectedSortOption] = useState({ value: '선택', label: '선택' });

  // const handleSelectSortChange = ( event : any, index:number) => {
  //   setSelectedSortOption(event);
  //   const inputs = [...userInfo]; 
  //   inputs[index].sort = event.value; 
  //   setUserInfo(inputs);
  // }

  const CostBox: React.FC<any> = ({ content }) => (
    <div className="coverbox">
      <div className="coverrow rightborder" style={{width:'40%'}}>
        <TitleBox width="100px" text={content.nameko}/>
        <TextBoxPL10 width="40%" text={content.cost} justify='flex-end'/>
        <p>원</p>
      </div>
      <div className="coverrow" style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'center'}}>
        <TextBoxPL10 width="80%" text={content.date} justify='center'/>
        <div style={{width:'1px', height:'40px', backgroundColor:'#BDBDBD'}}></div>
        <TextBoxPL10 width="80%" text={content.type} justify='center'/>
        <div style={{width:'1px', height:'40px', backgroundColor:'#BDBDBD'}}></div>
        <TextBoxPL10 width="80%" text={content.deposit} justify='center'/>
      </div>
    </div>
  )
  
  return (
    (userInfo.length > 0 
      && (reserveInfo !== undefined && reserveInfo !== null) 
      && (productCost !== undefined && productCost !== null)
      && (airportState.length > 0)
      && (ticketingState.length > 0)
      && (hotelReserveState.length > 0)
      && (etcState !== undefined && etcState !== null)
      && (contractCost !== undefined && contractCost !== null)
      && (airportCost !== undefined && airportCost !== null)
      && (middleCost !== undefined && middleCost !== null)
      && (restCost !== undefined && restCost !== null)
      && (additionCost !== undefined && additionCost !== null)
      && (refundCost !== undefined && refundCost !== null)
    )
    ?
    <div className='reservedetail'>

      <div className="topcover">

        <div className="topmenu">
          
          <div className="menu-btn-box">
            <div className="menu-btn"
              onClick={()=>{
                navigate('/reserve/documentreserve');
              }}
            >
              <p>계약서 생성</p>
            </div>
            <div className="menu-btn"
              onClick={()=>{
                navigate('/reserve/documentarrange');
              }}
            >
              <p>수배서 보내기</p>
            </div>
            <div className="menu-btn"
              onClick={()=>{
                navigate('/reserve/documentcalculate');
              }}
            >
              <p>정산서</p>
            </div>
          </div>
          
          <div className='btn-box'>
            <div className="btn" style={{backgroundColor: '#BDBDBD'}}>
              <p>목록</p>
            </div>
            <div className="btn" style={{backgroundColor: '#b8d257'}}>
              <p>수정</p>
            </div>
            <div className="btn" style={{backgroundColor: '#5fb7ef'}}>
              <p>저장</p>
            </div>
          </div>

          <div className="search-box">
            <input className="inputdefault" type="text" style={{width:'80%'}} 
                value={''} onChange={(e)=>{}}/>
          </div>

        </div>
      </div>

      <div className="bottomcover">

        <div className='left-cover'>
          
          <section>
            <h1>1. 진행상황</h1>

            <div className='state-row' style={{width:'100%' , fontSize:'14px'}}>
              <div className='textbox'>
                <p>계약완료</p>
              </div>
              <div className='rotatebox'></div>
              <div className='textbox'>
                <p>발권완료</p>
              </div>
              <div className='rotatebox'></div>
              <div className='textbox'>
                <p>예약확정</p>
              </div>
              <div className='rotatebox'></div>
              <div className='textbox'>
                <p>출발준비</p>
              </div>
            </div>
            
          </section>

          <section className='userInfo'>
            <h1>2. 고객정보</h1>
            <div className="bottombar"></div>
            <div className='content'>
              <div className="coverbox titlerow">
                <TitleBox width="5%" text='구분' fontSize={14}/>
                <TitleBox width="7%" text='이름' fontSize={14}/>
                <TitleBox width="7%" text={`Last.N`} fontSize={14}/>
                <TitleBox width="12%" text={`First.N`} fontSize={14}/>
                <TitleBox width="10%" text='생년월일' fontSize={14}/>
                <TitleBox width="7%" text='국적' fontSize={14}/>
                <TitleBox width="12%" text='여권번호' fontSize={14}/>
                <TitleBox width="10%" text='만료일' fontSize={14}/>
                <TitleBox width="15%" text='주민번호' fontSize={14}/>
                <TitleBox width="15%" text='연락처' fontSize={14}/>
              </div>
              {
                userInfo.map((item:any, index:any)=>{
                  return(
                    <div className="coverbox info" key={index}>
                      <p style={{width:'5%', fontSize:'14px'}}>{item.sort}</p>
                      <p style={{width:'7%', fontSize:'14px'}}>{item.nameKo}</p>
                      <p style={{width:'7%', fontSize:'14px'}}>{item.lastName}</p>
                      <p style={{width:'12%', fontSize:'14px'}}>{item.firstName}</p>
                      <p style={{width:'10%', fontSize:'14px'}}>{item.birth}</p>
                      <p style={{width:'5%', fontSize:'14px'}}>{item.male}</p>
                      <p style={{width:'7%', fontSize:'14px'}}>{item.nation}</p>
                      <p style={{width:'12%', fontSize:'14px'}}>{item.passPortNum}</p>
                      <p style={{width:'10%', fontSize:'14px'}}>{item.passPortDate}</p>
                      <p style={{width:'15%', fontSize:'14px'}}>{item.residentNum}</p>
                      <p style={{width:'15%', fontSize:'14px'}}>{item.phone}</p>
                    </div>
                  )
                })
              }
            </div>

          </section>

          <section>
            <h1>3. 방문경로</h1>
            <div className="bottombar"></div>

            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='예약지점'/>
                <TextBoxPL10 width="50%" text={reserveInfo.reserveLocation} />
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='담당자'/>
                <div style={{display:'flex', alignItems:'center', width:'50%'}}>
                  <h3 style={{marginLeft:'10px', fontSize:'14px'}}>계약자</h3>
                  <TextBoxPL10 width="30%" text={reserveInfo.charger} height={20} />
                </div>
              </div>
            </div>

            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='방문경로'/>
                <TextBoxPL10 width="50%" text={reserveInfo.visitPath} />
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='추천인'/>
                <TextBoxPL10 width="50%" text={reserveInfo.recommender} />
              </div>
            </div>

          </section>

          <section>
            <h1>4. 예약상품</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='상품명'/>
                <TextBoxPL10 width="50%" text={reserveInfo.productName}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='여행지'/>
                <TextBoxPL10 width="50%" text={reserveInfo.tourLocation}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='항공사'/>
                <TextBoxPL10 width="50%" text={reserveInfo.airline}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행기간'/>
                <TextBoxPL10 width="50%" 
                  text={`${reserveInfo.tourStartAirport} ${reserveInfo.tourStartPeriod} ~ ${reserveInfo.tourEndAirport} ${reserveInfo.tourEndPeriod} `}/>
              </div>
            </div>
          </section>

          <section>
            <h1>5. 여행상품가</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='1인요금' height={160}/>
                <div style={{width:'60%'}}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px', width:'25%'}}>성인</h3>
                    <TextBoxPL10 width="35%" text={productCost.costAdult} justify='flex-end'/>
                    <p>원</p>
                    <TextBoxPL10 width="15%" text={productCost.costAdultNum} justify='flex-end'/>
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px', width:'25%'}}>소아</h3>
                    <TextBoxPL10 width="35%" text={productCost.costChild} justify='flex-end'/>
                    <p>원</p>
                    <TextBoxPL10 width="15%" text={productCost.costChildNum} justify='flex-end'/>
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px', width:'25%'}}>유아</h3>
                    <TextBoxPL10 width="35%" text={productCost.costInfant} justify='flex-end'/>
                    <p>원</p>
                    <TextBoxPL10 width="15%" text={productCost.costInfantNum} justify='flex-end'/>
                    <p>명</p>
                  </div>
                </div>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='전체요금' height={160}/>
                <TextBoxPL10 width="50%" text='' justify='flex-end'/>
                <p>원</p>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='계약당시 환율'/>
                <div style={{width:'85%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px'}}>1USD</h3>
                    <TextBoxPL10 width="30px" text={productCost.reserveExchangeRate} justify='center'/>
                  </div>
                  <div style={{display:'flex', alignItems:'center', marginLeft: '10px'}}>
                    <p># 잔금지불시 변동환율 적용여부 공지</p>
                    <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <input className="input" type="checkbox"
                        // checked={isChecked}
                        // onChange={()=>{setIsChecked(!isChecked);}}
                        style={{width:'20px', height:'20px', backgroundColor:'red'}}
                      />
                    </div>
                    <p>공지했음</p>
                    <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                      <input className="input" type="checkbox"
                        // checked={isChecked}
                        // onChange={()=>{setIsChecked(!isChecked);}}
                        style={{width:'20px', height:'20px', backgroundColor:'red'}}
                      />
                    </div>
                    <p>고객확인</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h1>6. 항공 예약현황</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
              <TitleBox width="18%" text='날짜'/>
              <TitleBox width="18%" text='구간'/>
              <TitleBox width="18%" text='항공편'/>
              <TitleBox width="18%" text='출발시간'/>
              <TitleBox width="18%" text='도착시간'/>
              <TitleBox width="10%" text='상태'/>
            </div>
            {
              ticketingState.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                      <TextBoxPL10 width="18%" text={item.date} justify='center'/>
                      <TextBoxPL10 width="18%" text={item.section} justify='center'/>
                      <TextBoxPL10 width="18%" text={item.airport} justify='center'/>
                      <TextBoxPL10 width="18%" text={item.timeDepart} justify='center'/>
                      <TextBoxPL10 width="18%" text={item.timeArrive} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.state} justify='center'/>
                    </div>
                  </div>
                )
              })
            }
            
          </section>

          <section>
            <h1>7. 발권현황</h1>
            <div className="bottombar"></div>
            {
              ticketingState.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                      <TitleBox width="60px" text='항공사'/>
                      <TextBoxPL10 width="50%" text={item.company} />
                    </div>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                      <TitleBox width="60px" text='발권처'/>
                      <TextBoxPL10 width="50%" text={item.ticketBooth} />
                    </div>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
                      <TitleBox width="60px" text='날짜'/>
                      <TextBoxPL10 width="50%" text={item.date} />
                    </div>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                      <TitleBox width="60px" text='상태'/>
                      <TextBoxPL10 width="50%" text={item.state} />
                    </div>
                  </div>
                )
              })
            }
          </section>
          
          <section>
            <h1>8. 호텔 예약현황</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
              <TitleBox width="20%" text='체크인'/>
              <TitleBox width="25%" text='여행지'/>
              <TitleBox width="25%" text='호텔명'/>
              <TitleBox width="20%" text='룸타입'/>
              <TitleBox width="10%" text='박수'/>
            </div>
            {
              hotelReserveState.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                      <TextBoxPL10 width="20%" text={item.date1} justify='center'/>
                      <TextBoxPL10 width="25%" text={item.location} justify='center'/>
                      <TextBoxPL10 width="25%" text={item.hotelName} justify='center'/>
                      <TextBoxPL10 width="20%" text={item.roomType} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.days} justify='center'/>
                    </div>
                  </div>
                )
              })
            }

          </section>

          <section>
            <h1>9. 여행상품 포함/불포함 사항, 여행자 보험 가입여부</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='포함사항'/>
                <TextBoxPL10 width="70%" text={etcState.includes}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='불포함사항'/>
                <TextBoxPL10 width="70%" text={etcState.notIncludes}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='여행자보험'/>
                <TextBoxPL10 width="50%" text={etcState.travelInsurance}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='보험회사'/>
                <TextBoxPL10 width="50%" text={etcState.insuranceCompany}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='계약금액'/>
                <TextBoxPL10 width="70%" text={etcState.insuranceCost}/>
              </div>
            </div>
          </section>

          <section>
            <h1>10. 입금내역</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow rightborder" style={{width:'40%'}}>
                <TitleBox width="100px" text='계약금액'/>
                <TextBoxPL10 width="40%" text={reserveInfo.tourTotalContractCost} justify='flex-end'/>
                <p>원</p>
              </div>
              <div className="coverrow" style={{width:'60%' , fontSize:'14px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <h3 style={{marginRight:'20px'}}>최종 여행 경비:</h3>
                <TextBoxPL10 width="40%" text={reserveInfo.totalCost} justify='right'/>
                <p>원</p>
              </div>
            </div>

            <CostBox content={contractCost}/>
            <CostBox content={airportCost}/>
            <CostBox content={middleCost}/>
            <CostBox content={restCost}/>
            <CostBox content={additionCost}/>

            <div className="coverbox">
              <div className="coverrow rightborder" style={{width:'40%'}}>
                <TitleBox width="100px" text='환불'/>
                <TextBoxPL10 width="40%" text={refundCost.cost} justify='flex-end'/>
                <p>원</p>
              </div>
              <div className="coverrow" style={{width:'60%'}}>
                <TextBoxPL10 width="40%" text={refundCost.date} justify='flex-end'/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='밸런스'/>
                <TextBoxPL10 width="50%" text={reserveInfo.balance} justify='flex-end'/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='현금영수증'/>
                <TextBoxPL10 width="30%" text={reserveInfo.isCashBill}/>
                <TextBoxPL10 width="30%" text={reserveInfo.cashBillInfo}/>
              </div>
            </div>
          </section>

         <section>
            <h1>11. OT 및 고객전달 사항</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{backgroundColor:'#E2E2E2' }}>
              <TitleBox width="100px" text=''/>
              <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                <TitleBox width="20%" text='요청일'/>
                <TitleBox width="20%" text='처리일'/>
                <TitleBox width="20%" text='전달방식'/>
                <TitleBox width="20%" text='담당자'/>
              </div>
            </div>
            {
              ["e-Ticket", "비자/ESTA", "확정서", "여행준비물", "캐리어사은품", "해피콜", "환불/과입금"].map((item:any, index:any)=>{
                return (
                  <div className="coverbox">
                    <div className="coverrow hole">
                      <TitleBox width="100px" text={item}/>
                      <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                        <TextBoxPL10 width="20%" text={''} justify='center'/>
                        <TextBoxPL10 width="20%" text={''} justify='center'/>
                        <TextBoxPL10 width="20%" text={''} justify='center'/>
                        <TextBoxPL10 width="20%" text={''} justify='center'/>
                      </div>
                    </div>
                  </div>

                )
              })
            }          
          </section>
        </div>
        
        <div className='right-cover'>
         {/*   <div className="content">
            
            <section>
              <h1>온라인 계약서 (전자서명, 동의서)</h1>
              <div className="bottombar"></div>
              <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#E2E2E2'}}>
                <TitleBox width="100px" text='날짜'/>
                <TitleBox width="100px" text='경로'/>
                <TitleBox width="100px" text='상태'/>
                <TitleBox width={150} text='보기'/>
              </div>
              <div className="coverbox">
                <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                  <DateBoxNum date={startDate} func={handleSelectDateChange} width="100px" subwidth="100px" right={7}/>
                  <SelectBox 
                    notice={{ value: '선택', label: '선택' }}
                    widthmain={120} selectwidth="100px" selectTextWidth={90}
                    data={[ 
                      { value: 'n1', label: '이메일' },
                      { value: 'n2', label: '이메일' },
                    ]} 
                  />
                  <SelectBox 
                    notice={{ value: '선택', label: '선택' }}
                    widthmain={120} selectwidth="100px" selectTextWidth={90}
                    data={[ 
                      { value: 'n1', label: '전달' },
                      { value: 'n2', label: '전달' },
                    ]} 
                  />
                  <InputBox width={150} value={''} func={(e)=>{}} />
                </div>
              </div>
            </section>

            <section>
              <h1>수배 확정 내역</h1>
              <div className="bottombar"></div>
              <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#E2E2E2'}}>
                <TitleBox width="100px" text='날짜'/>
                <TitleBox width="100px" text='경로'/>
                <TitleBox width="100px" text='상태'/>
                <TitleBox width={150} text='보기'/>
              </div>
              {
                [1,2,3].map((item:any, index:any)=>{
                  return (
                    <div className="coverbox">
                      <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                        <DateBoxNum date={startDate} func={handleSelectDateChange} width="100px" subwidth="100px" right={7}/>
                        <SelectBox 
                          notice={{ value: '선택', label: '선택' }}
                          widthmain={120} selectwidth="100px" selectTextWidth={90}
                          data={[ 
                            { value: 'n1', label: '이메일' },
                            { value: 'n2', label: '이메일' },
                          ]} 
                        />
                        <SelectBox 
                          notice={{ value: '선택', label: '선택' }}
                          widthmain={120} selectwidth="100px" selectTextWidth={90}
                          data={[ 
                            { value: 'n1', label: '전달' },
                            { value: 'n2', label: '전달' },
                          ]} 
                        />
                        <InputBox width={150} value={''} func={(e)=>{}} />
                      </div>
                  </div>
                  )
                })
              }
            </section>

            <section>
              <h1>고객 관리 내역</h1>
              <textarea 
                className="textarea"
                value={''}
                onChange={()=>{}}
              />
              <div className='btn-box'>
                <div className="btn" style={{backgroundColor: '#5fb7ef'}}>
                  <p>등록</p>
                </div>
              </div>
            </section>

            <section>
            {
              [1,2,3].map((item:any, index:any)=>{
                return (
                  <div className="inputcontentbox">
                    <div className="date-name">
                      <p className="date">2022.11.10 (14:51)</p>
                      <p className="name">김철수</p>
                    </div>
                    <div className="inputcontent">
                      <p>항공권 신한카드 발권 3개월 결제 - 신부님 카드</p>
                      <div className='btn-box'>
                        <div className="btn" style={{backgroundColor: '#BDBDBD'}}>
                          <p>삭제</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </section> 

          </div> */}
        </div>

      </div>

    </div>
    :
    <Loading />     
  )
}
