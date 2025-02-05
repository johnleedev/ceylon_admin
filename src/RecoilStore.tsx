import { atom } from "recoil";


export const recoilExchangeRate = atom({
  key: "exchangeRate",
  default: [{
      base : '',
      KRW : 0
    }]
});

export const recoilNoticeExchangeRate = atom({
  key: "noticeExchangeRate",
  default: [{
      base : '',
      KRW : 0
    }]
});

export const recoilRestDepositExchangeRate = atom({
  key: "restDepositExchangeRate",
  default: [{
      base : '',
      KRW : 0
    }]
});


export const recoilExchangeKey = atom({
  key: "exchangeKey",
  default: "iPohzAyaVzOgv6XTPqiBpJPFL4iVzjaf"
});
