import React from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';


export default function Sub4_CloseList (props:any) {

	let navigate = useNavigate();

	return (
		<div className='Menu2'>
				
			<div className="seachlist">

				<div className="main-title">
					<h1>상담종료</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						{/* <TitleBox width={80} text='NO'/>
						<TitleBox width={150} text='문의일 / 답변일'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={120} text='여행지'/>
						<TitleBox width={100} text='타입'/>
						<TitleBox width={100} text='기간'/>
						<TitleBox width={150} text='여행날짜'/>
						<TitleBox width={50} text='인원'/>
						<TitleBox width={100} text='방문경로'/>
						<TitleBox width={100} text='상태'/>
						<TitleBox width={100} text='담당자'/> */}
					</div>
					
					{
						[1,2,3,4,5,6,7].map((item:any, index:any)=>{
							return (
								<div className="rowbox"
									onClick={()=>{
										navigate('/counsel/counseldetail', {state : item});
									}}
								>
									{/* <TextBox width={80} text={index+1} fontSize={15}/>
									<TextBox width={150} text='2023-04-02' text2='2023-04-07' fontSize={15}/>
									<TextBox width={100} text='김실론어' fontSize={15}/>
									<TextBox width={150} text='010-1234-5678' fontSize={15}/>
									<TextBox width={120} text='하와이나라' fontSize={15}/>
									<TextBox width={100} text='허니문' fontSize={15}/>
									<TextBox width={100} text='5박 7일' fontSize={15}/>
									<TextBox width={150} text='2023-04-02' text2='2023-04-07' fontSize={15}/>
									<TextBox width={50} text='2명' fontSize={15}/>
									<TextBox width={100} text='소개' fontSize={15}/>
									<TextBox width={100} text='단순상담' fontSize={15}/>
									<TextBox width={100} text='김철수' fontSize={15}/> */}
								</div>
							)
						})
					}
				</div>

			</div>


		</div>
	);
}
