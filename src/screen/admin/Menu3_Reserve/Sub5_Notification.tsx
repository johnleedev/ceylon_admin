import React, { useEffect, useState } from 'react';
import '../SearchList.scss'
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { DropdownBox } from '../../../boxs/DropdownBox';
import { DropDownTourLocation, DropDowncharger } from '../../DefaultData';
import { SearchBox } from './SearchBox';
import Loading from '../components/Loading';


export default function Sub5_Notification (props:any) {

	let navigate = useNavigate();


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
	const [viewList, setViewList] = useState<ListProps[]>([]);
	const [isVewListZero, setIsViewListZero] = useState<boolean>(false);
	const [arrangeWord1, setArrangeWord1] = useState('');
	const [arrangeWord2, setArrangeWord2] = useState('');

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminreserve/getreserve`)
		if (res) {
			setList(res.data);

			setViewList(res.data);
		}
	};

	useEffect(() => {
		// fetchPosts();
	}, []);  

	return (
		<div className='Menu3'>

			<SearchBox list={list} setViewList={setViewList} setIsViewListZero={setIsViewListZero}/>
				
			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
						<h1>공지사항 발송</h1>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={arrangeWord1}
							options={DropDownTourLocation}
							handleChange={(text:any)=>{
								const textCopy = text.target.value;
								setArrangeWord1(textCopy);
								if (textCopy === '선택') {
									setViewList(list);
								} else {
									const copy = list.filter((e:any)=> e.tourLocation === textCopy);
									if (copy.length === 0) {
										setIsViewListZero(true);
									} 
									setViewList(copy);
								}
							}}
						/>
						<DropdownBox
							widthmain='100px'
							height='35px'
							selectedValue={arrangeWord2}
							options={DropDowncharger}
							handleChange={(text:any)=>{
								const textCopy = text.target.value;
								setArrangeWord2(textCopy);
								if (textCopy === '선택') {
									setViewList(list);
								} else {
									const copy = list.filter((e:any)=> e.charger === textCopy);
									if (copy.length === 0) {
										setIsViewListZero(true);
									} 
									setViewList(copy);
									console.log(copy);
								}
							}}
						/>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='10%' text='고유번호'/>
						<TitleBox width='10%' text='예약일/출발일'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='8%' text='연락처'/>
						<TitleBox width='8%' text='여행지'/>
						<TitleBox width='15%' text='여행상품'/>
						<TitleBox width='7%' text='진행상황'/>
						<TitleBox width='5%' text='담당자'/>
  				</div>
					
					{/* {
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
									<TextBox width='3%' text={index+1} />
									<TextBox width='10%' text={item.serialNum} />
									<TextBox width='10%' text={item.date} text2={item.tourStartPeriod}/>
									<TextBox width='8%' text={item.name} />
									<TextBox width='8%' text={item.tourLocation} />
									<TextBox width='15%' text={item.productName} />
									<TextBox width='7%' text={item.state} />
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
					} */}
				</div>

			</div>

			<div style={{height:'100px'}}></div>
		</div>
	);
}
