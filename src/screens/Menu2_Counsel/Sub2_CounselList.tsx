import React from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import './SearchList.scss'

export default function Sub2_CounselList (props:any) {

	return (
		<div className='Menu2'>
				
			<div className="seachlist">

				<div className="main-title">
					<h1>상담리스트</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width={80} text='NO'/>
						<TitleBox width={150} text='문의일 / 답변일'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={120} text='여행지'/>
						<TitleBox width={100} text='방문경로'/>
						<TitleBox width={100} text='진행상황'/>
						<TitleBox width={100} text='담당자'/>
					</div>
					
					{
						[1,2,3,4,5,6,7].map((item:any, index:any)=>{
							return (
								<div className="rowbox">
									<TextBox width={80} text={index+1}/>
									<TextBox width={150} text='2023-04-02' text2='2023-04-07'/>
									<TextBox width={100} text='김실론어'/>
									<TextBox width={150} text='010-1234-5678'/>
									<TextBox width={120} text='하와이나라'/>
									<TextBox width={100} text='온라인'/>
									<TextBox width={100} text='문의/접수'/>
									<TextBox width={100} text='김철수'/>
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
