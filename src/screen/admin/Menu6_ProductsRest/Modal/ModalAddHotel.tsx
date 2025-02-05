import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format, formatDate } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useLocation, useNavigate } from 'react-router-dom';
import {  DropDownTime } from '../../../DefaultData';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { IoClose } from "react-icons/io5";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";


export default function ModalAddHotel (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
	const isAddOrRevise = props.isAddOrRevise;
  const hotelData = isAddOrRevise === 'revise' ? props.hotelInfo : null;
  const [selectedNation, setSelectedNation] = useState<any>([]);
 
  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? hotelData.isView : true);
  const [hotelSort, setHotelSort] = useState(isAddOrRevise === 'revise' ? hotelData.hotelSort : '');
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? hotelData.nation : '');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? hotelData.city : '');
  const [hotelNameKo, setHotelNameKo] = useState(isAddOrRevise === 'revise' ? hotelData.hotelNameKo : '');
  const [hotelNameEn, setHotelNameEn] = useState(isAddOrRevise === 'revise' ? hotelData.hotelNameEn : '');
  const [hotelLevel, setHotelLevel] = useState(isAddOrRevise === 'revise' ? hotelData.hotelLevel : '');

  const [hotelPhone, setHotelPhone] = useState(isAddOrRevise === 'revise' ? hotelData.hotelPhone : '');
  const [hotelAddress, setHotelAddress] = useState(isAddOrRevise === 'revise' ? hotelData.hotelAddress : '');
  const [hotelLocation, setHotelLocation] = useState(isAddOrRevise === 'revise' ? hotelData.hotelLocation : '');
  const [hotelBadge, setHotelBadge] = useState(isAddOrRevise === 'revise' ? hotelData.hotelBadge : '');
  const [hotelNotice, setHotelNotice] = useState(isAddOrRevise === 'revise' ? hotelData.hotelNotice : '');
  const [hotelRecommendPoint, setHotelRecommendPoint] = useState(isAddOrRevise === 'revise' ? hotelData.hotelRecommendPoint : '');

  const [hotelConvenience, setHotelConvenience] = useState<string[]>(isAddOrRevise === 'revise' ? JSON.parse(hotelData.hotelConvenience) : []);
  const [notIncludeCost, setNotIncludeCost] = useState(isAddOrRevise === 'revise' ? hotelData.notIncludeCost : '');

  const [hotelCheckIn, setHotelCheckIn] = useState(isAddOrRevise === 'revise' ? hotelData.hotelCheckIn : 'PM 3:00');
  const [hotelCheckOut, setHotelCheckOut] = useState(isAddOrRevise === 'revise' ? hotelData.hotelCheckOut : 'AM 11:00');
  const [hotelPolicy, setHotelPolicy] = useState(isAddOrRevise === 'revise' ? JSON.parse(hotelData.hotelPolicy) : {allowPet : "가능", forAdult : "가능"});
  const [hotelParking, setHotelParking] = useState(isAddOrRevise === 'revise' ? hotelData.hotelParking : '무료');
  const [customerScore, setCustomerScore] = useState(isAddOrRevise === 'revise' ? hotelData.customerScore : '');
  const [tripAdviser, setTripAdviser] = useState(isAddOrRevise === 'revise' ? hotelData.tripAdviser : '');

  const [productSort, setProductSort] = useState(isAddOrRevise === 'revise'? JSON.parse(hotelData.productSort): [{resort:"", hotelCustom:""}]);
  const [serviceCategory, setServiceCategory] = useState(isAddOrRevise === 'revise'? JSON.parse(hotelData.serviceCategory): [{product : "", program : "", productCost : ""}]);

  interface ImageNoticeProps {
    imageName: string; 
    title: string;
    notice: string;
  }

  const [lastImageNamesAllView, setLastImageNamesAllView] = useState<ImageNoticeProps[]>((
      isAddOrRevise === 'revise' && (hotelData.imageNamesAllView !== null && hotelData.imageNamesAllView !== '')) ? JSON.parse(hotelData.imageNamesAllView) : []);
  const [imageNamesAllView, setImageNamesAllView] = useState<ImageNoticeProps[]>([]);
  const [imagesAllView, setImagesAllView] = useState<File[]>([]);

  const [lastImageNamesRoomView, setLastImageNamesRoomView] = useState<ImageNoticeProps[]>((
      isAddOrRevise === 'revise' && (hotelData.imageNamesRoomView !== null && hotelData.imageNamesRoomView !== '')) ? JSON.parse(hotelData.imageNamesRoomView) : []);
  const [imageNamesRoomView, setImageNamesRoomView] = useState<ImageNoticeProps[]>([]);
  const [imagesRoomView, setImagesRoomView] = useState<File[]>([]);

  const [lastImageNamesEtcView, setLastImageNamesEtcView] = useState<ImageNoticeProps[]>((
      isAddOrRevise === 'revise' && (hotelData.imageNamesEtcView !== null && hotelData.imageNamesEtcView !== '')) ? JSON.parse(hotelData.imageNamesEtcView) : []);
  const [imageNamesEtcView, setImageNamesEtcView] = useState<ImageNoticeProps[]>([]);
  const [imagesEtcView, setImagesEtcView] = useState<File[]>([]);

  // selectbox ----------------------------------------------
  interface SelectBoxProps {
    text : string;
  }
  
  const SelectBox: React.FC<SelectBoxProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={hotelBadge === text}
          onChange={()=>{
            setHotelBadge(text);
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
  const date = format(currentDate, 'MMddHHmmss');
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
        const userIdCopy = userId?.slice(0,5);
        const fileCopies = resizedFiles.map((resizedFile, index) => {
          const regex = resizedFile.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-15);
          return new File([resizedFile], `${date}${userIdCopy}_${regexSlice}`, {
            type: acceptedFiles[index].type,
          });
        });
        setImagesAllView(fileCopies);
        const imageNames = acceptedFiles.map((file, index) => {
          const regex = file.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-15);
          return `${date}${userIdCopy}_${regexSlice}`;
        });
        const updatedImageNames = imageNames.map((imageName) => ({
          imageName, title: '', notice: ''
        }));
        const updatedImageNamesCopy = isAddOrRevise === 'revise' ? [...lastImageNamesAllView, ...updatedImageNames] : updatedImageNames
        setImageNamesAllView(updatedImageNamesCopy);
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
        const userIdCopy = userId?.slice(0,5);
        const fileCopies = resizedFiles.map((resizedFile, index) => {
          const regex = resizedFile.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-15);
          return new File([resizedFile], `${date}${userIdCopy}_${regexSlice}`, {
            type: acceptedFiles[index].type,
          });
        });
        setImagesRoomView(fileCopies);
        const imageNames = acceptedFiles.map((file, index) => {
          const regex = file.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-15);
          return `${date}${userIdCopy}_${regexSlice}`;
        });
        const updatedImageNames = imageNames.map((imageName) => ({
          imageName, title: '', notice: ''
        }));
        const updatedImageNamesCopy = isAddOrRevise === 'revise' ? [...lastImageNamesRoomView, ...updatedImageNames] : updatedImageNames
        setImageNamesRoomView(updatedImageNamesCopy);
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
        const userIdCopy = userId?.slice(0,5);
        const fileCopies = resizedFiles.map((resizedFile, index) => {
          const regex = resizedFile.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-15);
          return new File([resizedFile], `${date}${userIdCopy}_${regexSlice}`, {
            type: acceptedFiles[index].type,
          });
        });
        setImagesEtcView(fileCopies);
        const imageNames = acceptedFiles.map((file, index) => {
          const regex = file.name.replace(regexCopy, '');
          const regexSlice = regex.slice(-15);
          return `${date}${userIdCopy}_${regexSlice}`;
        });
        const updatedImageNames = imageNames.map((imageName) => ({
          imageName, title: '', notice: ''
        }));
        const updatedImageNamesCopy = isAddOrRevise === 'revise' ? [...lastImageNamesEtcView, ...updatedImageNames] : updatedImageNames
        setImageNamesEtcView(updatedImageNamesCopy);
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

  // 프로그램 입력된 숫자 금액으로 변경
  const handleinputServiceCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement>, index: number,
  ) => {
    const text = e.target.value;
    const copy = [...serviceCategory];
    if (text === '') {
      copy[index].productCost = ''; 
      setServiceCategory(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    copy[index].productCost = formattedNumber; 
    setServiceCategory(copy);
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
      hotelSort: hotelSort,
      nation : nation,
      city : city,
      hotelNameKo: hotelNameKo,
      hotelNameEn: hotelNameEn,
      hotelLevel : hotelLevel,
      hotelPhone: hotelPhone,
      hotelAddress: hotelAddress,
      hotelLocation : hotelLocation,
      hotelBadge : hotelBadge,
      hotelNotice: hotelNotice,
      hotelRecommendPoint : hotelRecommendPoint,
      hotelConvenience: JSON.stringify(hotelConvenience),
      notIncludeCost : notIncludeCost,
      hotelCheckIn: hotelCheckIn,
      hotelCheckOut: hotelCheckOut,
      hotelPolicy: JSON.stringify(hotelPolicy),
      hotelParking: hotelParking,
      customerScore: customerScore,
      tripAdviser : tripAdviser,
      productSort : JSON.stringify(productSort),
      serviceCategory : JSON.stringify(serviceCategory),
      imageNamesAllView : JSON.stringify(imageNamesAllView),
      imageNamesRoomView : JSON.stringify(imageNamesRoomView),
      imageNamesEtcView : JSON.stringify(imageNamesEtcView)
    }

    axios 
      .post(`${MainURL}/restproducthotel/registerhotel`, formData, {
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

  // 기존 이미지 삭제 ----------------------------------------------
  const deleteInputLastImage = async (imageNameCopy:string, useState1:any, setUseState1:any, useState2:any, setUseState2:any, sortCopy:string) => {
    const lastImagesCopy = [...useState1]
    const lastImagesNewItems = lastImagesCopy.filter((item, index) => item.imageName !== imageNameCopy);
    const inputImagesCopy = [...useState2]
    const inputImagesNewItems = inputImagesCopy.filter((item, index) => item.imageName !== imageNameCopy);

    axios 
      .post(`${MainURL}/restproducthotel/deletehotelimage`, {
        postId : hotelData.id,
        imageName : imageNameCopy,
        sort : sortCopy,
        inputImage : JSON.stringify(lastImagesNewItems)
      })
      .then((res) => {
        if (res.data) {
          alert(res.data);
          setUseState1(lastImagesNewItems);
          setUseState2(inputImagesNewItems);
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
      postId: hotelData.id,
      isView : isView,
      hotelSort: hotelSort,
      nation : nation,
      city : city,
      hotelNameKo: hotelNameKo,
      hotelNameEn: hotelNameEn,
      hotelLevel : hotelLevel,
      hotelPhone: hotelPhone,
      hotelAddress: hotelAddress,
      hotelLocation : hotelLocation,
      hotelBadge : hotelBadge,
      hotelNotice: hotelNotice,
      hotelRecommendPoint : hotelRecommendPoint,
      hotelConvenience: JSON.stringify(hotelConvenience),
      notIncludeCost : notIncludeCost,
      hotelCheckIn: hotelCheckIn,
      hotelCheckOut: hotelCheckOut,
      hotelPolicy: JSON.stringify(hotelPolicy),
      hotelParking: hotelParking,
      customerScore: customerScore,
      tripAdviser : tripAdviser,
      productSort : JSON.stringify(productSort),
      serviceCategory : JSON.stringify(serviceCategory),
      imageNamesAllView : imageNamesAllView.length === 0 ? JSON.stringify(lastImageNamesAllView) : JSON.stringify(imageNamesAllView),
      imageNamesRoomView : imageNamesRoomView.length === 0 ? JSON.stringify(lastImageNamesRoomView) : JSON.stringify(imageNamesRoomView),
      imageNamesEtcView : imageNamesEtcView.length === 0 ? JSON.stringify(lastImageNamesEtcView) : JSON.stringify(imageNamesEtcView),
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/restproducthotel/revisehotel`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
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
        <h1>호텔 {isAddOrRevise === 'revise' ? '수정' : '생성'}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow half">
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
          <div className="coverrow half">
            <TitleBox width="120px" text='구분'/>
            <DropdownBox
              widthmain='60%'
              height='35px'
              selectedValue={hotelSort}
              options={[
                { value: '선택', label: '선택' },
                { value: '팩요금', label: '팩요금' },
                { value: '박당요금/경유지', label: '박당요금/경유지' },
                { value: '선투숙/후투숙', label: '선투숙/후투숙' }
              ]}    
              handleChange={(e)=>{setHotelSort(e.target.value)}}
            />
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
          <div className="coverrow hole">
            <TitleBox width="120px" text='지역(위치)'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={hotelLocation} onChange={(e)=>{setHotelLocation(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품뱃지'/>
            <div className='checkInputCover'>
              <SelectBox text='NEW'/>
              <SelectBox text='프로모션제공'/>
              <SelectBox text='기간한정 특가진행'/>
              <SelectBox text='최저가'/>
              <SelectBox text='HOT'/>
              <p>직접입력:</p>
            </div>
            <input className="inputdefault" type="text" style={{width:'30%', marginLeft:'5px'}} 
              value={hotelBadge} onChange={(e)=>{setHotelBadge(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='호텔소개' height={200}/>
            <textarea 
              className="textarea"
              value={hotelNotice}
              onChange={(e)=>{setHotelNotice(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔추천포인트'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={hotelRecommendPoint} onChange={(e)=>{setHotelRecommendPoint(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='부대시설'/>
            <div className='checkInputCover'>
              <SelectBoxConvenience text='와이파이'/>
              <SelectBoxConvenience text='실내수영장'/>
              <SelectBoxConvenience text='실외수영장'/>
              <SelectBoxConvenience text='레스토랑'/>
              <SelectBoxConvenience text='스파마사지'/>
              <SelectBoxConvenience text='온천'/>
              <SelectBoxConvenience text='피트니스센터'/>
              <SelectBoxConvenience text='전용비치'/>
              <SelectBoxConvenience text='키즈클럽'/>
              <SelectBoxConvenience text='해양스포츠'/>
              <SelectBoxConvenience text='다이버클럽'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='불포함비용'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notIncludeCost === '리조트피'}
                  onChange={()=>{setNotIncludeCost('리조트피')}}
                />
              </div>
              <p>리조트피</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notIncludeCost === '시티택스'}
                  onChange={()=>{setNotIncludeCost('시티택스')}}
                />
              </div>
              <p>시티택스</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notIncludeCost === '그린택스'}
                  onChange={()=>{setNotIncludeCost('그린택스')}}
                />
              </div>
              <p>그린택스</p>
              <p>직접입력:</p>
            </div>
            <input className="inputdefault" type="text" style={{width:'30%', marginLeft:'5px'}} 
              value={notIncludeCost} onChange={(e)=>{setNotIncludeCost(e.target.value)}}/>
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
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔정책'/>
            <p style={{marginRight:'5px'}}>반려동물:</p>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={hotelPolicy.allowPet}
              options={[
                { value: '가능', label: '가능' },
                { value: '불가능', label: '불가능' }
              ]}    
              handleChange={(e)=>{
                const copy = {...hotelPolicy};
                copy.allowPet = e.target.value;
                setHotelPolicy(copy)
              }}
            />
            <p style={{marginRight:'5px'}}>성인전용:</p>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={hotelPolicy.forAdult}
              options={[
                { value: '가능', label: '가능' },
                { value: '불가능', label: '불가능' }
              ]}    
              handleChange={(e)=>{
                const copy = {...hotelPolicy};
                copy.forAdult = e.target.value;
                setHotelPolicy(copy)
              }}
            />
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='주차'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={hotelParking}
              options={[
                { value: '무료', label: '무료' },
                { value: '유료', label: '유료' },
                { value: '불가', label: '불가' },
              ]}    
              handleChange={(e)=>{setHotelParking(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='고객별점/평점'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={customerScore}
              options={[
                { value: '선택', label: '선택' },
                { value: '5', label: '5' },
                { value: '4', label: '4' },
                { value: '3', label: '3' },
                { value: '2', label: '2' },
                { value: '1', label: '1' }
              ]}    
              handleChange={(e)=>{
                setCustomerScore(e.target.value)
              }}
            />
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='트립어드바이저'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={tripAdviser} onChange={(e)=>{setTripAdviser(e.target.value)}}/>
          </div>
        </div>
      </section>

      {/* 전경 ----------------------------------------------------------------------------------------------------------------------------------------- */}
      <section>
        <div className="bottombar"></div>

        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='전경'/>
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
            </div> 
          </div> 
        </div>
        {
          lastImageNamesAllView.length > 0 &&
          <div className="lastImageInputCover" style={{flexDirection:'column'}}>
            { 
              lastImageNamesAllView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='lastImage-box-column'
                    style={{width:'100%', display:'flex', justifyContent:'space-between'}}
                  >
                    <div style={{display:'flex', alignItems:'center'}}>
                      <img style={{width:'100px'}}
                          src={`${MainURL}/images/hotelimages/${item.imageName}`}
                        />
                    </div>
                    <input className="inputdefault" type="text" style={{width:'10%', textAlign:'left'}} 
                      value={item.title} placeholder='제목' onChange={(e)=>{
                          const copy = [...lastImageNamesAllView];
                          copy[index].title = e.target.value;
                          setLastImageNamesAllView(copy);
                        }}/>
                    <input className="inputdefault" type="text" style={{width:'70%', textAlign:'left'}} 
                      value={item.notice} placeholder='설명' onChange={(e)=>{
                          const copy = [...lastImageNamesAllView];
                          copy[index].notice = e.target.value;
                          setLastImageNamesAllView(copy);
                        }}/>
                    <div className='lastImage-box-column-delete'
                      onClick={()=>{
                        deleteInputLastImage(item.imageName, lastImageNamesAllView, setLastImageNamesAllView, imageNamesAllView, setImageNamesAllView, 'imageNamesAllView')
                      }}
                    >
                      <p><IoClose color='#FF0000' size={20}/></p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
        <div className="inputImageInputCover">
          {
            imagesAllView.length > 0 &&
            imagesAllView.map((item:any, index:any)=>{
              return (
                <div key={index} className='imagebox'>
                  <div style={{width:'39%', display:'flex', justifyContent:'space-between'}}>
                    <p>{index+1}.</p>
                    <div style={{width:'20%'}}>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                    </div>
                    <p style={{width:'50%'}}>{renderPreview(item.name)}</p>
                    <div style={{width:'30%'}}>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageAllView(index);}}
                        >
                          <p><IoClose color='#666'/></p>
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

        {/* 객실 ----------------------------------------------------------------------------------------------------------------------------------------- */}

        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='객실'/>
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
             </div>
          </div>
        </div>
        {
          lastImageNamesRoomView.length > 0 &&
          <div className="lastImageInputCover" style={{flexDirection:'column'}}>
            { 
              lastImageNamesRoomView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='lastImage-box-column'
                    style={{width:'100%', display:'flex', justifyContent:'space-between'}}
                  >
                    <div style={{display:'flex', alignItems:'center'}}>
                      <img style={{width:'100px'}}
                          src={`${MainURL}/images/hotelimages/${item.imageName}`}
                        />
                    </div>
                    <input className="inputdefault" type="text" style={{width:'10%', textAlign:'left'}} 
                      value={item.title} placeholder='제목' onChange={(e)=>{
                          const copy = [...lastImageNamesRoomView];
                          copy[index].title = e.target.value;
                          setLastImageNamesRoomView(copy);
                        }}/>
                    <input className="inputdefault" type="text" style={{width:'70%', textAlign:'left'}} 
                      value={item.notice} placeholder='설명' onChange={(e)=>{
                          const copy = [...lastImageNamesRoomView];
                          copy[index].notice = e.target.value;
                          setLastImageNamesRoomView(copy);
                        }}/>
                    <div className='lastImage-box-column-delete'
                      onClick={()=>{
                        deleteInputLastImage(item.imageName, lastImageNamesRoomView, setLastImageNamesRoomView, imageNamesRoomView, setImageNamesRoomView, 'imageNamesRoomView')
                      }}
                    >
                      <p><IoClose color='#FF0000' size={20}/></p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
        <div className="inputImageInputCover">
          {
            imagesRoomView.length > 0 &&
            imagesRoomView.map((item:any, index:any)=>{
              return (
                <div key={index} className='imagebox'>
                   <div style={{width:'39%', display:'flex', justifyContent:'space-between'}}>
                    <p>{index+1}.</p>
                    <div style={{width:'20%'}}>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                    </div>
                    <p style={{width:'50%'}}>{renderPreview(item.name)}</p>
                    <div style={{width:'30%'}}>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageRoomView(index);}}
                        >
                          <p><IoClose color='#666'/></p>
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


        {/* 부대시설 ----------------------------------------------------------------------------------------------------------------------------------------- */}

        <div className="bottombar"></div>

        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='부대시설'/>
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
            </div>
          </div>
        </div>
        {
          lastImageNamesEtcView.length > 0 &&
          <div className="lastImageInputCover" style={{flexDirection:'column'}}>
            { 
              lastImageNamesEtcView.map((item:any, index:any)=>{
                return (
                  <div key={index} className='lastImage-box-column'
                    style={{width:'100%', display:'flex', justifyContent:'space-between'}}
                  >
                    <div style={{display:'flex', alignItems:'center'}}>
                      <img style={{width:'100px'}}
                          src={`${MainURL}/images/hotelimages/${item.imageName}`}
                        />
                    </div>
                    <input className="inputdefault" type="text" style={{width:'10%', textAlign:'left'}} 
                      value={item.title} placeholder='제목' onChange={(e)=>{
                          const copy = [...lastImageNamesEtcView];
                          copy[index].title = e.target.value;
                          setLastImageNamesEtcView(copy);
                        }}/>
                    <input className="inputdefault" type="text" style={{width:'70%', textAlign:'left'}} 
                      value={item.notice} placeholder='설명' onChange={(e)=>{
                          const copy = [...lastImageNamesEtcView];
                          copy[index].notice = e.target.value;
                          setLastImageNamesEtcView(copy);
                        }}/>
                    <div className='lastImage-box-column-delete'
                      onClick={()=>{
                        deleteInputLastImage(item.imageName, lastImageNamesEtcView, setLastImageNamesEtcView, imageNamesEtcView, setImageNamesEtcView, 'imageNamesEtcView')
                      }}
                    >
                      <p><IoClose color='#FF0000' size={20}/></p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        }
        <div className="inputImageInputCover">
          {
            imagesEtcView.length > 0 &&
            imagesEtcView.map((item:any, index:any)=>{
              return (
                <div key={index} className='imagebox'>
                  <div style={{width:'39%', display:'flex', justifyContent:'space-between'}}>
                    <p>{index+1}.</p>
                    <div style={{width:'20%'}}>
                      <img 
                        src={URL.createObjectURL(item)}
                      />
                    </div>
                    <p style={{width:'50%'}}>{renderPreview(item.name)}</p>
                    <div style={{width:'30%'}}>
                      <div className="updownBtnBox">
                        <div className="updownBtnBtn"
                          onClick={()=>{deleteInputImageEtcView(index);}}
                        >
                          <p><IoClose color='#666'/></p>
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
      </section>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='리조트분류'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={productSort.resort}
              options={[
                { value: '선택', label: '선택' },
                { value: 'MZ감성자극', label: 'MZ감성자극' },
                { value: '정글VIEW', label: '정글VIEW' },
                { value: '인피니티오션VIEW', label: '인피니티오션VIEW' },
                { value: 'HOT특가럭셔리', label: 'HOT특가럭셔리' }
              ]}    
              handleChange={(e)=>{
                const copy = {...productSort};
                copy.resort = e.target.value;
                setProductSort(copy)
              }}
            />
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='호텔커스텀분류'/>
            <DropdownBox
              widthmain='50%'
              height='35px'
              selectedValue={productSort.hotelCustom}
              options={[
                { value: '선택', label: '선택' },
                { value: '기본구성', label: '기본구성' },
                { value: '힙스터/클러버PICK', label: '힙스터/클러버PICK' },
                { value: '우붓/정글스테이', label: '우붓/정글스테이' },
                { value: '섬/바다스테이', label: '섬/바다스테이' },
                { value: '럭셔리조합', label: '럭셔리조합' }
              ]}    
              handleChange={(e)=>{
                const copy = {...productSort};
                copy.hotelCustom = e.target.value;
                setProductSort(copy)
              }}
            />
          </div>
        </div>
      </section>

      <section>
        {/* 프로그램 이용요금 ----------------------------------------------------------------------------------------------------------------- */}
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'20%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'55%'}} ><p>프로그램</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p></p></div>
          <div className="chart-divider"></div>
        </div>
        {
          serviceCategory.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{width:'20%', display:'flex'}} >
                    <input className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                       value={item.product} onChange={(e)=>{const copy = [...serviceCategory]; copy[index].product = e.target.value; setServiceCategory(copy);}}/>
                  </div>
                  <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                  <div style={{width:'55%'}} >
                    <input className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                        value={item.program } onChange={(e)=>{const copy = [...serviceCategory]; copy[index].program = e.target.value; setServiceCategory(copy);}}/>
                  </div>
                  <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                  <div style={{width:'15%'}} >
                    <input className="inputdefault" type="text" style={{width:'100%', marginRight:'5px', textAlign:'right', paddingRight:'5px'}} 
                      value={item.productCost} onChange={(e)=>{
                          handleinputServiceCategoryChange(e, index)
                    }}/>
                  </div>
                  <div className="dayBox" style={{width:'10%', justifyContent:'center'}} >
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...serviceCategory, {product : "", program : "", productCost : ""}];
                        setServiceCategory(copy);
                      }}
                    >
                      <p>+추가</p>
                    </div>
                    {
                      (serviceCategory.length > 1 && index !== 0) &&
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...serviceCategory];
                          copy.splice(index, 1);
                          setServiceCategory(copy);
                        }}
                      >
                        <p>-삭제</p>
                      </div>
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
