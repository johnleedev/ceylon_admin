import React, { useEffect, useRef, useState } from 'react'
import './ReserveDetail.scss'
import { TitleBox } from '../../../../boxs/TitleBox';
import { TextBoxPL10 } from '../../../../boxs/TextBoxPL10';
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { DeliveryInfoProps, DepositCostInfoProps, EtcStateProps, HotelReserveStateProps,
        UserInfoProps, VisitPathInfoProps, ProductInfoProps,
        AirlineReserveStateProps,
        ReserveStateProps,
        WorkStateProps,
        UserSubInfoProps} from '../../InterfaceData';
import Loading from '../../components/Loading';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { TextBox } from '../../../../boxs/TextBox';
import { FaCheck } from "react-icons/fa";
import { format } from 'date-fns';
import { DateBoxSingle } from '../../../../boxs/DateBoxSingle';

export default function ReserveDetail (props : any) {

   const DepositCostInfMapBox = ({ originitem, title, length}: { originitem: any; title:string, length:number,  }) => (
    <>
    { originitem.map((item:any, index:any)=>{
        return (
          <div className="coverbox" key={index}>
            <div className="coverrow rightborder" style={{width:'40%'}}>
              <TitleBox width='100px' text={length > 1 ? `${title}${index+1}` : `${title}`}/>
              <TextBoxPL10 width="40%" text={item.cost} justify='flex-end'/>
              <p>원</p>
            </div>
            <div className="coverrow" style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <TextBoxPL10 width="80%" text={item.date} justify='center'/>
              <div style={{width:'1px', height:'40px', backgroundColor:'#BDBDBD'}}></div>
              <TextBoxPL10 width="80%" text={item.type} justify='center'/>
              <div style={{width:'1px', height:'40px', backgroundColor:'#BDBDBD'}}></div>
              <TextBoxPL10 width="80%" text={item.deposit ? "입금확인" : ""} justify='center'/>
            </div>
          </div>
            )
        })}
    </>
  )


  let navigate = useNavigate();
  const location = useLocation();
  const serialNum = location.state;
  const [refresh, setRefresh] = useState<boolean>(false);

  const [reserveState, setReserveState] = useState<ReserveStateProps>();
  const [workState, setWorkState] = useState<WorkStateProps>();
  const [productName, setProductName] = useState('');
  const [landCompany, setLandCompany] = useState('');
  const [visitPath, setVisitPath] = useState('');
  const [charger, setCharger] = useState('');

  const [userInfo, setUserInfo] = useState<UserInfoProps[]>([]);
  const [userSubInfo, setUserSubInfo] = useState<UserSubInfoProps>();
  const [visitPathInfo, setVisitPathInfo] = useState<VisitPathInfoProps>();
  const [productInfo, setProductInfo] = useState<ProductInfoProps>();
  const [airlineReserveState, setAirlineReserveState] = useState<AirlineReserveStateProps>();
  const [hotelReserveState, setHotelReserveState] = useState<HotelReserveStateProps[]>([]);
  const [etcState, setEtcState] = useState<EtcStateProps>();
  const [depositCostInfo, setDepositCostInfo] = useState<DepositCostInfoProps>();
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoProps[]>([]);
  
  // 데이터 가져오기 --------------------------------------------------------------------------------------------
	const fetchPosts = async () => {
    const resinfo = await axios.get(`${MainURL}/adminreserve/getreserveinfo/${serialNum}`)
    if (resinfo) {
      const copy = {...resinfo.data[0]}
      setReserveState(JSON.parse(copy.reserveState));
      setWorkState(JSON.parse(copy.workState));
      setProductName(copy.productName);
      setLandCompany(copy.landCompany);
      setVisitPath(copy.visitPath);
      setCharger(copy.charger);
      setUserInfo(JSON.parse(copy.userInfo));
      setUserSubInfo(JSON.parse(copy.userSubInfo));
			setVisitPathInfo(JSON.parse(copy.visitPathInfo));
      setProductInfo(JSON.parse(copy.productInfo));
      setAirlineReserveState(JSON.parse(copy.airlineReserveState));
      setHotelReserveState(JSON.parse(copy.hotelReserveState));
      setEtcState(JSON.parse(copy.etcState));
      setDepositCostInfo(JSON.parse(copy.depositCostInfo));
      setDeliveryInfo(JSON.parse(copy.deliveryInfo));
		}
	};
 
	useEffect(() => {
		fetchPosts();
  }, [refresh]);  

  // 예약 정보 삭제
  const handleReserveInfoDelete = async () => {
    const data = {
      serialNum : serialNum
    }
    await axios
    .post(`${MainURL}/adminreserve/deletereserveinfo`, data)
    .then((res)=>{
      if (res.data) {
        alert('삭제되었습니다.')
        navigate('/admin/reserve');
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    });
  };
  

  // 오른쪽바 데이터 관련-----------------------------------------------------------------------------------------

  interface ReserceCSProps {
    id : number;
    date : string;
    time : string;
    charger : string;
    content : string;
  };
  const [isSelectedMenuBtn, setIsSelectedMenuBtn] = useState('온라인계약서');

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

  const SelectWorkTabBox = ({ item, title}: { item: any; title: string }) => (
    <div className={(workState as any)[item] ? "workState-box selected" : "workState-box"}>
      <div className='textbox'>
        <p>{title}</p>
      </div>
    </div>
  )

  return (
    ( userInfo.length > 0 
      && (userSubInfo !== undefined && userSubInfo !== null)
      && (reserveState !== undefined && reserveState !== null)
      && (workState !== undefined && workState !== null)
      && (visitPathInfo !== undefined && visitPathInfo !== null) 
      && (productInfo !== undefined && productInfo !== null)
      && (airlineReserveState !== undefined && airlineReserveState !== null)
      && (hotelReserveState.length > 0)
      && (etcState !== undefined && etcState !== null)
      && (depositCostInfo !== undefined && depositCostInfo !== null)
      && (deliveryInfo.length > 0)
    )
    ?
    <div className='reservedetail'>
      <div className="topcover">

        <div className="topmenu">
          
          <div className="menu-btn-box">
            <div className="menu-btn"
              onClick={()=>{
                navigate('/admin/reserve/documentreserve', 
                  {state: {userInfo : userInfo, hotelReserveState : hotelReserveState, visitPathInfo: visitPathInfo, depositCostInfo: depositCostInfo}});
              }}>
              <p>계약서</p>
            </div>
            <div className="menu-btn"
              onClick={()=>{
                navigate('/admin/reserve/documentarrange', 
                  {state: { userInfo : userInfo, productInfo : productInfo, airlineReserveState : airlineReserveState, hotelReserveState: hotelReserveState}});
              }}
            >
              <p>수배서</p>
            </div>
            <div className="menu-btn"
              onClick={()=>{
                navigate('/admin/reserve/documentcalculate',
                  {state: {userInfo : userInfo, productInfo : productInfo }});
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
                navigate('/admin/schedule/reservepage', {state : 
                  { 
                    serialNum: serialNum, 
                    modalSort:'revise',
                    reserveState:reserveState,
                    workState:workState,
                    productName:productName,
                    landCompany:landCompany,
                    visitPath:visitPath,
                    charger:charger,
                    userInfo:userInfo,
                    userSubInfo:userSubInfo,
                    visitPathInfo:visitPathInfo,
                    productInfo:productInfo,
                    airlineReserveState:airlineReserveState,
                    hotelReserveState:hotelReserveState,
                    etcState:etcState,
                    depositCostInfo:depositCostInfo,
                    deliveryInfo:deliveryInfo
                  } 
                });
              }}
            >
              <p>수정</p>
            </div>
            <div className="btn" style={{backgroundColor: '#FF9090'}}
              onClick={()=>{
                handleReserveInfoDelete();
              }}
            >
              <p>삭제</p>
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
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <h1>1. 진행상황</h1>
            <p style={{color:'#ccc', fontSize:'14px'}}>{serialNum}</p>
          </div>

          <div className='reserveState-row'>
            <div className={reserveState.contractCompleted ? "reserveState-box selected" : "reserveState-box"}>
              <div className='textbox'>
                <p>계약완료</p>
              </div>
              <div className='rotatebox'></div>
            </div>
            <div className={reserveState.ticketIssued ? "reserveState-box selected" : "reserveState-box"}>
              <div className='textbox'>
                <p>발권완료</p>
              </div>
              <div className='rotatebox '></div>
            </div>
            <div className={reserveState.reserveConfirm ? "reserveState-box selected" : "reserveState-box"}>
              <div className='textbox'>
                <p>예약확정</p>
              </div>
              <div className='rotatebox'></div>
            </div>
            <div className={reserveState.fullPayReceived ? "reserveState-box selected" : "reserveState-box"}>
              <div className='textbox'>
                <p>여행경비납부</p>
              </div>
              <div className='rotatebox'></div>
            </div>
            <div className={reserveState.departNoticeSent ? "reserveState-box selected" : "reserveState-box"}>
              <div className='textbox'>
                <p>출발안내문발송</p>
              </div>
            </div>
          </div>

          <div className='workState-row'>
            <SelectWorkTabBox item={'progressNoticeSent'} title='진행순서안내'/>
            <SelectWorkTabBox item={'eticketSent'} title='E-Ticket'/>
            <SelectWorkTabBox item={'scheduleSent'} title='일정표'/>
            <SelectWorkTabBox item={'passportVerify'} title='여권확인'/>
            <SelectWorkTabBox item={'tourPrepare'} title='여행준비물'/>
            <SelectWorkTabBox item={'visaEsta'} title='비자/ESTA'/>
            <SelectWorkTabBox item={'voucherSent'} title='바우처발송'/>
            <SelectWorkTabBox item={'remainPayRequest'} title='잔금요청'/>
            <SelectWorkTabBox item={'confirmationSent'} title='확정서발송'/>
            <SelectWorkTabBox item={'guideBook'} title='가이드북'/>
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
                      <p style={{width:'5%', fontSize:'14px'}}>
                        <input className="input" type="checkbox"
                          checked={item.isContact}
                          style={{width:'20px', height:'20px'}}
                        />
                      </p>
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
            <div className='content' style={{marginTop:'20px'}}>
              <div className="coverbox titlerow">
                <TitleBox width='33%' text='신부성함'/>
                <TitleBox width='33%' text='생일'/>
                <TitleBox width='33%' text='결혼기념일'/>
              </div>
              <div className="coverbox info">
                <TextBoxPL10 width="33%" text={userSubInfo.brideName}/>
                <TextBoxPL10 width="33%" text={userSubInfo.birthDate}/>
                <TextBoxPL10 width="33%" text={userSubInfo.weddingDate}/>
              </div>
            </div>
          </section>

          <section>
            <h1>3. 방문경로</h1>
            <div className="bottombar"></div>

            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='예약지점'/>
                <TextBoxPL10 width="50%" text={visitPathInfo.reserveLocation} />
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='담당자'/>
                <div style={{display:'flex', alignItems:'center', width:'50%'}}>
                  <h3 style={{marginLeft:'10px', fontSize:'14px'}}>계약자</h3>
                  <TextBoxPL10 width="30%" text={visitPathInfo.charger} height={20} />
                </div>
              </div>
            </div>

            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='방문경로'/>
                <TextBoxPL10 width="30%" text={visitPathInfo.visitPath} />
                <TextBoxPL10 width="30%" text={visitPathInfo.visitPathDetail} />
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='추천인'/>
                <TextBoxPL10 width="50%" text={visitPathInfo.recommender} />
              </div>
            </div>

          </section>

         <section>
            <h1>4. 상품정보</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행지'/>
                <TextBoxPL10 width="50%" text={productInfo.tourLocation}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='여행상품'/>
                <TextBoxPL10 width="50%" text={productInfo.productName}/>
              </div>
            </div>
            { 
              productInfo.airline.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow hole">
                      <TitleBox width="100px" text={ productInfo.airline.length > 1 ? `항공사${index+1}` : '항공사'}/>
                      <TextBoxPL10 width="50%" text={item.productInfoName}/>
                    </div>
                  </div>
                )
              })
            }
            { 
              productInfo.landCompany.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow hole">
                      <TitleBox width="100px" text={productInfo.landCompany.length > 1 ? `랜드사${index+1}` : '랜드사'}/>
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
                  text={`${productInfo.tourStartAirport}  ${productInfo.tourStartPeriod} ~ ${productInfo.tourEndPeriod} `}/>
              </div>
            </div>
            <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="100px" text='1인요금' height={160}/>
              <div style={{flex:1}}>
                {
                  productInfo.personalCost.map((item:any, index:any)=>{
                    return (
                    <div style={{display:'flex', alignItems:'center'}} key={index}>
                      <TextBoxPL10 width="30%" text={item.currency}/>
                      <p style={{margin:'0 10px'}}>{item.sort}</p>
                      <TextBoxPL10 width="30%" text={item.cost}/>
                      <p style={{marginRight:'10px'}}>원</p>
                      <TextBoxPL10 width="15%" text={item.num}/>
                      <p>명</p>
                    </div>
                    )
                  })
                }
              </div>
            </div>
            <div className="coverrow half">
              <TitleBox width="100px" text='전체요금' height={160}/>
              <TextBoxPL10 width="40%" text={productInfo.personalCostAll}/>
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="100px" text='환율타입구분'/>
              <div style={{marginLeft: '1px', display:'flex', alignItems:'center'}}>
                <TextBoxPL10 width="40%" text={productInfo.exchangeRate.rateType}/>
              </div>
            </div>
            <div className="coverrow half">
              <TitleBox width="100px" text='환율공지'/>
              <div style={{marginLeft: '10px', display:'flex', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={productInfo.exchangeRate.isNotice}
                    style={{width:'20px', height:'20px'}}
                  />
                </div>
                <p>공지했음</p>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={productInfo.exchangeRate.isClientCheck}
                    style={{width:'20px', height:'20px'}}
                  />
                </div>
                <p>고객확인</p>
              </div>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="100px" text='고지환율'/>
              <TextBoxPL10 width="40%" text={productInfo.exchangeRate.noticeRate}/>
            </div>
            <div className="coverrow half">
              <TitleBox width="100px" text='잔금지급시환율'/>
              <TextBoxPL10 width="20%" text={productInfo.exchangeRate.restDepositDate}/>
              <TextBoxPL10 width="20%" text={productInfo.exchangeRate.restDepositRate}/>
            </div>
          </div>
        </section>

         <section>
            <h1>5. 항공 예약현황</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#f6f6f6'}}>
              <TitleBox width="300px" text='날짜'/>
              <TitleBox width="10%" text='항공사'/>
              <TitleBox width="10%" text='항공편'/>
              <TitleBox width="10%" text='출발공항'/>
              <TitleBox width="10%" text='출발시간'/>
              <TitleBox width="10%" text='도착공항'/>
              <TitleBox width="10%" text='도착시간'/>
            </div>
            { 
              airlineReserveState.airlineState.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                      <TextBoxPL10 width="300px" text={`${item.departDate} ~ ${item.arriveDate}`} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.airlineCompany} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.airlineName} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.departAirport} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.departTime} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.arriveAirport} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.arriveTime} justify='center'/>
                    </div>
                  </div>
                )
              })
            }
            {
              airlineReserveState.ticketingState.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                      <TitleBox width="100px" text='발권처'/>
                      <TextBoxPL10 width="50%" text={item.ticketBooth} />
                    </div>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                      <TitleBox width="100px" text='항공료'/>
                      <TextBoxPL10 width="50%" text={item.company} />
                    </div>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
                      <TitleBox width="100px" text='발권일'/>
                      <TextBoxPL10 width="50%" text={item.date} />
                    </div>
                    <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                      <TitleBox width="100px" text='발권완료확인'/>
                      <TextBoxPL10 width="50%" text={item.ticketing} />
                    </div>
                  </div>
                )
              })
            }
          </section>
          
          <section>
            <h1>6. 호텔 예약현황</h1>
            <div className="bottombar"></div>
            <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#f6f6f6' }}>
              <TitleBox width="3%" text=''/>
              <div style={{display:'flex', alignItems:'center', width:'300px', justifyContent:'center'}}>
                <TitleBox width="80px" text='체크인'/>
                <p>~</p>
                <TitleBox width="80px" text='체크아웃'/>
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
                      <TextBoxPL10 width="300px" text={`${item.checkIn} ${item.checkOut}`} justify='center'/>
                      <TextBoxPL10 width="20%" text={item.location} justify='center'/>
                      <TextBoxPL10 width="20%" text={item.hotelName} justify='center'/>
                      <TextBoxPL10 width="15%" text={item.roomType} justify='center'/>
                      <TextBoxPL10 width="10%" text={item.days} justify='center'/>
                    </div>
                  </div>
                )
              })
            }
          </section>
     
          <section>
            <h1>7. 적립금/할인혜택/사은품/여행자보험 관리</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='할인행사'/>
                <TextBoxPL10 width="50%" text={etcState.salesEvent}/>
                <TextBoxPL10 width="30%" text={etcState.salesEventCost}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='적립금'/>
                <TextBoxPL10 width="50%" text={etcState.saveMoney}/>
                <TextBoxPL10 width="30%" text={etcState.saveMoneyCost}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='계약혜택'/>
                <TextBoxPL10 width="80%" text={etcState.contractBenefit}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="100px" text='사은품'/>
                <TextBoxPL10 width="50%" text={etcState.freeGift}/>
                <TextBoxPL10 width="30%" text={etcState.freeGiftCost}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow third">
                <TitleBox width="100px" text='여행자보험'/>
                <TextBoxPL10 width="50%" text={etcState.insuranceIncludes}/>
              </div>
              <div className="coverrow third">
                <TitleBox width="100px" text='보험회사'/>
                <TextBoxPL10 width="50%" text={etcState.insuranceCompany}/>
              </div>
              <div className="coverrow third">
                <TitleBox width="100px" text='계약금액'/>
                <TextBoxPL10 width="50%" text={etcState.insuranceCost}/>
              </div>
            </div>
          </section>

          <section>
            <h1>8. 입금내역</h1>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="100px" text='1인요금' height={160}/>
                <div style={{flex:1}}>
                {
                  depositCostInfo.personalCost.map((item:any, index:any)=>{
                    return (
                    <div style={{display:'flex', alignItems:'center'}} key={index}>
                      <TextBoxPL10 width="15%" text={item.currency}/>
                      <p style={{margin:'0 10px'}}>{item.sort}</p>
                      <TextBoxPL10 width="35%" text={item.cost}/>
                      <p style={{marginRight:'10px'}}>원</p>
                      <TextBoxPL10 width="15%" text={item.num}/>
                      <p>명</p>
                    </div>
                    )
                  })
                }
              </div>
              </div>
              <div className="coverrow half">
                <TitleBox width="100px" text='총요금' height={160}/>
                <TextBoxPL10 width="50%" text={depositCostInfo.personalCostAll} justify='flex-end'/>
                <p>원</p>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow third">
                <TitleBox width="100px" text='할인요금' />
                <TextBoxPL10 width="50%" text={depositCostInfo.discountCost} justify='flex-end'/>
                <p>원</p>
              </div>
              <div className="coverrow third">
                <TitleBox width="100px" text='추가요금'/>
                <TextBoxPL10 width="50%" text={depositCostInfo.additionCostAll} justify='flex-end'/>
                <p>원</p>
              </div>
              <div className="coverrow third">
                <TitleBox width="100px" text='최종요금'/>
                <TextBoxPL10 width="50%" text={depositCostInfo.resultCost} justify='flex-end'/>
                <p>원</p>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow dubbleThird">
                <TitleBox width="100px" text='할인행사사은품'/>
                <TextBoxPL10 width="50%" text={depositCostInfo.freeGift} justify='flex-start'/>
              </div>
              <div className="coverrow third">
                <TitleBox width="100px" text='적립금'/>
                <TextBoxPL10 width="50%" text={depositCostInfo.savedMoney} justify='flex-end'/>
                <p>원</p>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow rightborder" style={{width:'40%'}}>
                <TitleBox width="100px" text='계약금액'/>
                <TextBoxPL10 width="40%" text={depositCostInfo.tourTotalContractCost} justify='flex-end'/>
                <p>원</p>
              </div>
              <div className="coverrow" style={{width:'60%' , fontSize:'14px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <h3 style={{marginRight:'20px'}}>최종 여행 경비:</h3>
                <TextBoxPL10 width="40%" text={depositCostInfo.totalCost} justify='right'/>
                <p>원</p>
              </div>
            </div>
            <DepositCostInfMapBox originitem={depositCostInfo.contractCost} title='계약금' length={depositCostInfo.contractCost.length}/>
            <DepositCostInfMapBox originitem={depositCostInfo.airportCost} title='헝공료' length={depositCostInfo.airportCost.length}/>
            <DepositCostInfMapBox originitem={depositCostInfo.reviseAirportCost} title='항공료변경' length={depositCostInfo.reviseAirportCost.length}/>
            <DepositCostInfMapBox originitem={depositCostInfo.middleCost} title='중도금' length={depositCostInfo.middleCost.length}/>
            <DepositCostInfMapBox originitem={depositCostInfo.restCost} title='잔금' length={depositCostInfo.restCost.length}/>
            <DepositCostInfMapBox originitem={depositCostInfo.additionCost} title='추가경비' length={depositCostInfo.additionCost.length}/>
            <div className="coverbox">
              <div className="coverrow rightborder" style={{width:'40%'}}>
                <TitleBox width="100px" text='환불'/>
                <TextBoxPL10 width="40%" text={depositCostInfo.refundCost.cost} justify='flex-end'/>
                <p>원</p>
              </div>
              <div className="coverrow" style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <TextBoxPL10 width="80%" text={depositCostInfo.refundCost.date} justify='center'/>
              </div>
            </div>
          </section>

         <section>
            <h1>9. OT 및 고객전달 사항</h1>
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
              deliveryInfo.map((item:any, index:any)=>{
                return (
                  <div className="coverbox" key={index}>
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
              <div className="content-menu-btn-box">
                <div className={isSelectedMenuBtn === '온라인계약서' ? "content-menu-btn selected" : "content-menu-btn"}
                  style={{width:'50%'}}
                 onClick={()=>{setIsSelectedMenuBtn('온라인계약서');}}
                >온라인계약서</div>
                <div className={isSelectedMenuBtn === '수배내역' ? "content-menu-btn selected" : "content-menu-btn"}
                  style={{width:'50%'}}
                  onClick={()=>{setIsSelectedMenuBtn('수배내역');}}
                >수배내역</div>
              </div>
              <div className="content-menu-btn-box">
                <div className={isSelectedMenuBtn === '진행상황' ? "content-menu-btn selected" : "content-menu-btn"}
                 onClick={()=>{setIsSelectedMenuBtn('진행상황');}}
                >진행상황/Log</div>
                <div className={isSelectedMenuBtn === '문의답변' ? "content-menu-btn selected" : "content-menu-btn"}
                  onClick={()=>{setIsSelectedMenuBtn('문의답변');}}
                >문의답변/Log</div>
                <div className={isSelectedMenuBtn === '변경내역' ? "content-menu-btn selected" : "content-menu-btn"}
                  onClick={()=>{setIsSelectedMenuBtn('변경내역');}}
                >변경내역/Log</div>
                <div className={isSelectedMenuBtn === '알림톡' ? "content-menu-btn selected" : "content-menu-btn"}
                  onClick={()=>{setIsSelectedMenuBtn('알림톡');}}
                >알림톡/Log</div>
              </div>
            </section>

            {
              isSelectedMenuBtn === '온라인계약서' &&
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
                    <DateBoxSingle setSelectDate={''} date={''} marginLeft={5}/>
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
            }
            
            {
              isSelectedMenuBtn === '수배내역' &&
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
                          <DateBoxSingle setSelectDate={''} date={''} marginLeft={5}/>
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
            }

            {
              isSelectedMenuBtn === '진행상황' &&
              <>
                <section>
                  <h1>진행상황</h1>
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
              </>
            }

          </div>
        </div>

      </div>

        {/* 예약수정 모달창 */}
            {/* {
        isViewReserveModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalReserve
              // modalSort='revise'
              // serialNum={serialNum}
              // fetchPosts={fetchPosts}
              // setIsViewModal={setIsViewReserveModal}
              // refresh={refresh}
              // setRefresh={setRefresh}
              
              reserveState={reserveState}
              workState={workState}
              productName={productName}
              landCompany={landCompany}
              visitPath={visitPath}
              charger={charger}

              userInfo={userInfo}
              visitPathInfo={visitPathInfo}
              productInfo={productInfo}
              airlineReserveState={airlineReserveState}
              hotelReserveState={hotelReserveState}
              etcState={etcState}
              depositCostInfo={depositCostInfo}
              deliveryInfo={deliveryInfo}
             />
          </div>
        </div>
      } */}

    </div>
    :
    <Loading />     
  )
}
