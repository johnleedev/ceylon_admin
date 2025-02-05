
import React, { useCallback, useState } from 'react'
import '../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../boxs/TitleBox';
import axios from 'axios';
import MainURL from '../../../MainURL';
import { formatDate } from 'date-fns';
import { DateBoxDouble } from '../../../boxs/DateBoxDouble';
import { DateBoxSingle } from '../../../boxs/DateBoxSingle';


export default function ModalAddLandCompany (props : any) {
	
  const isAddOrRevise = props.isAddOrRevise;
  const landCompanyData = isAddOrRevise === 'revise' ? props.landCompanyInfo : null;

  const [isView, setIsView] = useState<boolean>(isAddOrRevise === 'revise' ? landCompanyData.isView : true);
  const [nation, setNation] = useState(isAddOrRevise === 'revise' ? landCompanyData.nation : '');
  const [city, setCity] = useState(isAddOrRevise === 'revise' ? landCompanyData.city : '');
  const [landCompanyName, setLandCompanyName] = useState(isAddOrRevise === 'revise' ? landCompanyData.landCompanyName : '');
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
  const [registeredHotels, setRegisteredHotels] = useState(isAddOrRevise === 'revise' ? landCompanyData.registeredHotels : '');
  const [registeredProducts, setRegisteredProducts] = useState(isAddOrRevise === 'revise' ? JSON.parse(landCompanyData.registeredProducts) : ['']);
  const [discount, setDiscount] = useState(isAddOrRevise === 'revise' ? landCompanyData.discount : '');
  const [isCostApply, setIsCostApply] = useState<boolean>(isAddOrRevise === 'revise' ? landCompanyData.isCostApply : true);
  const [issue, setIssue] = useState(isAddOrRevise === 'revise' ? JSON.parse(landCompanyData.issue) : {issueTitle:"", solved:"", charger:"", date:""});
  const [benefits, setBenefits] = useState(isAddOrRevise === 'revise' ? JSON.parse(landCompanyData.benefits) : {content:"", periodStart:"", periodEnd:"", charger:"", date:""});


  interface SelectBoxConvenienceProps {
    text : any;
  }
  const SelectBoxConvenience : React.FC<SelectBoxConvenienceProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={registeredProducts.includes(text)}
          onChange={()=>{
            const copy = [...registeredProducts];
            if (registeredProducts.includes(text)) {
              const result = copy.filter(e => e !== text);
              setRegisteredProducts(result);
            } else {
              copy.push(text); 
              setRegisteredProducts(copy);
            }
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

   // 저장 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const registerLandCompany = async () => {
    const getParams = {
      isView : isView,
      nation : nation,
      city : city,
      landCompanyName : landCompanyName,
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
      registeredHotels : registeredHotels,
      registeredProducts : JSON.stringify(registeredProducts),
      discount : discount,
      isCostApply : isCostApply,
      issue : JSON.stringify(issue),
      benefits : JSON.stringify(benefits)
    }
    axios 
      .post(`${MainURL}/tourlandcompany/registerlandcompany`, getParams)
      .then((res) => {
        if (res.data) {
          alert('등록되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewLandCompanyModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 수정 함수 ------------------------------------------------------------------------------------------------------------------------------------------
  const reviseLandCompany = async () => {
    const currentdate = new Date();
		const revisetoday = formatDate(currentdate, 'yyyy-MM-dd');
    const getParams = {
      postId : landCompanyData.id,
      isView : isView,
      nation : nation,
      city : city,
      landCompanyName : landCompanyName,
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
      registeredHotels : registeredHotels,
      registeredProducts : JSON.stringify(registeredProducts),
      discount : discount,
      isCostApply : isCostApply,
      issue : JSON.stringify(issue),
      benefits : JSON.stringify(benefits),
      reviseDate : revisetoday
    }
    axios 
      .post(`${MainURL}/tourlandcompany/reviselandcompany`, getParams)
      .then((res) => {
        if (res.data) {
          alert('수정되었습니다.');
          props.setRefresh(!props.refresh);
          props.setIsViewLandCompanyModal(false);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  
  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewLandCompanyModal(false);
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
            <TitleBox width="120px" text='상품노출'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isView}
                  onChange={()=>{setIsView(true)}}
                />
              </div>
              <p>노출</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={!isView}
                  onChange={()=>{setIsView(false)}}
                />
              </div>
              <p>미노출</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='국가'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={nation} onChange={(e)=>{
                  setNation(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='도시'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={city} onChange={(e)=>{
                  setCity(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='랜드사명'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={landCompanyName} onChange={(e)=>{
                  setLandCompanyName(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='거래일'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={businessDate} onChange={(e)=>{
                  setBusinessDate(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='소장'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={owner} onChange={(e)=>{
                  setOwner(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='소장연락처'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={ownerPhone} onChange={(e)=>{
                  setOwnerPhone(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='OP/담당자'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={opcharger} onChange={(e)=>{
                  setOpcharger(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='OP/담당자연락처'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={opcharger} onChange={(e)=>{
                 setOpchargerPhone(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='현지여행사'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={localTourCompany} onChange={(e)=>{
                  setLocalTourCompany(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='현지여행사연락처'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={localPhone} onChange={(e)=>{
                  setLocalPhone(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow half">
            <TitleBox width="120px" text='현지소장'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={localOwner} onChange={(e)=>{
                  setLocalOwner(e.target.value);
                }}/>
          </div>
          <div className="coverrow half">
            <TitleBox width="120px" text='현지소장연락처'/>
            <input className="inputdefault" type="text" style={{width:'50%', marginLeft:'5px'}} 
              value={localOwnerPhone} onChange={(e)=>{
                  setLocalOwnerPhone(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='참고사항'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={notice} onChange={(e)=>{
                  setNotice(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='등록호텔'/>
            <input className="inputdefault" type="text" style={{width:'90%', marginLeft:'5px'}} 
              value={registeredHotels} onChange={(e)=>{
                  setRegisteredHotels(e.target.value);
                }}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='부대시설'/>
            <div className='checkInputCover'>
              <SelectBoxConvenience text='와이파이'/>
              <SelectBoxConvenience text='레스토랑'/>
              <SelectBoxConvenience text='실내수영장'/>
              <SelectBoxConvenience text='실외수영장'/>
              <SelectBoxConvenience text='스파마사지'/>
              <SelectBoxConvenience text='피트니스센터'/>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='기본네고'/>
            <input className="inputdefault" type="text" style={{width:'70%', marginLeft:'5px'}} 
              value={discount} onChange={(e)=>{
                  setDiscount(e.target.value);
                }}/>
             <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={isCostApply}
                  onChange={()=>{
                    isCostApply 
                    ? setIsCostApply(false)
                    : setIsCostApply(true)
                  }}
                />
              </div>
              <p>요금표적용</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='요금'/>
            <div style={{width:'90%', textAlign:'center'}}>
              <div style={{backgroundColor:'#fff', display:'flex', alignItems:'center'}}>
                <div style={{width:'30%'}} ><p>이슈</p></div>
                <div className="chart-divider"></div>
                <div style={{width:'30%'}} ><p>해결</p></div>
                <div className="chart-divider"></div>
                <div style={{width:'20%'}} ><p>담당자</p></div>
                <div className="chart-divider"></div>
                <div style={{width:'20%'}} ><p>날짜</p></div>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="inputdefault" value={issue.issueTitle} 
                    style={{width:'95%', minHeight:'40px', outline:'none'}} 
                    onChange={(e)=>{
                      const copy = {...issue};
                      copy.issueTitle = e.target.value;
                      setIssue(copy);
                    }}/>
                </div>
                <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="inputdefault" value={issue.solved} 
                    style={{width:'95%', minHeight:'40px', outline:'none'}} 
                    onChange={(e)=>{
                      const copy = {...issue};
                      copy.solved = e.target.value;
                      setIssue(copy);
                    }}/>
                </div>
                <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="inputdefault" value={issue.charger} 
                    style={{width:'95%', minHeight:'40px', outline:'none'}} 
                    onChange={(e)=>{
                      const copy = {...issue};
                      copy.charger = e.target.value;
                      setIssue(copy);
                    }}/>
                </div>
                <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <DateBoxSingle date={issue.date}
                      setSelectDate={(e:any)=>{ 
                        const copy = {...issue};
                        copy.date = e;
                        setIssue(copy);
                      }} 
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행사베네핏'/>
            <div style={{width:'90%', textAlign:'center'}}>
              <div style={{backgroundColor:'#fff', display:'flex', alignItems:'center'}}>
                <div style={{width:'30%'}} ><p>내용</p></div>
                <div className="chart-divider"></div>
                <div style={{width:'30%'}} ><p>적용기간</p></div>
                <div className="chart-divider"></div>
                <div style={{width:'20%'}} ><p>담당자</p></div>
                <div className="chart-divider"></div>
                <div style={{width:'20%'}} ><p>날짜</p></div>
              </div>
              <div style={{display:'flex', alignItems:'center'}}>
                <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="inputdefault" value={benefits.content} 
                    style={{width:'95%', minHeight:'40px', outline:'none'}} 
                    onChange={(e)=>{
                      const copy = {...benefits};
                      copy.content = e.target.value;
                      setBenefits(copy);
                    }}/>
                </div>
                <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <DateBoxDouble dateStart={benefits.periodStart} dateEnd={benefits.periodEnd}
                      setSelectStartDate={(e:any)=>{ 
                        const copy = {...benefits};
                        copy.periodStart = e;
                        copy.periodEnd = e;
                        setBenefits(copy);
                      }} 
                      setSelectEndDate={(e:any)=>{ 
                        const copy = {...benefits};
                        copy.periodStart = e;
                        copy.periodEnd = e;
                        setBenefits(copy);
                      }} 
                    />
                </div>
                <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="inputdefault" value={benefits.charger} 
                    style={{width:'95%', minHeight:'40px', outline:'none'}} 
                    onChange={(e)=>{
                      const copy = {...benefits};
                      copy.charger = e.target.value;
                      setBenefits(copy);
                    }}/>
                </div>
                <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <DateBoxSingle date={benefits.date}
                      setSelectDate={(e:any)=>{ 
                        const copy = {...benefits};
                        copy.date = e;
                        setBenefits(copy);
                      }} 
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{height:'20px'}}></div>

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewLandCompanyModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            if (isAddOrRevise === 'revise') {
              reviseLandCompany();
            } else {
              registerLandCompany();
            }
          }}
        >
          <p>저장</p>
        </div>
      </div>
      
    </div>     
  )
}
