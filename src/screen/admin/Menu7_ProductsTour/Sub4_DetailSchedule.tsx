import React, { useEffect, useRef, useState } from 'react';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import '../Products.scss'
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { DropdownBox } from '../../../boxs/DropdownBox';
import ModalAddScheduleDetailBox from './Modal/ModalAddScheduleDetailBox';
import { ScheduleDatailSorts } from './CommonTourData';

interface ListProps {
	id: string;
	sort : string;
	nation: string;
	city: string;
	productName: string;
	detailNotice: string;
	tourTime: string;
	runTime: string;
	openDate: string;
	closeDate: string;
	meetLocation: string;
	phone: string;
	caution: string;
	programTimeCost: string;
	includeNoteText: string;
	notIncludeNoteText: string;
	cancelNotice: string;
	badges: string;
	scores: string;
	inputImage: string;
	reviseDate: string;
}


export default function Sub4_DetailSchedule (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const sorts = ScheduleDatailSorts;
	const [selectSort, setSelectSort] = useState('전체');

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [list, setList] = useState<ListProps[]>([]);
	const [listOrigin, setListOrigin] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<any>([]);
	const [searchNationsOptions, setSearchNationsOptions] = useState([{ value: '선택', label: '선택' }]);
	const [searchCityOptions, setSearchCityOptions] = useState<any>([]);
	
	const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/tourscheduledetailbox/getdetailproducts/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
      setList(copy);
			setListOrigin(copy);
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

  // State 변수 추가
  const itemsPerPage = 15; // 한 페이지당 표시될 게시글 수
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

	const handleWordSearching = async () => {
		setList([]);
		try {
			const res = await axios.post(`${MainURL}/tourscheduledetailbox/getdetailproductsearch`, {
				city : searchCity,
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
	const [isViewAddScheduleDetailBox, setIsViewAddScheduleDetailBox] = useState<boolean>(false);
	const [scheduleDetailInfo, setScheduleDetailInfo] = useState<ListProps>();
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteDetailBox = async (item:any) => {
		const getParams = {
			postId : item.id,
			images : JSON.parse(item.inputImage)
		}
		axios 
			.post(`${MainURL}/tourscheduledetailbox/deletedetailbox`, getParams)
			.then((res) => {
				if (res.data) {
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
				deleteDetailBox(item);
		} else {
			return
		}
	};

	const renderPreview = (content : string) => {
    if (content?.length > 200) {
      return content.substring(0, 200) + '...';
    }
    return content;
  };

	return (
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>세부일정 관리</h1>	
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewAddScheduleDetailBox(true);
					}}
				>
					<PiPencilSimpleLineFill />
					<p>상품등록</p>
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
							handleChange={(e)=>{
								const text = e.target.value;
								setSearchCity(text);
								const copy = listOrigin.filter((e:any) => e.city === text);
								setList(copy);
							}}
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

			<div className="continentBtnbox">
				{
					sorts.map((item:any, index:any)=>{
						return (
							<div className="continentNtn" key={index}
								style={{backgroundColor: selectSort === item ? '#242d3f' : '#fff'}}
								onClick={()=>{
									if (item === '전체') {
										setList(listOrigin);
									} else {
										const copy = listOrigin.filter((e:any) => e.sort === item);
										setList(copy);
									}
								}}
							>
								<p style={{color: selectSort === item ? '#fff' : '#333'}}>{item}</p>
							</div>
						)
					})
				}
			</div>

			<div className="seachlist">
				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width='3%' text='NO'/>
						<TitleList width='20%' text='이미지'/>
						<TitleList width='10%' text='상품명'/>
						<TitleList width='30%' text='상품설명'/>
						<TitleList width='10%' text='수정일'/>
						<TitleList width='10%' text=''/>
  				</div>
					
					{ list.length > 0 &&
						list.map((item:any, index:any)=>{

							const image = JSON.parse(item.inputImage);

							return (
								<div key={index}
									className="rowbox"
									style={{height:'200px'}}
								>
									<TextBox width='3%' text={item.id} />
									<div className="text" style={{width:`20%`, textAlign:'center'}}>
										<img src={`${MainURL}/images/scheduledetailboximages/${image[0]}`} alt="" 
											style={{height:'200px', width:'300px'}}/>
									</div>
									<TextBox width='10%' text={item.productName} />
									<TextBox width='30%' text={renderPreview(item.detailNotice)}/>
									<TextBox width='10%' text={item.reviseDate} />
									<div className="text" style={{width:`10%`, textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												window.scrollTo(0, 0);
												setIsAddOrRevise('revise');
												setScheduleDetailInfo(item);
												setIsViewAddScheduleDetailBox(true);
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

			{/* 일정등록 모달창 */}
      {
        isViewAddScheduleDetailBox &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddScheduleDetailBox
								refresh={refresh}
								setRefresh={setRefresh}
								nationlist={nationlist}
								isAddOrRevise={isAddOrRevise}
								scheduleDetailInfo={scheduleDetailInfo}
								setIsViewAddScheduleDetailBox={setIsViewAddScheduleDetailBox}
						 />
          </div>
        </div>
      }

		</div>
	);
}
