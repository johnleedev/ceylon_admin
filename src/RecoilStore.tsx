import { atom } from "recoil";


export const recoilExchangeRate = atom({
  key: "exchangeRate",
  default: [{
      base : '',
      KRW : 0
    }]
});


export const recoilExchangeKey = atom({
  key: "exchangeKey",
  default: "iPohzAyaVzOgv6XTPqiBpJPFL4iVzjaf"
});
