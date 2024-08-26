import React, { useCallback, useState } from 'react'
import './ModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxNum } from '../../../../boxs/DateBoxNum';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import axios from 'axios';
import MainURL from '../../../../MainURL';
import { formatDate } from 'date-fns';


export default function ModalAddLandCompany (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const [selectedNation, setSelectedNation] = useState<any>([]);
  
  const isAddOrRevise = props.isAddOrRevise;
  const landCompanyData = isAddOrRevise === 'revise' ? props.selectedData : null;
	
  const [companyName, setCompanyName] = useState(isAddOrRevise === 'revise' ? landCompanyData.companyName : '');
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? landCompanyData.nation : '국가선택');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? landCompanyData.city : '도시선택');
  const [cityDetail, setCityDetail] = useState(isAddOrRevise === 'revise' ? landCompanyData.cityDetail : '');
  const [businessDate, setBusinessDate] = useState(isAddOrRevise === 'revise' ? landCompanyData.businessDate : '');
  const [owner, setOwner] = useState(isAddOrRevise === 'revise' ? landCompanyData.owner : '');
  const [ownerPhone, setOwnerPhone] = useState(isAddOrRevise === 'revise' ? landCompanyData.ownerPhone : '');
  const [opcharger, setOpcharger] = useState(isAddOrRevise === 'revise' ? landCompanyData.opcharger : '');
  const [opchargerPhone, setOpchargerPhone] = useState(isAddOrRevise === 'revise' ? landCompanyData.opchargerPhone : '');
  const [localTourCompany, setLocalTourCompany] = useState(isAddOrRevise === 'revise' ? landCompanyData.localTourCompany : '');
  const [localPhone, setLocalPhone] = useState(isAddOrRevise === 'revise' ? landCompanyData.localPhone : '');
  const [localOwner, setLocalOwner] = useState(isAddOrRevise === 'revise' ? landCompanyData.localOwner : '');
  const [localOwnerPhone, setLocalOwnerPhone] = useState(isAddOrRevise === 'revise' ? landCompanyData.localOwnerPhone : '');
  const [notice, setNotice] = useState(isAddOrRevise === 'revise' ? landCompanyData.notice : '');

  // 저장 함수
  const handleRegister = async () => {
    await axios
    .post(`${MainURL}/landcompany/registerlandcompany`, {
      companyName: companyName,
      nation : nation,
      city : city,
      cityDetail : cityDetail,
      businessDate : businessDate,
      owner : owner,
      ownerPhone : ownerPhone,
      opcharger : opcharger,
      opchargerPhone : opchargerPhone,
      localTourCompany : localTourCompany,
      localPhone : localPhone,
      localOwner : localOwner,
      localOwnerPhone : localOwnerPhone,
      notice : notice
    })
    .then((res)=>{
      if (res.data) {
        alert('등록되었습니다.');
        props.setRefresh(!props.refresh);
        props.setIsViewAddLandCompany(false);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  // 수정 함수
  const handleRevise = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    await axios
    .post(`${MainURL}/landcompany/reviselandcompany`, {
      postId: landCompanyData.id,
      companyName: companyName,
      nation : nation,
      city : city,
      cityDetail : cityDetail,
      businessDate : businessDate,
      owner : owner,
      ownerPhone : ownerPhone,
      opcharger : opcharger,
      opchargerPhone : opchargerPhone,
      localTourCompany : localTourCompany,
      localPhone : localPhone,
      localOwner : localOwner,
      localOwnerPhone : localOwnerPhone,
      notice : notice,
      reviseDate : revisetoday
    })
    .then((res)=>{
      if (res.data) {
        alert('수정되었습니다.');
        props.setRefresh(!props.refresh);
        props.setIsViewAddLandCompany(false);
      }
    })
    .catch((err)=>{
      alert('다시 시도해주세요.')
    })
  };

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddLandCompany(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>랜드사 등록</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드사명'/>
            <input className="inputdefault" type="text" style={{width:'80%', marginLeft:'5px'}} 
              value={companyName} onChange={(e)=>{setCompanyName(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행지'/>
            {
              isAddOrRevise === 'add' 
              ?
              <DropdownBox
                widthmain='15%'
                height='35px'
                selectedValue={nation}
                options={[
                  { value: '국가선택', label: '국가선택' },
                  ...props.nationlist.map((nation:any) => (
                    { value: nation.nationKo, label: nation.nationKo }
                  ))
                ]}    
                handleChange={(e)=>{
                  setNation(e.target.value)
                  const copy = [...props.nationlist];
                  const filtered = copy.filter((list:any)=> list.nationKo === e.target.value)
                  setSelectedNation(filtered[0].cities);
                }}
              />
              :
              <p>{nation}</p>
            }
            {
              isAddOrRevise === 'add' 
              ?
              <DropdownBox
                widthmain='15%'
                height='35px'
                selectedValue={city}
                options={[
                  { value: '도시선택', label: '도시선택' },
                  ...selectedNation.map((nation:any) => (
                    { value: nation.cityKo, label: nation.cityKo }
                  ))
                ]}    
                handleChange={(e)=>{setCity(e.target.value)}}
              />
              :
              <p style={{marginRight:'10px'}}>{city}</p>
            }            
            <input className="inputdefault" type="text" style={{width:'40%', marginLeft:'5px'}} 
              value={cityDetail} onChange={(e)=>{setCityDetail(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='거래일'/>
            <DateBoxNum width='150px' subWidth='130px' right={25} setSelectDate={setBusinessDate} date={businessDate}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='소장'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={owner} onChange={(e)=>{setOwner(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={ownerPhone} onChange={(e)=>{setOwnerPhone(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='OP/담당자'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={opcharger} onChange={(e)=>{setOpcharger(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={opchargerPhone} onChange={(e)=>{setOpchargerPhone(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='현지여행사'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={localTourCompany} onChange={(e)=>{setLocalTourCompany(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='현지연락처'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={localPhone} onChange={(e)=>{setLocalPhone(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='현지소장'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={localOwner} onChange={(e)=>{setLocalOwner(e.target.value)}}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='연락처'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={localOwnerPhone} onChange={(e)=>{setLocalOwnerPhone(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole bigHeight">
            <TitleBox width="120px" text='참고사항' height={200}/>
            <textarea 
              className="textarea"
              value={notice}
              onChange={(e)=>{setNotice(e.target.value)}}
            />  
          </div>
        </div>
      </section>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewAddLandCompany(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
            onClick={()=>{
              isAddOrRevise === 'add' 
              ? handleRegister()
              : handleRevise();
            }}
          >
          <p>저장</p>
        </div>
      </div>
      
    </div>     
  )
}
