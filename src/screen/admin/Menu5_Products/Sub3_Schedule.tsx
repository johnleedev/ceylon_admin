import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import './Menu5Products.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { SearchBox } from './SearchBox';
import ModalAddSchedule from './Modal/ModalAddSchedule';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';

export default function Sub3_Schedule (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	let navigate = useNavigate();

	// 리스트 가져오기 ------------------------------------------------------
	interface ListProps {
		id: string;
		isView : string;
		tourLocation: string;
		landCompany : string;
		productType: string;
		tourPeriod: string;
		departAirport: string;
		departFlight : string;
		selectedSchedule : string;
		cautionNote : string;
		includeNote : string;
		includeNoteText : string;
		notIncludeNote : string;
		notIncludeNoteText : string;
		scheduleList : string;
		reviseDate : string;
	}
	interface DetailsProps {
		id: string;
		scheduleID : string;
		day : string;
		breakfast : string;
		lunch : string;
		dinner : string;
		hotel : string;
		score : string;
		scheduleDetail : string;
	}

	const [list, setList] = useState<ListProps[]>([]);
	const [nationlist, setNationList] = useState<any>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/productschedule/getproductschedule`)
    if (res.data) {
      setList(res.data);
    }
		const nationCityRes = await axios.post(`${MainURL}/nationcity/getnationcity`, {
      selectContinent : '전체'
		})
    if (nationCityRes.data !== false) {
			const copy = [...nationCityRes.data];
			copy.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setNationList(copy);
    }
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh]);  


	// 모달 ---------------------------------------------------------
	const [isViewAddScheduleModal, setIsViewAddScheduleModal] = useState<boolean>(false);
	const [scheduleInfo, setScheduleInfo] = useState<ListProps>();
	const [scheduleDetails, setScheduleDetails] = useState<DetailsProps[]>([]);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 상세 스케줄 가져오기
	const fetchPostCost = async (id:string) => {
		const res = await axios.get(`${MainURL}/productschedule/getproductscheduledetails/${id}`)
		if (res.data !== false) {
			const copy = res.data;
			const result = copy.map((item:any) => ({
				...item,
				scheduleDetail: JSON.parse(item.scheduleDetail)
			}));
			setScheduleDetails(result);
		}
		setIsViewAddScheduleModal(true);
	};

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteHotel = async (itemId:any) => {
		const getParams = {
			postId : itemId,
		}
		axios 
			.post(`${MainURL}/productschedule/deleteschedule`, getParams)
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
		const costConfirmed = window.confirm(`${item.id}번 일정을 정말 삭제하시겠습니까?`);
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
					<h1>일정관리</h1>	
				</div>
			</div>

			<div className="topRow">
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewAddScheduleModal(true);
					}}
				>
					<PiPencilSimpleLineFill />
					<p>일정등록</p>
				</div>
			</div>

			<SearchBox/>

			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='3%' text='노출'/>
						<TitleBox width='10%' text='여행지'/>
						<TitleBox width='10%' text='여행기간'/>
						<TitleBox width='10%' text='랜드사'/>
						<TitleBox width='10%' text='상품타입'/>
						<TitleBox width='10%' text='항공'/>
						<TitleBox width='5%' text='경유숙박'/>
						<TitleBox width='15%' text='일정관리'/>
						<TitleBox width='10%' text='수정일'/>
						<TitleBox width='10%' text=''/>
  				</div>
					
					{
						list.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
									}}
								>
									<TextBox width='3%' text={item.id} />
									<div className="text" style={{width:`3%`, height: '50px', textAlign:'center'}}>
										{ item.isView  
											? <FaCircle color='#5fb7ef'/>
											: <IoCloseOutline />
										}
									</div>
									<TextBox width='10%' text={item.tourLocation} />
									<TextBox width='10%' text={item.tourPeriod}/>
									<TextBox width='10%' text={item.landCompany} />
									<TextBox width='10%' text={item.productType} />
									<TextBox width='10%' text={item.departFlight} />
									<TextBox width='5%' text={''} />
									<div className="text" style={{width:`15%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn"
											onClick={()=>{
	  										setIsAddOrRevise('revise');
												setScheduleInfo(item);
												fetchPostCost(item.id);
											}}
										>
											<p>일정관리</p>
										</div>
										<div className="hotelControlBtn"
											onClick={()=>{
													
											}}
										>
											<p>적용호텔</p>
										</div>
									</div>
									<TextBox width='10%' text={item.reviseDate} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setIsAddOrRevise('revise');
												setScheduleInfo(item);
												setIsViewAddScheduleModal(true);
											}}
										>
											<p>수정</p>
										</div>
										<div className="divider"></div>
										<div className="hotelControlBtn2"
											onClick={()=>{handleDeleteAlert(item);}}
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

			{/* 일정등록 모달창 */}
      {
        isViewAddScheduleModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddSchedule
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewAddScheduleModal={setIsViewAddScheduleModal}
								setScheduleDetails={setScheduleDetails}
								scheduleInfo={scheduleInfo}
								scheduleDetails={scheduleDetails}
								isAddOrRevise={isAddOrRevise}
								nationlist={nationlist}
						 />
          </div>
        </div>
      }

		</div>
	);
}
