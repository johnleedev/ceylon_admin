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
  const [productCategory, setProductCategory] = useState(isAddOrRevise === 'revise' ? cityData.productCategory : '');
  const [scheduleSelect, setScheduleSelect] = useState(isAddOrRevise === 'revise' ? JSON.parse(cityData.scheduleSelect) : ['']);

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



  interface SelectBoxConvenienceProps {
    text : any;
  }
  const SelectBoxConvenience : React.FC<SelectBoxConvenienceProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={scheduleSelect.includes(text)}
          onChange={()=>{
            const copy = [...scheduleSelect];
            if (scheduleSelect.includes(text)) {
              const result = copy.filter(e => e !== text);
              setScheduleSelect(result);
            } else {
              copy.push(text); 
              setScheduleSelect(copy);
            }
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

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
        productCategory : productCategory,
        scheduleSelect : JSON.stringify(scheduleSelect),
        inputImage : JSON.stringify(inputImage)
      }
      axios 
        .post(`${MainURL}/restnationcity/registercities`, formData, {
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
      .post(`${MainURL}/restnationcity/deletecityimage`, {
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
      productCategory : productCategory,
      scheduleSelect : JSON.stringify(scheduleSelect),
      inputImage : JSON.stringify(inputImage),
    }
    axios 
      .post(`${MainURL}/restnationcity/revisecities`, formData, {
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
  const [airlineSelectInput, setAirlineSelectInput] = useState('direct');
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

  const [directAirline, setDirectAirline] = useState<AirlineProps[]>(
    isAddOrRevise === 'revise' ? props.directAirlineData : []
  )
  const [viaAirline, setViaAirline] = useState<AirlineProps[]>(
    isAddOrRevise === 'revise' ? props.viaAirlineData : []
  )

  // 항공편 내용변경
  const handleAirlineContentChange = (text:any, useState:any, setUseState:any, index:any, subIndex:any, name:any) => {
    const inputs = [...useState]
    inputs[index].airlineData[subIndex][name] = text;
    setUseState(inputs);
  };

  // 항공편 저장 함수 ----------------------------------------------
  const registerAirline = async (sort:string) => {
    const inputAirlineOrigin = sort === 'direct' ? [...directAirline] : [...viaAirline];
    for (let index = 0; index < inputAirlineOrigin.length; index++) {
      const airlineItem = inputAirlineOrigin[index];
      if (!airlineItem.departAirline || airlineItem.departAirline.trim() === '') {
        alert(`${index + 1}번째 항목의 출발편명이 입력되지 않았습니다.`);
        return;
      }
    }
    const promises = [];
    for (let index = 0; index < inputAirlineOrigin.length; index++) {
      const postPromise = axios.post(`${MainURL}/restnationcity/registerairline`, {
        postId : inputAirlineOrigin[index].id,
        nation : nation,
        city : cityKo,
        sort : sort,
        tourPeriodNight : inputAirlineOrigin[index].tourPeriodNight,
        tourPeriodDay : inputAirlineOrigin[index].tourPeriodDay,
        departAirportMain : inputAirlineOrigin[index].departAirportMain,
        departAirline : inputAirlineOrigin[index].departAirline,
        airlineData : JSON.stringify(inputAirlineOrigin[index].airlineData)
      })
        .then((response) => {
          return { success: true, data: response.data };
        })
        .catch((error) => {
          console.error(`에러 발생 : ${inputAirlineOrigin[index]}`, error);
          return { success: false };
        });
      promises.push(postPromise);
    }
  
    try {
      const results = await Promise.all(promises);
      const allSuccess = results.every(result => result.success);
      if (allSuccess) {
        alert('모두 정상적으로 저장되었습니다.');
        props.setRefresh(!props.refresh);
        props.setIsViewAddCityModal(false);
      } else {
        alert('정상적으로 저장되지 않았습니다.');
      }
    } catch (error) {
      alert('실패');
      console.error('전체적인 오류 발생', error);
    }
  };

  // 항공편 삭제
  const deleteAirline = async (item:any, sort:string) => {
		const getParams = {
			postId : item.id,
		}
		axios 
			.post(`${MainURL}/restnationcity/deleteairline`, getParams)
			.then((res) => {
				if (res.data) {
					alert('삭제되었습니다.');
          if (sort === 'direct') {
            const copy = [...directAirline];
            const filtered = copy.filter((e:any)=> e.departAirline !== item.departAirline);
            setDirectAirline(filtered);
          } else {
            const copy = [...viaAirline];
            const filtered = copy.filter((e:any)=> e.departAirline !== item.departAirline);
            setViaAirline(filtered);
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
    const costConfirmed = window.confirm(`${item.tourPeriodNight}${item.tourPeriodDay}(편명:${item.departAirline})의 항공편을 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteAirline(item, sort);
		} else {
			return
		}
	};

  // common style
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
            <TitleBox width="120px" text='상품카테고리'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productCategory === '추천풀빌라'}
                  onChange={()=>{setProductCategory('추천풀빌라')}}
                />
              </div>
              <p>추천풀빌라</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productCategory === '얼리버드'}
                  onChange={()=>{setProductCategory('얼리버드')}}
                />
              </div>
              <p>얼리버드</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productCategory === '가족여행추천리조트'}
                  onChange={()=>{setProductCategory('가족여행추천리조트')}}
                />
              </div>
              <p>가족여행추천리조트</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productCategory === '우붓스테이'}
                  onChange={()=>{setProductCategory('우붓스테이')}}
                />
              </div>
              <p>우붓스테이</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='일정선택'/>
            <div className='checkInputCover'>
              <SelectBoxConvenience text='경유지일정'/>
              <SelectBoxConvenience text='선택일정'/>
              <SelectBoxConvenience text='우붓일정'/>
              <SelectBoxConvenience text='해양스포츠'/>
              <SelectBoxConvenience text='스파마사지'/>
              <SelectBoxConvenience text='리조트부대시설'/>
              <SelectBoxConvenience text='레스토랑/바/클럽'/>
              <SelectBoxConvenience text='VIP서비스'/>
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
          <p>도시 정보 저장</p>
        </div>
       
      </div>

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
              const copy = [...directAirline]
              if (copy.length === 0) {
                setDirectAirline([...directAirline, 
                  {id: "", tourPeriodNight: "", tourPeriodDay: "", departAirportMain : "",  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""}
                    ]
                  }]
                )
              } else {
                const lastItem = copy[copy.length - 1];
                setDirectAirline([...directAirline, 
                  {id: "", tourPeriodNight: "", tourPeriodDay: "", departAirportMain : lastItem.departAirportMain,  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[0].departAirport, departTime:"", arriveAirport:lastItem.airlineData[0].arriveAirport, arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[1].departAirport, departTime:"", arriveAirport:lastItem.airlineData[1].arriveAirport, arriveTime:""}
                    ]
                  }]
                )
              }
            } else if (airlineSelectInput === 'via') {
              const copy = [...viaAirline];
              if (copy.length === 0) { 
                setViaAirline([...viaAirline,
                  {id: "", tourPeriodNight: "", tourPeriodDay: "", departAirportMain : "",  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                      { sort:"viaArrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                      { sort:"viaDepart", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:"", departTime:"", arriveAirport:"", arriveTime:""},
                    ]
                  }
                ])
              } else {
                const lastItem = copy[copy.length - 1];
                setViaAirline([...viaAirline,
                  {id: "", tourPeriodNight: "", tourPeriodDay: "", departAirportMain : lastItem.departAirportMain,  departAirline : "",
                    airlineData : [
                      { sort:"depart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[0].departAirport, departTime:"", arriveAirport:lastItem.airlineData[0].arriveAirport, arriveTime:""},
                      { sort:"viaArrive", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[1].departAirport, departTime:"", arriveAirport:lastItem.airlineData[1].arriveAirport, arriveTime:""},
                      { sort:"viaDepart", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[2].departAirport, departTime:"", arriveAirport:lastItem.airlineData[2].arriveAirport, arriveTime:""},
                      { sort:"arrive", airlineName:"", departDate:[], planeName:"", departAirport:lastItem.airlineData[3].departAirport, departTime:"", arriveAirport:lastItem.airlineData[3].arriveAirport, arriveTime:""},
                    ]
                  }
                ])
              }
              
            }
          }}
          style={{width:'50px', backgroundColor: '#fff', color: '#333' }}
        >+</div>
      </div>

      {/* 직항 ----------------- */}
      <div style={{marginBottom:'50px'}}>
      { 
        airlineSelectInput === 'direct' &&
        <section>
          <div className="bottombar"></div>
          <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
            <div className='chartbox' style={{width:'13%'}} ><p>기간</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발공항</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'7%'}} ><p>출발편명</p></div>
            <div className="chart-divider"></div>
            <div style={{width:'73%', display:'flex'}}>
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
                          if (item.id === '') {
                            const copy = [...directAirline];
                            const filtered = copy.filter((e:any, copyindex:any)=> copyindex !== index);
                            setDirectAirline(filtered);
                          } else {
                            handleDeleteAlert(item, 'direct')
                          }
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
                    <div style={{width:'7%'}} >
                      <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px', height:'35px'}} 
                        value={item.departAirline}
                        onChange={(e)=>{
                          const inputtext = e.target.value;
                          const copy = [...directAirline];
                          copy[index].departAirline = inputtext;
                          copy[index].airlineData[0].planeName = inputtext;
                          setDirectAirline(copy);
                        }}/>
                    </div>
                    <div style={{width:'1px', minHeight:'80px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'73%'}} >
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
                                handleChange={(e)=>{handleAirlineContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'airlineName');}}
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
                                onChange={(e)=>{
                                  const inputtext = e.target.value;
                                  const copy = [...directAirline];
                                  copy[index].departAirline = inputtext;
                                  copy[index].airlineData[subIndex].planeName = inputtext;
                                  setDirectAirline(copy);
                                }}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'departAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'departTime');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'arriveAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, directAirline, setDirectAirline, index, subIndex, 'arriveTime');}}/>
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
            <div className='chartbox' style={{width:'7%'}} ><p>출발편명</p></div>
            <div className="chart-divider"></div>
            <div style={{width:'73%', display:'flex'}}>
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
                          if (item.id === '') {
                            const copy = [...viaAirline];
                            const filtered = copy.filter((e:any, copyindex:any)=> copyindex !== index);
                            setViaAirline(filtered);
                          } else {
                            handleDeleteAlert(item, 'via')
                          }
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
                    <div style={{width:'7%'}} >
                      <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px', height:'35px'}} 
                        value={item.departAirline}
                        onChange={(e)=>{
                          const inputtext = e.target.value;
                          const copy = [...viaAirline];
                          copy[index].departAirline = inputtext;
                          copy[index].airlineData[0].planeName = inputtext;
                          setViaAirline(copy);
                        }}/>
                    </div>
                    <div style={{width:'1px', minHeight:'160px', backgroundColor:'#d4d4d4'}}></div>
                    <div style={{width:'73%'}} >
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
                                handleChange={(e)=>{handleAirlineContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'airlineName');}}
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
                                onChange={(e)=>{
                                  const inputtext = e.target.value;
                                  const copy = [...viaAirline];
                                  copy[index].departAirline = inputtext;
                                  copy[index].airlineData[subIndex].planeName = inputtext;
                                  setViaAirline(copy);
                                }}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'departAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.departTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'departTime');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveAirport} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'arriveAirport');}}/>
                            </div>
                            <div style={verticalBar40}></div>
                            <div style={{width:'12%'}} >
                              <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                value={subItem.arriveTime} 
                                onChange={(e)=>{handleAirlineContentChange(e.target.value, viaAirline, setViaAirline, index, subIndex, 'arriveTime');}}/>
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
            if (airlineSelectInput === 'direct') {
              registerAirline('direct');
            } else {
              registerAirline('via');
            }
          }}
        >
          <p>{airlineSelectInput === 'direct' ? '직항' : '경유'} 저장</p>
        </div>
       
      </div>

      
    </div>     
  )
}
