import React, { useEffect, useState } from 'react'
import './ModalReserve.scss'
import { IoMdClose } from "react-icons/io";
import ModalReserveTab1 from './ModalReserveTab1';
import ModalReserveTab2 from './ModalReserveTab2';
import ModalReserveTab3 from './ModalReserveTab3';
import ModalReserveTab4 from './ModalReserveTab4';
import axios from 'axios';
import MainURL from '../../MainURL';
import { FaRegCheckCircle } from "react-icons/fa";

export default function ModalReserve (props : any) {

  const modalSort = props.modalSort;
  const [inputState, setInputState] = useState(modalSort);
  const [saveCheck, setSaveCheck] = useState({
    Users : false,
    Products : false,
    Deposit : false,
    Delivery : false
  })
  
  // selectTab ---------------------------------------------------------------------------------------------------------------------
  const [selectTab, setSelectTab] = useState(1);
  const SelectTabBox = ({ num, title }: { num: number; title: string }) => (
    <div className="select-btn"
      style={{border: selectTab === num ? '2px solid #d7d7d7' : '2px solid #FFF', 
              borderBottom: selectTab === num ? '2px solid #FFF' : '2px solid #d7d7d7'}}
      onClick={()=>{setSelectTab(num);}}
    >
      <p style={{color: selectTab === num ? '#333' : '#BDBDBD'}}>{title}</p>
    </div>
  )

  // 예약최초 등록 및 삭제 함수 -----------------------------------------------------------------------------------------------------------
  const isCancel = async () => {
    if (!saveCheck.Users || !saveCheck.Products || !saveCheck.Deposit || !saveCheck.Delivery) {
      const result = window.confirm(`
데이터가 모두 입력되지 않은 상태입니다. 
이전까지 입력된 ${props.serialNum}의 입력된 모든 정보가 삭제됩니다. 
${props.serialNum} 등록을 취소하시겠습니까? 

나중에 다시 추가로 입력하시려면, 각 탭에 저장버튼을 눌러주세요.
`);
      if (result) {
        handleCancel();
      } else {
        return
      }
    } else {
      props.setIsViewModal(false);
      props.setRefresh(!props.refresh);
    }
  };

  const handleCancel = async () => {
    await axios
    .post(`${MainURL}/adminreserve/cancelmain`, {
      serialNum : props.serialNum
    })
    .then((res)=>{
      if (res.data) {
        alert('등록 취소되었습니다.')
        props.setIsViewModal(false);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // 저장 체크 함수 ---------------------------------------------------------
  const reserveCheck = async () => {
    const res = await axios.get(`${MainURL}/adminreserve/getreservecheck/${props.serialNum}`)
    if (res) {
      const copy = {...saveCheck};
      copy.Users = res.data.Users;
      copy.Products = res.data.Products;
      copy.Deposit = res.data.Deposit;
      copy.Delivery = res.data.Delivery;
      setSaveCheck(copy);
    }
  };

  useEffect(() => {
    if (modalSort === 'new' ) {
      reserveCheck();
    }
  }, []);
 
  return (
    <div className='modal-reserve'>
      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            if (modalSort === 'new' ) {
              isCancel();
            } else {
              props.setRefresh(!props.refresh);
              props.setIsViewModal(false);
            }
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>

      <section>
        <h1>예약고유번호 : {props.serialNum}</h1>
      </section>

      <section>
        <h1>1. 진행상황</h1>

        <div className='state-row'>
          <div className='textbox'>
            <p>계약완료</p>
          </div>
          <div className='rotatebox'></div>
          <div className='textbox'>
            <p>발권완료</p>
          </div>
          <div className='rotatebox'></div>
          <div className='textbox'>
            <p>예약확정</p>
          </div>
          <div className='rotatebox'></div>
          <div className='textbox'>
            <p>출발준비</p>
          </div>
        </div>
        
      </section>

      <section>
        <div className="select-row">
          <SelectTabBox num={1} title='전체보기' />
          <SelectTabBox num={2} title='1.고객정보' />
          <SelectTabBox num={3} title='2.상품정보' />
          <SelectTabBox num={4} title='3.입금내역' />
          <SelectTabBox num={5} title='4.고객전달사항' />
        </div>
        {
          modalSort === 'new' &&
          <div className="select-row">
            <div className="select-btn">
            </div>
            <div className="select-btn">
              <FaRegCheckCircle color={saveCheck.Users ? '#1DDB16' :'#EAEAEA'} size={24}/>
            </div>
            <div className="select-btn">
              <FaRegCheckCircle color={saveCheck.Products ? '#1DDB16' :'#EAEAEA'} size={24}/>
            </div>
            <div className="select-btn">
              <FaRegCheckCircle color={saveCheck.Deposit ? '#1DDB16' :'#EAEAEA'} size={24}/>
            </div>
            <div className="select-btn">
              <FaRegCheckCircle color={saveCheck.Delivery ? '#1DDB16' :'#EAEAEA'} size={24}/>
            </div>
          </div>
        }
        
      </section>

      {
        (selectTab === 1 || selectTab === 2)
        &&
        <ModalReserveTab1 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          refresh={props.refresh} setRefresh={props.setRefresh} reserveCheck={reserveCheck}
          modalSort={modalSort} reserveInfo={props.reserveInfo} userInfo={props.userInfo} 
        />
      }

      {
        (selectTab === 1 || selectTab === 3)
        &&
        <ModalReserveTab2 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          refresh={props.refresh} setRefresh={props.setRefresh} reserveCheck={reserveCheck}
          modalSort={modalSort} reserveInfo={props.reserveInfo} 
          productCost={props.productCost} airportState={props.airportState}
          ticketingState={props.ticketingState} hotelReserveState={props.hotelReserveState} etcState={props.etcState}

        />
      }

      {
        (selectTab === 1 || selectTab === 4)
        &&
        <ModalReserveTab3 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          refresh={props.refresh} setRefresh={props.setRefresh} reserveCheck={reserveCheck}
          modalSort={modalSort} reserveInfo={props.reserveInfo} 
          depositCostList={props.depositCostList} refundCost={props.refundCost}
        />
      }

      {
        (selectTab === 1 || selectTab === 5)
        &&
        <ModalReserveTab4 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          refresh={props.refresh} setRefresh={props.setRefresh} reserveCheck={reserveCheck}
          modalSort={modalSort} reserveInfo={props.reserveInfo} deliveryList={props.deliveryList}
        />
      }

    </div>     
  )
}
