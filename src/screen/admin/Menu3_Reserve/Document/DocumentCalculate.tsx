import React, { useState } from 'react';
import './Document.scss';
import logo from '../../images/logobk.png';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import { DropdownBox } from '../../../../boxs/DropdownBox';
import { DropDownAirline, DropDownLandCompany, DropDowncharger } from '../../../DefaultData';

export default function DocumentCalculate() {


  let navigate = useNavigate();
  const adminUserName = sessionStorage.getItem('userName');

  const location = useLocation();
  const userInfo = location.state.userInfo;
  const productInfo = location.state.productInfo;


  


  type DTitleProps = {
    width?: number;
    text: string;
  };

  const D_Title: React.FC<DTitleProps> = ({ text, width }) => (
    <div className="d-title" style={{width: width ? `${width}px` : `100px`, padding:'0 10px', boxSizing:'border-box'}}>
      <h3>{text}</h3>
    </div>
  )

 
  return (
    <div className='DocumentReserveCalculate'>

      <div className="d-cover" style={{padding: '50px 30px'}}>

        <div className="d-logo">
          <img src={logo} />
        </div>
        
        <h1 className='d-title'>정산서</h1>
     
        <div style={{height:'10px'}}></div>

        <div className="d-selectbtn-box">
          <div className="d-selectbtn" style={{backgroundColor:'#b3b3b3'}}
            onClick={()=>{navigate(-1)}}
          ><p>계약서보기</p></div>
          <div className="d-selectbtn" style={{backgroundColor:'#5fb7ef'}}><p>저장</p></div>
          <div className="d-selectbtn"><p>가정산 완료</p></div>
          <div className="d-selectbtn" style={{backgroundColor:'#5fb7ef'}}><p>지상비 결제 완료</p></div>
          <div className="d-selectbtn"><p>정산 완료</p></div>
        </div>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'30px'}}></div>
        
        <div className="d-textrow">
          <D_Title text='고객명' />
          <div style={{flex:1}}>
            <h4>{userInfo[0].nameKo} {userInfo[1].nameKo}</h4>
          </div>
          <D_Title text='계약일' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='여행기간' />
          <div style={{flex:1}}>
            <h4>{productInfo.tourStartPeriod} ~ {productInfo.tourEndPeriod}</h4>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='여행상품' />
          <div style={{flex:1}}>
            <h4>{productInfo.productName}</h4>
          </div>
          <D_Title text='총입금액' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='담당자' />
          <div style={{flex:1}}>
            <h4>{adminUserName}</h4>
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
                <p>가정산</p>
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
                <p>정산</p>
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
                    [1].map((item:any, index:any)=>{
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
                    [1].map((item:any, index:any)=>{
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
                <div className='d-chartbox item'><p>OTA</p></div>
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
                <div className='d-chartbox item'><p>비자대행</p></div>
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
                <div className='d-chartbox item'><p>여행자보험</p></div>
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
                <div className='d-chartbox item'><p>적립금 지원</p></div>
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
                <div className='d-chartbox item'><p>사은품구입</p></div>
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

              <div className="d-chart-divider-row"></div>

              <div style={{display:'flex'}}>
                <div className='d-chartbox item'><p>프로모션비용</p></div>
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
        </div>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'30px'}}></div>

        <div className="d-textrow" style={{flexDirection:'column'}}>
          <div className="box-row" style={{backgroundColor:'#EAEAEA'}}>
            <p className="box-one"></p>
            <div className="divider"></div>
            <p className="box-one">최종입금액</p>
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
          
          <div className="box-row">
            <div className="box-one">가정산</div>
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

          <div className="box-row">
            <div className="box-one">정산</div>
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

          <div className="box-row">
            <div className="box-one">차액</div>
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

        </div>
       
      </div>

      <div className='d-selectbtn-box'>
        <div className="d-selectbtn" style={{backgroundColor:'#b3b3b3'}}
          onClick={()=>{navigate(-1)}}
        >
          <p>취소</p>
        </div>
        <div className="d-selectbtn" style={{backgroundColor:'#5fb7ef'}}
        >
          <p style={{color:'#333'}}>저장</p>
        </div>
        <div className="d-selectbtn">
          <p style={{color:'#333'}}>가정산 완료</p>
        </div>
        <div className="d-selectbtn" style={{backgroundColor:'#5fb7ef'}}
        >
          <p style={{color:'#333'}}>지상비 결재완료</p>
        </div>
        <div className="d-selectbtn">
          <p style={{color:'#333'}}>정산 완료</p>
        </div>
      </div>
    </div>
  )
}
