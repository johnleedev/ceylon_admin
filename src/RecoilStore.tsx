import { atom } from "recoil";


export const recoilExchangeRate = atom({
  key: "exchangeRate",
  default: [{
      base : '',
      KRW : 0
    }]
});


