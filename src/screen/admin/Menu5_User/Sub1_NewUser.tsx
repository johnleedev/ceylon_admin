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
import { DropDowncharger, DropDownUserLevel } from '../../DefaultData';
import { TitleList } from '../../../boxs/TitleList';


export default function Sub1_NewUser (props:any) {

	let navigate = useNavigate();


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
		const res = await axios.get(`${MainURL}/users/getusers/${currentPage}`);
		if (res.data.resultData) {
			const copy = res.data.resultData;
      setList(copy);   
      setListAllLength(res.data.totalCount);
		}
	};

	useEffect(() => {
		fetchPosts();
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
		
	const [searchUserLevel, setSearchUserLevel] = useState('');

	const [searchWord, setSearchWord] = useState('');
	
	const handleSearching = async () => {
		try {
			const res = await axios.post(`${MainURL}/adminlist/getonlinelistsearch`, {
				
				charger : searchUserLevel,
				word : searchWord
			});
			if (res.data.resultData) {
				const copy = [...res.data.resultData];
				copy.reverse();
				// setList(copy);
				setListAllLength(res.data.totalCount);
			} else {
				// setList([]);
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
					<h1>신규회원</h1>
				</div>
			</div>			

			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={searchUserLevel}
							options={DropDownUserLevel}
							handleChange={(e)=>{setSearchUserLevel(e.target.value)}}
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
									setSearchUserLevel('');
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
			
			<div className="seachlist">

  			<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width="5%" text='NO'/>
						<TitleList width="7%" text='등급'/>
						<TitleList width="10%" text='성함'/>
						<TitleList width="15%" text='연락처'/>
						<TitleList width="10%" text='최근여행일'/>
						<TitleList width="25%" text='여행상품'/>
						<TitleList width="7%" text='이용횟수'/>
						<TitleList width="10%" text='이용금액'/>
						<TitleList width="7%" text='혜택'/>
					</div>
					
					{
						list.map((item:any, index:any)=>{
							return (
								<div className="rowbox" key={index}>
									<TextBox width="5%" text={item.id} />
									<TextBox width="7%" text={item.grade} />
									<TextBox width="10%" text={item.name}  />
									<TextBox width="15%" text={item.phone} />
									<TextBox width="10%" text={item.lastTourDate} />
									<TextBox width="25%" text={item.tourProduct} />
									<TextBox width="7%" text={`${item.usedNum}회`} />
									<TextBox width="10%" text={item.usedCost} />
									<TextBox width="7%" text={item.benefit} />
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
