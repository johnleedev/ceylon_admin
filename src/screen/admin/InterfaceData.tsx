
// 예약하기 ModalReserve -------------------------------------------------------------------------
export interface ReserveStateProps {
  contractCompleted : boolean, 
  ticketIssued : boolean, 
  reserveConfirm : boolean, 
  fullPayReceived : boolean, 
  departNoticeSent : boolean
}

export interface WorkStateProps {
  progressNoticeSent : boolean,
  eticketSent : boolean,
  scheduleSent : boolean,
  passportVerify : boolean,
  tourPrepare : boolean,
  visaEsta  : boolean,
  voucherSent : boolean,
  remainPayRequest : boolean,
  confirmationSent : boolean,
  guideBook : boolean
}

export interface UserInfoProps {
    isContact : boolean;
    sort : string, 
    nameKo: string, 
    nameLast: string, 
    nameFirst: string,
    birth: string, 
    gender: string, 
    nation: string, 
    passportNum: string, 
    passportDate: string,
    residentNum : string, 
    phone: string
  }

export interface UserSubInfoProps {
    brideName : string;
    birthDate : string;
    weddingDate : string;
  }
  
export interface VisitPathInfoProps {
    reserveLocation : string, 
    charger: string, 
    accepter: string,
    visitPath : string, 
    visitPathDetail : string,  
    recommender: string
  }
  
export interface ProductInfoProps { 
    tourLocation : string,
    tourLocationDetail : string,
    productName : string,
    productType : string,
    airline : string[],
    landCompany : {
      companyName: string,
      costList: {currency:string, cost:string}[],
    }[],
    tourStartAirport : string,
    tourStartPeriod : string,
    tourEndPeriod : string,
    personalCost : {sort:string, num : number, cost:string, currency:string }[],
    personalCostAll: string,
    exchangeRate : {rateType:string, isNotice: boolean, isClientCheck: boolean, noticeRate : string, restDepositDate : string, restDepositRate: string }
  }

export interface AirlineReserveStateProps {
  isCustomerTicketing : boolean;
  airlineState : {
    airlineCompany : string;
    airlineName : string;
    departAirport : string;
    departDate : string;
    departTime : string;
    arriveAirport : string;
    arriveDate : string;
    arriveTime : string;
    state : string;
  }[]
  ticketingState : {
    ticketBooth : string;
    ticketCost : string;
    date : string;
    ticketing : string;
  }[]
}

export interface HotelReserveStateProps {
    checkIn : string;
    checkOut : string;
    location : string;
    hotelName: string;
    roomType : string;
    days: string;
}[]

export interface EtcStateProps {
    salesEvent : string;
    salesEventCost : string;
    saveMoney : string;
    saveMoneyCost : string;
    contractBenefit  : string;
    freeGift : string;
    freeGiftCost : string;
    insuranceIncludes : string;
    insuranceCompany : string;
    insuranceCost : string;
  }

export interface DepositCostInfoProps { 
    tourTotalContractCost : string; 
    costListSum : string;
    personalCost : {sort:string, num : number, cost:string, currency:string }[],
    personalCostAll: string,
    freeGift : string,
    savedMoney : string, 
    discountCost: string, 
    additionCostAll: string, 
    resultCost: string,
    contractCost : {nameko: string, cost: string, date: string, type: string, deposit: boolean}[],
    airportCost : {nameko: string, cost: string, date: string, type: string, deposit: boolean}[],
    reviseAirportCost : {nameko: string, cost: string, date: string, type: string, deposit: boolean}[],
    middleCost : {nameko: string, cost: string, date: string, type: string, deposit: boolean}[],
    restCost : {nameko: string, cost: string, date: string, type: string, deposit: boolean}[],
    additionCost : {nameko: string, cost: string, date: string, type: string, deposit: boolean}[],
    refundCost : {nameko: string, cost: string, date: string},
    totalCost : string, 
    ballance : string, 
    cashBillInfo : { type: string, userNum:string, authNum: string, date: string}
}
  

export interface DeliveryInfoProps {
    name: string;
    requestDate: string;
    completeDate: string;
    deliveryType: string;
    charger: string;
}[];



// 도시 입력 모달 -------------------------------------------------------------------------


export interface TaxFreeLimitProps {
  alcohol: string;
  cigarette: string;
  cash: string;
  all: string;
  notice : string;
};

// 휴양지 항공
interface RestAirlineDataProps {
  sort : string;
  airlineName: string;
  departDate: string[];
  planeName: string;
  departAirport: string;
  departTime: string;
  arriveAirport: string;
  arriveTime: string;
}
export interface RestAirlineProps {
  id : string;
  tourPeriodNight: string;
  tourPeriodDay: string;
  departAirportMain : string;
  departAirline: string;
  airlineData: RestAirlineDataProps[];
}   

// 관광지 항공
interface TourAirlineDataProps {
  sort : string;
  airlineName: string;
  departDate: string[];
  planeName: string;
  departAirport: string;
  departTime: string;
  arriveAirport: string;
  arriveTime: string;
}
export interface TourAirlineProps {
  id : string;
  departAirportMain : string;
  departAirline: string;
  departTime: string;
  airlineData: TourAirlineDataProps[];
}   

// 관광지 교통
export interface TrafficProps {
  sort : string;
  trafficList: TrafficListProps[]
}
export interface TrafficListProps {
  terminal: string;
  trafficName : string;
  operateDay : string;
  connectCity : string;
  moveTime : string;
}