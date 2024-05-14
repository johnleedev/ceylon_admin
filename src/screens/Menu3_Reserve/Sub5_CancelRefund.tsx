import React, { useState } from 'react';
import '../SearchBox.scss'
import '../SearchList.scss'
import { SelectBox } from '../../boxs/SelectBox';
import { DateBoxKo } from '../../boxs/DateBoxKo';
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { RadioBox } from '../../boxs/RadioBox';
import { InputBox } from '../../boxs/InputBox';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import { useNavigate } from 'react-router-dom';

export default function Sub5_CancelRefund (props:any) {

	let navigate = useNavigate();

	const example = [
		{ no: 1, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10', 
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10',
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
		{ no: 2, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10', 
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10', 
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
		{ no: 3, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10', 
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10', 
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
		{ no: 4, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10', 
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10',
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
		{ no: 5, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10', 
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10', 
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
		{ no: 6, reserveDate: '2024-04-24', startDate: '2024-04-24',name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10',  
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10', 
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
		{ no: 7, reserveDate: '2024-04-24', startDate: '2024-04-24', name1 : '김실론어', name2 : '이박투어', phone1 : '010-1234-5678', phone2 : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', 
			depositCost: 75000000, depositCostDate: '24-11-10', 
			refundCost: 75000000, refundCostDate: '24-11-10', 
			balanceCost: 75000000, balanceCostDate: '24-11-10',
			landCp: '퍼시픽', reservePath: '온라인', charger : '김철수'},
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
				
			<div className="searchbox">
				<div className="cover">
					<div className="title">
						<h3>기간</h3>
					</div>
					<div className="content">
						<h3 style={{margin:'0 10px'}}>계약일</h3>
						<DateBoxKo date={startDate} func={handleSelectDateChange}/>
						<div className="btn-row">
							{
								["오늘", "어제", "3일", "7일", "1개월", "3개월", "6개월"]
								.map((item:any, index:any)=>{
									return (
										<div className='btnbox' key={index}>
											<p>{item}</p>
										</div>
									)
								})
							}
						</div>
						<DateBoxKo date={startDate} func={handleSelectDateChange}/>
						<p>~</p>
						<DateBoxKo date={startDate} func={handleSelectDateChange}/>
					</div>
				</div>
				<div className="cover">
					<div className="title">
						<h3>검색어</h3>
					</div>
					<div className="content">
						<SelectBox 
							notice={{ value: '선택', label: '여행지' }}
							widthmain={100} selectWidth={100} selectTextWidth={90}
							data={[ 
								{ value: 'n1', label: '신규상담' },
								{ value: 'n2', label: '신규상담' }
							]} 
						/>
						<SelectBox 
							notice={{ value: '선택', label: '소개업체' }}
							widthmain={100} selectWidth={100} selectTextWidth={90}
							data={[ 
								{ value: 'n1', label: '신규상담' },
								{ value: 'n2', label: '신규상담' }
							]} 
						/>
						<SelectBox 
							notice={{ value: '선택', label: '랜드사' }}
							widthmain={100} selectWidth={100} selectTextWidth={90}
							data={[ 
								{ value: 'n1', label: '신규상담' },
								{ value: 'n2', label: '신규상담' }
							]} 
						/>
						<SelectBox 
							notice={{ value: '선택', label: '담당자' }}
							widthmain={100} selectWidth={100} selectTextWidth={90}
							data={[ 
								{ value: 'n1', label: '신규상담' },
								{ value: 'n2', label: '신규상담' }
							]} 
						/>
						<InputBox width='5%' value={''} func={(e)=>{}} />
					</div>
				</div>
				<div className="buttonbox">
					<div className="buttons">
						<div className="btn searching">
							<p>검색</p>
						</div>
						<div className="btn reset">
							<p>초기화</p>
						</div>
					</div>
				</div>
			</div>

			<div className="seachlist">

				<div className="main-title">
					<h1>취소환불현황</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						{/* <TitleBox width={50} text='NO'/>
						<TitleBox width={100} text='예약일/출발일'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={250} text='여행상품'/>
						<TitleBox width={100} text='랜드사'/>
						<TitleBox width={120} text='입금액'/>
						<TitleBox width={120} text='환불액'/>
						<TitleBox width={120} text='차액(밸런스)'/>
						<TitleBox width={100} text='예약경로'/>
						<TitleBox width={100} text='담당자'/> */}
  				</div>
					
					{
						example.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										navigate('counseldetail', {state : item});
									}}
								>
									<TextBox width={50} text={item.no} fontSize={15}/>
									<TextBox width={100} text={item.reserveDate} text2={item.startDate} fontSize={15}/>
									<TextBox width={100} text={item.name1} text2={item.name2} fontSize={15}/>
									<TextBox width={150} text={item.phone1} text2={item.phone2} fontSize={15}/>
									<TextBox width={250} text={item.tourProduct} fontSize={15}/>
									<TextBox width={100} text={item.landCp} fontSize={15}/>
									<TextBox width={120} text={`${item.depositCost}원`} text2={item.depositCostDate} fontSize={15}/>
									<TextBox width={120} text={`${item.refundCost}원`} text2={item.refundCostDate} fontSize={15}/>
									<TextBox width={120} text={`${item.balanceCost}원`} text2={item.balanceCostDate} fontSize={15}/>
									
									<TextBox width={100} text={item.reservePath} fontSize={15}/>
									<TextBox width={100} text={item.charger} fontSize={15}/>
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
