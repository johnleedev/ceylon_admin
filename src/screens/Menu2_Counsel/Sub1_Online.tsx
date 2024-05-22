import React, { useEffect, useState } from 'react';
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
import { DateBoxNum } from '../../boxs/DateBoxNum';
import { DropdownBox } from '../../boxs/DropdownBox';
import { DropDownSearchSelect } from '../DefaultData';
import axios from 'axios';
import MainURL from '../../MainURL';

export default function Sub1_Online (props:any) {

	let navigate = useNavigate();

	const [dateSort, setDateSort] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [sort, setSort] = useState('');
	const [word, setWord] = useState('');

	interface CheckBoxProps {
    title: string;
  }

  const CheckBox: React.FC<CheckBoxProps> = ({ title }) => (
    <div className='checkInputCover'>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={sort === title}
          onChange={()=>{
            setSort(title);
          }}
        />
      </div>
      <p>{title}</p>
    </div>
  )


	// 게시글 가져오기 ------------------------------------------------------
	interface ListProps {
		id: number;
		date: string;
		name: string;
		phone: string;
		interestLocation: string;
		callTime : string;
		dateCeremony: string;
		sort: string;
		stage: string
		visitTime: string;
	}
	const [list, setList] = useState<ListProps[]>([]);

	const fetchPosts = async () => {
		const res = await axios.get(`${MainURL}/adminschedule/getonlinelist`)
		if (res) {
			setList(res.data);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);  


	return (
		<div className='Menu2'>
				
			<div className="searchbox">
				<div className="cover">
					<div className="title">
						<h3>기간</h3>
					</div>
					<div className="content">
						<DropdownBox
                widthmain='100px'
                height='35px'
                selectedValue={dateSort}
                options={DropDownSearchSelect}
                handleChange={(e)=>{setDateSort(e.target.value)}}
              />
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
						<DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={setStartDate} date={startDate} marginLeft={1}/>
						<p>~</p>
						<DateBoxNum width='150px' subWidth='130px' right={15} setSelectDate={setEndDate} date={endDate} marginLeft={1}/>
					</div>
				</div>
				<div className="cover">
					<div className="title">
						<h3>검색어</h3>
					</div>
					<div className="content">
						<CheckBox title='예약자명'/>
						<CheckBox title='전화번호'/>
						<CheckBox title='상품코드'/>
						<CheckBox title='아이디'/>
						<div className='checkInputCover'>
						<div className='checkInput'>
							<input className="input" type="checkbox"
								checked={sort === 'drop'}
								onChange={()=>{
									setSort('drop')
								}}
							/>
						</div>
						<DropdownBox
                widthmain='100px'
                height='35px'
                selectedValue={''}
                options={[
									{ value: '신규상담', label: '신규상담' },
									{ value: '신규상담', label: '신규상담' },
								]}
                handleChange={(e)=>{}}
              />
					</div>
						<input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
              value={word} onChange={(e)=>{setWord(e.target.value)}}/>
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
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='5%' text='형태'/>
						<TitleBox width='8%' text='성함'/>
						<TitleBox width='12%' text='연락처'/>
						<TitleBox width='12%' text='예식일'/>
						<TitleBox width='10%' text='관심여행지'/>
						<TitleBox width='10%' text='통화가능시간'/>
						<TitleBox width='12%' text='방문예정일'/>
						<TitleBox width='7%' text='방문시간'/>
						<TitleBox width='7%' text='장소'/>
						<TitleBox width='5%' text='상태'/>
  				</div>
					
					{
						list.map((item:any, index:any)=>{
							return (
								<div key={index} className="rowbox">
									<TextBox width='3%' text={index+1} />
									<TextBox width='5%' text={item.sort} />
									<TextBox width='8%' text={item.name} />
									<TextBox width='12%' text={item.phone} />
									<TextBox width='12%' text={item.dateCeremony} />
									<TextBox width='10%' text={item.interestLocation} />
									<TextBox width='10%' text={item.callTime} />
									<TextBox width='12%' text={item.date} />
									<TextBox width='7%' text={item.visitTime} />
									<TextBox width='7%' text={item.stage} />
									<TextBox width='5%' text={item.state} />
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
