import React, { useEffect, useRef, useState } from 'react'
import './ReserveDetail.scss'
import { TitleBox } from '../../../../boxs/TitleBox';
import { TextBoxPL10 } from '../../../../boxs/TextBoxPL10';
import { DateBoxNum } from '../../../../boxs/DateBoxNum';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { AirportStateProps, CashBillInfoProps, DeliveryProps, DepositCostProps, EtcStateProps, HotelReserveStateProps, LandCompanyProps, RefundCostProps, ReserveInfoProps, 
        TicketingStateProps, UserInfoProps, ProductCostProps, 
        AirlineProps} from '../../InterfaceData';
import Loading from '../../components/Loading';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import ModalReserve from '../../ModalReserve/ModalReserve';
import { TextBox } from '../../../../boxs/TextBox';
import { FaCheck } from "react-icons/fa";
import { format } from 'date-fns';

export default function ReserveDetail (props : any) {

  let navigate = useNavigate();
  const location = useLocation();
  const serialNum = location.state;
  const [refresh, setRefresh] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfoProps[]>([]);
  const [reserveInfo, setReserveInfo] = useState<ReserveInfoProps>();
  const [airline, setAirline] = useState<AirlineProps[]>([]);
  const [productCost, setProductCost] = useState<ProductCostProps>();
  const [airportState, setAirportState] = useState<AirportStateProps[]>([]);
  const [ticketingState, setTicketingState] = useState<TicketingStateProps[]>([]);
  const [hotelReserveState, setHotelReserveState] = useState<HotelReserveStateProps[]>([]);
  const [landCompany, setLandCompany] = useState<LandCompanyProps[]>([]);
  const [etcState, setEtcState] = useState<EtcStateProps>();
  const [depositCostList, setDepositCostList] = useState<DepositCostProps[]>([]);
  const [refundCost, setRefundCost] = useState<RefundCostProps>();
  const [cashBillInfo, setCashBillInfo] = useState<CashBillInfoProps>();
  const [deliveryList, setDeliveryList] = useState<DeliveryProps[]>([]);
  
  // 데이터 가져오기 --------------------------------------------------------------------------------------------
	const fetchPosts = async () => {
		const resuser = await axios.get(`${MainURL}/adminreserve/getreserveuser/${serialNum}`)
		if (resuser) {
			setUserInfo(resuser.data);
		}
    const resinfo = await axios.get(`${MainURL}/adminreserve/getreserveinfo/${serialNum}`)
    if (resinfo) {
			setReserveInfo(resinfo.data[0]);
      setAirline(JSON.parse(resinfo.data[0].airline));
      setProductCost(JSON.parse(resinfo.data[0].productCost));
      setAirportState(JSON.parse(resinfo.data[0].airportState));
      setTicketingState(JSON.parse(resinfo.data[0].ticketingState));
      setHotelReserveState(JSON.parse(resinfo.data[0].hotelReserveState));
      setLandCompany(JSON.parse(resinfo.data[0].landCompany));
      setEtcState(JSON.parse(resinfo.data[0].etcState));
      const costListCopy = [
        JSON.parse(resinfo.data[0].contractCost),
        JSON.parse(resinfo.data[0].airportCost),
        JSON.parse(resinfo.data[0].reviseAirportCost),
        JSON.parse(resinfo.data[0].middleCost),
        JSON.parse(resinfo.data[0].restCost),
        JSON.parse(resinfo.data[0].additionCost)
      ]
      setDepositCostList(costListCopy);
      setRefundCost(JSON.parse(resinfo.data[0].refundCost));
      const deliveryListCopy = [
        JSON.parse(resinfo.data[0].eTicket),
        JSON.parse(resinfo.data[0].visaEsta),
        JSON.parse(resinfo.data[0].decideDoc),
        JSON.parse(resinfo.data[0].prepare),
        JSON.parse(resinfo.data[0].freeGift),
        JSON.parse(resinfo.data[0].happyCall),
        JSON.parse(resinfo.data[0].refund)
      ];
      setCashBillInfo(JSON.parse(resinfo.data[0].cashBillInfo));
      setDeliveryList(deliveryListCopy)
		}
	};

  
	useEffect(() => {
		fetchPosts();
  }, [refresh]);  

  
  // 수정 모달 ------------------------------------------------------------------------------------------------
  const [isViewReserveModal, setIsViewReserveModal] = useState<boolean>(false);
  const divAreaRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (divAreaRef.current) {
      const copy = divAreaRef.current.offsetHeight
      setHeight(copy);
    }
  }, [isViewReserveModal]);
  

  // 오른쪽바 데이터 관련-----------------------------------------------------------------------------------------

  interface ReserceCSProps {
    id : number;
    date : string;
    time : string;
    charger : string;
    content : string;
  };

  const [reserveCSList, setReserveCSList] = useState<ReserceCSProps[]>([]);
  const [refreshCS, setRefreshCS] = useState<boolean>(false);
  const [inputContent, setInputContent] = useState('');
  const userName = sessionStorage.getItem('userName');
  const today = new Date();
  const formattedDate = format(today, 'yyyy-MM-dd');
  const formattedTime = format(today, 'HH:mm:ss');

  // 고객관리 내역 데이터 가져오기 
  const fetchReserveCePosts = async () => {
    const res = await axios.get(`${MainURL}/adminreservecs/getreservecs/${serialNum}`)
    if (res) {
      setReserveCSList(res.data);
    }
  }
  useEffect(() => {
    fetchReserveCePosts();
	}, [refreshCS]);
  
  // 고객관리 등록
  const handleReserveCSSave = async () => {
    const data = {
      serialNum : serialNum,
      date : formattedDate,
      time : formattedTime,
      charger : userName,
      content : inputContent
    }
    await axios
    .post(`${MainURL}/adminreservecs/savecsinput`, data)
    .then((res)=>{
      if (res.data) {
        setRefreshCS(!refreshCS);
        alert('등록되었습니다.')
        setInputContent('');
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    });
  };

  // 고객관리 삭제
  const handleReserveCSDelete = async (inputID : number) => {
    const data = {
      serialNum : serialNum,
      postID : inputID
    }
    await axios
    .post(`${MainURL}/adminreservecs/deletecsinput`, data)
    .then((res)=>{
      if (res.data) {
        setRefreshCS(!refreshCS);
        alert('삭제되었습니다.')
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    });
  };


  return (
    (userInfo.length > 0 
      && (reserveInfo !== undefined && reserveInfo !== null) 
      && (airline.length > 0)
      && (productCost !== undefined && productCost !== null)
      && (airportState.length > 0)
      && (ticketingState.length > 0)
      && (hotelReserveState.length > 0)
      && (landCompany.length > 0)
      && (etcState !== undefined && etcState !== null)
      // && (depositCostList.length > 0)
      && (refundCost !== undefined && refundCost !== null)
      && (cashBillInfo !== undefined && cashBillInfo !== null)
    )
    ?
    <div className='reservedetail'>

      <div className="topcover">

        <div className="topmenu">
          
          <div className="menu-btn-box">
            <div className="menu-btn"
              onClick={()=>{
                navigate('/admin/reserve/documentreserve', 
                  {state: {userInfo : userInfo, reserveInfo: reserveInfo, 
                    productCost: productCost, depositCostList: depositCostList}});
              }}>
              <p>계약서 생성</p>
            </div>
            <div className="menu-btn"
              onClick={()=>{
                navigate('/admin/reserve/documentarrange', 
                  {state: {userInfo : userInfo, reserveInfo: reserveInfo,
                          airportState: airportState, hotelReserveState: hotelReserveState}});
              }}
            >
              <p>수배서 보내기</p>
            </div>
            <div className="menu-btn"
              onClick={()=>{
                navigate('/admin/reserve/documentcalculate',
                  {state: {userInfo : userInfo, reserveInfo: reserveInfo, 
                            airportState: airportState, productCost: productCost}});
              }}
            >
              <p>정산서</p>
            </div>
          </div>
          
          <div className='btn-box'>
            <div className="btn" style={{backgroundColor: '#BDBDBD'}}
              onClick={()=>{
                navigate('/admin/reserve');
              }}
            >
              <p>목록</p>
            </div>
            <div className="btn" style={{backgroundColor: '#b8d257'}}
              onClick={()=>{
                setIsViewReserveModal(true);
              }}
            >
              <p>수정</p>
            </div>
            <div className="btn" style={{backgroundColor: '#5fb7ef'}}>
              <p>저장</p>
            </div>
          </div>

          {/* <div className="search-box">
            <input className="inputdefault" type="text" style={{width:'80%'}} 
                value={''} onChange={(e)=>{}}/>
          </div> */}

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
                <TitleBox width="5%" text='성별' fontSize={14}/>
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
                      <p style={{width:'7%', fontSize:'14px'}}>{item.nameLast}</p>
                      <p style={{width:'12%', fontSize:'14px'}}>{item.nameFirst}</p>
                      <p style={{width:'10%', fontSize:'14px'}}>{item.birth}</p>
                      <p style={{width:'5%', fontSize:'14px'}}>{item.gender}</p>
                      <p style={{width:'7%', fontSize:'14px'}}>{item.nation}</p>
                      <p style={{width:'12%', fontSize:'14px'}}>{item.passportNum}</p>
                      <p style={{width:'10%', fontSize:'14px'}}>{item.passportDate}</p>
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
                <TextBoxPL10 width="30%" text={reserveInfo.visitPath} />
                <TextBoxPL10 width="30%" text={reserveInfo.visitPathDetail} />
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
                <TitleBox width="100px" text='여행지'/>
                <TextBoxPL10 width="50%" text={reserveInfo.tourLocation}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행상품'/>
                <TextBoxPL10 width="50%" text={reserveInfo.productName}/>
              </div>
            </div>
            { 
              airline.map((item:any, index:any)=>{
                return (
                  <div className="coverbox">
                    <div className="coverrow hole">
                      <TitleBox width="100px" text={airline.length > 1 ? `항공사${index+1}` : '항공사'}/>
                      <TextBoxPL10 width="50%" text={item.airlineName}/>
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
                      <TitleBox width="100px" text={landCompany.length > 1 ? `랜드사${index+1}` : '랜드사'}/>
                      <TextBoxPL10 width="30%" text={item.companyName}/>
                      <TextBoxPL10 width="30%" text={item.notice}/>
                    </div>
                  </div>
                )
              })
            }
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
                    <TextBoxPL10 width="40%" text={productCost.costAdult} justify='flex-end'/>
                    <p>원</p>
                    <TextBoxPL10 width="10%" text={productCost.costAdultNum} justify='flex-end'/>
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px', width:'25%'}}>소아</h3>
                    <TextBoxPL10 width="40%" text={productCost.costChild} justify='flex-end'/>
                    <p>원</p>
                    <TextBoxPL10 width="10%" text={productCost.costChildNum} justify='flex-end'/>
                    <p>명</p>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <h3 style={{margin:'0 10px', width:'25%'}}>유아</h3>
                    <TextBoxPL10 width="40%" text={productCost.costInfant} justify='flex-end'/>
                    <p>원</p>
                    <TextBoxPL10 width="10%" text={productCost.costInfantNum} justify='flex-end'/>
                    <p>명</p>
                  </div>
                </div>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='전체요금' height={160}/>
                <TextBoxPL10 width="50%" text={productCost.costAll} justify='flex-end'/>
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
                    <div style={{margin:'0 10px'}}>
                      <FaCheck color={productCost.isNotice ? '#1DDB16' : '#EAEAEA'}/>
                    </div>
                    <p>공지했음</p>
                    <div style={{margin:'0 10px'}}>
                      <FaCheck color={productCost.isClientCheck ? '#1DDB16' : '#EAEAEA'}/>
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
              <TitleBox width="20%" text='항공편'/>
              <TitleBox width="10%" text='출발공항'/>
              <TitleBox width="150px" text='출발일'/>
              <TitleBox width="15%" text='출발시간'/>
              <TitleBox width="10%" text='도착공항'/>
              <TitleBox width="150px" text='도착일'/>
              <TitleBox width="15%" text='도착시간'/>
            </div>
            {
              airportState.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                      <TextBoxPL10 width="20%" text={item.airportSection} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.departAirport} justify='center'/>
                      <TextBoxPL10 width="150px" text={item.departDate} justify='center'/>
                      <TextBoxPL10 width="15%" text={item.departTime} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.arriveAirport} justify='center'/>
                      <TextBoxPL10 width="150px" text={item.arriveDate} justify='center'/>
                      <TextBoxPL10 width="15%" text={item.arriveTime} justify='center'/>
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
              <div className="coverrow hole">
                <TitleBox width="100px" text='사은품'/>
                <TextBoxPL10 width="30%" text={etcState.freeGift}/>
                <TextBoxPL10 width="30%" text={etcState.freeGiftDetail}/>
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
            { 
              depositCostList.map((item:any, index:any)=>{
                return (
                  <div key={index}>
                   {
                    item.map((subItem:any, subIndex:any)=>{
                      return (
                        <div className="coverbox" key={subIndex}>
                          <div className="coverrow rightborder" style={{width:'40%'}}>
                            <TitleBox width="100px" text={item.length > 1 ? `${subItem.nameko}${subIndex+1}` : subItem.nameko}/>
                            <TextBoxPL10 width="40%" text={subItem.cost} justify='flex-end'/>
                            <p>원</p>
                          </div>
                          <div className="coverrow" style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <TextBoxPL10 width="80%" text={subItem.date} justify='center'/>
                            <div style={{width:'1px', height:'40px', backgroundColor:'#BDBDBD'}}></div>
                            <TextBoxPL10 width="80%" text={subItem.type} justify='center'/>
                            <div style={{width:'1px', height:'40px', backgroundColor:'#BDBDBD'}}></div>
                            <TextBoxPL10 width="80%" text={subItem.deposit ? "입금확인" : ""} justify='center'/>
                          </div>
                        </div>
                      )
                    })
                   }
                  </div>
                )
              })
            }
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
                <TextBoxPL10 width="100px" text={`${reserveInfo.ballance} %`} justify='flex-end'/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='현금영수증'/>
                <TextBoxPL10 width="100px" text={reserveInfo.isCashBill ? '발급요청' : '요청없음'}/>
                <div style={{display:'flex', alignItems:'center'}}>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <p style={{marginRight:'3px'}}>종류:</p>
                    <TextBox width='' text={cashBillInfo.type}/>
                  </div>
                  <div style={{display:'flex', alignItems:'center', margin:'0 15px'}}>
                    <p style={{marginRight:'3px'}}>인증번호:</p>
                    <TextBox width='' text={cashBillInfo.AuthNum}/>
                  </div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <p style={{marginRight:'3px'}}>발급일:</p>
                    <TextBox width='' text={cashBillInfo.date}/>
                  </div>
                </div>
              </div>
            </div>
          </section>

         <section>
            <h1>11. OT 및 고객전달 사항</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{backgroundColor:'#f6f6f6' }}>
              <TitleBox width="100px" text=''/>
              <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                <TitleBox width="20%" text='요청일'/>
                <TitleBox width="20%" text='처리일'/>
                <TitleBox width="20%" text='전달방식'/>
                <TitleBox width="20%" text='담당자'/>
              </div>
            </div>
            {
              deliveryList.map((item:any, index:any)=>{
                return (
                  <div className="coverbox">
                    <div className="coverrow hole">
                      <TitleBox width="100px" text={item.name}/>
                      <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
                        <TextBoxPL10 width="20%" text={item.requestDate} justify='center'/>
                        <TextBoxPL10 width="20%" text={item.completeDate} justify='center'/>
                        <TextBoxPL10 width="20%" text={item.deliveryType} justify='center'/>
                        <TextBoxPL10 width="20%" text={item.charger} justify='center'/>
                      </div>
                    </div>
                  </div>

                )
              })
            }          
          </section>
        </div>
        
        {/* 오른쪽 바 데이터 입력 ------------------------------------------------------------------------------------------------------------------------------ */}
        <div className='right-cover'>
         <div className="content">
            
            <section>
              <h1>온라인 계약서 (전자서명, 동의서)</h1>
              <div className="bottombar"></div>
              <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#f6f6f6'}}>
                <TitleBox width="130px" text='날짜'/>
                <TitleBox width="20%" text='경로'/>
                <TitleBox width="20%" text='상태'/>
                <TitleBox width="25%" text='보기'/>
              </div>
              <div className="coverbox">
                <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                  <DateBoxNum width='130px' subWidth='110px' right={25}   setSelectDate={''} date={''} marginLeft={5}/>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={''}
                    options={[
                      { value: '이메일', label: '이메일' },
                      { value: '이메일', label: '이메일' }
                    ]}    
                    handleChange={(e)=>{}}
                  />
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={''}
                    options={[
                      { value: '대기', label: '대기' },
                      { value: '전달', label: '전달' }
                    ]}    
                    handleChange={(e)=>{}}
                  />
                  <input style={{width:'25%', textAlign:'center'}}
                    value={''} className="inputdefault" type="text" 
                    onChange={(e) => {}}/>
                </div>
              </div>
            </section>

            <section>
              <h1>수배 확정 내역</h1>
              <div className="bottombar"></div>
              <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor: '#f6f6f6'}}>
                <TitleBox width="130px" text='날짜'/>
                <TitleBox width="20%" text='경로'/>
                <TitleBox width="20%" text='상태'/>
                <TitleBox width="25%" text='보기'/>
              </div>
              {
                [1,2,3].map((item:any, index:any)=>{
                  return (
                    <div className="coverbox" key={index}>
                      <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                        <DateBoxNum width='130px' subWidth='110px' right={25}   setSelectDate={''} date={''} marginLeft={5}/>
                        <DropdownBox
                          widthmain='20%' height='35px' selectedValue={''}
                          options={[
                            { value: '이메일', label: '이메일' },
                            { value: '이메일', label: '이메일' }
                          ]}    
                          handleChange={(e)=>{}}
                        />
                        <DropdownBox
                          widthmain='20%' height='35px' selectedValue={''}
                          options={[
                            { value: '예약', label: '예약' },
                            { value: '대기', label: '대기' },
                            { value: '확정', label: '확정' }
                          ]}    
                          handleChange={(e)=>{}}
                        />
                        <input style={{width:'25%', textAlign:'center'}}
                          value={''} className="inputdefault" type="text" 
                          onChange={(e) => {}}/>
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
                value={inputContent}
                onChange={(e)=>{setInputContent(e.target.value)}}
              />
              <div className='csbtn-box'>
                <div className="btn" style={{backgroundColor: '#5fb7ef'}}
                  onClick={handleReserveCSSave}
                >
                  <p>등록</p>
                </div>
              </div>
            </section>

            <section>
            {  reserveCSList.length > 0 &&
              reserveCSList.map((item:any, index:any)=>{
                return (
                  <div className="inputcontentbox" key={index}>
                    <div className="date-name">
                      <p className="date">{item.date} ({item.time})</p>
                      <p className="name">{item.charger}</p>
                    </div>
                    <div className="inputcontent">
                      <p>{item.content}</p>
                      <div className='csbtn-box'>
                        <div className="btn" style={{backgroundColor: '#BDBDBD'}}
                          onClick={()=>{
                            handleReserveCSDelete(item.id);
                          }}
                        >
                          <p>삭제</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            </section>

          </div>
        </div>

      </div>

        {/* 예약수정 모달창 */}
            {
        isViewReserveModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalReserve
              serialNum={serialNum}
              setIsViewModal={setIsViewReserveModal}
              refresh={refresh}
              setRefresh={setRefresh}
              modalSort='revise'
              // 공통
              reserveInfo={reserveInfo}
              // tab1
              userInfo={userInfo}
              // tab2
              productCost={productCost}
              airportState={airportState}
              ticketingState={ticketingState}
              hotelReserveState={hotelReserveState}
              etcState={etcState}
              // tab3
              depositCostList={depositCostList}
              refundCost={refundCost}
              // tab4
              deliveryList={deliveryList}
             />
          </div>
        </div>
      }

    </div>
    :
    <Loading />     
  )
}
