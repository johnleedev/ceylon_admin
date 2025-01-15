import React, { useEffect, useState } from 'react'
import './ReservePage.scss'
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { FaRegCheckCircle } from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { TitleBox } from '../../../../boxs/TitleBox';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDownAirline, DropDowncharger, DropDownDeliveryType, DropDownDepositType, DropDownLandCompany, DropDownNum, DropDownTourLocation, DropDownVisitPath } from '../../../DefaultData';
import { FaPlus } from "react-icons/fa";
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';
import { useRecoilState } from 'recoil';
import { recoilExchangeRate } from '../../../../RecoilStore';
import { AirlineReserveStateProps, DeliveryInfoProps, DepositCostInfoProps, EtcStateProps, HotelReserveStateProps,
         ProductInfoProps, ReserveStateProps, UserInfoProps, VisitPathInfoProps, 
         WorkStateProps} from '../../InterfaceData';
import { differenceInDays, format, parseISO } from 'date-fns';
import { FaCheck } from "react-icons/fa";
import { DateBoxSingle } from '../../../../boxs/DateBoxSingle';
import { useLocation } from 'react-router-dom';

export default function ReservePage (props : any) {

  const originDate = new Date();
  const todayDate = format(originDate, 'yyyy-MM-dd');
  const location = useLocation(); 
  const serialNum = location.state.serialNum;
  const modalSort = location.state.modalSort;

  const [inputState, setInputState] = useState(modalSort);
    
  // 환율 정보 ---------------------------------------------------------------------------------------------------------------------
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
  

  // 예약최초 등록 및 삭제 함수 -----------------------------------------------------------------------------------------------------------
  const isCancel = async () => {
    if (inputState === 'new') {
      const result = window.confirm(`
데이터가 저장되지 않은 상태입니다. 
이전까지 입력된 모든 정보가 삭제됩니다. 
예약 등록을 취소하시겠습니까? 
`);
      if (result) {
        props.setIsViewModal(false);
      } else {
        return
      }
    } else {
      props.setIsViewModal(false);
      props.setRefresh(!props.refresh);
    }
  };
  

  // useState -----------------------------------------------------------------------------------------------------------

  const userInfoData = [
    { userNum: 1, sort : '성인', nameKo: '', nameLast: '', nameFirst: '', birth: '', gender: '남', nation: '한국', passportNum: '', passportDate: '', residentNum : '', phone: ''},
    { userNum: 2, sort : '성인', nameKo: '', nameLast: '', nameFirst: '', birth: '', gender: '남', nation: '한국', passportNum: '', passportDate: '', residentNum : '', phone: ''}
  ]
  const visitPathInfoData = {reserveLocation : '', charger:'', accepter: '', visitPath:'', visitPathDetail : '', recommender:''}
  const productInfoData = { tourLocation : '', tourLocationDetail : '', productName : '', 
    airline : [""], landCompany : [{companyName: "", notice: ""}],
    tourStartAirport : '', tourStartPeriod : '', tourEndAirport : '', tourEndPeriod : '',
    costAdult: '', costAdultNum: 1, costChild: '', costChildNum : 1, costInfant: '', costInfantNum: 1, costAll: '',
    reserveExchangeRate : recoilExchangeRateCopy[0].KRW, isNotice: false, isClientCheck: false
  }
  const airlineReserveStateData = {
    isCustomerTicketing : false,
    airlineState : [{ departDate: '', arriveDate:'', airlineCompany : '', airlineName : '', departAirport : '', departTime : '', arriveAirport:'', arriveTime:'', state:'' }],
    ticketingState : [{ ticketBooth: '', ticketCost: '', date: '', isTicketing: false }]
  }
  const depositCostInfoData = {
    tourTotalContractCost : '', costListSum : '',
    personalCost : {costAdult: '', costAdultNum: 1, costChild: '', costChildNum : 1, costInfant: '', costInfantNum: 1, costAll: ''},
    freeGift : '', savedMoney : '', discountCost: '', additionCostAll: '', resultCost:'',
    contractCost : [{nameko: '계약금', cost: '', date: '', type: '', deposit: false}],
    airportCost : [{nameko: '항공료', cost: '', date: '', type: '', deposit: false}],
    reviseAirportCost : [{nameko: '항공료변경', cost: '', date: '', type: '', deposit: false}],
    middleCost : [{nameko: '중도금', cost: '', date: '', type: '', deposit: false}],
    restCost : [{nameko: '잔금', cost: '', date: '', type: '', deposit: false}],
    additionCost : [{nameko: '추가경비', cost: '', date: '', type: '', deposit: false}],
    refundCost : {nameko: '환불', cost: '', date: ''},
    totalCost :'', ballance : '', cashBillInfo : { type: '', userNum:'', authNum: '', date: ''}
  }
  const deliveryInfoData = [
    {name:'e-Ticket', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
    {name:'Visa/ESTA', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
    {name:'확정서', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
    {name:'여행준비물', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
    {name:'캐리어사은품', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
    {name:'해피콜', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
    {name:'환불/과입금', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''}
  ]

  const [reserveState, setReserveState] = useState<ReserveStateProps>(modalSort === 'revise' ? location.state.reserveState 
    : {contractCompleted : false, ticketIssued : false, reserveConfirm : false, fullPayReceived : false, departNoticeSent : false});
  const [workState, setWorkState] = useState<WorkStateProps>(modalSort === 'revise' ? location.state.workState 
    : {progressNoticeSent : false, eticketSent : false, scheduleSent : false, passportVerify : false, tourPrepare : false,
      visaEsta  : false, voucherSent : false, remainPayRequest : false, confirmationSent : false, guideBook : false});
  const [productName, setProductName] = useState(modalSort === 'revise' ? location.state.productName : '');
  const [landCompany, setLandCompany] = useState(modalSort === 'revise' ? location.state.landCompany : '');
  const [visitPath, setVisitPath] = useState(modalSort === 'revise' ? location.state.visitPath : '');
  const [charger, setCharger] = useState(modalSort === 'revise' ? location.state.charger : '');
  
  const [userInfo, setUserInfo] = useState<UserInfoProps[]>(modalSort === 'revise' ? location.state.userInfo : userInfoData );
  const [visitPathInfo, setVisitPathInfo] = useState<VisitPathInfoProps>(modalSort === 'revise' ? location.state.visitPathInfo : visitPathInfoData );
  const [productInfo, setProductInfo] = useState<ProductInfoProps>(modalSort === 'revise' ? location.state.productInfo : productInfoData );
  const [airlineReserveState, setAirlineReserveState] = useState<AirlineReserveStateProps>( modalSort === 'revise' ? location.state.airlineReserveState : airlineReserveStateData)
  const [hotelReserveState, setHotelReserveState] = useState<HotelReserveStateProps[]>(modalSort === 'revise' ? location.state.hotelReserveState
    : [{ checkIn : '', checkOut : '', location : '', hotelName: '', roomType : '', days: '' }])
  const [etcState, setEtcState] = useState<EtcStateProps>(modalSort === 'revise' ? location.state.etcState
    : { salesEvent : '', salesEventCost : '', saveMoney : '', saveMoneyCost : '', contractBenefit  : '',
      freeGift : '', freeGiftCost : '', insuranceIncludes : '', insuranceCompany : '동부화재', insuranceCost : '' })
  const [depositCostInfo, setDepositCostInfo] = useState<DepositCostInfoProps>(modalSort === 'revise' ? location.state.depositCostInfo : depositCostInfoData )
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfoProps[]>(modalSort === 'revise' ? location.state.deliveryInfo : deliveryInfoData );

  
  // 고객정보 -----------------------------------------------------------------------------------------------------------

  // 유저정보 변경
  const handleUserInfo = async (e:any, index:number, name:string) => {
    const text = e.target.value; 
    const inputs = [...userInfo]; 
    if (text.includes('-')) {
      (inputs[index] as any)[name] = text.replace(/-/g, '');
      setUserInfo(inputs);
      return;
    }
    if (isNaN(text)) {
      alert('숫자만 입력가능합니다.')
      return;
    }
    if (name === 'birth' || name === 'passportDate') {
      if (text.length === 8) {
        const year = text.substring(0, 4);
        const month = text.substring(4, 6);
        const day = text.substring(6, 8);
        const date = `${year}-${month}-${day}`;
        (inputs[index] as any)[name] = date;
        setUserInfo(inputs);
      } else {
        (inputs[index] as any)[name] = text;
        setUserInfo(inputs);
      }
    } else if (name === 'residentNum') {
      if (text.length === 13) {
        const num1 = text.substring(0, 6);
        const num2 = text.substring(6, 13);
        const result = `${num1}-${num2}`;
        inputs[index].residentNum = result;
        setUserInfo(inputs);
      } else {
        inputs[index].residentNum = text;
        setUserInfo(inputs);
      }
    } else if (name === 'phone') {
      if (text.length === 11) {
        const num1 = text.substring(0, 3);
        const num2 = text.substring(3, 7);
        const num3 = text.substring(7, 13);
        const result = `${num1}-${num2}-${num3}`;
        inputs[index].phone = result;
        setUserInfo(inputs);
      } else {
        inputs[index].phone = text;
        setUserInfo(inputs);
      }
    }
  };

  
  // 상품정보 ---------------------------------------------------------------------------------------------------------------------------------------

  // 입력된숫자 금액으로 변경
  const handleProductInfoCostChange = async (e: React.ChangeEvent<HTMLInputElement>, name:string)  => {
    const text = e.target.value;
    if (text === '') {
      setProductInfo(prevState => ({...prevState, [name]: ''}))
    }
    const inputNumber = parseInt(text.replace(/,/g, ''));
    if (isNaN(inputNumber)) {
      return;
    }
    const formattedNumber = inputNumber.toLocaleString('en-US');
    setProductInfo(prevState => ({
      ...prevState,
      [name]: formattedNumber,
    }));
  };

  // 인원 변경
  const handlePersonNumChange = async (e:any, name:string) => {
    const text = e.target.value; 
    const num = parseInt(text)
    setProductInfo(prev => ({
      ...prev, [name]: num,
    }));
  };
 
  useEffect(() => {
    const costAdultCopy = productInfo.costAdult === '' ? 0 : parseInt(productInfo.costAdult.replace(/,/g, ''));
    const costChildCopy = productInfo.costChild === '' ? 0 : parseInt(productInfo.costChild.replace(/,/g, ''));
    const costInfantCopy = productInfo.costInfant === '' ? 0 : parseInt(productInfo.costInfant.replace(/,/g, ''));
    const allCost = (costAdultCopy * productInfo.costAdultNum) + (costChildCopy * productInfo.costChildNum) + (costInfantCopy * productInfo.costInfantNum);
    const formattedAllCost = allCost.toLocaleString('en-US');
    setProductInfo(prevState => ({
      ...prevState,
      costAll: formattedAllCost,
    }));
    
  }, [productInfo.costAdult, productInfo.costAdultNum, productInfo.costChild, productInfo.costChildNum, productInfo.costInfant, productInfo.costInfantNum]);


  // 입금내역 ---------------------------------------------------------------------------------------------------------------------------------------

  // 입력된숫자 금액으로 변경
  const handleDepositPersonalCostChange = async (e: React.ChangeEvent<HTMLInputElement>, name:string)  => {
    const text = e.target.value;
    const copy = {...depositCostInfo}
    if (text === '') {
      (copy.personalCost as any)[name] = ''; 
      setDepositCostInfo(copy);
    }
    const inputNumber = parseInt(text.replace(/,/g, ''));
    if (isNaN(inputNumber)) {
      return;
    }
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy.personalCost as any)[name] = formattedNumber;
    setDepositCostInfo(copy);
  };

  // 인원 변경
  const handleDepositNumChange = async (e:any, name:string) => {
    const copy = {...depositCostInfo}
    const text = e.target.value; 
    const num = parseInt(text);
    (copy.personalCost as any)[name] = num; 
    setDepositCostInfo(copy);
  };

  useEffect(() => {
    const copy = {...depositCostInfo};
    const costAdultCopy = depositCostInfo.personalCost.costAdult === '' ? 0 : parseInt(depositCostInfo.personalCost.costAdult.replace(/,/g, ''));
    const costChildCopy = depositCostInfo.personalCost.costChild === '' ? 0 : parseInt(depositCostInfo.personalCost.costChild.replace(/,/g, ''));
    const costInfantCopy = depositCostInfo.personalCost.costInfant === '' ? 0 : parseInt(depositCostInfo.personalCost.costInfant.replace(/,/g, ''));
    const allCost = (costAdultCopy * depositCostInfo.personalCost.costAdultNum) + (costChildCopy * depositCostInfo.personalCost.costChildNum) + (costInfantCopy * depositCostInfo.personalCost.costInfantNum);
    const formattedAllCost = allCost.toLocaleString('en-US');
    copy.personalCost.costAll = formattedAllCost;
    setDepositCostInfo(copy);
  }, [depositCostInfo.personalCost.costAdult, depositCostInfo.personalCost.costAdultNum, depositCostInfo.personalCost.costChild, depositCostInfo.personalCost.costChildNum, depositCostInfo.personalCost.costInfant, depositCostInfo.personalCost.costInfantNum]);

  const handleDepositCostChange = async (e: React.ChangeEvent<HTMLInputElement>, category:keyof DepositCostInfoProps)  => {
    const copy = {...depositCostInfo};
    const text = e.target.value;
    if (text === '') {
      (copy as any)[category] = '';
      setDepositCostInfo(copy);
    }
    const inputNumber = parseInt(text.replace(/,/g, ''));
    if (isNaN(inputNumber)) {
      return;
    }
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy as any)[category] = formattedNumber;
    setDepositCostInfo(copy);
  }

  // 각 항목 입력된숫자 cost 금액으로 변경
  const handleDepositRowCostChange = async (e: React.ChangeEvent<HTMLInputElement>, index:number, category:keyof DepositCostInfoProps)  => {
    const inputs = {...depositCostInfo};
    const text = e.target.value;
    if (text === '') {
      (inputs[category] as { cost: string }[])[index].cost = '';
      setDepositCostInfo(inputs);
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {
      return
    } 
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (inputs[category] as { cost: string }[])[index].cost = formattedNumber; 
    setDepositCostInfo(inputs); 
  };

  // 각 costList 내용 변경
  const handleCostDateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | string,
    index: number,
    category: keyof DepositCostInfoProps,
    name: 'date' | 'type' | 'deposit'
  ) => {
    const updatedData = { ...depositCostInfo };
  
    if (category in updatedData) {
      const categoryData = updatedData[category] as { date: string; type: string; deposit: boolean }[];
  
      if (name === 'date' && typeof e === 'string') {
        categoryData[index].date = e;
      } else if (typeof e !== 'string') {
        if (name === 'type' && e.target instanceof HTMLSelectElement) {
          // `type` 처리: HTMLSelectElement의 value 사용
          categoryData[index].type = e.target.value;
        } else if (name === 'deposit' && e.target instanceof HTMLInputElement) {
          // `deposit` 처리: HTMLInputElement의 checked 사용
          categoryData[index].deposit = e.target.checked;
        }
      }
    }
    setDepositCostInfo(updatedData);
  };
  

  // costList(계약금+항공료+중도금+잔금) 합계 계산
  useEffect(() => {
    const inputs = {...depositCostInfo};
    const calculateTotalCost = (costArray: { cost: string }[]) => {
      return costArray.reduce((sum, item) => {
        const costValue = item.cost === '' ? 0 : parseInt(item.cost.replace(/,/g, ''), 10);
        return sum + (isNaN(costValue) ? 0 : costValue);
      }, 0);
    };
    const contractCostTotal = calculateTotalCost(inputs.contractCost);
    const airportCostTotal = calculateTotalCost(inputs.airportCost);
    const middleCostTotal = calculateTotalCost(inputs.middleCost);
    const restCostTotal = calculateTotalCost(inputs.restCost);
    const totalCost = contractCostTotal + airportCostTotal + middleCostTotal + restCostTotal;
    const formattedTotal = totalCost.toLocaleString('en-US');
    inputs.costListSum = formattedTotal;
    setDepositCostInfo(inputs); 
  }, [depositCostInfo.contractCost, depositCostInfo.airportCost, depositCostInfo.middleCost, depositCostInfo.restCost,]);
  

  // 최종경비 합계 계산
  useEffect(() => {
    const inputs = {...depositCostInfo};
    const calculateTotalCost = (costArray: { cost: string }[]) => {
      return costArray.reduce((sum, item) => {
        const costValue = item.cost === '' ? 0 : parseInt(item.cost.replace(/,/g, ''), 10);
        return sum + (isNaN(costValue) ? 0 : costValue);
      }, 0);
    };
    const tourTotalContractCostCopy = inputs.tourTotalContractCost === '' ? 0 : parseInt(inputs.tourTotalContractCost.replace(/,/g, ''), 10);
    const additionCostCopy = calculateTotalCost(inputs.additionCost); // 배열 전체 합산
    const totalCost = tourTotalContractCostCopy + additionCostCopy;
    const formattedTotalCost = totalCost.toLocaleString('en-US');
    inputs.totalCost = formattedTotalCost;
    setDepositCostInfo(inputs); 
  }, [depositCostInfo.tourTotalContractCost, depositCostInfo.additionCost]);
  

  // 밸런스 계산
  useEffect(() => {
    const inputs = {...depositCostInfo};
    const costListSumCopy = inputs.costListSum === '' ? 0 : parseInt(inputs.costListSum.replace(/,/g, ''), 10);
    const tourTotalContractCostCopy = inputs.tourTotalContractCost === '' ? 0 : parseInt(inputs.tourTotalContractCost.replace(/,/g, ''), 10);
    let result = "0.00";
    if (tourTotalContractCostCopy > 0) {
      const copy = (costListSumCopy / tourTotalContractCostCopy) * 100;
      result = copy.toFixed(2);
    }
    inputs.ballance = result;
    setDepositCostInfo(inputs); 
  }, [depositCostInfo.costListSum, depositCostInfo.tourTotalContractCost]);
  

  // 고객전달사항 ---------------------------------------------------------------------------------------------------------------------------------------
  const handleRequestChange = (e:any, index:any, name:string) => {
    const inputs = [...deliveryInfo];
    if ( name === 'requestDate' || name === 'completeDate') {
      (inputs[index] as any)[name] = e; 
    } else {
      (inputs[index] as any)[name] = e.target.value; 
    }
    setDeliveryInfo(inputs);
  };


  // 데이터 저장 함수 ----------------------------------------------------------------------------
  const handleReserveSave = async () => {
    const data = {
      serialNum : serialNum,
      reserveDate : modalSort === 'new' ? todayDate : '',
      reviseDate : modalSort === 'new' ? '' : todayDate,
      reserveState : JSON.stringify(reserveState),
      workState : JSON.stringify(workState),
      productName : productName,
      landCompany : landCompany,
      visitPath : visitPath,
      charger : charger,
      userInfo : JSON.stringify(userInfo),
      visitPathInfo : JSON.stringify(visitPathInfo),
      productInfo : JSON.stringify(productInfo),
      airlineReserveState : JSON.stringify(airlineReserveState),
      hotelReserveState : JSON.stringify(hotelReserveState),
      etcState : JSON.stringify(etcState),
      depositCostInfo : JSON.stringify(depositCostInfo),
      deliveryInfo : JSON.stringify(deliveryInfo)
    }
    if (modalSort === 'new') {
      await axios
      .post(`${MainURL}/adminreserve/registerreserveinfo`, data)
      .then((res)=>{
        if (res.data) {
          alert('저장되었습니다.');
          setInputState('revise');
        }
      })
      .catch((err)=>{
        alert(`다시 시도해주세요 ${err}`)
      })
    } else if (modalSort === 'revise') {
      await axios
      .post(`${MainURL}/adminreserve/revisereserveinfo`, data)
      .then((res)=>{
        if (res.data) {
          alert('수정되었습니다.');
        }
      })
      .catch((err)=>{
        alert(`다시 시도해주세요 ${err}`)
      })
    } 
  };
  
  const [visitPathDetailOptions, setVisitPathDetailOptions] = useState(
    [{ value: '선택', label: '선택' },{ value: '웹', label: '웹' },{ value: '앱', label: '앱' },{ value: '랜딩페이지', label: '랜딩페이지' },{ value: '직접방문', label: '직접방문' }])
  const handleVisitPathDetail = (text:string) => {
    if (text === '고객소개' || text === '직원소개/지인'){
      const copy = {...visitPathInfo}
      copy.visitPath = text;
      copy.visitPathDetail = '';
      setVisitPathInfo(copy);
      setVisitPath(text);
    } else {
      const copy = {...visitPathInfo}
      copy.visitPath = text;
      setVisitPathInfo(copy);
      setVisitPath(text);
      if (text === '워킹-견적' || text === '워킹-방문') {
        const copy = [
          { value: '선택', label: '선택' },
          { value: '웹', label: '웹' },
          { value: '앱', label: '앱' },
          { value: '랜딩페이지', label: '랜딩페이지' },
          { value: '직접방문', label: '직접방문' }
        ]
        setVisitPathDetailOptions(copy);
      } else if (text === '웨딩컨설팅') {
        const copy = [
          { value: '선택', label: '선택' },
          { value: '웨딩쿨-일반', label: '웨딩쿨-일반' },
          { value: '웨딩쿨-박람회', label: '웨딩쿨-박람회' },
          { value: '웨딩세이-일반', label: '웨딩세이-일반' },
          { value: '웨딩세이-박람회', label: '웨딩세이-박람회' },
          { value: '감공-일반', label: '감공-일반' },
          { value: '감공-박람회', label: '감공-박람회' },
          { value: '커스텀', label: '커스텀' }
        ]
        setVisitPathDetailOptions(copy);
      } else if (text === '협력업체') {
        const copy = [
          { value: '선택', label: '선택' },
          { value: '웨딩샵', label: '웨딩샵' },
          { value: '웨딩홀', label: '웨딩홀' }
        ]
        setVisitPathDetailOptions(copy);
      } 
    }
  }

  // work State Btn Row -----------------------------------------------------------------------------------------
  const SelectWorkTabBox = ({ item, title }: { item: any; title: string }) => (
    <div className={(workState as any)[item] ? "workState-box selected" : "workState-box"}
      onClick={()=>{
        const copy = {...workState};
        (copy as any)[item] = !(copy as any)[item];
        setWorkState(copy);
      }}
    >
      <div className='textbox'>
        <p>{title}</p>
      </div>
      <FaCheck size={12} className='checkbox'/>
    </div>
  )
  
  // EtcSelectBtn -----------------------------------------------------------------------------------------
  const EtcSelectBtn = ({ item, title }: { item: any; title: string }) => ( 
  <>
    <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <input className="input" type="checkbox"
        checked={(etcState as any)[item] === title}
        onChange={()=>{
          setEtcState(prev => ({
            ...prev, [item]: title
          }));
        }}
        style={{width:'20px', height:'20px'}}
      />
    </div>
    <p>{title}</p>
  </>
  )

  return (
    <div className='reserve-page'>
      
      <div className="reserve-top">
        <div className='reserve-top-titleBox'>
          <div style={{display:'flex', alignItems:'center'}}>
            <h1>예약하기</h1>
            <p style={{marginLeft:'10px', color:'#ccc', fontSize:'14px'}}>{serialNum}</p>
          </div>
        </div>

        <section>
          <h1>1. 진행상황</h1>

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

      </div>

      <section>
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
            onClick={()=>{
              handleReserveSave();
            }}
          >
            <p>저장</p>
          </div>
        </div>
      </section>

      {/* 고객정보 ------------------------------------------------------------------------------------------------------------------------ */}
      <div className="reserve-contents">
        <section className='userInfo'>
          <div style={{width:'100%', display:'flex'}}>
            <h1>2. 고객정보</h1>
            <div  className='plusBtnBox'
              onClick={()=>{
                setUserInfo([...userInfo, 
                  { userNum: userInfo.length+1, sort : '성인', nameKo: '', nameLast: '', nameFirst: '', 
                    birth: '', gender: '남', nation: '한국', passportNum: '', passportDate: '', residentNum : '', phone: ''
                  }]);
              }}
            >
              <FaPlus />
            </div>  
          </div>
          <div className="bottombar"></div>
          <div className='content'>
            <div className="coverbox titlerow">
              <TitleBox width='3%' text='NO'/>
              <TitleBox width='5%' text='구분'/>
              <TitleBox width='7%' text='이름'/>
              <TitleBox width='5%' text={`Last.N`}/>
              <TitleBox width='8%' text={`First.N`}/>
              <TitleBox width='10%' text='생년월일'/>
              <TitleBox width='5%' text='성별'/>
              <TitleBox width='7%' text='국적'/>
              <TitleBox width='10%' text='여권번호'/>
              <TitleBox width='10%' text='만료일'/>
              <TitleBox width='12%' text='주민번호'/>
              <TitleBox width='12%' text='연락처'/>
              <TitleBox width='3%' text='삭제'/>
            </div>
            { 
              userInfo.map((item:any, index:any)=>{

                return(
                  <div className="coverbox info" key={index}>
                    <p style={{width:'3%'}}>{item.userNum}</p>
                    <DropdownBox
                      widthmain='5%'
                      height='35px'
                      selectedValue={item.sort}
                      options={[
                        { value: '성인', label: '성인' },
                        { value: '유아', label: '유아' },
                        { value: '소아', label: '소아' },
                      ]}    
                      handleChange={(e)=>{
                        const inputs = [...userInfo]; inputs[index].sort = e.target.value; setUserInfo(inputs);
                      }}
                      marginHorisontal={1}
                    />
                    <input style={{width:'7%'}}  value={item.nameKo} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = [...userInfo]; inputs[index].nameKo = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'5%'}}  value={item.nameLast} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nameLast = e.target.value; setUserInfo(inputs);}}/>
                    <input style={{width:'8%'}}  value={item.nameFirst} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nameFirst = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.birth} className="inputdefault" type="text" placeholder='8자리'
                      onChange={(e)=>{handleUserInfo(e, index, 'birth')}} maxLength={8} />
                    <DropdownBox widthmain='5%' height='35px' selectedValue={item.gender}
                      options={[{ value: '남', label: '남' }, { value: '여', label: '여' }]}   marginHorisontal={1}
                      handleChange={(e)=>{const inputs = [...userInfo]; inputs[index].gender = e.target.value; setUserInfo(inputs);}}
                    />
                    <input style={{width:'7%'}}  value={item.nation} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].nation = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.passportNum} className="inputdefault" type="text" 
                      onChange={(e)=>{const inputs = [...userInfo]; inputs[index].passportNum = e.target.value; setUserInfo(inputs);}} />
                    <input style={{width:'10%'}}  value={item.passportDate} className="inputdefault" type="text"
                      onChange={(e)=>{handleUserInfo(e, index, 'passportDate');}} maxLength={8} />
                    <input style={{width:'12%'}}  value={item.residentNum} className="inputdefault" type="text" placeholder='13자리'
                      onChange={(e)=>{handleUserInfo(e, index, 'residentNum')}} maxLength={13} />
                    <input style={{width:'12%'}}  value={item.phone} className="inputdefault" type="text" placeholder='11자리'
                      onChange={(e)=>{handleUserInfo(e, index, 'phone')}} maxLength={11}/>
                    <div style={{width:'3%', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}
                      className='minus-btn-box' onClick={()=>{
                          const copy = [...userInfo];
                          const filter = copy.filter((e:any)=> e.userNum !== item.userNum );
                          setUserInfo(filter);  
                        }} >
                      <CiCircleMinus className='minus-btn'/>
                    </div>
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
              <TitleBox width='120px' text='예약지점'/>
              <DropdownBox
                widthmain='30%'
                height='35px'
                selectedValue={visitPathInfo.reserveLocation}
                options={[
                  { value: '대구', label: '대구' },
                  { value: '서울', label: '서울' },
                  { value: '부산', label: '부산' },
                  { value: '창원', label: '창원' },
                  { value: '울산', label: '울산' }
                ]}    
                handleChange={(e)=>{
                  const copy = {...visitPathInfo}
                  copy.reserveLocation = e.target.value;
                  setVisitPathInfo(copy);
                }}
              />
            </div>
            <div className="coverrow half">
              <TitleBox width='120px' text='담당자'/>
              <h3 style={{marginLeft:'10px'}}>계약자</h3>
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={visitPathInfo.charger}
                options={DropDowncharger}    
                handleChange={(e)=>{
                  const copy = {...visitPathInfo}
                  copy.charger = e.target.value;
                  setVisitPathInfo(copy);
                  setCharger(copy);
                }}
              />
              <h3 style={{marginLeft:'20px'}}>인수자</h3>
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={visitPathInfo.accepter}
                options={DropDowncharger}    
                handleChange={(e)=>{
                  const copy = {...visitPathInfo}
                  copy.accepter = e.target.value;
                  setVisitPathInfo(copy);
                }}
              />         
            </div>
          </div>

          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width='120px' text='방문경로'/>
              <DropdownBox
                widthmain='30%'
                height='35px'
                selectedValue={visitPath}
                options={[
                  { value: '선택', label: '선택' },
                  { value: '워킹-견적', label: '워킹-견적' },
                  { value: '워킹-방문', label: '워킹-방문' },
                  { value: '웨딩컨설팅', label: '웨딩컨설팅' },
                  { value: '협력업체', label: '협력업체' },
                  { value: '고객소개', label: '고객소개' },
                  { value: '직원소개/지인', label: '직원소개/지인' }
                ]}
                handleChange={(e)=>{
                  handleVisitPathDetail(e.target.value);
                }}
              />
              {
                (visitPathInfo.visitPath === '워킹-견적' || visitPathInfo.visitPath === '워킹-방문' || visitPathInfo.visitPath === '웨딩컨설팅' || visitPathInfo.visitPath === '협력업체' ) &&
                <DropdownBox
                  widthmain='30%'
                  height='35px'
                  selectedValue={visitPathInfo.visitPathDetail}
                  options={visitPathDetailOptions}
                  handleChange={(e)=>{
                    const copy = {...visitPathInfo}
                    copy.visitPathDetail = e.target.value;
                    setVisitPathInfo(copy);
                  }}
                />
              }
            </div>
            <div className="coverrow half">
              <TitleBox width='120px' text='추천인'/>
              <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
                value={visitPathInfo.recommender} onChange={(e)=>{
                  const copy = {...visitPathInfo}
                  copy.recommender = e.target.value;
                  setVisitPathInfo(copy);
                }}/>
            </div>
          </div>

        </section>
       
      {/* 상품정보 ------------------------------------------------------------------------------------------------------------------------ */}
        <section>
          <h1>4. 상품정보</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='여행지'/>
              <DropdownBox
                widthmain='20%' height='35px' selectedValue={productInfo.tourLocation}
                options={DropDownTourLocation}    
                handleChange={(e)=>{
                  const copy = {...productInfo}
                  copy.tourLocation = e.target.value;
                  setProductInfo(copy);
                }}
              />
              <input style={{width:'40%'}}  value={productInfo.tourLocationDetail} className="inputdefault" type="text" 
                onChange={(e) => {
                  const copy = {...productInfo}
                  copy.tourLocationDetail = e.target.value;
                  setProductInfo(copy);
                }}/>
            </div>
          </div>
          {       
            productInfo.landCompany.map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    <TitleBox width="120px" text={landCompany.length > 1 ? `랜드사${index+1}` : '랜드사'}/>
                    <DropdownBox
                      widthmain='30%' height='35px' selectedValue={item.companyName}
                      options={DropDownLandCompany}    
                      handleChange={(e)=>{
                        const copy = {...productInfo}
                        copy.landCompany[index].companyName = e.target.value;
                        setProductInfo(copy);
                        const inputs = [...landCompany]; 
                        inputs[index].companyName = e.target.value; 
                        setLandCompany(inputs);
                      }}
                    />
                    <input style={{width:'20%', textAlign:'left', marginRight:'5px'}}
                      value={item.notice} className="inputdefault" type="text" 
                      onChange={(e) => {
                        const copy = {...productInfo}
                        copy.landCompany[index].notice = e.target.value;
                        setProductInfo(copy);
                        const inputs = [...landCompany]; 
                        inputs[index].notice = e.target.value; 
                        setLandCompany(inputs);
                      }}/>      
                    {
                      productInfo.landCompany.length === index+1 &&
                      <div className='addBtn'
                        onClick={()=>{
                          const copy = {...productInfo}
                          copy.landCompany = [copy.landCompany[index], { companyName:'', notice:'' }];
                          setProductInfo(copy);
                          const copy2 = [...landCompany, { companyName:'', notice:'' }];
                          setLandCompany(copy2);
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
              <TitleBox width="120px" text='여행상품'/>
              <input style={{width:'60%', marginLeft:'5px'}}  value={productName} className="inputdefault" type="text" 
                onChange={(e) => {
                  const copy = {...productInfo}
                  copy.productName = e.target.value;
                  setProductInfo(copy);
                  setProductName(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='여행기간'/>
              <DropdownBox
                widthmain='10%' height='35px' selectedValue={productInfo.tourStartAirport}
                options={[
                  { value: '출발공항', label: '출발공항' },
                  { value: '인천', label: '인천' },
                  { value: '부산', label: '부산' },
                  { value: '대구', label: '대구' },
                ]}    
                handleChange={(e)=>{
                  const copy = {...productInfo}
                  copy.tourStartAirport = e.target.value;
                  setProductInfo(copy);
                }}
              />
              <DateBoxDouble dateStart={productInfo.tourStartPeriod} dateEnd={productInfo.tourEndPeriod}
                setSelectStartDate={(e:any)=>{
                  const copy = {...productInfo}
                  copy.tourStartPeriod = e;
                  copy.tourEndPeriod = e;
                  setProductInfo(copy);
                }} 
                setSelectEndDate={(e:any)=>{
                  const copy = {...productInfo}
                  copy.tourEndPeriod = e;
                  setProductInfo(copy);
                }} 
              />
            </div>
          </div>
          {
            productInfo.airline.map((item:any, index:any)=>{

              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow hole">
                    <TitleBox width="120px" text={productInfo.airline.length > 1 ? `항공사${index+1}` : '항공사'}/>
                    <DropdownBox
                      widthmain='30%' height='35px' 
                      selectedValue={item}
                      options={DropDownAirline}    
                      handleChange={(e)=>{
                        const copy = {...productInfo}
                        copy.airline[index] = e.target.value;
                        setProductInfo(copy);
                      }}
                    />
                    {
                      productInfo.airline.length === index+1 &&
                      <div className='addBtn'
                        onClick={()=>{
                          const copy = {...productInfo};
                          copy.airline = [copy.airline[index], ""];
                          setProductInfo(copy);
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
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="120px" text='1인요금' height={160}/>
              <div style={{flex:1}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>성인</h3>
                  <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={productInfo.costAdult} className="inputdefault" type="text" 
                    onChange={(e) => {handleProductInfoCostChange(e, 'costAdult')}}/>
                  <p style={{marginRight:'10px'}}>원</p>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={productInfo.costAdultNum}
                    options={DropDownNum}    
                    handleChange={(e)=>{handlePersonNumChange(e, 'costAdultNum')}}
                  />
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>소아</h3>
                  <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={productInfo.costChild} className="inputdefault" type="text" 
                    onChange={(e) => {handleProductInfoCostChange(e, 'costChild')}}/>
                  <p style={{marginRight:'10px'}}>원</p>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={productInfo.costChildNum}
                    options={DropDownNum}    
                    handleChange={(e)=>{handlePersonNumChange(e, 'costChildNum')}}
                  />
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>유아</h3>
                  <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={productInfo.costInfant} className="inputdefault" type="text" 
                    onChange={(e) => {handleProductInfoCostChange(e, 'costInfant')}}/>
                  <p style={{marginRight:'10px'}}>원</p>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={productInfo.costInfantNum}
                    options={DropDownNum}    
                    handleChange={(e)=>{handlePersonNumChange(e, 'costInfantNum')}}
                  />
                  <p>명</p>
                </div>
              </div>
            </div>
            <div className="coverrow half">
              <TitleBox width="120px" text='전체요금' height={160}/>
              <input style={{width:'40%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={productInfo.costAll} className="inputdefault" type="text" 
                  onChange={(e) => {handleProductInfoCostChange(e, 'costAll')}}/>
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
                handleChange={(e)=>{
                  setBase(e.target.value);
                }}
              />
              <input style={{width:'10%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={recoilExchangeRateCopy[0].KRW} className="inputdefault" type="text" 
                    onChange={()=>{}}/>
              <p style={{marginLeft:'20px'}}># 잔금지불시 변동환율 적용여부 공지</p>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={productInfo.isNotice}
                    onChange={()=>{
                      setProductInfo(prev => ({
                        ...prev, isNotice : !productInfo.isNotice,
                      }));
                    }}
                    style={{width:'20px', height:'20px'}}
                  />
                </div>
                <p>공지했음</p>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={productInfo.isClientCheck}
                    onChange={()=>{
                      setProductInfo(prev => ({
                        ...prev, isClientCheck : !productInfo.isClientCheck,
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

        {/* 항공 예약현황 ------------------------------------------------------------------------------------------------------------------------ */}

        <section>
          <div style={{display:'flex', alignItems:'center'}}>
            <h1>5. 항공 예약현황</h1>
            <div className='checkInputCover' style={{marginLeft:'20px'}}>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={!airlineReserveState.isCustomerTicketing}
                  onChange={()=>{
                    const inputs = {...airlineReserveState}; 
                    inputs.isCustomerTicketing = false; 
                    setAirlineReserveState(inputs);
                  }}
                />
              </div>
              <p>발권대행</p>
            </div>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={airlineReserveState.isCustomerTicketing}
                  onChange={()=>{
                    const inputs = {...airlineReserveState}; 
                    inputs.isCustomerTicketing = true; 
                    setAirlineReserveState(inputs);
                  }}
                />
              </div>
              <p>고객직접발권</p>
            </div>
          </div>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#f6f6f6' }}>
            <TitleBox width="300px" text='날짜'/>
            <TitleBox width="10%" text='항공사'/>
            <TitleBox width="10%" text='항공편'/>
            <TitleBox width="10%" text='출발공항'/>
            <TitleBox width="10%" text='출발시간'/>
            <TitleBox width="10%" text='도착공항'/>
            <TitleBox width="10%" text='도착시간'/>
            <TitleBox width="8%" text=''/>
            <TitleBox width="10%" text='상태'/>
            <TitleBox width="7%" text=''/>
          </div>
          {
            airlineReserveState.airlineState.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow hole" style={{justifyContent:'space-between'}}>
                    <div style={{width:'300px'}}>
                      <DateBoxDouble  dateStart={item.departDate} dateEnd={item.arriveDate} marginLeft={5}
                        setSelectStartDate={(e:any) => {
                          const inputs = {...airlineReserveState};
                          inputs.airlineState[index].departDate = e;
                          inputs.airlineState[index].arriveDate = e;
                          setAirlineReserveState(inputs);
                        }} 
                        setSelectEndDate={(e:any) =>{
                          const inputs = {...airlineReserveState};
                          inputs.airlineState[index].arriveDate = e;
                          setAirlineReserveState(inputs);
                        }} 
                      />
                    </div>
                    <DropdownBox
                      widthmain='10%' height='35px' selectedValue={item.airlineCompany}
                      options={DropDownAirline}    
                      handleChange={(e)=>{const inputs = {...airlineReserveState}; inputs.airlineState[index].airlineCompany = e.target.value; setAirlineReserveState(inputs);}}
                    />
                    <input style={{width:'10%', textAlign:'left'}}
                      value={item.airlineName} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = {...airlineReserveState}; inputs.airlineState[index].airlineName = e.target.value; setAirlineReserveState(inputs);}}/>
                    <DropdownBox
                      widthmain='10%' height='35px' selectedValue={item.departAirport}
                      options={[
                        { value: '출발공항', label: '출발공항' },
                        { value: '인천', label: '인천' },
                        { value: '부산', label: '부산' },
                        { value: '대구', label: '대구' },
                      ]}    
                      handleChange={(e)=>{const inputs = {...airlineReserveState}; inputs.airlineState[index].departAirport = e.target.value; setAirlineReserveState(inputs);}}
                    />
                    <input style={{width:'10%', textAlign:'left'}}
                      value={item.departTime} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = {...airlineReserveState}; inputs.airlineState[index].departTime = e.target.value; setAirlineReserveState(inputs);}}/>
                    <DropdownBox
                      widthmain='10%' height='35px' selectedValue={item.arriveAirport}
                      options={[
                        { value: '출발공항', label: '출발공항' },
                        { value: '인천', label: '인천' },
                        { value: '부산', label: '부산' },
                        { value: '대구', label: '대구' },
                      ]}    
                      handleChange={(e)=>{const inputs = {...airlineReserveState}; inputs.airlineState[index].arriveAirport = e.target.value; setAirlineReserveState(inputs);}}
                    />
                    <input style={{width:'8%', textAlign:'left'}}
                      value={item.arriveTime} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = {...airlineReserveState}; inputs.airlineState[index].arriveTime = e.target.value; setAirlineReserveState(inputs);}}/>
                    <div style={{width:'10%', display:'flex', justifyContent:'center'}}>
                      <p className='addBtn' style={{padding:'0 5px', marginRight:'5px'}}
                        onClick={() => {
                          const inputs = {...airlineReserveState};
                          inputs.airlineState[index].arriveTime = `${inputs.airlineState[index].arriveTime}+1D`;
                          setAirlineReserveState(inputs);
                        }}
                      >+1D</p>
                      <p className='addBtn' style={{padding:'0 5px'}}
                        onClick={() => {
                          const inputs = {...airlineReserveState};
                          inputs.airlineState[index].arriveTime = `${inputs.airlineState[index].arriveTime}+2D`;
                          setAirlineReserveState(inputs);
                        }}
                      >+2D</p>
                    </div>
                    <DropdownBox
                      widthmain='10%' height='35px' selectedValue={item.state}
                      options={[
                        { value: '선택', label: '선택' },
                        { value: '예약', label: '예약' },
                        { value: '대기', label: '대기' },
                        { value: '발권', label: '발권' },
                        { value: '취소', label: '취소' },
                        { value: '재발권', label: '재발권' }
                      ]}    
                      handleChange={(e)=>{const inputs = {...airlineReserveState}; inputs.airlineState[index].state = e.target.value; setAirlineReserveState(inputs);}}
                    />
                    <div style={{width:'7%', display:'flex', justifyContent:'center'}}>
                      <div className='btn-row' style={{marginRight:'5px'}}
                        onClick={()=>{
                          const copy = {...airlineReserveState};
                          copy.airlineState = [...copy.airlineState, 
                            { airlineCompany : '', airlineName:'',  departAirport : '', departDate: '', departTime : '', arriveAirport:'', arriveDate:'', arriveTime:'', state:'' }]
                          setAirlineReserveState(copy)
                        }}
                      >
                        <p>+</p>
                      </div>
                      {
                        (airlineReserveState.airlineState.length > 1 && index !== 0) &&
                        <div className='btn-row' style={{marginRight:'5px'}}
                          onClick={()=>{
                            const copy = {...airlineReserveState};
                            copy.airlineState.splice(index, 1);
                            setAirlineReserveState(copy)
                          }}
                        >
                          <p>-</p>
                        </div>
                      }
                    </div>
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
                    <TitleBox width="30%" text='발권처'/>
                    <input style={{width:'68%', textAlign:'center', marginRight:'3px'}}
                      value={item.ticketBooth} className="inputdefault" type="text" 
                      onChange={(e) => {const inputs = {...airlineReserveState}; inputs.ticketingState[index].ticketBooth = e.target.value; setAirlineReserveState(inputs);}}/>
                  </div>
                  <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                    <TitleBox width="30%" text='항공료'/>
                    <input style={{width:'68%', textAlign:'right', marginRight:'3px'}}
                      value={item.ticketCost} className="inputdefault" type="text" 
                      onChange={(e) => {
                        const copy = {...airlineReserveState}; 
                        const text = e.target.value;
                        if (text === '') {
                          copy.ticketingState[index].ticketCost = ''; 
                          setAirlineReserveState(copy);
                        }
                        const inputNumber = parseInt(text.replace(/,/g, ''));
                        if (isNaN(inputNumber)) {
                          return;
                        }
                        const formattedNumber = inputNumber.toLocaleString('en-US');
                        copy.ticketingState[index].ticketCost = formattedNumber;
                        setAirlineReserveState(copy);
                      }}/>
                  </div>
                  <div className="coverrow quarter" style={{justifyContent:''}} >
                    <TitleBox width="30%" text='발권일'/>
                    <DateBoxSingle date={item.date} marginLeft={5}
                      setSelectDate={(e:any) => {
                        const inputs = {...airlineReserveState};
                        inputs.ticketingState[index].date = e;
                        setAirlineReserveState(inputs);
                      }} 
                    />
                  </div>
                  <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
                    <TitleBox width="30%" text='발권완료확인'/>
                    <div style={{marginLeft: '30px', display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                      <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <input className="input" type="checkbox"
                          checked={item.isTicketing}
                          onChange={()=>{
                            const inputs = {...airlineReserveState}; 
                            if (item.isTicketing) {
                              inputs.ticketingState[index].isTicketing = false;
                              setAirlineReserveState(inputs);
                            } else {
                              inputs.ticketingState[index].isTicketing = true;
                              setAirlineReserveState(inputs);
                            }
                          }}
                          style={{width:'20px', height:'20px'}}
                        />
                      </div>
                    </div>
                    <div style={{width:'20%', display:'flex', justifyContent:'center'}}>
                      <div className='btn-row' style={{marginRight:'5px'}}
                        onClick={()=>{
                          const copy = {...airlineReserveState};
                          copy.ticketingState = [...copy.ticketingState, 
                          { ticketBooth: '', ticketCost:'', date: '', isTicketing: false }]
                          setAirlineReserveState(copy)
                        }}
                      >
                        <p>+</p>
                      </div>
                      {
                        (airlineReserveState.ticketingState.length > 1 && index !== 0) &&
                        <div className='btn-row' style={{marginRight:'5px'}}
                          onClick={()=>{
                            const copy = {...airlineReserveState};
                            copy.ticketingState.splice(index, 1);
                            setAirlineReserveState(copy)
                          }}
                        >
                          <p>-</p>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>

        {/* 호텔 예약현황 ------------------------------------------------------------------------------------------------------------------------ */}
        <section>
          <h1>6. 호텔 예약현황</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#f6f6f6' }}>
            <TitleBox width="3%" text=''/>
            <div style={{display:'flex', alignItems:'center', width:'300px', justifyContent:'center'}}>
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
                    <div style={{display:'flex', alignItems:'center', width:'300px', justifyContent:'center'}}>
                      <DateBoxDouble  dateStart={item.checkIn} dateEnd={item.checkOut} marginLeft={5}
                        setSelectStartDate={(e:any) => {
                          const inputs = [...hotelReserveState];
                          inputs[index].checkIn = e;
                          inputs[index].checkOut = e;
                          setHotelReserveState(inputs);
                        }} 
                        setSelectEndDate={(e:any) =>{
                          const inputs = [...hotelReserveState];
                          inputs[index].checkOut = e;
                          const date1copy = inputs[index].checkIn;
                          const parsedDate1 = parseISO(date1copy);
                          const parsedDate2 = parseISO(e);
                          const diffInDays = differenceInDays(parsedDate2, parsedDate1);
                          inputs[index].days = JSON.stringify(diffInDays);
                          setHotelReserveState(inputs)
                        }} 
                      />
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

        {/* 적립금/할인혜택/사은품/여행자보험 관리 ------------------------------------------------------------------------------------------------------------------------ */}

        <section>
          <h1>7. 적립금/할인혜택/사은품/여행자보험 관리</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='할인행사'/>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <EtcSelectBtn item='salesEvent' title='첫계약혜택'/>
                <EtcSelectBtn item='salesEvent' title='인스타피드'/>
                <EtcSelectBtn item='salesEvent' title='블로그피드'/>
              </div>
              <input style={{width:'20%', textAlign:'left', marginLeft:'15px'}}
                value={etcState.salesEventCost} className="inputdefault" type="text" 
                onChange={(e) => {const inputs = {...etcState}; inputs.salesEventCost = e.target.value; setEtcState(inputs);}}/>
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='적립금'/>
              <input style={{width:'20%', textAlign:'left', marginLeft:'15px'}}
                value={etcState.saveMoneyCost} className="inputdefault" type="text" 
                onChange={(e) => {const inputs = {...etcState}; inputs.saveMoneyCost = e.target.value; setEtcState(inputs);}}/>
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='계약혜택'/>
              <input style={{width:'80%', textAlign:'left', marginLeft:'15px'}}
                value={etcState.contractBenefit} className="inputdefault" type="text" 
                onChange={(e) => {const inputs = {...etcState}; inputs.contractBenefit = e.target.value; setEtcState(inputs);}}/>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='사은품'/>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <EtcSelectBtn item='freeGift' title='물품/상품권선물'/>
                <EtcSelectBtn item='freeGift' title='현금할인'/>
              </div>
              <input style={{width:'20%', textAlign:'left', marginLeft:'15px'}}
                value={etcState.freeGiftCost} className="inputdefault" type="text" 
                onChange={(e) => {const inputs = {...etcState}; inputs.freeGiftCost = e.target.value; setEtcState(inputs);}}/>
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow third">
              <TitleBox width="120px" text='여행자보험'/>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <EtcSelectBtn item='insuranceIncludes' title='포함'/>
                <EtcSelectBtn item='insuranceIncludes' title='불포함'/>
              </div>
            </div>
            <div className="coverrow third">
              <TitleBox width="120px" text='보험회사'/>
              <input style={{width:'70%', textAlign:'left', marginLeft:'5px'}}
                value={etcState.insuranceCompany} className="inputdefault" type="text" 
                onChange={(e) => {const inputs = {...etcState}; inputs.insuranceCompany = e.target.value; setEtcState(inputs);}}/>
            </div>
            <div className="coverrow third">
              <TitleBox width="120px" text='계약금액'/>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <EtcSelectBtn item='insuranceCost' title='해외2억'/>
              </div>
            </div>
          </div>
        </section>


      {/* 입금내역 ------------------------------------------------------------------------------------------------------------------------ */}
        <section className='depositState'>
          <h1>8. 입금내역</h1>
          <div className="bottombar"></div>

          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width="120px" text='1인요금' height={160}/>
              <div style={{flex:1}}>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>성인</h3>
                  <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={depositCostInfo.personalCost.costAdult} className="inputdefault" type="text" 
                    onChange={(e) => {handleDepositPersonalCostChange(e, 'costAdult')}}/>
                  <p style={{marginRight:'10px'}}>원</p>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={depositCostInfo.personalCost.costAdultNum}
                    options={DropDownNum}    
                    handleChange={(e)=>{handleDepositNumChange(e, 'costAdultNum')}}
                  />
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>소아</h3>
                  <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={depositCostInfo.personalCost.costChild} className="inputdefault" type="text" 
                    onChange={(e) => {handleDepositPersonalCostChange(e, 'costChild')}}/>
                  <p style={{marginRight:'10px'}}>원</p>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={depositCostInfo.personalCost.costChildNum}
                    options={DropDownNum}    
                    handleChange={(e)=>{handleDepositNumChange(e, 'costChildNum')}}
                  />
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>유아</h3>
                  <input style={{width:'40%', textAlign:'right', paddingRight:'5px', marginRight:'3px'}}  value={depositCostInfo.personalCost.costInfant} className="inputdefault" type="text" 
                    onChange={(e) => {handleDepositPersonalCostChange(e, 'costInfant')}}/>
                  <p style={{marginRight:'10px'}}>원</p>
                  <DropdownBox
                    widthmain='20%' height='35px' selectedValue={depositCostInfo.personalCost.costInfantNum}
                    options={DropDownNum}    
                    handleChange={(e)=>{handleDepositNumChange(e, 'costInfantNum')}}
                  />
                  <p>명</p>
                </div>
              </div>
            </div>
            <div className="coverrow third rightborder">
              <TitleBox width="120px" text='총요금' height={160}/>
              <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={depositCostInfo.personalCost.costAll} className="inputdefault" type="text" 
                  onChange={(e) => {handleDepositPersonalCostChange(e, 'costAll')}}/>
              <p>원</p>
            </div>
            <div className="coverrow third" style={{flexDirection:'column', alignItems:'start'}}>
              <div style={{width:'100%',  display:'flex', alignItems:'center'}}>
                <TitleBox width="120px" text='할인요금' />
                <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={depositCostInfo.discountCost} className="inputdefault" type="text" 
                  onChange={(e) => {handleDepositCostChange(e, 'discountCost')}}/>
                <p>원</p>
              </div>
              <div style={{width:'100%', display:'flex', alignItems:'center'}}>
                <TitleBox width="120px" text='추가요금'/>
                <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={depositCostInfo.additionCostAll} className="inputdefault" type="text" 
                  onChange={(e) => {handleDepositCostChange(e, 'additionCostAll')}}/>
                <p>원</p>
              </div>
              <div style={{width:'100%', display:'flex', alignItems:'center'}}>
                <TitleBox width="120px" text='최종요금'/>
                <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={depositCostInfo.resultCost} className="inputdefault" type="text" 
                  onChange={(e) => {handleDepositCostChange(e, 'resultCost')}}/>
                <p>원</p>
              </div>
            </div>
          </div>

          <div className="coverbox">
            <div className="coverrow dubbleThird rightborder ">
              <TitleBox width="120px" text='할인행사사은품'/>
              <input style={{width:'80%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={depositCostInfo.freeGift} className="inputdefault" type="text" 
                  onChange={(e) => {

                  }}/>
            </div>
            <div className="coverrow third">
              <TitleBox width="120px" text='적립금'/>
              <input style={{width:'50%', textAlign:'right', paddingRight:'5px', margin:'0 5px'}}  value={depositCostInfo.savedMoney} className="inputdefault" type="text" 
                  onChange={(e) => {handleDepositCostChange(e, 'savedMoney')}}/>
              <p>원</p>
            </div>
          </div>
          
          {/* 전체여행계약금 ------------------------------------------------------- */}
          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width='120px' text='계약금액'/>
              <input value={depositCostInfo.tourTotalContractCost} className="inputdefault costInput" type="text" 
                  onChange={(e) => {handleDepositCostChange(e, 'savedMoney')}}/>
              <p>원</p>
            </div>
            <div className="coverrow third rightborder defaultBox">
              <h3 style={{marginRight:'20px'}}>추가경비:</h3>
              <h3 style={{fontSize:'20px'}}>{depositCostInfo.additionCost[0].cost} 원</h3>
            </div>
            <div className="coverrow third defaultBox" >
              <h3 style={{marginRight:'20px'}}>최종 여행경비:</h3>
              <h3 style={{fontSize:'20px'}}>{depositCostInfo.totalCost} 원</h3>
            </div>
          </div>
        
          {/* 계약금 ------------------------------------------------------- */}
          {
            depositCostInfo.contractCost.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width='120px' text={depositCostInfo.contractCost.length > 1 ? `계약금${index+1}` : '계약금'}/>
                    <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e) => {handleDepositRowCostChange(e, index, 'contractCost')}}/>
                    <p>원</p>
                    {
                      depositCostInfo.contractCost.length === index+1 &&
                      <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                        onClick={()=>{
                          const copy = {...depositCostInfo}
                          copy.contractCost = [copy.contractCost[index], {nameko: '계약금', cost: '', date: '', type: '', deposit: false}]
                          setDepositCostInfo(copy);
                        }}
                      >
                        <FaPlus />
                      </p>
                    }
                  </div>
                  <div className="coverrow third rightborder defaultBox">
                    <p style={{marginRight:'5px'}}>날짜:</p>
                    <DateBoxSingle date={item.date} marginLeft={1}
                      setSelectDate={(e:any) => handleCostDateChange(e, index, 'contractCost', 'date')}/>
                  </div>
                  <div className="coverrow third defaultBox">
                    <DropdownBox
                      widthmain='50%' height='35px' selectedValue={item.type}
                      options={DropDownDepositType}
                      handleChange={(e)=>{handleCostDateChange(e, index, 'contractCost', 'type')}}
                    />
                    <div className='depositCheck'>
                      <input className="input" type="checkbox"
                        checked={item.deposit}
                        onChange={(e)=>{handleCostDateChange(e, index, 'contractCost', 'deposit')}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }
          
          {/* 항공료 ------------------------------------------------------- */}
          {
            depositCostInfo.airportCost.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width='120px' text={depositCostInfo.airportCost.length > 1 ? `항공료${index+1}` : '항공료'}/>
                    <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e) => {handleDepositRowCostChange(e, index, 'airportCost')}}/>
                    <p>원</p>
                    {
                      depositCostInfo.airportCost.length === index+1 &&
                      <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                        onClick={()=>{
                          const copy = {...depositCostInfo}
                          copy.airportCost = [copy.airportCost[index], {nameko: '항공료', cost: '', date: '', type: '', deposit: false}]
                          setDepositCostInfo(copy);
                        }}
                      >
                        <FaPlus />
                      </p>
                    }
                  </div>
                  <div className="coverrow third rightborder defaultBox">
                    <p style={{marginRight:'5px'}}>날짜:</p>
                    <DateBoxSingle date={item.date} marginLeft={1}
                        setSelectDate={(e:any) => handleCostDateChange(e, index, 'airportCost', 'date')}/>
                  </div>
                  <div className="coverrow third defaultBox">
                    <DropdownBox
                      widthmain='50%' height='35px' selectedValue={item.type}
                      options={DropDownDepositType}
                      handleChange={(e)=>{handleCostDateChange(e, index, 'airportCost', 'type')}}
                    />
                    <div className='depositCheck'>
                      <input className="input" type="checkbox"
                        checked={item.deposit}
                        onChange={(e)=>{handleCostDateChange(e, index, 'airportCost', 'deposit')}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }
          

          {/* 항공료변경 ------------------------------------------------------- */}
          {
            depositCostInfo.reviseAirportCost.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width='120px' text={depositCostInfo.reviseAirportCost.length > 1 ? `항공료변경${index+1}` : '항공료변경'}/>
                    <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e) => {handleDepositRowCostChange(e, index, 'reviseAirportCost')}}/>
                    <p>원</p>
                    {
                      depositCostInfo.reviseAirportCost.length === index+1 &&
                      <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                        onClick={()=>{
                          const copy = {...depositCostInfo}
                          copy.reviseAirportCost = [copy.reviseAirportCost[index], {nameko: '항공료변경', cost: '', date: '', type: '', deposit: false}]
                          setDepositCostInfo(copy);
                        }}
                      >
                        <FaPlus />
                      </p>
                    }
                  </div>
                  <div className="coverrow third rightborder defaultBox">
                    <p style={{marginRight:'5px'}}>날짜:</p>
                    <DateBoxSingle date={item.date} marginLeft={1}
                        setSelectDate={(e:any) => handleCostDateChange(e, index, 'reviseAirportCost', 'date')}/>
                  </div>
                  <div className="coverrow third defaultBox">
                    <DropdownBox
                      widthmain='50%' height='35px' selectedValue={item.type}
                      options={DropDownDepositType}
                      handleChange={(e)=>{handleCostDateChange(e, index, 'reviseAirportCost', 'type')}}
                    />
                    <div className='depositCheck'>
                      <input className="input" type="checkbox"
                        checked={item.deposit}
                        onChange={(e)=>{handleCostDateChange(e, index, 'reviseAirportCost', 'deposit')}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }

          {/* 중도금 ------------------------------------------------------- */}
          {
            depositCostInfo.middleCost.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width='120px' text={depositCostInfo.middleCost.length > 1 ? `중도금${index+1}` : '중도금'}/>
                    <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e) => {handleDepositRowCostChange(e, index, 'middleCost')}}/>
                    <p>원</p>
                    {
                      depositCostInfo.middleCost.length === index+1 &&
                      <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                        onClick={()=>{
                          const copy = {...depositCostInfo}
                          copy.middleCost = [copy.middleCost[index], {nameko: '중도금', cost: '', date: '', type: '', deposit: false}]
                          setDepositCostInfo(copy);
                        }}
                      >
                        <FaPlus />
                      </p>
                    }
                  </div>
                  <div className="coverrow third rightborder defaultBox">
                    <p style={{marginRight:'5px'}}>날짜:</p>
                    <DateBoxSingle date={item.date} marginLeft={1}
                        setSelectDate={(e:any) => handleCostDateChange(e, index, 'middleCost', 'date')}/>
                  </div>
                  <div className="coverrow third defaultBox">
                    <DropdownBox
                      widthmain='50%' height='35px' selectedValue={item.type}
                      options={DropDownDepositType}
                      handleChange={(e)=>{handleCostDateChange(e, index, 'middleCost', 'type')}}
                    />
                    <div className='depositCheck'>
                      <input className="input" type="checkbox"
                        checked={item.deposit}
                        onChange={(e)=>{handleCostDateChange(e, index, 'middleCost', 'deposit')}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }
          

          {/* 잔금 ------------------------------------------------------- */}
          {
            depositCostInfo.restCost.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width='120px' text={depositCostInfo.restCost.length > 1 ? `잔금${index+1}` : '잔금'}/>
                    <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e) => {handleDepositRowCostChange(e, index, 'restCost')}}/>
                    <p>원</p>
                    {
                      depositCostInfo.restCost.length === index+1 &&
                      <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                        onClick={()=>{
                          const copy = {...depositCostInfo}
                          copy.restCost = [copy.restCost[index], {nameko: '잔금', cost: '', date: '', type: '', deposit: false}]
                          setDepositCostInfo(copy);
                        }}
                      >
                        <FaPlus />
                      </p>
                    }
                  </div>
                  <div className="coverrow third rightborder defaultBox">
                    <p style={{marginRight:'5px'}}>날짜:</p>
                    <DateBoxSingle date={item.date} marginLeft={1}
                        setSelectDate={(e:any) => handleCostDateChange(e, index, 'restCost', 'date')}/>
                  </div>
                  <div className="coverrow third defaultBox">
                    <DropdownBox
                      widthmain='50%' height='35px' selectedValue={item.type}
                      options={DropDownDepositType}
                      handleChange={(e)=>{handleCostDateChange(e, index, 'restCost', 'type')}}
                    />
                    <div className='depositCheck'>
                      <input className="input" type="checkbox"
                        checked={item.deposit}
                        onChange={(e)=>{handleCostDateChange(e, index, 'restCost', 'deposit')}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }
          
          
          {/* 추가경비 ------------------------------------------------------- */}
          {
            depositCostInfo.additionCost.map((item:any, index:any)=>{
              return (
                <div className="coverbox" key={index}>
                  <div className="coverrow third rightborder">
                    <TitleBox width='120px' text={depositCostInfo.additionCost.length > 1 ? `추가경비${index+1}` : '추가경비'}/>
                    <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e) => {handleDepositRowCostChange(e, index, 'additionCost')}}/>
                    <p>원</p>
                    {
                      depositCostInfo.additionCost.length === index+1 &&
                      <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                        onClick={()=>{
                          const copy = {...depositCostInfo}
                          copy.additionCost = [copy.additionCost[index], {nameko: '추가경비', cost: '', date: '', type: '', deposit: false}]
                          setDepositCostInfo(copy);
                        }}
                      >
                        <FaPlus />
                      </p>
                    }
                  </div>
                  <div className="coverrow third rightborder defaultBox">
                    <p style={{marginRight:'5px'}}>날짜:</p>
                    <DateBoxSingle date={item.date} marginLeft={1}
                        setSelectDate={(e:any) => handleCostDateChange(e, index, 'additionCost', 'date')}/>
                  </div>
                  <div className="coverrow third defaultBox">
                    <DropdownBox
                      widthmain='50%' height='35px' selectedValue={item.type}
                      options={DropDownDepositType}
                      handleChange={(e)=>{handleCostDateChange(e, index, 'additionCost', 'type')}}
                    />
                    <div className='depositCheck'>
                      <input className="input" type="checkbox"
                        checked={item.deposit}
                        onChange={(e)=>{handleCostDateChange(e, index, 'additionCost', 'deposit')}}
                      />
                    </div>
                    <p>입금확인</p>
                  </div>
                </div>
              )
            })
          }
          

          {/* 환불 ------------------------------------------------------- */}
          <div className="coverbox">
            <div className="coverrow third rightborder">
              <TitleBox width='120px' text='환불'/>
              <input value={depositCostInfo.refundCost.cost} className="inputdefault costInput" type="text" 
                onChange={(e) => {
                  // handleDepositRowCostChange(e, index, 'refundCost')
                }}/>
              <p>원</p>
            </div>
            <div className="coverrow third rightborder defaultBox"></div>
            <div className="coverrow third defaultBox"></div>
          </div>
          

          {/* 밸런스 ------------------------------------------------------- */}
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width='120px' text='밸런스'/>
              <div style={{margin:'0 10px', display:'flex', alignItems:'center'}}>
                <h3 style={{marginRight:'10px', color:"#3a9fe5"}}>{depositCostInfo.ballance === 'NaN' ? 0 : depositCostInfo.ballance}%</h3>
                <p style={{fontSize:'12px'}}>= (계약금+항공료+중도금+잔금) / 계약금액 x 100</p>
              </div>
            </div>
          </div>

          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width='120px' text='현금영수증'/>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <div className='depositCheck'>
                  <input className="input" type="checkbox"
                    checked={depositCostInfo.cashBillInfo.type === '소득공제'}
                    onChange={()=>{
                      const copy = {...depositCostInfo}
                      copy.cashBillInfo.type = '소득공제'
                      setDepositCostInfo(copy);
                    }}
                  />
                </div>
                <p>소득공제</p>
                <div className='depositCheck'>
                  <input className="input" type="checkbox"
                    checked={depositCostInfo.cashBillInfo.type === '지출증빙'}
                    onChange={()=>{
                      const copy = {...depositCostInfo}
                      copy.cashBillInfo.type = '지출증빙'
                      setDepositCostInfo(copy);
                    }}
                  />
                </div>
                <p>지출증빙</p>
              </div>
              <h3 style={{marginLeft:'50px'}}>전화/사업자번호:</h3>
              <input style={{width:'15%', marginLeft:'5px'}}  value={depositCostInfo.cashBillInfo.userNum} className="inputdefault" type="text" 
                onChange={(e) => {
                  const copy = {...depositCostInfo}
                  copy.cashBillInfo.userNum = e.target.value;
                  setDepositCostInfo(copy);
                }}/>
              <h3 style={{marginLeft:'50px'}}>인증번호:</h3>
              <input style={{width:'15%', marginLeft:'5px'}}  value={depositCostInfo.cashBillInfo.authNum} className="inputdefault" type="text" 
                onChange={(e) => {
                  const copy = {...depositCostInfo}
                  copy.cashBillInfo.authNum = e.target.value;
                  setDepositCostInfo(copy);
                }}/>  
              <h3 style={{marginLeft:'30px'}}>발급일:</h3>
                <DateBoxSingle date={depositCostInfo.cashBillInfo.date} marginLeft={1}
                  setSelectDate={(e:any)=>{
                    const copy = {...depositCostInfo}
                    copy.cashBillInfo.date = e;
                    setDepositCostInfo(copy);
                  }} 
                />
            </div>
          </div>
        </section> 
      

      {/* 입금내역 ------------------------------------------------------------------------------------------------------------------------ */}
        <section>
          <h1>9. 발송체크</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{backgroundColor:'#f6f6f6' }}>
            <TitleBox width="150px" text=''/>
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
                    <TitleBox width="150px" text={item.name}/>
                    <div style={{flex:1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <div style={{width:'20%', display:'flex', justifyContent:'center'}}>
                        <DateBoxSingle date={item.requestDate} marginLeft={1}
                          setSelectDate={(e:any) => {
                            handleRequestChange(e, index, 'requestDate');
                          }} />
                      </div>
                      <div style={{width:'20%', display:'flex', justifyContent:'center'}}>
                        <DateBoxSingle date={item.completeDate} marginLeft={1}
                          setSelectDate={(e:any) => {
                            handleRequestChange(e, index, 'completeDate');
                          }} />
                      </div>
                      <DropdownBox
                        widthmain='20%' height='35px' selectedValue={item.deliveryType}
                        options={DropDownDeliveryType}
                        handleChange={(e)=>{
                          handleRequestChange(e, index, 'deliveryType');
                        }}
                      />
                      <DropdownBox
                        widthmain='20%' height='35px' selectedValue={item.charger}
                        options={DropDowncharger}
                        handleChange={(e)=>{
                          handleRequestChange(e, index, 'charger');
                        }}
                      />
                    </div>
                  </div>
                </div>

              )
            })
          }          
        </section>


      </div>

    </div>     
  )
}
