import img0 from "./images/img_bali.jpg";
import img1 from "./images/img_maldives.jpg";
import img2 from "./images/img_cancun.jpg";
import img3 from "./images/img_phuket.jpg";
import img4 from "./images/img_mauritius.jpg";
import img5 from "./images/img_aus.jpg";
import img6 from "./images/img_hawaii.jpg";
import img7 from "./images/img_nhatrang.jpg";
import img8 from "./images/img_dubai.jpg";
import img9 from "./images/img_guam.jpg";
import baliMainBg from "./images/tour/bali/main_bg.jpg";
import item1 from "./images/resort/hotel_01.png";
import item2 from "./images/resort/hotel_02.png";
import item3 from "./images/resort/hotel_03.png";
import item4 from "./images/resort/hotel_04.png";
import item5 from "./images/resort/hotel_05.png";
import item6 from "./images/resort/hotel_06.png";
import item7 from "./images/resort/hotel_07.png";
import item8 from "./images/resort/hotel_08.png";
import infoImg0 from "./images/hotel/detail-0.jpg";
import infoImg1 from "./images/hotel/detail-1.jpg";
import infoImg2 from "./images/hotel/detail-2.jpg";
import infoImg3 from "./images/hotel/detail-1.jpg";
import infoImg4 from "./images/hotel/detail-2.jpg";
import saintMainImage from "./images/hotel/main-bg-0.jpg";
import packageThumbnailImage0 from "./images/hotel/package-0.jpg";
import packageThumbnailImage1 from "./images/hotel/package-1.jpg";

export interface TourObj {
  id: number;
  title: string;
  subtitle: string;
  imagePath: string;
  desc: string;
  mainBgImage: string;
}

export interface HotelObj {
  id: number;
  tourId: number;
  title: string;
  location: string;
  rating: number;
  promotionDueDate: string;
  imagePath: string;
  categoryId: number;
}

export const getTourData = (tourId?: number) => {
  const tourData = [
    {
      id: 0,
      title: "발리",
      subtitle: "Bali",
      imagePath: img0,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 1,
      title: "몰디브",
      subtitle: "Maldives",
      imagePath: img1,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 2,
      title: "칸쿤",
      subtitle: "Cancun",
      imagePath: img2,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 3,
      title: "푸켓/카오락",
      subtitle: "Phuket",
      imagePath: img3,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 4,
      title: "모리셔스",
      subtitle: "Mauritius",
      imagePath: img4,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 5,
      title: "호주",
      subtitle: "Australia",
      imagePath: img5,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 6,
      title: "하와이",
      subtitle: "Hawaii",
      imagePath: img6,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 7,
      title: "나트랑",
      subtitle: "Nha Trang",
      imagePath: img7,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 8,
      title: "두바이",
      subtitle: "Dubai",
      imagePath: img8,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
    {
      id: 9,
      title: "괌/사이판",
      subtitle: "Guam/Saipan",
      imagePath: img9,
      desc: "즐길거리 등을 적는 곳입니다. 현지에서 하는 것, 유명한 장소, 재미있는 체험 등",
      mainBgImage: baliMainBg,
    },
  ];
  const selectedTour = tourData.filter(({ id }) => tourId === id)[0];
  return { tourObjs: tourData, selectedTour };
};

export const getTourDetailData = (id: number) => {
  const tourData = [
    {
      id: 0,
      title: "Bali",
      subtitle: "발리",
      mainBgImage: baliMainBg,
    },
  ];
  return tourData.filter((data) => data.id === id)[0];
};

export const cls = (...classnames: string[]) => {
  return classnames.join(" ");
};

export const getHotelData = (tourId: number) => {
  const hotelData = [
    {
      id: 0,
      tourId: 0,
      title: "콘래드",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item1,
      categoryId: 0,
    },
    {
      id: 1,
      tourId: 0,
      title: "반얀트리",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item2,
      categoryId: 0,
    },
    {
      id: 2,
      tourId: 0,
      title: "세인트 레지스 호텔",
      location: "쿠타",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item3,
      categoryId: 0,
    },
    {
      id: 3,
      tourId: 0,
      title: "르메르디앙",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item4,
      categoryId: 0,
    },
    {
      id: 4,
      tourId: 0,
      title: "노보텔",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item5,
      categoryId: 0,
    },
    {
      id: 5,
      tourId: 0,
      title: "콘래드",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item6,
      categoryId: 0,
    },
    {
      id: 6,
      tourId: 0,
      title: "반얀트리",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item7,
      categoryId: 0,
    },
    {
      id: 7,
      tourId: 0,
      title: "세인트",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item8,
      categoryId: 0,
    },
  ];
  return hotelData.filter((hotel) => hotel.tourId === tourId);
};

export const formatKrDate = (date: string) => {
  const dateParts = date.split("-");
  if (dateParts.length !== 3) {
    throw new Error("Invalid date format. Expected format: YYYY-MM-DD");
  }
  const year = dateParts[0];
  const month = +dateParts[1];
  const day = +dateParts[2];
  return `${year}년 ${month}월 ${day}일`;
};

export const getHotelDataById = (id: number) => {
  const hotelData = [
    {
      id: 0,
      tourId: 0,
      title: "콘래드",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item1,
      categoryId: 0,
      mainBgImage: saintMainImage,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 1,
      tourId: 0,
      title: "반얀트리",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item2,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 2,
      tourId: 0,
      title: "세인트 레지스 호텔",
      subtitle: "Saint Regis Hotel Bali",
      location: "쿠타",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item3,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 3,
      tourId: 0,
      title: "르메르디앙",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item4,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 4,
      tourId: 0,
      title: "노보텔",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item5,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 5,
      tourId: 0,
      title: "콘래드",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item6,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 6,
      tourId: 0,
      title: "반얀트리",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item7,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
    {
      id: 7,
      tourId: 0,
      title: "세인트",
      subtitle: "Saint Regis Hotel Bali",
      location: "스미낙",
      rating: 5,
      promotionDueDate: "2024-12-31",
      imagePath: item8,
      mainBgImage: saintMainImage,
      categoryId: 0,
      desc: "2017년 새롭게 단장을 마치고 모던 럭셔리를 지향하는 호텔로 거듭났습니다. 모든 객실에서 지쿠지와 개인용 풀장이 설치되어있는 것이 특징이며, 하얗고 깔끔한 인테리어는 산토리니만의 감성을 느끼기에 안성맞춤입니다.",
      info: {
        images: {
          mainImage: item5,
          roomImage: [
            { roomType: 0, image: infoImg0 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
            { roomType: 1, image: infoImg1 },
            { roomType: 2, image: infoImg2 },
          ],
        },
        benefit: [
          "매일 2~6인 조식",
          "BBQ 1회 2인 씨푸드 디너뷔페(생맥주 무제한 제공)",
          "투숙기간중 1회 치킨 & 생맥주 2잔",
          "방콕시내 호텔간 왕복셔틀버스 제공",
        ],
        roomType: ["클리프 오션뷰", "오션뷰", "오션뷰 풀빌라"],
        locDetail: [
          "주소 : 발리 쿠타 Sauthon Road",
          "28km - 발리국제공항",
          "20km - 사원",
        ],
      },
    },
  ];
  return hotelData.filter((hotel) => hotel.id === id)[0];
};

export const getPackageByHotelId = (hotelId?: number) => {
  const packageData = [
    {
      id: 0,
      tourId: 0,
      hotelId: 2,
      period: { night: 5, days: 7 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage0,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 2, night: 3 },
      ],
    },
    {
      id: 1,
      tourId: 0,
      hotelId: 2,
      period: { night: 6, days: 8 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 원베드 풀빌라 2박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage1,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 3, night: 2 },
        { hotelId: 2, night: 2 },
      ],
    },
    {
      id: 2,
      tourId: 0,
      hotelId: 2,
      period: { night: 5, days: 7 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage0,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 2, night: 3 },
      ],
    },
    {
      id: 3,
      tourId: 0,
      hotelId: 2,
      period: { night: 6, days: 8 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 원베드 풀빌라 2박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage1,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 3, night: 2 },
        { hotelId: 2, night: 2 },
      ],
    },
  ];
  return packageData.filter((packageItem) => packageItem.hotelId === hotelId);
};



export const getPackageById = (id?: number) => {
  const packageData = [
    {
      id: 0,
      tourId: 0,
      hotelId: 2,
      period: { night: 5, days: 7 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage0,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 2, night: 3 },
      ],
    },
    {
      id: 1,
      tourId: 0,
      hotelId: 2,
      period: { night: 6, days: 8 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 원베드 풀빌라 2박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage1,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 3, night: 2 },
        { hotelId: 2, night: 2 },
      ],
    },
    {
      id: 2,
      tourId: 0,
      hotelId: 2,
      period: { night: 5, days: 7 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 세인트레지스 가든뷰 1박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage0,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 2, night: 3 },
      ],
    },
    {
      id: 3,
      tourId: 0,
      hotelId: 2,
      period: { night: 6, days: 8 },
      thumbnail: {
        title:
          "선투숙 리조트 2박 + 원베드 풀빌라 2박 + 세인트레지스 오션뷰 풀빌라 2박",
        image: packageThumbnailImage1,
      },
      accommodation: [
        { hotelId: 1, night: 2 },
        { hotelId: 3, night: 2 },
        { hotelId: 2, night: 2 },
      ],
    },
  ];
  return packageData.filter((packageItem) => packageItem.id === id)[0];
};
