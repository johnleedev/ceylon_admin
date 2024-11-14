import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../SearchList.scss'
import '../Products.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { PiPencilSimpleLineFill } from "react-icons/pi";
import { SearchBox } from './SearchBox';
import ModalAddSchedule from './Modal/ModalAddSchedule';
import { FaCircle } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import ModalAddTourLocation from './Modal/ModalAddTourLocation';

interface ListProps {
	id: string;
	sort : string;
	nation: string;
	city: string;
	location: string;
	subLocation: string;
	locationTitle: string;
	locationContent: string;
	locationContentDetail: string;
	date : string;
	postImage : string;
}

export default function Sub4_TourLocation (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [list, setList] = useState<ListProps[]>([]);
	const [nationlist, setNationList] = useState<any>([]);
  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/tourlocation/gettourlocation`)
    if (res) {
      setList(res.data);
    }
		const nationCityRes = await axios.post(`${MainURL}/nationcity/getnationcity`, {
      selectContinent : '전체'
		})
    if (nationCityRes.data !== false) {
			const copy = [...nationCityRes.data];
			copy.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setNationList(copy);
    }
  };

	useEffect(() => {
		// fetchPosts();
	}, [refresh]);  


	// 모달 ---------------------------------------------------------
	const [isViewAddTourLoactionModal, setIsViewAddTourLoactionModal] = useState<boolean>(false);
	const [locationInfo, setLocationInfo] = useState<ListProps>();
	const [isAddOrRevise, setIsAddOrRevise] = useState('');

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteHotel = async (item:any) => {
		const getParams = {
			postId : item.id,
			images : JSON.parse(item.postImage)
		}
		axios 
			.post(`${MainURL}/tourlocation/deletelocation`, getParams)
			.then((res) => {
				if (res.data) {
					setRefresh(!refresh);
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};

	const handleDeleteAlert = (item:any) => {
		const costConfirmed = window.confirm(`${item.id}번 일정을 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteHotel(item);
		} else {
			return
		}
	};

	return (
		<div className='Menu5'>

			<div className="main-title">
				<div className='title-box'>
					<h1>여행지관리</h1>	
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewAddTourLoactionModal(true);
					}}
				>
					<PiPencilSimpleLineFill />
					<p>여행지등록</p>
				</div>
			</div>

			<SearchBox/>

			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='10%' text='종류'/>
						<TitleBox width='10%' text='국가'/>
						<TitleBox width='10%' text='도시'/>
						<TitleBox width='10%' text='여행지명'/>
						<TitleBox width='10%' text='여행지명(서브)'/>
						<TitleBox width='10%' text='수정일'/>
						<TitleBox width='10%' text=''/>
  				</div>
					
					{ list.length > 0 &&
						list.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
									}}
								>
									<TextBox width='3%' text={item.id} />
									<TextBox width='10%' text={item.sort} />
									<TextBox width='10%' text={item.nation} />
									<TextBox width='10%' text={item.city} />
									<TextBox width='10%' text={item.location} />
									<TextBox width='10%' text={item.subLocation}/>
									<TextBox width='10%' text={item.date.slice(0,10)} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setIsAddOrRevise('revise');
												setLocationInfo(item);
												setIsViewAddTourLoactionModal(true);
											}}
										>
											<p>수정</p>
										</div>
										<div className="divider"></div>
										<div className="hotelControlBtn2"
											onClick={()=>{handleDeleteAlert(item);}}
										>
											<p>삭제</p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>

			</div>

			{/* 일정등록 모달창 */}
      {
        isViewAddTourLoactionModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddTourLocation
								refresh={refresh}
								setRefresh={setRefresh}
								nationlist={nationlist}
								isAddOrRevise={isAddOrRevise}
								locationInfo={locationInfo}
								setIsViewAddTourLoactionModal={setIsViewAddTourLoactionModal}
						 />
          </div>
        </div>
      }

		</div>
	);
}
