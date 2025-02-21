import React, { useEffect, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { formatDate, set } from 'date-fns';



export default function ModalAddScheduleAddAirline (props : any) {
	
  const [isAddOrRevise, setIsAddOrRevise] = useState(props.isAddOrRevise);
  const scheduleData = props.scheduleInfo;
  const scheduleDetails = props.scheduleDetails;
  const includeNoteCopy = JSON.parse(scheduleData.includeNote);
  const notIncludeNoteCopy = JSON.parse(scheduleData.notIncludeNote);

  const [departAirport, setDepartAirport] = useState(isAddOrRevise === 'revise' ? scheduleData.departAirport : '');
  const [departFlight, setDepartFlight] = useState(isAddOrRevise === 'revise' ? scheduleData.departFlight : '');
  
  // 여행 기간, 적용 항공편 가져오기 
  const [departAirportOptions, setDepartAirportOptions] = useState([{ value: '선택', label: '선택' }]);
  const [airlineNameOptions, setAirlineNameOptions] = useState([{ value: '선택', label: '선택' }]);

  const fetchAirlineData = async (tourLocationSelected: string) => {
    const res = await axios.get(`${MainURL}/restproductschedule/getairplanedata/${scheduleData.nation}/${tourLocationSelected}`);
    if (res.data) {
      const copy = res.data;
      const directAirlineCopy = copy.filter((e:any) => e.sort === 'direct');
      const viaAirlineCopy = copy.filter((e:any) => e.sort === 'via');
      const directAirlineFiltered = directAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, departAirline: string, airlineData: string }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, 
          departAirline : item.departAirline, airlineData: JSON.parse(item.airlineData), sort: '직항' })
      );
      const viaAirlineFiltered = viaAirlineCopy.map((item: { tourPeriodNight: string, tourPeriodDay: string, departAirportMain: string, departAirline: string, airlineData: string }) =>
        ({ tourPeriodNight: item.tourPeriodNight, tourPeriodDay: item.tourPeriodDay, departAirportMain: item.departAirportMain, 
          departAirline : item.departAirline, airlineData: JSON.parse(item.airlineData), sort: '경유' })
      );
      const combinedAirlines = [...directAirlineFiltered, ...viaAirlineFiltered];
      const uniqueDepartAirport = Array.from(
        new Map(combinedAirlines.map(item => [`${item.departAirportMain}`, item])).values()
      );
      const resultDepartAirport = uniqueDepartAirport.map((item:any)=>
        ({ value:`${item.departAirportMain}`,  label:`${item.departAirportMain}` })
      );
      resultDepartAirport.unshift({ value: '선택', label: '선택' });
      setDepartAirportOptions(resultDepartAirport);
      const uniqueAirlineName = Array.from(
        new Map(combinedAirlines.map(item => [`${item.airlineData[0].airlineName}`, item])).values()
      );
      const resultAirlineName = uniqueAirlineName.map((item:any)=>
        ({ value:`${item.airlineData[0].airlineName}`,  label:`${item.airlineData[0].airlineName}` })
      );
      resultAirlineName.unshift({ value: '선택', label: '선택' });
      setAirlineNameOptions(resultAirlineName);
    }
  };


  // 일정 정보 등록 함수 ----------------------------------------------
  const registerPost = async () => {

    if ( departAirport === '' || departFlight === '') {
      alert('빈칸을 먼저 채워주셔야 합니다.');
    } else {
      const getParams = {
        isView : scheduleData.isView,
        sort : 'addairline',
        nation : scheduleData.nation,
        tourLocation: scheduleData.tourLocation,
        landCompany: scheduleData.landCompany,
        productType : scheduleData.productType,
        tourPeriod : scheduleData.tourPeriod,
        departAirport: departAirport,
        departFlight: departFlight,
        cautionNote: scheduleData.cautionNote,
        includeNote: JSON.stringify(includeNoteCopy),
        includeNoteText: scheduleData.includeNoteText,
        notIncludeNote: JSON.stringify(notIncludeNoteCopy),
        notIncludeNoteText: scheduleData.notIncludeNoteText
      }
      axios 
        .post(`${MainURL}/restproductschedule/registerschedule`, getParams)
        .then((res) => {
          if (res.data.success) {
            registerDetailPost(res.data.id, scheduleDetails);
          }
        })
        .catch(() => {
          console.log('실패함')
        })
    }
  };

  // 일정 데이별 디테일 등록&저장 함수 ----------------------------------------------
  const registerDetailPost = async (postId:any, scheduleData: any[]) => {
    for (const item of scheduleData) {
      const getParams = {
        scheduleID: postId,
        day: item.day,
        breakfast: item.breakfast,
        lunch: item.lunch,
        dinner: item.dinner,
        hotel: item.hotel,
        score: item.score,
        scheduleDetail: JSON.stringify(item.scheduleDetail),
      };
      try {
        const response = await axios.post(`${MainURL}/restproductschedule/registerscheduledetail`, getParams);
        if (response.data) {
          console.log(`ID ${item.id} 전송 완료`);
        }
      } catch (error) {
        console.error(`ID ${item.id} 전송 실패`, error);
      }
    }
    alert('모든 데이터가 저장되었습니다.');
    props.setRefresh(!props.refresh);
  };
  

  useEffect(() => {
    fetchAirlineData(scheduleData.tourLocation);
	}, []); 
 

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddAirlineModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>일정관리</h1>
      </div>

      <section>
        <div className="bottombar"></div>

        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='국가/도시'/>
            <p>{scheduleData.nation}</p>
            <p>{scheduleData.tourLocation}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행기간'/>
            <p>{scheduleData.tourPeriod}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='적용항공편'/>
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={departAirport}
              options={departAirportOptions}
              handleChange={(e)=>{setDepartAirport(e.target.value)}}
            />
            <DropdownBox
              widthmain='20%'
              height='35px'
              selectedValue={departFlight}
              options={airlineNameOptions}    
              handleChange={(e)=>{
                setDepartFlight(e.target.value)
              }}
            />
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드사'/>
            <p>{scheduleData.landCompany}</p>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품타입'/>
            <p>{scheduleData.productType}</p>
          </div>
        </div>
      </section>

      <div className='btn-box' style={{marginBottom:'50px'}}>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddAirlineModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={()=>{
              registerPost();
            }}
          >
          <p>항공 변경 저장</p>
        </div>
      </div>

     
    </div>     
  )
}
