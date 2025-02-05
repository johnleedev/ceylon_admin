import { useEffect, useState } from 'react';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import '../Products.scss'
import { PiPencilSimpleLineFill } from 'react-icons/pi';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import ModalAddLandCompany from './ModalAddLandCompany';
import { DateBoxDouble } from '../../../boxs/DateBoxDouble';
import { DropDowncharger, DropDownLandCompany } from '../../DefaultData';


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


export default function Sub1_LCList (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [listOrigin, setListOrigin] = useState<ListProps[]>([]);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/landcompany/getlandcompany/${currentPage}`)
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

	const [dateSort, setDateSort] = useState('문의일');
	const [dateSelect, setDateSelect] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchSelect, setSearchSelect] = useState('');
	const [word, setWord] = useState('');


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
			const res = await axios.post(`${MainURL}/landcompany/getlandcompanysearch`, {
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
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>랜드사 리스트</h1>
				</div>
			</div>
				
			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DateBoxDouble  setSelectStartDate={setStartDate} setSelectEndDate={setEndDate} dateStart={startDate} dateEnd={endDate}  marginLeft={1}/>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={dateSort}
							options={[
								{ value: '선택', label: '선택' },
								{ value: '여행지1', label: '여행지1' },
								{ value: '여행지2', label: '여행지2' },
							]}
							handleChange={(e)=>{setDateSort(e.target.value)}}
						/>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={dateSort}
							options={DropDownLandCompany}
							handleChange={(e)=>{setDateSort(e.target.value)}}
						/>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={dateSort}
							options={DropDowncharger}
							handleChange={(e)=>{setDateSort(e.target.value)}}
						/>
						<input className="inputdefault" type="text" style={{width:'20%', textAlign:'left'}} 
              value={word} placeholder='고객명/연락처'
							onChange={(e)=>{setWord(e.target.value)}}
						/>
						<div className="buttons" style={{margin:'20px 0'}}>
							<div className="btn searching"
								onClick={()=>{
									
								}}
							>
								<p>검색</p>
							</div>
							<div className="btn reset"
								onClick={()=>{
									setDateSort('문의일');
									setDateSelect('');
									setStartDate('');
									setEndDate('');
									setSearchSelect('');
									setWord('');
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
						<TitleList width='15%' text='랜드사'/>
						<TitleList width='15%' text='등록상품'/>
						<TitleList width='15%' text='등록호텔'/>
						<TitleList width='10%' text='여행사베네핏'/>
						<TitleList width='10%' text='예약'/>
						<TitleList width='10%' text='참고사항'/>
						<TitleList width='10%' text=''/>
  				</div>
					
					{
						list.length > 0
						?
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
						:
						<div style={{textAlign:'center'}}>
							<p style={{marginTop:'50px'}}>검색결과가 없습니다.</p>
						</div>
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
