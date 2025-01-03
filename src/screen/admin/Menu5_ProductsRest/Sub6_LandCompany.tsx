import { useEffect, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../Products.scss'
import { PiPencilSimpleLineFill } from 'react-icons/pi';
import ModalAddSelectSchedule from './Modal/ModalAddTourProduct';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import ModalAddLandCompany from './Modal/ModalAddLandCompany';


interface ListProps {
	id: string,
	nation : string,
	city : string,
	landCompanyName : string,
	businessDate : string,
	owner : string,
	ownerPhone : string,
	opcharger : string,
	opchargerPhone : string,
	localTourCompany : string,
	localPhone : string,
	localOwner : string,
	localOwnerPhone : string,
	notice : string,
	registeredHotels : string,
	registeredProducts : string,
	discount : string,
	isCostApply : string,
	issue : string,
	benefits : string,
	reviseDate : string
}

export default function Sub6_LandCompany (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [listOrigin, setListOrigin] = useState<ListProps[]>([]);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/restlandcompany/getlandcompany/${currentPage}`)
    if (res.data.resultData) {
      const copy = res.data.resultData;
      setList(copy);
			setListOrigin(copy);
      setListAllLength(res.data.totalCount);
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
			const res = await axios.post(`${MainURL}/restlandcompany/getlandcompanysearch`, {
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
	const [isViewLandCompanyModal, setIsViewLandCompanyModal] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');
	const [landCompanyInfo, setLandCompanyInfo] = useState<ListProps>();

	return (
		<div className='Menu5'>


			<div className="main-title">
				<div className='title-box'>
					<h1>랜드사 관리</h1>	
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewLandCompanyModal(true);
					}}
				>
					<PiPencilSimpleLineFill />
					<p>랜드사 등록</p>
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

			<div style={{height:'20px'}}></div>

			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='5%' text='노출'/>
						<TitleBox width='15%' text='랜드사'/>
						<TitleBox width='15%' text='등록상품'/>
						<TitleBox width='15%' text='등록호텔'/>
						<TitleBox width='10%' text='여행사베네핏'/>
						<TitleBox width='10%' text='예약'/>
						<TitleBox width='10%' text='참고사항'/>
						<TitleBox width='10%' text=''/>
  				</div>
					
					{
						list.map((item:any, index:any)=>{
							const registeredProductsCopy = JSON.parse(item.registeredProducts);
							const benefitsCopy = JSON.parse(item.benefits);

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
									<TextBox width='15%' text={item.landCompanyName} />
									<TextBox width='15%' text={item.registeredHotels} />
									<TextBox width='15%' text={registeredProductsCopy} />
									<TextBox width='10%' text={benefitsCopy.content} />
									<TextBox width='10%' text={''} />
									<TextBox width='10%' text={item.notice} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setLandCompanyInfo(item);
												setIsAddOrRevise('revise');
												setIsViewLandCompanyModal(true);
											}}
										>
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

			

			{/* 선택일정등록 모달창 */}
      {
        isViewLandCompanyModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddLandCompany
								refresh={refresh}
								setRefresh={setRefresh}
								isAddOrRevise={isAddOrRevise}
								landCompanyInfo={landCompanyInfo}
								setIsViewLandCompanyModal={setIsViewLandCompanyModal}
						 />
          </div>
        </div>
      }

			<div style={{height:'200px'}}></div>
		</div>
	);
}

