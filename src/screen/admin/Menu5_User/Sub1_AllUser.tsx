import React from 'react';
import { TitleList } from '../../../boxs/TitleList';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';

export default function Sub1_AllUser (props:any) {

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
		<div className='Main-cover'>

			<div className="main-title">
				<div className='title-box'>
					<h1>전체회원</h1>
				</div>
			</div>
				
			<div className="seachlist">

				<div className="main-list-cover">
					<div className="TitleList">
						<TitleList width="5%" text='NO'/>
						<TitleList width="7%" text='구분'/>
						<TitleList width="10%" text='성함'/>
						<TitleList width="15%" text='연락처'/>
						<TitleList width="25%" text='여행상품'/>
						<TitleList width="10%" text='최근여행일'/>
						<TitleList width="7%" text='이용횟수'/>
						<TitleList width="10%" text='이용금액'/>
						<TitleList width="7%" text='혜택'/>
					</div>
					
					{
						example.map((item:any, index:any)=>{
							return (
								<div className="rowbox">
									<TextBox width="5%" text={index+1} />
									<TextBox width="7%" text={item.sort} />
									<TextBox width="10%" text={item.name}  />
									<TextBox width="15%" text={item.phone} />
									<TextBox width="25%" text={item.tourProduct} />
									<TextBox width="10%" text={item.lastTourDate} />
									<TextBox width="7%" text={`${item.useNum}회`} />
									<TextBox width="10%" text={item.useCost} />
									<TextBox width="7%" text={item.present} />
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
