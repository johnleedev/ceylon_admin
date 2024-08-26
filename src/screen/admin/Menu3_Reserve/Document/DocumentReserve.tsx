import React, { useState } from 'react';
import './Document.scss';
import logo from '../../images/logobk.png';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDownAirline } from '../../../DefaultData';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DocumentReserve() {

  let navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state.userInfo;
  const reserveInfo = location.state.reserveInfo;
  const productCost = location.state.productCost;
  const depositCostList = location.state.depositCostList;
  const hotelReserveState = JSON.parse(reserveInfo.hotelReserveState);
  const etcState = JSON.parse(reserveInfo.etcState);

  const [selectTab1, setSelectTab1] = useState('selected');
  const [selectTab2, setSelectTab2] = useState('')

  type DTitleProps = {
    width?: number;
    text: string;
  };

  const D_Title: React.FC<DTitleProps> = ({ text, width }) => (
    <div className="d-title" style={{width: width ? `${width}px` : `100px`, padding:'0 10px', boxSizing:'border-box'}}>
      <h3>{text}</h3>
    </div>
  )

  type D_pProps = {
    width: number;
    value: any;
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const D_text_p: React.FC<D_pProps> = ({width, value, func}) => (
    <p className="d-input-p" style={{width:`${width}px`}}>{value}</p>
  )
  
  type DTextProps = {
    text: string
    width?: number
  }

  const TextBox: React.FC<DTextProps> = ({width, text}) => (
    <div className='textalign' style={{width: width ? `${width}px` : 'auto'}}>
      <p>{text}</p>
    </div>
  )

  const [isLocalCompany, setIsLocalCompany] = useState(true);
  const [isLocalGuide, setIsLocalGuide] = useState(true);
  const [isLocalTrans, setIsLocalTrans] = useState<string[]>([]);
  const [isTournIsurance, setIsTournIsurance] = useState(true);
  const [isPassportGroom, setIsPassportGroom] = useState(true);
  const [isPassportBride, setIsPassportBride] = useState(true);
  
  interface SelectBoxLocalTransProps {
    text : string;
  }
  const SelectBoxLocalTrans : React.FC<SelectBoxLocalTransProps> = ({ text }) => (
    <>
      <div className='checkInput'>
        <input className="input" type="checkbox"
          checked={isLocalTrans.includes(text)}
          onChange={()=>{
            const copy = [...isLocalTrans]; 
            if (copy.includes(text)) {
              const result = copy.filter(e => e !== text);
              setIsLocalTrans(result);
            } else {
              copy.push(text); 
              setIsLocalTrans(copy);
            }
          }}
        />
      </div>
      <p>{text}</p>
    </>
  )

  const newDate = new Date();
  const currentDate = format(newDate, 'yyyy-MM-dd', { locale: ko });
  const reformDate = currentDate.split('-');
  
  
  return (
    <div className='DocumentReserve'>

      <div className="d-cover">

        <div className="d-logo">
          <img src={logo} />
        </div>
        
        <h1 className='d-title'>여행계약서 (여행자용)</h1>
     
        <div className="d-select-row">
          <div className={`d-select-btn ${selectTab1}`}
            onClick={()=>{setSelectTab1('selected'); setSelectTab2('');}}
          >
            <p style={{color: selectTab1 === 'selected' ? '#333' : '#BDBDBD'}}>허니문</p>
          </div>
          <div className={`d-select-btn ${selectTab2}`}
            onClick={()=>{setSelectTab1(''); setSelectTab2('selected')}}
          >
            <p style={{color: selectTab2 === 'selected' ? '#333' : '#BDBDBD'}}>인센티브</p>
          </div>
        </div>

        <div style={{height:'10px'}}></div>

        <p>(주)실론투어와 000는 아래와 같이 여행계약을 체결하고 여행약관(첨부파일)을 교부합니다.</p>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'10px'}}></div>
        
        <div className="d-textrow">
          <D_Title text='여행상품' />
          <D_text_p width={520} value={reserveInfo.productName} func={()=>{}}/>
        </div>
        <div className="d-textrow">
          <D_Title text='여행기간' />
          <div style={{display:'flex', flexDirection:'column', flex:1}}>
            <div style={{display:'flex', alignItems:'center'}}>
              <TextBox text='출발' />
              <D_text_p width={70} value={reserveInfo.tourStartAirport} func={()=>{}}/>
              <D_text_p width={100} value={reserveInfo.tourStartPeriod} func={()=>{}}/>
            </div>
            <div style={{height:'1px', backgroundColor:'#ececec'}}></div>
            <div style={{display:'flex', alignItems:'center'}}>
              <TextBox text='도착' />
              <D_text_p width={70} value={reserveInfo.tourEndAirport} func={()=>{}}/>
              <D_text_p width={100} value={reserveInfo.tourEndPeriod} func={()=>{}}/>
            </div>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='여행지' />
          <div style={{flex:1}}>
            <D_text_p width={190} value={reserveInfo.tourLocation} func={()=>{}}/>
          </div>
          <D_Title text='항공사' />
          <div style={{flex:1}}>
            <DropdownBox
              widthmain='190px'
              height='35px'
              selectedValue={reserveInfo.airline}
              options={DropDownAirline}
              handleChange={(e)=>{''}}
            />
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='신랑' />
          <div style={{flex:1}}>
            <D_text_p width={190} value={userInfo[0].nameKo} func={()=>{}}/>
          </div>
          <D_Title text='생년월일' />
          <div style={{flex:1}}>
            <D_text_p width={190} value={userInfo[0].birth} func={()=>{}}/>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='신부' />
          <div style={{flex:1}}>
            <D_text_p width={190} value={userInfo[1].nameKo} func={()=>{}}/>
          </div>
          <D_Title text='생년월일' />
          <div style={{flex:1}}>
            <D_text_p width={190} value={userInfo[1].birth} func={()=>{}}/>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='여행상품가' />
          <TextBox text='1인 상품가' />
          <D_text_p width={150} value={productCost.costAdult} func={()=>{}}/>
          <TextBox text='원,' />
          <TextBox text='합계' />
          <D_text_p width={150} value={productCost.costAll} func={()=>{}}/>
          <TextBox text='원' />
        </div>
        <div className="d-textrow">
          <D_Title text='입금계좌' />
          <D_text_p width={520} value={"하나은행 103-910048-51204 (주)실론투어"} func={()=>{}}/>
        </div>
        <div className="d-textrow">
          <D_Title text='결제일' />
          <div style={{flex:1}}>
            {
              depositCostList.map((item:any, index:any)=>{
                return (
                  <div style={{display:'flex'}} key={index}>
                    <TextBox text={item.nameko} width={70}/>
                    <D_text_p width={150} value={item.cost} func={()=>{}}/>
                    <TextBox text='원'/>
                    <D_text_p width={100} value={item.date} func={()=>{}}/>
                    {
                      item.deposit &&
                      <>
                      <D_text_p width={80} value={item.type} func={()=>{}}/>
                      <D_text_p width={80} value={item.deposit ? '입금확인' : ''} func={()=>{}}/>
                      </>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='숙박호텔' />
          <D_text_p width={520} value={hotelReserveState[0].hotelName} func={()=>{}}/>
        </div>
        <div className="d-textrow">
          <D_Title text='현지여행사' />
          <div style={{flex:1, marginLeft: '10px', display:'flex', alignItems:'center'}}>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={isLocalCompany}
                onChange={()=>{setIsLocalCompany(true)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>유</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={!isLocalCompany}
                onChange={()=>{setIsLocalCompany(false)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>무</p>
          </div>
          <D_Title text='현지안내원' />
          <div style={{flex:1, marginLeft: '10px', display:'flex', alignItems:'center'}}>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={isLocalGuide}
                onChange={()=>{setIsLocalGuide(true)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>유</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={!isLocalGuide}
                onChange={()=>{setIsLocalGuide(false)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>무</p>
          </div>
        </div>

        <div className="d-textrow">
          <D_Title text='여행지교통' />
          <div className='checkInputCover'>
            <SelectBoxLocalTrans text='항공'/>
            <SelectBoxLocalTrans text='열차'/>
            <SelectBoxLocalTrans text='버스'/>
            <SelectBoxLocalTrans text='승합차'/>
            <SelectBoxLocalTrans text='승용차'/>
          </div>
        </div>

        <div className="d-textrow">
          <D_Title text='여행자보험' />
          <div style={{flex:1.5, marginLeft: '10px', display:'flex', alignItems:'center'}}>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={isTournIsurance}
                onChange={()=>{}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>포함</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={!isTournIsurance}
                onChange={()=>{}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>불포함</p>
          </div>
          <D_Title text='보험회사' width={80}/>
          <div style={{flex:1, alignContent:'center'}}>
          <D_text_p width={100} value={''} func={()=>{}}/>
          </div>
          <D_Title text='보장금액' width={80}/>
          <div style={{flex:1, alignContent:'center'}}>
          <D_text_p width={100} value={''} func={()=>{}}/>
          </div>
        </div>

        <div className="d-textrow">
          <D_Title text='여권소지' />
          <div style={{flex:1, marginLeft: '10px', display:'flex', alignItems:'center', borderRight:'1px solid #EAEAEA'}}>
            <p>신랑:</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={isPassportGroom}
                onChange={()=>{setIsPassportGroom(true)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>유</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={!isPassportGroom}
                onChange={()=>{setIsPassportGroom(false)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>무</p>
          </div>
          <div style={{flex:1, marginLeft: '10px', display:'flex', alignItems:'center', borderRight:'1px solid #EAEAEA'}}>
            <p>신부:</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={isPassportBride}
                onChange={()=>{setIsPassportBride(true)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>유</p>
            <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <input className="input" type="checkbox"
                checked={!isPassportBride}
                onChange={()=>{setIsPassportBride(false)}}
                style={{width:'20px', height:'20px', backgroundColor:'red'}}
              />
            </div>
            <p>무</p>
          </div>
          <div style={{flex:1.5, alignContent:'center', padding:'0 5px', boxSizing:'border-box'}}>
            <p>&#8251; 여권 만료일 6개월전 반드시 재발급 해야함</p>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='여행요금포함사항'/>
          <div style={{alignContent:'center'}}>
            <D_text_p width={520} value={etcState.includes} func={()=>{}}/>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='불포함사항' />
          <D_text_p width={520} value={etcState.notIncludes} func={()=>{}}/>
        </div>
        <div className="d-textrow">
          <D_Title text='고객필독사항' />
          <div style={{flex:1, padding: '10px'}}>
            <p>1. 본 여행상품은 [허니문 특별약관 취소수수료 구정]이 적용되며 [일반여행약관]에 우선하여 효력이 발생합니다.</p>
            <p>2. 취소시에는 항공 및 호텔의 취소수수료가 발생하는 상품이며, 중도해지시 계약금반환이 불가합니다.</p>
            <p>3. 환율 변동에 의해 요금이 가/감 될 수 있으며 계약시 환율은 1달러(USD)={'   '}원이며, 환율 변동분은 잔금 정리시 정산 됩니다.</p>
            <p>4. 예약시 여권상의 정확한 영문이름으로 예약하셔야 하며, 여권유효기간은 출발인 기준 6개월 이상 남아 있어야 합니다.</p>
            <p>5. 본 여행상품은 전체 여행경비중 알선수수료와 국내사업장을 두고 있는 항공사의 항공료에 한하여 현금영수증 발급이 가능합니다.</p>
            <p>6. 계약자는 다음 단계의 [허니문 특별약관 취소수수료 규정] 및 [일반약관]을 확인 후 동의하셔야 계약 진행이 가능하므로 내용을 확인 후 동의하셔야 합니다.</p>
          </div>
        </div>
        
        <p style={{marginTop:"20px"}}>(주)실론투어와 여행자는 위 계약내용을 상호 성실히 이행 및 준수할 것을 확인하며 아래와 같이 서명 날인 합니다.</p>
        <p>&#8251; 본 계약서는 공정거래위원회 약제 42930-240에 의거해 승인받은 양식입니다.</p>

        <div className="datebox">
          <D_text_p width={100} value={reformDate[0]} func={()=>{}}/>
          <p style={{marginRight:'20px'}}>년</p>
          <D_text_p width={100} value={reformDate[1]} func={()=>{}}/>
          <p style={{marginRight:'20px'}}>월</p>
          <D_text_p width={100} value={reformDate[2]} func={()=>{}}/>
          <p>일</p>
        </div>

        <p>실론투어는 고객만족을 위해 최선을 다하고 있습니다.</p>
        <p>본 메일은 발신전용 메일이며, 고객님의 개인정보를 관련법규에 따라 안전하게 보호합니다.</p>
        <p style={{marginTop:"15px"}}>실론투어 | 대표이사 조동희 | 주소: 대구광역시 중구 동덕로 36-19 송죽웨딩 4층</p>
        <p>사업자 등록번호 504-81-47308 | 통신판매업 신고번호 제2008-대구중구-1577호</p>
        <p>고객센터: 1522-0047, 이메일: ct2212@hanmail.net</p>
      </div>

      <div className='btn-box'>
        <div className="btn" style={{backgroundColor: '#BDBDBD'}}
          onClick={()=>{
            navigate(-1);
          }}
        >
          <p>이전</p>
        </div>
        <div className="btn" style={{backgroundColor: '#5fb7ef'}}>
          <p>발송하기</p>
        </div>
      </div>

    </div>
  )
}
