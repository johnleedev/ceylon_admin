import React, { useCallback, useState } from 'react'
import '../ModalAdd.scss'
import { TitleBox } from '../../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../../MainURL';
import { DropDownPackageType } from '../../../../DefaultData';

export default function FullVillaCost (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  
  const hotelInfoData = props.hotelInfoData;
  const hotelCostData = props.hotelCostData;

  const [isViewSaleCost, setIsViewSaleCost] = useState(hotelInfoData?.isViewSaleCost ?? '');
  const [notes, setNotes] = useState(hotelInfoData?.notes ?? '');
  const [notesDetail, setNotesDetail] = useState(hotelInfoData?.notesDetail ?? '');
  const [landBenefit, setLandBenefit] = useState(hotelInfoData?.landBenefit ?? '');
  const [productType, setProductType] = useState(hotelInfoData?.productType ?? '');
  const [applyCurrency, setApplyCurrency] = useState(hotelInfoData?.applyCurrency ?? '₩');
  const [commission, setCommission] = useState(
    hotelInfoData?.commission
    ? JSON.parse(hotelInfoData?.commission)
    : [{title:"표준수수료", select:"select", charge:"0"},{title:"기본네고", select:"select", charge:"0"},{title:"특별네고", select:"select", charge:"0", period:{start:"", end:""}}]
  );


  // 요금표 정보 저장 함수 ----------------------------------------------
  const registerInfoPost = async () => {
    const getParams = {
      postId :  hotelInfoData.id, 
      selectCostType : props.selectCostType,
      locationDetail : props.locationDetail,
      landCompany : props.landCompany,
      isViewSaleCost : isViewSaleCost,
      notes : notes,
      notesDetail: notesDetail,
      landBenefit : landBenefit,
      productType : productType,
      applyCurrency : applyCurrency,
      commission : JSON.stringify(commission),
    }
    axios
      .post(`${MainURL}/producthotel/registerhotelcostinfo`, getParams)
      .then((res) => {
        if (res.data) {
         alert('저장되었습니다.');
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  const wonOption = [
    { value: '선택', label: '선택' },
    { value: '50,000', label: '50,000' },
    { value: '100,000', label: '100,000' },
    { value: '150,000', label: '150,000' },
    { value: '200,000', label: '200,000' },
    { value: '250,000', label: '250,000' },
    { value: '300,000', label: '300,000' }
  ]

  const dollarOption = [
    { value: '선택', label: '선택' },
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' }
  ]


  // 입금가 & 판ㅐ가 ---------------------------------------------------------------------------------------------------------------------------------------------------

  interface InputCostProps {
    reservePeriod : {start:string, end:string};
    inputDefault : {
      seasonName: string;
      period : {start:string, end:string}[];
      preStay : string;
      costByRoomType : {
        roomType: string;
        currency: string;
        oneDayCost : string;
        twoTwoDayCost : string;
        oneThreeDayCost : string;
        threeDayCost : string;
        fourDayCost : string;
        notice : string;
      }[]
    }[]
    inputPackage : {
      addtionName: string;
      personCost : string;
      content : string;
    }[]
    saleDefaultCost : {
      seasonName: string;
      period : {start:string, end:string}[];
      preStay : string;
      costByRoomType : {
        roomType: string;
        currency: string;
        oneDayCost : string;
        twoTwoDayCost : string;
        oneThreeDayCost : string;
        threeDayCost : string;
        fourDayCost : string;
        notice : string;
      }[]
    }[]
    // saleSeasonCost : {
    //   seasonName: string;
    //   period : {start:string, end:string}[];
    //   preStay : string;
    //   costByRoomType : {
    //     roomType: string;
    //     oneDayCost : string;
    //     twoTwoDayCost : string;
    //     oneThreeDayCost : string;
    //     threeDayCost : string;
    //     fourDayCost : string;
    //     notice : string;
    //   }[]
    // }[]
  }   

  const [openSaleContent, setOpenSaleContent] = useState<boolean>(hotelInfoData?.isCostInput === 'true' ? true : false);

  const defaultInputCostData: InputCostProps = 
    { reservePeriod: {start:"2024-09-09", end:"2024-09-09"}, 
      inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", 
                      costByRoomType: [{roomType: "", currency:"", oneDayCost : "", twoTwoDayCost : "", oneThreeDayCost : "", threeDayCost : "", fourDayCost : "", notice : ""}]}],
      inputPackage : [{addtionName :"", personCost : "", content: ""}],
      saleDefaultCost : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", 
                  costByRoomType: [{roomType: "", currency:"", oneDayCost : "", twoTwoDayCost : "", oneThreeDayCost : "", threeDayCost : "", fourDayCost : "", notice : ""}]}],
      // saleSeasonCost : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", 
      //             costByRoomType: [{roomType: "", oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]}]
    }
  const [inputCost, setInputCost] = useState<InputCostProps[]>(hotelInfoData?.isCostInput === 'true' ? hotelCostData : [defaultInputCostData]);
   

  // apply 입력된 숫자 금액으로 변경
  const handleinputDefaultCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, sectionIndex:number, index: number, subIndex: number, name: string,
    currentState: InputCostProps[], setCurrentState: React.Dispatch<React.SetStateAction<InputCostProps[]>>
  ) => {
    const text = e.target.value;
    const copy = [...currentState];
    if (name === 'period') {
      return;
    }
    if (text === '') {
      (copy[sectionIndex].inputDefault[index].costByRoomType[subIndex] as any)[name] = ''; 
      setCurrentState(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[sectionIndex].inputDefault[index].costByRoomType[subIndex] as any)[name] = formattedNumber; 
    setCurrentState(copy);
  };
  
  // season 입력된 숫자 금액으로 변경
  const handleinputPackageCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, sectionIndex:number, index: number, name: string,
    currentState: InputCostProps[], setCurrentState: React.Dispatch<React.SetStateAction<InputCostProps[]>>
  ) => {
    const text = e.target.value;
    const copy = [...currentState];
    if (name === 'period') {
      return;
    }
    if (text === '') {
      (copy[sectionIndex].inputPackage[index] as any)[name] = ''; 
      setCurrentState(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[sectionIndex].inputPackage[index] as any)[name] = formattedNumber; 
    setCurrentState(copy);
  };

  // season 박수 x 추가요금을 합계에 입력
  // const handleAddCostMultiplyDay = (
  //   e: string, sectionIndex:number, index: number
  // ) => {
  //   const text = e;
  //   const copy = [...inputCost]; 
  //   copy[sectionIndex].inputPackage[index].minimumDay = text;
  //   const inputTextNumberOnly = parseInt(text.replace(/[^0-9]/g, ''), 10);
  //   const addCostCopy = copy[sectionIndex].inputPackage[index].addCost;
  //   const addCosttNumberOnly = parseInt(addCostCopy.replace(/[^0-9]/g, ''), 10);
  //   const multiplyCost = inputTextNumberOnly * addCosttNumberOnly;
  //   const dividePersonCost = (inputTextNumberOnly * addCosttNumberOnly) / 2;
  //   const formattedMultiplyCost = multiplyCost.toLocaleString('en-US');
  //   const formattedDividePersonCost = Math.floor(dividePersonCost).toLocaleString('en-US');
  //   copy[sectionIndex].inputPackage[index].addCostAll = formattedMultiplyCost;
  //   copy[sectionIndex].inputPackage[index].addCostPerson = formattedDividePersonCost;
  //   setInputCost(copy);
  // };
  
  // 화폐 적용 함수
  const handleApplyCurrency = (symbol : string) => {
    setApplyCurrency(symbol);
    const copy = [...inputCost]
    const updatedinputCost = copy.map(cost => ({
      ...cost, 
      default: cost.inputDefault.map(def => ({...def, currency: symbol})),
      season: cost.inputPackage.map(seasonItem => ({...seasonItem, currency: symbol}))
    }));
    setInputCost(updatedinputCost);
  };

    
  // 입금가 판매가 적용
  const handleApplySaleCost = () => {
    setOpenSaleContent(true);
    // commission 배열에서 charge 값을 합산하는 부분
    const chargeNumber = [0, 1, 2].reduce((sum, index) => {
      const chargeValue = Number(commission[index]?.charge.replace(/,/g, '')) || 0;
      if (index === 0) {
          return sum + chargeValue; // 인덱스 0은 더함
      } else {
          return sum - chargeValue; // 인덱스 1, 2는 뺌
      }
    }, 0);
    // 비용을 업데이트하는 함수 (roomType별로 적용)
    const updateCostValues = (costByRoomType: any[], additionalCost: number) => {
      return costByRoomType.map((roomTypeCost: any) => {
        // const oneDayCostNumber = Number(roomTypeCost.oneDayCost?.replace(/,/g, '')) || 0;
        // const updatedOneDayCost = oneDayCostNumber === 0 ? '0' : (oneDayCostNumber + additionalCost).toLocaleString();
        const twoTwoDayCostNumber = Number(roomTypeCost.twoTwoDayCost?.replace(/,/g, '')) || 0;
        const updatedTwoTwoDayCost = twoTwoDayCostNumber === 0 ? '' : (twoTwoDayCostNumber + additionalCost).toLocaleString();
        const oneThreeDayCostNumber = Number(roomTypeCost.oneThreeDayCost?.replace(/,/g, '')) || 0;
        const updatedOneThreeDayCost = oneThreeDayCostNumber === 0 ? '' : (oneThreeDayCostNumber + additionalCost).toLocaleString();
        const threeDayCostNumber = Number(roomTypeCost.threeDayCost?.replace(/,/g, '')) || 0;
        const updatedThreeDayCost = threeDayCostNumber === 0 ? '' : (threeDayCostNumber + additionalCost).toLocaleString();
        const fourDayCostNumber = Number(roomTypeCost.fourDayCost?.replace(/,/g, '')) || 0;
        const updatedFourDayCost = fourDayCostNumber === 0 ? '' : (fourDayCostNumber + additionalCost).toLocaleString();
          return {
          ...roomTypeCost,
          // oneDayCost: updatedOneDayCost,
          twoTwoDayCost: updatedTwoTwoDayCost,
          oneThreeDayCost: updatedOneThreeDayCost,
          threeDayCost: updatedThreeDayCost,
          fourDayCost: updatedFourDayCost,
        };
      });
    };
    
    // inputCost 데이터를 순회하면서 각 비용을 업데이트
    const updatedInputCost = inputCost.map((cost: any) => {
      // 기본 비용 업데이트
      const defaultCostCopy = cost.inputDefault.map((def: any) => {
        return {
          ...def,
          costByRoomType: updateCostValues(def.costByRoomType, chargeNumber),
        };
      });
        // 시즌별 추가 비용을 계산하고 적용
      // let saleCostCopy = defaultCostCopy.flatMap((def: any) => {
      //   return cost.inputPackage.map((season: any) => {
      //     const addCostPersonNumber = Number(season.addCostPerson?.replace(/,/g, '')) || 0;
      //     const galaDinnerNumber = Number(season.galaDinner?.replace(/,/g, '')) || 0;
      //     const additionalCost = addCostPersonNumber + galaDinnerNumber;
      //     const updatedCostByRoomType = def.costByRoomType.map((roomTypeCost: any) => {
      //       const updatedOneDayCost = (Number(additionalCost) === 0 || Number(roomTypeCost.oneDayCost) === 0) 
      //                                   ? '0' : (Number(roomTypeCost.oneDayCost?.replace(/,/g, '')) + additionalCost).toLocaleString();
      //       const updatedTwoTwoDayCost = (Number(additionalCost) === 0 || Number(roomTypeCost.twoTwoDayCost) === 0) 
      //                                   ? '0' : (Number(roomTypeCost.twoTwoDayCost?.replace(/,/g, '')) + additionalCost).toLocaleString();
      //       const updatedOneThreeDayCost = (Number(additionalCost) === 0 || Number(roomTypeCost.oneThreeDayCost) === 0) 
      //                                   ? '0' : (Number(roomTypeCost.oneThreeDayCost?.replace(/,/g, '')) + additionalCost).toLocaleString();
      //       const updatedThreeDayCost = (Number(additionalCost) === 0 || Number(roomTypeCost.threeDayCost) === 0) 
      //                                   ? '0' : (Number(roomTypeCost.threeDayCost?.replace(/,/g, '')) + additionalCost).toLocaleString();
      //       const updatedFourDayCost = (Number(additionalCost) === 0 || Number(roomTypeCost.fourDayCost) === 0) 
      //                                   ? '0' : (Number(roomTypeCost.fourDayCost?.replace(/,/g, '')) + additionalCost).toLocaleString();
      //       return {
      //         ...roomTypeCost,
      //         oneDayCost: updatedOneDayCost,
      //         twoTwoDayCost: updatedTwoTwoDayCost,
      //         oneThreeDayCost: updatedOneThreeDayCost,
      //         threeDayCost: updatedThreeDayCost,
      //         fourDayCost: updatedFourDayCost,
      //       };
      //     });
      //     return {
      //       seasonName: season.seasonName,
      //       period: season.period,
      //       preStay: def.preStay,
      //       costByRoomType: updatedCostByRoomType,
      //       minimumDay: season.minimumDay,
      //       notice: "",
      //     };
      //   });
      // });
      // saleCostCopy = saleCostCopy.sort((a: any, b: any) => {
      //   if (a.roomType < b.roomType) return -1;
      //   if (a.roomType > b.roomType) return 1;
      //   return 0;
      // });
      return {
        ...cost,
        saleDefaultCost: defaultCostCopy,
        // saleSeasonCost: saleCostCopy,
      };
    });
    
    setInputCost(updatedInputCost);
  };
  

  // 입금가 판매가 초기화
  const handleApplySaleCostReset = () => {
    setInputCost([defaultInputCostData]);
    setOpenSaleContent(false);
  };


  // 요금표 정보 저장 함수 ----------------------------------------------
  const registerCostPost = async () => {

    const inputCostCopy = [...inputCost];
    for (let index = 0; index < inputCostCopy.length; index++) {
      const item = inputCostCopy[index];
      try {
        const response = await axios.post(`${MainURL}/producthotel/registerhotelcost`, {
          postId : hotelInfoData.id, 
          costIndex: index,
          hotelNameKo: hotelInfoData.hotelNameKo,
          hotelNameEn: hotelInfoData.hotelNameEn, 
          reservePeriod : JSON.stringify(item.reservePeriod),
          inputDefault :  JSON.stringify(item.inputDefault),
          inputPackage : JSON.stringify(item.inputPackage),
          saleDefaultCost : JSON.stringify(item.saleDefaultCost),
          // saleSeasonCost : JSON.stringify(item.saleSeasonCost)
        });
        console.log(response.data);
      } catch (error) {
        console.error(`에러 발생 - 단어: ${item}`, error);
      }
    }
    alert('저장되었습니다.')
  };


  

  // 요금표 예약기간 삭제 함수 ----------------------------------------------
  const deleteReservePeriod = async (sectionIndex:number) => {
    const response = await axios.post(`${MainURL}/producthotel/deletehotelcostindex`, {
      postId : hotelInfoData.id, 
      costIndex: sectionIndex,
    });
    if (response.data) {
      const copy = [...inputCost];
      copy.splice(sectionIndex, 1);
      setInputCost(copy);
    }
  };

  const handleDeleteAlert = (sectionIndex:number) => {
    const costConfirmed = window.confirm("저장과 상관없이 삭제됩니다. 정말 삭제하시겠습니까?");
      if (costConfirmed) {
        deleteReservePeriod(sectionIndex);
    } else {
      return
    }
  };


  return (
    <div>

      <div className="modal-header">
        <h1>{props.selectCostType === '풀빌라' && '풀빌라'}</h1>
        <h1>{props.selectCostType === '후투숙' && '후투숙리조트'}</h1>
        <h1>{props.selectCostType === '경유지' && '경유호텔'}</h1>
        <h1>{props.selectCostType === '리조트' && '리조트'}</h1>
        <h1>{props.selectCostType === '호텔' && '호텔'}</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='판매가'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isViewSaleCost === '노출'}
                  onChange={()=>{setIsViewSaleCost('노출')}}
                />
              </div>
              <p>노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isViewSaleCost === '비노출'}
                  onChange={()=>{setIsViewSaleCost('비노출')}}
                />
              </div>
              <p>비노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isViewSaleCost === '상품가연동'}
                  onChange={()=>{setIsViewSaleCost('상품가연동')}}
                />
              </div>
              <p>상품가연동</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='호텔명'/>
            <p>{hotelInfoData.hotelNameKo} {hotelInfoData.hotelNameEn}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='참고사항'/>
            <div className='checkInputCover' style={{width:'90%'}}>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === 'GSA'}
                  onChange={()=>{setNotes('GSA')}}
                />
              </div>
              <p>GSA</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === '랜드최저가'}
                  onChange={()=>{setNotes('랜드최저가')}}
                />
              </div>
              <p>랜드최저가</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === '요금네고'}
                  onChange={()=>{setNotes('요금네고')}}
                />
              </div>
              <p>요금네고</p>
              <input className="inputdefault" type="text" style={{width:'40%', marginLeft:'5px'}} 
                value={notesDetail} onChange={(e)=>{setNotesDetail(e.target.value)}}/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드베네핏'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={landBenefit} onChange={(e)=>{setLandBenefit(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품타입'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productType === '호텔믹스'}
                  onChange={()=>{setProductType('호텔믹스')}}
                />
              </div>
              <p>호텔믹스(선투숙+풀빌라)</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productType === '호텔리조트'}
                  onChange={()=>{setProductType('호텔리조트')}}
                />
              </div>
              <p>호텔/리조트</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productType === '룸믹스'}
                  onChange={()=>{setProductType('룸믹스')}}
                />
              </div>
              <p>룸믹스</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={productType === '경유지숙박'}
                  onChange={()=>{setProductType('경유지숙박')}}
                />
              </div>
              <p>경유지숙박</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='적용화폐'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '₩'}
                  onChange={()=>{handleApplyCurrency('₩')}}
                />
              </div>
              <p>₩(만원)</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '$'}
                  onChange={()=>{handleApplyCurrency('$')}}
                />
              </div>
              <p>$(달러)</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{height:50}}></div>

      {/* 판매가 셋팅(적용화폐,수수료) --------------------------------------------------------------------------------------------------- */}

      <section>
        <div className="bottombar"></div>
        {
          commission.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole">
                  <TitleBox width="120px" text={item.title}/>
                  <div className='checkInputCover'>
                    <div className='checkInput'>
                      <input className="input" type="checkbox"
                        checked={item.select === 'select'}
                        onChange={()=>{
                          const copy = [...commission];
                          copy[index].select = 'select';
                          copy[index].charge ='0';
                          setCommission(copy);
                        }}
                      />
                    </div>
                  </div>
                  <DropdownBox
                    widthmain='20%'
                    height='35px'
                    selectedValue={item.charge}
                    options={applyCurrency === '₩' ? wonOption : dollarOption} 
                    handleChange={(e)=>{
                      const copy = [...commission];
                      copy[index].select = 'select';
                      copy[index].charge = e.target.value;
                      setCommission(copy);
                    }}
                  />
                  <div className='checkInputCover'>
                    <div className='checkInput'>
                      <input className="input" type="checkbox"
                        checked={item.select === 'direct'}
                        onChange={()=>{
                          const copy = [...commission];
                          copy[index].select = 'direct';
                          copy[index].charge = '0';
                          setCommission(copy);
                        }}
                      />
                    </div>
                  </div>
                  <p style={{margin:'0'}}>직접입력:</p>
                  <input className="inputdefault" type="text" style={{width:'20%', marginLeft:'5px'}} 
                    value={item.select === 'direct' ? item.charge : ''} onChange={(e)=>{
                      const text = e.target.value;
                      const copy = [...commission];
                      if (text === '') {
                        copy[index].charge = ''; 
                        setCommission(copy);
                        return;
                      }
                      const inputNumber = parseInt(text.replace(/,/g, ''), 10);
                      if (isNaN(inputNumber)) {return;}
                      const formattedNumber = inputNumber.toLocaleString('en-US');
                      copy[index].charge = formattedNumber; 
                      setCommission(copy);
                    }}/>
                  {
                    item.title === '특별네고' &&
                    <>
                    <DateBoxNum width='120px' subWidth='120px' right={5} date={item.period.start}
                      setSelectDate={(e:any)=>{ 
                        const copy = [...commission];
                        copy[index].period.start = e;
                        copy[index].period.end = e;
                        setCommission(copy);
                      }} 
                    />
                    <p style={{marginLeft:'5px'}}>~</p>
                    <DateBoxNum width='120px' subWidth='120px' right={5} date={item.period.end}
                      setSelectDate={(e:any)=>{ 
                        const copy = [...commission];
                        copy[index].period.end = e;
                        setCommission(copy);
                      }} 
                      />
                    </>
                  }
                </div>
              </div>
            )
          })
        }
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={props.handleClose}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={registerInfoPost}
          >
            <p>요금표 정보 저장</p>
        </div>
      </div>


      <div style={{height:50}}></div>

      {/* 입금가 ------------------------------------------------------------------------------------------------------------------------ */}

      <div className="modal-header">
        <h1>입금가</h1>
        <p>(1인 기준)</p>
      </div>

      {
        inputCost.map((section:any, sectionIndex:any)=>{
          return (
            <div key={sectionIndex}>

              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                    <p style={{marginRight:'10px', marginLeft:'5px', fontWeight:'600'}}>예약기간:</p>
                    <DateBoxNum width='120px' subWidth='120px' right={5} date={section.reservePeriod.start}
                      setSelectDate={(e:any)=>{ 
                        const inputs = [...inputCost];
                        inputs[sectionIndex].reservePeriod.start = e;
                        inputs[sectionIndex].reservePeriod.end = e;
                        setInputCost(inputs);
                      }} 
                    />
                    <p style={{marginLeft:'5px'}}>~</p>
                    <DateBoxNum width='120px' subWidth='120px' right={5} date={section.reservePeriod.end}
                      setSelectDate={(e:any)=>{ 
                        const inputs = [...inputCost];
                        inputs[sectionIndex].reservePeriod.end = e;
                        setInputCost(inputs);
                      }} 
                      />
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...inputCost, 
                            { reservePeriod: {start:"", end:""}, 
                              inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", 
                                    costByRoomType: [{roomType: "", currency:"", oneDayCost : "", twoTwoDayCost : "", oneThreeDayCost : "", threeDayCost : "", fourDayCost : "", notice : ""}]}],
                              inputPackage : [{addtionName :"", personCost : "", content: ""}],
                              saleDefaultCost : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", 
                                      costByRoomType: [{roomType: "", currency:"", oneDayCost : "", twoTwoDayCost : "", oneThreeDayCost : "", threeDayCost : "", fourDayCost : "", notice : ""}]}],
                              // saleSeasonCost : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", 
                              //         costByRoomType: [{roomType: "", oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]}],
                            }];
                          setInputCost(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          handleDeleteAlert(sectionIndex)
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>

              <section>
                <div className="bottombar"></div>
                <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                  <div className='chartbox' style={{width:'23%'}} ><p>기간</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'5%'}} ><p>선투숙</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'14%'}} ><p>룸타입</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'5%'}} ><p>화폐</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'40%'}}>
                    <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                      <p>리조트+풀빌라요금</p>
                    </div>
                    <div style={{display:'flex'}}  className='chartbox'>
                      <p className='charttext'>1박</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>2+2</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>1+3</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>3</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>4</p>
                    </div>
                  </div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'10%'}} ><p>포함사항/특전</p></div>
                  <div className='chartbox' style={{width:'3%'}} ></div>
                </div>
                {
                  section.inputDefault.map((item:any, index:any)=>{
                    return (
                      <div className="coverbox" key={index}>
                        <div className="coverrow hole" style={{minHeight:'60px'}} >
                          <div style={{width:'23%'}} >
                            {
                              item.period.map((subItem:any, subIndex:any)=>{
                                return (
                                  <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                                    <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.start}
                                    setSelectDate={(e:any)=>{ 
                                      const inputs = [...inputCost];
                                      inputs[sectionIndex].inputDefault[index].period[subIndex].start = e;
                                      inputs[sectionIndex].inputDefault[index].period[subIndex].end = e;
                                      setInputCost(inputs);
                                    }} 
                                    />
                                    <p style={{marginLeft:'5px'}}>~</p>
                                    <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                      setSelectDate={(e:any)=>{ 
                                        const inputs = [...inputCost];
                                        inputs[sectionIndex].inputDefault[index].period[subIndex].end = e;
                                        setInputCost(inputs);
                                      }} 
                                      />
                                      <div className="dayBox">
                                        <div className="dayBtn"
                                          onClick={()=>{
                                            const copy = [...inputCost];
                                            copy[sectionIndex].inputDefault[index].period = [...copy[sectionIndex].inputDefault[index].period, {start:"", end:""}];
                                            setInputCost(copy);
                                          }}
                                        >
                                          <p>+</p>
                                        </div>
                                      </div>  
                                      <div className="dayBox">
                                        <div className="dayBtn"
                                          onClick={()=>{
                                            const copy = [...inputCost];
                                            copy[sectionIndex].inputDefault[index].period.splice(subIndex, 1);
                                            setInputCost(copy);
                                          }}
                                        >
                                          <p>-</p>
                                        </div>
                                      </div>  
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:"center"}}>
                            <div className='checkInputCover'>
                              <div className='checkInput'>
                                <input className="input" type="checkbox"
                                  checked={item.preStay === 'true'}
                                  onChange={()=>{
                                    const copy = [...inputCost]; 
                                    copy[sectionIndex].inputDefault[index].preStay = item.preStay === 'true' ? 'false' : 'true'; 
                                    setInputCost(copy);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div style={{width:'69%', alignItems:'center',}}>
                            {
                              item.costByRoomType.map((subItem:any, subIndex:any)=>{

                                return (
                                  <div key={subIndex} style={{display:'flex'}}>
                                    <input className="inputdefault" type="text" style={{width:'14%', marginLeft:'5px'}} 
                                      value={subItem.roomType} onChange={(e)=>{
                                        const copy = [...inputCost]; 
                                        copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].roomType  = e.target.value;
                                        setInputCost(copy);
                                      }}
                                    />
                                    <div className="dayBox">
                                      <div className="dayBtn"
                                        onClick={()=>{
                                          const copy = [...inputCost];
                                          copy[sectionIndex].inputDefault[index].costByRoomType.splice(subIndex, 1);
                                          setInputCost(copy);
                                        }}
                                      >
                                        <p>-</p>
                                      </div>
                                    </div>  
                                    <div className="dayBox">
                                      <div className="dayBtn"
                                        onClick={()=>{
                                          const copy = [...inputCost];
                                          copy[sectionIndex].inputDefault[index].costByRoomType.splice(subIndex + 1, 0, 
                                            {roomType: "", currency:"",  oneDayCost : "", twoTwoDayCost : "", oneThreeDayCost : "", threeDayCost : "", fourDayCost : "", notice : ""}
                                          );
                                          setInputCost(copy);
                                        }}
                                      >
                                        <p>+</p>
                                      </div>
                                    </div>
                                    <div style={{width:'7%', display:'flex', justifyContent:'center'}} >
                                      <DropdownBox
                                          widthmain='95%'
                                          height='35px'
                                          selectedValue={subItem.currency}
                                          options={[
                                            { value: '선택', label: '선택' },
                                            { value: '$', label: '$' },
                                            { value: '₩', label: '₩' }
                                          ]}    
                                          handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].currency = e.target.value; setInputCost(copy);}}
                                        />
                                    </div>
                                    <div style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                      <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                        value={subItem.oneDayCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'oneDayCost', inputCost, setInputCost)
                                        }}/>
                                      <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                        value={subItem.twoTwoDayCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'twoTwoDayCost', inputCost, setInputCost)
                                        }}/>
                                      <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                        value={subItem.oneThreeDayCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'oneThreeDayCost', inputCost, setInputCost)
                                        }}/>
                                      <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                      value={subItem.threeDayCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'threeDayCost', inputCost, setInputCost)
                                      }}/>
                                      <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                      value={subItem.fourDayCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'fourDayCost', inputCost, setInputCost)
                                      }}/>
                                    </div>
                                    <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                    <div style={{width:'15%', display:'flex'}} >
                                      <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                          value={subItem.notice} onChange={(e)=>{
                                            const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].notice = e.target.value; setInputCost(copy);
                                            }}/>
                                    </div>
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div style={{width:'3%', display:'flex'}} >
                          <div className="dayBox">
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost];
                                const previousIndex = copy[sectionIndex].inputDefault.length - 1;
                                const previousCostByRoomType = copy[sectionIndex].inputDefault[previousIndex].costByRoomType;
                                copy[sectionIndex].inputDefault = [
                                  ...copy[sectionIndex].inputDefault,
                                  {
                                    seasonName: `default${previousIndex + 2}`,
                                    period: [{ start: "", end: "" }],
                                    preStay: "false",
                                    costByRoomType: previousCostByRoomType.map((item: any) => ({
                                      roomType: item.roomType, 
                                      currency:"",
                                      oneDayCost: "", 
                                      twoTwoDayCost: "", 
                                      oneThreeDayCost: "", 
                                      threeDayCost: "", 
                                      fourDayCost: "", 
                                      notice: ""
                                    }))
                                  }
                                ];
                                setInputCost(copy);
                              }}
                            >
                              <p>+</p>
                            </div>
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost];
                                copy[sectionIndex].inputDefault.splice(index, 1);
                                setInputCost(copy);
                              }}
                            >
                              <p>-</p>
                            </div>
                          </div>  
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
                
                <div style={{height:'1px', backgroundColor:'#BDBDBD', marginTop:'20px'}}></div>
                <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                  <div className='chartbox' style={{width:'20%'}} ><p>추가사항</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'10%'}} ><p>1인 요금</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'70%'}} ><p>내용</p></div>
                </div>
                {
                  section.inputPackage.map((item:any, index:any)=>{
                    return (
                      <div className="coverbox">
                        <div className="coverrow hole" style={{minHeight:'60px'}} >
                          <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <DropdownBox
                              widthmain='95%'
                              height='35px'
                              selectedValue={item.addtionName}
                              options={DropDownPackageType}    
                              handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputPackage[index].addtionName = e.target.value; setInputCost(copy);}}
                            />
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'10%', display:'flex'}} >
                            <input className="inputdefault" type="text" style={{width:'100%', marginRight:'5px', textAlign:'right', paddingRight:'5px'}} 
                              value={item.personCost} onChange={(e)=>{
                                  handleinputPackageCostChange(e, sectionIndex, index, 'personCost', inputCost, setInputCost)
                                }}/>
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'70%'}} >
                            <input className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                value={item.content} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputPackage[index].content = e.target.value; setInputCost(copy);}}/>
                          </div>
                          <div className="dayBox">
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost];
                                copy[sectionIndex].inputPackage = [... copy[sectionIndex].inputPackage, 
                                  {addtionName :"", personCost : "", content: ""}
                                ]
                                setInputCost(copy);
                              }}
                            >
                              <p>+</p>
                            </div>
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost];
                                copy[sectionIndex].inputPackage.splice(index, 1);
                                setInputCost(copy);
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

              </section>
            </div>
          )
        })
      }

      <div className='btn-box'>
        <div className="btn" 
          onClick={handleApplySaleCostReset}
        >
          <p style={{color:'#333'}}>초기화</p>
        </div>
        <div className="btn" 
          onClick={handleApplySaleCost}
        >
          <p style={{color:'#333'}}>수수료 적용</p>
        </div>
      </div>

      {/* 판매가 ------------------------------------------------------------------------------------------------------------------------ */}
      
      { openSaleContent &&
        <>
          <div className="modal-header">
            <h1 style={{color:'#5fb7ef'}}>판매가</h1>
            <p>(1인 기준)</p>
          </div>

          {
            inputCost.map((section:any, sectionIndex:any)=>{
              return (
                <div key={sectionIndex}>

                  <div className="coverbox">
                    <div className="coverrow hole" style={{minHeight:'60px'}} >
                      <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                        <p style={{marginRight:'10px', marginLeft:'5px', fontWeight:'600'}}>예약기간:</p>
                        <DateBoxNum width='120px' subWidth='120px' right={5} date={section.reservePeriod.start}
                          setSelectDate={(e:any)=>{ 
                            const inputs = [...inputCost];
                            inputs[sectionIndex].reservePeriod.start = e;
                            inputs[sectionIndex].reservePeriod.end = e;
                            setInputCost(inputs);
                          }} 
                        />
                        <p style={{marginLeft:'5px'}}>~</p>
                        <DateBoxNum width='120px' subWidth='120px' right={5} date={section.reservePeriod.end}
                          setSelectDate={(e:any)=>{ 
                            const inputs = [...inputCost];
                            inputs[sectionIndex].reservePeriod.end = e;
                            setInputCost(inputs);
                          }} 
                          />
                        <div className="dayBox">
                          <div className="dayBtn"
                            onClick={()=>{
                              const copy = [...inputCost, defaultInputCostData];
                              setInputCost(copy);
                            }}
                          >
                            <p>+</p>
                          </div>
                        </div>  
                        <div className="dayBox">
                          <div className="dayBtn"
                            onClick={()=>{
                              const copy = [...inputCost];
                              copy.splice(sectionIndex, 1);
                              setInputCost(copy);
                            }}
                          >
                            <p>-</p>
                          </div>
                        </div>  
                      </div>
                    </div>
                  </div>

                  <section>
                    <div className="bottombar"></div>
                    <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                      <div className='chartbox' style={{width:'25%'}} ><p>기간</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'5%'}} ><p>선투숙</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'12%'}} ><p>룸타입</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'5%'}} ><p>화폐</p></div>
                      <div className="chart-divider"></div>
                      <div style={{width:'40%'}}>
                        <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                          <p>리조트+풀빌라요금</p>
                        </div>
                        <div style={{display:'flex'}}  className='chartbox'>
                          <p className='charttext'>1박</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>2+2</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>1+3</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>3</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>4</p>
                        </div>
                      </div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'10%'}} ><p>포함사항/특전</p></div>
                      <div className='chartbox' style={{width:'3%'}} ></div>
                    </div>
                    {
                       section.saleDefaultCost.map((item:any, index:any)=>{
                        return (
                          <div className="coverbox">
                            <div className="coverrow hole" style={{minHeight:'60px'}} >
                              <div style={{width:'25%'}} >
                                {
                                  item.period.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                                        <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.start}
                                          setSelectDate={(e:any)=>{ 
                                            const inputs = [...inputCost];
                                            inputs[sectionIndex].saleDefaultCost[index].period[subIndex].start = e;
                                            inputs[sectionIndex].saleDefaultCost[index].period[subIndex].end = e;
                                            setInputCost(inputs);
                                          }} 
                                        />
                                        <p style={{marginLeft:'5px'}}>~</p>
                                        <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                          setSelectDate={(e:any)=>{ 
                                            const inputs = [...inputCost];
                                            inputs[sectionIndex].saleDefaultCost[index].period[subIndex].end = e;
                                            setInputCost(inputs);
                                          }} 
                                          />
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...inputCost];
                                              copy[sectionIndex].saleDefaultCost[index].period = [...copy[sectionIndex].saleDefaultCost[index].period, {start:"", end:""}];
                                              setInputCost(copy);
                                            }}
                                          >
                                            <p>+</p>
                                          </div>
                                        </div>  
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...inputCost];
                                              copy[sectionIndex].saleDefaultCost[index].period.splice(subIndex, 1);
                                              setInputCost(copy);
                                            }}
                                          >
                                            <p>-</p>
                                          </div>
                                        </div>  
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:"center"}}>
                                <div className='checkInputCover'>
                                  <div className='checkInput'>
                                    <input className="input" type="checkbox"
                                      checked={item.preStay === 'true'}
                                      onChange={()=>{
                                        const copy = [...inputCost]; 
                                        copy[sectionIndex].saleDefaultCost[index].preStay = item.preStay === 'true' ? 'false' : 'true'; 
                                        setInputCost(copy);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div style={{width:'67%', alignItems:'center',}}>
                                {
                                  item.costByRoomType.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div key={index} style={{display:'flex'}}>
                                        <input className="inputdefault" type="text" style={{width:'14%', marginLeft:'5px'}} 
                                          value={subItem.roomType} onChange={(e)=>{
                                            const copy = [...inputCost]; 
                                            copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].roomType  = e.target.value;
                                            setInputCost(copy);}}/>
                                        {
                                          (item.costByRoomType.length > 1 && item.costByRoomType.length === subIndex + 1)
                                          ?
                                          <div className="dayBox">
                                            <div className="dayBtn"
                                              onClick={()=>{
                                                const copy = [...inputCost];
                                                copy[sectionIndex].saleDefaultCost[index].costByRoomType.splice(subIndex, 1);
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>-</p>
                                            </div>
                                          </div>  
                                          :
                                          <div className="dayBox">
                                            <div className="dayBtn"
                                              onClick={()=>{
                                                const copy = [...inputCost];
                                                copy[sectionIndex].saleDefaultCost[index].costByRoomType = [
                                                  ...copy[sectionIndex].saleDefaultCost[index].costByRoomType, 
                                                  {roomType: "", currency:"", oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}
                                                ];
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>+</p>
                                            </div>
                                          </div>  
                                        } 
                                        <div style={{width:'7%', display:'flex', justifyContent:'center'}} >
                                          <DropdownBox
                                              widthmain='95%'
                                              height='35px'
                                              selectedValue={subItem.currency}
                                              options={[
                                                { value: '선택', label: '선택' },
                                                { value: '$', label: '$' },
                                                { value: '₩', label: '₩' }
                                              ]}    
                                              handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].currency = e.target.value; setInputCost(copy);}}
                                            />
                                        </div>
                                        <div style={{width:'60%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                            value={subItem.oneDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'oneDayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                            value={subItem.twoTwoDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'twoTwoDayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                            value={subItem.oneThreeDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'oneThreeDayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                          value={subItem.threeDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'threeDayCost', inputCost, setInputCost)
                                          }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                          value={subItem.fourDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'fourDayCost', inputCost, setInputCost)
                                          }}/>
                                        </div>
                                        <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'15%', display:'flex'}} >
                                          <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                              value={subItem.notice} onChange={(e)=>{
                                                const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].notice = e.target.value; setInputCost(copy);
                                                }}/>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost]
                                    copy[sectionIndex].saleDefaultCost = [...copy[sectionIndex].saleDefaultCost, 
                                    {seasonName: `default${index+2}`, period: [{start:"", end:""}], preStay:"false", 
                                      costByRoomType: [{roomType: "", currency:"", oneDayCost : "", twoTwoDayCost : "", oneThreeDayCost : "", threeDayCost : "", fourDayCost : "", notice : ""}]}]
                                    setInputCost(copy);
                                  }}
                                >
                                  <p>+</p>
                                </div>
                              </div>  
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                    
                    <div style={{height:'1px', backgroundColor:'#BDBDBD', marginTop:'20px'}}></div>
                    {/* {
                      section.saleSeasonCost.map((item:any, index:any)=>{
                        return (
                          <div className="coverbox">
                            <div className="coverrow hole" style={{minHeight:'60px'}} >
                              <div style={{width:'25%'}} >
                              {
                                  item.period.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                                        <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.start}
                                          setSelectDate={(e:any)=>{ 
                                            const inputs = [...inputCost];
                                            inputs[sectionIndex].saleSeasonCost[index].period[subIndex].start = e;
                                            inputs[sectionIndex].saleSeasonCost[index].period[subIndex].end = e;
                                            setInputCost(inputs);
                                          }} 
                                        />
                                        <p style={{marginLeft:'5px'}}>~</p>
                                        <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                          setSelectDate={(e:any)=>{ 
                                            const inputs = [...inputCost];
                                            inputs[sectionIndex].saleSeasonCost[index].period[subIndex].end = e;
                                            setInputCost(inputs);
                                          }} 
                                          />
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...inputCost];
                                              copy[sectionIndex].saleSeasonCost[index].period = [...copy[sectionIndex].saleSeasonCost[index].period, {start:"", end:""}];
                                              setInputCost(copy);
                                            }}
                                          >
                                            <p>+</p>
                                          </div>
                                        </div>  
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...inputCost];
                                              copy[sectionIndex].saleSeasonCost[index].period.splice(subIndex, 1);
                                              setInputCost(copy);
                                            }}
                                          >
                                            <p>-</p>
                                          </div>
                                        </div>  
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:"center"}}>
                                <div className='checkInputCover'>
                                  <div className='checkInput'>
                                    <input className="input" type="checkbox"
                                      checked={item.preStay === 'true'}
                                      onChange={()=>{
                                        const copy = [...inputCost]; 
                                        copy[sectionIndex].saleSeasonCost[index].preStay = item.preStay === 'true' ? 'false' : 'true'; 
                                        setInputCost(copy);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div style={{width:'67%', alignItems:'center',}}>
                                {
                                  item.costByRoomType.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div key={index} style={{display:'flex'}}>
                                        <input className="inputdefault" type="text" style={{width:'14%', marginLeft:'5px'}} 
                                          value={subItem.roomType} onChange={(e)=>{
                                            const copy = [...inputCost]; 
                                            copy[sectionIndex].saleSeasonCost[index].costByRoomType[subIndex].roomType  = e.target.value;
                                            setInputCost(copy);}}/>
                                        {
                                          (item.costByRoomType.length > 1 && item.costByRoomType.length === subIndex + 1)
                                          ?
                                          <div className="dayBox">
                                            <div className="dayBtn"
                                              onClick={()=>{
                                                const copy = [...inputCost];
                                                copy[sectionIndex].saleSeasonCost[index].costByRoomType.splice(subIndex, 1);
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>-</p>
                                            </div>
                                          </div>  
                                          :
                                          <div className="dayBox">
                                            <div className="dayBtn"
                                              onClick={()=>{
                                                const copy = [...inputCost];
                                                copy[sectionIndex].saleSeasonCost[index].costByRoomType = [
                                                  ...copy[sectionIndex].saleSeasonCost[index].costByRoomType, 
                                                  {roomType: "", oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}
                                                ];
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>+</p>
                                            </div>
                                          </div>  
                                        } 
                                        <div style={{width:'68%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                            value={subItem.oneDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'oneDayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                            value={subItem.twoTwoDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'twoTwoDayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                            value={subItem.oneThreeDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'oneThreeDayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                          value={subItem.threeDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'threeDayCost', inputCost, setInputCost)
                                          }}/>
                                          <input className="inputdefault" type="text" style={{width:'20%', textAlign:'right'}} 
                                          value={subItem.fourDayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'fourDayCost', inputCost, setInputCost)
                                          }}/>
                                        </div>
                                        <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'15%', display:'flex'}} >
                                          <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                              value={subItem.notice} onChange={(e)=>{
                                                const copy = [...inputCost]; copy[sectionIndex].saleSeasonCost[index].costByRoomType[subIndex].notice = e.target.value; setInputCost(copy);
                                                }}/>
                                        </div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost]
                                    copy[sectionIndex].saleSeasonCost = [...copy[sectionIndex].saleSeasonCost, 
                                    {seasonName: `default${index+2}`, period: [{start:"", end:""}], preStay:"false", 
                                      costByRoomType: [{roomType: "", oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]}]
                                    setInputCost(copy);
                                  }}
                                >
                                  <p>+</p>
                                </div>
                              </div>  
                              </div>
                            </div>
                          </div>
                        )
                      })
                    } */}

                  </section>
                </div>
              )
            })
          }

          <div className='btn-box'>
            <div className="btn" 
               onClick={props.handleClose}
            >
              <p style={{color:'#333'}}>취소</p>
            </div>
            <div className="btn" style={{backgroundColor:'#5fb7ef'}}
                onClick={registerCostPost}
              >
              <p>저장</p>
            </div>
          </div>
        </>
      }
      
      
    </div>     
  )
}
