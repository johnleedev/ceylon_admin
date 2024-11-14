import { DateBoxNum } from "../../../boxs/DateBoxNum"
import { DropdownBox } from "../../../boxs/DropdownBox"
import '../SearchBox.scss'
import { useState } from "react";
import { formatDate, subDays } from 'date-fns';


export function SearchBox (props:any) {

  
	const [searchSelect, setSearchSelect] = useState('');
	const [word, setWord] = useState('');
	const [searchSort, setSearchSort] = useState('기간');


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
        <div className="content">
					<DropdownBox
						widthmain='150px'
						height='35px'
						selectedValue={searchSort}
						options={[
							{ value: '태국', label: '태국' },
							{ value: '필리핀', label: '필리핀' }
						]}
						handleChange={(e)=>{setSearchSort(e.target.value)}}
					/>
					<DropdownBox
						widthmain='150px'
						height='35px'
						selectedValue={searchSort}
						options={[
							{ value: '세부', label: '세부' },
							{ value: '보라카이', label: '보라카이' },
							{ value: '푸켓', label: '푸켓' }
						]}
						handleChange={(e)=>{setSearchSort(e.target.value)}}
					/>
					<input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
              value={word} onChange={(e)=>{setWord(e.target.value)}}/>
        
					
					<div className="buttons" style={{margin:'20px 0'}}>
						<div className="btn searching"
							onClick={()=>{
								 handleWordSearching();
							}}
						>
							<p>검색</p>
						</div>
					</div>
				</div>
      </div>
      
      
    </div>
  )
}