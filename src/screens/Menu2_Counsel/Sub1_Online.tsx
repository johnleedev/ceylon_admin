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

export default function Sub1_Online (props:any) {

	let navigate = useNavigate();

	const example = [
		{ no: 1, requestDate: '2024-04-24 15:00', name : '김실론어', phone : '010-1234-5678',
			tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
			requestPath : '온라인', state : '대기중', charge : '김철수'},
		{ no: 2, requestDate: '2024-04-24 15:00', name : '김실론어2', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '대기중', charge : '김철수'},
		{ no: 3, requestDate: '2024-04-24 15:00', name : '김실론어3', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '대기중', charge : '김철수'},
		{ no: 4, requestDate: '2024-04-24 15:00', name : '김실론어4', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '대기중', charge : '김철수'},
		{ no: 5, requestDate: '2024-04-24 15:00', name : '김실론어5', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '대기중', charge : '김철수'},
		{ no: 6, requestDate: '2024-04-24 15:00', name : '김실론어6', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '대기중', charge : '김철수'},
		{ no: 7, requestDate: '2024-04-24 15:00', name : '김실론어7', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '대기중', charge : '김철수'},
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
						<RadioBox text='예약자명' width={100} selectedValue={selectedValue} func={()=>{}} />
						<RadioBox text='전화번호' width={100} selectedValue={selectedValue} func={()=>{}} />
						<RadioBox text='상품코드' width={100} selectedValue={selectedValue} func={()=>{}} />
						<RadioBox text='아이디' width={100} selectedValue={selectedValue} func={()=>{}} />
						<div style={{width:`200px`, display:'flex', alignItems:'center'}}>
							<input
								style={{width:'15px'}}
								type="radio"
								id="신규상담"
								className="input"
								value="신규상담"
								checked={selectedValue === "신규상담"}
								onChange={()=>{}}
							/>
							<SelectBox 
								notice={{ value: '선택', label: '선택' }}
								widthmain={100} selectWidth={100} selectTextWidth={90}
								data={[ 
									{ value: 'n1', label: '신규상담' },
									{ value: 'n2', label: '신규상담' }
								]} 
							/>
						</div>
						<InputBox width={400} value={''} func={(e)=>{}} />
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
					<h1>온라인 문의</h1>
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
						<TitleBox width={50} text='NO'/>
						<TitleBox width={180} text='문의일'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={120} text='여행지'/>
						<TitleBox width={100} text='타입'/>
						<TitleBox width={100} text='기간'/>
						<TitleBox width={230} text='여행날짜'/>
						<TitleBox width={50} text='인원'/>
						<TitleBox width={100} text='방문경로'/>
						<TitleBox width={100} text='상태'/>
						<TitleBox width={100} text='담당자'/>
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
									<TextBox width={180} text={item.requestDate} fontSize={15}/>
									<TextBox width={100} text={item.name} fontSize={15}/>
									<TextBox width={150} text={item.phone} fontSize={15}/>
									<TextBox width={120} text={item.tourLocation} fontSize={15}/>
									<TextBox width={100} text={item.tourType} fontSize={15}/>
									<TextBox width={100} text={item.tourPeriod} fontSize={15}/>
									<TextBox width={230} text={item.tourDate}/>
									<TextBox width={50} text={item.tourPersonNum} fontSize={15}/>
									<TextBox width={100} text={item.requestPath} fontSize={15}/>
									<TextBox width={100} text={item.state} fontSize={15}/>
									<TextBox width={100} text={item.charge} fontSize={15}/>
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
