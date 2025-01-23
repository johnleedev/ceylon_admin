import React, { useEffect, useState } from 'react';
import '../SearchList.scss'
import '../SearchBox.scss';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDownLandCompany, DropDownTourLocation, DropDowncharger } from '../../DefaultData';
import Loading from '../components/Loading';
import { DateBoxDouble } from '../../../boxs/DateBoxDouble';


export default function Sub3_ArrangeWaiting (props:any) {

	let navigate = useNavigate();

	const [dateSort, setDateSort] = useState('문의일');
	const [dateSelect, setDateSelect] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchSelect, setSearchSelect] = useState('');
	const [word, setWord] = useState('');
	const [searchSort, setSearchSort] = useState('기간');


	// 게시글 가져오기 ------------------------------------------------------
	interface ListProps {
		id: number;
		serialNum : string;
		date: string;
		tourStartPeriod : string;
		name: string;
		phone : string;
    productName : string;
    ticketingState : string;
		landCompany : string;
    arrangeDecideDate : string;
    arrangeDepositCost : string;
    arrangeEstimateCost: string;
    arrangeSendDate : string;
		charger : string;
	}
	const [list, setList] = useState<ListProps[]>([]);
	const [viewList, setViewList] = useState<ListProps[]>([]);
	const [arrangeWord1, setArrangeWord1] = useState('');
	const [arrangeWord2, setArrangeWord2] = useState('');

	const fetchPosts = async () => {
		try {
			const res = await axios.get(`${MainURL}/adminlist/getlistarrange`)
			if (res) {
					setList(res.data);
					setViewList(res.data);
			} else {
					setList([]);
					setViewList([]);
			}
		} catch (error) {
				console.error("Error fetching posts:", error);
				setList([]);
				setViewList([]);
		}
	};

	useEffect(() => {
		// fetchPosts();
	}, []);  

	return (
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>수배대기리스트</h1>
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
						<TitleList width='10%' text='예약일/출발일'/>
						<TitleList width='5%' text='등급'/>
						<TitleList width='8%' text='성함'/>
						<TitleList width='12%' text='연락처'/>
						<TitleList width='15%' text='여행상품'/>
						<TitleList width='7%' text='랜드사'/>
						<TitleList width='7%' text='항공'/>
						<TitleList width='7%' text='수배일/확정일'/>
						<TitleList width='5%' text='담당자'/>
  				</div>
					
					{
						viewList.length > 0
						?
						viewList.map((item:any, index:any)=>{

							const phoneCopy = item.phone.split('/');
							const landCompanyCopy = JSON.parse(item.landCompany);
							const ticketingStateCopy = JSON.parse(item.ticketingState);

							return (
								<div key={index} className="rowbox">
									<TextBox width='3%' text={index+1} />
									<TextBox width='10%' text={item.date} text2={item.tourStartPeriod}/>
									<TextBox width='5%' text={item.level} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={phoneCopy[0]} text2={phoneCopy[1]}/>
									<TextBox width='15%' text={item.productName} />
									<TextBox width='7%' text={landCompanyCopy[0].companyName}/>
									<TextBox width='7%' text={item.inputState} />
									<TextBox width='7%' text={item.reviseDate} text2={item.reviseDate} />
									<TextBox width='5%' text={item.charger} />
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
