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
import ModalSelectScheduleBox from './ModalSelectScheduleBox';


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
  sort: string;
  nation : string;
  city : string;
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


export default function ModalAddSchedule (props : any) {
	
  const isAddOrRevise = props.isAddOrRevise;
  const scheduleData = props.scheduleInfo;
  const [selectedNation, setSelectedNation] = useState<any>([]);

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
          sort: '',
          nation: '',
          city : '',
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

  const fetchTourPeriod = async (tourLocationSelected: string) => {
    const res = await axios.get(`${MainURL}/product/getairplane/${nation}/${tourLocationSelected}`);
    if (res.data) {
      const copy = res.data;
      const directAirlineCopy = copy.filter((e:any) => e.sort === 'direct');
      const viaAirlineCopy = copy.filter((e:any) => e.sort === 'via');
      const directAirlineFiltered = directAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, departAirline: string, airlineData: string }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, 
          departAirline : item.departAirline, airlineName: JSON.parse(item.airlineData), sort: '직항' })
      );
      const viaAirlineFiltered = viaAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, departAirline: string, airlineData: string }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, 
          departAirline : item.departAirline, airlineName: JSON.parse(item.airlineData), sort: '경유' })
      );
      const combinedAirlines = [...directAirlineFiltered, ...viaAirlineFiltered];
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
        new Map(combinedAirlines.map(item => [`${item.airlineName[0].airlineName}`, item])).values()
      );
      const resultAirlineName = uniqueAirlineName.map((item:any)=>
        ({ value:`${item.airlineName[0].airlineName}`,  label:`${item.airlineName[0].airlineName}` })
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

  useEffect(() => {
    if (isAddOrRevise === 'revise') {
      fetchHotelInNation(tourLocation);
    }
	}, []);  


     
  // 일정 정보 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    const getParams = {
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
      notIncludeNoteText : notIncludeNoteText
    }
    axios 
      .post(`${MainURL}/tourproductschedule/registerschedule`, getParams)
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 일정 정보 수정 함수 ----------------------------------------------
  const reviseSchedule = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const getParams = {
      postId : scheduleData.id,
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
      scheduleID : scheduleData.id,
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


  // 여행지 검색 & 자동완성기능 -----------------------------------------------------------------------------------------------------------------------------------------------------
	const [isViewSelectScheduleBoxModal, setIsViewSelectScheduleBoxModal] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [tourLocationList, setTourLocationList] = useState<ScheduleDetailProps[]>([]);
  const [selectedTourLocationList, setselectedTourLocationList] = useState<ScheduleDetailProps[]>([]);
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
  const [locationOptions, setLocationOptions] = useState([{ value: '선택', label: '선택' }]);
  const [subLocationOptions, setSubLocationOptions] = useState([{ value: '선택', label: '선택' }]);

  // 여행지 리스트 가져오기 & location 셋팅
  const fetchPostsTourList = async (selectedCity:any) => {
    let res = await axios.get(`${MainURL}/tourproductschedule/getscheduleboxforpost/${selectedCity}`);
    if (res !== undefined ) {
      let copy = res.data;
      setTourLocationList(copy);
      const locationresult = copy.map((item:any)=>
        ({ value:`${item.location}`,  label:`${item.location}` })
      );
      locationresult.unshift({ value: '선택', label: '선택' });
      setLocationOptions(locationresult);
    }
  };

  const handleSubLocationOption = (text: string ) => {
    const tourLocationCopy = [...tourLocationList];
    const result = tourLocationCopy.filter((item:any)=> item.location === text);
    const locationresult = result.map((item:any)=>
      ({ value:`${item.subLocation}`,  label:`${item.subLocation}` })
    );
    locationresult.unshift({ value: '선택', label: '선택' });
    setSubLocationOptions(locationresult);
  }

  const handleSelectScheduleBoxChange = (index: number, subIndex: number, detailIndex:number, subDetailIndex:number, locationCopy:string, subLocationCopy:string ) => {
    const tourLocationCopy = [...tourLocationList];
    const result = tourLocationCopy.filter((item:any)=> item.location === locationCopy && item.subLocation === subLocationCopy );
    setselectedTourLocationList(result);
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
        sort: '',
        nation: '',
        city : '',
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
      { id : '',  isViaSort : '', sort: '', nation: nation, city : '', location: '', 
        locationDetail:[
          {subLocation: '', subLocationDetail : [{locationTitle: '',locationContent: '', postImage: ''}]}
        ]}];
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
                  fetchTourPeriod(e.target.value);
                  fetchHotelInNation(e.target.value);
                  fetchPostsTourList(e.target.value);
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
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{departAirport}</p>
              :
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={departAirport}
                options={departAirportOptions}
                handleChange={(e)=>{setDepartAirport(e.target.value)}}
              />
            }
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{departFlight}</p>
              :
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={departFlight}
                options={airlineNameOptions}    
                handleChange={(e)=>{
                  setDepartFlight(e.target.value)
                }}
              />
            }
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
      { scheduleList.length > 0 &&
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
                        <div className="cover">
                          <div className='rowbox'>
                            <div className='icon-box'>
                              <ImLocation color='#5fb7ef' size={20}/>
                            </div>
                            {
                              subItem.location === '' 
                              ? 
                              <DropdownBox
                                widthmain='30%'
                                height='35px'
                                selectedValue={subItem.location}
                                options={locationOptions}
                                handleChange={(e)=>{
                                  const inputs = [...scheduleList];
                                  inputs[index].scheduleDetail[subIndex].location = e.target.value;
                                  setScheduleList(inputs);
                                  handleSubLocationOption(e.target.value);
                                }}
                              />
                              :
                              <input style={{width:'30%'}} value={subItem.location}
                                className="inputdefault" type="text" maxLength={100}
                              />
                            }
                          </div>
                          {
                            subItem.locationDetail.map((detailItem:any, detailIndex:any)=>{

                              return (
                                <div key={detailIndex}>
                                  <div className='rowbox'>
                                    <div className="icon-box">
                                      <div className="dot__icon" />
                                    </div>
                                    {
                                      detailItem.subLocation === '' 
                                      ? 
                                      <DropdownBox
                                        widthmain='30%'
                                        height='35px'
                                        selectedValue={detailItem.subLocation}
                                        options={subLocationOptions}
                                        handleChange={(e)=>{
                                          const inputs = [...scheduleList];
                                          inputs[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocation = e.target.value;
                                          setScheduleList(inputs);
                                        }}
                                      />
                                      :
                                      <input style={{width:'30%'}} value={detailItem.subLocation}
                                        className="inputdefault" type="text" maxLength={100}
                                      />
                                    }
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
                                                    src={`${MainURL}/images/scheduleboximages/${postImages}`}
                                                  />
                                                }                                                    
                                              </div>
                                            </div>
                                            <div className="scheduletextbox-textbox">
                                              <input style={{width:'95%'}} value={subDetailItem.locationTitle} 
                                                className="inputdefault" type="text" maxLength={100}
                                                onClick={(e) => {
                                                  if (nation === '' || tourLocation === '') {
                                                    alert('먼저 국가/도시를 선택하셔야 합니다.')
                                                  } else {
                                                    handleSelectScheduleBoxChange(index, subIndex, detailIndex, subDetailIndex, subItem.location, detailItem.subLocation)
                                                  }
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
                                                  const copy = [...scheduleList];
                                                  copy[index].scheduleDetail[subIndex].locationDetail[detailIndex].subLocationDetail[subDetailIndex].locationContent = e.target.value
                                                  setScheduleList(copy);
                                                }}
                                              />
                                            </div>
                                          </div>
                                          { (isViewSelectScheduleBoxModal && viewAutoCompleteTourLocation[index][subIndex][detailIndex][subDetailIndex]) &&
                                            <div className="selectScheduleBox-autoComplete">
                                              <ModalSelectScheduleBox
                                                refresh={refresh}
                                                setRefresh={setRefresh}
                                                setIsViewSelectScheduleBoxModal={setIsViewSelectScheduleBoxModal}
                                                viewAutoCompleteTourLocation={viewAutoCompleteTourLocation}
                                                setViewAutoCompleteTourLocation={setViewAutoCompleteTourLocation}
                                                nation={nation}
                                                selectedTourLocationList={selectedTourLocationList}
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
      }
            
      </section>


      
    </div>     
  )
}
