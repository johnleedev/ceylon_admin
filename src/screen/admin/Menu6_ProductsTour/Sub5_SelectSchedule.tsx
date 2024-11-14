import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../Products.scss'
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa6";
import ModalAddNation from './Modal/ModalAddNation';
import ModalAddCity from './Modal/ModalAddCity';
import { CiCircleRemove, CiCircleCheck  } from "react-icons/ci";
import { PiPencilSimpleLineFill } from 'react-icons/pi';


export default function Sub5_SelectSchedule (props:any) {

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


	const [continents, setContinents] = useState([
		"전체", "아시아/호주", "태평양", "인도양", "미주/중남미", "중동", "아프리카", "유럽"
	]);
	const [selectContinent, setSelectContinent] = useState(0);


	const list = [
		{id : '1', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '2', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '3', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '4', isView: false, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
		{id : '5', isView: true, nation: '태국', city: '푸켓', productName: "상품명", deviseDate:'2024-05-01'},
	]

	
	// 모달 ---------------------------------------------------------
	const [isViewAddNationModal, setIsViewAddNationModal] = useState<boolean>(false);
	const [isViewAddCityModal, setIsViewAddCityModal] = useState<boolean>(false);
	const divAreaRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (divAreaRef.current) {
			const copy = divAreaRef.current.offsetHeight
			setHeight(copy);
		}
	}, [isViewAddNationModal, isViewAddCityModal]);

	return (
		<div className='Menu5'>

			<div className="main-title">
				<div className='title-box'>
					<h1>선택일정관리</h1>	
				</div>
				<div className="addBtn"
					onClick={()=>{
					
					}}
				>
					<PiPencilSimpleLineFill />
					<p>여행지등록</p>
				</div>
			</div>
			

			{/* 국가등록 모달창 */}
      {
        isViewAddNationModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalAddNation 
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewAddNationModal={setIsViewAddNationModal}
						 />
          </div>
        </div>
      }

			<div className="continentBtnbox">
				{
					continents.map((item:any, index:any)=>{
						return (
							<div className="continentNtn"
								style={{backgroundColor: selectContinent === index ? '#242d3f' : '#fff'}}
								onClick={()=>{
									setSelectContinent(index);
								}}
							>
								<p style={{color: selectContinent === index ? '#fff' : '#333'}}>{item}</p>
							</div>
						)
					})
				}
			</div>


			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='3%' text='노출'/>
						<TitleBox width='5%' text='나라'/>
						<TitleBox width='5%' text='도시'/>
						<TitleBox width='15%' text='상품명'/>
						<TitleBox width='25%' text='관리'/>
						<TitleBox width='10%' text='수정일'/>
						<TitleBox width='10%' text=''/>
  				</div>
					
					{
						list.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
									onClick={()=>{
									}}
								>
									<TextBox width='3%' text={item.id} />
									<div className="text" style={{width:`3%`, height: '50px', textAlign:'center'}}>
										{ item.isView  ? <CiCircleCheck size={20} color='#1DDB16'/> : <CiCircleRemove size={20} color='#CC3D3D'/>}
									</div>
									<TextBox width='5%' text={item.nation} />
									<TextBox width='5%' text={item.city} />
									<TextBox width='15%' text={item.productName} />
									<div className="text" style={{width:`25%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn"
											onClick={()=>{
												// setIsViewControlHotelModal(true);
											}}
										>
											<p>보기</p>
										</div>
										<div className="hotelControlBtn">
											<p>노출위치</p>
										</div>
										<div className="hotelControlBtn">
											<p>요금</p>
										</div>
									</div>
									<TextBox width='10%' text={item.deviseDate} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2">
											<p>수정</p>
										</div>
										<div className="divider"></div>
										<div className="hotelControlBtn2">
											<p>삭제</p>
										</div>
									</div>
								</div>
							)
						})
					}
				</div>

			</div>

			

			{/* 국가등록 모달창 */}
      {
        isViewAddCityModal &&
        <div className='Modal'>
          <div className='modal-backcover' style={{height : height + 100}}></div>
          <div className='modal-maincover' ref={divAreaRef}>
             <ModalAddCity
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewAddCityModal={setIsViewAddCityModal}
						 />
          </div>
        </div>
      }

			<div style={{height:'200px'}}></div>
		</div>
	);
}

