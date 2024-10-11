import React, { useCallback, useState } from 'react'
import '../ModalAdd.scss'
import { TitleBox } from '../../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../../MainURL';
import { DropDownPackageType } from '../../../../DefaultData';

export default function PerDayCost (props : any) {
	
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
  const [commission, setCommission] = useState(hotelInfoData?.commission ? JSON.parse(hotelInfoData.commission) : [{title:"수수료(1인)", select:"select", charge: "0"}]);
  
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
  
  
  // 입금가 & 판ㅐ가 ---------------------------------------------------------------------------------------------------------------------------------------------------
  
  interface InputCostProps {
    reserveType: string;
    reservePeriod : {start:string, end:string};
    inputDefault : {
      seasonName: string;
      period : {start:string, end:string}[];
      costByRoomType : {
        roomType: string;
        currency : string;
        dayStayCost : string;
        dayStayCostAll : string;
        dayPersonCost : string;
        minimumDay : string;
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
      addtionName: string;
      period : {start:string, end:string}[];
      costByRoomType : {
        roomType: string;
        currency : string;
        dayStayCost : string;
        dayStayCostAll : string;
        dayPersonCost : string;
        minimumDay : string;
        notice : string;
      }[]
    }[]
  }
  
  const [openSaleContent, setOpenSaleContent] = useState<boolean>(hotelInfoData?.isCostInput === 'true' ? true : false);
  const defaultInputCostData : InputCostProps = 
    { 
      reserveType: "default",
      reservePeriod: {start:"", end:""}, 
      inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], 
                      costByRoomType: [{roomType: "", currency : '₩', dayStayCost : "", dayStayCostAll:"", dayPersonCost : "", minimumDay : "1", notice : ""}]}],
      inputPackage : [{addtionName :"", personCost : "", content: ""}],
      saleDefaultCost : [{seasonName: "", addtionName:"", period: [{start:"", end:""}], 
                      costByRoomType: [{roomType: "", currency : '₩', dayStayCost : "", dayStayCostAll:"", dayPersonCost : "", minimumDay : "1", notice : ""}]}],
    }
  const [inputCost, setInputCost] = useState<InputCostProps[]>(hotelInfoData?.isCostInput === 'true' ? hotelCostData : [defaultInputCostData]);
  
  // apply 입력된 숫자 금액으로 변경
  const handleinputDefaultCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, sectionIndex:number, index: number, subIndex:number, name: string,
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
  const handleAddCostMultiplyDay = (
    e: string, sectionIndex:number, index: number, subIndex: number
  ) => {
    const text = e;
    const copy = [...inputCost]; 
    copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].minimumDay = text;

    const inputTextNumberOnly = parseInt(text.replace(/[^0-9]/g, ''), 10);
    const addCostCopy = copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].dayStayCost;
    const addCostNumberOnly = parseInt(addCostCopy.replace(/[^0-9]/g, ''), 10);
    const multiplyCost = inputTextNumberOnly * addCostNumberOnly;
    const dividePersonCost = (inputTextNumberOnly * addCostNumberOnly) / 2;
    const formattedMultiplyCost = multiplyCost.toLocaleString('en-US');
    const formattedDividePersonCost = Math.floor(dividePersonCost).toLocaleString('en-US');
    copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].dayStayCostAll = formattedMultiplyCost;
    copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].dayPersonCost = formattedDividePersonCost;
    setInputCost(copy);
  };
  
  // 입금가 판매가 적용
  const handleApplySaleCost = () => {
    setOpenSaleContent(true);
    const chargeNumber = Number(commission[0]?.charge?.replace(/[,|%]/g, '')) || 0;
    const updatedinputCost = inputCost.map((cost: any) => {
        const defaultCostCopy = cost.inputDefault.map((def: any) => {
            const updatedCostByRoomType = def.costByRoomType.map((roomType: any) => {
                const dayPersonCostNumber = Number(roomType.dayPersonCost?.replace(/,/g, '')) || 0;
                const updatedDayPersonCost = dayPersonCostNumber === 0 ? '' : (dayPersonCostNumber + chargeNumber).toLocaleString();
                return {
                    ...roomType,
                    dayPersonCost: updatedDayPersonCost
                };
            });

            return {
                ...def,
                costByRoomType: updatedCostByRoomType,
            };
        });

        return {
            ...cost,
            saleDefaultCost: defaultCostCopy,
        };
    });
    setInputCost(updatedinputCost);
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
          reserveType: item.reserveType,
          reservePeriod : JSON.stringify(item.reservePeriod),
          inputDefault :  JSON.stringify(item.inputDefault),
          inputPackage : JSON.stringify(item.inputPackage),
          saleDefaultCost : JSON.stringify(item.saleDefaultCost),
        });
        console.log(response.data);
        alert(response.data)
      } catch (error) {
        console.error(`에러 발생 - 단어: ${item}`, error);
      }
    }
    
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
        <h1>{props.selectCostType === '박당' && '박당요금'}</h1>
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
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === '기본호텔'}
                  onChange={()=>{setNotes('기본호텔')}}
                />
              </div>
              <p>기본호텔</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === 'GSA'}
                  onChange={()=>{setNotes('GSA')}}
                />
              </div>
              <p>GSA</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === '추천호텔'}
                  onChange={()=>{setNotes('추천호텔')}}
                />
              </div>
              <p>추천호텔</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={notes === '럭셔리호텔'}
                  onChange={()=>{setNotes('럭셔리호텔')}}
                />
              </div>
              <p>럭셔리호텔</p>
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
                          copy[index].charge ='100,000';
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
                          const copy = [...inputCost];
                          const previousIndex = copy.length - 1;
                          const previousCost = copy[previousIndex];
                          const result = [...copy,
                            { 
                              reserveType: "default",
                              reservePeriod: {start:"", end:""}, 
                              inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], 
                                              costByRoomType: [{roomType: "", currency : '₩', dayStayCost : "", dayStayCostAll:"", dayPersonCost : "", minimumDay : "1", notice : ""}]}],
                              inputPackage : [{addtionName :"", personCost : "", content: ""}],
                              saleDefaultCost : [{seasonName: "", addtionName:"", period: [{start:"", end:""}], 
                                              costByRoomType: [{roomType: "", currency : '₩', dayStayCost : "", dayStayCostAll:"", dayPersonCost : "", minimumDay : "1", notice : ""}]}]
                            }
                          ];    
                          setInputCost(result);
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
                  <div className='chartbox' style={{width:'24%'}} ><p>기간</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'14%'}} ><p>룸타입</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'7%'}} ><p>미니멈/박</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'7%'}} ><p>화폐</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'25%'}}>
                    <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                      <p>요금</p>
                    </div>
                    <div style={{display:'flex'}}  className='chartbox'>
                      <p className='charttext'>1박</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>합계</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>1인</p>
                    </div>
                  </div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'20%'}} ><p>안내사항</p></div>
                  <div className='chartbox' style={{width:'3%'}} ></div>
                </div>
        
                {
                  section.inputDefault.map((item:any, index:any)=>{
                    return (
                      <div className="coverbox">
                        <div className="coverrow hole" style={{minHeight:'60px'}} >
                          <div style={{width:'24%'}} >
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
                          <div style={{width:'74%', alignItems:'center',}}>
                            {
                              item.costByRoomType.map((subItem:any, subIndex:any)=>{
                                return (
                                  <div key={subIndex} style={{display:'flex'}}>
                                    <div style={{width:'19%', display:'flex', alignItems:'center',}}>
                                      <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                        value={subItem.roomType} onChange={(e)=>{
                                          const copy = [...inputCost]; 
                                          copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].roomType = e.target.value; setInputCost(copy);
                                          }}/>
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
                                              {roomType: "", currency : '₩', dayStayCost : "", dayStayCostAll:"", dayPersonCost : "", minimumDay : "1", notice : ""}
                                            );
                                            setInputCost(copy);
                                          }}
                                        >
                                          <p>+</p>
                                        </div>
                                      </div>    
                                    </div>
                                    <div style={{width:'10%', display:'flex', alignItems:'center',}}>
                                      <DropdownBox
                                        widthmain='95%'
                                        height='35px'
                                        selectedValue={subItem.minimumDay}
                                        options={[
                                          { value: '1박', label: '1박' },
                                          { value: '2박', label: '2박' },
                                          { value: '3박', label: '3박' },
                                          { value: '4박', label: '4박' },
                                          { value: '5박', label: '5박' }
                                        ]}    
                                        handleChange={(e)=>{
                                          handleAddCostMultiplyDay(e.target.value, sectionIndex, index, subIndex);
                                        }}
                                      />
                                    </div>
                                    <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                    <div style={{width:'10%', display:'flex', justifyContent:'center'}} >
                                      <DropdownBox
                                          widthmain='95%'
                                          height='35px'
                                          selectedValue={subItem.currency}
                                          options={[
                                            { value: '$', label: '$' },
                                            { value: '₩', label: '₩' }
                                          ]}    
                                          handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].currency = e.target.value; setInputCost(copy);}}
                                        />
                                    </div>
                                    <div style={{width:'34%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                      <input className="inputdefault" type="text" style={{width:'33%', textAlign:'right'}} 
                                        value={subItem.dayStayCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'dayStayCost', inputCost, setInputCost)
                                        }}
                                        onKeyDown={(e)=>{
                                          if (e.key === 'Enter') {handleAddCostMultiplyDay(`${subItem.minimumDay}박`, sectionIndex, index, subIndex);}
                                        }}
                                        />
                                      <input className="inputdefault" type="text" style={{width:'33%', textAlign:'right'}} 
                                        value={subItem.dayStayCostAll} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'dayStayCostAll', inputCost, setInputCost)
                                        }}/>
                                      <input className="inputdefault" type="text" style={{width:'33%', textAlign:'right'}} 
                                        value={subItem.dayPersonCost} onChange={(e)=>{
                                          handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'dayPersonCost', inputCost, setInputCost)
                                        }}/>                         
                                    </div>
                                    <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                    <div style={{width:'27%', display:'flex'}} >
                                      <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                          value={subItem.notice} 
                                          onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].costByRoomType[subIndex].notice = e.target.value; setInputCost(copy);}}
                                          />
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
                                      costByRoomType: previousCostByRoomType.map((item: any) => ({
                                        roomType: item.roomType, 
                                        currency: "",
                                        dayStayCost : "", 
                                        dayStayCostAll:"", 
                                        dayPersonCost : "", 
                                        minimumDay : "1", 
                                        notice : ""
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
               <div className="bottombar"></div>
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
                      <div className='chartbox' style={{width:'24%'}} ><p>기간</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'14%'}} ><p>룸타입</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'7%'}} ><p>미니멈/박</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'7%'}} ><p>화폐</p></div>
                      <div className="chart-divider"></div>
                      <div style={{width:'25%'}}>
                        <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                          <p>요금</p>
                        </div>
                        <div style={{display:'flex'}}  className='chartbox'>
                          <p className='charttext'>1박</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>합계</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>1인</p>
                        </div>
                      </div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'20%'}} ><p>포함사항/특전(기간별)</p></div>
                      <div className='chartbox' style={{width:'3%'}} ></div>
                    </div>
                    {
                      section.saleDefaultCost.map((item:any, index:any)=>{
                        return (
                          <div className="coverbox">
                            <div className="coverrow hole" style={{minHeight:'60px'}} >
                              <div style={{width:'24%'}} >
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
                              <div style={{width:'74%', alignItems:'center',}}>
                                {
                                  item.costByRoomType.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div key={subIndex} style={{display:'flex'}}>
                                        <div style={{width:'19%', display:'flex', alignItems:'center',}}>
                                          <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                            value={subItem.roomType} 
                                            onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].roomType = e.target.value; setInputCost(copy);}}
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
                                                  {roomType: "", currency : '₩', dayStayCost : "", dayStayCostAll:"", dayPersonCost : "", minimumDay : "1", notice : ""}
                                                );
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>+</p>
                                            </div>
                                          </div>  
                                        </div>
                                        <div style={{width:'10%', display:'flex', alignItems:'center',}}>
                                          <DropdownBox
                                            widthmain='95%'
                                            height='35px'
                                            selectedValue={subItem.minimumDay}
                                            options={[
                                              { value: '1박', label: '1박' },
                                              { value: '2박', label: '2박' },
                                              { value: '3박', label: '3박' },
                                              { value: '4박', label: '4박' },
                                              { value: '5박', label: '5박' }
                                            ]}    
                                            handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].minimumDay = e.target.value; setInputCost(copy);}}
                                          />
                                        </div>
                                        <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'10%', display:'flex', justifyContent:'center'}} >
                                          <DropdownBox
                                              widthmain='95%'
                                              height='35px'
                                              selectedValue={subItem.currency}
                                              options={[
                                                { value: '$', label: '$' },
                                                { value: '₩', label: '₩' }
                                              ]}    
                                              handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].currency = e.target.value; setInputCost(copy);}}
                                            />
                                        </div>
                                        <div style={{width:'34%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                          <input className="inputdefault" type="text" style={{width:'33%', textAlign:'right'}} 
                                            value={subItem.dayStayCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'dayStayCost', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'33%', textAlign:'right'}} 
                                            value={subItem.dayStayCostAll} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'dayStayCostAll', inputCost, setInputCost)
                                            }}/>
                                          <input className="inputdefault" type="text" style={{width:'33%', textAlign:'right'}} 
                                            value={subItem.dayPersonCost} onChange={(e)=>{
                                              handleinputDefaultCostChange(e, sectionIndex, index, subIndex, 'dayPersonCost', inputCost, setInputCost)
                                            }}/>  
                                        </div>
                                        <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                                        <div style={{width:'27%', display:'flex'}} >
                                          <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                              value={subItem.notice} 
                                              onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].costByRoomType[subIndex].notice = e.target.value; setInputCost(copy);}}
                                              />
                                        </div>

                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              {/* <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost];
                                    copy[sectionIndex].saleDefaultCost = [...copy[sectionIndex].saleDefaultCost, 

                                      {
                                        seasonName: "default1", period: [{start:"", end:""}], 
                                        costByRoomType:[{roomType: "", currency : "₩", dayStayCost : "0", dayPersonCost : "0", minimumDay : "1", notice : ""}]
                                      }
                                      ]
                                    setInputCost(copy);
                                  }}
                                >
                                  <p>+</p>
                                </div>
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost];
                                    copy[sectionIndex].saleDefaultCost.splice(index, 1);
                                    setInputCost(copy);
                                  }}
                                >
                                  <p>-</p>
                                </div>
                              </div>   */}
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
                              <div style={{width:'10%', display:'flex', alignItems:'center',}}>
                                <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                  value={item.roomType} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleSeasonCost[index].roomType = e.target.value; setInputCost(copy);}}/>
                              </div>
                              <div style={{width:'7%', display:'flex', alignItems:'center',}}>
                                <DropdownBox
                                  widthmain='95%'
                                  height='35px'
                                  selectedValue={item.minimumDay}
                                  options={[
                                    { value: '1박', label: '1박' },
                                    { value: '2박', label: '2박' },
                                    { value: '3박', label: '3박' },
                                    { value: '4박', label: '4박' },
                                    { value: '5박', label: '5박' }
                                  ]}    
                                  handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleSeasonCost[index].minimumDay = e.target.value; setInputCost(copy);}}
                                />
                              </div>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <div style={{width:'7%', display:'flex', justifyContent:'center'}} >
                                <DropdownBox
                                    widthmain='95%'
                                    height='35px'
                                    selectedValue={item.currency}
                                    options={[
                                      { value: '$', label: '$' },
                                      { value: '₩', label: '₩' }
                                    ]}    
                                    handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleSeasonCost[index].currency = e.target.value; setInputCost(copy);}}
                                  />
                              </div>
                              <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right'}} 
                                  value={item.dayStayCost} onChange={(e)=>{
                                    handleinputPackageCostChange(e, sectionIndex, index, 'dayStayCost', inputCost, setInputCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right'}} 
                                  value={item.dayPersonCost} onChange={(e)=>{
                                    handleinputPackageCostChange(e, sectionIndex, index, 'dayPersonCost', inputCost, setInputCost)
                                  }}/>
                              </div>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <div style={{width:'27%', display:'flex'}} >
                                <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                    value={item.notice} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleSeasonCost[index].notice = e.target.value; setInputCost(copy);}}/>
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost,
                                      {seasonName: `default${index+1}`, period: [{start:"", end:""}], roomType: "", currency : '₩', dayStayCost : "0", dayPersonCost : "0", minimumDay : "1", notice : ""}
                                    ];
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
