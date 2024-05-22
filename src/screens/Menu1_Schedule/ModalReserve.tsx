import React, { useState } from 'react'
import './ModalReserve.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { SelectBox } from '../../boxs/SelectBox';
import { InputBox } from '../../boxs/InputBox';
import { DateBoxKo } from '../../boxs/DateBoxKo';
import { RadioBox } from '../../boxs/RadioBox';
import ModalReserveTab1 from './ModalReserveTab1';
import ModalReserveTab2 from './ModalReserveTab2';
import ModalReserveTab3 from './ModalReserveTab3';
import ModalReserveTab4 from './ModalReserveTab4';
import axios from 'axios';
import MainURL from '../../MainURL';


export default function ModalReserve (props : any) {

  // selectTab -------------------------------------------------------------------------
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

  // 예약최초 등록 및 삭제 함수 ---------------------------------------------------------
  const [inputState, setInputState] = useState('new');

  const isCancel = async () => {
    if (inputState === 'new') {
      const result = window.confirm(`${props.serialNum}의 입력된 모든 정보가 삭제됩니다. ${props.serialNum} 등록을 취소하시겠습니까?`);
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


  return (
    <div className='modal-reserve'>
      <div className='close'>
        <div onClick={isCancel} className='close-btn'>
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
      </section>

      {
        (selectTab === 1 || selectTab === 2)
        &&
        <ModalReserveTab1 serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}/>
      }

      {
        (selectTab === 1 || selectTab === 3)
        &&
        <ModalReserveTab2 serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}/>
      }

      {
        (selectTab === 1 || selectTab === 4)
        &&
        <ModalReserveTab3 serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}/>
      }

      {
        (selectTab === 1 || selectTab === 5)
        &&
        <ModalReserveTab4 serialNum={props.serialNum} setInputState={setInputState} selectTab={selectTab}/>
      }

    </div>     
  )
}
