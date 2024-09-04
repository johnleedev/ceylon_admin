import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import './Menu5Products.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import ModalAddHotel from './Modal/ModalAddHotel';
import { CiCircleRemove, CiCircleCheck  } from "react-icons/ci";
import ModalHotelInfo from './Modal/ModalHotelInfo';
import { SearchBox } from './SearchBox';
import ModalHotelCost from './Modal/ModalHotelCost';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';

export default function Sub2_CounselList (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	
	const [currentTab, setCurrentTab] = useState(2);
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <div className='selectBtn'
       onClick={() => setCurrentTab(tabNum)}
     >
       <p style={{color: currentTab === tabNum ? '#333' : '#BDBDBD'}}>{title}</p>
       <div className='bar' style={{backgroundColor: currentTab === tabNum ? '#5fb7ef' : '#f6f6f6'}}></div>
     </div>
    )    
  };

	// 리스트 가져오기 ------------------------------------------------------
	interface ListProps {
		id: string;
		isView : string;
		isCostInput : string;
		selectCostType: string;
		nation : string;
		city : string;
		label : string;
		hotelNameKo: string;
		hotelNameEn: string;
		hotelLevel : string;
		hotelSort: string;
		hotelPhone: string;
		hotelAddress: string;
		hotelNotice: string;
		hotelConvenience: string;
		hotelCheckIn: string;
		hotelCheckOut: string;
		hotelAllowPet: string;
		hotelParking: string;
		googleLocation: string;
		keywordHashtag: string;
		customerScore: string;
		imageNamesAllView : string;
		imageNamesRoomView : string;
		imageNamesEtcView : string;
		reviseDate : string;
	}
	const [list, setList] = useState<ListProps[]>([]);
	const [nationlist, setNationList] = useState<ListProps[]>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/producthotel/gethotels`)
    if (res) {
      setList(res.data);
    }
		const nationCityRes = await axios.post(`${MainURL}/nationcity/getnationcity`, {
      selectContinent : '전체'
		})
    if (nationCityRes.data !== false) {
			const copy = [...nationCityRes.data];
      setNationList(copy);
    }
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh]);  

	
	// 요금표 ------------------------------------------------------

	// 요금표 생성
	const handleHotelCostCreat = async (item : any) => {
    axios 
      .post(`${MainURL}/producthotel/hotelcostcreat`, {
        postId : item.id,
				hotelNameKo : item.hotelNameKo, 
      	hotelNameEn : item.hotelNameEn
      })
      .then((res) => {
        if (res.data) {
          setIsViewHotelCostModal(true);
        } else {
					alert('다시 시도해주세요.')
				}
      })
      .catch(() => {
        console.log('실패함')
      })
  };


	// 모달 ---------------------------------------------------------
	const [isViewAddHotelModal, setIsViewAddHotelModal] = useState<boolean>(false);
	const [isViewHotelInfoModal, setIsViewHotelInfoModal] = useState<boolean>(false);
	const [hotelInfo, setHotelInfo] = useState<ListProps>();
	const [isViewHotelCostModal, setIsViewHotelCostModal] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteHotel = async (itemId:any) => {
		const getParams = {
			postId : itemId,
		}
		axios 
			.post(`${MainURL}/producthotel/deletehotel`, getParams)
			.then((res) => {
				if (res.data) {
					alert('삭제되었습니다.');
					setRefresh(!refresh);
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};
	const handleDeleteAlert = (item:any) => {
		const costConfirmed = window.confirm(`${item.hotelNameKo}(${item.hotelNameEn})를 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteHotel(item.id);
		} else {
			return
		}
	};

	return (
		<div className='Menu5'>

			<div className="main-title">
				<div className='title-box'>
					<h1>호텔관리</h1>	
				</div>
			</div>

			<div className="topRow">
				<div className="tabSelectBtnBox">
					<SelectMenu title='전체' tabNum={1} />
					<SelectMenu title='휴양지' tabNum={2} />
					<SelectMenu title='관광지' tabNum={3} />
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add')
						setIsViewAddHotelModal(true);
					}}
				>
					<PiPencilSimpleLineFill />
					<p>호텔등록</p>
				</div>
			</div>

			<SearchBox/>

			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='3%' text='노출'/>
						<TitleBox width='10%' text='국가/지역'/>
						<TitleBox width='15%' text='리조트명'/>
						<TitleBox width='5%' text='구분'/>
						<TitleBox width='25%' text='관리'/>
						<TitleBox width='10%' text='수정일'/>
						<TitleBox width='10%' text=''/>
  				</div>
					
					{ list.length > 0 &&
						list.map((item:ListProps, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
									}}
								>
									<TextBox width='3%' text={item.id} />
									<div className="text" style={{width:`3%`, height: '50px', textAlign:'center'}}>
										{ item.isView === 'true'  
											? <FaCircle color='#5fb7ef'/>
											: <IoCloseOutline />
										}
									</div>
									<TextBox width='10%' text={`${item.nation}/${item.city}`} />
									<div className="text" style={{width:`15%`, height: '50px', textAlign:'center', flexDirection:'column'}}>
										<p>{item.hotelNameKo}</p>	
										<p>{item.hotelNameEn}</p>	
									</div>
									<TextBox width='5%' text={item.isCostInput === 'false' ? '미입력' : item.selectCostType} />
									<div className="text" style={{width:`25%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn"
											onClick={()=>{
												setHotelInfo(item);
												setIsViewHotelInfoModal(true);
											}}
										>
											<p>보기</p>
										</div>
										<div className="hotelControlBtn">
											<p>노출위치</p>
										</div>
										<div className="hotelControlBtn"
											onClick={()=>{
												setHotelInfo(item);
												if (item.isCostInput === 'false') {
													handleHotelCostCreat(item);
												} else {
													setIsViewHotelCostModal(true);
												}
											}}
										>
											<p>요금표</p>
										</div>
									</div>
									<TextBox width='10%' text={item.reviseDate} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setHotelInfo(item);
												setIsAddOrRevise('revise');
												setIsViewAddHotelModal(true);
											}}
										>
											<p>수정</p>
										</div>
										<div className="divider"></div>
										<div className="hotelControlBtn2"
											onClick={()=>{ handleDeleteAlert(item);}}
										>
											<p>삭제</p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>

			</div>

			{/* 호텔등록 모달창 */}
      {
        isViewAddHotelModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddHotel
								refresh={refresh}
								setRefresh={setRefresh}
								hotelInfo={hotelInfo}
								isAddOrRevise={isAddOrRevise}
								setIsViewAddHotelModal={setIsViewAddHotelModal}
								nationlist={nationlist}
						 />
          </div>
        </div>
      }

			{/* 호텔정보보기 모달창 */}
      {
        isViewHotelInfoModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalHotelInfo
								refresh={refresh}
								setRefresh={setRefresh}
								hotelInfo={hotelInfo}
								setIsViewHotelInfoModal={setIsViewHotelInfoModal}
						 />
          </div>
        </div>
      }

			{/* 호텔요금표 모달창 */}
      {
        isViewHotelCostModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalHotelCost
								refresh={refresh}
								setRefresh={setRefresh}
								hotelInfo={hotelInfo}
								setIsViewHotelCostModal={setIsViewHotelCostModal}
						 />
          </div>
        </div>
      }

		</div>
	);
}
