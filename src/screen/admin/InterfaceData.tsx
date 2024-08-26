export interface UserInfoProps {
    no: number, 
    sort : string, 
    nameKo: string, 
    lastName: string, 
    firstName: string,
    birth: string, 
    male: string, 
    nation: string, 
    passPortNum: string, 
    passPortDate: string,
    residentNum : string, 
    phone: string
  }

export interface ReserveInfoProps {
  accepter: string;
  ballance: string;
  cashBillInfo: string;
  charger: string;
  costListSum: string;
  date: string;
  id: number;
  inputState: string;
  isCashBill: string;
  landCompany: {
      companyName: string;
      notice: string;
  }[];
  name: string;
  productName: null;
  recommender: string;
  reserveLocation: string;
  serialNum: string;
  totalCost: string;
  tourEndAirport: null;
  tourEndPeriod: null;
  tourLocation: null;
  tourLocationDetail: null;
  tourStartAirport: null;
  tourStartPeriod: null;
  tourTotalContractCost: string;
  visitPath: string;
  visitPathDetail: string;
}

export interface AirlineProps {
   airlineName: string;
};

export interface ProductCostProps {
    costAdult: string | null;
    costAdultNum: string;
    costChild: string | null;
    costChildNum: string;
    costInfant: string | null;
    costInfantNum: string;
    costAll: string;
    reserveExchangeRate: string;
    isNotice: boolean;
    isClientCheck: boolean;
};

export interface AirportStateProps {
    date: string;
    section: string;
    airport: string;
    timeDepart: string;
    timeArrive: string;
    state: string;
}[];


export interface TicketingStateProps {
    company: string;
    ticketBooth: string;
    date: string;
    state: string;
}[];

export interface HotelReserveStateProps {
    date1: string;
    date2: string;
    location: string;
    hotelName: string;
    roomType: string;
    days: string;
}[];

export interface LandCompanyProps {
    companyName: string;
    notice: string;
}[];

export interface EtcStateProps {
    includes: string;
    insuranceCompany: string;
    freeGift : string;
    freeGiftDetail : string;
    insuranceCost: string;
    notIncludes: string;
    travelInsurance: string;
};


export interface DepositCostProps {
    nameko: string;
    cost: string;
    date: string;
    type: string;
    deposit: string;
};

export interface RefundCostProps {
    nameko: string;
    cost: string;
    date: string;
};

export interface CashBillInfoProps {
    type: string;
    AuthNum: string;
    date: string;
};


export interface DeliveryProps {
    name: string;
    requestDate: string;
    completeDate: string;
    deliveryType: string;
    charger: string;
};