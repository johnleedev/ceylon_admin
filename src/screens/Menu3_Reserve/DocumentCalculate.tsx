import React, { useState } from 'react';
import './Document.scss';
import logo from '../../images/logobk.png';
import Select from 'react-select';

export default function DocumentCalculate() {

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

  type DInputProps = {
    width: number;
    value: any;
    func: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  const D_Input: React.FC<DInputProps> = ({width, value, func}) => (
    <input 
      className="d-input" type="text" 
      style={{width:`${width}px`}} value={value}
      onChange={func}
    />
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

  const optionsdata = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const [isChecked, setIsChecked] = useState(false);

  
  return (
    <div className='DocumentReserve'>

      <div className="d-cover" style={{padding: '50px 30px'}}>

        <div className="d-logo">
          <img src={logo} />
        </div>
        
        <h1 className='d-title'>정산서</h1>
     
        <div style={{height:'10px'}}></div>

        <div className="d-selectbtn-box">
          <div className="d-selectbtn"><p>예약사항보기</p></div>
          <div className="d-selectbtn"><p>저장</p></div>
          <div className="d-selectbtn"><p>저장 후 리스트</p></div>
          <div className="d-selectbtn"><p>후정산서 완료</p></div>
        </div>

        <div style={{height: '2px', backgroundColor: '#8e8e8e', marginTop:'30px'}}></div>
        
        <div className="d-textrow">
          <D_Title text='계약서 번호' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='계약서 번호' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='계약서 번호' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='성함' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='성함' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='성함' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
        </div>
        <div className="d-textrow">
          <D_Title text='총 입금액' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='총 입금액' />
          <div style={{flex:1}}>
            <h4></h4>
          </div>
          <D_Title text='총 입금액' />
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
                <p className='d-charttext'>내역</p>
                <div className="d-chart-textdivider"></div>
                <p className='d-charttext' style={{flex:1}}>금액</p>
                <div className="d-chart-textdivider"></div>
                <p className='d-charttext' style={{flex:1}}>지급일</p>
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
                    [1,2,3,4].map((item:any, index:any)=>{
                      return (
                        <div key={index}>
                          <div style={{flex:1, display:'flex'}}>
                            <div style={{flex:1}}>
                              <div style={{display:'flex'}} className='d-chartbox'>
                                <p className='d-charttext'></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext' style={{flex:1}}></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext' style={{flex:1}}></p>
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
                    [1,2,3,4].map((item:any, index:any)=>{
                      return (
                        <div key={index}>
                          <div style={{flex:1, display:'flex'}}>
                            <div style={{flex:1}}>
                              <div style={{display:'flex'}} className='d-chartbox'>
                                <p className='d-charttext'></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext' style={{flex:1}}></p>
                                <div className="d-chart-textdivider"></div>
                                <p className='d-charttext' style={{flex:1}}></p>
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
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
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
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
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
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
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
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
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
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
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
                <div className='d-chartbox item'><p>리베이트</p></div>
                <div className="d-chart-divider"></div>

                <div style={{flex:1, display:'flex'}}>
                  <div style={{flex:1}}>
                    <div style={{display:'flex'}} className='d-chartbox'>
                      <p className='d-charttext'></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
                      <div className="d-chart-textdivider"></div>
                      <p className='d-charttext' style={{flex:1}}></p>
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
        <div className="d-selectbtn"><p>예약사항보기</p></div>
        <div className="d-selectbtn"><p>저장</p></div>
        <div className="d-selectbtn"><p>저장 후 리스트</p></div>
        <div className="d-selectbtn"><p>후정산서 완료</p></div>
      </div>

    </div>
  )
}
