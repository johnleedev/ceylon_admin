import React, { useEffect, useState } from 'react'
import { TitleBox } from '../../boxs/TitleBox';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { DropDownDepositType } from '../DefaultData';
import axios from 'axios';
import MainURL from '../../MainURL';

export default function ModalReserveTab3(props:any) {

  interface CostProps {
    nameko : string;
    cost : string;
    date : string;
    type : string;
    deposit : boolean;
  }

  const [tourTotalContractCost, setTourTotalContractCost] = useState('');
  const [contractCost, setContractCost] = useState<CostProps>({nameko: '계약금', cost: '', date: '', type: '', deposit: false});
  const [airportCost, setAirportCost] = useState<CostProps>({nameko: '항공료', cost: '', date: '', type: '', deposit: false});
  const [middleCost, setMiddleCost] = useState<CostProps>({nameko: '중도금', cost: '', date: '', type: '', deposit: false});
  const [restCost, setRestCost] = useState<CostProps>({nameko: '잔금', cost: '', date: '', type: '', deposit: false});
  const [costListSum, setCostListSum] = useState('');
  const [additionCost, setAdditionCost] = useState<CostProps>({nameko: '환불', cost: '', date: '', type: '', deposit: false});
  const [refundCost, setRefundCost] = useState<{nameko : string; cost : string; date : string;}>({nameko: '환불', cost: '', date: ''});
  const [totalCost, setTotalCost] = useState('');
  const [ballance, setBallance] = useState('');
  const [isCashBill, setIsCashBill] = useState<boolean>(false);
  const [cashBillInfo, setCashBillInfo] = useState<{type : string; AuthNum : string; date : string;}>({type: '', AuthNum: '', date: ''});


  // 입력된숫자 금액으로 변경
  const handleCostChange = async (e: React.ChangeEvent<HTMLInputElement>, useState:any, setUseState:any)  => {
    const inputs = {...useState};
    const text = e.target.value;
    if (text === '') {
      inputs.cost = '';
      setUseState(inputs);
    }
    const inputNumber = parseInt(text.replace(/,/g, ''), 10);
    if (isNaN(inputNumber)) {
      return
    } 
    const formattedNumber = inputNumber.toLocaleString('en-US');
    inputs.cost = formattedNumber;
    setUseState(inputs);
  };

  // costList 날짜 변경
  const handleCostDateChange = (e:any, useState:any, setUseState:any) => {
    const inputs = {...useState};
    inputs.date = e;
    setUseState(inputs);
  };

  // costList depositType 변경
  const handleDepositTypeChange = (e:any, useState:any, setUseState:any) => {
    const inputs = {...useState};
    inputs.type = e.target.value;
    setUseState(inputs);
  };

  // costList depositCheck 변경
  const handleDepositCheckChange = (e:any, useState:any, setUseState:any) => {
    const inputs = {...useState};
    inputs.deposit = e.target.checked;
    setUseState(inputs);
  };

  // costList(계약금+항공료+중도금+잔금) 합계 계산
  useEffect(() => {
    const contractCostCopy = contractCost.cost === '' ? 0 : parseInt(contractCost.cost.replace(/,/g, ''));
    const airportCostCopy = airportCost.cost === '' ? 0 : parseInt(airportCost.cost.replace(/,/g, ''));
    const middleCostCopy = middleCost.cost === '' ? 0 : parseInt(middleCost.cost.replace(/,/g, ''));
    const restCostCopy = restCost.cost === '' ? 0 : parseInt(restCost.cost.replace(/,/g, ''));
    const totalCost = contractCostCopy + airportCostCopy + middleCostCopy + restCostCopy;
    const result = totalCost.toLocaleString('en-US');
    setCostListSum(result);
  }, [contractCost.cost, airportCost.cost, middleCost.cost, restCost.cost]);

  // 최종경비 합계 계산
  useEffect(() => {
    const tourTotalContractCostCopy = tourTotalContractCost === '' ? 0 : parseInt(tourTotalContractCost.replace(/,/g, ''));
    const additionCostCopy = additionCost.cost === '' ? 0 : parseInt(additionCost.cost.replace(/,/g, ''));
    const totalCost = tourTotalContractCostCopy + additionCostCopy;
    const result = totalCost.toLocaleString('en-US');
    setTotalCost(result);
  }, [tourTotalContractCost, additionCost.cost]);

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
    await axios
    .post(`${MainURL}/adminreserve/savedepositinfo`, {
      serialNum : props.serialNum,
      tourTotalContractCost : tourTotalContractCost,
      contractCost : JSON.stringify(contractCost),
      airportCost : JSON.stringify(airportCost),
      middleCost : JSON.stringify(middleCost),
      restCost : JSON.stringify(restCost),
      costListSum : costListSum,
      additionCost : JSON.stringify(additionCost),
      refundCost : JSON.stringify(refundCost),
      totalCost : totalCost,
      ballance : ballance,
      isCashBill : isCashBill,
      cashBillInfo : JSON.stringify(cashBillInfo)
    })
    .then((res)=>{
      if (res.data) {
        alert('저장되었습니다.');
        props.setInputState('save');
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };
  
  return (
    <div>
      <section className='depositState'>
        <h1>11. 입금내역</h1>
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
            <h3 style={{fontSize:'20px'}}>{additionCost.cost} 원</h3>
          </div>
          <div className="coverrow third defaultBox" >
            <h3 style={{marginRight:'20px'}}>최종 여행경비:</h3>
            <h3 style={{fontSize:'20px'}}>{totalCost} 원</h3>
          </div>
        </div>
       
        {/* 계약금 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='계약금'/>
            <input value={contractCost.cost} className="inputdefault costInput" type="text" 
              onChange={(e) => {handleCostChange(e, contractCost, setContractCost)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={15} date={contractCost.date} marginLeft={1}
                setSelectDate={(e:any) => handleCostDateChange(e, contractCost, setContractCost)}/>
          </div>
          <div className="coverrow third defaultBox">
            <DropdownBox
              widthmain='50%' height='35px' selectedValue={contractCost.type}
              options={DropDownDepositType}
              handleChange={(e)=>{handleDepositTypeChange(e, contractCost, setContractCost)}}
            />
            <div className='depositCheck'>
              <input className="input" type="checkbox"
                checked={contractCost.deposit}
                onChange={(e)=>{handleDepositCheckChange(e, contractCost, setContractCost)}}
              />
            </div>
            <p>입금확인</p>
          </div>
        </div>

        {/* 항공료 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='항공료'/>
            <input value={airportCost.cost} className="inputdefault costInput" type="text" 
              onChange={(e) => {handleCostChange(e, airportCost, setAirportCost)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={15} date={airportCost.date} marginLeft={1}
                setSelectDate={(e:any) => handleCostDateChange(e, airportCost, setAirportCost)} />
          </div>
          <div className="coverrow third defaultBox">
            <DropdownBox
              widthmain='50%' height='35px' selectedValue={airportCost.type}
              options={DropDownDepositType}
              handleChange={(e)=>{handleDepositTypeChange(e, airportCost, setAirportCost)}}
            />
            <div className='depositCheck'>
              <input className="input" type="checkbox"
                checked={airportCost.deposit}
                onChange={(e)=>{handleDepositCheckChange(e, airportCost, setAirportCost)}}
              />
            </div>
            <p>입금확인</p>
          </div>
        </div>

        {/* 중도금 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='중도금'/>
            <input value={middleCost.cost} className="inputdefault costInput" type="text" 
              onChange={(e) => {handleCostChange(e, middleCost, setMiddleCost)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={15} date={middleCost.date} marginLeft={1}
                setSelectDate={(e:any) => handleCostDateChange(e, middleCost, setMiddleCost)}/>
          </div>
          <div className="coverrow third defaultBox">
            <DropdownBox
              widthmain='50%' height='35px' selectedValue={middleCost.type}
              options={DropDownDepositType}
              handleChange={(e)=>{handleDepositTypeChange(e, middleCost, setMiddleCost)}}
            />
            <div className='depositCheck'>
              <input className="input" type="checkbox"
                checked={middleCost.deposit}
                onChange={(e)=>{handleDepositCheckChange(e, middleCost, setMiddleCost)}}
              />
            </div>
            <p>입금확인</p>
          </div>
        </div>

        {/* 잔금 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='잔금'/>
            <input value={restCost.cost} className="inputdefault costInput" type="text" 
              onChange={(e) => {handleCostChange(e, restCost, setRestCost)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={15} date={restCost.date} marginLeft={1}
                setSelectDate={(e:any) => handleCostDateChange(e, restCost, setRestCost)}/>
          </div>
          <div className="coverrow third defaultBox">
            <DropdownBox
              widthmain='50%' height='35px' selectedValue={restCost.type}
              options={DropDownDepositType}
              handleChange={(e)=>{handleDepositTypeChange(e, restCost, setRestCost)}}
            />
            <div className='depositCheck'>
              <input className="input" type="checkbox"
                checked={restCost.deposit}
                onChange={(e)=>{handleDepositCheckChange(e, restCost, setRestCost)}}
              />
            </div>
            <p>입금확인</p>
          </div>
        </div>        
        
        {/* 추가경비 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='추가경비'/>
            <input value={additionCost.cost} className="inputdefault costInput" type="text" 
                onChange={(e)=>{handleCostChange(e, additionCost, setAdditionCost)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={15} date={additionCost.date} marginLeft={1}
              setSelectDate={(e:any) => handleCostDateChange(e, additionCost, setAdditionCost)}
            />
          </div>
          <div className="coverrow third defaultBox">
            <DropdownBox
              widthmain='50%' height='35px' selectedValue={additionCost.type}
              options={DropDownDepositType}    
              handleChange={(e)=>{handleDepositTypeChange(e, additionCost, setAdditionCost)}}
            />
            <div className='depositCheck'>
              <input className="input" type="checkbox"
                checked={additionCost.deposit}
                onChange={(e)=>{handleDepositCheckChange(e, additionCost, setAdditionCost)}}
              />
            </div>
            <p>입금확인</p>
          </div>
        </div>

        {/* 환불 ------------------------------------------------------- */}
        <div className="coverbox">
          <div className="coverrow third rightborder">
            <TitleBox width='120px' text='환불'/>
            <input value={refundCost.cost} className="inputdefault costInput" type="text" 
                onChange={(e)=>{handleCostChange(e, refundCost, setRefundCost)}}/>
            <p>원</p>
          </div>
          <div className="coverrow third rightborder defaultBox">
            <p style={{marginRight:'5px'}}>날짜:</p>
            <DateBoxNum width='150px' subWidth='130px' right={15}  date={refundCost.date} marginLeft={1}
              setSelectDate={(e:any)=>{handleCostDateChange(e, refundCost, setRefundCost)}} 
            />
          </div>
          <div className="coverrow third defaultBox"></div>
        </div>

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
                <DateBoxNum width='150px' subWidth='130px' right={15} date={cashBillInfo.date} marginLeft={1}
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

      <section>
        <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
          <div className='btn-row' style={{marginRight:'5px', width:'120px'}}
            onClick={()=>{
              
            }}
          >
            <p>전체삭제</p>
          </div>
          <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
            onClick={handleReserveSaveTab3}
          >
            <p>저장</p>
          </div>
        </div>
      </section>
    </div>
  )
}
