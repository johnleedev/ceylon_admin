import React, { useCallback, useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format, formatDate } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropDownAirline, DropDownNum, DropDownTime, DropDownVisitPath, DropDowncharger } from '../../../DefaultData';
import { DateBoxNum } from '../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { CiCircleMinus } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";


export default function ModalAddHotel (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
	const isAddOrRevise = props.isAddOrRevise;
  const hotelData = isAddOrRevise === 'revise' ? props.hotelInfo : null;
  const [selectedNation, setSelectedNation] = useState<any>([]);
 
  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? hotelData.isView : true);
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? hotelData.nation : '');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? hotelData.city : '');
  const [label, setLabel] = useState(isAddOrRevise === 'revise' ? hotelData.label : '');
  
  const [hotelNameKo, setHotelNameKo] = useState(isAddOrRevise === 'revise' ? hotelData.hotelNameKo : '');
  const [hotelNameEn, setHotelNameEn] = useState(isAddOrRevise === 'revise' ? hotelData.hotelNameEn : '');
  const [hotelLevel, setHotelLevel] = useState(isAddOrRevise === 'revise' ? hotelData.hotelLevel : '');
  const [hotelSort, setHotelSort] = useState(isAddOrRevise === 'revise' ? hotelData.hotelSort : '');

  const [hotelPhone, setHotelPhone] = useState(isAddOrRevise === 'revise' ? hotelData.hotelPhone : '');
  const [hotelAddress, setHotelAddress] = useState(isAddOrRevise === 'revise' ? hotelData.hotelAddress : '');
  const [hotelNotice, setHotelNotice] = useState(isAddOrRevise === 'revise' ? hotelData.hotelNotice : '');
  const [hotelConvenience, setHotelConvenience] = useState<string[]>(isAddOrRevise === 'revise' ? JSON.parse(hotelData.hotelConvenience) : []);

  const [hotelCheckIn, setHotelCheckIn] = useState(isAddOrRevise === 'revise' ? hotelData.hotelCheckIn : '');
  const [hotelCheckOut, setHotelCheckOut] = useState(isAddOrRevise === 'revise' ? hotelData.hotelCheckOut : '');
  const [hotelAllowPet, setHotelAllowPet] = useState(isAddOrRevise === 'revise' ? hotelData.hotelAllowPet : '가능');
  const [hotelParking, setHotelParking] = useState(isAddOrRevise === 'revise' ? hotelData.hotelParking : '무료');

  const [googleLocation, setGoogleLocation] = useState(isAddOrRevise === 'revise' ? hotelData.googleLocation : '');
  const [keywordHashtag, setKeywordHashtag] = useState(isAddOrRevise === 'revise' ? hotelData.keywordHashtag : '');
  const [customerScore, setCustomerScore] = useState(isAddOrRevise === 'revise' ? hotelData.customerScore : '');

  interface ImageNoticeProps {
    imageName: string; 
    title: string;
    notice: string;
  }

  const [imagesAllViewSort, setImagesAllViewSort] = useState(isAddOrRevise === 'revise' ? 'revise' : 'add');
  const [imageNamesAllView, setImageNamesAllView] = useState<ImageNoticeProps[]>(isAddOrRevise === 'revise' ? JSON.parse(hotelData.imageNamesAllView) : []);
  const [imagesAllView, setImagesAllView] = useState<File[]>([]);
  const [imagesRoomViewSort, setImagesRoomViewSort] = useState(isAddOrRevise === 'revise' ? 'revise' : 'add');
  const [imageNamesRoomView, setImageNamesRoomView] = useState<ImageNoticeProps[]>(isAddOrRevise === 'revise' ? JSON.parse(hotelData.imageNamesRoomView) : []);
  const [imagesRoomView, setImagesRoomView] = useState<File[]>([]);
  const [imagesEtcViewSort, setImagesEtcViewSort] = useState(isAddOrRevise === 'revise' ? 'revise' : 'add');
  const [imageNamesEtcView, setImageNamesEtcView] = useState<ImageNoticeProps[]>(isAddOrRevise === 'revise' ? JSON.parse(hotelData.imageNamesEtcView) : []);
  const [imagesEtcView, setImagesEtcView] = useState<File[]>([]);

  // selectbox ----------------------------------------------
  interface SelectBoxProps {
    text : string;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={label === text}
          onChange={()=>{
            setLabel(text);
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

  interface SelectBoxConvenienceProps {
    text : string;
  }
  const SelectBoxConvenience : React.FC<SelectBoxConvenienceProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={hotelConvenience.includes(text)}
          onChange={()=>{
            const copy = [...hotelConvenience];
            if (hotelConvenience.includes(text)) {
              const result = copy.filter(e => e !== text);
              setHotelConvenience(result);
            } else {
              copy.push(text); 
              setHotelConvenience(copy);
            }
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

  // 이미지 첨부 함수 ----------------------------------------------
  const currentDate = new Date();
  const date = format(currentDate, 'yyyy-MM-dd');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  
  // 전경 이미지 첨부  --------------------------------------------------------------------------------------------
  const { getRootProps: getRootAllView, getInputProps: getInputAllView } = useDropzone({ 
    onDrop : useCallback(async (acceptedFiles: File[]) => {
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
  
        const fileCopies = resizedFiles.map((resizedFile, index) => {
          const regex = resizedFile.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-10);
          return new File([resizedFile], `${date}_${userId}_${regexSlice}`, {
            type: acceptedFiles[index].type,
          });
        });
        setImagesAllView(fileCopies);
        const imageNames = acceptedFiles.map((file, index) => {
          const regex = file.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-10);
          return `${date}_${userId}_${regexSlice}`;
        });
        const updatedImageNames = imageNames.map((imageName) => ({
          imageName, title: '', notice: ''
        }));
        setImageNamesAllView(updatedImageNames);
        setImageLoading(false);
      } catch (error) {
        console.error('이미지 리사이징 중 오류 발생:', error);
      }
    }, [setImagesAllView])
   }); 

  // 전경 이미지 삭제 
  const deleteInputImageAllView = async (Idx:number) => {
    const copy =  [...imagesAllView]
    const newItems = copy.filter((item, index) => index !== Idx);
    const nameCopy = [...imageNamesAllView]
    const nameNewItems = nameCopy.filter((item, index) => index !== Idx);
    setImagesAllView(newItems);
    setImageNamesAllView(nameNewItems);
  };

  // 객실 이미지 첨부  --------------------------------------------------------------------------------------------
  const { getRootProps: getRootRoomView, getInputProps: getInputRoomView } = useDropzone({ 
    onDrop : useCallback(async (acceptedFiles: File[]) => {
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
  
        const fileCopies = resizedFiles.map((resizedFile, index) => {
          const regex = resizedFile.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-10);
          return new File([resizedFile], `${date}_${userId}_${regexSlice}`, {
            type: acceptedFiles[index].type,
          });
        });
        setImagesRoomView(fileCopies);
        const imageNames = acceptedFiles.map((file, index) => {
          const regex = file.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-10);
          return `${date}_${userId}_${regexSlice}`;
        });
        const updatedImageNames = imageNames.map((imageName) => ({
          imageName, title: '', notice: ''
        }));
        setImageNamesRoomView(updatedImageNames);
        setImageLoading(false);
      } catch (error) {
        console.error('이미지 리사이징 중 오류 발생:', error);
      }
    }, [setImagesRoomView])
   }); 

  // 객실 이미지 삭제
  const deleteInputImageRoomView = async (Idx:number) => {
    const copy =  [...imagesRoomView]
    const newItems = copy.filter((item, i) => i !== Idx);
    const nameCopy = [...imageNamesRoomView]
    const nameNewItems = nameCopy.filter((item, index) => index !== Idx);
    setImagesRoomView(newItems);
    setImageNamesRoomView(nameNewItems);
  };

  // 레스토랑, 부대시설 이미지 첨부  -------------------------------------------------------------------------------------------
  const { getRootProps: getRootEtcView, getInputProps: getInputEtcView } = useDropzone({ 
    onDrop : useCallback(async (acceptedFiles: File[]) => {
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
  
        const fileCopies = resizedFiles.map((resizedFile, index) => {
          const regex = resizedFile.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-10);
          return new File([resizedFile], `${date}_${userId}_${regexSlice}`, {
            type: acceptedFiles[index].type,
          });
        });
        setImagesEtcView(fileCopies);
        const imageNames = acceptedFiles.map((file, index) => {
          const regex = file.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-10);
          return `${date}_${userId}_${regexSlice}`;
        });
        const updatedImageNames = imageNames.map((imageName) => ({
          imageName, title: '', notice: ''
        }));
        setImageNamesEtcView(updatedImageNames);
        setImageLoading(false);
      } catch (error) {
        console.error('이미지 리사이징 중 오류 발생:', error);
      }
    }, [setImagesEtcView])
   }); 

  // 레스토랑, 부대시설 이미지 삭제 ----------------------------------------------
  const deleteInputImageEtcView = async (Idx:number) => {
    const copy =  [...imagesEtcView]
    const newItems = copy.filter((item, i) => i !== Idx);
    const nameCopy = [...imageNamesEtcView]
    const nameNewItems = nameCopy.filter((item, index) => index !== Idx);
    setImagesEtcView(newItems);
    setImageNamesEtcView(nameNewItems);
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

  // 이미지 설명 순서 업 함수 ----------------------------------------------
  const handleImageNamesListUp = async (list:any, setUseState:any, value:any) => {
    const index = list.findIndex((item:any) => item.imageName === value);
    if (index <= 0) {
      alert('맨 앞 입니다.')
      return list;
    }
    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setUseState(newList);
  };

  // 이미지 설명 순서 다운 함수 ----------------------------------------------
  const handleImageNamesListDown = async (list:any, setUseState:any, value:any) => {
    const index = list.findIndex((item:any) => item.imageName === value);
    if (list.length === index+1) {
      alert('맨 뒤 입니다.')
      return list;
    }
    const newList = [...list];
    [newList[index + 1], newList[index]] = [newList[index], newList[index + 1]];
    setUseState(newList);
  };

  // 호텔 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    const formData = new FormData();

    imagesAllView.forEach((file, index) => {
      formData.append('img', file);
    });
    imagesRoomView.forEach((file, index) => {
      formData.append('img', file);
    });
    imagesEtcView.forEach((file, index) => {
      formData.append('img', file);
    });
  
    const getParams = {
      isView : isView,
      nation : nation,
      city : city,
      label : label,
      hotelNameKo: hotelNameKo,
      hotelNameEn: hotelNameEn,
      hotelLevel : hotelLevel,
      hotelSort: hotelSort,
      hotelPhone: hotelPhone,
      hotelAddress: hotelAddress,
      hotelNotice: hotelNotice,
      hotelConvenience: JSON.stringify(hotelConvenience),
      hotelCheckIn: hotelCheckIn,
      hotelCheckOut: hotelCheckOut,
      hotelAllowPet: hotelAllowPet,
      hotelParking: hotelParking,
      googleLocation: googleLocation,
      keywordHashtag : keywordHashtag,
      customerScore: customerScore,
      imageNamesAllView : JSON.stringify(imageNamesAllView),
      imageNamesRoomView : JSON.stringify(imageNamesRoomView),
      imageNamesEtcView : JSON.stringify(imageNamesEtcView)
    }

    axios 
      .post(`${MainURL}/producthotel/registerhotel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddHotelModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 호텔 수정 함수 ----------------------------------------------
  const reviseHotel = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const getParams = {
      postId: hotelData.id,
      isView : isView,
      nation : nation,
      city : city,
      label : label,
      hotelNameKo: hotelNameKo,
      hotelNameEn: hotelNameEn,
      hotelLevel : hotelLevel,
      hotelSort: hotelSort,
      hotelPhone: hotelPhone,
      hotelAddress: hotelAddress,
      hotelNotice: hotelNotice,
      hotelConvenience: JSON.stringify(hotelConvenience),
      hotelCheckIn: hotelCheckIn,
      hotelCheckOut: hotelCheckOut,
      hotelAllowPet: hotelAllowPet,
      hotelParking: hotelParking,
      googleLocation: googleLocation,
      keywordHashtag : keywordHashtag,
      customerScore: customerScore,
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/producthotel/revisehotel`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewAddHotelModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 기존 이미지 전부 삭제 ----------------------------------------------

  const handleDeleteAlert = (sortInput:string) => {
		const costConfirmed = window.confirm(`기존의 사진을 변경하려면, 모두 삭제후 다시 첨부해야 합니다. 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteImageView(sortInput);
		} else {
			return
		}
	};

  const deleteImageView = async (sortInput:string) => {
    const sortCopy = sortInput;
    let hotelImagesCopy = [{}];
    if (sortCopy === 'all') {
      hotelImagesCopy = imageNamesAllView
    } else if (sortCopy === 'room') {
      hotelImagesCopy = imageNamesRoomView
    } else if (sortCopy === 'etc') {
      hotelImagesCopy = imageNamesEtcView
    };
    axios 
    .post(`${MainURL}/producthotel/deletehotelimages`, {
      sort : sortCopy,
      postId : hotelData.id,
      hotelImages : hotelImagesCopy
    })
    .then((res) => {
      if (res.data) {
        alert('삭제되었습니다.');
        props.setRefresh(!props.refresh);
        if (sortCopy === 'all') {setImagesAllViewSort('add');}
        if (sortCopy === 'room') {setImagesRoomViewSort('add');}
        if (sortCopy === 'etc') {setImagesEtcViewSort('add');}
      }
    })
    .catch(() => {
      console.log('실패함')
    })
  };

  // 글자수 제한
  const renderPreview = (content : string) => {
    if (content?.length > 30) {
      return content.substring(0, 30) + '...';
    }
    return content;
  };

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddHotelModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>호텔생성</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품노출'/>
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
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품뱃지'/>
            <div className='checkInputCover'>
              <SelectBox text='NEW'/>
              <SelectBox text='프로모션'/>
              <SelectBox text='인기'/>
              <SelectBox text='특가'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔명(한글)'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={hotelNameKo} onChange={(e)=>{setHotelNameKo(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔명(영문)'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={hotelNameEn} onChange={(e)=>{setHotelNameEn(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔성급'/>
            <DropdownBox
              widthmain='60%'
              height='35px'
              selectedValue={hotelLevel}
              options={[
                { value: '선택', label: '선택' },
                { value: '5성급', label: '5성급' },
                { value: '4성급', label: '4성급' },
                { value: '3성급', label: '3성급' },
                { value: '2성급', label: '2성급' },
                { value: '1성급', label: '1성급' }
              ]}    
              handleChange={(e)=>{setHotelLevel(e.target.value)}}
            />
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='구분'/>
            <DropdownBox
              widthmain='60%'
              height='35px'
              selectedValue={hotelSort}
              options={[
                { value: '선택', label: '선택' },
                { value: '럭셔리', label: '럭셔리' },
                { value: '스몰', label: '스몰' },
                { value: '유니크', label: '유니크' },
                { value: '7성급', label: '7성급' },
                { value: '하이엔드', label: '하이엔드' }
              ]}    
              handleChange={(e)=>{setHotelSort(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔주소'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={hotelAddress} onChange={(e)=>{setHotelAddress(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔연락처'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={hotelPhone} onChange={(e)=>{setHotelPhone(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='간략소개' height={200}/>
            <textarea 
              className="textarea"
              value={hotelNotice}
              onChange={(e)=>{setHotelNotice(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='부대시설'/>
            <div className='checkInputCover'>
              <SelectBoxConvenience text='와이파이'/>
              <SelectBoxConvenience text='레스토랑'/>
              <SelectBoxConvenience text='실내수영장'/>
              <SelectBoxConvenience text='실외수영장'/>
              <SelectBoxConvenience text='스파'/>
              <SelectBoxConvenience text='온천'/>
              <SelectBoxConvenience text='피트니스센터'/>
              <SelectBoxConvenience text='하우스키핑'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='체크인'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={hotelCheckIn}
              options={DropDownTime}    
              handleChange={(e)=>{setHotelCheckIn(e.target.value)}}
            />
          </div>
          <div className="coverrow hole">
            <TitleBox width="120px" text='체크아웃'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={hotelCheckOut}
              options={DropDownTime}    
              handleChange={(e)=>{setHotelCheckOut(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='반려동물'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={hotelAllowPet}
              options={[
                { value: '가능', label: '가능' },
                { value: '불가능', label: '불가능' }
              ]}    
              handleChange={(e)=>{setHotelAllowPet(e.target.value)}}
            />
          </div>
          <div className="coverrow hole">
            <TitleBox width="120px" text='주차'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={hotelParking}
              options={[
                { value: '무료', label: '무료' },
                { value: '유료', label: '유료' }
              ]}    
              handleChange={(e)=>{setHotelParking(e.target.value)}}
            />
          </div>
          
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='구글 위치'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={googleLocation} onChange={(e)=>{setGoogleLocation(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='키워드/해시태그'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={keywordHashtag} onChange={(e)=>{setKeywordHashtag(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='고객별점/평점'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={customerScore} onChange={(e)=>{setCustomerScore(e.target.value)}}/>
          </div>
        </div>
      </section>

      {/* 전경 ----------------------------------------------------------------------------------------------------------------------------------------- */}
      <section>
        <div className="bottombar"></div>
        <div className="coverrow hole bigHeight">
          <TitleBox width="120px" text='전경'/>
          {
            (imagesAllViewSort === 'add' || imageNamesAllView.length === 0)
            ?
            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div {...getRootAllView()} className="imageDropzoneStyle" >
                  <input {...getInputAllView()} />
                  {
                    imagesAllView.length > 0 
                    ? <div className='imageplus'>+ 다시첨부하기</div>
                    : <div className='imageplus'>+ 사진첨부하기</div>
                  }
                </div>
              </div>
            }
            {
              imagesAllView.length > 0 &&
              imagesAllView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='imagebox'>
                    <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                      <p>{index+1}.</p>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                      <p>{renderPreview(item.name)}</p>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageAllView(index);}}
                        >
                          <p><IoClose color='#FF0000'/></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageListUp(imagesAllView, setImagesAllView, item);
                            handleImageNamesListUp(imageNamesAllView, setImageNamesAllView, item.name);
                          }}
                        >
                          <p><TiArrowSortedUp /></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageListDown(imagesAllView, setImagesAllView, item);
                            handleImageNamesListDown(imageNamesAllView, setImageNamesAllView, item.name);
                          }}
                        >
                          <p><TiArrowSortedDown /></p>
                        </div>
                      </div>
                    </div>
                    { 
                      imageNamesAllView.map((namesItem:any, namesIndex:any)=>{
                        return (
                          index === namesIndex &&
                          <>
                          <input className="inputdefault" type="text" style={{width:'10%', paddingLeft:'5px', textAlign:'left'}} 
                            value={namesItem.title} placeholder='제목' onChange={(e)=>{
                                const copy = [...imageNamesAllView];
                                copy[index].title = e.target.value;
                                setImageNamesAllView(copy);
                              }}/>
                          <input className="inputdefault" type="text" style={{width:'50%', paddingLeft:'5px', textAlign:'left'}} 
                            value={namesItem.notice} placeholder='설명' onChange={(e)=>{
                                const copy = [...imageNamesAllView];
                                copy[index].notice = e.target.value;
                                setImageNamesAllView(copy);
                              }}/>
                          </>
                        )
                      })
                    }
                  </div>
                )
              })
            }
            </div>
            :
            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div className="imageDropzoneStyle"
                  onClick={()=>{
                    handleDeleteAlert('all');
                  }}
                >
                  <div className='imageplus'>+ 사진 다시 첨부하기</div>
                </div>
              </div>
            }
            {
              imageNamesAllView.length > 0 &&
              imageNamesAllView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='imagebox'>
                    <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                      <p>{index+1}.</p>
                      <img 
                        src={`${MainURL}/images/hotelimages/${item.imageName}`}
                      />
                      <p>{renderPreview(item.imageName)}</p>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageAllView(index);}}
                        >
                          <p><IoClose color='#FF0000'/></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageNamesListUp(imageNamesAllView, setImageNamesAllView, item.imageName);
                          }}
                        >
                          <p><TiArrowSortedUp /></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageNamesListDown(imageNamesAllView, setImageNamesAllView, item.imageName);
                          }}
                        >
                          <p><TiArrowSortedDown /></p>
                        </div>
                      </div>
                    </div>
                    <input className="inputdefault" type="text" style={{width:'10%', paddingLeft:'5px', textAlign:'left'}} 
                      value={item.title} placeholder='제목' onChange={(e)=>{
                          const copy = [...imageNamesAllView];
                          copy[index].title = e.target.value;
                          setImageNamesAllView(copy);
                        }}/>
                    <input className="inputdefault" type="text" style={{width:'50%', paddingLeft:'5px', textAlign:'left'}} 
                      value={item.notice} placeholder='설명' onChange={(e)=>{
                          const copy = [...imageNamesAllView];
                          copy[index].notice = e.target.value;
                          setImageNamesAllView(copy);
                        }}/>
                  </div>
                )
              })
            }
            </div>
          }
        </div>

        <div style={{height:'100px'}}></div>

        {/* 객실 ----------------------------------------------------------------------------------------------------------------------------------------- */}

        <div className="bottombar"></div>
        <div className="coverrow hole bigHeight">
          <TitleBox width="120px" text='객실'/>
          {
            (imagesRoomViewSort === 'add' || imageNamesRoomView.length === 0)
            ?
            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div {...getRootRoomView()} className="imageDropzoneStyle" >
                  <input {...getInputRoomView()} />
                  {
                    imagesRoomView.length > 0 
                    ? <div className='imageplus'>+ 다시첨부하기</div>
                    : <div className='imageplus'>+ 사진첨부하기</div>
                  }
                </div>
              </div>
            }
            {
              imagesRoomView.length > 0 &&
              imagesRoomView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='imagebox'>
                    <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                      <p>{index+1}.</p>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                      <p>{renderPreview(item.name)}</p>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageRoomView(index);}}
                        >
                          <p><IoClose color='#FF0000'/></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageListUp(imagesRoomView, setImagesRoomView, item);
                            handleImageNamesListUp(imageNamesRoomView, setImageNamesRoomView, item.name);
                          }}
                        >
                          <p><TiArrowSortedUp /></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageListDown(imagesRoomView, setImagesRoomView, item);
                            handleImageNamesListDown(imageNamesRoomView, setImageNamesRoomView, item.name);
                          }}
                        >
                          <p><TiArrowSortedDown /></p>
                        </div>
                      </div>  
                    </div>
                    { 
                      imageNamesRoomView.map((namesItem:any, namesIndex:any)=>{
                        return (
                          index === namesIndex &&
                          <>
                          <input className="inputdefault" type="text" style={{width:'10%', paddingLeft:'5px', textAlign:'left'}} 
                            value={namesItem.title} placeholder='제목' onChange={(e)=>{
                                const copy = [...imageNamesRoomView];
                                copy[index].title = e.target.value;
                                setImageNamesRoomView(copy);
                              }}/>
                          <input className="inputdefault" type="text" style={{width:'50%', paddingLeft:'5px', textAlign:'left'}} 
                            value={namesItem.notice} placeholder='설명' onChange={(e)=>{
                                const copy = [...imageNamesRoomView];
                                copy[index].notice = e.target.value;
                                setImageNamesRoomView(copy);
                              }}/>
                          </>
                        )
                      })
                    }
                  </div>
                )
              })
            }
            </div>
            :
            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div className="imageDropzoneStyle"
                  onClick={()=>{
                    handleDeleteAlert('room');
                  }}
                >
                  <div className='imageplus'>+ 사진 다시 첨부하기</div>
                </div>
              </div>
            }
            {
              imageNamesRoomView.length > 0 &&
              imageNamesRoomView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='imagebox'>
                    <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                      <p>{index+1}.</p>
                      <img 
                        src={`${MainURL}/images/hotelimages/${item.imageName}`}
                      />
                      <p>{renderPreview(item.imageName)}</p>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageRoomView(index);}}
                        >
                          <p><IoClose color='#FF0000'/></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageNamesListUp(imageNamesRoomView, setImageNamesRoomView, item.imageName);
                          }}
                        >
                          <p><TiArrowSortedUp /></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageNamesListDown(imageNamesRoomView, setImageNamesRoomView, item.imageName);
                          }}
                        >
                          <p><TiArrowSortedDown /></p>
                        </div>
                      </div>  
                    </div>
                    <input className="inputdefault" type="text" style={{width:'10%', paddingLeft:'5px', textAlign:'left'}} 
                      value={item.title} placeholder='제목' onChange={(e)=>{
                          const copy = [...imageNamesRoomView];
                          copy[index].title = e.target.value;
                          setImageNamesRoomView(copy);
                        }}/>
                    <input className="inputdefault" type="text" style={{width:'50%', paddingLeft:'5px', textAlign:'left'}} 
                      value={item.notice} placeholder='설명' onChange={(e)=>{
                          const copy = [...imageNamesRoomView];
                          copy[index].notice = e.target.value;
                          setImageNamesRoomView(copy);
                        }}/>
                  </div>
                )
              })
            }
            </div>
          }
          
        </div>

        <div style={{height:'100px'}}></div>

        {/* 부대시설 ----------------------------------------------------------------------------------------------------------------------------------------- */}

        <div className="bottombar"></div>
        <div className="coverrow hole bigHeight">
          <TitleBox width="120px" text='부대시설'/>
          {
            (imagesEtcViewSort === 'add' || imageNamesEtcView.length === 0)
            ?
            <div className="imageInputBox">
            {
              imageLoading ?
              <div style={{width:'100%', height:'100%', position:'absolute'}}>
                <Loading/>
              </div>
              :
              <div className='imageDropzoneCover'>
                <div {...getRootEtcView()} className="imageDropzoneStyle" >
                  <input {...getInputEtcView()} />
                  {
                    imagesEtcView.length > 0 
                    ? <div className='imageplus'>+ 다시첨부하기</div>
                    : <div className='imageplus'>+ 사진첨부하기</div>
                  }
                </div>
              </div>
            }
            {
              imagesEtcView.length > 0 &&
              imagesEtcView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='imagebox'>
                    <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                      <p>{index+1}.</p>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                      <p>{renderPreview(item.name)}</p>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageEtcView(index);}}
                        >
                          <p><IoClose color='#FF0000'/></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageListUp(imagesEtcView, setImagesEtcView, item);
                            handleImageNamesListUp(imageNamesEtcView, setImageNamesEtcView, item.name);
                          }}
                        >
                          <p><TiArrowSortedUp /></p>
                        </div>
                      </div>  
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{
                            handleImageListDown(imagesEtcView, setImagesEtcView, item);
                            handleImageNamesListDown(imageNamesEtcView, setImageNamesEtcView, item.name);
                          }}
                        >
                          <p><TiArrowSortedDown /></p>
                        </div>
                      </div>  
                    </div>
                    { 
                      imageNamesEtcView.map((namesItem:any, namesIndex:any)=>{
                        return (
                          index === namesIndex &&
                          <>
                          <input className="inputdefault" type="text" style={{width:'10%', paddingLeft:'5px', textAlign:'left'}} 
                            value={namesItem.title} placeholder='제목' onChange={(e)=>{
                                const copy = [...imageNamesEtcView];
                                copy[index].title = e.target.value;
                                setImageNamesEtcView(copy);
                              }}/>
                          <input className="inputdefault" type="text" style={{width:'50%', paddingLeft:'5px', textAlign:'left'}} 
                            value={namesItem.notice} placeholder='설명' onChange={(e)=>{
                                const copy = [...imageNamesEtcView];
                                copy[index].notice = e.target.value;
                                setImageNamesEtcView(copy);
                              }}/>
                          </>
                        )
                      })
                    }
                  </div>
                )
              })
            }
            </div>
          :
          <div className="imageInputBox">
          {
            imageLoading ?
            <div style={{width:'100%', height:'100%', position:'absolute'}}>
              <Loading/>
            </div>
            :
            <div className='imageDropzoneCover'>
                <div className="imageDropzoneStyle"
                  onClick={()=>{
                    handleDeleteAlert('etc');
                  }}
                >
                  <div className='imageplus'>+ 사진 다시 첨부하기</div>
                </div>
              </div>
          }
          {
            imageNamesEtcView.length > 0 &&
            imageNamesEtcView.map((item:any, index:any)=>{
              return (
                <div key={index} className='imagebox'>
                  <div style={{width:'40%', display:'flex', justifyContent:'flex-start'}}>
                    <p>{index+1}.</p>
                    <img 
                      src={`${MainURL}/images/hotelimages/${item.imageName}`}
                    />
                    <p>{renderPreview(item.imageName)}</p>
                    <div className="updownBtnBox">
                      <div className="updownBtnBtn"
                        onClick={()=>{deleteInputImageEtcView(index);}}
                      >
                        <p><IoClose color='#FF0000'/></p>
                      </div>
                    </div>  
                    <div className="updownBtnBox">
                      <div className="updownBtnBtn"
                        onClick={()=>{
                          handleImageNamesListUp(imageNamesEtcView, setImageNamesEtcView, item.imageName);
                        }}
                      >
                        <p><TiArrowSortedUp /></p>
                      </div>
                    </div>  
                    <div className="updownBtnBox">
                      <div className="updownBtnBtn"
                        onClick={()=>{
                          handleImageNamesListDown(imageNamesEtcView, setImageNamesEtcView, item.imageName);
                        }}
                      >
                        <p><TiArrowSortedDown /></p>
                      </div>
                    </div>  
                  </div>
                  <input className="inputdefault" type="text" style={{width:'10%', paddingLeft:'5px', textAlign:'left'}} 
                    value={item.title} placeholder='제목' onChange={(e)=>{
                        const copy = [...imageNamesEtcView];
                        copy[index].title = e.target.value;
                        setImageNamesEtcView(copy);
                      }}/>
                  <input className="inputdefault" type="text" style={{width:'50%', paddingLeft:'5px', textAlign:'left'}} 
                    value={item.notice} placeholder='설명' onChange={(e)=>{
                        const copy = [...imageNamesEtcView];
                        copy[index].notice = e.target.value;
                        setImageNamesEtcView(copy);
                      }}/>
                </div>
              )
            })
          }
          </div>
        } 
        </div>
      </section>
      

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddHotelModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={()=>{
              isAddOrRevise === 'add' 
              ? registerPost()
              : reviseHotel();
            }}
          >
          <p>저장</p>
        </div>
      </div>
      
    </div>     
  )
}