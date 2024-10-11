import React, { useCallback, useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import MainURL from '../../../../MainURL';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { format } from 'date-fns';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import axios from 'axios';
import Loading from '../../components/Loading';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';
import { ImLocation } from 'react-icons/im';
import selectExample1 from '../../images/selectexample1.png'
import selectExample2 from '../../images/selectexample2.png'
import selectExample3 from '../../images/selectexample3.png'

export default function ModalAddTourLocation (props : any) {
  
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const locationData = isAddOrRevise === 'revise' ? props.locationInfo : null;
  
  const [selectedNation, setSelectedNation] = useState<any>([]);
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? locationData.nation : '');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? locationData.city :'');

  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? locationData.sort :'');
  const [location, setLocation] = useState(isAddOrRevise === 'revise' ? locationData.location :'');
  const [subLocation, setSubLocation] = useState(isAddOrRevise === 'revise' ? locationData.subLocation :'');
  const [locationTitle, setLocationTitle] = useState(isAddOrRevise === 'revise' ? locationData.locationTitle :'');
  const [locationContent, setLocationContent] = useState(isAddOrRevise === 'revise' ? locationData.locationContent :'');
  const [locationContentDetail, setLocationContentDetail] = useState(isAddOrRevise === 'revise' ? JSON.parse(locationData.locationContentDetail) :[{name:"", notice:[""]}]);
  
  const [inputImages, setInputImages] = useState<string[]>(isAddOrRevise === 'revise' ? JSON.parse(locationData.postImage) : []);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyMMddHHmmss');
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
      setInputImages(imageNames);
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
    setImageFiles(newItems);
  };

  // 글쓰기 등록 함수 ----------------------------------------------
  const datecopy = format(currentDate, "yyyy-MM-dd");
  const registerPost = async () => {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });
    const getParams = {
      sort : sort,
      nation: nation,
      city: city,
      location: location,
      subLocation: subLocation,
      locationTitle: locationTitle,
      locationContent: locationContent,
      locationContentDetail: JSON.stringify(locationContentDetail),
      date : datecopy,
      postImage : JSON.stringify(inputImages)
    }
    axios
      .post(`${MainURL}/tourlocation/registerlocation`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('저장되었습니다.')
          setNation('선택');
          setCity('선택');
          setSort('')
          setLocation('')
          setSubLocation('')
          setLocationTitle('')
          setLocationContent('')
          setLocationContentDetail([{name:"", notice:[""]}])
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };
  
  
  // 일정 수정 함수 ----------------------------------------------
  const reviseLocation = async () => {
    
    const getParams = {
      postId : locationData.id,
      sort : sort,
      nation: nation,
      city: city,
      location: location,
      subLocation: subLocation,
      locationTitle: locationTitle,
      locationContent: locationContent,
      locationContentDetail: JSON.stringify(locationContentDetail),
      date : datecopy,
    }
    axios 
      .post(`${MainURL}/tourlocation/reviselocation`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddTourLoactionModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

 
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddTourLoactionModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>여행지등록</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='국가/도시'/>
            {
              isAddOrRevise === 'revise' &&
              <>
                <p>{nation}</p>
                <p>{city}</p>
              </>
            }
            {
              isAddOrRevise !== 'revise' &&
              <>
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
                <DropdownBox
                  widthmain='20%'
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
              </>
            }
          </div>
        </div>
      </section>
              
      
      <div className="selectExmapleBox">
        {
          (sort === '' || sort === '텍스트') && 
          <div className="selectExmapleRow"
            onClick={()=>{setSort('텍스트');}}
          >
            <p className='selectExmapleRow-text'>이미지 없이 텍스트만</p>
            <img className='selectExmapleRow-img' src={selectExample1}/>
            <div className='selectExmapleRow-btn'><p>선택</p></div>
          </div>
        }
        {
          (sort === '' || sort === '선택') && 
          <div className="selectExmapleRow"
            onClick={()=>{setSort('선택'); setLocationTitle('선택일정 (택1)')}}
          >
            <p className='selectExmapleRow-text'>선택일정 + 이미지</p>
            <img className='selectExmapleRow-img' src={selectExample2}/>
            <div className='selectExmapleRow-btn'><p>선택</p></div>
          </div>
        }
        {
          (sort === '' || sort === '상세') && 
          <div className="selectExmapleRow"
            onClick={()=>{setSort('상세');}}
          >
            <p className='selectExmapleRow-text'>상세일정 + 이미지</p>
            <img className='selectExmapleRow-img' src={selectExample3}/>
            <div className='selectExmapleRow-btn'><p>선택</p></div>
          </div>
        }
      </div>
      
      
      {
        sort !== '' &&
        <section>
          <div className="schedule">
            <div className="bottom-content">
                <div className='day-area'>
                  <div className='left-area'>
                    <ImLocation color='#5fb7ef' size={20}/>                    
                    <input style={{width:'95%'}} value={location} className="inputdefault" type="text" 
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}/>
                  </div>
                  <div className='input-area'>
                    <div className="cover">
                      <div className='rowbox'>
                        <input style={{width:'45%', marginBottom:'10px'}} value={subLocation} className="inputdefault" type="text" 
                          onChange={(e) => {
                            setSubLocation(e.target.value);
                          }}/>
                      </div>
                      <div className='rowbox'>
                        <input style={{width:'95%'}} value={locationTitle} className="inputdefault" type="text" 
                          onChange={(e) => {
                            setLocationTitle(e.target.value);
                          }}/>
                      </div>
                      {
                        sort !== '선택' &&
                        <div className='rowbox'>
                          <textarea 
                            className="textarea" style={{minHeight: sort === '텍스트' ? '200px' : '100px' }}
                            value={locationContent}
                            onChange={(e)=>{
                              setLocationContent(e.target.value)
                            }}
                          />
                        </div>
                      }
                      { (sort === '선택' || sort === '상세') &&
                        locationContentDetail.map((item:any, index:any)=>{
                          return (
                            <div style={{marginTop:'10px', border:'1px solid #EAEAEA'}} key={index}>
                              <div className='rowbox'>
                                <p style={{width:'5%', textAlign:'center'}}>{index+1}.</p>
                                <input style={{width:'95%'}} value={item.name} className="inputdefault" type="text" 
                                  onChange={(e) => {
                                    const copy = [...locationContentDetail]
                                    copy[index].name = e.target.value;
                                    setLocationContentDetail(copy);
                                  }}/>
                              </div>
                              { sort === '선택' &&
                                item.notice.map((subItem:any, subIndex:any)=>{
                                  return (
                                    <div className='rowbox'>
                                      <div className="btn"></div>
                                      <div style={{width:'10%', display:'flex', justifyContent:'end', alignItems:'center'}}>
                                        <p onClick={()=>{
                                              const copy = [...locationContentDetail]
                                              copy[index].notice = [...copy[index].notice, ""];
                                              setLocationContentDetail(copy);
                                          }}
                                        ><CiCirclePlus color='#333' size={20}/></p>
                                        <p onClick={()=>{
                                            const copy = [...locationContentDetail]
                                            copy[index].notice.splice(subIndex, 1);
                                            setLocationContentDetail(copy);
                                          }}
                                        ><CiCircleMinus color='#FF0000' size={20}/></p>
                                      </div>
                                      <input style={{width:'90%'}} value={subItem} className="inputdefault" type="text" 
                                        onChange={(e) => {
                                          const copy = [...locationContentDetail]
                                          copy[index].notice[subIndex] = e.target.value;
                                          setLocationContentDetail(copy);
                                        }}/>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                      {
                        (sort === '선택' || sort === '상세') &&
                        <div className="btnrow">
                          <div className="btn" style={{backgroundColor:"#EAEAEA", margin:'10px 0'}}
                            onClick={()=>{
                              const copy = [...locationContentDetail, {name:"", notice:[""]}];
                              setLocationContentDetail(copy);
                            }}>
                            <p><CiCirclePlus />일정추가</p>
                          </div>
                          <div className="btn" style={{backgroundColor:"#fff", margin:'10px 0'}}
                            onClick={()=>{
                              const copy = [...locationContentDetail];
                              copy.splice(copy.length-1, 1);
                              setLocationContentDetail(copy);
                            }}>
                            <p><CiCircleMinus/>일정삭제</p>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
          </div>
          {
            (isAddOrRevise !== 'revise' && (sort === '선택' || sort === '상세')) &&
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
                      <div onClick={()=>{deleteInputImage(index);}}>
                        <CiCircleMinus color='#FF0000' size={20}/>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          }
          
          { isAddOrRevise === 'revise' &&
            inputImages.map((item:any, index:any)=>{
              return (
                <img key={index} style={{width:'100px'}}
                  src={`${MainURL}/images/tourlocationimages/${item}`}
                />
              )
            })
          }
        </section>
      }
          
      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            setSort('')
            setLocationTitle('')
          }}
        >
          <p style={{color:'#333'}}>다시선택</p>
        </div>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddTourLoactionModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            if (nation === '' || city === '') {
              alert('국가/도시를 선택해주세요')
            } else {
              isAddOrRevise === 'revise'
              ? reviseLocation()
              : registerPost()
            }
          }}
        >
          <p>저장</p>
        </div>
      </div>

    </div>     
  )
}
