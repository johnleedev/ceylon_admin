import React from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';

export default function Sub2_CounselList (props:any) {

	let navigate = useNavigate();

	const example = [
		{ no: 1, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어', phone : '010-1234-5678',
			tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
			requestPath : '온라인', state : '문의/접수', charger : '김철수'},
		{ no: 2, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어2', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '문의/접수', charger : '김철수'},
		{ no: 3, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어3', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '문의/접수', charger : '김철수'},
		{ no: 4, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어4', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '문의/접수', charger : '김철수'},
		{ no: 5, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어5', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '문의/접수', charger : '김철수'},
		{ no: 6, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어6', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '문의/접수', charger : '김철수'},
		{ no: 7, requestDate: '2024-04-24 15:00', responseDate:'2024-04-24 15:00', name : '김실론어7', phone : '010-1234-5678',
		tourLocation : '하와이나라', tourType : '허니문', tourPeriod: '5박 7일', tourDate : `2023-04-02 ~ 2023-04-07`, tourPersonNum : '2명',
		requestPath : '온라인', state : '문의/접수', charger : '김철수'},
	]

	return (
		<div className='Menu2'>
				
			<div className="seachlist">

				<div className="main-title">
					<h1>상담리스트</h1>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						{/* <TitleBox width={80} text='NO'/>
						<TitleBox width={150} text='문의일 / 답변일'/>
						<TitleBox width={100} text='성함'/>
						<TitleBox width={150} text='연락처'/>
						<TitleBox width={120} text='여행지'/>
						<TitleBox width={100} text='방문경로'/>
						<TitleBox width={100} text='진행상황'/>
						<TitleBox width={100} text='담당자'/> */}
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
									<TextBox width={150} text={item.requestDate} text2={item.responseDate}  fontSize={15}/>
									<TextBox width={100} text={item.name}  fontSize={15}/>
									<TextBox width={150} text={item.phone} fontSize={15}/>
									<TextBox width={120} text={item.tourLocation} fontSize={15}/>
									<TextBox width={100} text={item.requestPath} fontSize={15}/>
									<TextBox width={100} text={item.state} fontSize={15}/>
									<TextBox width={100} text={item.charger} fontSize={15}/>
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
