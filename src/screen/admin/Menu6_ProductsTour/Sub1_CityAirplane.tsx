import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../Products.scss'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import ModalAddNation from './Modal/ModalAddNation';
import ModalAddCity from './Modal/ModalAddCity';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { FaCircle } from "react-icons/fa";
import { IoCloseOutline, IoSettingsOutline  } from "react-icons/io5";
import { PiPencilSimpleLineFill } from 'react-icons/pi';

export default function Sub1_CityAirplane (props:any) {

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
		cities : CityesProps[];
	}

	interface CityesProps {
		id: string;
		isView : string;
		sort : string;
		continent: string;
		nation : string;
		cityKo: string;
	}

	const [list, setList] = useState<ListProps[]>([]);
	const [selectedNation, setSelectedNation] = useState<ListProps>();
  const fetchPosts = async () => {
    const res = await axios.post(`${MainURL}/tournationcity/getnationcity`, {
			selectContinent : selectContinent
		})
    if (res.data !== false) {
			const copy = [...res.data];
			let result = [];
			result = copy.filter((e:any)=>e.sort === '관광지')
			result.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setList(result);
			setSelectedNation(result[0]);
    } else {
			setList([])
		}
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh, selectContinent, currentTab]);  


	// 모달 ---------------------------------------------------------
	const [isViewAddNationModal, setIsViewAddNationModal] = useState<boolean>(false);
	const [isViewAddCityModal, setIsViewAddCityModal] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');
	

	// 요금표 가져오기
	const fetchPostCost = async (id:string) => {
		
		const resCost = await axios.post(`${MainURL}/tournationcity/getairlinedata`, {

		})
		if (resCost.data !== false) {
			const copy = resCost.data;
  		const groupedData: { [key: string]: any } = {};
			copy.forEach((item: any) => {
				const reservePeriod = JSON.parse(item.reservePeriod);
				const inputDefault = JSON.parse(item.inputDefault);
		  	const key = `${item.hotelCostID}_${item.reserveIndex}`;
		  	if (!groupedData[key]) {
						groupedData[key] = {
								hotelCostID: item.hotelCostID,
								reserveIndex: item.reserveIndex,
								reserveType: item.reserveType,
								reservePeriod: reservePeriod,
								inputDefault: []
						};
				}
				inputDefault.costIndex = item.costIndex;
				groupedData[key].inputDefault.push(inputDefault);
			});
			Object.keys(groupedData).forEach((key) => {
				groupedData[key].inputDefault.sort((a: any, b: any) => a.costIndex - b.costIndex);
			});
			const result = Object.values(groupedData);
			// setHotelCostInputDefault(result);
		} else {
			// setHotelCostInputDefault([]);
		}
		setIsViewAddCityModal(true);
	};

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteCity = async (itemId:any, images:any) => {
		const getParams = {
			postId : itemId,
			images : JSON.parse(images)
		}
		axios 
			.post(`${MainURL}/nationcity/deletecity`, getParams)
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
		const costConfirmed = window.confirm(`${item.nation}(${item.sort}/${item.continent})의 도시 ${item.cityKo}를 정말 삭제하시겠습니까?`);
      if (costConfirmed) {
        deleteCity(item.id, item.inputImage);
    } else {
      return
    }
  };

	return (
		<div className='Menu5'>

			<div className="main-title">
				<div className='title-box'>
					<h1>도시&항공편관리</h1>	
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewAddNationModal(true);
					}}
				>
					<PiPencilSimpleLineFill />
					<p>국가생성</p>
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
								nationList={list.map((e:any)=> e.nationKo)}
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
			<div className="nation_city_cover">
			 	<div className="nation_city_box">
				 <div className="nation_city_title_box">
						<div className="nation_city_title">국가</div>
						<div className="nation_city_title_addBtn"
							onClick={()=>{
								setIsAddOrRevise('add');
								setIsViewAddNationModal(true);
							}}
						>
							<FaPlus size={14}/>
						</div>
					</div>
					<div className="nationbox">
						{ list.length > 0 &&
							list.map((item:any, index:any)=>{
								return (
									<div className={selectedNation === item ? "nation selected" : "nation"} key={index}
										onClick={()=>{
											setNationData(item);
											setSelectedNation(item);
										}}
									>
										<div className="nation__title_leftbox">
											<div className="nation__title"
												style={{color: selectedNation === item ? '#fff' : '#333'}}
											>
												{item.nationKo}
											</div>
										</div>
										<div className="nation__title_rightbox">
											<div className="nation__title_addBtn"
												style={{borderColor: selectedNation === item ? '#333' : '#c2c2c2'}}
												onClick={()=>{
													window.scrollTo(0, 0);
													setIsAddOrRevise('add');
													setNationData(item);
													setIsViewAddCityModal(true);
												}}
											>
												<FaPlus size={14} color={selectedNation === item ? '#333' : '#9B9B9B'}/>
											</div>
											<div className="nation__title_setBtn"
												onClick={()=>{
													window.scrollTo(0, 0);
													setIsAddOrRevise('revise');
													setNationData(item);
													setIsViewAddNationModal(true);
												}}
											>
												<IoSettingsOutline size={16} 
													color={selectedNation === item ? '#333' : '#9B9B9B'}/>
											</div>
										</div>
									</div>
								)
							})
						}				
					</div>
				</div>
				<div className="nation_city_box">
					<div className="nation_city_title_box">
						<div className="nation_city_title">도시</div>
					</div>
					<div className="nation__cities">
						{
							selectedNation?.cities.map((item:any, index:any)=>{

								return (
									<div key={index} className='cities__row'>
										<div style={{display:'flex', alignItems:'center'}}>
										{
											item.isView === 'true' 
											? <FaCircle color='#5fb7ef'/>
											: <IoCloseOutline />
										}
										<p style={{marginLeft:'10px'}}>{item.cityKo}</p>
										</div>
										<div className='reviseBtn'
											style={{display:'flex', alignItems:'center'}}>
											<p onClick={()=>{
												window.scrollTo(0, 0);
												setCityData(item);
												setIsAddOrRevise('revise');
												fetchPostCost(item);
											}}
											>수정</p>
											<div className='divider'></div>
											<p onClick={()=>{
												handleDeleteAlert(item);
											}}
											>삭제</p>
										</div>
									</div>
								)}
							)
						}
					</div>
				</div>
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

