import React, { useCallback, useState } from 'react'
import '../ModalAdd.scss'
import { TitleBox } from '../../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../../MainURL';



export default function FullVillaCost (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const hotelInfoData = props.hotelInfoData;
  const hotelCostData = props.hotelCostData;

  interface InputCostProps {
    reservePeriod : {start:string, end:string};
    default : {
      seasonName: string;
      period : {start:string, end:string}[];
      preStay : string;
      roomType: string[];
      oneDayCost : string;
      twoTwoDayCost : string;
      oneThreeDayCost : string;
      threeDayCost : string;
      fourDayCost : string;
      notice : string;
    }[]
    season : {
      seasonName: string;
      period : {start:string, end:string}[];
      minimumDay : string;
      currency : string;
      addCost : string;
      addCostAll : string;
      addCostPerson : string;
      galaDinner : string;
    }[]
    saleCost : {
      seasonName: string;
      period : {start:string, end:string}[];
      preStay : string;
      roomType: string[];
      oneDayCost : string;
      twoTwoDayCost : string;
      oneThreeDayCost : string;
      threeDayCost : string;
      fourDayCost : string;
      notice : string;
    }[]
  }   


  const [isViewSaleCost, setIsViewSaleCost] = useState(hotelCostData?.isViewSaleCost ?? '');
  const [notes, setNotes] = useState(hotelCostData?.notes ?? '');
  const [notesDetail, setNotesDetail] = useState(hotelCostData?.notesDetail ?? '');
  const [landBenefit, setLandBenefit] = useState(hotelCostData?.landBenefit ?? '');
  const [productType, setProductType] = useState(hotelCostData?.productType ?? '');
  const [applyCurrency, setApplyCurrency] = useState(hotelCostData?.applyCurrency ?? '₩');
  const [commission, setCommission] = useState(
    hotelCostData?.commission
    ? JSON.parse(hotelCostData?.commission)
    : [{title:"표준수수료", select:"select", charge:"0"},{title:"기본네고", select:"select", charge:"0"},{title:"특별네고", select:"select", charge:"0"}]
  );
  const [openSaleContent, setOpenSaleContent] = useState<boolean>(hotelCostData?.inputState === 'true' ? true : false);

  const defaultInputCostData: InputCostProps = 
    { reservePeriod: {start:"", end:""}, 
      default : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                  oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}],
      season : [{seasonName :"하이시즌", period: [{start:"", end:""}],  minimumDay : "1", currency : "₩", 
                  addCost : "0", addCostAll : "0", addCostPerson : "0", galaDinner : "0"},
                {seasonName :"픽시즌", period: [{start:"", end:""}],   minimumDay : "1", currency : "₩", 
                  addCost : "0", addCostAll : "0", addCostPerson : "0", galaDinner : "0"},
                {seasonName :"블랙아웃", period: [{start:"", end:""}],  minimumDay : "1", currency : "₩", 
                  addCost : "0", addCostAll : "0", addCostPerson : "0", galaDinner : "0"}],
      saleCost : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                  oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]
    }
  const [inputCost, setInputCost] = useState<InputCostProps[]>(hotelCostData?.inputCost ? JSON.parse(hotelCostData?.inputCost) : [defaultInputCostData]);
  const [saleCost, setSaleCost] = useState<InputCostProps[]>(hotelCostData?.saleCost ? JSON.parse(hotelCostData.saleCost) : []);
  

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
      (copy[sectionIndex].default[index] as any)[name] = ''; 
      setCurrentState(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[sectionIndex].default[index] as any)[name] = formattedNumber; 
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
      (copy[sectionIndex].season[index] as any)[name] = ''; 
      setCurrentState(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[sectionIndex].season[index] as any)[name] = formattedNumber; 
    setCurrentState(copy);
  };
  
  // 화폐 적용 함수
  const handleApplyCurrency = (symbol : string) => {
    setApplyCurrency(symbol);
    const copy = [...inputCost]
    const updatedinputCost = copy.map(cost => ({
      ...cost, 
      default: cost.default.map(def => ({...def, currency: symbol})),
      season: cost.season.map(seasonItem => ({...seasonItem, currency: symbol}))
    }));
    setInputCost(updatedinputCost);
  };

    
  // 입금가 판매가 적용
  const handleApplySaleCost = () => {
    setOpenSaleContent(true);
    const chargeNumber = [0, 1, 2].reduce((sum, index) => {
        return sum + (Number(commission[index]?.charge.replace(/,/g, '')) || 0);
    }, 0);
    const updateCostValues = (cost: any, additionalCost: number) => {
        const oneDayCostNumber = Number(cost.oneDayCost?.replace(/,/g, '')) || 0;
        const updatedOneDayCost = (oneDayCostNumber + additionalCost).toLocaleString();
        const twoTwoDayCostNumber = Number(cost.twoTwoDayCost?.replace(/,/g, '')) || 0;
        const updatedTwoTwoDayCost = (twoTwoDayCostNumber + additionalCost).toLocaleString();
        const oneThreeDayCostNumber = Number(cost.oneThreeDayCost?.replace(/,/g, '')) || 0;
        const updatedOneThreeDayCost = (oneThreeDayCostNumber + additionalCost).toLocaleString();
        const threeDayCostNumber = Number(cost.threeDayCost?.replace(/,/g, '')) || 0;
        const updatedThreeDayCost = (threeDayCostNumber + additionalCost).toLocaleString();
        const fourDayCostNumber = Number(cost.fourDayCost?.replace(/,/g, '')) || 0;
        const updatedFourDayCost = (fourDayCostNumber + additionalCost).toLocaleString();
        return {
            ...cost,
            oneDayCost: updatedOneDayCost,
            twoTwoDayCost: updatedTwoTwoDayCost,
            oneThreeDayCost: updatedOneThreeDayCost,
            threeDayCost: updatedThreeDayCost,
            fourDayCost: updatedFourDayCost
        };
    };
    const updatedInputCost = inputCost.map((cost: any) => {
        const defaultCostCopy = cost.default.map((def: any) => updateCostValues(def, chargeNumber));
        let saleCostCopy = defaultCostCopy.flatMap((def: any) => {
            return cost.season.map((season: any) => {
                const addCostPersonNumber = Number(season.addCostPerson?.replace(/,/g, '')) || 0;
                const galaDinnerNumber = Number(season.galaDinner?.replace(/,/g, '')) || 0;
                const resultA = addCostPersonNumber + galaDinnerNumber;
                const resultB = (Number(def.oneDayCost?.replace(/,/g, '')) + resultA).toLocaleString();
                const resultC = (Number(def.twoTwoDayCost?.replace(/,/g, '')) + resultA).toLocaleString();
                const resultD = (Number(def.oneThreeDayCost?.replace(/,/g, '')) + resultA).toLocaleString();
                const resultE = (Number(def.threeDayCost?.replace(/,/g, '')) + resultA).toLocaleString();
                const resultF = (Number(def.fourDayCost?.replace(/,/g, '')) + resultA).toLocaleString();
                return {
                    seasonName: season.seasonName,
                    period: season.period,
                    roomType: def.roomType,
                    currency: def.currency,
                    oneDayCost: resultB,
                    twoTwoDayCost: resultC,
                    oneThreeDayCost: resultD,
                    threeDayCost: resultE,
                    fourDayCost: resultF,
                    minimumDay: season.minimumDay,
                    notice: "",
                };
            });
        });
        saleCostCopy = saleCostCopy.sort((a: any, b: any) => {
            if (a.roomType < b.roomType) return -1;
            if (a.roomType > b.roomType) return 1;
            return 0;
        });
        return {
            ...cost,
            default: defaultCostCopy,
            saleCost: saleCostCopy
        };
    });
    setSaleCost(updatedInputCost);
  };



  // 입금가 판매가 초기화
  const handleApplySaleCostReset = () => {
    setInputCost([defaultInputCostData]);
    setSaleCost([]);
    setOpenSaleContent(false);
    setCommission([
      {title:"표준수수료", select:"select", charge: "0"},
      {title:"기본네고", select:"select", charge: "0"},
      {title:"특별네고", select:"select", charge: "0"}
    ]);
  };


   // 저장 함수 ----------------------------------------------
  const registerPost = async () => {
    const getParams = {
      postId :  hotelInfoData.id, 
      selectCostType : props.selectCostType,
      locationDetail : props.locationDetail,
      landCompany : props.landCompany,
      isViewSaleCost : isViewSaleCost,
      hotelNameKo: hotelInfoData.hotelNameKo, 
      hotelNameEn : hotelInfoData.hotelNameEn,
      notes : notes,
      notesDetail: notesDetail,
      landBenefit : landBenefit,
      productType : productType,
      applyCurrency : applyCurrency,
      commission : JSON.stringify(commission),
      inputCost: JSON.stringify(inputCost),
      saleCost: JSON.stringify(saleCost),
    }

    axios
      .post(`${MainURL}/producthotel/registerhotelcost`, getParams)
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
              <p>₩(원)</p>
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
                    options={applyCurrency === 'won' ? wonOption : dollarOption} 
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
                        console.log('section.reservePeriod.start', section);
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
                          const copy = [...inputCost, { reservePeriod: {start:"", end:""}, 
                            default : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                                        oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}],
                            season : [{seasonName :"하이시즌", period: [{start:"", end:""}],  minimumDay : "1", currency : "₩", 
                                        addCost : "0", addCostAll : "0", addCostPerson : "0", galaDinner : "0"},
                                      {seasonName :"픽시즌", period: [{start:"", end:""}],   minimumDay : "1", currency : "₩", 
                                        addCost : "0", addCostAll : "0", addCostPerson : "0", galaDinner : "0"},
                                      {seasonName :"블랙아웃", period: [{start:"", end:""}],  minimumDay : "1", currency : "₩", 
                                        addCost : "0", addCostAll : "0", addCostPerson : "0", galaDinner : "0"}],
                            saleCost : [{seasonName: "default1", period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                                        oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]
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
                  <div style={{width:'45%'}}>
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
                  section.default.map((item:any, index:any)=>{
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
                                      inputs[sectionIndex].default[index].period[subIndex].start = e;
                                      inputs[sectionIndex].default[index].period[subIndex].end = e;
                                      setInputCost(inputs);
                                    }} 
                                    />
                                    <p style={{marginLeft:'5px'}}>~</p>
                                    <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                      setSelectDate={(e:any)=>{ 
                                        const inputs = [...inputCost];
                                        inputs[sectionIndex].default[index].period[subIndex].end = e;
                                        setInputCost(inputs);
                                      }} 
                                      />
                                      <div className="dayBox">
                                        <div className="dayBtn"
                                          onClick={()=>{
                                            const copy = [...inputCost];
                                            copy[sectionIndex].default[index].period = [...copy[sectionIndex].default[index].period, {start:"", end:""}];
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
                                            copy[sectionIndex].default[index].period.splice(subIndex, 1);
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
                                    copy[sectionIndex].default[index].preStay = item.preStay === 'true' ? 'false' : 'true'; 
                                    setInputCost(copy);
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div style={{width:'12%', alignItems:'center',}}>
                            {
                              item.roomType.map((subItem:any, subIndex:any)=>{
                                return (
                                  <div key={index} style={{display:'flex'}}>
                                    <input className="inputdefault" type="text" style={{width:'80%', marginLeft:'5px'}} 
                                      value={subItem} onChange={(e)=>{
                                        const copy = [...inputCost]; 
                                        copy[sectionIndex].default[index].roomType[subIndex] = e.target.value; 
                                        setInputCost(copy);}}/>
                                    {
                                      (item.roomType.length > 1 && item.roomType.length === subIndex + 1)
                                      ?
                                      <div className="dayBox">
                                        <div className="dayBtn"
                                          onClick={()=>{
                                            const copy = [...inputCost];
                                            copy[sectionIndex].default[index].roomType.splice(subIndex, 1);
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
                                            copy[sectionIndex].default[index].roomType = [...copy[sectionIndex].default[index].roomType, ""];
                                            setInputCost(copy);
                                          }}
                                        >
                                          <p>+</p>
                                        </div>
                                      </div>  
                                    } 
                                  </div>
                                )
                              })
                            }
                          </div>
                          <div style={{width:'45%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                            <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                              value={item.oneDayCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'oneDayCost', inputCost, setInputCost)
                              }}/>
                            <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                              value={item.twoTwoDayCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'twoTwoDayCost', inputCost, setInputCost)
                              }}/>
                            <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                              value={item.oneThreeDayCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'oneThreeDayCost', inputCost, setInputCost)
                              }}/>
                            <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                            value={item.threeDayCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'threeDayCost', inputCost, setInputCost)
                            }}/>
                            <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                            value={item.fourDayCost} onChange={(e)=>{
                                handleinputDefaultCostChange(e, sectionIndex, index, 'fourDayCost', inputCost, setInputCost)
                            }}/>
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'10%', display:'flex'}} >
                            <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                value={item.notice} onChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].default[index].notice = e.target.value; setInputCost(copy);}}/>
                          </div>
                          <div style={{width:'3%', display:'flex'}} >
                          <div className="dayBox">
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost]
                                copy[sectionIndex].default = [...copy[sectionIndex].default, 
                                {seasonName: `default${index+2}`, period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                                  oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]
                                setInputCost(copy);
                              }}
                            >
                              <p>+</p>
                            </div>
                            <div className="dayBtn"
                              onClick={()=>{
                                const copy = [...inputCost];
                                copy[sectionIndex].default.splice(index, 1);
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
                  <div className='chartbox' style={{width:'10%'}} ><p>성수기정책</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'25%'}} ><p>기간</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'7%'}} ><p>미니멈/박</p></div>
                  <div className="chart-divider"></div>
                  <div className='chartbox' style={{width:'7%'}}><p>화폐</p></div>
                  <div className="chart-divider"></div>
                  <div style={{width:'50%'}} >
                    <div className='chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                      <p className='charttext'>요금</p>
                    </div>
                    <div style={{display:'flex'}}  className='chartbox'>
                      <p className='charttext'>추가(룸/박)</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>합계</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>1인</p>
                      <div className="chart-textdivider"></div>
                      <p className='charttext'>갈라디너</p>
                    </div>
                  </div>
                </div>
                {
                  section.season.map((item:any, index:any)=>{
                    return (
                      <div className="coverbox">
                        <div className="coverrow hole" style={{minHeight:'60px'}} >
                          <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <p style={{margin:'0'}}>{item.seasonName}</p>
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'25%'}} >
                            {
                              item.period.map((subItem:any, subIndex:any)=>{
                                return (
                                  <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                                    <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.start}
                                    setSelectDate={(e:any)=>{ 
                                        const inputs = [...inputCost];
                                        inputs[sectionIndex].season[index].period[subIndex].start = e;
                                        inputs[sectionIndex].season[index].period[subIndex].end = e;
                                        setInputCost(inputs);
                                    }} 
                                    />
                                    <p style={{marginLeft:'5px'}}>~</p>
                                    <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                      setSelectDate={(e:any)=>{ 
                                        const inputs = [...inputCost];
                                        inputs[sectionIndex].season[index].period[subIndex].end = e;
                                        setInputCost(inputs);
                                      }} 
                                      />
                                    <div className="dayBox">
                                      <div className="dayBtn"
                                        onClick={()=>{
                                          const copy = [...inputCost];
                                          copy[sectionIndex].season[index].period = [...copy[sectionIndex].season[index].period, {start:"", end:""}];
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
                                          copy[sectionIndex].season[index].period.splice(subIndex, 1);
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
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'7%'}} >
                            <DropdownBox
                              widthmain='90%'
                              height='35px'
                              selectedValue={item.minimumDay}
                              options={[
                                { value: '1박', label: '1박' },
                                { value: '2박', label: '2박' },
                                { value: '3박', label: '3박' },
                                { value: '4박', label: '4박' },
                                { value: '5박', label: '5박' }
                              ]}    
                              handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].season[index].minimumDay = e.target.value; setInputCost(copy);}}
                            />
                          </div>
                          <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                          <div style={{width:'7%', display:'flex'}} >
                            <DropdownBox
                              widthmain='100%'
                              height='35px'
                              selectedValue={item.currency}
                              options={[
                                { value: '$', label: '$' },
                                { value: '₩', label: '₩' }
                              ]}    
                              handleChange={(e)=>{const copy = [...inputCost]; copy[sectionIndex].season[index].currency = e.target.value; setInputCost(copy);}}
                            />
                          </div>
                          <div style={{width:'50%', display:'flex'}} >
                            <input className="inputdefault" type="text" style={{width:'48%', marginRight:'5px', textAlign:'right', paddingRight:'5px'}} 
                              value={item.addCost} onChange={(e)=>{handleinputSeasonCostChange(e, sectionIndex, index, 'addCost', inputCost, setInputCost)}}/>
                            <input className="inputdefault" type="text" style={{width:'48%', marginRight:'5px', textAlign:'right', paddingRight:'5px'}} 
                              value={item.addCostAll} onChange={(e)=>{handleinputSeasonCostChange(e, sectionIndex, index, 'addCostAll', inputCost, setInputCost)}}/>
                            <input className="inputdefault" type="text" style={{width:'48%', marginRight:'5px', textAlign:'right', paddingRight:'5px'}} 
                              value={item.addCostPerson} onChange={(e)=>{handleinputSeasonCostChange(e, sectionIndex, index, 'addCostPerson', inputCost, setInputCost)}}/>
                            <input className="inputdefault" type="text" style={{width:'48%', textAlign:'right', paddingRight:'5px'}} 
                              value={item.galaDinner} onChange={(e)=>{handleinputSeasonCostChange(e, sectionIndex, index, 'galaDinner', inputCost, setInputCost)}}/>
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

      {/* 판매가 ------------------------------------------------------------------------------------------------------------------------ */}
      
      { openSaleContent &&
        <>
          <div className="modal-header">
            <h1 style={{color:'#5fb7ef'}}>판매가</h1>
            <p>(1인 기준)</p>
          </div>

          {
            saleCost.map((section:any, sectionIndex:any)=>{
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
                      <div style={{width:'45%'}}>
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
                       section.default.map((item:any, index:any)=>{
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
                                            const inputs = [...saleCost];
                                            inputs[sectionIndex].default[index].period[subIndex].start = e;
                                            inputs[sectionIndex].default[index].period[subIndex].end = e;
                                            setSaleCost(inputs);
                                          }} 
                                        />
                                        <p style={{marginLeft:'5px'}}>~</p>
                                        <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                          setSelectDate={(e:any)=>{ 
                                            const inputs = [...saleCost];
                                            inputs[sectionIndex].default[index].period[subIndex].end = e;
                                            setSaleCost(inputs);
                                          }} 
                                          />
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...saleCost];
                                              copy[sectionIndex].default[index].period = [...copy[sectionIndex].default[index].period, {start:"", end:""}];
                                              setSaleCost(copy);
                                            }}
                                          >
                                            <p>+</p>
                                          </div>
                                        </div>  
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...saleCost];
                                              copy[sectionIndex].default[index].period.splice(subIndex, 1);
                                              setSaleCost(copy);
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
                                        copy[sectionIndex].default[index].preStay = item.preStay === 'true' ? 'false' : 'true'; 
                                        setInputCost(copy);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div style={{width:'12%', alignItems:'center',}}>
                                {
                                  item.roomType.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div key={index} style={{display:'flex'}}>
                                        <input className="inputdefault" type="text" style={{width:'80%', marginLeft:'5px'}} 
                                          value={subItem} onChange={(e)=>{const copy = [...saleCost]; copy[sectionIndex].default[index].roomType[subIndex] = e.target.value; setInputCost(copy);}}/>
                                        {
                                          (item.roomType.length > 1 && item.roomType.length === subIndex + 1)
                                          ?
                                          <div className="dayBox">
                                            <div className="dayBtn"
                                              onClick={()=>{
                                                const copy = [...saleCost];
                                                copy[sectionIndex].default[index].roomType.splice(subIndex, 1);
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
                                                const copy = [...saleCost];
                                                copy[sectionIndex].default[index].roomType = [...copy[sectionIndex].default[index].roomType, ""];
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>+</p>
                                            </div>
                                          </div>  
                                        } 
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'45%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.oneDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'oneDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.twoTwoDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'twoTwoDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.oneThreeDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'oneThreeDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.threeDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'threeDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.fourDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'fourDayCost', saleCost, setSaleCost)
                                  }}/>
                              </div>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <div style={{width:'10%', display:'flex'}} >
                                <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                    value={item.notice} onChange={(e)=>{const copy = [...saleCost]; copy[sectionIndex].default[index].notice = e.target.value; setSaleCost(copy);}}/>
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost]
                                    copy[sectionIndex].default = [...copy[sectionIndex].default, 
                                    {seasonName: `default${index+2}`, period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                                      oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]
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
                    {
                      section.saleCost.map((item:any, index:any)=>{
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
                                            const inputs = [...saleCost];
                                            inputs[sectionIndex].saleCost[index].period[subIndex].start = e;
                                            inputs[sectionIndex].saleCost[index].period[subIndex].end = e;
                                            setSaleCost(inputs);
                                          }} 
                                        />
                                        <p style={{marginLeft:'5px'}}>~</p>
                                        <DateBoxNum width='120px' subWidth='120px' right={5} date={subItem.end}
                                          setSelectDate={(e:any)=>{ 
                                            const inputs = [...saleCost];
                                            inputs[sectionIndex].saleCost[index].period[subIndex].end = e;
                                            setSaleCost(inputs);
                                          }} 
                                          />
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...saleCost];
                                              copy[sectionIndex].saleCost[index].period = [...copy[sectionIndex].saleCost[index].period, {start:"", end:""}];
                                              setSaleCost(copy);
                                            }}
                                          >
                                            <p>+</p>
                                          </div>
                                        </div>  
                                        <div className="dayBox">
                                          <div className="dayBtn"
                                            onClick={()=>{
                                              const copy = [...saleCost];
                                              copy[sectionIndex].saleCost[index].period.splice(subIndex, 1);
                                              setSaleCost(copy);
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
                                        copy[sectionIndex].saleCost[index].preStay = item.preStay === 'true' ? 'false' : 'true'; 
                                        setInputCost(copy);
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div style={{width:'12%', alignItems:'center',}}>
                                {
                                  item.roomType.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div key={index} style={{display:'flex'}}>
                                        <input className="inputdefault" type="text" style={{width:'80%', marginLeft:'5px'}} 
                                          value={subItem} onChange={(e)=>{const copy = [...saleCost]; copy[sectionIndex].saleCost[index].roomType[subIndex] = e.target.value; setInputCost(copy);}}/>
                                        {
                                          (item.roomType.length > 1 && item.roomType.length === subIndex + 1)
                                          ?
                                          <div className="dayBox">
                                            <div className="dayBtn"
                                              onClick={()=>{
                                                const copy = [...saleCost];
                                                copy[sectionIndex].saleCost[index].roomType.splice(subIndex, 1);
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
                                                const copy = [...saleCost];
                                                copy[sectionIndex].saleCost[index].roomType = [...copy[sectionIndex].saleCost[index].roomType, ""];
                                                setInputCost(copy);
                                              }}
                                            >
                                              <p>+</p>
                                            </div>
                                          </div>  
                                        } 
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <div style={{width:'45%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.oneDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'oneDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.twoTwoDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'twoTwoDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.oneThreeDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'oneThreeDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.threeDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'threeDayCost', saleCost, setSaleCost)
                                  }}/>
                                <input className="inputdefault" type="text" style={{width:'24%', textAlign:'right'}} 
                                  value={item.fourDayCost} onChange={(e)=>{
                                    handleinputDefaultCostChange(e, sectionIndex, index, 'fourDayCost', saleCost, setSaleCost)
                                  }}/>
                              </div>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <div style={{width:'10%', display:'flex'}} >
                                <textarea className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                                    value={item.notice} onChange={(e)=>{const copy = [...saleCost]; copy[sectionIndex].saleCost[index].notice = e.target.value; setSaleCost(copy);}}/>
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
                              <div className="dayBox">
                                <div className="dayBtn"
                                  onClick={()=>{
                                    const copy = [...inputCost]
                                    copy[sectionIndex].default = [...copy[sectionIndex].default, 
                                    {seasonName: `default${index+2}`, period: [{start:"", end:""}], preStay:"false", roomType: [""], 
                                      oneDayCost : "0", twoTwoDayCost : "0", oneThreeDayCost : "0", threeDayCost : "0", fourDayCost : "0", notice : ""}]
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

                  </section>
                </div>
              )
            })
          }

          <div className='btn-box'>
            <div className="btn" 
              onClick={()=>{
                props.setRefresh(!props.refresh);
                props.setIsViewHotelCostModal(false);
              }}
            >
              <p style={{color:'#333'}}>취소</p>
            </div>
            <div className="btn" style={{backgroundColor:'#5fb7ef'}}
                onClick={registerPost}
              >
              <p>저장</p>
            </div>
          </div>
        </>
      }
      
      
    </div>     
  )
}
