import React, { useState } from 'react';
import './Document.scss';
import logo from '../../images/logobk.png';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDownAirline, DropDownLandCompany, DropDowncharger } from '../../../DefaultData';

export default function DocumentCalculate() {


  let navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state.userInfo;
  const reserveInfo = location.state.reserveInfo;
  const productCost = location.state.productCost;
  const airportState = location.state.airportState;

  const [landCompany, setLandCompany] = useState(JSON.parse(reserveInfo.landCompany));
  

  type DTitleProps = {
    width?: number;
    text: string;
  };

  const D_Title: React.FC<DTitleProps> = ({ text, width }) => (
    <div className="d-title" style={{width: width ? `${width}px` : `100px`, padding:'0 10px', boxSizing:'border-box'}}>
      <h3>{text}</h3>
    </div>
  )

  const handleLandCompanyInput = async (text: string, Idx : number) => {
		const copy = [...landCompany];
    
	};

 
  return (
    <div className='DocumentReserveCalculate'>

      <div className="d-cover" style={{padding: '50px 30px'}}>

        <div className="d-logo">
          <img src={logo} />
        </div>
        
        <h1 className='d-title'>정산서</h1>
     
        <div style={{height:'10px'}}></div>

        <div className="d-selectbtn-box">
          <div className="d-selectbtn"
            onClick={()=>{navigate(-1)}}
          ><p>예약사항보기</p></div>
          <div className="d-selectbtn"><p>저장</p></div>
          <div className="d-selectbtn"><p>저장 후 리스트</p></div>
          <div className="d-selectbtn"><p>후정산서 완료</p></div>
        </div>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'30px'}}></div>
        
        <div className="d-textrow">
          <D_Title text='고유번호' />
          <div style={{flex:1}}>
            <h4>{reserveInfo.serialNum}</h4>
          </div>
          <D_Title text='상품명' />
          <div style={{flex:1}}>
            <h4>{reserveInfo.productName}</h4>
          </div>
          <D_Title text='담당자' />
          <div style={{flex:1}}>
            <h4>{reserveInfo.charger}</h4>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='성함' />
          <div style={{flex:1}}>
            <h4>{userInfo[0].nameKo}, {userInfo[1].nameKo}</h4>
          </div>
          <D_Title text='예약일' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='출발일' />
          <div style={{flex:1}}>
            <h4>{reserveInfo.tourStartPeriod}</h4>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='총 입금액' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='판매가' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='최종수정' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
        </div>


        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'30px'}}></div>

        <div className="d-textrow" style={{flexDirection:'column'}}>

          <div className='d-chart-box' style={{backgroundColor:'#EAEAEA'}}>
            <div className='d-chartbox sort'><p>구분</p></div>
            <div className="d-chart-divider"></div>
            <div className='d-chartbox item'><p>품목</p></div>
            <div className="d-chart-divider"></div>
            <div style={{flex:1}}>
              <div className='d-chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>
                <p>선정산</p>
              </div>
              <div style={{display:'flex'}} className='d-chartbox'>
                <p className='d-charttext' style={{flex:2}}>내역</p>
                <div className="d-chart-textdivider"></div>
                <p className='d-charttext' style={{flex:1}}>금액</p>
              </div>
            </div>
            <div className="d-chart-divider"></div>
            <div style={{flex:1}}>
              <div className='d-chartbox' style={{borderBottom: '1px solid #D3D3D3'}}>  
                <p>후정산</p>
              </div>
              <div style={{display:'flex'}}  className='d-chartbox'>
                <p className='d-charttext'>내역</p>
                <div className="d-chart-textdivider"></div>
                <p className='d-charttext'>금액</p>
                <div className="d-chart-textdivider"></div>
                <p className='d-charttext'>지급일</p>
              </div>
            </div>
          </div>

          <div className='d-chart-box'>
            <div className='d-chartbox sort'><p>수탁경비</p></div>
            <div className="d-chart-divider"></div>


            <div style={{flex:1}}>
              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>지상비</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1}}>
                  {
                    landCompany.map((item:any, index:any)=>{
                      return (
                        <div key={index}>
                          <div style={{flex:1, display:'flex'}}>
                            <div style={{flex:1}}>
                              <div style={{display:'flex'}} className='d-chartbox'>
                                <p className='d-charttext' style={{flex:2, display:'flex', alignItems:'center'}}>
                                  <DropdownBox
                                    widthmain='43%'
                                    height='30px'
                                    selectedValue={''}
                                    options={DropDownLandCompany}
                                    handleChange={(e)=>{''}}
                                  />
                                <input 
                                  className="d-input-input" type="text" 
                                  style={{width:`50%`}} value={''}
                                  onChange={(e)=>{}}
                                />
                                </p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext' style={{flex:1}}>
                                <input 
                                  className="d-input-cost" type="text" 
                                  style={{width:`95%`}} value={''}
                                  onChange={(e)=>{}}
                                />
                                </p>
                              </div>
                            </div>
                            <div className="d-chart-divider"></div>
                            <div style={{flex:1}}>
                              <div style={{display:'flex'}}  className='d-chartbox'>
                                <p className='d-charttext'></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext'></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext'></p>
                              </div>
                            </div>
                          </div>
                          {
                            index !== 3 &&
                            <div style={{height:'1px', backgroundColor:'#EAEAEA'}}></div>
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>항공료</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1}}>
                  {
                    airportState.map((item:any, index:any)=>{
                      return (
                        <div key={index}>
                          <div style={{flex:1, display:'flex'}}>
                            <div style={{flex:1}}>
                              <div style={{display:'flex'}} className='d-chartbox'>
                                <p className='d-charttext' style={{flex:2, display:'flex', alignItems:'center'}}>
                                  <DropdownBox
                                    widthmain='43%'
                                    height='30px'
                                    selectedValue={''}
                                    options={DropDownAirline}
                                    handleChange={(e)=>{''}}
                                  />
                                <input 
                                  className="d-input-input" type="text" 
                                  style={{width:`50%`}} value={''}
                                  onChange={(e)=>{}}
                                />
                                </p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext' style={{flex:1}}>
                                <input 
                                  className="d-input-cost" type="text" 
                                  style={{width:`95%`}} value={''}
                                  onChange={(e)=>{}}
                                />
                                </p>
                              </div>
                            </div>
                            <div className="d-chart-divider"></div>
                            <div style={{flex:1}}>
                              <div style={{display:'flex'}}  className='d-chartbox'>
                                <p className='d-charttext'></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext'></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext'></p>
                              </div>
                            </div>
                          </div>
                          {
                            index !== 3 &&
                            <div style={{height:'1px', backgroundColor:'#EAEAEA'}}></div>
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>국내숙박</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext' style={{flex:2}}>
                      <input 
                        className="d-input-input" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}>
                      <input 
                        className="d-input-cost" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="d-chart-divider"></div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}}  className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>국내교통</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext' style={{flex:2}}>
                      <input 
                        className="d-input-input" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}>
                      <input 
                        className="d-input-cost" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="d-chart-divider"></div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}}  className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div style={{height:'1px', backgroundColor:'#d4d4d4'}}></div>

          <div className='d-chart-box'>
            <div className='d-chartbox sort'><p>지출경비</p></div>
            <div className="d-chart-divider"></div>


            <div style={{flex:1}}>
              
              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>사은품</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext' style={{flex:2}}>
                      <input 
                        className="d-input-input" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}>
                      <input 
                        className="d-input-cost" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="d-chart-divider"></div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}}  className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>프로모션</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext' style={{flex:2}}>
                      <input 
                        className="d-input-input" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}>
                      <input 
                        className="d-input-cost" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="d-chart-divider"></div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}}  className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>직원인센티브</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext' style={{flex:2, display:'flex', alignItems:'center'}}>
                      <DropdownBox
                        widthmain='43%'
                        height='30px'
                        selectedValue={''}
                        options={DropDownLandCompany}
                        handleChange={(e)=>{''}}
                      />
                      <input 
                        className="d-input-input" type="text" 
                        style={{width:`50%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}>
                      <input 
                        className="d-input-cost" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="d-chart-divider"></div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}}  className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider">
                      </div>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>리베이트</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext' style={{flex:2, display:'flex', alignItems:'center'}}>
                      <DropdownBox
                        widthmain='43%'
                        height='30px'
                        selectedValue={''}
                        options={DropDowncharger}
                        handleChange={(e)=>{''}}
                      />
                      <input 
                        className="d-input-input" type="text" 
                        style={{width:`50%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}>
                      <input 
                        className="d-input-cost" type="text" 
                        style={{width:`95%`}} value={''}
                        onChange={(e)=>{}}
                      />
                      </p>
                    </div>
                  </div>
                  <div className="d-chart-divider"></div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}}  className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext'></p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'30px'}}></div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div className="box-row" style={{backgroundColor:'#EAEAEA'}}>
            <p className="box-one"></p>
            <div className="divider"></div>
            <p className="box-one">입금액</p>
            <div className="divider"></div>
            <p className="box-one">수탁경비</p>
            <div className="divider"></div>
            <p className="box-one">매출</p>
            <div className="divider"></div>
            <p className="box-one">세금(13.3%)</p>
            <div className="divider"></div>
            <p className="box-one">지출경비</p>
            <div className="divider"></div>
            <p className="box-one">수수료</p>
          </div>
          {
            ['선정산','후정산','차액'].map((item:any, index:any)=>{
              return (
                <div className="box-row" key={index}>
                  <div className="box-one">{item}</div>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                  <div className="divider"></div>
                  <p className="box-one"></p>
                </div>
              )
            })
          }
        </div>
       
      </div>

      <div className="d-selectbtn-box">
        <div className="d-selectbtn"
          onClick={()=>{navigate(-1)}}
        ><p>예약사항보기</p></div>
        <div className="d-selectbtn"><p>저장</p></div>
        <div className="d-selectbtn"><p>저장 후 리스트</p></div>
        <div className="d-selectbtn"><p>후정산서 완료</p></div>
      </div>

    </div>
  )
}
