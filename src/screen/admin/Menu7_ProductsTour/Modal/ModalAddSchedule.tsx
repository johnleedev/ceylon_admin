import React, { useEffect, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { ImLocation } from 'react-icons/im';
import { formatDate, set } from 'date-fns';
import * as XLSX from 'xlsx';
import ModalSelectScheduleDetailBox from './ModalSelectScheduleDetailBox';
import { BiSolidArrowFromLeft, BiSolidArrowFromRight, BiSolidArrowToLeft, BiSolidArrowToRight, BiSolidLeftArrowAlt, BiSolidRightArrowAlt } from 'react-icons/bi';
import AirlineData from '../../../AirlineData';
import { TrafficListProps, TrafficProps } from '../../InterfaceData';
import { FiMinusCircle } from 'react-icons/fi';

interface ScheduleProps {
  id : string;
  day : string;
  breakfast :string;
  lunch:string;
  dinner :string;
  hotel:string;
  score:string;
  scheduleDetail: ScheduleDetailProps[];
}

interface ScheduleDetailProps {
  id : string;
  isViaSort: string;
  nation : string;
  city : string;
  selectScheduleSort : string;
  airline : string;
  airlineDetail : {
    airlineImage : string;
    airlineName : string;
    departTime : string;
    departAirport : string;
    arriveTime : string;
    arriveAirport : string;
    flightTime : string;
  }[],
  location: string;
  locationDetail : {
    subLocation : string;
    subLocationDetail : {
      locationTitle : string;
      locationContent : string;
      postImage : string;
    }[]
  }[]
}

interface AirlineDataProps {
  sort : string;
  airlineName: string;
  departDate: string[];
  planeName: string;
  departAirport: string;
  departTime: string;
  arriveAirport: string;
  arriveTime: string;
}
interface AirlineProps {
  id : string;
  tourPeriodNight: string;
  tourPeriodDay: string;
  departAirportMain : string;
  departAirline: string;
  airlineData: AirlineDataProps[];
}   


export default function ModalAddSchedule (props : any) {
	
  const [isAddOrRevise, setIsAddOrRevise] = useState(props.isAddOrRevise);
  const scheduleData = props.scheduleInfo;
  const [selectedNation, setSelectedNation] = useState<any>([]);

  const [postId, setPostId] = useState(isAddOrRevise === 'revise' ? scheduleData.id : '');
  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? scheduleData.isView : true);
  const [landCompany, setLandCompany] = useState(isAddOrRevise === 'revise' ? scheduleData.landCompany : '');
  const [landCompanyCode, setLandCompanyCode] = useState(isAddOrRevise === 'revise' ? scheduleData.landCompanyCode : '');
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? scheduleData.nation : '');
  const [tourLocation, setTourLocation] = useState(isAddOrRevise === 'revise' ? scheduleData.tourLocation : '');
  const [tourProductName, setTourProductName] = useState(isAddOrRevise === 'revise' ? scheduleData.tourProductName : '');
  const [tourPeriod, setTourPeriod] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriod : '');
  const [tourPeriodCode, setTourPeriodCode] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriodCode : '');
  const [departAirport, setDepartAirport] = useState(isAddOrRevise === 'revise' ? scheduleData.departAirport : '');
  const [departFlight, setDepartFlight] = useState(isAddOrRevise === 'revise' ? scheduleData.departFlight : '');
  const [depositCost, setDepositCost] = useState(isAddOrRevise === 'revise' ? scheduleData.depositCost : '');
  const [productNotice, setProductNotice] = useState(isAddOrRevise === 'revise' ? scheduleData.productNotice : '');
  const [cautionNote, setCautionNote] = useState(isAddOrRevise === 'revise' ? scheduleData.cautionNote : '');
  const [contractBenefit, setContractBenefit] = useState(isAddOrRevise === 'revise' ? scheduleData.contractBenefit : '');
  const [includeNoteText, setIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.includeNoteText : '');
  const [notIncludeNoteText, setNotIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.notIncludeNoteText : '');

  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>( 
    isAddOrRevise === 'revise' 
    ? props.scheduleDetails 
    : [{ id: '', day : '1', breakfast :'', lunch:'', dinner :'', hotel:'', score:'', 
        scheduleDetail: [{ 
          id: '',
          isViaSort : '',
          nation: '',
          city : '',
          selectScheduleSort: '',
          airline : '',
          airlineDetail : [{
            airlineImage : '',
            airlineName : '',
            departTime : '',
            departAirport : '',
            arriveTime : '',
            arriveAirport : '',
            flightTime: ''
          }],
          location: '',
          locationDetail : [{
            subLocation: '',
            subLocationDetail : [{
              locationTitle: '',
              locationContent: '',
              postImage: ''
            }]
          }]
        }]
      }]
  );  
  

  // 여행 기간, 적용 항공편 가져오기 
  const [tourPeriodOptions, setTourPeriodOptions] = useState([{ value: '선택', label: '선택' }]);
  const [departAirportOptions, setDepartAirportOptions] = useState([{ value: '선택', label: '선택' }]);
  const [airlineNameOptions, setAirlineNameOptions] = useState([{ value: '선택', label: '선택' }]);
  const [hotelsOptions, setHotelsOptions] = useState([{ value: '선택', label: '선택' }]);
  const [onewayAirline, setOnewayAirline] = useState<AirlineProps[]>([])
  const [roundAirline, setRoundAirline] = useState<AirlineProps[]>([])
  const [trafficData, setTrafficData] = useState<{id:number, city:string, nation:string, airport:any, harbor:any, station:any, terminal:any}>();

  const fetchAirlineData = async (tourLocationSelected: string) => {
    const res = await axios.get(`${MainURL}/tourproductschedule/getairplanedata/${nation}/${tourLocationSelected}`);
    if (res.data) {
      const copy = res.data;
      const onewayAirlineCopy = copy.filter((e:any) => e.sort === 'oneway');
      const roundAirlineCopy = copy.filter((e:any) => e.sort === 'round');
      const onewayAirlineFiltered = onewayAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, departAirline: string, airlineData: string }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, 
          departAirline : item.departAirline, airlineData: JSON.parse(item.airlineData), sort: '편도' })
      );
      const roundAirlineFiltered = roundAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, departAirline: string, airlineData: string }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, 
          departAirline : item.departAirline, airlineData: JSON.parse(item.airlineData), sort: '왕복' })
      );
      setOnewayAirline(onewayAirlineFiltered );
      setRoundAirline(roundAirlineFiltered );
      const combinedAirlines = [...onewayAirlineFiltered, ...roundAirlineFiltered];
      const uniqueAirlines = Array.from(
        new Map(combinedAirlines.map(item => [`${item.tourPeriodNight}${item.tourPeriodDay}-${item.sort}`, item])).values()
      );
      const resultAirlines = uniqueAirlines.map((item:any)=>
        ({ value:`${item.tourPeriodNight}${item.tourPeriodDay}, ${item.sort}`,  label:`${item.tourPeriodNight}${item.tourPeriodDay}, ${item.sort}` })
      );
      resultAirlines.unshift({ value: '선택', label: '선택' });
      setTourPeriodOptions(resultAirlines);
      const uniqueDepartAirport = Array.from(
        new Map(combinedAirlines.map(item => [`${item.departAirportMain}`, item])).values()
      );
      const resultDepartAirport = uniqueDepartAirport.map((item:any)=>
        ({ value:`${item.departAirportMain}`,  label:`${item.departAirportMain}` })
      );
      resultDepartAirport.unshift({ value: '선택', label: '선택' });
      setDepartAirportOptions(resultDepartAirport);
      const uniqueAirlineName = Array.from(
        new Map(combinedAirlines.map(item => [`${item.airlineData[0].airlineName}`, item])).values()
      );
      const resultAirlineName = uniqueAirlineName.map((item:any)=>
        ({ value:`${item.airlineData[0].airlineName}`,  label:`${item.airlineData[0].airlineName}` })
      );
      resultAirlineName.unshift({ value: '선택', label: '선택' });
      setAirlineNameOptions(resultAirlineName);
    }
  };

  const fetchHotelInNation = async (nationCopy: string) => {
    const res = await axios.get(`${MainURL}/tourproducthotel/gethotelsall`);
    if (res.data) {
      const copy = res.data;
      const hotelsCopy = copy.filter((e:any)=> e.city === nationCopy);
      const result = hotelsCopy.map((item:any)=>
        ({ value:`${item.hotelNameKo}`,  label:`${item.hotelNameKo}` })
      );
      result.unshift({ value: '선택', label: '선택' });
      setHotelsOptions(result);
    }
  };

  const fetchTrafficData = async (tourLocationSelected: string) => {
    const res = await axios.get(`${MainURL}/tourproductschedule/gettrafficdata/${nation}/${tourLocationSelected}`);
    if (res.data) {
      const copy = res.data[0];
      copy.airport = JSON.parse(copy.airport);
      copy.station = JSON.parse(copy.station);
      copy.terminal = JSON.parse(copy.terminal);
      copy.harbor = JSON.parse(copy.harbor);
      setTrafficData(copy)
    }
  };

  useEffect(() => {
    if (isAddOrRevise === 'revise') {
      fetchHotelInNation(tourLocation);
      setTourLocation(tourLocation);
      fetchAirlineData(tourLocation);
      fetchHotelInNation(tourLocation);
      fetchPostsDetailProductList(tourLocation);
    }
  }, []);  

     
  // 일정 정보 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    if ( nation === '' || tourLocation === '' || tourPeriod === '' || departAirport === '' || departFlight === '' || landCompany === '') {
      alert('빈칸을 먼저 채워주셔야 합니다.');
    } else {
      const getParams = {
        isView : isView,
        sort : 'default',
        landCompany: landCompany,
        landCompanyCode: landCompanyCode,
        nation : nation,
        tourLocation: tourLocation,
        tourProductName: tourProductName,
        tourPeriod : tourPeriod,
        tourPeriodCode: tourPeriodCode,
        departAirport: departAirport,
        departFlight: departFlight,
        depositCost: depositCost,
        productNotice : productNotice,
        cautionNote: cautionNote,
        contractBenefit : contractBenefit,
        includeNoteText : includeNoteText,
        notIncludeNoteText : notIncludeNoteText
      }
      axios 
        .post(`${MainURL}/tourproductschedule/registerschedule`, getParams)
        .then((res) => {
          if (res.data.success) {
            alert('등록되었습니다.');
            props.setRefresh(!props.refresh);
            setPostId(res.data.id);
          }
        })
        .catch(() => {
          console.log('실패함')
        })
    }
  };

  // 일정 정보 수정 함수 ----------------------------------------------
  const reviseSchedule = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const getParams = {
      postId : postId,
      isView : isView,
      landCompany: landCompany,
      landCompanyCode: landCompanyCode,
      nation : nation,
      tourLocation: tourLocation,
      tourProductName: tourProductName,
      tourPeriod : tourPeriod,
      tourPeriodCode: tourPeriodCode,
      departAirport: departAirport,
      departFlight: departFlight,
      depositCost: depositCost,
      productNotice : productNotice,
      cautionNote: cautionNote,
      contractBenefit : contractBenefit,
      includeNoteText : includeNoteText,
      notIncludeNoteText : notIncludeNoteText,
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/tourproductschedule/reviseschedule`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const datmealOptions = [
    { value: '선택', label: '선택' },
    { value: '기내식', label: '기내식' },
    { value: '선택식', label: '선택식' },
    { value: '외부식', label: '외부식' },
    { value: '리조트', label: '리조트' },
    { value: '자유식', label: '자유식' },
    { value: '현지식', label: '현지식' },
    { value: '포함', label: '포함' },
    { value: '불포함', label: '불포함' }
  ]

  // 일정 데이별 디테일 등록&저장 함수 ----------------------------------------------
  const registerDetailPost = async (item:any) => {
    const getParams = {
      scheduleID : postId,
      day: item.day,
      breakfast: item.breackfast,
      lunch: item.lunch, 
      dinner: item.dinner,
      hotel: item.hotel,
      score: item.score,
      scheduleDetail: JSON.stringify(item.scheduleDetail)
    }
    axios 
      .post(`${MainURL}/tourproductschedule/registerscheduledetail`, getParams)
      .then((res) => {
        if (res.data) {
          alert('저장되었습니다.');
          props.setRefresh(!props.refresh);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 항공편 선택 기능 -----------------------------------------------------------------------------------------------------------------------------------------------------

  // 직항
  const handleAirlineDirect = (airlineItem:any, index:number, subIndex:number, airlineSubIndex:number) => {
    const copy = [...scheduleList];
    copy[index].scheduleDetail[subIndex].airline = 'oneway';
    const airlineWord = airlineItem.airlineData[airlineSubIndex].airlineName.slice(0, 2);
    const airlineWordCopy = (airlineWord === '5J' || airlineWord === '7C') ? `A${airlineWord}` : airlineWord;
    const airlineImage = AirlineData[airlineWordCopy as keyof typeof AirlineData];
    // 시간 차이를 계산하는 로직 추가
    const departTime = airlineItem.airlineData[airlineSubIndex].departTime;
    const arriveTime = airlineItem.airlineData[airlineSubIndex].arriveTime;
    const calcFlightTime = (depart: string, arrive: string) => {
      const departHours = parseInt(depart.slice(0, 2), 10);
      const departMinutes = parseInt(depart.slice(2), 10);
      const arriveHours = parseInt(arrive.slice(0, 2), 10);
      const arriveMinutes = parseInt(arrive.slice(2), 10);
      // 분 단위로 변환
      const departTotalMinutes = departHours * 60 + departMinutes;
      const arriveTotalMinutes = arriveHours * 60 + arriveMinutes;
      // 시간 차이 계산 (도착 시간이 출발 시간보다 빠를 경우 하루를 넘겼다고 가정)
      let flightMinutes = arriveTotalMinutes - departTotalMinutes;
      if (flightMinutes < 0) flightMinutes += 24 * 60; // 하루 더해줌
      const hours = Math.floor(flightMinutes / 60);
      const minutes = flightMinutes % 60;
      return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
    };
    const flightTime = calcFlightTime(departTime, arriveTime);
    copy[index].scheduleDetail[subIndex].airlineDetail = [{
      airlineImage : airlineImage,
      airlineName : airlineItem.airlineData[airlineSubIndex].airlineName,
      departTime : `${departTime.slice(0, 2)}:${departTime.slice(2)}`,
      departAirport : airlineItem.airlineData[airlineSubIndex].departAirport,
      arriveTime : `${arriveTime.slice(0, 2)}:${arriveTime.slice(2)}`,
      arriveAirport : airlineItem.airlineData[airlineSubIndex].arriveAirport,
      flightTime: flightTime
    }];
    setScheduleList(copy);
  }

  // 경유
  const handleAirlineVia = (airlineItem:any, index:number, subIndex:number, airlineSubIndex:number) => {
    const airlineSubIndexCopy1 = airlineSubIndex === 0 ? 0 : 2;
    const airlineSubIndexCopy2 = airlineSubIndex === 0 ? 1 : 3;
    const copy = [...scheduleList];
    copy[index].scheduleDetail[subIndex].airline = 'round';

    const calcFlightTime = (depart: string, arrive: string) => {
      const departHours = parseInt(depart.slice(0, 2), 10);
      const departMinutes = parseInt(depart.slice(2), 10);
      const arriveHours = parseInt(arrive.slice(0, 2), 10);
      const arriveMinutes = parseInt(arrive.slice(2), 10);
      const departTotalMinutes = departHours * 60 + departMinutes;
      const arriveTotalMinutes = arriveHours * 60 + arriveMinutes;
      let flightMinutes = arriveTotalMinutes - departTotalMinutes;
      if (flightMinutes < 0) flightMinutes += 24 * 60;
      const hours = Math.floor(flightMinutes / 60);
      const minutes = flightMinutes % 60;
      return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
    };
    // 첫 번째 구간
    const airlineWord1 = airlineItem.airlineData[airlineSubIndexCopy1].airlineName.slice(0, 2); 
    const airlineWordCopy1 = (airlineWord1 === '5J' || airlineWord1 === '7C') ? `A${airlineWord1}` : airlineWord1;
    const airlineImage1 = AirlineData[airlineWordCopy1 as keyof typeof AirlineData];
    const departTime1 = airlineItem.airlineData[airlineSubIndexCopy1].departTime;
    const arriveTime1 = airlineItem.airlineData[airlineSubIndexCopy1].arriveTime;
    const flightTime1 = calcFlightTime(departTime1, arriveTime1);
    // 두 번째 구간
    const airlineWord2 = airlineItem.airlineData[airlineSubIndexCopy2].airlineName.slice(0, 2); 
    const airlineWordCopy2 = (airlineWord2 === '5J' || airlineWord2 === '7C') ? `A${airlineWord2}` : airlineWord2;
    const airlineImage2 = AirlineData[airlineWordCopy2 as keyof typeof AirlineData];
    const departTime2 = airlineItem.airlineData[airlineSubIndexCopy2].departTime;
    const arriveTime2 = airlineItem.airlineData[airlineSubIndexCopy2].arriveTime;
    const flightTime2 = calcFlightTime(departTime2, arriveTime2);
    copy[index].scheduleDetail[subIndex].airlineDetail = [
      {
        airlineImage: airlineImage1,
        airlineName: airlineItem.airlineData[airlineSubIndexCopy1].airlineName,
        departTime: `${departTime1.slice(0, 2)}:${departTime1.slice(2)}`,
        departAirport: airlineItem.airlineData[airlineSubIndexCopy1].departAirport,
        arriveTime: `${arriveTime1.slice(0, 2)}:${arriveTime1.slice(2)}`,
        arriveAirport: airlineItem.airlineData[airlineSubIndexCopy1].arriveAirport,
        flightTime: flightTime1 // 첫 번째 구간 비행 시간
      },
      {
        airlineImage: airlineImage2,
        airlineName: airlineItem.airlineData[airlineSubIndexCopy2].airlineName,
        departTime: `${departTime2.slice(0, 2)}:${departTime2.slice(2)}`,
        departAirport: airlineItem.airlineData[airlineSubIndexCopy2].departAirport,
        arriveTime: `${arriveTime2.slice(0, 2)}:${arriveTime2.slice(2)}`,
        arriveAirport: airlineItem.airlineData[airlineSubIndexCopy2].arriveAirport,
        flightTime: flightTime2 // 두 번째 구간 비행 시간
      }
    ];
    setScheduleList(copy);
  }

  
 
  // 여행지 검색 & 자동완성기능 -----------------------------------------------------------------------------------------------------------------------------------------------------
	const [isViewSelectScheduleBoxModal, setIsViewSelectScheduleBoxModal] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [detailLocationList, setDetailLocationList] = useState<ScheduleDetailProps[]>([]);
  const [viewAutoCompleteTourLocation, setViewAutoCompleteTourLocation] = useState<boolean[][][][]>(
    () =>
      scheduleList?.map((schedule: ScheduleProps) =>
        schedule.scheduleDetail.map((detail: ScheduleDetailProps) =>
          detail.locationDetail.map((subDetail) =>
            subDetail.subLocationDetail.map(() => false)
          )
        )
      ) || []
  );

  // 여행지 리스트 가져오기 & location 셋팅
  const fetchPostsDetailProductList = async (selectedCity:any) => {
    let res = await axios.get(`${MainURL}/tourproductschedule/getscheduleboxforpost/${selectedCity}`);
    if (res.data) {
      let copy = res.data;
      setDetailLocationList(copy);
    }
  };

  const handleSelectScheduleDetailBoxChange = (index: number, subIndex: number, detailIndex:number, subDetailIndex:number, locationCopy:string, subLocationCopy:string ) => {
    const viewAutoComplete = [...viewAutoCompleteTourLocation];
    viewAutoComplete[index][subIndex][detailIndex][subDetailIndex] = true;
    setViewAutoCompleteTourLocation(viewAutoComplete);
    setIsViewSelectScheduleBoxModal(true);
  }


  // 데이 추가
  const handleDayAdd = async () => {
    const lastItem = scheduleList[scheduleList.length - 1]; 
    const newDay = parseInt(lastItem.day) + 1;
    setScheduleList([...scheduleList, {
      id: `${newDay}`,
      day: newDay.toString(),
      breakfast: lastItem.breakfast,
      lunch: lastItem.lunch,
      dinner: lastItem.dinner,
      hotel: lastItem.hotel,
      score: lastItem.score,
      scheduleDetail: [{ 
        id: '',
        isViaSort : '',
        nation: '',
        city : '',
        selectScheduleSort: '',
        airline : '',
        airlineDetail : [{
          airlineImage : '',
          airlineName : '',
          departTime : '',
          departAirport : '',
          arriveTime : '',
          arriveAirport : '',
          flightTime: ''
        }],
        location: '',
        locationDetail : [{
          subLocation: '',
          subLocationDetail : [{
            locationTitle: '',
            locationContent: '',
            postImage: ''
          }]
        }]
      }]
    }]);
    const viewAutoCopy = [...viewAutoCompleteTourLocation, [[[false]]]];
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

  // 데이 삭제
  const handleDayDelete = async (index:number) => {
    const copyScheduleList = [...scheduleList];
    copyScheduleList.splice(index, 1);
    setScheduleList(copyScheduleList);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy.splice(index, 1);
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

  // 여행지 추가
  const handleLocationAdd = async (index:number) => {
    const inputs = [...scheduleList];
    inputs[index].scheduleDetail = [...inputs[index].scheduleDetail, 
      { id : '',  isViaSort : '', nation: nation, city : '', selectScheduleSort: '', 
        airline : '', airlineDetail : [{airlineImage : '', airlineName : '', departTime : '', departAirport : '', arriveTime : '', arriveAirport : '', flightTime: ''}],
        location: '', locationDetail : [{subLocation: '', subLocationDetail : [{locationTitle: '',locationContent: '', postImage: ''}]}]}];
    setScheduleList(inputs);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy[index] = [...viewAutoCopy[index], [[false]]];
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

   // 여행지 삭제
  const handleLocationDelete  = async (index:number, subIndex:number) => {
    const inputs = [...scheduleList];
    inputs[index].scheduleDetail.splice(subIndex, 1);
    setScheduleList(inputs);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy[index].splice(subIndex, 1);
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };
  
  // 여행지 디테일 추가
  const handleLocationDetailAdd = async (index:number, subIndex:number) => {
    const copy = [...scheduleList];
    copy[index].scheduleDetail[subIndex].locationDetail = [
      ...copy[index].scheduleDetail[subIndex].locationDetail, 
      { 
        subLocation: '',
        subLocationDetail : [{
          locationTitle: '',
          locationContent: '',
          postImage: ''
        }]
      }
    ];
    setScheduleList(copy);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy[index][subIndex] = [...viewAutoCopy[index][subIndex], [false]];
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

  // 여행지 디테일 삭제
  const handleLocationDetailDelete = async (index:number, subIndex:number, detailIndex:number) => {
    const copy = [...scheduleList];
    copy[index].scheduleDetail[subIndex].locationDetail.splice(detailIndex, 1);
    setScheduleList(copy);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy[index][subIndex].splice(detailIndex, 1);
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

  // 여행지 디테일 추가
  const handleSubLocationDetailAdd = async (index:number, subIndex:number, detailIndex:number) => {
    const copy = [...scheduleList];
    copy[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocationDetail = [
      ...copy[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocationDetail, 
      {
        locationTitle: '',
        locationContent: '',
        postImage: ''
      }
    ];
    setScheduleList(copy);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy[index][subIndex][detailIndex] = [...viewAutoCopy[index][subIndex][detailIndex], false];
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

  // 여행지 디테일 삭제
  const handleSubLocationDetailDelete = async (index:number, subIndex:number, detailIndex:number, subDetailIndex:number) => {
    const copy = [...scheduleList];
    copy[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocationDetail.splice(subDetailIndex, 1);
    setScheduleList(copy);
    const viewAutoCopy = [...viewAutoCompleteTourLocation];
    viewAutoCopy[index][subIndex][detailIndex].splice(subDetailIndex, 1);
    setViewAutoCompleteTourLocation(viewAutoCopy)
  };

  const verticalBar40 = {width:'1px', minHeight:'40px', backgroundColor:'#d4d4d4'};

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddScheduleModal(false);
            props.setScheduleDetails([]);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>일정관리</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='노출여부'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView}
                  onChange={()=>{setIsView(true)}}
                />
              </div>
              <p>노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={!isView}
                  onChange={()=>{setIsView(false)}}
                />
              </div>
              <p>미노출</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='랜드사'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{landCompany}</p>
              :
              <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                value={landCompany} onChange={(e)=>{setLandCompany(e.target.value)}}/>
            }
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='코드'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{landCompanyCode}</p>
              :
              <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                value={landCompanyCode} onChange={(e)=>{setLandCompanyCode(e.target.value)}}/>
            }
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='국가/도시'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{nation}</p>
              :
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={nation}
                options={[
                  { value: '선택', label: '선택' },
                  ...props.nationlist.map((nation:any) => (
                    { value: nation.nationKo, label: nation.nationKo }
                  ))
                ]}    
                handleChange={(e)=>{
                  setNation(e.target.value);
                  const copy = [...props.nationlist];
                  const filtered = copy.filter((list:any)=> list.nationKo === e.target.value)
                  setSelectedNation(filtered[0].cities);
                }}
              />
            }
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{tourLocation}</p>
              :
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={tourLocation}
                options={[
                  { value: '선택', label: '선택' },
                  ...selectedNation.map((nation:any) => (
                    { value: nation.cityKo, label: nation.cityKo }
                  ))
                ]}    
                handleChange={(e)=>{
                  setTourLocation(e.target.value);
                  fetchAirlineData(e.target.value);
                  fetchHotelInNation(e.target.value);
                  fetchTrafficData(e.target.value);
                  fetchPostsDetailProductList(e.target.value);
                }}
              />
            }
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품명'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{tourProductName}</p>
              :
              <input className="inputdefault" type="text" style={{width:'40%', marginLeft:'5px'}} 
                value={tourProductName} onChange={(e)=>{setTourProductName(e.target.value)}}/>
            }
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='여행기간'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{tourPeriod}</p>
              :
              <DropdownBox
                widthmain='40%'
                height='35px'
                selectedValue={tourPeriod}
                options={tourPeriodOptions}
                handleChange={(e)=>{setTourPeriod(e.target.value)}}
              />
            }
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='코드'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{tourPeriodCode}</p>
              :
              <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                value={tourPeriodCode} onChange={(e)=>{setTourPeriodCode(e.target.value)}}/>
            }
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='적용항공편'/>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={departAirport}
              options={departAirportOptions}
              handleChange={(e)=>{setDepartAirport(e.target.value)}}
            />
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={departFlight}
              options={airlineNameOptions}    
              handleChange={(e)=>{
                setDepartFlight(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='입금가'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{depositCost}</p>
              :
              <input className="inputdefault" type="text" style={{width:'40%', marginLeft:'5px'}} 
                value={depositCost} onChange={(e)=>{setDepositCost(e.target.value)}}/>
            }
          </div>
        </div>
      </section>
        
      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='상품안내' height={200}/>
            <textarea 
              className="textarea"
              value={productNotice}
              onChange={(e)=>{
                setProductNotice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='예약전 주의사항' height={200}/>
            <textarea 
              className="textarea"
              value={cautionNote}
              onChange={(e)=>{
                setCautionNote(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='계약 혜택' height={200}/>
            <textarea 
              className="textarea"
              value={contractBenefit}
              onChange={(e)=>{
                setContractBenefit(e.target.value);
              }}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='포함사항' height={200}/>
            <textarea 
              className="textarea"
              value={includeNoteText}
              onChange={(e)=>{
                setIncludeNoteText(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='불포함사항' height={200}/>
            <textarea 
              className="textarea"
              value={notIncludeNoteText}
              onChange={(e)=>{
                setNotIncludeNoteText(e.target.value);
              }}
            />
          </div>
        </div>
      </section>

      <div className='btn-box' style={{marginBottom:'50px'}}>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddScheduleModal(false);
            props.setScheduleDetails([]);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={()=>{
              isAddOrRevise === 'add' 
              ? registerPost()
              : reviseSchedule();
            }}
          >
          <p>기본 정보 저장</p>
        </div>
      </div>

      <section>
      { scheduleList.length > 0 
        ?
        scheduleList?.map((item:any, index:any)=>{

          return (
            <div className="schedule" key={index}>
              <div className="top-row">
                <div className="daytitle">
                  <h1>{item.day} DAY</h1>
                </div>
                <div className="daymeal">
                  <p>조식</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.breakfast}
                    options={datmealOptions}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].breakfast = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <p>중식</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.lunch}
                    options={datmealOptions}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].lunch = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <p>석식</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.dinner}
                    options={datmealOptions}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].dinner = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <p>호텔</p>
                  <DropdownBox
                    widthmain='15%'
                    height='35px'
                    selectedValue={item.hotel}
                    options={hotelsOptions}
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].hotel = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                  <DropdownBox
                    widthmain='10%'
                    height='35px'
                    selectedValue={item.score}
                    options={[
                      { value: '선택', label: '선택' },
                      { value: '5', label: '5' },
                      { value: '4', label: '4' },
                      { value: '3', label: '3' },
                      { value: '2', label: '2' },
                      { value: '1', label: '1' },
                    ]}    
                    handleChange={(e)=>{
                      const copy = [...scheduleList];
                      copy[index].score = e.target.value;
                      setScheduleList(copy);
                    }}
                  />
                </div>
              </div>

              <div className="bottom-content">
                {
                  item.scheduleDetail?.map((subItem:any, subIndex:any)=>{ 

                    return (
                      <div className='input-area' key={subIndex}>
                      {
                        subItem.selectScheduleSort === ''
                        &&
                        <div className='select-cover'>
                          <div className="select-Btn-box"
                            onClick={()=>{
                              if (nation === '' || tourLocation === '') {
                                alert('먼저 국가/도시를 선택하셔야 합니다.')
                              } else {
                                const copy = [...scheduleList];
                                copy[index].scheduleDetail[subIndex].selectScheduleSort = 'airline'
                                setScheduleList(copy);  
                              }
                            }}
                          >
                            <p>출도착/항공편</p>
                          </div>
                          <div className="select-Btn-box"
                            onClick={()=>{
                              if (nation === '' || tourLocation === '') {
                                alert('먼저 국가/도시를 선택하셔야 합니다.')
                              } else {
                                const copy = [...scheduleList];
                                copy[index].scheduleDetail[subIndex].selectScheduleSort = 'location'
                                setScheduleList(copy);
                              }
                            }}
                          >
                            <p>일정추가</p>
                          </div>
                          <div className="select-Btn-box"
                            onClick={()=>{
                              if (nation === '' || tourLocation === '') {
                                alert('먼저 국가/도시를 선택하셔야 합니다.')
                              } else {
                                const copy = [...scheduleList];
                                copy[index].scheduleDetail[subIndex].selectScheduleSort = 'traffic'
                                setScheduleList(copy);
                              }
                            }}
                          >
                            <p>교통편</p>
                          </div>
                        </div>
                      }
                      {
                        subItem.selectScheduleSort === 'airline'
                        &&
                        <>
                        { subItem.airline === ""
                          ?
                          <div className='airline-cover'>
                            <section>
                              <div className="bottombar"></div>
                              <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                                <div className='chartbox' style={{width:'10%'}} ><p>기간</p></div>
                                <div className="chart-divider"></div>
                                <div className='chartbox' style={{width:'7%'}} ><p>출발공항</p></div>
                                <div className="chart-divider"></div>
                                <div className='chartbox' style={{width:'7%'}} ><p>출발편명</p></div>
                                <div className="chart-divider"></div>
                                <div style={{width:'76%', display:'flex', justifyContent:'space-between'}}>
                                  <div className='chartbox' style={{width:'3%'}} ><p></p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'12%'}} ><p>항공사</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'15%'}} ><p>출발요일</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'12%'}} ><p>편명</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'12%'}} ><p>출발공항</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'12%'}} ><p>출발시간</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'12%'}} ><p>도착공항</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'12%'}} ><p>도착시간</p></div>
                                  <div className="chart-divider"></div>
                                  <div className='chartbox' style={{width:'8%'}} ><p>선택</p></div>
                                </div>
                              </div>
                              <div className="bottombar"></div>
                              {
                                onewayAirline.map((airlineItem:any, airlineIndex:any)=>{

                                  return (
                                    <div className="coverbox" key={airlineIndex}>
                                      <div className="coverrow hole">
                                        <div style={{width:'10%', display:'flex', alignItems:'center'}} >
                                          <p>{airlineItem.sort}</p>
                                          <p>{airlineItem.tourPeriodNight}</p>
                                          <p>{airlineItem.tourPeriodDay}</p>
                                        </div>
                                        <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'7%'}} >
                                          <p>{airlineItem.departAirportMain}</p>
                                        </div>
                                        <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'7%'}} >
                                          <p>{airlineItem.departAirline}</p>
                                        </div>
                                        <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'76%'}} >
                                        {
                                          airlineItem.airlineData.map((airlineSubItem:any, airlineSubIndex:any)=>{
                                            return (
                                              <div className='airline-cover-select-subRow' key={airlineSubIndex}>
                                                <div style={{width:'3%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                                                  { airlineSubItem.sort === 'depart' && <BiSolidRightArrowAlt /> }
                                                  { airlineSubItem.sort === 'arrive' && <BiSolidLeftArrowAlt /> }
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.airlineName}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'15%'}} >
                                                  <div className="dayBox">
                                                    <p>{airlineSubItem.departDate}</p>
                                                  </div>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.planeName}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.departAirport}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.departTime}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.arriveAirport}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.arriveTime}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'8%'}} className='airline-cover-select-box'>
                                                  <p
                                                  onClick={()=>{
                                                    handleAirlineDirect(airlineItem, index, subIndex, airlineSubIndex);
                                                  }}
                                                  >선택</p>
                                                </div>
                                              </div>
                                            )
                                          })
                                        }
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                              <div className="bottombar"></div>
                              {
                                roundAirline.map((airlineItem:any, airlineIndex:any)=>{
                                  return (
                                    <div className="coverbox" key={airlineIndex}>
                                      <div className="coverrow hole">
                                        <div style={{width:'10%', display:'flex', alignItems:'center'}} >
                                          <p>{airlineItem.sort}</p>
                                          <p>{airlineItem.tourPeriodNight}</p>
                                          <p>{airlineItem.tourPeriodDay}</p>
                                        </div>
                                        <div style={{width:'1px', minHeight:'160px', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'7%'}} >
                                          <p>{airlineItem.departAirportMain}</p>
                                        </div>
                                        <div style={{width:'1px', minHeight:'160px', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'7%'}} >
                                          <p>{airlineItem.departAirline}</p>
                                        </div>
                                        <div style={{width:'1px', minHeight:'160px', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'76%'}} >
                                        {
                                          airlineItem.airlineData.map((airlineSubItem:any, airlineSubIndex:any)=>{
                                            return (
                                              <div className='airline-cover-select-subRow' key={airlineSubIndex}>
                                                <div style={{width:'3%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                                                { airlineSubItem.sort === 'depart' && <BiSolidArrowToRight /> }
                                                { airlineSubItem.sort === 'arrive' && <BiSolidArrowFromRight /> }
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.airlineName}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'15%'}} >
                                                  <div className="dayBox">
                                                    <p>{airlineSubItem.departDate}</p>
                                                  </div>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.planeName}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.departAirport}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.departTime}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.arriveAirport}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'12%'}} >
                                                  <p>{airlineSubItem.arriveTime}</p>
                                                </div>
                                                <div style={verticalBar40}></div>
                                                <div style={{width:'8%'}} className='airline-cover-select-box'>
                                                { (airlineSubIndex === 0 || airlineSubIndex === 3) &&
                                                  <p
                                                    onClick={()=>{
                                                      handleAirlineVia(airlineItem, index, subIndex, airlineSubIndex);
                                                    }}
                                                  >선택</p> 
                                                }
                                                </div>
                                              </div>
                                            )
                                          })
                                        }
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </section>
                          </div>
                          :
                          <div className='airline-cover'>
                          { subItem.airline === "oneway"
                            ?
                            <div className="schedule__element__wrapper">
                              <div className="flight__schedule__board__wrapper">
                                <div className="flight__schedule__board">
                                  <div className="flight__info__wrapper">
                                    <img src={subItem.airlineDetail[0].airlineImage} alt="temp" />
                                    <span>{subItem.airlineDetail[0].airlineName}</span>
                                  </div>
                                  <div className="flight__time__wrapper">
                                    <span className="flight__time">{subItem.airlineDetail[0].flightTime}</span>
                                    <div className="depart__info">
                                      <div />
                                      <span className="time__text">{subItem.airlineDetail[0].departTime}</span>
                                      <span className="airport__text">{subItem.airlineDetail[0].departAirport} 출발</span>
                                    </div>
                                    <div className="arrive__info">
                                      <div />
                                      <span className="time__text">{subItem.airlineDetail[0].arriveTime}</span>
                                      <span className="airport__text">{subItem.airlineDetail[0].arriveAirport} 도착</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            :
                            <div className="schedule__element__wrapper">
                              <div className="flight__schedule__board__wrapper">
                                <div className="flight__schedule__board" style={{marginBottom:'50px'}}>
                                  <div className="flight__info__wrapper">
                                    <img src={subItem.airlineDetail[0].airlineImage} alt="temp" />
                                    <span>{subItem.airlineDetail[0].airlineName}</span>
                                  </div>
                                  <div className="flight__time__wrapper">
                                    <span className="flight__time">{subItem.airlineDetail[0].flightTime}</span>
                                    <div className="depart__info">
                                      <div />
                                      <span className="time__text">{subItem.airlineDetail[0].departTime}</span>
                                      <span className="airport__text">{subItem.airlineDetail[0].departAirport} 출발</span>
                                    </div>
                                    <div className="arrive__info">
                                      <div />
                                      <span className="time__text">{subItem.airlineDetail[0].arriveTime}</span>
                                      <span className="airport__text">{subItem.airlineDetail[0].arriveAirport} 도착</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flight__schedule__board">
                                  <div className="flight__info__wrapper">
                                    <img src={subItem.airlineDetail[1].airlineImage} alt="temp" />
                                    <span>{subItem.airlineDetail[1].airlineName}</span>
                                  </div>
                                  <div className="flight__time__wrapper">
                                    <span className="flight__time">{subItem.airlineDetail[1].flightTime}</span>
                                    <div className="depart__info">
                                      <div />
                                      <span className="time__text">{subItem.airlineDetail[1].departTime}</span>
                                      <span className="airport__text">{subItem.airlineDetail[1].departAirport} 출발</span>
                                    </div>
                                    <div className="arrive__info">
                                      <div />
                                      <span className="time__text">{subItem.airlineDetail[1].arriveTime}</span>
                                      <span className="airport__text">{subItem.airlineDetail[1].arriveAirport} 도착</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          </div>
                        }
                        </>
                      }
                      {
                        subItem.selectScheduleSort === 'location'
                        &&
                        <div className="schedule-cover">
                          <div className='rowbox'>
                            <div className='icon-box'>
                              <ImLocation color='#5fb7ef' size={20}/>
                            </div>
                            <input style={{width:'30%'}} value={subItem.location}
                              className="inputdefault" type="text" maxLength={100}
                              onChange={(e)=>{
                                const inputs = [...scheduleList];
                                inputs[index].scheduleDetail[subIndex].location = e.target.value;
                                setScheduleList(inputs);
                              }}
                            />
                          </div>
                          {
                            subItem.locationDetail.map((detailItem:any, detailIndex:any)=>{

                              return (
                                <div key={detailIndex}>
                                  <div className='rowbox'>
                                    <div className="icon-box">
                                      <div className="dot__icon" />
                                    </div>
                                    <input style={{width:'30%'}} value={detailItem.subLocation}
                                      className="inputdefault" type="text" maxLength={100}
                                      onChange={(e)=>{
                                        const inputs = [...scheduleList];
                                        inputs[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocation = e.target.value;
                                        setScheduleList(inputs);
                                      }}
                                    />
                                    <div className="schedule-dayBox">
                                      <div className="schedule-dayBtn"
                                        onClick={()=>{
                                          handleLocationDetailAdd(index, subIndex)
                                        }}
                                      >
                                        <p>+</p>
                                      </div>
                                    </div>  
                                    <div className="schedule-dayBox">
                                      <div className="schedule-dayBtn"
                                        onClick={()=>{
                                          handleLocationDetailDelete(index, subIndex, detailIndex);
                                        }}
                                      >
                                        <p>-</p>
                                      </div>
                                    </div>  
                                  </div>
                                  {
                                    detailItem.subLocationDetail.map((subDetailItem:any, subDetailIndex:any)=>{

                                      const postImages = subDetailItem.postImage ? JSON.parse(subDetailItem.postImage) : "";

                                      return (
                                        <div className='rowbox' key={subDetailIndex}>
                                          <div className="icon-box" style={{flexDirection:'column'}}>
                                            <div className="schedule-dayBox">
                                              <div className="schedule-dayBtn"
                                                onClick={()=>{
                                                  handleSubLocationDetailAdd(index, subIndex, detailIndex);
                                                }}
                                              >
                                                <p>+</p>
                                              </div>
                                            </div>  
                                            <div className="schedule-dayBox">
                                              <div className="schedule-dayBtn"
                                                onClick={()=>{
                                                  handleSubLocationDetailDelete(index, subIndex, detailIndex, subDetailIndex);
                                                }}
                                              >
                                                <p>-</p>
                                              </div>
                                            </div>  
                                          </div>
                                          <div className='scheduletextbox'>
                                            <div className="scheduletextbox-imagebox">
                                              <div className="imagebox">
                                                {
                                                  subDetailItem.postImage !== '' &&
                                                  <img style={{height:'100%', width:'100%'}}
                                                    src={`${MainURL}/images/scheduledetailboximages/${postImages[0]}`}
                                                  />
                                                }                                                    
                                              </div>
                                            </div>
                                            <div className="scheduletextbox-textbox">
                                              <input style={{width:'95%'}} value={subDetailItem.locationTitle} 
                                                className="inputdefault" type="text" maxLength={100}
                                                onClick={(e) => {
                                                  handleSelectScheduleDetailBoxChange(index, subIndex, detailIndex, subDetailIndex, subItem.location, detailItem.subLocation)
                                                }}
                                                onChange={(e)=>{
                                                  const copy = [...scheduleList];
                                                  copy[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocationDetail[subDetailIndex].locationTitle = e.target.value
                                                  setScheduleList(copy);
                                                }}
                                              />
                                              <textarea 
                                                className="textarea" style={{minHeight: '150px'}}
                                                maxLength={300}
                                                value={subDetailItem.locationContent}
                                                onChange={(e)=>{
                                                  const filteredValue = e.target.value.replace(/\t/g, ""); 
                                                  const copy = [...scheduleList];
                                                  copy[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocationDetail[subDetailIndex].locationContent = filteredValue;
                                                  setScheduleList(copy);
                                                }}
                                                onKeyDown={(e) => {
                                                  if (e.key === "Tab") {
                                                    alert('탭문자는 입력이 불가능합니다.')
                                                  }
                                                }}
                                              />
                                            </div>
                                          </div>
                                          { (isViewSelectScheduleBoxModal && viewAutoCompleteTourLocation[index][subIndex][detailIndex][subDetailIndex]) &&
                                            <div className="selectScheduleBox-autoComplete">
                                              <ModalSelectScheduleDetailBox
                                                refresh={refresh}
                                                setRefresh={setRefresh}
                                                setIsViewSelectScheduleBoxModal={setIsViewSelectScheduleBoxModal}
                                                viewAutoCompleteTourLocation={viewAutoCompleteTourLocation}
                                                setViewAutoCompleteTourLocation={setViewAutoCompleteTourLocation}
                                                nation={nation}
                                                detailLocationList={detailLocationList}
                                                scheduleList={scheduleList}
                                                setScheduleList={setScheduleList}
                                                index={index}
                                                subIndex={subIndex}
                                                detailIndex={detailIndex}
                                                subDetailIndex={subDetailIndex}
                                              />
                                            </div>  
                                          }
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              )
                            })
                          }
                        </div>
                      }
                      {
                        subItem.selectScheduleSort === 'traffic'
                        &&
                        <>
                        <section>
                          <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                            <div className='chartbox' style={{width:'15%'}} ><p>기간</p></div>
                            <div className="chart-divider"></div>
                            <div style={{width:'85%', display:'flex'}}>
                              <div className='chartbox' style={{width:'19%'}} ><p>터미널</p></div>
                              <div className="chart-divider"></div>
                              <div className='chartbox' style={{width:'19%'}} ><p>교통편</p></div>
                              <div className="chart-divider"></div>
                              <div className='chartbox' style={{width:'19%'}} ><p>운영요일</p></div>
                              <div className="chart-divider"></div>
                              <div className='chartbox' style={{width:'19%'}} ><p>연결도시</p></div>
                              <div className="chart-divider"></div>
                              <div className='chartbox' style={{width:'19%'}}><p>이동시간</p></div>
                              <div className="chart-divider"></div>
                              <div className='chartbox' style={{width:'5%'}}><p></p></div>
                            </div>
                          </div>
                          <div className="coverbox">
                            <div className="coverrow hole">
                              <div style={{width:'15%', textAlign:'center'}}>항공</div>
                              <div style={{width:'85%'}} >
                                {
                                  trafficData?.airport.map((item:any, index:any)=>(
                                  <div style={{width:'100%', display:'flex', alignItems:'center'}} key={index}>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.terminal}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.trafficName}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.operateDay}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.connectCity}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.moveTime}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} ></div>
                                  </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                          <div className="coverbox">
                            <div className="coverrow hole">
                              <div style={{width:'15%', textAlign:'center'}}>항구</div>
                              <div style={{width:'85%'}} >
                                {
                                  trafficData?.harbor.map((item:any, index:any)=>(
                                  <div style={{width:'100%', display:'flex', alignItems:'center'}} key={index}>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.terminal}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.trafficName}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.operateDay}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.connectCity}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.moveTime}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} ></div>
                                  </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                          <div className="coverbox">
                            <div className="coverrow hole">
                              <div style={{width:'15%', textAlign:'center'}}>역</div>
                              <div style={{width:'85%'}} >
                                {
                                  trafficData?.station.map((item:any, index:any)=>(
                                  <div style={{width:'100%', display:'flex', alignItems:'center'}} key={index}>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.terminal}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.trafficName}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.operateDay}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.connectCity}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.moveTime}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} ></div>
                                  </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                          <div className="coverbox">
                            <div className="coverrow hole">
                              <div style={{width:'15%', textAlign:'center'}}>터미널</div>
                              <div style={{width:'85%'}} >
                                {
                                  trafficData?.terminal.map((item:any, index:any)=>(
                                  <div style={{width:'100%', display:'flex', alignItems:'center'}} key={index}>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.terminal}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.trafficName}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.operateDay}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.connectCity}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'19%', textAlign:'center'}}>{item.moveTime}</div>
                                    <div style={verticalBar40}></div>
                                    <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} ></div>
                                  </div>
                                  ))
                                }
                              </div>
                            </div>
                          </div>
                        </section>
                        </>
                      }
                      <div className="btnrow">
                        <div className="btn" style={{backgroundColor:"#fff", margin:'10px 10px'}}
                          onClick={()=>{
                            handleLocationDelete(index, subIndex);
                          }}>
                          <p><CiCircleMinus/>여행지삭제</p>
                        </div>
                        <div className="btn" style={{backgroundColor:"#EAEAEA", margin:'10px 0'}}
                          onClick={()=>{
                            handleLocationAdd(index);
                          }}>
                          <p><CiCirclePlus />여행지추가</p>
                        </div>
                      </div>
                    </div>
                    )
                  })
                }
              </div>
              <div style={{width:'100%', height:'1px', backgroundColor:'#BDBDBD'}}></div>
              <div className='btn-box' style={{marginTop:'20px'}}>
                <div className="btn" style={{backgroundColor:'#5fb7ef'}}
                    onClick={()=>{
                      registerDetailPost(item);
                    }}
                  >
                  <p>{item.day}DAY 저장</p>
                </div>
              </div>
              {
                scheduleList.length - 1 === index &&
                <div className="daybtnrow"  style={{marginTop:'20px'}}>
                  <div className="daybtn" style={{width:'25%', backgroundColor:"#fff"}}
                    onClick={()=>{
                      handleDayDelete(index);
                    }}>
                    <CiCircleMinus /><p>DAY삭제</p>
                  </div>
                  <div className="daybtn" style={{width:'70%', backgroundColor:"#EAEAEA"}}
                      onClick={()=>{
                        handleDayAdd();
                      }}>
                    <CiCirclePlus /><p>DAY추가</p>
                  </div>
                </div>
              }
            </div>      
          )
        })
        :
        <div className="daybtnrow"  style={{marginTop:'20px'}}>
          <div className="daybtn" style={{width:'70%', backgroundColor:"#EAEAEA"}}
              onClick={()=>{
                setScheduleList(
                  [{
                    id: ``,
                    day: '1',
                    breakfast: '',
                    lunch: '',
                    dinner: '',
                    hotel: '',
                    score: '',
                    scheduleDetail: [{ 
                      id: '',
                      isViaSort : '',
                      nation: '',
                      city : '',
                      selectScheduleSort: '',
                      airline : '',
                      airlineDetail : [{
                        airlineImage : '',
                        airlineName : '',
                        departTime : '',
                        departAirport : '',
                        arriveTime : '',
                        arriveAirport : '',
                        flightTime: ''
                      }],
                      location: '',
                      locationDetail : [{
                        subLocation: '',
                        subLocationDetail : [{
                          locationTitle: '',
                          locationContent: '',
                          postImage: ''
                        }]
                      }]
                    }]
                  }]
                )
              }}>
            <CiCirclePlus /><p>DAY추가</p>
          </div>
        </div>
      }
            
      </section>


      
    </div>     
  )
}
