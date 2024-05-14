import React from 'react'
import { TitleBox } from '../../boxs/TitleBox';

export default function ModalReserveTab2(props:any) {
  return (
    <div>
      {/* <section>
          <h1>4. 예약상품</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='상품명'/>
              <InputBox width={1200} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="120px" text='여행지'/>
              <SelectBox 
                notice={{ value: '선택', label: '국가선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '일본' },
                  { value: 'n2', label: '중국' },
                ]} 
              />
              <InputBox width={250} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow half">
              <TitleBox width="120px" text='항공사'/>
              <InputBox width={500} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='여행기간'/>
              <SelectBox 
                notice={{ value: '선택', label: '출발공항' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '인천공항' },
                  { value: 'n2', label: '김포공항' },
                  { value: 'n3', label: '대구공항' },
                ]} 
              />
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <p>~</p>
              <SelectBox 
                notice={{ value: '선택', label: '도착공항' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '인천공항' },
                  { value: 'n2', label: '김포공항' },
                  { value: 'n3', label: '대구공항' },
                ]} 
              />
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
            </div>
          </div>
        </section> */}

        {/* <section>
          <h1>5. 여행상품가</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="120px" text='1인요금' height={160}/>
              <div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>성인</h3>
                  <InputBox width={200} value={''} func={(e)=>{}} />
                  <p>원</p>
                  <SelectBox 
                    notice={{ value: '선택', label: '0' }}
                    widthmain={100} selectWidth={100} selectTextWidth={90}
                    data={[ 
                      { value: 'n1', label: '1' },
                      { value: 'n2', label: '2' },
                      { value: 'n3', label: '3' },
                    ]} 
                  />
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>소아</h3>
                  <InputBox width={200} value={''} func={(e)=>{}} />
                  <p>원</p>
                  <SelectBox 
                    notice={{ value: '선택', label: '0' }}
                    widthmain={100} selectWidth={100} selectTextWidth={90}
                    data={[ 
                      { value: 'n1', label: '1' },
                      { value: 'n2', label: '2' },
                      { value: 'n3', label: '3' },
                    ]} 
                  />
                  <p>명</p>
                </div>
                <div style={{display:'flex', alignItems:'center'}}>
                  <h3 style={{margin:'0 10px'}}>유아</h3>
                  <InputBox width={200} value={''} func={(e)=>{}} />
                  <p>원</p>
                  <SelectBox 
                    notice={{ value: '선택', label: '0' }}
                    widthmain={100} selectWidth={100} selectTextWidth={90}
                    data={[ 
                      { value: 'n1', label: '1' },
                      { value: 'n2', label: '2' },
                      { value: 'n3', label: '3' },
                    ]} 
                  />
                  <p>명</p>
                </div>
              </div>
            </div>
            <div className="coverrow half">
              <TitleBox width="120px" text='전체요금' height={160}/>
              <InputBox width={400} value={''} func={(e)=>{}} />
              <p>원</p>
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='계약당시 환율'/>
              <h3 style={{margin:'0 10px'}}>1USD</h3>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <p># 잔금지불시 변동환율 적용여부 공지</p>
              <div style={{marginLeft: '30px', display:'flex', alignItems:'center'}}>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={isChecked}
                    onChange={()=>{setIsChecked(!isChecked);}}
                    style={{width:'20px', height:'20px', backgroundColor:'red'}}
                  />
                </div>
                <p>공지했음</p>
                <div style={{width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <input className="input" type="checkbox"
                    checked={isChecked}
                    onChange={()=>{setIsChecked(!isChecked);}}
                    style={{width:'20px', height:'20px', backgroundColor:'red'}}
                  />
                </div>
                <p>고객확인</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h1>6. 항공 예약현황</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
            <TitleBox width={200} text='날짜'/>
            <TitleBox width={200} text='구간'/>
            <TitleBox width={200} text='항공편'/>
            <TitleBox width={200} text='출발시간'/>
            <TitleBox width={200} text='도착시간'/>
            <TitleBox width="120px" text='상태'/>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={120} selectwidth="120px" selectTextWidth={110}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' },
                ]} 
              />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={120} selectwidth="120px" selectTextWidth={110}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' }                
                ]} 
              />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={120} selectwidth="120px" selectTextWidth={110}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' }
                ]} 
              />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={200} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={120} selectwidth="120px" selectTextWidth={110}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' }
                ]} 
              />
            </div>
          </div>
          
        </section>

        <section>
          <h1>7. 발권현황</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='항공사'/>
              <InputBox width={200} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='발권처'/>
              <InputBox width={200} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
              <TitleBox width="120px" text='날짜'/>
              <DateBoxKo date={startDate} func={handleSelectDateChange} width={220} subWidth={180} right={30}/>
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='상태'/>
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' },
                ]} 
              />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='중간구간1'/>
              <InputBox width={200} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='발권처'/>
              <InputBox width={200} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
              <TitleBox width="120px" text='날짜'/>
              <DateBoxKo date={startDate} func={handleSelectDateChange} width={220} subWidth={180} right={30}/>
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='상태'/>
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' },
                ]} 
              />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='중간구간2'/>
              <InputBox width={200} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='발권처'/>
              <InputBox width={200} value={''} func={(e)=>{}} />
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}} >
              <TitleBox width="120px" text='날짜'/>
              <DateBoxKo date={startDate} func={handleSelectDateChange} width={220} subWidth={180} right={30}/>
            </div>
            <div className="coverrow quarter" style={{justifyContent:'space-between'}}>
              <TitleBox width="120px" text='상태'/>
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '예약/대기' },
                  { value: 'n2', label: '발권/취소' },
                ]} 
              />
            </div>
          </div>
        </section>
        
        <section>
          <h1>8. 호텔 예약현황</h1>
          <div className="bottombar"></div>
          <div className="coverbox titlerow" style={{justifyContent:'space-between', backgroundColor:'#E2E2E2' }}>
            <TitleBox width={430} text='날짜'/>
            <TitleBox width={200} text='여행지'/>
            <TitleBox width={300} text='호텔명'/>
            <TitleBox width={200} text='룸타입'/>
            <TitleBox width={100} text='박수'/>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <p>~</p>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={300} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '풀빌라' },
                  { value: 'n2', label: '스탠다드' }
                ]} 
              />
              <InputBox width={100} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <p>~</p>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={300} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '풀빌라' },
                  { value: 'n2', label: '스탠다드' }
                ]} 
              />
              <InputBox width={100} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <p>~</p>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={300} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '풀빌라' },
                  { value: 'n2', label: '스탠다드' }
                ]} 
              />
              <InputBox width={100} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole" style={{justifyContent:'space-between'}}>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <p>~</p>
              <DateBoxKo date={startDate} func={handleSelectDateChange}/>
              <InputBox width={200} value={''} func={(e)=>{}} />
              <InputBox width={300} value={''} func={(e)=>{}} />
              <SelectBox 
                notice={{ value: '선택', label: '선택' }}
                widthmain={200} selectWidth={200} selectTextWidth={190}
                data={[ 
                  { value: 'n1', label: '풀빌라' },
                  { value: 'n2', label: '스탠다드' }
                ]} 
              />
              <InputBox width={100} value={''} func={(e)=>{}} />
            </div>
          </div>
        </section>

        <section>
          <h1>9. 현지여행사</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='랜드사'/>
              <div style={{width:'90%', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                <div style={{display:'flex', alignItems:'center'}}>
                <SelectBox 
                  notice={{ value: '선택', label: '선택' }}
                  widthmain={200} selectWidth={200} selectTextWidth={190}
                  data={[ 
                    { value: 'n1', label: '1' },
                    { value: 'n2', label: '2' }
                  ]} 
                />
                <InputBox width={400} value={''} func={(e)=>{}} />
                </div>
                <div style={{width:'200px', display:'flex', justifyContent:'flex-end'}}>
                  <div className='btn-row' style={{marginRight:'5px'}}
                    onClick={()=>{
                      
                    }}
                  >
                    <p>랜드사추가</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h1>10. 여행상품 포함/불포함 사항, 여행자 보험 가입여부</h1>
          <div className="bottombar"></div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='포함사항'/>
              <InputBox width={1200} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='불포함사항'/>
              <InputBox width={1200} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow half">
              <TitleBox width="120px" text='여행자보험'/>
              <RadioBox text='포함' width={100} selectedValue={selectedValue} func={()=>{}} />
              <RadioBox text='불포함' width={100} selectedValue={selectedValue} func={()=>{}} />
            </div>
            <div className="coverrow half">
              <TitleBox width="120px" text='보험회사'/>
              <InputBox width={520} value={''} func={(e)=>{}} />
            </div>
          </div>
          <div className="coverbox">
            <div className="coverrow hole">
              <TitleBox width="120px" text='계약금액'/>
              <RadioBox text='해외2억' width={100} selectedValue={selectedValue} func={()=>{}} />
              <RadioBox text='해외1억' width={100} selectedValue={selectedValue} func={()=>{}} />
            </div>
          </div>
        </section> */}
    </div>
  )
}
