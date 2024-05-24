import React, { useEffect, useState } from 'react';
import './SearchBox.scss'
import '../SearchList.scss'
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { DropdownBox } from '../../boxs/DropdownBox';
import { formatDate, subDays } from 'date-fns';
import axios from 'axios';
import MainURL from '../../MainURL';
import Loading from '../../components/Loading';

export default function Sub1_Online (props:any) {

	let navigate = useNavigate();

	const [dateSort, setDateSort] = useState('문의일');
	const [dateSelect, setDateSelect] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchSort, setSearchSort] = useState('');
	const [word, setWord] = useState('');

	interface CheckBoxProps {
    title: string;
  }

  const CheckBox: React.FC<CheckBoxProps> = ({ title }) => (
    <div className='checkInputCover'>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={searchSort === title}
          onChange={()=>{
            setSearchSort(title);
          }}
        />
      </div>
      <p>{title}</p>
    </div>
  )

	const selectDays = [
		{name: "오늘", period: 0}, {name: "어제", period: 1}, {name: "3일", period: 3}, {name: "7일", period: 7}, 
		{name: "1개월", period: 30}, {name: "3개월", period: 90}, {name: "6개월", period: 180}
	]


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
	const [list, setList] = useState<ListProps[]>([]);
	const [viewList, setViewList] = useState<ListProps[]>([]);
	const [isVewListZero, setIsViewListZero] = useState<boolean>(false);

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminschedule/getonlinelist/stay`);
		if (res) {
			setList(res.data);
			setViewList(res.data);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  

	// 날짜검색 ------------------------------------------------------
	const handleDateSearching = async (dateNum:number) => {
		const date = new Date();
		const today = formatDate(date, 'yyyy-MM-dd');
		const preDate = subDays(today, dateNum);
		const reformedPreDate = formatDate(preDate, 'yyyy-MM-dd');
		setStartDate(reformedPreDate);
		setEndDate(today);
	};

	// 날짜 검색 ------------------------------------------------------
	

	// 글자 검색 ------------------------------------------------------
	const filterByDate = (list: any[], dateField: string, startDate: string, endDate: string) => {
    return list.filter(e => new Date(e[dateField]) >= new Date(startDate) && new Date(e[dateField]) <= new Date(endDate));
	};
	const filterByWord = (list: any[], searchField: string, word: string) => {
			return list.filter(e => e[searchField].includes(word));
	};
	const handleSearching = async () => {
			let filteredList = list;
			if (dateSort !== '' && endDate !== '') {
					if (dateSort === '문의일') {
							filteredList = filterByDate(list, 'date', startDate, endDate);
					} else if (dateSort === '방문일') {
							filteredList = filterByDate(list, 'visitDate', startDate, endDate);
					}
			}
			if (searchSort !== '') {
					if (searchSort === '예약자명') {
							filteredList = filterByWord(filteredList, 'name', word);
					} else if (searchSort === '전화번호') {
							filteredList = filterByWord(filteredList, 'phone', word);
					}
			}
			if (filteredList.length === 0) {
				setIsViewListZero(true);
			} 
			setViewList(filteredList);
	};

	return ( 
		<div className='Menu2'>
				
			<div className="searchbox">
				<div className="cover">
					<div className="title">
						<h3>기간</h3>
					</div>
					<div className="content">
						<DropdownBox
                widthmain='80px'
                height='35px'
                selectedValue={dateSort}
                options={[
									{ value: '문의일', label: '문의일' },
									{ value: '방문일', label: '방문일' },
								]}
                handleChange={(e)=>{setDateSort(e.target.value)}}
              />
						<div className="btn-row">
							{
								selectDays.map((item:any, index:any)=>{
									return (
										<div className='btnbox' key={index} style={{backgroundColor:dateSelect === item.name ? '#EAEAEA' : "#fff"}}
											onClick={()=>{
												setDateSelect(item.name);
												handleDateSearching(item.period);
											}}
										>
											<p>{item.name}</p>
										</div>
									)
								})
							}
						</div>
						<DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={setStartDate} date={startDate} marginLeft={1}/>
						<p>~</p>
						<DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={setEndDate} date={endDate} marginLeft={1}/>
					</div>
				</div>
				<div className="cover">
					<div className="title">
						<h3>검색어</h3>
					</div>
					<div className="content">
						<CheckBox title='예약자명'/>
						<CheckBox title='전화번호'/>
						{/* <CheckBox title='상품코드'/>
						<CheckBox title='아이디'/> */}
						<input className="inputdefault" type="text" style={{width:'20%', textAlign:'left'}} 
              value={word} onChange={(e)=>{setWord(e.target.value)}}/>
						<div className="buttons" style={{margin:'20px 0'}}>
							<div className="btn searching"
								onClick={handleSearching}
							>
								<p>검색</p>
							</div>
						</div>
					</div>
				</div>
				<div className="buttons" style={{margin:'20px 0'}}>
					<div className="btn reset"
						onClick={()=>{
							setDateSort('문의일');
							setViewList(list);
							setDateSelect('');
							setStartDate('');
							setEndDate('');
							setSearchSort('');
							setWord('');
						}}
					>
						<p>초기화</p>
					</div>
				</div>
			</div>

			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
					<h1>온라인 문의</h1>
					<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={searchSort}
							options={[
								{ value: '선택', label: '선택' },
								{ value: '상담', label: '상담' },
								{ value: '견적', label: '견적' },
							]}
							handleChange={(text:any)=>{
								const textCopy = text.target.value;
								setSearchSort(textCopy);
								if (textCopy === '선택') {
									setViewList(list);
								} else {
									const copy = list.filter((e:any)=> e.sort === textCopy);
									if (copy.length === 0) {
										setIsViewListZero(true);
									} 
									setViewList(copy);
								}
							}}
						/>
					</div>
					<div className='contactBtn-box'>
						<div className="contactBtn">
							<p>전화문의</p>
						</div>
						<div className="contactBtn">
							<p>카카오문의</p>
						</div>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='12%' text='문의일'/>
						<TitleBox width='5%' text='형태'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='12%' text='연락처'/>
						<TitleBox width='12%' text='예식일'/>
						<TitleBox width='10%' text='관심여행지'/>
						<TitleBox width='10%' text='통화가능시간'/>
						<TitleBox width='12%' text='방문일'/>
						<TitleBox width='7%' text='방문시간'/>
						<TitleBox width='7%' text='장소'/>
  				</div>
					
					{
						viewList.length > 0
						?
						viewList.map((item:any, index:any)=>{
							return (
								<div key={index} className="rowbox"
								 onClick={()=>{
									if (item.sort === '상담') {
										navigate('/counsel/counseldetail', {state : {data: item, pathType:"new"}});
										window.scrollTo(0, 0);
									} else {
										return
									}
								 }}
								>
									<TextBox width='3%' text={index+1} />
									<TextBox width='12%' text={item.date} />
									<TextBox width='5%' text={item.sort} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={item.phone} />
									<TextBox width='12%' text={item.dateCeremony} />
									<TextBox width='10%' text={item.tourLocation} />
									<TextBox width='10%' text={item.callTime} />
									<TextBox width='12%' text={item.visitDate} />
									<TextBox width='7%' text={item.visitTime} />
									<TextBox width='7%' text={item.stage} />
								</div>
							)
						})
						:
						<>
							{
								isVewListZero
								?
								<div style={{textAlign:'center'}}>
									<p style={{marginTop:'50px'}}>검색결과가 없습니다.</p>
								</div>
								:
								<div className='Menu2' style={{paddingTop:'200px'}}>
									<Loading />
								</div>
							}
						</>
					}
				</div>

			</div>

			<div style={{height:'100px'}}></div>
		</div>
		
	);
}
