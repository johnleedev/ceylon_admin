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

export default function Sub3_Schedule (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<any>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/productschedule/getproductschedule/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
      setList(copy);
      setListAllLength(res.data.totalCount);
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
			const res = await axios.post(`${MainURL}/productschedule/getproductschedulesearch`, {
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
