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

export default function Sub1_Online (props:any) {

	let navigate = useNavigate();

	const [dateSort, setDateSort] = useState('문의일');
	const [dateSelect, setDateSelect] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchSelect, setSearchSelect] = useState('');
	const [word, setWord] = useState('');
	const [searchSort, setSearchSort] = useState('기간');


	interface CheckBoxProps {
    title: string;
  }

  const CheckBox: React.FC<CheckBoxProps> = ({ title }) => (
    <div className='checkInputCover'>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={searchSelect === title}
          onChange={()=>{
            setSearchSelect(title);
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
	const [arrangeWord, setArrangeWord] = useState('');

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

	// 검색날짜셋팅 ------------------------------------------------------
	const handleDateSelect = async (dateNum:number) => {
		const date = new Date();
		const today = formatDate(date, 'yyyy-MM-dd');
		const preDate = subDays(today, dateNum);
		const reformedPreDate = formatDate(preDate, 'yyyy-MM-dd');
		setStartDate(reformedPreDate);
		setEndDate(today);
	};

	// 날짜 검색 ------------------------------------------------------
	const handleDateSearching = async () => {
  	if (startDate !== '' && endDate !== '') {
			if (dateSort === '문의일') {
				const copy = list.filter(e => new Date(e.date) >= new Date(startDate) && new Date(e.date) <= new Date(endDate));
				setViewList(copy);
			} else if (dateSort === '방문일') {
				const copy = list.filter(e => new Date(e.visitDate) >= new Date(startDate) && new Date(e.visitDate) <= new Date(endDate));
				setViewList(copy);
			}
		} 
	};

	// 글자 검색 ------------------------------------------------------
	const handleWordSearching = async () => {
		if (searchSelect !== '') {
			if (searchSelect === '예약자명') {
				const copy =list.filter(e => e.name.includes(word));
				setViewList(copy);
			} else if (searchSelect === '전화번호') {
				const copy =list.filter(e => e.phone.includes(word));
				setViewList(copy);
			}
		}
	};

	return ( 
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>New DB</h1>
				</div>
			</div>
				
			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DateBoxDouble setSelectStartDate={setStartDate} setSelectEndDate={setEndDate} dateStart={startDate} dateEnd={endDate} marginLeft={1}/>
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
									searchSort === '기간' ? handleDateSearching() : handleWordSearching();
								}}
							>
								<p>검색</p>
							</div>
							<div className="btn reset"
								onClick={()=>{
									setDateSort('문의일');
									setViewList(list);
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
						<TitleList width='12%' text='답변일/문의일'/>
						<TitleList width='5%' text='구분'/>
						<TitleList width='8%' text='성함'/>
						<TitleList width='12%' text='연락처'/>
						<TitleList width='12%' text='여행지'/>
						<TitleList width='10%' text='여행예정일'/>
						<TitleList width='10%' text='방문경로'/>
						<TitleList width='12%' text='진행상황'/>
						<TitleList width='7%' text='담당자'/>
  				</div>
					
					{
						viewList.length > 0
						?
						viewList.map((item:any, index:any)=>{
							return (
								<div key={index} className="rowbox"
								 onClick={()=>{
									if (item.sort === '상담') {
										navigate('/admin/counsel/counseldetail', {state : {data: item, pathType:"new"}});
										window.scrollTo(0, 0);
									} else {
										return
									}
								 }}
								>
									<TextBox width='3%' text={index+1} />
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

			</div>

			<div style={{height:'100px'}}></div>
		</div>
		
	);
}
