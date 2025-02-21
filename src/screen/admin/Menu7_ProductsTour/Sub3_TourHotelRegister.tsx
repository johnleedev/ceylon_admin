import React, { useEffect, useState } from 'react';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import '../Products.scss'
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import ModalAddHotel from './Modal/ModalAddHotel';
import ModalHotelInfo from './Modal/ModalHotelInfo';
import ModalHotelCost from './Modal/ModalHotelCost';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { DropdownBox } from '../../../boxs/DropdownBox';

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

interface HotelCostProps {
	id: string; 
	hotelCostID: string;
	hotelNameKo: string;
	hotelNameEn: string;
	selectCostType: string;
	locationDetail: string;
	landCompany: string;
	isViewSaleCost: string;
	notes: string;
	notesDetail: string; 
	landBenefit: string; 
	productType: string; 
	applyCurrency: string;
	commission: string;
	packageCost: string;
	seasonCost: string; 
	reviseDate: string;
}

export default function Sub3_TourHotelRegister (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<ListProps[]>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/tourproducthotel/gethotels/${currentPage}`)
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
	const [searchNationsOptions, setSearchNationsOptions] = useState([{ value: '선택', label: '선택' }]);
	const [searchCityOptions, setSearchCityOptions] = useState<any>([]);

	const handleWordSearching = async () => {
		setList([]);
		try {
			const res = await axios.post(`${MainURL}/tourproducthotel/gethotelssearch`, {
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
	const [isViewAddHotelModal, setIsViewAddHotelModal] = useState<boolean>(false);
	const [isViewHotelInfoModal, setIsViewHotelInfoModal] = useState<boolean>(false);
	const [hotelInfo, setHotelInfo] = useState<ListProps>();
	const [hotelCost, setHotelCost] = useState<HotelCostProps>();
	const [isViewHotelCostModal, setIsViewHotelCostModal] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 요금표 가져오기
	const fetchPostCost = async (id:string) => {
		const res = await axios.get(`${MainURL}/tourproducthotel/gethotelcost/${id}`)
		if (res.data !== false) {
			const copy = res.data[0];
			setHotelCost(copy);
		} 
		setIsViewHotelCostModal(true);
	};

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteHotel = async (itemId:any, images:any) => {
		const getParams = {
			postId : itemId,
			images: images
		}
		axios 
			.post(`${MainURL}/tourproducthotel/deletehotel`, getParams)
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
		const costConfirmed = window.confirm(`${item.hotelNameKo}(${item.hotelNameEn})를 정말 삭제하시겠습니까?`);
		if (costConfirmed) {
			const imageNamesAllView = JSON.parse(item.imageNamesAllView);
			const imageNamesRoomView = JSON.parse(item.imageNamesRoomView);
			const imageNamesEtcView = JSON.parse(item.imageNamesEtcView);
			const combinedImageNames = [
					...imageNamesAllView.map((image:any) => image.imageName),
					...imageNamesRoomView.map((image:any) => image.imageName),
					...imageNamesEtcView.map((image:any) => image.imageName)
			];
			deleteHotel(item.id, combinedImageNames);
		} else {
			return
		}
	};


	return (
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>호텔관리</h1>	
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
								setSearchCity(e.target.value);
							}}
						/>
						<input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
								value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} 
								onKeyDown={(e)=>{if (e.key === 'Enter') {handleWordSearching();}}}
								placeholder='호텔명'
						/>
						<div className="buttons" style={{margin:'20px 0'}}>
							<div className="btn searching"
								onClick={()=>{
									handleWordSearching();
								}}
							>
								<p>검색</p>
							</div>
							<div className="btn reset"
								onClick={()=>{
									setCurrentPage(1);
									setSearchNation('전체');
									setSearchCity('선택');
									setSearchWord('');
									fetchPosts();
								}}
							>
								<p>초기화</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="seachlist">
				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width='3%' text='NO'/>
						<TitleList width='5%' text='노출'/>
						<TitleList width='15%' text='호텔명'/>
						<TitleList width='10%' text='성급'/>
						<TitleList width='10%' text='위치'/>
						<TitleList width='10%' text='1박요금'/>
						<TitleList width='25%' text='호텔관리'/>
						<TitleList width='10%' text='수정일'/>
						<TitleList width='10%' text=''/>
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
									<div className="text" style={{width:`5%`, textAlign:'center'}}>
										{ item.isView === 'true'  
											? <FaCircle color='#5fb7ef' size={13}/>
											: <IoCloseOutline />
										}
									</div>
									<TextBox width='15%' text={item.hotelNameKo} />
									<TextBox width='10%' text={item.hotelLevel} />
									<TextBox width='10%' text={''} />
									<TextBox width='10%' text={''} />
									<div className="text" style={{width:`25%`, textAlign:'center'}}>
										<div className="hotelControlBtn"
											onClick={()=>{
												// setHotelInfo(item);
												// setIsViewHotelInfoModal(true);
												alert('홈페이지에 보여지는 호텔 정보입니다. / 미완성')
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
												fetchPostCost(item.id);
												if (item.isCostInput === 'false') {
													setIsAddOrRevise('add');
												} else {
													setIsAddOrRevise('revise');
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
								isAddOrRevise={isAddOrRevise}
								setRefresh={setRefresh}
								hotelInfo={hotelInfo}
								hotelCost={hotelCost}
								setIsViewHotelCostModal={setIsViewHotelCostModal}
						 />
          </div>
        </div>
      }

		</div>
	);
}
