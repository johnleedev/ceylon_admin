import React, { useCallback, useState } from 'react'
import '../../../ProductsModalAdd.scss'
import { TitleBox } from '../../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxDouble } from '../../../../../boxs/DateBoxDouble';
import { DropdownBox } from '../../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../../MainURL';
import { DropDownPackageType, DropDownSeasonType } from '../../../../DefaultData';
import { useRecoilValue } from 'recoil';
import { recoilExchangeRate } from '../../../../../RecoilStore';


interface PackageCostProps {
  addtionName: string;
  personCost : string;
  content : string;
};

interface SeasonCostProps {
  seasonName: string;
  periodStart:string, 
  periodEnd:string;
  minimumDay : string;
  currency: string;
  addCost : string;
  addCostAll : string;
  addCostPerson : string;
  galaDinner: string;
};

interface InputCostProps {
  reserveType : string;
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
};

export default function PreHotelCost (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const hotelCostInfoData = props.hotelCostInfoData;
  const isAddOrRevise = props.isAddOrRevise;
  const exchangeRate = useRecoilValue(recoilExchangeRate);

  const [isViewSaleCost, setIsViewSaleCost] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData?.isViewSaleCost : '');
  const [notes, setNotes] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData?.notes : '');
  const [notesDetail, setNotesDetail] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData?.notesDetail : '');
  const [landBenefit, setLandBenefit] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData?.landBenefit : '');
  const [productType, setProductType] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData?.productType : '');
  const [applyCurrency, setApplyCurrency] = useState(isAddOrRevise === 'revise' ? hotelCostInfoData?.applyCurrency : '₩');
  const [commission, setCommission] = useState(isAddOrRevise === 'revise' ? JSON.parse(hotelCostInfoData?.commission) : [{title:"수수료(1인)", select:"select", charge: "0"}]);
  const [packageCost, setPackageCost] = useState<PackageCostProps[]>(
    isAddOrRevise === 'revise'
    ? JSON.parse(hotelCostInfoData?.packageCost)
    : [{addtionName :"", personCost : "", content: ""}]
  );
  const [seasonCost, setSeasonCost] = useState<SeasonCostProps[]>(
    isAddOrRevise === 'revise'
    ? JSON.parse(hotelCostInfoData?.seasonCost)
    : [{seasonName: "", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""}]
  );
  

  // 요금표 정보(info) 저장 함수 ----------------------------------------------
  const registerInfoPost = async () => {
    const getParams = {
      postId :  props.hotelInfoData.id,
      hotelNameKo : props.hotelInfoData.hotelNameKo,
      hotelNameEn : props.hotelInfoData.hotelNameEn,
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
      packageCost : JSON.stringify(packageCost),
      seasonCost : JSON.stringify(seasonCost)
    }
    axios
      .post(`${MainURL}/restproducthotel/registerhotelcostinfo`, getParams)
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
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' }
  ]

  const dollarOption = [
    { value: '선택', label: '선택' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '150', label: '150' },
    { value: '200', label: '200' },
    { value: '250', label: '250' },
    { value: '300', label: '300' }
  ]

  // 화폐 적용 함수
  const handleApplyCurrency = (symbol : string) => {
    setApplyCurrency(symbol);
    const sesaoncopy = [...seasonCost];
    const updatedsesaonCostCopy = sesaoncopy.map(cost => ({
      ...cost, currency: symbol
    }));
    setSeasonCost(updatedsesaonCostCopy)
    const copy = [...inputCost]
    const updatedinputCost = copy.map(cost => ({
      ...cost, 
      inputDefault: cost.inputDefault.map(def => ({...def, currency: symbol})),
    }));
    setInputCost(updatedinputCost);
  };
  
  
  // 입금가 & 판매가 ---------------------------------------------------------------------------------------------------------------------------------------------------
  
  
  const [openSaleContent, setOpenSaleContent] = useState<boolean>(false);
  const defaultInputCostData : InputCostProps = 
    { 
      reserveType: "default",
      reservePeriod: {start:"", end:""}, 
      inputDefault : [{seasonName: "default1", period: [{start:"", end:""}], roomType: "", currency : '₩', dayChangeCost : "", dayAddCost : "", minimumDay : "1", notice : ""}],
    }
  const [inputCost, setInputCost] = useState<InputCostProps[]>(props.hotelCostInputDefaultData.length > 0 ? props.hotelCostInputDefaultData : [defaultInputCostData]);
  const [saleCost, setSaleCost] = useState<InputCostProps[]>([defaultInputCostData]);
  const [selectedAddtionCostBtn, setSelectedAddtionCostBtn] = useState<PackageCostProps | null>(null);
  const [selectedSeasonCostBtn, setSelectedSeasonCostBtn] = useState<SeasonCostProps | null>(null);
  const [isDollarWonChange, setIsDollarWonChange] = useState<boolean>(false);
  
  // package 입력된 숫자 금액으로 변경
  const handleinputPackageCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, index: number
  ) => {
    const text = e.target.value;
    const copy = [...packageCost];
    if (text === '') {
      copy[index].personCost = ''; 
      setPackageCost(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    copy[index].personCost = formattedNumber; 
    setPackageCost(copy);
  };

  // season 입력된 숫자 금액으로 변경
  const handleinputSeasonCostChange = (
    e: React.ChangeEvent<HTMLInputElement>, index: number, name: string
  ) => {
    const text = e.target.value;
    const copy = [...seasonCost];
    if (name === 'period') {
      return;
    }
    if (text === '') {
      (copy[index] as any)[name] = ''; 
      setSeasonCost(copy);
      return;
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {return;}
    const formattedNumber = inputNumber.toLocaleString('en-US');
    (copy[index] as any)[name] = formattedNumber; 
    setSeasonCost(copy);
  };

  // season 박수 x 추가요금을 합계에 입력
  const handleAddCostMultiplyDay = (
    e: string, index: number
  ) => {
    const text = e;
    const copy = [...seasonCost]; 
    copy[index].minimumDay = text;
    const inputTextNumberOnly = parseInt(text.replace(/[^0-9]/g, ''), 10);
    const addCostCopy = copy[index].addCost;
    const addCosttNumberOnly = parseInt(addCostCopy.replace(/[^0-9]/g, ''), 10);
    const multiplyCost = inputTextNumberOnly * addCosttNumberOnly;
    const dividePersonCost = (inputTextNumberOnly * addCosttNumberOnly) / 2;
    const formattedMultiplyCost = multiplyCost.toLocaleString('en-US');
    const formattedDividePersonCost = Math.floor(dividePersonCost).toLocaleString('en-US');
    copy[index].addCostAll = formattedMultiplyCost;
    copy[index].addCostPerson = formattedDividePersonCost;
    setSeasonCost(copy);
  };

  // inputDefault 입력된 숫자 금액으로 변경
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
  


  // 입금가 판매가 초기화
  const handleApplySaleCostReset = (idx:any) => {
    const copy = [...inputCost];
    copy[idx] = defaultInputCostData;
    setInputCost(copy);
  };

  // 요금표 저장 함수 ----------------------------------------------
  const registerCostPost = async (sectionIndex: any) => {
    const inputCostOrigin = [...inputCost];
    const inputCostCopy = inputCostOrigin[sectionIndex];
    const promises = [];
  
    for (let index = 0; index < inputCostCopy.inputDefault.length; index++) {
      const postPromise = axios.post(`${MainURL}/restproducthotel/registerhotelcostinput`, {
        postId: props.hotelInfoData.id,
        reserveIndex: sectionIndex,
        costIndex: index,
        hotelNameKo: props.hotelInfoData.hotelNameKo,
        hotelNameEn: props.hotelInfoData.hotelNameEn,
        reserveType: inputCostCopy.reserveType,
        reservePeriod: JSON.stringify(inputCostCopy.reservePeriod),
        inputDefault: JSON.stringify(inputCostCopy.inputDefault[index]),
      })
        .then((response) => {
          return { success: true, data: response.data };
        })
        .catch((error) => {
          console.error(`에러 발생 - 단어: ${inputCostCopy.inputDefault[index]}`, error);
          return { success: false };
        });
      promises.push(postPromise);
    }
  
    try {
      const results = await Promise.all(promises);
      const allSuccess = results.every(result => result.success);
      if (allSuccess) {
        alert(`${inputCostCopy.reservePeriod.start}
~${inputCostCopy.reservePeriod.end}의 섹션 정보가, 
모두 정상적으로 저장되었습니다.`);
      } else {
        alert('정상적으로 저장되지 않았습니다.');
      }
    } catch (error) {
      alert('실패');
      console.error('전체적인 오류 발생', error);
    }
  };

  
  // // 요금표 예약기간 섹션 삭제 함수 ----------------------------------------------
  const deleteReserveSection = async (sectionIndex:number) => {
    const response = await axios.post(`${MainURL}/restproducthotel/deletehotelreserveindex`, {
      postId : hotelCostInfoData.hotelCostID, 
      reserveIndex: sectionIndex,
    });
    if (response.data) {
      const copy = [...inputCost];
      copy.splice(sectionIndex, 1);
      setInputCost(copy);
      alert(response.data);
    }
  };

  const handleReserveDeleteAlert = (section:any, sectionIndex:number) => {
    const costConfirmed = window.confirm(`예약기간 ${section.reservePeriod.start}~${section.reservePeriod.start}의 자료들을, 모두 삭제하시겠습니까?`);
      if (costConfirmed) {
        deleteReserveSection(sectionIndex);
    } else {
      return
    }
  };

  // // 요금표 각 상품 기간별 요금 삭제 함수 ----------------------------------------------
  const deleteCostSection = async (sectionIndex:number, index:number) => {
    const response = await axios.post(`${MainURL}/restproducthotel/deletehotelcostindex`, {
      postId : hotelCostInfoData.hotelCostID, 
      reserveIndex: sectionIndex,
      costIndex: index
    });
    if (response.data) {
      const copy = [...inputCost];
      copy[sectionIndex].inputDefault.splice(index, 1);
      setInputCost(copy);
    }
  };

  const handleCostDeleteAlert = (sectionIndex:number, index:number) => {
    const costConfirmed = window.confirm("정말 삭제하시겠습니까?");
      if (costConfirmed) {
        deleteCostSection(sectionIndex, index);
    } else {
      return
    }
  };


  // 입금가 판매가 적용 ----------------------------------------------------------------------------------------------------
  const handleApplySaleCost = (addtion:number) => {
    setOpenSaleContent(true);
    const chargeNumber = Number(commission[0]?.charge?.replace(/[,|%]/g, '')) || 0;
    const updatedinputCost = inputCost.map((cost: any) => {
        const defaultCostCopy = cost.inputDefault.map((def: any) => {
            const dayChangeCostNumber = Number(def.dayChangeCost?.replace(/,/g, '')) || 0;
            const updatedDayChangeCost = dayChangeCostNumber === 0 ? '' : (dayChangeCostNumber + chargeNumber + addtion).toLocaleString();
            const dayAddCostNumber = Number(def.dayAddCost?.replace(/,/g, '')) || 0;
            const updatedDayAddCost = dayAddCostNumber === 0 ? '' : (dayAddCostNumber + chargeNumber + addtion).toLocaleString();
            return { 
              ...def, 
              dayChangeCost: updatedDayChangeCost, 
              dayAddCost: updatedDayAddCost 
            };
        });
        return { 
          ...cost, 
          inputDefault: defaultCostCopy 
        };
    });
    setSaleCost(updatedinputCost);
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
            <p>{props.hotelInfoData.hotelNameKo} {props.hotelInfoData.hotelNameEn}</p>
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

      <div style={{height:50}}></div>
      <div className="modal-header">
        <h1>입금가</h1>
        <p>(1인 기준)</p>
      </div>

      <section>
        {/* 패키지 ----------------------------------------------------------------------------------------------------------------- */}      
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'19%'}} ><p>추가사항</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>1인 요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'71%'}} ><p>내용</p></div>
        </div>
        {
          packageCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {
                      item.addtionName === '' 
                      ?
                      <DropdownBox
                        widthmain='95%'
                        height='35px'
                        selectedValue={item.addtionName}
                        options={DropDownPackageType}    
                        handleChange={(e)=>{const copy = [...packageCost]; copy[index].addtionName = e.target.value; setPackageCost(copy);}}
                      />
                      :
                      <p>{item.addtionName}</p>
                    }
                  </div>
                  <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                  <div style={{width:'10%', display:'flex'}} >
                    <input className="inputdefault" type="text" style={{width:'100%', marginRight:'5px', textAlign:'right', paddingRight:'5px'}} 
                      value={item.personCost} onChange={(e)=>{
                          handleinputPackageCostChange(e, index)
                        }}/>
                  </div>
                  <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                  <div style={{width:'70%'}} >
                    <input className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                        value={item.content} onChange={(e)=>{const copy = [...packageCost]; copy[index].content = e.target.value; setPackageCost(copy);}}/>
                  </div>
                  <div className="dayBox">
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...packageCost, {addtionName :"", personCost : "", content: ""}];
                        setPackageCost(copy);
                      }}
                    >
                      <p>+</p>
                    </div>
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...packageCost];
                        copy.splice(index, 1);
                        setPackageCost(copy);
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
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'8%'}} ><p>성수기 정책</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'20%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'6%'}} ><p>화폐</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'14%'}} ><p>추가</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'6%'}} ><p>미니멈</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'14%'}} ><p>총액</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'14%'}} ><p>1인</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'14%'}} ><p>갈라디너</p></div>
        </div>
        {
          seasonCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{width:'8%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {
                      item.seasonName === '' 
                      ?
                      <DropdownBox
                        widthmain='95%'
                        height='35px'
                        selectedValue={item.seasonName}
                        options={DropDownSeasonType}    
                        handleChange={(e)=>{const copy = [...seasonCost]; copy[index].seasonName = e.target.value;  setSeasonCost(copy);}}
                      />
                      :
                      <p>{item.seasonName}</p>
                    }
                  </div>
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <DateBoxDouble dateStart={item.periodStart} dateEnd={item.periodEnd}
                      setSelectStartDate={(e:any)=>{ 
                        const inputs = [...seasonCost];
                        inputs[index].periodStart = e;
                        inputs[index].periodEnd = e;
                        setSeasonCost(inputs);
                      }} 
                      setSelectEndDate={(e:any)=>{ 
                        const inputs = [...seasonCost];
                        inputs[index].periodStart = e;
                        inputs[index].periodEnd = e;
                        setSeasonCost(inputs);
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
                        const inputs = [...seasonCost];
                        inputs[index].currency = e.target.value; 
                        setSeasonCost(inputs);
                      }}
                    />  
                  </div>
                  <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                  <input className="inputdefault" style={{width:'14%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCost} 
                      onChange={(e)=>{
                        handleinputSeasonCostChange(e, index, 'addCost')
                      }}
                      onKeyDown={(e)=>{
                        if (e.key === 'Enter') {handleAddCostMultiplyDay(`${item.minimumDay}박`, index);}
                      }}
                      />
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
                        handleAddCostMultiplyDay(e.target.value, index);
                      }}
                    />  
                  </div>    
                  <input className="inputdefault" style={{width:'14%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCostAll} onChange={(e)=>{
                        handleinputSeasonCostChange(e, index, 'addCostAll')
                      }}/>
                  <input className="inputdefault" style={{width:'14%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.addCostPerson} onChange={(e)=>{
                        handleinputSeasonCostChange(e, index, 'addCostPerson')
                      }}/>
                  <input className="inputdefault" style={{width:'14%', marginLeft:'5px', minHeight:'40px', outline:'none', textAlign:'right'}} 
                    value={item.galaDinner} onChange={(e)=>{
                        handleinputSeasonCostChange(e, index, 'galaDinner')
                      }}/>
                  <div className="dayBox">
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...seasonCost, 
                          {seasonName: "", periodStart:"", periodEnd:"", minimumDay:"1박", currency: "", addCost : "", addCostAll : "", addCostPerson : "",  galaDinner:""}];
                        setSeasonCost(copy);
                      }}
                    >
                      <p>+</p>
                    </div>
                    <div className="dayBtn"
                      onClick={()=>{
                        const copy = [...seasonCost];
                        copy.splice(index, 1);
                        setSeasonCost(copy);
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
      { 
        inputCost.map((section:any, sectionIndex:any)=>{
          return (
            <div key={sectionIndex}>

              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'60px'}} >
                  <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                    <p style={{marginRight:'10px', marginLeft:'5px', fontWeight:'600'}}>예약기간:</p>
                    <DateBoxDouble dateStart={section.reservePeriod.start} dateEnd={section.reservePeriod.end}
                      setSelectStartDate={(e:any)=>{ 
                        const inputs = [...inputCost];
                        inputs[sectionIndex].reservePeriod.start = e;
                        inputs[sectionIndex].reservePeriod.end = e;
                        setInputCost(inputs);
                      }} 
                      setSelectEndDate={(e:any)=>{ 
                        const inputs = [...inputCost];
                        inputs[sectionIndex].reservePeriod.start = e;
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
                          handleReserveDeleteAlert(section, sectionIndex)
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
                                    <DateBoxDouble dateStart={subItem.start} dateEnd={subItem.end}
                                      setSelectStartDate={(e:any)=>{ 
                                        const inputs = [...inputCost];
                                        inputs[sectionIndex].inputDefault[index].period[subIndex].start = e;
                                        inputs[sectionIndex].inputDefault[index].period[subIndex].end = e;
                                        setInputCost(inputs);
                                      }} 
                                      setSelectEndDate={(e:any)=>{ 
                                        const inputs = [...inputCost];
                                        inputs[sectionIndex].inputDefault[index].period[subIndex].start = e;
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
              </section>

              <div className='btn-box'>
                <div className="btn" 
                  onClick={()=>{handleApplySaleCostReset(sectionIndex)}}
                >
                  <p style={{color:'#333'}}>초기화</p>
                </div>
                <div className="btn" style={{backgroundColor:'#5fb7ef'}}
                    onClick={()=>{
                      registerCostPost(sectionIndex);
                    }}
                  >
                  <p>저장</p>
                </div>
              </div>
              
            </div>
          )
        })
      }

      {
        !openSaleContent &&
        <div className='btn-box' style={{marginTop:'50px'}}>
          <div className="btn" 
            onClick={()=>{handleApplySaleCost(0);}}
          >
            <p style={{color:'#333'}}>판매가 보기</p>
          </div>
        </div>
      }

      {/* 판매가 ------------------------------------------------------------------------------------------------------------------------ */}
      
      { openSaleContent &&
        <>
          <div className="modal-header">
            <h1 style={{color:'#5fb7ef'}}>판매가</h1>
            <p>(1인 기준)</p>
          </div>

          <div className="saleCost-Select-Cover">
            <div className="saleCost-Select-leftBox">
              {
                packageCost.map((item:any, index:any)=>{
                  return (
                    <div className='saleCost-Select-Btn' key={index}
                      style={{border: selectedAddtionCostBtn === item ? '1px solid #333' : '1px solid #d8d8d8'}}
                      onClick={()=>{
                        setSelectedAddtionCostBtn(item)
                        const addtionCost = parseInt(item.personCost.replace(/,/g, '')) | 0;
                        if (selectedSeasonCostBtn === null) {
                          handleApplySaleCost(addtionCost);
                        } else {
                          const seasonCopy = selectedSeasonCostBtn;
                          const addCostPerson = parseInt(seasonCopy.addCostPerson.replace(/,/g, '')) | 0;
                          const galaDinner = parseInt(seasonCopy.galaDinner.replace(/,/g, '')) | 0;
                          handleApplySaleCost(addtionCost+addCostPerson+galaDinner);
                        } 
                      }}
                    >
                      <p className='saleCost-Select-text'>{item.addtionName}</p>
                    </div>
                  )
                })
              }
              <div className='saleCost-Select-vet_bar'></div>
              {
                seasonCost.map((item:any, index:any)=>{
                  return (
                    <div className='saleCost-Select-Btn' key={index}
                      style={{ width:'200px', border: selectedSeasonCostBtn === item ? '1px solid #333' : '1px solid #d8d8d8'}}
                      onClick={()=>{
                        setSelectedSeasonCostBtn(item)
                        // const exchangeRateCopy = exchangeRate[0].KRW;
                        // const addCostPersonCopy = parseInt(item.addCostPerson.replace(/,/g, '')) | 0;
                        // const galaDinnerCopy = parseInt(item.galaDinner.replace(/,/g, '')) | 0;
                        // const addCostPerson = isDollarWonChange ? exchangeRateCopy * addCostPersonCopy : addCostPersonCopy;
                        // const galaDinner = isDollarWonChange ? exchangeRateCopy * galaDinnerCopy : galaDinnerCopy;
                        const addCostPerson = parseInt(item.addCostPerson.replace(/,/g, '')) | 0;
                        const galaDinner = parseInt(item.galaDinner.replace(/,/g, '')) | 0;
                        if (selectedAddtionCostBtn === null) {
                          handleApplySaleCost(addCostPerson+galaDinner);
                        } else {
                          const packageCopy = selectedAddtionCostBtn;
                          const addtionCost = parseInt(packageCopy.personCost.replace(/,/g, '')) | 0;
                          handleApplySaleCost(addtionCost+addCostPerson+galaDinner);
                        }
                      }}
                    >
                      <p className='saleCost-Select-text'>{item.seasonName}</p>
                      <p className='saleCost-Select-text'>{item.periodStart}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className="saleCost-Select-rightBox">
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isDollarWonChange}
                  onChange={()=>{
                    setIsDollarWonChange(!isDollarWonChange)
                  }}
                />
              </div>
              <p>달러-원화로 변경</p>
            </div>
          </div>

          {
            saleCost.map((section:any, sectionIndex:any)=>{
              return (
                <div key={sectionIndex}>
                  
                  <div className="coverbox">
                    <div className="coverrow hole" style={{minHeight:'60px'}} >
                      <div style={{display:'flex', alignItems:'center', marginBottom:'5px'}}>
                        <p style={{marginRight:'10px', marginLeft:'5px', fontWeight:'600'}}>예약기간:</p>
                        <p>{section.reservePeriod.start}</p>
                        <p>~</p>
                        <p>{section.reservePeriod.end}</p>
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
                      section.inputDefault.map((item:any, index:any)=>{
                        return (
                          <div className="coverbox">
                            <div className="coverrow hole" style={{minHeight:'60px'}} >
                              <div style={{width:'25%'}} >
                                {
                                  item.period.map((subItem:any, subIndex:any)=>{
                                    return (
                                      <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'5px'}} key={subIndex}>
                                        <p>{subItem.start}</p>
                                        <p style={{marginLeft:'5px'}}>~</p>
                                        <p>{subItem.end}</p>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              <p className="textdefault" style={{width:'7%'}}>{item.roomType}</p>
                              <p className="textdefault" style={{width:'7%'}}>{item.minimumDay}</p>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <p className="textdefault" style={{width:'7%'}}>{item.currency}</p>
                              <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                                <p className="textdefault" style={{width:'48%'}}>{item.dayChangeCost}</p>
                                <p className="textdefault" style={{width:'48%'}}>{item.dayAddCost}</p>
                              </div>
                              <div style={{width:'1px', height:'inherit', backgroundColor:'#d4d4d4'}}></div>
                              <div style={{width:'27%', display:'flex'}} >
                                <textarea className="inputdefault" style={{width:'100%', textAlign:'left'}}>{item.notice}</textarea>
                              </div>
                              <div style={{width:'3%', display:'flex'}} >
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

          <div className='btn-box' style={{marginTop:'50px'}}>
            <div className="btn" 
              onClick={()=>{
                setSelectedAddtionCostBtn(null);
                setSelectedSeasonCostBtn(null);
                setOpenSaleContent(false);
              }}
            >
              <p style={{color:'#333'}}>판매가 창닫기</p>
            </div>
          </div>
        </>
      }
      
      
    </div>     
  )
}
