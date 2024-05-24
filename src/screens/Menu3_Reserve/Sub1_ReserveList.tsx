import React, { useEffect, useState } from 'react';
import '../SearchList.scss'
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DropDownLandCompany, DropDownSearchSelect, DropDownTourLocation, DropDowncharger } from '../DefaultData';
import { DateBoxNum } from '../../boxs/DateBoxNum';
import axios from 'axios';
import MainURL from '../../MainURL';
import { SearchBox } from '../../boxs/SearchBox';

export default function Sub1_ReserveList (props:any) {

	let navigate = useNavigate();


	const [dateSort, setDateSort] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [sort, setSort] = useState('');
	const [word, setWord] = useState('');

	
	// 게시글 가져오기 ------------------------------------------------------
	interface ListProps {
		id: number;
		serialNum : string;
		date: string;
		name: string;
		reserveLocation: string;
		charger : string;
		accepter : string;
		productName : string;
		tourLocation : string;
		tourLocationDetail : string;
		airline : string;
		tourStartAirport : string;
		tourStartPeriod : string;
		tourEndAirport : string;
		tourEndPeriod : string;
	}
	const [list, setList] = useState<ListProps[]>([]);

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminreserve/getreserve`)
		if (res) {
			setList(res.data);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  

	return (
		<div className='Menu2'>

			<SearchBox />
				
			<div className="seachlist">

				<div className="main-title">
					<h1>예약 리스트</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='10%' text='고유번호'/>
						<TitleBox width='10%' text='예약일/출발일'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='8%' text='여행지'/>
						<TitleBox width='15%' text='여행상품'/>
						<TitleBox width='7%' text='랜드사'/>
						<TitleBox width='7%' text='진행상황'/>
						<TitleBox width='5%' text='담당자'/>
  				</div>
					
					{
						list.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										navigate('/reserve/reservedetail', {state : item.serialNum});
									}}
								>
									<TextBox width='3%' text={index+1} />
									<TextBox width='10%' text={item.serialNum} />
									<TextBox width='10%' text={item.date} text2={item.tourStartPeriod}/>
									<TextBox width='8%' text={item.name} />
									<TextBox width='8%' text={item.tourLocation} />
									<TextBox width='15%' text={item.productName} />
									<TextBox width='7%' text={item.stage} />
									<TextBox width='7%' text={item.state} />
									<TextBox width='5%' text={item.charger} />
								</div>
							)
						})
					}
				</div>

			</div>

			<div style={{height:'100px'}}></div>
		</div>
	);
}
