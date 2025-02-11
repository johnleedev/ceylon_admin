
import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { format, formatDate } from 'date-fns';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { IoClose } from 'react-icons/io5';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';


export default function ModalAddTourProduct (props : any) {
	
  let navigate = useNavigate();
  const sorts = ["차량/가이드", "익스커션", "스파마사지", "골프", "강습/클래스", "VIP서비스", "1박투어", "호캉스즐기기", "경유지일정"];
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const tourProductData = isAddOrRevise === 'revise' ? props.tourProductData : null;

  const [selectedNation, setSelectedNation] = useState<any>([]);
  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? tourProductData.sort : "경유지일정");
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? tourProductData.nation :'');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? tourProductData.city :'');
  const [productName, setProductName] = useState(isAddOrRevise === 'revise' ? tourProductData.productName :'');
  const [nativeLanguage, setNativeLanguage] = useState(isAddOrRevise === 'revise' ? tourProductData.nativeLanguage :'');
  const [address, setAddress] = useState(isAddOrRevise === 'revise' ? tourProductData.address :'');
  const [site, setSite] = useState(isAddOrRevise === 'revise' ? tourProductData.site :'');
  const [detailNotice, setDetailNotice] = useState(isAddOrRevise === 'revise' ? tourProductData.detailNotice :'');
  const [tourTime, setTourTime] = useState(isAddOrRevise === 'revise' ? tourProductData.tourTime :'');
  const [runTime, setRunTime] = useState(isAddOrRevise === 'revise' ? tourProductData.runTime :'');
  const [openDate, setOpenDate] = useState(isAddOrRevise === 'revise' ? tourProductData.openDate :'');
  const [closeDate, setCloseDate] = useState(isAddOrRevise === 'revise' ? tourProductData.closeDate :'');
  const [meetLocation, setMeetLocation] = useState(isAddOrRevise === 'revise' ? tourProductData.meetLocation :'');
  const [phone, setPhone] = useState(isAddOrRevise === 'revise' ? tourProductData.phone :'');
  const [caution, setCaution] = useState(isAddOrRevise === 'revise' ? tourProductData.caution :'');
  const [programTimeCost, setProgramTimeCost] = useState(
    isAddOrRevise === 'revise' 
    ? JSON.parse(tourProductData.programTimeCost)
    : {periodStart:"", periodEnd:"", content:"", depositCost:"", saleCost:""});
  const [mainMenuCost, setMainMenuCost] = useState(
    isAddOrRevise === 'revise' 
    ? JSON.parse(tourProductData.mainMenuCost)
    : [{menu:"", saleCost:""}]);
  const [includeNoteText, setIncludeNoteText] = useState(isAddOrRevise === 'revise' ? tourProductData.includeNoteText :'');
  const [notIncludeNoteText, setNotIncludeNoteText] = useState(isAddOrRevise === 'revise' ? tourProductData.notIncludeNoteText :'');
  const [recommendPoint, setRecommendPoint] = useState(isAddOrRevise === 'revise' ? tourProductData.recommendPoint :'');
  const [reserveWay, setReserveWay] = useState(isAddOrRevise === 'revise' ? tourProductData.reserveWay :'');
  const [cancelNotice, setCancelNotice] = useState(isAddOrRevise === 'revise' ? tourProductData.cancelNotice :'');
  const [keyword, setKeyword] = useState(isAddOrRevise === 'revise' ? tourProductData.keyword :'');
  const [badges, setBadges] = useState(isAddOrRevise === 'revise' ? tourProductData.badges :'');
  const [scores, setScores] = useState(isAddOrRevise === 'revise' ? tourProductData.scores :'');
  const [lastImages, setLastImages]  = 
    useState((props.isAddOrRevise === 'revise' && (tourProductData.inputImage !== null && tourProductData.inputImage !== '')) ? JSON.parse(tourProductData.inputImage) : []);
  const [inputImage, setInputImage] = 
    useState((props.isAddOrRevise === 'revise' && (tourProductData.inputImage !== null && tourProductData.inputImage !== '')) ? JSON.parse(tourProductData.inputImage) : []);
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
      const imageNamesCopy = props.isAddOrRevise === 'revise' ? [...imageNames] : imageNames
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

  // 기존 이미지 삭제 ----------------------------------------------
  const deleteInputLastImage = async (imageName:string) => {
    const lastImagesCopy = [...lastImages]
    const lastImagesNewItems = lastImagesCopy.filter((item, index) => item !== imageName);
    const inputImagesCopy = [...inputImage]
    const inputImagesNewItems = inputImagesCopy.filter((item, index) => item !== imageName);

    axios 
      .post(`${MainURL}/tourtourproduct/deletetourproductimage`, {
        postId : tourProductData.id,
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
  

  // 저장 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const registertourproduct = async () => {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });
    const getParams = {
      sort : sort,
      nation : nation,
      city : city,
      productName : productName,
      nativeLanguage : nativeLanguage,
      address : address,
      site : site,
      detailNotice : detailNotice,
      tourTime : tourTime,
      runTime : runTime,
      openDate : openDate,
      closeDate : closeDate,
      meetLocation : meetLocation,
      phone : phone,
      caution : caution,
      programTimeCost : JSON.stringify(programTimeCost),
      mainMenuCost : JSON.stringify(mainMenuCost),
      includeNoteText : includeNoteText,
      notIncludeNoteText : notIncludeNoteText,
      recommendPoint : recommendPoint,
      reserveWay : reserveWay,
      cancelNotice : cancelNotice,
      keyword : keyword,
      badges : badges,
      scores : scores,
      inputImage : JSON.stringify(inputImage)
    }
    axios 
      .post(`${MainURL}/resttourproduct/registertourproduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddTourProductModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };


  // 수정 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const revisetourproduct = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });
    const getParams = {
      postId : tourProductData.id,
      sort : sort,
      nation : nation,
      city : city,
      productName : productName,
      nativeLanguage : nativeLanguage,
      address : address,
      site : site,
      detailNotice : detailNotice,
      tourTime : tourTime,
      runTime : runTime,
      openDate : openDate,
      closeDate : closeDate,
      meetLocation : meetLocation,
      phone : phone,
      caution : caution,
      programTimeCost : JSON.stringify(programTimeCost),
      mainMenuCost : JSON.stringify(mainMenuCost),
      includeNoteText : includeNoteText,
      notIncludeNoteText : notIncludeNoteText,
      recommendPoint : recommendPoint,
      reserveWay : reserveWay,
      cancelNotice : cancelNotice,
      keyword : keyword,
      badges : badges,
      scores : scores,
      inputImage : JSON.stringify(inputImage),
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/resttourproduct/revisetourproduct`, formData, {
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

  // selectbox ----------------------------------------------
  interface SelectBoxProps {
    text : string;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={sort === text}
          onChange={()=>{
            setSort(text);
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )
  
  
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddTourProductModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      <div className="modal-header">
        <h1>선택일정등록</h1>
      </div>


      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole" style={{height:'50px'}}>
            <TitleBox width="120px" text='투어타입'/>
            <div className='checkInputCover'>
              {
                sorts.map((item:any, index:any)=>{
                  return (
                    <SelectBox text={item} key={index}/>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>

      <div style={{height:30}}></div>

      <div className="modal-header">
        <h1>{sort}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='국가'/>
            <DropdownBox
              widthmain='50%'
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
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='도시'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={city}
              options={[
                { value: '선택', label: '선택' },
                ...selectedNation.map((nation:any) => (
                  { value: nation.cityKo, label: nation.cityKo }
                ))
              ]}    
              handleChange={(e)=>{setCity(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='상품명'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={productName} onChange={(e)=>{
                  setProductName(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='영문/현지어'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={nativeLanguage} onChange={(e)=>{
                  setNativeLanguage(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='주소/연락처'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={address} onChange={(e)=>{
                  setAddress(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='사이트'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={site} onChange={(e)=>{
                  setSite(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='상세설명' height={200}/>
            <textarea 
              className="textarea"
              value={detailNotice}
              onChange={(e)=>{
                setDetailNotice(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='투어시간대'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={tourTime} onChange={(e)=>{
                  setTourTime(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='소요시간'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={runTime} onChange={(e)=>{
                  setRunTime(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='영업요일/운영시간'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={openDate} onChange={(e)=>{
                  setOpenDate(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='휴무일'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={closeDate} onChange={(e)=>{
                  setCloseDate(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='미팅장소/시간'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={meetLocation} onChange={(e)=>{
                  setMeetLocation(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={phone} onChange={(e)=>{
                  setPhone(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='이용안내/주의사항'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={caution} onChange={(e)=>{
                  setCaution(e.target.value);
                }}/>
          </div>
        </div>
        {
          (sort === '가이드투어' || sort === '입장권' || sort === '탑승권' || sort === '공연/경기') &&
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='요금'/>
              <div style={{width:'90%', textAlign:'center'}}>
                <div style={{backgroundColor:'#fff', display:'flex', alignItems:'center'}}>
                  <div style={{width:'30%'}} ><p>기간</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'30%'}} ><p>프로그램</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'20%'}} ><p>입금가</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'20%'}} ><p>입금가</p></div>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <DateBoxDouble dateStart={programTimeCost.periodStart} dateEnd={programTimeCost.periodEnd}
                        setSelectStartDate={(e:any)=>{ 
                          const copy = {...programTimeCost};
                          copy.periodStart = e;
                          copy.periodEnd = e;
                          setProgramTimeCost(copy);
                        }} 
                        setSelectEndDate={(e:any)=>{ 
                          const copy = {...programTimeCost};
                          copy.periodStart = e;
                          copy.periodEnd = e;
                          setProgramTimeCost(copy);
                        }} 
                      />
                  </div>
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={programTimeCost.content} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = {...programTimeCost};
                        copy.content = e.target.value;
                        setProgramTimeCost(copy);
                      }}/>
                  </div>
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={programTimeCost.depositCost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = {...programTimeCost};
                        copy.depositCost = e.target.value;
                        setProgramTimeCost(copy);
                      }}/>
                  </div>
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={programTimeCost.saleCost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = {...programTimeCost};
                        copy.saleCost = e.target.value;
                        setProgramTimeCost(copy);
                      }}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {
          (sort === '식사' || sort === '카페/바/클럽') &&
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='요금'/>
              <div style={{width:'90%'}}>
              {
                mainMenuCost.map((item:any, index:any)=>{
                  return (
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center'}} key={index}>
                      <p style={{marginRight:'10px'}}>메뉴</p>
                        <input className="inputdefault" value={item.menu} 
                          style={{width:'30%', minHeight:'40px', outline:'none'}} 
                          onChange={(e)=>{
                            const copy = [...mainMenuCost];
                            copy[index].menu = e.target.value;
                            setMainMenuCost(copy);
                          }}/>
                        <p style={{marginRight:'10px'}}>요금</p>
                        <input className="inputdefault" value={item.saleCost} 
                          style={{width:'30%', minHeight:'40px', outline:'none'}} 
                          onChange={(e)=>{
                            const copy = [...mainMenuCost];
                            copy[index].saleCost = e.target.value;
                            setMainMenuCost(copy);
                          }}/>
                        <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                        <div className="dayBox">
                          <div className="dayBtn"
                            onClick={()=>{
                              const copy = [...mainMenuCost, {menu:"", saleCost:""}];
                              setMainMenuCost(copy);
                            }}
                          >
                            <p>+</p>
                          </div>
                        </div>  
                        <div className="dayBox">
                          <div className="dayBtn"
                            onClick={()=>{
                              const copy = [...mainMenuCost];
                               copy.splice(index, 1);
                               setMainMenuCost(copy);
                            }}
                          >
                            <p>-</p>
                          </div>
                        </div>  
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
          </div>
        }
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='포함사항'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={includeNoteText} onChange={(e)=>{
                  setIncludeNoteText(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='불포함사항'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={notIncludeNoteText} onChange={(e)=>{
                  setNotIncludeNoteText(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='추천포인트'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={recommendPoint} onChange={(e)=>{
                  setRecommendPoint(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='예약방법'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={reserveWay} onChange={(e)=>{
                  setReserveWay(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='취소환불규정'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={cancelNotice} onChange={(e)=>{
                  setCancelNotice(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='키워드'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={keyword} onChange={(e)=>{
                  setKeyword(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='뱃지'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={badges} onChange={(e)=>{
                  setBadges(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='평점'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={scores} onChange={(e)=>{
                  setScores(e.target.value);
                }}/>
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
                        src={`${MainURL}/images/tourproductimages/${item}`}
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

      <div style={{height:'20px'}}></div>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddTourProductModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            if (isAddOrRevise === 'revise') {
              revisetourproduct();
            } else {
              registertourproduct();
            }
          }}
        >
          <p>저장</p>
        </div>
      </div>
      
    </div>     
  )
}
