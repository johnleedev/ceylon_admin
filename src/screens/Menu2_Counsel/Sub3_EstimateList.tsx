import React from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';


export default function Sub3_EstimateList (props:any) {

	let navigate = useNavigate();

	return (
		<div className='Menu2'>
				
			<div className="seachlist">

				<div className="main-title">
					<h1>견적리스트</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width="8%" text='NO'/>
						<TitleBox width="15%" text='문의일 / 답변일'/>
						<TitleBox width="10%" text='성함'/>
						<TitleBox width="15%" text='연락처'/>
						<TitleBox width="12%" text='여행지'/>
						<TitleBox width="10%" text='타입'/>
						<TitleBox width="10%" text='기간'/>
						<TitleBox width="15%" text='여행날짜'/>
						<TitleBox width="5%" text='인원'/>
						<TitleBox width="10%" text='방문경로'/>
						<TitleBox width="10%" text='상태'/>
						<TitleBox width="10%" text='담당자'/>
					</div>
					
					{
						[1,2,3,4,5,6,7].map((item:any, index:any)=>{
							return (
								<div className="rowbox"
									onClick={()=>{
										
									}}
								>
									<TextBox width="8%" text={index+1} fontSize={15}/>
									<TextBox width="15%" text='2023-04-02' text2='2023-04-07' fontSize={15}/>
									<TextBox width="10%" text='김실론어' fontSize={15}/>
									<TextBox width="15%" text='010-1234-5678' fontSize={15}/>
									<TextBox width="12%" text='하와이나라' fontSize={15}/>
									<TextBox width="10%" text='허니문' fontSize={15}/>
									<TextBox width="10%" text='5박 7일' fontSize={15}/>
									<TextBox width="15%" text='2023-04-02' text2='2023-04-07' fontSize={15}/>
									<TextBox width="5%" text='2명' fontSize={15}/>
									<TextBox width="10%" text='소개' fontSize={15}/>
									<TextBox width="10%" text='견적서 생성' fontSize={15}/>
									<TextBox width="10%" text='김철수' fontSize={15}/>
								</div>
							)
						})
					}
				</div>

			</div>


		</div>
	);
}
