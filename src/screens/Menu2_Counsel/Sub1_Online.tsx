import React, { useState } from 'react';
import './SearchBox.scss'
import './SearchList.scss'
import { SelectBox } from '../../boxs/SelectBox';
import { DateBox } from '../../boxs/DateBox';
import {ko} from "date-fns/locale";
import { format } from "date-fns";
import { RadioBox } from '../../boxs/RadioBox';
import { InputBox } from '../../boxs/InputBox';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';

export default function Sub1_Online (props:any) {

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
						<DateBox date={startDate} func={handleSelectDateChange}/>
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
						<DateBox date={startDate} func={handleSelectDateChange}/>
						<p>~</p>
						<DateBox date={startDate} func={handleSelectDateChange}/>
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
						[1,2,3,4,5,6,7].map((item:any, index:any)=>{
							return (
								<div className="rowbox">
									<TextBox width={50} text={index+1}/>
									<TextBox width={180} text='2024-04-24 15:00'/>
									<TextBox width={100} text='김실론어'/>
									<TextBox width={150} text='010-1234-5678'/>
									<TextBox width={120} text='하와이나라'/>
									<TextBox width={100} text='허니문'/>
									<TextBox width={100} text='5박 7일'/>
									<TextBox width={230} text={`2023-04-02 ~ 2023-04-07`}/>
									<TextBox width={50} text='2명'/>
									<TextBox width={100} text='온라인'/>
									<TextBox width={100} text='대기중'/>
									<TextBox width={100} text='김철수'/>
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
