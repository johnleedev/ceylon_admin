import React, { useCallback, useState } from 'react'
import '../ModalAdd.scss'
import { TitleBox } from '../../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../../MainURL';
import { DropDownPackageType } from '../../../../DefaultData';

export default function PreHotelCost (props : any) {
	
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
      roomType: string;
      currency : string;
      dayChangeCost : string;
      dayAddCost : string;
      minimumDay : string;
      notice : string;
    }[]
    inputPackage : {
      addtionName: string;
      personCost : string;
      content : string;
    }[]
    inputSeason : {
      seasonName: string;
      periodStart:string, 
      periodEnd:string;
      minimumDay : string;
      currency: string;
      addCost : string;
      addCostAll : string;
      addCostPerson : string;
      galaDinner: string;
    }[]
    saleDefaultCost : {
      seasonName: string;
      period : {start:string, end:string}[];
      roomType: string;
      currency : string;
      dayChangeCost : string;
      dayAddCost : string;
      minimumDay : string;
      notice : string;
    }[]
  }
  
  const [openSaleContent, setOpenSaleContent] = useState<boolean>(hotelInfoData?.isCostInput === 'true' ? true : false);
  const defaultInputCostData : InputCostProps = 
    { 
      reserveType: "default",
      reservePeriod: {start:"", end:""}, 
      inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], roomType: "", currency : '₩', dayChangeCost : "", dayAddCost : "", minimumDay : "1", notice : ""}],
      inputPackage : [{addtionName :"", personCost : "", content: ""}],
      inputSeason : [{seasonName: "하이시즌", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""},
        {seasonName: "픽시즌", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""},
        {seasonName: "블랙아웃", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""}],
      saleDefaultCost : [{seasonName: "", period: [{start:"", end:""}], roomType: "", currency : '₩', dayChangeCost : "", dayAddCost : "", minimumDay : "1", notice : ""}],
    }
  const [inputCost, setInputCost] = useState<InputCostProps[]>(hotelInfoData?.isCostInput === 'true' ? hotelCostData : [defaultInputCostData]);
  
  // apply 입력된 숫자 금액으로 변경
  const handleinputDefaultCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, sectionIndex:number, index: number, name: string,
    currentState: InputCostProps[], setCurrentState: React.Dispatch<React.SetStateAction<InputCostProps[]>>
  ) => {
    const text = e.target.value;
    const copy = [...currentState];
    if (name === 'period') {
      return;
    }
    if (text === '') {
      (copy[sectionIndex].inputDefault[index] as any)[name] = ''; 
      setCurrentState(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[sectionIndex].inputDefault[index] as any)[name] = formattedNumber; 
    setCurrentState(copy);
  };
  
  // package 입력된 숫자 금액으로 변경
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

  // season 입력된 숫자 금액으로 변경
  const handleinputSeasonCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, sectionIndex:number, index: number, name: string,
    currentState: InputCostProps[], setCurrentState: React.Dispatch<React.SetStateAction<InputCostProps[]>>
  ) => {
    const text = e.target.value;
    const copy = [...currentState];
    if (name === 'period') {
      return;
    }
    if (text === '') {
      (copy[sectionIndex].inputSeason[index] as any)[name] = ''; 
      setCurrentState(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[sectionIndex].inputSeason[index] as any)[name] = formattedNumber; 
    setCurrentState(copy);
  };


  // season 박수 x 추가요금을 합계에 입력
  const handleAddCostMultiplyDay = (
    e: string, sectionIndex:number, index: number
  ) => {
    const text = e;
    const copy = [...inputCost]; 
    copy[sectionIndex].inputSeason[index].minimumDay = text;
    const inputTextNumberOnly = parseInt(text.replace(/[^0-9]/g, ''), 10);
    const addCostCopy = copy[sectionIndex].inputSeason[index].addCost;
    const addCosttNumberOnly = parseInt(addCostCopy.replace(/[^0-9]/g, ''), 10);
    const multiplyCost = inputTextNumberOnly * addCosttNumberOnly;
    const dividePersonCost = (inputTextNumberOnly * addCosttNumberOnly) / 2;
    const formattedMultiplyCost = multiplyCost.toLocaleString('en-US');
    const formattedDividePersonCost = Math.floor(dividePersonCost).toLocaleString('en-US');
    copy[sectionIndex].inputSeason[index].addCostAll = formattedMultiplyCost;
    copy[sectionIndex].inputSeason[index].addCostPerson = formattedDividePersonCost;
    setInputCost(copy);
  };
  
  // 입금가 판매가 적용
  const handleApplySaleCost = () => {
    setOpenSaleContent(true);
    const chargeNumber = Number(commission[0]?.charge?.replace(/[,|%]/g, '')) || 0;
    const updatedinputCost = inputCost.map((cost: any) => {
        const defaultCostCopy = cost.inputDefault.map((def: any) => {
            const dayChangeCostNumber = Number(def.dayChangeCost?.replace(/,/g, '')) || 0;
            const updatedDayChangeCost = dayChangeCostNumber === 0 ? '' : (dayChangeCostNumber + chargeNumber).toLocaleString();
            const dayAddCostNumber = Number(def.dayAddCost?.replace(/,/g, '')) || 0;
            const updatedDayAddCost = dayAddCostNumber === 0 ? '' : (dayAddCostNumber + chargeNumber).toLocaleString();
            return {
                ...def,
                dayChangeCost: updatedDayChangeCost,
                dayAddCost: updatedDayAddCost,
            };
        });
        // let saleCost = defaultCostCopy.flatMap((def: any) => {
        //     return cost.inputPackage.map((season: any) => {
        //         const addCostPersonNumber = Number(season.addCostPerson?.replace(/,/g, '')) || 0;
        //         const galaDinnerNumber = Number(season.galaDinner?.replace(/,/g, '')) || 0;
        //         const resultA = addCostPersonNumber + galaDinnerNumber;

        //         const resultB = Number(resultA) === 0 ? 0 : (Number(def.dayChangeCost?.replace(/,/g, '')) + resultA);
        //         const resultBFormatted = resultB.toLocaleString();

        //         const resultC = Number(resultA) === 0 ? 0 : (Number(def.dayAddCost?.replace(/,/g, '')) + resultA);
        //         const resultCFormatted = resultC.toLocaleString();

        //         return {
        //             seasonName: season.seasonName,
        //             period: season.period,
        //             roomType: def.roomType,
        //             currency: def.currency,
        //             dayChangeCost: resultBFormatted,
        //             dayAddCost: resultCFormatted,
        //             minimumDay: season.minimumDay,
        //             notice: "",
        //         };
        //     });
        // });
        // saleCost = saleCost.sort((a: any, b: any) => {
        //     if (a.roomType < b.roomType) return -1;
        //     if (a.roomType > b.roomType) return 1;
        //     return 0;
        // });

        return {
            ...cost,
            saleDefaultCost: defaultCostCopy,
            // saleSeasonCost: saleCost
        };
    });
    console.log(updatedinputCost);
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
        <h1>{props.selectCostType === '선투숙' && '선투숙리조트'}</h1>
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
                          const copy = [...inputCost, 
                            { 
                              reserveType: "default",
                              reservePeriod: {start:"", end:""}, 
                              inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], roomType: "", currency : '₩', dayChangeCost : "", dayAddCost : "", minimumDay : "1", notice : ""}],
                              inputPackage : [{addtionName :"", personCost : "", content: ""}],
                              inputSeason : [{seasonName: "하이시즌", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""},
                                {seasonName: "픽시즌", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""},
                                {seasonName: "블랙아웃", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""}],
                              saleDefaultCost : [{seasonName: "", period: [{start:"", end:""}], roomType: "", currency : '₩', dayChangeCost : "", dayAddCost : "", minimumDay : "1", notice : ""}],
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
                  <div className='chartbox' style={{width:'25%'}} ><p>기간</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'10%'}} ><p>룸타입</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'7%'}} ><p>미니멈/박</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'7%'}} ><p>화폐</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'20%'}}>
                    <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                      <p>1박요금</p>
                    </div>
                    <div style={{display:'flex'}}  className='chartbox'>
                      <p className='charttext'>변경</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>추가</p>
                    </div>
                  </div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'27%'}} ><p>포함사항/특전(기간별)</p></div>
                  <div className='chartbox' style={{width:'3%'}} ></div>
                </div>
               {/* 기본요금 ----------------------------------------------------------------------------------------------------------------- */}
                {
                  section.inputDefault.map((item:any, index:any)=>{
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
                          <div style={{width:'10%', display:'flex', alignItems:'center',}}>
                            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                              value={item.roomType} onChange={(e)=>{
                                const copy = [...inputCost]; 
                                copy[sectionIndex].inputDefault[index].roomType = e.target.value; setInputCost(copy);
                                }}/>
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
                              handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].minimumDay = e.target.value; setInputCost(copy);}}
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
                                handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].currency = e.target.value; setInputCost(copy);}}
                              />
                          </div>
                          <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right'}} 
                              value={item.dayChangeCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'dayChangeCost', inputCost, setInputCost)
                              }}/>
                            <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right'}} 
                              value={item.dayAddCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'dayAddCost', inputCost, setInputCost)
                              }}/>
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'27%', display:'flex'}} >
                            <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                value={item.notice} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].inputDefault[index].notice = e.target.value; setInputCost(copy);}}/>
                          </div>
                          <div style={{width:'3%', display:'flex'}} >
                          <div className="dayBox">
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost];
                                copy[sectionIndex].inputDefault = [...copy[sectionIndex].inputDefault, 
                                  {seasonName: `default${index+2}`, period: [{start:"", end:""}], roomType: "", currency : "₩", dayChangeCost : "", dayAddCost : "", minimumDay : "1", notice : ""}
                                ]
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
                {/* 패키지 ----------------------------------------------------------------------------------------------------------------- */}      
                <div style={{height:'1px', backgroundColor:'#BDBDBD', marginTop:'20px'}}></div>
                <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                  <div className='chartbox' style={{width:'19%'}} ><p>추가사항</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'10%'}} ><p>1인 요금</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'71%'}} ><p>내용</p></div>
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
                {/* 시즌요금 ----------------------------------------------------------------------------------------------------------------- */}
                <div style={{height:'1px', backgroundColor:'#BDBDBD', marginTop:'20px'}}></div>
                <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
                  <div className='chartbox' style={{width:'8%'}} ><p>성수기 정책</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'20%'}} ><p>기간</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'6%'}} ><p>화폐</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'15%'}} ><p>추가</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'6%'}} ><p>미니멈</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'15%'}} ><p>총액</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'15%'}} ><p>1인</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'15%'}} ><p>갈라디너</p></div>
                </div>
                {
                  section.inputSeason.map((item:any, index:any)=>{
                    return (
                      <div className="coverbox">
                        <div className="coverrow hole" style={{minHeight:'60px'}} >
                          <div style={{width:'8%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <p>{item.seasonName}</p>
                          </div>
                          <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <DateBoxNum width='120px' subWidth='120px' right={5} date={item.periodStart}
                              setSelectDate={(e:any)=>{ 
                                const inputs = [...inputCost];
                                inputs[sectionIndex].inputSeason[index].periodStart = e;
                                inputs[sectionIndex].inputSeason[index].periodEnd = e;
                                setInputCost(inputs);
                              }} 
                            />
                            <p style={{marginLeft:'5px'}}>~</p>
                            <DateBoxNum width='120px' subWidth='120px' right={5} date={item.periodEnd}
                              setSelectDate={(e:any)=>{ 
                                const inputs = [...inputCost];
                                inputs[sectionIndex].inputSeason[index].periodEnd = e;
                                setInputCost(inputs);
                              }} 
                            />
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'6%', display:'flex'}} >
                            <DropdownBox
                              widthmain='95%'
                              height='35px'
                              selectedValue={item.currency}
                              options={[
                                { value: '선택', label: '선택' },
                                { value: '$', label: '$' },
                                { value: '₩', label: '₩' }
                              ]}    
                              handleChange={(e)=>{
                                const copy = [...inputCost]; 
                                copy[sectionIndex].inputSeason[index].currency = e.target.value; 
                                setInputCost(copy);
                              }}
                            />  
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <input className="inputdefault" style={{width:'15%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                            value={item.addCost} onChange={(e)=>{
                                handleinputSeasonCostChange(e, sectionIndex, index, 'addCost', inputCost, setInputCost)
                              }}/>
                           <div style={{width:'6%', display:'flex'}} >
                            <DropdownBox
                              widthmain='95%'
                              height='35px'
                              selectedValue={item.minimumDay}
                              options={[
                                { value: '1박', label: '1박' },
                                { value: '2박', label: '2박' },
                                { value: '3박', label: '3박' },
                                { value: '4박', label: '4박' },
                                { value: '5박', label: '5박' },
                                { value: '6박', label: '6박' },
                                { value: '7박', label: '7박' },
                                { value: '8박', label: '8박' },
                                { value: '9박', label: '9박' },
                                { value: '10박', label: '10박' }
                              ]}    
                              handleChange={(e)=>{
                                handleAddCostMultiplyDay(e.target.value, sectionIndex, index);
                              }}
                            />  
                          </div>    
                          <input className="inputdefault" style={{width:'15%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                            value={item.addCostAll} onChange={(e)=>{
                                handleinputSeasonCostChange(e, sectionIndex, index, 'addCostAll', inputCost, setInputCost)
                              }}/>
                          <input className="inputdefault" style={{width:'15%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                            value={item.addCostPerson} onChange={(e)=>{
                                handleinputSeasonCostChange(e, sectionIndex, index, 'addCostPerson', inputCost, setInputCost)
                              }}/>
                          <input className="inputdefault" style={{width:'15%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                            value={item.galaDinner} onChange={(e)=>{
                                handleinputSeasonCostChange(e, sectionIndex, index, 'galaDinner', inputCost, setInputCost)
                              }}/>
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
                      <div className='chartbox' style={{width:'25%'}} ><p>기간</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'10%'}} ><p>룸타입</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'7%'}} ><p>미니멈/박</p></div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'7%'}} ><p>화폐</p></div>
                      <div className="chart-divider"></div>
                      <div style={{width:'20%'}}>
                        <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                          <p>1박요금</p>
                        </div>
                        <div style={{display:'flex'}}  className='chartbox'>
                          <p className='charttext'>변경</p>
                          <div className="chart-textdivider"></div>
                          <p className='charttext'>추가</p>
                        </div>
                      </div>
                      <div className="chart-divider"></div>
                      <div className='chartbox' style={{width:'27%'}} ><p>포함사항/특전(기간별)</p></div>
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
                              <div style={{width:'10%', display:'flex', alignItems:'center',}}>
                                <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
                                  value={item.roomType} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].roomType = e.target.value; setInputCost(copy);}}/>
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
                                  handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].minimumDay = e.target.value; setInputCost(copy);}}
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
                                    handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].currency = e.target.value; setInputCost(copy);}}
                                  />
                              </div>
                              <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right'}} 
                                  value={item.dayChangeCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'dayChangeCost', inputCost, setInputCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right'}} 
                                  value={item.dayAddCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'dayAddCost', inputCost, setInputCost)
                                  }}/>
                              </div>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <div style={{width:'27%', display:'flex'}} >
                                <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                    value={item.notice} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].saleDefaultCost[index].notice = e.target.value; setInputCost(copy);}}/>
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              {/* <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost];
                                    copy[sectionIndex].saleDefaultCost = [...copy[sectionIndex].saleDefaultCost, 
                                      {seasonName: "default1", period: [{start:"", end:""}], roomType: "", currency : "₩", dayChangeCost : "0", dayAddCost : "0", minimumDay : "1", notice : ""}
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
