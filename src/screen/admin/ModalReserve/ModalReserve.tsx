import React, { useEffect, useState } from 'react'
import './ModalReserve.scss'
import { IoMdClose } from "react-icons/io";
import ModalReserveTab1 from './ModalReserveTab1';
import ModalReserveTab2 from './ModalReserveTab2';
import ModalReserveTab3 from './ModalReserveTab3';
import ModalReserveTab4 from './ModalReserveTab4';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { FaRegCheckCircle } from "react-icons/fa";

export default function ModalReserve (props : any) {

  const modalSort = props.modalSort;
  const sort = props.sort;
  const [inputState, setInputState] = useState(modalSort);
    
  // selectTab ---------------------------------------------------------------------------------------------------------------------
  const [selectTab, setSelectTab] = useState(1);
  const SelectTabBox = ({ num, title }: { num: number; title: string }) => (
    <div className="select-btn"
      style={{background: selectTab === num ? '#333' : '#fff'}}
      onClick={()=>{
        setSelectTab(num);
      }}
    >
      <p style={{color: selectTab === num ? '#fff' : '#333'}}>{title}</p>
    </div>
  )

  // 예약최초 등록 및 삭제 함수 -----------------------------------------------------------------------------------------------------------
  const isCancel = async () => {
    if (inputState === 'new') {
      const result = window.confirm(`
데이터가 저장되지 않은 상태입니다. 
이전까지 입력된 ${props.serialNum}의 입력된 모든 정보가 삭제됩니다. 
${props.serialNum} 등록을 취소하시겠습니까? 
`);
      if (result) {
        handleCancel();
      } else {
        return
      }
    } else {
      props.setIsViewModal(false);
      props.setRefresh(!props.refresh);
      props.fetchReservePosts();
    }
  };

  const handleCancel = async () => {
    await axios
    .post(`${MainURL}/adminreserve/deletemain`, {
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


  return (
    <div className='modal-reserve'>
      
      <div className="reserve-top">
        <div className='reserve-top-titleBox'>
          <h1>예약고유번호 : {props.serialNum}</h1>
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
              <p>여행경비납부</p>
            </div>
            <div className='rotatebox'></div>
            <div className='textbox'>
              <p>출발안내문발송</p>
            </div>
          </div>
          
        </section>

        <div className="select-row">
          <SelectTabBox num={1} title='전체보기' />
          <SelectTabBox num={2} title='고객정보' />
          <SelectTabBox num={3} title='상품정보' />
          <SelectTabBox num={4} title='입금내역' />
          <SelectTabBox num={5} title='고객전달사항' />
        </div>
      </div>

      <div className="reserve-contents">

      {
        (selectTab === 1 || selectTab === 2)
        &&
        <ModalReserveTab1 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          sort={sort} refresh={props.refresh} setRefresh={props.setRefresh}
          modalSort={modalSort} reserveInfo={props.reserveInfo} userInfo={props.userInfo} 
          fetchReservePosts={props.fetchReservePosts}
        />
      }

      {
        (selectTab === 1 || selectTab === 3)
        &&
        <ModalReserveTab2 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          sort={sort} refresh={props.refresh} setRefresh={props.setRefresh}
          modalSort={modalSort} reserveInfo={props.reserveInfo} 
          productCost={props.productCost} airportState={props.airportState}
          ticketingState={props.ticketingState} hotelReserveState={props.hotelReserveState} etcState={props.etcState}
          fetchReservePosts={props.fetchReservePosts}
        />
      }

      {
        (selectTab === 1 || selectTab === 4)
        &&
        <ModalReserveTab3 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          sort={sort} refresh={props.refresh} setRefresh={props.setRefresh}
          modalSort={modalSort} reserveInfo={props.reserveInfo} 
          depositCostList={props.depositCostList} refundCost={props.refundCost}
          fetchReservePosts={props.fetchReservePosts}
        />
      }

      {
        (selectTab === 1 || selectTab === 5)
        &&
        <ModalReserveTab4 
          serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}
          sort={sort} refresh={props.refresh} setRefresh={props.setRefresh}
          modalSort={modalSort} reserveInfo={props.reserveInfo} deliveryList={props.deliveryList}
          fetchReservePosts={props.fetchReservePosts}
        />
      }
      </div>

    </div>     
  )
}
