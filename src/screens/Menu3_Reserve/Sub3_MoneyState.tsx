import React, { useState } from 'react';
import '../SearchList.scss'
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';

export default function Sub3_MoneyState (props:any) {

	let navigate = useNavigate();

	const example = [
		{ no: 1, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10', 
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10',
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
		{ no: 2, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10', 
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10', 
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
		{ no: 3, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10', 
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10', 
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
		{ no: 4, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10', 
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10',
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
		{ no: 5, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10', 
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10', 
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
		{ no: 6, reserveDate: '2024-04-24', startDate: '2024-04-24',name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10',  
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10', 
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
		{ no: 7, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			reserveCost: 75000000, reserveCostDate: '24-11-10', 
			middleCost: 75000000, middleCostDate: '24-11-10', 
			restCost: 75000000, restCostDate: '24-11-10',
			landCp: '퍼시픽', landCpCostDate: '24-11-10', charger : '김철수'},
	]

	// 날짜 선택 ----------------------------------------------
	const [startDate, setStartDate] = useState();
	const handleSelectDateChange = ( event : any) => {
		setStartDate(event);
		const day = format(event, 'EEE', { locale: ko });
		const copy = event.toLocaleDateString('ko-KR');
		const splitCopy = copy.split('. ');
		const thirdText = splitCopy[2].slice(0, -1);
		const reformmedTextko = `${splitCopy[0]}년 ${splitCopy[1]}월 ${thirdText}일 (${day})`
		const splitCopy2Copy = splitCopy[1] < 10 ? `0${splitCopy[1]}` : splitCopy[1];
		const splitCopy3Copy = splitCopy[2] < 10 ? `0${splitCopy[2]}` : splitCopy[2];
		const reformmedText = `${splitCopy[0]}.${splitCopy2Copy}.${splitCopy3Copy}`;
	//  setDate(reformmedTextko);
	//  setDateOrigin(reformmedText);
	}

	const [selectedValue, setSelectedValue] = useState('');

	return (
		<div className='Menu2'>
				

			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
						<h1>입출금현황</h1>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						{/* <TitleBox width={50} text='NO'/>
						<TitleBox width={100} text='예약일/출발일'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={250} text='여행상품'/>
						<TitleBox width={120} text='계약금'/>
						<TitleBox width={120} text='항공료/중도금'/>
						<TitleBox width={120} text='잔금/기타경비'/>
						<TitleBox width={100} text='랜드사'/>
						<TitleBox width={100} text='지상비/지급일'/>
						<TitleBox width={100} text='담당자'/> */}
  				</div>
					
					{
						example.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										
									}}
								>
									{/* <TextBox width={50} text={item.no} fontSize={15}/>
									<TextBox width={100} text={item.reserveDate} text2={item.startDate} fontSize={15}/>
									<TextBox width={100} text={item.name1} text2={item.name2} fontSize={15}/>
									<TextBox width={150} text={item.phone1} text2={item.phone2} fontSize={15}/>
									<TextBox width={250} text={item.tourProduct} fontSize={15}/>
									<TextBox width={120} text={`${item.reserveCost}원`} text2={item.reserveCostDate} fontSize={15}/>
									<TextBox width={120} text={`${item.middleCost}원`} text2={item.middleCostDate} fontSize={15}/>
									<TextBox width={120} text={`${item.restCost}원`} text2={item.restCostDate} fontSize={15}/>
									<TextBox width={100} text={item.landCp} fontSize={15}/>
									<TextBox width={100} text={item.landCpCostDate} fontSize={15}/>
									<TextBox width={100} text={item.charger} fontSize={15}/> */}
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
