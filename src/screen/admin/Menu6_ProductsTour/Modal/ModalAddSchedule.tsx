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

interface ScheduleProps {
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
  sort: string;
  location: string;
  subLocation : string;
  locationTitle : string;
  locationContent : string;
  locationContentDetail : {name:string; notice:string[]}[];
  postImage : string;
}

export default function ModalAddSchedule (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const scheduleData = props.scheduleInfo;
  const [selectedNation, setSelectedNation] = useState<any>([]);

  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? scheduleData.isView : true);
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? scheduleData.nation : '');
  const [tourLocation, setTourLocation] = useState(isAddOrRevise === 'revise' ? scheduleData.tourLocation : '');
  const [tourPeriod, setTourPeriod] = useState(isAddOrRevise === 'revise' ? scheduleData.tourPeriod : '');
  const [departAirport, setDepartAirport] = useState(isAddOrRevise === 'revise' ? scheduleData.departAirport : '');
  const [departFlight, setDepartFlight] = useState(isAddOrRevise === 'revise' ? scheduleData.departFlight : '');
  const [landCompany, setLandCompany] = useState(isAddOrRevise === 'revise' ? scheduleData.landCompany : '');
  const [productType, setProductType] = useState(isAddOrRevise === 'revise' ? scheduleData.productType : '');
  const [selectedSchedule, setSelectedSchedule] = useState(isAddOrRevise === 'revise' ? scheduleData.selectedSchedule : '');
  const [cautionNote, setCautionNote] = useState(isAddOrRevise === 'revise' ? scheduleData.cautionNote : '');
  const [includeNote, setIncludeNote] = useState(isAddOrRevise === 'revise' ? JSON.parse(scheduleData.includeNote) : [""]);
  const [includeNoteText, setIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.includeNoteText : '');
  const [notIncludeNote, setNotIncludeNote] = useState(isAddOrRevise === 'revise' ? JSON.parse(scheduleData.notIncludeNote) : [""]);
  const [notIncludeNoteText, setNotIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleData.notIncludeNoteText : '');
  const [scheduleList, setScheduleList] = useState<ScheduleProps[]>( 
    isAddOrRevise === 'revise' 
    ? props.scheduleDetails 
    : [{ day : '1', breakfast :'', lunch:'', dinner :'', hotel:'', score:'', 
        scheduleDetail: [{ 
          id: '',
          sort: '',
          location: '',
          subLocation: '',
          locationTitle: '',
          locationContent: '',
          locationContentDetail: [{ name: "", notice: [""] }],
          postImage: '',
        }]
      }]
  );  
  
  // 데이 추가
  const handleDayAdd = async () => {
    const lastItem = scheduleList[scheduleList.length - 1]; 
    const newDay = parseInt(lastItem.day) + 1;
    const newItem = {
      id: `${newDay}`,
      day: newDay.toString(),
      breakfast: lastItem.breakfast,
      lunch: lastItem.lunch,
      dinner: lastItem.dinner,
      hotel: lastItem.hotel,
      score: lastItem.score,
      scheduleDetail: [{ 
        id: '',
        sort: '',
        location: '',
        subLocation: '',
        locationTitle: '',
        locationContent: '',
        locationContentDetail: [{ name: "", notice: [""] }],
        postImage: '',
      }]
    };
    setScheduleList([...scheduleList, newItem]);
    setViewAutoCompleteTourLocation([
      ...viewAutoCompleteTourLocation,
      Array(newItem.scheduleDetail.length).fill(false)
    ]);
  };

  // 데이 삭제
  const handleDayDelete = async () => {
    const copyScheduleList = [...scheduleList];
    copyScheduleList.pop();
    setScheduleList(copyScheduleList);
    const copyViewAutoComplete = [...viewAutoCompleteTourLocation];
    copyViewAutoComplete.pop();
    setViewAutoCompleteTourLocation(copyViewAutoComplete);
  };
  

  // selectbox ----------------------------------------------
  interface SelectBoxProps {
    text : string;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={productType === text}
          onChange={()=>{
            setProductType(text);
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

  interface SelectBoxIncludeNotInclueProps {
    text : string;
    useState: any;
    setUseSate: any;
  }

  const SelectBoxIncludeNotInclue : React.FC<SelectBoxIncludeNotInclueProps> = ({ text, useState, setUseSate }) => (
    <div className='etcCheckInput'>
      <input className="input" type="checkbox"
        checked={useState.includes(text)}
        onChange={()=>{
          const copy = [...useState];
          if (useState.includes(text)) {
            const result = copy.filter(e => e !== text);
            setUseSate(result);
          } else {
            copy.push(text); 
            setUseSate(copy);
          }
        }}
      />
      <p>{text}</p>
    </div>
  )


  // 여행 기간, 적용 항공편 가져오기 
  const [tourPeriodOptions, setTourPeriodOptions] = useState([{ value: '선택', label: '선택' }]);
  const [departAirportOptions, setDepartAirportOptions] = useState([{ value: '선택', label: '선택' }]);
  const [airlineNameOptions, setAirlineNameOptions] = useState([{ value: '선택', label: '선택' }]);
  const [hotelsOptions, setHotelsOptions] = useState([{ value: '선택', label: '선택' }]);

  const fetchTourPeriod = async (tourLocationSelected: string) => {
    const res = await axios.get(`${MainURL}/product/getairplane/${tourLocationSelected}`);
    if (res.data) {
      const copy = res.data[0];
      const directAirlineCopy = copy.directAirline ? JSON.parse(copy.directAirline as string) : [];
      const viaAirlineCopy = copy.viaAirline ? JSON.parse(copy.viaAirline) : [];
      const directAirlineFiltered = directAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, airlineData: any[] }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, airlineName:item.airlineData[0].airlineName, sort: '직항' })
      );
      const viaAirlineFiltered = viaAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, airlineData: any[] }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, airlineName:item.airlineData[0].airlineName, sort: '경유' })
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
        new Map(combinedAirlines.map(item => [`${item.airlineName}`, item])).values()
      );
      const resultAirlineName = uniqueAirlineName.map((item:any)=>
        ({ value:`${item.airlineName}`,  label:`${item.airlineName}` })
      );
      resultAirlineName.unshift({ value: '선택', label: '선택' });
      setAirlineNameOptions(resultAirlineName);
    }
  };

  const fetchHotelInNation = async (nationCopy: string) => {
    console.log(nationCopy);
    const res = await axios.get(`${MainURL}/producthotel/gethotels`);
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
      nation : nation,
      tourLocation: tourLocation,
      landCompany: landCompany,
      productType : productType,
      tourPeriod : tourPeriod,
      departAirport: departAirport,
      departFlight: departFlight,
      cautionNote: cautionNote,
      includeNote: JSON.stringify(includeNote),
      includeNoteText: includeNoteText,
      notIncludeNote: JSON.stringify(notIncludeNote),
      notIncludeNoteText: notIncludeNoteText
    }
    axios 
      .post(`${MainURL}/productschedule/registerschedule`, getParams)
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
      productType : productType,
      cautionNote: cautionNote,
      includeNote: JSON.stringify(includeNote),
      includeNoteText: includeNoteText,
      notIncludeNote: JSON.stringify(notIncludeNote),
      notIncludeNoteText: notIncludeNoteText,
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/productschedule/reviseschedule`, getParams)
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
      .post(`${MainURL}/productschedule/registerscheduledetail`, getParams)
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

  // 일정 검색 & 자동완성기능 -----------------------------------------------------------------------------------------------------------------------------------------------------

  const [fetchScheduleList, setFetchScheduleList] = useState<ScheduleDetailProps[]>([]);
  // 일정가져오기 리스트 가져오기
  const fetchPostsScheduleList = async () => {
    let res = await axios.get(`${MainURL}/productschedule/getproductschedule`);
    if (res.data) {
      const copy = res.data;
      setFetchScheduleList(copy);
    }
  };

  const [viewAutoCompleteFetchSchedule, setViewAutoCompleteFetchSchedule] = useState<boolean>(false);
  const [dropDownListFetchSchedule, setDropDownListFetchSchedule] = useState<ScheduleDetailProps[]>([]);
  const [dropDownItemIndexFetchSchedule, setDropDownItemIndexFetchSchedule] = useState(-1);
  const [isComposingFetchSchedule, setIsComposingFetchSchedule] = useState(false);

  // 일정가져오기 입력창 변경 
  const handleFetchScheduleChange = (text: string) => {
    setSelectedSchedule(text)
    if (text.length > 1) {
      fetchPostsScheduleList();
    }
    setDropDownItemIndexFetchSchedule(-1);
    handleAutoCompleteFetchSchedule(text);
    setViewAutoCompleteFetchSchedule(true);
  };

  // 일정가져오기 자동필터  -----------------
  const handleAutoCompleteFetchSchedule = (text : string ) => {
    const copy = fetchScheduleList.filter((e: any) => e.tourLocation.includes(text) === true);
    copy.sort((a, b) => (a.location > b.location) ? 1 : -1);
    setDropDownListFetchSchedule(copy);
  }

  const handleDropDownKeyFetchSchedule = (event:any) => {
    if (isComposingFetchSchedule) return;
    if (viewAutoCompleteFetchSchedule) {
      if (event.key === 'ArrowDown' && dropDownItemIndexFetchSchedule === -1) {
        setDropDownItemIndexFetchSchedule(0)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexFetchSchedule >= 0 && dropDownItemIndexFetchSchedule !== dropDownListFetchSchedule.length - 1) {
        setDropDownItemIndexFetchSchedule(dropDownItemIndexFetchSchedule + 1)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexFetchSchedule === dropDownListFetchSchedule.length - 1) {
        return
      } else if (event.key === 'ArrowUp' && dropDownItemIndexFetchSchedule >= 0) {
        setDropDownItemIndexFetchSchedule(dropDownItemIndexFetchSchedule - 1)
      } else if (event.key === 'Enter' && dropDownItemIndexFetchSchedule >= 0) {
        handleSelectedFetchSchedule(dropDownListFetchSchedule[dropDownItemIndexFetchSchedule]);
        setViewAutoCompleteFetchSchedule(false);
        setDropDownItemIndexFetchSchedule(-1)
      } else if (event.key === 'Enter' && dropDownItemIndexFetchSchedule === -1) {
        setViewAutoCompleteFetchSchedule(false);
      }
    }
  }

  // 일정가져오기 자동입력  -----------------
  const handleSelectedFetchSchedule = async (item:any) => {
    const scheduleListOrigin = [...scheduleList];
    const res = await axios.get(`${MainURL}/productschedule/getproductscheduledetails/${item.id}`)
		if (res.data !== false) {
			const copy = res.data;
			const result = copy.map((item:any) => ({
				...item,
				scheduleDetail: JSON.parse(item.scheduleDetail)
			}));
      if (scheduleListOrigin[0].scheduleDetail[0].location === '') {
        setScheduleList(result);
      } else {
        const combine = [...scheduleListOrigin, ...result];
        const combineResult = combine.map((item:any, index:any) => ({
          ...item,
          day: index+1
        }));
        setScheduleList(combineResult);
        setViewAutoCompleteTourLocation(combineResult?.map((item:any) => Array(item.scheduleDetail.length).fill(false)))
      }
      alert('일정 가져오기가 완료되었습니다.')
      setSelectedSchedule('');
		}
  }


  // 여행지 검색 & 자동완성기능 -----------------------------------------------------------------------------------------------------------------------------------------------------

  const [tourLocationList, setTourLocationList] = useState<ScheduleDetailProps[]>([]);
  // 여행지 리스트 가져오기
  const fetchPostsTourList = async () => {
    let res = await axios.get(`${MainURL}/productschedule/gettourlocationforpost`);
    if (res !== undefined ) {
      let copy = res.data;
      setTourLocationList(copy);
    }
  };

  const [viewAutoCompleteTourLocation, setViewAutoCompleteTourLocation] = useState(scheduleList?.map((item:any) => Array(item.scheduleDetail.length).fill(false)));
  const [dropDownListTourLocation, setDropDownListTourLocation] = useState<ScheduleDetailProps[]>([]);
  const [dropDownItemIndexTourLocation, setDropDownItemIndexTourLocation] = useState(-1);
  const [isComposingTourLocation, setIsComposingTourLocation] = useState(false);

  // 스케줄 여행지 이름 변경 
  const handleTourLocationChange = (index: number, text: string, subIndex: number ) => {
    const inputs = [...scheduleList];
    inputs[index].scheduleDetail[subIndex].location = text;
    const viewAutoComplete = [...viewAutoCompleteTourLocation];
    if (text.length > 1) {
      fetchPostsTourList();
      viewAutoComplete[index][subIndex] = true;
    }
    setDropDownItemIndexTourLocation(-1);
    handleAutoCompleteTourLocation(text);
    setViewAutoCompleteTourLocation(viewAutoComplete);
    setScheduleList(inputs);
  };

  // 여행지 자동필터  -----------------
  const handleAutoCompleteTourLocation = (text : string ) => {
    const copy = tourLocationList.filter((e: any) => e.location.includes(text) === true);
    copy.sort((a, b) => (a.location > b.location) ? 1 : -1);
    setDropDownListTourLocation(copy);
  }

  const handleDropDownKeyTourLocation = (event:any, index:number, subIndex: number) => {
    if (isComposingTourLocation) return;
    if (viewAutoCompleteTourLocation) {
      if (event.key === 'ArrowDown' && dropDownItemIndexTourLocation === -1) {
        setDropDownItemIndexTourLocation(0)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexTourLocation >= 0 && dropDownItemIndexTourLocation !== dropDownListTourLocation.length - 1) {
        setDropDownItemIndexTourLocation(dropDownItemIndexTourLocation + 1)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexTourLocation === dropDownListTourLocation.length - 1) {
        return
      } else if (event.key === 'ArrowUp' && dropDownItemIndexTourLocation >= 0) {
        setDropDownItemIndexTourLocation(dropDownItemIndexTourLocation - 1)
      } else if (event.key === 'Enter' && dropDownItemIndexTourLocation >= 0) {
        handleSelectedTourLocation(index, subIndex, dropDownListTourLocation[dropDownItemIndexTourLocation]);
        const viewAutoComplete = [...viewAutoCompleteTourLocation];
        viewAutoComplete[index][subIndex]= false;
        setViewAutoCompleteTourLocation(viewAutoComplete);
        setDropDownItemIndexTourLocation(-1)
      } else if (event.key === 'Enter' && dropDownItemIndexTourLocation === -1) {
        const viewAutoComplete = [...viewAutoCompleteTourLocation];
        viewAutoComplete[index][subIndex]= false;
        setViewAutoCompleteTourLocation(viewAutoComplete);
      }
    }
  }

  // 여행지 자동입력  -----------------
  const handleSelectedTourLocation = (index:number, subIndex: number, item:any) => {
    const inputs = [...scheduleList];
    inputs[index].scheduleDetail[subIndex] = {
      id: item.id,
      sort : item.sort,
      location: item.location,
      subLocation: item.subLocation,
      locationTitle: item.locationTitle,
      locationContent: item.locationContent,
      locationContentDetail: JSON.parse(item.locationContentDetail),
      postImage : item.postImage,
    }
    setScheduleList(inputs);
  }

  // 엑셀파일 삽입 기능 -----------------------------------------------------------------------------------------------------------------------------------------------------

  const [xlsxData, setXlsxData] = useState<any>([]);

  const handleFileUpload = (e:any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event:any) => {
      const arrayBuffer = event.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);

      const workbook = XLSX.read(uint8Array, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      setXlsxData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  console.log(xlsxData[0]);

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
                }}
              />
            }
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            {
              isAddOrRevise === 'revise' 
              ? 
              <p>{tourPeriod}</p>
              :
              <DropdownBox
                widthmain='20%'
                height='35px'
                selectedValue={tourPeriod}
                options={tourPeriodOptions}
                handleChange={(e)=>{setTourPeriod(e.target.value)}}
              />
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
            <TitleBox width="120px" text='랜드사'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={landCompany} onChange={(e)=>{setLandCompany(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품타입'/>
            <div className='checkInputCover'>
              <SelectBox text='선투숙+풀빌라'/>
              <SelectBox text='경유지+선투숙+풀빌라'/>
              <SelectBox text='같은리조트+풀빌라'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='일정검색'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              placeholder='등록된 일정 가져오기'
              // value={selectedSchedule} 
              onChange={(e) => {
                handleFetchScheduleChange(e.target.value)
              }}
              onKeyDown={(e)=>{handleDropDownKeyFetchSchedule(e)}}
              onCompositionStart={() => setIsComposingFetchSchedule(true)}
              onCompositionEnd={() => setIsComposingFetchSchedule(false)}
            />
          </div>
          {
            (selectedSchedule !== '' && viewAutoCompleteFetchSchedule) &&
            <div className="scheduleAutoComplete">
              { 
                dropDownListFetchSchedule.slice(0, 10).map((item:any, index:any)=>{
                  return(
                    <div key={index} className={dropDownItemIndexFetchSchedule === index ? 'dropDownList selected' : 'dropDownList'}>{item.tourLocation} {item.tourPeriod}</div>
                  )
                })
              }
            </div>  
          }
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='엑셀파일'/>
            <input type="file" style={{marginLeft: '10px'}} 
              accept=".xlsx, .xls" onChange={handleFileUpload}/>
          </div>
        </div>
      </section>
        
      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='주의사항' height={200}/>
            <textarea 
              className="textarea"
              value={cautionNote}
              onChange={(e)=>{setCautionNote(e.target.value)}}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
 
          <div className="coverrow hole">
            <TitleBox width="100px" text='포함사항' height={120}/>
            <div style={{width:'50%'}}>
              <SelectBoxIncludeNotInclue text='왕복항공료' useState={includeNote} setUseSate={setIncludeNote}/>
              <SelectBoxIncludeNotInclue text='국내 및 현지 공항세' useState={includeNote} setUseSate={setIncludeNote}/>
              <SelectBoxIncludeNotInclue text='현지 숙박 호텔료, 관광지 입장료, 일정표상 식사' useState={includeNote} setUseSate={setIncludeNote}/>
              <SelectBoxIncludeNotInclue text='여행자보험(해외1억원/국내5천원)' useState={includeNote} setUseSate={setIncludeNote}/>
            </div>
            <textarea 
              style={{minHeight:'100px'}}
              className="textarea"
              value={includeNoteText}
              onChange={(e)=>{setIncludeNoteText(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="100px" text='불포함사항' height={120}/>
            <div style={{width:'50%'}}>
              <SelectBoxIncludeNotInclue text='유류할증료' useState={notIncludeNote} setUseSate={setNotIncludeNote}/>
              <SelectBoxIncludeNotInclue text='가이드, 기사분 팁' useState={notIncludeNote} setUseSate={setNotIncludeNote}/>
              <SelectBoxIncludeNotInclue text='선택관광비용, 에티켓, 개인경비' useState={notIncludeNote} setUseSate={setNotIncludeNote}/>
            </div>
            <textarea 
              style={{minHeight:'100px'}}
              className="textarea"
              value={notIncludeNoteText}
              onChange={(e)=>{setNotIncludeNoteText(e.target.value)}}
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

                    const postImages = subItem.postImage ? JSON.parse(subItem.postImage) : "";

                    return (
                      <div className='day-area' key={subIndex}>
                        <div className='left-area'>
                          <ImLocation color='#5fb7ef' size={20}/>
                        </div>
                        <div className='input-area'>
                          <div className="cover">
                            <div className='rowbox'>
                              <input style={{width:'95%', marginBottom:'10px'}} value={subItem.location} className="inputdefault" type="text" 
                                  onChange={(e) => {
                                    handleTourLocationChange(index, e.target.value, subIndex)
                                  }}
                                  onKeyDown={(e)=>{handleDropDownKeyTourLocation(e, index, subIndex)}}
                                  onCompositionStart={() => setIsComposingTourLocation(true)}
                                  onCompositionEnd={() => setIsComposingTourLocation(false)}
                              />
                              {
                                (subItem.location !== '' && viewAutoCompleteTourLocation[index][subIndex]) &&
                                <div className="autoComplete">
                                  { 
                                    dropDownListTourLocation.slice(0, 10).map((item:any, index:any)=>{
                                      return(
                                        <div key={index} className={dropDownItemIndexTourLocation === index ? 'dropDownList selected' : 'dropDownList'}>{item.location}</div>
                                      )
                                    })
                                  }
                                </div>  
                              }
                            </div>
                            <div className='rowbox'>
                              <input style={{width:'95%', marginBottom:'10px'}} value={subItem.subLocation} className="inputdefault" type="text" 
                                onChange={(e) => {
                                  const inputs = [...scheduleList];
                                  inputs[index].scheduleDetail[subIndex].subLocation = e.target.value;
                                  setScheduleList(inputs);
                                }}/>
                            </div>
                            <div className='rowbox'>
                              <input style={{width:'95%'}} value={subItem.locationTitle} className="inputdefault" type="text" 
                                onChange={(e) => {
                                  const inputs = [...scheduleList];
                                  inputs[index].scheduleDetail[subIndex].locationTitle = e.target.value;
                                  setScheduleList(inputs);
                                }}/>
                            </div>
                            {
                              subItem.sort !== '선택' &&
                              <div className='rowbox'>
                                <textarea 
                                  className="textarea" style={{minHeight: subItem.sort === '텍스트' ? '200px' : '100px' }}
                                  value={subItem.locationContent}
                                  onChange={(e)=>{
                                    const inputs = [...scheduleList];
                                    inputs[index].scheduleDetail[subIndex].locationContent = e.target.value;
                                    setScheduleList(inputs);
                                  }}
                                />
                              </div>
                            }
                            { (subItem.sort === '선택' || subItem.sort === '상세') &&
                                subItem.locationContentDetail?.map((detailItem:any, detailIndex:any)=>{

                                return (
                                  <div style={{marginTop:'10px', border:'1px solid #EAEAEA'}} key={detailIndex}>
                                    <div className='rowbox'>
                                      <p style={{width:'5%', textAlign:'center'}}>{index+1}.</p>
                                      <input style={{width:'95%'}} value={detailItem.name} className="inputdefault" type="text" 
                                        onChange={(e) => {
                                          const inputs = [...scheduleList];
                                          inputs[index].scheduleDetail[subIndex].locationContentDetail[detailIndex].name = e.target.value;
                                          setScheduleList(inputs);
                                        }}/>
                                    </div>
                                    { subItem.sort === '선택' &&
                                      detailItem.notice.map((noticeItem:any, noticeIndex:any)=>{
                                        return (
                                          <div className='rowbox' key={noticeIndex}>
                                            <div className="btn"></div>
                                            <div style={{width:'10%', display:'flex', justifyContent:'end', alignItems:'center'}}>
                                              <p onClick={()=>{
                                                 const inputs = [...scheduleList];
                                                 inputs[index].scheduleDetail[subIndex].locationContentDetail[detailIndex].notice 
                                                 = [...inputs[index].scheduleDetail[subIndex].locationContentDetail[detailIndex].notice, ""]
                                                 setScheduleList(inputs);
                                                }}
                                              ><CiCirclePlus color='#333' size={20}/></p>
                                              <p onClick={()=>{
                                                 const inputs = [...scheduleList];
                                                 inputs[index].scheduleDetail[subIndex].locationContentDetail[detailIndex].notice.splice(noticeIndex, 1);
                                                 setScheduleList(inputs);
                                                }}
                                              ><CiCircleMinus color='#FF0000' size={20}/></p>
                                            </div>
                                            <input style={{width:'90%'}} value={noticeItem} className="inputdefault" type="text" 
                                              onChange={(e) => {
                                                const inputs = [...scheduleList];
                                                inputs[index].scheduleDetail[subIndex].locationContentDetail[detailIndex].notice[noticeIndex] = e.target.value;
                                                setScheduleList(inputs);
                                              }}/>
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
                                const inputs = [...scheduleList];
                                inputs[index].scheduleDetail.splice(subIndex, 1);
                                setScheduleList(inputs);
                                const viewAutoCopy = [...viewAutoCompleteTourLocation];
                                viewAutoCopy[index].splice(subIndex, 1);
                                setViewAutoCompleteTourLocation(viewAutoCopy)
                              }}>
                              <p><CiCircleMinus/>일정삭제</p>
                            </div>
                            <div className="btn" style={{backgroundColor:"#EAEAEA", margin:'10px 0'}}
                              onClick={()=>{
                                const inputs = [...scheduleList];
                                inputs[index].scheduleDetail = [...inputs[index].scheduleDetail, { id : '1',sort : '', location: '', subLocation: '',
                                  locationTitle: '', locationContent: '', locationContentDetail: [{name:"", notice:[""]}], postImage : ''}];
                                setScheduleList(inputs);
                                const viewAutoCopy = [...viewAutoCompleteTourLocation];
                                viewAutoCopy[index] = [...viewAutoCopy[index], false]
                                setViewAutoCompleteTourLocation(viewAutoCopy)
                              }}>
                              <p><CiCirclePlus />일정추가</p>
                            </div>
                          </div>
                          {
                            postImages.length > 0 &&
                            postImages.map((images:any, imageIndex:any)=>{
                              return (
                                <div className='image-row' key={imageIndex}>
                                  <img src={`${MainURL}/images/tourlocationimages/${images}`}/>
                                </div>
                              )
                            })
                          }
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
            </div>      
          )
        })
      }
            
      </section>

      <section>
        <div className="daybtnrow">
          <div className="daybtn" style={{width:'25%', backgroundColor:"#fff"}}
            onClick={handleDayDelete}>
            <CiCircleMinus /><p>DAY삭제</p>
          </div>
          <div className="daybtn" style={{width:'70%', backgroundColor:"#EAEAEA"}}
              onClick={handleDayAdd}>
            <CiCirclePlus /><p>DAY추가</p>
          </div>
        </div>
      </section>


      
    </div>     
  )
}
