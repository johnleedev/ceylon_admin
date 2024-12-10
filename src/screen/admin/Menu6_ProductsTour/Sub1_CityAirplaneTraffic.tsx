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
    const res = await axios.get(`${MainURL}/tournationcity/getnationcity`)
    if (res.data !== false) {
			const copy = [...res.data];
			copy.sort((a, b) => a.nationKo.localeCompare(b.nationKo, 'ko-KR'));
      setList(copy);
			setNationData(copy[0]);
			setSelectedNation(copy[0]);
    } else {
			setList([])
		}
  };

	useEffect(() => {
		fetchPosts();
	}, [refresh]);  


	// 모달 ---------------------------------------------------------
	const [isViewAddNationModal, setIsViewAddNationModal] = useState<boolean>(false);
	const [isViewAddCityModal, setIsViewAddCityModal] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');
	const [directAirlineData, setDirectAirlineData] = useState([]);
	const [viaAirlineData, setViaAirlineData] = useState([]);
	const [trafficData, setTrafficData] = useState<any>();

	// 항공편&교통편 가져오기
	const fetchPostAirline = async (item: any) => {
		try {
			const resAirline = await axios.post(`${MainURL}/tournationcity/getairlinedata`, {
				nation: item.nation,
				city: item.cityKo,
			});
			const resTraffic = await axios.post(`${MainURL}/tournationcity/gettrafficdata`, {
				nation: item.nation,
				city: item.cityKo,
				cityId : item.id
			});
	  	if (resAirline.data !== false) {
				const copy = resAirline.data;
				const sortedData = copy.reduce((acc: Record<string, any[]>, item: any) => {
					try {
						const parsedItem = {
							id : item.id,
							tourPeriodNight: item.tourPeriodNight,
							tourPeriodDay: item.tourPeriodDay,
							departAirportMain: item.departAirportMain,
							departAirline: item.departAirline,
							airlineData: JSON.parse(item.airlineData)
						};
						const key = item.sort;
						if (!acc[key]) {
							acc[key] = [];
						}
						acc[key].push(parsedItem);
					} catch (err) {
						console.error("Failed to parse airlineData:", item.airlineData);
					}
					return acc;
				}, {});
	  		setDirectAirlineData(sortedData.direct || []);
				setViaAirlineData(sortedData.via || []);
			} else {
				setDirectAirlineData([]);
				setViaAirlineData([]);
			}
			if (resTraffic.data !== false) { 
				const copy = resTraffic.data[0];
				const parsedItem = [
					{sort : '공항/항공', trafficList : JSON.parse(copy.airport)},
					{sort : '역/기차', trafficList : JSON.parse(copy.station)},
					{sort : '터미널/시외버스', trafficList : JSON.parse(copy.terminal)},
					{sort : '항구/선박', trafficList : JSON.parse(copy.harbor)}
				]
				setTrafficData(parsedItem);
			} else {
				setTrafficData([]);
			}
		} catch (err) {
			setDirectAirlineData([]);
			setViaAirlineData([]);
			setTrafficData([]);
		} finally {
			setIsViewAddCityModal(true);
		}
	};
	

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteCity = async (itemId:any, images:any) => {
		const getParams = {
			postId : itemId,
			images : JSON.parse(images)
		}
		axios 
			.post(`${MainURL}/restnationcity/deletecity`, getParams)
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
					<h1>도시&항공&교통 관리</h1>	
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

			<div style={{height:'20px'}}></div>


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
												fetchPostAirline(item);
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
								directAirlineData={directAirlineData}
								viaAirlineData={viaAirlineData}
								trafficData={trafficData}
						 />
          </div>
        </div>
      }

			<div style={{height:'200px'}}></div>
		</div>
	);
}

