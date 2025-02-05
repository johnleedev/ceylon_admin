import React, { useEffect, useState } from 'react';
import '../SearchBox.scss';
import '../SearchList.scss';
import { TextBox } from '../../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxDouble } from '../../../boxs/DateBoxDouble';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { formatDate, subDays } from 'date-fns';
import axios from 'axios';
import MainURL from '../../../MainURL';
import Loading from '../components/Loading';
import { DropDowncharger } from '../../DefaultData';
import { TitleList } from '../../../boxs/TitleList';

export default function Sub2_CustomFeedback (props:any) {

	// 게시글 가져오기 ------------------------------------------------------
	interface ListProps {
		id: number;
		date: string;
		name: string;
		phone: string;
		tourLocation: string;
		callTime : string;
		dateCeremony: string;
		sort: string;
		stage: string
		visitDate : string;
		visitTime: string;
	}
	const [refresh, setRefresh] = useState(true);
	const [list, setList] = useState<ListProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [searchLocationOption, setSearchLocationOption] = useState([]);

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminlist/getonlinelist/${currentPage}`);
		if (res.data.resultData) {
			const copy = res.data.resultData;
      setList(copy);   
      setListAllLength(res.data.totalCount);
			const result = copy.map((item:any)=>
        ({ value: item.tourLocation,  label:item.tourLocation })
      );
			result.unshift({ value: '선택', label: '선택' });
			setSearchLocationOption(result);
		}
	};

	useEffect(() => {
		// fetchPosts();
	}, [refresh]);  


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
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchLocation, setSearchLocation] = useState('');
	const [searchCharger, setSearchCharger] = useState('');
	const [searchWord, setSearchWord] = useState('');
	
	const handleSearching = async () => {
		try {
			const res = await axios.post(`${MainURL}/adminlist/getonlinelistsearch`, {
				startDate : startDate,
				endDate : endDate,
				location : searchLocation,
				charger : searchCharger,
				word : searchWord
			});
			if (res.data.resultData) {
				const copy = [...res.data.resultData];
				copy.reverse();
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

	return ( 
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>고객피드백 리스트</h1>
				</div>
			</div>
				
			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DateBoxDouble setSelectStartDate={setStartDate} setSelectEndDate={setEndDate} dateStart={startDate} dateEnd={endDate} marginLeft={1}/>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={searchLocation}
							options={searchLocationOption}
							handleChange={(e)=>{setSearchLocation(e.target.value)}}
						/>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={searchCharger}
							options={DropDowncharger}
							handleChange={(e)=>{setSearchCharger(e.target.value)}}
						/>
						<input className="inputdefault" type="text" style={{width:'20%', textAlign:'left'}} 
              value={searchWord} placeholder='고객명/연락처'
							onChange={(e)=>{
								setSearchWord(e.target.value);
								
							}}
							onKeyDown={(e)=>{if (e.key === 'Enter') {handleSearching();}}}
						/>
						<div className="buttons" style={{margin:'20px 0'}}>
							<div className="btn searching"
								onClick={()=>{handleSearching();}}
							>
								<p>검색</p>
							</div>
							<div className="btn reset"
								onClick={()=>{
									setStartDate('');
									setEndDate('');
									setSearchLocation('');
									setSearchCharger('');
									setSearchWord('');
									setRefresh(!refresh);
								}}
							>
								<p>초기화</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="main-title" style={{marginTop:'30px'}}>
				<div className='title-box'>
					<h1>대기</h1>
				</div>
			</div>

			<div className="seachlist">

				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width='3%' text='NO'/>
						<TitleList width='12%' text='예약일/출발일'/>
						<TitleList width='5%' text='등급'/>
						<TitleList width='8%' text='성함'/>
						<TitleList width='12%' text='연락처'/>
						<TitleList width='12%' text='여행상품'/>
						<TitleList width='10%' text='방문경로'/>
						<TitleList width='15%' text='요청사항'/>
						<TitleList width='10%' text='문의일/처리일'/>
						<TitleList width='7%' text='담당자'/>
  				</div>
					
					{
						list.length > 0
						?
						list.map((item:any, index:any)=>{
							return (
								<div key={index} className="rowbox"
								 onClick={()=>{
									
								 }}
								>
									<TextBox width='3%' text={item.id} />
									<TextBox width='12%' text={item.date} text2={item.date}/>
									<TextBox width='5%' text={item.sort} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={item.phone} />
									<TextBox width='12%' text={item.tourLocation} />
									<TextBox width='10%' text={item.dateStart} />
									<TextBox width='10%' text={item.visitPath} />
									<TextBox width='12%' text={item.state} />
									<TextBox width='7%' text={item.charger} />
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

			<div className="main-title" style={{marginTop:'30px'}}>
				<div className='title-box'>
					<h1>처리</h1>
				</div>
			</div>

			<div className="seachlist">

				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width='3%' text='NO'/>
						<TitleList width='12%' text='예약일/출발일'/>
						<TitleList width='5%' text='등급'/>
						<TitleList width='8%' text='성함'/>
						<TitleList width='12%' text='연락처'/>
						<TitleList width='12%' text='여행상품'/>
						<TitleList width='10%' text='방문경로'/>
						<TitleList width='15%' text='요청사항/문의/변경/취소'/>
						<TitleList width='10%' text='문의일/처리일'/>
						<TitleList width='7%' text='담당자'/>
  				</div>
					
					{
						list.length > 0
						?
						list.map((item:any, index:any)=>{
							return (
								<div key={index} className="rowbox"
								 onClick={()=>{
									
								 }}
								>
									<TextBox width='3%' text={item.id} />
									<TextBox width='12%' text={item.date} text2={item.date}/>
									<TextBox width='5%' text={item.sort} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={item.phone} />
									<TextBox width='12%' text={item.tourLocation} />
									<TextBox width='10%' text={item.dateStart} />
									<TextBox width='10%' text={item.visitPath} />
									<TextBox width='12%' text={item.state} />
									<TextBox width='7%' text={item.charger} />
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

			<div style={{height:'100px'}}></div>
		</div>
		
	);
}
