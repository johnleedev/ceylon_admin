import { DateBoxNum } from "../../boxs/DateBoxNum"
import { DropdownBox } from "../../boxs/DropdownBox"
import './SearchBox.scss'
import { useState } from "react";
import { formatDate, subDays } from 'date-fns';


export function SearchBox (props:any) {

  const [dateSort, setDateSort] = useState('선택');
	const [dateSelect, setDateSelect] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [searchSelect, setSearchSelect] = useState('');
	const [word, setWord] = useState('');
	const [searchSort, setSearchSort] = useState('기간');

  interface CheckBoxProps {
    title: string;
  }

  const CheckBox: React.FC<CheckBoxProps> = ({ title }) => (
    <div className='checkInputCover'>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={searchSelect === title}
          onChange={()=>{
            setSearchSelect(title);
          }}
        />
      </div>
      <p>{title}</p>
    </div>
  )

  const selectDays = [
		{name: "오늘", period: 0}, {name: "어제", period: 1}, {name: "3일", period: 3}, {name: "7일", period: 7}, 
		{name: "1개월", period: 30}, {name: "3개월", period: 90}, {name: "6개월", period: 180}
	]

  // 검색날짜셋팅 ------------------------------------------------------
	const handleDateSelect = async (dateNum:number) => {
		const date = new Date();
		const today = formatDate(date, 'yyyy-MM-dd');
		const preDate = subDays(today, dateNum);
		const reformedPreDate = formatDate(preDate, 'yyyy-MM-dd');
		setStartDate(reformedPreDate);
		setEndDate(today);
	};

  	// 날짜 검색 ------------------------------------------------------
	const handleDateSearching = async () => {
  	if (startDate !== '' && endDate !== '') {
			if (dateSort === '예약일') {
				const copy = props.list.filter((e:any) => new Date(e.date) >= new Date(startDate) && new Date(e.date) <= new Date(endDate));
				props.setViewList(copy);
				if (copy.length === 0) {
					props.setIsViewListZero(true);
				} 
			} else if (dateSort === '출발일') {
				const copy = props.list.filter((e:any) => new Date(e.tourStartPeriod) >= new Date(startDate) && new Date(e.tourStartPeriod) <= new Date(endDate));
				props.setViewList(copy);
				if (copy.length === 0) {
					props.setIsViewListZero(true);
				} 
			} 
		} 
	};

	// 글자 검색 ------------------------------------------------------
	const handleWordSearching = async () => {
		if (searchSelect !== '') {
			if (searchSelect === '예약자명') {
				const copy = props.list.filter((e:any) => e.name.includes(word));
				props.setViewList(copy);
				if (copy.length === 0) {
					props.setIsViewListZero(true);
				} 
			} else if (searchSelect === '고유번호') {
				const copy = props.list.filter((e:any) => e.serialNum.includes(word));
				props.setViewList(copy);
				if (copy.length === 0) {
					props.setIsViewListZero(true);
				} 
			} else if (searchSelect === '여행상품명') {
				const copy = props.list.filter((e:any) => e.productName.includes(word));
				props.setViewList(copy);
				if (copy.length === 0) {
					props.setIsViewListZero(true);
				} 
			}
		}
	};

  return (
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
              options={[
								{ value: '선택', label: '선택' },
								{ value: '예약일', label: '예약일' },
								{ value: '출발일', label: '출발일' },
							]}
							handleChange={(e)=>{setDateSort(e.target.value)}}
            />
          <div className="btn-row">
					{
						selectDays.map((item:any, index:any)=>{
							return (
								<div className='btnbox' key={index} style={{backgroundColor:dateSelect === item.name ? '#EAEAEA' : "#fff"}}
									onClick={()=>{
										setDateSelect(item.name);
										handleDateSelect(item.period);
									}}
								>
									<p>{item.name}</p>
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
					<CheckBox title='고유번호'/>
					<CheckBox title='예약자명'/>
					<CheckBox title='여행상품명'/>
					<input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
              value={word} onChange={(e)=>{setWord(e.target.value)}}/>
        </div>
      </div>
      
        <div className="buttons" style={{margin:'20px 0'}}>
					<DropdownBox
						widthmain='80px'
						height='35px'
						selectedValue={searchSort}
						options={[
							{ value: '기간', label: '기간' },
							{ value: '검색어', label: '검색어' }
						]}
						handleChange={(e)=>{setSearchSort(e.target.value)}}
					/>
					<div className="buttons" style={{margin:'20px 0'}}>
						<div className="btn searching"
							onClick={()=>{
								searchSort === '기간' ? handleDateSearching() : handleWordSearching();
							}}
						>
							<p>검색</p>
						</div>
					</div>
					<div className="btn reset"
						onClick={()=>{
							setDateSort('선택');
							props.setViewList(props.list);
							setDateSelect('');
							setStartDate('');
							setEndDate('');
							setSearchSelect('');
							setWord('');
						}}
					>
						<p>초기화</p>
					</div>
				</div>
      
    </div>
  )
}