import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DropDownAirline, DropDownTourPeriodDayType, DropDownTourPeriodNightType } from '../../../DefaultData';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { IoClose } from 'react-icons/io5';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { BiSolidRightArrowAlt, BiSolidLeftArrowAlt, BiSolidArrowToRight, BiSolidArrowFromLeft, BiSolidArrowToLeft, BiSolidArrowFromRight } from "react-icons/bi";
import { FiMinusCircle } from "react-icons/fi";
import { TourAirlineProps, TrafficListProps, TrafficProps } from '../../InterfaceData';

export default function ModalAddCity (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const cityData = isAddOrRevise === 'revise' ? props.cityData : null;
  const cityList = props.nationData ? props.nationData.cities : '';
  const cityListCopy = props.nationData ? cityList.map((e:any)=>e.cityKo) : '';

 
  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? cityData.isView : true);
  const [nation, setNation] = useState(props.nationData.nationKo);
  const [cityKo, setCityKo] = useState(isAddOrRevise === 'revise' ? cityData.cityKo :'');
  const [cityEn, setCityEn] = useState(isAddOrRevise === 'revise' ? cityData.cityEn : '');
  const [weather, setWeather] = useState(isAddOrRevise === 'revise' ? cityData.weather : '');
  const [tourNotice, setTourNotice] = useState(isAddOrRevise === 'revise' ? cityData.tourNotice : '');

  const [scheduleCategory, setScheduleCategory] = useState(isAddOrRevise === 'revise' ? JSON.parse(cityData.scheduleCategory) : [""]);
  const [hotelCategory, setHotelCategory] = useState(isAddOrRevise === 'revise' ? JSON.parse(cityData.hotelCategory) : [""]);

  const [lastImages, setLastImages]  = 
    useState((props.isAddOrRevise === 'revise' && (cityData.inputImage !== null && cityData.inputImage !== '')) ? JSON.parse(cityData.inputImage) : []);
  const [inputImage, setInputImage] = 
    useState((props.isAddOrRevise === 'revise' && (cityData.inputImage !== null && cityData.inputImage !== '')) ? JSON.parse(cityData.inputImage) : []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
 
  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'MMddHHmmss');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          return resizingBlob;
        })
      );
      const regexCopy = /[^a-zA-Z0-9!@#$%^&*()\-_=+\[\]{}|;:'",.<>]/g;
      const userIdCopy = userId?.slice(0,5);
      const fileCopies = resizedFiles.map((resizedFile, index) => {
        const regex = resizedFile.name.replace(regexCopy, '');
        const regexSlice = regex.slice(-15);
        return new File([resizedFile], `${date}${userIdCopy}_${regexSlice}`, {
          type: acceptedFiles[index].type,
        });
      });
      setImageFiles(fileCopies);
      const imageNames = acceptedFiles.map((file, index) => {
        const regex = file.name.replace(regexCopy, '');
        const regexSlice = regex.slice(-15);
        return `${date}${userIdCopy}_${regexSlice}`;
      });
      const imageNamesCopy = props.isAddOrRevise === 'revise' ? [...inputImage, ...imageNames] : imageNames
      setInputImage(imageNamesCopy);
      setImageLoading(false);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop }); 

  // 첨부 이미지 삭제 ----------------------------------------------
  const deleteInputImage = async (Idx:number) => {
    const copy =  [...imageFiles]
    const newItems = copy.filter((item, i) => i !== Idx);
    const nameCopy = [...inputImage]
    const nameNewItems = nameCopy.filter((item, index) => index !== Idx);
    setImageFiles(newItems);
    setInputImage(nameNewItems);
  };

  // 이미지 순서 업 함수 ----------------------------------------------
  const handleImageListUp = async (list:any, setUseState:any, value:any) => {
    const index = list.indexOf(value);
    if (index <= 0) {
      alert('맨 앞 입니다.')
      return list;
    }
    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setUseState(newList);
  };

  // 이미지 순서 다운 함수 ----------------------------------------------
  const handleImageListDown = async (list:any, setUseState:any, value:any) => {
    const index = list.indexOf(value);
    if (list.length === index+1) {
      alert('맨 뒤 입니다.')
      return list;
    }
    const newList = [...list];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    setUseState(newList);
  };



  // 저장 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const registerCity = async () => {
    if (cityListCopy.includes(cityKo)) {
      alert(`${cityKo}는(은) 이미 입력된 도시입니다.`)
    } else {
      const formData = new FormData();
      imageFiles.forEach((file, index) => {
        formData.append('img', file);
      });
      const getParams = {
        isView : isView,
        nation : nation,
        cityKo : cityKo,
        cityEn : cityEn,
        weather : weather,
        tourNotice : tourNotice,
        scheduleCategory : JSON.stringify(scheduleCategory),
        hotelCategory : JSON.stringify(hotelCategory),
        inputImage : JSON.stringify(inputImage)
      }
      axios 
        .post(`${MainURL}/tournationcity/registercities`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: getParams,
        })
        .then((res) => {
          if (res.data) {
            alert('저장되었습니다.');
            props.setRefresh(!props.refresh);
          }
        })
        .catch(() => {
          console.log('실패함')
        })
    }
  };


  // 기존 이미지 삭제 ----------------------------------------------
  const deleteInputLastImage = async (imageName:string) => {
    const lastImagesCopy = [...lastImages]
    const lastImagesNewItems = lastImagesCopy.filter((item, index) => item !== imageName);
    const inputImagesCopy = [...inputImage]
    const inputImagesNewItems = inputImagesCopy.filter((item, index) => item !== imageName);

    axios 
      .post(`${MainURL}/tournationcity/deletecityimage`, {
        postId : cityData.id,
        imageName : imageName,
        inputImage : JSON.stringify(lastImagesNewItems)
      })
      .then((res) => {
        if (res.data) {
          alert(res.data);
          setLastImages(lastImagesNewItems);
          setInputImage(inputImagesNewItems);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 수정 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const reviseCity = async () => {
    const formData = new FormData();
      imageFiles.forEach((file, index) => {
        formData.append('img', file);
      });
    const getParams = {
      postId : cityData.id,
      isView : isView,
      nation : nation,
      cityKo : cityKo,
      cityEn : cityEn,
      weather : weather,
      tourNotice : tourNotice,
      scheduleCategory : JSON.stringify(scheduleCategory),
      hotelCategory : JSON.stringify(hotelCategory),
      inputImage : JSON.stringify(inputImage),
    }
    axios 
      .post(`${MainURL}/tournationcity/revisecities`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
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

  // 항공편 입력 ------------------------------------------------------------------------------------------------------------------------------------------
  const [airlineSelectInput, setAirlineSelectInput] = useState('oneway');
  const [onewayAirline, setOnewayAirline] = useState<TourAirlineProps[]>( isAddOrRevise === 'revise' ? props.onewayAirlineData : [] )
  const [roundAirline, setRoundAirline] = useState<TourAirlineProps[]>( isAddOrRevise === 'revise' ? props.roundAirlineData : [] )

  // 항공편 내용변경
  const handleAirlineContentChange = (text:any, useState:any, setUseState:any, index:any, subIndex:any, name:any) => {
    const inputs = [...useState]
    inputs[index].airlineData[subIndex][name] = text;
    setUseState(inputs);
  };

  // 항공편 (직항) 저장 함수 ----------------------------------------------
  const registerAirline = async (sort:string, item:any) => {
    axios.post(`${MainURL}/tournationcity/registerairline`, {
      nation : nation,
      city : cityKo,
      sort : sort,
      departAirportMain : item.departAirportMain,
      departAirline : item.departAirline,
      departTime: item.departTime,
      airlineData : JSON.stringify(item.airlineData)
    })
      .then((res) => {
        if (res.data) {
          alert(res.data)
        }
      })
      .catch((error) => {
        console.error(`에러 발생 :`, error);
      });
  };

  // 항공편 삭제
  const deleteAirline = async (item:any, sort:string) => {
		const getParams = {
      nation : nation,
      city : cityKo,
      sort : sort,
      departTime: item.departTime,
      departAirline : item.departAirline,
		}
		axios 
			.post(`${MainURL}/tournationcity/deleteairline`, getParams)
			.then((res) => {
				if (res.data) {
					alert('삭제되었습니다.');
          if (sort === 'oneway') {
            const copy = [...onewayAirline];
            const filtered = copy.filter((e:any)=> e.departAirline !== item.departAirline);
            setOnewayAirline(filtered);
          } else {
            const copy = [...roundAirline];
            const filtered = copy.filter((e:any)=> e.departAirline !== item.departAirline);
            setRoundAirline(filtered);
          }
					props.setRefresh(!props.refresh);
          props.setIsViewAddCityModal(false);
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};
  const handleDeleteAlert = (item:any, sort:string) => {
    const costConfirmed = window.confirm(`${item.departAirportMain}/${item.departTime}(편명:${item.departAirline})의 항공편을 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteAirline(item, sort);
		} else {
			return
		}
	};


  // 역내 교통 입력 ------------------------------------------------------------------------------------------------------------------------------------------
  const [trafficData, setTrafficData] = useState<TrafficProps[]>(
    isAddOrRevise === 'revise' 
    ? props.trafficData
    : [
      {sort : '공항/항공', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]},
      {sort : '역/기차', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]},
      {sort : '터미널/시외버스', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]},
      {sort : '항구/선박', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]}
    ]
  )

  // 교통편 내용변경
  const handleTrafficContentChange = (text: string, index: number, subIndex: number, name: keyof TrafficListProps ) => {
    const inputs = [...trafficData];
    inputs[index].trafficList[subIndex][name] = text;
    setTrafficData(inputs);
  };


  // 교통편 저장 함수 ----------------------------------------------
  const registerTraffic = async () => {
    const copy = [...trafficData];
    const airportCopy = copy.filter((e:any)=> e.sort === '공항/항공');
    const stationCopy = copy.filter((e:any)=> e.sort === '역/기차');
    const terminalCopy = copy.filter((e:any)=> e.sort === '터미널/시외버스');
    const harborCopy = copy.filter((e:any)=> e.sort === '항구/선박');
    try {
      axios.post(`${MainURL}/tournationcity/registertraffic`, {
        nation : nation,
        city : cityKo,
        airport : JSON.stringify(airportCopy[0].trafficList),
        station : JSON.stringify(stationCopy[0].trafficList),
        terminal : JSON.stringify(terminalCopy[0].trafficList),
        harbor : JSON.stringify(harborCopy[0].trafficList)
      })
        .then((res) => {
          if (res.data) { 
            alert(res.data);
          }
        })
        .catch((error) => {
          console.error(`에러 발생`, error);
          return { success: false };
        });
    } catch (error) {
      alert('실패');
      console.error('전체적인 오류 발생', error);
    }
  };

  // common style
  const verticalBar40 = {width:'1px', minHeight:'40px', backgroundColor:'#d4d4d4'};

   
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setIsViewAddCityModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      {/* 도시 생성 --------------------------------------------------------------------------------------------------------------- */}
      
      <div className="modal-header">
        <h1>도시 {isAddOrRevise === 'revise' ? '수정' : '생성'}</h1>
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
            <TitleBox width="120px" text='국가'/>
            <p style={{width:'20%'}}>{nation}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='도시명(한글)'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={cityKo} onChange={(e)=>{
                  if (cityListCopy.includes(e.target.value)) {
                    alert(`이미 입력된 도시입니다.`)
                  }
                  setCityKo(e.target.value)}
                }/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='도시명(영문)'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={cityEn} onChange={(e)=>{setCityEn(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='날씨/기후'/>
            <input className="inputdefault" type="text" style={{width:'80%', marginLeft:'5px'}} 
              value={weather} onChange={(e)=>{setWeather(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='여행지 설명' height={200}/>
            <textarea 
              className="textarea"
              value={tourNotice}
              onChange={(e)=>{setTourNotice(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='일정커스텀품목'/>
            {
              scheduleCategory.map((item:any, index:any)=>(
                <input key={index} value={item} 
                  className="inputdefault" type="text" style={{width:'120px', marginLeft:'5px'}} 
                  onChange={(e)=>{
                    const copy = [...scheduleCategory];
                    copy[index] = e.target.value;
                    setScheduleCategory(copy);
                  }}/>
              ))
            }
            <div className="dayBox">
              <div className="dayBtn"
                onClick={()=>{
                  const copy = [...scheduleCategory, ""];
                  setScheduleCategory(copy);
                }}
              >
                <p>+</p>
              </div>
            </div>  
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔커스텀분류'/>
            {
              hotelCategory.map((item:any, index:any)=>(
                <input key={index} value={item} 
                  className="inputdefault" type="text" style={{width:'120px', marginLeft:'5px'}} 
                  onChange={(e)=>{
                    const copy = [...hotelCategory];
                    copy[index] = e.target.value;
                    setHotelCategory(copy);
                  }}/>
              ))
            }
            <div className="dayBox">
              <div className="dayBtn"
                onClick={()=>{
                  const copy = [...hotelCategory, ""];
                  setHotelCategory(copy);
                }}
              >
                <p>+</p>
              </div>
            </div>  
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='지도/이미지'/>
            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div {...getRootProps()} className="imageDropzoneStyle" >
                  <input {...getInputProps()} />
                  {
                    imageFiles.length > 0 
                    ? <div className='imageplus'>+ 다시첨부하기</div>
                    : <div className='imageplus'>+ 사진첨부하기</div>
                  }
                </div>
              </div>
            }
            </div>
          </div>
        </div>
        <div className="lastImageInputCover">
          { lastImages.length > 0 &&
            lastImages.map((item:any, index:any)=>{
              return (
                <div key={index} className='lastImage-box'
                  onClick={()=>{deleteInputLastImage(item)}}
                >
                  <div style={{display:'flex', alignItems:'center'}}>
                    <img style={{width:'100px'}}
                        src={`${MainURL}/images/cityimages/${item}`}
                      />
                  </div>
                  <p style={{width:'10%'}}>{item.title}</p>
                  <p style={{width:'70%'}}>{item.notice}</p>
                  <div className='lastImage-delete'>
                    <p><IoClose color='#FF0000'/></p>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="inputImageInputCover">
          {
            imageFiles.length > 0 &&
            imageFiles.map((item:any, index:any)=>{
              return (
                <div key={index} className='imagebox'>
                  <img 
                    src={URL.createObjectURL(item)}
                  />
                  <p>{item.name}</p>
                  <div className="updownBtnBox">
                    <div className="updownBtnBtn"
                      onClick={()=>{deleteInputImage(index);}}
                    >
                      <p><IoClose color='#FF0000'/></p>
                    </div>
                  </div>  
                  <div className="updownBtnBox">
                    <div className="updownBtnBtn"
                      onClick={()=>{
                        handleImageListUp(imageFiles, setImageFiles, item);
                        handleImageListUp(inputImage, setInputImage, item.name);
                      }}
                    >
                      <p><TiArrowSortedUp /></p>
                    </div>
                  </div>  
                  <div className="updownBtnBox">
                    <div className="updownBtnBtn"
                      onClick={()=>{
                        handleImageListDown(imageFiles, setImageFiles, item);
                        handleImageListDown(inputImage, setInputImage, item.name);
                      }}
                    >
                      <p><TiArrowSortedDown /></p>
                    </div>
                  </div>  
                </div>
              )
            })
          }
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setIsViewAddCityModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            if (cityKo === '') {
              alert('도시 이름을 입력해주세요.')
            } else {
              isAddOrRevise === 'revise' ? reviseCity() : registerCity();
            }
          }}
        >
          <p>도시 정보 저장</p>
        </div>
       
      </div>

      <div style={{height:'50px'}}></div>

      {/* 교통 정보 입력 --------------------------------------------------------------------------------------------------------------- */}
      <div className="modal-header">
        <h1>역내 교통</h1>
      </div>

      <section>
        <div className="bottombar"></div>
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
            <div className='chartbox' style={{width:'19%'}} ><p>이동시간</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'5%'}} ><p></p></div>
          </div>
        </div>
        {
          trafficData.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole">
                    <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 10px'}} >
                    <p>{item.sort}</p>
                    <div>
                      <div className='trafficaddBtn'
                        onClick={()=>{
                          const copy = [...trafficData];
                          copy[index].trafficList = [...copy[index].trafficList,
                            { terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}
                          ]
                          setTrafficData(copy);
                        }}
                      >+</div>
                    </div>
                  </div>
                  <div style={{width:'85%'}} >
                  {
                    item.trafficList.map((subItem:any, subIndex:any)=>{

                      return (
                        <div style={{width:'100%', display:'flex', alignItems:'center'}} key={subIndex}>
                          <div style={verticalBar40}></div>
                          <div style={{width:'19%', textAlign:'center'}} >
                            <input className="inputdefault" type="text" style={{width:'95%'}} 
                              value={subItem.terminal} 
                              onChange={(e)=>{handleTrafficContentChange(e.target.value, index, subIndex, 'terminal');}}/>
                          </div>
                          <div style={verticalBar40}></div>
                          <div style={{width:'19%', textAlign:'center'}} >
                            <input className="inputdefault" type="text" style={{width:'95%'}} 
                              value={subItem.trafficName} 
                              onChange={(e)=>{handleTrafficContentChange(e.target.value, index, subIndex, 'trafficName');}}/>
                          </div>
                          <div style={verticalBar40}></div>
                          <div style={{width:'19%', textAlign:'center'}} >
                            <input className="inputdefault" type="text" style={{width:'95%'}} 
                              value={subItem.operateDay} 
                              onChange={(e)=>{handleTrafficContentChange(e.target.value, index, subIndex, 'operateDay');}}/>
                          </div>
                          <div style={verticalBar40}></div>
                          <div style={{width:'19%', textAlign:'center'}} >
                            <input className="inputdefault" type="text" style={{width:'95%'}} 
                              value={subItem.connectCity} 
                              onChange={(e)=>{handleTrafficContentChange(e.target.value, index, subIndex, 'connectCity');}}/>
                          </div>
                          <div style={verticalBar40}></div>
                          <div style={{width:'19%', textAlign:'center'}} >
                            <input className="inputdefault" type="text" style={{width:'95%'}} 
                              value={subItem.moveTime} 
                              onChange={(e)=>{handleTrafficContentChange(e.target.value, index, subIndex, 'moveTime');}}/>
                          </div>
                          <div style={verticalBar40}></div>
                          { subIndex === 0 
                            ?
                            <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                            </div>
                            :
                            <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              <div className='deleteRowBtn'
                                onClick={()=>{
                                  const copy = [...trafficData];
                                  copy[index].trafficList.splice(subIndex, 1);
                                  setTrafficData(copy);
                                }}
                                ><FiMinusCircle  color='#FF0000'/>
                              </div>
                            </div>
                          }
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

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setIsViewAddCityModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        {
          trafficData.length === 0 &&
          <div className="btn"
            onClick={()=>{
              const copy = [
                {sort : '공항/항공', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]},
                {sort : '역/기차', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]},
                {sort : '터미널/시외버스', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]},
                {sort : '항구/선박', trafficList : [{terminal: "", trafficName : "", operateDay : "", connectCity : "", moveTime : ""}]}
              ]
              setTrafficData(copy);
            }}
          >
            <p style={{color:'#333'}}>교통편 입력란 추가</p>
          </div>
        }
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            if (cityKo === '') {
              alert('도시 이름을 입력해주세요.')
            } else {
              registerTraffic();
            }
          }}
        >
          <p>교통 정보 저장</p>
        </div>
       
      </div>

      <div style={{height:'30px'}}></div>

      {/* 항공편 입력 --------------------------------------------------------------------------------------------------------------- */}
      <div className="modal-header">
        <h1>항공편 입력</h1>
      </div>
      
      <div className="selectInputBtnBox">
        <div className="selectInputBtn"
          onClick={()=>{setAirlineSelectInput('oneway')}}
          style={{backgroundColor: airlineSelectInput === 'oneway' ? '#242d3f' : '#fff', 
            color: airlineSelectInput === 'oneway' ? '#fff' : '#333' }}
        >편도</div>
        <div className="selectInputBtn"
          onClick={()=>{setAirlineSelectInput('round')}}
          style={{backgroundColor: airlineSelectInput === 'round' ? '#242d3f' : '#fff', 
            color: airlineSelectInput === 'round' ? '#fff' : '#333' }}
        >왕복</div>
        <div className="selectInputBtn"
          onClick={()=>{
            if (airlineSelectInput === 'oneway') {
              const copy = [...onewayAirline]
              if (copy.length === 0) {
                setOnewayAirline([...onewayAirline, 
                  {id: "", departTime: "", departAirportMain : "",  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
                    ]
                  }]
                )
              } else {
                const lastItem = copy[copy.length - 1];
                setOnewayAirline([...onewayAirline, 
                  {id: "", departTime: "", departAirportMain : lastItem.departAirportMain,  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[0].departAirport, departTime:"", arriveAirport:lastItem.airlineData[0].arriveAirport, arriveTime:""}
                    ]
                  }]
                )
              }
            } else if (airlineSelectInput === 'round') {
              const copy = [...roundAirline];
              if (copy.length === 0) { 
                setRoundAirline([...roundAirline,
                  {id: "", departTime: "", departAirportMain : "",  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
                    ]
                  }
                ])
              } else {
                const lastItem = copy[copy.length - 1];
                setRoundAirline([...roundAirline,
                  {id: "", departTime: "", departAirportMain : lastItem.departAirportMain,  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[0].departAirport, departTime:"", arriveAirport:lastItem.airlineData[0].arriveAirport, arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[1].departAirport, departTime:"", arriveAirport:lastItem.airlineData[1].arriveAirport, arriveTime:""},
                    ]
                  }
                ])
              }
              
            }
          }}
          style={{width:'50px', backgroundColor: '#fff', color: '#333' }}
        >+</div>
      </div>

      <div style={{marginBottom:'50px'}}>
      {/* 편도 ----------------- */}
      { 
        airlineSelectInput === 'oneway' &&
        <section>
          <div className="bottombar"></div>
          <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
            <div className='chartbox' style={{width:'7%'}} ><p>출발공항</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발편명</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발시간</p></div>
            <div className="chart-divider"></div>
            <div style={{width:'74%', display:'flex'}}>
              <div className='chartbox' style={{width:'3%'}} ><p></p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'15%'}} ><p>항공사</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'32%'}} ><p>출발요일</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'10%'}} ><p>편명</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'20%'}} ><p>구간</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'20%'}} ><p>시간</p></div>
            </div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'5%'}} ><p>저장</p></div>
          </div>
          {
            onewayAirline.map((item:any, index:any)=>{
              
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    <div style={{width:'7%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                      <div className='deleteRowBtn'
                        onClick={()=>{
                          if (item.id === '') {
                            const copy = [...onewayAirline];
                            const filtered = copy.filter((e:any, copyindex:any)=> copyindex !== index);
                            setOnewayAirline(filtered);
                          } else {
                            handleDeleteAlert(item, 'oneway')
                          }
                        }}
                        ><FiMinusCircle  color='#FF0000'/>
                      </div>
                      <DropdownBox
                        widthmain='90%'
                        height='35px'
                        selectedValue={item.departAirportMain}
                        options={[
                          { value: '선택', label: '선택' },
                          { value: '인천공항', label: '인천공항' },
                          { value: '대구공항', label: '대구공항' },
                          { value: '김해공항', label: '김해공항' }
                        ]}    
                        handleChange={(e)=>{
                          const copy = [...onewayAirline];
                          copy[index].departAirportMain = e.target.value;
                          setOnewayAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'7%'}} >
                      <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px', height:'35px'}} 
                        value={item.departAirline}
                        onChange={(e)=>{
                          const inputtext = e.target.value;
                          const copy = [...onewayAirline];
                          copy[index].departAirline = inputtext;
                          copy[index].airlineData[0].planeName = inputtext;
                          setOnewayAirline(copy);
                        }}/>
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'7%'}} >
                      <DropdownBox
                        widthmain='90%'
                        height='35px'
                        selectedValue={item.departTime}
                        options={[
                          { value: '선택', label: '선택' },
                          { value: '오전/낮', label: '오전/낮' },
                          { value: '밤/새벽', label: '밤/새벽' }
                        ]}    
                        handleChange={(e)=>{
                          const copy = [...onewayAirline];
                          copy[index].departTime = e.target.value;
                          setOnewayAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'74%'}} >
                    {
                      item.airlineData.map((subItem:any, subIndex:any)=>{
                        return (
                          <div style={{width:'100%', display:'flex', alignItems:'center'}} >
                            <div style={{width:'3%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              { subItem.sort === 'depart' && <BiSolidRightArrowAlt /> }
                              { subItem.sort === 'arrive' && <BiSolidLeftArrowAlt /> }
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'15%'}} >
                              <DropdownBox
                                widthmain='90%'
                                height='35px'
                                selectedValue={subItem.airlineName}
                                options={DropDownAirline}    
                                handleChange={(e)=>{handleAirlineContentChange(e.target.value, onewayAirline, setOnewayAirline, index, subIndex, 'airlineName');}}
                              />
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'32%'}} >
                              <div className="dayBox">
                                {
                                  ['월', '화', '수', '목', '금', '토', '일'].map((dateItem:any, dateIndex:any)=>{
                                    return (
                                      <div className="dayBtn" key={dateIndex}
                                      style={{backgroundColor:subItem.departDate.includes(dateItem) ? '#5fb7ef' : '#fff'}}
                                        onClick={()=>{
                                          const copy = [...onewayAirline]; 
                                          if (copy[index].airlineData[subIndex].departDate.includes(dateItem)) {
                                            const filteredDates = copy[index].airlineData[subIndex].departDate.filter(filterItem => filterItem !== dateItem);
                                            copy[index].airlineData[subIndex].departDate = filteredDates;
                                            setOnewayAirline(copy);
                                          } else {
                                            copy[index].airlineData[subIndex].departDate.push(dateItem);
                                            setOnewayAirline(copy);
                                          }
                                        }}
                                      ><p>{dateItem}</p></div>
                                    )
                                  })
                                }
                                <div className="dayBtn" 
                                  style={{backgroundColor:'#ccc'}}
                                  onClick={()=>{
                                    const copy = [...onewayAirline]; 
                                      copy[index].airlineData[subIndex].departDate = ['월', '화', '수', '목', '금', '토', '일'];
                                      setOnewayAirline(copy);
                                  }}
                                ><p>All</p></div>
                              </div>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'10%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.planeName}
                                onChange={(e)=>{
                                  const inputtext = e.target.value;
                                  const copy = [...onewayAirline];
                                  copy[index].departAirline = inputtext;
                                  copy[index].airlineData[subIndex].planeName = inputtext;
                                  setOnewayAirline(copy);
                                }}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.departAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, onewayAirline, setOnewayAirline, index, subIndex, 'departAirport');}}/>
                              <p style={{margin:'0px'}}>-</p>
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.departTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, onewayAirline, setOnewayAirline, index, subIndex, 'departTime');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.arriveAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, onewayAirline, setOnewayAirline, index, subIndex, 'arriveAirport');}}/>
                              <p style={{margin:'0px'}}>-</p>
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.arriveTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, onewayAirline, setOnewayAirline, index, subIndex, 'arriveTime');}}/>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                      <div className="airline-save-btn"
                        onClick={()=>{
                          if (item.departTime === '' || item.codeShare === '' || item.departAirportMain === '' || item.departAirline === '') {
                            alert('출발공항, 출발편명, 출발시간, 코드쉐어 칸을 채워주세요.');
                          } else {
                            registerAirline('oneway', item);
                          }
                        }}
                      >
                        <p>저장</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
      }
      
      {/* 왕복 ----------------- */}
      {
        airlineSelectInput === 'round' &&
        <section>
          <div className="bottombar"></div>
          <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
            <div className='chartbox' style={{width:'7%'}} ><p>출발공항</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발편명</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발시간</p></div>
            <div className="chart-divider"></div>
            <div style={{width:'74%', display:'flex'}}>
              <div className='chartbox' style={{width:'3%'}} ><p></p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'15%'}} ><p>항공사</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'32%'}} ><p>출발요일</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'10%'}} ><p>편명</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'20%'}} ><p>구간</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'20%'}} ><p>시간</p></div>
            </div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'5%'}} ><p>저장</p></div>
          </div>
          {
            roundAirline.map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                  <div style={{width:'7%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                      <div className='deleteRowBtn'
                        onClick={()=>{
                          if (item.id === '') {
                            const copy = [...roundAirline];
                            const filtered = copy.filter((e:any, copyindex:any)=> copyindex !== index);
                            setRoundAirline(filtered);
                          } else {
                            handleDeleteAlert(item, 'round')
                          }
                        }}
                        ><FiMinusCircle  color='#FF0000'/>
                      </div>
                      <DropdownBox
                        widthmain='90%'
                        height='35px'
                        selectedValue={item.departAirportMain}
                        options={[
                          { value: '선택', label: '선택' },
                          { value: '인천공항', label: '인천공항' },
                          { value: '대구공항', label: '대구공항' },
                          { value: '김해공항', label: '김해공항' }
                        ]}    
                        handleChange={(e)=>{
                          const copy = [...roundAirline];
                          copy[index].departAirportMain = e.target.value;
                          setRoundAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'7%'}} >
                      <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px', height:'35px'}} 
                        value={item.departAirline}
                        onChange={(e)=>{
                          const inputtext = e.target.value;
                          const copy = [...roundAirline];
                          copy[index].departAirline = inputtext;
                          copy[index].airlineData[0].planeName = inputtext;
                          setRoundAirline(copy);
                        }}/>
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'7%'}} >
                      <DropdownBox
                        widthmain='90%'
                        height='35px'
                        selectedValue={item.departTime}
                        options={[
                          { value: '선택', label: '선택' },
                          { value: '오전/낮', label: '오전/낮' },
                          { value: '밤/새벽', label: '밤/새벽' }
                        ]}    
                        handleChange={(e)=>{
                          const copy = [...roundAirline];
                          copy[index].departTime = e.target.value;
                          setRoundAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'74%'}} >
                    {
                      item.airlineData.map((subItem:any, subIndex:any)=>{
                        return (
                          <div style={{width:'100%', display:'flex', alignItems:'center'}} >
                            <div style={{width:'3%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              { subItem.sort === 'depart' && <BiSolidArrowToRight /> }
                              { subItem.sort === 'viaArrive' && <BiSolidArrowFromLeft /> }
                              { subItem.sort === 'viaDepart' && <BiSolidArrowToLeft /> }
                              { subItem.sort === 'arrive' && <BiSolidArrowFromRight /> }
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'15%'}} >
                              <DropdownBox
                                widthmain='90%'
                                height='35px'
                                selectedValue={subItem.airlineName}
                                options={DropDownAirline}    
                                handleChange={(e)=>{handleAirlineContentChange(e.target.value, roundAirline, setRoundAirline, index, subIndex, 'airlineName');}}
                              />
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'32%'}} >
                              <div className="dayBox">
                                {
                                  ['월', '화', '수', '목', '금', '토', '일'].map((dateItem:any, dateIndex:any)=>{
                                    return (
                                      <div className="dayBtn" key={dateIndex}
                                      style={{backgroundColor:subItem.departDate.includes(dateItem) ? '#5fb7ef' : '#fff'}}
                                        onClick={()=>{
                                          const copy = [...roundAirline]; 
                                          if (copy[index].airlineData[subIndex].departDate.includes(dateItem)) {
                                            const filteredDates = copy[index].airlineData[subIndex].departDate.filter(filterItem => filterItem !== dateItem);
                                            copy[index].airlineData[subIndex].departDate = filteredDates;
                                            setRoundAirline(copy);
                                          } else {
                                            copy[index].airlineData[subIndex].departDate.push(dateItem);
                                            setRoundAirline(copy);
                                          }
                                        }}
                                      ><p>{dateItem}</p></div>
                                    )
                                  })
                                }
                                <div className="dayBtn" 
                                  style={{backgroundColor:'#ccc'}}
                                  onClick={()=>{
                                    const copy = [...roundAirline]; 
                                    copy[index].airlineData[subIndex].departDate = ['월', '화', '수', '목', '금', '토', '일'];
                                    setRoundAirline(copy);
                                  }}
                                ><p>All</p></div>
                              </div>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'10%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.planeName} 
                                onChange={(e)=>{
                                  const inputtext = e.target.value;
                                  const copy = [...roundAirline];
                                  copy[index].departAirline = inputtext;
                                  copy[index].airlineData[subIndex].planeName = inputtext;
                                  setRoundAirline(copy);
                                }}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.departAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, roundAirline, setRoundAirline, index, subIndex, 'departAirport');}}/>
                              <p style={{margin:'0px'}}>-</p>
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.departTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, roundAirline, setRoundAirline, index, subIndex, 'departTime');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.arriveAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, roundAirline, setRoundAirline, index, subIndex, 'arriveAirport');}}/>
                              <p style={{margin:'0px'}}>-</p>
                              <input className="inputdefault" type="text" style={{width:'45%'}} 
                                value={subItem.arriveTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, roundAirline, setRoundAirline, index, subIndex, 'arriveTime');}}/>
                            </div>
                          </div>
                        )
                      })
                    }
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                      <div className="airline-save-btn"
                        onClick={()=>{
                          if (item.departTime === '' || item.codeShare === ''  || item.departAirportMain === '' || item.departAirline === '') {
                            alert('출발공항, 출발편명, 출발시간, 코드쉐어 칸을 채워주세요.');
                          } else {
                            registerAirline('round', item);
                          }
                        }}
                      >
                        <p>저장</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </section>
      }
      </div>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddCityModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn"
          onClick={()=>{
            if (airlineSelectInput === 'oneway') {
              const copy = [...onewayAirline]
              if (copy.length === 0) {
                setOnewayAirline([...onewayAirline, 
                  {id: "", departTime: "", departAirportMain : "",  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
                    ]
                  }]
                )
              } else {
                const lastItem = copy[copy.length - 1];
                setOnewayAirline([...onewayAirline, 
                  {id: "", departTime: "", departAirportMain : lastItem.departAirportMain,  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[0].departAirport, departTime:"", arriveAirport:lastItem.airlineData[0].arriveAirport, arriveTime:""}
                    ]
                  }]
                )
              }
            } else if (airlineSelectInput === 'round') {
              const copy = [...roundAirline];
              if (copy.length === 0) { 
                setRoundAirline([...roundAirline,
                  {id: "", departTime: "", departAirportMain : "",  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
                    ]
                  }
                ])
              } else {
                const lastItem = copy[copy.length - 1];
                setRoundAirline([...roundAirline,
                  {id: "", departTime: "", departAirportMain : lastItem.departAirportMain,  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[0].departAirport, departTime:"", arriveAirport:lastItem.airlineData[0].arriveAirport, arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[1].departAirport, departTime:"", arriveAirport:lastItem.airlineData[1].arriveAirport, arriveTime:""},
                    ]
                  }
                ])
              }
              
            }
          }}
        >
           <p style={{color:'#333'}}>항공편추가</p>
        </div>
      </div>

    
      
    </div>     
  )
}
