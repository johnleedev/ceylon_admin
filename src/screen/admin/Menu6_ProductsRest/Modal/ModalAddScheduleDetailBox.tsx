
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
import { ScheduleDatailSorts } from '../CommonRestData';


export default function ModalAddScheduleDetailBox (props : any) {
	
  let navigate = useNavigate();
  const sorts = ScheduleDatailSorts;
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const scheduleDetailData = isAddOrRevise === 'revise' ? props.scheduleDetailInfo : null;
  const [selectedNation, setSelectedNation] = useState<any>([]);

  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.nation :'');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.city :'');
  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.sort : "");
  const [productName, setProductName] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.productName :'');
  const [detailNotice, setDetailNotice] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.detailNotice :'');
  const [includeNoteText, setIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.includeNoteText :'');
  const [notIncludeNoteText, setNotIncludeNoteText] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.notIncludeNoteText :'');
  const [badges, setBadges] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.badges :'');
  const [scores, setScores] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.scores :'');
  
  const [departTime, setDepartTime] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.departTime :'');
  const [runTime, setRunTime] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.runTime :'');
  const [openDate, setOpenDate] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.openDate :'');
  const [closeDate, setCloseDate] = useState(isAddOrRevise === 'revise' ? JSON.parse(scheduleDetailData.closeDate) : []);
  const [departLocation, setDepartLocation] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.departLocation :'');
  const [traffic, setTraffic] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.traffic :'');
  
  const [programTimeCost, setProgramTimeCost] = useState(
    isAddOrRevise === 'revise' 
    ? JSON.parse(scheduleDetailData.programTimeCost)
    : [{program:"", content:"", time:"", saleCost:""}]);
  const [cancelNotice, setCancelNotice] = useState(isAddOrRevise === 'revise' ? scheduleDetailData.cancelNotice :'');

  const [lastImages, setLastImages]  = 
    useState((props.isAddOrRevise === 'revise' && (scheduleDetailData.inputImage !== null && scheduleDetailData.inputImage !== '')) ? JSON.parse(scheduleDetailData.inputImage) : []);
  const [inputImage, setInputImage] = 
    useState((props.isAddOrRevise === 'revise' && (scheduleDetailData.inputImage !== null && scheduleDetailData.inputImage !== '')) ? JSON.parse(scheduleDetailData.inputImage) : []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);


  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'MMddHHmmss');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {

      if (acceptedFiles.length > 1) {
        alert(`1개의 파일만 업로드할 수 있습니다.`);
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000,
        
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
      .post(`${MainURL}/resttourproduct/deletetourproductimage`, {
        postId : scheduleDetailData.id,
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
      detailNotice : detailNotice,
      includeNoteText : includeNoteText,
      notIncludeNoteText : notIncludeNoteText,
      badges : badges,
      scores : scores,
      departTime : departTime,
      runTime : runTime,
      openDate : openDate,
      closeDate : JSON.stringify(closeDate),
      departLocation : departLocation,
      traffic : traffic,
      programTimeCost : JSON.stringify(programTimeCost),
      cancelNotice : cancelNotice,
      inputImage : JSON.stringify(inputImage)
    }
    axios 
      .post(`${MainURL}/restscheduledetailbox/registertourproduct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddScheduleDetailBox(false);
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
      postId : scheduleDetailData.id,
      sort : sort,
      nation : nation,
      city : city,
      productName : productName,
      detailNotice : detailNotice,
      includeNoteText : includeNoteText,
      notIncludeNoteText : notIncludeNoteText,
      badges : badges,
      scores : scores,
      departTime : departTime,
      runTime : runTime,
      openDate : openDate,
      closeDate : JSON.stringify(closeDate),
      departLocation : departLocation,
      traffic : traffic,
      programTimeCost : JSON.stringify(programTimeCost),
      cancelNotice : cancelNotice,
      inputImage : JSON.stringify(inputImage),
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/restscheduledetailbox/revisetourproduct`, formData, {
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

  interface SelectBoxCloseDateProps {
    text : string;
  }
  const SelectBoxCloseDate : React.FC<SelectBoxCloseDateProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={closeDate.includes(text)}
          onChange={()=>{
            const copy = [...closeDate];
            if (closeDate.includes(text)) {
              const result = copy.filter(e => e !== text);
              setCloseDate(result);
            } else {
              copy.push(text); 
              setCloseDate(copy);
            }
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
            props.setIsViewAddScheduleDetailBox(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      <div className="modal-header">
        <h1>상품등록</h1>
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
            <TitleBox width="120px" text='여행지(도시)'/>
            {
              isAddOrRevise === 'revise'
              ?
              <p>{city}</p>
              :
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
            }
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{height:'50px'}}>
            <TitleBox width="120px" text='투어타입'/>
            <div className='checkInputCover'>
              {
                sorts.map((item:any, index:any)=>{
                  return item !== '전체' && (
                    <SelectBox text={item} key={index}/>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>

      <div style={{height:30}}></div>

      { sort !== '' &&
        <>
          <div className="modal-header">
            <h1>{sort}</h1>
          </div>

          <section>
            <div className="bottombar"></div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="120px" text='상품명'/>
                <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                  value={productName} onChange={(e)=>{
                      setProductName(e.target.value);
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
              <div className="coverrow half">
                <TitleBox width="120px" text='뱃지'/>
                <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
                  value={badges} onChange={(e)=>{
                      setBadges(e.target.value);
                    }}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="120px" text='평점'/>
                <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
                  value={scores} onChange={(e)=>{
                      setScores(e.target.value);
                    }}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="120px" text='출발시간대'/>
                <div className='checkInputCover'>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={departTime === '오전'}
                      onChange={()=>{
                        setDepartTime('오전')
                      }}
                    />
                  </div>
                  <p>오전</p>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={departTime === '오후'}
                      onChange={()=>{
                        setDepartTime('오후')
                      }}
                    />
                  </div>
                  <p>오후</p>
                  <div className='checkInput'>
                    <input className="input" type="checkbox"
                      checked={departTime === '저녁'}
                      onChange={()=>{
                        setDepartTime('저녁')
                      }}
                    />
                  </div>
                  <p>저녁</p>
                </div>
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
                <TitleBox width="120px" text='운영시간'/>
                <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                  value={openDate} onChange={(e)=>{
                      setOpenDate(e.target.value);
                    }}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="120px" text='휴무일'/>
                <div className='checkInputCover'>
                  <SelectBoxCloseDate text='월'/>
                  <SelectBoxCloseDate text='화'/>
                  <SelectBoxCloseDate text='수'/>
                  <SelectBoxCloseDate text='목'/>
                  <SelectBoxCloseDate text='금'/>
                  <SelectBoxCloseDate text='토'/>
                  <SelectBoxCloseDate text='일'/>
                </div>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow half">
                <TitleBox width="120px" text='출발장소'/>
                <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                  value={departLocation} onChange={(e)=>{
                      setDepartLocation(e.target.value);
                  }}/>
              </div>
              <div className="coverrow half">
                <TitleBox width="120px" text='미팅/교통'/>
                <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
                  value={traffic} onChange={(e)=>{
                      setTraffic(e.target.value);
                    }}/>
              </div>
            </div>
            <div className="coverbox">
              <div className="coverrow hole">
                <TitleBox width="120px" text='요금'/>
                <div style={{width:'90%', textAlign:'center'}}>
                  <div style={{backgroundColor:'#fff', display:'flex', alignItems:'center'}}>
                    <div style={{width:'20%'}} ><p>프로그램</p></div>
                    <div className="chart-divider"></div>
                    <div style={{width:'30%'}} ><p>포함사항</p></div>
                    <div className="chart-divider"></div>
                    <div style={{width:'20%'}} ><p>시간</p></div>
                    <div className="chart-divider"></div>
                    <div style={{width:'20%'}} ><p>요금</p></div>
                    <div className="chart-divider"></div>
                    <div style={{width:'10%'}} ><p></p></div>
                  </div>
                  {
                    programTimeCost.map((item:any, index:any)=>{
                      return (
                        <div style={{display:'flex', alignItems:'center'}} key={index}>
                          <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={item.program} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...programTimeCost];
                                copy[index].program = e.target.value;
                                setProgramTimeCost(copy);
                              }}/>
                          </div>
                          <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={item.content} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...programTimeCost];
                                copy[index].content = e.target.value;
                                setProgramTimeCost(copy);
                              }}/>
                          </div>
                          <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={item.time} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...programTimeCost];
                                copy[index].time = e.target.value;
                                setProgramTimeCost(copy);
                              }}/>
                          </div>
                          <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={item.saleCost} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...programTimeCost];
                                copy[index].saleCost = e.target.value;
                                setProgramTimeCost(copy);
                              }}/>
                          </div>
                          <div className="dayBox" style={{width:'10%', justifyContent:'center'}} >
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...programTimeCost, {program:"", content:"", time:"", saleCost:""}];
                                setProgramTimeCost(copy);
                              }}
                            >
                              <p>+추가</p>
                            </div>
                            {
                              (programTimeCost.length > 1 && index !== 0) &&
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...programTimeCost];
                                  copy.splice(index, 1);
                                  setProgramTimeCost(copy);
                                }}
                              >
                                <p>-삭제</p>
                              </div>
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
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
                            src={`${MainURL}/images/scheduledetailboximages/${item}`}
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
                    <div key={index} className='imagebox' style={{justifyContent:'start'}}>
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
        </>
      }
      

      <div style={{height:'20px'}}></div>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddScheduleDetailBox(false);
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
