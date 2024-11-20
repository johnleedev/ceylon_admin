import React, { useCallback, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import {ko} from "date-fns/locale";
import { format, formatDate } from "date-fns";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropDownAirline, DropDownNum, DropDownTime, DropDownVisitPath, DropDowncharger } from '../../../DefaultData';
import { DateBoxNum } from '../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import Loading from '../../components/Loading';
import { CiCircleMinus } from "react-icons/ci";
import { IoClose } from 'react-icons/io5';
import { TextBox } from '../../../../boxs/TextBox';


export default function ModalLandCompanyInfo (props : any) {
	
  
  const userId = sessionStorage.getItem('userId');
  const infoData = props.selectedData;

  const newdate = new Date();
  const today = formatDate(newdate, 'yyyy-MM-dd');
  const [changeContent, setChangeContent] = useState('');
  interface ChangeNoteProps {
    date : string;
    content : string;
  }
  const [changeNoteList, setChangeNoteList] = useState<ChangeNoteProps[]>(infoData.changeNoteList ? JSON.parse(infoData.changeNoteList) : []);

  const landCompanyList = [
		{id : '1', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '2', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '3', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '4', isView: false, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '5', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
	]

  // 저장 함수
  const handleRegister = async () => {
    await axios
    .post(`${MainURL}/landcompany/updatelandcompanynote`, {
      postId : infoData.id,
      changeNoteList : JSON.stringify(changeNoteList)
    })
    .then((res)=>{
      if (res.data) {
        alert('저장되었습니다.');
        props.setRefresh(!props.refresh);
        props.setIsViewLandCompanyInfo(false);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewLandCompanyInfo(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>랜드사 상세</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드사명'/>
            <p>{infoData.companyName}</p>
          </div>
        </div>
       <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행지'/>
            <p>{infoData.nation}</p>
            <p>{infoData.city}</p>
            <p>{infoData.cityDetail}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='거래일'/>
            <p>{infoData.businessDate}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='소장'/>
            <p>{infoData.owner}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <p>{infoData.ownerPhone}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='OP/담당자'/>
            <p>{infoData.opcharger}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <p>{infoData.opchargerPhone}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='현지여행사'/>
            <p>{infoData.localTourCompany}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='현지연락처'/>
            <p>{infoData.localPhone}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='현지소장'/>
            <p>{infoData.localOwner}</p>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <p>{infoData.localOwnerPhone}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='참고사항' height={200}/>
            <p>{infoData.notice}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='변동사항입력'/>
            <p style={{marginRight:'10px'}}>{today}</p>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={changeContent} onChange={(e)=>{setChangeContent(e.target.value)}}/>
            <div style={{marginLeft:'10px', border:'1px solid #EAEAEA', borderRadius:'5px', padding:'5px 10px'}}
              onClick={()=>{setChangeNoteList([...changeNoteList, {date: today, content:changeContent}])}}
            >입력</div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='변동사항' backgroundColor='#fff'/>
            <div style={{width:'90%'}}>
            {
              changeNoteList.map((item:any, index:any)=>{
                return (
                  <div key={index} style={{display:'flex', margin:'10px 0', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}}>
                      <p>{item.date}</p>
                      <p>{item.content}</p>
                    </div>
                    <div onClick={()=>{
                      const copy = [...changeNoteList];
                      const filtered = copy.filter((e:any, Idx:any)=> Idx !== index )
                      setChangeNoteList(filtered);
                    }}>
                      <p><IoClose color='#FF0000'/></p>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddHotelModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#b1b1b1'}}
          onClick={()=>{
            
          }}
        >
          <p style={{color:'#fff'}}>삭제</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={handleRegister}
          >
          <p>저장</p>
        </div>
      </div>

      <div style={{height:'50px'}}></div>

      <div className="modal-header">
        <h1>랜드호텔 리스트</h1>
      </div>

      <div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
            <TitleBox width='5%' text='선택'/>
            <TitleBox width='5%' text='노출'/>
						<TitleBox width='10%' text='국가/지역'/>
						<TitleBox width='10%' text='리조트명'/>
						<TitleBox width='10%' text='참고사항'/>
						<TitleBox width='10%' text='랜드베네핏'/>
						<TitleBox width='10%' text='기본네고'/>
						<TitleBox width='10%' text='등록상품수'/>
						<TitleBox width='10%' text='수정일'/>
  				</div>
					
					{
						landCompanyList.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										// handleInputData(item);
									}}
								>
									<TextBox width='3%' text={item.id} />
                  <TextBox width='5%' text={""} />
                  <TextBox width='5%' text={""} />
									<TextBox width='10%' text={item.companyName} />
									<TextBox width='10%' text={item.owner} />
									<TextBox width='10%' text={""} />
									<TextBox width='10%' text={""} />
									<TextBox width='10%' text={""} />
									<TextBox width='10%' text={item.notice} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2">
											<p>수정</p>
										</div>
										<div className="divider"></div>
										<div className="hotelControlBtn2">
											<p>삭제</p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>

			</div>

     
    </div>     
  )
}
