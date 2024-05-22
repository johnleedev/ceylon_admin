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
  airline: null;
  balance: string;
  cashBillInfo: string;
  charger: string;
  costListSum: string;
  date: string;
  decideDoc: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };
  eTicket: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };
  freeGift: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };
  happyCall: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };
  id: number;
  inputState: string;
  isCashBill: string;
  landCompany: {
      companyName: string;
      notice: string;
  }[];
  name: string;
  prepare: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };

  productName: null;
  recommender: string;
  refund: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };

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
  visaEsta: {
      name: string;
      requestDate: string;
      completeDate: string;
      deliveryType: string;
      charger: string;
  };
  visitPath: string;
}

export interface productCostProps {
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

export interface EtcStateProps {
    includes: string;
    insuranceCompany: string;
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