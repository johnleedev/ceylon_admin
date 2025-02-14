import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
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
import { IoClose } from 'react-icons/io5';

export default function zzModalAddScheduleBox (props : any) {
  
  const userId = sessionStorage.getItem('userId');
  const isAddOrRevise = props.isAddOrRevise;
  const locationData = isAddOrRevise === 'revise' ? props.locationInfo : null;

 
  const [selectedNation, setSelectedNation] = useState<any>([]);
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? locationData.nation : '');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? locationData.city :'');

  const [isViaSort, setIsViaSort] = useState(isAddOrRevise === 'revise' ? locationData.isViaSort : '기본');
  const [sort, setSort] = useState(isAddOrRevise === 'revise' ? locationData.sort :'경유지일정');
  const [location, setLocation] = useState(isAddOrRevise === 'revise' ? locationData.location :'');
  const [subLocation, setSubLocation] = useState(isAddOrRevise === 'revise' ? locationData.subLocation :'');
  const [locationTitle, setLocationTitle] = useState(isAddOrRevise === 'revise' ? locationData.locationTitle :'');
  const [locationContent, setLocationContent] = useState(isAddOrRevise === 'revise' ? locationData.locationContent :'');
  const [lastImages, setLastImages]  = 
    useState((props.isAddOrRevise === 'revise' && (locationData.postImage !== null && locationData.postImage !== '')) ? JSON.parse(locationData.postImage) : []);
  const [inputImages, setInputImages] = 
    useState((props.isAddOrRevise === 'revise' && (locationData.postImage !== null && locationData.postImage !== '')) ? JSON.parse(locationData.postImage) : []);
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
      isViaSort: isViaSort,
      sort : sort,
      nation: nation,
      city: city,
      location: location,
      subLocation: subLocation,
      locationTitle: locationTitle,
      locationContent: locationContent,
      date : datecopy,
      postImage : JSON.stringify(inputImages)
    }
    axios
      .post(`${MainURL}/restschedulebox/registerlocation`, formData, {
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
          setImageFiles([]);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };
  
  // 기존 이미지 삭제 ----------------------------------------------
  const deleteInputLastImage = async (imageName:string) => {
    axios 
      .post(`${MainURL}/restschedulebox/deletelocationimage`, {
        postId : locationData.id,
        imageName : imageName,
        postImage : JSON.stringify([])
      })
      .then((res) => {
        if (res.data) {
          alert(res.data);
          setLastImages([]);
          setInputImages([]);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 일정 수정 함수 ----------------------------------------------
  const reviseLocation = async () => {
    const formData = new FormData();
    imageFiles.forEach((file, index) => {
      formData.append('img', file);
    });

    const getParams = {
      postId : locationData.id,
      sort : sort,
      nation: nation,
      city: city,
      location: location,
      subLocation: subLocation,
      locationTitle: locationTitle,
      locationContent: locationContent,
      postImage : JSON.stringify(inputImages),
      date : datecopy,
    }
    axios 
      .post(`${MainURL}/restschedulebox/reviselocation`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddScheduleBoxModal(false);
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
            props.setIsViewAddScheduleBoxModal(false);
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
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='구분'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isViaSort === '기본'}
                  onChange={()=>{setIsViaSort('기본')}}
                />
              </div>
              <p>기본</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isViaSort === '경유지'}
                  onChange={()=>{setIsViaSort('경유지')}}
                />
              </div>
              <p>경유지</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='선택일정'/>
            <div className='checkInputCover'>
              <SelectBox text='없음'/>
              <SelectBox text='경유지일정'/>
              <SelectBox text='해양스포츠'/>
              <SelectBox text='우붓일정'/>
              <SelectBox text='스파마사지/리조트'/>
              <SelectBox text='리조트다이닝/바'/>
              <SelectBox text='레스토랑/바/클럽'/>
              <SelectBox text='VIP서비스'/>
              <SelectBox text='미팅샌딩'/>
            </div>
          </div>
        </div>
        
      </section>
      
      <section>
        <div className="schedule">
          <div className="bottom-content">
            <div className='input-area'>
              <div className="cover">
                <div className='rowbox'>
                  <div className='icon-box'>
                    <ImLocation color='#5fb7ef' size={20}/>
                  </div>
                  <input style={{width:'45%'}} value={location} 
                    className="inputdefault" type="text" maxLength={100}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}/>
                </div>
                <div className='rowbox'>
                  <div className="icon-box">
                    <div className="dot__icon" />
                  </div>
                  <input style={{width:'45%'}} value={subLocation} 
                    className="inputdefault" type="text" maxLength={100}
                    onChange={(e) => {
                      setSubLocation(e.target.value);
                    }}/>
                </div>
                <div className='rowbox'>
                  <div className="icon-box">
                  </div>
                  <div className='scheduletextbox'>
                    <div className="scheduletextbox-imagebox">
                    { lastImages.length === 0
                      ?
                      <div className="scheduletextbox-imageCover">
                        {
                          imageLoading ?
                          <div style={{width:'100%', height:'100%', position:'absolute'}}>
                            <Loading/>
                          </div>
                          :
                          <>
                          {
                            imageFiles.length === 0 &&
                            <div className='imageDropzoneCover'>
                              <div {...getRootProps()} className="imageDropzoneStyle" >
                                <input {...getInputProps()} />
                                <div className='imageplus'>+ 사진첨부하기</div>
                              </div>
                            </div>
                          }
                          </>
                        }
                        {
                          imageFiles.length > 0 &&
                          imageFiles.map((item:any, index:any)=>{
                            return (
                              <div key={index} className='imagebox'>
                                <img style={{maxHeight:'200px', objectFit:'cover'}}
                                  src={URL.createObjectURL(item)}
                                />
                                <div onClick={()=>{deleteInputImage(index);}}>
                                  <CiCircleMinus color='#FF0000' size={20}/>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                      :
                      <div className="scheduletextbox-lastImageInputCover">
                        <div className='lastImage-box'
                          onClick={()=>{deleteInputLastImage(lastImages[0])}}
                        >
                          <div style={{display:'flex', alignItems:'center'}}>
                            <img style={{maxHeight:'200px'}}
                                src={`${MainURL}/images/scheduleboximages/${lastImages[0]}`}
                              />
                          </div>
                          <div className='lastImage-delete'>
                            <p><IoClose color='#FF0000'/></p>
                          </div>
                        </div>
                      </div>
                    }
                    </div>
                    <div className="scheduletextbox-textbox">
                      <input style={{width:'95%'}} value={locationTitle} 
                          className="inputdefault" type="text" maxLength={100}
                          onChange={(e) => {
                            setLocationTitle(e.target.value);
                          }}/>
                      <textarea 
                          className="textarea" style={{minHeight: sort === '텍스트' ? '200px' : '100px' }}
                          maxLength={300}
                          value={locationContent}
                          onChange={(e)=>{
                            setLocationContent(e.target.value)
                          }}
                        />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddScheduleBoxModal(false);
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
