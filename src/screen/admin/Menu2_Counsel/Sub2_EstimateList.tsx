import React, { useEffect, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss';
import '../SearchBox.scss';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../MainURL';
import Loading from '../components/Loading';
import { DropDowncharger } from '../../DefaultData';


export default function Sub2_EstimateList (props:any) {

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
	const [arrangeWord, setArrangeWord] = useState('');

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminschedule/getonlinelist/stay`);
		if (res) {
			setList(res.data);
			setViewList(res.data);
			console.log(res.data);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  


	return (
		<div className='Menu2'>

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

			<div style={{height:'30px'}}></div>
				
			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
						<h1>견적 DB</h1>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='12%' text='답변일/문의일'/>
						<TitleBox width='5%' text='형태'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='12%' text='연락처'/>
						<TitleBox width='12%' text='여행지'/>
						<TitleBox width='10%' text='여행예정일'/>
						<TitleBox width='10%' text='방문경로'/>
						<TitleBox width='12%' text='진행상황'/>
						<TitleBox width='7%' text='담당자'/>
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


		</div>
	);
}
