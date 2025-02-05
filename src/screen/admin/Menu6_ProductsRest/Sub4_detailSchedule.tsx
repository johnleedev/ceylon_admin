import React, { useEffect, useRef, useState } from 'react';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import '../Products.scss'
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import ModalAddScheduleBox from './Modal/ModalAddScheduleBox';
import { DropdownBox } from '../../../boxs/DropdownBox';
import ModalAddTourProduct from './Modal/ModalAddTourProduct';

interface ListProps {
	id: string;
	sort : string;
	nation: string;
	city: string;
	location: string;
	subLocation: string;
	locationTitle: string;
	locationContent: string;
	locationContentDetail: string;
	date : string;
	postImage : string;
}

export default function Sub5_detailSchedule (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const sorts = ["전체", "차량/가이드", "익스커션", "스파마사지", "골프", "강습/클래스", "VIP서비스", "1박투어", "호캉스즐기기", "경유지일정"];
	const [selectSort, setSelectSort] = useState('전체');

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<any>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/resttourproduct/gettourproducts/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
      setList(copy);
      setListAllLength(res.data.totalCount);
    }
		const nationCityRes = await axios.get(`${MainURL}/restnationcity/getnationcity`)
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
	const [searchSort, setSearchSort] = useState('전체');
	const [searchWord, setSearchWord] = useState('');
	const handleWordSearching = async () => {
		setList([]);
		try {
			const res = await axios.post(`${MainURL}/restschedulebox/getscheduleboxsearch`, {
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
	const [isViewAddTourProductModal, setIsViewAddTourProductModal] = useState<boolean>(false);
	const [locationInfo, setLocationInfo] = useState<ListProps>();
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteHotel = async (item:any) => {
		const getParams = {
			postId : item.id,
			images : JSON.parse(item.postImage)
		}
		axios 
			.post(`${MainURL}/restschedulebox/deletelocation`, getParams)
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
				deleteHotel(item);
		} else {
			return
		}
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
						setIsViewAddTourProductModal(true);
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
							selectedValue={searchSort}
							options={[
								{ value: '전체', label: '전체' },
								{ value: '텍스트', label: '텍스트' },
								{ value: '선택', label: '선택' },
								{ value: '상세', label: '상세' }
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

			<div className="continentBtnbox">
				{
					sorts.map((item:any, index:any)=>{
						return (
							<div className="continentNtn"
								style={{backgroundColor: selectSort === item ? '#242d3f' : '#fff'}}
								onClick={()=>{
									setSelectSort(item);
									// const copy = [...listOrigin]
									// if (item === '전체') {
									// 	setList(listOrigin);	
									// } else {
									// 	const result = copy.filter((e:any)=> e.sort === item);
									// 	setList(result);
									// }
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
						<TitleList width='7%' text='구분'/>
						<TitleList width='7%' text='선택일정'/>
						<TitleList width='10%' text='국가'/>
						<TitleList width='10%' text='도시'/>
						<TitleList width='16%' text='여행지명'/>
						<TitleList width='10%' text='여행지명(서브)'/>
						<TitleList width='10%' text='수정일'/>
						<TitleList width='10%' text=''/>
  				</div>
					
					{ list.length > 0 &&
						list.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
									}}
								>
									<TextBox width='3%' text={item.id} />
									<TextBox width='7%' text={item.isViaSort} />
									<TextBox width='7%' text={item.sort} />
									<TextBox width='10%' text={item.nation} />
									<TextBox width='10%' text={item.city} />
									<TextBox width='16%' text={item.location} />
									<TextBox width='10%' text={item.subLocation}/>
									<TextBox width='10%' text={item.date} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setIsAddOrRevise('revise');
												setLocationInfo(item);
												// setIsViewAddScheduleBoxModal(true);
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
        isViewAddTourProductModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddTourProduct
								refresh={refresh}
								setRefresh={setRefresh}
								nationlist={nationlist}
								isAddOrRevise={isAddOrRevise}
								locationInfo={locationInfo}
								setIsViewAddTourProductModal={setIsViewAddTourProductModal}
						 />
          </div>
        </div>
      }

		</div>
	);
}
