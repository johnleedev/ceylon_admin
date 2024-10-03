import baliMainBg from "./images/tour/bali/main_bg.jpg";
import tourImagePath0 from "./images/img_bali.jpg";
import tourImagePath1 from "./images/img_maldives.jpg";
import tourImagePath2 from "./images/img_cancun.jpg";
import tourImagePath3 from "./images/img_phuket.jpg";
import tourImagePath4 from "./images/img_mauritius.jpg";
import tourImagePath5 from "./images/img_aus.jpg";
import tourImagePath6 from "./images/img_hawaii.jpg";
import tourImagePath7 from "./images/img_nhatrang.jpg";
import tourImagePath8 from "./images/img_dubai.jpg";
import tourImagePath9 from "./images/img_guam.jpg";
import hotelImagePath1 from "./images/resort/hotel_01.png";
import hotelImagePath2 from "./images/resort/hotel_02.png";
import hotelImagePath3 from "./images/resort/hotel_03.png";
import hotelImagePath4 from "./images/resort/hotel_04.png";
import hotelImagePath5 from "./images/resort/hotel_05.png";
import hotelImagePath6 from "./images/resort/hotel_06.png";
import hotelImagePath7 from "./images/resort/hotel_07.png";
import hotelImagePath8 from "./images/resort/hotel_08.png";
import headerBgImage from "./images/hotel/main-bg-0.jpg";
import detailImagePath0 from "./images/hotel/detail-0.jpg";
import detailImagePath1 from "./images/hotel/detail-1.jpg";
import detailImagePath2 from "./images/hotel/detail-2.jpg";
import detailImagePath3 from "./images/hotel/detail-1.jpg";
import detailImagePath4 from "./images/hotel/detail-2.jpg";
import mobileImagePath from "./images/hotel/mobile-info.jpg";
import packageThumbPath0 from "./images/hotel/package-0.jpg";
import packageThumbPath1 from "./images/hotel/package-1.jpg";

export interface IAddress {
  contury: string;
  state: string;
  city: string;
  detailAddress: string;
}

export interface INearby {
  distance: string;
  name: string;
}

export interface ITour {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
  desc: string;
  mainBgImage: string;
}

export interface IHotel {
  id: number;
  tourId: number;
  title: string;
  subtitle: string;
  rating: number;
  thumbnailImagePath: string;
  description: string;
  headerBgImage: string;
  benefit: string[];
  roomtype: string[];
  hotelImages: { type: number; imagePath: string }[];
  hotelInfoImages: { webImagePath: string; mobileImagePath: string };
  address: IAddress;
  nearby: INearby[];
}

export interface IPackage {
  id: number;
  title: string;
  mainHotelId: { night: number; hotelId: number; roomtype: string };
  salesPeriod: string[];
  packagePeriod: string;
  optionalHotels: { night: number; hotelId: number; roomtype: string }[][];
  thumbnailImagePath: string;
  inclusions: { inclusions: string[]; exclusions: string[] };
  description: string[];
}

class Operators<T> {
  protected data: T[];
  constructor(data: T[]) {
    this.data = data;
  }

  public findDataById(id: number): T | null {
    return this.data.find((item) => (item as any).id === id) || null;
  }
  public findMany(): T[] {
    return this.data;
  }
}

class Tour extends Operators<ITour> {
  constructor() {
    const data: ITour[] = [
      {
        id: 0,
        title: "발리",
        subtitle: "Bali",
        imagePath: tourImagePath0,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 1,
        title: "몰디브",
        subtitle: "Maldives",
        imagePath: tourImagePath1,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 2,
        title: "칸쿤",
        subtitle: "Cancun",
        imagePath: tourImagePath2,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 3,
        title: "푸켓/카오락",
        subtitle: "Phuket",
        imagePath: tourImagePath3,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 4,
        title: "모리셔스",
        subtitle: "Mauritius",
        imagePath: tourImagePath4,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 5,
        title: "호주",
        subtitle: "Australia",
        imagePath: tourImagePath5,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 6,
        title: "하와이",
        subtitle: "Hawaii",
        imagePath: tourImagePath6,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 7,
        title: "나트랑",
        subtitle: "Nha Trang",
        imagePath: tourImagePath7,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 8,
        title: "두바이",
        subtitle: "Dubai",
        imagePath: tourImagePath8,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
      {
        id: 9,
        title: "괌/사이판",
        subtitle: "Guam/Saipan",
        imagePath: tourImagePath9,
        desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
        mainBgImage: baliMainBg,
      },
    ];
    super(data);
  }
}

class Hotel extends Operators<IHotel> {
  constructor() {
    const data: IHotel[] = [
      {
        id: 0,
        tourId: 0,
        title: "세인트 레지스 호텔",
        subtitle: "Saint Regis Hotel Bali",
        rating: 5,
        headerBgImage: headerBgImage,
        thumbnailImagePath: hotelImagePath1,
        description:
          "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomtype: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        hotelImages: [
          { type: 1, imagePath: detailImagePath0 },
          { type: 2, imagePath: detailImagePath1 },
          { type: 3, imagePath: detailImagePath2 },
          { type: 2, imagePath: detailImagePath3 },
          { type: 3, imagePath: detailImagePath4 },
        ],
        hotelInfoImages: { webImagePath: "", mobileImagePath: mobileImagePath },
        address: {
          contury: "인도네시아",
          state: "발리",
          city: "쿠타",
          detailAddress: "Sauthon Road",
        },
        nearby: [
          { distance: "28km", name: "발리국제공항" },
          { distance: "20km", name: "사원" },
        ],
      },
    ];
    super(data);
  }
}

class MockData {
  public tour: Tour;
  public hotel: Hotel;

  constructor() {
    this.tour = new Tour();
    this.hotel = new Hotel();
  }
}

const mockData = new MockData();

export default mockData;
