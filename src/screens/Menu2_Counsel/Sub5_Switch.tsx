import React, { useEffect, useState } from 'react';
import { TitleBox } from '../../boxs/TitleBox';
import { TextBox } from '../../boxs/TextBox';
import '../SearchList.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../MainURL';

export default function Sub5_Switch (props:any) {

	let navigate = useNavigate();

	// 게시글 가져오기 ------------------------------------------------------
	interface ListProps {
		id: number;
		accepter: string;
		charger: string;
		date: string;
		dateCeremony: string;
		dateEnd: string;
		dateStart: string;
		name: string;
		notice: string;
		phone: string;
		requestion: string;
		sort: string;
		tourLocation: string;
		tourPersonNum: string;
		visitPath: string;
		visitTime: string;
	}
	const [list, setList] = useState<ListProps[]>([]);

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminschedule/getcounsellist`)
		if (res) {
			setList(res.data);
		}
	};

	useEffect(() => {
		// fetchPosts();
	}, []);  


	return (
		<div className='Menu2'>
				
			<div className="seachlist">

				<div className="main-title">
					<div className='title-box'>
						<h1>예약전환</h1>
					</div>
				</div>

				<div className="main-list-cover">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='5%' text='형태'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='12%' text='연락처'/>
						<TitleBox width='12%' text='예식일'/>
						<TitleBox width='10%' text='여행지'/>
						<TitleBox width='10%' text='방문경로'/>
						<TitleBox width='12%' text='방문예정일'/>
						<TitleBox width='7%' text='방문시간'/>
						<TitleBox width='5%' text='상태'/>
  				</div>
					
					{
						list.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
										// navigate('/counsel/counseldetail', {state : {data: item, pathType:"revise"}});
										window.scrollTo(0, 0);
									}}
								>
									<TextBox width='3%' text={index+1} />
									<TextBox width='5%' text={item.sort === 'honeymoon' ? '허니문' : '일반'} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={item.phone} />
									<TextBox width='12%' text={item.dateCeremony} />
									<TextBox width='10%' text={item.tourLocation} />
									<TextBox width='10%' text={item.visitPath} />
									<TextBox width='12%' text={item.date} />
									<TextBox width='7%' text={item.visitTime} />
									<TextBox width='5%' text={item.state} />
								</div>
							)
						})
					}
				</div>

			</div>

		</div>
	);
}
