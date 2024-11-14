import React, { useEffect, useRef, useState } from 'react';
import { TitleBox } from '../../../boxs/TitleBox';
import { TextBox } from '../../../boxs/TextBox';
import '../Products.scss'
import { PiPencilSimpleLineFill } from 'react-icons/pi';
import ModalAddLandCompany from './Modal/ModalAddLandCompany';
import axios from 'axios';
import MainURL from '../../../MainURL';
import ModalLandCompanyInfo from './Modal/ModalLandComapanyInfo';
import { DropdownBox } from '../../../boxs/DropdownBox';


export default function Sub6_LandCompany (props:any) {

	const [refresh, setRefresh] = useState<boolean>(false);
	
	interface LandCompanyProps {
		id: string;
		companyName: string;
		owner : string;
		notice: string;
		reviseDate: string;
	}
  interface ListProps {
		id: string;
		nationKo : string;
		cities : {
			cityKo: string;
		}[]
	}
	const [landCompanyList, setLandCompanyList] = useState<LandCompanyProps[]>([]);
	const [listAllLength, setListAllLength] = useState<number>(0);
  const [nationlist, setNationList] = useState<ListProps[]>([]);
  const fetchPosts = async () => {
	  const landCompanyRes = await axios.get(`${MainURL}/landcompany/getlandcompany`)
		if (landCompanyRes.data !== false) {
			const copy = [...landCompanyRes.data];
      setLandCompanyList(copy);
    } 
    const nationCityRes = await axios.post(`${MainURL}/nationcity/getnationcity`, {
      selectContinent : '전체'
		})
    if (nationCityRes.data !== false) {
			const copy = [...nationCityRes.data];
      setNationList(copy);
    }
  };

  useEffect(() => {
		fetchPosts();
	}, [refresh]);  

	// 검색 기능 ------------------------------------------------------------------------------------------------------------------------------------------  
	const [searchSort, setSearchSort] = useState('전체');
	const [searchWord, setSearchWord] = useState('');
	const handleWordSearching = async () => {
		setLandCompanyList([]);
		try {
			const res = await axios.post(`${MainURL}/landcompany/getlandcompany`, {
				sort : searchSort,
				word : searchWord
			});
			if (res.data.resultData) {
				const copy = [...res.data.resultData];
				setLandCompanyList(copy);
				setListAllLength(res.data.totalCount);
			} else {
				setLandCompanyList([]);
				setListAllLength(0);
			}
		} catch (error) {
			console.error("Failed to fetch search results:", error);
		}	
	};
	
	// 모달 ---------------------------------------------------------
	const [isViewAddLandCompany, setIsViewAddLandCompany] = useState<boolean>(false);
	const [isViewLandCompanyInfo, setIsViewLandCompanyInfo] = useState<boolean>(false);
	const [isAddOrRevise, setIsAddOrRevise] = useState('');
	const [selectedData, setSelectedData] = useState();

	// 삭제 함수 ------------------------------------------------------------------------------------------------------------------------------------------
	const deleteHotel = async (itemId:any) => {
		const getParams = {
			postId : itemId,
		}
		axios 
			.post(`${MainURL}/landcompany/deletelandcompany`, getParams)
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
		const costConfirmed = window.confirm(`${item.companyName}(${item.owner})를 정말 삭제하시겠습니까?`);
			if (costConfirmed) {
				deleteHotel(item.id);
		} else {
			return
		}
	};

	return (
		<div className='Menu5'>

			<div className="main-title">
				<div className='title-box'>
					<h1>랜드사관리</h1>	
				</div>
				<div className="addBtn"
					onClick={()=>{
						setIsAddOrRevise('add');
						setIsViewAddLandCompany(true);
					}}
				>
					<PiPencilSimpleLineFill/>
					<p>랜드사등록</p>
				</div>
			</div>
			

			{/* 랜드사등록 모달창 */}
      {
        isViewAddLandCompany &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalAddLandCompany
								refresh={refresh}
								setRefresh={setRefresh}
								isAddOrRevise={isAddOrRevise}
								selectedData={selectedData}
								setIsViewAddLandCompany={setIsViewAddLandCompany}
                nationlist={nationlist}
						 />
          </div>
        </div>
      }

			<div className="searchbox">
				<div className="cover">
					<div className="content">
						<DropdownBox
							widthmain='150px'
							height='35px'
							selectedValue={searchSort}
							options={[
								{ value: '전체', label: '전체' },
								{ value: '텍스트', label: '텍스트' },
								{ value: '선택', label: '선택' },
								{ value: '상세', label: '상세' }
							]}
							handleChange={(e)=>{setSearchSort(e.target.value)}}
						/>
						<input className="inputdefault" type="text" style={{width:'30%', textAlign:'left'}} 
								value={searchWord} onChange={(e)=>{setSearchWord(e.target.value)}} 
								onKeyDown={(e)=>{if (e.key === 'Enter') {handleWordSearching();}}}
								/>
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

			<div className="seachlist">
				<div className="main-list-cover-hotel">
					<div className="titlebox">
						<TitleBox width='3%' text='NO'/>
						<TitleBox width='10%' text='랜드사명'/>
						<TitleBox width='10%' text='소장'/>
						<TitleBox width='10%' text='등록호텔수(GSA)'/>
						<TitleBox width='10%' text='등록상품수'/>
						<TitleBox width='10%' text='여행사프로모션'/>
						<TitleBox width='10%' text='참고사항'/>
						<TitleBox width='10%' text='관리'/>
						<TitleBox width='10%' text='수정일'/>
						<TitleBox width='10%' text=''/>
  				</div>
					
					{
						landCompanyList.map((item:any, index:any)=>{
							return (
								<div key={index}
									className="rowbox"
								>
									<TextBox width='3%' text={item.id} />
									<TextBox width='10%' text={item.companyName} />
									<TextBox width='10%' text={item.owner} />
									<TextBox width='10%' text={""} />
									<TextBox width='10%' text={""} />
									<TextBox width='10%' text={""} />
									<TextBox width='10%' text={item.notice} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn"
											onClick={()=>{
												setSelectedData(item);
    										setIsViewLandCompanyInfo(true);
											}}
										>
											<p>보기</p>
										</div>
									</div>
									<TextBox width='10%' text={item.reviseDate} />
									<div className="text" style={{width:`10%`, height: '50px', textAlign:'center'}}>
										<div className="hotelControlBtn2"
											onClick={()=>{
												setIsAddOrRevise('revise');
												setSelectedData(item);
												setIsViewAddLandCompany(true);
											}}
										>
											<p>수정</p>
										</div>
										<div className="divider"></div>
										<div className="hotelControlBtn2"
											onClick={()=>{
												handleDeleteAlert(item);
											}}
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

			{/* 랜드사 확인 모달창 */}
      {
        isViewLandCompanyInfo &&
        <div className='Modal'>
          <div className='modal-backcover'></div>
          <div className='modal-maincover'>
             <ModalLandCompanyInfo
								refresh={refresh}
								setRefresh={setRefresh}
								setIsViewLandCompanyInfo={setIsViewLandCompanyInfo}
								selectedData={selectedData}
						 />
          </div>
        </div>
      }

			<div style={{height:'200px'}}></div>
		</div>
	);
}

