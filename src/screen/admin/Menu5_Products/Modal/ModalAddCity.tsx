import React, { useCallback, useState } from 'react'
import './ModalAdd.scss'
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

export default function ModalAddCity (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const cityData = isAddOrRevise === 'revise' ? props.cityData : null;
  const cityList = props.nationData ? props.nationData.cities : '';
  const cityListCopy = props.nationData ? cityList.map((e:any)=>e.cityKo) : '';

 
  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? cityData.isView : true);
  const [sort, setSort] = useState(props.nationData.sort);
  const [continent, setContinent] = useState(props.nationData.continent);
  const [nation, setNation] = useState(props.nationData.nationKo);
  const [cityKo, setCityKo] = useState(isAddOrRevise === 'revise' ? cityData.cityKo :'');
  const [cityEn, setCityEn] = useState(isAddOrRevise === 'revise' ? cityData.cityEn : '');
  const [weather, setWeather] = useState(isAddOrRevise === 'revise' ? cityData.weather : '');
  const [tourNotice, setTourNotice] = useState(isAddOrRevise === 'revise' ? cityData.tourNotice : '');
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

  // 항공편 입력 ------------------------------------------------------------------------------------------------------------------------------------------
  const [airlineSelectInput, setAirlineSelectInput] = useState('direct');
  interface AirlineProps {
    sort : string;
    airlineName: string;
    departDate: string[];
    planeName: string;
    departAirport: string;
    departTime: string;
    arriveAirport: string;
    arriveTime: string;
  }
  interface DirectProps {
    tourPeriodNight: string;
    tourPeriodDay: string;
    departAirportMain : string;
    airlineData: AirlineProps[];
  }   
  interface ViaProps {
    tourPeriodNight: string;
    tourPeriodDay: string;
    departAirportMain : string;
    airlineData: AirlineProps[];
  }   
  const [directAirline, setDirectAirline] = useState<DirectProps[]>(
    isAddOrRevise === 'revise' 
    ? JSON.parse(cityData.directAirline)
    : [{tourPeriodNight: "", tourPeriodDay: "", departAirportMain : "", 
        airlineData : [
          { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
          { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
        ]
      }]
  )
  const [viaAirline, setViaAirline] = useState<ViaProps[]>(
    isAddOrRevise === 'revise' 
    ? JSON.parse(cityData.viaAirline)
    : [{tourPeriodNight: "", tourPeriodDay: "", departAirportMain : "", 
        airlineData : [
          { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
          { sort:"viaArrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
          { sort:"viaDepart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
          { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
        ]
      }]
  )

  // 내용변경
  const handleContentChange = (text:any, useState:any, setUseState:any, index:any, subIndex:any, name:any) => {
    const inputs = [...useState]
    inputs[index].airlineData[subIndex][name] = text;
    setUseState(inputs);
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
        sort : sort,
        continent : continent,
        nation : nation,
        cityKo : cityKo,
        cityEn : cityEn,
        weather : weather,
        tourNotice : tourNotice,
        inputImage : JSON.stringify(inputImage),
        directAirline : JSON.stringify(directAirline),
        viaAirline : JSON.stringify(viaAirline),
      }
      axios 
        .post(`${MainURL}/nationcity/registercities`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: getParams,
        })
        .then((res) => {
          if (res.data) {
            alert('등록되었습니다.');
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
      .post(`${MainURL}/nationcity/deletecityimage`, {
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
      sort : sort,
      continent : continent,
      nation : nation,
      cityKo : cityKo,
      cityEn : cityEn,
      weather : weather,
      tourNotice : tourNotice,
      inputImage : JSON.stringify(inputImage),
      directAirline : JSON.stringify(directAirline),
      viaAirline : JSON.stringify(viaAirline),
    }
    axios 
      .post(`${MainURL}/nationcity/revisecities`, formData, {
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
  
  const verticalBar40 = {width:'1px', minHeight:'40px', backgroundColor:'#d4d4d4'};

  
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
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
            <TitleBox width="120px" text='분류'/>
            <p style={{width:'20%'}}>{sort}</p>
            <TitleBox width="120px" text='대륙'/>
            <p style={{width:'20%'}}>{continent}</p>
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

        <div className="coverrow hole bigHeight">
          <TitleBox width="120px" text='지도/이미지'/>

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
        </div>
      </section>

      <div style={{height:'50px'}}></div>

      {/* 항공편 입력 --------------------------------------------------------------------------------------------------------------- */}
      <div className="modal-header">
        <h1>항공편 입력</h1>
      </div>
      
      <div className="selectInputBtnBox">
        <div className="selectInputBtn"
          onClick={()=>{setAirlineSelectInput('direct')}}
          style={{backgroundColor: airlineSelectInput === 'direct' ? '#242d3f' : '#fff', 
            color: airlineSelectInput === 'direct' ? '#fff' : '#333' }}
        >직항</div>
        <div className="selectInputBtn"
          onClick={()=>{setAirlineSelectInput('via')}}
          style={{backgroundColor: airlineSelectInput === 'via' ? '#242d3f' : '#fff', 
            color: airlineSelectInput === 'via' ? '#fff' : '#333' }}
        >경유</div>
        <div className="selectInputBtn"
          onClick={()=>{
            if (airlineSelectInput === 'direct') {
              setDirectAirline([...directAirline, 
                {tourPeriodNight: "", tourPeriodDay: "", departAirportMain : "", 
                  airlineData : [
                    { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                    { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
                  ]
                }]
              )
            } else if (airlineSelectInput === 'via') {
              setViaAirline([...viaAirline,
                {tourPeriodNight: "", tourPeriodDay: "", departAirportMain : "", 
                  airlineData : [
                    { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                    { sort:"viaArrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                    { sort:"viaDepart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                    { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                  ]
                }
              ])
            }
          }}
          style={{width:'50px', backgroundColor: '#fff', color: '#333' }}
        >+</div>
      </div>

      <div style={{marginBottom:'50px'}}>
      {/* 직항 ----------------- */}
      { 
        airlineSelectInput === 'direct' &&
        <section>
          <div className="bottombar"></div>
          <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
            <div className='chartbox' style={{width:'13%'}} ><p>기간</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발공항</p></div>
            <div className="chart-divider"></div>
            <div style={{width:'80%', display:'flex'}}>
              <div className='chartbox' style={{width:'3%'}} ><p></p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'12%'}} ><p>항공사</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'25%'}} ><p>출발요일</p></div>
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
            </div>
          </div>
          
          {
            directAirline.map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    
                    <div style={{width:'13%', display:'flex', alignItems:'center'}} >
                      <div className='deleteRowBtn'
                        onClick={()=>{
                          const copy = [...directAirline];
                          const filtered = copy.filter((e:any, copyindex:any)=> copyindex !== index);
                          setDirectAirline(filtered);
                        }}
                        ><FiMinusCircle  color='#FF0000'/>
                      </div>
                      <DropdownBox
                        widthmain='45%'
                        height='35px'
                        selectedValue={item.tourPeriodNight}
                        options={DropDownTourPeriodNightType}    
                        handleChange={(e)=>{
                          const copy = [...directAirline];
                          copy[index].tourPeriodNight = e.target.value;
                          setDirectAirline(copy);
                        }}
                      />
                      <DropdownBox
                        widthmain='45%'
                        height='35px'
                        selectedValue={item.tourPeriodDay}
                        options={DropDownTourPeriodDayType}    
                        handleChange={(e)=>{
                          const copy = [...directAirline];
                          copy[index].tourPeriodDay = e.target.value;
                          setDirectAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'7%'}} >
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
                          const copy = [...directAirline];
                          copy[index].departAirportMain = e.target.value;
                          setDirectAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'80%'}} >
                    {
                      item.airlineData.map((subItem:any, subIndex:any)=>{
                        return (
                          <div style={{width:'100%', display:'flex', alignItems:'center'}} >
                            <div style={{width:'3%', display:'flex', alignItems:'center', justifyContent:'center'}} >
                              { subItem.sort === 'depart' && <BiSolidRightArrowAlt /> }
                              { subItem.sort === 'arrive' && <BiSolidLeftArrowAlt /> }
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <DropdownBox
                                widthmain='90%'
                                height='35px'
                                selectedValue={subItem.airlineName}
                                options={DropDownAirline}    
                                handleChange={(e)=>{handleContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'airlineName');}}
                              />
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'25%'}} >
                              <div className="dayBox">
                                {
                                  ['월', '화', '수', '목', '금', '토', '일'].map((dateItem:any, dateIndex:any)=>{
                                    return (
                                      <div className="dayBtn" key={dateIndex}
                                      style={{backgroundColor:subItem.departDate.includes(dateItem) ? '#5fb7ef' : '#fff'}}
                                        onClick={()=>{
                                          const copy = [...directAirline]; 
                                          if (copy[index].airlineData[subIndex].departDate.includes(dateItem)) {
                                            const filteredDates = copy[index].airlineData[subIndex].departDate.filter(filterItem => filterItem !== dateItem);
                                            copy[index].airlineData[subIndex].departDate = filteredDates;
                                            setDirectAirline(copy);
                                          } else {
                                            copy[index].airlineData[subIndex].departDate.push(dateItem);
                                            setDirectAirline(copy);
                                          }
                                        }}
                                      ><p>{dateItem}</p></div>
                                    )
                                  })
                                }
                                <div className="dayBtn" 
                                  style={{backgroundColor:'#ccc'}}
                                  onClick={()=>{
                                    const copy = [...directAirline]; 
                                      copy[index].airlineData[subIndex].departDate = ['월', '화', '수', '목', '금', '토', '일'];
                                      setDirectAirline(copy);
                                  }}
                                ><p>All</p></div>
                              </div>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.planeName} 
                                onChange={(e)=>{handleContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'planeName');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departAirport} 
                                onChange={(e)=>{handleContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'departAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departTime} 
                                onChange={(e)=>{handleContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'departTime');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveAirport} 
                                onChange={(e)=>{handleContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'arriveAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveTime} 
                                onChange={(e)=>{handleContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'arriveTime');}}/>
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
      }
      
      {/* 경유 ----------------- */}
      {
        airlineSelectInput === 'via' &&
        <section>
          <div className="bottombar"></div>
          <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
            <div className='chartbox' style={{width:'13%'}} ><p>기간</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발공항</p></div>
            <div className="chart-divider"></div>
            <div style={{width:'80%', display:'flex'}}>
              <div className='chartbox' style={{width:'3%'}} ><p></p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'12%'}} ><p>항공사</p></div>
              <div className="chart-divider"></div>
              <div className='chartbox' style={{width:'25%'}} ><p>출발요일</p></div>
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
            </div>
          </div>
          
          {
            viaAirline.map((item:any, index:any)=>{
              return (
                <div className="coverbox">
                  <div className="coverrow hole">
                    <div style={{width:'13%', display:'flex', alignItems:'center'}} >
                      <div className='deleteRowBtn'
                        onClick={()=>{
                          const copy = [...directAirline];
                          const filtered = copy.filter((e:any, copyindex:any)=> copyindex !== index);
                          setViaAirline(filtered);
                        }}
                        ><FiMinusCircle  color='#FF0000'/>
                      </div>
                      <DropdownBox
                        widthmain='45%'
                        height='35px'
                        selectedValue={item.tourPeriodNight}
                        options={DropDownTourPeriodNightType}    
                        handleChange={(e)=>{
                          const copy = [...viaAirline];
                          copy[index].tourPeriodNight = e.target.value;
                          setViaAirline(copy);
                        }}
                      />
                      <DropdownBox
                        widthmain='45%'
                        height='35px'
                        selectedValue={item.tourPeriodDay}
                        options={DropDownTourPeriodDayType}    
                        handleChange={(e)=>{
                          const copy = [...viaAirline];
                          copy[index].tourPeriodDay = e.target.value;
                          setViaAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'160px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'7%'}} >
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
                          const copy = [...viaAirline];
                          copy[index].departAirportMain = e.target.value;
                          setViaAirline(copy);
                        }}
                      />
                    </div>
                    <div style={{width:'1px', minHeight:'160px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'80%'}} >
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
                            <div style={{width:'12%'}} >
                              <DropdownBox
                                widthmain='90%'
                                height='35px'
                                selectedValue={subItem.airlineName}
                                options={DropDownAirline}    
                                handleChange={(e)=>{handleContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'airlineName');}}
                              />
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'25%'}} >
                              <div className="dayBox">
                                {
                                  ['월', '화', '수', '목', '금', '토', '일'].map((dateItem:any, dateIndex:any)=>{
                                    return (
                                      <div className="dayBtn" key={dateIndex}
                                      style={{backgroundColor:subItem.departDate.includes(dateItem) ? '#5fb7ef' : '#fff'}}
                                        onClick={()=>{
                                          const copy = [...viaAirline]; 
                                          if (copy[index].airlineData[subIndex].departDate.includes(dateItem)) {
                                            const filteredDates = copy[index].airlineData[subIndex].departDate.filter(filterItem => filterItem !== dateItem);
                                            copy[index].airlineData[subIndex].departDate = filteredDates;
                                            setViaAirline(copy);
                                          } else {
                                            copy[index].airlineData[subIndex].departDate.push(dateItem);
                                            setViaAirline(copy);
                                          }
                                        }}
                                      ><p>{dateItem}</p></div>
                                    )
                                  })
                                }
                                <div className="dayBtn" 
                                  style={{backgroundColor:'#ccc'}}
                                  onClick={()=>{
                                    const copy = [...viaAirline]; 
                                    copy[index].airlineData[subIndex].departDate = ['월', '화', '수', '목', '금', '토', '일'];
                                    setViaAirline(copy);
                                  }}
                                ><p>All</p></div>
                              </div>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.planeName} 
                                onChange={(e)=>{handleContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'planeName');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departAirport} 
                                onChange={(e)=>{handleContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'departAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departTime} 
                                onChange={(e)=>{handleContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'departTime');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveAirport} 
                                onChange={(e)=>{handleContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'arriveAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveTime} 
                                onChange={(e)=>{handleContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'arriveTime');}}/>
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
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            isAddOrRevise === 'revise' ? reviseCity() : registerCity();
          }}
        >
          <p>저장</p>
        </div>
       
      </div>
      
    </div>     
  )
}
