import React from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';

export default function Sub8_Benefit (props:any) {

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
					<h1>혜택관리</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						{/* <TitleBox width={80} text='NO'/>
						<TitleBox width={100} text='구분'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={250} text='여행상품'/>
						<TitleBox width={100} text='최근여행일'/>
						<TitleBox width={100} text='이용횟수'/>
						<TitleBox width={100} text='이용금액'/>
						<TitleBox width={100} text='혜택'/> */}
					</div>
					
					{
						example.map((item:any, index:any)=>{
							return (
								<div className="rowbox"
									onClick={()=>{
										navigate('/counsel/counseldetail', {state : item});
									}}
								>
									<TextBox width={80} text={index+1} fontSize={15}/>
									<TextBox width={100} text={item.sort} fontSize={15}/>
									<TextBox width={100} text={item.name}  fontSize={15}/>
									<TextBox width={150} text={item.phone} fontSize={15}/>
									<TextBox width={250} text={item.tourProduct} fontSize={15}/>
									<TextBox width={100} text={item.lastTourDate} fontSize={15}/>
									<TextBox width={100} text={`${item.useNum}회`} fontSize={15}/>
									<TextBox width={100} text={item.useCost} fontSize={15}/>
									<TextBox width={100} text={item.present} fontSize={15}/>
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
