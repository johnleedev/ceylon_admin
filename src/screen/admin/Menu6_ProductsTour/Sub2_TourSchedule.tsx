import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import '../Products.scss'
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import ModalAddSchedule from './Modal/ModalAddSchedule';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { FaWonSign } from "react-icons/fa";
import ModalCondition from './Modal/ModalCondition';
import ModalHotelRevise from './Modal/ModalHotelRevise';
import ModalScheduleRevise from './Modal/ModalScheduleRevise';

interface ListProps {
	id: string;
	isView : string;
	landCompany : string;
	landCompanyCode : string;
	nation: string;
	tourLocation: string;
	tourProductName: string;
	tourPeriod: string;
	tourPeriodCode: string;
	departAirport: string;
	departFlight : string;
	depositCost : string;
	productNotice: string;
	cautionNote : string;
	contractBenefit : string;
  includeNoteText : string;
	notIncludeNoteText : string;
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

export default function Sub2_TourSchedule (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<any>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/tourproductschedule/getproductschedule/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
      setList(copy);
      setListAllLength(res.data.totalCount);
    }
		const nationCityRes = await axios.get(`${MainURL}/tournationcity/getnationcity`)
    if (nationCityRes.data !== false) {
			const copy = [...nationCityRes.data];
			copy.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setNationList(copy);
    }
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh, currentPage]);  


  // State 변수 추가
  const itemsPerPage = 10; // 한 페이지당 표시될 게시글 수
  const totalPages = Math.ceil(listAllLength / itemsPerPage);

  // 페이지 변경 함수
  const changePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // 페이지네이션 범위 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;
    const half = Math.floor(maxPagesToShow / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);
    if (currentPage - half < 1) {
      end = Math.min(totalPages, end + (half - currentPage + 1));
    }
    if (currentPage + half > totalPages) {
      start = Math.max(1, start - (currentPage + half - totalPages));
    }
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };


	// 검색 기능 ------------------------------------------------------------------------------------------------------------------------------------------  
	const [searchSort, setSearchSort] = useState('전체');
	const [searchWord, setSearchWord] = useState('');
	const handleWordSearching = async () => {
		setList([]);
		try {
			const res = await axios.post(`${MainURL}/tourproductschedule/getproductschedulesearch`, {
				sort : searchSort,
				word : searchWord
			});
			if (res.data.resultData) {
				const copy = [...res.data.resultData];
				setList(copy);
				setListAllLength(res.data.totalCount);
			} else {
				setList([]);
				setListAllLength(0);
			}
		} catch (error) {
			console.error("Failed to fetch search results:", error);
		}	
	};
	

	// 모달 ---------------------------------------------------------
	const [isViewAddConditionModal, setIsViewAddConditionModal] = useState<boolean>(false);
	const [isViewAddScheduleModal, setIsViewAddScheduleModal] = useState<boolean>(false);
	const [isViewHotelReviseModal, setIsViewHotelReviseModal] = useState<boolean>(false);
	const [isViewScheduleReviseModal, setIsViewScheduleReviseModal] = useState<boolean>(false);
	const [scheduleInfo, setScheduleInfo] = useState<ListProps>();
	const [scheduleDetails, setScheduleDetails] = useState<DetailsProps[]>([]);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 상세 스케줄 가져오기
	const fetchPostCost = async (id:string) => {
		const res = await axios.get(`${MainURL}/tourproductschedule/getproductscheduledetails/${id}`)
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
			.post(`${MainURL}/tourproductschedule/deleteschedule`, getParams)
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
					<h1>여행일정관리</h1>	
				</div>
				<div style={{display:'flex'}}>
					<div className="addBtn"
						style={{marginRight:'10px'}}
						onClick={()=>{
							setIsAddOrRevise('add');
							setIsViewAddConditionModal(true);
						}}
					>
						<FaWonSign />
						<p>요금조건표</p>
					</div>
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
			</div>

			<div style={{height:'20px'}}></div>

			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DropdownBox
							widthmain='150px'
							height='35px'
							selectedValue={searchSort}
							options={[
								{ value: '전체', label: '전체' },
								{ value: '선투숙+풀빌라', label: '선투숙+풀빌라' },
								{ value: '경유지+선투숙+풀빌라', label: '경유지+선투숙+풀빌라' },
								{ value: '같은리조트+풀빌라', label: '같은리조트+풀빌라' }
							]}
							handleChange={(e)=>{setSearchSort(e.target.value)}}
						/>
						<input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
								value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} 
								onKeyDown={(e)=>{if (e.key === 'Enter') {handleWordSearching();}}}
								/>
						<div className="buttons" style={{margin:'20px 0'}}>
							<div className="btn searching"
								onClick={()=>{
									handleWordSearching();
								}}
							>
								<p>검색</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div style={{height:'20px'}}></div>

			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='3%' text='노출'/>
						<TitleBox width='10%' text='상품명'/>
						<TitleBox width='10%' text='여행기간'/>
						<TitleBox width='10%' text='랜드사코드'/>
						<TitleBox width='10%' text='입금가'/>
						<TitleBox width='15%' text='관리'/>
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
									<TextBox width='10%' text={item.tourProductName} />
									<TextBox width='10%' text={item.tourPeriod}/>
									<TextBox width='10%' text={item.landCompanyCode} />
									<TextBox width='10%' text={item.depositCost} />
									<div className="text" style={{width:`15%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn"
											onClick={()=>{
												setIsViewHotelReviseModal(true);
											}}
										>
											<p>호텔변경</p>
										</div>
										<div className="hotelControlBtn"
											onClick={()=>{
												setIsViewScheduleReviseModal(true);
											}}
										>
											<p>일정변경</p>
										</div>
									</div>
									<TextBox width='10%' text={item.reviseDate} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setIsAddOrRevise('revise');
												setScheduleInfo(item);
												fetchPostCost(item.id);
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
				<div className='btn-row'>
					<div onClick={() => changePage(1)} className='btn'
						style={{ backgroundColor: currentPage === 1 ? "#EAEAEA" : "#2c3d54" }}
					>
						<p style={{ color: currentPage === 1 ? "#ccc" : "#fff" }}>{"<<"}</p>
					</div>
					<div onClick={() => changePage(currentPage - 1)} className='btn'
						style={{ backgroundColor: currentPage === 1 ? "#EAEAEA" : "#2c3d54" }}
					>
						<p style={{ color: currentPage === 1 ? "#ccc" : "#fff" }}>{"<"}</p>
					</div>
					{getPageNumbers().map((page) => (
						<div key={page} onClick={() => changePage(page)} className='btn'
							style={{ backgroundColor: currentPage === page ? "#2c3d54" : "#EAEAEA" }}
						>
							<p style={{ color: currentPage === page ? "#fff" : "#333" }}>{page}</p>
						</div>
					))}
					<div onClick={() => changePage(currentPage + 1)} className='btn'
						style={{ backgroundColor: currentPage === totalPages ? "#EAEAEA" : "#2c3d54" }}
					>
						<p style={{ color: currentPage === totalPages ? "#ccc" : "#fff" }}>{">"}</p>
					</div>
					<div onClick={() => changePage(totalPages)} className='btn'
						style={{ backgroundColor: currentPage === totalPages ? "#EAEAEA" : "#2c3d54" }}
					>
						<p style={{ color: currentPage === totalPages ? "#ccc" : "#fff" }}>{">>"}</p>
					</div>
				</div>
			</div>

			{/* 요금조건표 모달창 */}
			{
        isViewAddConditionModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalCondition
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewAddConditionModal={setIsViewAddConditionModal}
								setScheduleDetails={setScheduleDetails}
								scheduleInfo={scheduleInfo}
								scheduleDetails={scheduleDetails}
								isAddOrRevise={isAddOrRevise}
								nationlist={nationlist}
						 />
          </div>
        </div>
      }
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
			{/* 호텔변경 모달창 */}
			{
        isViewHotelReviseModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalHotelRevise
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewHotelReviseModal={setIsViewHotelReviseModal}
								setScheduleDetails={setScheduleDetails}
								scheduleInfo={scheduleInfo}
								scheduleDetails={scheduleDetails}
								isAddOrRevise={isAddOrRevise}
								nationlist={nationlist}
						 />
          </div>
        </div>
      }
			{/* 일정변경 모달창 */}
			{
        isViewScheduleReviseModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalScheduleRevise
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewScheduleReviseModal={setIsViewScheduleReviseModal}
								
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
