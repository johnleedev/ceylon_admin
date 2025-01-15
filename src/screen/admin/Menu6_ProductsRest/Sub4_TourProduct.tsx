import { useEffect, useState } from 'react';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import '../Products.scss'
import { PiPencilSimpleLineFill } from 'react-icons/pi';
import ModalAddTourProduct from './Modal/ModalAddTourProduct';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';


interface ListProps {
	id: string,
	sort : string,
	nation : string,
	city : string,
	productName : string,
	nativeLanguage : string,
	address : string,
	site : string,
	detailNotice : string,
	tourTime : string,
	runTime : string,
	openDate : string,
	closeDate : string,
	meetLocation : string,
	phone : string,
	caution : string,
	programTimeCost : string,
	mainMenuCost : string,
	includeNoteText : string,
	notIncludeNoteText : string,
	recommendPoint : string,
	reserveWay : string,
	cancelNotice : string,
	keyword : string,
	badges : string,
	scores : string,
	lastImages : string,
	inputImage : string,
	reviseDate : string;
}

export default function Sub4_TourProduct (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const sorts = ["전체", "경유지일정", "기본일정", "해양스포츠", "우붓일정", "스파마사지", "리조트부대시설", "레스토랑/바/클럽", "VIP샌딩"];
	const [selectSort, setSelectSort] = useState(0);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [listOrigin, setListOrigin] = useState<ListProps[]>([]);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [nationlist, setNationList] = useState<any>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/resttourproduct/gettourproducts/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
      setList(copy);
			setListOrigin(copy);
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
			const res = await axios.post(`${MainURL}/resttourproduct/gettourproductsearch`, {
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
	const [isAddOrRevise, setIsAddOrRevise] = useState('');
	const [tourProductInfo, setTourProductInfo] = useState<ListProps>();

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteTourProduct = async (item:any) => {
		const getParams = {
			postId : item.id,
			images : JSON.parse(item.inputImage)
		}
		axios 
			.post(`${MainURL}/resttourproduct/deletetourproduct`, getParams)
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
				deleteTourProduct(item);
		} else {
			return
		}
	};


	return (
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>여행지상품 관리</h1>	
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
			

			<div className="continentBtnbox">
				{
					sorts.map((item:any, index:any)=>{
						return (
							<div className="continentNtn"
								style={{backgroundColor: selectSort === index ? '#242d3f' : '#fff'}}
								onClick={()=>{
									setSelectSort(index);
									const copy = [...listOrigin]
									if (item === '전체') {
										setList(listOrigin);	
									} else {
										const result = copy.filter((e:any)=> e.sort === item);
										setList(result);
									}
								}}
							>
								<p style={{color: selectSort === index ? '#fff' : '#333'}}>{item}</p>
							</div>
						)
					})
				}
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
								{ value: '풀빌라', label: '풀빌라' },
								{ value: '리조트', label: '리조트' },
								{ value: '호텔', label: '호텔' },
								{ value: '박당', label: '박당' },
								{ value: '선투숙', label: '선투숙' },
								{ value: '후투숙', label: '후투숙' },
								{ value: '경유호텔', label: '경유호텔' }
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
				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width='3%' text='NO'/>
						<TitleList width='10%' text='구분'/>
						<TitleList width='25%' text='상품명'/>
						<TitleList width='15%' text='운영일'/>
						<TitleList width='15%' text='진행시간'/>
						<TitleList width='10%' text='요금'/>
						<TitleList width='10%' text='예약'/>
						<TitleList width='10%' text=''/>
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
									<TextBox width='10%' text={item.sort} />
									<TextBox width='25%' text={item.productName} />
									<TextBox width='15%' text={item.openDate} />
									<TextBox width='15%' text={item.runTime} />
									<TextBox width='10%' text={''} />
									<TextBox width='10%' text={''} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setTourProductInfo(item);
												setIsAddOrRevise('revise');
												setIsViewAddTourProductModal(true);
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

			

			{/* 선택일정등록 모달창 */}
      {
        isViewAddTourProductModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddTourProduct
								refresh={refresh}
								setRefresh={setRefresh}
								isAddOrRevise={isAddOrRevise}
								nationlist={nationlist}
								setIsViewAddTourProductModal={setIsViewAddTourProductModal}
								tourProductData={tourProductInfo}
						 />
          </div>
        </div>
      }

			<div style={{height:'200px'}}></div>
		</div>
	);
}

