import React from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';

export default function Sub4_GoldUser (props:any) {

	let navigate = useNavigate();

	const example = [
		{ no: 1, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},
		{ no: 2, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},
		{ no: 3, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},
		{ no: 4, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},
		{ no: 5, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},
		{ no: 6, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},
		{ no: 7, sort: '신규회원', name : '김실론어', phone : '010-1234-5678',
			tourProduct : 'OZ 인천 하와이 5박 7일', lastTourDate : '2024-04-24',
			useNum : 1, useCost : 7500000, present: '적립금'},			
	]

	return (
		<div className='Menu2'>
				
			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
						<h1>골드회원</h1>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width="5%" text='NO'/>
						<TitleBox width="7%" text='구분'/>
						<TitleBox width="10%" text='성함'/>
						<TitleBox width="15%" text='연락처'/>
						<TitleBox width="25%" text='여행상품'/>
						<TitleBox width="10%" text='최근여행일'/>
						<TitleBox width="7%" text='이용횟수'/>
						<TitleBox width="10%" text='이용금액'/>
						<TitleBox width="7%" text='혜택'/>
					</div>
					
					{
						example.map((item:any, index:any)=>{
							return (
								<div className="rowbox">
									<TextBox width="5%" text={index+1} fontSize={15}/>
									<TextBox width="7%" text={item.sort} fontSize={15}/>
									<TextBox width="10%" text={item.name}  fontSize={15}/>
									<TextBox width="15%" text={item.phone} fontSize={15}/>
									<TextBox width="25%" text={item.tourProduct} fontSize={15}/>
									<TextBox width="10%" text={item.lastTourDate} fontSize={15}/>
									<TextBox width="7%" text={`${item.useNum}회`} fontSize={15}/>
									<TextBox width="10%" text={item.useCost} fontSize={15}/>
									<TextBox width="7%" text={item.present} fontSize={15}/>
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
