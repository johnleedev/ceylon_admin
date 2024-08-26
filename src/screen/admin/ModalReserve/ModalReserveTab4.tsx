import React, { useEffect, useState } from 'react'
import { TitleBox } from '../../../boxs/TitleBox';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { DropDownDeliveryType, DropDownDepositType, DropDowncharger } from '../../DefaultData';
import axios from 'axios';
import MainURL from '../../../MainURL';

export default function ModalReserveTab4(props:any) {

  interface DeliveryProps {
    name: string;
    requestDate : string;
    completeDate : string;
    deliveryType : string;
    charger : string;
  }

  const [delivery, setDelivery] = useState<DeliveryProps[]>(
    props.modalSort === 'revise' 
    ? props.deliveryList
    : [
      {name:'e-Ticket', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
      {name:'Visa/ESTA', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
      {name:'확정서', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
      {name:'여행준비물', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
      {name:'캐리어사은품', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
      {name:'해피콜', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''},
      {name:'환불/과입금', requestDate:'', completeDate:'', deliveryType:'카톡', charger:''}
    ]
  );

  // Request 날짜 변경
  const handleRequestDateChange = (e:any, index:any) => {
    const inputs = [...delivery];
    inputs[index].requestDate = e;
    setDelivery(inputs);
  };

  // complete 날짜 변경
  const handleCompleteDateChange = (e:any, index:any) => {
    const inputs = [...delivery];
    inputs[index].completeDate = e;
    setDelivery(inputs);
  };

  // 전달방식 변경
  const handleDeliveryTypeChange = async (e:any, index:any) => {
    const inputs = [...delivery];
    inputs[index].deliveryType = e.target.value; 
    setDelivery(inputs);
  };

  // 담당자 변경
  const handleChargerChange = async (e:any, index:any) => {
    const inputs = [...delivery];
    inputs[index].charger = e.target.value; 
    setDelivery(inputs);
  };

  // 수정저장 함수 ----------------------------------------------------------------------------
  const handleReserveSaveTab4 = async () => {
    const data = {
      serialNum : props.serialNum,
      eTicket : JSON.stringify(delivery[0]),
      visaEsta : JSON.stringify(delivery[1]),
      decideDoc : JSON.stringify(delivery[2]),
      prepare : JSON.stringify(delivery[3]),
      freeGift : JSON.stringify(delivery[4]),
      happyCall : JSON.stringify(delivery[5]),
      refund : JSON.stringify(delivery[6])
    }

    await axios
      .post(`${MainURL}/adminreserve/revisedeliveryinfo`, data)
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
        props.selectTab === 5 &&
        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSaveTab4}
            >
              <p>저장</p>
            </div>
          </div>
        </section>
      }
      
      <section>
        <h1>11. OT 및 고객전달 사항</h1>
        <div className="bottombar"></div>
        <div className="coverbox titlerow" style={{backgroundColor:'#f6f6f6' }}>
          <TitleBox width="150px" text=''/>
          <div style={{flex:1, display:'flex', justifyContent:'space-between'}}>
            <TitleBox width="20%" text='요청일'/>
            <TitleBox width="20%" text='처리일'/>
            <TitleBox width="20%" text='전달방식'/>
            <TitleBox width="20%" text='담당자'/>
          </div>
        </div>
        {
          delivery.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole">
                  <TitleBox width="150px" text={item.name}/>
                  <div style={{flex:1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{width:'20%', display:'flex', justifyContent:'center'}}>
                      <DateBoxNum width='150px' subWidth='130px' right={25} date={item.requestDate} marginLeft={1}
                        setSelectDate={(e:any) => {handleRequestDateChange(e, index)}} />
                    </div>
                    <div style={{width:'20%', display:'flex', justifyContent:'center'}}>
                      <DateBoxNum width='150px' subWidth='130px' right={25} date={item.completeDate} marginLeft={1}
                        setSelectDate={(e:any) => {handleCompleteDateChange(e, index)}} />
                    </div>
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={item.deliveryType}
                      options={DropDownDeliveryType}
                      handleChange={(e)=>{handleDeliveryTypeChange(e, index)}}
                    />
                    <DropdownBox
                      widthmain='20%' height='35px' selectedValue={item.charger}
                      options={DropDowncharger}
                      handleChange={(e)=>{handleChargerChange(e, index)}}
                    />
                  </div>
                </div>
              </div>

            )
          })
        }          
      </section>
     
      {
        props.selectTab === 1 && 
        <section>
          <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'10px'}}>
            <div className='btn-row' style={{marginRight:'5px', width:'120px', backgroundColor:'#5fb7df'}}
              onClick={handleReserveSaveTab4}
            >
              <p>저장</p>
            </div>
          </div>
        </section>
      }
    </div>
  )
}
