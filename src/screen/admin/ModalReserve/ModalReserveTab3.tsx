import React, { useEffect, useState } from 'react'
import { TitleBox } from '../../../boxs/TitleBox';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { DropDownDepositType } from '../../DefaultData';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { FaPlus } from 'react-icons/fa';

export default function ModalReserveTab3(props:any) {

  interface CostProps {
    nameko : string;
    cost : string;
    date : string;
    type : string;
    deposit : boolean;
  }
  interface RefundCostProps {
    nameko : string;
    cost : string;
    date : string;
  }
  
  const [tourTotalContractCost, setTourTotalContractCost] = useState(props.modalSort === 'revise' ? props.reserveInfo.tourTotalContractCost : '');
  const [contractCost, setContractCost] = useState<CostProps[]>(props.modalSort === 'revise' ? props.depositCostList[0] : [{nameko: '계약금', cost: '', date: '', type: '', deposit: false}]);
  const [airportCost, setAirportCost] = useState<CostProps[]>(props.modalSort === 'revise' ? props.depositCostList[1] : [{nameko: '항공료', cost: '', date: '', type: '', deposit: false}]);
  const [reviseAirportCost, setReviseAirportCost] = useState<CostProps[]>(props.modalSort === 'revise' ? props.depositCostList[2] : [{nameko: '항공료변경', cost: '', date: '', type: '', deposit: false}]);
  const [middleCost, setMiddleCost] = useState<CostProps[]>(props.modalSort === 'revise' ? props.depositCostList[3] : [{nameko: '중도금', cost: '', date: '', type: '', deposit: false}]);
  const [restCost, setRestCost] = useState<CostProps[]>(props.modalSort === 'revise' ? props.depositCostList[4] : [{nameko: '잔금', cost: '', date: '', type: '', deposit: false}]);
  const [costListSum, setCostListSum] = useState(props.modalSort === 'revise' ? props.reserveInfo.costListSum : '');
  const [additionCost, setAdditionCost] = useState<CostProps[]>(props.modalSort === 'revise' ? props.depositCostList[5] : [{nameko: '추가경비', cost: '', date: '', type: '', deposit: false}]);
  const [refundCost, setRefundCost] = useState<RefundCostProps[]>(props.modalSort === 'revise' ? props.refundCost : [{nameko: '환불', cost: '', date: ''}]);
  const [totalCost, setTotalCost] = useState(props.modalSort === 'revise' ? props.reserveInfo.totalCost :'');
  const [ballance, setBallance] = useState(props.modalSort === 'revise' ? props.reserveInfo.ballance : '');
  const [isCashBill, setIsCashBill] = useState<boolean>(props.modalSort === 'revise' ? props.reserveInfo.isCashBill : false);
  const [cashBillInfo, setCashBillInfo] = useState<{type : string; AuthNum : string; date : string;}>(props.modalSort === 'revise' ? JSON.parse(props.reserveInfo.cashBillInfo) : { type: '', AuthNum: '', date: ''});

  // 입력된숫자 금액으로 변경
  const handleCostChange = async (e: React.ChangeEvent<HTMLInputElement>, useState:any, setUseState:any, index:number)  => {
    const inputs = [...useState];
    const text = e.target.value;
    if (text === '') {
      inputs[index].cost = '';
      setUseState(inputs);
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {
      return
    } 
    const formattedNumber = inputNumber.toLocaleString('en-US');
    inputs[index].cost = formattedNumber;
    setUseState(inputs);
  };

  // costList 날짜 변경
  const handleCostDateChange = (e:any, useState:any, setUseState:any, index:number) => {
    const inputs = [...useState];
    inputs[index].date = e;
    setUseState(inputs);
  };

  // costList depositType 변경
  const handleDepositTypeChange = (e:any, useState:any, setUseState:any, index:number) => {
    const inputs = [...useState];
    inputs[index].type = e.target.value;
    setUseState(inputs);
  };

  // costList depositCheck 변경
  const handleDepositCheckChange = (e:any, useState:any, setUseState:any, index:number) => {
    const inputs = [...useState];
    inputs[index].deposit = e.target.checked;
    setUseState(inputs);
  };

  // costList(계약금+항공료+중도금+잔금) 합계 계산
  // useEffect(() => {
  //   const contractCostCopy = contractCost.cost === '' ? 0 : parseInt(contractCost.cost.replace(/,/g, ''));
  //   const airportCostCopy = airportCost.cost === '' ? 0 : parseInt(airportCost.cost.replace(/,/g, ''));
  //   const middleCostCopy = middleCost.cost === '' ? 0 : parseInt(middleCost.cost.replace(/,/g, ''));
  //   const restCostCopy = restCost.cost === '' ? 0 : parseInt(restCost.cost.replace(/,/g, ''));
  //   const totalCost = contractCostCopy + airportCostCopy + middleCostCopy + restCostCopy;
  //   const result = totalCost.toLocaleString('en-US');
  //   setCostListSum(result);
  // }, [contractCost.cost, airportCost.cost, middleCost.cost, restCost.cost]);

  // 최종경비 합계 계산
  // useEffect(() => {
  //   const tourTotalContractCostCopy = tourTotalContractCost === '' ? 0 : parseInt(tourTotalContractCost.replace(/,/g, ''));
  //   const additionCostCopy = additionCost.cost === '' ? 0 : parseInt(additionCost.cost.replace(/,/g, ''));
  //   const totalCost = tourTotalContractCostCopy + additionCostCopy;
  //   const result = totalCost.toLocaleString('en-US');
  //   setTotalCost(result);
  // }, [tourTotalContractCost, additionCost.cost]);

  // 밸런스 계산
  useEffect(() => {
    const costListSumCopy = costListSum === '' ? 0 : parseInt(costListSum.replace(/,/g, ''));
    const tourTotalContractCostCopy = tourTotalContractCost === '' ? 0 : parseInt(tourTotalContractCost.replace(/,/g, ''));
    const copy = costListSumCopy / tourTotalContractCostCopy * 100;
    const result = copy.toFixed(2);
    setBallance(result);
  }, [costListSum, tourTotalContractCost]);

  // 수정저장 함수 ----------------------------------------------------------------------------
  const handleReserveSaveTab3 = async () => {
    const data = {
      serialNum : props.serialNum,
      tourTotalContractCost : tourTotalContractCost,
      contractCost : JSON.stringify(contractCost),
      airportCost : JSON.stringify(airportCost),
      reviseAirportCost : JSON.stringify(reviseAirportCost),
      middleCost : JSON.stringify(middleCost),
      restCost : JSON.stringify(restCost),
      costListSum : costListSum,
      additionCost : JSON.stringify(additionCost),
      refundCost : JSON.stringify(refundCost),
      totalCost : totalCost,
      ballance : ballance,
      isCashBill : isCashBill,
      cashBillInfo : JSON.stringify(cashBillInfo)
    }

    await axios
      .post(`${MainURL}/adminreserve/revisedepositinfo`, data)
      .then((res)=>{
        if (res.data) {
          alert('저장되었습니다.');
          if ( props.modalSort === 'new' ) {
            props.setInputState('save');
            props.fetchReservePosts();
          }
        }
      })
      .catch((err)=>{
        alert('다시 시도해주세요.')
      })
  };
  
  return (
    <div>

      {
        props.selectTab === 4 &&
        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSaveTab3}
            >
              <p>저장</p>
            </div>
          </div>
        </section>
      }      

      <section className='depositState'>
        <h1>10. 입금내역</h1>
        <div className="bottombar"></div>
        
        {/* 전체여행계약금 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='계약금액'/>
            <input value={tourTotalContractCost} className="inputdefault costInput" type="text" 
                onChange={(e) => {
                  const text = e.target.value;
                  if (text === '') {
                    setTourTotalContractCost('');
                  }
                  const inputNumber = parseInt(text.replace(/,/g, ''));
                  if (isNaN(inputNumber)) {
                    return;
                  }
                  const formattedNumber = inputNumber.toLocaleString('en-US');
                  setTourTotalContractCost(formattedNumber);
                }}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <h3 style={{marginRight:'20px'}}>추가경비:</h3>
            {/* <h3 style={{fontSize:'20px'}}>{additionCost[0].cost} 원</h3> */}
          </div>
          <div className="coverrow third defaultBox" >
            <h3 style={{marginRight:'20px'}}>최종 여행경비:</h3>
            <h3 style={{fontSize:'20px'}}>{totalCost} 원</h3>
          </div>
        </div>
       
        {/* 계약금 ------------------------------------------------------- */}
        {
          contractCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow third rightborder">
                  <TitleBox width='120px' text={contractCost.length > 1 ? `계약금${index+1}` : '계약금'}/>
                  <input value={item.cost} className="inputdefault costInput" type="text" 
                    onChange={(e) => {handleCostChange(e, contractCost, setContractCost, index)}}/>
                  <p>원</p>
                  {
                    contractCost.length === index+1 &&
                    <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                      onClick={()=>{
                        const copy = [...contractCost, {nameko: '계약금', cost: '', date: '', type: '', deposit: false}]
                        setContractCost(copy);
                      }}
                    >
                      <FaPlus />
                    </p>
                  }
                </div>
                <div className="coverrow third rightborder defaultBox">
                  <p style={{marginRight:'5px'}}>날짜:</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25} date={item.date} marginLeft={1}
                      setSelectDate={(e:any) => handleCostDateChange(e, contractCost, setContractCost, index)}/>
                </div>
                <div className="coverrow third defaultBox">
                  <DropdownBox
                    widthmain='50%' height='35px' selectedValue={item.type}
                    options={DropDownDepositType}
                    handleChange={(e)=>{handleDepositTypeChange(e, contractCost, setContractCost, index)}}
                  />
                  <div className='depositCheck'>
                    <input className="input" type="checkbox"
                      checked={item.deposit}
                      onChange={(e)=>{handleDepositCheckChange(e, contractCost, setContractCost, index)}}
                    />
                  </div>
                  <p>입금확인</p>
                </div>
              </div>
            )
          })
        }
        
        {/* 항공료 ------------------------------------------------------- */}
        {
          airportCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow third rightborder">
                  <TitleBox width='120px' text={airportCost.length > 1 ? `항공료${index+1}` : '항공료'}/>
                  <input value={item.cost} className="inputdefault costInput" type="text" 
                    onChange={(e) => {handleCostChange(e, airportCost, setAirportCost, index)}}/>
                  <p>원</p>
                  {
                     airportCost.length === index+1 &&
                    <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                      onClick={()=>{
                        const copy = [...airportCost, {nameko: '항공료', cost: '', date: '', type: '', deposit: false}]
                        setAirportCost(copy);
                      }}
                    >
                      <FaPlus />
                    </p>
                  }
                </div>
                <div className="coverrow third rightborder defaultBox">
                  <p style={{marginRight:'5px'}}>날짜:</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25} date={item.date} marginLeft={1}
                      setSelectDate={(e:any) => handleCostDateChange(e, airportCost, setAirportCost, index)} />
                </div>
                <div className="coverrow third defaultBox">
                  <DropdownBox
                    widthmain='50%' height='35px' selectedValue={item.type}
                    options={DropDownDepositType}
                    handleChange={(e)=>{handleDepositTypeChange(e, airportCost, setAirportCost, index)}}
                  />
                  <div className='depositCheck'>
                    <input className="input" type="checkbox"
                      checked={item.deposit}
                      onChange={(e)=>{handleDepositCheckChange(e, airportCost, setAirportCost, index)}}
                    />
                  </div>
                  <p>입금확인</p>
                </div>
              </div>
            )
          })
        }
        

        {/* 항공료변경 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='항공료변경'/>
            <input value={reviseAirportCost[0].cost} className="inputdefault costInput" type="text" 
              onChange={(e) => {handleCostChange(e, reviseAirportCost, setReviseAirportCost, 0)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={25} date={reviseAirportCost[0].date} marginLeft={1}
                setSelectDate={(e:any) => handleCostDateChange(e, reviseAirportCost, setReviseAirportCost, 0)} />
          </div>
          <div className="coverrow third defaultBox">
            <DropdownBox
              widthmain='50%' height='35px' selectedValue={reviseAirportCost[0].type}
              options={DropDownDepositType}
              handleChange={(e)=>{handleDepositTypeChange(e, reviseAirportCost, setReviseAirportCost, 0)}}
            />
            <div className='depositCheck'>
              <input className="input" type="checkbox"
                checked={reviseAirportCost[0].deposit}
                onChange={(e)=>{handleDepositCheckChange(e, reviseAirportCost, setReviseAirportCost, 0)}}
              />
            </div>
            <p>입금확인</p>
          </div>
        </div>

        {/* 중도금 ------------------------------------------------------- */}
        {
          middleCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow third rightborder">
                  <TitleBox width='120px' text={middleCost.length > 1 ? `중도금${index+1}` : '중도금'}/>
                  <input value={item.cost} className="inputdefault costInput" type="text" 
                    onChange={(e) => {handleCostChange(e, middleCost, setMiddleCost, index)}}/>
                  <p>원</p>
                  {
                     middleCost.length === index+1 &&
                    <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                      onClick={()=>{
                        const copy = [...middleCost, {nameko: '중도금', cost: '', date: '', type: '', deposit: false}]
                        setMiddleCost(copy);
                      }}
                    >
                      <FaPlus />
                    </p>
                  }
                </div>
                <div className="coverrow third rightborder defaultBox">
                  <p style={{marginRight:'5px'}}>날짜:</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25} date={item.date} marginLeft={1}
                      setSelectDate={(e:any) => handleCostDateChange(e, middleCost, setMiddleCost, index)}/>
                </div>
                <div className="coverrow third defaultBox">
                  <DropdownBox
                    widthmain='50%' height='35px' selectedValue={item.type}
                    options={DropDownDepositType}
                    handleChange={(e)=>{handleDepositTypeChange(e, middleCost, setMiddleCost, index)}}
                  />
                  <div className='depositCheck'>
                    <input className="input" type="checkbox"
                      checked={item.deposit}
                      onChange={(e)=>{handleDepositCheckChange(e, middleCost, setMiddleCost, index)}}
                    />
                  </div>
                  <p>입금확인</p>
                </div>
              </div>
            )
          })
        }
        

        {/* 잔금 ------------------------------------------------------- */}
        {
          restCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow third rightborder">
                  <TitleBox width='120px' text={restCost.length > 1 ? `잔금${index+1}` : '잔금'}/>
                  <input value={item.cost} className="inputdefault costInput" type="text" 
                    onChange={(e) => {handleCostChange(e, restCost, setRestCost, index)}}/>
                  <p>원</p>
                  {
                     restCost.length === index+1 &&
                    <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                      onClick={()=>{
                        const copy = [...restCost, {nameko: '잔금', cost: '', date: '', type: '', deposit: false}]
                        setRestCost(copy);
                      }}
                    >
                      <FaPlus />
                    </p>
                  }
                </div>
                <div className="coverrow third rightborder defaultBox">
                  <p style={{marginRight:'5px'}}>날짜:</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25} date={item.date} marginLeft={1}
                      setSelectDate={(e:any) => handleCostDateChange(e, restCost, setRestCost, index)}/>
                </div>
                <div className="coverrow third defaultBox">
                  <DropdownBox
                    widthmain='50%' height='35px' selectedValue={item.type}
                    options={DropDownDepositType}
                    handleChange={(e)=>{handleDepositTypeChange(e, restCost, setRestCost, index)}}
                  />
                  <div className='depositCheck'>
                    <input className="input" type="checkbox"
                      checked={item.deposit}
                      onChange={(e)=>{handleDepositCheckChange(e, restCost, setRestCost, index)}}
                    />
                  </div>
                  <p>입금확인</p>
                </div>
              </div>        
            )
          })
        }
        
        
        {/* 추가경비 ------------------------------------------------------- */}
        {
          additionCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow third rightborder">
                  <TitleBox width='120px' text={additionCost.length > 1 ? `추가경비${index+1}` : '추가경비'}/>
                  <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e)=>{handleCostChange(e, additionCost, setAdditionCost, index)}}/>
                  <p>원</p>
                  {
                    additionCost.length === index+1 &&
                    <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                      onClick={()=>{
                        const copy = [...additionCost, {nameko: '추가경비', cost: '', date: '', type: '', deposit: false}]
                        setAdditionCost(copy);
                      }}
                    >
                      <FaPlus />
                    </p>
                  }
                </div>
                <div className="coverrow third rightborder defaultBox">
                  <p style={{marginRight:'5px'}}>날짜:</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25} date={item.date} marginLeft={1}
                    setSelectDate={(e:any) => handleCostDateChange(e, additionCost, setAdditionCost, index)}
                  />
                </div>
                <div className="coverrow third defaultBox">
                  <DropdownBox
                    widthmain='50%' height='35px' selectedValue={item.type}
                    options={DropDownDepositType}    
                    handleChange={(e)=>{handleDepositTypeChange(e, additionCost, setAdditionCost, index)}}
                  />
                  <div className='depositCheck'>
                    <input className="input" type="checkbox"
                      checked={item.deposit}
                      onChange={(e)=>{handleDepositCheckChange(e, additionCost, setAdditionCost, index)}}
                    />
                  </div>
                  <p>입금확인</p>
                </div>
              </div>
            )
          })
        }
        

        {/* 환불 ------------------------------------------------------- */}
        {
          refundCost.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow third rightborder">
                  <TitleBox width='120px' text={refundCost.length > 1 ? `환불${index+1}` : '환불'}/>
                  <input value={item.cost} className="inputdefault costInput" type="text" 
                      onChange={(e)=>{handleCostChange(e, refundCost, setRefundCost, index)}}/>
                  <p>원</p>
                  {
                    refundCost.length === index+1 &&
                    <p className='addBtn' style={{height:'20px', marginLeft:'20px'}}
                      onClick={()=>{
                        const copy = [...refundCost, {nameko: '환불', cost: '', date: '', type: '', deposit: false}]
                        setRefundCost(copy);
                      }}
                    >
                      <FaPlus />
                    </p>
                  }
                </div>
                <div className="coverrow third rightborder defaultBox">
                  <p style={{marginRight:'5px'}}>날짜:</p>
                  <DateBoxNum width='150px' subWidth='130px' right={25}  date={item.date} marginLeft={1}
                    setSelectDate={(e:any)=>{handleCostDateChange(e, refundCost, setRefundCost, index)}} 
                  />
                </div>
                <div className="coverrow third defaultBox"></div>
              </div>
            )
          })
        }
        

        {/* 밸런스 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width='120px' text='밸런스'/>
            <div style={{margin:'0 10px', display:'flex', alignItems:'center'}}>
              <h3 style={{marginRight:'10px', color:"#3a9fe5"}}>{ballance === 'NaN' ? 0 : ballance}%</h3>
              <p style={{fontSize:'12px'}}>= (계약금+항공료+중도금+잔금) / 계약금액 x 100</p>
            </div>
          </div>
        </div>

        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='현금영수증'/>
            <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
              <div className='depositCheck'>
                <input className="input" type="checkbox"
                  checked={isCashBill}
                  onChange={()=>{setIsCashBill(true);}}
                />
              </div>
              <p>발급요청</p>
              <div className='depositCheck'>
                <input className="input" type="checkbox"
                  checked={!isCashBill}
                  onChange={()=>{setIsCashBill(false);}}
                />
              </div>
              <p>요청없음</p>
            </div>
          </div>
          
          <div className="coverrow " style={{width:'66.6%'}}>
            {
              isCashBill && 
              <>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <div className='depositCheck'>
                  <input className="input" type="checkbox"
                    checked={cashBillInfo.type === '소득공제'}
                    onChange={()=>{
                      setCashBillInfo(prev => ({
                        ...prev, type : '소득공제'
                      }));
                    }}
                  />
                </div>
                <p>소득공제</p>
                <div className='depositCheck'>
                  <input className="input" type="checkbox"
                    checked={cashBillInfo.type === '지출증빙'}
                    onChange={()=>{
                      setCashBillInfo(prev => ({
                        ...prev, type : '지출증빙'
                      }));
                    }}
                  />
                </div>
                <p>지출증빙</p>
              </div>
              <h3 style={{marginLeft:'50px'}}>인증번호:</h3>
              <input style={{width:'20%', marginLeft:'5px'}}  value={cashBillInfo.AuthNum} className="inputdefault" type="text" 
                    onChange={(e) => {const inputs = {...cashBillInfo}; inputs.AuthNum = e.target.value; setCashBillInfo(inputs);}}/>
              <h3 style={{marginLeft:'30px'}}>발급일:</h3>
                <DateBoxNum width='150px' subWidth='130px' right={25} date={cashBillInfo.date} marginLeft={1}
                  setSelectDate={(e:any)=>{
                    const inputs = {...cashBillInfo};
                    inputs.date = e;
                    setCashBillInfo(inputs);
                  }} 
                />
              </>
            }
          </div>
        </div>
      </section> 

      {
        props.selectTab === 1 &&
        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSaveTab3}
            >
              <p>저장</p>
            </div>
          </div>
        </section>
      }
      
    </div>
  )
}
