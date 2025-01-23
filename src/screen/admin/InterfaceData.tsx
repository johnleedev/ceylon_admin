
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
    userNum : number;
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
    airline : string[],
    landCompany : {
      companyName: string,
      notice: string
    }[],
    tourStartAirport : string,
    tourStartPeriod : string,
    tourEndAirport : string,
    tourEndPeriod : string,
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
    isTicketing : boolean
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
    personalCost : {costAdult: string, costAdultNum: number, costChild: string, costChildNum : number, costInfant: string, costInfantNum: number, costAll: string},
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

