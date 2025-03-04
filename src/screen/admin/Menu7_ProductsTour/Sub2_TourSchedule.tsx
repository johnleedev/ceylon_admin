import React, { useEffect, useRef, useState } from 'react';
import { TitleList } from '../../../boxs/TitleList';
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
import ModalAddScheduleAddAirline from './Modal/ModalAddScheduleAddAirline';

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
	const [viewList, setViewList] = useState<ListProps[]>([]);
	const [viewAirlineList, setViewAirlineList] = useState<boolean[]>([]);
	const [listOrigin, setListOrigin] = useState<ListProps[]>([]);
	const [expandedList, setExpandedList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<any>([]);


  const fetchPosts = async () => {
		const resall = await axios.get(`${MainURL}/tourproductschedule/getproductscheduleall`)
    if (resall.data) {
      const copy = resall.data;
      setListOrigin(copy);
    }
    const res = await axios.get(`${MainURL}/tourproductschedule/getproductschedule/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
			copy.reverse();
      setViewList(copy);
			setViewAirlineList(() => copy.map(() => false));
      setListAllLength(res.data.totalCount);
    }
		const nationCityRes = await axios.get(`${MainURL}/tournationcity/getnationcity`)
    if (nationCityRes.data !== false) {
			const copy = [...nationCityRes.data];
			copy.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setNationList(copy);
			const searchNationsResult = copy.map((item:any)=>
        ({ value:`${item.nationKo}`,  label:`${item.nationKo}` })
      );
      searchNationsResult.unshift({ value: '전체', label: '전체' });
			setSearchNationsOptions(searchNationsResult);
    }
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh, currentPage]);  

	// 항공 버튼 클릭 시 추가 항목 표시
	const handleAirlineClick = (item: ListProps) => {
		const additionalItems = listOrigin.filter(
				(el:any) => (el.nation === item.nation) && (el.tourLocation === item.tourLocation) && (el.sort === "addairline")
		);
		setExpandedList(additionalItems);
	};

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
	const [searchNation, setSearchNation] = useState('전체');
	const [searchCity, setSearchCity] = useState('전체');
	const [searchWord, setSearchWord] = useState('');
	const [searchNationsOptions, setSearchNationsOptions] = useState([{ value: '선택', label: '선택' }]);
	const [searchCityOptions, setSearchCityOptions] = useState<any>([]);
	
	const handleWordSearching = async () => {
		setViewList([]);
		try {
			const res = await axios.post(`${MainURL}/tourproductschedule/getproductschedulesearch`, {
				city : searchCity,
				word : searchWord
			});
			if (res.data.resultData) {
				const copy = [...res.data.resultData];
				copy.reverse();
				setViewList(copy);
				setListAllLength(res.data.totalCount);
			} else {
				setViewList([]);
				setListAllLength(0);
			}
		} catch (error) {
			console.error("Failed to fetch search results:", error);
		}	
	};
	

	// 모달 ---------------------------------------------------------
	const [isViewAddConditionModal, setIsViewAddConditionModal] = useState<boolean>(false);
	const [isViewAddScheduleModal, setIsViewAddScheduleModal] = useState<boolean>(false);
	const [isViewAddAirlineModal, setIsViewAddAirlineModal] = useState<boolean>(false);
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
				scheduleDetail: JSON.parse(item.scheduleDetail.replace(/\t/g, ""))
			}));
			const sortedResult = result.sort((a: any, b: any) => Number(a.day) - Number(b.day));
			setScheduleDetails(sortedResult);
		}
		setIsViewAddScheduleModal(true);
	};

	// 수정 상세 스케줄 가져오기
	const fetchPostAirline = async (id:string) => {
		const res = await axios.get(`${MainURL}/tourproductschedule/getproductscheduledetails/${id}`)
		if (res.data !== false) {
			const copy = res.data;
			const result = copy.map((item:any) => ({
				...item,
				scheduleDetail: JSON.parse(item.scheduleDetail.replace(/\t/g, ""))
			}));
			const sortedResult = result.sort((a: any, b: any) => Number(a.day) - Number(b.day));
			setScheduleDetails(sortedResult);
		}
		setIsViewAddAirlineModal(true);
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
		<div className='Main-cover'>

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

			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DropdownBox
							widthmain='150px'
							height='35px'
							selectedValue={searchNation}
							options={searchNationsOptions}
							handleChange={(e)=>{
								if (e.target.value === '전체') {
									setCurrentPage(1);
									setSearchNation('전체');
									setSearchCity('선택');
									fetchPosts();
								} else {
									setSearchNation(e.target.value);
									const copy : any = [...nationlist];
									const filtered = copy.filter((list:any)=> list.nationKo === e.target.value)
									setSearchCityOptions(filtered[0].cities)
								}
							}}
						/>
						<DropdownBox
							widthmain='150px'
							height='35px'
							selectedValue={searchCity}
							options={[
                { value: '선택', label: '선택' },
                ...searchCityOptions.map((nation:any) => (
                  { value: nation.cityKo, label: nation.cityKo }
                ))
              ]}    
							handleChange={(e)=>{setSearchCity(e.target.value)}}
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
							<div className="buttons" style={{margin:'20px 0'}}>
							<div className="btn searching"
								style={{backgroundColor:'#fff'}}
								onClick={()=>{
									setCurrentPage(1);
									setSearchNation('전체');
									setSearchCity('선택');
									setSearchWord('');
									fetchPosts();
								}}
							>
								<p style={{color:"#333"}}>초기화</p>
							</div>
						</div>
						</div>
					</div>
				</div>
			</div>

			<div className="seachlist">
				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width='3%' text='NO'/>
						<TitleList width='3%' text='노출'/>
						<TitleList width='10%' text='여행지'/>
						<TitleList width='10%' text='랜드사'/>
						<TitleList width='10%' text='항공사'/>
						<TitleList width='20%' text='여행기간'/>
						<TitleList width='10%' text='입금가'/>
						<TitleList width='10%' text='판매가'/>
						<TitleList width='10%' text='관리'/>
						<TitleList width='7%' text='수정일'/>
						<TitleList width='7%' text=''/>
  				</div>
					{
						viewList.map((item:any, index:any)=>{

							return (
								<div key={index} >
									<div className="rowbox" style={{backgroundColor: viewAirlineList[index] ? '#f0f9ff' : '#fff' }}>
										<TextBox width='3%' text={item.id} />
										<div className="text" style={{width:`3%`, height: '50px', textAlign:'center'}}>
											{ item.isView  
												? <FaCircle color='#5fb7ef'/>
												: <IoCloseOutline />
											}
										</div>
										<TextBox width='10%' text={item.tourLocation} />
										<TextBox width='10%' text={item.landCompany} />
										<TextBox width='10%' text={item.departFlight} />
										<TextBox width='20%' text={`${item.tourProductName} / ${item.tourPeriod}`}/>
										<TextBox width='10%' text={''} />
										<TextBox width='10%' text={''} />
										<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
											<div className="hotelControlBtn"
												onClick={()=>{
													handleAirlineClick(item);
													const copy = viewAirlineList.map((_, i) => i === index);
													setViewAirlineList(copy);
												}}
											>
												<p>항공</p>
											</div>
											<div className="hotelControlBtn"
												onClick={()=>{
														
												}}
											>
												<p>호텔</p>
											</div>
										</div>
										<TextBox width='7%' text={item.reviseDate} />
										<div className="text" style={{width:`7%`, height: '50px', textAlign:'center'}}>
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
									{
										viewAirlineList[index] &&
										<div style={{border:'2px solid #333'}}>
											<div className="TitleList">
												<TitleList width='3%' text='NO'/>
												<TitleList width='3%' text='노출'/>
												<TitleList width='10%' text='출발지'/>
												<TitleList width='10%' text='항공사'/>
												<TitleList width='20%' text='여행기간'/>
												<TitleList width='10%' text='코드'/>
												<TitleList width='10%' text='입금가'/>
												<TitleList width='10%' text='판매가'/>
												<TitleList width='7%' text='등록일'/>
												<TitleList width='7%' text=''/>
												<div className="text" style={{width:`7%`, height:'40px', textAlign:'center'}}>
													<div className='addAirlineBtnBox'
														onClick={()=>{
															handleAirlineClick(item);
															const copy = viewAirlineList.map((_, i) => i === index);
															setViewAirlineList(copy);
														}}
													>
														<p className='addAirlineBtn'
															onClick={()=>{
																setIsAddOrRevise('revise');
																setScheduleInfo(item);
																fetchPostAirline(item.id);
															}}
														>항공추가</p>
													</div>
													<div className='addAirlineBtnBox' style={{marginLeft:'3px'}}
														onClick={()=>{
															setViewAirlineList(() => viewAirlineList.map(() => false));
														}}
													>
														<p className='addAirlineBtn'>X</p>
													</div>
												</div>
											</div>
											{ expandedList.length > 0 &&
												expandedList.map((subItem:any, subIndex:any)=>{

													return (
														<div className="rowbox" key={subIndex} style={{backgroundColor: '#f0f9ff' }}>
															<TextBox width='3%' text={subItem.id} />
															<div className="text" style={{width:`3%`, height: '50px', textAlign:'center'}}>
																{ subItem.isView  
																	? <FaCircle color='#5fb7ef'/>
																	: <IoCloseOutline />
																}
															</div>
															<TextBox width='10%' text={subItem.departAirport} />
															<TextBox width='10%' text={subItem.departFlight} />
															<TextBox width='20%' text={`${subItem.tourProductName} / ${subItem.tourPeriod}`}/>
															<TextBox width='10%' text={''} />
															<TextBox width='10%' text={''} />
															<TextBox width='10%' text={''} />
															<TextBox width='7%' text={subItem.reviseDate} />
															<div className="text" style={{width:`7%`, height: '50px', textAlign:'center'}}>
																<div className="hotelControlBtn2"
																	onClick={()=>{
																		setIsAddOrRevise('revise');
																		setScheduleInfo(subItem);
																		fetchPostCost(subItem.id);
																	}}
																>
																	<p>수정</p>
																</div>
																<div className="divider"></div>
																<div className="hotelControlBtn2"
																	onClick={()=>{handleDeleteAlert(subItem);}}
																>
																	<p>삭제</p>
																</div>
															</div>
															<TextBox width='7%' text={''} />
														</div>
													)
												})
											}
										</div>
									}
								</div>
							)
						})
					}
				</div>
				<div className='btn-row'>
					<div onClick={() => changePage(1)} className='btn'>
						<p>{"<<"}</p>
					</div>
					<div onClick={() => changePage(currentPage - 1)} className='btn'>
						<p>{"<"}</p>
					</div>
					{getPageNumbers().map((page) => (
						<div key={page} onClick={() => changePage(page)} 
						 className={currentPage === page ? 'current btn' : 'btn'}
						>
							<p>{page}</p>
						</div>
					))}
					<div onClick={() => changePage(currentPage + 1)} className='btn'>
						<p>{">"}</p>
					</div>
					<div onClick={() => changePage(totalPages)} className='btn'>
						<p>{">>"}</p>
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
			{/* 항공변경 모달창 */}
			{
        isViewAddAirlineModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddScheduleAddAirline
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewAddAirlineModal={setIsViewAddAirlineModal}
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
