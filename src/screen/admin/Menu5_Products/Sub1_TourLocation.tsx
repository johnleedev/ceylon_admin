import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import './Menu5Products.scss'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import ModalAddNation from './Modal/ModalAddNation';
import ModalAddCity from './Modal/ModalAddCity';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { FaCircle } from "react-icons/fa";
import { IoCloseOutline, IoSettingsOutline  } from "react-icons/io5";

export default function Sub1_TourLocation (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	const [currentTab, setCurrentTab] = useState(1);
  interface SelectMenuProps {
    tabNum : number;
    title: string;
  }
  const SelectMenu: React.FC<SelectMenuProps> = ({ tabNum, title}) => {
    return (
      <div className='selectBtn'
       onClick={() => setCurrentTab(tabNum)}
     >
       <p style={{color: currentTab === tabNum ? '#333' : '#BDBDBD'}}>{title}</p>
       <div className='bar' style={{backgroundColor: currentTab === tabNum ? '#5fb7ef' : '#f6f6f6'}}></div>
     </div>
    )    
  };

	const continents = ["전체", "아시아/호주", "태평양", "인도양", "미주/중남미", "중동", "아프리카", "유럽"];
	const [selectContinent, setSelectContinent] = useState("전체");
	const [nationData, setNationData] = useState();
	const [cityData, setCityData] = useState();

	// 리스트 가져오기 ------------------------------------------------------
	interface ListProps {
		id: string;
		isView : string;
		sort : string;
		continent: string;
		nationKo : string;
		nationEn: string;
		visa: string;
		timeDiff: string;
		language: string;
		currency : string;
		voltage: string;
		plugType: string;
		caution : string;
		taxFreeLimit : string;
		inputImage : string;
		cities : {
			id: string;
			isView : string;
			sort : string;
			continent: string;
			nation : string;
			cityKo: string;
		}[]
	}
	const [list, setList] = useState<ListProps[]>([]);
  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/nationcity/getnationcity`, {
			selectContinent : selectContinent
		})
    if (res.data !== false) {
			const copy = [...res.data];
      setList(copy);
    } else {
			setList([])
		}
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh, selectContinent]);  


	// 모달 ---------------------------------------------------------
	const [isViewAddNationModal, setIsViewAddNationModal] = useState<boolean>(false);
	const [isViewAddCityModal, setIsViewAddCityModal] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');
	
	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteCity = async (itemId:any) => {
		const getParams = {
			postId : itemId,
		}
		axios 
			.post(`${MainURL}/nationcity/deletecity`, getParams)
			.then((res) => {
				if (res.data) {
					alert('삭제되었습니다.');
					setRefresh(!refresh);
				}
			})
			.catch(() => {
				console.log('실패함')
			})
	};
	const handleDeleteAlert = (item:any) => {
		const costConfirmed = window.confirm(`${item.nation}(${item.sort}/${item.continent})의 도시 ${item.cityKo}를 정말 삭제하시겠습니까?`);
      if (costConfirmed) {
        deleteCity(item.id);
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
			</div>

			<div className="topRow">
				<div className="tabSelectBtnBox">
					<SelectMenu title='전체' tabNum={1} />
					<SelectMenu title='휴양지' tabNum={2} />
					<SelectMenu title='관광지' tabNum={3} />
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewAddNationModal(true);
					}}
				>
					<FaPlus size={16}/>
					<p>국가 등록</p>
				</div>
			</div>

			{/* 국가등록 모달창 */}
      {
        isViewAddNationModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddNation 
								refresh={refresh}
								isAddOrRevise={isAddOrRevise}
								setRefresh={setRefresh}
								nationData={nationData}
								setIsViewAddNationModal={setIsViewAddNationModal}
						 />
          </div>
        </div>
      }

			<div className="continentBtnbox">
				{
					continents.map((item:any, index:any)=>{
						return (
							<div className="continentNtn" key={index}
								style={{backgroundColor: selectContinent === item ? '#242d3f' : '#fff'}}
								onClick={()=>{
									setSelectContinent(item);
								}}
							>
								<p style={{color: selectContinent === item ? '#fff' : '#333'}}>{item}</p>
							</div>
						)
					})
				}
			</div>

			<div className="nationbox">
				{ list.length > 0
					?
					list.map((item:any, index:any)=>{

						return (
							<div className="nation" key={index}>
								<div className="nation__titlebox">
									<div className="nation__title_leftbox">
										<div className="nation__title">
											{item.nationKo}
										</div>
										<div className="nation__title_addBtn"
											onClick={()=>{
												setIsAddOrRevise('add');
												setNationData(item);
												setIsViewAddCityModal(true);
											}}
										>
											<FaPlus size={16} color='#9B9B9B'/>
										</div>
									</div>
									<div className="nation__title_rightbox"
											onClick={()=>{
												setIsAddOrRevise('revise');
												setNationData(item);
												setIsViewAddNationModal(true);
											}}
										>
											<IoSettingsOutline size={16} color='#9B9B9B'/>
										</div>
								</div>
								<div className="nation__cities">
								{
									item.cities.map((subItem:any, subIndex:any)=>{

										return (
											<div key={subIndex} className='cities__row'>
												<div style={{display:'flex', alignItems:'center'}}>
												{
													subItem.isView === 'true' 
													? <FaCircle color='#5fb7ef'/>
													: <IoCloseOutline />
												}
												<p style={{marginLeft:'10px'}}>{subItem.cityKo}</p>
												</div>
												<div className='reviseBtn'
												  style={{display:'flex', alignItems:'center'}}>
													<p onClick={()=>{
														setIsAddOrRevise('revise');
														setNationData(item);
														setCityData(subItem);
														setIsViewAddCityModal(true);
													}}
													>수정</p>
													<div className='divider'></div>
													<p onClick={()=>{
														handleDeleteAlert(subItem);
													}}
													>삭제</p>
												</div>
											</div>
										)}
									)
								}
								</div>
							</div>
						)
					})
					:
					<div></div>
				}				
			</div>

			{/* 도시등록 모달창 */}
      {
        isViewAddCityModal &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddCity
						 		isAddOrRevise={isAddOrRevise}
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewAddCityModal={setIsViewAddCityModal}
								nationData={nationData}
								cityData={cityData}
						 />
          </div>
        </div>
      }

			<div style={{height:'200px'}}></div>
		</div>
	);
}

