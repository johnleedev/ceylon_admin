import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropDownNum, DropDownTime, DropDownVisitPath, DropDowncharger } from '../../../DefaultData';
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { IoClose } from 'react-icons/io5';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { TaxFreeLimitProps } from '../../InterfaceData';


export default function ModalAddNation (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const nationData = props.isAddOrRevise === 'revise' ? props.nationData : '';
  const nationList = props.nationList ? props.nationList : '';

  const [isView, setIsView] = useState<boolean>(props.isAddOrRevise === 'revise' ? nationData.isView : true);
  const [nationKo, setNationKo] = useState(props.isAddOrRevise === 'revise' ? nationData.nationKo : '');
  const [nationEn, setNationEn] = useState(props.isAddOrRevise === 'revise' ? nationData.nationEn : '');
  const [visa, setVisa] = useState(props.isAddOrRevise === 'revise' ? nationData.visa : '');
  const [timeDiff, setTimeDiff] = useState(props.isAddOrRevise === 'revise' ? nationData.timeDiff : '');
  const [language, setLanguage] = useState(props.isAddOrRevise === 'revise' ? nationData.language : '');
  const [currency, setCurrency] = useState(props.isAddOrRevise === 'revise' ? nationData.currency : '');
  const [voltage, setVoltage] = useState(props.isAddOrRevise === 'revise' ? nationData.voltage : '');
  const [caution, setCaution] = useState(props.isAddOrRevise === 'revise' ? nationData.caution : '');
  const [taxFreeLimit, setTaxFreeLimit] = useState<TaxFreeLimitProps>(props.isAddOrRevise === 'revise' ? JSON.parse(nationData.taxFreeLimit) : {alcohol:'', cigarette:'', cash:'', all:'', notice:''});
  const [lastImages, setLastImages]  = 
    useState((props.isAddOrRevise === 'revise' && (nationData.inputImage !== null && nationData.inputImage !== '')) ? JSON.parse(nationData.inputImage) : []);
  const [inputImage, setInputImage] = 
    useState((props.isAddOrRevise === 'revise' && (nationData.inputImage !== null && nationData.inputImage !== '')) ? JSON.parse(nationData.inputImage) : []);
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
   const deleteInputImage = async (name:string) => {
    const copy =  [...imageFiles]
    const newItems = copy.filter((item, i) => item.name !== name);
    const nameCopy = [...inputImage]
    const nameNewItems = nameCopy.filter((item, index) => item !== name);
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

  // 사진 등록 함수 ----------------------------------------------
  const registerNation = async () => {

    if (nationList.includes(nationKo)) {
      alert(`${nationKo}는(은) 이미 입력된 나라입니다.`)
    } else {
      const formData = new FormData();
      imageFiles.forEach((file, index) => {
        formData.append('img', file);
      });
      const getParams = {
        isView : isView,
        nationKo : nationKo,
        nationEn : nationEn,
        visa : visa,
        timeDiff : timeDiff,
        language : language,
        currency : currency,
        voltage : voltage,
        caution : caution,
        taxFreeLimit : JSON.stringify(taxFreeLimit),
        inputImage : JSON.stringify(inputImage)
      }
      axios 
        .post(`${MainURL}/restnationcity/registernation`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: getParams,
        })
        .then((res) => {
          if (res.data) {
            alert('등록되었습니다.');
            props.setRefresh(!props.refresh);
            props.setIsViewAddNationModal(false);
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
      .post(`${MainURL}/restnationcity/deletenationimage`, {
        postId : nationData.id,
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

  // 수정 ----------------------------------------------
  const reviseNation = async () => {
    const formData = new FormData();
      imageFiles.forEach((file, index) => {
        formData.append('img', file);
      });
    const getParams = {
      postId : nationData.id,
      isView : isView,
      nationKo : nationKo,
      nationEn : nationEn,
      visa : visa,
      timeDiff : timeDiff,
      language : language,
      currency : currency,
      voltage : voltage,
      caution : caution,
      taxFreeLimit : JSON.stringify(taxFreeLimit),
      inputImage : JSON.stringify(inputImage)
    }
    axios 
      .post(`${MainURL}/restnationcity/revisenation`, formData, {
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

  const deleteNation = async (itemId:any, images:any) => {
		const getParams = {
			postId : itemId,
      images: JSON.parse(images)
		}
		axios 
			.post(`${MainURL}/restnationcity/deletenation`, getParams)
			.then((res) => {
				if (res.data) {
					alert('삭제되었습니다.');
					props.setRefresh(!props.refresh);
          props.setIsViewAddNationModal(false);
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};
  const handleDeleteAlert = (item:any) => {
		const costConfirmed = window.confirm(`${item.nationKo}(${item.nationEn})를 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteNation(item.id, item.inputImage);
		} else {
			return
		}
	};


  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddNationModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
       <div className="modal-header">
        <h1>국가 {props.isAddOrRevise === 'add' ? '생성' : '수정'}</h1>
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
          <div className="coverrow half">
            <TitleBox width="120px" text='국가(한글)'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={nationKo} onChange={(e)=>{
                if (nationList.includes(e.target.value)) {
                  alert ('이미 입력된 나라입니다.')
                }
                setNationKo(e.target.value)
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='국가(영문)'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={nationEn} onChange={(e)=>{setNationEn(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='비자'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={visa} onChange={(e)=>{setVisa(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='시차'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={timeDiff} onChange={(e)=>{setTimeDiff(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='통용언어'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={language} onChange={(e)=>{setLanguage(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='통용화폐'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={currency} onChange={(e)=>{setCurrency(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='전압/플러그타입' height={200}/>
            <textarea 
              className="textarea"
              value={voltage}
              onChange={(e)=>{setVoltage(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='입국시 주의사항' height={200}/>
            <textarea 
              className="textarea"
              value={caution}
              onChange={(e)=>{setCaution(e.target.value)}}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='면세한도' height={200}/>
            <div style={{width:'30%'}}>
              <div style={{width:'90%', display:'flex', alignItems:'center', marginBottom:'5px'}}>
                <p style={{width:'30%', textAlign:'center'}}>주류</p>
                <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
                  value={taxFreeLimit.alcohol} onChange={(e)=>{
                    const copy = {...taxFreeLimit};
                    copy.alcohol = e.target.value;
                    setTaxFreeLimit(copy);
                  }}/>
              </div>
              <div style={{width:'90%', display:'flex', alignItems:'center', marginBottom:'5px'}}>
                <p style={{width:'30%', textAlign:'center'}}>담배</p>
                <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
                  value={taxFreeLimit.cigarette} onChange={(e)=>{
                    const copy = {...taxFreeLimit};
                    copy.cigarette = e.target.value;
                    setTaxFreeLimit(copy);
                  }}/>
              </div>
              <div style={{width:'90%', display:'flex', alignItems:'center', marginBottom:'5px'}}>
                <p style={{width:'30%', textAlign:'center'}}>현금</p>
                <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
                  value={taxFreeLimit.cash} onChange={(e)=>{
                    const copy = {...taxFreeLimit};
                    copy.cash = e.target.value;
                    setTaxFreeLimit(copy);
                  }}/>
              </div>
              <div style={{width:'90%', display:'flex', alignItems:'center', marginBottom:'5px'}}>
                <p style={{width:'30%', textAlign:'center'}}>총면세한도</p>
                <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
                  value={taxFreeLimit.all} onChange={(e)=>{
                    const copy = {...taxFreeLimit};
                    copy.all = e.target.value;
                    setTaxFreeLimit(copy);
                  }}/>
              </div>
            </div>
            <textarea 
              style={{width:'60%'}}
                className="textarea"
                value={taxFreeLimit.notice}
                onChange={(e)=>{
                  const copy = {...taxFreeLimit};
                  copy.notice = e.target.value;
                  setTaxFreeLimit(copy);
                }}
              />
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
                      src={`${MainURL}/images/nationimages/${item}`}
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
                      onClick={()=>{deleteInputImage(item.name);}}
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
        {
          props.isAddOrRevise === 'revise' &&
          <div className="btn" style={{backgroundColor:'#FF0000'}}
            onClick={()=>{ handleDeleteAlert(nationData);}}
          >
            <p>삭제</p>
          </div>
        }
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddNationModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            props.isAddOrRevise === 'add' 
            ? registerNation()
            : reviseNation()
          }}
        >
          <p>저장</p>
        </div>
      </div>
      
    </div>     
  )
}
