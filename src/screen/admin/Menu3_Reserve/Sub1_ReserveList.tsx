import React, { useEffect, useState } from 'react';
import '../SearchList.scss'
import '../SearchBox.scss';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDownLandCompany, DropDownTourLocation, DropDowncharger } from '../../DefaultData';
import axios from 'axios';
import MainURL from '../../../MainURL';
import Loading from '../components/Loading';
import { DateBoxDouble } from '../../../boxs/DateBoxDouble';

export default function Sub1_ReserveList (props:any) {

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
		inputState: string;
		name: string;
		phone : string;
    charger : string;
		visitPath: string;
		visitPathDetail: string;
		productName : string;
    landCompany : string;
		tourStartPeriod : string;
		productCost : string;
	}
	const [list, setList] = useState<ListProps[]>([]);
	const [viewList, setViewList] = useState<ListProps[]>([]);
	const [arrangeWord1, setArrangeWord1] = useState('');
	const [arrangeWord2, setArrangeWord2] = useState('');

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminreserve/getreserve`)
		if (res) {
			const copy = [...res.data];
			copy.reverse();
      const result = copy.map((item) => ({
        ...item,
        userName: JSON.parse(item.userInfo).map((user:any) => user.nameKo),
				userPhone: JSON.parse(item.userInfo).map((user:any) => user.phone)
      }));
			setList(result);
			setViewList(result);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  

	return (
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>예약리스트</h1>
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
						<TitleList width='7%' text='방문경로'/>
						<TitleList width='5%' text='담당자'/>
						<TitleList width='5%' text='수정일'/>
  				</div>
					
					{
						viewList.length > 0
						?
						viewList.map((item:any, index:any)=>{

							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										navigate('/admin/reserve/reservedetail', {state : item.serialNum});
									}}
								>
									<TextBox width='3%' text={item.id} />
									<TextBox width='10%' text={item.date} text2={item.tourStartPeriod}/>
									<TextBox width='5%' text={item.level} />
									<TextBox width='8%' text={item.userName[0]} text2={item.userName[1]} />
									<TextBox width='12%' text={item.userPhone[0]} text2={item.userPhone[1]}/>
									<TextBox width='15%' text={item.productName} />
									<TextBox width='7%' text={item.landCompany}/>
									<TextBox width='7%' text={item.inputState} />
									<TextBox width='5%' text={item.charger} />
									<TextBox width='5%' text={item.reviseDate} />
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
