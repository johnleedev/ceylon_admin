import React, { useCallback, useEffect, useState } from 'react'
import '../../ProductsModalAdd.scss'
import { IoMdClose } from "react-icons/io";
import { TitleBox } from '../../../../boxs/TitleBox';
import { useNavigate } from 'react-router-dom';
import { DateBoxDouble } from '../../../../boxs/DateBoxDouble';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci';



export default function ModalScheduleRevise (props : any) {
	
  let navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  
  const isAddOrRevise = props.isAddOrRevise;

  const [location, setLocation] = useState("");
  const [landCompany, setLandCompany] = useState("");
  const [selectCostTypeDetault, setSelectCostTypeDetault] = useState("");
  const [selectCostTypeAdd, setSelectCostTypeAdd] = useState("");

  const [notRevervePeriodList, setNotRevervePeriodList] = useState([
    {eventName : "바르셀로나 디그플레이 전시회", period: "24.02.30 ~ 24.02.02", notice:"예약불가"},
    {eventName : "바르셀로나 모바일 박람회", period: "24.02.30 ~ 24.02.02", notice:"호텔마감 / 예약불가"},
    {eventName : "바르셀로나 수산물 박람회", period: "24.02.30 ~ 24.02.02", notice:"추가요금 발생 / 별도확인 요망"},
    {eventName : "밀라노 가구 박람회", period: "24.02.30 ~ 24.02.02", notice:"호텔마감 / 예약불가"},
    {eventName : "노동절", period: "24.02.30 ~ 24.02.02", notice:"박물관, 미술관 등 휴관 / 투어불가"},
  ]);
  const [seasonCost, setSeasonCost] = useState({
    seasonName: "하이시즌", periodStart: "", periodEnd : "", reason: "", roomState:"", costOneDay:"", costAdd: ""
  });

  const [applyCurrency, setApplyCurrency] = useState('₩');
  const [commission, setCommission] = useState(
    [
      {title:"표준수수료", charge:""},
      {title:"기본네고", charge:""},
      {title:"특별네고", charge:""}
    ]
  );
  const [landBenefit, setLandBenefit] = useState("");

  const [periodData, setPeriodData] = useState([
    {periodName: "예약기간/얼리버드", periodStart:"", periodEnd:"", earlyPeriod:""},
    {periodName: "숙박기간", periodStart:"", periodEnd:"", earlyPeriod:""}
  ]);

  const [defaultScheduleSelect, setDefaultScheduleSelect] = useState({tourCity: "", connection: ""});
  const [defaultScheduleData, setDefaultScheduleData] = useState([
    {productName: "파리일주 7일 (전용차량/몽생미셀투어)", productCode: "Q-53", period:"4박 7일", depositCost:"1,200,000", saleCost: "1,300,000"},
    {productName: "파리(2)=인터라겐(2)+푸체른(1)(리기패스)8일", productCode: "Q-53", period:"4박 7일", depositCost:"1,200,000", saleCost: "1,300,000"}
  ]);
  
  const [hotelChange, setHotelChange] = useState([
    {hotelName:"", costByRoomType: [{roomType: "", minimumDay:"1박", currency:"", oneDayCost : "", personCost:"", personReviseCost:"", select:"선택(기본호텔)"}]}
  ]);


  const [scheduleAddSelectBtn, setScheduleAddSelectBtn] = useState("");
  const [scheduleAddGuideTour, setScheduleAddGuideTour] = useState([{productName:"", tourTime:"", runTime:"", cost:"", select:""}]);
  const [scheduleAddTicket, setScheduleAddTicket] = useState([{productName:"", tourTime:"", runPeriod:"", runTime:"", cost:"", select:""}]);
  const [scheduleAddBoardingpass, setScheduleAddBoardingpass] = useState([{productName:"", tourTime:"", runPeriod:"", runTime:"", cost:"", select:""}]);
  const [scheduleAddPerformance, setScheduleAddPerformance] = useState([{productName:"", tourTime:"", runPeriod:"", runTime:"", cost:"", select:""}]);
  const [scheduleAddMeals, setScheduleAddMeals] = useState([{productName:"", menu:"", cost:"", select:""}]);
  const [scheduleAddCafeClub, setScheduleAddCafeClub] = useState([{productName:"", menu:"", cost:"", select:""}]);


  const cityOption = [
    { value: '여행지선택', label: '여행지선택' },
  ]
  const connectionOption = [
    { value: '연계지역', label: '연계지역' },
  ]

  return (
    <div className='modal-addinput'>

      <div className='close'>
        <div className='close-btn'
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewScheduleReviseModal(false);
          }} 
        >
          <IoMdClose size={30}/>
        </div>
      </div>
      
      <div className="modal-header">
        <h1>요금표</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='여행지'/>
            <input className="inputdefault" type="text" style={{width:'40%', marginLeft:'15px'}} 
              value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드사'/>
            <input className="inputdefault" type="text" style={{width:'60%', marginLeft:'5px'}} 
              value={landCompany} onChange={(e)=>{setLandCompany(e.target.value)}}/>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='상품가'/>
            <div className='checkInputCover'>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={selectCostTypeDetault === '기본일정'}
                    onChange={()=>{setSelectCostTypeDetault('기본일정')}}
                  />
                </div>
                <p>기본일정</p>
              </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='추가요금'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectCostTypeAdd === '호텔'}
                  onChange={()=>{setSelectCostTypeAdd('호텔')}}
                />
              </div>
              <p>호텔</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectCostTypeAdd === '가이드투어'}
                  onChange={()=>{setSelectCostTypeAdd('가이드투어')}}
                />
              </div>
              <p>가이드투어</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectCostTypeAdd === '입장권'}
                  onChange={()=>{setSelectCostTypeAdd('입장권')}}
                />
              </div>
              <p>입장권</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectCostTypeAdd === '공연/경기'}
                  onChange={()=>{setSelectCostTypeAdd('공연/경기')}}
                />
              </div>
              <p>공연/경기</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectCostTypeAdd === '식사'}
                  onChange={()=>{setSelectCostTypeAdd('식사')}}
                />
              </div>
              <p>식사</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={selectCostTypeAdd === '카페/바/클럽'}
                  onChange={()=>{setSelectCostTypeAdd('카페/바/클럽')}}
                />
              </div>
              <p>카페/바/클럽</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{height:30}}></div>
      
      <div className="modal-header">
        <h1>요금표</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'30%'}} ><p>행사명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'30%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'40%'}} ><p>비고</p></div>
        </div>
        {
          notRevervePeriodList.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'40px'}} >
                  <div style={{width:'30%'}} >
                    <p>{item.eventName}</p>
                  </div>
                  <div style={{width:'30%'}}>
                    <p>{item.period}</p>
                  </div>
                  <div style={{width:'40%'}}>
                    <p>{item.notice}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'10%'}} ><p>성수기</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'20%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'25%'}} ><p>사유</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>객실여부</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>1박요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>추가요금</p></div>
          <div className="chart-divider"></div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole" style={{minHeight:'40px'}} >
            <div style={{width:'10%', display:'flex', justifyContent:'center'}} >
              <p>{seasonCost.seasonName}</p>
            </div>
            <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <DateBoxDouble dateStart={seasonCost.periodStart} dateEnd={seasonCost.periodEnd}
                setSelectStartDate={(e:any)=>{ 
                  const inputs = {...seasonCost};
                  inputs.periodStart = e;
                  inputs.periodEnd = e;
                  setSeasonCost(inputs);
                }} 
                setSelectEndDate={(e:any)=>{ 
                  const inputs = {...seasonCost};
                  inputs.periodStart = e;
                  inputs.periodEnd = e;
                  setSeasonCost(inputs);
                }} 
              />
            </div>
            <div style={{width:'25%'}} >
              <input className="inputdefault" style={{width:'95%', marginLeft:'5px', minHeight:'40px', outline:'none'}} 
                  value={seasonCost.reason} 
                  onChange={(e)=>{
                    const inputs = {...seasonCost};
                    inputs.reason = e.target.value;
                    setSeasonCost(inputs);
                  }}
                />
            </div>
            <div style={{width:'15%', display:'flex', justifyContent:'center'}} >
              <div className='checkInputCover'>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={seasonCost.roomState === 'inquiry'}
                    onChange={()=>{
                      const inputs = {...seasonCost};
                      inputs.roomState = 'inquiry';
                      setSeasonCost(inputs);
                    }}
                  />
                </div>
                <p>별도문의</p>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={seasonCost.roomState === 'noreserve'}
                    onChange={()=>{
                      const inputs = {...seasonCost};
                      inputs.roomState = 'noreserve';
                      setSeasonCost(inputs);
                    }}
                  />
                </div>
                <p>불가</p>
              </div>
            </div>
            <div style={{width:'15%', display:'flex', justifyContent:'center'}} >
              <div className='checkInputCover'>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={seasonCost.costOneDay === 'true'}
                    onChange={()=>{
                      const inputs = {...seasonCost};
                      if (inputs.costOneDay === 'true') {
                        inputs.costOneDay = 'false';
                      } else {
                        inputs.costOneDay = 'true';
                      }
                      setSeasonCost(inputs);
                    }}
                  />
                </div>
              </div>
            </div>
            <div style={{width:'15%', display:'flex', justifyContent:'center'}} >
              <div className='checkInputCover'>
                <div className='checkInput'>
                  <input className="input" type="checkbox"
                    checked={seasonCost.costAdd === 'true'}
                    onChange={()=>{
                      const inputs = {...seasonCost};
                      if (inputs.costAdd === 'true') {
                        inputs.costAdd = 'false';
                      } else {
                        inputs.costAdd = 'true';
                      }
                      setSeasonCost(inputs);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{height:30}}></div>
      
      <div className="modal-header">
        <h1>상품 수수료</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='적용화폐'/>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '₩'}
                  onChange={()=>{
                    setApplyCurrency('₩')
                  }}
                />
              </div>
              <p>₩(만원)</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '€'}
                  onChange={()=>{
                    setApplyCurrency('€')
                  }}
                />
              </div>
              <p>€(유로)</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={applyCurrency === '$'}
                  onChange={()=>{
                    setApplyCurrency('$')
                  }}
                />
              </div>
              <p>$(달러)</p>
            </div>
          </div>
        </div>
        {
          commission.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole">
                  <TitleBox width="120px" text={item.title}/>
                  <input className="inputdefault" type="text" style={{width:'30%', marginLeft:'5px'}} 
                      value={item.charge} 
                      onChange={(e)=>{
                        const copy = [...commission];
                        copy[index].charge = e.target.value;
                        setCommission(copy);
                      }}/>
                </div>
              </div>
            )
          })
        }
        
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text='랜드베네핏'/>
            <input className="inputdefault" type="text" style={{width:'30%', marginLeft:'5px'}} 
              value={landBenefit} onChange={(e)=>{
                  setLandBenefit(e.target.value);
                }}/>
          </div>
        </div>
       
      </section>

      <div style={{height:30}}></div>
      
      <div className="modal-header">
        <h1>기간</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text={periodData[0].periodName}/>
            <DateBoxDouble dateStart={periodData[0].periodStart} dateEnd={periodData[0].periodEnd}
              setSelectStartDate={(e:any)=>{ 
                const inputs = {...periodData};
                inputs[0].periodStart = e;
                inputs[0].periodEnd = e;
                inputs[0].earlyPeriod = '';
                setPeriodData(inputs)
              }} 
              setSelectEndDate={(e:any)=>{ 
                const inputs = {...periodData};
                inputs[0].periodStart = e;
                inputs[0].periodEnd = e;
                inputs[0].earlyPeriod = '';
                setPeriodData(inputs)
              }} 
            />
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={periodData[0].earlyPeriod === '90일전'}
                  onChange={()=>{
                    const inputs = {...periodData};
                    inputs[0].periodStart = '';
                    inputs[0].periodEnd = '';
                    inputs[0].earlyPeriod = '90일전';
                    setPeriodData(inputs)
                  }}
                />
              </div>
              <p>90일전</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={periodData[0].earlyPeriod === '60일전'}
                  onChange={()=>{
                    const inputs = {...periodData};
                    inputs[0].periodStart = '';
                    inputs[0].periodEnd = '';
                    inputs[0].earlyPeriod = '60일전';
                    setPeriodData(inputs)
                  }}
                />
              </div>
              <p>60일전</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={periodData[0].earlyPeriod === '45일전'}
                  onChange={()=>{
                    const inputs = {...periodData};
                    inputs[0].periodStart = '';
                    inputs[0].periodEnd = '';
                    inputs[0].earlyPeriod = '45일전';
                    setPeriodData(inputs)
                  }}
                />
              </div>
              <p>45일전</p>
            </div>
          </div>
        </div>
        <div className="coverbox">
          <div className="coverrow hole">
            <TitleBox width="120px" text={periodData[1].periodName}/>
            <DateBoxDouble  dateStart={periodData[1].periodStart} dateEnd={periodData[1].periodEnd}
              setSelectStartDate={(e:any)=>{ 
                const inputs = {...periodData};
                inputs[1].periodStart = e;
                inputs[1].periodEnd = e;
                setPeriodData(inputs)
              }} 
              setSelectEndDate={(e:any)=>{ 
                const inputs = {...periodData};
                inputs[1].periodEnd = e;
                setPeriodData(inputs)
              }} 
            />
          </div>
        </div>
      </section>
     
      <div style={{height:30}}></div>
      
      <div className="modal-header" style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
        <h1 style={{marginBottom:'0', marginRight:'20px'}}>기본일정</h1>
        <div style={{width:'30%', display:'flex', alignItems:'center'}}>
          <DropdownBox
            widthmain='45%'
            height='35px'
            selectedValue={defaultScheduleSelect.tourCity}
            options={cityOption}    
            handleChange={(e)=>{
              const copy = {...defaultScheduleSelect}; 
              copy.tourCity = e.target.value;  
              setDefaultScheduleSelect(copy);
            }}
          />
          <DropdownBox
            widthmain='45%'
            height='35px'
            selectedValue={defaultScheduleSelect.connection}
            options={connectionOption}
            handleChange={(e)=>{
              const copy = {...defaultScheduleSelect}; 
              copy.connection = e.target.value;  
              setDefaultScheduleSelect(copy);
            }}
          />
        </div>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'40%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>코드</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'20%'}} ><p>입금가</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'20%'}} ><p>판매가</p></div>
          <div className="chart-divider"></div>
        </div>
        {
          defaultScheduleData.map((item:any, index:any)=>{
            return (
              <div className="coverbox">
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'40%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{marginLeft:'0'}}>{item.productName}</p>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{marginLeft:'0'}}>{item.productCode}</p>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{marginLeft:'0'}}>{item.period}</p>
                  </div>
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{marginLeft:'0'}}>{item.depositCost}</p>
                  </div>
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <p style={{marginLeft:'0'}}>{item.saleCost}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>

      <div style={{height:30}}></div>
      
      <div className="modal-header">
        <h1 style={{marginBottom:'0'}}>호텔변경</h1>

        
      </div>

      <section>
        <div className="bottombar"></div>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA'}}>
          <div className='chartbox' style={{width:'20%'}} ><p>호텔</p></div>
          <div className="chart-divider"></div>
          <div style={{width:'75%', display:'flex'}}>
            <div className='chartbox' style={{width:'24%'}} ><p>룸타입</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'8%'}} ><p>미니엄/박</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'8%'}} ><p>화폐</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'15%'}} ><p>1박요금</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'15%'}} ><p>1인요금</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'15%'}} ><p>1박변경요금</p></div>
            <div className="chart-divider"></div>
            <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          </div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'5%'}} ><p></p></div>
        </div>
        {
          hotelChange.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'20%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...hotelChange];
                        copy[index].hotelName = e.target.value;
                        setHotelChange(copy);
                      }}/>
                  </div>
                  <div style={{width:'75%', alignItems:'center'}}>
                  {
                    item.costByRoomType.map((subItem:any, subIndex:any)=>{

                      return (
                        <div key={subIndex} style={{display:'flex'}}>
                          <div style={{width:'24%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.roomType} 
                              style={{width:'70%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelChange];
                                copy[index].costByRoomType[subIndex].roomType = e.target.value;
                                setHotelChange(copy);
                              }}/>
                            <div className="dayBox">
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...hotelChange];
                                  copy[index].costByRoomType.splice(index, 1);
                                  setHotelChange(copy);
                                }}
                              >
                                <p>-</p>
                              </div>
                            </div>  
                            <div className="dayBox">
                              <div className="dayBtn"
                                onClick={()=>{
                                  const copy = [...hotelChange];
                                  copy[index].costByRoomType = [...copy[index].costByRoomType, 
                                    {roomType: "", minimumDay:"1박", currency:"", oneDayCost : "", personCost:"", personReviseCost:"", select:"선택(기본호텔)"}];
                                  setHotelChange(copy);
                                }}
                              >
                                <p>+</p>
                              </div>
                            </div>
                          </div>
                          <div style={{width:'8%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <DropdownBox
                              widthmain='95%'
                              height='35px'
                              selectedValue={item.minimumDay}
                              options={[
                                { value: '1박', label: '1박' },
                                { value: '2박', label: '2박' },
                                { value: '3박', label: '3박' },
                                { value: '4박', label: '4박' },
                                { value: '5박', label: '5박' },
                                { value: '6박', label: '6박' },
                                { value: '7박', label: '7박' },
                                { value: '8박', label: '8박' },
                                { value: '9박', label: '9박' },
                                { value: '10박', label: '10박' }
                              ]}    
                              handleChange={(e)=>{
                                const copy = [...hotelChange];
                                copy[index].costByRoomType[subIndex].minimumDay = e.target.value;
                                setHotelChange(copy);
                              }}
                            />  
                          </div>
                          <div style={{width:'8%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <DropdownBox
                              widthmain='95%'
                              height='35px'
                              selectedValue={subItem.currency}
                              options={[
                                { value: '선택', label: '선택' },
                                { value: '$', label: '$' },
                                { value: '₩', label: '₩' }
                              ]}    
                              handleChange={(e)=>{
                                const copy = [...hotelChange]; 
                                copy[index].costByRoomType[subIndex].currency = e.target.value;
                                setHotelChange(copy);
                              }}
                            />
                          </div>
                          <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.oneDayCost} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelChange];
                                copy[index].costByRoomType[subIndex].oneDayCost = e.target.value;
                                setHotelChange(copy);
                              }}/>
                          </div>
                          <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.personCost} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelChange];
                                copy[index].costByRoomType[subIndex].personCost = e.target.value;
                                setHotelChange(copy);
                              }}/>
                          </div>
                          <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.personReviseCost} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelChange];
                                copy[index].costByRoomType[subIndex].personReviseCost = e.target.value;
                                setHotelChange(copy);
                              }}/>
                          </div>
                          <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                            <input className="inputdefault" value={subItem.select} 
                              style={{width:'95%', minHeight:'40px', outline:'none'}} 
                              onChange={(e)=>{
                                const copy = [...hotelChange];
                                copy[index].costByRoomType[subIndex].select = e.target.value;
                                setHotelChange(copy);
                              }}/>
                          </div>
                        </div>
                      )
                    }
                  )}
                  </div>
                  <div style={{width:'5%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...hotelChange, 
                            {hotelName:"", costByRoomType: [{roomType: "", minimumDay:"1박", currency:"", oneDayCost : "", personCost:"", personReviseCost:"", select:"선택(기본호텔)"}]}
                          ];
                          setHotelChange(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...hotelChange];
                          copy.splice(index, 1);
                          setHotelChange(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>

      <div style={{height:30}}></div>
      
      <div className="modal-header">
        <h1>일정추가</h1>
      </div>

      <section>
        <div className="bottombar"></div>
        <div className="coverbox">
          <div className="coverrow hole" style={{height:'50px'}}>
            <div className='checkInputCover'>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '전체'}
                  onChange={()=>{setScheduleAddSelectBtn('전체')}}
                />
              </div>
              <p>전체</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '가이드투어'}
                  onChange={()=>{setScheduleAddSelectBtn('가이드투어')}}
                />
              </div>
              <p>가이드투어</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '입장권'}
                  onChange={()=>{setScheduleAddSelectBtn('입장권')}}
                />
              </div>
              <p>입장권</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '탑승권'}
                  onChange={()=>{setScheduleAddSelectBtn('탑승권')}}
                />
              </div>
              <p>탑승권</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '공연/경기'}
                  onChange={()=>{setScheduleAddSelectBtn('공연/경기')}}
                />
              </div>
              <p>공연/경기</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '식사'}
                  onChange={()=>{setScheduleAddSelectBtn('식사')}}
                />
              </div>
              <p>식사</p>
              <div className='checkInput'>
                <input className="input" type="checkbox"
                  checked={scheduleAddSelectBtn === '카페/바/클럽'}
                  onChange={()=>{setScheduleAddSelectBtn('카페/바/클럽')}}
                />
              </div>
              <p>카페/바/클럽</p>
            </div>
          </div>
        </div>
      </section>

      {
      (scheduleAddSelectBtn === '전체' || scheduleAddSelectBtn === '가이드투어') &&
      <>
      {/*  가이드투어 */}
      <section>
        <p style={{marginBottom:'5px', fontSize:'18px', fontWeight:'bold'}}>가이드투어</p>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA', borderTop:'1px solid #ccc'}}>
          <div className='chartbox' style={{width:'30%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>투어시간대</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>소요시간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p></p></div>
        </div>
        {
          scheduleAddGuideTour.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddGuideTour];
                        copy[index].productName = e.target.value;
                        setScheduleAddGuideTour(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.tourTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddGuideTour];
                        copy[index].tourTime = e.target.value;
                        setScheduleAddGuideTour(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddGuideTour];
                        copy[index].runTime = e.target.value;
                        setScheduleAddGuideTour(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.cost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddGuideTour];
                        copy[index].cost = e.target.value;
                        setScheduleAddGuideTour(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.select} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddGuideTour];
                        copy[index].select = e.target.value;
                        setScheduleAddGuideTour(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddGuideTour,
                            {productName:"", tourTime:"", runTime:"", cost:"", select:""}
                          ];
                          setScheduleAddGuideTour(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddGuideTour];
                          copy.splice(index, 1);
                          setScheduleAddGuideTour(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      </>
      }

      {
      (scheduleAddSelectBtn === '전체' || scheduleAddSelectBtn === '입장권') &&
      <>
      {/* 입장권 */}
      <section>
        <p style={{marginBottom:'5px', fontSize:'18px', fontWeight:'bold'}}>입장권</p>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA', borderTop:'1px solid #ccc'}}>
          <div className='chartbox' style={{width:'30%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>투어시간대</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>시간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p></p></div>
        </div>
        {
          scheduleAddTicket.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddTicket];
                        copy[index].productName = e.target.value;
                        setScheduleAddTicket(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.tourTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddTicket];
                        copy[index].tourTime = e.target.value;
                        setScheduleAddTicket(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runPeriod} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddTicket];
                        copy[index].runPeriod = e.target.value;
                        setScheduleAddTicket(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddTicket];
                        copy[index].runTime = e.target.value;
                        setScheduleAddTicket(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.cost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddTicket];
                        copy[index].cost = e.target.value;
                        setScheduleAddTicket(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.select} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddTicket];
                        copy[index].select = e.target.value;
                        setScheduleAddTicket(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddTicket,
                            {productName:"", tourTime:"", runPeriod:"", runTime:"", cost:"", select:""}
                          ];
                          setScheduleAddTicket(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddTicket];
                          copy.splice(index, 1);
                          setScheduleAddTicket(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      </>
      }

      {
      (scheduleAddSelectBtn === '전체' || scheduleAddSelectBtn === '탑승권') &&
      <>
      {/* 탑승권 */}
      <section>
        <p style={{marginBottom:'5px', fontSize:'18px', fontWeight:'bold'}}>탑승권</p>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA', borderTop:'1px solid #ccc'}}>
          <div className='chartbox' style={{width:'30%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>투어시간대</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>시간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p></p></div>
        </div>
        {
          scheduleAddBoardingpass.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddBoardingpass];
                        copy[index].productName = e.target.value;
                        setScheduleAddBoardingpass(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.tourTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddBoardingpass];
                        copy[index].tourTime = e.target.value;
                        setScheduleAddBoardingpass(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runPeriod} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddBoardingpass];
                        copy[index].runPeriod = e.target.value;
                        setScheduleAddBoardingpass(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddBoardingpass];
                        copy[index].runTime = e.target.value;
                        setScheduleAddBoardingpass(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.cost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddBoardingpass];
                        copy[index].cost = e.target.value;
                        setScheduleAddBoardingpass(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.select} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddBoardingpass];
                        copy[index].select = e.target.value;
                        setScheduleAddBoardingpass(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddBoardingpass,
                            {productName:"", tourTime:"", runPeriod:"", runTime:"", cost:"", select:""}
                          ];
                          setScheduleAddBoardingpass(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddBoardingpass];
                          copy.splice(index, 1);
                          setScheduleAddBoardingpass(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      </>
      }

      {
      (scheduleAddSelectBtn === '전체' || scheduleAddSelectBtn === '공연/경기') &&
      <>
      {/* 공연/경기 */}
      <section>
        <p style={{marginBottom:'5px', fontSize:'18px', fontWeight:'bold'}}>공연/경기</p>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA', borderTop:'1px solid #ccc'}}>
          <div className='chartbox' style={{width:'30%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>투어시간대</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>기간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p>시간</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'10%'}} ><p></p></div>
        </div>
        {
          scheduleAddPerformance.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'30%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddPerformance];
                        copy[index].productName = e.target.value;
                        setScheduleAddPerformance(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.tourTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddPerformance];
                        copy[index].tourTime = e.target.value;
                        setScheduleAddPerformance(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runPeriod} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddPerformance];
                        copy[index].runPeriod = e.target.value;
                        setScheduleAddPerformance(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.runTime} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddPerformance];
                        copy[index].runTime = e.target.value;
                        setScheduleAddPerformance(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.cost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddPerformance];
                        copy[index].cost = e.target.value;
                        setScheduleAddPerformance(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.select} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddPerformance];
                        copy[index].select = e.target.value;
                        setScheduleAddPerformance(copy);
                      }}/>
                  </div>
                  <div style={{width:'10%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddPerformance,
                            {productName:"", tourTime:"", runPeriod:"", runTime:"", cost:"", select:""}
                          ];
                          setScheduleAddPerformance(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddPerformance];
                          copy.splice(index, 1);
                          setScheduleAddPerformance(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      </>
      }

      {
      (scheduleAddSelectBtn === '전체' || scheduleAddSelectBtn === '식사') &&
      <>
      {/* 식사 */}
      <section>
        <p style={{marginBottom:'5px', fontSize:'18px', fontWeight:'bold'}}>식사</p>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA', borderTop:'1px solid #ccc'}}>
          <div className='chartbox' style={{width:'40%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>메뉴</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p></p></div>
        </div>
        {
          scheduleAddMeals.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'40%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddMeals];
                        copy[index].productName = e.target.value;
                        setScheduleAddMeals(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.menu} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddMeals];
                        copy[index].menu = e.target.value;
                        setScheduleAddMeals(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.cost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddMeals];
                        copy[index].cost = e.target.value;
                        setScheduleAddMeals(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.select} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddMeals];
                        copy[index].select = e.target.value;
                        setScheduleAddMeals(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddMeals,
                            {productName:"", menu:"", cost:"", select:""}
                          ];
                          setScheduleAddMeals(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddMeals];
                          copy.splice(index, 1);
                          setScheduleAddMeals(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      </>
      }

      {
      (scheduleAddSelectBtn === '전체' || scheduleAddSelectBtn === '카페/바/클럽') &&
      <>
      {/* 카페/바/클럽 */}
      <section>
        <p style={{marginBottom:'5px', fontSize:'18px', fontWeight:'bold'}}>카페/바/클럽</p>
        <div className='chart-box-cover' style={{backgroundColor:'#EAEAEA', borderTop:'1px solid #ccc'}}>
          <div className='chartbox' style={{width:'40%'}} ><p>상품명</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>메뉴</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>요금</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p>선택</p></div>
          <div className="chart-divider"></div>
          <div className='chartbox' style={{width:'15%'}} ><p></p></div>
        </div>
        {
          scheduleAddCafeClub.map((item:any, index:any)=>{
            return (
              <div className="coverbox" key={index}>
                <div className="coverrow hole" style={{minHeight:'45px'}} >
                  <div style={{width:'40%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.hotelName} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddCafeClub];
                        copy[index].productName = e.target.value;
                        setScheduleAddCafeClub(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.menu} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddCafeClub];
                        copy[index].menu = e.target.value;
                        setScheduleAddCafeClub(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.cost} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddCafeClub];
                        copy[index].cost = e.target.value;
                        setScheduleAddCafeClub(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <input className="inputdefault" value={item.select} 
                      style={{width:'95%', minHeight:'40px', outline:'none'}} 
                      onChange={(e)=>{
                        const copy = [...scheduleAddCafeClub];
                        copy[index].select = e.target.value;
                        setScheduleAddCafeClub(copy);
                      }}/>
                  </div>
                  <div style={{width:'15%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddCafeClub,
                            {productName:"", menu:"", cost:"", select:""}
                          ];
                          setScheduleAddCafeClub(copy);
                        }}
                      >
                        <p>+</p>
                      </div>
                    </div>  
                    <div className="dayBox">
                      <div className="dayBtn"
                        onClick={()=>{
                          const copy = [...scheduleAddCafeClub];
                          copy.splice(index, 1);
                          setScheduleAddCafeClub(copy);
                        }}
                      >
                        <p>-</p>
                      </div>
                    </div>  
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      </>
      }

      <div className='btn-box'>
        <div className="btn" 
          onClick={()=>{
            props.setRefresh(!props.refresh);
            props.setIsViewScheduleReviseModal(false);
          }}
        >
          <p style={{color:'#333'}}>취소</p>
        </div>
        <div className="btn" style={{backgroundColor:'#5fb7ef'}}
          onClick={()=>{
            
          }}
        >
          <p>저장</p>
        </div>
      </div>

    </div>     
  )
}

