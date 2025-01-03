import React, { useEffect, useState } from 'react';
import '../SearchList.scss'
import '../SearchBox.scss';
import { TitleBox } from '../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDownLandCompany, DropDownTourLocation, DropDowncharger } from '../../DefaultData';
import Loading from '../components/Loading';
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { TextBox } from '../../../boxs/TextBox';


export default function Sub6_CancelRefund (props:any) {

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
	const [isVewListZero, setIsViewListZero] = useState<boolean>(false);
	const [arrangeWord1, setArrangeWord1] = useState('');
	const [arrangeWord2, setArrangeWord2] = useState('');

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminlist/getlistreserve`)
		if (res) {
			setList(res.data);
			setViewList(res.data);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  

	return (
		<div className='Menu3'>

			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setStartDate} date={startDate} marginLeft={1}/>
						<p>~</p>
						<DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setEndDate} date={endDate} marginLeft={20}/>
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

			<div style={{height:'30px'}}></div>
						
			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
						<h1>취소환불 현황</h1>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='10%' text='취소일'/>
						<TitleBox width='10%' text='예약일/출발일'/>
						<TitleBox width='5%' text='등급'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='12%' text='연락처'/>
						<TitleBox width='15%' text='여행상품'/>
						<TitleBox width='7%' text='랜드사'/>
						<TitleBox width='7%' text='방문경로'/>
						<TitleBox width='7%' text='총입금액'/>
						<TitleBox width='5%' text='환불/날짜'/>
						<TitleBox width='5%' text='담당자'/>
  				</div>
					
					{
						viewList.length > 0
						?
						viewList.map((item:any, index:any)=>{

							const phoneCopy = item.phone.split('/');
							const productCostCopy = JSON.parse(item.productCost);
							const landCompanyCopy = JSON.parse(item.landCompany);

							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										navigate('/admin/reserve/reservedetail', {state : item.serialNum});
									}}
								>
									<TextBox width='3%' text={index+1} />
									<TextBox width='10%' text={item.date}/>
									<TextBox width='10%' text={item.date}/>
									<TextBox width='5%' text={item.level} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={phoneCopy[0]} text2={phoneCopy[1]}/>
									<TextBox width='15%' text={item.productName} />
									<TextBox width='7%' text={landCompanyCopy[0].companyName}/>
									<TextBox width='7%' text={item.inputState} />
									<TextBox width='7%' text={''} />
									<TextBox width='5%' text={item.reviseDate} />
									<TextBox width='5%' text={item.charger} />
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
								<div className='Menu3' style={{paddingTop:'200px'}}>
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
